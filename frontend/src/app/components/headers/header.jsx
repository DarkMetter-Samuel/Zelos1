// Header.jsx
import React from 'react';
import './header.css'; // O CSS que vamos modificar a seguir

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <img 
            src="/Senai.png" 
            alt="Logo SENAI"
          />
        </div>

        <div className="header-actions">
          <a href="/" className="logout-btn">
            <img src="/exit.png" alt="Ícone de saída" className="logout-icon" />
            {/* Adicionando texto para clareza */}
            <span>Sair</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;