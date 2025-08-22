'use client'
import React, { useState } from 'react';
import Sidebar from '../components/layout/sidebar/Sidebar.jsx';
import Footer from '../components/layout/footer/footer'; // Importando o Footer corretamente
import './usuario.css'; 
import { motion, useMotionValue, useTransform } from 'framer-motion';

const chamadosIniciais = [];

const shapesData = [...Array(6)].map((_, i) => ({
  id: i, top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%`, size: Math.random() * 20 + 10, parallaxFactor: (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1), animate: { rotate: [0, Math.random() * 360 - 180, 0], scale: [1, Math.random() * 0.5 + 0.8, 1], }, transition: { duration: Math.random() * 20 + 15, repeat: Infinity, ease: "easeInOut", }
}));

export default function ChamadosUsuario() {
  const [chamados, setChamados] = useState(chamadosIniciais);
  const [titulo, setTitulo] = useState('');
  const [servico, setServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [detalheAberto, setDetalheAberto] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(chamados.length === 0);

  function abrirChamado(e) {
    e.preventDefault();
    if (!titulo.trim() || !servico.trim() || !descricao.trim()) {
      alert('Por favor, preencha todos os campos do chamado.');
      return;
    }
    const novo = {
      id: chamados.length + 1, protocolo: `#2025-0${150 + chamados.length + 1}`, assunto: titulo, categoria: servico, descricao: descricao, data: new Date().toLocaleDateString('pt-BR'), status: 'Aberto',
    };
    setChamados([...chamados, novo]);
    setTitulo('');
    setServico('');
    setDescricao('');
    setIsFormVisible(false);
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aberto': return 'status-badge aberto';
      case 'Em Andamento': return 'status-badge em-andamento';
      default: return 'status-badge concluido';
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const parallaxX = useTransform(x, (latest) => latest * 0.05);
  const parallaxY = useTransform(y, (latest) => latest * 0.05);
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.width / 2);
    y.set(event.clientY - rect.height / 2);
  };

  return (
    // <!-- ESTRUTURA CORRIGIDA: Container principal para o layout -->
    <div className="usuario-layout-container">
      <Sidebar />

      {/* <!-- ESTRUTURA CORRIGIDA: Conteúdo principal que fica ao lado da sidebar --> */}
      <main className="main-content-area">
        <motion.div className="page-wrapper" onMouseMove={handleMouseMove}>
          <motion.div className="background">
            {/* ...código do background animado... */}
          </motion.div>
          <div className="content-wrapper">
            <div className="chamados-container">
              <h2 className="chamados-title">Abrir Chamados</h2>
              <p className="chamados-intro">
                Bem-vindo à nossa central de ajuda. Para registrar uma nova solicitação ou relatar um problema, 
                clique no botão abaixo e preencha o formulário. Nossa equipe responderá o mais breve possível.
              </p>
              <div className="novo-chamado-container">
                {!isFormVisible ? (
                  <button className="abrir-chamado-btn" onClick={() => setIsFormVisible(true)}>
                    Abrir Novo Chamado
                  </button>
                ) : (
                  <form onSubmit={abrirChamado} className={`novo-chamado-form ${isFormVisible ? 'visible' : ''}`}>
                    <div className="form-header">
                      <h3>Abrir Novo Chamado</h3>
                      {chamados.length > 0 && (
                        <button type="button" className="close-btn" onClick={() => setIsFormVisible(false)}>&times;</button>
                      )}
                    </div>
                    <div className="linha-dupla">
                      <div className="input-group">
                        <label htmlFor="titulo">Título</label>
                        <input id="titulo" type="text" placeholder="Ex: Impressora não funciona" value={titulo} onChange={e => setTitulo(e.target.value)} required maxLength={35} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="servico">Serviço</label>
                        <select id="servico" value={servico} onChange={e => setServico(e.target.value)} required>
                          <option value="" disabled>Selecione um tipo</option>
                          <option value="Externo">Externo</option>
                          <option value="Manutenção">Manutenção</option>
                          <option value="Apoio Técnico">Apoio Técnico</option>
                          <option value="Limpeza">Limpeza</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="descricao">Descrição</label>
                      <textarea id="descricao" placeholder="Descreva o problema ou a solicitação com mais detalhes." value={descricao} onChange={e => setDescricao(e.target.value)} required rows="4" maxLength={250}></textarea>
                    </div>
                    <button type="submit" className="submit-button">Enviar Chamado</button>
                  </form>
                )}
              </div>
              <div className="meus-chamados-grid">
                {chamados.map(c => (
                  <div key={c.id} className="meus-chamado-card">
                    <div className="meus-card-header">
                      <span className="protocolo">{c.protocolo}</span>
                      <span className={getStatusClass(c.status)}>{c.status}</span>
                    </div>
                    <h3>{c.assunto}</h3>
                    <p><strong>Categoria:</strong> {c.categoria}</p>
                    <p><strong>Data:</strong> {c.data}</p>
                    <button className="detalhes-btn" onClick={() => setDetalheAberto(c)}>Ver Detalhes</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <Footer />
      </main>

      {detalheAberto && (
        <div className="modal-overlay" onClick={() => setDetalheAberto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{detalheAberto.assunto}</h3>
              <button className="close-btn" onClick={() => setDetalheAberto(null)}>&times;</button>
            </div>
            <p><strong>Protocolo:</strong> {detalheAberto.protocolo}</p>
            <p><strong>Categoria:</strong> {detalheAberto.categoria}</p>
            <p><strong>Data:</strong> {detalheAberto.data}</p>
            <p><strong>Status:</strong> {detalheAberto.status}</p>
            <hr />
            <p><strong>Descrição:</strong> {detalheAberto.descricao}</p>
          </div>
        </div>
      )}
    </div>
  );
}