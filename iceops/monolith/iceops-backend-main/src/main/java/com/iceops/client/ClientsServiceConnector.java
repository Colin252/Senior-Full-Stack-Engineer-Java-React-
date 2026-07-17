package com.iceops.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ClientsServiceConnector {

    private final RestTemplate restTemplate;

    public ClientsServiceConnector(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getClients() {

        String url = "http://localhost:8083/api/clients";

        return restTemplate.getForObject(url, String.class);
    }

}