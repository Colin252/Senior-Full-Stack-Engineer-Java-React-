package com.iceops.iceops.core.module;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public List<ModuleEntity> getAllModules() {
        return moduleRepository.findAll();
    }

    public ModuleEntity createModule(ModuleEntity module) {
        return moduleRepository.save(module);
    }

    public ModuleEntity updateModule(Long id, ModuleEntity updatedModule) {
        ModuleEntity module = moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        module.setName(updatedModule.getName());
        module.setEnabled(updatedModule.getEnabled());
        module.setVersion(updatedModule.getVersion());
        module.setDescription(updatedModule.getDescription());

        return moduleRepository.save(module);
    }
}