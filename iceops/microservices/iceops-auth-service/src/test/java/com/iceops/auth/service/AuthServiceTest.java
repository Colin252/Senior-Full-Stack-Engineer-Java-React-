package com.iceops.auth.service;

import com.iceops.auth.service.AuthService;
import com.iceops.auth.user.UserEntity;
import com.iceops.auth.user.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    private UserEntity user;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
    }

    @Test
    void shouldRegisterUser() {

        when(userRepository.save(user)).thenReturn(user);

        UserEntity result = authService.register(user);

        assertNotNull(result);

        verify(userRepository).save(user);
    }

    @Test
    void shouldReturnUsers() {

        when(userRepository.findAll()).thenReturn(List.of(user));

        List<UserEntity> result = authService.getUsers();

        assertEquals(1, result.size());

        verify(userRepository).findAll();
    }

    @Test
    void shouldLoginUser() {

        when(userRepository.findByUsername("testuser")).thenReturn(user);

        UserEntity result = authService.login("testuser");

        assertNotNull(result);

        verify(userRepository).findByUsername("testuser");
    }
}