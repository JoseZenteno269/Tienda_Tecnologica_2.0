package com.carrito.backend.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.carrito.backend.Negocio.NegocioDetalleCompras;
import com.carrito.backend.DTOs.DetalleComprasResponse;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DetalleComprasController {

    @Autowired
    private NegocioDetalleCompras negocioDetalleCompras;

    @GetMapping("VerDetalle/{idCompra}")
    public ResponseEntity<ArrayList<DetalleComprasResponse>> obtenerTablaDetalleCompras(
            @PathVariable("idCompra") int idcompra) {
        ArrayList<DetalleComprasResponse> lista = negocioDetalleCompras.obtenerTablaDetalleCompras(idcompra);
        return ResponseEntity.ok(lista);
    }

}
