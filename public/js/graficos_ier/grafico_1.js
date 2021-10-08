var dadosGraficoIngressos = [];
for(let i = 0; i < dadosIngressos.length; i++){
    let periodo = dadosIngressos[i].PERIODO;
    let quantidade = dadosIngressos[i].INGRESSANTES;

    dadosGraficoIngressos.push([
        periodo, quantidade,
    ])
}

google.charts.load('current' , {'packages': ['corechart']});
google.charts.setOnLoadCallback( drawChart );

function drawChart(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Período');
    data.addColumn('number', 'Ingressos');
    
    data.addRows(
        dadosGraficoIngressos       
    );

    var options = {
        title: 'Ingressos',
        legend: { position: 'bottom' },
        colors:['#00689b','#b3d3e2'],
        backgroundColor: "transparent",
        pointSize: 7,
        pointShape: { type: 'point', rotation: 180}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_1'));
    chart.draw(data, options);
}