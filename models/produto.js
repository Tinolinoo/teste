const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  cor: { type: String, required: true },
  peso: { type: Number, required: true },
  tipo: { type: String, required: true },
  preco: { type: Number, required: true },
  dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produto', produtoSchema);