package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.Transaccion;
import com.quantik.quantikbackend.repository.TransaccionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransaccionService {

    private final TransaccionRepository repo;

    public TransaccionService(TransaccionRepository repo) {
        this.repo = repo;
    }

    // Crear
    public Transaccion crearTransaccion(Transaccion t) {
        return repo.save(t);
    }

    // Listar
    public List<Transaccion> listarTransacciones() {
        return repo.findAll();
    }

    // Buscar por ID
    public Optional<Transaccion> obtenerTransaccionPorId(Long id) {
        return repo.findById(id);
    }

    // Actualizar
    public Transaccion actualizarTransaccion(Long id, Transaccion t) {
        Transaccion db = repo.findById(id).orElseThrow();
        db.setTipo(t.getTipo());
        db.setMonto(t.getMonto());
        db.setFecha(t.getFecha());
        return repo.save(db);
    }

    // Eliminar
    public void eliminarTransaccion(Long id) {
        repo.deleteById(id);
    }
}
