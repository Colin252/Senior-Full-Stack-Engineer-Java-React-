package com.quantik.quantikbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "facturas")
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private LocalDate fecha;
    private Double montoTotal;

    // ➕ campos manuales opcionales
    private String correoManual;
    private String empresa;
    private String direccion;
    private String metodoPago;
    private String notas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    @JsonIgnoreProperties({"facturas", "hibernateLazyInitializer", "handler"})
    private ClienteEntity cliente;

    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"factura", "hibernateLazyInitializer", "handler"})
    private List<Producto> productos;
}
