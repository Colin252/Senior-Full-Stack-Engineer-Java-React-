package com.quantik.quantikbackend.repository;

import com.quantik.quantikbackend.entity.Ingreso;
import com.quantik.quantikbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngresoRepository extends JpaRepository<Ingreso, Long> {
    List<Ingreso> findByUser(User user);  // ✅ necesario para BalanceService
}
