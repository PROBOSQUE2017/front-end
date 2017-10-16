var url = "http://187.188.96.133:8082";

$( document ).ready(function() {
    //var string = numeral(95665908).format('0,0');
    //var string = numeral(10000).format('(0,0.00)');
    //alert(string);
    var data = amplify.store('dataLoggingProbosque');
     var fecha = new Date();
    //alert(JSON.stringify(data));
    //alert("Bienvenido!!");
    if (SesionActiva(data)) {
        $('.user_connected').html(data.username);
        Buscar();
        SelectVivero();
        Encabezado("encabezado1", "", fecha.getFullYear());
        DPAnio("anio", fecha.getFullYear());
    }else{
        window.location.assign("index.html");
    }
        
});

$("input").keypress(function(event){
    if (event.which == 13) {
        event.preventDefault();
        //alert("");
        //var a = $("#label2").find("[aria-hidden]");
        var lbl2 = $("#label2").attr('aria-hidden');
        var lbl3 = $("#label3").attr('aria-hidden');
        var lbl4 = $("#label4").attr('aria-hidden');
        if (lbl2) {
            /*var seleccion = $("#selpp").val();
            var texto = $("#texto").val();
            alert("1"+" "+seleccion);
            alert("1"+" "+texto);*/
            Buscar();
        }
        if (lbl3) {
            /*var seleccion = $("#selvi").val();
            var anio = $("#anio").val().trim();
            alert("2"+" "+seleccion);
            alert("2"+" "+anio);*/
            Buscar2();
        }
        if (lbl4) {
            /*var opcion = $('input:radio[name=group1]:checked').val();
            alert("3"+" "+opcion);*/
            Buscar3();
        }
    }
});

function ViewPA(){
    $('#PPA').show();
    $('#PPAA').hide();
    $('#DP').hide();
    $("#label2").addClass("glyphicon glyphicon-share-alt");
    $("#label2").attr("aria-hidden","true");
    $("#label3").removeClass("glyphicon glyphicon-share-alt");
    $("#label3").removeAttr('aria-hidden');
    $("#label4").removeClass("glyphicon glyphicon-share-alt");
    $("#label4").removeAttr('aria-hidden');
}

function ViewPAA(){
     $('#PPAA').show();
     $('#PPA').hide();
     $('#DP').hide();
     $("#label3").addClass("glyphicon glyphicon-share-alt");
     $("#label3").attr("aria-hidden","true");
     $("#label2").removeClass("glyphicon glyphicon-share-alt");
     $("#label2").removeAttr('aria-hidden');
     $("#label4").removeClass("glyphicon glyphicon-share-alt");
     $("#label4").removeAttr('aria-hidden');
}

function ViewDP(){
    $('#DP').show();
    $('#PPA').hide();
    $('#PPAA').hide();
    $("#label4").addClass("glyphicon glyphicon-share-alt");
    $("#label4").attr("aria-hidden","true");
    $("#label2").removeClass("glyphicon glyphicon-share-alt");
    $("#label2").removeAttr('aria-hidden');
    $("#label3").removeClass("glyphicon glyphicon-share-alt");
    $("#label3").removeAttr('aria-hidden');
}

/*-----------------------------------------------------------------------------------*/
/*----------------------------- Pestaña Produccion Actual ---------------------------*/
/*-----------------------------------------------------------------------------------*/

$('#selpp').on('change', function() {
   var value = $("#selpp").val();
   //alert(value);
   if (value == "Nombre_comun") {
        $("#tres").show();
        $("#search").show();
        $("#dos").hide();
        $("#cuatro").show();

        var selectuno = $('#dos');
        selectuno.find('select').remove();

        var selectdos = $('#cuatro');
        selectdos.append('<select id="viveros" class="form-control"></select>');
        SelectVivero2();
   }else if(value == "Vivero"){
        $("#tres").show();
        $("#search").show();
        $("#dos").show();
        $("#cuatro").hide();
        
        var selectdos = $('#cuatro');
        selectdos.find('select').remove();

        var selectuno = $('#dos');
        selectuno.append('<select id="viveros" class="form-control"></select>');
        SelectVivero2();
   }
   else{
        $("#tres").hide();
        $("#search").hide();
        $("#dos").hide();
        $("#cuatro").hide();

   }
});

