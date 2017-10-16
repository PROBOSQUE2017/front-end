function setTitle(params){
	var divTitulo = document.getElementById('NameReporte');
	divTitulo.innerHTML = '';
	divTitulo.innerHTML = 'Reporte: '+params;
}



$( "#listReport" ).change(function() {
        var valor = $("select#listReport").val();
        var id = $(this).children(":selected").attr("id");
        if(valor == "Seleccione")
        {
        	valor ="";
        }
     
        setTitle(valor);
        sendJsonReporte(id,valor);

});

$("#esci").on("click",function(){
location.href = 'http://localhost:800/SIFEM/';
});


function sendJsonReporte(idReport,StringName) 
{ 
	var JsonQueryRpeort = {
                  'datos': [],
    };
    parametros= JsonQueryRpeort.datos.push({id:idReport,nombre:StringName,user:getUsryProgram('UR')/5,activity: getUsryProgram('UPR')});

    $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/ServiceBosque/Reporteador',
            data: {action:'getReporte',params:parametros},
            dataType: 'json',
            beforeSend: function (data) {
            },
            success: function(resp){
                var datosTablaReport = new Array();
                var datosTablaReportHeader = new Array();
           
                $("#tableData").remove();
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
              
                // construye la tabla
               
                builderTable2(datosTablaReport,datosTablaReportHeader);
               
              },
              error: function(errMsg) {
              }

            });	

}


var getUsryProgram=function(params)
    {
  params = params.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");  
  var regex = new RegExp("[\\?&]"+params+"=([^&#]*)"),
  results= regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g," "));
  }



$( document ).ready(function() {
//   init();

   var usr = getUsryProgram('UR')/5;
   var activity = getUsryProgram('UPR');

   
});






























































































