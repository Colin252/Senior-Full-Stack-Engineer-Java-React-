package com.iceops.controller;

import com.iceops.client.ClientsServiceConnector;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MicroservicesController {

    private final ClientsServiceConnector clientsConnector;

    public MicroservicesController(ClientsServiceConnector clientsConnector) {
        this.clientsConnector = clientsConnector;
    }

    @GetMapping("/core/clients")
    public String getClients() {
        return clientsConnector.getClients();
    }

}