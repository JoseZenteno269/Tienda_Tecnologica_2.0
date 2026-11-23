import { API_URL, mostrarMensaje, crearCelda, crearCeldaImg } from "./Funciones.js";

const host = `${API_URL}/DetalleCompras`;

const mensaje = document.getElementById("lbl-mensaje");
mostrarMensaje(mensaje, "");

async function tablaDetalleCompras() {
    try {
        const idcompra = sessionStorage.getItem("IdCompra");
        if (!idcompra) {
            mostrarMensaje(mensaje, "No se ha seleccionado ninguna compra");
            return;
        }

        let calcular = 0;

        const tabla_detalle_compras = document.getElementById("tabla-detalle-compras");
        tabla_detalle_compras.innerHTML = "";

        const respuesta_ver = await fetch(`${host}/VerDetalle/${parseInt(idcompra)}`);

        if (!respuesta_ver.ok) {
            mostrarMensaje(mensaje, "No hay compras para detallar");
            return;
        }

        const detalle = await respuesta_ver.json();

        detalle.forEach(det => {
            const tr = document.createElement("tr");

            calcular += det.subTotal;

            tr.appendChild(crearCeldaImg(det.imagen, det.nombre));
            tr.appendChild(crearCelda(det.codigo));
            tr.appendChild(crearCelda(det.nombre));
            tr.appendChild(crearCelda("$" + det.precio));
            tr.appendChild(crearCelda(det.cantidad));
            tr.appendChild(crearCelda("$" + det.subTotal));

            tabla_detalle_compras.appendChild(tr);
        });

        const totalArea = document.getElementById("total-area");
        const lblTotal = document.getElementById("total");
        if (detalle.length > 0) {
            lblTotal.textContent = "$" + calcular.toFixed(2);
            totalArea.style.display = "flex";
        }
    }
    catch (error) {
        mostrarMensaje(mensaje, "No se pudo conectar a la Base de Datos");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await tablaDetalleCompras();
});
