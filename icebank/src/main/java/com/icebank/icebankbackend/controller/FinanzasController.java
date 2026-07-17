package com.icebank.icebankbackend.controller;

import com.icebank.icebankbackend.entity.Transaction;
import com.icebank.icebankbackend.service.FinanzasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finanzas")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class FinanzasController {

    private final FinanzasService finanzasService;

    @GetMapping("/balance")
    public ResponseEntity<?> balance() {
        return ResponseEntity.ok(finanzasService.getBalance());
    }

    @GetMapping("/ingresos")
    public ResponseEntity<?> ingresos() {
        List<Transaction> lista = finanzasService.getIngresos();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/gastos")
    public ResponseEntity<?> gastos() {
        List<Transaction> lista = finanzasService.getGastos();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/reportes")
    public ResponseEntity<?> reportes() {
        return ResponseEntity.ok(finanzasService.getReportes());
    }
}
