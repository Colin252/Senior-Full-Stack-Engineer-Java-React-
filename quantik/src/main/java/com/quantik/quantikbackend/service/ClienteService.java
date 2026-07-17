package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.ClienteEntity;
import com.quantik.quantikbackend.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository repo;

    public ClienteService(ClienteRepository repo) {
        this.repo = repo;
    }

    // Crear
    public ClienteEntity crearCliente(ClienteEntity c) {
        return repo.save(c);
    }

    // Listar
    public List<ClienteEntity> listarClientes() {
        return repo.findAll();
    }

    // Buscar por ID
    public Optional<ClienteEntity> obtenerClientePorId(Long id) {
        return repo.findById(id);
    }

    // Actualizar
    public ClienteEntity actualizarCliente(Long id, ClienteEntity c) {
        ClienteEntity db = repo.findById(id).orElseThrow();

        db.setNombre(c.getNombre());
        // Solo agrega estos si realmente existen en tu entidad ClienteEntity:
        // db.setApellido(c.getApellido());
        // db.setEmail(c.getEmail());
        // db.setTelefono(c.getTelefono());

        return repo.save(db);
    }

    // Eliminar
    public void eliminarCliente(Long id) {
        repo.deleteById(id);
    }
}
