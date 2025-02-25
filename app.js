const express = require('express');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.json());

// Importa o cliente Supabase
const { supabase } = require('./supabaseClient');

// Rotas
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Rota de Teste
app.get('/', (req, res) => {
  res.send('Meeting Assistant Backend is running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));