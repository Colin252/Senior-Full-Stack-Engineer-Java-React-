package com.icebank.icebankbackend.controller;

import com.icebank.icebankbackend.service.ContabilidadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contabilidad")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ContabilidadController {

    private final ContabilidadService contabilidadService;

    @GetMapping("/libro-diario")
    public ResponseEntity<?> diario() {
        return ResponseEntity.ok(contabilidadService.getLibroDiario());
    }

    @GetMapping("/libro-mayor")
    public ResponseEntity<?> mayor() {
        return ResponseEntity.ok(contabilidadService.getLibroMayor());
    }

    @GetMapping("/estado-resultados")
    public ResponseEntity<?> estadoResultados() {
        return ResponseEntity.ok(contabilidadService.getEstadoResultados());
    }

    @GetMapping("/resumen")
    public ResponseEntity<?> resumen() {
        return ResponseEntity.ok(contabilidadService.getResumen());
    }
}
