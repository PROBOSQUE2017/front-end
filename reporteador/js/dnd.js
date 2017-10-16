 var urlService = 'http://localhost:8080/ServiceBosque/Ejecutivo';
 //var urlService = 'http://localhost:8084/ServiceBosque/Ejecutivo';
 var programsSelected="";
 var controlSpecific = false;
$(function () {

  var contenedor = document.getElementById("spaceTables");
  var contenedorTabs = document.getElementById("pestania");
  var comboMunicipio= document.getElementById("municipio");
  var comboLocalidad= document.getElementById("localidad");
  var comboBusqueda= document.getElementById("opcionBusqueda");
  var comboProgramas = document.getElementById("programaSeleccion");
  var comboAnio = document.getElementById("anioSeleccion");
  var msg_error_anio = document.getElementById('errormsgAnio');
  var msg_error_pro = document.getElementById('errormsgProgram');
  var msg_error_reg = document.getElementById('errormsgRegion');
  var msg_error_mun = document.getElementById('errormsgMunicipio');
  var msg_error_loc = document.getElementById('errormsgLocalidad');
  var msg_error_busqueda = document.getElementById('errormsgBusqueda');
  var textoBusqueda="";


	
	$("#anioSeleccion").multipleSelect({
      filter: true,
      maxHeight: 110,

  });


 
  $("#programaSeleccion").multipleSelect({
      filter: true,
      maxHeight:110
  });


  $('[data-toggle="tooltip"]').tooltip();


	$("#btnbusqueda").click(function() {
      programsSelected="";
      programsSelected =  $("#programaSeleccion").multipleSelect("getSelects");
      var anioStelected =  $("#anioSeleccion").multipleSelect("getSelects");


      msg_error_anio.innerHTML='';
      msg_error_pro.innerHTML='';
      msg_error_reg.innerHTML='';
      msg_error_mun.innerHTML='';
      msg_error_loc.innerHTML='';
      msg_error_busqueda.innerHTML='';


      if(controlSpecific){
            if(validatorCombo("region")){
              msg_error_reg.innerHTML='';

              if(validatorCombo("municipio")){
                 msg_error_mun.innerHTML='';
                 if(validatorCombo("localidad")){
                  msg_error_loc.innerHTML='';
                      if(validatorCombo("opcionBusqueda")){
                         msg_error_busqueda.innerHTML='';
                           if(empty(anioStelected)){
                                    msg_error_anio.innerHTML="Seleccione año(s).";
                                    msg_error_pro.innerHTML="";
                                  }else{
                                       msg_error_anio.innerHTML='';
                                       if(empty(programsSelected)){
                                        msg_error_pro.innerHTML="Seleccione programa(s)";
                                       }else{
                                            msg_error_anio.innerHTML='';
                                            msg_error_pro.innerHTML='';

                                           if(hasSeletedFolio("#tabla tr")){

                                              var clavePredio= $(".seleccion").attr('id');
                                              contenedorTabs.innerHTML=createTabs(anioStelected,clavePredio);
                                              contenedor.innerHTML=createDivContainer(anioStelected);
                                             

                                              for(i=0;i<anioStelected.length;i++){
                                                   showTables(anioStelected[i],programsSelected); 
                                              }

                                              getReporte(urlService,clavePredio,anioStelected[0],programsSelected); 
                                            
                                           }else{
                                               msg_error_pro.innerHTML='Seleccione un predio o representante.';
                                           }
                                             
                                       }
                            }
                      }else{
                        msg_error_busqueda.innerHTML='Seleccione buscar por predio o responsable';
                      }
                 }else{
                  msg_error_loc.innerHTML='Seleccione localidad';
                 }

              }else{
                 msg_error_mun.innerHTML='Seleccione un municipio';
              }
             
            }else{
              msg_error_reg.innerHTML='Seleccione una región';
            }
        }else{
              if(empty(anioStelected)){
                      msg_error_anio.innerHTML="Seleccione año(s).";
                      msg_error_pro.innerHTML="";
                    }else{
                         msg_error_anio.innerHTML='';
                          if(empty(programsSelected)){
                          msg_error_pro.innerHTML="Seleccione programa(s)";
                          }else{
                              msg_error_anio.innerHTML='';
                              msg_error_pro.innerHTML='';

                              if(hasSeletedFolio("#tabla tr")){

                                var clavePredio= $(".seleccion").attr('id');
                                contenedorTabs.innerHTML=createTabs(anioStelected,clavePredio);
                                contenedor.innerHTML=createDivContainer(anioStelected);
                                             

                                for(i=0;i<anioStelected.length;i++){
                                      showTables(anioStelected[i],programsSelected); 
                                }

                                getReporte(urlService,clavePredio,anioStelected[0],programsSelected); 
                                            
                              }else{
                                  msg_error_busqueda.innerHTML='Para seleccionar haga click sobre un predio o representante.';
                              }
                                             
                          }
              }



        }
     
  });

  eventsRegion(urlService,comboMunicipio,msg_error_reg,msg_error_anio,msg_error_pro,msg_error_mun,msg_error_loc,msg_error_busqueda);
  eventsMunicipio(urlService,comboLocalidad,msg_error_mun,msg_error_anio,msg_error_pro,msg_error_loc,msg_error_busqueda);
  eventsLocalidades(comboBusqueda,msg_error_loc,msg_error_busqueda,msg_error_anio,msg_error_pro);
  

  $(".peticionAjax").keyup(function(){
        textoBusqueda = $(this).val();
        cleanDivInfo();
        if(controlSpecific){
             if(validatorCombo("region")){
                msg_error_reg.innerHTML='';
                if(validatorCombo("municipio")){
                    msg_error_mun.innerHTML='';
                    if(validatorCombo("localidad")){
                       msg_error_loc.innerHTML='';
                          eventsBusqueda(msg_error_busqueda,urlService,controlSpecific,$("select#opcionBusqueda").val(),$(this).val());
                    }else{
                       msg_error_loc.innerHTML='Seleccione localidad';
                    }
                }else{
                  msg_error_mun.innerHTML='Seleccione un municipio';
                }
            }else{
              msg_error_reg.innerHTML='Seleccione una región';
            }
        }else{
           eventsBusqueda(msg_error_busqueda,urlService,controlSpecific,$("select#opcionBusqueda").val(),$(this).val());
        }
          
  });

  $( "#opcionBusqueda" ).change(function() {
      $("#pestania").empty();
      $("#spaceTables").empty();
      cleanDivInfo();
      if(!controlSpecific)
      {  
        eventsBusquedaText("errormsgBusqueda","buscar",urlService,controlSpecific);
      }else{
        eventsBusqueda(msg_error_busqueda,urlService,controlSpecific,$("select#opcionBusqueda").val(),textoBusqueda);
      }
  });


});



function fullTableData(parametro){

      getReporte(urlService,$(parametro).attr('list'),$(parametro).attr('name'),programsSelected);
}

function eventsRegion(url,comboMunicipio,error,eAnio,errorPrograma,erroMuni,errorLoca,errorBusqueda){

  $( "#region" ).change(function() {
      var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
      var cabecera = document.getElementById("headInfo");
      cabecera.innerHTML= 'Descripción';
      table.innerHTML='';
      $("#pestania").empty();
      $("#spaceTables").empty();

      resetCombo("municipio");
      resetCombo("localidad");
      optionDefault("opcionBusqueda");
      
      eAnio.innerHTML='';
      errorPrograma.innerHTML='';
      erroMuni.innerHTML='';
      errorLoca.innerHTML='';
      errorBusqueda.innerHTML='';

      var idRegion = $("#region option:selected").val();
      if ($("select#region").val() == "-2ws"){
      }else{
         error.innerHTML='';
        getMunucipios(idRegion,comboMunicipio,url);
      }
  }); 

}

function eventsMunicipio(url,comboLocalidad,error,eAnio,errorPrograma,errorLoca,errorBusqueda){
    $( "#municipio" ).change(function() {
      var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
      var cabecera = document.getElementById("headInfo");
      cabecera.innerHTML= 'Descripción';
      table.innerHTML='';
      $("#pestania").empty();
      $("#spaceTables").empty();
      optionDefault("opcionBusqueda");

      resetCombo("localidad");
      eAnio.innerHTML='';
      errorPrograma.innerHTML='';
      errorLoca.innerHTML='';
      errorBusqueda.innerHTML='';

      var idMunicipio = $("#municipio option:selected").val();
      if ($("select#municipio").val() == "-2ws"){
      }else{
        error.innerHTML='';
        getLocalidades(idMunicipio,comboLocalidad,url);
      }
  }); 

}

function eventsLocalidades(comboBusqueda,error,errorBusqueda,eAnio,errorPrograma){
   $( "#localidad" ).change(function() {
      var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
      var cabecera = document.getElementById("headInfo");
      cabecera.innerHTML= 'Descripción';
      table.innerHTML='';
      $("#pestania").empty();
      $("#spaceTables").empty();
      optionDefault("opcionBusqueda");
      errorBusqueda.innerHTML='';
      eAnio.innerHTML='';
      errorPrograma.innerHTML='';
      comboBusqueda.selectedIndex=0;
      if ($("select#localidad").val() == "-2ws"){
        comboBusqueda.disabled=true;
       

      }else{
        comboBusqueda.disabled=false;

        error.innerHTML='';
      }
   });
}

function eventsBusquedaText(error,texto,url,ubicacion){
        $("#"+error).empty();
        if($("#"+texto).val().length > 0 && $("#opcionBusqueda").val()!="-2ws"){

              if($("select#opcionBusqueda").val() == "0"){
                    getPredio("",$("#"+texto).val(),url);
              }else if($("select#opcionBusqueda").val() == "1"){
                   getRepresentantes("",$("#"+texto).val(),url);
              }
        }else if($("#opcionBusqueda").val()=="-2ws"){
            var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
            var cabecera = document.getElementById("headInfo");
            cabecera.innerHTML= 'Descripción';
            table.innerHTML='';
        }

}


