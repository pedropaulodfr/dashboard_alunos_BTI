var dadosIntegralizacoes = document.getElementById("dadosIntegralizacoes").innerHTML;

dadosIntegralizacoes = JSON.parse(dadosIntegralizacoes);


let cumprida = 0;
let nula = 0;
let integralizando = 0;

let dadosGraficoIntegralizacoes  = [['Cumpridas', 'Nulas']];
for(let i = 0; i < dadosIntegralizacoes.length; i++){
    var percTotal = dadosIntegralizacoes[i].Perc_Total;

    if (percTotal >= 100) {
        cumprida++;
    }
    if (percTotal == 0) {
        nula++;
    }
    if ((percTotal > 0) && (percTotal < 100)) {
        integralizando++;
    }
}

google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Cumpridas', 'Nulas'],
            ["CUMPRIDAS", cumprida],
            ["NULAS", nula],
            ["PROGRESSO", integralizando]
        ]);

    var options = {
        title: 'Integralizações',
        pieHole: 0.4,
        colors:['#80b3ce','#66a5c4', '00689b'],
        backgroundColor: "transparent",
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}