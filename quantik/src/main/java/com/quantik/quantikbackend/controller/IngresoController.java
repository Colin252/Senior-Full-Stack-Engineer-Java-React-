package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Ingreso;
import com.quantik.quantikbackend.service.IngresoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingresos")
@CrossOrigin(origins = "http://localhost:3000")
public class IngresoController {

    private final IngresoService ingresoService;

    public IngresoController(IngresoService ingresoService) {
        this.ingresoService = ingresoService;
    }

    // Crear
    @PostMapping
    public ResponseEntity<Ingreso> crearIngreso(@RequestBody Ingreso i) {
        return ResponseEntity.ok(ingresoService.crearIngreso(i));
    }

    // Listar
    @GetMapping
    public ResponseEntity<List<Ingreso>> listarIngresos() {
        return ResponseEntity.ok(ingresoService.listarIngresos());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Ingreso> obtenerIngresoPorId(@PathVariable Long id) {
        return ingresoService.obtenerIngresoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Ingreso> actualizarIngreso(@PathVariable Long id, @RequestBody Ingreso i) {
        return ResponseEntity.ok(ingresoService.actualizarIngreso(id, i));
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarIngreso(@PathVariable Long id) {
        ingresoService.eliminarIngreso(id);
        return ResponseEntity.noContent().build();
    }
}
