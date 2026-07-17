package com.iceops.iceops.core.module;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/core/modules")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @GetMapping
    public List<ModuleEntity> getAllModules() {
        return moduleService.getAllModules();
    }

    @PostMapping
    public ModuleEntity createModule(@RequestBody ModuleEntity module) {
        return moduleService.createModule(module);
    }

    @PutMapping("/{id}")
    public ModuleEntity updateModule(@PathVariable Long id,
                                     @RequestBody ModuleEntity module) {
        return moduleService.updateModule(id, module);
    }
}