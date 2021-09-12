const express = require("express")
const app = express()
const handlebars = require("express-handlebars");

// Config Handlebars
    // Template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
app.use(express.static('public'))

// Rotas
app.get("/", (req, res)=>{
    res.render("home")
})

app.post("/ch_cumprida", (req, res) =>{
    res.render("ch_cumprida")
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
