package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.Config;
import com.quantik.quantikbackend.service.ConfigService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "http://localhost:3000")
public class ConfigController {

    private final ConfigService service;

    public ConfigController(ConfigService service) {
        this.service = service;
    }

    @GetMapping
    public List<Config> listar() {
        return service.listar();
    }

    @PostMapping
    public Config crear(@RequestBody Config c) {
        return service.crear(c);
    }

    @PutMapping("/{id}")
    public Config actualizar(@PathVariable Long id, @RequestBody Config c) {
        return service.actualizar(id, c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
