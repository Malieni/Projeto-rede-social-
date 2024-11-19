const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    conteudo: { type: String, required: true },
    image: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
