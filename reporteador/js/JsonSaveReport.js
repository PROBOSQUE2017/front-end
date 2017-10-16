function sendJsonSaveReport(parametro,name){
	var campos_select = $( "#select" ).sortable( "toArray");
		var objetoJSON = {
                  'campos': [],
    };
		var i, n;
		for (i = 0, n = campos_select.length; i < n; i++) 
        { 
           var nameCampos = $("#"+campos_select[i]).attr('name');
           var tipo = $("#"+campos_select[i]).attr('type');
           var list = $("#"+campos_select[i]).attr('list');
           var datatype = $("#"+campos_select[i]).attr('datatype');
           var labelx = document.getElementById($("#"+campos_select[i]).attr('id')).innerHTML;
        	 objetoJSON.campos.push({name:nameCampos,label:labelx,type:tipo,list:list,datatype:datatype});  
        }

        parametros =  JSON.stringify(objetoJSON); 


	     $.ajax({
              type: 'POST',
              url: 'http://187.188.96.133:8080/ServiceBosque/Reporteador',
              data: {action:'saveReport',user:getUsryProgram('UR')/5,activity: getUsryProgram('UPR'),noReporte:idReporte,campos:parametros,tipo:parametro,nameReport:name},
              dataType: 'json',
              beforeSend: function (data) {
              },
              success: function(resp){  

              },
              error: function(errMsg) {
               
              }

      }); 

    

}
