package com.quantik.quantikbackend.repository;

import com.quantik.quantikbackend.entity.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {
}
