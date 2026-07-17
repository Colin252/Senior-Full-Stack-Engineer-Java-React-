package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.dto.VentaRequest;
import com.quantik.quantikbackend.dto.VentaResponse;
import com.quantik.quantikbackend.service.VentaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "http://localhost:3000")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping
    public ResponseEntity<VentaResponse> crearVenta(@RequestBody VentaRequest req) {
        return ResponseEntity.ok(ventaService.crearVenta(req));
    }

    @GetMapping
    public ResponseEntity<List<VentaResponse>> listarVentas() {
        return ResponseEntity.ok(ventaService.listarVentas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VentaResponse> obtenerVentaPorId(@PathVariable Long id) {
        return ventaService.obtenerVentaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<VentaResponse> actualizarVenta(
            @PathVariable Long id,
            @RequestBody VentaRequest req
    ) {
        return ResponseEntity.ok(ventaService.actualizarVenta(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVenta(@PathVariable Long id) {
        ventaService.eliminarVenta(id);
        return ResponseEntity.noContent().build();
    }
}
