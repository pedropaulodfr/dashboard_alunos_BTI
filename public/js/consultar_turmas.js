function PegarNomeDisciplinas(params) {
    let dadosDisciplinas = document.getElementById("dadosDisciplinas").innerHTML;

    dadosDisciplinas = JSON.parse(dadosDisciplinas);

    let dadosSelectDisciplinas = [];
    for(let i = 0; i < dadosDisciplinas.length; i++){
        let nome = dadosDisciplinas[i].Nome;
        let codigo = dadosDisciplinas[i].Codigo;
        let quantidade = dadosDisciplinas[i].Turmas;

        dadosSelectDisciplinas.push([
            nome, quantidade, codigo
        ]);

        AddOptions(nome);
    };

}

window.onload = PegarNomeDisciplinas;

function AddOptions(disciplina) {
    let select = document.getElementById("select-disciplinas");
    let  option = document.createElement("option");

    option.text = disciplina;
    option.value = disciplina;
    option.className = 'select-option';
    
    select.add(option);
}

function pegarDisciplinaSelecionada() {
    let disciplinaSelecionada = document.getElementById("select-disciplinas").value;
    
    console.log("Disciplina selecionada: " + disciplinaSelecionada);

    alert("Disciplina selecionada: " + disciplinaSelecionada);
    
    document.getElementById("nome-disciplina").value = disciplinaSelecionada;
    document.getElementById('submit-disciplina').click();
}

function InfoDisciplina(params) {
    document.getElementById("general-info").remove()
    let areaGraficos = document.getElementById("area-charts");

    let section = document.createElement("section");
    let div = document.createElement("div");
    div.id = "op_x_div_8";
    div.className = "graficos";

    section.appendChild(div);
    areaGraficos.appendChild(section);
    Graficos(div);

}

function Graficos(div) {
    var dadosDiscentes = document.getElementById("dadosDiscentes").innerHTML;

dadosDiscentes = JSON.parse(dadosDiscentes);

var dadosGraficoDiscentes = [['Disciplinas', 'Discentes']];
for(let i = 0; i < dadosDiscentes.length; i++){
    let nome = dadosDiscentes[i].Nome;
    let quantidade = dadosDiscentes[i].Discentes;

    dadosGraficoDiscentes.push([
        nome, quantidade,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoDiscentes);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais quantidades de discentes",
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(div);
    chart.draw(view, options);
}


}













