// Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import './header.css'; // O CSS que vamos modificar a seguir

const Header = () => {
  // Estado para controlar a visibilidade do dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref para detectar cliques fora

  // Dados do usuário (em um aplicativo real, isso viria do login)
  const userData = {
    firstName: 'Roberto',
    fullName: 'Roberto da Senhado',
    role: 'Administrador',
    ra: '123456789',
    avatarUrl: 'https://i.pravatar.cc/150' // Usando um avatar de placeholder
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Efeito para fechar o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    // Adiciona o listener quando o componente monta
    document.addEventListener('mousedown', handleClickOutside);
    // Remove o listener quando o componente desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <img 
            src="/Senai.png" 
            alt="Logo SENAI"
          />
        </div>

        {/* --- INÍCIO DA MODIFICAÇÃO --- */}
        <div className="header-actions" ref={dropdownRef}>
          {/* Botão que aciona o menu */}
          <button onClick={toggleDropdown} className="profile-trigger">
            <img 
              src={userData.avatarUrl} 
              alt="Avatar do usuário" 
              className="profile-avatar"
            />
            <span className="profile-name">{userData.firstName}</span>
          </button>

          {/* O menu dropdown (só aparece se isDropdownOpen for true) */}
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-info">
                <h4>{userData.fullName}</h4>
                <p>{userData.role}</p>
                <p>RA: {userData.ra}</p>
              </div>
              <a href="/" className="dropdown-logout-btn">
                Sair
              </a>
            </div>
          )}
        </div>
        {/* --- FIM DA MODIFICAÇÃO --- */}
        
      </div>
    </header>
  );
};

export default Header;