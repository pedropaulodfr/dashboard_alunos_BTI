var dadosIntegralizacoes = document.getElementById("dadosIntegralizacoes").innerHTML;

dadosIntegralizacoes = JSON.parse(dadosIntegralizacoes);

var dadosGraficoIntegralizacoes = [];
for(let i = 0; i < dadosIntegralizacoes.length; i++){
    let periodo = dadosIntegralizacoes[i].PERIODO;
    let quantidade = dadosIntegralizacoes[i].INTEGRALIZACOES;

    dadosGraficoIntegralizacoes.push([
        periodo, quantidade,
    ])
}

google.charts.load('current' , {'packages': ['corechart']});
google.charts.setOnLoadCallback( drawChart );

function drawChart(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Período');
    data.addColumn('number', 'Integralizações');
    
    data.addRows(
        dadosGraficoIntegralizacoes       
    );

    var options = {
        title: 'Integralizações',
        legend: { position: 'bottom' },
        colors:['#00689b','#b3d3e2'],
        backgroundColor: "transparent",
        pointSize: 7,
        pointShape: { type: 'point', rotation: 180}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_3'));
    chart.draw(data, options);
}