function eventsBusqueda(error,url,ubicacion,buscarPor,texto){
      $("#pestania").empty();
      $("#spaceTables").empty();
      

      if (buscarPor == "-2ws"){
         var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
         var cabecera = document.getElementById("headInfo");
         cabecera.innerHTML= 'Descripción';
         table.innerHTML='';
         error.innerHTML='Eliga una opción de busqueda';

      }else{
        error.innerHTML='';

          if(controlSpecific)
          {
              var idRegion = $("select#region").val();
              var idMunicipio = parseInt($("select#municipio").val());
              var idLocalidad = parseInt($("select#localidad").val());
              var tmp,tmpLocalidad,clave;  
             
              if(idMunicipio<=9){
                  tmp = "00"+idMunicipio;
              }else if(idMunicipio<=99){
                  tmp = "0"+idMunicipio;
              }else{
                  tmp = idMunicipio;
              }

              if(idLocalidad<=9){
                tmpLocalidad = "000"+idLocalidad;
              }else if(idLocalidad<=99){
                tmpLocalidad = "00"+idLocalidad;
              }else if(idLocalidad<=999){
                tmpLocalidad = "0"+idLocalidad;
              }else{
                tmpLocalidad = idLocalidad;
              }
              
              clave = "15"+idRegion+tmp+tmpLocalidad;
              if($("select#opcionBusqueda").val() == "0"){
                   if(texto.length == 0){
                     var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
                     var cabecera = document.getElementById("headInfo");
                     cabecera.innerHTML= 'Nombre del representante';
                     table.innerHTML='';
                  }else{
                     getPredio(clave,texto,url);
                  }
              }else if($("select#opcionBusqueda").val() == "1"){
                if(texto.length == 0){
                     var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
                     var cabecera = document.getElementById("headInfo");
                     cabecera.innerHTML= 'Nombre del representante';
                     table.innerHTML='';
                  }else{
                     getRepresentantes(clave,texto,url);
                  }
                 
              }
        }else{

              if($("select#opcionBusqueda").val() == "0"){
                  if(texto.length == 0){
                     var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
                     var cabecera = document.getElementById("headInfo");
                     cabecera.innerHTML= 'Descripción';
                     table.innerHTML='';

                  }else{
                      getPredio("",texto,url);
                  }
                
              }else if($("select#opcionBusqueda").val() == "1"){
                  if(texto.length == 0){
                     var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
                     var cabecera = document.getElementById("headInfo");
                     cabecera.innerHTML= 'Nombre del representante';
                     table.innerHTML='';
                  }else{
                     getRepresentantes("",texto,url);
                  }
                 
              }
        }
       
       
      }
  
}


function showTables(Year,programsSelected){
 
  var table = builderTableByYear(Year);
  var contenedorTmp= document.getElementById("menu"+Year); 
  contenedorTmp.appendChild(table);  

  var tbody = document.getElementById("tbody"+Year);
  var contenedorTmp='';
   
      for(var k=0;k<programsSelected.length;k++){  
         switch(programsSelected[k]) {
              case "1":             
              contenedorTmp+= addProgrogram1(Year);
              break;
              case "2":
              contenedorTmp+= addProgram2(Year);
              break;
              case "3":
              contenedorTmp+= addProgram3(Year);
              break;
              case "5":
              contenedorTmp+= addProgram5(Year);
              break;
              case "6":
              contenedorTmp+= addProgram6(Year);
              break;
              case "7":
              contenedorTmp+= addProgram7(Year);
              break;
              case "8":
              contenedorTmp+= addProgram8(Year);
              break;
              case "10":
              contenedorTmp+= addProgram10(Year);
              break;
              case "11":
              contenedorTmp+= addProgram11(Year);
              break;
              case "12":
              contenedorTmp+= addProgram12(Year);
              break;
          } 
      }     
    

  tbody.innerHTML = contenedorTmp;
}


function init(){}


function empty(texto){
	if(/^\s*$/.test(texto.trim())){
		return true;
	}else{
		return false;
	}

}
function empty(Arreglo){
  if(Arreglo.length==0){
    return true;
  }else{
    return false;

  }
}

function createTabs(ArrayYears,clavePredio){
  var tabs='';
  if(ArrayYears.length>0)
  {
    tabs+='<ul class="nav nav-tabs">';

    for(i=0;i<ArrayYears.length;i++){
      if(i==0){
       tabs+='<li  class="active" name="'+ArrayYears[i]+'" list="'+clavePredio+'"><a data-toggle="tab" href="#menu'+ArrayYears[i]+'">'+ArrayYears[i]+'</a></li>';
      }else{
      tabs+='<li onclick="fullTableData(this)" name="'+ArrayYears[i]+'" list="'+clavePredio+'"><a data-toggle="tab" href="#menu'+ArrayYears[i]+'">'+ArrayYears[i]+'</a></li>';
      }
    }
    tabs+='</ul>';
    return tabs;

  }else{
    return tabs;
  }
   
}

function findUbicacion(comboRegio,comboMunicipio,comboLocalidad,errorRegion,errormsgMunicipio,errorLocalidad){
      $("#"+errorRegion).empty();
      $("#"+errormsgMunicipio).empty();
      $("#"+errorLocalidad).empty();

}


function resetCombo(ComboId){
  var opcion = document.createElement("option");
  var combo = document.getElementById(ComboId);
  opcion.innerHTML="Seleccione";
  $("#"+ComboId).empty();
  opcion.setAttribute("value","-2ws");
  combo.appendChild(opcion);

  $("select#"+ComboId).val("-2ws");
}

$("#showPredio").click(function(){
   if(!$(this).attr('name') == "")
   {  
      window.open("/SIFEM/toolMaps/predio.php?cve="+Base64.encode($(this).attr('name')));
   } 
});

$(".option_logout").click(function(){
        CerrarSession();
});

function CerrarSession(){
    amplify.store('dataLoggingProbosque',null);
    window.location.assign("/SIFEM/index.html");
}



function validatorCombo(ComboBox){
    if ($("select#"+ComboBox).val() == "-2ws"){
        return false;
    }else{
      return true;
    }

}

function validatorExisttext(texto){

    if(isEmpty(texto)){
      return " ";
    }else{
      return texto;
    }

}

function validarVacioNumerico(texto){
    if(isEmpty(texto)){
      return 0;
    }else{
      return texto;
    }

}

function createDivContainer(ArrayYears){
  var div='';
  for(i=0;i<ArrayYears.length;i++){
     
    if(i==0){
      div+='<div id="menu'+ArrayYears[i]+'" class="tab-pane fade in active"></div>';
    }else{
       div+='<div id="menu'+ArrayYears[i]+'" class="tab-pane fade"></div>';
    }
  }
  return div;
}

function selectIdPredio(params){
    var renglon = params.getAttribute('id');
    var tiene = $("#"+renglon).hasClass('seleccion');
    var enlace = document.getElementById('showPredio');
    $("#errormsgBusqueda").empty();
    cleanDivInfo();
    $("#tabla tr").removeClass('seleccion');
    $("#pestania").empty();
    $("#spaceTables").empty();
    if (tiene) {
        $("#"+renglon).removeClass('seleccion');
        enlace.setAttribute('name','');
    }
    else {
        $("#"+renglon).addClass('seleccion');        
        getDetallePredio(urlService,renglon);
        $("#showPredio").val(renglon);
        enlace.setAttribute('name',renglon);
    }


}

function cleanDivInfo(){
    $("#textClave").html("&nbsp");
    $("#textTipoTenencia").html("&nbsp");
    $("#textNombrePredio").html("&nbsp");
    $("#textResponsable").html("&nbsp");
    $("#seleccionBusquedaShow").html("&nbsp");
    $("#textoResultPreRes").html("&nbsp");
}

function optionDefault(combo){
    $("select#"+combo).val("-2ws");
}

function hasSeletedFolio(tabla){
    if ($(tabla).hasClass('seleccion')){
      return true;
    }else{
      return false;
    }
}

function isEmpty(obj) {
  for(var i in obj) { return false; }
  return true;
}

$("#ubicacionchek").on("click", function(){

    $("#pestania").empty();
    $("#spaceTables").empty();
    $("#bodyAllPredios").empty();
    $("#errormsgBusqueda").empty();

    if( $("#ubicacionchek").is(':checked')) {
        controlSpecific = true;
        $("#contenidoSpecifico").css("background-color","#FFFFFF");
        $('#estado').attr("disabled", false);
        $('#region').attr("disabled", false);
        $('#municipio').attr("disabled", false);
        $('#localidad').attr("disabled", false);
        $('#opcionBusqueda').attr("disabled", true);
        optionDefault("opcionBusqueda");
        
    }else{
          resetCombo("municipio");
          resetCombo("localidad");
          optionDefault("region");
          optionDefault("opcionBusqueda");
          $('#estado').attr("disabled", true);
          $('#region').attr("disabled", true);
          $('#municipio').attr("disabled", true);
          $('#localidad').attr("disabled", true);
          $('#opcionBusqueda').attr("disabled", false);
          $("#errormsgRegion").empty();
          $("#errormsgMunicipio").empty();
          $("#errormsgLocalidad").empty();
          $("#contenidoSpecifico").css("background-color","#E6E6E6");
          controlSpecific = false;
    }

});


function builderTableByYear(Year){

  var newTable = document.createElement("table");
  var cabecera = newTable.createTHead();
  var rowtitle = cabecera.insertRow(0); 
  var rowYear = cabecera.insertRow(0); 
  var cuerpoTabla = newTable.createTBody();

  var cellYear = rowYear.insertCell(-1);
  
  var celltitle = rowtitle.insertCell(-1);
  var celltitle1 = rowtitle.insertCell(-1);
  var celltitle2 = rowtitle.insertCell(-1);
  var celltitle3 = rowtitle.insertCell(-1);
  var celltitle4 = rowtitle.insertCell(-1);
  var celltitle5 = rowtitle.insertCell(-1);
  var celltitle6 = rowtitle.insertCell(-1);
  var celltitle7 = rowtitle.insertCell(-1);

  newTable.setAttribute("id","tableYear"+Year);
  newTable.setAttribute("border","1");
  newTable.setAttribute("width","100%");
  newTable.setAttribute("class","table table-bordered");
  rowYear.setAttribute("style","background-color:green; color:white; font-weight: bold;");
  rowYear.setAttribute("align","center");
  rowtitle.setAttribute("align","center");
  rowtitle.setAttribute("style","background-color:#E6E6E6;font-weight: bold;");
  cellYear.setAttribute("colspan",8);
  cuerpoTabla.setAttribute("id","tbody"+Year);
  //cuerpoTabla.setAttribute("class","showBarsV acomodar");

  celltitle.setAttribute("width","10%");
  //celltitle1.setAttribute("width","5%");
  celltitle2.setAttribute("width","6%");
  //celltitle3.setAttribute("width","8%");
  celltitle4.setAttribute("width","10%");
  celltitle5.setAttribute("width","10%");
  celltitle6.setAttribute("width","35%");
  celltitle7.setAttribute("width","16%");



  cellYear.innerHTML=''+Year;

  celltitle.innerHTML='Programa'; 
  celltitle1.innerHTML='Unidad medida';
  celltitle2.innerHTML='Cantidad';
  celltitle3.innerHTML='Acción';
  celltitle4.innerHTML='Monto de apoyo aprobado $';
  celltitle5.innerHTML='Monto de apoyo pagado $';
  celltitle6.innerHTML='Resultado';
  celltitle7.innerHTML='Observaciones';

  return newTable;

}

