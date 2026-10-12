package com.carrito.backend.DTOs;

import org.springframework.web.multipart.MultipartFile;

public class ProductosRequest {

    private String codigo;
    private String nombre;
    private String descripcion;
    private int idtipo;
    private double precio;
    private int stock;
    private MultipartFile imagen;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getIdTipo() {
        return idtipo;
    }

    public void setIdTipo(int idtipo) {
        this.idtipo = idtipo;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public MultipartFile getImagen() {
        return imagen;
    }

    public void setImagen(MultipartFile imagen) {
        this.imagen = imagen;
    }

}
