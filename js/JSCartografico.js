var url = "http://localhost:8080";
var datas = amplify.store('dataLoggingProbosque');
var bandera=0;
//window.onload=function() {
$( document ).ready(function() {
//setInterval(function(){

 //if($("#modalDetalle").is(":visible"))
   // {
   
        
   // }

//},100);
});
//};

/*$( document ).ready(function() {
//alert(JSON.stringify(data));
//alert(data.roleId);
//TblCartografico("get", data.roleId, "a");
});*/

/*function TblCartografico(action, user, folio){
    var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio;
   
    $.ajax({
        url: url+"/ServiceBosque/TblCartografico",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            console.log("folll "+ folio);
            $.each(data, function(index, data){
                //alert(index);
                //alert(JSON.stringify(data));
                if(index == "data"){
                    if(jQuery.isEmptyObject(data)){
                        //alert("Porcentaje no encontrado");
                    }else{
                        //alert("trae datos");
                        var tabla = $('#tblCarto');
                        tabla.find('tbody').remove();
                        //tabla.append('<thead><tr><th>Campo</th><th>Valores</th></tr></thead>');
                        $.each(data, function(index, data){
                            for (var i in data) {
                                var s = 0, iLength = i.length;
                                var campo=i;
 
                                for(var s; s < iLength; s++) {
                                    campo=campo.replace("_", " ");
                                }
                                tabla.append('<tbody><tr><th>'+campo+'</th><td>'+data[i]+'</td></tr></tbody>'); 
                            }
                            //tabla.append('<tbody><tr><th> Sig. Rodal </th></tr></tbody>');
                            tabla.find('#btn_detalle').remove();
                            tabla.find('#btn_volver').remove();
                            tabla.append('<div id="btn_detalle"> <a href="#" class="button medium radius"><span class="icon-code"></span>Detalle</a></div>');
                        });
                    }
                }
            });
                $(document).ready(function () {
                    $('#btn_detalle').on('click',function() { 
                    //console.log("folio"+folio);
                    TblCartoDetalle("obten", user, folio);

                });
            });
        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}*/

