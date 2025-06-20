require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // <-- O 'app' é criado aqui

// Middlewares
app.use(express.json());
app.use(cors());

// Rota raiz para o health check do Render  <<<<<< O LUGAR CORRETO É AQUI
app.get('/', (req, res) => {
  res.send('API da Loja no ar e funcionando!');
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Não foi possível conectar ao MongoDB:', err));

// Importar as rotas
const produtoRoutes = require('./routes/produtos');
app.use('/produtos', produtoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});