package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Factura;
import com.quantik.quantikbackend.service.FacturaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "http://localhost:3000")
public class FacturaController {

    private final FacturaService facturaService;

    public FacturaController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    @PostMapping
    public ResponseEntity<Factura> crearFactura(@RequestBody Factura f) {
        return ResponseEntity.ok(facturaService.crearFactura(f));
    }

    @GetMapping
    public ResponseEntity<List<Factura>> listarFacturas() {
        return ResponseEntity.ok(facturaService.listarFacturas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Factura> obtenerFacturaPorId(@PathVariable Long id) {
        return facturaService.obtenerFacturaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/detalle")
    public ResponseEntity<Factura> obtenerFacturaCompleta(@PathVariable Long id) {
        return ResponseEntity.ok(facturaService.obtenerFacturaCompleta(id));
    }

    @GetMapping("/ultima")
    public ResponseEntity<Factura> obtenerUltimaFactura() {
        List<Factura> facturas = facturaService.listarFacturas();
        if (facturas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(facturas.get(facturas.size() - 1));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Factura> actualizarFactura(@PathVariable Long id, @RequestBody Factura f) {
        return ResponseEntity.ok(facturaService.actualizarFactura(id, f));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFactura(@PathVariable Long id) {
        facturaService.eliminarFactura(id);
        return ResponseEntity.noContent().build();
    }
}
