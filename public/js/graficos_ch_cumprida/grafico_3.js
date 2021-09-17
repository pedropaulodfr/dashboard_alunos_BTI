var dadosSomaCH = document.getElementById("dadosSomaCH").innerHTML;

dadosSomaCH = JSON.parse(dadosSomaCH);

var dadosGraficoSomaCH = [];
for(let i = 0; i < dadosSomaCH.length; i++){
    let ingresso = dadosSomaCH[i].INGRESSO;
    let soma = dadosSomaCH[i].SOMA;

    dadosGraficoSomaCH.push([
        ingresso, soma,
    ])
}

google.charts.load('current' , {'packages': ['corechart']});
google.charts.setOnLoadCallback( drawChart );

function drawChart(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Período');
    data.addColumn('number', 'Soma das integralizações');
    
    data.addRows(
        dadosGraficoSomaCH       
    );

    var options = {
        title: 'CH Integralizadas',
        legend: { position: 'bottom' },
        colors:['#00689b','#b3d3e2'],
        backgroundColor: "transparent",
        pointSize: 7,
        pointShape: { type: 'point', rotation: 180}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}