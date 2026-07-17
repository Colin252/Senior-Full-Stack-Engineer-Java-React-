package com.iceops.iceops_organization_service.service;

import com.iceops.iceops_organization_service.entity.OrganizationEntity;
import com.iceops.iceops_organization_service.repository.OrganizationRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrganizationServiceTest {

    @Mock
    private OrganizationRepository organizationRepository;

    @InjectMocks
    private OrganizationService organizationService;

    private OrganizationEntity organization;

    @BeforeEach
    void setUp() {
        organization = new OrganizationEntity();
        organization.setId(1L);
        organization.setName("ICEOPS Organization");
    }

    @Test
    void shouldReturnOrganizationById() {

        when(organizationRepository.findById(1L))
                .thenReturn(Optional.of(organization));

        Optional<OrganizationEntity> result =
                organizationService.getOrganizationById(1L);

        assertTrue(result.isPresent());
        assertEquals("ICEOPS Organization", result.get().getName());

        verify(organizationRepository, times(1)).findById(1L);
    }
}