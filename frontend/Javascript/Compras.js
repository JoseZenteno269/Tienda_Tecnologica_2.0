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
        tabla_compras.innerHTML = "";

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

            btnverdetalle.addEventListener("click", async () => {
                sessionStorage.setItem("IdCompra", comp.idCompra);
                window.location.href = "DetalleCompras.html";
            });

            btncancelar.addEventListener("click", async () => {
                try {
                    const respuesta_cancelar = await fetch(`${host}/${"cancelar"}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idCompra: parseInt(comp.idCompra) })
                    });

                    const datos = await respuesta_cancelar.json();

                    if (!respuesta_cancelar.ok) {
                        mensaje.textContent = datos.mensaje;
                        return;
                    }

                    mensaje.textContent = datos.mensaje;
                    await tablaCompras();
                }
                catch (error) {
                    mensaje.textContent = "No se pudo conectar a las Base de Datos";
                }
            });
        });

    }
    catch (error) {
        mensaje.textContent = "No se pudo conectar a la Base de Datos";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await tablaCompras();
}); 