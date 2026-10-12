package com.carrito.backend.Negocio;

import org.springframework.stereotype.Service;

import com.carrito.backend.DAO.DaoTipo;

import java.util.*;
import com.carrito.backend.Entidades.Tipo;

@Service
public class NegocioTipo {

    private final DaoTipo daoTipo;

    public NegocioTipo(DaoTipo daoTipo) {
        this.daoTipo = daoTipo;
    }

    public ArrayList<Tipo> obtenerTipos() {
        return daoTipo.obtenerTipos();
    }
}
