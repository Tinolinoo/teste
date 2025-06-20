require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('1. Script iniciado, dependências carregadas.');

const app = express();
console.log('2. Aplicação Express criada.');

// Middlewares
app.use(express.json());
app.use(cors());
console.log('3. Middlewares configurados.');

// Rota Raiz (Health Check)
app.get('/', (req, res) => {
  console.log('-> Rota raiz / foi acessada (health check)!');
  res.send('API da Loja no ar e funcionando!');
});
console.log('4. Rota raiz / registrada.');

// Rotas de Produtos
const produtoRoutes = require('./routes/produtos');
app.use('/produtos', produtoRoutes);
console.log('5. Rotas de produtos registradas.');

const PORT = 3001;


// Conecta ao MongoDB e, SE TIVER SUCESSO, inicia o servidor
console.log('6. Tentando conectar ao MongoDB...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('7. SUCESSO: Conectado ao MongoDB!');
    app.listen(PORT, () => {
      console.log(`8. SUCESSO: Servidor iniciado na porta ${PORT}. Aplicação pronta!`);
    });
  })
  .catch(err => {
    console.error('9. ERRO FATAL: Falha ao conectar ao MongoDB:', err);
  });