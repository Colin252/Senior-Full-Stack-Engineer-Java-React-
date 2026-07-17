package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Transaccion;
import com.quantik.quantikbackend.service.TransaccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacciones")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransaccionService transactionService;

    public TransactionController(TransaccionService transactionService) {
        this.transactionService = transactionService;
    }

    // Crear
    @PostMapping
    public ResponseEntity<Transaccion> crearTransaccion(@RequestBody Transaccion t) {
        return ResponseEntity.ok(transactionService.crearTransaccion(t));
    }

    // Listar
    @GetMapping
    public ResponseEntity<List<Transaccion>> listarTransacciones() {
        return ResponseEntity.ok(transactionService.listarTransacciones());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Transaccion> obtenerTransaccionPorId(@PathVariable Long id) {
        return transactionService.obtenerTransaccionPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Transaccion> actualizarTransaccion(
            @PathVariable Long id,
            @RequestBody Transaccion t) {
        return ResponseEntity.ok(transactionService.actualizarTransaccion(id, t));
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransaccion(@PathVariable Long id) {
        transactionService.eliminarTransaccion(id);
        return ResponseEntity.noContent().build();
    }
}
