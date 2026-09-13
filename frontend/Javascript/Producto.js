const host = "http://localhost:8080/api/Productos";

import { crearCelda, crearCeldaImg, crearButton, crearInput } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.textContent = "";

let cantidad = 0;
let setCodigo = new Set();

async function tablaProductos() {
    try {
        const respuesta_prod = await fetch(host);

        if (!respuesta_prod.ok) {
            mensaje.textContent = "No se conecto a la Base de Datos (Error en respuesta: " + respuesta_prod.status + ")";
            return;
        }

        const producto = await respuesta_prod.json();
        const tabla_productos = document.getElementById("tabla-productos");

        producto.forEach(prod => {
            const tr = document.createElement("tr");

            const codigo = crearCelda(prod.codigo);
            const nombre = crearCelda(prod.nombre);
            const descripcion = crearCelda(prod.descripcion);
            const categoria = crearCelda(prod.tipo);
            const precio = crearCelda(prod.precio);
            const stock = crearCelda(prod.stock);
            const imagen = crearCeldaImg(prod.imagen, "");
            const btnagregar = crearButton(" + ", "");

            tr.appendChild(codigo);
            tr.appendChild(nombre);
            tr.appendChild(descripcion);
            tr.appendChild(categoria);
            tr.appendChild(precio);
            tr.appendChild(stock);
            tr.appendChild(imagen);
            tr.appendChild(btnagregar);


            tabla_productos.appendChild(tr);

            btnagregar.addEventListener("click", () => {

                const tablaseleccionados = document.getElementById("tabla-seleccionados");
                const tr = document.createElement("tr");
                const btneliminar = crearButton("🗑️", "");

                if (setCodigo.has(prod.codigo)) {
                    mensaje.textContent = "El producto ya fue seleccionado";
                }
                else {
                    setCodigo.add(prod.codigo);

                    const incrementar = crearInput(cantidad + 1, "number");

                    tr.appendChild(crearCelda(prod.codigo));
                    tr.appendChild(crearCelda(prod.nombre));
                    tr.appendChild(crearCelda(prod.descripcion));
                    tr.appendChild(crearCelda(prod.precio));
                    tr.appendChild(incrementar);
                    tr.appendChild(btneliminar);

                    tablaseleccionados.appendChild(tr);

                }


                btneliminar.addEventListener("click", () => {
                    tr.remove();
                    setCarrito.delete(prod.codigo);
                });
            });

        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        mensaje.textContent = "Error al conectar con el servidor backend";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await tablaProductos();
}); 