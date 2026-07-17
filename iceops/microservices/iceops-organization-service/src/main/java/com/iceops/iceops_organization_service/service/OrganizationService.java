package com.iceops.iceops_organization_service.service;

import com.iceops.iceops_organization_service.entity.OrganizationEntity;
import com.iceops.iceops_organization_service.repository.OrganizationRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }


    public List<OrganizationEntity> findAll() {
        return organizationRepository.findAll();
    }


    public OrganizationEntity findById(Long id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
    }


    // Compatibilidad con tests antiguos
    public Optional<OrganizationEntity> getOrganizationById(Long id) {
        return organizationRepository.findById(id);
    }


    public OrganizationEntity save(OrganizationEntity organization) {
        return organizationRepository.save(organization);
    }


    public OrganizationEntity update(Long id, OrganizationEntity organization) {

        OrganizationEntity existing = findById(id);

        existing.setName(organization.getName());
        existing.setDescription(organization.getDescription());
        existing.setAddress(organization.getAddress());
        existing.setPhone(organization.getPhone());
        existing.setEmail(organization.getEmail());

        return organizationRepository.save(existing);
    }


    public void delete(Long id) {
        organizationRepository.deleteById(id);
    }

}