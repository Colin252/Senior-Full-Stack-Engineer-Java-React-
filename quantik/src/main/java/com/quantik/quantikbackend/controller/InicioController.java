package com.quantik.quantikbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InicioController {

    @GetMapping("/api/saludo")
    public String saludo() {
        return "Bienvenido a Quantik - Contabilidad Inteligente 💰📊";
    }
}
