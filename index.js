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
const mysql = require("mysql")
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
    res.render("home")
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
    res.render("ier")
})

app.post("/insucessos", (req, res) =>{
    res.render("insucessos")
})

app.listen("8080", ()=>{
    console.log("Servidor rodando na url http://localhost:8080");
})
