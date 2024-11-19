const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Usando Promises para consultas assíncronas

// Cria uma instância do app Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuração da conexão com o MySQL
const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost', // Alterar se necessário
            user: 'root', // Usuário do banco de dados
            password: 'sua_senha', // Substitua pela sua senha
            database: 'coscon' // Nome do banco de dados
        });

        console.log('Conectado ao MySQL com sucesso!');
        return connection;
    } catch (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        process.exit(1);
    }
};

// Inicializa a conexão com o banco de dados
let db;
connectDB().then((connection) => {
    db = connection;
});

// Testando a conexão com uma rota simples
app.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        res.json({ message: 'API funcionando!', dbTest: rows[0].result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Adicionando rotas para usuários, postagens e mensagens
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/messages', require('./routes/messages'));

// Inicializando o servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
