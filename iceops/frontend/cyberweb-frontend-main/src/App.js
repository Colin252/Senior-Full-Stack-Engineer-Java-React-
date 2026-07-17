import React from "react";
import Home from "./pages/Home";
import "./styles/global.css";

function App() {
  return (
    <div className="App">

      {/* 🌩️🔥 CYBER RED STORM — ULTRA FX */}
      <div className="cyber-storm"></div>       {/* Lluvia roja extrema */}
      <div className="red-lightning"></div>     {/* Relámpagos + shake */}
      <div className="red-glow"></div>          {/* Glow rojo inferior */}
      <div className="red-fog"></div>           {/* Neblina roja moviéndose */}
      <div className="screen-glitch"></div>     {/* Glitch cinematográfico */}
      <div className="red-sparks"></div>        {/* Chispas rojas */}

      {/* CONTENIDO REAL DE LA APP */}
      <Home />

    </div>
  );
}

export default App;
