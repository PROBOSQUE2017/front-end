window.onload = function () {
	mostrarTemas(usuario, "cargarTemas");
	$("#temaExistente").hide();
	$('#eligeMapaPrivado').hide();
	radioButTrat = document.getElementsByName("temaPoligono");
	radioMapas = document.getElementsByName("radioMapas");
	var elementosDelForm = document.getElementsByTagName('input');
	var elementosSelect = document.getElementsByTagName('select');

	for(var i=0; i<elementosDelForm.length;i++) {

	if (elementosDelForm[i].type == 'radio') {
		elementosDelForm[i].addEventListener("click", actualizarDatos);
	}else {
         	elementosDelForm[i].addEventListener("change", actualizarDatos);
         }
     }
 	for (var i=0; i<elementosSelect.length;i++) {
 		elementosSelect[i].addEventListener("change", actualizarDatos);
 	}

 	//Tratamiento para mapas 

 	for(var i=0; i<elementosDelForm.length;i++) {

	if (elementosDelForm[i].type == 'radio') {elementosDelForm[i].addEventListener("click", actualizarDatosMapa);}

         else {
         	elementosDelForm[i].addEventListener("change", actualizarDatosMapa);
         }
     }
 	for (var i=0; i<elementosSelect.length;i++) {elementosSelect[i].addEventListener("change", actualizarDatosMapa);}

}



//////FUNCIÓN PARA TEMAS
function actualizarDatos() {

var radioButSelValue = '';


for (var i=0; i<radioButTrat.length; i++) {
    if (radioButTrat[i].checked == true) { 
        radioButSelValue= radioButTrat[i].value;
    } 
}
if (radioButSelValue != ''){

	if(radioButSelValue == '1'){
			$("#temaNuevo").show(); $("#temaExistente").hide();}
			else {
				
				
				$("#temaNuevo").hide();
	            $("#temaExistente").show();
				//mostrarTemas(usuario, "cargarTemas");
			 
			}
	}
}



// FUNCIÓN PARA MAPAS
function actualizarDatosMapa() {

var radioButSelValueMapa = '';


for (var i=0; i<radioMapas.length; i++) {
    if (radioMapas[i].checked == true) { 
        radioButSelValueMapa= radioMapas[i].value;
    } 
}
if (radioButSelValueMapa != ''){

if(radioButSelValueMapa == '1'){
			$("#eligeMapaPublico").show(); $("#eligeMapaPrivado").hide();}
			else {$("#eligeMapaPrivado").show(); $("#eligeMapaPublico").hide(); }
		}
}



var mostrarTemas = function(usr, action){
	var params={"action":action,"usuario":usr};
	
	$.ajax({
		url: 'http://localhost:8080/ServiceBosque/ConectMapa',
		type: "POST",
		datatype: 'json',
		data:params
	}).done(function(data){
		var _temasExistentes = data.data;
		var chain="";
		var temaPlyn=$('#temaPlynExistentes');
		var temaPlynFuera=$('#selectTemasPoligonos');
		var temaFigManual=$('#temaFigManual');

        temaPlyn.empty(); 
		for(var x=0; x< _temasExistentes.length;x++){
	     	temaPlyn.append("<option value='"+_temasExistentes[x].id+"'>" +_temasExistentes[x].id+" </option>");
		}

		temaPlynFuera.empty();
		for(var z=0; z<_temasExistentes.length;z++){
			temaPlynFuera.append("<option value='"+_temasExistentes[z].id+"'>" +_temasExistentes[z].id+" </option>");
		}

		temaFigManual.empty();
		for(var z=0; z<_temasExistentes.length;z++){
			temaFigManual.append("<option value='"+_temasExistentes[z].id+"'>" +_temasExistentes[z].id+" </option>");
		}
      
	});
}


$(document).on('ready',function() {

	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	usuario = getParameterByName('vuhmepmhac')/5;

});