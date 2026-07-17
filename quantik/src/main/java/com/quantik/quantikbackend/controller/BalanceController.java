package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Venta;
import com.quantik.quantikbackend.entity.Factura;
import com.quantik.quantikbackend.repository.VentaRepository;
import com.quantik.quantikbackend.repository.FacturaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/balance")
@CrossOrigin(origins = "http://localhost:3000")
public class BalanceController {

    private final VentaRepository ventaRepository;
    private final FacturaRepository facturaRepository;

    public BalanceController(VentaRepository ventaRepository, FacturaRepository facturaRepository) {
        this.ventaRepository = ventaRepository;
        this.facturaRepository = facturaRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getBalance() {
        List<Venta> ventas = ventaRepository.findAll();
        List<Factura> facturas = facturaRepository.findAll();

        // 🔹 Ahora usamos getTotal() en lugar de getMonto()
        double totalVentas = ventas.stream()
                .filter(v -> v.getTotal() != null)
                .mapToDouble(Venta::getTotal)
                .sum();

        double totalFacturas = facturas.stream()
                .filter(f -> f.getMontoTotal() != null)
                .mapToDouble(Factura::getMontoTotal)
                .sum();

        double balanceNeto = totalVentas - totalFacturas;

        Map<String, Object> balance = new HashMap<>();
        balance.put("totalVentas", totalVentas);
        balance.put("totalFacturas", totalFacturas);
        balance.put("balanceNeto", balanceNeto);

        return ResponseEntity.ok(balance);
    }
}
