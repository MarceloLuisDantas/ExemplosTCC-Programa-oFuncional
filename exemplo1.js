// Esta é uma API apenas como exemplo e pode contar bugs
// não deve ser emplementada em qualquer caso

// Importando as libs
const express = require("express")
const bp = require("body-parser")
const mysql = require("mysql2")

// Criando a conexão com o banco de dados ficticio
const connection = mysql.createConnection({
    host: 'localhost',
    user: "123",
    password: "123"
})

// Configurando Express
const app = express()
app.use(bp.json())
app.use(bp.urlencoded({
    extended: false
}))

// A função verificaDados os dados do aluno, e verifica se os dados estão corretos
const verificaDados = (nome, idade, cpf) =>
    (nome != "" && idade > 0 && cpf != "")

// Gera a query que ira verifiar se o aluno existe 
const queryAlunoExiste = (cpf) => 
    'SELECT * FROM `alunos` WHERE `cpf` = "' + cpf + '";'

// Gera a quarty que realiza o cadastro a luno
const cadastraAluno = (nome, idade, cpf) => 
    'INSERT INTO alunos("nome", "idade", "cpf") VALUES ("'+ nome +'", "'+ idade +'", "'+ cpf +'");'

// Executa as querys e retorna o resultado
const queryMaker = async (query) => 
    await connection.execute(query)

// Rota principal para cadastro
app.post("/cadastra", (req, res) => {
    const { nome, idade, cpf } = req.body

    // Verifica se os valores estão corretos
    if(verificaDados(nome, idade, cpf) === 0) {
    
        // Gera a quary do usuario e em seguida processa ela
        const existe = queryMaker(queryAlunoExiste(cpf))
    
        // Verifica se teve algum resultado, pois se tiver significa que o aluno já foi cadastrado
        if(existe.length >= 1){
            res.send({ erro: "aluno cadastrado" })
        } else {
    
            // Realiza a query, e retorna a tela de conclusão
            const result = queryMaker(cadastraAluno(nome, idade, cpf))
            res.render({ resultado : result })
        }
    } else {
        res.send({ erro: "valor incorreto"})
    }
})

app.listen(3000, () => {
    console.log("Safe")
})