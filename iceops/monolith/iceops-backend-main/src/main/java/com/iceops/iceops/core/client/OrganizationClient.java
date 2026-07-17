package com.iceops.iceops.core.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Component
public class OrganizationClient {

    private final RestTemplate restTemplate;

    public OrganizationClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Object> getAllOrganizations() {

        Object[] response = restTemplate.getForObject(
                "http://localhost:8082/api/organizations",
                Object[].class
        );

        if (response == null) {
            return List.of();
        }

        return Arrays.asList(response);
    }
}

