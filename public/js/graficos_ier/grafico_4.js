var dadosTrancamentos = document.getElementById("dadosTrancamentos").innerHTML;

dadosTrancamentos = JSON.parse(dadosTrancamentos);

var dadosGraficoTrancamentos = [];
for(let i = 0; i < dadosTrancamentos.length; i++){
    let periodo = dadosTrancamentos[i].PERIODO;
    let quantidade = dadosTrancamentos[i].TRANCAMENTOS;

    dadosGraficoTrancamentos.push([
        periodo, quantidade,
    ])
}

google.charts.load('current' , {'packages': ['corechart']});
google.charts.setOnLoadCallback( drawChart );

function drawChart(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Período');
    data.addColumn('number', 'Trancamentos');
    
    data.addRows(
        dadosGraficoTrancamentos       
    );

    var options = {
        title: 'Trancamentos',
        legend: { position: 'bottom' },
        colors:['#00689b','#b3d3e2'],
        backgroundColor: "transparent",
        pointSize: 7,
        pointShape: { type: 'point', rotation: 180}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_4'));
    chart.draw(data, options);
}