import { API_URL, obtenerCategorias, leerMensaje, mostrarMensaje, crearOption } from "./Funciones.js";

const host = `${API_URL}/Productos`;

const mensaje = document.getElementById("lbl-mensaje");
mostrarMensaje(mensaje, "");

async function categorias() {
    try {
        const lista = await obtenerCategorias();
        const ddlcategorias = document.getElementById("ddl-categorias");

        lista.forEach(cat => {
            ddlcategorias.appendChild(crearOption(cat.tipo, cat.idTipo));
        });
    }
    catch (error) {
        mostrarMensaje(mensaje, "No se pudo conectar a la base de datos");
    }
}

const btnconfirmar = document.getElementById("btn-confirmar");

btnconfirmar.addEventListener("click", async () => {
    try {
        const txtcodigo = document.getElementById("txt-codigo");
        const txtnombre = document.getElementById("txt-nombre");
        const txtdescripcion = document.getElementById("txt-descripcion");
        const ddlcategorias = document.getElementById("ddl-categorias");
        const txtprecio = document.getElementById("txt-precio");
        const txtstock = document.getElementById("txt-stock");
        const txtimagen = document.getElementById("txt-imagen");

        const codigo = txtcodigo.value.trim();
        const nombre = txtnombre.value.trim();
        const descripcion = txtdescripcion.value.trim();
        const idTipo = parseInt(ddlcategoriaValor(ddlcategorias));
        const precio = Number(txtprecio.value);
        const stock = Number(txtstock.value);
        const imagen = txtimagen.files[0];

        if (!codigo || !nombre || !descripcion) {
            mostrarMensaje(mensaje, "Complete codigo, nombre y descripcion");
            return;
        }

        if (isNaN(idTipo) || idTipo <= 0) {
            mostrarMensaje(mensaje, "Seleccione una categoria valida");
            return;
        }

        if (txtprecio.value.trim() === "" || isNaN(precio) || precio <= 0) {
            mostrarMensaje(mensaje, "Ingrese un precio valido (mayor a 0)");
            return;
        }

        if (txtstock.value.trim() === "" || !Number.isInteger(stock) || stock < 0) {
            mostrarMensaje(mensaje, "Ingrese un stock valido (entero, 0 o mas)");
            return;
        }

        if (!imagen) {
            mostrarMensaje(mensaje, "Debe seleccionar una imagen");
            return;
        }

        const formdata = new FormData();
        formdata.append("codigo", codigo);
        formdata.append("nombre", nombre);
        formdata.append("descripcion", descripcion);
        formdata.append("idTipo", idTipo);
        formdata.append("precio", precio);
        formdata.append("stock", stock);
        formdata.append("imagen", imagen);

        const respuesta_ap = await fetch(`${host}/guardar`, {
            method: "POST",
            body: formdata
        });

        const texto = await leerMensaje(respuesta_ap);

        if (!respuesta_ap.ok) {
            mostrarMensaje(mensaje, texto || "Ocurrio un error al cargar el producto");
            return;
        }

        mostrarMensaje(mensaje, texto || "Producto agregado correctamente", true);

        // Limpiar el formulario tras guardar
        txtcodigo.value = "";
        txtnombre.value = "";
        txtdescripcion.value = "";
        ddlcategorias.value = "0";
        txtprecio.value = "";
        txtstock.value = "";
        txtimagen.value = "";
    }
    catch (error) {
        mostrarMensaje(mensaje, "No se pudo conectar a la Base de Datos");
    }
});

function ddlcategoriaValor(select) {
    return select.value ? select.value.trim() : "0";
}

document.addEventListener("DOMContentLoaded", async () => {
    await categorias();
});
