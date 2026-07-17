package com.iceops.iceops.core.configuration;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/core/config")
public class ConfigController {

    private final ConfigService configService;

    public ConfigController(ConfigService configService) {
        this.configService = configService;
    }

    @GetMapping
    public List<ConfigEntity> getAllConfigs() {
        return configService.getAllConfigs();
    }

    @PostMapping
    public ConfigEntity createConfig(@RequestBody ConfigEntity config) {
        return configService.createConfig(config);
    }

    @PutMapping("/{key}")
    public ConfigEntity updateConfig(@PathVariable String key,
                                     @RequestBody ConfigEntity config) {
        return configService.updateConfig(key, config);
    }
}