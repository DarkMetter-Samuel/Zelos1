// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo continua sendo um link para a home */}
        <Link to="/" className="logo">
          <img 
            src="/Senai.png" 
            alt="Logo SENAI"
          />
        </Link>

        {/* 2. Adicionando a navegação principal */}
        <nav className="main-nav">
          <Link to="/admin/graficos" className="nav-link">Gráficos</Link>
          <Link to="/admin/config" className="nav-link">Configurações</Link>
        </nav>

        <div className="header-actions">
           {/* 3. Use Link também para o botão de sair, se ele levar para a home */}
          <Link to="/" className="logout-btn">
            <img src="/exit.png" alt="Ícone de saída" className="logout-icon" />
            <span>Sair</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;