package com.carrito.backend.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrito.backend.Negocio.NegocioCompras;
import org.springframework.web.bind.annotation.GetMapping;
import com.carrito.backend.Entidades.Compras;

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

}
