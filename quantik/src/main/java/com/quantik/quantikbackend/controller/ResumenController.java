package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Transaccion;
import com.quantik.quantikbackend.repository.TransaccionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resumen")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumenController {

    private final TransaccionRepository transaccionRepository;

    public ResumenController(TransaccionRepository transaccionRepository) {
        this.transaccionRepository = transaccionRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getResumen() {
        List<Transaccion> movimientos = transaccionRepository.findAll();

        double totalIngresos = movimientos.stream()
                .filter(m -> m.getTipo() != null && m.getTipo().equalsIgnoreCase("INGRESO"))
                .mapToDouble(Transaccion::getMonto)
                .sum();

        double totalGastos = movimientos.stream()
                .filter(m -> m.getTipo() != null && m.getTipo().equalsIgnoreCase("GASTO"))
                .mapToDouble(Transaccion::getMonto)
                .sum();

        double balance = totalIngresos - totalGastos;

        Map<String, Object> resumen = new HashMap<>();
        resumen.put("totalIngresos", totalIngresos);
        resumen.put("totalGastos", totalGastos);
        resumen.put("balance", balance);

        return ResponseEntity.ok(resumen);
    }
}
