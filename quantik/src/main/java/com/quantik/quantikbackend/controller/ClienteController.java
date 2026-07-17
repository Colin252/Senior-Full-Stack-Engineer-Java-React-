package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.entity.ClienteEntity;
import com.quantik.quantikbackend.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:3000")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // Listar clientes
    @GetMapping
    public List<ClienteEntity> listarClientes() {
        return clienteService.listarClientes();
    }

    // Crear cliente
    @PostMapping
    public ClienteEntity crearCliente(@RequestBody ClienteEntity cliente) {
        return clienteService.crearCliente(cliente);
    }

    // Buscar cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<ClienteEntity> obtenerClientePorId(@PathVariable Long id) {
        return clienteService.obtenerClientePorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar cliente
    @PutMapping("/{id}")
    public ClienteEntity actualizarCliente(@PathVariable Long id, @RequestBody ClienteEntity cliente) {
        return clienteService.actualizarCliente(id, cliente);
    }

    // Eliminar cliente
    @DeleteMapping("/{id}")
    public void eliminarCliente(@PathVariable Long id) {
        clienteService.eliminarCliente(id);
    }
}
