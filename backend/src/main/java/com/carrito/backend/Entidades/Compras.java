package com.carrito.backend.Entidades;

import java.time.LocalDate;

public class Compras {

    private int idcompra;
    private LocalDate fecha;
    private int idestado;
    private double total;
    private String estado;

    public Compras() {
        idcompra = 0;
        fecha = LocalDate.of(1999, 1, 1);
        idestado = 0;
        total = 0;
        estado = "Sin Definir";
    }

    public Compras(int idcompra, LocalDate fecha, int idestado, double total, String estado) {
        this.idcompra = idcompra;
        this.fecha = fecha;
        this.idestado = idestado;
        this.total = total;
        this.estado = estado;
    }

    public int getIdCompra() {
        return idcompra;
    }

    public void setIdCompra(int idcompra) {
        this.idcompra = idcompra;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public int getIdEstado() {
        return idestado;
    }

    public void setIdEstado(int idestado) {
        this.idestado = idestado;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
