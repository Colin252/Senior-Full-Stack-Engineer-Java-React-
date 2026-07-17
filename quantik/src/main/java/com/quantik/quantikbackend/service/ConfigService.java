package com.quantik.quantikbackend.service;

import com.quantik.quantikbackend.entity.Config;
import com.quantik.quantikbackend.repository.ConfigRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfigService {

    private final ConfigRepository repo;

    public ConfigService(ConfigRepository repo) {
        this.repo = repo;
    }

    public List<Config> listar() {
        return repo.findAll();
    }

    public Config crear(Config c) {
        return repo.save(c);
    }

    public Config actualizar(Long id, Config c) {
        Config db = repo.findById(id).orElseThrow();
        db.setNombreEmpresa(c.getNombreEmpresa());
        db.setMoneda(c.getMoneda());
        return repo.save(db);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
