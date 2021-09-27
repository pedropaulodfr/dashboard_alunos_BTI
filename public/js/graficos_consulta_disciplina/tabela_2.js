function ConstrutorTabela_1(){
    document.getElementById("table-title").innerHTML = "<b>" + dadosRelatDisciplina[0].Nome + "</b>";

    for (let i = 0; i < dadosRelatDisciplina.length; i++) {
        let codigos = dadosRelatDisciplina[i].Codigo;
        let discentes = dadosRelatDisciplina[i].Discentes;
        let insucessos = dadosRelatDisciplina[i].Insucesso;
        console.log(codigos);

        // Cria elementos e o corpo da tabela
        linha = document.createElement("tr");
        campo_codigo = document.createElement("td");
        campo_discentes = document.createElement("td");
        campo_insucessos = document.createElement("td");

        // Cria textos
        let texto_codigo = document.createTextNode(codigos);
        let texto_discentes = document.createTextNode(discentes);
        let texto_insucessos = document.createTextNode(insucessos);

        // Vincula texto as linhas
        campo_codigo.appendChild(texto_codigo);
        campo_discentes.appendChild(texto_discentes);
        campo_insucessos.appendChild(texto_insucessos);

        // Vincula linhas ao corpo da tabela
        linha.appendChild(campo_codigo);
        linha.appendChild(campo_discentes);
        linha.appendChild(campo_insucessos);

        // Vincula corpo da tabela a tabela
        document.getElementById("corpo_tabela_1").appendChild(linha);
    }
}

function ConstrutorTabela_2(){
    // Cria elementos e o corpo da tabela
    var linha = document.createElement("tr");
    var campo_turmas = document.createElement("td");
    var campo_discentes = document.createElement("td");
    var campo_insucesso = document.createElement("td");

    //Style
    campo_turmas.className = "material-tabela";

    // Cria textos
    var texto_turmas = document.createTextNode(somaTurmas);
    var texto_discentes = document.createTextNode(somaDiscentes);
    var texto_insucesso = document.createTextNode(somaInsucesso);

    // Vincula texto as linhas
    campo_turmas.appendChild(texto_turmas);
    campo_discentes.appendChild(texto_discentes);
    campo_insucesso.appendChild(texto_insucesso);

    // Vincula linhas ao corpo da tabela
    linha.appendChild(campo_turmas);
    linha.appendChild(campo_discentes);
    linha.appendChild(campo_insucesso);

    // Vincula corpo da tabela a tabela
    document.getElementById("corpo_tabela_2").appendChild(linha);
}

function initialize() {
    ConstrutorTabela_1();
    ConstrutorTabela_2();
}
window.onload = initialize;