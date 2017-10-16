define(["connections"], function(connections){
$.widget( "custom.progress", {
          id:'custom_progress',
	  options:{
                    data:{
                    
                              columns:[
                                        {width:'100',height:'500',typeData:'container',id:'cp_graph',clear:true,title:'Informaci&oacute;n de totales'},
                                        {width:'30',height:'100',typeData:'container2',id:'cp_total',clear:true,title:'Total de predios'},
                                        {width:'30',height:'100',typeData:'container2',id:'cp_na',clear:true,title:'Predios asignados'},
                                        {width:'30',height:'100',typeData:'container2',id:'cp_a',clear:true,title:'Predios georreferenciados'},
                                        {width:'30',height:'100',typeData:'container2',id:'cp_d',clear:true,title:'Brigadistas'},
                                        {width:'30',height:'100',typeData:'container',id:'cp_progress',clear:true,title:'Avance'},
                                        {width:'30',height:'300',typeData:'container',id:'cp_pie',clear:true,title:''},
                                        {width:'70',height:'300',typeData:'container',id:'cp_bar',clear:true,title:''},
                                        {width:'100',height:'300',typeData:'container',id:'cp_table',clear:true,title:''},
                                        {width:'100',height:'500',typeData:'container',id:'cp_map',clear:false,title:''}
                              ],
                              params:{},
                              file:'nacional',
                              type:'Entidad',
                              event:function(){}
                    },
                    path:'data/geojson/'
          },
          getTable:function(data){
                    var obj=this;
                    var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading">'+
                                  '<p>Folio</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading ">'+
                                  '<p>Nombre de predio</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading ">'+
                                  '<p>Presupuesto programado</p>'+
                              '</div>'+
                          '</div>';
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              var avance = ((i.delivered*100)/i.assigned);
                              avance = avance.toFixed(2);
                              avance+="%";
                              chain+='<div class="Row">'+
                                        '<div class="Cell borderRow '+clase+'">'+
                                            '<p>'+i.label+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'">'+
                                            '<p>'+i.cve_ent+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'">'+
                                            '<p>'+i.notassigned+'</p>'+
                                        '</div>'+
                                    '</div>';
                                  
                    }
                    chain+='</div>';
                    return chain;
          },
          getColumns:function(){
                    var obj = this;
                    var c = obj.options.data.columns;
                    var chain='';
                    for(var x in c){
                              var i = c[x];
                              chain+='<div class="column w'+i.width+'" style="height:'+i.height+'px;">'+
                                        '<div class="'+i.typeData+'">'+
                                                  ((i.title)?'<div class="title">'+i.title+'</div>':'')+
                                                  '<div class="data" id="'+i.id+'"></div>'+
                                        '</div>'+
                                '</div>';
                    }
                    return chain;
          },
          
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          
          
	  buildStructure:function(){
                    var obj=this;
                    obj.clearColumns();
                    var chain='<div class="'+obj.id+'" id="'+obj.id+'">'+
                                        obj.getColumns()+
                              '</div>';
                    $(obj.element).html(chain);
	  },
          clearColumns:function(){
                    var obj = this;
                    var o = obj.options.data.column;
                    for(var x in o){
                              var i = o[x];
                              $("#"+i.id).html('');
                    }
          },
          events:function(){
                    var obj=this;
                    //obj.loadFile(obj.options.data.file);
                    obj.requestProgress(obj.options.data.params) 
          },
          showProgress:function(data){
                    var total = data.totals;
                    var obj=this;
                    /*
                    obj.showMapGraph(data.data);
                    obj.showBarGraph(data.data);
                    obj.showPieGraph(data.totals);
                    var avance = ((total.delivered*100)/total.totals);
                    avance = avance.toFixed(2);
                    avance+="%";
                    $("#cp_na").html('<div>'+total.assigned+'</div>');
                    $("#cp_a").html('<div>'+total.delivered+'</div>');
                    $("#cp_d").html('<div>'+total.brigadist+'</div>');
                    $("#cp_total").html('<div>'+total.totals+'</div>');         
                    $("#cp_progress").html('<div>'+avance+'</div>');
                    */
                    $("#cp_table").html(obj.getTable(data));
                    
                           /*
                    var chainMap=''+       
                            '<div class="app_left_section"></div>'+
			    '<div class="app_right_section">'+
				'<div class="app_center_section">'+
				    '<div id="map" class="app_map_section mapForExecutive"></div>'+
				    '<div class="app_tool_section"></div>'+
				'</div>'+
				'<div class="app_bottom_section bottomForExecutive">'+
				    '<div class="barGraph"></div>'+
				    '<div class="pieGraph"></div>'+
				'</div>'+
			    '</div>';       
                    $("#cp_map").html(chainMap);
                    
                    obj.options.data.event();
                    */
          },
          showPieGraph:function(info){
                    
                    $('#cp_pie').highcharts({
                              chart: {
                                  plotBackgroundColor: null,
                                  plotBorderWidth: null,
                                  plotShadow: false
                              },
                              title: {
                                  text: 'Resumen de avance',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              tooltip: {
                                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                                  name: 'Avance',
                                  data: [
                                      ['Predios levantados',   info.delivered],
                                      ['Predios faltantes',    info.assigned-info.delivered]
                                  ]
                              }]
                    });
                    
          },
          showBarGraph:function(info){
                    var programado=[];
                    var entregado=[];
                    var categorias = [];
                    for(var x in info){
                              var i = info[x];
                              categorias.push(i.label);
                              programado.push(i.assigned);
                              entregado.push(i.delivered);
                    }
                    
                      $('#cp_bar').highcharts({
                              chart: {
                                  type: 'column'
                              },
                              title: {
                                  text: 'Programado Vs realizado',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  categories: categorias,
                                  crosshair: true
                              },
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: 'Predios'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y:.1f} predios</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  column: {
                                      pointPadding: 0.2,
                                      borderWidth: 0
                                  }
                              },
                              series: [{
                                  name: 'Programado',
                                  data: programado
                      
                              }, {
                                  name: 'Entregado',
                                  data: entregado
                      
                              }]
                    });
          },
          showMapGraph:function(info){
                    var obj = this;
                    var data = [];
                    
                    for(var x in info){
                              data.push({"CVE_ENT":info[x].cve_ent,"value":info[x].delivered});
                    }
                    //$('#cp_graph').html('');
                    
                    $('#cp_graph').highcharts('Map', {

                              title : {
                                  text : 'Mapa nacional de avance de trabajo',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                      
                              subtitle : {
                                  text : ''
                              },
                      
                              mapNavigation: {
                                  enabled: true,
                                  buttonOptions: {
                                      verticalAlign: 'top'
                                  }
                              },
                              colorAxis: {
                                        min: 0,
                                        minColor: '#E6E7E8',
                                        maxColor: '#005645'
                              },
                              credits:{
                                      enabled:false	
                              },
                              plotOptions: {
                                      series: {
                                          cursor: 'pointer',
                                          point: {
                                              events: {
                                                  click: function() {
                                                      console.log(this)
                                                  }
                                              }
                                          }
                                      }
                              },
                              series : [{
                                  data : data,
                                  mapData: Highcharts.maps[obj.options.path+obj.options.data.file],
                                  joinBy: 'CVE_ENT',
                                  name: obj.options.data.type,
                                  states: {
                                      hover: {
                                          color: '#BADA55'
                                      }
                                  },
                                  dataLabels: {
                                      enabled: true,
                                      format: '{point.properties.NOM_MUN}'
                                  }
                              }]
                    });
          },
          loadFile : function(file){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                        Highcharts.maps[obj.options.path+obj.options.data.file]=json; 
                            },
                            beforeSend: function(xhr) {
                                                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                              obj.requestProgress(obj.options.data.params) 
                            }
                    };
                    r = $.extend(r, connections.progress.data);
                    r.url=obj.options.path+file+'.js';
                    $.ajax(r);
          },
          requestProgress : function(params){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        for(var x in json.data){
                                                  
                                        }
                                       obj.showProgress(json.data);
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                    };
                    r = $.extend(r, connections.progress.data);
                    r.data = params;
                    $.ajax(r);
          },
           _init:function(){
                    
          },
          _create: function() {
		this.update();
          },
      
          _refresh: function(){
            // trigger a callback/event
            this._trigger( "change" );
          },
         
          _destroy: function() {
              this.element.remove();
          },
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});