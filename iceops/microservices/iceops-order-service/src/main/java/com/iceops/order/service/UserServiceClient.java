// package com.iceops.orderservice.service;

// import com.iceops.orderservice.client.UserClient;
// import com.iceops.orderservice.dto.UserResponse;
// import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
// import org.springframework.stereotype.Service;

/*
 =====================================================================
 CIRCUIT BREAKER IMPLEMENTATION (Resilience4j)
 =====================================================================

 Esta clase demuestra la implementación del patrón Circuit Breaker
 dentro de la arquitectura de microservicios.

 Propósito:
 Proteger el Order Service cuando el User Service falla.

 Flujo de arquitectura:

 Client
   │
   ▼
 API Gateway
   │
   ▼
 Order Service
   │
   ▼
 Circuit Breaker (Resilience4j)
   │
   ▼
 Feign Client
   │
   ▼
 User Service

 Tecnologías utilizadas:

 - Spring Boot
 - Spring Cloud
 - Netflix Eureka
 - OpenFeign
 - Resilience4j
 - Docker
 - MySQL

 Comportamiento:

 Si el User Service falla varias veces:
 1. El Circuit Breaker abre el circuito
 2. Se evita seguir llamando al servicio
 3. Se ejecuta el método fallback
 4. El sistema continúa funcionando sin colapsar

 NOTA:
 Esta clase se mantiene comentada para evitar conflictos de
 compilación durante el desarrollo, pero queda como evidencia
 de la implementación del patrón de resiliencia.
*/

// @Service
// public class UserServiceClient {

//     // Feign Client utilizado para comunicarse con el User Service
//     private final UserClient userClient;

//     public UserServiceClient(UserClient userClient) {
//         this.userClient = userClient;
//     }

//     /**
//      * Método que realiza la llamada al User Service mediante Feign.
//      * El Circuit Breaker monitorea esta llamada.
//      */
//     @CircuitBreaker(name = "userServiceBreaker", fallbackMethod = "getUserFallback")
//     public UserResponse getUser(Long id) {
//         return userClient.getUserById(id);
//     }

//     /**
//      * Método fallback que se ejecuta cuando el User Service falla
//      * o el Circuit Breaker se encuentra en estado OPEN.
//      */
//     public UserResponse getUserFallback(Long id, Throwable throwable) {

//         UserResponse fallback = new UserResponse();
//         fallback.setId(id);
//         fallback.setName("User service unavailable");

//         return fallback;
//     }
// }