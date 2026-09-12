package com.carrito.backend.Negocio;

import java.util.ArrayList;

import com.carrito.backend.DAO.DaoProductos;
import com.carrito.backend.Entidades.Productos;

public class NegocioProductos {

    DaoProductos daoProductos = new DaoProductos();

    public NegocioProductos() {

    }

    public ArrayList<Productos> obtenerProductos() {
        return daoProductos.obtenerTablaProductos();
    }

}
