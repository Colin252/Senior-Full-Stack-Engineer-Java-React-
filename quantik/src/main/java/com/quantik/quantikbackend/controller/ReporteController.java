package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.User;
import com.quantik.quantikbackend.entity.Venta;
import com.quantik.quantikbackend.entity.Factura;
import com.quantik.quantikbackend.repository.UserRepository;
import com.quantik.quantikbackend.repository.VentaRepository;
import com.quantik.quantikbackend.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private FacturaRepository facturaRepository;

    // 👉 Endpoint que devuelve TODO lo ingresado
    @GetMapping
    public ResponseEntity<?> getReportes() {
        Map<String, Object> reporte = new HashMap<>();

        List<User> clientes = userRepository.findAll();
        List<Venta> ventas = ventaRepository.findAll();
        List<Factura> facturas = facturaRepository.findAll();

        reporte.put("clientes", clientes);
        reporte.put("ventas", ventas);
        reporte.put("facturas", facturas);

        return ResponseEntity.ok(reporte);
    }
}
