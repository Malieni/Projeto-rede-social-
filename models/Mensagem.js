const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    remetente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receptor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    conteudo: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
