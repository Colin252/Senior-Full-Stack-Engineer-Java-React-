package com.quantik.quantikbackend.controller;

import com.quantik.quantikbackend.dto.LoginRequest;
import com.quantik.quantikbackend.dto.LoginResponse;
import com.quantik.quantikbackend.dto.RegisterRequest;
import com.quantik.quantikbackend.entity.User;
import com.quantik.quantikbackend.repository.UserRepository;
import com.quantik.quantikbackend.jwt.JwtUtils;   // ✅ corregido el import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils; // ✅ ahora sí encuentra el bean

    // 👉 Registro
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body(
                    new LoginResponse(false, "El correo ya está registrado", null, null, null)
            );
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // 🔑 guarda con hash
        user.setRole(request.getRole());

        userRepository.save(user);

        return ResponseEntity.ok(new LoginResponse(true, "Usuario registrado correctamente", null, null, null));
    }

    // 👉 Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(
                    new LoginResponse(false, "Credenciales inválidas", null, null, null)
            );
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(
                    new LoginResponse(false, "Credenciales inválidas", null, null, null)
            );
        }

        // ✅ ahora usa el JwtUtils correcto
        String token = jwtUtils.generateToken(user.getEmail(), user.getRole());

        return ResponseEntity.ok(
                new LoginResponse(true, "Login exitoso", token, user.getEmail(), user.getRole())
        );
    }

    // 👉 Endpoint protegido
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("✅ Bienvenido! Tu token fue validado correctamente.");
    }
}
