import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Sidebar />

      <div className="home-content">
        <h1 className="home-title">CYBERWEB</h1>
        <p className="home-subtitle">
          Central Hub • Portfolio • Learning Journey • Connected Apps
        </p>

        {/* ABOUT ME */}
        <section id="about" className="section-box">
          <h2>About Me</h2>
          <p>
            Full Stack Developer especializado en Java (8+) + Spring Framework,
            React, arquitecturas modernas y aplicaciones cloud. Apasionado por
            el diseño de sistemas, Big Data, APIs escalables y la construcción
            de soluciones de alto rendimiento.
          </p>
        </section>

        {/* MY STACK */}
        <section id="stack" className="section-box">
          <h2>My Stack</h2>
          <p>
            <strong>Backend:</strong> Java, Spring Boot, Spring Security, JPA, JWT, Microservices <br/>
            <strong>Frontend:</strong> React 18, Vite, TailwindCSS, UI/UX <br/>
            <strong>Data:</strong> Hadoop, Spark, HDFS <br/>
            <strong>Cloud:</strong> AWS • Azure • GCP <br/>
            <strong>Testing:</strong> JUnit, Mockito, TestNG <br/>
            <strong>DevOps:</strong> Git, GitHub, CI/CD
          </p>
        </section>

        {/* GOALS */}
        <section id="goals" className="section-box">
          <h2>Goals</h2>
          <p>
            • Consolidarme como Full Stack Senior Developer <br/>
            • Obtener certificaciones AWS & Azure <br/>
            • Desarrollar APIs más robustas y escalables <br/>
            • Integrar Big Data + Spark en proyectos reales <br/>
            • Construir nuevas apps cloud-native y proyectos personales
          </p>
        </section>
      </div>
    </div>
  );
}
