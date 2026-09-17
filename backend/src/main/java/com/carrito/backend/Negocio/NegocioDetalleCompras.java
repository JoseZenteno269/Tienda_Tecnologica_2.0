package com.carrito.backend.Negocio;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.carrito.backend.DAO.DaoDetalleCompras;
import com.carrito.backend.DTOs.DetalleComprasResponse;

@Service
public class NegocioDetalleCompras {

    @Autowired
    private DaoDetalleCompras daoDetalleCompras;

    public NegocioDetalleCompras() {

    }

    public ArrayList<DetalleComprasResponse> obtenerTablaDetalleCompras(int idcompra) {
        return daoDetalleCompras.obtenerTablaDetalleCompras(idcompra);
    }
}
