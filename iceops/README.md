# 🚀 ICEOPS Microservices Backend

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen)
![Spring Cloud](https://img.shields.io/badge/SpringCloud-Microservices-blue)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Event--Driven-orange)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Architecture](https://img.shields.io/badge/Architecture-Microservices-purple)

---

# 📌 Project Overview

**ICEOPS Microservices Backend** is a backend architecture project that demonstrates how to migrate a **Monolithic Spring Boot application** into a **modern Microservices Architecture**.

The goal of the project is to showcase real-world backend architecture patterns used in **scalable distributed systems**.

This repository contains **both implementations**:

• 🧱 Monolithic backend
• ⚙️ Microservices architecture

This allows developers and recruiters to clearly see the **migration process and architectural evolution**.

---

# 🧠 What This Project Demonstrates

✔ Monolith → Microservices Migration

✔ API Gateway Pattern

✔ Service Discovery with Eureka

✔ Event‑Driven Architecture

✔ Inter‑service Communication using OpenFeign

✔ Resilience Patterns (Circuit Breaker / Retry / Timeout)

✔ Containerized Infrastructure

✔ Observability with Spring Boot Actuator

---

# 🏗 Architecture

The system follows a **Microservices Architecture** with an **API Gateway** as the entry point.

Client applications never call services directly.

All traffic goes through the gateway.

```
        Client
          │
          ▼
     API Gateway
          │
          ▼
 ┌───────────────────────────┐
 │       Microservices       │
 │                           │
 │  Auth Service             │
 │  User Service             │
 │  Product Service          │
 │  Order Service            │
 │  Payment Service          │
 │  Organization Service     │
 │                           │
 └─────────────┬─────────────┘
               │
               ▼
            RabbitMQ
               │
               ▼
         Payment Service
```

Service discovery is handled through **Eureka**, allowing services to dynamically locate each other.

---

# 📂 Repository Structure

```
iceops-microservices-backend

├── monolith
│   └── iceops-backend-main

├── microservices
│   ├── iceops-api-gateway
│   ├── iceops-auth-service
│   ├── iceops-user-service
│   ├── iceops-order-service
│   ├── iceops-product-service
│   ├── iceops-payment-service
│   └── iceops-organization-service

└── infra
    └── iceops-infra
```

### 🧱 Monolith

Contains the **original single‑service backend** before migrating to microservices.

### ⚙️ Microservices

Contains the **distributed architecture implementation**.

Each service is independently deployable.

### 🐳 Infrastructure

Contains Docker infrastructure used to run external services like **RabbitMQ**.

---

# 🧰 Technologies Used

## Backend

• Java 17
• Spring Boot
• Spring Cloud

## Microservices Infrastructure

• Eureka Service Discovery
• Spring Cloud Gateway
• OpenFeign

## Resilience

• Resilience4j

Implemented patterns:

• Circuit Breaker
• Retry
• Timeout

## Messaging

• RabbitMQ

## Database

• MySQL

## Observability

• Spring Boot Actuator

## Infrastructure

• Docker
• Docker Compose

---

# 🔗 Microservices

## 🌐 API Gateway

Main entry point for all client requests.

Responsibilities:

• Request routing
• Load balancing
• Service discovery integration

---

## 🔐 Auth Service

Handles authentication and security related operations.

---

## 👤 User Service

Manages user accounts and profiles.

---

## 📦 Product Service

Responsible for product catalog management.

---

## 🧾 Order Service

Handles order creation and order processing.

Publishes events to **RabbitMQ** when an order is created.

---

## 💳 Payment Service

Consumes order events from RabbitMQ and processes payments.

---

## 🏢 Organization Service

Manages organization related data.

---

# ⚡ Event‑Driven Workflow

Example order processing flow:

1️⃣ Client sends request to **API Gateway**

2️⃣ Gateway routes request to **Order Service**

3️⃣ Order Service creates an order

4️⃣ Order Service publishes event → **RabbitMQ**

5️⃣ **Payment Service** consumes the event

6️⃣ Payment is processed

---

# ▶ Running the Project

## 1️⃣ Clone Repository

```
git clone https://github.com/Colin252/iceops-microservices-backend
cd iceops-microservices-backend
```

---

## 2️⃣ Start Infrastructure

Start RabbitMQ using Docker:

```
cd infra/iceops-infra

docker-compose up -d
```

---

## 3️⃣ Run Services

Start services in this order:

1️⃣ Eureka Server

2️⃣ API Gateway

3️⃣ Core Services

• auth-service
• user-service
• product-service
• order-service
• payment-service
• organization-service

Run each service:

```
mvn spring-boot:run
```

---

# 🔌 Example API Endpoints

## Users

```
GET /api/users
POST /api/users
```

## Products

```
GET /api/products
POST /api/products
```

## Orders

```
POST /api/orders
GET /api/orders/{id}
```

## Payments

```
POST /api/payments
```

---

# 📊 Observability

Each service exposes **Spring Boot Actuator endpoints**.

```
/actuator/health
/actuator/info
/actuator/metrics
```

These endpoints allow monitoring service health and metrics.

---

# 🎯 Purpose of This Project

This project is designed as a **Backend Engineering Portfolio Project** demonstrating:

• Distributed system design
• Microservices architecture
• Event‑driven communication
• Resilient backend services

It showcases **real industry backend patterns** used in modern scalable systems.

---

# 📜 License

MIT License

---

⭐ If you find this project interesting, feel free to star the repository.
