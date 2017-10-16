
    function builderTable1(arrayData)
    {
     
      if(arrayData.length > 0)
      {

          $("#spaceTable").empty();
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var cabecera = newTable.createTHead();
          var rowtitle = cabecera.insertRow(0); 
          var cuerpoTabla = newTable.createTBody();
          newTable.setAttribute("id","tableData");
          newTable.setAttribute("class","display");
          newTable.setAttribute("cellspacing",0);
          newTable.setAttribute("width","100%");

	  rowtitle.insertCell(-1).innerHTML = "ID INSCRIPCION";
	  rowtitle.insertCell(-1).innerHTML = "ACTA";
	  rowtitle.insertCell(-1).innerHTML = "ORDEN";
	  rowtitle.insertCell(-1).innerHTML = "EXPEDIENTE";
          rowtitle.insertCell(-1).innerHTML = "FECHA INSPECCION";
	  rowtitle.insertCell(-1).innerHTML = "ID INSPECCIONADO";
	  rowtitle.insertCell(-1).innerHTML = "INSPECCIONADO";
	  rowtitle.insertCell(-1).innerHTML = "RNF";
	  rowtitle.insertCell(-1).innerHTML = "MEDIDA SEG";
	  rowtitle.insertCell(-1).innerHTML = "MEDIDA SEG";
          rowtitle.insertCell(-1).innerHTML = "RESOLUCION";
	  rowtitle.insertCell(-1).innerHTML = "RESOLUCION";
	  rowtitle.insertCell(-1).innerHTML = "SANCION";
	  rowtitle.insertCell(-1).innerHTML = "SANCION";
	  rowtitle.insertCell(-1).innerHTML = "ESTADO";
	  rowtitle.insertCell(-1).innerHTML = "TIPO";
	  rowtitle.insertCell(-1).innerHTML = "IRREGULARIDADES";
	  rowtitle.insertCell(-1).innerHTML = "PUBLICO";


          
         
          for (var aux in arrayData){
	    var fila = cuerpoTabla.insertRow();
	    var controlTmp=0;
		for(var tmp in arrayData[aux]){
			controlTmp++;
			if(tmp == "acta"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "estado"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "expediente"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "fecha_inspeccion"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "id_inspeccion"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "id_inspeccionado"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "inspeccionado"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "medida_seguridad"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "orden"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "publico"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "resolucion_admin"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "rnf"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "sancion"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "sin_irregularidades"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "texto_medida_seguridad"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "texto_resolucion_admin"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "texto_sancion"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "tipo"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}
		}
		if(controlTmp != 19){
		   cuerpoTabla.deleteRow(-1);
		}
	  }     

	 contenedor.appendChild(newTable);
         drawTablePlugin("tableData");
      
          
      }else{
            console.log("Sin datos!!");
          $("#spaceTable").empty();      
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var rowtitle = newTable.insertRow(0);
          var celltitle = rowtitle.insertCell(-1);
          newTable.setAttribute("id","tableData");
          celltitle.innerHTML = "<h5>No se encontraron registros</h5>";
          contenedor.appendChild(newTable);
      } 
    
  }



 function builderTable2(arrayData)
    {
     
      if(arrayData.length > 0)
      {

          $("#spaceTable").empty();
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var cabecera = newTable.createTHead();
          var rowtitle = cabecera.insertRow(0); 
          var cuerpoTabla = newTable.createTBody();
          newTable.setAttribute("id","tableData");
          newTable.setAttribute("class","display");
          newTable.setAttribute("cellspacing",0);
          newTable.setAttribute("width","100%");

	  rowtitle.insertCell(-1).innerHTML = "ID PADRON INDUSTRIAL";
	  rowtitle.insertCell(-1).innerHTML = "NOMBRE";
	  rowtitle.insertCell(-1).innerHTML = "RAZON SOCIAL";
	  rowtitle.insertCell(-1).innerHTML = "RFC";
          rowtitle.insertCell(-1).innerHTML = "RNF";
	  rowtitle.insertCell(-1).innerHTML = "CALLE";
	  rowtitle.insertCell(-1).innerHTML = "NUM. EXTERIOR";
	  rowtitle.insertCell(-1).innerHTML = "NUM. INTERIOR";
	  rowtitle.insertCell(-1).innerHTML = "COLONIA";
	  rowtitle.insertCell(-1).innerHTML = "LOCALIDAD";
          rowtitle.insertCell(-1).innerHTML = "MUNICIPIO";
          rowtitle.insertCell(-1).innerHTML = "TELEFONO";
	  rowtitle.insertCell(-1).innerHTML = "CORREO";
	  rowtitle.insertCell(-1).innerHTML = "LATITUD";
	  rowtitle.insertCell(-1).innerHTML = "LONGITUD";
	  rowtitle.insertCell(-1).innerHTML = "TIPO";
	  rowtitle.insertCell(-1).innerHTML = "ACTIVIDAD";
          rowtitle.insertCell(-1).innerHTML = "FECHA ALTA";
	  rowtitle.insertCell(-1).innerHTML = "OBSERVACIONES";
	  
	  
	  
          
         
          for (var aux in arrayData){
	    var fila = cuerpoTabla.insertRow();
	    var controlTmp=0;
		for(var tmp in arrayData[aux]){
			controlTmp++;
			if(tmp == "actividad"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "calle"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "colonia"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "correo"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "fecha_alta"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "id_padron_industria"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "lat"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "localidad"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "lon"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "municipio"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "nombre"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "num_ext"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "num_int"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "obs"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "razon_social"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "rfc"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "rnf"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "telefonos"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "tipo"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}
		}
		if(controlTmp != 19){
		   cuerpoTabla.deleteRow(-1);
		}
	  }     

	 contenedor.appendChild(newTable);
         drawTablePlugin("tableData");
      
          
      }else{
            console.log("Sin datos!!");
          $("#spaceTable").empty();      
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var rowtitle = newTable.insertRow(0);
          var celltitle = rowtitle.insertCell(-1);
          newTable.setAttribute("id","tableData");
          celltitle.innerHTML = "<h5>No se encontraron registros</h5>";
          contenedor.appendChild(newTable);
      } 
    
  }


 function builderTable3(arrayData)
    {
     
      if(arrayData.length > 0)
      {

          $("#spaceTable").empty();
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var cabecera = newTable.createTHead();
          var rowtitle = cabecera.insertRow(0); 
          var cuerpoTabla = newTable.createTBody();
          newTable.setAttribute("id","tableData");
          newTable.setAttribute("class","display");
          newTable.setAttribute("cellspacing",0);
          newTable.setAttribute("width","100%");

	  rowtitle.insertCell(-1).innerHTML = "ID PADRON PREDIOS";
	  rowtitle.insertCell(-1).innerHTML = "NOMBRE";
	  rowtitle.insertCell(-1).innerHTML = "RAZON SOCIAL";
	  rowtitle.insertCell(-1).innerHTML = "RFC";
          rowtitle.insertCell(-1).innerHTML = "RNF";
	  rowtitle.insertCell(-1).innerHTML = "CALLE";
	  rowtitle.insertCell(-1).innerHTML = "NUM. EXTERIOR";
	  rowtitle.insertCell(-1).innerHTML = "NUM. INTERIOR";
	  rowtitle.insertCell(-1).innerHTML = "COLONIA";
	  rowtitle.insertCell(-1).innerHTML = "LOCALIDAD";
          rowtitle.insertCell(-1).innerHTML = "MUNICIPIO";
          rowtitle.insertCell(-1).innerHTML = "TELEFONO";
	  rowtitle.insertCell(-1).innerHTML = "CORREO";
	  rowtitle.insertCell(-1).innerHTML = "LATITUD";
	  rowtitle.insertCell(-1).innerHTML = "LONGITUD";
	  rowtitle.insertCell(-1).innerHTML = "FECHA PERMISO";
	  rowtitle.insertCell(-1).innerHTML = "VIGENCIA";
          rowtitle.insertCell(-1).innerHTML = "FECHA ALTA";
	  rowtitle.insertCell(-1).innerHTML = "OBSERVACIONES";
	  
	  
	  
          
         
          for (var aux in arrayData){
	    var fila = cuerpoTabla.insertRow();
	    var controlTmp=0;
		for(var tmp in arrayData[aux]){
			controlTmp++;
			if(tmp == "id_padron_predios"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "calle"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "colonia"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "correo"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "fecha_alta"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "fecha_permiso"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "lat"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "localidad"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "lon"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "municipio"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "nombre"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "num_ext"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "num_int"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "obs"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "razon_social"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "rfc"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "rnf"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "telefonos"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}else if(tmp == "vigencia"){
				var columna = fila.insertCell(-1);
				columna.innerHTML = arrayData[aux][tmp];
			}
		}
		if(controlTmp != 19){
		   cuerpoTabla.deleteRow(-1);
		}
	  }     

	 contenedor.appendChild(newTable);
         drawTablePlugin("tableData");
      
          
      }else{
            console.log("Sin datos!!");
          $("#spaceTable").empty();      
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var rowtitle = newTable.insertRow(0);
          var celltitle = rowtitle.insertCell(-1);
          newTable.setAttribute("id","tableData");
          celltitle.innerHTML = "<h5>No se encontraron registros</h5>";
          contenedor.appendChild(newTable);
      } 
    
  }

 


function findArray(ArrayElementos,elemento){
  var buscar = ""+elemento;
  var isFind = ArrayElementos.indexOf(buscar);

  if(isFind == -1){
    return false;
  }else{
    return true;
  }
}



function isEmpty(text){
  if(text == null){
     return " ";
  }else{
    return text;
  }
}

function drawTablePlugin(tabla){
 $("#"+tabla).DataTable( {
   	  scrollX: true,
          //bSort : false,
          scrollY:        '50vh',
          scrollCollapse: true,
          aLengthMenu: [[10,25, 50, 75, -1], [10,25, 50, 75, "All"]],
          iDisplayLength: 10,
	  "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron coincidencias",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
	    "sSearch": "Buscar: ",  
	    "paginate": {
        	"first":      "Primera",
        	"last":       "Ultima",
        	"next":       "Siguiente",
        	"previous":   "Anterior"
    		}
         }

      } ); 
}













