package com.quantik.quantikbackend.repository;

import com.quantik.quantikbackend.entity.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<ClienteEntity, Long> {
}
