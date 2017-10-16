/**
* @information.js Libreria para el despliegue de la información relacionada a una geometria
*
* @version 1.0
*/
define(["validator","connections","map"], function(validator,connections,map){
$.widget( "custom.information", {
	  id:'custom_information',
          countSpinner:0,
          /**
          * Contiene los parametros de configuración inicial
          */
          options:{
                    userActive:null,
                    data:{
                              type:'search',
                              title:'Busqueda',
                              showPrev:false,
                              ids:null,
                              idLayer:null
                    }
                    
          },
          /**
          * Inicializa la invocación del componente
          */
	  _init:function(){
                    this.show();
	  },
          /**
          * Permite recargar el contenido de la interfaz
          * @data {Object} objeto que contiene los parametros de configuración para este componente
          */
          update:function(){
                    var obj=this;
                    var type = obj.options.data.type;
                    var ids = obj.options.data.ids;
                    var idLayer = obj.options.data.idLayer;
                    obj.enableType(type);
                    if (type=='identify') {
                              obj.request({action:'identify',folio:ids,idLayer:idLayer,user:obj.options.userActive.id});
                    }else{//search
                              if (ids!=null) {
                                        obj.request({action:'find',folios:ids});
                              }
                              
                    }

          },
          getItems:function(a){
                    var chain='';
                    return chain;
          },
          /**
          * Obtiene el titulo del panel
          * @opc {String} opción para despliegue de información
          * @return {String} retorna la cadena correspondiente a la opción seleccionada
          */
          getTitleAction:function(action){
                    var o='';
                    switch (action) {
                              case 'delete':o='Eliminar';
                                        break;
                              case 'edit':o='Editar';
                                        break;
                              case 'consult':o='Consultar';
                                        break;  
                    }
                    return o;
          },
          /**
          * Despliega un mensaje en pantalla
          * @msg {String} cadena de texto
          */
          showMessage:function(msg){
                    var item = $(".search_msgError");
                    item.children().html(msg);
                    var evento=function(){
                        setTimeout(function(){
                            item.hide();
                        },4000);
                    }
                    item.show( 'shake', {}, 500, evento );
          },
          /**
          * Obtiene un boton para una acción determinada
          * @id {String} id del usuario activo
          * @return {String} cadena con contenido html
          */
          getButton:function(id){
                    var obj=this;
                    var a = obj.options.data.action;
                    chain='<button user="'+id+'" class="textButton">'+obj.getTitleAction(a)+'</button>';
                    return chain;
          },
          /**
          * Despliega un bloquedor mientras se ejecuta una transacciópn asincrona
          */
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
          /**
          * Genera la información a desplegar sobre un punto identificado
          * @clase {String} clase del elmento seleccionado
          * @i {Object} elemento seleccionado
          * @idItem {String} id del elemento en doom seleccionado
          * @return {String} cadena con contenido html
          */
          getDataIdentify:function(clase,i,idItem){
                   var chain='';
                    
                    chain+='<div id="'+idItem+'" class="Row '+clase+'" wkt="'+i.wkt+'">'+
                                        '<div class="Cell text_center">'+
                                            i.alias+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            i.value+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          /**
          * Obtiene información basada en un elemento seleccionado de la lista de resultados disponibles en el panel
          * @clase {String} clase del elmento seleccionado
          * @i {Object} elemento seleccionado
          * @idItem {String} id del elemento en doom seleccionado
          * @return {String} cadena con contenido html
          */
          getDataSearch:function(clase,i,idItem){
                    var chain='';
                    var infoOption ='<div id="'+idItem+'_info" item="'+i.folio+'" idLayer="'+i.idLayer+'" class="optionInfo" folio="">'+                            
                                                  '<div class="template_information ti_info"></div>'+
                                              '</div>';
                    var colorStatus = validator.getColorStatus(i.status);
                    var colorStatus = "#C5002E";
                    colorStatus = "transparent";
                    var boxStatus ='<div class="icon_status" style="background:'+colorStatus+'"></div>';
                    boxStatus='';
                    chain+='<div id="'+idItem+'" class="Row '+clase+'" wkt="'+i.wkt+'">'+
                                        '<div class="Cell text_center">'+
                                           i.id+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            boxStatus+
                                            '<div class="label_predio">'+i.folio+'</div>'+
                                            infoOption+
                                        '</div>'+
                              '</div>';
                    return chain;
                    
          },
          /**
          * Genera el codigo html para el despliegue de la información en el panel de resultados y asigna los eventos a cada elemento
          * @data {Object} colección de información a mostrar
          * @container {String} elemento seleccionado
          */
          fillTable:function(data,container){
                    var obj=this;
                    var chain='';
                    
                    chain+='<div class="table_information">';
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              var idItem = obj.id+'Row'+i.id;
                              if (container=='search_results') {
                                        chain+=obj.getDataSearch(clase,i,idItem);
                              }else{
                                        chain+=obj.getDataIdentify(clase,i,idItem);
                              }
                              
                              
                    }
                    chain+='</div>';
                    $('.'+container).html(chain);
                    $('.table_information .Row').each(function(){
                              $(this).click(function(){
                                        var wkt=$(this).attr('wkt');
                                        map.goPoint(wkt);
                              });
                              
                    });
                    $('.optionInfo').each(function(){
                              $(this).click(function(event){
                                        var id = $(this).attr('item');
                                        var idLayer =$(this).attr('idLayer');
                                        obj.options.data.showPrev=true;
                                        obj.enableType('identify');
                                        obj.request({action:'identify',folio:id,idLayer:idLayer,user:obj.options.userActive.id});
                                        event.stopPropagation();
                              });
                    });
                    
          },
          /**
          * Evento para determinar que tipo de modulos se mostraran
          * @type {String} tipo de acción a realizar
          */
          enableType:function(type){
                    if (type=='identify') {
                              $(".identify_results").show();
                              $(".search_results").hide();
                              $(".boxToSearch").hide();
                              $(".header_information .label").html(validator.getFormatHtml('informaci&oacute;n detallada'));
                    }else{
                              $(".identify_results").hide();
                              $(".search_results").show();
                              $(".boxToSearch").show();
                              $(".header_information .label").html('Busqueda');
                    }
          },
          /**
          * Muestra el bloqueador y lleva la cuenta de las veces que es invocado
          */
          showSpinner:function(){
                    var obj=this;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").show();
                    }
                    obj.countSpinner+=1;
                   
          },
          /**
          * Oculta el bloqueador
          */
          hideSpinner:function(){
                    var obj=this;
                    obj.countSpinner-=1;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").hide();
                    }
          },
          /**
          * Genera peticiones asincronas para el despliegue los datos identificados
          * @params {Object} parametros para realizar la transacción
          */
          request : function(params){
                   
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        if (params.action=='find') {//search
                                                  obj.fillTable(json.data,'search_results');
                                        }else{//identify
                                                  obj.fillTable(json.data.shape,'shape_information_data');
                                                  obj.fillTable(json.data.tabular,'tabular_information_data');
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    $(".search_results").html('');   
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                        obj.showSpinner();
                                        $(".search_msgError").hide();
                               
                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                obj.hideSpinner();
                            }
                    };
                    var source=null;
                    if (params.action=='find') {
                              source = connections.search.event;
                    }else{
                              source = connections.identify.event;
                    }
                    r = $.extend(r, source);
                    r.data=params;
                    $.ajax(r);
          },
          /**
          * Obtiene el encabezado del panel
          * @return {String} cadena de texto que contiene el codigo html
          */
          getHeader : function(){
                    var o = this.options.data;
                    var chain='';
                              chain+='<div class="header_information">'+
                                        
                                        '<div class="label">'+o.title+'</div>'+
                                         ((true)?
                                                  '<div class="back_info"><img src="img/back.png"></div>'
                                         :''
                                         )+
                                        
                                     '</div>';
                    return chain;
          },
          /**
          * Genera la estructura html principal para este componente
          */
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain = ''+
                              '<div class="custom_information" align="center">'+
                                            obj.getBlocker()+
                                            obj.getHeader()+
                                            '<div class="boxToSearch">'+
                                                    '<input id="text_search" class="textInput" type="text" value="" placeholder="Texto a buscar"/>'+
                                                    '<div class="icon_search">'+
                                                        '<div class="icon">'+
                                                            '<div class="template_information ti_search"></div>'+
                                                        '</div>'+
                                                    '</div>'+
                                            '</div>'+
                                            
                                            '<div class="search_results">'+
                                            
                                            
                                            '</div>'+
                                            '<div class="identify_results">'+
                                                  '<div class="options">'+
                                                            '<div id="shape_information" class="option_data_information" type="1">'+
                                                                      '<div class="label">Shape</div>'+
                                                            '</div>'+
                                                            '<div id="tabular_information" class="option_data_information" type="2">'+
                                                                      '<div class="label">Tabular</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="data_list">'+
                                                            '<div id="shape_information_data" class="rows_information shape_information_data"></div>'+
                                                            '<div id="tabular_information_data" class="rows_information tabular_information_data"></div>'+
                                                  '</div>'+
                                            '</div>'+
                                            '<div  align="center" class="spinner_search hidden">'+
                                                  '<div class="spinner"></div>'+
                                            '</div>'+
                                            '<div class="search_msgError">'+
                                                  '<div class="label"></div>'+
                                            '</div>'+
                                        
                              '</div>';
                    obj.hide();
                    this.element.append(chain);
                    obj.enableType(this.options.data.type);
	  },
          /**
          * Permite visualizar el componente actual
          */
          show:function(){
                 var obj=this;
                 this.element.show();
                 $('.app_left_section_notification,.app_left_section_layers').hide();
                 if (this.options.data.ids==null) {
                    $("."+obj.id +" .blocker").hide();
                 }
                 
          },
          /**
          * Oculta el componente
          */
          hide:function(){
                 this.element.hide();
          },
          /**
          * Asigna los eventos a cada no de los elementos visuales
          */
          events:function(){
                    var obj=this;
                    $('.icon_search').click(function(){
                              var text = $('#text_search').val();
                              if (!validator.isEmpty(text)) {
                                        obj.request({action:'find',folios:text,user:obj.options.userActive.id});
                              }
                    });
                    $('.back_info').click(function(){
                             
                              if (obj.options.data.showPrev) {
                                        
                                         obj.enableType('search');
                                         obj.options.data.showPrev=false;
                              }else{
                                        obj.hide();
                                        $('.app_left_section_layers').layers();
                              }
                              
                    });
                    $("."+obj.id+" .rows_information").each(function(){
                              $(this).hide();
                    });
                    $("."+obj.id+" .option_data_information").each(function(){
                    
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                    obj.selectOption('shape_information');
          },
          selectOption:function(id){
                    var clase = 'option_selected_information';
                    var idSelected = $("."+clase).attr('id');
                    $("."+idSelected+'_data').hide();
                    $("."+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
                    $("."+id+'_data').show();
                    
          },
           /**
          * Invoca la generación de los elementos que integran este componente
          */
          _create: function() {
                    this.buildStructure();
                    this.events();
                    this.update();
          },
          /**
          * Evento que se lanza cada vez que se refrezca el componente
          */
          _refresh: function(){
            // trigger a callback/event
            this._trigger( "change" );
          },
         /**
          * Metodo que se lanza para la destrucción del componente
          */
          _destroy: function() {
              this.element.remove();
          },
          /**
          * Metodo que ejecuta un evento dependiendo del parametro que se reciva
          * @key {String} atributo a actualizarse
          * @value {Object} valor del atributo a actualizarse
          */
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