import {
    API_URL,
    obtenerCategorias,
    leerMensaje,
    mostrarMensaje,
    crearCelda,
    crearCeldaImg,
    crearCeldaControl,
    crearSpan,
    crearControlInput,
    crearControlTextarea,
    crearControlSelect
} from "./Funciones.js";

const host = `${API_URL}/Productos`;

const mensaje = document.getElementById("lbl-mensaje");
mostrarMensaje(mensaje, "");

let categorias = [];

async function Categorias() {
    try {
        categorias = await obtenerCategorias();
    }
    catch (error) {
        mostrarMensaje(mensaje, "No se pudo conectar al servidor");
    }
}

async function Productos() {
    try{
        const respuesta_p = await fetch(`${host}/${"Productos"}`);

        if(!respuesta_p.ok){
            mensaje.textContent = "No se encontraton productos";
            return;
        }

        const productos = await respuesta_p.json();
        const tablaproductos = document.getElementById("tabla-productos");

        tablaproductos.innerHTML = "";

        productos.forEach(p => {
            const tr = document.createElement("tr");

            const codigo = crearCelda(p.codigo);
            const nombre = crearCelda(p.nombre);
            const descipcion = crearCelda(p.descripcion);
            const categoria = crearCelda(p.tipo);
            const precio = crearCelda(p.precio);
            const stock = crearCelda(p.stock);
            const imagen = crearCeldaImg(p.imagen);
            const spanestado = crearSpan(p.activo === true ? "🟢" : "🔴");
            const estado = crearCeldaControl(spanestado);

            const spaneditar = crearSpan("✏️");
            const spanconfirmar = crearSpan("✔️");
            const spancancelar = crearSpan("❌");

            spanconfirmar.title = "Confirmar";
            spancancelar.title = "Cancelar";
            spanconfirmar.style.display = "none";
            spancancelar.style.display = "none";

            // Los 3 botones viven en la misma celda "Modificar"
            const btneditar = crearCeldaControl(spaneditar);
            btneditar.classList.add("celda-acciones");
            btneditar.appendChild(spanconfirmar);
            btneditar.appendChild(spancancelar);

            // Botones de la celda "Baja": dar de baja / reactivar + confirmar / cancelar
            const spanbaja = crearSpan("⛔");
            const spanreactivar = crearSpan("🔄");
            const spanconfirmarbaja = crearSpan("✔️");
            const spancancelarbaja = crearSpan("❌");

            spanbaja.title = "Dar de baja";
            spanreactivar.title = "Reactivar";
            spanconfirmarbaja.title = "Confirmar";
            spancancelarbaja.title = "Cancelar";

            const btndarbaja = crearCeldaControl(spanbaja);
            btndarbaja.classList.add("celda-acciones");
            btndarbaja.appendChild(spanreactivar);
            btndarbaja.appendChild(spanconfirmarbaja);
            btndarbaja.appendChild(spancancelarbaja);

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

            // Controles de edicion de esta fila
            let editando = false;
            let guardando = false;
            let txtnombre, txtdescripcion, ddlcategoria, txtprecio, txtstock;

            function mostrarTextos() {
                nombre.textContent = p.nombre;
                descipcion.textContent = p.descripcion;
                categoria.textContent = p.tipo;
                precio.textContent = p.precio;
                stock.textContent = p.stock;

                spaneditar.style.display = "inline";
                spanconfirmar.style.display = "none";
                spancancelar.style.display = "none";
                tr.classList.remove("fila-editando");
                editando = false;
            }

            function mostrarControles() {
                txtnombre = crearControlInput(p.nombre, "text");
                txtdescripcion = crearControlTextarea(p.descripcion);
                ddlcategoria = crearControlSelect(categorias, p.tipo);
                txtprecio = crearControlInput(p.precio, "number");
                txtprecio.step = "0.01";
                txtstock = crearControlInput(p.stock, "number");
                txtstock.step = "1";

                nombre.replaceChildren(txtnombre);
                descipcion.replaceChildren(txtdescripcion);
                categoria.replaceChildren(ddlcategoria);
                precio.replaceChildren(txtprecio);
                stock.replaceChildren(txtstock);

                spaneditar.style.display = "none";
                spanconfirmar.style.display = "inline";
                spancancelar.style.display = "inline";
                tr.classList.add("fila-editando");
                editando = true;
                txtnombre.focus();
            }

            async function guardarCambios() {
                // Evita mandar la peticion dos veces si se hace doble click
                if (guardando) {
                    return;
                }

                const nuevoNombre = txtnombre.value.trim();
                const nuevaDescripcion = txtdescripcion.value.trim();
                const nuevoIdTipo = parseInt(ddlcategoria.value);
                // Number() es mas estricto que parseFloat/parseInt ("12abc" o "1.5" en stock no pasan)
                const nuevoPrecio = Number(txtprecio.value);
                const nuevoStock = Number(txtstock.value);

                if (nuevoNombre === "") {
                    mensaje.textContent = "El nombre no puede estar vacio";
                    txtnombre.focus();
                    return;
                }

                if (nuevaDescripcion === "") {
                    mensaje.textContent = "La descripcion no puede estar vacia";
                    txtdescripcion.focus();
                    return;
                }

                if (isNaN(nuevoIdTipo) || nuevoIdTipo <= 0) {
                    mensaje.textContent = "Seleccione una categoria valida";
                    ddlcategoria.focus();
                    return;
                }

                if (txtprecio.value.trim() === "" || isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
                    mensaje.textContent = "Ingrese un precio valido (mayor a 0)";
                    txtprecio.focus();
                    return;
                }

                if (txtstock.value.trim() === "" || !Number.isInteger(nuevoStock) || nuevoStock < 0) {
                    mensaje.textContent = "Ingrese un stock valido (numero entero, 0 o mas)";
                    txtstock.focus();
                    return;
                }

                const productoEditado = {
                    codigo: p.codigo,
                    nombre: nuevoNombre,
                    descripcion: nuevaDescripcion,
                    idTipo: nuevoIdTipo,
                    precio: Math.round(nuevoPrecio * 100) / 100,
                    stock: nuevoStock
                };

                const textoCategoria = ddlcategoria.options[ddlcategoria.selectedIndex].textContent;

                // Si no se cambio nada, no hace falta llamar al backend
                const sinCambios =
                    productoEditado.nombre === p.nombre &&
                    productoEditado.descripcion === p.descripcion &&
                    textoCategoria === p.tipo &&
                    productoEditado.precio === Number(p.precio) &&
                    productoEditado.stock === Number(p.stock);

                if (sinCambios) {
                    mensaje.textContent = "No se realizaron cambios";
                    mostrarTextos();
                    return;
                }

                guardando = true;
                spanconfirmar.style.opacity = "0.4";
                spancancelar.style.opacity = "0.4";

                try {
                    const respuesta = await fetch(`${host}/modificar`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(productoEditado)
                    });

                    const texto = await leerMensaje(respuesta);

                    if (!respuesta.ok) {
                        // 400: datos invalidos | 404: no existe | 500: error en la BD
                        // Los campos quedan abiertos para que se pueda corregir
                        mensaje.textContent = texto || "No se pudo modificar el producto";
                        return;
                    }

                    // Solo si el backend confirmo, actualizo los datos locales de la fila
                    p.nombre = productoEditado.nombre;
                    p.descripcion = productoEditado.descripcion;
                    p.tipo = textoCategoria;
                    p.precio = productoEditado.precio;
                    p.stock = productoEditado.stock;

                    mensaje.textContent = texto || "Producto modificado correctamente";
                    mostrarTextos();
                }
                catch (error) {
                    mensaje.textContent = "No se pudo conectar al servidor";
                }
                finally {
                    guardando = false;
                    spanconfirmar.style.opacity = "";
                    spancancelar.style.opacity = "";
                }
            }

            // Lapiz: entra en modo edicion
            spaneditar.addEventListener("click", () => {
                if (confirmandoBaja) {
                    return; // no se puede editar mientras se confirma una baja/reactivacion
                }
                mensaje.textContent = "";
                mostrarControles();
            });

            // Confirmar: valida y guarda
            spanconfirmar.addEventListener("click", () => {
                guardarCambios();
            });

            // Cancelar: vuelve a los valores originales
            spancancelar.addEventListener("click", () => {
                if (guardando) {
                    return; // la peticion ya salio, no se puede cancelar
                }
                mensaje.textContent = "";
                mostrarTextos();
            });

            // ================== BAJA / REACTIVAR ==================
            let confirmandoBaja = false;

            // Muestra ⛔ si el producto esta activo, o 🔄 si esta dado de baja
            function mostrarBotonBaja() {
                spanbaja.style.display = p.activo ? "inline" : "none";
                spanreactivar.style.display = p.activo ? "none" : "inline";
                spanconfirmarbaja.style.display = "none";
                spancancelarbaja.style.display = "none";
                spanestado.textContent = p.activo ? "🟢" : "🔴";
                tr.classList.toggle("fila-inactiva", !p.activo);
                confirmandoBaja = false;
            }

            // Oculta ⛔ / 🔄 y muestra ✔️ ❌
            function mostrarConfirmacionBaja() {
                spanbaja.style.display = "none";
                spanreactivar.style.display = "none";
                spanconfirmarbaja.style.display = "inline";
                spancancelarbaja.style.display = "inline";
                confirmandoBaja = true;
            }

            function pedirConfirmacion() {
                if (editando) {
                    return; // no se puede dar de baja/reactivar mientras se edita
                }
                mostrarConfirmacionBaja();
            }

            spanbaja.addEventListener("click", pedirConfirmacion);
            spanreactivar.addEventListener("click", pedirConfirmacion);

            let procesando = false;

            spanconfirmarbaja.addEventListener("click", async () => {
                // Evita mandar la peticion dos veces si se hace doble click
                if (procesando) {
                    return;
                }

                // Segun el estado actual se da de baja (DELETE) o se reactiva (PUT)
                const accion = p.activo
                    ? {
                        url: `${host}/eliminar?codigo=${encodeURIComponent(p.codigo)}`,
                        metodo: "DELETE",
                        nuevoEstado: false,
                        mensajeOk: "Producto dado de baja correctamente",
                        mensajeError: "No se pudo dar de baja el producto"
                    }
                    : {
                        url: `${host}/activar?codigo=${encodeURIComponent(p.codigo)}`,
                        metodo: "PUT",
                        nuevoEstado: true,
                        mensajeOk: "Producto activado correctamente",
                        mensajeError: "No se pudo activar el producto"
                    };

                procesando = true;
                spanconfirmarbaja.style.opacity = "0.4";
                spancancelarbaja.style.opacity = "0.4";

                try {
                    const respuesta = await fetch(accion.url, { method: accion.metodo });
                    const texto = await leerMensaje(respuesta);

                    if (!respuesta.ok) {
                        // 404: no existe | 409: la BD ya tenia ese estado | 400/500: otros errores
                        if (respuesta.status === 409) {
                            p.activo = accion.nuevoEstado; // sincronizo la fila con la BD
                        }
                        mensaje.textContent = texto || accion.mensajeError;
                        return;
                    }

                    p.activo = accion.nuevoEstado;
                    mensaje.textContent = texto || accion.mensajeOk;
                }
                catch (error) {
                    mensaje.textContent = "No se pudo conectar al servidor";
                }
                finally {
                    procesando = false;
                    spanconfirmarbaja.style.opacity = "";
                    spancancelarbaja.style.opacity = "";
                    mostrarBotonBaja();
                }
            });

            spancancelarbaja.addEventListener("click", () => {
                if (procesando) {
                    return; // la peticion ya salio, no se puede cancelar
                }
                mensaje.textContent = "";
                mostrarBotonBaja();
            });

            // Estado inicial de la celda segun si el producto esta activo o no
            mostrarBotonBaja();
        });

    }
    catch(error){
        mensaje.textContent = "No se pudo conectar al servidor";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await Categorias();
    await Productos();
});
