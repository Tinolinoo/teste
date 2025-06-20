const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Adicionado para checar o ID
const Produto = require('../models/produto');

// POST: Cadastrar um novo produto
router.post('/', async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).send(produto);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET: Listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).send(produtos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET: Listar um produto por ID ou Nome
router.get('/:identificador', async (req, res) => {
    try {
        const { identificador } = req.params;
        const isMongoId = mongoose.Types.ObjectId.isValid(identificador);

        let produto;
        if (isMongoId) {
            produto = await Produto.findById(identificador);
        } else {
            produto = await Produto.findOne({ nome: { $regex: new RegExp(`^<span class="math-inline">\{identificador\}</span>`, 'i') } });
        }

        if (!produto) {
            return res.status(404).send({ message: 'Produto não encontrado.' });
        }
        res.status(200).send(produto);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT: Atualizar um produto existente por ID
router.put('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!produto) {
            return res.status(404).send({ message: 'Produto não encontrado.' });
        }
        res.status(200).send(produto);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE: Deletar um produto por ID
router.delete('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).send({ message: 'Produto não encontrado.' });
        }
        res.status(200).send({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;