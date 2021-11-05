var dadosGraficoRepRelatMedia = [['Disciplinas', 'Media']];
for(let i = 0; i < dadosRepRelatMedia.length; i++){
    let nome = dadosRepRelatMedia[i].Nome;
    let media = dadosRepRelatMedia[i].Media;

    dadosGraficoRepRelatMedia.push([
        nome, media,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoRepRelatMedia);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais reprovações relativas por Média",
        hAxis: {title: 'Disciplinas que reprovaram pelo menos 30% de sua capacidade', titleTextStyle: {color: '#e28743'}},
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_2"));
    chart.draw(view, options);
}

