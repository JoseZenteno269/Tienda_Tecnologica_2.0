import {
    API_URL,
    obtenerCategorias,
    leerMensaje,
    mostrarMensaje,
    crearCelda,
    crearCeldaImg,
    crearInput,
    crearOption,
    crearCeldaControl,
    crearSpan
} from "./Funciones.js";

const host = `${API_URL}/Productos`;

const mensaje = document.getElementById("lbl-mensaje");
mostrarMensaje(mensaje, "");

const mensaje_total = document.getElementById("lbl-total");

let setCodigo = new Set();
let carrito = [];

function actualizarTotalCarrito() {
    const tablaseleccionados = document.getElementById("tabla-seleccionados");
    const filas = tablaseleccionados.querySelectorAll("tr");

    let totalAcumulado = 0;

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        const precio = parseFloat(celdas[3].textContent.replace("$", "").trim()) || 0;
        const inputCantidad = celdas[4].querySelector("input");
        const cantidad = parseInt(inputCantidad.value) || 1;

        totalAcumulado += (precio * cantidad);
    });

    mensaje_total.textContent = "$ " + totalAcumulado.toFixed(2);
}

async function Categorias() {
    try {
        const select = document.getElementById("ddl-categorias");
        const categorias = await obtenerCategorias();

        categorias.forEach(cat => {
            select.appendChild(crearOption(cat.tipo, cat.idTipo));
        });
    }
    catch (error) {
        mostrarMensaje(mensaje, "No se pudo conectar a la Base de Datos");
    }
}

async function tablaProductos(texto = "", valor = 0) {
    try {
        let url = `${host}/Productos`;

        if (texto !== "") {
            url += `?texto=${encodeURIComponent(texto)}`;
        }

        if (valor !== 0) {
            url += `${texto !== "" ? "&" : "?"}valor=${valor}`;
        }

        const respuesta_prod = await fetch(url);

        if (!respuesta_prod.ok) {
            mostrarMensaje(mensaje, "No se conecto a la Base de Datos (Error en respuesta: " + respuesta_prod.status + ")");
            return;
        }

        const productos = await respuesta_prod.json();
        const tabla_productos = document.getElementById("tabla-productos");

        tabla_productos.innerHTML = "";

        productos.forEach(prod => {
            // En el catalogo solo se muestran productos activos
            if (!prod.activo) {
                return;
            }

            const tr = document.createElement("tr");

            const codigo = crearCelda(prod.codigo);
            const nombre = crearCelda(prod.nombre);
            const descripcion = crearCelda(prod.descripcion);
            const categoria = crearCelda(prod.tipo);
            const precio = crearCelda("$" + prod.precio);
            const imagen = crearCeldaImg(prod.imagen, prod.nombre);
            const btnagregar = crearCeldaControl(crearSpan(" + "));

            tr.appendChild(codigo);
            tr.appendChild(nombre);
            tr.appendChild(descripcion);
            tr.appendChild(categoria);
            tr.appendChild(precio);
            tr.appendChild(imagen);
            tr.appendChild(btnagregar);

            tabla_productos.appendChild(tr);

            btnagregar.addEventListener("click", () => {
                const tablaseleccionados = document.getElementById("tabla-seleccionados");

                if (setCodigo.has(prod.codigo)) {
                    mostrarMensaje(mensaje, "El producto ya fue seleccionado");
                    return;
                }

                mostrarMensaje(mensaje, "");
                setCodigo.add(prod.codigo);

                const filaCarrito = document.createElement("tr");
                const btneliminar = crearSpan("🗑️");
                const incrementar = crearInput(1, "number");

                filaCarrito.appendChild(crearCelda(prod.codigo));
                filaCarrito.appendChild(crearCelda(prod.nombre));
                filaCarrito.appendChild(crearCelda(prod.descripcion));
                filaCarrito.appendChild(crearCelda("$" + prod.precio));
                filaCarrito.appendChild(incrementar);
                filaCarrito.appendChild(crearCeldaControl(btneliminar));

                tablaseleccionados.appendChild(filaCarrito);
                actualizarTotalCarrito();

                const input = incrementar.querySelector("input");
                input.addEventListener("input", () => {
                    if (parseInt(input.value) < 1 || input.value === "") {
                        input.value = 1;
                    }
                    actualizarTotalCarrito();
                });

                btneliminar.addEventListener("click", () => {
                    filaCarrito.remove();
                    setCodigo.delete(prod.codigo);
                    actualizarTotalCarrito();
                });
            });
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        mostrarMensaje(mensaje, "Error al conectar con el servidor backend");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await Categorias();
    await tablaProductos();
});

const btnconfirmar = document.getElementById("btn-confirmar");

btnconfirmar.addEventListener("click", async () => {
    const tablaseleccionados = document.getElementById("tabla-seleccionados");
    const filas = tablaseleccionados.querySelectorAll("tr");

    carrito = [];

    filas.forEach(fila => {
        const celda = fila.querySelectorAll("td");

        const carrito_ingreso = {
            codigo: celda[0].textContent.trim(),
            precio: parseFloat(celda[3].textContent.replace("$", "").trim()),
            cantidad: parseInt(celda[4].querySelector("input").value)
        };

        carrito.push(carrito_ingreso);
    });

    if (carrito.length === 0) {
        mostrarMensaje(mensaje, "Carrito vacio, seleccione un producto");
        return;
    }

    try {
        const respuesta_car = await fetch(`${host}/RealizarCompra`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carrito)
        });

        const texto = await leerMensaje(respuesta_car);

        if (!respuesta_car.ok) {
            mostrarMensaje(mensaje, texto || "No se pudo procesar la compra");
            return;
        }

        tablaseleccionados.innerHTML = "";
        setCodigo.clear();
        await tablaProductos();
        mostrarMensaje(mensaje, texto || "Compra realizada con exito", true);
        mensaje_total.textContent = "$ 0.00";
    }
    catch (error) {
        mostrarMensaje(mensaje, "No se conecto a la Base de Datos");
    }
});

const btncancelar = document.getElementById("btn-cancelar");

btncancelar.addEventListener("click", () => {
    const tablaseleccionados = document.getElementById("tabla-seleccionados");
    tablaseleccionados.innerHTML = "";
    mensaje_total.textContent = "$ 0.00";
    mostrarMensaje(mensaje, "");
    setCodigo.clear();
});

const txt_texto = document.getElementById("txt-texto");
const select = document.getElementById("ddl-categorias");

const btnlimpiar = document.getElementById("btn-limpiar");

btnlimpiar.addEventListener("click", async () => {
    txt_texto.value = "";
    select.value = 0;
    await tablaProductos();
});

const btnbuscar = document.getElementById("btn-buscar");

btnbuscar.addEventListener("click", async () => {
    const texto = txt_texto.value.trim();
    await tablaProductos(texto, parseInt(select.value) || 0);
});
