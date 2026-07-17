package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.Gasto;
import com.quantik.quantikbackend.repository.GastoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GastoService {

    private final GastoRepository repo;

    public GastoService(GastoRepository repo) {
        this.repo = repo;
    }

    // Crear
    public Gasto crearGasto(Gasto g) {
        return repo.save(g);
    }

    // Listar
    public List<Gasto> listarGastos() {
        return repo.findAll();
    }

    // Buscar por ID
    public Optional<Gasto> obtenerGastoPorId(Long id) {
        return repo.findById(id);
    }

    // Actualizar
    public Gasto actualizarGasto(Long id, Gasto g) {
        Gasto db = repo.findById(id).orElseThrow();

        if (g.getDescripcion() != null) db.setDescripcion(g.getDescripcion());
        if (g.getMonto() != null) db.setMonto(g.getMonto());  // ✅ ya funciona con Double
        if (g.getCategoria() != null) db.setCategoria(g.getCategoria());
        if (g.getFecha() != null) db.setFecha(g.getFecha());

        return repo.save(db);
    }

    // Eliminar
    public void eliminarGasto(Long id) {
        repo.deleteById(id);
    }
}
