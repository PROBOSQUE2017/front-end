var connection={
				url:'http://localhost:8080/ServiceBosque/Reporteador',
				type:'post',
				dataType:'json'

};

var events= function()
		{






	}


var requestFields= function(usr,activity)
	{
		obj=this;
	 var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                              var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
                              var i=0;
                                                                                 
                              for( var x in json.data){
                              i+=1;

                              var botonv = document.createElement('button');
                              var text = document.createTextNode("Ver");
                              botonv.appendChild(text);


                              botonv.setAttribute("class","btn btn-default btn-xs btn-lg btn-block");
                              botonv.setAttribute("onclick","sendJsonQueryReport(this)");
                              botonv.setAttribute("id",json.data[x].identificador);
                              botonv.setAttribute("name",json.data[x].titulo);

                              var row = table.insertRow(-1);
                              row.setAttribute("id","r"+json.data[x].identificador);
                              


                              var cell1 = row.insertCell(0);
                              var cell2 = row.insertCell(1);
                              var cell3 = row.insertCell(2);
                            

                              cell1.setAttribute("width","1%");
                              cell2.setAttribute("width","85%");
                              cell3.setAttribute("width","14%");
                             
                              cell1.innerHTML =json.data[x].identificador;
                              cell2.innerHTML=json.data[x].titulo;
                              cell3.appendChild(botonv);
                                  
                           
                              }
                            },
                              beforeSend: function(xhr) {
                              
                                 
                              },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                           };
          r = $.extend(r,connection);
          r.data = {action:'getTitulosReporte', user:usr, activity:activity};
          $.ajax(r);		



	}



var buildStructure= function(usr,activity)
   {

     this.requestFields(usr,activity);




   }


var getUsryProgram=function(params)
		{
	params = params.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");	
	var regex = new RegExp("[\\?&]"+params+"=([^&#]*)"),
	results= regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g," "));
	}


$( document ).ready(function() {
   var usr = getUsryProgram('UR')/5;
   var activity = getUsryProgram('UPR');
   buildStructure(usr,activity);
   
});


function sendJsonQueryReport(params){
  var idReporte= $(params).attr('id');
  var texto = $(params).attr('name');
  insertName(texto,idReporte);
  $.ajax({
              type: 'POST',
              url: 'http://localhost:8080/ServiceBosque/Reporteador',
              data: {action:'getReporteByID',user:getUsryProgram('UR')/5,activity: getUsryProgram('UPR'),noReporte:idReporte},
              dataType: 'json',
              beforeSend: function (data) {
                var contenedor = document.getElementById("spaceTable2");
                 contenedor.innerHTML='';
              },
              success: function(resp){  
                var datosTablaReport = new Array();
                var datosTablaReportHeader = new Array();
              
                $("#tableData2").remove();
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
              
                builderTable2(datosTablaReport,datosTablaReportHeader,2);
              },
              error: function(errMsg) {
               
              }

      }); 

}

function insertName(texto,number){
  var titulo = document.getElementById("NameReporte");
  titulo.innerHTML = 'No  de reporte: '+number+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nombre: '+texto;
}



$( document ).ajaxStart(function() {
       $.blockUI({ 
        message: '<h4>Por favor espere...</h4>',
        css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff' 
        } }); 
 
        //setTimeout($.unblockUI, 500); 
});



$( document ).ajaxStop(function() {
    $.unblockUI();
});

$(".option_logout").click(function(){
        CerrarSession();
});

function CerrarSession(){
    amplify.store('dataLoggingProbosque',null);
    window.location.assign("/SIFEM/index.html");
}






