export const API_URL = "http://localhost:8080/api";

// Lee el mensaje de la respuesta, venga como JSON { mensaje: "..." } o como texto plano
export async function leerMensaje(respuesta) {
    const texto = await respuesta.text();

    try {
        const datos = JSON.parse(texto);
        return datos.mensaje ?? texto;
    }
    catch {
        return texto;
    }
}

// Trae las categorias desde la API para no repetir el fetch en varias paginas
export async function obtenerCategorias() {
    const respuesta = await fetch(`${API_URL}/Productos/Categorias`);
    if (!respuesta.ok) {
        throw new Error("No se encontraron categorias");
    }
    return await respuesta.json();
}

// Muestra un mensaje con estilo de exito o error (limpia si texto esta vacio)
export function mostrarMensaje(elemento, texto, esExito = false) {
    elemento.textContent = texto || "";
    elemento.classList.remove("mensaje-exito", "mensaje-error");
    if (texto) {
        elemento.classList.add(esExito ? "mensaje-exito" : "mensaje-error");
    }
}

export function crearCelda(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

export function crearCeldaControl(control) {
    const td = document.createElement("td");
    td.appendChild(control);
    return td;
}

export function crearSpan(texto) {
    const span = document.createElement("span");
    span.textContent = texto;
    return span;
}

export function crearCeldaImg(ruta, texto) {
    const img = document.createElement("img");
    img.src = ruta || "";
    img.alt = texto || "Producto";
    img.style.maxWidth = "80px";
    img.style.maxHeight = "80px";
    img.style.objectFit = "cover";
    return crearCeldaControl(img);
}

export function crearButton(texto, modo) {
    const button = document.createElement("button");
    button.textContent = texto;
    button.style.display = modo;
    return button;
}

export function crearInput(texto, modo) {
    const input = document.createElement("input");
    input.type = modo;
    input.value = texto;
    input.min = 1;
    return crearCeldaControl(input);
}

// Devuelve SOLO el input (sin envolverlo en un td), para usar dentro de una celda existente
export function crearControlInput(valor, tipo) {
    const input = document.createElement("input");
    input.type = tipo;
    input.value = valor;
    if (tipo === "number") {
        input.min = 0;
    }
    return input;
}

// Devuelve SOLO el textarea, para textos largos como la descripcion
export function crearControlTextarea(valor) {
    const textarea = document.createElement("textarea");
    textarea.value = valor;
    textarea.rows = 2;
    return textarea;
}

// Devuelve un select cargado con las categorias y con la actual ya seleccionada
export function crearControlSelect(categorias, textoActual) {
    const select = document.createElement("select");

    categorias.forEach(cat => {
        const option = crearOption(cat.tipo, cat.idTipo);
        if (cat.tipo === textoActual) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    return select;
}

export function crearOption(texto, valor) {
    const option = document.createElement("option");
    option.textContent = texto;
    option.value = valor;
    return option;
}

export function crearCeldaBadgeEstado(estado) {
    const td = document.createElement("td");
    const span = document.createElement("span");
    const estados = (estado || "").trim().toLowerCase();

    span.textContent = estado || "—";
    span.classList.add("badge_estado");

    if (estados === "comprado" || estados === "completado") {
        span.classList.add("comprado");
    } else if (estados === "cancelado") {
        span.classList.add("cancelado");
    } else {
        span.classList.add("pendiente");
    }

    td.appendChild(span);
    return td;
}
