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

    public ArrayList<Productos> obtenerProductos() {
        return daoProductos.obtenerTablaProductos();
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

}