/*
$('#dos').on('change', function() { 
    $("#texto").val("");
});

$('#cuatro').on('change', function() { 
    $("#texto").val("");
});*/


function Buscar(){
	//alert("funciona!!");
	var seleccion = ($("#selpp").val() == 0) ? "" : $("#selpp").val();
	var texto = ($("#texto").val() == "") ? "" : $("#texto").val();
    var vivero = ($("#viveros").val() == undefined || $("#viveros").val() == 0) ? "" : $("#viveros").val();
    //alert(seleccion+"_"+texto);
	/*if(Requiered(seleccion, texto)){*/
        Porcentaje("porcentaje", seleccion, texto, vivero);
        Totales("totales",seleccion, texto, vivero);
	/*}*/
}

/*function Requiered(seleccion, texto){
	if (seleccion != 0) {
		if (texto != "") {
		  return true;	
		}else{alert("Necesita ingresar un criterio de busqueda");}
	}else{alert("Necesita seleccionar una opción");}
	return false;
}*/

function Porcentaje(action, where,like, vivero){
    var dataf = 'action=' + action + '&where=' + where + '&like=' + like + '&vivero=' + vivero;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(index);
                //alert(JSON.stringify(data));
                if(index == "data"){
                    if(jQuery.isEmptyObject(data)){
                        //alert("Porcentaje no encontrado");
                    }else{
                        //alert("trae datos");
                        var tr = $('#porcentaje');
                        tr.find('th').remove();
                        $.each(data, function(index, data){
                            tr.append('<th colspan="3">Avance de Producción: '+data.porcentaje+'%</th><th></th>');
                        });
                        GranTotal("grantotal", where,like, vivero);
                    }
                }
            });

        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}


