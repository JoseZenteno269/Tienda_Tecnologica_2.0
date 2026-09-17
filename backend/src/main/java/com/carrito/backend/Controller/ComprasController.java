package com.carrito.backend.Controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrito.backend.Negocio.NegocioCompras;
import org.springframework.web.bind.annotation.GetMapping;

import com.carrito.backend.DTOs.CancelarCompraRequest;
import com.carrito.backend.Entidades.Compras;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ComprasController {

    @Autowired
    private NegocioCompras negocioCompras;

    @GetMapping("Compras")
    public ResponseEntity<ArrayList<Compras>> obtenerTablaCompras() {
        ArrayList<Compras> lista = negocioCompras.obtenerTablaCompras();
        return ResponseEntity.ok(lista);
    }

    @PostMapping("cancelar")
    public ResponseEntity<?> cancelarCompra(@RequestBody CancelarCompraRequest request) {

        if (negocioCompras.cancelarCompra(request.getIdCompra())) {
            return ResponseEntity.ok(Map.of("mensaje", "Compra cancelada con exito"));
        }

        return ResponseEntity.badRequest().body(Map.of("mensaje", "Error al cancelar la compra"));
    }

}
