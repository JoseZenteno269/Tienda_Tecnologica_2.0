package com.carrito.backend.Entidades;

public class DetalleCompras {
    private int idcompra;
    private String idproducto;
    private int cantidad;
    private double precio;

    public DetalleCompras() {
        idcompra = 0;
        idproducto = "Sin definir";
        cantidad = 0;
        precio = 0;
    }

    public DetalleCompras(int idcompra, String idproducto, int cantidad, double precio) {
        this.idcompra = idcompra;
        this.idproducto = idproducto;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    public int getIdCompra() {
        return idcompra;
    }

    public void setIdCompra(int idcompra) {
        this.idcompra = idcompra;
    }

    public String getIdProducto() {
        return idproducto;
    }

    public void setIdCompra(String idproducto) {
        this.idproducto = idproducto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }
}
