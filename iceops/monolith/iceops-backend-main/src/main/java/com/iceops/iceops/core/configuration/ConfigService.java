package com.iceops.iceops.core.configuration;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfigService {

    private final ConfigRepository configRepository;

    public ConfigService(ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public List<ConfigEntity> getAllConfigs() {
        return configRepository.findAll();
    }

    public ConfigEntity createConfig(ConfigEntity config) {
        return configRepository.save(config);
    }

    public ConfigEntity updateConfig(String key, ConfigEntity updatedConfig) {

        ConfigEntity config = configRepository.findByConfigKey(key)
                .orElseThrow(() -> new RuntimeException("Config not found"));

        config.setConfigValue(updatedConfig.getConfigValue());
        config.setDescription(updatedConfig.getDescription());

        return configRepository.save(config);
    }
}