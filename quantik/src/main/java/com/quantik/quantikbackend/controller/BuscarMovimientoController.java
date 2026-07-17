package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Transaccion;
import com.quantik.quantikbackend.service.TransaccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/buscar-movimientos")
@CrossOrigin(origins = "http://localhost:3000")
public class BuscarMovimientoController {

    private final TransaccionService transaccionService;

    public BuscarMovimientoController(TransaccionService transaccionService) {
        this.transaccionService = transaccionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaccion>> buscarMovimientos(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String fecha
    ) {
        List<Transaccion> movimientos = transaccionService.listarTransacciones();

        if (tipo != null && !tipo.isEmpty()) {
            movimientos = movimientos.stream()
                    .filter(m -> m.getTipo().equalsIgnoreCase(tipo))
                    .collect(Collectors.toList());
        }

        if (fecha != null && !fecha.isEmpty()) {
            movimientos = movimientos.stream()
                    .filter(m -> m.getFecha().toString().equals(fecha))
                    .collect(Collectors.toList());
        }

        return ResponseEntity.ok(movimientos);
    }
}
