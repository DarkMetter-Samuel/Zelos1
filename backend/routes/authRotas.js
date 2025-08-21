import express from 'express';
import passport from '../config/ldap.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';

const router = express.Router();

// Rota de Login (LDAP + JWT)
router.post('/login', (req, res, next) => {
  passport.authenticate('ldapauth', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Erro na autenticação:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor' });
    }

    if (!user) {
      console.warn('Falha na autenticação:', info?.message || 'Credenciais inválidas');
      return res.status(401).json({ success: false, message: info?.message || 'Autenticação falhou' });
    }

    // Usuário autenticado → gera JWT
    const payload = {
      username: user.username,
      email: user.mail,
      displayName: user.displayName,
      funcao: 'usuario' // futuramente pode buscar no MySQL a função real
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    return res.json({
      success: true,
      message: 'Autenticado com sucesso',
      token,
      user: payload
    });
  })(req, res, next);
});

export default router;
