var dadosGraficoInsucessos = [];
for(let i = 0; i < dadosInsucessos.length; i++){
    var discentes = dadosInsucessos[i].Discentes;
    let cancelamentos = dadosInsucessos[i].Cancelamentos;
    let faltas = dadosInsucessos[i].Falta;
    let media = dadosInsucessos[i].Media;
    let mediaFaltas = dadosInsucessos[i].MediaFalta;

    let percentCancelamentos = Math.round((cancelamentos * 100) / discentes);
    let percentFaltas = Math.round((faltas * 100) / discentes);
    let percentMedias = Math.round((media * 100) / discentes);
    let percentMediaFaltas = Math.round((mediaFaltas * 100) / discentes);

    dadosGraficoInsucessos.push({
        "category": "",
        "from": 0,
        "to": percentFaltas,
        "name": "Faltas",
        "fill": am4core.color("#b3d3e2"),
        // #532971
    }, {
        "category": "",
        "from": percentFaltas,
        "to": percentMediaFaltas,
        "name": "Media e Faltas",
        "fill": am4core.color("#74cbea")
    }, {
        "category": "",
        "from": percentMediaFaltas,
        "to": percentCancelamentos,
        "name": "Cancelamentos",
        "fill": am4core.color("#4aa5d1")
    }, {
        "category": "",
        "from": percentCancelamentos,
        "to": percentMedias,
        "name": "Media",
        "fill": am4core.color("#2672b0")
    });
};

am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("grafico_1", am4charts.XYChart);
    
    // Add data
    chart.data = dadosGraficoInsucessos;

    // title
    let title = chart.titles.create();
    title.text = "Insucessos 2020.2";
    title.fontWeight = "bold";
    title.fontFamily = "Segoe UI"
    title.fontSize = 24;
    title.align = "center";
    
    // Create axes
    var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = "category";
    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.labels.template.disabled = true;
    
    var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.labels.template.disabled = true;
    xAxis.min = 3;
    xAxis.max = 16;
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "to";
    series.dataFields.openValueX = "from";
    series.dataFields.categoryY = "category";
    series.columns.template.propertyFields.fill = "fill";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.height = am4core.percent(100);
    
    // Ranges/labels
    chart.events.on("beforedatavalidated", function(ev) {
      var data = chart.data;
      for(var i = 0; i < data.length; i++) {
        var range = xAxis.axisRanges.create();
        range.value = data[i].to;
        range.label.text = data[i].to + "%";
        range.label.horizontalCenter = "right";
        range.label.paddingLeft = 5;
        range.label.paddingTop = 5;
        range.label.fontSize = 10;
        range.grid.strokeOpacity = 0.2;
        range.tick.length = 18;
        range.tick.strokeOpacity = 0.2;
      }
    });
    
    // Legend
    var legend = new am4charts.Legend();
    legend.parent = chart.chartContainer;
    legend.itemContainers.template.clickable = false;
    legend.itemContainers.template.focusable = false;
    legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
    legend.align = "right";
    legend.data = chart.data;
}); // end am4core.ready()