var addProgrogram1 = function(anio){
  var info_program1='';
  info_program1 = '<tr>'+
                              '<td rowspan="3">'+
                                  'Autorizaciones para el Aprovechamiento de Recursos Forestales Maderables'+
                              '</td>'+
                              '<td>m³vta</td>'+
                              '<td></td>'+
                              '<td>Autorización</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog1res'+anio+'"></td>'+
                              '<td id="prog1obs'+anio+'" align="center"></td>'+
                          '</tr>'+
                          '<tr>'+
                              '<td>m³ rollo</td>'+
                              '<td></td>'+
                              '<td>Volumen extraído en la anualidad</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog1res2'+anio+'"></td>'+
                              '<td id="prog1obs2'+anio+'" align="center"></td>'+
                          '</tr>'+
                         ' <tr>'+
                              '<td>ha</td>'+
                              '<td></td>'+
                              '<td>Superficie a intervenir en la anualidad</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog1res3'+anio+'"></td>'+
                              '<td id="prog1obs3'+anio+'" align="center"></td>'+
                          '</tr>';
   return info_program1;                       
}

var addProgram2 =  function(anio){
  var info_program2='';
  info_program2 = '<tr>'+
                              '<td rowspan="5">'+
                                  'Asistencia Técnica'+
                              '</td>'+
                              '<td>Evento</td>'+
                              '<td id="prog2ren1col3'+anio+'" align="center"></td>'+
                              '<td>Asamblea</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog2ren1col7'+anio+'" align="center"></td>'+
                              '<td></td>'+
                          '</tr>'+
                          '<tr>'+
                              '<td>Evento</td>'+
                              '<td id="prog2ren2col3'+anio+'" align="center"></td>'+
                              '<td>Curso</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog2ren2col7'+anio+'" align="center"></td>'+
                              '<td></td>'+
                          '</tr>'+
                         ' <tr>'+
                              '<td>Evento</td>'+
                              '<td id="prog2ren3col3'+anio+'" align="center"></td>'+
                              '<td>Curso Reportado</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog2ren3col7'+anio+'" align="center"></td>'+
                              '<td></td>'+
                          '</tr>'+
                          ' <tr>'+
                              '<td>Evento</td>'+
                              '<td id="prog2ren4col3'+anio+'" align="center"></td>'+
                              '<td>Evento</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog2ren4col7'+anio+'" align="center"></td>'+
                              '<td></td>'+
                          ' </tr>'+
                          ' <tr>'+
                              '<td>Evento</td>'+
                              '<td id="prog2ren5col3'+anio+'" align="center"></td>'+
                              '<td>Evento Reportado</td>'+
                              '<td></td>'+
                              '<td></td>'+
                              '<td id="prog2ren5col7'+anio+'" align="center"></td>'+
                              '<td></td>'+
                          '</tr>';
    return info_program2;
}

var addProgram3 = function(anio){
  var info_program3='';
      info_program3 = '<tr>'+
                              '<td rowspan="2">'+
                                  'Reforestación y Restauración Integral de Microcuencas (PRORRIM)'+
                              '</td>'+
                              '<td>ha</td>'+
                              '<td id="prog3ren1col3'+anio+'"></td>'+
                              '<td>Establecimiento de reforestación</td>'+
                              '<td id="prog3ren1col5'+anio+'"></td>'+
                              '<td id="prog3ren1col6'+anio+'"></td>'+
                              '<td id="prog3ren1col7'+anio+'"></td>'+
                              '<td id="prog3ren1col8'+anio+'"></td>'+
                          '</tr>'+
                          '<tr>'+
                              '<td>hA</td>'+
                              '<td id="prog3ren2col3'+anio+'"></td>'+
                              '<td>Mantenimiento reforestación</td>'+
                              '<td id="prog3ren2col5'+anio+'"></td>'+
                              '<td id="prog3ren2col6'+anio+'"></td>'+
                              '<td id="prog3ren2col7'+anio+'"></td>'+
                              '<td id="prog3ren2col8'+anio+'"></td>'+
                          '</tr>';

  return info_program3;
}

var addProgram5 = function(anio){
  var info_program5='';
      info_program5 = '<tr>'+
                              '<td rowspan="2">'+
                                  'Reconversión Productiva (Plantaciones Forestales Comerciales)'+
                              '</td>'+
                              '<td>ha</td>'+
                              '<td id="prog5reng1col3'+anio+'"></td>'+
                              '<td>Establecimiento de Plantación</td>'+
                              '<td id="prog5reng1col5'+anio+'"></td>'+
                              '<td id="prog5reng1col6'+anio+'"></td>'+
                              '<td id="prog5reng1col7'+anio+'"></td>'+
                              '<td id="prog5reng1col8'+anio+'"></td>'+
                          '</tr>'+
                          '<tr>'+
                              '<td>ha</td>'+
                              '<td id="prog5reng2col3'+anio+'"></td>'+
                              '<td>Mantenimiento</td>'+
                              '<td id="prog5reng2col5'+anio+'"></td>'+
                              '<td id="prog5reng2col6'+anio+'"></td>'+
                              '<td id="prog5reng2col7'+anio+'"></td>'+
                              '<td id="prog5reng2col8'+anio+'"></td>'+
                          '</tr>';

  return info_program5;
}

var addProgram6 = function(anio){
  var info_program6='';
      info_program6 = '<tr>'+
                              '<td rowspan="2">'+
                                  'Sanidad Forestal'+
                              '</td>'+
                              '<td>Diagnostico</td>'+
                              '<td id="prog6reng1col3'+anio+'"></td>'+
                              '<td>Diagnóstico fitosanitario</td>'+
                              '<td>N.A.</td>'+
                              '<td>N.A.</td>'+
                              '<td id="prog6reng1col7'+anio+'"></td>'+
                              '<td id="prog6reng1col8'+anio+'"></td>'+
                          '</tr>'+
                          '<tr>'+
                              '<td>Ha</td>'+
                              '<td id="prog6reng2col3'+anio+'"></td>'+
                              '<td>Asesoría Técnica</td>'+
                              '<td>N.A.</td>'+
                              '<td>N.A.</td>'+
                              '<td id="prog6reng2col7'+anio+'"></td>'+
                              '<td id="prog6reng2col8'+anio+'"></td>'+
                          '</tr>';

  return info_program6;
}

var addProgram7 = function(anio){
  var info_program7 ='';
      info_program7 = '<tr>'+
                              '<td rowspan="3">'+
                                  'Incendios Forestales'+
                              '</td>'+
                              '<td>ha</td>'+
                              '<td id="prog71reng1col3'+anio+'"></td>'+
                              '<td>Control y combate de incendios forestales</td>'+
                              '<td id="prog71reng1col5'+anio+'"></td>'+
                              '<td id="prog71reng1col6'+anio+'"></td>'+
                              '<td id="prog71reng1col7'+anio+'" colspan="2"></td>'+
                          '</tr>'+
                          '<tr>'+
                              '<td>km</td>'+
                              '<td id="prog71reng2col3'+anio+'"></td>'+
                              '<td>Trabajos preventivos brechas corta fuego </td>'+
                              '<td id="prog71reng2col5'+anio+'"></td>'+
                              '<td id="prog71reng2col6'+anio+'"></td>'+
                              '<td id="prog71reng2col7'+anio+'"></td>'+
                              '<td id="prog71reng2col8'+anio+'"></td>'+
                          '</tr>'+
                         ' <tr>'+
                              '<td>HA</td>'+
                              '<td id="prog71reng3col3'+anio+'"></td>'+
                              '<td>Trabajos preventivos quemas controladas</td>'+
                              '<td id="prog71reng3col5'+anio+'"></td>'+
                              '<td id="prog71reng3col6'+anio+'"></td>'+
                              '<td id="prog71reng3col7'+anio+'"></td>'+
                              '<td id="prog71reng3col8'+anio+'"></td>'+
                          '</tr>';

  return info_program7;
}

var addProgram8= function(anio){
  var info_program8 = '';
      info_program8 = '<tr>'+
                              '<td rowspan="5">'+
                                  'Inspección y Vigilancia Forestal'+
                              '</td>'+
                              '<td>Acción</td>'+
                              '<td id="prog8reng1col3'+anio+'"></td>'+
                              '<td>Dictamenes periciales</td>'+
                              '<td>Sin apoyos</td>'+
                              '<td>Sin apoyos</td>'+
                              '<td id="prog8reng1col7'+anio+'"></td>'+
                              '<td id="prog8reng1col8'+anio+'"></td>'+
                          '</tr>'+
                          '<tr>'+
                              '<td>Acción</td>'+
                              '<td id="prog8reng2col3'+anio+'"></td>'+
                              '<td>Filtro de revisión al transporte</td>'+
                              '<td>Sin apoyos</td>'+
                              '<td>Sin apoyos</td>'+
                              '<td id="prog8reng2col7'+anio+'"></td>'+
                              '<td id="prog8reng2col8'+anio+'"></td>'+
                          '</tr>'+
                         ' <tr>'+
                              '<td>Acción</td>'+
                              '<td id="prog8reng3col3'+anio+'"></td>'+
                              '<td>Tipo de industria</td>'+
                              '<td>Sin apoyos</td>'+
                              '<td>Sin apoyos</td>'+
                              '<td id="prog8reng3col7'+anio+'"></td>'+
                              '<td id="prog8reng3col8'+anio+'"></td>'+
                          '</tr>'+
                          ' <tr>'+
                              '<td>Acción</td>'+
                              '<td id="prog8reng4col3'+anio+'"></td>'+
                              '<td>Inspección a predios</td>'+
                              '<td>N.A.</td>'+
                              '<td>N.A.</td>'+
                              '<td id="prog8reng4col7'+anio+'"></td>'+
                              '<td id="prog8reng4col8'+anio+'"></td>'+
                          '</tr>'+
                          ' <tr>'+
                              '<td>Acción</td>'+
                              '<td id="prog8reng5col3'+anio+'"></td>'+
                              '<td>Operativos coordinados</td>'+
                              '<td>N.A.</td>'+
                              '<td>N.A.</td>'+
                              '<td id="prog8reng5col7'+anio+'"></td>'+
                              '<td id="prog8reng5col8'+anio+'"></td>'+
                          '</tr>';

  return info_program8;
}


