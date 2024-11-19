const express = require('express');
const router = express.Router();
const db = require('../server').db; // Importa a conexão com o banco do server.js

// Criar uma postagem
router.post('/', async (req, res) => {
    const { user_id, content, image } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)',
            [user_id, content, image]
        );
        res.status(201).json({ id: result.insertId, user_id, content, image });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todas as postagens
router.get('/', async (req, res) => {
    try {
        const [posts] = await db.execute(
            `SELECT posts.*, users.username 
             FROM posts 
             JOIN users ON posts.user_id = users.id 
             ORDER BY posts.created_at DESC`
        );
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar uma postagem
router.put('/:id', async (req, res) => {
    const { content, image } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE posts SET content = ?, image = ? WHERE id = ?',
            [content, image, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Postagem não encontrada' });
        }
        res.json({ message: 'Postagem atualizada com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar uma postagem
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Postagem não encontrada' });
        }
        res.json({ message: 'Postagem deletada com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
