package com.carrito.backend.Negocio;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.carrito.backend.DAO.DaoProductos;
import com.carrito.backend.Entidades.Productos;

@Service
public class NegocioProductos {
    @Autowired
    private DaoProductos daoProductos;

    public NegocioProductos(DaoProductos daoProductos) {
        this.daoProductos = daoProductos;
    }

    public ArrayList<Productos> obtenerProductos(String texto, Integer valor) {
        return daoProductos.obtenerTablaProductos(texto, valor);
    }

    public Boolean validarStock(String codigo, int cantidad) {
        Productos productos = new Productos();

        productos.setCodigo(codigo);
        productos.setStock(cantidad);

        return daoProductos.validarStock(productos) == 1;
    }

    public int agregarCompra(int idestado, double total) {
        return daoProductos.agregarCompra(idestado, total);
    }

    public String obtenerIdProducto(String codigo) {
        return daoProductos.obtenerIdProducto(codigo);
    }

    public Boolean agregarDetalle(int idcompra, String idproducto, int cantidad, double precio) {
        return daoProductos.agregarDetalle(idcompra, idproducto, cantidad, precio);
    }

    public boolean agregarProductos(String codigo, String nombre, String descripcion, double precio, int idtipo,
            int stock, String imagen) {

        Productos productos = new Productos();

        productos.setCodigo(codigo);
        productos.setNombre(nombre);
        productos.setDescripcion(descripcion);
        productos.setPrecio(precio);
        productos.setIdtipo(idtipo);
        productos.setStock(stock);
        productos.setImagen(imagen);

        if (daoProductos.existeProducto(productos) == false) {
            return daoProductos.agregarProductos(productos);
        }

        return false;
    }

    public boolean existeProducto(String codigo) {
        if (codigo == null || codigo.isBlank()) {
            return false;
        }

        Productos productos = new Productos();
        productos.setCodigo(codigo.trim());

        return daoProductos.existeProducto(productos);
    }

    public boolean estaActivo(String codigo) {
        if (codigo == null || codigo.isBlank()) {
            return false;
        }

        Productos productos = new Productos();
        productos.setCodigo(codigo.trim());

        return daoProductos.estaActivo(productos);
    }

    public Boolean bajaProducto(String codigo) {
        if (codigo == null || codigo.isBlank()) {
            return false;
        }

        Productos productos = new Productos();
        productos.setCodigo(codigo.trim());

        return daoProductos.bajaProducto(productos);
    }

    public Boolean reactivarProducto(String codigo) {
        if (codigo == null || codigo.isBlank()) {
            return false;
        }

        Productos productos = new Productos();
        productos.setCodigo(codigo.trim());
        return daoProductos.activarProducto(productos);
    }

    public Boolean modificarProducto(String codigo, String nombre, String descripcion, int idtipo, double precio,
            int stock) {

        // Validacion de respaldo por si se llama desde otro lugar que no sea el
        // controller
        if (codigo == null || codigo.isBlank() || nombre == null || nombre.isBlank() || descripcion == null
                || descripcion.isBlank() || idtipo <= 0 || precio <= 0 || stock < 0) {
            return false;
        }

        Productos productos = new Productos();
        productos.setCodigo(codigo.trim());
        productos.setNombre(nombre.trim());
        productos.setDescripcion(descripcion.trim());
        productos.setIdtipo(idtipo);
        productos.setPrecio(Math.round(precio * 100.0) / 100.0);
        productos.setStock(stock);

        return daoProductos.modificarProducto(productos);
    }

}
