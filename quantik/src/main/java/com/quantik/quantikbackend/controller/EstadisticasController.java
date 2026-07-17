package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.ClienteEntity;
import com.quantik.quantikbackend.entity.Venta;
import com.quantik.quantikbackend.repository.ClienteRepository;
import com.quantik.quantikbackend.repository.VentaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/estadisticas")
@CrossOrigin(origins = "http://localhost:3000")
public class EstadisticasController {

    private final ClienteRepository clienteRepository;
    private final VentaRepository ventaRepository;

    public EstadisticasController(ClienteRepository clienteRepository, VentaRepository ventaRepository) {
        this.clienteRepository = clienteRepository;
        this.ventaRepository = ventaRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getEstadisticas() {
        long totalClientes = clienteRepository.count();
        List<Venta> ventas = ventaRepository.findAll();

        // 🔹 Ahora usamos getTotal() en lugar de getMonto()
        double totalVentas = ventas.stream()
                .filter(v -> v.getTotal() != null)
                .mapToDouble(Venta::getTotal)
                .sum();

        double promedioVentas = ventas.isEmpty() ? 0 :
                ventas.stream()
                        .filter(v -> v.getTotal() != null)
                        .mapToDouble(Venta::getTotal)
                        .average()
                        .orElse(0);

        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("totalClientes", totalClientes);
        estadisticas.put("totalVentas", totalVentas);
        estadisticas.put("promedioVentas", promedioVentas);

        return ResponseEntity.ok(estadisticas);
    }
}
