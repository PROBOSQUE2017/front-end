define(["validator","connections","dataSelect"], function(validator,connections,dataSelect){
$.widget( "custom.search", {
    options:{
                    id:'menuUser_',
                    data:{
                              title:'Busqueda de usuarios',
                              action:'',
                              module:'',
                              activity:null
                    }
                    
          },
          source:{
                    users:[
                            {label:'Usuario',value:'username'},
                            {label:'Nombre',value:'firstname',aditional:'lastname'},
                            {label:'Tipo de usuario',value:'roleId'},
                            {label:'Acci&oacute;n',value:'button',aditional:'id'}
                            
                    ],
                    tabular:[
                            {label:'Folio',value:'folio'},
                            {label:'Expediente',value:'expediente'},
                            {label:'Expediente origen',value:'expediente_origen'},
                            {label:'Acci&oacute;n',value:'button',aditional:'folio'}
                    ],
                    //Ezamora
                    registro:[
                            {label:'Usuario',value:'usuario'},
                            {label:'Programa',value:'programa'},
                            {label:'Hora y Fecha',value:'fecha'},
                            {label:'Acci&oacute;n',value:'accion'},
                            {label:'Registro de evento',value:'antes'}
                            
                            
                    ]
                    //Ezamora
          },
          fieldsToSearch:null,
          
         
    _init:function(){
                    $(".background_menuUsers").show();
    },
          
          update:function(data){
                   this.buildStructure();
                  this.events();
                               
          },
          getItems:function(a){
                    var chain='';
                    return chain;
          },
          getTitleAction:function(action){
                    var o='';
                    switch (action) {
                              case 'delete'://o='Eliminar';
                                        o='Visualizar';
                                        break;
                              case 'edit':o='Editar';
                                        break;
                              case 'consult':o='Consultar';
                                        break;
                              case 'registro':o='Log del Sistema';
                                        break;  
                    }
                    return o;
          },
          showMessage:function(msg){
                    var item = $(".search_msgError");
                    item.children().html(msg);
                    var evento=function(){
                        setTimeout(function(){
                            item.hide();
                        },10000);
                    }
                    item.show( 'shake', {}, 500, evento );
          },
          getButton:function(id){
                    var obj=this;
                    var a = obj.options.data.action;
                    chain='<button user="'+id+'" class="textButton">'+obj.getTitleAction(a)+'</button>';
                    return chain;
          },
          
          fillTable:function(data,tabular){
                    var obj=this;
                    var chain='';
                    var source = obj.source[obj.options.data.module];
                    switch (obj.options.data.module) {
                              case 'tabular':
                              case 'predios':
                              case 'semilla':
                              case 'ventanilla':
                              case 'planta':
                                        source=tabular;
                              break;
                    }
                    /*
                    if ((obj.options.data.module=='tabular')||(obj.options.data.module=='predios')) {
                              source=tabular;
                    }
                    */
                    chain+='<div class="search_table_results">'+
                              '<div class="Heading">';
                                        var clase = 'borderRow';
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
                                        var valor = '';
                                        switch (source[f].value) {
                                                  case 'firstname':
                                                            valor = i[source[f].value]+' '+i[source[f].aditional];
                                                            break;
                                                  case 'roleId':
                                                            valor = dataSelect.data.roleId['p'+i[source[f].value]];
                                                            break;
                                                  case 'button':
                                                            valor = obj.getButton(i[source[f].aditional]);
                                                            break;
                                                  default:
                                                           valor = i[source[f].value];
                                        }
                                        
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+valor+'</p>'+
                                               '</div>';
                              }
                              chain+='</div>';
                                  
                    }
                    chain+='</div>';
                    $('.search_results').html(chain);
                    $(".search_table_results .textButton").each(function(){
                              $(this).click(function(){
                                        var params = {};
                                        var id = $(this).attr('user');
                                        if (obj.options.data.module=='users') {
                                                  params = {id:id};
                                        }else{
                                                  params = {folio:id};
                                                  if (obj.options.data.activity) {
                                                            params['activity']=obj.options.data.activity;
                                                  }
                                        }
                                        obj.searchRequest(params,true,obj.options.data.module);
                              });
                    });
          },
          showSelectFields:function(){
                    var chain='';
                    var obj = this;
                    var data = obj.fieldsToSearch;
                    for(var x in data){
                              var i = data[x];
                              chain+='<option type="'+i.datatype+'" value="'+i.field+'">'+i.label+'</option>';
                    }
                    $("#select_search").append(chain);
          },
          requestFields : function(params){
          
                    var obj=this;
                    
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        obj.fieldsToSearch = json.data;
                                        obj.showSelectFields();
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {

                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                    };
                    r = $.extend(r, connections.tabular.getFields);
                    var activity = (obj.options.data.activity!=null)?'&activity='+obj.options.data.activity:'';
                    r.url=r.url+'&user='+obj.options.data.userActive.id+'&action=getsearchables'+activity;
                    $.ajax(r);
          },
          searchRequest : function(params,byId,module){
                    byId = (byId)?true:false;
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
                                        if (byId) {
                                                  
                                                  if (module=='users') {
                                                            var parametros={action:obj.options.data.action,data:json.data,userActive:obj.userActive,module:module};
                                                            $(".app_"+obj.options.data.module).customForm(parametros);
                                                  }else{
                                                            var parametros={action:obj.options.data.action,data:json.data,operations:json.operations,request:json.request,summarys:json.summarys,userActive:obj.options.data.userActive,module:module,source:".app_"+module,section:'tabular',activity:obj.options.data.activity};
                                                            $(".app_"+obj.options.data.module).customTabular(parametros);
                                                  }
                                                  
                                        }else{
                                                  
                                                             obj.fillTable(json.data,json.tabular);
                                                  
                                                                                                         
                                                 
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(json.response.message);
                                }
                            },
                            beforeSend: function(xhr) {
                                spinner.removeClass(clase);
                                if (!byId) {
                                       $('.search_results').html('');
                                        $(".search_msgError").hide();
                                }
                                
                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                spinner.addClass(clase)
                            }
                    };
                    switch (module) {
                              case 'users':
                                        r = $.extend(r, connections.users.search);
                                        break;
                              case 'semilla':
                              case 'planta':
                              case 'predios':
                              case 'ventanilla':
                              case 'tabular':
                                        r = $.extend(r, connections.tabular.search);
                                        break;
                    }
                    
                    var activity = (obj.options.data.activity!=null)?'&activity='+obj.options.data.activity:'';
                    if (byId) {
                              
                              if (module=='users') {
                                        r.url=r.url+'&user='+obj.options.data.userActive.id+'&action=get&id='+params.id;
                              }else{
                                        r.url=r.url+'&user='+obj.options.data.userActive.id+'&action=get&folio='+params.folio+activity;
                              }
                    }else{
                              var infoKey = validator.removeAcent(params.key);
                              if (module=='users') {
                                        r.url=r.url+'&user='+obj.options.data.userActive.id+'&action=find&key='+infoKey;
                              }else{
                                        r.url=r.url+'&user='+obj.options.data.userActive.id+'&action=find&key='+infoKey+'&field='+params.field+'&datatype='+params.datatype+activity;
                              }
                              
                    }
                    $.ajax(r);
          },
          reset:function(){
                    var obj=this;
                    $('.custom_search .search_results').html('');
                    $('.custom_search #text_search').val('');
          },
          getSelect:function(){
                    var chain = '<select id="select_search" class="selectInput"></select>';
                    return chain;
          },
    buildStructure:function(){
                    var obj=this;
                    var o = obj.options.data;
                    //E. Zamora
                    if(obj.options.data.action!='registro'){
                                         var chain = ''+
                              '<div class="custom_search" align="center">'+
                                            '<div class="boxToSearch_'+obj.options.data.module+'">'+
                                                    ((obj.options.data.module!='users')?obj.getSelect():'')+
                                                    '<input id="text_search" class="textInput_'+obj.options.data.module+'" type="text" value="" placeholder="Texto a buscar"/>'+
                                                    '<div class="icon_search icon_search_'+obj.options.data.module+'">'+
                                                        '<div class="icon">'+
                                                            '<div class="customSearch_template_icon"></div>'+
                                                        '</div>'+
                                                    '</div>'+
                                            '</div>'+
                                            
                                            '<div class="search_results">'+
                                            
                                            '</div>'+
                                            '<div  align="center" class="spinner_search hidden"><div class="spinner"></div></div>'+
                                            '<div class="search_msgError"><div class="label"></div></div>'+
                                        
                              '</div>';
                    obj.hide();
                    this.element.append(chain); 
                    }else{
                              var chain = ''+
                              '<div class="custom_search" >'+
                                   '<div align="center" >'+
                                              
                                                '<select id="select_key" style=" width: 200px; height: 50px; left:100;">'+
                                                '<option type="list" value="nombre">Nombre de usuario</option>'+
                                                 '<option type="list" value="fecha">Fecha</option>'+
                                                '</select>'+
                                             //+((obj.options.data.module!='users')?obj.getSelect():'')+
                                                '<input id="text_search"  datatype="text" value="" placeholder="Texto a Buscar" style=" left: 200px; width: 400px; height: 50px; "/>'+
                                                '<input id="textsearch"  datatype="date" value="" placeholder="YYYY-MM-DD" style="left: 200px; width: 100px; height: 50px; text-align:center;"/>'+
                                                '<input id="textsearch2"  datatype="date" value="" placeholder="YYYY-MM-DD" style="left: 200px; width: 100px; height: 50px; text-align:center;"/>'+
                                                    '<select id="select_Program"  style="left: 200px; width: 300px; height: 50px; text-align:center; ">'+
                                                    '<option type="list" value="-1"> Todos </option>'+
                                                    '<option value="1">Estadística de Predios con Autorizaciones para el Aprovechamiento de Recursos Forestales Maderables</option>'+
                                                    '<option value="2">Programa de Asistencia Técnica a la Producción Forestal</option>'+
                                                    '<option value="3">Programa de Reforestación y Restauración Integral de Microcuencas</option>'+
                                                    '<option value="4">Programa de Conservación y Acondicionamiento de Suelos Forestales</option>'+
                                                    '<option value="5">Programa de Reconversión Productiva (Plantaciones Forestales Comerciales)</option>'+
                                                    '<option value="6">Programa de Sanidad Forestal</option>'+
                                                    '<option value="7">Sistema de Información de Incendios Forestales</option>'+
                                                    '<option value="8">Programa de Inspección y Vigilancia Forestal</option'+
                                                    '<option value="9">Programa de Producción de Planta</option>'+
                                                    '<option value="10">Programa para el Pago por Servicios Ambientales Hidrológicos del Estado de México</option>'+
                                                    '<option value="11">Proyectos Productivos en Áreas Forestales</option>'+
                                                    '<option value="12">Sitios de Muestreo para Monitoreo de las Áreas Forestales</option>'+
                                                    '<option value="13">Desarrollo de la Industria Forestal y Comercialización Forestal</option>'+
                                                    '</select>'+    
                                                    '<div id="buscar" style="left: 1120px; top:5px;" class="icon_search icon_search_'+obj.options.data.module+'"">'+
 
                                                        '<div class="icon"><div class="customSearch_template_icon"></div></div>'+ 
                                                    '</div>'+  
                                    '</div>'+                   
                              '<div class="search_results">'+
                               '</div>'+
                                            '<div  align="center" class="spinner_search hidden"><div class="spinner"></div></div>'+
                                            '<div class="search_msgError"><div class="label"></div></div>'+
                                        '</div>';
                
                    obj.hide();
                    
                    this.element.append(chain); 
                    $('#textsearch').attr("datatype","date").datepicker().datepicker();             
                       var parametro= { accion:'todo',
                                        field:'*',
                                        datatype:'*'
                                      }
                    this.requestRegistro(parametro);     
                    $('#textsearch2').attr("datatype","date").datepicker().datepicker();             
                       
                        
                   $('#select_Program').hide();
                   //$('#textsearch').val()=" ";
                   
                      } //E. Zamora

    },
          
          hide:function(){
                 //$(".custom_search").remove();
                 $(".app_selected").html('');
          },
          //EZamora
          RegistroTable:function(data){
                    var obj=this;
                    var chain='';
                    var largo;
                   var source = obj.source['registro'];
                     $('.search_results').show();

                    chain+='<div class="search_table_results">'+
                              '<div class="Heading">';
                                        var clase = 'borderRow';
                                        for(var x in source){
                                                 var clase = (x==0)?'':'borderRow';
                                                 chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p style="width:120px;">'+source[x].label+'</p>'+
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
                              chain+='<div class="Row" >';
                              for(var f in source){          
                                        var valor = '';
                                        switch (source[f].value) {
                                                  case 'usuario':
                                                            valor = i[source[f].value];
                                                            largo="  style='width:150px;'";
                                                            break;
                                                  case 'programa':
                                                            valor = i[source[f].value];
                                                            largo="  style='width:200px;'";
                                                            break;
                                                  case 'fecha':
                                                            largo="  style='width:170px;'";
                                                            valor = i[source[f].value];
                                                            break;
                                                  case 'accion':
                                                           largo="  style='width:150px;'";
                                                           valor = i[source[f].value];
                                                           break;
                                                  case 'antes':
                                                            largo="  style='width:600px;'";
                                                            valor = i[source[f].value];
                                                            var longitud = valor.length;
                                                            var aux_valor;
                                                            var z=0;
                                                            
                                                            if(longitud>42)
                                                              {  aux_valor="<br>"
                                                                for(i=0;i<longitud; i++)
                                                                    {
                                                                      aux_valor+=valor[i];
                                                                      if((z >= 100))  
                                                                          {
                                                                           if(validator.isEmpty(valor[i])) 
                                                                           {
                                                                            z=0;
                                                                            aux_valor+="<br>"; 
                                                                           }
                                                                           else
                                                                              {
                                                                               var aux_i=i;
                                                                               var resta=0;
                                                                               while(!validator.isEmpty(valor[aux_i]))
                                                                                 {
                                                                                  aux_i=aux_i-1;  
                                                                                  resta=resta+1;
                                                                                 }
                                                                               aux_valor[aux_i]+="<";
                                                                               aux_valor[aux_i++]+="b";
                                                                               aux_valor[aux_i++]+="r";
                                                                               aux_valor[aux_i++]+=">";
                                                                              var j=i;
                                                                              j=j-resta;
                                                                              while(j<=i)
                                                                                 {
                                                                                 aux_valor[aux_i]=valor[j];
                                                                                 aux_i++;
                                                                                 j++;
                                                                                 }     
                                                                               } 
                                                                           
                                                                          }
                                                                      z=z+1;
                                                                    }
                                                              aux_valor+="</br>";
                                                              valor=aux_valor;  
                                                               } 
                                                              
                                                            break; 
                                                        
                                                          }
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p'+largo+'>'+valor+'</p>'+
                                               '</div>';
                              }
                              chain+='</div>';
                                  
                    }
                    chain+='</div>';
                    $('.search_results').html(chain);

          },
          //E:ZAmora
          requestRegistro : function(params){
          
                    var obj=this;
                    
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        obj.fieldsToSearch = json.data;
                                        if(json.data.length >0){
                                          obj.RegistroTable(json.data);  
                                        }else{
                                               valid=false;
                                               msg="Datos no encontrados modifique parametro de Busqueda";
                                        $('.search_results').hide();
                                        }
                                    }else{
                                        msg=json.response.message;
                                        $('.search_results').hide();
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {

                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                    };
                  
                    r = $.extend(r, connections.UserLog.keylog);
                    if(params.accion=="nombre")
                   {
                 //  r.url=r.url+'&user='+obj.options.data.userActive.id+'&key='+params.field+'&'+params.field+'='+params.key+"&fecha1="+params.fecha1+"&fecha2="+params.fecha2;
                    r.data={user:obj.options.data.userActive.id,accion:params.accion,nombre:params.usuarioP, fecha1:params.fecha1,fecha2:params.fecha2};
                   }
                   if(params.accion=="todo")
                     {
                    r.data={user:obj.options.data.userActive.id,accion:params.accion,nombre:params.key};  
                     }
                   if(params.accion=="fecha")
                     {
                      r.data={user:obj.options.data.userActive.id,accion:params.accion,programa:params.programa, fecha1:params.fecha1,fecha2:params.fecha2};

                     }   

                    $.ajax(r);
          },
          //E:ZAmora          
          events:function(){ 
                    var obj =this;
                            if (obj.options.data.module!='users') {
                              //obj.fieldsToSearch=null;
                              if (obj.fieldsToSearch==null) {
                                        obj.requestFields();
                              }else{
                                        obj.showSelectFields();
                              }
                    }

                    //E. Zamora 
                    if(obj.options.data.action !='registro'){
                    $(".icon_search").click(function(){
                             var text;
                              if($("#textsearch").is(':visible')){
                                    text = $(".custom_search #textsearch").val();
                                }
                              else
                                text = $(".custom_search #text_search").val();                                

                              //var text = $(".custom_search #text_search").val();
                              

                          if (!validator.isEmpty(text)) {
                                        var field = $("#select_search option:selected").val();
                                        var datatype = $("#select_search option:selected").attr('type');
                                        var params= {
                                          
                                                  key:validator.escapeHtml(text),
                                                  field:field,
                                                  datatype:datatype
                                        }
                                        if (obj.options.data.activity!=null) {
                                                  params['activity']=obj.options.data.activity;
                                        }
                                        obj.searchRequest(params,false,obj.options.data.module);
                              }
                              
                    });

                   }else{
                    $(".icon_search").click(function(){
                              
                            if($("#text_search").is(':visible'))
                               {
                                var text = $("#text_search").val();
                                var fecha1 = $("#textsearch").val();
                                var fecha2 = $("#textsearch2").val();
                                 if (!validator.isEmpty(text)) {
                                        var field = $("#select_key option:selected").val();
                                        var datatype = $("#select_key option:selected").attr('type');
                                        var params= {
                                          //edgar r zamora
                                                  fecha1:validator.escapeHtml(fecha1),
                                                  fecha2:validator.escapeHtml(fecha2),
                                                  usuarioP:validator.escapeHtml(text),
                                                  accion:field,
                                                  datatype:datatype
                                        }
                                     }    

                               }
                               else
                                  {
                                  var text = $("#textsearch").val();
                                  var text2 = $("#textsearch2").val();
                                  var programa = $("#select_Program option:selected").val();
                                 if (!validator.isEmpty(text)) {
                                         field = $("#select_key option:selected").val();
                                         datatype = $("#select_key option:selected").attr('type');
                                         params= {
                                          //edgar r zamora
                                                  programa:programa, 
                                                  fecha1:validator.escapeHtml(text),
                                                  fecha2:validator.escapeHtml(text2),
                                                  accion:field,
                                                  datatype:datatype
                                        }
                                     }    
                                   }

                            
                             /* if (!validator.isEmpty(text)) {
                                        var field = $("#select_key option:selected").val();
                                        var datatype = $("#select_key option:selected").attr('type');
                                        var params= {
                                          //edgar r zamora
                                                  key:validator.escapeHtml(text),
                                                  field:field,
                                                  datatype:datatype
                                        }*/
                                        if (obj.options.data.activity!=null) {
                                                  params['activity']=obj.options.data.activity;
                                        }
                                        obj.requestRegistro(params,false,obj.options.data.module);
                                                        
                    });

                  }
 //E. Zamora
                    $(".search_msgError").hide();
                    $("#text_search").show();
                    $(".back_button").click(function(){
                              obj.hide();
                    });
                   $(".btn_back").click(function(){
                              obj.hide();
                    });
                    $(".custom_search #text_search").bind("keypress", function(evt) {
      var otherresult = 12;
      if(window.event != undefined){
        otherresult = window.event.keyCode;
      }
      
      var charCode = (evt.which) ? evt.which : otherresult;  
      if (charCode==13) {
          $(".icon_search").click();   
      }else{
        return true;
      }});
  //E.Zamora 14/06/16
          $('#select_key').change(function(){
            var valor=$(this).val();
            if(valor=='nombre'){
                                $('#select_Program').hide();
                                $("#text_search").show();
                                $('#text_search').attr('placeholder','Nombre');
                                $('#textsearch').attr("datatype","date").datepicker().datepicker('setDate', null);
                                $('#textsearch2').attr("datatype","date").datepicker().datepicker('setDate', null);
                                $("#buscar").css("left",  "1120px");
                                }
                                else
                                  {
                                    $('#select_Program').show();
                                    $("#textsearch").show();
                                    $("#text_search").hide();
                                    $("#textsearch2").show();
                                    $('#textsearch').attr("datatype","date").datepicker().datepicker('setDate', 'today');
                                     $('#textsearch2').attr("datatype","date").datepicker().datepicker();
                                    $("#buscar").css("left",  "1120px");                                                                                              
                                  }
          
          });

  //E. Zamora   14/06/16                    

          },
          createForm:function(data){
                    var obj=this;
                    var o = obj.options;
                    var params={action:o.data.action,data:data,userActive:o.userActive};
                    this.element.customForm(params);
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








