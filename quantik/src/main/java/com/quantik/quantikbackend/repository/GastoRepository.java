package com.quantik.quantikbackend.repository;

import com.quantik.quantikbackend.entity.Gasto;
import com.quantik.quantikbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GastoRepository extends JpaRepository<Gasto, Long> {
    List<Gasto> findByUser(User user);   // ✅ agregado
}
