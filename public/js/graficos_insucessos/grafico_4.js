var dadosRepFalta = document.getElementById("dadosRepFalta").innerHTML;

dadosRepFalta = JSON.parse(dadosRepFalta);

var dadosGraficoRepFalta = [['Disciplinas', 'Falta']];
for(let i = 0; i < dadosRepFalta.length; i++){
    let nome = dadosRepFalta[i].Nome;
    let falta = dadosRepFalta[i].Falta;

    dadosGraficoRepFalta.push([
        nome, falta,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoRepFalta);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais reprovações por Falta",
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "35%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_4"));
    chart.draw(view, options);
}
