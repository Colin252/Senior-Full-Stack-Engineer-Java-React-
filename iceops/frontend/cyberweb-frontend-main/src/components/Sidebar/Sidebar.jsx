import React, { useState } from "react";
import "./sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
      <>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <div className={`sidebar ${open ? "open" : ""}`}>
          <h2 className="sidebar-title">CYBER</h2>
          <nav className="sidebar-links">
            <a href="/">🏠 Home</a>

            <a
                href="http://localhost:3002"
                target="_blank"
                rel="noopener noreferrer"
            >
              🚀 Quantik App
            </a>

            <a
                href="http://localhost:5173"
                target="_blank"
                rel="noopener noreferrer"
            >
              🏢 ICEOPS App
            </a>

            <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
            >
              🏦 IceBank App
            </a>

            <a href="#stack">💻 My Stack</a>
            <a href="#about">👤 About Me</a>
            <a href="#goals">🎯 Goals</a>
          </nav>


        </div>
      </>
  );
}