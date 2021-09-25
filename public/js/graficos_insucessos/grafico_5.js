var dadosRepMediaFalta = document.getElementById("dadosRepMediaFalta").innerHTML;

dadosRepMediaFalta = JSON.parse(dadosRepMediaFalta);

var dadosGraficoRepMediaFalta = [['Disciplinas', 'Media e Falta']];
for(let i = 0; i < dadosRepMediaFalta.length; i++){
    let nome = dadosRepMediaFalta[i].Nome;
    let mediaFalta = dadosRepMediaFalta[i].MediaFalta;

    dadosGraficoRepMediaFalta.push([
        nome, mediaFalta,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoRepMediaFalta);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais reprovações por Média e Falta",
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_5"));
    chart.draw(view, options);
}
