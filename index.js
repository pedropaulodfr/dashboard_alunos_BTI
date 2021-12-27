const express = require("express")
const app = express()
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// Config Handlebars
    // Template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))

// Conexão com o Banco de Dados MySQL
const mysql = require("mysql");
const { query } = require("express");
const con = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    password: '', // A senha do usuário. Ex: user123
    database: 'situacao_alunos_bti' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

con.connect((err) => {
    if (err) {
        console.log('Erro ao se conectar ao Banco de Dados... => ', err)
        return
    }
    console.log('Conexão ao Banco de Dados estabelecida com sucesso!')
})


// Rotas
app.get("/", (req, res)=>{
    let insucessos = "SELECT SUM(Discentes) AS Discentes, SUM(Cancelamentos) AS Cancelamentos, SUM(Falta) AS Falta, SUM(Media) AS Media, SUM(`Media e Falta`) AS MediaFalta FROM relatorio_de_insucessos"
    let trancamentos = "SELECT SUM(Total) AS Trancamentos FROM trancamentos_de_programa"
    let cancelamentos = "SELECT SUM(Total) AS Cancelamentos FROM cancelamentos_de_programa"
    let integralizacoes = "SELECT SUM(Total) AS Integralizações FROM integralizações_de_programa"
    let discentes = "SELECT COUNT(*) AS Discentes FROM alunos_ch_cumprida"
    let disciplinas = "SELECT COUNT(*) AS Disciplinas FROM relatorio_de_insucessos"

    con.query(insucessos, (err, queryInsucessos, fields) =>{
        con.query(trancamentos, (err, queryTrancamentos, fields) => {
            con.query(cancelamentos, (err, queryCancelamentos, fields) => {
                con.query(integralizacoes, (err, queryIntegralizacoes, fields) =>{
                    con.query(discentes, (err, queryDiscentes, fields) =>{
                        con.query(disciplinas, (err, queryDisciplinas, fields) =>{
                            res.render("home", {
                                dadosInsucessos: JSON.stringify(queryInsucessos),
                                dadosTrancamentos: JSON.stringify(queryTrancamentos),
                                dadosCancelamentos: JSON.stringify(queryCancelamentos),
                                dadosIntegralizacoes: JSON.stringify(queryIntegralizacoes),
                                dadosDiscentes: JSON.stringify(queryDiscentes),
                                dadosDisciplinas: JSON.stringify(queryDisciplinas)
                            })
                        })
                    })
                })
            })
        })
    })
})

app.post("/ch_cumprida", (req, res) =>{
    let matriculas = "SELECT COUNT(*) AS QUANTIDADE, `Status` FROM alunos_ch_cumprida GROUP BY `Status`"
    let integralizacoes = " SELECT COUNT(*) AS CONTAGEM, Perc_Total FROM alunos_ch_cumprida WHERE Perc_Total >= 100 OR Perc_Total = 0 OR (Perc_Total < 100 AND Perc_Total > 0) GROUP BY `Nome`;"
    let somaCH = "SELECT SUM(CH_Integralizada) AS SOMA, `Ingresso` AS INGRESSO FROM alunos_ch_cumprida GROUP BY `Ingresso`"
    
    con.query(matriculas, (err, queryMatriculas, fields) =>{
        con.query(integralizacoes, (err, queryIntegralizacoes, fields) =>{
            con.query(somaCH, (err, querySomaCH, fields) =>{
                res.render("ch_cumprida", {
                    dadosMatriculas: JSON.stringify(queryMatriculas),
                    dadosIntegralizacoes: JSON.stringify(queryIntegralizacoes),
                    dadosSomaCH: JSON.stringify(querySomaCH)
                })
            })
        })
    })
    
})

app.post("/ier", (req, res) =>{
    let ingressos = "SELECT `Ano-Periodo` AS PERIODO, INGRESSANTES FROM integralizações_de_programa"
    let ativos = "SELECT `Ano-Periodo` AS PERIODO, ATIVOS FROM integralizações_de_programa"
    let integralizacoes = "SELECT `Ano-Periodo` AS PERIODO , TOTAL AS INTEGRALIZACOES FROM integralizações_de_programa"
    let trancamentos = "SELECT `Ano-Periodo` AS PERIODO , TOTAL AS TRANCAMENTOS FROM trancamentos_de_programa"
    let cancelamentos = "SELECT `Ano-Periodo` AS PERIODO , TOTAL AS CANCELAMENTOS FROM cancelamentos_de_programa"

    con.query(ingressos, (err, queryIngressos, fields)=>{
        con.query(ativos, (err, queryAtivos, fields)=>{
            con.query(integralizacoes, (err, queryIntegralizacoes, fields)=>{
                con.query(trancamentos, (err, queryTrancamentos, fields)=>{
                    con.query(cancelamentos, (err, queryCancelamentos, fields)=>{
                        res.render("ier", {
                            dadosIngressos: JSON.stringify(queryIngressos),
                            dadosAtivos: JSON.stringify(queryAtivos),
                            dadosIntegralizacoes: JSON.stringify(queryIntegralizacoes),
                            dadosTrancamentos: JSON.stringify(queryTrancamentos),
                            dadosCancelamentos: JSON.stringify(queryCancelamentos)
                        })
                    })
                })
            })
        })
    })
})

