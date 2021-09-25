var dadosRepAbsMedia = document.getElementById("dadosRepAbsMedia").innerHTML;

dadosRepAbsMedia = JSON.parse(dadosRepAbsMedia);

var dadosGraficoRepAbsMedia = [['Disciplinas', 'Media']];
for(let i = 0; i < dadosRepAbsMedia.length; i++){
    let nome = dadosRepAbsMedia[i].Nome;
    let media = dadosRepAbsMedia[i].Media;

    dadosGraficoRepAbsMedia.push([
        nome, media,
    ]);
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosGraficoRepAbsMedia);

    var view = new google.visualization.DataView(data);

    var options = {
        title: "Mais reprovações absolutas por Média",
        backgroundColor: "transparent",
        colors:['#00689b','#b3d3e2'],
        chartArea:{left:500, width: '100%'},
        bar: {groupWidth: "90%"},
        legend: { position: "none" },
    };
    
    var chart = new google.visualization.BarChart(document.getElementById("top_x_div_3"));
    chart.draw(view, options);
}
