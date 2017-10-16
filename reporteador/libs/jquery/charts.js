function drawGraphicsCake (serie, titulo){
 $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: titulo
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    inside: true,
                    format: '<b>{point.name}</b>: <br>{point.y}</br>',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Porcentaje',
            colorByPoint: true,
            data: serie
        }]
    });  

 }

 function drawGraphicsBars(categorias, serieNumerica, titulo, nameEjeY, nameSerie, unity,color,infor){
    
 	$('#container').highcharts({

        chart: {
            type: 'column'
        },
        title: {
            text: titulo
        },
        xAxis: {
            categories: categorias
        },
        plotOptions: {
            series: {
                 dataLabels: {

                        enabled: infor,
                        rotation: -90,
                        color: '#FFFFFF',
                        inside: true,
                    }
            }
        },
        yAxis: {
            lineWidth: 1,
            tickWidth: 1,
             title: {
                text: nameEjeY

            },
            labels: {
                formatter: function () {
                    return this.value +' '+ unity;
                }
            },      
        },

        series: [{
        	name: nameSerie,
            color: color,
            data: serieNumerica
        }]

    });

 }


 function drawGraphicsLine(categorias,serie,titulo,subtitulo,unidad,titutloEjeY,info){
 	  $('#container').highcharts({
        title: {
            text: titulo,
            x: -20 //center
        },
        subtitle: {
            text: subtitulo,
            x: -20
        },
        xAxis: {
            categories: categorias
        },
        yAxis: {
            title: {
                text: titutloEjeY
            },
             labels: {
                formatter: function () {
                    return this.value +' '+unidad;
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        plotOptions: {
            series: {
                 dataLabels: {
                        enabled: info,
                       
                        color: '#FFFFFF',
                         y: 30,
                    }
            }
        }
        ,
        tooltip: {
            valueSuffix: unidad
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: serie
    });
 }



	
