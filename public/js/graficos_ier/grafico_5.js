var dadosGraficoCancelamentos = [];
for(let i = 0; i < dadosCancelamentos.length; i++){
    let periodo = dadosCancelamentos[i].PERIODO;
    let quantidade = dadosCancelamentos[i].CANCELAMENTOS;

    dadosGraficoCancelamentos.push([
        periodo, quantidade,
    ])
}

google.charts.load('current' , {'packages': ['corechart']});
google.charts.setOnLoadCallback( drawChart );

function drawChart(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Período');
    data.addColumn('number', 'Cancelamentos');
    
    data.addRows(
        dadosGraficoCancelamentos       
    );

    var options = {
        title: 'Cancelamentos',
        legend: { position: 'bottom' },
        colors:['#00689b','#b3d3e2'],
        backgroundColor: "transparent",
        pointSize: 7,
        pointShape: { type: 'point', rotation: 180}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_5'));
    chart.draw(data, options);
}