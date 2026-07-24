

Readme · MD
Senior Full-Stack Engineer — Java & React Portfolio
Portafolio de proyectos full-stack de nivel senior, construidos con Java / Spring Boot en el backend y React en el frontend. Incluye desde una arquitectura monolítica hasta un sistema de microservicios event-driven, cubriendo autenticación, persistencia de datos, mensajería asíncrona y patrones de resiliencia usados en sistemas distribuidos reales.

🚧 Estado de despliegue: las 3 apps están completas y funcionales en local/Docker. El despliegue en la nube (AWS/GCP) está documentado como próximo paso para cada proyecto — no implica que no pueda hacerse, solo que aún no se ha automatizado end-to-end para las tres.

📦 Proyectos incluidos
Proyecto	Tipo de arquitectura	Dominio funcional
icebank	Monolito (API REST)	Banca / gestión financiera
iceops	Microservicios (monolito → microservicios)	Operaciones / e-commerce backend
quantik	Monolito (API REST)	Contabilidad / gestión de negocio
Cada proyecto es independiente: tiene su propio backend Java, su propio frontend React y su propio README con detalle técnico.

🏦 icebank
Plataforma de gestión financiera con autenticación segura y módulos contables (clientes, proveedores, facturas, transacciones).

Backend

Java 17 + Spring Boot 3.2
Spring Security 6 + JWT (JJWT)
Spring Data JPA / Hibernate
MySQL 8
Bean Validation
Maven
Frontend

React 18 + React Router 6
Axios para consumo de API
Recharts (dashboards y gráficos)
Exportación de datos: jspdf, xlsx, file-saver
📁 Carpeta: icebank/ (backend) y icebank/icebankfrontend/ (frontend)

⚙️ iceops
Proyecto de arquitectura backend que demuestra la migración de un monolito a microservicios, incluyendo ambas versiones en el mismo repositorio para comparar el proceso evolutivo.

Servicios incluidos

iceops-discovery-server — Service Discovery (Eureka)
iceops-api-gateway — Punto de entrada único (Spring Cloud Gateway)
iceops-auth-service — Autenticación
iceops-user-service — Gestión de usuarios
iceops-product-service — Catálogo de productos
iceops-order-service — Órdenes (publica eventos)
iceops-payment-service — Pagos (consume eventos vía RabbitMQ)
iceops-organization-service — Organizaciones
iceops-audit-service — Auditoría
iceops-analytics-service — Analítica
iceops-notification-service — Notificaciones
Backend

Java 17 + Spring Boot / Spring Cloud
Eureka (Service Discovery) + Spring Cloud Gateway
OpenFeign (comunicación entre servicios)
Resilience4j — Circuit Breaker, Retry, Timeout
RabbitMQ (arquitectura orientada a eventos)
MySQL 8
Spring Boot Actuator (observabilidad)
Docker + Docker Compose
Frontend

React + Vite (iceops-web)
React Router + Axios
📁 Carpeta: iceops/ — subcarpetas monolith/, microservices/, infra/, frontend/

Levantar la infraestructura:

bash
cd iceops/microservices
docker-compose up -d
Orden recomendado de arranque: Discovery Server → API Gateway → resto de microservicios.

📊 quantik
Aplicación contable ("app contable") para gestión de ventas, productos, movimientos, balances y reportes financieros.

Backend

Java 17 + Spring Boot 3.2
Spring Security + JWT
Spring Data JPA / Hibernate
MySQL 8
Maven
Frontend

React 18 + React Router 6
Axios
Recharts (gráficos de balance/ventas)
Exportación de reportes: jspdf, jspdf-autotable, xlsx, file-saver
📁 Carpeta: quantik/ (backend) y quantik/quantik-frontend/ (frontend)

🧰 Stack tecnológico global
Categoría	Tecnologías
Lenguaje backend	Java 17
Frameworks	Spring Boot, Spring Cloud, Spring Security, Spring Data JPA
Frontend	React 18, React Router, Vite / CRA
Base de datos	MySQL 8
Mensajería	RabbitMQ
Auth	JWT (JJWT)
Resiliencia	Resilience4j (Circuit Breaker, Retry, Timeout)
Contenedores	Docker, Docker Compose
Build	Maven, npm
Testing	JUnit 5, Mockito
Control de versiones	Git / GitHub
▶️ Cómo ejecutar cada proyecto
Cada subcarpeta (icebank/, iceops/, quantik/) trae su propio Maven Wrapper y su propio frontend. Patrón general:

bash
# Backend
cd <proyecto>
./mvnw clean install
./mvnw spring-boot:run

# Frontend
cd <proyecto>/<carpeta-frontend>
npm install
npm start
Revisa el README.md de cada carpeta para variables de entorno, puertos y configuración de base de datos específicos.

🗺️ Roadmap de despliegue
 Automatizar despliegue de las 3 apps con Docker + CI/CD (GitHub Actions)
 Unificar variables de entorno / secretos por ambiente
 Desplegar iceops (microservicios) en un orquestador (Docker Compose → Kubernetes)
 Documentar dominios públicos por proyecto
👤 Autor
Helton Emerson Quiroz López Full Stack Engineer — Java & React

📜 Licencia
MIT License — ver LICENSE



