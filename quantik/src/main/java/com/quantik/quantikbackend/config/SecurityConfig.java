package com.quantik.quantikbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    /*
     * MODO DEMO
     *
     * La autenticación JWT se conserva en el proyecto:
     *
     * - AuthController
     * - JwtAuthenticationFilter
     * - JwtUtils
     * - CustomUserDetailsService
     *
     * En esta versión pública se permite temporalmente el acceso
     * a todos los endpoints para facilitar la demostración.
     *
     * En la fase futura de seguridad se restaurará:
     *
     * - Login central
     * - JWT
     * - Roles
     * - Autorización por aplicación
     * - Single Sign-On
     */

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:3000",
                        "http://localhost:3001",
                        "http://localhost:3002",
                        "http://localhost:5173"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setExposedHeaders(
                List.of("Authorization")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )
                .csrf(csrf ->
                        csrf.disable()
                )
                .authorizeHttpRequests(auth ->
                        auth.anyRequest().permitAll()
                );

        /*
         * JWT desactivado temporalmente para la demo.
         *
         * Para restaurarlo:
         *
         * http.addFilterBefore(
         *     jwtAuthenticationFilter,
         *     UsernamePasswordAuthenticationFilter.class
         * );
         */

        return http.build();
    }
}