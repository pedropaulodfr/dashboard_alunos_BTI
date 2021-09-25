var dadosCancelamentos = document.getElementById("dadosCancelamentos").innerHTML;

dadosCancelamentos = JSON.parse(dadosCancelamentos);

var dadosGraficoCancelamentos = [['Disciplinas', 'Cancelamentos']];
for(let i = 0; i < dadosCancelamentos.length; i++){
    let nome = dadosCancelamentos[i].Nome;
    let cancelamentos = dadosCancelamentos[i].Cancelamentos;

    dadosGraficoCancelamentos.push([
        nome, cancelamentos,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoCancelamentos);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais Cancelamentos",
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_6"));
    chart.draw(view, options);
}
