package com.carrito.backend.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrito.backend.Entidades.Compras;

@Repository
public class DaoCompras {

    @Autowired
    private Datos datos;

    public DaoCompras() {

    }

    public ArrayList<Compras> obtenerTablaCompras() {
        String consulta = "SELECT IdCompra_C, Fecha_C, Estado_E, Total_C FROM Compras c INNER JOIN Estados e ON c.IdEstado_C = e.IdEstado_E";

        ArrayList<Compras> aCompras = new ArrayList<>();

        try (
                Connection connection = datos.obtenerConexion();
                PreparedStatement preparedStatement = connection.prepareStatement(consulta);
                ResultSet resultSet = preparedStatement.executeQuery();) {
            while (resultSet.next()) {
                Compras compras = new Compras();
                compras.setIdCompra(resultSet.getInt("IdCompra_C"));
                compras.setFecha(resultSet.getDate("Fecha_C").toLocalDate());
                compras.setEstado(resultSet.getString("Estado_E"));
                compras.setTotal(resultSet.getDouble("Total_C"));
                aCompras.add(compras);
            }

            return aCompras;
        } catch (SQLException e) {
            e.printStackTrace();
            return aCompras;
        }
    }

    public Boolean cancelarCompra(Compras compras) {
        Object[] parametros = { compras.getIdCompra() };
        return datos.EjecutarProcedimientoAlmacenado("CALL sp_CancelarCompra(?)", parametros, false) != 0;
    }

}
