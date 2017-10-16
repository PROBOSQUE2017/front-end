define(["connections","map","validator"], function(connections,map,validator){
$.widget( "custom.reports", {
          id:'custom_reports',
          totalfields:{},
          fields:{},
          filter:{},
          options:{
                    data:{userActive:null},
                    controller:null
          },
          request : function(params,action){
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
                                                            obj.showfields(json.data);
                                                            break;
                                                  case "getReport":
                                                            obj.showReport(json.data);
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
                               
                            }
                            };
                    var source='';
                    
                    switch (action) {
                              case 'getFields':source = connections.reports.getFields;
                                        r = $.extend(r, source);
                                        r.data=params;
                                        break;
                              case 'getReport':source=connections.reports.getReport;
                                        r = $.extend(r, source);
                                        r.url=r.url+'&json='+JSON.stringify(params);
                                        break;
                    }
                    $.ajax(r);
          },
	  showfields:function(data){
                    var chain='';
                    var obj = this;
                    for(var x in data){
                              var i = data[x];
                              i.selected=true;
                              var id = 'item_report'+x;
                              obj.totalfields[i.field]=i;
                              chain+='<div class="item_report" id="R'+i.field+'">'+
                                        '<div class="content">'+
                                                  '<div class="checkbox"><input class="inputBox" id="'+id+'" field="'+i.field+'" checked="checked" type="checkbox"></div>'+
                                                  '<div class="label">'+i.label+'</div>'+
                                                  '<label class="Selector" for="'+id+'"></label>'+
                                        '</div>'+
                                     '</div>';
                    }
                    $("."+obj.id +" .report_results").append(chain);
                    
                    $("."+obj.id +" .inputBox").each(function(){
                              $(this).change(function(){
                                        var status = $(this).prop('checked');
                                        var field = $(this).attr('field');
                                        obj.totalfields[field].selected=status;
                              });
                    });
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
	  buildStructure:function(){
                    var obj=this;
                    obj.hide();
                    var o = obj.options.data;
                    var chain = ''+
                              '<div class="'+obj.id+'" align="center">'+
                                            '<div class="selection_fields">'+
                                                  '<div class="labelOption">Seleccione los campos</div>'+
                                                  '<div class="boxToSearch">'+
                                                          '<input id="text_search" class="textInput" type="text" value="" placeholder="Texto a buscar"/>'+
                                                          '<div class="icon_report">'+
                                                              '<div class="icon">'+
                                                                  '<div class="customSearch_template_icon"></div>'+
                                                              '</div>'+
                                                          '</div>'+
                                                  '</div>'+
                                                  '<button id="btnNext" class="buttonNext" style="margin-top: 39px;float:right;">Siguiente</button>'+
                                                  '<div class="report_results">'+
                                                  
                                                  '</div>'+
                                            '</div>'+
                                            '<div class="section_filter">'+
                                                  '<div class="labelOption">Seleccione el campo a filtrar</div>'+
                                                  '<button id="btnResults" class="buttonNext" style="margin-top: 39px;float:right;">Siguiente</button>'+
                                                  '<button id="btnFields" class="buttonNext" style="margin-top: 39px;float:right;">Anterior</button>'+
                                                  
                                                  '<div class="options_filter">'+
                                                            '<div class="sf_fields">'+     
                                                                      '<div class="infoContent">'+
                                                                      '</div>'+
                                                            '</div>'+
                                                            '<div class="sf_filter">'+
                                                                      '<div class="infoContent">'+
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                            '</div>'+
                                            '<div class="section_tabular">'+
                                                  '<div class="labelOption">Resultados</div>'+
          
                                                  '<button id="btnFilter" class="buttonNext" style="margin-top: 39px;float:right;">Anterior</button>'+
                                                  
                                                  '<div class="options_tabular">'+
                                                            
                                                  '</div>'+
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
          events:function(){
                    var obj=this;
                    $(".section_filter").hide();
                    $(".section_tabular").hide();
                    obj.request({action:'get',user:obj.options.data.userActive.id},'getFields');
                    $(".icon_report").click(function(){
                              var text = validator.getFormatHtml($("#text_search").val());
                              if (text!='') {
                                        obj.showFieldsFiltered(text);
                              }else{
                                        obj.showFieldsHidden();
                              }
                    });
                    $("#btnNext").click(function(){
                              $(".selection_fields").hide();
                              $(".section_filter").show();
                              obj.showSectionFilter();
                    });
                    $("#btnFields").click(function(){
                              $(".selection_fields").show();
                              $(".section_filter").hide();
                    });
                    $("#btnResults").click(function(){
                              $(".section_filter").hide();
                              $(".section_tabular").show();
                              obj.showTabular();
                    });
                    $("#btnFilter").click(function(){
                              $(".section_filter").show();
                              $(".section_tabular").hide();
                    });       
          },
          showReport:function(data){
                    var obj=this;
                    var chain='';
                    chain+='<div class="results_table_filter">'+
                              '<div class="Heading">';
                                        var clase = 'borderRow';
                                        var source = obj.fields;
                                        for(var x in source){
                                                 var clase = (x==0)?'':'borderRow';
                                                 chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+source[x].label+'</p>'+
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
                             
                              chain+='<div class="Row">';
                              for(var f in source){
                                        var valor = i[source[f].field];
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+valor+'</p>'+
                                               '</div>';
                              }
                              chain+='</div>';
                                  
                    }
                    chain+='</div>';
                    $(".options_tabular").html(chain);
          },
          showTabular:function(){
                    var obj = this;
                    var response = [];
                    for(var x in obj.fields){
                              var i = obj.fields[x];
                              if (i.selected) {
                                        var params = {field:i.field, datatype:i.datatype};
                                        
                                        if (i.field==obj.filter.field) {
                                                  params.filter = (i.type=='edit')? $("#input_filter").val():parseInt($(".item_filter_selected").attr('value'));
                                        }
                                        response.push(params);
                              }
                    }
                   
                    obj.request(response,'getReport');
          },
          showSectionFilter:function(){
                    var obj=this;
                    obj.fields = null;
                    obj.fields = {};
                    for(var x in obj.totalfields){
                              var i = obj.totalfields[x];
                              if(i.selected){
                                        obj.fields[i.field]=$.extend({}, i);
                              }
                    }
                    
                    $(".sf_fields .infoContent").html('');
                    $(".sf_filter .infoContent").html('');
                    var chain='';
                    for(var x in obj.fields){
                              var i = obj.fields[x];
                              chain+='<div class="item_field" id="I'+i.field+'" field="'+i.field+'">'+
                                        '<div class="content">'+
                                                  '<div class="label">'+i.label+'</div>'+
                                        '</div>'+
                                     '</div>';        
                    }
                    $(".sf_fields .infoContent").append(chain);          
                    $(".item_field").each(function(){
                              $(this).click(function(){
                                        var clase = 'item_field_selected';
                                        $("."+clase).removeClass(clase);
                                        $(this).addClass(clase);
                                        
                                        var field = $(this).attr('field');
                                        obj.filter = null;
                                        obj.filter = $.extend({}, obj.fields[field]);
                                        obj.showFilter(field);
                              });
                    }); 
                    
          },
          showFilter:function(f){
                    var obj = this;
                    $(".sf_filter .infoContent").html('');
                    var chain='';
                    switch (obj.fields[f].type) {
                              case 'edit':
                                        chain='<div class="label">'+obj.fields[f].label+'</div><input id="input_filter" type="text" class="textInput" />';
                                        break;
                              case 'select':
                                        for(var x in obj.fields[f].list.list){
                                                  var i = obj.fields[f].list.list[x];
                                                  chain+='<div class="item_filter" value="'+i.value+'">'+
                                                            '<div class="content">'+
                                                                      '<div class="label">'+i.label+'</div>'+
                                                            '</div>'+
                                                         '</div>';       
                                        }
                                        break;
                              
                    }
                    $(".sf_filter .infoContent").html(chain);
                    $(".item_filter").each(function(){
                              $(this).click(function(){
                                        var clase = 'item_filter_selected';
                                        $("."+clase).removeClass(clase);
                                        $(this).addClass(clase);
                                        
                              });
                    });
          },
          showFieldsFiltered:function(text){
                    var obj = this;
                    obj.showFieldsHidden();
                    var clase="hidden";
                    for(var x in obj.fields){
                              var i = obj.fields[x];
                              var valor = i.label.toLowerCase();
                              valor = validator.getFormatHtml(valor);
                              if (valor.indexOf(text)==-1) {
                                        $("#R"+i.field).addClass(clase);
                              }
                    }
          },
          showFieldsHidden:function(){
                    var clase = 'hidden';
                   $("."+obj.id+" ."+clase).each(function(){
                              $(this).removeClass(clase);
                    })
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