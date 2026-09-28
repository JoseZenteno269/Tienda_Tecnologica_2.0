const host = "http://localhost:8080/api";

import { crearCelda, crearCeldaImg, crearButton, crearInput, crearOption, crearCeldaControl, crearSpan } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.innerHTML = "";

const btnconfirmar = document.getElementById("btn-confirmar");

btnconfirmar.addEventListener("click", () => {
    const txtcodigo = document.getElementById("txt-codigo");
    const codigo = txtcodigo.value.trim();

    const txtnombre = document.getElementById("txt-nombre");
    const nombre = txtnombre.value.trim();

    const txtdescripcion = document.getElementById("txt-descripcion");
    const descripcion = txtdescripcion.value.trim();

    const txtprecio = document.getElementById("txt-precio");
    const precio = txtprecio.value.trim();

    const txtstock = document.getElementById("txt-stock");
    const stock = txtstock.value.trim();

    const txtimagen = document.getElementById("txt-imagen");
    const imagen = txtimagen.value.trim();

    mensaje.textContent = `hola-${codigo}-${nombre}-${descripcion}-${precio}-${stock}-${imagen}`;
});