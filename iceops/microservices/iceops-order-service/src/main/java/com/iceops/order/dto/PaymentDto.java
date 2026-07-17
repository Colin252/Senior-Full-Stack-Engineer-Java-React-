package com.iceops.order.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentDto {

    private Long id;
    private BigDecimal amount;
    private String status;

}