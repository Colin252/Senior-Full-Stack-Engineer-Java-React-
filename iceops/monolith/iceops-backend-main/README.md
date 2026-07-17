# ⚙️ Quantik Backend – Cloud-Ready Spring Boot API

**Quantik Backend** is the secure, scalable API powering the full-stack **Quantik** financial management platform.  
It provides REST endpoints for authentication, accounting, and financial analytics — built entirely with **Spring Boot 3**, **Java 17**, and **MySQL 8**, and deployed on **AWS EC2** under the official domain **quantik.athenia-demo.art**.

---

## 🌎 Cloud Deployment Overview

| Environment | Platform | Description |
|--------------|-----------|--------------|
| **Backend – Production** | **AWS EC2 (Amazon Linux 2023)** | Running Spring Boot + MySQL on port **8080** |
| **Frontend – Live Domain** | **https://quantik.athenia-demo.art** | React app consuming the Quantik REST API |
| **Backend – Secondary** | Google Cloud VM (Ubuntu 22.04) | Used for Spark-based analytics and CI/CD redundancy |
| **CI/CD Integration** | GitHub Actions | Automated build, test, and deploy from the `main` branch |

☁️ Cloud setup includes:
- OpenJDK 17 + Maven 3.9.x  
- MySQL 8 with secured credentials  
- Apache Spark environment pre-configured  
- Persistent runtime via `systemctl` and `nohup`  
- Firewall rules for `8080` access  
- HTTPS CORS configuration for `quantik.athenia-demo.art`

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Language** | Java 17 |
| **Framework** | Spring Boot 3 |
| **Security** | Spring Security 6 + JWT Authentication |
| **Database** | MySQL 8 |
| **ORM** | Hibernate / JPA |
| **Build Tool** | Maven |
| **Cloud Providers** | AWS EC2 + Google Cloud VM |
| **Big Data** | Apache Spark |
| **Version Control** | Git + GitHub |
| **CI/CD** | GitHub Actions |
| **Testing** | JUnit 5, Mockito, TestNG |
| **Docs** | Postman + OpenAPI (Swagger-ready) |

---

## 🔐 Main Features

- 🔑 **JWT Authentication** – Secure login & registration endpoints  
- 👥 **User Management** – CRUD operations with role-based access  
- 💼 **Financial Modules** – Clients, suppliers, invoices, and transactions  
- 💾 **MySQL Integration** – Persistent storage using Hibernate/JPA  
- ⚙️ **RESTful Architecture** – Clean and modular endpoint design  
- 🌐 **CORS Configured** – Fully authorized for `https://quantik.athenia-demo.art`  
- 🧠 **Spark Ready** – Prepared for large-scale data analytics integration  
- 🧱 **Exception Handling** – Predictable and structured API responses  
- 🔁 **CI/CD Ready** – Automated pipeline using GitHub Actions  

---

## 🧠 System Architecture Overview

+----------------------------------------+
| React Frontend (AWS Domain) |
| https://quantik.athenia-demo.art |
+------------------+---------------------+
|
| HTTPS / Axios
v
+----------------------------------------+
| Spring Boot Backend (AWS EC2) |
| - JWT Authentication & Security |
| - Financial CRUD Modules |
| - CI/CD + Monitoring via GitHub |
+------------------+---------------------+
|
v
+----------------------------------------+
| MySQL 8 Database (AWS) |
| Persistent data layer + JPA ORM |
+----------------------------------------+

pgsql
Copiar código

---

## 🧪 API Endpoints Summary

| Method | Endpoint | Description |
|--------|-----------|--------------|
| **POST** | `/api/auth/login` | Authenticate user & generate JWT |
| **POST** | `/api/auth/register` | Register a new user |
| **GET** | `/api/users` | List all users (Admin role only) |
| **POST** | `/api/transactions` | Create new financial record |
| **GET** | `/api/transactions` | Fetch all transactions |
| **DELETE** | `/api/transactions/{id}` | Delete record by ID |

🔐 All endpoints secured with **JWT authentication**  
✅ Tested via **Postman** & **frontend integration**  

---

## ⚙️ Local Development Setup

```bash
# Clone repository
git clone https://github.com/Colin252/quantik-backend.git
cd quantik-backend

# Build project
./mvnw clean install

# Run backend locally
./mvnw spring-boot:run
🖥 Default local URL: http://localhost:8080
🗄 Database: quantik_db (MySQL 8)

🚀 Cloud Deployment (AWS EC2)
SSH into EC2

bash
Copiar código
ssh -i "quantik-key.pem" ec2-user@3.149.126.92
Clone & Build

bash
Copiar código
git clone https://github.com/Colin252/quantik-backend.git
cd quantik-backend
./mvnw clean package
Run the Backend

bash
Copiar código
nohup java -jar target/quantik-backend-1.0.jar &
Monitor Logs

bash
Copiar código
tail -f server.log
Access via Browser or API

arduino
Copiar código
http://3.149.126.92:8080/api
✅ Backend runs persistently via systemctl
✅ Deployed through GitHub Actions authenticated with PAT

🧠 Testing & CI/CD
Tool	Purpose
JUnit 5 / Mockito / TestNG	Unit & integration testing
GitHub Actions	Automated builds & tests
Postman / Swagger	API endpoint validation
AWS EC2 Logs	Runtime monitoring & debugging

💡 Achievements
🌩️ Full-stack deployment across AWS + custom domain

🔐 Secure authentication with Spring Security + JWT

⚡ Spark-enabled backend for analytics scalability

🔁 CI/CD pipeline with GitHub Actions + Maven

🧪 Comprehensive testing with JUnit & Mockito

🧭 End-to-end integration with React frontend

🧭 Next Steps & Roadmap
Integrate Apache Spark analytics jobs

Add Docker + Kubernetes deployment for scaling

Expose Swagger UI documentation endpoint

Implement multi-region redundancy (AWS + GCP)

Migrate database to RDS / Cloud SQL for high availability

👤 Author
Helton Emerson Quiroz López
Full Stack Java + React Developer

📧 heltonquiroz@gmail.com
🌐 Quantik Frontend (Live)
🐙 GitHub Profile
