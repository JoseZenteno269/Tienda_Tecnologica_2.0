const host = "http://localhost:8080/api";

import { crearCelda, crearCeldaImg, crearButton, crearInput } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.textContent = "";

const mensaje_total = document.getElementById("lbl-total");


let cantidad = 0;
let setCodigo = new Set();
let carrito = [];

function actualizarTotalCarrito() {
    const tablaseleccionados = document.getElementById("tabla-seleccionados");
    const filas = tablaseleccionados.querySelectorAll("tr");

    let totalAcumulado = 0;

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        const precio = parseFloat(celdas[3].textContent.replace("$", "").trim()) || 0;
        const inputCantidad = celdas[4].querySelector("input");
        const cantidad = parseInt(inputCantidad.value) || 1;

        totalAcumulado += (precio * cantidad);
    });

    mensaje_total.textContent = "$ " + totalAcumulado.toFixed(2);
}

async function tablaProductos() {
    try {
        const respuesta_prod = await fetch(`${host}/${"Productos"}`);

        if (!respuesta_prod.ok) {
            mensaje.textContent = "No se conecto a la Base de Datos (Error en respuesta: " + respuesta_prod.status + ")";
            return;
        }

        const producto = await respuesta_prod.json();
        const tabla_productos = document.getElementById("tabla-productos");

        tabla_productos.innerHTML = "";

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
                    actualizarTotalCarrito();

                    const input = incrementar.querySelector("input");
                    input.addEventListener("input", () => {
                        if (parseInt(input.value < 1 || input.value === "")) {
                            input.value = 1;
                        }
                        actualizarTotalCarrito();
                    });
                }

                btneliminar.addEventListener("click", () => {
                    tr.remove();
                    setCodigo.delete(prod.codigo);
                    actualizarTotalCarrito();
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

const btnconfirmar = document.getElementById("btn-confirmar");

btnconfirmar.addEventListener("click", async () => {
    const tablaseleccionados = document.getElementById("tabla-seleccionados");
    const filas = tablaseleccionados.querySelectorAll("tr");

    carrito = [];

    filas.forEach(fila => {
        const celda = fila.querySelectorAll("td");

        const carrito_ingreso = {
            codigo: celda[0].textContent.trim(),
            precio: parseFloat(celda[3].textContent),
            cantidad: parseInt(celda[4].querySelector("input").value)
        }

        carrito.push(carrito_ingreso);
    });

    if (carrito.length === 0) {
        mensaje.textContent = "Carrio vacio, Seleccione un producto";
        return;
    }

    try {
        const respuesta_car = await fetch(`${host}/${"RealizarCompra"}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carrito)
        });

        const datos = await respuesta_car.json();

        if (!respuesta_car.ok) {
            mensaje.textContent = datos.mensaje;
            return;
        }

        tablaseleccionados.innerHTML = "";
        setCodigo.clear();
        await tablaProductos();
        mensaje.textContent = datos.mensaje;
    }
    catch (error) {
        mensaje.textContent = "No se conecto a la Base de Datos";
    }

});

const btncancelar = document.getElementById("btn-cancelar");

btncancelar.addEventListener("click", () => {
    const tablaseleccionados = document.getElementById("tabla-seleccionados");
    tablaseleccionados.innerHTML = "";
    setCodigo.clear();
}); 