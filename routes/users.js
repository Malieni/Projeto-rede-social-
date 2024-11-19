const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Configurar conexão com o banco (reutilizando do `server.js`)
const db = require('../server').db;

// Criar um usuário
router.post('/', async (req, res) => {
    const { username, email, password, bio } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password, bio) VALUES (?, ?, ?, ?)',
            [username, email, password, bio]
        );
        res.status(201).json({ id: result.insertId, username, email, bio });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
