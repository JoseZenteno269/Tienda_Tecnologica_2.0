const host = "http://localhost:8080/api";

import { crearCelda, crearCeldaImg, crearButton, crearInput } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.textContent = "";

async function tablaCompras() {
    try {
        const respuesta_comp = await fetch(`${host}/${"Compras"}`);

        if (!respuesta_comp.ok) {
            mensaje.textContent = "No se conecto a la Base de Datos (Error en respuesta: " + respuesta_comp.status + ")";
            return;
        }

        const compras = await respuesta_comp.json();
        const tabla_compras = document.getElementById("tabla-compras");

        compras.forEach(comp => {
            const tr = document.createElement("tr");

            const idcompra = crearCelda(comp.idCompra);
            const fecha = crearCelda(comp.fecha);
            const estado = crearCelda(comp.estado);
            const total = crearCelda(comp.total);
            const btncancelar = crearButton("Cancelar", "");
            const btnverdetalle = crearButton("Ver Detalle", "");

            tr.appendChild(idcompra);
            tr.appendChild(fecha);
            tr.appendChild(estado);
            tr.appendChild(total);
            tr.appendChild(btncancelar);
            tr.appendChild(btnverdetalle);

            tabla_compras.appendChild(tr);
        });

    }
    catch (error) {
        mensaje.textContent = "No se pudo conectar a la Base de Datos";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await tablaCompras();
}); 