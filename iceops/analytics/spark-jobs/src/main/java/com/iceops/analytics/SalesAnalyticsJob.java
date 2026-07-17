package com.iceops.analytics;

import org.apache.spark.sql.*;

import static org.apache.spark.sql.functions.*;

public class SalesAnalyticsJob {

    public static void main(String[] args) {

        SparkSession spark = SparkSession.builder()
                .appName("ICEOPS Analytics")
                .master("local[*]")
                .getOrCreate();

        // Leer desde MySQL (base correcta del microservicio)
        Dataset<Row> orders = spark.read()
                .format("jdbc")
                .option("url", "jdbc:mysql://localhost:3306/iceops_orders")
                .option("dbtable", "orders")
                .option("user", "root")
                .option("password", "123456")
                .option("driver", "com.mysql.cj.jdbc.Driver")
                .load();

        // Mostrar esquema para validar
        orders.printSchema();

        // Ejemplo 1: ventas por usuario
        Dataset<Row> salesByUser = orders
                .filter(col("user_id").isNotNull)
                .groupBy("user_id")
                .agg(
                        count("*").alias("total_orders")
                );

        salesByUser.show();

        // Ejemplo 2: ventas por fecha (si existe created_at)
        if (orders.columns().length > 0) {

            Dataset<Row> revenueByDate = orders
                    .filter(col("created_at").isNotNull)
                    .groupBy(to_date(col("created_at")).alias("date"))
                    .agg(count("*").alias("orders_count"));

            revenueByDate.show();
        }

        spark.stop();
    }
}