package com.iceops.iceops_organization_service.controller;

import com.iceops.iceops_organization_service.entity.OrganizationEntity;
import com.iceops.iceops_organization_service.service.OrganizationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public List<OrganizationEntity> getAll() {
        return organizationService.findAll();
    }

    @GetMapping("/{id}")
    public OrganizationEntity getById(@PathVariable Long id) {
        return organizationService.findById(id);
    }

    @PostMapping
    public OrganizationEntity create(
            @RequestBody OrganizationEntity organization) {

        return organizationService.save(organization);
    }

    @PutMapping("/{id}")
    public OrganizationEntity update(
            @PathVariable Long id,
            @RequestBody OrganizationEntity organization) {

        return organizationService.update(id, organization);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        organizationService.delete(id);
    }
}