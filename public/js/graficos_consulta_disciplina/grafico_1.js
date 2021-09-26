let dadosRelatDisciplina = document.getElementById("dadosRelatDisciplina").innerHTML;

dadosRelatDisciplina = JSON.parse(dadosRelatDisciplina);

console.log(dadosRelatDisciplina);

let somaTurmas = 0;
let somaDiscentes = 0;
let somaCancelamentos = 0;
let somaMedia = 0;
let somaFalta = 0;
let somaMediaFalta = 0;
let somaInsucesso = 0;

for (let i = 0; i < dadosRelatDisciplina.length; i++) {
    let turmas = dadosRelatDisciplina[i].Turmas;
    let discentes = dadosRelatDisciplina[i].Discentes;
    let cancelamentos = dadosRelatDisciplina[i].Cancelamentos;
    let media = dadosRelatDisciplina[i].Media;
    let falta = dadosRelatDisciplina[i].Falta;
    let mediaFalta = dadosRelatDisciplina[i].MediaFalta;
    let insucesso = dadosRelatDisciplina[i].Insucesso;

    somaTurmas = somaTurmas + turmas;
    somaDiscentes = somaDiscentes + discentes;
    somaCancelamentos = somaCancelamentos + cancelamentos;
    somaMedia = somaMedia + media;
    somaFalta = somaFalta + falta;
    somaMediaFalta = somaMediaFalta + mediaFalta;
    somaInsucesso = somaInsucesso + insucesso;

}

let dadosGraficoRelatDisciplina = [['Element', 'Quantidade de alunos']];
dadosGraficoRelatDisciplina.push(
    ['Media', somaTurmas], 
    ['Falta', somaFalta],
    ['Media e Falta', somaDiscentes],
    ['Cancelamentos', somaCancelamentos]
);

console.log(dadosGraficoRelatDisciplina);

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoRelatDisciplina);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Reprovações",
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("barchart_values_1"));
    chart.draw(view, options);
}