var addProgram10 = function(anio){
  var info_program10='';
  info_program10 = '<tr>'+
                              '<td>'+
                                  'Pago por Servicios Ambientales Hidrológicos del Estado de México (PSAHEM)'+
                              '</td>'+
                              '<td>ha</td>'+
                              '<td id="prog10reng1col3'+anio+'"></td>'+
                              '<td>Conservación de Área Forestal</td>'+
                              '<td id="prog10reng1col5'+anio+'"></td>'+
                              '<td id="prog10reng1col6'+anio+'"></td>'+
                              '<td id="prog10reng1col7'+anio+'"></td>'+
                              '<td id="prog10reng1col8'+anio+'"></td>'+
                          '</tr>';
  return info_program10;
}

var addProgram11 = function(anio){
  var info_program11='';
      info_program11 = '<tr>'+
                              '<td>'+
                                  'Programa de Desarrollo de la Industria Forestal (Proyectos Productivos)'+
                              '</td>'+
                              '<td>Proyecto</td>'+
                              '<td id="prog11reng1col3'+anio+'"></td>'+
                              '<td>Gestión de apoyos</td>'+
                              '<td id="prog11reng1col5'+anio+'"></td>'+
                              '<td id="prog11reng1col6'+anio+'"></td>'+
                              '<td id="prog11reng1col7'+anio+'"></td>'+
                              '<td id="prog11reng1col8'+anio+'"></td>'+
                          '</tr>';

      return info_program11;
}

var addProgram12= function(anio){
  var info_program12='';
      info_program12 = '<tr>'+
                              '<td>'+
                                  'Sitios de Muestreo para Monitoreo de las Áreas Forestales'+
                              '</td>'+
                              '<td><h6>Conglomerado</h6></td>'+
                              '<td id="prog12reng1col3'+anio+'"  align="center"></td>'+
                              '<td>Registro de existencias maderables por hectárea</td>'+
                              '<td id="prog12reng1col5'+anio+'"  align="center"></td>'+
                              '<td id="prog12reng1col6'+anio+'"  align="center"></td>'+
                              '<td id="prog12reng1col7'+anio+'"  align="center"></td>'+
                              '<td id="prog12reng1col8'+anio+'"  align="center"></td>'+
                          '</tr>';
  

  return info_program12;
}

function insertDataBasicSelected(array){
    cleanDivInfo();
    var tmpNameResult="";
    var tmpNameResult1="";
    var opcion = $("#opcionBusqueda option:selected").val();
    for (var item in array) {
        if(item == "municipio"){
            $("#textNombrePredio").html(array.municipio);
        }else if(item == "region"){
            $("#textClave").html(array.region);
        }else if(item == "tenencia"){
            $("#textTipoTenencia").html(array.tenencia);
        }else if(item == "localidad"){
            $("#textResponsable").html(array.localidad);
        }else if(item == "representante"){
            tmpNameResult=array.representante;
        }else if(item == "descripcion"){
             tmpNameResult1 = array.descripcion;
        }
    }
    if(opcion == 0){ 
        $("#seleccionBusquedaShow").html("Nombre del representante:");
        $("#textoResultPreRes").html(tmpNameResult);
    }else if(opcion == 1){
        $("#seleccionBusquedaShow").html("Nombre del predio:");
        $("#textoResultPreRes").html(tmpNameResult1);
    }
}

function insertDataProgram1(anio,array){
      var texto = document.getElementById("prog1res"+anio);
      var texto1 = document.getElementById("prog1obs"+anio);
      var texto2 = document.getElementById("prog1res2"+anio);
      var texto3 = document.getElementById("prog1obs2"+anio);
      var texto4 = document.getElementById("prog1res3"+anio);
      var texto5 = document.getElementById("prog1obs3"+anio);
      var superfi = "";
      var datosss = "";
      var controlGlobal="";
      texto.innerHTML="";
      texto1.innerHTML="";
      texto2.innerHTML="";
      texto3.innerHTML="";
      texto4.innerHTML="";
      texto5.innerHTML="";
      
      for (var control in array){
            var auxtmp='';
              if(control == "oficioP1"){
                  if(!isEmpty(array[control])){
                      for (var tmp in array[control]){
                        if(tmp == "fecha_expedicion"){
                            auxtmp+="<b>Fecha Expedición</b><br>";
                            auxtmp+=validatorExisttext(array[control].fecha_expedicion)+"<br>";
                        }else if(tmp == "fecha_vencimiento"){
                            auxtmp+="<b>Fecha vencimiento</b><br>";
                            auxtmp+=validatorExisttext(array[control].fecha_vencimiento)+"</center>";
                        }
                        
                      }
                      controlGlobal=auxtmp;
                  }
              }
              else if(control == "rodalSuperficie"){
                  if(array[control].length>0){
                    auxtmp+='<div style="width:450px; height: 200px; overflow-y: auto;">';
                    auxtmp+='<table border="0"  class="table table-striped" width="100%">';
                    auxtmp+='<thead><tr><th>Area de corta</th><th>Numero del rodal</th><th>Superficie del rodal</th></tr></thead>';
                    auxtmp+='<tbody>';
                    for(var itmp in array[control]){
                        auxtmp+="<tr><td>"+validatorExisttext(array[control][itmp].area_corta)+"</td>";
                        auxtmp+="<td>"+formatNumber.new(validatorExisttext(array[control][itmp].rodal))+"</td>";
                        auxtmp+="<td>"+formatNumber.new(validarVacioNumerico(array[control][itmp].superficie))+"</td></tr>";
                    }
                    auxtmp+='</tbody>';
                    auxtmp+='</table>';
                    auxtmp+='</div>';
                    datosss=auxtmp;
                    
                  }
              }
              else if(control == "superficieArbolada"){
                if(!isEmpty(array[control])){
                    auxtmp+="<center><b>Superficie total bajo manejo<br>";
                    auxtmp+="Superficie arbolada: </b><br>"+formatNumber.new(array[control].result)+"</center>";
                    superfi= auxtmp;
                  }
              }
              else if(control == "vol"){
                  if(array[control].length>0){
                      auxtmp+='<div style="width:450px; height: 200px; overflow-y: auto;">';
                      auxtmp+='<table border="0"  class="table table-striped" width="100%"><thead><tr>';
                      auxtmp+='<th>Area</th><th>Genero</th><th>Existencias Reales</th><th>Posiblidad total</th><th>Residual total</th></tr></thead>';
                      auxtmp+='<tbody>';
                      for(var auxcontrol in array[control]){
                        auxtmp+="<tr><td>"+validatorExisttext(array[control][auxcontrol].areacorta)+"</td>";
                        auxtmp+="<td>"+validatorExisttext(array[control][auxcontrol].genero)+"</td>";
                        auxtmp+="<td>"+formatNumber.new(validarVacioNumerico(array[control][auxcontrol].volumen_existencias_reales_rodal))+"</td>";
                        auxtmp+="<td>"+formatNumber.new(validarVacioNumerico(array[control][auxcontrol].volumen_posibilidad_total))+"</td>";
                        auxtmp+="<td>"+formatNumber.new(validarVacioNumerico(array[control][auxcontrol].volumen_residual_rodal))+"</td></tr>";
                      }
                      auxtmp+='</tbody>';
                      auxtmp+='</table>';
                      auxtmp+='</div>';
                      texto.innerHTML=auxtmp;
                  }
              }
              else if(control == "volTpP1"){
                  if(array[control].length>0){
                    var tableBuilder='';
                    tableBuilder+='<div style="width:450px; height: 200px; overflow-y: auto;">';
                    tableBuilder+='<table border="0"  class="table table-striped" width="100%">';
                    tableBuilder+='<thead><tr><th>Genero</th><th>Producción escuadria</th>'
                    tableBuilder+='<th>Celulosa</th><th>Leña combustible</th><th>Carbón</th><th>Ejercido</th></tr></thead>';
                    tableBuilder+='<tbody>';
                    for(var itmp in array[control]){
                        tableBuilder+="<tr><td>"+formatNumber.new(validatorExisttext( array[control][itmp].genero))+"</td>";
                        tableBuilder+="<td>"+formatNumber.new(validarVacioNumerico( array[control][itmp].produccion_escuadria))+"</td>";
                        tableBuilder+="<td>"+formatNumber.new(validarVacioNumerico( array[control][itmp].celulosa))+"</td>";
                        tableBuilder+="<td>"+formatNumber.new(validarVacioNumerico( array[control][itmp].lenia_combustible))+"</td>";
                        tableBuilder+="<td>"+formatNumber.new(validarVacioNumerico( array[control][itmp].carbon))+"</td>";
                        tableBuilder+="<td>"+formatNumber.new(validarVacioNumerico( array[control][itmp].volumen_ejercido))+"</td></tr>";
                    }
                    tableBuilder+='</tbody>';
                    tableBuilder+='</table>';
                    tableBuilder+='</div>';

                    texto2.innerHTML=tableBuilder;
                  }
              }
              else if(control == "liberacionVencimiento"){
                  for (var tmp in array[control]){
                    if(tmp == "fecha_expedicion"){
                        auxtmp+="<b>Fecha Liberación</b><br>";
                        auxtmp+=validatorExisttext(array[control].fecha_expedicion)+"<br>";
                    }else if(tmp == "fecha_vencimiento"){
                        auxtmp+="<b>Fecha informe</b><br>";
                        auxtmp+=validatorExisttext(array[control].fecha_vencimiento)+"</center>";
                    }
                    
                  }
                  texto3.innerHTML=auxtmp;

              }else if(control == "situacionPredio"){
                    if(!isEmpty(array[control])){
                      texto5.innerHTML+="<b>Situación del predio: </b><br>"+validatorExisttext(array[control].situacion_predio);
                    }
              }else if(control == "oficoAutorizacion"){
                    if(!isEmpty(array[control])){
                       texto1.innerHTML+="<center><b>Oficio autorización</b><br>";
                       texto1.innerHTML+=validatorExisttext(array[control].result);
                       texto1.innerHTML+="<br>"+controlGlobal;
                    }
              }

      }

      texto4.innerHTML+=datosss;
      texto4.innerHTML+=superfi;
      

}


