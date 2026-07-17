package com.quantik.quantikbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VentaRequest {
    private Long clienteId;
    private Long productoId;
    private Integer cantidad;
    private Double total;
}