app.post("/insucessos", (req, res) =>{
    let discentes = "SELECT COUNT(*), Nome, Codigo, Discentes FROM relatorio_de_insucessos GROUP BY Codigo ORDER BY Discentes DESC LIMIT 10"
    let repRelatMedia = "SELECT COUNT(*), Nome, Codigo, Media FROM relatorio_de_insucessos WHERE Media >= ((Discentes*30)/100) GROUP BY Codigo ORDER BY Media DESC LIMIT 10"
    let repAbsMedia = "SELECT COUNT(*), Nome, Codigo, Media FROM relatorio_de_insucessos GROUP BY Codigo ORDER BY Media DESC LIMIT 10"
    let repFalta = "SELECT COUNT(*), Nome, Codigo, Falta FROM relatorio_de_insucessos WHERE Falta > 0 GROUP BY Codigo ORDER BY Falta DESC LIMIT 10"
    let repMediaFalta = "SELECT COUNT(*), Nome, Codigo, `Media e Falta` AS MediaFalta FROM relatorio_de_insucessos WHERE `Media e Falta` > 0 GROUP BY Codigo ORDER BY `Media e Falta` DESC LIMIT 10"
    let cancelamentosRelat = "SELECT COUNT(*), Nome, Codigo, Cancelamentos, Discentes FROM relatorio_de_insucessos WHERE Cancelamentos >= ((Discentes*30)/100) AND Cancelamentos > 0 GROUP BY Codigo ORDER BY Cancelamentos DESC LIMIT 10"
    let cancelamentos = "SELECT COUNT(*), Nome, Codigo, Cancelamentos FROM relatorio_de_insucessos WHERE Cancelamentos > 0 GROUP BY Codigo ORDER BY Cancelamentos DESC LIMIT 10"
    let insucessos = "SELECT COUNT(*), Nome, Codigo, `Total Insucesso` AS Insucessos FROM relatorio_de_insucessos WHERE `Total Insucesso` > 0 GROUP BY Codigo ORDER BY `Total Insucesso` DESC LIMIT 10"
    let disciplinas = "SELECT COUNT(*) AS Turmas, Nome, Codigo FROM relatorio_de_insucessos GROUP BY Nome"

    con.query(discentes, (err, queryDiscentes, fields)=>{
        con.query(repRelatMedia, (err, queryRepRelatMedia, fields)=>{
            con.query(repAbsMedia, (err, queryRepAbsMedia, fields)=>{
                con.query(repFalta, (err, queryRepFalta, fields)=>{
                    con.query(repMediaFalta, (err, queryRepMediaFalta, fields)=>{
                        con.query(cancelamentosRelat, (err, queryCancelamentosRelat, fields) =>{
                            con.query(cancelamentos, (err, queryCancelamentos, fields)=>{
                                con.query(insucessos, (err, queryInsucessos, fields)=>{
                                    con.query(disciplinas, (err, queryDisciplinas, fields)=>{
                                        res.render("insucessos", {
                                            dadosDiscentes: JSON.stringify(queryDiscentes),
                                            dadosRepRelatMedia: JSON.stringify(queryRepRelatMedia),
                                            dadosRepAbsMedia: JSON.stringify(queryRepAbsMedia),
                                            dadosRepFalta: JSON.stringify(queryRepFalta),
                                            dadosRepMediaFalta: JSON.stringify(queryRepMediaFalta),
                                            dadosCancelamentosRelat: JSON.stringify(queryCancelamentosRelat),
                                            dadosCancelamentos: JSON.stringify(queryCancelamentos),
                                            dadosInsucessos: JSON.stringify(queryInsucessos),
                                            dadosDisciplinas: JSON.stringify(queryDisciplinas),
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

app.post("/consultar-disciplina", (req, res)=>{
    let relatDisciplina = "SELECT Codigo, Nome, Turmas, Discentes, Cancelamentos, Media, Falta, `Media e Falta` AS MediaFalta, `Total Insucesso` AS Insucesso FROM relatorio_de_insucessos WHERE Nome = ?"

    let nomeDisciplina = req.body.nome_disciplina;

    con.query(relatDisciplina, [nomeDisciplina], (err, queryRelatDisciplina, fields)=>{
        res.render("consultar_disciplina", {
            dadosRelatDisciplina: JSON.stringify(queryRelatDisciplina),
        });
    })

})

app.listen("8080", ()=>{
    console.log("Servidor rodando na url http://localhost:8080");
})