function insertDataProgram2(anio,array){
   var celdaTexto1 = document.getElementById("prog2ren1col3"+anio);
   var celdaTexto2 = document.getElementById("prog2ren2col3"+anio);
   var celdaTexto3 = document.getElementById("prog2ren3col3"+anio);
   var celdaTexto4 = document.getElementById("prog2ren4col3"+anio);
   var celdaTexto5 = document.getElementById("prog2ren1col7"+anio);
   var celdaTexto6 = document.getElementById("prog2ren2col7"+anio);
   var celdaTexto7 = document.getElementById("prog2ren3col7"+anio);
   var celdaTexto8 = document.getElementById("prog2ren4col7"+anio);
   var celdaTexto9 = document.getElementById("prog2ren5col3"+anio);
   var celdaTexto10 = document.getElementById("prog2ren5col7"+anio);

    celdaTexto1.innerHTML="";
    celdaTexto2.innerHTML="";
    celdaTexto3.innerHTML="";
    celdaTexto4.innerHTML="";
    celdaTexto5.innerHTML="";
    celdaTexto6.innerHTML="";
    celdaTexto7.innerHTML="";
    celdaTexto8.innerHTML="";
    celdaTexto9.innerHTML="";
    celdaTexto10.innerHTML="";

    for (var control in array){
            var auxtmp='';
          if(control == "totalCurso"){
              celdaTexto1.innerHTML=validarVacioNumerico(array[control].result);
          }else if(control == "totalCursoAsamblea"){
               celdaTexto3.innerHTML=validarVacioNumerico(array[control].result);
          }else if(control == "totalCursoTaller"){
                celdaTexto2.innerHTML=validarVacioNumerico(array[control].result);
          }else if(control == "totalPCursoAsamblea"){
              if(!isEmpty(array[control])){
                 celdaTexto7.innerHTML=validarVacioNumerico(array[control].result)+" Persona(s)";
              }
          }else if(control == "totalPTaller"){
              if(!isEmpty(array[control])){
                celdaTexto8.innerHTML=validarVacioNumerico(array[control].result)+" Persona(s)";
              }
          }else if(control == "totalParticipantesCurso"){
              if(!isEmpty(array[control])){
                 celdaTexto5.innerHTML=validarVacioNumerico(array[control].result)+" Persona(s)";
              }
          }else if(control == "totalParticipantesCursoTaller"){
              if(!isEmpty(array[control])){
                 celdaTexto6.innerHTML=validarVacioNumerico(array[control].result)+" Persona(s)";
              }
          }else if(control == "totalTaller"){
                celdaTexto4.innerHTML=validarVacioNumerico(array[control].result);
          }else if(control == "totalPEventoReportado"){
              if(!isEmpty(array[control])){
                 celdaTexto10.innerHTML=validarVacioNumerico(array[control].result)+" Persona(s)";
              }
          }else if(control == "totalEventoReportado"){
             celdaTexto9.innerHTML=validarVacioNumerico(array[control].result);
          }

    }

}

function insertDataProgram3(anio,array){
    var reng1Celda3 = document.getElementById("prog3ren1col3"+anio);
    var reng1Celda5 = document.getElementById("prog3ren1col5"+anio);
    var reng1Celda6 = document.getElementById("prog3ren1col6"+anio);
    var reng1Celda7 = document.getElementById("prog3ren1col7"+anio);
    var reng1Celda8 = document.getElementById("prog3ren1col8"+anio);

    var reng2Celda3 = document.getElementById("prog3ren2col3"+anio);
    var reng2Celda5 = document.getElementById("prog3ren2col5"+anio);
    var reng2Celda6 = document.getElementById("prog3ren2col6"+anio);
    var reng2Celda7 = document.getElementById("prog3ren2col7"+anio);
    var reng2Celda8 = document.getElementById("prog3ren2col8"+anio);

    reng1Celda3.innerHTML="";
    reng1Celda5.innerHTML="";
    reng1Celda6.innerHTML="";
    reng1Celda7.innerHTML="";
    reng1Celda8.innerHTML="";
    reng2Celda3.innerHTML="";
    reng2Celda5.innerHTML="";
    reng2Celda6.innerHTML="";
    reng2Celda7.innerHTML="";
    reng2Celda8.innerHTML="";

    for (var control in array){
            var auxtmp='';
            if(control == "SuperficieReforestadaMenosDesistida"){
                if(!isEmpty(array[control])){
                   reng2Celda7.innerHTML="<b>Superficie final reforestada - superficie desistida:</b>"+array[control].result;
                }
            }else if(control == "montoTotalProrrim"){
                if(!isEmpty(array[control])){
                  reng2Celda5.innerHTML= "<b>$ </b>"+formatNumber.new(validarVacioNumerico(array[control].result));
              }
            }else if(control == "prorrim"){
                if(!isEmpty(array[control])){
                 reng2Celda3.innerHTML=array[control].result;
              }
            }else if(control == "totalMinistracion"){
                if(!isEmpty(array[control])){
                 reng1Celda6.innerHTML= "<b>$ </b>"+formatNumber.new(validarVacioNumerico(array[control].result));
              }
            }else if(control == "totalMinistracionProrrim"){
                if(!isEmpty(array[control])){
                  reng2Celda6.innerHTML= "<b>$ </b>"+formatNumber.new(validarVacioNumerico(array[control].result));
              }
            }else if(control == "supFinRef"){
              if(!isEmpty(array[control])){
                  reng1Celda3.innerHTML=" <b>Superficie final reforestada: </b>"+formatNumber.new(validarVacioNumerico(array[control].result));
              }
            }else if(control == "plantas"){
                if(!isEmpty(array[control])){
                  reng1Celda7.innerHTML= "<b>Cantidad de plantas reforestadas: </b>"+formatNumber.new(validarVacioNumerico(array[control].result));
              }
            }else if(control == "observaciones"){
               if(!isEmpty(array[control])){
                  reng1Celda8.innerHTML= validatorExisttext(array[control].observaciones);
                  reng2Celda8.innerHTML= validatorExisttext(array[control].observaciones);
               }
            }else if(control == "montoTP3"){
                if(!isEmpty(array[control])){
                  reng1Celda5.innerHTML= "<b>$  </b>"+formatNumber.new(validarVacioNumerico(array[control].result));
                }
            }
    }


}


function insertDataProgram5(anio,array){
    var ren1celda3 = document.getElementById("prog5reng1col3"+anio);
    var ren1celda5 = document.getElementById("prog5reng1col5"+anio);
    var ren1celda6 = document.getElementById("prog5reng1col6"+anio);
    var ren1celda7 = document.getElementById("prog5reng1col7"+anio);
    var ren1celda8 = document.getElementById("prog5reng1col8"+anio);
    var ren2celda3 = document.getElementById("prog5reng2col3"+anio);
    var ren2celda5 = document.getElementById("prog5reng2col5"+anio);
    var ren2celda6 = document.getElementById("prog5reng2col6"+anio);
    var ren2celda7 = document.getElementById("prog5reng2col7"+anio);
    var ren2celda8 = document.getElementById("prog5reng2col8"+anio);
    var auxtmp=''; 

    ren1celda3.innerHTML="";
    ren1celda5.innerHTML="";
    ren1celda6.innerHTML="";
    ren1celda7.innerHTML="";
    ren1celda8.innerHTML="";
    ren2celda3.innerHTML="";
    ren2celda5.innerHTML="";
    ren2celda6.innerHTML="";
    ren2celda7.innerHTML="";
    ren2celda8.innerHTML="";

    for (var control in array){
            if(control == "totalAclareo"){
                if(!isEmpty(array[control])){
                  auxtmp+= "<b>Primer aclareo: </b>"+ validatorExisttext(array[control].result)+" Volumen maderable calculado m3vta"; 
                }              
            }else if(control == "totalMinP5"){
                if(!isEmpty(array[control])){
                  ren1celda6.innerHTML = "<b>Primera y segunda Ministración: </b><br>$"+formatNumber.new(validarVacioNumerico(array[control].result));
                  ren2celda6.innerHTML = "<b>Primera y segunda Ministración: </b><br>$"+formatNumber.new(validarVacioNumerico(array[control].result));
                }
            }else if(control == "venta"){
                if(!isEmpty(array[control])){
                    auxtmp+="<br><b>Venta de arboles de navidad:</b> "+formatNumber.new(validarVacioNumerico(array[control].result));
                }
            }else if(control == "superficieFinalredf"){
                if(!isEmpty(array[control])){
                    ren1celda3.innerHTML = "<b>Superficie final plantada: </b>"+formatNumber.new(validarVacioNumerico(array[control].result)); 
                    ren2celda3.innerHTML = "<b>Superficie final plantada: </b>"+formatNumber.new(validarVacioNumerico(array[control].result));
                }
            }else if(control == "montoP5"){
                if(!isEmpty(array[control])){
                    ren1celda5.innerHTML = "$ "+formatNumber.new(validarVacioNumerico(array[control].result));
                    ren2celda5.innerHTML = "$ "+formatNumber.new(validarVacioNumerico(array[control].result));
                }

            }else if(control == "plantacion"){
                if(!isEmpty(array[control])){
                    var auxTextextTmp="";
                      for(var y in array[control]){
                        if(y == "porcentaje_sobrevivencia"){
                          auxTextextTmp+="<br><b>Porcentaje de sobrevivencia:</b>"+validatorExisttext(array[control].porcentaje_sobrevivencia);
                        }else if(y == "tipo_reforestacion"){
                          auxTextextTmp+="<b>Tipo de reforestación:</b>"+validatorExisttext(array[control].tipo_reforestacion);
                        }
                      }
                    ren1celda7.innerHTML = auxTextextTmp;
                    ren2celda7.innerHTML = auxTextextTmp;
                }
            }
    }
     ren1celda8.innerHTML=auxtmp;
     ren2celda8.innerHTML=auxtmp;


}

