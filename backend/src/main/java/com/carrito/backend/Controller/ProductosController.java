package com.carrito.backend.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.carrito.backend.Negocio.NegocioProductos;
import com.carrito.backend.DTOs.CarriroRequest;
import com.carrito.backend.Entidades.Productos;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.sql.ast.tree.predicate.BooleanExpressionPredicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PostMapping("/RealizarCompra")
    public ResponseEntity<?> AgregarProducto(@RequestBody List<CarriroRequest> carrito) {

        if (validarStock(carrito)) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Producto sin Stock"));
        }

        double total = carrito.stream().mapToDouble(item -> item.getPrecio() * item.getCantidad()).sum();

        int idcompra = negocioProductos.agregarCompra(1, total);
        boolean exito = idcompra > 0;

        if (agregarDetalleCompra(carrito, exito, idcompra)) {
            return ResponseEntity.ok(Map.of("mensaje", "Compra realizado con exito"));
        }

        return ResponseEntity.badRequest().body(Map.of("mensaje", "Compra realizado con exito"));
    }

    private Boolean agregarDetalleCompra(List<CarriroRequest> carrito, boolean exito, int id) {
        if (!exito) {
            return false;
        }

        for (CarriroRequest carro : carrito) {
            String idproducto = negocioProductos.obtenerIdProducto(carro.codigo.trim());
            if (!negocioProductos.agregarDetalle(id, idproducto, carro.cantidad, carro.precio)) {
                return false;
            }
        }

        return true;
    }

    private Boolean validarStock(List<CarriroRequest> carrito) {

        for (CarriroRequest carro : carrito) {
            if (!negocioProductos.validarStock(carro.codigo.trim(), carro.cantidad)) {
                return true;
            }
        }

        return false;
    }
}
