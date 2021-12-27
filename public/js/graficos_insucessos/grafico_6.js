var dadosGraficoCancelamentosRelat = [['Disciplinas', 'Cancelamentos']];
for(let i = 0; i < dadosCancelamentosRelat.length; i++){
    let nome = dadosCancelamentosRelat[i].Nome;
    let cancelamentos = dadosCancelamentosRelat[i].Cancelamentos;

    dadosGraficoCancelamentosRelat.push([
        nome, cancelamentos,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoCancelamentosRelat);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais Cancelamentos relativos",
        hAxis: {title: 'Disciplinas em que pelo menos 30% dos discentes cancelaram', titleTextStyle: {color: '#e28743'}},
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_6"));
    chart.draw(view, options);
}
