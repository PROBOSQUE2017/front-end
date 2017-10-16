define(["connections","map","validator","Alert"], function(connections,map,validator,Alert){
$.widget( "custom.executiveReport", {
          id:'custom_executiveReport',
          countSpinner:0,
          fields:{},
          fieldsMultiRecord:{},
          fieldToFilter:null,
          fieldMultiRecordToFilter:null,
          tabActive:'',
          activeReportMultirecords:false,
          graphLoaded:false,
          dataSend:{
                    fields:[],
                    order:{},
                    filter:{}
          },
          steps:{
                    step1:{
                              label:'Llenado de campos',
                              number:'01',
                              valid:false
                    },
                    step2:{
                              label:'Selecci&oacute;n de periodos y programas',
                              number:'02',
                              valid:false
                    },
                    step3:{
                              label:'Informe Predial',
                              number:'03',
                              valid:false
                    }
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
          request : function(params,action,typeGraph,aditionals,id){
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
                                                  case "getAniosAndPrograms":
                                                            obj.showFieldsToFill(json,aditionals,id);
                                                            break;
                                                  case "getReport":
                                                            //if ($(".custom_executiveReport #displayColumns").prop('checked')) {
                                                                     obj.showReport(json.report,json.columns);
                                                            //}else{
                                                            //          obj.showReportRows(json.data);
                                                            //}
                                                            
                                                            break;
                                                  case "getGraph":
                                                            obj.showGraph(typeGraph,json.data);
                                                            break;
                                                  case "getSeedPdf":
                                                            setTimeout(function(){
                                                                      var source=connections.executive.downloadPdf;
                                                                      var path = source.url+'&filename=reporte&id='+json.data+'&user='+obj.options.data.userActive.id;
                                                                      window.open(path);
                                                            },100);
                                                            break;
                                                  case "getFieldsMiltiRecord":
                                                            obj.buildSelectRecords(json.data);
                                                            break;
                                                  case "getMiltiRecord":
                                                            if ($(".custom_executiveReport #displayColumns").prop('checked')) {
                                                                      obj.showMultirecord(json.data,params);
                                                            }else{
                                                                      obj.showMultirecordRows(json.data,params);
                                                            }
                                                            
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
                              case 'getFields':source = connections.executive.getFields;
                                        r = $.extend(r, source);
                                        r.data=params;
                                        break;
                              case 'getAniosAndPrograms':source = connections.executive.getAniosAndPrograms;
                                        r = $.extend(r, source);
                                        r.data=params;
                                        break;
                              case 'getReport':source=connections.executive.getReport;
                                        r = $.extend(r, source);
                                        r.data=params;
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getGraph':source=connections.reports.getGraph;
                                        
                                        r = $.extend(r, source);
                                        r.data={action:'get',user:obj.options.data.userActive.id,json:JSON.stringify(params)};
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getSeedPdf':source=connections.executive.getSeedPdf;
                                        r = $.extend(r, source);
                                        r.data=params;
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getFieldsMiltiRecord':source=connections.multirecords.getInputs;
                                        r = $.extend(r, source);
                                        r.data={action:'get',name:params.formulario,user:obj.options.data.userActive.id};
                                        break;
                              case 'getMiltiRecord':source=connections.multirecords.getList;
                                        r = $.extend(r, source);
                                        r.data={action:'getall',name:params.formulario,folio:params.folio,user:obj.options.data.userActive.id};
                                        break;
                                       
                    }
                    $.ajax(r);
          },
          showFieldsToFill:function(json,aditionals,id){
                    aditionals.data = json.data;
                    aditionals.operations = json.operations;
                    aditionals.request=json.request;
                    $("#"+id).customTabular(aditionals);
          },
          buildSelectRecords:function(data){
                    var obj=this;
                    var opciones='';
                    obj.fieldsMultiRecord = null;
                    obj.fieldsMultiRecord={};
                    for(var x in data){
                              var i = data[x];
                              obj.fieldsMultiRecord[i.field]=i;
                              opciones+='<option value="'+i.field+'">'+i.label+'</option>';
                    }
                    var chain='';
                    chain+='<div class="FieldReport">'+
                              '<div class="label">Subregistro</div>'+
                              '<select id="fields_multiRecord" class="selectInput">'+
                                        opciones+ 
                              '</select>'+
                    '</div>';
                    $("."+obj.id+" .option_multirecord").html(chain);
                    
                    $("."+obj.id+" #fields_multiRecord").change(function(){
                              var field = $("."+obj.id+" #fields_multiRecord option:selected").val();
                              obj.fieldMultiRecordToFilter=obj.fieldsMultiRecord[field];
                              obj.showOptionsFilter(obj.fieldsMultiRecord[field],'option_filter');
                    });
                    $("."+obj.id+" #fields_multiRecord").change();
          },
          
          showGraph:function(tipo,data){
                    var obj = this;
                    tipo = parseInt(tipo);
                    $(".executiveGraphPrint").remove();
                    var chain = '<div class="title_executiveReport">'+$(".custom_executiveReport #field_graph option:selected").val()+'</div>';
                    $("body").append('<div class="executiveGraphPrint" style="display:none">'+chain+'<center><div class="containerg"></div></center></div>');
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
                    var field = $(".custom_executiveReport #field_graph option:selected").val();
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
                    var field = $(".custom_executiveReport #field_graph option:selected").val();
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
                                                  '<div class="template_executiveReports terep_vignette"></div>'+
                                                  '<div class="number">'+i.number+'</div>'+
                                        '</div>'+
                                        '<div class="label">'+i.label+'</div>'+
                                    '</div>';
                    }
                    return chain;
          },
          getSection1:function(){
                    var chain='<div class="section1 section">'+
                                        '<div id="fields_report">'+
                                                  
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<button class="btnRight buttonReport btn waves-effect waves-light" id="btnStep1">'+
                                                            'Siguiente'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                                        
                              '</div>';
                    return chain;
          },
          getSection2:function(){
                    var chain='<div class="section2 section">'+
                                        '<div id="fields_aniosAndPrograms">'+
                                                  
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<button class="btnLeft buttonReport btn waves-effect waves-light" id="btnStep2Back">'+
                                                            'Anterior'+
                                                            '<i class="mdi-hardware-keyboard-arrow-left left"></i>'+
                                                  '</button>'+
                                                  '<button class="btnRight buttonReport btn waves-effect waves-light" id="btnStep2Next">'+
                                                            'Siguiente'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                                        
                              '</div>';
                    return chain;
          },
          /*
          getSection3:function(){
                    var chain='<div class="section3 section">'+
                                        '<div class="row">'+
                                                  '<div class="col s12 m6">'+
                                                            '<div id="displaying" class="boxContainer2">'+
                                                                      '<div class="titleSubsection">Despliegue</div>'+
                                                                      '<div class="row" style="margin-top: 40px;">'+
                                                                                '<div class="col s12 m6">'+
                                                                                          '<div class="col s12 m12">'+
                                                                                                    '<div class="template_executiveReports terep_columns"></div>'+
                                                                                          '</div>'+
                                                                                          '<p>'+
                                                                                                    '<input name="group1" type="radio" id="displayColumns" checked="checked" />'+
                                                                                                    '<label for="displayColumns">Por columnas</label>'+
                                                                                          '</p>'+
                                                                                '</div>'+
                                                                                '<div class="col s12 m6">'+
                                                                                          '<div class="col s12 m12">'+
                                                                                                    '<center>'+
                                                                                                    '<div class="template_executiveReports terep_rows"></div>'+
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
                                                  '<button class="btnLeft buttonReport btn waves-effect waves-light" id="btnStep3Back">'+
                                                            'Anterior'+
                                                            '<i class="mdi-hardware-keyboard-arrow-left left"></i>'+
                                                  '</button>'+
                                                  '<button class="btnRight buttonReport btn waves-effect waves-light" id="btnStep3Next">'+
                                                            'Generar reporte'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },*/
          getSection3:function(){
                    var obj=this;
                    var chain='<div class="section3 section">'+
                                        //obj.getBlocker()+
                                        '<div class="Header">'+
                                                  '<button class="btnLeft buttonReport btn waves-effect waves-light" id="btnStep4Back">'+
                                                            'Regresar'+
                                                            '<i class="mdi-hardware-keyboard-arrow-left left"></i>'+
                                                  '</button>'+
                                                  '<div class="exportOptions">'+
                                                            '<div class="itemReport" title="Ver datos tabulares" alt="Ver datos tabulares"><div class="template_executiveReports terep_tabular"></div></div>'+
                                                            '<div class="itemReport" title="Ver datos gr&aacute;ficas" alt="Ver datos gr&aacute;ficas"><div class="template_executiveReports terep_graph"></div></div>'+
                                                            '<div class="itemReport"><div class="template_executiveReports terep_print"></div></div>'+
                                                            '<div class="itemReport"><div class="template_executiveReports terep_pdf"></div></div>'+
                                                            //'<div class="itemReport"><div class="template_executiveReports terep_cvs"></div></div>'+
                                                  '</div>'+
                                                  
                                        '</div>'+
                                        '<div class="dataTabular infoReport">'+
                                                  
                                        '</div>'+
                                        '<div class="dataMultirecord infoMultirecord" style="display:none">'+
                                        '</div>'+
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
                                        '<div class="HeaderSection">'+obj.getSectionHeader()+'</div>'+
                                        '<div class="dataSection">'+
                                                  obj.getSection1()+
                                                  obj.getSection2()+
                                                  obj.getSection3()+
                                                  //obj.getSection4()+
                                                  obj.getBlocker()+
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
                              if (i.selected) {
                                        obj.dataSend.fields.push(i);
                                        if ((i.datatype!='records')&&(i.type!='multiselect')) {
                                                  chain+='<option value="'+i.field+'">'+i.label+'</option>';
                                        }
                              }
                              
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
                              //if ((i.selected)&&(i.datatype!='records')&&(i.type!='multiselect')) {
                              if (i.selected) {
                               
                                       chain+='<option value="'+i.field+'">'+i.label+'</option>';
                              }
                    }
                    chain+='</select></div>';
                    chain+='<div class="option_multirecord" style="width:100%;"></div>';
                    chain+='<div class="option_filter" style="width:100%;"></div>';
                    $("."+obj.id+" #filtering").html(chain);
                    
                    $("."+obj.id+" #field_filter").change(function(){
                                                  $("."+obj.id+' .option_multirecord').html('');
                                                  obj.fieldsMultiRecord = null;
                                                  obj.fieldsMultiRecord={};
                                                  var field = $("."+obj.id+" #field_filter option:selected").val();
                                                  obj.fieldToFilter = obj.fields[field];
                                                  obj.showOptionsFilter(obj.fields[field],'option_filter');
                    });
                    $("."+obj.id+" #field_filter").change();
          },
          selectSection:function(section){
                    var obj = this;
                    var claseVignette = 'activeVignette';
                    var clase = 'section_selected';
                    $("."+obj.id+" ."+clase).removeClass(clase).hide();
                    $("."+obj.id+" .section"+section).addClass(clase).show();
                    $("."+obj.id+" ."+claseVignette).removeClass(claseVignette);
                    $("."+obj.id+" .step"+section).addClass(claseVignette);
                    switch (section) {
                              case 1:
                                        
                              case 2:   
                                        $(".custom_executiveReport .HeaderSection").show();
                                        $(".custom_executiveReport .dataSection").css('top','60px');
                                        break;
                              /*
                              case 3:
                                        obj.storefilterAndOrder();
                                        $(".custom_executiveReport .HeaderSection").show();
                                        $(".custom_executiveReport .dataSection").css('top','60px');
                                        $("."+obj.id+" .dataMultirecord").hide();
                                        break;
                              */
                              case 3:
                                        
                                        $(".custom_executiveReport .HeaderSection").hide();
                                        $(".custom_executiveReport .dataSection").css('top','0px');
                                        $(".dataTabular").show();
                                        $(".dataGraph").hide();
                                        $(".custom_executiveReport .terep_tabular").parent().hide();
                                        $(".custom_executiveReport .terep_graph").parent().hide();
                                        
                                        obj.buildReport();
                                        //obj.buildSectionGraph();
                                        
                                        //obj.graphLoaded=false;
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
                                                            if ((i.datatype=='numeric')||(i.datatype=='real')) {
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
                    $(".custom_executiveReport #field_graph").change(function(){
                              var tipo = $('.custom_executiveReport #type_graph option:selected').val();
                              obj.loadGraph(tipo);
                    });
                    $(".custom_executiveReport #type_graph").change(function(){
                              var tipo = $('.custom_executiveReport #type_graph option:selected').val();
                              obj.loadGraph(tipo);
                    });
                    if (!valid) {
                             $(".custom_executiveReport .terep_graph").parent().hide();
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
					//VPA
					var dato = $("#fields_report #tb_add_dato").val();
					var t_busqueda = $("#fields_report #tb_add_t_busqueda").val();
					//VPA
                    var anios = $("#fields_aniosAndPrograms").customTabular('getValueFromField','anios');
                    var programs = $("#fields_aniosAndPrograms").customTabular('getValueFromField','programas');
                    var folio = $("#fields_report #tb_add_folio option:selected").val();
                    var params = {folio:folio,anios:anios,programas:programs,dato:dato,t_busqueda:t_busqueda};
                    obj.request(params,'getReport');
          },
          storefilterAndOrder:function(){
                    var obj = this;
                    var fieldOrder = $(".custom_executiveReport #field_ordering option:selected").val();
                    var typeOrder = $(".custom_executiveReport #type_ordering option:selected").val();
                    obj.dataSend.order = {field:fieldOrder,value:typeOrder,dataType:obj.fields[fieldOrder].dataType};
                    var typeOperator = '1';
                    var valueFilter='';
                    var field_filter = $(".custom_executiveReport #field_filter option:selected").val();
                    var isRecord=false;
                    var isList=false;
                    switch (obj.fieldToFilter.datatype) {
                              case 'real':
                              case 'numeric':
                                        typeOperator = $(".custom_executiveReport #type_operator option:selected").val();
                                        valueFilter = $(".custom_executiveReport #value_filter").val();
                                        break;
                              case 'list':
                                        valueFilter = $(".custom_executiveReport #value_filter option:selected").val();
                                        if (valueFilter=='-1') {
                                                  valueFilter='';
                                        }
                                        isList=true;
                                        break;
                              case 'records':
                                        isRecord=true;
                                        var subfield=$(".custom_executiveReport #fields_multiRecord option:selected").val();
                                        switch (obj.fieldMultiRecordToFilter.datatype) {
                                               case 'numeric':
                                                  typeOperator = $(".custom_executiveReport #type_operator option:selected").val();
                                                  valueFilter = $(".custom_executiveReport #value_filter").val();
                                                  break;
                                               case 'list':
                                                  valueFilter = $(".custom_executiveReport #value_filter option:selected").val();
                                                  if (valueFilter=='-1') {
                                                            valueFilter='';
                                                  }
                                                  isList=true;
                                                  break;
                                               default:
                                                  valueFilter = $(".custom_executiveReport #value_filter").val();
                                        }
                                        
                                        break;
                              default:
                                        valueFilter = $(".custom_executiveReport #value_filter").val();       
                    }
                    if(validator.isEmpty(valueFilter)){
                              obj.dataSend.filter = null;
                    }else{
                              valueFilter = validator.replaceTags(valueFilter);
                              obj.dataSend.filter={};
                              if (isRecord) {
                                        obj.dataSend.filter = {field:field_filter,datatype:obj.fieldToFilter.datatype,subfield:{field:subfield,operator:typeOperator,value:valueFilter,datatype:obj.fieldMultiRecordToFilter.datatype}};
                                        if(isList){
                                                  obj.dataSend.filter.subfield['listname']=obj.fieldMultiRecordToFilter.listname;
                                        }     
                              }else{
                                        obj.dataSend.filter = {field:field_filter,operator:typeOperator,value:valueFilter,datatype:obj.fieldToFilter.datatype};
                                        if(isList){
                                                  obj.dataSend.filter['listname']=obj.fieldToFilter.listname;
                                        }                                       

                              }
                              
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
                              $('.'+obj.id+' .fieldsSelected div[id="R'+field+'"]').show();
                              //$("."+obj.id+" .fieldsSelected #R"+field).show();
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
                              $('.'+obj.id+' .fieldsToSelect div[id="R'+field+'"]').show();
                              //$("."+obj.id+" .fieldsToSelect #R"+field).show();
                    });        
          },
          sendAllToSelected:function(){
                    var obj = this;
                    $("."+obj.id+" .fieldsToSelect .itemFieldReport").each(function(){
                              if ($(this).css('display')!='none') {
                                        var field = $(this).attr('ref');
                                        obj.fields[field].selected = true;
                                        $(this).hide();
                                        $(this).attr('status','');
                                        $(this).removeClass('itemFieldReport_selected');
                                        $('.'+obj.id+' .fieldsSelected div[id="R'+field+'"]').show();
                                        //$("."+obj.id+" .fieldsSelected #R"+field).show();
                              }
                              
                    });
                    
          },
          sendAllToAvailable:function(){
                    var obj = this;
                    $("."+obj.id+" .fieldsSelected .itemFieldReport").each(function(){
                              if ($(this).css('display')!='none') {
                                        var field = $(this).attr('ref');
                                        obj.fields[field].selected = false;
                                        $(this).hide();
                                        $(this).attr('status','');
                                        $(this).removeClass('itemFieldReport_selected');
                                        $('.'+obj.id+' .fieldsToSelect div[id="R'+field+'"]').show();
                                        //$("."+obj.id+" .fieldsToSelect #R"+field).show();
                              }
                    });        
          },
          showOptionsFilter:function(data,container){
                    var chain='';
                    var obj=this;
                    switch (data.datatype) {
                              case 'image':
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
                              case 'real':
                              case 'numeric':
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
                                        obj.request({action:'get',formulario:data.field},'getFieldsMiltiRecord');
                              break;
                    
                    }
                    
                    $("."+obj.id+" ."+container).html(chain);
                    if (data.datatype=='numeric') {
                              $(".custom_executiveReport #value_filter").bind("keypress", function(evt) {
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
                              
                              $(".custom_executiveReport #value_filter").bind("keypress", function(evt) {
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
                              
                              $(".custom_executiveReport #value_filter").bind("keypress", function(evt) {
                                        return false;
                              }).bind("paste",function(event){
                                        return false;
                              }).datepicker();
                    }
          },
          isfieldsFilled:function(fields){
                    var response = {filled:true,messages:[]};
                    for(var x in fields){
                              var i = fields[x];
                              if (i.datatype=='list') {
                                        if ((i.value=='')||(i.value=='-1')) {
                                                  $("#tb_add_"+i.field).removeClass('badInput');
                                                  $("#tb_add_"+i.field).addClass('badInput');
                                                  response.filled=false;
                                                  response.messages.push(i.label);
                                        }
                              }
                    }
                    if (response.messages.length==1) {
                              response.messages.unshift('Seleccione un valor para el siguiente campo:');
                    }else{
                              if (response.messages.length>1) {
                                        response.messages.unshift('Seleccione un valor para los siguientes campos:');
                              }
                    }
                    
                    return response;
          },
          initialRequest:function(){
                    var obj = this;
                    obj.selectSection(1);
                    var params={action:'new',data:{},operations:[],request:[],userActive:obj.options.data.userActive.id,module:'predios',source:'#fields_report',buttonSection:false}; 
                    obj.request({action:'get',user:obj.options.data.userActive.id},'getFields',null,params,'fields_report');
          },
          events:function(){
                    var obj=this;
                    $("."+obj.id+" .section").each(function(){
                              $(this).hide();
                    });
                    obj.initialRequest();
                    $("."+obj.id+" .fieldsToSelect .footerBlockAll").click(function(){
                              obj.sendAllToSelected();
                    });
                    $("."+obj.id+" .fieldsSelected .footerBlockAll").click(function(){
                              obj.sendAllToAvailable();
                    });
                    $("."+obj.id+" .fieldsToSelect .footerBlock").click(function(){
                              obj.sendToSelected();
                    });
                    $("."+obj.id+" .fieldsSelected .footerBlock").click(function(){
                              obj.sendToAvailable();
                    });
                    $("."+obj.id+" #btnStep1").click(function(){
                              //var valid= obj.existFieldsSelected();
                              var response = $("#fields_report").customTabular('validateAddUser');
                              var info = obj.isfieldsFilled(response.params);
                              var valid = (info.filled)?true:false;
                              if (valid) {
                                        obj.selectSection(2);
                                         var folio = $("#fields_report #tb_add_folio option:selected").val();
                                        var params={action:'new',data:{},operations:[],request:[],userActive:obj.options.data.userActive.id,module:'tabular',source:'#fields_aniosAndPrograms',buttonSection:false}; 
                                        obj.request({action:'get',folio:folio},'getAniosAndPrograms',null,params,'fields_aniosAndPrograms');
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:info.messages,
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnStep2Back").click(function(){
                              obj.selectSection(1);
                    });
                    $("."+obj.id+" #btnStep2Next").click(function(){
                              var response = $("#fields_aniosAndPrograms").customTabular('validateAddUser');
                              var info = obj.isfieldsFilled(response.params);
                              var valid = (info.filled)?true:false;
                              if (valid) {
                                        
                                       obj.selectSection(3);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:info.messages,
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnStep3Back").click(function(){
                              obj.selectSection(2);
                    });
                    $("."+obj.id+" #btnStep3Next").click(function(){
                              var valid = true;
                              if (validator.isEmpty($("."+obj.id+" #name_report").val())) {
                                                  valid=false;
                              }
                              
                              if (valid) {
                                       obj.selectSection(3);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['Introduzca un titulo'],
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnStep4Back").click(function(){
                              obj.selectSection(2);
                    });
                    $(".custom_executiveReport .terep_print").click(function(){
                              if (obj.tabActive=='tabular') {
                                        if (obj.activeReportMultirecords) {
                                                 $(".executiveReportPrintMultirecords").css('display','');
                                        }else{
                                                 $(".executiveReportPrint").css('display',''); 
                                        }
                                        
                                        $(".custom_executiveReport .section_info_user").hide();
                                        
                                        window.print();
                                        if (obj.activeReportMultirecords) {
                                                 $(".executiveReportPrintMultirecords").css('display','none');
                                        }else{
                                                 $(".executiveReportPrint").css('display','none');
                                        }
                                         
                                         $(".custom_executiveReport .section_info_user").show();
                              }else{
                                         $(".executiveGraphPrint").css('display','');
                                        $(".custom_executiveReport .section_info_user").hide();
                                        
                                        window.print();
                                         $(".executiveGraphPrint").css('display','none');
                                         $(".custom_executiveReport .section_info_user").show();
                                        }
                             
                    });
                    $(".custom_executiveReport .terep_pdf").click(function(){
							  //VPA
							  var dato = $("#fields_report #tb_add_dato").val();
							  var t_busqueda = $("#fields_report #tb_add_t_busqueda").val();
							  //VPA
                              var anios = $("#fields_aniosAndPrograms").customTabular('getValueFromField','anios');
                              var programs = $("#fields_aniosAndPrograms").customTabular('getValueFromField','programas');
                              var folio = $("#fields_report #tb_add_folio option:selected").val();
                              var path='';
                              
                              //var params = {folio:folio,anios:anios,programas:programs,filename:'Reporte'};
                              //obj.request(params,'getSeed');
                              var source=connections.executive.downloadPdf;
                              var r = $.extend(r, source);
                              path = r.url+'folio='+folio+'&anios='+anios+'&programas='+programs+'&dato='+dato+'&t_busqueda='+t_busqueda+'&filename=Reporte';
                              window.open(path);
                    });
                    $(".custom_executiveReport .terep_tabular").parent().click(function(){
                              $(".custom_executiveReport .terep_tabular").parent().hide();
                              $(".custom_executiveReport .terep_graph").parent().show();
                              $(".custom_executiveReport .dataTabular").show();
                              $(".custom_executiveReport .dataGraph").hide();
                              obj.tabActive = 'tabular';
                    });
                    $(".custom_executiveReport .terep_graph").parent().click(function(){
                              $(".custom_executiveReport .terep_tabular").parent().show();
                              $(".custom_executiveReport .terep_graph").parent().hide();
                              $(".custom_executiveReport .dataTabular").hide();
                              $(".custom_executiveReport .dataGraph").show();
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
          buildSubRows:function(data,claseParent){
                    var chain='';
                    
                    var clase = (claseParent=='')?'rowWhite':claseParent;
                    for(var x in data){
                              clase = (clase=='rowWhite')?'rowFilled':'rowWhite';
                              var i = data[x];
                              i = (i=='')?'&nbsp;':i;
                              chain+='<div class="subRow '+clase+'">'+i+'</div>';
                    }
                    
                    return chain;
          },
          buildBlockReport:function(data,title,columns){
                    var obj=this;
                    var chain='<div class="title_executiveReport">'+title+'</div>';
                    var chainHeader='';
                    chain+='<div class="executiveResults_extable_filter">'+
                              '<div class="Heading">';
                                        var clase = 'borderRow';
                                        var source = columns;
                                        for(var x in source){
                                                 var clase = (x==0)?'':'borderRow';
                                                 var cadena='<div class="Cell borderHeading '+clase+'">'+
                                                                      '<p style="padding-left:5px;padding-right:5px;">'+source[x].label+'</p>'+
                                                            '</div>';
                                                  chain+=cadena;
                                                  chainHeader+=cadena;
                                        }
                    chain+=   '</div>';
                    
                    var clase = 'rowFilled';
                    var contador = 1;
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                             
                              chain+='<div class="Row">';
                              for(var f in source){
                                        var valor=i[source[f].field];
                                        var result = (typeof(valor)=='object')?obj.buildSubRows(valor,clase):'<p>'+valor+'</p>';
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            result+
                                               '</div>';
                              }
                              chain+='</div>';
                              if (contador==10) {
                                        chain+='<div class="Heading sectionTitleReport"></div>';
                                        contador=1;
                              }else{
                                       contador+=1; 
                              }
                              
                              
                    }
                    
                    chain+='</div>';
                    return {chain:chain,chainHeader:chainHeader};
          },
          getColumns:function(data){
                    var response =[];
                    for(var x in data){
                              response.push({field:x,label:data[x]});
                    }
                    return response;
          },
          showReport:function(report,columns){//data
                    
                    var obj=this;
                    var chain='';
                    var chainHeader='';
                    var fistRecord=true;
                    columns = obj.getColumns(columns);
                    for(var x in report){
                              var i = report[x];
                              if (fistRecord) {
                                        fistRecord=false;
                              }else{
                                        chain+='<div class="separator_executive"></div>';
                              }
                              var response = obj.buildBlockReport(i.data,i.anio,columns);
                              chainHeader = response.chainHeader;
                              chain+=response.chain;
                    }
                    $(".custom_executiveReport .dataTabular").html(chain);
                    $(".executiveReportPrint").remove();
                    $("body").append('<div class="executiveReportPrint" style="display:none">'+chain+'</div>');
                    $('.executiveReportPrint .sectionTitleReport').each(function(){
                              $(this).html(chainHeader);
                    });
                    
          },
          showReportRows:function(data){
                    
                    var obj=this;
                    var footer={};
                    var thereIsNumbers=false;
                    var title =$(".custom_executiveReport  #name_report").val();
                    title = validator.replaceTags(title);
                    var chain='<div class="title_executiveReport">'+title+'</div>';
                    chain+='<div class="executiveResults_extable_filter">';
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
                                        if (source[f].datatype=='records') {
                                                 var r = i[source[f].field].campo;
                                                 valor ='<div class="itemRecordReport" title="De click para ver los registros" ref="'+r.folio+'" field="'+source[f].field+'" label="'+r.label+'" total="'+r.total+'">'+r.total+' Registro(s)</div>';
                                        }
                                        chain+='<div class="Row">';
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+source[f].label+'</p>'+
                                               '</div>';
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+valor+'</p>'+
                                               '</div>';
                                        chain+='</div>';
                                        
                                        if (((source[f].datatype=='numeric')||(source[f].datatype=='real'))&&(source[f].field.indexOf('anio')==-1)){
                                                 if (footer[source[f].field]) {
                                                            footer[source[f].field]+=parseFloat(valor);
                                                 }else{
                                                          footer[source[f].field]=parseFloat(valor);  
                                                 }
                                                 thereIsNumbers=true;
                                        }
                              }
                    }
                    if (thereIsNumbers) {
                                        var source = obj.dataSend.fields;
                                        if (clase.length>0) {
                                                  clase='';
                                        }else{
                                                  clase='rowFilled';
                                        }
                                        for(var f in source){
                                                  if (footer[source[f].field]) {
                                                            var valor = footer[source[f].field];
                                                            chain+='<div class="Row">';
                                                            chain+='<div class="Cell borderHeading '+clase+'">'+
                                                                                '<p>Total '+source[f].label+'</p>'+
                                                                   '</div>';
                                                            chain+='<div class="Cell borderHeading '+clase+'">'+
                                                                                '<p>'+validator.getFormatNumber(valor)+'</p>'+
                                                                   '</div>';
                                                            chain+='</div>';
                                                  }
                                        }
                    }
                    chain+='</div>';
                    $(".custom_executiveReport .dataTabular").html(chain);
                    $(".executiveReportPrint").remove();
                    $("body").append('<div class="executiveReportPrint" style="display:none">'+chain+'</div>');
                    obj.eventsMultirecords();
          },
          eventsMultirecords:function(){
                    var obj = this;
                    $("."+obj.id+" .itemRecordReport").each(function(){
                              $(this).click(function(){
                                        var folio = $(this).attr('ref');
                                        var formulario = $(this).attr('field');
                                        var label = $(this).attr('label');
                                        var total = parseInt($(this).attr('total'));
                                        //folio='AM0001049';
                                        //formulario ='formularios.areascorta';
                                        var params = {formulario:formulario,folio:folio,label:label,total:total};
                                        if (total>0) {
                                                  obj.request(params,'getMiltiRecord');
                                        }
                                       
                              });
                    });        
          },
          showMultirecord:function(data,info){
                    
                    var chain='';
                    var chainHeader='';
                    chainHeader+='<div class="executiveResults_extable_filter_multirecord">'+
                                        '<div class="Heading">';
                    var clase = 'rowFilled';
                    var aditionalHeader='';
                    var contador=1;
                    for(var x in data){
                              var c = data[x].columns;
                              chain+='<div class="Row">';
                              clase = (clase.length>0)?'':'rowFilled';
                              for (var f in c) {
                                        var cadena ='';
                                        if (x==0) {
                                                  var cadena = '<div class="Cell borderHeading">'+
                                                                     '<p>'+c[f].label+'</p>'+
                                                               '</div>';
                                                  chainHeader+=cadena;
                                                  aditionalHeader+=cadena;
                                        }
                                        var cadena2 = '<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+obj.getValueSelect(c[f])+'</p>'+
                                                '</div>';
                                        chain+=cadena2;
                                        //aditionalHeader+=cadena2;
                              }
                              chain+="</div>";
                              if (contador==10) {
                                        chain+='<div class="Heading sectionTitleReportMultirecord"></div>';
                                        contador=1;
                              }else{
                                       contador+=1; 
                              }
                    }
                    var title='<div class="title_executiveReport_multirecord">'+
                                        '<div class="btnBackAll">'+
                                                  '<div class="mdi-hardware-keyboard-arrow-left left"></div>'+
                                        '</div>'+
                                        '<div class="refFolio">Folio '+info.folio+'</div>'+
                                        '<div class="fieldMulti">'+info.label+'</div>'+
                              '</div>';
                    $("."+obj.id+" .dataMultirecord").html(title+chainHeader+'</div>'+chain);
                    
                    $("."+obj.id+" .dataMultirecord").show();
                    $("."+obj.id+" .refFolio,.btnBackAll").click(function(){
                              $("."+obj.id+" .dataMultirecord").hide();
                              obj.activeReportMultirecords=false;
                    });
                    $(".executiveReportPrintMultirecords").remove();
                    $("body").append('<div class="executiveReportPrintMultirecords" style="display:none">'+title+chainHeader+'</div>'+chain+'</div>');
                    obj.activeReportMultirecords=true;
                    $('.executiveReportPrintMultirecords .sectionTitleReportMultirecord').each(function(){
                              $(this).html(aditionalHeader);
                    });
          },
          showMultirecordRows:function(data,info){
                    
                    var chain='';
                    var chainHeader='';
                    chainHeader+='<div class="executiveResults_extable_filter_multirecord">';
                    var clase = 'rowFilled';
                    for(var x in data){
                              var c = data[x].columns;
                              clase = (clase.length>0)?'':'rowFilled';
                              for (var f in c) {
                                        chain+=   '<div class="Row">'+
                                                            '<div class="Cell borderHeading '+clase+'">'+
                                                                      '<p>'+c[f].label+'</p>'+
                                                            '</div>'+
                                                            '<div class="Cell borderHeading '+clase+'">'+
                                                                      '<p>'+obj.getValueSelect(c[f])+'</p>'+
                                                            '</div>'+
                                                  '</div>';
                              }
                    }
                    var title='<div class="title_executiveReport_multirecord">'+
                                        '<div class="btnBackAll">'+
                                                  '<div class="mdi-hardware-keyboard-arrow-left left"></div>'+
                                        '</div>'+
                                        '<div class="refFolio">Folio '+info.folio+'</div>'+
                                        '<div class="fieldMulti">'+info.label+'</div>'+
                              '</div>';
                    $("."+obj.id+" .dataMultirecord").html(title+chainHeader+chain+'</div>');
                    $("."+obj.id+" .dataMultirecord").show();
                    $("."+obj.id+" .refFolio,.btnBackAll").click(function(){
                              $("."+obj.id+" .dataMultirecord").hide();
                              obj.activeReportMultirecords=false;
                    });
                    $(".executiveReportPrintMultirecords").remove();
                    $("body").append('<div class="executiveReportPrintMultirecords" style="display:none">'+title+chainHeader+chain+'</div>');
                    obj.activeReportMultirecords=true;
          },
          getValueSelect:function(a){
                    var value = '';
                    switch (a.datatype) {
                              case 'list':
                                        for(var x in a.list.list){
                                                  var i = a.list.list[x];
                                                  if (i.value==parseInt(a.value)) {
                                                            value=i.label;
                                                            break;
                                                  }
                                        }
                              break;
                              default:
                                        value = a.value;
                    }
                    return value;
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
                                                 // this.fields=[];
                                                 // this.options.data = value;
                                                 // this.update();
                                                 this.initialRequest();
                                        break;
                                                          
                              }
		    }
	  }
);
});