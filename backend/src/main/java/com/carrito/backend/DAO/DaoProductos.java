package com.carrito.backend.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrito.backend.Entidades.Productos;

@Repository
public class DaoProductos {

    @Autowired
    private Datos datos;

    public DaoProductos() {

    }

    public ArrayList<Productos> obtenerTablaProductos() {
        String consulta = "SELECT Codigo_P, Nombre_P, Descripcion_P, Tipo_T, Precio_P, Stock_P, Imagen_P FROM Productos p INNER JOIN Tipo t ON p.IdTipo_P = t.IdTipo_T";

        ArrayList<Productos> aProductos = new ArrayList<>();

        try (
                Connection connection = datos.obtenerConexion();
                PreparedStatement preparedStatement = connection.prepareStatement(consulta);
                ResultSet resultSet = preparedStatement.executeQuery();) {

            while (resultSet.next()) {
                Productos productos = new Productos();
                productos.setCodigo(resultSet.getString("Codigo_P"));
                productos.setNombre(resultSet.getString("Nombre_P"));
                productos.setDescripcion(resultSet.getString("Descripcion_P"));
                productos.setTipo(resultSet.getString("Tipo_T"));
                productos.setPrecio(resultSet.getDouble("Precio_P"));
                productos.setStock(resultSet.getInt("Stock_P"));
                productos.setImagen(resultSet.getString("Imagen_P"));

                aProductos.add(productos);
            }

            return aProductos;

        } catch (SQLException e) {
            e.printStackTrace();
            return aProductos;
        }
    }

}
