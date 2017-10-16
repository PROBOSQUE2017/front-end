var usuarioId;
var actividadId;
function sendJSONQueryReport(){
	$.ajax({
        type: 'POST',
        url: 'http://187.188.96.133:8080/ServiceBosque/Reporteador',
        data: {action:'getTitulosReportes',user:usuarioId,activity: actividadId},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(json){

            var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
            var i=0;
                                                           
            for( var x in json.data){
        				i+=1;
        				var boton = document.createElement('button');
        				var t = document.createTextNode("Eliminar");
        				boton.appendChild(t);

        				var botonv = document.createElement('button');
        				var text = document.createTextNode("Ver");
        				botonv.appendChild(text);

        				boton.setAttribute("class","btn btn-success btn-xs");
        				boton.setAttribute("onclick","deleteReportGral(this)");
        				boton.setAttribute("id",json.data[x].identificador);

        				botonv.setAttribute("class","btn btn-default btn-xs");
        				botonv.setAttribute("onclick","viewReportGral(this)");
        				botonv.setAttribute("id",json.data[x].identificador);
        				botonv.setAttribute("name",json.data[x].titulo);

        				var row = table.insertRow(-1);
        				row.setAttribute("id","r"+json.data[x].identificador);
        				


        				var cell1 = row.insertCell(0);
        				var cell2 = row.insertCell(1);
        				var cell3 = row.insertCell(2);
        				var cell4 = row.insertCell(3);

        				cell1.setAttribute("width","1%");
        				cell2.setAttribute("width","79%");
        				cell3.setAttribute("width","10%");
        				cell4.setAttribute("width","10%"); 

        				cell1.innerHTML =json.data[x].identificador;
        				cell2.innerHTML=json.data[x].titulo;
        				cell3.appendChild(botonv);
        				cell4.appendChild(boton);

        			}
        },
        error: function(errMsg) {
         }  

      }); 
    
}


function viewReportGral(params){
	var idReporte = $(params).attr("id");
	var name = $(params).attr("name");
	insertName(name,idReporte);
	$.ajax({
        type: 'POST',
        url: 'http://187.188.96.133:8080/ServiceBosque/Reporteador',
        data: {action:'getReporteByID',noReporte:idReporte,user:usuarioId,activity: actividadId},
        dataType: 'json',
        beforeSend: function (data) {
           var contenedor = document.getElementById("spaceTable2");
          contenedor.innerHTML='';
        },
        success: function(resp){
        	var datosTablaReport = new Array();
                var datosTablaReportHeader = new Array();
              
                $("#tableData3").remove();
                for(var x in resp.data) {
                  
                   for(var y in resp.data[x]){                                 
                          if(y === "Info")
                          {
                              var  clone = resp.data[x][y].slice(0); 

                          }else if(y === "datatype"){
                               var typoColumna = resp.data[x][y];
                          }else if(y === "label"){
                                 var NameColumna = resp.data[x][y];
                          }
                          var agrup="d";
                     
                   }

                   Create2DArray(datosTablaReport, x,clone);
                   Create2DArrayHeader(datosTablaReportHeader,x,NameColumna,typoColumna,agrup);
                }
              
                builderTable2(datosTablaReport,datosTablaReportHeader,3);
        },
        error: function(errMsg) {
         }

      }); 
}

function deleteReportGral(params){	
	var idReporte = $(params).attr("id");
	$.ajax({
        type: 'POST',
        url: 'http://187.188.96.133:8080/ServiceBosque/Reporteador',
        data: {action:'getBorrarReporte',noReporte:idReporte,user:usuarioId,activity: actividadId},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){
        	$("#r"+idReporte).remove();
        },
        error: function(errMsg) {
         }

      }); 
}


function insertName(texto,number){

  var titulo = document.getElementById("NameReporte");
  titulo.innerHTML = 'No del reporte: '+number+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nombre: '+texto;


}
