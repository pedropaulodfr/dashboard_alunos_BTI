var dadosMatriculas = document.getElementById("dadosMatriculas").innerHTML;

dadosMatriculas = JSON.parse(dadosMatriculas);

var dadosGraficoMatricula = [['Ativas', 'Trancadas']];
for(let i = 0; i < dadosMatriculas.length; i++){
    let status = dadosMatriculas[i].Status;
    let quantidade = dadosMatriculas[i].QUANTIDADE;

    dadosGraficoMatricula.push([
        status, quantidade,
    ])
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(
        dadosGraficoMatricula
    );

    var options = {
        title: 'Matrículas',
        pieHole: 0.4,
        slices: [{color: '#00689b'}, {color: '#b3d3e2'}],
        backgroundColor: "transparent",
        pieSliceText: 'percentage' 
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}