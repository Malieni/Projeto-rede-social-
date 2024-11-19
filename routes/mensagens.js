const express = require('express');
const router = express.Router();
const db = require('../server').db; // Importa a conexão com o banco do server.js

// Enviar uma mensagem
router.post('/', async (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
            [sender_id, receiver_id, content]
        );
        res.status(201).json({ id: result.insertId, sender_id, receiver_id, content });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar mensagens entre dois usuários
router.get('/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const [messages] = await db.execute(
            `SELECT * 
             FROM messages 
             WHERE (sender_id = ? AND receiver_id = ?) 
                OR (sender_id = ? AND receiver_id = ?) 
             ORDER BY created_at ASC`,
            [user1, user2, user2, user1]
        );
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar uma mensagem
router.put('/:id', async (req, res) => {
    const { content } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE messages SET content = ? WHERE id = ?',
            [content, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mensagem não encontrada' });
        }
        res.json({ message: 'Mensagem atualizada com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar uma mensagem
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM messages WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mensagem não encontrada' });
        }
        res.json({ message: 'Mensagem deletada com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
