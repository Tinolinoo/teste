require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rota Raiz (Health Check)
app.get('/', (req, res) => {
  res.send('API da Loja no ar e funcionando!');
});

// Rotas de Produtos
const produtoRoutes = require('./routes/produtos');
app.use('/produtos', produtoRoutes);

const PORT = process.env.PORT || 3001;

// Conecta ao MongoDB e, SOMENTE SE TIVER SUCESSO, inicia o servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB!');
    
    // AQUI ESTÁ A PARTE IMPORTANTE QUE FOI APAGADA:
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Falha fatal ao conectar ao MongoDB:', err);
  });