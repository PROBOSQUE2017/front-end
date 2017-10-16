define(["connections","map","validator","Alert"], function(connections,map,validator,Alert){
$.widget( "custom.tabulate", {
          id:'custom_tabulate',
          countSpinner:0,
          fields:{},
          pagination:{
                    pages:10,
                    currentPage:1,
                    totalPages:0,
                    reload:'true',
                    type:'more'
          },
          firstReport:true,
          totalRows:100,
          fieldToFilter:null,
          tabActive:'',
          graphLoaded:false,
          dataSend:{
                    fields:[],
                    order:{},
                    filter:{}
          },
          steps:{
                    /*
                    step1:{
                              label:'Selecci&oacute;n de campos',
                              number:'01',
                              valid:false
                    },*/
                    step2:{
                              label:'Ordenado y filtro',
                              number:'02',
                              valid:false
                    }/*,
                    step3:{
                              label:'Despliegue y titulo',
                              number:'03',
                              valid:false
                    }*/
          },
          options:{
                    data:{userActive:null},
                    controller:null
          },
          getBlocker :function(){
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.GIF">'+
                                                  '<div class="label">Procesando</div>'+
                                        '</div>'+
                                '</div>';
                    return chain;
          },
          showSpinner:function(){
                    var obj=this;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").show();
                    }
                    obj.countSpinner+=1;
                   
          },
          hideSpinner:function(){
                    var obj=this;
                    obj.countSpinner-=1;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").hide();
                    }
          },
          request : function(params,action,typeGraph){
                    obj=this
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        switch(action){
                                                  case "getFields":
                                                            obj.createFields(json.data,'fieldsToSelect',true);
                                                            obj.createFields(json.data,'fieldsSelected',false);
                                                            break;
                                                  case "getReport":
                                                            if (json.data.length>0) {
                                                                      obj.updatePagination(json.pageinfo);
                                                                      if (json.columns) {
                                                                                obj.dataSend.fields=json.columns;
                                                                      }
                                                                     // if ($(".custom_tabulate #displayColumns").prop('checked')) {
                                                                               obj.showReport(json.data);
                                                                      //}else{
                                                                      //          obj.showReportRows(json.data);
                                                                     // }
                                                            }else{
                                                                      $(".custom_tabulate .pagination").html('');
                                                                      $(".results_table_filter_tabulate").html('No se encontraron coincidencias');
                                                            }
                                                            break;
                                                  case "getGraph":
                                                            obj.showGraph(typeGraph,json.data);
                                                            break;
                                                  case "getSeed":
                                                            setTimeout(function(){
                                                                      var source=connections.tabulate.downloadCvs;
                                                                      var r = $.extend(r, source);
                                                                      var path = r.url+'&filename=reporte&id='+json.data+'&user='+obj.options.data.userActive.id;
                                                                      window.open(path);
                                                            },100);
                                                            break;
                                                  case "getSeedPdf":
                                                            setTimeout(function(){
                                                                      var source=connections.tabulate.downloadPdf;
                                                                      var r = $.extend(r, source);
                                                                      var path = r.url+'&filename=reporte&id='+json.data+'&user='+obj.options.data.userActive.id;
                                                                      window.open(path);
                                                            },100);
                                                            break;
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                                
                            },
                            beforeSend: function(xhr) {
                                obj.showSpinner();
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                               obj.hideSpinner();
                            }
                            };
                    var source='';
                    
                    switch (action) {
                              case 'getFields':source = connections.tabulate.getFields;
                                        r = $.extend(r, source);
                                        r.data=params;
                                        break;
                              case 'getReport':source=connections.tabulate.getReport;
                                        r = $.extend(r, source);
                                        r.data={action:'getall',user:obj.options.data.userActive.id,rows:obj.totalRows,page:obj.pagination.currentPage};
                                        if (params) {
                                                r.data.json = JSON.stringify(params);
                                        }
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getGraph':source=connections.tabulate.getGraph;
                                        
                                        r = $.extend(r, source);
                                        r.data={action:'get',user:obj.options.data.userActive.id,json:JSON.stringify(params)};
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getSeed':source=connections.tabulate.getSeed;
                                        r = $.extend(r, source);
                                        r.data={action:'get',user:obj.options.data.userActive.id,json:JSON.stringify(params)};
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getSeedPdf':source=connections.tabulate.getSeedPdf;
                                        r = $.extend(r, source);
                                        r.data={action:'get',user:obj.options.data.userActive.id,json:JSON.stringify(params)};
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                                       
                    }
                    $.ajax(r);
          },
          addEventToFielsRow:function(block,visible){
                    var obj = this;
                    $("."+obj.id +" ."+block+" .itemFieldReport").each(function(){
                              $(this).click(function(){
                                        var clase = "itemFieldReport_selected";
                                        var status = $(this).attr('status');
                                        if (status=='') {
                                                  status = "true";
                                                  $(this).addClass(clase);
                                        }else{
                                                  status = '';
                                                  $(this).removeClass(clase);
                                        }
                                        $(this).attr('status',status);
                              }).dblclick(function(){
                                        var block = $(this).attr('block')
                                        var field = $(this).attr('ref');
                                        if (block=='fieldsToSelect') {
                                                  obj.fields[field].selected = true;
                                                  $(this).removeClass('itemFieldReport_selected');
                                                  $("."+obj.id+" .fieldsSelected #R"+field).show();
                                        }else{
                                                  
                                                  obj.fields[field].selected = false;
                                                  $(this).removeClass('itemFieldReport_selected');
                                                  $("."+obj.id+" .fieldsToSelect #R"+field).show();
                                        }
                                        $(this).hide();
                                        $(this).attr('status','');
                                        
                              }); 

                              
                    });
                    if (!visible) {
                              $("."+obj.id +" ."+block+" .itemFieldReport").each(function(){
                                        $(this).hide();
                              });
                    }
          },
          showGraph:function(tipo,data){
                    var obj = this;
                    tipo = parseInt(tipo);
                    $(".graphPrint").remove();
                    var chain = '<div class="title_report">'+$("#field_graph option:selected").val()+'</div>';
                    $("body").append('<div class="graphPrint" style="display:none">'+chain+'<center><div class="containerg"></div></center></div>');
                    if (tipo==1) {
                              obj.showBarGraph(data,'data_graph');
                              obj.showBarGraph(data,'containerg');
                    }else{
                              obj.showPieGraph(data,'data_graph');
                              obj.showPieGraph(data,'containerg');
                    }
          },
          showBarGraph:function(data,clase){
                    var source = [];
                    var field = $("#field_graph option:selected").val();
                    var etiqueta = obj.fields[field].label;
                    for(var x in data){
                              var i = data[x];
                              source.push([i.label,parseInt(i.value)]);
                    }
                    $('.'+clase).html();
                    $('.'+clase).highcharts({
                              chart: {
                                  type: 'column'
                              },
                              title: {
                                  text: ''
                              },
                              subtitle: {
                                  text: ''
                              },
                              credits:{
                                        enabled:false        
                              },
                              xAxis: {
                                  type: 'category',
                                  labels: {
                                      rotation: -45,
                                      style: {
                                          fontSize: '13px',
                                          fontFamily: 'Verdana, sans-serif'
                                      }
                                  }
                              },
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: etiqueta
                                  }
                              },
                              legend: {
                                  enabled: false
                              },
                              tooltip: {
                                  pointFormat: '{point.y}'
                              },
                              series: [{
                                  name: etiqueta,
                                  data: source,
                                  dataLabels: {
                                      enabled: true,
                                      rotation: -90,
                                      color: '#FFFFFF',
                                      align: 'right',
                                      format: '{point.y:.1f}', // one decimal
                                      y: 10, // 10 pixels down from the top
                                      style: {
                                          fontSize: '13px',
                                          fontFamily: 'Verdana, sans-serif'
                                      }
                                  }
                              }]
                          });
          },
          showPieGraph:function(data,clase){
                    var source = [];
                    var field = $("#field_graph option:selected").val();
                    var etiqueta = obj.fields[field].label;
                    for(var x in data){
                              var i = data[x];
                              source.push([i.label,parseInt(i.value)]);
                    }
                    $('.'+clase).html();
                    $('.'+clase).highcharts({
                              chart: {
                                  plotBackgroundColor: null,
                                  plotBorderWidth: null,
                                  plotShadow: false
                              },
                              title: {
                                  text: ''
                              },
                              credits:{
                                        enabled:false        
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
                                          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                          style: {
                                              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                          }
                                      }
                                  }
                              },
                              series: [{
                                  type: 'pie',
                                  name: etiqueta,
                                  data: source
                              }]
                    });
          },
	  createFields:function(data,block,visible){
                    var chain='';
                    var obj = this;
                    for(var x in data){
                              var i = data[x];
                              i.selected=false;
                              obj.fields[i.field]=i;
                              chain+='<div class="itemFieldReport" id="R'+i.field+'" ref="'+i.field+'" status="" block="'+block+'">'+
                                        '<div class="label">'+i.label+'</div>'+
                                     '</div>';
                    }
                    $("."+obj.id +" ."+block+" .dataBlock").html('');
                    $("."+obj.id +" ."+block+" .dataBlock").append(chain);
                    obj.addEventToFielsRow(block,visible);
                    
                    
          },
          existFieldsSelected:function(){
                    var obj = this;
                    var exist = false;
                              for(var x in obj.fields){
                                        var i = obj.fields[x];
                                        if (i.selected) {
                                                  exist=true;
                                                  break;
                                        }
                              }
                    return exist;
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          _init:function(){
                   this.show();
	  },
          _create: function() {
		this.update();
          },
          getSectionHeader:function(){
                    var chain='';
                    var obj=this;
                    for(var x in obj.steps){
                              var i = obj.steps[x];
                              chain+='<div class="step step'+parseInt(i.number)+'">'+
                                        '<div class="vignette">'+
                                                  '<div class="template_tabulate ttab_vignette"></div>'+
                                                  '<div class="number">'+i.number+'</div>'+
                                        '</div>'+
                                        '<div class="label">'+i.label+'</div>'+
                                    '</div>';
                    }
                    return chain;
          },
          getSection1:function(){
                    var chain='<div class="section1 section">'+
                                        '<div class="row">'+
                                                  '<div class="col s12 m6">'+
                                                            '<div class="fieldsToSelect boxContainer">'+
                                                                      '<div class="titleBlock"><div class="label">Campos disponibles</div></div>'+
                                                                      '<div class="dataBlock"></div>'+
                                                                      '<div class="footerBlock">'+
                                                                                '<div class="label">Enviar</div>'+
                                                                                '<div class="icon">'+
                                                                                          '<div class="template_tabulate2 ttab_row_right"></div>'+
                                                                                '</div>'+
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="col s12 m6">'+
                                                            '<div class="fieldsSelected boxContainer">'+
                                                                      '<div class="titleBlock"><div class="label">Campos seleccionados</div></div>'+
                                                                      '<div class="dataBlock"></div>'+
                                                                      '<div class="footerBlock">'+
                                                                                
                                                                                '<div class="icon">'+
                                                                                          '<div class="template_tabulate2 ttab_row_left"></div>'+
                                                                                '</div>'+
                                                                                '<div class="label">Enviar</div>'+
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<button class="textButton btnRight buttonReport btn waves-effect waves-light" id="btnStep1">'+
                                                            'Siguiente'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                                        
                              '</div>';
                    return chain;
          },
          getSection2:function(){
                    var chain='<div class="section2 section">'+
                                        '<div class="row" style="margin-bottom:10px;">'+
                                                  '<div class="col s12 m6">'+
                                                            '<div id="ordering" class="boxContainer2">'+
                                                                      
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="col s12 m6">'+
                                                            '<div id="filtering" class="boxContainer2" style="border-left: 1px solid #BBBBBB;">'+
                                                            '</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<button class="textButton btnLeft buttonReport btn waves-effect waves-light" id="btnStep2Back">'+
                                                            'Cancelar'+
                                                            '<i class="mdi-hardware-keyboard-arrow-left left"></i>'+
                                                  '</button>'+
                                                  '<button class="textButton btnRight buttonReport btn waves-effect waves-light" id="btnStep2Next">'+
                                                            'Aplicar'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                                        
                              '</div>';
                    return chain;
          },
          getSection3:function(){
                    var chain='<div class="section3 section">'+
                                        '<div class="row">'+
                                                  '<div class="col s12 m6">'+
                                                            '<div id="displaying" class="boxContainer2">'+
                                                                      '<div class="titleSubsection">Despliegue</div>'+
                                                                      '<div class="row" style="margin-top: 40px;">'+
                                                                                '<div class="col s12 m6">'+
                                                                                          '<div class="col s12 m12">'+
                                                                                                    '<div class="template_tabulate ttab_columns"></div>'+
                                                                                          '</div>'+
                                                                                          '<p>'+
                                                                                                    '<input name="group1" type="radio" id="displayColumns" checked="checked" />'+
                                                                                                    '<label for="displayColumns">Por columnas</label>'+
                                                                                          '</p>'+
                                                                                '</div>'+
                                                                                '<div class="col s12 m6">'+
                                                                                          '<div class="col s12 m12">'+
                                                                                                    '<center>'+
                                                                                                    '<div class="template_tabulate ttab_rows"></div>'+
                                                                                                    '</center>'+
                                                                                          '</div>'+
                                                                                          '<p>'+
                                                                                                    '<input name="group1" type="radio" id="displayRows" />'+
                                                                                                    '<label for="displayRows">Por filas</label>'+
                                                                                          '</p>'+
                                                                                '</div>'+
                                                                      '</div>'+
                                                                      
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="col s12 m6">'+
                                                            '<div id="TitleRep" class="boxContainer2" style="border-left: 1px solid #BBBBBB;">'+
                                                                      '<div class="titleSubsection">Titulo del reporte</div>'+
                                                                      '<div class="FieldReport">'+
                                                                                //'<div class="label">Titulo</div>'+
                                                                                   '<input id="name_report" type="text" class="textInput"/>'+
                                                                                
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<button class="textButton btnLeft buttonReport btn waves-effect waves-light" id="btnStep3Back">'+
                                                            'Anterior'+
                                                            '<i class="mdi-hardware-keyboard-arrow-left left"></i>'+
                                                  '</button>'+
                                                  '<button class="textButton btnRight buttonReport btn waves-effect waves-light" id="btnStep3Next">'+
                                                            'Generar reporte'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          getSection4:function(){
                    var obj=this;
                    var chain='<div class="section4 section">'+
                                        obj.getBlocker()+
                                        '<div class="Header">'+
                                                  '<div class="title_report"></div>'+
                                                  '<div class="exportOptions">'+
                                                            //'<div class="itemReport" title="Ver datos tabulares" alt="Ver datos tabulares"><div class="template_tabulate ttab_tabular"></div></div>'+
                                                            //'<div class="itemReport" title="Ver datos gr&aacute;ficas" alt="Ver datos gr&aacute;ficas"><div class="template_tabulate ttab_graph"></div></div>'+
                                                            '<div class="itemReport"><div class="template_tabulate ttab_filter" title="Agregar filtro" alt="Agregar filtro"></div></div>'+
                                                            '<div class="itemReport"><div class="template_tabulate ttab_filter_clear" title="Limpiar filtro" alt="Limpiar filtro"></div></div>'+
                                                            '<div class="itemReport"><div class="template_tabulate ttab_csv"></div></div>'+
                                                            '<div class="itemReport"><div class="template_tabulate ttab_pdf"></div></div>'+
                                                  '</div>'+
                                                  
                                        '</div>'+
                                        '<div class="dataTabular infoReport">'+
                                                  
                                        '</div>'+
                                        '<div class="pagination"></div>'+
                                        '<div class="dataGraph infoReport">'+
                                                  '<div class="option_graph"></div>'+
                                                  '<div class="data_graph"></div>'+
                                        '</div>'+
                                        

                              '</div>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    obj.hide();
                    var o = obj.options.data;
                    var chain = ''+
                              '<div class="'+obj.id+'" align="center">'+
                                        //'<div class="HeaderSection">'+obj.getSectionHeader()+'</div>'+
                                        '<div class="dataSection">'+
                                                  //obj.getSection1()+
                                                  obj.getSection2()+
                                                  //obj.getSection3()+
                                                  obj.getSection4()+
                                        '</div>'+
                              '</div>';
                    this.element.html('');
                    this.element.append(chain);
	  },
         
          show:function(){
                 $("."+this.id).show();   
          },
          
          hide:function(){
                 $("."+this.id).remove();   
          },
          fillDataOrder:function(){
                    var obj = this;
                    obj.dataSend.fields=null;
                    obj.dataSend.fields=[];
                    var chain = '<div class="titleSubsection">Ordenado por campo</div>';
                    chain+='<div class="FieldReport">'+
                              '<div class="label">Campo</div>'+
                              '<select id="field_ordering" class="selectInput">';
                    for(var x in obj.fields){
                              var i = obj.fields[x];
                              //if (i.selected) {
                                        obj.dataSend.fields.push(i);
                                       chain+='<option value="'+i.field+'">'+i.label+'</option>';
                              //}
                              
                    }
                    chain+='</select></div>';
                    
                    chain+='<div class="FieldReport">'+
                           '<div class="label">Orden</div>'+
                              '<select id="type_ordering" class="selectInput">'+
                                        '<option value="1">Ascendente</option>'+
                                        '<option value="2">Descendente</option>'+
                              '</select>'+
                           '</div>';
                    $("."+obj.id+" #ordering").html(chain);
                    
          },
          fillDataFilter :function(){
                    var obj = this;
                    var chain = '<div class="titleSubsection">Filtro por campo</div>';
                    chain+='<div class="FieldReport">'+
                              '<div class="label">Campo</div>'+
                              '<select id="field_filter" class="selectInput" >';
                              
                    for(var x in obj.fields){
                              var i = obj.fields[x];
                              //if (i.selected) {
                              if ((i.datatype!='records')&&(i.type!='multiselect')) {
                                       chain+='<option value="'+i.field+'">'+i.label+'</option>';
                              }
                    }
                    chain+='</select></div>';
                    chain+='<div class="option_filter" style="width:100%;"></div>';
                    $("."+obj.id+" #filtering").html(chain);
                    
                    $("."+obj.id+" #field_filter").change(function(){
                                                  var field = $("."+obj.id+" #field_filter option:selected").val();
                                                  obj.fieldToFilter = obj.fields[field];
                                                  obj.showOptionsFilter(obj.fields[field]);
                    });
                    $("."+obj.id+" #field_filter").change();
          },
          selectSection:function(section){
                    var obj = this;
                    
                    $(".custom_tabulate .HeaderSection").show();
                    var claseVignette = 'activeVignette';
                    var clase = 'section_selected';
                    $("."+obj.id+" ."+clase).removeClass(clase).hide();
                    $("."+obj.id+" .section"+section).addClass(clase).show();
                    $("."+obj.id+" ."+claseVignette).removeClass(claseVignette);
                    $("."+obj.id+" .step"+section).addClass(claseVignette);
                    switch (section) {
                              case 1:
                                        //$(".custom_tabulate .dataSection").css('top','60px');
                                        break;
                              case 2:   //$(".custom_tabulate .dataSection").css('top','60px');
                                        obj.fillDataOrder();
                                        obj.fillDataFilter()
                                        
                                        break;
                              case 3:
                                        obj.storefilterAndOrder();
                                        
                                        
                                        break;
                              
                              case 4:
                                        $(".custom_tabulate .HeaderSection").hide();
                                        $(".custom_tabulate .dataSection").css('top','0px');
                                        $(".dataTabular").show();
                                        $(".dataGraph").hide();
                                        //$(".ttab_tabular").parent().hide();
                                        //$(".ttab_graph").parent().show();
                                        obj.buildReport();
                                        obj.buildSectionGraph();
                                        
                                        obj.graphLoaded=false;
                                        obj.tabActive='tabular';
                                        break;
                    }
                    
          },
          buildSectionGraph:function(){
                    var chain='';
                    var valid = false;
                    chain='<div class="row">'+
                              '<div class="col s12 m6">'+
                                        '<div class="FieldReport">'+
                                                  '<div class="label">Campo</div>'+
                                                  '<select id="field_graph" class="selectInput">';
                                                  for(var x in obj.dataSend.fields){
                                                            var i = obj.dataSend.fields[x];
                                                            if (i.datatype=='numeric') {
                                                                      valid=true;
                                                                      chain+='<option value="'+i.field+'">'+i.label+'</option>';
                                                            }
                                                  }
                    chain+=                      '</select>'+
                                        '</div>'+
                              '</div>'+
                              '<div class="col s12 m6">'+
                                        '<div class="FieldReport">'+
                                                            '<div class="label">Tipo de grafica</div>'+
                                                            '<select id="type_graph" class="selectInput">'+
                                                                      '<option value="1">De barras</option>'+
                                                                      '<option value="2">De pastel</option>'+
                                                            '</select>'+
                                        '</div>'+
                              '</div>';
                    $(".option_graph").html(chain);
                    $("#field_graph").change(function(){
                              var tipo = $('#type_graph option:selected').val();
                              obj.loadGraph(tipo);
                    });
                    $("#type_graph").change(function(){
                              var tipo = $('#type_graph option:selected').val();
                              obj.loadGraph(tipo);
                    });
                    if (!valid) {
                             $(".ttab_graph").parent().hide();
                    }
          },
          hasFolio:function(data){
                    var hasfield = false
                    for(var x in data){
                              var i = data[x];
                              if (i.field=='folio') {
                                        hasfield=true;
                                        break;
                              }
                    }
                    return hasfield;
          },
          buildReport:function(){
                    var obj = this;
                    if (obj.firstReport) {
                              obj.pagination.currentPage=1;
                              obj.pagination.reload='true';
                              obj.pagination.type='more';
                              obj.dataSend.order=null;
                              obj.dataSend.filter=null;
                              obj.request(null,'getReport');
                              
                              obj.firstReport=false;
                    }else{
                              var params = $.extend({}, obj.dataSend);
                              if (obj.dataSend.filter==null) {
                                        delete params.filter;
                              }
                              if (obj.dataSend.order==null) {
                                        delete params.order;
                              }
                              obj.request(params,'getReport');
                    }
          },
          storefilterAndOrder:function(){
                    var obj = this;
                    var fieldOrder = $(".custom_tabulate #field_ordering option:selected").val();
                    var typeOrder = $(".custom_tabulate #type_ordering option:selected").val();
                    obj.dataSend.order = {field:fieldOrder,value:typeOrder,dataType:obj.fields[fieldOrder].dataType};
                    var typeOperator = '1';
                    var valueFilter='';
                    var field_filter = $(".custom_tabulate #field_filter option:selected").val();
                    
                    switch (obj.fieldToFilter.datatype) {
                              case 'numeric':
                              case 'real':
                                        typeOperator = $(".custom_tabulate #type_operator option:selected").val();
                                        valueFilter = $(".custom_tabulate #value_filter").val();
                                        break;
                              case 'list':
                                        valueFilter = $(".custom_tabulate #value_filter option:selected").val();
                                        if (valueFilter=='-1') {
                                                  valueFilter='';
                                        }
                                        break;
                                        
                              default:
                                        valueFilter = $(".custom_tabulate #value_filter").val();       
                    }
                    if(validator.isEmpty(valueFilter)){
                              obj.dataSend.filter = null;
                    }else{
                              valueFilter = validator.replaceTags(valueFilter);
                              obj.dataSend.filter={};
                              obj.dataSend.filter = {field:field_filter,operator:typeOperator,value:valueFilter,datatype:obj.fieldToFilter.datatype};
                    }
                    //console.log(obj.dataSend.filter)
          },
          sendToSelected:function(){
                    var obj = this;
                    $("."+obj.id+" .fieldsToSelect .itemFieldReport_selected").each(function(){
                              var field = $(this).attr('ref');
                              obj.fields[field].selected = true;
                              $(this).hide();
                              $(this).attr('status','');
                              $(this).removeClass('itemFieldReport_selected');
                              $("."+obj.id+" .fieldsSelected #R"+field).show();
                    });
                    
          },
          sendToAvailable:function(){
                    var obj = this;
                    $("."+obj.id+" .fieldsSelected .itemFieldReport_selected").each(function(){
                              var field = $(this).attr('ref');
                              obj.fields[field].selected = false;
                              $(this).hide();
                              $(this).attr('status','');
                              $(this).removeClass('itemFieldReport_selected');
                              $("."+obj.id+" .fieldsToSelect #R"+field).show();
                    });        
          },
          showOptionsFilter:function(data){
                    var chain='';
                    switch (data.datatype) {
                              case 'string':
                                        chain+='<div class="FieldReport">'+
                                                  '<div class="label">Valor</div>'+
                                                  '<input id="value_filter" type="text" class="textInput"/>'+
                                               '</div>';
                              break;
                              case 'list':
                                        var opciones='';
                                        for(var x in data.list.list){
                                                  var i = data.list.list[x];
                                                  opciones+='<option value="'+i.value+'">'+i.label+'</option>';
                                        }
                                        chain+='<div class="FieldReport">'+
                                                  '<div class="label">Valor</div>'+
                                                  '<select id="value_filter" class="selectInput">'+
                                                            '<option value="-1">Cualquier valor</option>'+
                                                            opciones+ 
                                                  '</select>'+
                                               '</div>';
                              break;
                              case 'numeric':
                              case 'real':
                                        chain+='<div class="FieldReport">'+
                                                  '<div class="label">Operador</div>'+
                                                  '<select id="type_operator" class="selectInput">'+
                                                            '<option value="1">=</option>'+
                                                            '<option value="2">></option>'+
                                                            '<option value="3"><</option>'+
                                                  '</select>'+
                                               '</div>'+
                                               '<div class="FieldReport">'+
                                                  '<div class="label">Valor</div>'+
                                                  '<input id="value_filter" type="text" class="textInput"/>'+
                                               '</div>';
                              break;
                              case 'date':
                                        chain+='<div class="FieldReport">'+
                                                  '<div class="label">Valor</div>'+
                                                  '<input id="value_filter" type="text" class="textInput"/>'+
                                               '</div>';
                              break;
                              case 'records':
                              break;
                    
                    }
                    
                    $("."+obj.id+" .option_filter").html(chain);
                    
                    if (data.datatype=='numeric') {
                              $(".custom_tabulate #value_filter").bind("keypress", function(evt) {
                                      var otherresult = 12;
                                        if(window.event != undefined){
                                              otherresult = window.event.keyCode;
                                        }
                                        var charCode = (evt.which) ? evt.which : otherresult;  
                                        var keyChar = String.fromCharCode(charCode);
                                        var keyChar2 = keyChar.toLowerCase();
                                        var re =   /^(-)?(\d*)$/
                                        var result = re.test(keyChar2);
                                        return result;                               
                              }).bind("paste",function(event){
                                        var item = $(this);
                                        setTimeout(function(){
                                                  var value = item.val();
                                                  var re =   /^(-)?(\d*)$/
                                                  var result = re.test(value);
                                                  if (!result) {
                                                        item.val('');
                                                  }
                                        },100);
                                        
                              });
                    }
                    if (data.datatype=='real') {
                              
                              $(".custom_tabulate #value_filter").bind("keypress", function(evt) {
                                      var otherresult = 12;
                                        if(window.event != undefined){
                                              otherresult = window.event.keyCode;
                                        }
                                        var charCode = (evt.which) ? evt.which : otherresult;  
                                        var keyChar = String.fromCharCode(charCode);
                                        var keyChar2 = keyChar.toLowerCase();
                                        var re =   /^(-)?(\d*)(\.?)(\d*)$/
                                        var result = re.test(keyChar2);
                                        var item = $(this);
                                        setTimeout(function(){
                                                  var value = item.val();
                                                  var result = re.test(value);
                                                  if (!result) {
                                                            value = value.substring(0,value.length-1);
                                                            item.val(value);
                                                  }
                                                  
                                        },100);
                                        return result;                               
                              }).bind("paste",function(event){
                                        var item = $(this);
                                        setTimeout(function(){
                                                  var value = item.val();
                                                  var re =   /^(-)?(\d*)(\.?)(\d*)$/
                                                  var result = re.test(value);
                                                  if (!result) {
                                                        item.val('');
                                                  }
                                        },100);
                                        
                              });
                             
                    }
                    if (data.datatype=='date') {
                              $.datepicker.regional['es'] = {
                                        closeText: 'Cerrar',
                                        prevText: '<Ant',
                                        nextText: 'Sig>',
                                        currentText: 'Hoy',
                                        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                                        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                                        dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
                                        dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
                                        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
                                        weekHeader: 'Sm',
                                        dateFormat: 'dd/mm/yy',
                                        firstDay: 1,
                                        isRTL: false,
                                        showMonthAfterYear: false,
                                        yearSuffix: ''
                              };
                              $.datepicker.setDefaults($.datepicker.regional['es']);
                              $(".custom_tabulate #value_filter").bind("keypress", function(evt) {
                                        return false;
                              }).bind("paste",function(event){
                                        return false;
                              }).datepicker();
                    }
          },
          updateInfo:function(){
                    $(".page_selected").click();
          },
          events:function(){
                    var obj=this;
                    $("."+obj.id+" .section").each(function(){
                              $(this).hide();
                    });
                    obj.selectSection(4);
                    
                    obj.request({action:'getcolumns',user:obj.options.data.userActive.id},'getFields');
                    
                    
                    $("."+obj.id+" .fieldsToSelect .footerBlock").click(function(){
                              obj.sendToSelected();
                    });
                    $("."+obj.id+" .fieldsSelected .footerBlock").click(function(){
                              obj.sendToAvailable();
                    });
                    $("."+obj.id+" #btnStep1").click(function(){
                              var valid= obj.existFieldsSelected();
                              if (valid) {
                                        obj.selectSection(2);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['Debe seleccionar por lo menos un campo'],
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnStep2Back").click(function(){
                              //obj.selectSection(1);
                              $(".custom_tabulate .HeaderSection").hide();
                              $(".custom_tabulate .dataSection").css('top','0px');
                              var clase = 'section_selected';
                              $("."+obj.id+" ."+clase).removeClass(clase).hide();
                              $("."+obj.id+" .section4").addClass(clase).show();
                    });
                    $("."+obj.id+" #btnStep2Next").click(function(){
                              var valid = true;
                              /*
                              if (obj.fieldToFilter.datatype!='select') {
                                        if (validator.isEmpty($("#value_filter").val())) {
                                                  valid=false;
                                        }
                                       
                              }
                              */
                              if (valid) {
                                       //obj.selectSection(3);
                                       obj.storefilterAndOrder();
                                       obj.selectSection(4);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['Debe introducir un valor a filtrar'],
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnStep3Back").click(function(){
                              obj.selectSection(2);
                    });
                    $("."+obj.id+" #btnStep3Next").click(function(){
                              var valid = true;
                              if (validator.isEmpty($("#name_report").val())) {
                                                  valid=false;
                              }
                              
                              if (valid) {
                                        obj.pagination.currentPage=1;
                                        obj.pagination.reload='true';
                                        obj.pagination.type='more';
                                       obj.selectSection(4);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['Introduzca un titulo'],
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    /*
                    $(".ttab_print").click(function(){
                              if (obj.tabActive=='tabular') {
                                        $(".reportPrint").css('display','');
                                        $(".section_info_user").hide();
                                        
                                        window.print();
                                         $(".reportPrint").css('display','none');
                                         $(".section_info_user").show();
                              }else{
                                         $(".graphPrint").css('display','');
                                        $(".section_info_user").hide();
                                        
                                        window.print();
                                         $(".graphPrint").css('display','none');
                                         $(".section_info_user").show();
                                        }
                             
                    });
                    */
                    $(".custom_tabulate .ttab_filter").click(function(){
                              obj.selectSection(2);
                    });
                    $(".custom_tabulate .ttab_csv").click(function(){
                              var params = $.extend({}, obj.dataSend);
                              if (obj.dataSend.filter==null) {
                                        delete params.filter;
                              }
                              obj.request(params,'getSeed');
                    });
                    $(".custom_tabulate .ttab_filter_clear").click(function(){
                              obj.firstReport=true;
                              obj.buildReport();
                    });
                    $(".custom_tabulate .ttab_pdf").click(function(){
                            var params = $.extend({}, obj.dataSend);
                              if (obj.dataSend.filter==null) {
                                        delete params.filter;
                              }
                              obj.request(params,'getSeedPdf');
                    });
                    $(".custom_tabulate .ttab_tabular").parent().click(function(){
                              $(".ttab_tabular").parent().hide();
                              $(".ttab_graph").parent().show();
                              $(".dataTabular").show();
                              $(".dataGraph").hide();
                              obj.tabActive = 'tabular';
                    });
                    $(".custom_tabulate .ttab_graph").parent().click(function(){
                              $(".ttab_tabular").parent().show();
                              $(".ttab_graph").parent().hide();
                              $(".dataTabular").hide();
                              $(".dataGraph").show();
                              if (!obj.graphLoaded) {
                                       obj.graphLoaded=true;
                                       obj.loadGraph('1');
                              }
                              obj.tabActive='graph';
                    });
                    
          },
          loadGraph:function(tipo){
                    var obj = this;
                    var field = $("."+obj.id+" #field_graph option:selected").val();
                    var params = $.extend({}, obj.dataSend);      
                    params.graph = {field:field};
                    obj.request(params,'getGraph',tipo);
          },
          showReport:function(data){
                    
                    var obj=this;
                    $(".custom_tabulate .title_report").html($("#name_report").val());
                    //var chain='<div class="title_report">'+$("#name_report").val()+'</div>';
                    var chain='';
                    chain+='<div class="results_table_filter_tabulate">'+
                              '<div class="Heading">';
                                        var clase = 'borderRow';
                                        var source = obj.dataSend.fields;
                                        for(var x in source){
                                                 var clase = (x==0)?'':'borderRow';
                                                 var width = (source[x].label.length>20)?' style="width:300px;" ':' style="width:150px" ';
                                                 
                                                 chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p '+width+'>'+source[x].label+'</p>'+
                                                        '</div>';
                                        }
                    chain+=   '</div>';
                    
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                             
                              chain+='<div class="Row" ref="'+i.wkt+'">';
                              for(var f in source){
                                        var valor = i[source[f].field];
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+valor+'</p>'+
                                               '</div>';
                              }
                              chain+='</div>';
                                  
                    }
                    chain+='</div>';
                    $(".custom_tabulate .dataTabular").html(chain);
                    $(".reportPrint").remove();
                    $("body").append('<div class="reportPrint" style="display:none">'+chain+'</div>');
                    $(".results_table_filter_tabulate .Row").each(function(){
                              $(this).click(function(){
                                        var wkt = $(this).attr('ref');
                                        map.goPoint(wkt);
                              });
                    });
          },
          updatePagination:function(data){
                    var obj = this;
                    obj.pagination.currentPage = data.currentpage;
                    obj.pagination.totalPages = data.totalpages;
                    
                    var tipo = obj.pagination.type;
                    if (obj.pagination.reload=='true') {
                              var initPag = (tipo=='more')?((obj.pagination.currentPage-1)):(obj.pagination.currentPage-obj.pagination.pages);
                              var isinLast=false;
                              var chain='<div class="blockPagination">';
                              chain+=(obj.pagination.currentPage<=obj.pagination.pages)?'':'<div class="page pageRow pageRowLeft" reload="true" type="less" page="'+((tipo=='more')?(obj.pagination.currentPage-1):(initPag))+'"><div class="template_tabulate ttab_prev icon"></div><div class="label">Anterior</div></div>';
                              var page=0;
                              for(var x=1;x<=10;x++){
                                        page = initPag+=1;
                                        if (page<=obj.pagination.totalPages) {
                                                 chain+='<div class="page pageItem" reload="false" page="'+page+'"><div class="label">'+page+'</div></div>';
                                                 if (page==obj.pagination.totalPages) {
                                                  isinLast=true;
                                                 }
                                        }else{
                                                  
                                        }
                                        
                              }
                              chain+=(isinLast)?'':'<div class="page pageRow pageRowRight" reload="true" type="more" page="'+(page+1)+'"><div class="label">Siguiente</div><div class="template_tabulate ttab_next icon"></div></div>';
                              chain+='</div>';
                              chain+='<div class="totalRows">'+validator.getFormatNumber(data.totalrows)+' Registros</div>';
                              $(".custom_tabulate .pagination").html(chain);
                              $(".custom_tabulate .pagination .page").each(function(){
                                        $(this).click(function(){
                                                  var page = parseInt($(this).attr('page'));
                                                  var reload = $(this).attr('reload');
                                                  if (reload=='true') {
                                                            var tipo = $(this).attr('type');
                                                            obj.pagination.type=tipo;
                                                  }
                                                  obj.pagination.currentPage=page;
                                                  obj.pagination.reload=reload;
                                                  
                                                  obj.buildReport();
                                        });
                              });
                    }
                    $(".custom_tabulate #totalRows").html(validator.getFormatNumber(data.totalrows)+' Registros');
                    var clase = 'page_selected';
                    $("."+clase).removeClass(clase);
                    $('.custom_tabulate div[page="'+obj.pagination.currentPage+'"]').addClass(clase);
          },
          showReportRows:function(data){
                    
                    var obj=this;
                    var chain='<div class="title_report">'+$("#name_report").val()+'</div>';
                    chain+='<div class="results_table_filter_tabulate">';
                    var source = obj.dataSend.fields;
                              
                    
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                             
                              
                              for(var f in source){
                                        var valor = i[source[f].field];
                                        chain+='<div class="Row">';
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+source[f].label+'</p>'+
                                               '</div>';
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+valor+'</p>'+
                                               '</div>';
                                        chain+='</div>';
                              }
                              
                                  
                    }
                    chain+='</div>';
                    $(".custom_tabulate .dataTabular").html(chain);
                    $(".reportPrint").remove();
                    $("body").append('<div class="reportPrint" style="display:none">'+chain+'</div>');
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
                                                  this.fields=[];
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});