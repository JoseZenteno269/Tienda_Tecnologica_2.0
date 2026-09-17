package com.carrito.backend.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrito.backend.DTOs.DetalleComprasResponse;

@Repository
public class DaoDetalleCompras {

    @Autowired
    private Datos datos;

    public DaoDetalleCompras() {

    }

    public ArrayList<DetalleComprasResponse> obtenerTablaDetalleCompras(int idcompra) {
        String consulta = "SELECT Imagen_P, Codigo_P, Nombre_P, Precio_P, Cantidad_DC, (Cantidad_DC * Precio_DC) AS SubTotal FROM Productos p inner join Detalle_Compra dc ON p.IdProducto_P = dc.IdProducto_DC WHERE IdCompra_DC = ?";

        ArrayList<DetalleComprasResponse> aDetalleCompras = new ArrayList<>();

        try (
                Connection connection = datos.obtenerConexion();
                PreparedStatement preparedStatement = connection.prepareStatement(consulta);) {

            preparedStatement.setObject(1, idcompra);
            try (
                    ResultSet resultSet = preparedStatement.executeQuery();) {
                while (resultSet.next()) {
                    DetalleComprasResponse detalleCompras = new DetalleComprasResponse();
                    detalleCompras.setImagen(resultSet.getString("Imagen_P"));
                    detalleCompras.setCodigo(resultSet.getString("Codigo_P"));
                    detalleCompras.setNombre(resultSet.getString("Nombre_P"));
                    detalleCompras.setPrecio(resultSet.getDouble("Precio_P"));
                    detalleCompras.setCantidad(resultSet.getInt("Cantidad_DC"));
                    detalleCompras.setSubTotal(resultSet.getDouble("SubTotal"));
                    aDetalleCompras.add(detalleCompras);
                }
            }

            return aDetalleCompras;

        } catch (SQLException e) {
            e.printStackTrace();
            return aDetalleCompras;
        }
    }

}