function GranTotal(action, where,like, vivero){
    var dataf = 'action=' + action + '&where=' + where + '&like=' + like + '&vivero=' + vivero;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(index);
                //alert(JSON.stringify(data));
                if(index == "data"){
                    if(jQuery.isEmptyObject(data)){
                        //alert("Porcentaje no encontrado");
                    }else{
                        //alert("trae datos");
                        var tr = $('#porcentaje');
                        //tr.find('th').remove();
                        $.each(data, function(index, data){
                            tr.append('<th>Gran Total '+numeral(data.Programada).format('0,0')+'</th><th colspan="3"></th><th>Gran Total '+numeral(data.Producción).format('0,0')+'</th><th>Gran Total '+numeral(data.Disponibilidad).format('0,0')+'</th><th>Gran Total '+numeral(data.Entregada).format('0,0')+'</th><th>Gran Total '+numeral(data.F_Exis).format('0,0')+'</th>');
                        });
                    }
                }
            });
        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function Totales(action, where, like, vivero){
    var dataf = 'action=' + action + '&where=' + where + '&like=' + like + '&vivero=' + vivero;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(index);
                //alert(JSON.stringify(data));
                if(index == "data"){
                    if(jQuery.isEmptyObject(data)){
                        //alert("No sen encontraron datos");
                        $('#alerta').show("slow");
                         $('#content').hide();
                    }else{
                        //alert("trae datos");
                        $('#alerta').hide();
                        $('#content').show();                        
                        var tabla = $('#tabla');
                        tabla.find('tbody').remove();
                        $.each(data, function(index, data){
                            var a = data.Vivero.replace(/\s/g,"");
                            var Programada = (data.Programada == undefined) ? 0 : data.Programada;
                            var Producción = (data.Producción == undefined) ? 0 : data.Producción;
                            var Disponibilidad = (data.Disponibilidad == undefined) ? 0 : data.Disponibilidad;
                            var Entregada = (data.Entregada == undefined) ? 0 : data.Entregada;
                            var F_Exis = (data.F_Exis == undefined) ? 0 : data.F_Exis;
                            tabla.append('<tbody id="'+a+'" style="font-size:80%;"><tr class="info"><th>Vivero: '+data.Vivero+'</th><th></th><th></th><th></th><th>'+numeral(Programada).format('0,0')+'</th><th></th><th></th><th></th><th>'+numeral(Producción).format('0,0')+'</th><th>'+numeral(Disponibilidad).format('0,0')+'</th><th>'+numeral(Entregada).format('0,0')+'</th><th>'+numeral(F_Exis).format('0,0')+'</th></tr></tbody>');
                        });
                        GoBusqueda("byID", where, like, vivero);
                    }
                }
            });

        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function GoBusqueda(action, where, like, vivero) { 
	var dataf = 'action=' + action + '&where=' + where + '&like=' + like + '&vivero=' + vivero;
	$.ajax({
    	url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
        	//alert(JSON.stringify(data));
        	$.each(data, function(index, data){
                //alert(index);
                //alert(JSON.stringify(data));
        		if(index == "data"){
        			if(jQuery.isEmptyObject(data)){
        				//alert("No trae datos");
        			}else{
                        //alert("trae datos");
                        $.each(data, function(index, data){
                            var a = data.Vivero.replace(/\s/g,"");
                            var tbody = $('#'+a+'');
                            tbody.append('<tr><th style="font-weight: normal;">'+data.Nombre_comun+'</th><th style="font-weight: normal;">'+data.Nombre_cientifico+'</th><th style="font-weight: normal;">'+data.Lote_Semilla+'</th><th style="font-weight: normal;">'+data.Tipo_produccion+'</th><th style="font-weight: normal;">'+numeral(data.Programada).format('0,0')+'</th><th style="font-weight: normal;">'+data.Recurso+'</th><th style="font-weight: normal;">'+data.Envase+'</th><th style="font-weight: normal;">'+data.Altura+'</th><th style="font-weight: normal;">'+numeral(data.Producción).format('0,0')+'</th><th style="font-weight: normal;">'+numeral(data.Disponibilidad).format('0,0')+'</th><th style="font-weight: normal;">'+numeral(data.Entregada).format('0,0')+'</th><th style="font-weight: normal;">'+numeral(data.F_Exis).format('0,0')+'</th></tr>');
                        });
                    }
        		}
        	});

        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function SelectVivero2() {
    var dataf = 'action=viveros2';
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if(index == "data"){
                        var rfew = $('#viveros');
                        rfew.find('option').remove();
                        rfew.append("<option selected=\"selected\" value=\"0\">Seleccione una Opción...</option>");
                        $.each(data, function(index, data2){
                            //alert(JSON.stringify("data " + data2));
                            //alert(data2.Vivero);
                            rfew.append("<option value='"+data2.Vivero+"'>"+data2.Vivero+"</option>");
                        });
                }
            });
        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

/*-----------------------------------------------------------------------------------*/
/*------------------------ Pestaña Produccion Años Anteriores -----------------------*/
/*-----------------------------------------------------------------------------------*/
function SelectVivero() {
    var dataf = 'action=viveros';
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if(index == "data"){
                        var rfew = $('#selvi');
                        rfew.find('option').remove();
                        rfew.append("<option selected=\"selected\" value=\"0\">Seleccione una Opción...</option>");
                        $.each(data, function(index, data2){
                            //alert(JSON.stringify("data " + data2));
                            //alert(data2.Vivero);
                            rfew.append("<option value='"+data2.Vivero+"'>"+data2.Vivero+"</option>");
                        });
                }
            });
        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function Buscar2(){
    var seleccion = ($("#selvi").val() == 0) ? "" : $("#selvi").val();
    var anio = ($("#anio").val().trim() == "") ? "" : $("#anio").val().trim();
    //alert("seleccion "+seleccion);
    //alert("Año "+anio);
    //if (Requiered2(seleccion)) {
        Encabezado("encabezado1", seleccion, anio);
    //}
}

/*function Requiered2(seleccion){
    if (seleccion != 0) {
        return true;
    }else{alert("Necesita seleccionar una opción");}
    return false;
}*/

function Encabezado(action, where, anio){
    var dataf = 'action=' + action + '&where=' + where + '&anio=' + anio;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if (index == "data") {
                    if(jQuery.isEmptyObject(data)){
                        //alert("No hay datos");
                        $("#tablapaa").hide();
                        $('#alerta2').show("slow");
                    }else{
                        $('#alerta2').hide();
                        var tabla = $('#tablapaa');
                        tabla.find('tbody').remove();
                        $.each(data, function(index, data){
                            var a = data.Vivero.replace(/\s/g,"");
                            tabla.append('<tbody id="'+data.Año+"_"+a+'"><tr class="danger"><th class="text-left" colspan="6" style="font-size:95%;">'+data.Vivero+'</th></tr><tr class="info"><th style="font-size:95%;">Producción '+data.Año+'</th><th style="font-size:95%;"></th><<th style="font-size:95%;">'+numeral(data.Programada).format('0,0')+'</th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;">'+numeral(data.Produccion).format('0,0')+'</th></tr></tbody>');
                        });
                        Encabezado2("encabezado2", where, anio);
                    }
                }
            });
        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function Encabezado2(action, where, anio){
    //alert(action);
    //alert(where);
    var dataf = 'action=' + action + '&where=' + where + '&anio=' + anio;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if (index == "data") {
                    if(jQuery.isEmptyObject(data)){
                        alert("No hay datos");
                    }else{
                        $.each(data, function(index, data){
                            var a = data.Vivero.replace(/\s/g,"");
                            var tbody = $('#'+data.Año+"_"+a+'');
                            tbody.append('<tr class="warning" id="'+data.Año+'_'+a+'_'+data.Tipo_produccion+'"><th style="font-size:95%;">'+data.Tipo_produccion+'</th><th style="font-size:95%;"></th><th style="font-size:95%;">'+numeral(data.Programada).format('0,0')+'</th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;">'+numeral(data.Produccion).format('0,0')+'</th></tr>');
                        });
                        DatosSeccion("datosSeccion", where, anio);
                    }
                }
            });
        },
        error: function (requeset, status, error) {
            alert(error);
        }
    });
}

