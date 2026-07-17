package com.quantik.quantikbackend.dto;

import java.time.LocalDate;

public class IngresoRequest {
    private String descripcion;
    private double monto;
    private String categoria;
    private LocalDate fecha;

    // Getters y setters
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public double getMonto() { return monto; }
    public void setMonto(double monto) { this.monto = monto; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
}
