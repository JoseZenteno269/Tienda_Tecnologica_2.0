package com.carrito.backend.Negocio;

import java.util.ArrayList;
import org.springframework.stereotype.Service;
import com.carrito.backend.DAO.DaoProductos;
import com.carrito.backend.Entidades.Productos;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class NegocioProductos {

    @Autowired
    private DaoProductos daoProductos;

    public NegocioProductos() {

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

        if (!daoProductos.existeProducto(productos)) {
            return daoProductos.agregarProductos(productos);
        }

        return false;
    }

}