function insertDataProgram6(anio,array){
    var ren1celda3 = document.getElementById("prog6reng1col3"+anio);
    var ren1celda7 = document.getElementById("prog6reng1col7"+anio);
    var ren1celda8 = document.getElementById("prog6reng1col8"+anio);

    var ren2celda3 = document.getElementById("prog6reng2col3"+anio);
    var ren2celda7 = document.getElementById("prog6reng2col7"+anio);
    var ren2celda8 = document.getElementById("prog6reng2col8"+anio);
    var auxtmp='';

    ren1celda3.innerHTML="";
    ren1celda7.innerHTML="";
    ren1celda8.innerHTML="";
    ren2celda3.innerHTML="";
    ren2celda7.innerHTML="";
    ren2celda8.innerHTML="";

     for (var control in array){
          if(control == "asistenciaVolumen"){
              if(!isEmpty(array[control])){
                    var auxTextextTmp2="";
                      for(var y in array[control]){
                        if(y == "volumen_saneado"){
                          auxTextextTmp2+="<b>Volumen saneado (m³vta):</b><br>"+formatNumber.new(validarVacioNumerico(array[control].volumen_saneado));
                        }else if(y == "asistencia_tecnica_ha"){
                          auxTextextTmp2+="<br><b>Asistencia técnica (ha):</b><br>"+formatNumber.new(validarVacioNumerico(array[control].asistencia_tecnica_ha));
                        }
                      }
                      ren2celda8.innerHTML=auxTextextTmp2;
              }

          }else if(control == "registroPredio"){
            if(!isEmpty(array[control])){
                ren1celda3.innerHTML= "<b>Numero de registros del predio: </b>"+validatorExisttext(array[control].result);
                //ren2celda3.innerHTML= "<b>Numero de registros del predio: </b>"+array[control].result;
            }

          }else if(control == "supTotalBoscosa"){
            if(!isEmpty(array[control])){
              auxtmp+="<b>Superficie total Boscosa:</b> "+formatNumber.new(array[control].result)+"<br>";
            }

          }else if(control == "fechaPlaga"){
                if(array[control].length>0){
                    var tableBuilder='';
                    tableBuilder+='<div style="width:450px; height: 200px; overflow-y: auto;">';
                    tableBuilder+='<table border="0"  class="table table-striped" width="100%">';
                    tableBuilder+='<thead><tr><th>Fecha diagnostico</th><th>Plaga enfermedad</th></tr></thead>';
                    tableBuilder+='<tbody>';
                    for(var itmp in array[control]){
                        tableBuilder+="<tr><td>"+validatorExisttext(array[control][itmp].fechaVisita)+"</td>";
                        tableBuilder+="<td>"+validatorExisttext(array[control][itmp].plaga_enfermedad)+"</td></tr>";
                    }
                    tableBuilder+='</tbody>';
                    tableBuilder+='</table>';
                    tableBuilder+='</div>';

                    ren1celda7.innerHTML=tableBuilder;
                  }

          }else if(control == "fechaplaganotvol"){
                 if(array[control].length>0){
                      var tableBuilder='';
                      tableBuilder+='<div style="width:450px; height: 200px; overflow-y: auto;">';
                      tableBuilder+='<table border="0"  class="table table-striped" width="100%">';
                      tableBuilder+='<thead><tr><th>Fecha visita</th><th>Hospedero</th><th>Num. notificación</th><th>Plaga enfermedad</th><th>Superficie Notificada</th>';
                      tableBuilder+='<th>Vigencia</th><th>Volumen Notificado</th></tr></thead>';
                      tableBuilder+='<tbody>';
                      for(var itmp in array[control]){
                          tableBuilder+="<tr><td>"+validatorExisttext( array[control][itmp].fecha_visita)+"</td>";
                          tableBuilder+="<td>"+validatorExisttext( array[control][itmp].hospedero)+"</td>";
                          tableBuilder+="<td>"+validatorExisttext( array[control][itmp].num_notificacion)+"</td>";
                          tableBuilder+="<td>"+validatorExisttext( array[control][itmp].plaga_enfermedad)+"</td>";
                          tableBuilder+="<td>"+formatNumber.new(validatorExisttext( array[control][itmp].superficie_notificada))+"</td>";
                          tableBuilder+="<td>"+validatorExisttext( array[control][itmp].vigencia)+"</td>";  
                          tableBuilder+="<td>"+formatNumber.new(validatorExisttext( array[control][itmp].volumen_notificado))+"</td></tr>"; 
                      }
                      tableBuilder+='</tbody>';
                      tableBuilder+='</table>';
                      tableBuilder+='</div>';

                      ren2celda7.innerHTML=tableBuilder;
                  }

          }else if(control == "observaciones"){
                  if(array[control].length>0){
                      auxtmp+='<div style="width:150px; height: 200px; overflow-y: auto;">';
                      auxtmp+='<table border="0"  class="table table-striped">';
                      auxtmp+='<thead><tr><th>Observaciones</th></tr></thead>';
                      auxtmp+='<tbody>';
                      for(var itmp in array[control]){
                          auxtmp+="<tr><td>"+ validatorExisttext(array[control][itmp].observaciones)+"</td></tr>";
                      }
                      auxtmp+='</tbody>';
                      auxtmp+='</table>';
                      auxtmp+='</div><br>';
                  }

          }
     }

     ren1celda8.innerHTML=auxtmp;
}

function insertDataProgram7(anio,array){
    var ren1celda3 = document.getElementById("prog71reng1col3"+anio);
    var ren1celda7 = document.getElementById("prog71reng1col7"+anio);


    var ren2celda3 = document.getElementById("prog71reng2col3"+anio);
    var ren2celda7 = document.getElementById("prog71reng2col7"+anio);
    var ren2celda8 = document.getElementById("prog71reng2col8"+anio);

    var ren3celda3 = document.getElementById("prog71reng3col3"+anio);
    var ren3celda7 = document.getElementById("prog71reng3col7"+anio);
    var ren3celda8 = document.getElementById("prog71reng3col8"+anio);

    ren1celda3.innerHTML="";
    ren1celda7.innerHTML="";
    ren2celda3.innerHTML="";
    ren2celda7.innerHTML="";
    ren2celda8.innerHTML="";
    ren3celda3.innerHTML="";
    ren3celda7.innerHTML="";
    ren3celda8.innerHTML="";


    for (var control in array){
          var auxtmp='';
          if(control == "CantidadQuema"){ 
              if(!isEmpty(array[control])){
                  ren2celda7.innerHTML = "<b>Brechas corta fuego: </b>"+validatorExisttext(array[control].cantidad_quema);
              }

          }else if(control == "actividadCantidad"){
              if(array[control].length > 0){
                  var auxTextextTmp2="";
                  auxTextextTmp2+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                  auxTextextTmp2+='<table border="0"  class="table table-striped" width="100%">';
                    auxTextextTmp2+='<thead>';
                  auxTextextTmp2+='<tr><th>Cantidad</th><th>Actividad realizada</th></tr></thead>';
                  auxTextextTmp2+='<tbody>';
                  for(var y in array[control]){
                        auxTextextTmp2+="<tr><td>"+validatorExisttext(array[control][y].cantidad)+"</td>";
                        auxTextextTmp2+="<td>"+validatorExisttext(array[control][y].actividad_realizada)+"</td></tr>";
                  }

                    auxTextextTmp2+='</tbody>';
                    auxTextextTmp2+='</table>';
                    auxTextextTmp2+='</div>';
                    ren3celda3.innerHTML=auxTextextTmp2;
              }

          }else if(control == "actividadCantidadQuema"){
              if(array[control].length > 0){
                  var table="";
                  table+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                  table+='<table border="0"  class="table table-striped" width="100%">';
                  table+='<thead>';
                  table+='<tr><th>Cantidad</th><th>Actividad realizada</th></tr></thead>';
                  table+='<tbody>';
                  for(var y in array[control]){
                        table+="<tr><td>"+validatorExisttext(array[control][y].cantidad)+"</td>";
                        table+="<td>"+validatorExisttext(array[control][y].actividad_realizada)+"</td></tr>";
                  }

                    table+='</tbody>';
                    table+='</table>';
                    table+='</div>';
                    ren2celda3.innerHTML=table;
              }
          }else if(control == "brecha"){ 
                if(!isEmpty(array[control])){
                  ren3celda7.innerHTML = "<b>Quema controlada: </b>"+validatorExisttext(array[control].cantidad_brecha);
                }

          }else if(control == "observacionesBrecha"){
              if(array[control].length>0){
                      auxtmp+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                      auxtmp+='<table border="0"  class="table table-striped">';
                      auxtmp+='<thead><tr><th>Observaciones</th></tr></thead>';
                      auxtmp+='<tbody>';
                      for(var itmp in array[control]){
                          auxtmp+="<tr><td>"+validatorExisttext(array[control][itmp].observaciones)+"</td></tr>";
                      }
                      auxtmp+='</tbody>';
                      auxtmp+='</table>';
                      auxtmp+='</div><br>';

                      ren3celda8.innerHTML=auxtmp;
                  }

          }else if(control == "observacionesQuema"){
                if(array[control].length>0){
                      auxtmp+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                      auxtmp+='<table border="0"  class="table table-striped">';
                      auxtmp+='<thead><tr><th>Observaciones</th></tr></thead>';
                      auxtmp+='<tbody>';
                      for(var itmp in array[control]){
                          auxtmp+="<tr><td>"+validatorExisttext(array[control][itmp].observaciones)+"</td></tr>";
                      }
                      auxtmp+='</tbody>';
                      auxtmp+='</table>';
                      auxtmp+='</div><br>';

                      ren2celda8.innerHTML=auxtmp;
                  }

          }else if(control == "total"){
  				if(1==1){
                      auxtmp+='<div style="width:600px; height: 200px; overflow-y: auto;">';
                      auxtmp+='<table border="0"  class="table table-striped">';
                      auxtmp+='<thead><tr><th>Numero de Incendio</th><th>Renuevo</th><th>Arbolado Adulto</th>';
                      auxtmp+='<th>Arbusto</th><th>Pasto</th><th>Duración</th><th>Observaciones</th></tr></thead>';
                      auxtmp+='<tbody>';
                      for(var itmp in array[control]){
                          auxtmp+="<tr>";
                          auxtmp+="<td>"+validatorExisttext(array[control][itmp].numincendio)+"</td>";
                          auxtmp+="<td>"+validatorExisttext(array[control][itmp].renuevo)+"</td>";
                          auxtmp+="<td>"+validatorExisttext(array[control][itmp].arbolado_adulto)+"</td>";
                          auxtmp+="<td>"+validatorExisttext(array[control][itmp].arbusto)+"</td>";
                          auxtmp+="<td>"+validatorExisttext(array[control][itmp].pasto)+"</td>";
                          auxtmp+="<td>"+validatorExisttext(array[control][itmp].duracion)+"</td>";
                          auxtmp+="<td>"+validatorExisttext(array[control][itmp].observacion)+"</td>";
                          auxtmp+="</tr>";
                          if(itmp == "total"){
                          	ren1celda3.innerHTML="<b>Total de incendios: </b> "+validatorExisttext(array[control][itmp].total);
                          }
                      }
                      auxtmp+='</tbody>';
                      auxtmp+='</table>';
                      auxtmp+='</div><br>';

                      ren1celda7.innerHTML=auxtmp;
                }

          }
    }

}

