package com.iceops.user.service;

import com.iceops.user.entity.UserEntity;
import com.iceops.user.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldReturnUsersList() {

        UserEntity user = new UserEntity();

        when(repository.findAll()).thenReturn(List.of(user));

        List<UserEntity> result = userService.getUsers();

        assertEquals(1, result.size());

        verify(repository, times(1)).findAll();
    }
}