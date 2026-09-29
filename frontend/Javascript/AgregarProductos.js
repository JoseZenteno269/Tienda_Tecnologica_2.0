const host = "http://localhost:8080/api";

import { crearCelda, crearCeldaImg, crearButton, crearInput, crearOption, crearCeldaControl, crearSpan } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.innerHTML = "";

async function categorias() {
    try {
        const respuesta_cat = await fetch(`${host}/${"Categorias"}`);

        if (!respuesta_cat.ok) {
            mensaje.textContent = "No se encontraron categorias";
            return;
        }

        const categorias = await respuesta_cat.json();
        const ddlcategorias = document.getElementById("ddl-categorias");

        categorias.forEach(cat => {
            ddlcategorias.appendChild(crearOption(cat.tipo, cat.idTipo));
        });
    }
    catch (error) {
        mensaje.textContent = "No se pudo conectar a la base de datos";
    }
}

const btnconfirmar = document.getElementById("btn-confirmar");

btnconfirmar.addEventListener("click", () => {
    const txtcodigo = document.getElementById("txt-codigo");
    const codigo = txtcodigo.value.trim();

    const txtnombre = document.getElementById("txt-nombre");
    const nombre = txtnombre.value.trim();

    const txtdescripcion = document.getElementById("txt-descripcion");
    const descripcion = txtdescripcion.value.trim();

    const ddlcategorias = document.getElementById("ddl-categorias");
    const categorias = ddlcategorias.value.trim();

    const txtprecio = document.getElementById("txt-precio");
    const precio = txtprecio.value.trim();

    const txtstock = document.getElementById("txt-stock");
    const stock = txtstock.value.trim();

    const txtimagen = document.getElementById("txt-imagen");
    const imagen = txtimagen.files[0];

    const formdata = new FormData();

    formdata.append("codigo", codigo);
    formdata.append("nombre", nombre);
    formdata.append("descripcion", descripcion);
    formdata.append("idtipo", parseInt(categorias));
    formdata.append("precio", parseFloat(precio));
    formdata.append("stock", parseInt(stock));
    formdata.append("imagen", imagen);


    mensaje.textContent = `hola-${codigo}-${nombre}-${descripcion}-${precio}-${stock}-${imagen}`;
});

document.addEventListener("DOMContentLoaded", async () => {
    await categorias();
});