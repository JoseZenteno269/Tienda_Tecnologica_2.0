const host = "http://localhost:8080/api/Productos";

import { crearCelda, crearCeldaImg, crearButton, crearInput, crearOption, crearCeldaControl, crearSpan } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.textContent = "";

async function Productos() {
    try{
        const respuesta_p = await fetch(`${host}/${"Productos"}`);

        if(!respuesta_p.ok){
            mensaje.textContent = "No se encontraton productos";
        }

        const productos = await respuesta_p.json();
        const tablaproductos = document.getElementById("tabla-productos");

        productos.forEach(p => {
            const tr = document.createElement("tr");

            const codigo = crearCelda(p.codigo);
            const nombre = crearCelda(p.nombre);
            const descipcion = crearCelda(p.descripcion);
            const categoria = crearCelda(p.tipo);
            const precio = crearCelda(p.precio);
            const stock = crearCelda(p.stock);
            const imagen = crearCeldaControl(crearCeldaImg(p.imagen));
            const estado = crearSpan(p.activo === true ? "🟢" : "🔴");
            const btneditar = crearSpan("✏️");
            const btndarbaja = crearSpan("⛔");

            tr.appendChild(codigo);
            tr.appendChild(nombre);
            tr.appendChild(descipcion);
            tr.appendChild(categoria);
            tr.appendChild(precio);
            tr.appendChild(stock);
            tr.appendChild(imagen);
            tr.appendChild(estado);
            tr.appendChild(btneditar);
            tr.appendChild(btndarbaja);

            tablaproductos.appendChild(tr);
        });

    }
    catch(error){
        mensaje.textContent = "No se pudo conectar al servidor";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await Productos();
});