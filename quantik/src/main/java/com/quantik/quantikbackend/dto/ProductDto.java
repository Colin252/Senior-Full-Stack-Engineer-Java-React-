// src/main/java/com/quantik/quantikbackend/dto/ProductoDto.java
package com.quantik.quantikbackend.dto;

import lombok.Getter; import lombok.Setter;

@Getter @Setter
public class ProductDto {
    public String codigo;
    public String descripcion;
    public Double precio;
    public Integer stock;
}
