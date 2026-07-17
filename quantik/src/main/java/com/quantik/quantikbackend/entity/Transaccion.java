package com.quantik.quantikbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "transacciones")
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;       // INGRESO o GASTO
    private Double monto;      // Monto del movimiento
    private LocalDate fecha;   // Fecha de la transacción
}
