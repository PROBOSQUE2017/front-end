window.onload = function () {
	bases();
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



var bases = function(){

	$('#eleccionBase').change(function(){
		var base = $('#eleccionBase').val();
		//mostrarTemas(usuario, "cargaTemasPrograma", base);
		if(base == 1){
			mostrarTemas(11, "cargarTemas");
		}
		if(base == 2){
			mostrarTemas(12, "cargarTemas");
		}
		if(base == 3){
			mostrarTemas(13, "cargarTemas");
		}
		if(base == 5){
			mostrarTemas(15, "cargarTemas");
		}
		if(base == 6){
			mostrarTemas(16, "cargarTemas");
		}
		if(base == 71){
			mostrarTemas(35, "cargarTemas");
		}
		if(base == 72){
			mostrarTemas(36, "cargarTemas");
		}
		if(base == 8){
			mostrarTemas(19, "cargarTemas");
		}
		if(base == 10){
			mostrarTemas(21, "cargarTemas");
		}
		if(base == 11){
			mostrarTemas(22, "cargarTemas");
		}
		if(base == 12){
			mostrarTemas(23, "cargarTemas");
		}
		if(base == 0){
			mostrarTemas(1, "cargarTemas");
		}

	});

}


var mostrarTemas = function(usr, action, programa){
	var params={"action":action,"usuario":usr,"programa":programa};
	$.ajax({
		url: 'http://localhost:8080/ServiceBosque/ConectMapa',
		type: "POST",
		datatype: 'json',
		data:params
	}).done(function(data){
		var _temasExistentes = data.data;
		var chain="";
		var temaPlynFuera=$('#selectTemasPoligonos');

		temaPlynFuera.empty();
		for(var z=0; z<_temasExistentes.length;z++){
			temaPlynFuera.append("<option value='"+_temasExistentes[z].id+"'>" +_temasExistentes[z].id+" </option>");
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