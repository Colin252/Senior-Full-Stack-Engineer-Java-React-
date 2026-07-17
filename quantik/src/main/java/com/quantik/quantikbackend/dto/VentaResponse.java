package com.quantik.quantikbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class VentaResponse {
    private Long id;

    private Long clienteId;
    private String clienteNombre;

    private Long productoId;
    private String productoNombre;

    private Integer cantidad;
    private Double total;
}
