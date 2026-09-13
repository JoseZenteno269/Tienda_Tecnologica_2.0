package com.carrito.backend.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.carrito.backend.Negocio.NegocioProductos;
import com.carrito.backend.Entidades.Productos;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductosController {

    @Autowired
    private NegocioProductos negocioProductos;

    @GetMapping("/Productos")
    public ResponseEntity<ArrayList<Productos>> obtenerProductos() {
        ArrayList<Productos> lista = negocioProductos.obtenerProductos();
        return ResponseEntity.ok(lista);
    }

}
