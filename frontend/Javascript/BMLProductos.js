const host = "http://localhost:8080/api/Productos";

import { crearCelda, crearCeldaImg, crearCeldaControl, crearSpan, crearControlInput, crearControlTextarea, crearControlSelect } from "./Funciones.js";

const mensaje = document.getElementById("lbl-mensaje");
mensaje.textContent = "";

let categorias = [];

async function Categorias() {
    try {
        const respuesta_cat = await fetch(`${host}/${"Categorias"}`);

        if (!respuesta_cat.ok) {
            mensaje.textContent = "No hay Categorias";
            return;
        }

        categorias = await respuesta_cat.json();
    }
    catch (error) {
        mensaje.textContent = "No se pudo conectar al servidor";
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

            function guardarCambios() {
                const nuevoNombre = txtnombre.value.trim();
                const nuevaDescripcion = txtdescripcion.value.trim();
                const nuevoPrecio = parseFloat(txtprecio.value);
                const nuevoStock = parseInt(txtstock.value);

                if (nuevoNombre === "" || nuevaDescripcion === "") {
                    mensaje.textContent = "El nombre y la descripcion no pueden estar vacios";
                    return;
                }

                if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
                    mensaje.textContent = "Ingrese un precio valido";
                    return;
                }

                if (isNaN(nuevoStock) || nuevoStock < 0) {
                    mensaje.textContent = "Ingrese un stock valido";
                    return;
                }

                const productoEditado = {
                    codigo: p.codigo,
                    nombre: nuevoNombre,
                    descripcion: nuevaDescripcion,
                    idTipo: parseInt(ddlcategoria.value),
                    precio: nuevoPrecio,
                    stock: nuevoStock
                };

                // TODO: cuando exista el endpoint en el backend, enviar productoEditado con fetch (PUT)
                console.log("Producto a modificar:", productoEditado);

                // Actualizo los datos locales para que la fila muestre los nuevos valores
                p.nombre = productoEditado.nombre;
                p.descripcion = productoEditado.descripcion;
                p.tipo = ddlcategoria.options[ddlcategoria.selectedIndex].textContent;
                p.precio = productoEditado.precio;
                p.stock = productoEditado.stock;

                mensaje.textContent = "";
                mostrarTextos();
            }

            // Lapiz: entra en modo edicion
            spaneditar.addEventListener("click", () => {
                if (confirmandoBaja) {
                    return; // no se puede editar mientras se confirma una baja/reactivacion
                }
                mostrarControles();
            });

            // Confirmar: valida y guarda
            spanconfirmar.addEventListener("click", () => {
                guardarCambios();
            });

            // Cancelar: vuelve a los valores originales
            spancancelar.addEventListener("click", () => {
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

            spanconfirmarbaja.addEventListener("click", async () => {
                if (p.activo) {
                    // TODO: logica para DAR DE BAJA el producto
                    // Ejemplo:
                    // const respuesta = await fetch(`${host}/Baja/${p.codigo}`, { method: "PUT" });
                    // if (!respuesta.ok) { mensaje.textContent = "No se pudo dar de baja"; mostrarBotonBaja(); return; }

                    p.activo = false;
                    mensaje.textContent = "Producto dado de baja";
                }
                else {
                    // TODO: logica para REACTIVAR el producto
                    // Ejemplo:
                    // const respuesta = await fetch(`${host}/Reactivar/${p.codigo}`, { method: "PUT" });
                    // if (!respuesta.ok) { mensaje.textContent = "No se pudo reactivar"; mostrarBotonBaja(); return; }

                    p.activo = true;
                    mensaje.textContent = "Producto reactivado";
                }

                mostrarBotonBaja();
            });

            spancancelarbaja.addEventListener("click", () => {
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
