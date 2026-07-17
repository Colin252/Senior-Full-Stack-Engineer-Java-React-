package com.icebank.icebankbackend.service;

import com.icebank.icebankbackend.entity.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContabilidadService {

    private final TransactionService transactionService;

    // 📘 Libro Diario: lista todas las transacciones ordenadas por fecha
    public List<Transaction> getLibroDiario() {
        return transactionService.getAll()
                .stream()
                .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
                .toList();
    }

    // 📒 Libro Mayor: agrupa movimientos por cuenta bancaria
    public Map<String, List<Transaction>> getLibroMayor() {
        return transactionService.getAll()
                .stream()
                .collect(Collectors.groupingBy(t -> t.getAccount().getAccountNumber()));
    }

    // 📊 Estado de Resultados: ingresos - gastos
    public Map<String, Object> getEstadoResultados() {
        double ingresos = transactionService.getTotal("CREDIT");
        double gastos   = transactionService.getTotal("DEBIT");

        return Map.of(
                "ingresos", ingresos,
                "gastos", gastos,
                "utilidad", ingresos - gastos
        );
    }

    // 📈 Resumen: ingresos y gastos por mes
    public Map<String, Object> getResumen() {

        List<Transaction> movimientos = transactionService.getAll();

        Map<String, Double> ingresosPorMes = movimientos.stream()
                .filter(t -> t.getType().equalsIgnoreCase("CREDIT"))
                .collect(Collectors.groupingBy(
                        t -> t.getDate().getMonth().toString(),
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        Map<String, Double> gastosPorMes = movimientos.stream()
                .filter(t -> t.getType().equalsIgnoreCase("DEBIT"))
                .collect(Collectors.groupingBy(
                        t -> t.getDate().getMonth().toString(),
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        return Map.of(
                "ingresosPorMes", ingresosPorMes,
                "gastosPorMes", gastosPorMes
        );
    }
}
