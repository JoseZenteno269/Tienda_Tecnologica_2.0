package com.carrito.backend.DAO;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class Datos {

    @Autowired
    private DataSource dataSource;

    // private String host = "jdbc:mysql://localhost:3306/";
    // private String user = "root";
    // private String password = "asusrog7";
    // private String BDname = "CarritoComprasDB";

    public Datos() {

    }

    public Connection obtenerConexion() throws SQLException {
        return dataSource.getConnection();
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

    public int EjecutarScalarInt(String consulta, Object[] parametros) {
        try (
                Connection connection = obtenerConexion();
                PreparedStatement preparedStatement = connection.prepareStatement(consulta);) {
            for (int i = 0; i < parametros.length; i++) {
                preparedStatement.setObject(i + 1, parametros[i]);
            }

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt(1);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public String EjecutarScalarString(String consulta, Object[] parametros) {
        try (
                Connection connection = obtenerConexion();
                PreparedStatement preparedStatement = connection.prepareStatement(consulta);) {
            for (int i = 0; i < parametros.length; i++) {
                preparedStatement.setObject(i + 1, parametros[i]);
            }

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getString(1);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public int EjecutarProcedimientoAlmacenado(String procedimiento, Object[] parametros, boolean scalar) {

        try (
                Connection connection = obtenerConexion();
                CallableStatement callableStatement = connection.prepareCall(procedimiento);) {

            for (int i = 0; i < parametros.length; i++) {
                callableStatement.setObject(i + 1, parametros[i]);
            }

            if (!scalar) {
                return callableStatement.executeUpdate();
            }

            boolean resultadoScalar = callableStatement.execute();

            while (!resultadoScalar && callableStatement.getUpdateCount() != -1) {
                resultadoScalar = callableStatement.getMoreResults();
            }

            if (resultadoScalar) {
                try (ResultSet resultSet = callableStatement.getResultSet()) {
                    if (resultSet.next()) {
                        return resultSet.getInt(1);
                    }
                }
            }

            return 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }

    }

}
