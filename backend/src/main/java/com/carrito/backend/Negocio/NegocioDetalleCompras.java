package com.carrito.backend.Negocio;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import com.carrito.backend.DAO.DaoDetalleCompras;
import com.carrito.backend.DTOs.DetalleComprasResponse;

@Service
public class NegocioDetalleCompras {

    private final DaoDetalleCompras daoDetalleCompras;

    public NegocioDetalleCompras(DaoDetalleCompras daoDetalleCompras) {
        this.daoDetalleCompras = daoDetalleCompras;
    }

    public ArrayList<DetalleComprasResponse> obtenerTablaDetalleCompras(int idcompra) {
        return daoDetalleCompras.obtenerTablaDetalleCompras(idcompra);
    }
}
