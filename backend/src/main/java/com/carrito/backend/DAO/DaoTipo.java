package com.carrito.backend.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrito.backend.Entidades.Tipo;

@Repository
public class DaoTipo {

    @Autowired
    private Datos datos;

    public DaoTipo() {

    }

    public ArrayList<Tipo> obtenerTipos() {
        String consulta = "SELECT IdTipo_T, Codigo_T, Tipo_T FROM Tipo";
        ArrayList<Tipo> aTipo = new ArrayList<>();

        try (
                Connection connection = datos.obtenerConexion();
                PreparedStatement preparedStatement = connection.prepareStatement(consulta);
                ResultSet resultSet = preparedStatement.executeQuery();) {

            while (resultSet.next()) {
                Tipo tipo = new Tipo();
                tipo.setIdTipo(resultSet.getInt("IdTipo_T"));
                tipo.setCodigo(resultSet.getString("Codigo_T"));
                tipo.setTipo(resultSet.getString("Tipo_T"));
                aTipo.add(tipo);
            }

            return aTipo;
        } catch (SQLException e) {
            e.printStackTrace();
            return aTipo;
        }
    }
}
