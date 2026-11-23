# Tienda_Tecnologica_2.0

> **Borrador / Puntos clave para armar el README final**

---

## 1. Descripción del proyecto
- Aplicación web full-stack de práctica para una tienda tecnológica con catálogo, carrito de compras, historial de compras con detalle/cancelación y gestión de productos (alta, modificación, baja lógica y reactivación).

## 2. Tecnologías utilizadas
- **Backend:** Java (Spring Boot), Maven, JDBC puro con `DataSource`, Procedimientos Almacenados y Triggers.
- **Base de Datos:** MySQL (`CarritoComprasDB`).
- **Frontend:** HTML5, CSS3 (diseño modular con `Base.css` compartido + estilos por vista), JavaScript vanilla modular (ES Modules, `fetch` API).

## 3. Estructura del proyecto
- `CarritoComprasBD.sql` — Script completo de base de datos (tablas, 7 procedimientos almacenados, 2 triggers y datos base).
- `backend/` — Proyecto Spring Boot (`Controller`, `Negocio`, `DAO`, `DTOs`, `Entidades`, `application.properties`).
- `frontend/`
  - `Productos.html` — Catálogo de productos activos + carrito de compras.
  - `AgregarProductos.html` — Formulario de alta de producto con carga de imagen.
  - `BMLProductos.html` — Gestión de productos (edición en línea, baja lógica y reactivación).
  - `Compras.html` — Historial de compras realizadas con opción de cancelar y ver detalle.
  - `DetalleCompras.html` — Detalle de productos de una compra seleccionada.
  - `Css/` — `Base.css` + hojas de estilo específicas por página.
  - `Javascript/` — `Funciones.js` (helpers compartidos y `API_URL`) + scripts por vista.
  - `Imagenes/` — Imágenes de los productos cargados.

## 4. Funcionalidades principales
- **Catálogo y Carrito (`Productos.html`):**
  - Muestra únicamente productos activos.
  - Filtro por categoría y búsqueda por nombre o código.
  - Carrito interactivo con control de cantidades, cálculo de total y validación de stock antes de confirmar.
  - Al confirmar la compra se descuenta el stock automáticamente (trigger `tr_ActualizarStock_Descontar`).
- **Alta de Productos (`AgregarProductos.html`):**
  - Carga de código, nombre, descripción, categoría, precio, stock e imagen (`multipart/form-data`).
  - Validación de duplicado de código y guardado de la imagen en `frontend/Imagenes/`.
- **Gestión de Productos (`BMLProductos.html`):**
  - Edición en línea de nombre, descripción, categoría (arranca seleccionada en la categoría actual), precio y stock.
  - Baja lógica (`Activo_P = 0`) y reactivación (`Activo_P = 1`) con confirmación en el mismo cuadro.
- **Historial y Detalle de Compras (`Compras.html` y `DetalleCompras.html`):**
  - Listado ordenado por fecha con badge visual de estado (`Comprado`, `Pendiente`, `Cancelado`).
  - Cancelación de compra con devolución automática de stock (trigger `tr_ActualizarStock_Devolver`) y bloqueo para no cancelar dos veces.
  - Vista de detalle con precio histórico de compra (`Precio_DC`), cantidad y subtotal.

## 5. Base de Datos (`CarritoComprasBD.sql`)
- **Tablas (5):** `Tipo`, `Productos`, `Estados`, `Compras`, `Detalle_Compra`.
- **Procedimientos almacenados (7):**
  - `sp_RealizarCompra`
  - `sp_AgregarDetalleCompra`
  - `sp_CancelarCompra`
  - `sp_AgregarProducto`
  - `sp_BajaProducto`
  - `sp_ActivarProducto`
  - `sp_ModificarProducto`
- **Triggers (2):**
  - `tr_ActualizarStock_Descontar` (`AFTER INSERT ON Detalle_Compra`)
  - `tr_ActualizarStock_Devolver` (`AFTER UPDATE ON Compras`, cuando cambia a estado Cancelado `3`)