function DatosSeccion(action, where, anio){
    var dataf = 'action=' + action + '&where=' + where + '&anio=' + anio;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if (index == "data") {
                    if(jQuery.isEmptyObject(data)){
                        alert("No hay datos");
                    }else{
                        $("#tablapaa").show();
                        $.each(data, function(index, data){
                            var a = data.Vivero.replace(/\s/g,"");
                            //alert(data.Nombre_comun);
                            $('#'+data.Año+'_'+a+'_'+data.Tipo_produccion+'').after('<tr><th style="font-weight: normal; font-size:95%;">'+data.Nombre_comun+'</th><th style="font-weight: normal; font-size:95%;">'+data.Nombre_cientifico+'</th><th style="font-weight: normal; font-size:95%;">'+numeral(data.Programada).format('0,0')+'</th><th style="font-weight: normal; font-size:95%;">'+data.Recurso+'</th><th style="font-weight: normal; font-size:95%;">'+data.Envase+'</th><th style=" font-weight: normal;font-size:95%;">'+numeral(data.Produccion).format('0,0')+'</th></tr>');
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

/*-----------------------------------------------------------------------------------*/
/*------------------------------ Pestaña Destino Planta -----------------------------*/
/*-----------------------------------------------------------------------------------*/

function Buscar3(){
    var opcion = $('input:radio[name=group1]:checked').val();
    if (opcion == undefined) {
        alert("Necesita seleccionar una opción");
    }else{
        if (opcion == "ciudadano") {
            var ciudadano = $("#txtciudadano").val();
            //alert(ciudadano);
            DPCiudadano(opcion, ciudadano);
        }else{
            var anio = $("#anio2").val().trim();
            DPAnio(opcion, anio);
        }
    }
}

$('#myForm input').on('change', function() {
   var opcion = $('input:radio[name=group1]:checked', '#myForm').val();
   if (opcion == "anio") {
        $("#txtciudadano").val("");
   }else{
        $("#anio2").val("");
   }
});

function DPCiudadano(action, like){
    var dataf = 'action=' + action + '&like=' + like;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if (index == "data") {
                    if(jQuery.isEmptyObject(data)){
                        //alert("No hay datos");
                        $('#tablaDC').hide();
                        $('#alerta3').show("slow");
                        $('#TablaAnio').hide();
                    }else{
                        $('#TablaAnio').hide();
                        var tabla = $('#tablaDC');
                        tabla.find('tbody').remove();
                        var count = 0;
                        $.each(data, function(index, data){
                            if(count == 0){
                                tabla.append('<tbody id="'+data.Año+'"><tr class="info"><th class="text-center" style="font-size:95%;">'+data.Año+'</th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;"></th><th style="font-size:95%;"></th></tr><tr><th style="font-weight: normal; font-size:90%;">'+data.Solicitante+'</th><th style="font-weight: normal; font-size:90%;">'+data.Region+'</th><th style="font-weight: normal; font-size:90%;">'+data.Municipio+'</th><th style="font-weight: normal; font-size:90%;">'+data.Vale_planta+'</th><th style="font-weight: normal; font-size:90%;">'+data.Destino+'</th><th style="font-weight: normal; font-size:90%;">'+data.Vivero+'</th><th style="font-weight: normal; font-size:90%;">'+data.Nombre_comun+'</th><th style="font-weight: normal; font-size:90%;">'+data.Nombre_cientifico+'</th><th style="font-weight: normal; font-size:90%;">'+numeral(data.Cantidad_planta).format('0,0')+'</th><th style="font-weight: normal; font-size:90%;">'+data.Tipo_salida+'</th></tr></tbody>');
                            }else{
                                var tbody = $('#'+data.Año+'');
                                tbody.append('<tr><th style="font-weight: normal; font-size:90%;">'+data.Solicitante+'</th><th style="font-weight: normal; font-size:90%;">'+data.Region+'</th><th style="font-weight: normal; font-size:90%;">'+data.Municipio+'</th><th style="font-weight: normal; font-size:90%;">'+data.Vale_planta+'</th><th style="font-weight: normal; font-size:90%;">'+data.Destino+'</th><th style="font-weight: normal; font-size:90%;">'+data.Vivero+'</th><th style="font-weight: normal; font-size:90%;">'+data.Nombre_comun+'</th><th style="font-weight: normal; font-size:90%;">'+data.Nombre_cientifico+'</th><th style="font-weight: normal; font-size:90%;">'+numeral(data.Cantidad_planta).format('0,0')+'</th><th style="font-weight: normal; font-size:90%;">'+data.Tipo_salida+'</th></tr>');
                            }
                            count++;
                        });
                        $('#tablaDC').show();
                        $('#alerta3').hide();
                        //alert(count);
                    }
                }
            });
        },
        error: function (requeset, status, error) {
            alert(error);
        }
    });
}

