// Consulta a API oara resgatar os notas de certas fontes
const getNotas = (fonte, func) => {
    fetch(`https://SistemaAcademico.com/notas/${fonte}`).then(res => {
        res.json().then(JSONotas => {
            return func(JSONotas)
        })
    }).catch(e => e)
}

// Converte JSON para Lista
const Json2Array = (json) => 
    Object.keys(json).map(i => json[i])

// Calcula a media de uma lista de notas
const media = (notas) => 
    notas.reduce(total, n => total + n) / notas.length

// Calcula a media de um aluno especifico
const mediaAluno = (idAluno) => getNotas(idAluno, (notas) => {
    const notas = Json2Array(notas)
    const media = media(notas)
    return media
})

// Calcula a media de todos os alunos de uma turma
const mediasAlunos = (idTurma) => getNotas(idTurma, (notas) => {
    const notas = Json2Array(notas)
    const medias = notas.map(i => media(i))
    return medias
})

// Calcula a medai de todos os alunos de uma turma e 
// verifica qual deles passaram por media
const passaram = (idTurma) => {
    const medias = mediasAlunos(idTurma)
    const aprovados = medias.filter(media => media >= 7)
    return aprovados
}

