var dadosAtivos = document.getElementById("dadosAtivos").innerHTML;

dadosAtivos = JSON.parse(dadosAtivos);

var dadosGraficoAtivos = [];
for(let i = 0; i < dadosAtivos.length; i++){
    let periodo = dadosAtivos[i].PERIODO;
    let quantidade = dadosAtivos[i].ATIVOS;

    dadosGraficoAtivos.push([
        periodo, quantidade,
    ])
}

google.charts.load('current' , {'packages': ['corechart']});
google.charts.setOnLoadCallback( drawChart );

function drawChart(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Período');
    data.addColumn('number', 'Ativos');
    
    data.addRows(
        dadosGraficoAtivos       
    );

    var options = {
        title: 'Ativos',
        legend: { position: 'bottom' },
        colors:['#00689b','#b3d3e2'],
        backgroundColor: "transparent",
        pointSize: 7,
        pointShape: { type: 'point', rotation: 180}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_2'));
    chart.draw(data, options);
}