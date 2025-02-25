const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient'); // Importa o cliente Supabase

const router = express.Router();

// Rota de Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  // Verifica se o usuário já existe
  const { data: existingUser, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já registrado.' });
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Salva o usuário no banco de dados
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password_hash: hashedPassword }]);

  if (error) {
    return res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }

  res.json({ message: 'Usuário registrado com sucesso!' });
});

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  // Busca o usuário no banco de dados
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  // Gera um token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login bem-sucedido!', token });
});

module.exports = router;
