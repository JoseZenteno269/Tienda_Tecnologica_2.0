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

}