- **Datos iniciales:** Estados (`Comprado`, `Pendiente`, `Cancelado`) y categorías base en `Tipo`.

## 6. Endpoints de la API (`http://localhost:8080/api`)
- **Productos (`/api/Productos`):**
  - `GET /Productos?texto=&valor=` — Lista productos con filtros opcionales.
  - `GET /Categorias` — Lista categorías (`Tipo`).
  - `POST /guardar` — Crea un producto nuevo (`multipart/form-data` con imagen).
  - `PUT /modificar` — Modifica un producto existente (JSON).
  - `DELETE /eliminar?codigo=` — Baja lógica de un producto.
  - `PUT /activar?codigo=` — Reactivación de un producto.
  - `POST /RealizarCompra` — Registra una compra y su detalle (JSON).
- **Compras (`/api/Compras`):**
  - `GET /Compras` — Historial de compras.
  - `POST /cancelar` — Cancela una compra por `idCompra`.
- **Detalle de Compras (`/api/DetalleCompras`):**
  - `GET /VerDetalle/{idCompra}` — Detalle de ítems de una compra.

## 7. Cómo ejecutar el proyecto localmente
1. **Requisitos previos:** Java (JDK 17+), Maven (o `./mvnw`), MySQL Server y un servidor local para el frontend (ej. Live Server en VS Code, necesario para ES Modules).
2. **Importar la base de datos:** Ejecutar `CarritoComprasBD.sql` en MySQL.
3. **Configurar credenciales:** Abrir `backend/src/main/resources/application.properties` y completar con los datos locales de MySQL:
   - `spring.datasource.url` (host, puerto y base `CarritoComprasDB`)
   - `spring.datasource.username`
   - `spring.datasource.password`
4. **Levantar el backend:**
   - Desde `backend/`, ejecutar `./mvnw spring-boot:run` (o `mvnw.cmd spring-boot:run` en Windows).
   - El servidor queda escuchando en `http://localhost:8080`.
5. **Abrir el frontend:**
   - Abrir `frontend/Productos.html` con Live Server (o similar) en el navegador.

> **Borrador / Puntos clave para armar el README final**

---

## 1. Descripción del proyecto
- Aplicación web full-stack de práctica para una tienda tecnológica con catálogo, carrito de compras, historial de compras con detalle/cancelación y gestión de productos (alta, modificación, baja lógica y reactivación).

## 2. Tecnologías utilizadas
- **Backend:** Java (Spring Boot), Maven, JDBC puro con `DataSource`, Procedimientos Almacenados y Triggers.
- **Base de Datos:** MySQL (`CarritoComprasDB`).
- **Frontend:** HTML5, CSS3 (diseño modular con `Base.css` compartido + estilos por vista), JavaScript vanilla modular (ES Modules, `fetch` API).

## 3. Estructura del proyecto
- `CarritoComprasBD.sql` — Script completo de base de datos (tablas, 7 procedimientos almacenados, 2 triggers y datos base).
- `backend/` — Proyecto Spring Boot (`Controller`, `Negocio`, `DAO`, `DTOs`, `Entidades`, `application.properties`).
- `frontend/`
  - `Productos.html` — Catálogo de productos activos + carrito de compras.
  - `AgregarProductos.html` — Formulario de alta de producto con carga de imagen.
  - `BMLProductos.html` — Gestión de productos (edición en línea, baja lógica y reactivación).
  - `Compras.html` — Historial de compras realizadas con opción de cancelar y ver detalle.
  - `DetalleCompras.html` — Detalle de productos de una compra seleccionada.
  - `Css/` — `Base.css` + hojas de estilo específicas por página.
  - `Javascript/` — `Funciones.js` (helpers compartidos y `API_URL`) + scripts por vista.
  - `Imagenes/` — Imágenes de los productos cargados.

## 4. Funcionalidades principales
- **Catálogo y Carrito (`Productos.html`):**
  - Muestra únicamente productos activos.
  - Filtro por categoría y búsqueda por nombre o código.
  - Carrito interactivo con control de cantidades, cálculo de total y validación de stock antes de confirmar.
  - Al confirmar la compra se descuenta el stock automáticamente (trigger `tr_ActualizarStock_Descontar`).
