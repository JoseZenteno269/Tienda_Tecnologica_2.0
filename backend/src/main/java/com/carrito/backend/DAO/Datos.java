package com.carrito.backend.DAO;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Datos {

    private String host = "jdbc:mysql://localhost:3306/";
    private String user = "root";
    private String password = "asusrog7";
    private String BDname = "CarritoComprasDB";

    public Datos() {

    }

    public Connection obtenerConexion() throws SQLException {
        return DriverManager.getConnection(host + BDname, user, password);
    }

    public int ABM(String consulta, Object[] parametros) {

        try (
                Connection connection = obtenerConexion();
                PreparedStatement preparedStatement = connection.prepareStatement(consulta);) {

            for (int i = 0; i < parametros.length; i++) {
                preparedStatement.setObject(i + 1, parametros[i]);
            }

            return preparedStatement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    public Boolean EjecutarProcedimientoAlmacenado(String procedimiento, Object[] parametros) {

        try (
                Connection connection = obtenerConexion();
                CallableStatement callableStatement = connection.prepareCall(procedimiento);) {

            for (int i = 0; i < parametros.length; i++) {
                callableStatement.setObject(i + 1, parametros[i]);
            }

            return callableStatement.execute();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

}
