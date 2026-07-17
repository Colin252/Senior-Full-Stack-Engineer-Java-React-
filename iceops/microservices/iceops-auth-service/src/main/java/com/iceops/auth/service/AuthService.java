package com.iceops.auth.service;

import com.iceops.auth.user.UserEntity;
import com.iceops.auth.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity register(UserEntity user) {
        return userRepository.save(user);
    }

    public List<UserEntity> getUsers() {
        return userRepository.findAll();
    }

    public UserEntity login(String username) {
        return userRepository.findByUsername(username);
    }

}