- **Alta de Productos (`AgregarProductos.html`):**
  - Carga de código, nombre, descripción, categoría, precio, stock e imagen (`multipart/form-data`).
  - Validación de duplicado de código y guardado de la imagen en `frontend/Imagenes/`.
- **Gestión de Productos (`BMLProductos.html`):**
  - Edición en línea de nombre, descripción, categoría (arranca seleccionada en la categoría actual), precio y stock.
  - Baja lógica (`Activo_P = 0`) y reactivación (`Activo_P = 1`) con confirmación en el mismo cuadro.
- **Historial y Detalle de Compras (`Compras.html` y `DetalleCompras.html`):**
  - Listado ordenado por fecha con badge visual de estado (`Comprado`, `Pendiente`, `Cancelado`).
  - Cancelación de compra con devolución automática de stock (trigger `tr_ActualizarStock_Devolver`) y bloqueo para no cancelar dos veces.
  - Vista de detalle con precio histórico de compra (`Precio_DC`), cantidad y subtotal.

## 5. Base de Datos (`CarritoComprasBD.sql`)
- **Tablas (5):** `Tipo`, `Productos`, `Estados`, `Compras`, `Detalle_Compra`.
- **Procedimientos almacenados (7):**
  - `sp_RealizarCompra`
  - `sp_AgregarDetalleCompra`
  - `sp_CancelarCompra`
  - `sp_AgregarProducto`
  - `sp_BajaProducto`
  - `sp_ActivarProducto`
  - `sp_ModificarProducto`
- **Triggers (2):**
  - `tr_ActualizarStock_Descontar` (`AFTER INSERT ON Detalle_Compra`)
  - `tr_ActualizarStock_Devolver` (`AFTER UPDATE ON Compras`, cuando cambia a estado Cancelado `3`)
- **Datos iniciales:** Estados (`Comprado`, `Pendiente`, `Cancelado`) y categorías base en `Tipo`.

## 6. Endpoints de la API (`http://localhost:8080/api`)
- **Productos (`/api/Productos`):**
  - `GET /Productos?texto=&valor=` — Lista productos con filtros opcionales.
  - `GET /Categorias` — Lista categorías (`Tipo`).
  - `POST /guardar` — Crea un producto nuevo (`multipart/form-data` con imagen).
  - `PUT /modificar` — Modifica un producto existente (JSON).
  - `DELETE /eliminar?codigo=` — Baja lógica de un producto.
  - `PUT /activar?codigo=` — Reactivación de un producto.
  - `POST /RealizarCompra` — Registra una compra y su detalle (JSON).
- **Compras (`/api/Compras`):**
  - `GET /Compras` — Historial de compras.
  - `POST /cancelar` — Cancela una compra por `idCompra`.
- **Detalle de Compras (`/api/DetalleCompras`):**
  - `GET /VerDetalle/{idCompra}` — Detalle de ítems de una compra.

## 7. Cómo ejecutar el proyecto localmente
1. **Requisitos previos:** Java (JDK 17+), Maven (o `./mvnw`), MySQL Server y un servidor local para el frontend (ej. Live Server en VS Code, necesario para ES Modules).
2. **Importar la base de datos:** Ejecutar `CarritoComprasBD.sql` en MySQL.
3. **Configurar credenciales:** Abrir `backend/src/main/resources/application.properties` y completar con los datos locales de MySQL:
   - `spring.datasource.url` (host, puerto y base `CarritoComprasDB`)
   - `spring.datasource.username`
   - `spring.datasource.password`
4. **Levantar el backend:**
   - Desde `backend/`, ejecutar `./mvnw spring-boot:run` (o `mvnw.cmd spring-boot:run` en Windows).
   - El servidor queda escuchando en `http://localhost:8080`.
5. **Abrir el frontend:**
   - Abrir `frontend/Productos.html` con Live Server (o similar) en el navegador.
