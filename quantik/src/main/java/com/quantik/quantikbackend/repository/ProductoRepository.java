package com.quantik.quantikbackend.repository;

import com.quantik.quantikbackend.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Aquí puedes agregar queries personalizadas si las necesitas más adelante,
    // pero por ahora con findById, findAll, save, deleteById ya es suficiente.
}
