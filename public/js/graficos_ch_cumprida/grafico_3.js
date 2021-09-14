var dadosSomaCH = document.getElementById("dadosSomaCH").innerHTML;

dadosSomaCH = JSON.parse(dadosSomaCH);

console.log(dadosSomaCH);

var dadosGraficoSomaCH = [['Periodo', 'Soma das integralizações']];
for(let i = 0; i < dadosSomaCH.length; i++){
    let ingresso = dadosSomaCH[i].INGRESSO;
    let soma = dadosSomaCH[i].SOMA;

    dadosGraficoSomaCH.push([
        ingresso, soma,
    ])
}

console.log(dadosGraficoSomaCH);

google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
    var data = google.visualization.arrayToDataTable(
        dadosGraficoSomaCH
    );

    var options = {
        title: 'CH Integralizadas',
        curveType: 'function',
        legend: { position: 'bottom' },
        colors:['#00689b','#b3d3e2'],
        backgroundColor: "transparent",
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}