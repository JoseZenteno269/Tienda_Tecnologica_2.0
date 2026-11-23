import { API_URL, leerMensaje, mostrarMensaje, crearCelda, crearButton, crearCeldaControl, crearCeldaBadgeEstado } from "./Funciones.js";

const host = `${API_URL}/Compras`;

const mensaje = document.getElementById("lbl-mensaje");
mostrarMensaje(mensaje, "");

async function tablaCompras() {
    try {
        const respuesta_comp = await fetch(`${host}/Compras`);

        if (!respuesta_comp.ok) {
            mostrarMensaje(mensaje, "No se conecto a la Base de Datos (Error en respuesta: " + respuesta_comp.status + ")");
            return;
        }

        const compras = await respuesta_comp.json();
        const tabla_compras = document.getElementById("tabla-compras");
        tabla_compras.innerHTML = "";

        compras.forEach(comp => {
            const tr = document.createElement("tr");

            const idcompra = crearCelda(comp.idCompra);
            const [anio, mes, dia] = comp.fecha.split("-");
            const fecha = crearCelda(`${dia}-${mes}-${anio}`);
            const estado = crearCeldaBadgeEstado(comp.estado);
            const total = crearCelda("$" + comp.total);

            const yaCancelada = (comp.estado || "").trim().toLowerCase() === "cancelado";
            const btnCancelarElem = crearButton(yaCancelada ? "Cancelada" : "Cancelar", "");
            btnCancelarElem.disabled = yaCancelada;

            const btnVerDetalleElem = crearButton("Ver Detalle", "");

            tr.appendChild(idcompra);
            tr.appendChild(fecha);
            tr.appendChild(estado);
            tr.appendChild(total);
            tr.appendChild(crearCeldaControl(btnCancelarElem));
            tr.appendChild(crearCeldaControl(btnVerDetalleElem));

            tabla_compras.appendChild(tr);

            btnVerDetalleElem.addEventListener("click", () => {
                sessionStorage.setItem("IdCompra", comp.idCompra);
                window.location.href = "DetalleCompras.html";
            });

            btnCancelarElem.addEventListener("click", async () => {
                if (yaCancelada) {
                    return;
                }

                try {
                    const respuesta_cancelar = await fetch(`${host}/cancelar`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idCompra: parseInt(comp.idCompra) })
                    });

                    const texto = await leerMensaje(respuesta_cancelar);

                    if (!respuesta_cancelar.ok) {
                        mostrarMensaje(mensaje, texto || "Error al cancelar la compra");
                        return;
                    }

                    mostrarMensaje(mensaje, texto || "Compra cancelada con exito", true);
                    await tablaCompras();
                }
                catch (error) {
                    mostrarMensaje(mensaje, "No se pudo conectar a la Base de Datos");
                }
            });
        });

    }
    catch (error) {
        mostrarMensaje(mensaje, "No se pudo conectar a la Base de Datos");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await tablaCompras();
});
