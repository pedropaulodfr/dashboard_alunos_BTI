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
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_1"));
    chart.draw(view, options);
}
