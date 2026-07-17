# 🌐 Quantik Frontend – React Cloud App

**Quantik Frontend** is the user interface for the full-stack **Quantik** financial management platform.  
Built with **React + Vite**, it provides a responsive, secure, and modern dashboard that connects seamlessly with the **Spring Boot Backend** hosted on **AWS EC2**.

---

## 🚀 Live Demo

👉 **Production App:** [https://quantik.athenia-demo.art](https://quantik.athenia-demo.art)

Frontend is deployed on **Vercel** and integrated directly with the backend API hosted at:

http://3.149.126.92:8080/api

yaml
Copiar código

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Language** | JavaScript (ES6+) |
| **Framework** | React 18 + Vite |
| **Styling** | TailwindCSS + Custom CSS |
| **Routing** | React Router DOM v6 |
| **State Management** | React Hooks + LocalStorage |
| **HTTP Client** | Axios |
| **Backend API** | Spring Boot (AWS EC2) |
| **Deployment** | Vercel (connected to GitHub) |
| **Version Control** | Git + GitHub |
| **Build Tool** | Vite |
| **Security** | JWT Auth + CORS Configured |
| **Testing (Optional)** | Jest + React Testing Library |

---

## 🧠 Application Overview

+-------------------------------------------+
| React Frontend |

https://quantik.athenia-demo.art
- Authentication (Login/Register)
- Dashboard for Financial Management
- CRUD Modules (Clients, Products, etc.)
- Reports, Transactions & Analytics
+-------------------------------------------+

markdown
Copiar código
               |
               | HTTPS (Axios)
               v
+-------------------------------------------+
| Spring Boot Backend (AWS EC2) |
| http://3.149.126.92:8080/api |
| - JWT Authentication |
| - MySQL Persistence |
+-------------------------------------------+

markdown
Copiar código

---

## 🔐 Features

- 🔑 **Secure Authentication** with JWT tokens (via backend API)
- 💼 **Dashboard** with modules for:
  - Clients
  - Providers
  - Products
  - Invoices
  - Transactions
  - Reports
  - Statistics
- 📊 **Dynamic Financial Analytics** (ready for Spark integration)
- ⚡ **Fast UI Rendering** with Vite
- 🌐 **CORS Configuration** for `https://quantik.athenia-demo.art`
- 🧱 **Modular Codebase** for easy expansion
- 📱 **Responsive Design** (mobile-ready)
- 🔁 **Automatic Deployment** via Vercel + GitHub integration

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project with the following variables:

```bash
VITE_API_URL=http://3.149.126.92:8080/api
VITE_APP_NAME=Quantik
✅ These variables ensure that your frontend communicates securely with the AWS backend.

🧪 Local Development
1️⃣ Clone and Install
bash
Copiar código
git clone https://github.com/Colin252/quantik-frontend.git
cd quantik-frontend
npm install
2️⃣ Run the app
bash
Copiar código
npm run dev
Open http://localhost:5173

🌎 Deployment (Vercel)
Steps:
Connect your GitHub repo to Vercel

Set your environment variables:

VITE_API_URL=http://3.149.126.92:8080/api

Deploy automatically from the main branch

✅ Every push to main triggers a new build in Vercel
✅ HTTPS + domain routing handled by Vercel

🧠 CI/CD Integration
Frontend: Continuous deployment via Vercel GitHub integration

Backend: CI/CD via GitHub Actions (Maven build + deploy)

Both pipelines keep the project synchronized automatically

🧩 Folder Structure
bash
Copiar código
quantik-frontend/
│
├── src/
│   ├── components/         # UI Components
│   ├── pages/              # React Pages (Dashboard, Login, Reports...)
│   ├── services/           # Axios services for API calls
│   ├── assets/             # Images, icons, styles
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
│
├── public/
├── .env                    # Environment variables
├── package.json
├── vite.config.js
└── README.md
💡 Achievements
🌐 Full-stack integration with backend on AWS EC2

⚙️ Optimized build pipeline with Vite

🔒 Secure login flow with JWT authentication

💾 Real-time data connection to MySQL backend

⚡ Deployed on custom domain quantik.athenia-demo.art

🧭 Scalable architecture, ready for Spark & analytics integration

🧭 Future Enhancements
📈 Integrate real-time analytics with Apache Spark API

🧱 Add unit testing with Jest + RTL

🌙 Add dark mode theme

🧩 Implement Docker + Kubernetes for containerized deploy

🧾 Add PDF/Excel export for reports

🔔 Add email notifications for transactions

👤 Author
Helton Emerson Quiroz López
Full Stack Java + React Developer

📧 heltonquiroz@gmail.com
🐙 GitHub Profile
🌐 Live App – Quantik
