function ConstrutorTabela(){
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
    document.getElementById("corpoTabela").appendChild(linha);
}
window.onload = ConstrutorTabela;