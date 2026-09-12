package com.carrito.backend.Entidades;

public class Productos {

    private String idproducto;
    private String codigo;
    private String nombre;
    private String descripcion;
    private int idtipo;
    private String tipo;
    private double precio;
    private int stock;
    private String imagen;
    private boolean activo;

    public Productos() {
        idproducto = "Sin definir";
        codigo = "Sin definir";
        nombre = "Sin definir";
        descripcion = "Sin definir";
        idtipo = 0;
        tipo = "Sin definir";
        precio = 0;
        stock = 0;
        imagen = "Sin definir";
        activo = false;
    }

    public Productos(String idproducto, String codigo, String nombre, String descripcion, int idtipo, String tipo,
            double precio,
            int stock, String imagen, boolean activo) {
        this.idproducto = idproducto;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.idtipo = idtipo;
        this.tipo = tipo;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.activo = activo;
    }

    public String getIdproducto() {
        return idproducto;
    }

    public void setIdproducto(String idproducto) {
        this.idproducto = idproducto;
    }

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

    public int getIdtipo() {
        return idtipo;
    }

    public void setIdtipo(int idtipo) {
        this.idtipo = idtipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public double getPrecio() {
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

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

}
