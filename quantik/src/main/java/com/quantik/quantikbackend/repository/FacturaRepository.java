package com.quantik.quantikbackend.repository;

import com.quantik.quantikbackend.entity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FacturaRepository extends JpaRepository<Factura, Long> {
    // ✅ Devuelve la última factura creada
    Optional<Factura> findTopByOrderByIdDesc();
}
