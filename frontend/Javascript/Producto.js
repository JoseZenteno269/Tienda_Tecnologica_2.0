const host = "http://localhost:8080/api/Productos";

import { crearCelda, crearCeldaImg, crearButton, crearInput } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.textContent = "";

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

            let codigo = crearCelda(prod.codigo);
            let nombre = crearCelda(prod.nombre);
            let descripcion = crearCelda(prod.descripcion);
            let categoria = crearCelda(prod.tipo);
            let precio = crearCelda(prod.precio);
            let stock = crearCelda(prod.stock);
            let imagen = crearCeldaImg(prod.imagen, "");

            tr.appendChild(codigo);
            tr.appendChild(nombre);
            tr.appendChild(descripcion);
            tr.appendChild(categoria);
            tr.appendChild(precio);
            tr.appendChild(stock);
            tr.appendChild(imagen);

            tabla_productos.appendChild(tr);

        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        mensaje.textContent = "Error al conectar con el servidor backend";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await tablaProductos();
}); 