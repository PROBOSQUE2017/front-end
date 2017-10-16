define(["connections"], function(connections){
    
    var show = function(data){
	buildColumChart(data);
	buildPieChart();
    };
    var buildColumChart = function(data){
	$('.app_bottom_section .barGraph').html('');
	var categories=[];
	var assigned =[];
	var delivered=[];
	
	for(var x in data){
	    var i = data[x];
	    categories.push(i.user);
	    //assigned.push(i.assigned);
	    //delivered.push(i.delivered);
	    assigned.push(10);
	    delivered.push(10);
	}
	
    
	$('.app_bottom_section .barGraph').highcharts({
	    chart: {
		type: 'column'
	    },
	    title: {
		text: ''
	    },
	    credits:{
		enabled:false
	    },
	    xAxis: {
		categories: categories,
	    },
	    yAxis: {
		min: 0,
		title: {
		    text: 'Predios'
		},
		stackLabels: {
		    enabled: true,
		    style: {
			fontWeight: 'bold',
			color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
		    }
		}
	    },
	    legend: {
		align: 'right',
		x: -30,
		verticalAlign: 'top',
		y: 0,
		floating: true,
		backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
		borderColor: '#CCC',
		borderWidth: 1,
		shadow: false
	    },
	    tooltip: {
		formatter: function () {
		    return '<b>' + this.x + '</b><br/>' +
			this.series.name + ': ' + this.y + '<br/>' +
			'Total: ' + this.point.stackTotal;
		}
	    },
	    plotOptions: {
		column: {
		    stacking: 'normal',
		    dataLabels: {
			enabled: true,
			color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
			style: {
			    textShadow: '0 0 3px black'
			}
		    }
		}
	    },
	    series: [{
		name: 'Asignados',
		data: assigned,
		color:'#C5002E'
	    }, {
		name: 'Entregados',
		data: delivered,
		color:'#FFB620'
	    }]
	});
    };
    var buildPieChart=function(){
	$('.app_bottom_section .pieGraph').highcharts({
	    colors:['#007836','#C5002E','#FFB620'],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
	    credits:{
		enabled:false
	    },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Total',
                data: [
                    ['Disponibles',   200],
                    ['Asignados',       100],
                    ['Entregados',   50]
                ]
            }]
        });

    }
    var request = function(params){
	    
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
	    var r= {
		    success:function(json,estatus){
			var valid=false;
			if (json){
			    if (json.response.sucessfull){
				valid=true;
				show(json.data);
			    }else{
				msg=json.response.message;
			    }
			}
			if (!valid) {
			    
			}
			
		    },
		    beforeSend: function(solicitudAJAX) {
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
		    },
		    complete: function(solicitudAJAX,estatus) {
		    }
	    };
	    r = $.extend(r, connections.graph.bottom);
	    r.data = params;
	    $.ajax(r);
    };
   
    return {
	    show:function(user){
		var id = (user.roleId==6)?1:user.id;
		var params = {action:'get',type:'graph',user:id};
		request(params);
	    }
    }
    
});