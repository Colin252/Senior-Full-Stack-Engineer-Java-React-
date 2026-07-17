package com.iceops.auth.controller;

import com.iceops.auth.service.AuthService;
import com.iceops.auth.user.UserEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity user) {
        return authService.register(user);
    }

    @GetMapping("/users")
    public List<UserEntity> users() {
        return authService.getUsers();
    }

}