function insertDataProgram8(anio,array){
    var ren1celda3 = document.getElementById("prog8reng1col3"+anio);
    var ren1celda7 = document.getElementById("prog8reng1col7"+anio);
    var ren1celda8 = document.getElementById("prog8reng1col8"+anio);

    var ren2celda3 = document.getElementById("prog8reng2col3"+anio);
    var ren2celda7 = document.getElementById("prog8reng2col7"+anio);
    var ren2celda8 = document.getElementById("prog8reng2col8"+anio);

    var ren3celda3 = document.getElementById("prog8reng3col3"+anio);
    var ren3celda7 = document.getElementById("prog8reng3col7"+anio);
    var ren3celda8 = document.getElementById("prog8reng3col8"+anio);

    var ren4celda3 = document.getElementById("prog8reng4col3"+anio);
    var ren4celda7 = document.getElementById("prog8reng4col7"+anio);
    var ren4celda8 = document.getElementById("prog8reng4col8"+anio);

    var ren5celda3 = document.getElementById("prog8reng5col3"+anio);
    var ren5celda7 = document.getElementById("prog8reng5col7"+anio);
    var ren5celda8 = document.getElementById("prog8reng5col8"+anio);

    ren1celda3.innerHTML="";
    ren1celda7.innerHTML="";
    ren1celda8.innerHTML="";
    ren2celda3.innerHTML="";
    ren2celda7.innerHTML="";
    ren2celda8.innerHTML="";
    ren3celda3.innerHTML="";
    ren3celda7.innerHTML="";
    ren3celda8.innerHTML="";
    ren4celda3.innerHTML="";
    ren4celda7.innerHTML="";
    ren4celda8.innerHTML="";
    ren5celda3.innerHTML="";
    ren5celda7.innerHTML="";
    ren5celda8.innerHTML="";

    for (var control in array){
        var auxtmp='';
        if(control == "documentacionGeneral"){
            if(!isEmpty(array[control])){
                for(var y in array[control]){
                      if(y == "documentacionOperativos"){
                          ren5celda7.innerHTML= "<b>Tipo de documento: </b>"+validatorExisttext(array[control][y].documento);
                          ren5celda7.innerHTML+="<br><b>Numero de documento:</b>"+validatorExisttext(array[control][y].numero_documento);
                      }else if(y == "documentacionTransporte"){
                          ren2celda7.innerHTML= "<b>Tipo de documento: </b>"+validatorExisttext(array[control][y].documento);
                          ren2celda7.innerHTML+="<br><b>Numero de documento: </b>"+validatorExisttext(array[control][y].numero_documento);
                      }else if(y == "documentacionIndustria"){
                          ren3celda7.innerHTML= "<b>Tipo de documento: </b>"+validatorExisttext(array[control][y].documento);
                          ren3celda7.innerHTML+="<br><b>Numero de documento: </b>"+validatorExisttext(array[control][y].numero_documento);
                      }else if(y == "documentacionPredios"){
                          ren4celda7.innerHTML= "<b>Tipo de documento: </b>"+validatorExisttext(array[control][y].documento);
                          ren4celda7.innerHTML+="<br><b>Numero de documento: </b>"+validatorExisttext(array[control][y].numero_documento);
                      }else if(y == "documentacionPreciciales"){
                          ren1celda7.innerHTML= "<b>Tipo de documento: </b>"+validatorExisttext(array[control][y].documento);
                          ren1celda7.innerHTML+="<br><b>Numero de documento: </b>"+validatorExisttext(array[control][y].numero_documento);
                      }
                }
            }
        }else if(control == "observacionesGeneral"){
            if(!isEmpty(array[control])){
                for(var y in array[control]){
                        if(y == "ObservacionesProductosOperativos"){
                            //prog8reng2col72014.innerHTML="";
                            if(!isEmpty(array[control][y])){
                              if(!isEmpty(array[control][y].observaciones)){
                              ren5celda8.innerHTML+= "<b>Observaciones: </b>"+validatorExisttext(array[control][y].observaciones);
                            }
                              if(array[control][y].total_productos_asegurados >0){
                              ren5celda8.innerHTML+="<br><b>Resultado aseguramiento de bienes y productos: </b>"+formatNumber.new(validarVacioNumerico(array[control][y].total_productos_asegurados));
                            }
                            }
                        }else if(y == "ObservacionesProductosTransporte"){
                          ren2celda8.innerHTML="";  
                          if(!isEmpty(array[control][y])){
                            if(!isEmpty(array[control][y].observaciones)){
                             ren2celda8.innerHTML+= "<b>Observaciones: </b>"+validatorExisttext(array[control][y].observaciones);
                           }
                             if(array[control][y].total_productos_asegurados >0){
                             ren2celda8.innerHTML+="<br><b>Resultado aseguramiento de bienes y productos: </b>"+formatNumber.new(validarVacioNumerico(array[control][y].total_productos_asegurados));
                           }
                          }
                        }else if(y == "ObservacionesProductosIndustria"){
                          if(!isEmpty(array[control][y])){
                            if(!isEmpty(array[control][y].observaciones)){
                             ren3celda8.innerHTML+= "<b>Observaciones: </b>"+validatorExisttext(array[control][y].observaciones);
                           }
                             if(array[control][y].total_productos_asegurados >0){
                             ren3celda8.innerHTML+="<br><b>Resultado aseguramiento de bienes y productos: </b>"+formatNumber.new(validarVacioNumerico(array[control][y].total_productos_asegurados));
                           }
                          }
                        }else if(y == "ObservacionesProductosPredios"){
                          if(!isEmpty(array[control][y])){
                            if(!isEmpty(array[control][y].observaciones)){
                             ren4celda8.innerHTML+= "<b>Observaciones: </b>"+validatorExisttext(array[control][y].observaciones);
                           }
                             if(array[control][y].total_productos_asegurados >0){
                             ren4celda8.innerHTML+="<br><b>Resultado aseguramiento de bienes y productos: </b>"+formatNumber.new(validarVacioNumerico(array[control][y].total_productos_asegurados));
                           }
                          }
                        }else if(y == "ObservacionesProductosPericiales"){
                          if(!isEmpty(array[control][y])){
                            if(!isEmpty(array[control][y].observaciones)){
                            ren1celda8.innerHTML+= "<b>Observaciones: </b>"+validatorExisttext(array[control][y].observaciones);
                          }
                            if(array[control][y].total_productos_asegurados >0){
                            ren1celda8.innerHTML+="<br><b>Resultado aseguramiento de bienes y productos: </b>"+formatNumber.new(validarVacioNumerico(array[control][y].total_productos_asegurados));
                          }
                          }
                        }

                }
            }

        }else if(control == "particpantes"){
            if(!isEmpty(array[control])){
                for(var y in array[control]){
                      if(y == "particiapntesOperativos"){
                            if(array[control][y].length>0){
                                var tabletmp="";
                                tabletmp+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                                tabletmp+='<table border="0"  class="table table-striped">';
                                tabletmp+='<thead><tr><th>Dependencia</th><th>No. Participantes</th></tr></thead>';
                                tabletmp+='<tbody>';
                                for(var itmp in array[control][y]){
                                    tabletmp+='<tr><td>'+ validatorExisttext(array[control][y][itmp].dependencia)+'</td>';
                                    tabletmp+='<td>'+formatNumber.new(validarVacioNumerico(array[control][y][itmp].no_participantes))+'</td></tr>';
                                }
                                tabletmp+='</tbody>';
                                tabletmp+='</table>';
                                tabletmp+='</div><br>';
                                ren5celda8.innerHTML+=tabletmp;
                            }
                      }else if(y == "particiapntesTransporte"){
                              if(array[control][y].length>0){
                                var tabletem2="";
                                tabletem2+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                                tabletem2+='<table border="0"  class="table table-striped">';
                                tabletem2+='<thead><tr><th>Dependencia</th><th>No. Participantes</th></tr></thead>';
                                tabletem2+='<tbody>';
                                for(var itmp in array[control][y]){
                                    tabletem2+='<tr><td>'+validatorExisttext(array[control][y][itmp].dependencia)+'</td>';
                                    tabletem2+='<td>'+formatNumber.new(validarVacioNumerico(array[control][y][itmp].no_participantes))+'</td></tr>';
                                }
                                tabletem2+='</tbody>';
                                tabletem2+='</table>';
                                tabletem2+='</div><br>';
                                ren2celda8.innerHTML+=tabletem2;
                             }
                      }else if(y == "particiapntesIndustria"){
                            if(array[control][y].length>0){
                                var tabletmp3="";
                                tabletmp3+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                                tabletmp3+='<table border="0"  class="table table-striped">';
                                tabletmp3+='<thead><tr><th>Dependencia</th><th>No. Participantes</th></tr></thead>';
                                tabletmp3+='<tbody>';
                                for(var itmp in array[control][y]){
                                    tabletmp3+="<tr><td>"+validatorExisttext(array[control][y][itmp].dependencia)+"</td>";
                                    tabletmp3+="<td>"+formatNumber.new(validarVacioNumerico(array[control][y][itmp].no_participantes))+"</td></tr>";
                                }
                                tabletmp3+='</tbody>';
                                tabletmp3+='</table>';
                                tabletmp3+='</div><br>';

                                ren3celda8.innerHTML+=tabletmp3;
                             }
                      }else if(y == "particiapntesPredios"){
                            if(array[control][y].length>0){
                                var tabletmp4="";
                                tabletmp4.innerHTML+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                                tabletmp4.innerHTML+='<table border="0"  class="table table-striped">';
                                tabletmp4.innerHTML+='<thead><tr><th>Dependencia</th><th>No. Participantes</th></tr></thead>';
                                tabletmp4.innerHTML+='<tbody>';
                                for(var itmp in array[control][y]){
                                    tabletmp4.innerHTML+="<tr><td>"+validatorExisttext(array[control][y][itmp].dependencia)+"</td>";
                                    tabletmp4.innerHTML+="<td>"+formatNumber.new(validarVacioNumerico(array[control][y][itmp].no_participantes))+"</td></tr>";
                                }
                                tabletmp4.innerHTML+='</tbody>';
                                tabletmp4.innerHTML+='</table>';
                                tabletmp4.innerHTML+='</div><br>';

                                ren4celda8.innerHTML+=tabletmp4;
                            }

                      }else if(y == "particiapntesPericiales"){
                            if(array[control][y].length>0){
                                var tabletmp5="";
                                 tabletmp5.innerHTML+='<div style="width:210px; height: 200px; overflow-y: auto;">';
                                 tabletmp5.innerHTML+='<table border="0"  class="table table-striped">';
                                 tabletmp5.innerHTML+='<thead><tr><th>Dependencia</th><th>No. Participantes</th></tr></thead>';
                                 tabletmp5.innerHTML+='<tbody>';
                                for(var itmp in array[control][y]){
                                     tabletmp5.innerHTML+="<tr><td>"+validatorExisttext(array[control][y][itmp].dependencia)+"</td>";
                                     tabletmp5.innerHTML+="<td>"+formatNumber.new(validarVacioNumerico(array[control][y][itmp].no_participantes))+"</td></tr>"; 
                                }
                                 tabletmp5.innerHTML+='</tbody>';
                                 tabletmp5.innerHTML+='</table>';
                                 tabletmp5.innerHTML+='</div><br>';

                                ren1celda8.innerHTML+=tabletmp5;
                             }

                      }
                }
            }
        }else if(control == "personas"){
            if(!isEmpty(array[control])){
              for (y in array[control]){
                  if(y == "personasOperativos"){
                      if(array[control][y].personasOperativos > 0){
                        ren5celda8.innerHTML+="<b>Resultado personas aseguradas o infraccionadas: </b>"+ formatNumber.new(validarVacioNumerico(array[control][y].personasOperativos));  
                      }
                  }else if(y == "personasPredios"){
                      if(array[control][y].personas_aseguradas > 0){
                        ren4celda8.innerHTML+="<b>Resultado personas aseguradas o infraccionadas: </b>"+ formatNumber.new(validarVacioNumerico(array[control][y].personas_aseguradas));  
                      }
                      
                  }
              }
            }

        }else if(control == "accion"){
            if(!isEmpty(array[control])){
                  for(var y in array[control]){
                      if(y == "dictamen_pericial"){
                          ren1celda3.innerHTML= validatorExisttext(array[control].dictamen_pericial);
                      }else if(y == "inspeccion_predios"){
                           ren4celda3.innerHTML= validatorExisttext(array[control].inspeccion_predios);
                      }else if(y == "inspeccion_industria"){
                          ren3celda3.innerHTML= validatorExisttext(array[control].inspeccion_industria);
                      }else if(y == "filtro_transporte"){
                         ren2celda3.innerHTML= validatorExisttext(array[control].filtro_transporte);
                      }else if(y == "operativos_coordinados"){
                          ren5celda3.innerHTML= validatorExisttext(array[control].operativos_coordinados);
                      }
                  }

                 
                
            }
        }

    }
}


