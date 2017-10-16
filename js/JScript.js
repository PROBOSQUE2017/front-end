$( document ).ready(function() {
    //alert("Bienvenido!!");
    var us = getDatosURL('us');
   	if (/_3/.test(us)) {
   		var elem = us.split('_');
		var user = elem[0].replace(/\"/g, "");
		var action = "get";
		var action2 = "getall";
		readRegion(user,action,0);
		readDatos(user,action2);
   	}else{
   		window.opener = self;
    	window.close();
	}
});


function getDatosURL(name) {
    	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    	results = regex.exec(location.search);
    	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function readDatos(user, action2) {
	var dataf = 'action=' + action2 + '&user=' + user;
	$.ajax({
    	url: "http://187.188.96.133:8082/ServiceBosque/MetaAnual",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
        	$.each(data, function(index, data){
        		if(index == "data"){
        			if(jQuery.isEmptyObject(data)){
        				$('#alerta').show("slow");
        			}else{
        				$('#alerta').hide();
        				var rfew = $('#TitulosTabla');
                 		rfew.find('tr').remove();
                 		rfew.append('<tr class="info"><th>No.</th><th>Región</th><th>Año</th><th>Meta (HA)</th><th class="text-center">Actualizar</th><th class="text-center">Eliminar</th></tr>');
                 		var rfew2 = $('#TablaBody');
                 		rfew2.find('tr').remove();
                 		$.each(data, function(index, data2){
                 			rfew2.append('<tr><th style="font-weight: normal;">'+data2.id_meta+'</th><th style="font-weight: normal;">'+data2.descripcion+'</th><th style="font-weight: normal;">'+data2.anio+'</th><th style="font-weight: normal;">'+data2.meta_anual+'</th><th class="text-center"><button onclick="ModalUpdate('+data2.id_meta+')" class="btn btn-warning">Actualizar</button></th><th class="text-center"><button onclick="ModalDelete('+data2.id_meta+')" class="btn btn-danger">Eliminar</button></th></tr>');
                 		});
                 	}
        		}
        	});

        },
        error: function (requeset, status, error) {
            alert(error);
        }
    });
}


function readRegion(user, action, selected) {
	var dataf = 'action=' + action + '&user=' + user;
	$.ajax({
    	url: "http://187.188.96.133:8082/ServiceBosque/MetaAnual",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            $.each(data, function(index, data){
				if(index == "data"){
					if(selected == 0){
						var rfew = $('#region');
					}else{
						var rfew = $('#updateregion');
					}
                 	rfew.find('option').remove();
                 	if(selected == 0){
                 		rfew.append("<option selected=\"selected\" value=\"0\">Seleccione una Opción...</option>");
                 	}else{
                 		rfew.append("<option value=\"0\">Seleccione una Opción...</option>");
                 	}
                 		$.each(data, function(index, data2){
							if(data2.id == selected){
								rfew.append("<option selected=\"selected\" value="+data2.id+">"+data2.descripcion+"</option>");
							}else{
                    			rfew.append("<option value="+data2.id+">"+data2.descripcion+"</option>");
                    		}
						});
				}
			});
        },
        error: function (requeset, status, error) {
            alert(error);
        }
    });
}


function validateFloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
}


function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}


