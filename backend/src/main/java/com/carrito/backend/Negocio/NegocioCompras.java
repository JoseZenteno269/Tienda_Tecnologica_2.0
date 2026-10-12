package com.carrito.backend.Negocio;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import com.carrito.backend.DAO.DaoCompras;
import com.carrito.backend.Entidades.Compras;

@Service
public class NegocioCompras {

    private final DaoCompras daoCompras;

    public NegocioCompras(DaoCompras daoCompras) {
        this.daoCompras = daoCompras;
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
