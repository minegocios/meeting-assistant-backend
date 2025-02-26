const { createClient } = require('@supabase/supabase-js');

// Lê as variáveis de ambiente
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Verifica se as variáveis estão definidas
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be set in the Environment Variables.');
}

// Cria o cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
