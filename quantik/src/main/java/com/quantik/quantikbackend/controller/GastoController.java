package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Gasto;
import com.quantik.quantikbackend.service.GastoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gastos")
@CrossOrigin(origins = "http://localhost:3000")
public class GastoController {

    private final GastoService gastoService;

    public GastoController(GastoService gastoService) {
        this.gastoService = gastoService;
    }

    // Crear
    @PostMapping
    public ResponseEntity<Gasto> crearGasto(@RequestBody Gasto g) {
        return ResponseEntity.ok(gastoService.crearGasto(g));
    }

    // Listar
    @GetMapping
    public ResponseEntity<List<Gasto>> listarGastos() {
        return ResponseEntity.ok(gastoService.listarGastos());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Gasto> obtenerGastoPorId(@PathVariable Long id) {
        return gastoService.obtenerGastoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Gasto> actualizarGasto(@PathVariable Long id, @RequestBody Gasto g) {
        return ResponseEntity.ok(gastoService.actualizarGasto(id, g));
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarGasto(@PathVariable Long id) {
        gastoService.eliminarGasto(id);
        return ResponseEntity.noContent().build();
    }
}
