var dadosGraficoInsucessos = [['Disciplinas', 'Insucessos']];
for(let i = 0; i < dadosInsucessos.length; i++){
    let nome = dadosInsucessos[i].Nome;
    let cancelamentos = dadosInsucessos[i].Insucessos;

    dadosGraficoInsucessos.push([
        nome, cancelamentos,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoInsucessos);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais Insucessos",
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_8"));
    chart.draw(view, options);
}