function insertDataProgram10(anio,array){
    var ren1celda3 = document.getElementById("prog10reng1col3"+anio);
    var ren1celda5 = document.getElementById("prog10reng1col5"+anio);
    var ren1celda6 = document.getElementById("prog10reng1col6"+anio);
    var ren1celda7 = document.getElementById("prog10reng1col7"+anio);
    var ren1celda8 = document.getElementById("prog10reng1col8"+anio);

      ren1celda3.innerHTML="";
      ren1celda5.innerHTML="";
      ren1celda6.innerHTML="";
      ren1celda7.innerHTML="";
      ren1celda8.innerHTML="";

    for (var control in array){
          if(control == "superficieAprobada"){
              if(!isEmpty(array[control])){
                ren1celda3.innerHTML="<b>Superficie aprobada: </b>"+formatNumber.new(validarVacioNumerico(array[control].superficie_aprobada));
              }
          }else if(control == "montoAprobado"){
               if(!isEmpty(array[control])){
                ren1celda5.innerHTML= "$ "+formatNumber.new(validarVacioNumerico(array[control].monto_aprobado));
              }
          }else if(control == "totalMinistracion"){
            if(!isEmpty(array[control])){
                ren1celda6.innerHTML= "$ "+formatNumber.new(validarVacioNumerico(array[control].total_ministracion));
              }
          }else if(control == "datosGenerales"){
                  if(array[control].length>0){
                      var table='';
                      table+='<div style="width:450px; height: 200px; overflow-y: auto;">';
                      table+='<table border="0"  class="table table-striped">';
                      table+='<thead><tr><th>Tipo actividad</th><th>Meta comprometida</th><th>Unidad medida</th><th>Num. jornales</th></tr></thead>';
                      table+='<tbody>';
                      for(var itmp in array[control]){
                          table+="<tr><td>"+validatorExisttext(array[control][itmp].tipo_actividad)+"</td>"; 
                          table+="<td>"+validatorExisttext(array[control][itmp].meta_comprometida)+"</td>";
                          table+="<td>"+validatorExisttext(array[control][itmp].unidad_medida)+"</td>"; 
                          table+="<td>"+validatorExisttext(array[control][itmp].numero_jornales)+"</td></tr>"; 
      
                      }
                      table+='</tbody>';
                      table+='</table>';
                      table+='</div>';
                      ren1celda7.innerHTML=table;
                  }

          }else if(control == "observaciones"){
                 if(array[control].length>0){
                      var table='';
                      table+='<div style="width:150px; height: 200px; overflow-y: auto;">';
                      table+='<table border="0"  class="table table-striped">';
                      table+='<thead><tr><th>Observaciones</th></tr></thead>';
                      table+='<tbody>';
                      for(var itmp in array[control]){
                          table+="<tr><td>"+validatorExisttext(array[control][itmp].observaciones)+"</td></tr>";
                      }
                      table+='</tbody>';
                      table+='</table>';
                      table+='</div>';
                      ren1celda8.innerHTML=table;
                  }
          }
    }
}


function insertDataProgram11(anio,array){
    var ren1celda3 = document.getElementById("prog11reng1col3"+anio);
    var ren1celda5 = document.getElementById("prog11reng1col5"+anio);
    var ren1celda6 = document.getElementById("prog11reng1col6"+anio);
    var ren1celda7 = document.getElementById("prog11reng1col7"+anio);
    var ren1celda8 = document.getElementById("prog11reng1col8"+anio);

    ren1celda3.innerHTML="";
    ren1celda5.innerHTML="";
    ren1celda6.innerHTML="";
    ren1celda7.innerHTML="";
    ren1celda8.innerHTML="";

    for (var control in array){
        if(control == "activo"){

            if(array[control].length>0){
                   var table='';
                      table+='<div style="width:150px; height: 200px; overflow-y: auto;">';
                      table+='<table border="0"  class="table table-striped">';
                      table+='<thead><tr><th>Activo</th></tr></thead>';
                      table+='<tbody>';
                      for(var itmp in array[control]){
                          table+="<tr><td>"+validatorExisttext(array[control][itmp].activo)+"</td></tr>";
                      }
                      table+='</tbody>';
                      table+='</table>';
                      table+='</div>';
                      ren1celda8.innerHTML=table;
            }

        }else if(control == "aportaciones"){
          if(!isEmpty(array[control])){
            for (var x in array[control]){
                if(x == "aportacion_gubernamental"){
                  ren1celda6.innerHTML+="<b>Aportación gubernamental: </b>$"+formatNumber.new(validarVacioNumerico(array[control].aportacion_gubernamental));
                }else if(x == "aportacion_productor"){
                  ren1celda6.innerHTML+="<br><br><b>Aportación productor: </b>$"+formatNumber.new(validarVacioNumerico(array[control].aportacion_productor));
                }else if(x == "empleos_generados"){
                  ren1celda7.innerHTML="<b>Empleos generados: </b>"+formatNumber.new(validarVacioNumerico(array[control].empleos_generados));
                }
            }
          }

        }else if(control == "costoApoyo"){
            if(array[control].length>0){
                   var table='';
                      table+='<div style="width:110px; height: 200px; overflow-y: auto;">';
                      table+='<table border="0"  class="table table-striped">';
                      table+='<thead><tr><th>Costo total</tr></thead>';
                      table+='<tbody>';
                      for(var itmp in array[control]){
                          table+="<tr><td>"+"$"+formatNumber.new(validarVacioNumerico(array[control][itmp].costo_total))+"</td></tr>";
                          //table+="<td>"+array[control][itmp].tipo_apoyo+"</td></tr>";
                      }
                      table+='</tbody>';
                      table+='</table>';
                      table+='</div>';
                      ren1celda5.innerHTML=table;
              }

        }else if(control == "tipoApoyo"){
              if(array[control].length>0){
                   var table='';
                      table+='<div style="width:110px; height: 200px; overflow-y: auto;">';
                      table+='<table border="0"  class="table table-striped">';
                      table+='<thead><tr><th>Tipo apoyo</th></tr></thead>';
                      table+='<tbody>';
                      for(var itmp in array[control]){
                          table+="<tr><td>"+validatorExisttext(array[control][itmp].tipo_apoyo)+"</td></tr>";
                      }
                      table+='</tbody>';
                      table+='</table>';
                      table+='</div>';
                      ren1celda3.innerHTML=table;
              }
        }
    }
}



function insertDataProgram12 (anio,array){

  var ren1celda3 = document.getElementById("prog12reng1col3"+anio);
  var ren1celda7 = document.getElementById("prog12reng1col7"+anio);
  var ren1celda8 = document.getElementById("prog12reng1col8"+anio);

    ren1celda3.innerHTML="";
    ren1celda7.innerHTML="";
    ren1celda8.innerHTML="";
 
   for (var control in array){
        if(control == "conglomerado1"){
            if(array[control].length>0){
                   var table='';
                      table+='<div style="width:450px; height: 200px; overflow-y: auto;">';
                      table+='<table border="0"  class="table table-striped">';
                      table+='<thead align="center"><tr><th>Conglomerado</th><th>Sitio</th><th>Genero</th><th>Existencias reales m³vta/ha</th><th>IMA m³vta</th></tr></thead>';
                      table+='<tbody>';
                      for(var itmp in array[control]){
                          table+="<tr><td align='center'>"+validatorExisttext(array[control][itmp].conglomerado)+"</td>";
                          table+="<td align='center'>"+validatorExisttext(array[control][itmp].sitio)+"</td>";
                          table+="<td>"+validatorExisttext(array[control][itmp].especie)+"</td>";
                          table+="<td align='center'>"+formatNumber.new(validarVacioNumerico(array[control][itmp].volumen))+"</td>";
                          table+="<td align='center'>"+formatNumber.new(validarVacioNumerico(array[control][itmp].ima))+"</td>";
                          table+="</tr>";
                      }
                      table+='</tbody>';
                      table+='</table>';
                      table+='</div>';
                      ren1celda7.innerHTML=table;
            }

        }else if(control == "incendio"){
          for(var x in array[control]){
            if(x=="presencia_incendio")
            {
              ren1celda8.innerHTML="<b>Presencia de incendio: </b>"+array[control].presencia_incendio;
            }
          }

        }
    }


}


var formatNumber = {
   separador: ",", // separador para los miles
   sepDecimal: '.', // separador para los decimales
   formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft  +splitRight;
   },
   new:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
   }
}













