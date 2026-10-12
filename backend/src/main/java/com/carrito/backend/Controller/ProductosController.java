package com.carrito.backend.Controller;

import org.springframework.web.multipart.MultipartFile;

import com.carrito.backend.Negocio.*;
import com.carrito.backend.DTOs.CarriroRequest;
import com.carrito.backend.DTOs.ProductosRequest;
import com.carrito.backend.Entidades.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Productos")
@CrossOrigin(origins = "*")
public class ProductosController {

    @Autowired
    private NegocioProductos negocioProductos;

    @Autowired
    private NegocioTipo negocioTipo;

    private final Path carpetaDestino = Paths.get("frontend", "Imagenes");

    @GetMapping("Productos")
    public ResponseEntity<ArrayList<Productos>> obtenerProductos(
            @RequestParam(name = "texto", required = false, defaultValue = "") String texto,
            @RequestParam(name = "valor", required = false, defaultValue = "0") Integer valor) {
        ArrayList<Productos> lista = negocioProductos.obtenerProductos(texto, valor);
        return ResponseEntity.ok(lista);
    }

    @PostMapping("RealizarCompra")
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

        return ResponseEntity.badRequest().body(Map.of("mensaje", "Error al procesar la compra"));
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

    @GetMapping("Categorias")
    public ResponseEntity<ArrayList<Tipo>> obtenerTipos() {
        ArrayList<Tipo> lista = negocioTipo.obtenerTipos();
        return ResponseEntity.ok(lista);
    }

    @PostMapping("guardar")
    public ResponseEntity<?> agregarProductos(@ModelAttribute ProductosRequest request) {

        MultipartFile imagen = request.getImagen();

        if (imagen == null || imagen.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "La imagen es Obligatoria"));
        }

        try {
            String nombreArchivo = Paths.get(imagen.getOriginalFilename()).getFileName().toString();

            if (!Files.exists(carpetaDestino)) {
                Files.createDirectories(carpetaDestino);
            }

            Path rutaImagenes = carpetaDestino.resolve(nombreArchivo);
            Files.copy(imagen.getInputStream(), rutaImagenes, StandardCopyOption.REPLACE_EXISTING);

            String ruta = "Imagenes\\" + nombreArchivo;

            if (negocioProductos.agregarProductos(request.getCodigo(), request.getNombre(), request.getDescripcion(),
                    request.getPrecio(), request.getIdTipo(), request.getStock(), ruta)) {
                return ResponseEntity.ok(Map.of("mensaje", "Producto agregado correctamente"));
            }

            return ResponseEntity.badRequest().body(Map.of("mensaje", "Ocurrio un error al cargar el producto"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("mensaje", "Ocurrió un error interno en el servidor al procesar la solicitud"));
        }

    }

}
