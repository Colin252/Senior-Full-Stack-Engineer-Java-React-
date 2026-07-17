package com.icebank.icebankbackend.service;

import com.icebank.icebankbackend.entity.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FinanzasService {

    private final TransactionService transactionService;

    public Map<String, Object> getBalance() {
        double ingresos = transactionService.getTotal("CREDIT");
        double gastos   = transactionService.getTotal("DEBIT");
        double balance  = ingresos - gastos;

        return Map.of(
                "ingresos", ingresos,
                "gastos", gastos,
                "balance", balance
        );
    }

    public List<Transaction> getIngresos() {
        return transactionService.getList("CREDIT");
    }

    public List<Transaction> getGastos() {
        return transactionService.getList("DEBIT");
    }

    public List<Transaction> getReportes() {
        return transactionService.getAll();
    }
}
