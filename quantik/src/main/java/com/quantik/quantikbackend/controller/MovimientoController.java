package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Transaccion;
import com.quantik.quantikbackend.repository.TransaccionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "http://localhost:3000")
public class MovimientoController {

    private final TransaccionRepository transaccionRepository;

    public MovimientoController(TransaccionRepository transaccionRepository) {
        this.transaccionRepository = transaccionRepository;
    }

    // 👉 Lista todos los movimientos
    @GetMapping
    public ResponseEntity<List<Transaccion>> listarMovimientos() {
        return ResponseEntity.ok(transaccionRepository.findAll());
    }

    // 👉 Obtener movimiento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Transaccion> obtenerMovimiento(@PathVariable Long id) {
        return transaccionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 👉 Crear movimiento
    @PostMapping
    public ResponseEntity<Transaccion> crearMovimiento(@RequestBody Transaccion movimiento) {
        return ResponseEntity.ok(transaccionRepository.save(movimiento));
    }

    // 👉 Actualizar movimiento
    @PutMapping("/{id}")
    public ResponseEntity<Transaccion> actualizarMovimiento(
            @PathVariable Long id,
            @RequestBody Transaccion movimiento) {

        return transaccionRepository.findById(id).map(m -> {
            m.setTipo(movimiento.getTipo());
            m.setMonto(movimiento.getMonto());
            m.setFecha(movimiento.getFecha());
            return ResponseEntity.ok(transaccionRepository.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 👉 Eliminar movimiento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMovimiento(@PathVariable Long id) {
        if (transaccionRepository.existsById(id)) {
            transaccionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 👉 Resumen de movimientos
    @GetMapping("/resumen")
    public ResponseEntity<Map<String, Object>> resumenMovimientos() {
        List<Transaccion> transacciones = transaccionRepository.findAll();

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
