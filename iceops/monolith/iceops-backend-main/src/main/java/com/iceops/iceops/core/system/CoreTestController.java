package com.iceops.iceops.core.system;

import com.iceops.iceops.core.client.OrganizationClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CoreTestController {

    private final OrganizationClient organizationClient;

    public CoreTestController(OrganizationClient organizationClient) {
        this.organizationClient = organizationClient;
    }

    @GetMapping("/core/test-organizations")
    public List<Object> testOrganizations() {
        return organizationClient.getAllOrganizations();
    }

    @GetMapping("/core/test-auth")
    public String testAuth() {
        return "ICEOPS conectado con AUTH-SERVICE";
    }
}