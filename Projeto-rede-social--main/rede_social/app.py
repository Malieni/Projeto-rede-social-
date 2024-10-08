from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Substitua 'sua_chave_secreta' por uma string aleatória
app.secret_key = 'sua_chave_secreta'

# Rota da página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para o formulário de cadastro
@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

# Rota para processar o formulário de cadastro
@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    # Aqui você processaria os dados do formulário (ex: salvar no banco de dados)
    nome_usuario = request.form['nome_usuario']
    # ... (outros campos do formulário)
    
    # Redireciona para a página de perfil após o cadastro (ainda não implementada)
    return redirect(url_for('perfil'))

# Rota para o formulário de login
@app.route('/login')
def login():
    return render_template('login.html')

# Rota para processar o formulário de login
@app.route('/logar', methods=['POST'])
def logar():
    # Aqui você validaria as credenciais do usuário
    nome_usuario = request.form['nome_usuario']
    senha = request.form['senha']
    # ... (verificar se o usuário existe no banco de dados)
    
    # Se as credenciais forem válidas, redirecione para o perfil
    return redirect(url_for('perfil'))

# Rota para a página de perfil (ainda não implementada)
@app.route('/perfil')
def perfil():
    return render_template('perfil.html')

if __name__ == '__main__':
    app.run(debug=True)

# Rota da página inicial - Redireciona para o login se o usuário não estiver logado
@app.route('/')
def index():
    # Aqui você verificaria se o usuário está logado (ex: usando sessões)
    # Por enquanto, vamos redirecionar sempre para o login
    return redirect(url_for('login'))

# ... (restante do código)
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# (substitua 'sua_chave_secreta' por uma string aleatória)
app.secret_key = 'sua_chave_secreta'

# Exemplo de dados de postagens (substitua pela lógica de banco de dados)
postagens = [
    {'nome_usuario': 'Usuário 1', 'data_postagem': '10/11/2023', 'conteudo': 'Esta é a primeira postagem!'},
    {'nome_usuario': 'Usuário 2', 'data_postagem': '11/11/2023', 'conteudo': 'Olá, COSCON!'}
]

# Rota da página inicial
@app.route('/')
def home():
    return render_template('home.html', postagens=postagens)

# ... (outras rotas)

if __name__ == '__main__':
    app.run(debug=True)