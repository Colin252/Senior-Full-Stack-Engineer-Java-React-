import React from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div>
        <h2 className="navbar-title">IceBank</h2>
        <p className="navbar-subtitle">
          Banking and financial management platform
        </p>
      </div>

      <div className="navbar-status">
        <span className="status-dot" />
        Demo Environment
      </div>
    </header>
  );
}
