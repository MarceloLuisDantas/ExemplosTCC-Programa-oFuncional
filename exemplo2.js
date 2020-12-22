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

// Executa as querys e retorna o resultado
const queryMaker = async (query) => 
    await connection.execute(query)
   
// Gera query para resgatar boletim
const queryBoletim = (cpf) =>
    'SELECT * FROM `boletins` WHERE `cpf` = "' + cpf + '";'

// Rota para resgatar boletim
app.post("/boletim", (req, res) => {
    const { cpf } = req.body
    const boletim = queryMaker(queryBoletim(cpf))
    res.send({ resultado: boletim })
})

// Gera query para resgatar historico
const queryHistorico = (cpf) => 
    'SELECT * FROM `historico` WHERE `cpf` = "' + cpf + '";'

// Rota para resgatar historico
app.post("/historico", (req, res) => {
    const { cpf } = req.body
    const historico = queryMaker(queryHistorico(cpf))
    res.send({ resultado: historico })
})

// Gera query para resgatar historico
const queryJustificativa = (cpf, just, dia, mes) => 
    'INSERT INTO justificativas(cpf, justificativa, dia, mes)' + 
    'VALUES("'+ cpf +'", "'+ just +'", "'+ dia +'", "'+ mes +'");'

// Rota que gera justificativa
app.post("/justificar", (req, res) => {
    const { cpf, just, dia, mes } = req.body
    const result = queryMaker(queryJustificativa(cpf, just, dia, mes))
    res.send({ resultado: result })
})



app.listen(3000, () => {
    console.log("Safe")
})