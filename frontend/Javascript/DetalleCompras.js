const host = "http://localhost:8080/api";

import { crearCelda, crearCeldaImg, crearButton, crearInput } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.textContent = "";

const total = document.getElementById("total");

function calcularTotal(subtotal) {
    let calcular = 0;
    calcular += parseFloat(subtotal);
    total.textContent = "$" + calcular;
}

async function tablaDetalleCompras() {

    try {
        const idcompra = sessionStorage.getItem("IdCompra");
        if (!idcompra) {
            mensaje.textContent = "No se ha seleccionado ninguna compra";
            return;
        }

        let calcular = 0;

        const tabla_detalle_compras = document.getElementById("tabla-detalle-compras");
        tabla_detalle_compras.innerHTML = "";

        const respuesta_ver = await fetch(`${host}/${"VerDetalle"}/${parseInt(idcompra)}`);

        const detalle = await respuesta_ver.json();

        if (!respuesta_ver.ok) {
            mensaje.textContent = "No hay compras para detallar";
            return;
        }

        detalle.forEach(det => {
            const tr = document.createElement("tr");

            calcular += det.subTotal;

            const imagen = crearCeldaImg(det.imagen);
            const codigo = crearCelda(det.codigo);
            const nombre = crearCelda(det.nombre);
            const precio = crearCelda("$" + det.precio);
            const cantidad = crearCelda(det.cantidad);
            const subtotal = crearCelda("$" + det.subTotal);

            tr.appendChild(imagen);
            tr.appendChild(codigo);
            tr.appendChild(nombre);
            tr.appendChild(precio);
            tr.appendChild(cantidad);
            tr.appendChild(subtotal);

            tabla_detalle_compras.appendChild(tr);

        });

        total.textContent = "$" + calcular;
        const totalArea = document.getElementById("total-area");
        const lblTotal = document.getElementById("total");
        if (detalle.length > 0) {
            lblTotal.textContent = "$" + calcular.toFixed(2);
            totalArea.style.display = "flex";
        }
    }
    catch (error) {
        mensaje.textContent = "No se pudo conectar a las Base de Datos";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await tablaDetalleCompras();
}); 