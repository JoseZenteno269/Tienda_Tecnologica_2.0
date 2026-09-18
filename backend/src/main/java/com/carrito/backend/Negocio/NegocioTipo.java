package com.carrito.backend.Negocio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrito.backend.DAO.DaoTipo;

import java.util.*;
import com.carrito.backend.Entidades.Tipo;

@Service
public class NegocioTipo {

    @Autowired
    private DaoTipo daoTipo;

    public NegocioTipo() {

    }

    public ArrayList<Tipo> obtenerTipos() {
        return daoTipo.obtenerTipos();
    }
}
