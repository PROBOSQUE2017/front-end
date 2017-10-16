
function getMunucipios(IdRegion,combo,urlSer) {	
	$.ajax({
        type: 'POST',
        url: urlSer,
        data: {action:'getMunicipio',region:IdRegion},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){
        	var option = '<option value="-2ws" selected>Seleccione</option>';

        	for(x in resp.data){
        		option+='<option value="'+resp.data[x].value+'">'+resp.data[x].label+'</option>';
        	}

        	combo.innerHTML=option;

        },
        error: function(errMsg) {         
        }

    }); 
}


function getLocalidades(IdMunicipio,combo,urlSer) {	
	$.ajax({
        type: 'POST',
        url: urlSer,
        data: {action:'getLocalidad',localidad:IdMunicipio},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){

        	var option = '<option value="-2ws" selected>Seleccione</option>';

        	for(x in resp.data){
        		option+='<option value="'+resp.data[x].value+'">'+resp.data[x].label+'</option>';
        	}

        	combo.innerHTML=option;

        },
        error: function(errMsg) {         
        }

    }); 
}

function getPredio(clavePredio,texto,urlSer) {
	$.ajax({
        type: 'POST',
        url: urlSer,
        data: {action:'getPredio',clave:clavePredio,text:texto},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){
	        var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
            var cabecera = document.getElementById("headInfo");
            cabecera.innerHTML= 'Descripción';
	        table.innerHTML='';

	        if(resp.data.length > 0)
	        {
	           var i=0;
	           for( var x in resp.data){
	                i+=1;
	                var row = table.insertRow(-1);
                    row.setAttribute("width","100%");
                    row.setAttribute("id",resp.data[x].value);
                    row.setAttribute("onclick","selectIdPredio(this)");
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
      
                    cell1.setAttribute("width","16%")
                    cell2.setAttribute("width","72%");
                    cell3.setAttribute("width","1%");
                    cell4.setAttribute("width","1%");
                    cell5.setAttribute("width","1%");


	                cell1.innerHTML=resp.data[x].value;
	                cell2.innerHTML=resp.data[x].label;
	            }
	        }else{
	        	    var row = table.insertRow(-1);
	                var cell1 = row.insertCell(-1);
                    var cell2 = row.insertCell(-1);
                    var cell3 = row.insertCell(-1);
                    var cell4 = row.insertCell(-1);
                    var cell5 = row.insertCell(-1);
	                cell1.setAttribute("width","100%");
                
	                cell1.innerHTML='No se encontraron predios.';
	        }

        },
        error: function(errMsg) {         
        }

    }); 
   
}


function getRepresentantes(clavePredio,texto,urlSer) {    
    $.ajax({
        type: 'POST',
        url: urlSer,
        data: {action:'getRepresentantes',clave:clavePredio,text:texto},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){
            console.log(resp);
            var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
            var cabecera = document.getElementById("headInfo");
            cabecera.innerHTML= 'Nombre del representante';
            table.innerHTML='';

            if(resp.data.length > 0)
            {
               var i=0;
               for( var x in resp.data){
                    i+=1;
                    var row = table.insertRow(-1);
                    row.setAttribute("width","100%");
                    row.setAttribute("id",resp.data[x].value);
                    row.setAttribute("onclick","selectIdPredio(this)");
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
      
                    cell1.setAttribute("width","16%")
                    cell2.setAttribute("width","72%");
                    cell3.setAttribute("width","1%");
                    cell4.setAttribute("width","1%");
                    cell5.setAttribute("width","1%");

                    cell1.innerHTML=resp.data[x].value;
                    cell2.innerHTML=resp.data[x].label;
                }
            }else{
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(-1);
                    var cell2 = row.insertCell(-1);
                    var cell3 = row.insertCell(-1);
                    var cell4 = row.insertCell(-1);
                    var cell5 = row.insertCell(-1);
                    cell1.setAttribute("width","100%");
                
                    cell1.innerHTML='No se encontraron representantes de predios.';
            }

        },
        error: function(errMsg) {         
        }

    }); 
   
}

function getDetallePredio(urlSer,clve) { 
    $.ajax({
        type: 'POST',
        url: urlSer,
        data: {action:'getDetallePredio',clave:clve},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){
            console.log(resp.data);
            insertDataBasicSelected(resp.data);
        },
        error: function(errMsg) {         
        }

    }); 
}



function getReporte(urlSer,clavePredio,anioSelected,programasSeleccionados) { 

    $.ajax({
        type: 'POST',
        url: urlSer,
        data: {action:'getReporte',clave:clavePredio,anio:anioSelected,programas:  JSON.stringify(programasSeleccionados)},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){
            console.log(resp);
            for(var x in resp.data){
                if(x == "p1"){
                    insertDataProgram1(anioSelected,resp.data[x]);  
                }else if(x == "p2"){
                	insertDataProgram2(anioSelected,resp.data[x]);
                }else if(x == "p3"){
                	insertDataProgram3(anioSelected,resp.data[x]);
                }else if(x == "p5"){              
                	insertDataProgram5(anioSelected,resp.data[x]);
                }else if(x == "p6"){
                	insertDataProgram6(anioSelected,resp.data[x]);
                }else if(x == "p7"){
                	insertDataProgram7(anioSelected,resp.data[x]);
                }else if(x == "p8"){
                	insertDataProgram8(anioSelected,resp.data[x]);
                }else if(x == "p10"){
                	insertDataProgram10(anioSelected,resp.data[x]);
                }else if(x == "p11"){
                	insertDataProgram11(anioSelected,resp.data[x]);
                }else if(x == "p12"){
                    insertDataProgram12(anioSelected,resp.data[x]);
                }
            }


        },
        error: function(errMsg) {         
        }

    }); 
}





