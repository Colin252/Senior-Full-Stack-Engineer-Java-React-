package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.User;
import com.quantik.quantikbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> listar() {
        return service.listar();
    }

    @PostMapping
    public User crear(@RequestBody User u) {
        // Por ahora password se guarda en texto plano
        return service.crear(u);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
