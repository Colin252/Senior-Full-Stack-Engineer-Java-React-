package com.quantik.quantikbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BalanceResponse {
    private double totalIngresos;
    private double totalGastos;
    private double balanceFinal;
}
