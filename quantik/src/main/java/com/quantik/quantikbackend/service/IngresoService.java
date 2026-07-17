package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.Ingreso;
import com.quantik.quantikbackend.repository.IngresoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngresoService {

    private final IngresoRepository repo;

    public IngresoService(IngresoRepository repo) {
        this.repo = repo;
    }

    // Crear
    public Ingreso crearIngreso(Ingreso i) {
        return repo.save(i);
    }

    // Listar
    public List<Ingreso> listarIngresos() {
        return repo.findAll();
    }

    // Buscar por ID
    public Optional<Ingreso> obtenerIngresoPorId(Long id) {
        return repo.findById(id);
    }

    // Actualizar
    public Ingreso actualizarIngreso(Long id, Ingreso i) {
        Ingreso db = repo.findById(id).orElseThrow();

        if (i.getDescripcion() != null) {
            db.setDescripcion(i.getDescripcion());
        }
        if (i.getMonto() != null) {   // ✅ ahora funciona porque monto es Double en la entidad
            db.setMonto(i.getMonto());
        }
        if (i.getFecha() != null) {
            db.setFecha(i.getFecha());
        }

        return repo.save(db);
    }

    // Eliminar
    public void eliminarIngreso(Long id) {
        repo.deleteById(id);
    }
}
