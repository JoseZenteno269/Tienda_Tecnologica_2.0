package com.carrito.backend.Negocio;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.carrito.backend.DAO.DaoCompras;
import com.carrito.backend.Entidades.Compras;

@Service
public class NegocioCompras {

    @Autowired
    private DaoCompras daoCompras;

    public NegocioCompras() {

    }

    public ArrayList<Compras> obtenerTablaCompras() {
        return daoCompras.obtenerTablaCompras();
    }

    public Boolean cancelarCompra(int idcompra) {
        Compras compras = new Compras();
        compras.setIdCompra(idcompra);

        return daoCompras.cancelarCompra(compras);
    }
}