function TblCartoDetalle(action, user, folio){
    var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio;
    //alert(dataf);
    $.ajax({
        url: url+"/ServiceBosque/TblCartoDetalle",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {

            //var tabla = $('#tblCarto');
            //tabla.find('tbody').remove();

            $.each(data, function(index, data){
                if(index == "data"){
                    if(jQuery.isEmptyObject(data)){
                    }else{
                        //alert("trae datos");
                        var tabla = $('#tblCarto');
                        tabla.find('tbody').remove();
                        tabla.find('#btn_modal').remove();
                        $.each(data, function(index, data){

                            for (var i in data) {
                                var s = 0, iLength = i.length;
                                var campo=i; 
                                for(var s; s < iLength; s++) {                                 
                                    campo=campo.replace("_", " ");
                                    //console.log(campo);
                                }
                                if (campo=='Estado'){
                                    tabla.append('<tbody><tr><th>'+campo+'</th><td>Estado de México</td></tr></tbody>');
                                }else{
                                tabla.append('<tbody><tr><th>'+campo+'</th><td>'+data[i]+'</td></tr></tbody>'); 
                                }
                            }
                            tabla.append('<button id="btn_modal" class="btn btn-success" id="" data-toggle="modal" data-target="#modalDetalle">'+
                                            '<a class="btnModal">Detalle</a></button>');
                        });
                    }
                }
            });

             $('#btn_modal').on('click',function() { 
                    var consulta="label";
                    var t_modal = $('#modalDetalle');
                        t_modal.find('h4').empty();
                    TblMultiregistro("get", user, folio, "multi", consulta); 

              });

        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function TblMultiregistro(action, user, folio, multi, consul){
    console.log("entro al multi");
    var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio + '&multi=' + multi + '&consul=' + consul;
    $.ajax({
        url: url+"/ServiceBosque/TblMultiregistro",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            var n=0;
            var t_modal = $('#modalDetalle');
            t_modal.find('h4').append('<h4 class="modal-title" id="gridModalLabel">Información multiregistros para el folio "'+folio+'"</h4>'); 

            if (JSON.stringify(data.data.length)==0){
                console.log(JSON.stringify(data.data.length));
                t_modal.find('h4').empty();
                t_modal.find('h4').append('<h4 class="modal-title" id="gridModalLabel">No Hay Información de Multiregistros para este Programa</h4>'); 
                //$('.btnModal').click(false);
              }


            $.each(data, function(index, data){

                if(index == "data"){
                    if(jQuery.isEmptyObject(data)){
                    }else{
                        var modalDetalle= document.getElementById('mod_body');
                        modalDetalle.innerHTML='';
                        var lista = '<ul  class="nav nav-tabs">';

                        if (datas.program==3){
                            lista+='<li><a id="especies" class="xx" href="#especies">Especies</a></li>'+
                                    '<li><a id="solicitantes" class="xx" href="#solicitantes">Solicitantes</a></li>'+
                                    '<li><a id="predios" class="xx" href="#predios">Predios</a></li>'+
                                    '<li><a id="cheque" class="xx" href="#cheque">Número de cheque</a></li>';
                      }else{
                        $.each(data, function(index, data){
                            n=n+1;
                            for (var i in data) {
                                var s = 0, iLength = i.length;
                                var campo=i; 
                                for(var s; s < iLength; s++) {                                 
                                    campo=campo.replace("_", " ");
                                }
                                var names=data.Nombre;
                            
                                names=names.substring(12);
                                if (campo=='Label'){
                                lista+='<li><a id="'+names+'" class="xx" href="#'+names+'">'+data.Label+'</a></li>';
                                //console.log(names+" :"+data.Label);
                                }
                            }
                        });
                    }
                        lista+='</ul><div class="clr"></div>';
                        
                        var tablam = '<section id="mod_block" class="block">';
                        var m=0;
                        $.each(data, function(index, data){
                            m=m+1;
                            for (var i in data) {
                                var s = 0, iLength = i.length;
                                var campo=i; 
                                for(var s; s < iLength; s++) {                                 
                                    campo=campo.replace("_", " ");
                                }

                            }
                        });
                        tablam+='</section>';
                        lista+=tablam;
                        modalDetalle.innerHTML=lista;
                    }
                }
            });

     $(".xx").on('click',function(){
           
                 TblMultiDetalle("get", user, folio, this.id, " ");
                 
         });  


$(function(){
  $('ul.nav nav-tabs li:first').addClass('active');
  $('.block article').hide();
  $('.block article:first').show();
  $('ul.nav nav-tabs li').on('click',function(){
        console.log("click");
        TblMultiDetalle("get", user, folio, "multi", "consul");
    $('ul.nav nav-tabs li').removeClass('active');
    $(this).addClass('active')
    $('.block article').hide();
    var activeTab = 
    $(this).find('a').attr('href');
        $(activeTab).show();



        return false;
  });
})
            
        },
        error: function (requeset, status, error) {
            //alert("Servicio no disponible intente más tarde");
        }
    });
}


function TblMultiDetalle(action, user, folio, multi, consul){
    console.log("entre a TblMultiDetalle"); 
    var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio + '&multi=' + multi + '&consul=' + consul;
    $.ajax({
        url: url+"/ServiceBosque/TblMultiregistro",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            bandera=0;
            //modal_table=$('#detallesRegistro');
            //modal_table.find('table').remove();// console.log(t_modal);

            var datosTbody = new Array();
            var header = new Array();
            for(var x in data.data){
                
                 for(var y in data.data[x]){
                   // console.log(data.data[x]);
                    if(y == "Info"){
                       var clone = data.data[x][y].splice(0);
                    }else if(y == "Label"){
                      var nombreColumna = data.data[x][y];
                    }

                 }


               Create2DArray(datosTbody,x,clone);
               Create2DArrayHeader(header,x,nombreColumna);

            }

           builderTable(datosTbody,header);
           
            
        },
        error: function (requeset, status, error) { bandera=0;
            alert("Servicio no disponible intente más tarde");
        }
    });
}

 function Create2DArray(ArrayPrincipal, columns,rows) {
      ArrayPrincipal[columns] = new Array();
       for (var i = 0; i < rows.length; i++) {           
         ArrayPrincipal[columns][i] =  rows[i];       
       }      
       return ArrayPrincipal;
}

function Create2DArrayHeader(array,columna,NombreColuman){
      array[columna] = new Array(); 
      array[columna][0]= NombreColuman;
      return array;
}

 function builderTable(arrayData,arrayHeader){
      var contenedor = document.getElementById("detallesRegistro");
      contenedor.innerHTML='';
      var newTable = document.createElement("table");
      var cabecera = newTable.createTHead();
      var rowtitle = cabecera.insertRow(0);
      var cuerpoTabla = newTable.createTBody();
      cuerpoTabla.setAttribute("class","scrollYtable");
      rowtitle.setAttribute("class","cabecera");
      newTable.setAttribute("id","tableData");
      newTable.setAttribute("border","1");
      newTable.setAttribute("class","table table-striped");    
     
      var totalObjetos = arrayData.length;
      var tamañoSubarreglo = arrayData[0].length;
      var contadorSub = 0;
      var i=0;

      for(k=0;k<arrayHeader.length;k++){
        var cel = rowtitle.insertCell(-1);
        cel.innerHTML=arrayHeader[k][0];
      }

 
      while(i<totalObjetos){
        if(i==0){
          var fila = cuerpoTabla.insertRow();
          if(contadorSub%2==0){
            fila.setAttribute("class","par");
          }else{
            fila.setAttribute("class","non");
          }
        }        
        var Col = fila.insertCell(-1);
        Col.innerHTML= arrayData[i][contadorSub];
        i++;
        if(i==totalObjetos){
              i = 0;
              contadorSub+=1;
        }

        if(contadorSub == tamañoSubarreglo ){
            break;
        }
      }
      contenedor.appendChild(newTable);     
}