package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Transaccion;
import com.quantik.quantikbackend.service.TransaccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resumen-movimientos")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumenMovimientosController {

    private final TransaccionService transaccionService;

    public ResumenMovimientosController(TransaccionService transaccionService) {
        this.transaccionService = transaccionService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getResumen() {
        List<Transaccion> transacciones = transaccionService.listarTransacciones();

        double ingresos = transacciones.stream()
                .filter(t -> "INGRESO".equalsIgnoreCase(t.getTipo()))
                .mapToDouble(Transaccion::getMonto)
                .sum();

        double gastos = transacciones.stream()
                .filter(t -> "GASTO".equalsIgnoreCase(t.getTipo()))
                .mapToDouble(Transaccion::getMonto)
                .sum();

        double balance = ingresos - gastos;

        Map<String, Object> resumen = new HashMap<>();
        resumen.put("ingresos", ingresos);
        resumen.put("gastos", gastos);
        resumen.put("balance", balance);

        return ResponseEntity.ok(resumen);
    }
}