function DPAnio(action, where){
    var dataf = 'action=' + action + '&where=' + where;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if (index == "data") {
                    if(jQuery.isEmptyObject(data)){
                        //alert("No hay datos");
                        $('#tablaDC').hide();
                        $('#TablaAnio').hide();
                         $('#alerta3').show("slow");
                    }else{
                        var tabla = $('#TablaAnio');
                        tabla.find('tbody').remove();
                        $.each(data, function(index, data){
                                $('#alerta3').hide();
                                $('#tablaDC').hide();
                                $('#TablaAnio').show();
                                tabla.append('<tbody id="'+data.año+'"><tr class="info"><th colspan="2" style="font-size:75%;">Planta Entregada '+data.año+'</th><th style="font-size:75%;">'+numeral(data.Probosque).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_PROBOSQUE).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CEPANAF).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CEPANAF).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CGCE).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CGCE).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SECyBS).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SECyBS).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Otro_Estatal).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_Otro_estatal).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SEMARNAT).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SEMARNAT).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAFOR).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAFOR).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONANP).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONANP).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAZA).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAZA).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAGUA).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAGUA).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SEDESOL).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SEDESOL).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.BID).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_BID).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Otro_federal).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_otro_federal).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Cantidad_planta).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.Superficie).format('(0,0.00)')+'</th></tr></tbody>');
                        });
                        DPRegion("region", where);
                    }
                }
            });
        },
        error: function (requeset, status, error) {
            alert(error);
        }
    });
}