function AddRegistro() {
	var action = "insert";
	var action2="getall"
	var id_region = $("#region").val();
	var anio = $("#anio").val();
	var meta_anual = $("#m_anual").val();
	var us = getDatosURL('us');
	/_3/.test(us);
   	var elem = us.split('_');
	var user = elem[0].replace(/\"/g, "");
	if(ValidarCampos(id_region, anio, meta_anual)){
		var dataf = 'action=' + action + '&id_region=' + id_region+ '&anio=' + anio+ '&meta_anual=' + meta_anual+ '&user=' + user;
		$.ajax({
    		url: "http://187.188.96.133:8082/ServiceBosque/MetaAnual",
        	type: "post",
        	data: dataf,
        	dataType: "JSON",
        	success: function (data) {
        		$("#add_new_record_modal").modal("hide");
        		readDatos(user, action2);
				$("#region").val("");
				$("#anio").val("");
				$("#m_anual").val("");
        	},
        	error: function (requeset, status, error) {
            	alert(error);
        	}
    	});
	}
}


function ValidarCampos(id_region, anio, meta_anual){
	if (id_region != 0 ) {
		if(anio != 0){
			if (meta_anual != "") {
				return true;
			}else{alert("Debe Ingresar una Meta Anual en HA");}
		}else{alert("Debe Seleccionar una Año");}
	}else{alert("Debe Seleccionar una Región");}
	return false;
}


function ModalUpdate(selected){
	var us = getDatosURL('us');
	/_3/.test(us);
   	var elem = us.split('_');

	var user = elem[0].replace(/\"/g, "");
	var action = "getbyid";
	var action2 = "get";
	var dataf = 'action=' + action + '&user=' + user+ '&id_meta_anual=' + selected;
	$.ajax({
    		url: "http://187.188.96.133:8082/ServiceBosque/MetaAnual",
        	type: "post",
        	data: dataf,
        	dataType: "JSON",
        	success: function (data) {
        	 $.each(data, function(index, data){
				if(index == "data"){
					$.each(data, function(index, data2){
						readRegion(user,action2,data2.id_region);
						$("#hidden_id_meta").val(data2.id_meta);
						$("#updateanio").val(data2.anio);
						$("#updatem_anual").val(data2.meta_anual);
						$("#update_user_modal").modal("show");
					});
				}
			});
        	},
        	error: function (requeset, status, error) {
            	alert(error);
        	}
    	});
}


function ActualizaMetaAnual(){
	var action = "update";
	var action2 = "getall";
	var us = getDatosURL('us');
	/_3/.test(us);
   	var elem = us.split('_');
	var user = elem[0].replace(/\"/g, "");
	var id_region = $("#updateregion").val();
	var anio = $("#updateanio").val();
	var meta_anual = $("#updatem_anual").val();
	var id_meta_anual = $("#hidden_id_meta").val();
	if(ValidarCampos(id_region, anio, meta_anual)){
		var dataf = 'action=' + action + '&user=' + user+ '&id_region=' + id_region+ '&anio=' + anio+ '&meta_anual=' + meta_anual+ '&id_meta_anual=' + id_meta_anual;
		$.ajax({
	    		url: "http://localhost:8080/ServiceBosque/MetaAnual",
	        	type: "post",
	        	data: dataf,
	        	dataType: "JSON",
	        	success: function (data) {
	        		$.each(data, function(index, data){
		        		if(index == "response"){
							$.each(data, function(index, data2){
								if (data2 === true) {
		        					$("#update_user_modal").modal("hide");
		        					readDatos(user, action2);
		        				}
							});
						}
					});
	        	},
	        	error: function (requeset, status, error) {
	            	alert(error);
	        	}
	    	});
	}
}


function ModalDelete(selected){
	var action = "delete";
	var action2 = "getall";
	var us = getDatosURL('us');
	/_3/.test(us);
   	var elem = us.split('_');
	var user = elem[0].replace(/\"/g, "");

	if (confirm("Desea Eliminar el registro seleccionado?")) {
		var dataf = 'action=' + action + '&user=' + user+ '&id_meta_anual=' + selected;
		$.ajax({
	    		url: "http://187.188.96.133:8082/ServiceBosque/MetaAnual",
	        	type: "post",
	        	data: dataf,
	        	dataType: "JSON",
	        	success: function (data) {
	        		$.each(data, function(index, data){
		        		if(index == "response"){
							$.each(data, function(index, data2){
								if (data2 === true) {
		        					readDatos(user, action2);
		        				}
							});
						}
					});
	        	},
	        	error: function (requeset, status, error) {
	            	alert(error);
	        	}
	    	});
	}else{
		return false;
	}

}