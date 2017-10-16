define(["webmapservices","map","infomodules","connections","Alert"], function(webmapservices,map,infomodules,connections,Alert){
$.widget( "custom.modules", {
          id:'custom_modules',
	  options:{
                    data:{
                              modules:null,
                              user:null,
                              active:null,
                    }
          },
          TabulateOpen:false,
          TabulateCreated:false,
          TabulateTabularCreated:false,
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getItem : function(i,type,border,mainItem,action){
                    var obj=this;
                    var chain='';
                    chain+=(type=="mainItem")?'<div class="btnBack"><div class="customModules_back icon"></div></div>':'';
                    chain+=   '<div class="'+type+'" action="'+action+'" '+((mainItem)?'mainItem="'+mainItem+'"':'')+'>'+
                                        '<div class="label">'+i+'</div>'+
                                        '<div class="'+((border)?'border':'')+'"></div>'+
                              '</div>';
                    return chain;
          },
          
          
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options.data;
                     var program = obj.options.data.user.program;
                    var chain='<div id="'+obj.id+'" class="'+obj.id+'">';
                     if (o.active==null) {
                              for(var x in o.modules){
                                        var i = o.modules[x];
                                        //alert(program);
                                        //alert(i);
                                        if (program == 3 && i == "meta") {
                                                  var Module = infomodules.modules[i].label;
                                                  var border = (x==0)?false:true;
                                                  var mainItem = i;
                                                  chain+=obj.getItem(Module,'sectionItem',border,mainItem);
                                        }else{
                                             if(i == "meta"){

                                             }else{
                                                  var Module = infomodules.modules[i].label;
                                                  var border = (x==0)?false:true;
                                                  var mainItem = i;
                                                  chain+=obj.getItem(Module,'sectionItem',border,mainItem);
                                             }
                                        }
                              }
                    }else{
                              
                              var Module = infomodules.modules[o.active];
                              chain+=obj.getItem(Module.label,'mainItem');
                              var total=0;
                              for(var x in Module.sections){
                                        var i = Module.sections[x];
                                        var border = (total==0)?false:true;
                                        chain+=obj.getItem(i,'sectionItem',border,false,x);
                                        total+=1;
                              }
                    }
                   
                    chain+='</div>';
                    $("#"+obj.id).remove();
                    /*
                    chain=''+
                    '<nav>'+
                              '<div class="nav-wrapper">'+
                                        '<a href="#!" class="brand-logo">Logo</a>'+
                                        '<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="mdi-navigation-menu"></i></a>'+
                                        '<ul class="right hide-on-med-and-down">'+
                                                  '<li><a href="#">Sass</a></li>'+
                                                  '<li><a href="#">Components</a></li>'+
                                                  '<li><a href="#">Javascript</a></li>'+
                                                  '<li><a href="#">Mobile</a></li>'+
                                        '</ul>'+
                                        '<ul class="side-nav" id="mobile-demo">'+
                                                  '<li><a href="#">Sass</a></li>'+
                                                  '<li><a href="#">Components</a></li>'+
                                                  '<li><a href="#">Javascript</a></li>'+
                                                  '<li><a href="#">Mobile</a></li>'+
                                        '</ul>'+
                            '</div>'+
                    '</nav>';
                    */
                    $(obj.element).append(chain);
                     $(".button-collapse").sideNav();
	  },
          
          show:function(){
                 $("#"+this.id).show();   
          },
          
          events:function(){
                    var obj=this;
                    var Modules = obj.options.data.modules;

                    var user = obj.options.data.user;
                    var userReport = obj.options.data.user.id;
                    var activityReport=obj.options.data.user.activity;
                     userReport*=5; 
                    //variable para metas Jhonathan aldama 
                      var us = JSON.stringify(user.id +'_'+ user.program);
                      //    
                    $("."+obj.id +" .mainItem").click(function(){
                              obj.element.modules({data:{modules:Modules,user:user,active:null}});
                              obj.showSection('welcome');
                    });
                    $("."+obj.id +" .btnBack").click(function(){
                              obj.element.modules({data:{modules:Modules,user:user,active:null}});
                              obj.showSection('welcome');
                    });
                    $("."+obj.id+' .sectionItem').each(function(){
                              $(this).click(function(){
                                        var mainItem = $(this).attr('mainItem');
                                        if(mainItem == 'reporteador'){
                                          window.location.assign("http://187.188.96.133:800/SIFEM/reporteador/index.html?UR="+userReport+"&UPR="+activityReport);
                                        }
                                        if(mainItem == 'seccionWeb'){
                                          window.location.assign("http://187.188.96.133:800/SIFEM/reporteador/moduloweb.html?UR="+userReport+"&UPR="+activityReport);
                                        }
                                        if(mainItem == 'herramientaMapas'){
                                          var usuario = obj.options.data.user.id * 5;
                                          if(usuario == 5){
                                            window.location.assign("http://187.188.96.133:800/SIFEM/toolMaps/indexAdmin.php?vuhmepmhac="+usuario+"");  
                                          }else{
                                            window.location.assign("http://187.188.96.133:800/SIFEM/toolMaps/index.php?vuhmepmhac="+usuario+"");
                                          }
                                        }
                                        if(mainItem == 'padron'){
                                          window.location.assign("http://187.188.96.133:800/SIFEM/maderable/padron");
                                        }

                                        if(mainItem == 'auditoria'){
                                          window.location.assign("/SIFEM/auditorias.html");
                                        }
                                        if(mainItem == 'adminPredio')
                                          {
                                         window.location.assign("/SIFEM/predios.html"); 	
                                          }

                                        //Produccion de Planta JAldama
                                        if (mainItem == 'produccion') {
                                             window.location.assign("produccion_planta.html")
                                        }

                                        if (mainItem == 'produccionSemilla') {
                                             window.location.assign("semilla.html")
                                        }
                                          //llamada a la ventana Meta JAldama    
                                        if(mainItem=='meta')
                                                       {                                              //window.location.assign("http://localhost:800/SIFEM/reporteador/index.html");
                                                        window.open("meta.html?us="+us+"","child","address=false, status=no, directories=no, menubar=no, toolbar=no, scrollbars=yes, location=no, resizable=no, titlebar=no, left=300, top=100, width=780, height=500");
                                                        location.reload();
                                                        }
                                        //fin llamada a ventana MEta JAldama                 

                                        if (mainItem) {
                                                 obj.element.modules({data:{modules:Modules,user:user,active:mainItem}});
                                                 obj.showSection(mainItem,true);
                                        }else{
                                                  var action = $(this).attr('action');
                                                  $(".sectionItem_selected").removeClass("sectionItem_selected");
                                                  if (action!='layers') {
                                                            $(this).addClass("sectionItem_selected");
                                                  }
                                                  
                                                  switch (obj.options.data.active) {
                                                            case 'users':
                                                                      $(".app_"+obj.options.data.active).html('');
                                                                      if (action=='new') {
                                                                                var params={action:action,data:{},userActive:user};
                                                                                $(".app_"+obj.options.data.active).customForm(params);
                                                                      }else{//E. Zamora 14/06/16
                                                                           if(action=='registro'){
                                                                                var params={data:{action:action,module:obj.options.data.active,userActive:user}};
                                                                                 $(".app_"+obj.options.data.active).search(params);
                                                                           }else{
                                                                                var params={data:{action:action,module:obj.options.data.active,userActive:user}};
                                                                                $(".app_"+obj.options.data.active).search(params);
                                                                           }
                                                                           //E.zamora 14/06/16
                                                                      }
                                                                      break;
case 'semilla':
case 'planta':
case 'predios':
case 'ventanilla':
case 'tabular':
  var activity = (obj.options.data.user.program==9)?obj.options.data.user.activity:null;
  activity = (obj.options.data.active=='tabular')?null:activity;
  $(".app_"+obj.options.data.active).html('');
  if (action=='new') {
    var params={action:action,data:{},operations:[],request:[],userActive:user,module:obj.options.data.active,source:".app_"+obj.options.data.active,section:'tabular',activity:activity};
    var paramsRequest = {action:'get',user:obj.options.data.user.id};
    if (activity!=null) {
      paramsRequest['activity']=activity;
    }
    obj.requestTabular(paramsRequest,params);
  }else{
    switch(action) {
      case 'report':
        $(".app_"+obj.options.data.active).reports({data:{userActive:user}});
      break;
      
      case 'list':
      if (!obj.TabulateTabularCreated) {
      $(".app_"+obj.options.data.active).attr('id','listRecords');
      obj.TabulateTabularCreated=true;
      }
      $(".app_"+obj.options.data.active).tabulate({data:{userActive:user}});
      break;
case 'resumen':
  //$(document).ajaxStop($.unblockUI); 
  $(".app_ventanilla").show();          
  $(".app_ventanilla").append("<div id=\"principal\" class=\"background_tabular background_tabularventanilla\"></div>");
  var midiv = document.createElement("div");
    midiv.setAttribute("id","row1");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
    "<div id='tabla' class='custom_search' align='center'>"+
      "<div id='espacio' class='hidden'><br><br></div>"+
      "<div class='search_results'>"+
        "<div id='resultados' class='search_table_results hidden'>"+
          "<div class='Heading'>"+
            "<div class='Cell borderHeading borderRow'>"+
              "<p>Folio de registro (Solicitud)</p>"+
            "</div>"+
            "<div class='Cell borderHeading borderRow'>"+
              "<p>Nombre del Predio</p>"+
            "</div>"+
            "<div class='Cell borderHeading borderRow'>"+
              "<p>Fecha de Registro</p>"+
            "</div>"+
            "<div class='Cell borderHeading borderRow'>"+
              "<p>Estatus</p>"+
            "</div>"+
            "<div class='Cell borderHeading borderRow'>"+
              "<p>Dias Trascurridos</p>"+
            "</div>"+
            "<div class='Cell borderHeading borderRow'>"+
              "<p>Dias Internos Trascurridos</p>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>"+
      "<div id='alert' class='search_msgError' style='display: none'><div class='label'>NO SE ENCONTRARON DATOS!!</div></div>"+
    "</div>";
  $("#principal").append(midiv);
  if ($("#alert2").length == 0) {
    $("<div id='alert2'>Cargando datos...</div>").appendTo("body");
  }
  /*
  $.blockUI({message: $('#alert2'), 
    css: { 
      top:  ($(window).height() - 430) /2 + 'px', 
      left: ($(window).width() - 400) /2 + 'px', 
      width: '400px',
      backgroundColor: '#000', 
      '-webkit-border-radius': '10px', 
      '-moz-border-radius': '10px', 
      opacity: 100, 
      color: '#fff'
    } 
  });
  setTimeout($.unblockUI, 20000); 
*/
  $.get("http://187.188.96.133:8080/ServiceBosque/VentanillaProcesos", 
    { user: obj.options.data.user.id, action:'getSolicitudes' },
    function(data){
      $.each(data, function(index, data){
        if(index == "data"){
          if(jQuery.isEmptyObject(data)){
            $("#alert").show('shake');
          }else{
            $("#tabla").removeClass("custom_search");
            $("#espacio").removeClass("hidden");
            $("#resultados").removeClass("hidden");                 
            $.each(data, function(index, data){                                                                                   
              var aFecha2 = data.Fecha_Registro.split('/');
              var dias = 0;
              if (data.predio == 6) {
                var FAutorizacion = UltimaFecha('ultimaFecha', obj.options.data.user.id, data.folio);
                //alert(FAutorizacion);
                var fA = FAutorizacion.split('/');
                dias = DaysBetweenDates(new Date(aFecha2[2],aFecha2[1]-1,aFecha2[0]),new Date(fA[2],fA[1]-1,fA[0]),obj.options.data.user.id);
              }else{
                dias = DaysBetweenDates(new Date(aFecha2[2],aFecha2[1]-1,aFecha2[0]),new Date(),obj.options.data.user.id);
              }
              var d = (isNaN((dias-1)));
              var mires=$("#resultados");
                mires.append("<div class='Row'>"+
                  "<div class='Cell borderHeading'>"+
                    "<p>"+data.folio+"</p>"+
                  "</div>"+
                  "<div class='Cell borderHeading'>"+
                    "<p>"+data.observacion+"</p>"+
                  "</div>"+
                  "<div class='Cell borderHeading'>"+
                    "<p>"+data.Fecha_Registro+"</p>"+
                  "</div>"+
                  "<div class='Cell borderHeading'>"+
                    "<p>"+data.respuesta+"</p>"+
                  "</div>"+
                  "<div class='Cell borderHeading ''>"+
                    "<p>"+(dias - 1)+"</p>"+ 
                  "</div>"+
                  "<div class='Cell borderHeading ''>"+
                    "<p>"+data.diasinternos+"</p>"+ 
                  "</div>"+
                "</div>");
            });
          }
        }
      });
    });
break; 

case 'excludedDates':
  $(".app_ventanilla").show();          
  $(".app_ventanilla").append("<div id=\"principal\" class=\"background_tabular background_tabularventanilla\"></div>");
  var midiv = document.createElement("div");
    midiv.setAttribute("id","row1");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>Agrega Fechas a Excluir:</div>"+
        "<div id='contenedor1' class='contenedor1'>"+
          "<div class='Field' id='field_tb_add_fecha_pago'>"+
            "<div class='label'>Fecha de pago</div>"+
            "<input id='datepicker' field='fecha_pago' type='edit' datatype='date' value='' maxlength='20' class='textInput'>"+
          "</div>"+
          "<div class='ButtonSection' align='center'><button class='textButton' id='Add_Fecha' onclick='addFecha("+obj.options.data.user.id+");'>Agregar</button></div>"+
        "</div>"+                                                                                                              
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>Fechas Excluidas:</div>"+
        "<div id='contenedor2' class='contenedor2'></div>"+
      "</div>";                                                                                              
  $("#principal").append(midiv);
  $('#datepicker').datepicker({beforeShowDay: $.datepicker.noWeekends}).datepicker('setDate', 'today');

  $.get("http://187.188.96.133:8080/ServiceBosque/VentanillaProcesos",
    { user:obj.options.data.user.id, action:'getFechas' },
    function(data){
      $.each(data, function(index, data){
        if(index == "data"){
          if(jQuery.isEmptyObject(data)){
            //-----//
          }else{
            $.each(data, function(index, data){
              //alert(data.value +""+ data.label);
              var mires=$("#contenedor2");
                mires.append("<div><div style='float:left; width:80%; font-size:13px; font-weight:bold; color:#000; background-color:#FFFFFF'>"+data.label+"</div> <div><button class='close' onclick='deleteFecha("+obj.options.data.user.id+","+data.value+");'>&times;</button></div></div>");
            });
          }
        }
      });
    });
break;

case 'status':
  $(".app_ventanilla").show();  
  $(".app_ventanilla").append("<div id=\"principal\" class=\"background_tabular background_tabularventanilla\"></div>");
  var midiv = document.createElement("div");
    midiv.setAttribute("id","row1");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>INICIO DE PROCESO:</div>"+
        "<div id='contenedor1' class='contenedor1'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>SOLICITUDES EN DICTAMINACIÓN:</div>"+
        "<div id='contenedor2' class='contenedor2'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>SOLICITUDES EN RECHAZO:</div>"+
        "<div id='contenedor3' class='contenedor5'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>INFORMACIÓN ADICIONAL:</div>"+
        "<div id='contenedor4' class='contenedor2'></div>"+
      "</div>";
  
  $("#principal").append(midiv);
    midiv = document.createElement("div");
    midiv.setAttribute("id","row2");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>COMITÉ DE FOMENTO:</div>"+
        "<div id='contenedor5' class='contenedor1'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>CÓDIGO DE IDENTIFICACIÓN:</div>"+
        "<div id='contenedor6' class='contenedor2'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>NEGACIÓN:</div>"+
        "<div id='contenedor7' class='contenedor3'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>ESTATUS DE MIA(Espera resolutivo de MIA)</div>"+
        "<div id='contenedor10' class='contenedor2'></div>"+
      "</div>";
  
  $("#principal").append(midiv);
    midiv = document.createElement("div");
    midiv.setAttribute("id","row2");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>VENCIDAS:</div>"+
        "<div id='contenedor8' class='contenedor3'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>AUTORIZACIÓN:</div>"+
        "<div id='contenedor9' class='contenedor4'></div>"+
      "</div>";
  $("#principal").append(midiv);

  var today = new Date(); 

  //Llena el contenedor "Inicio de Proceso"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
    { action:'get', folio:0, user:obj.options.data.user.id, tipo:1 },
    function(data){
      var mires1 =$('#contenedor1');
      $.each(data, function(index,data){
        var fondo="blanco";                                                                                   
        var aFecha2 = data.Fecha_Registro.split('/'); 
        var a = DaysBetweenDates(new Date(aFecha2[2],aFecha2[1]-1,aFecha2[0]),today,obj.options.data.user.id);
        if(a>1){ fondo="rojo"; } 
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"','', '', 1, 0, '', '', '', '', '', '');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Dictaminacion"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
    { action:'get', folio:0, user:obj.options.data.user.id, tipo:2 },
    function(data){
      //alert(JSON.stringify(data));
      var mires1 =$('#contenedor2');
      $.each(data, function(index,data){
        var fondo="blanco";                                                                                   
        var aFecha2 = data.Fecha_Registro.split('/'); 
        var a = DaysBetweenDates(new Date(aFecha2[2],aFecha2[1]-1,aFecha2[0]),today,obj.options.data.user.id);
        if(a>8 && data.numvuelta == 1){ fondo="rojo"; }
        if(a>5 && data.numvuelta == 2){ fondo="rojo"; }
        if(a>1 && data.numvuelta == 3){ fondo="rojo"; } 
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"', 2, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '"+data.fecha_recibido_juridico+"', '"+data.fecha_envio_tecnico+"', '"+data.fecha_recibido_tecnico+"', '"+data.fecha_envio_ambiental+"', '"+data.fecha_recibido_ambiental+"', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Rechazo"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:obj.options.data.user.id, tipo:3 },
    function(data){
      //alert(JSON.stringify(data));
      var mires1 =$('#contenedor3');
      $.each(data, function(index,data){
        var fondo="naranja";                                                                                   
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"', 3, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Informacion Adicional"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
    { action:'get', folio:0, user:obj.options.data.user.id, tipo:4 },
      function(data){
        //alert(JSON.stringify(data));
        var mires1 =$('#contenedor4');
        $.each(data, function(index,data){
          var fondo="blanco";                                                                                   
          //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
          mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"', 4, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
        });
  });

  //Llena el contenedor "Comite de Fomento"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:obj.options.data.user.id, tipo:5 },
    function(data){
      //alert(JSON.stringify(data));
      var mires1 =$('#contenedor5');
      $.each(data, function(index,data){
        var fondo="blanco";                                                                                   
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"', 5, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Codigo de Identificacion"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:obj.options.data.user.id, tipo:6 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor6');
    $.each(data, function(index,data){
      var fondo="blanco";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"', 6, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '"+data.fecha_recibido_juridico+"', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Negacion"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:obj.options.data.user.id, tipo:7 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor7');
    $.each(data, function(index,data){
      var fondo="rojo";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"', 7, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Mia"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:obj.options.data.user.id, tipo:10 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor10');
    $.each(data, function(index,data){
      var fondo="blanco";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"',11, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Vencidas"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:obj.options.data.user.id, tipo:8 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor8');
    $.each(data, function(index,data){
      var fondo="rojo";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.observacion+"', '"+data.respuesta+"', 8, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Autorizadas"
  $.get("http://187.188.96.133:8080/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:obj.options.data.user.id, tipo:9 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor9');
    $.each(data, function(index,data){
      var fondo="blanco";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+obj.options.data.user.id+"', '"+data.Fecha_Registro+"', '"+data.observacion+"', 9, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '"+data.fecha_recibido_juridico+"', '"+data.fecha_envio_tecnico+"', '"+data.fecha_recibido_tecnico+"', '"+data.fecha_recibido_tecnico+"', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
});
});
break;      
      default:
        var params={data:{action:action,module:obj.options.data.active,userActive:user,activity:activity}};
        $(".app_"+obj.options.data.active).search(params);
        }
        }
      break;                                                            
                                                            case 'mapping':
                                                                      $(".sectionItem_selected").removeClass("sectionItem_selected");
                                                                      if (action=="layers") {
                                                                                $('.app_left_section_layers').layers();
                                                                      }
                                                                      if (action=='tabulate') {
                                                                                if (obj.TabulateOpen) {
                                                                                          $("#map").removeClass('mapForExecutive');
                                                                                          $(".app_bottom_section").hide();
                                                                                          
                                                                                }else{
                                                                                          if (!obj.TabulateCreated) {
                                                                                                        $(".app_bottom_section").addClass('bottomForExecutive');
                                                                                                        $(".app_bottom_section").tabulate({data:{userActive:user}});
                                                                                                        obj.TabulateCreated=true;
                                                                                          }
                                                                                          $("#map").addClass('mapForExecutive');
                                                                                          $(".app_bottom_section").show();
                                                                                }
                                                                                map.updateSize();
                                                                                obj.TabulateOpen =!obj.TabulateOpen;
                                                                      }
                                                                      if (action=="upload") {
                                                                                $('body').upload({data:{user:user,width:300,height:260}});
                                                                                $(".sectionItem_selected").removeClass("sectionItem_selected");
                                                                      }
                                                                      break;
                                                            case 'executive':
                                                                      break;
                                                  }
                                        }
                              });
                              
                    });
          },
          showSection:function(a,Clear){
                    var obj = this;
                    var clase = 'app_selected';
                    $("."+clase).removeClass(clase).hide();
                    $(".app_"+a).show().addClass(clase).show();
                    if ((a=='mapping')&&(map.isLoaded)) {
                              if ((obj.TabulateOpen)&&(obj.TabulateOpen)) {
                                        $(".app_bottom_section").tabulate('updateInfo');
                              }
                    }
                    if ((a=='mapping')&&(!map.isLoaded)) {
                              map.init(obj.options.data.user);
                              map.isLoaded=true;
                    }
                    if((a!='mapping')&&(a!='inform')){
                              $(".app_"+a).html('');
                    }
                    if (a=='executive') {
                              var params = {
                    
                                        columns: [
                                                  {width:'100',height:'400',typeData:'container',id:'cp_table',clear:true,title:''}
                                        ],
                                        params:{},
                                        file:'nacional',
                                        type:'Entidad',
                                        event:function(){}
                              };
                              $(".app_"+a).progress({data:params});
                    }
                    if (a=='inform') {
                           //   if(mainItem == 'executive'){
                                          var usuario = obj.options.data.user.id * 5;
                                          window.location.assign("http://187.188.96.133:800/SIFEM/reporteador/moduloEjecutivo.html");
                         //               }
                                         
                       //       $(".app_"+a).executiveReport({data:{userActive:obj.options.data.user}});
                    }
                    
                    
          },
          
          requestTabular : function(params,aditionals){
                    obj=this;
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        aditionals.data = json.data;
                                        aditionals.operations = json.operations;
                                        aditionals.request=json.request;
                                        aditionals.summarys=json.summarys;
                                        $(".app_"+obj.options.data.active).customTabular(aditionals);
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
                    r = $.extend(r, connections.tabular.get);
                    r.data = params;
                    $.ajax(r);
            },
          _init:function(){
                   this.show();
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