function DPRegion(action, where){
    var dataf = 'action=' + action + '&where=' + where;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if (index == "data") {
                    if(jQuery.isEmptyObject(data)){
                        //alert("No hay datos");
                    }else{
                        //var tabla = $('#TablaAnio');
                        $.each(data, function(index, data){
                            var tbody = $('#'+data.año+'');
                            //tbody.find('tr').remove();
                            var a = data.region.replace(/\s/g,"");
                            //alert(a);
                            tbody.append('<tr class="danger" id="'+data.año+'_'+a+'"><th colspan="2" style="font-size:75%;">'+data.region+'</th><th style="font-size:75%;">'+numeral(data.Probosque).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_PROBOSQUE).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CEPANAF).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CEPANAF).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CGCE).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CGCE).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SECyBS).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SECyBS).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Otro_Estatal).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_Otro_estatal).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SEMARNAT).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SEMARNAT).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAFOR).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAFOR).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONANP).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONANP).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAZA).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAZA).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAGUA).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAGUA).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SEDESOL).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SEDESOL).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.BID).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_BID).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Otro_federal).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_otro_federal).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Cantidad_planta).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.Superficie).format('(0,0.00)')+'</th></tr>');
                        });
                        DPRegionDetalle("detalle", where);
                    }
                }
            });
        },
        error: function (requeset, status, error) {
            alert(error);
        }
    });
}

function DPRegionDetalle(action, where){
    var dataf = 'action=' + action + '&where=' + where;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionPlanta",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                if (index == "data") {
                    if(jQuery.isEmptyObject(data)){
                        //alert("No hay datos");
                    }else{
                        $.each(data, function(index, data){
                            var a = data.region.replace(/\s/g,"");
                            var tr = $('#'+data.año+'_'+a+'');
                            //alert(a);
                            tr.after('<tr><th colspan="2" style="font-size:75%;">'+data.municipio+'</th><th style="font-size:75%;">'+numeral(data.Probosque).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_PROBOSQUE).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CEPANAF).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CEPANAF).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CGCE).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CGCE).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SECyBS).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SECyBS).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Otro_Estatal).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_Otro_estatal).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SEMARNAT).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SEMARNAT).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAFOR).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAFOR).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONANP).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONANP).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAZA).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAZA).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.CONAGUA).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_CONAGUA).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.SEDESOL).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_SEDESOL).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.BID).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_BID).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Otro_federal).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.superficie_otro_federal).format('(0,0.00)')+'</th><th style="font-size:75%;">'+numeral(data.Cantidad_planta).format('0,0')+'</th><th style="font-size:75%;">'+numeral(data.Superficie).format('(0,0.00)')+'</th></tr>');
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

$(".option_logout").click(function(){
        CerrarSession();
});

function CerrarSession(){
    amplify.store('dataLoggingProbosque',null);
    window.location.assign("index.html");
}

function SesionActiva(data){
    //var data = amplify.store('dataLoggingProbosque');
    var startLoggin=false;
    if ((typeof data != "undefined")&&(data!=null)&&(data.program == 9)&&(data.activity == 2)) {
        startLoggin=true;
    }
    return startLoggin;
}