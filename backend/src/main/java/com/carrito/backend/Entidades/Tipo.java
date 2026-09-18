package com.carrito.backend.Entidades;

public class Tipo {
    private int idtipo;
    private String codigo;
    private String tipo;

    public Tipo() {
        idtipo = 0;
        codigo = "Sin definir";
        tipo = "Sin definir";
    }

    public int getIdTipo() {
        return idtipo;
    }

    public void setIdTipo(int idtipo) {
        this.idtipo = idtipo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
