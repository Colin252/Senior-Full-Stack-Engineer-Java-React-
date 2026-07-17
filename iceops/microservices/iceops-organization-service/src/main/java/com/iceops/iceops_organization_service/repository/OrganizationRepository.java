package com.iceops.iceops_organization_service.repository;

import com.iceops.iceops_organization_service.entity.OrganizationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<OrganizationEntity, Long> {
}