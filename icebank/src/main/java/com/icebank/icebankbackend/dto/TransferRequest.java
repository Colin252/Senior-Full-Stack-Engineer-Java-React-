package com.icebank.icebankbackend.dto;

import lombok.Data;

@Data
public class TransferRequest {
    private String from;
    private String to;
    private double amount;
}
