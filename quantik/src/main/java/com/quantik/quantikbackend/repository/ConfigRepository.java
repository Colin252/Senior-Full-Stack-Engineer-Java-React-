package com.quantik.quantikbackend.repository;

import com.quantik.quantikbackend.entity.Config;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigRepository extends JpaRepository<Config, Long> {
}
