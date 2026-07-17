package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.Producto;
import com.quantik.quantikbackend.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    // Crear
    public Producto crearProducto(Producto p) {
        return repo.save(p);
    }

    // Listar
    public List<Producto> listarProductos() {
        return repo.findAll();
    }

    // Buscar por ID
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return repo.findById(id);
    }

    // Actualizar
    public Producto actualizarProducto(Long id, Producto p) {
        Producto db = repo.findById(id).orElseThrow();
        db.setNombre(p.getNombre());
        db.setPrecio(p.getPrecio());
        db.setStock(p.getStock());
        return repo.save(db);
    }

    // Eliminar
    public void eliminarProducto(Long id) {
        repo.deleteById(id);
    }
}
