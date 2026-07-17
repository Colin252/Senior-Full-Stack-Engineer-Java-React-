package com.iceops.iceops.core.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthClient {

    private final RestTemplate restTemplate;

    public AuthClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object login(Object request) {

        return restTemplate.postForObject(
                "http://localhost:8081/auth/login",
                request,
                Object.class
        );
    }

}