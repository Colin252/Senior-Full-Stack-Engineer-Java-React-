package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.Proveedor;
import com.quantik.quantikbackend.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {

    private final ProveedorRepository repo;

    public ProveedorService(ProveedorRepository repo) {
        this.repo = repo;
    }

    // Crear
    public Proveedor crearProveedor(Proveedor p) {
        return repo.save(p);
    }

    // Listar
    public List<Proveedor> listarProveedores() {
        return repo.findAll();
    }

    // Buscar por ID
    public Optional<Proveedor> obtenerProveedorPorId(Long id) {
        return repo.findById(id);
    }

    // Actualizar
    public Proveedor actualizarProveedor(Long id, Proveedor p) {
        Proveedor db = repo.findById(id).orElseThrow();
        db.setNombre(p.getNombre());
        db.setContacto(p.getContacto());
        db.setTelefono(p.getTelefono());
        db.setEmail(p.getEmail());
        return repo.save(db);
    }

    // Eliminar
    public void eliminarProveedor(Long id) {
        repo.deleteById(id);
    }
}
