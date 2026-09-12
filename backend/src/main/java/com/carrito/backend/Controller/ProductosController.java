package com.carrito.backend.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.carrito.backend.Negocio.NegocioProductos;
import com.carrito.backend.Entidades.Productos;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductosController {

    private NegocioProductos negocioProductos = new NegocioProductos();

    @GetMapping("/Productos")
    public ResponseEntity<ArrayList<Productos>> obtenerProductos() {
        ArrayList<Productos> lista = negocioProductos.obtenerProductos();
        return ResponseEntity.ok(lista);
    }

}
