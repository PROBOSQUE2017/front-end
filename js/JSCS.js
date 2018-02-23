var url = "http://localhost:8080";

$( document ).ready(function() {
	var data = amplify.store('dataLoggingProbosque');
    var fecha = new Date();
    //alert(JSON.stringify(data));
    //alert("Bienvenido!!");
    if (SesionActiva(data)) {
        $('.user_connected').html(data.username);
        Buscar();
        Buscar2();
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
        if (lbl2) {
        	Buscar();
        }
        if (lbl3) {
        	Buscar2()
        }
    }
});

function ViewBGP(){
	$("#BGP").show();
	$("#DGP").hide();
	$("#label2").addClass("glyphicon glyphicon-share-alt");
    $("#label2").attr("aria-hidden","true");
    $("#label3").removeClass("glyphicon glyphicon-share-alt");
    $("#label3").removeAttr('aria-hidden');
}

function ViewDGP(){
	$("#DGP").show();
	$("#BGP").hide();
	$("#label3").addClass("glyphicon glyphicon-share-alt");
    $("#label3").attr("aria-hidden","true");
    $("#label2").removeClass("glyphicon glyphicon-share-alt");
    $("#label2").removeAttr('aria-hidden');
}

function Buscar() {
	var bgp = ($("#bgp").val().trim() == "") ? "" : $("#bgp").val();
	DatosGermoPlasma("DtoBGP", bgp);
}

function DatosGermoPlasma(action, like){
    var dataf = 'action=' + action + '&like=' + like;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionSemilla",
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
                        $('#alerta').show("slow");
                        $('#tblBG').hide();
                    }else{
                        //alert("trae datos");                        
                        $('#alerta').hide();
                        $('#tblBG').show();
                        var tabla = $('#tblBG');
                        tabla.find('tbody').remove();
                        $.each(data, function(index, data){
                            tabla.append('<tbody id="body"><tr style="font-weight: normal; font-size:80%;"><th>'+data.Nombre_comun+'</th><th>'+data.Nombre_Cientifico+'</th><th>'+data.region+'</th><th>'+data.municipio+'</th><th>'+data.procedencia+'</th><th>'+data.fecha_alta+'</th><th>'+data.F_ClaLot+'</th><th>'+numeral(data.viabilidad).format('(0,0.00)')+'</th><th>'+numeral(data.cantidad).format('(0,0.00)')+'</th></tr></tbody>');
                        });
                        TotalDatosGermoPlasma("total", like);
                    }
                }
            });

        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function TotalDatosGermoPlasma(action, like){
    var dataf = 'action=' + action + '&like=' + like;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionSemilla",
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
                        var tbody = $('#tblBG');
                        tbody.find('tfoot').remove();
                        $.each(data, function(index, data){
                            tbody.append('<tfoot><tr style="font-weight: normal; font-size:80%;"><th colspan="7"></th><th>Total (Kg)</th><th>'+numeral(data.cantidad).format('(0,0.00)')+'</th></tr></tfoot>');
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


function Buscar2() {
	var dgp = ($("#dgp").val().trim() == "") ? "" : $("#dgp").val();
	var anio = ($("#anio").val().trim() == "") ? "" : $("#anio").val();
	DatosDestinoGermoPlasma("DtoDGP", dgp, anio);
}


function DatosDestinoGermoPlasma(action, like, anio){
    var dataf = 'action=' + action + '&like=' + like + '&anio=' + anio;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionSemilla",
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
                        $('#alerta2').show("slow");
                        $('#tblDG').hide();
                    }else{
                        //alert("trae datos");                        
                        $('#alerta2').hide();
                        $('#tblDG').show();
                        var tabla = $('#tblDG');
                        tabla.find('tbody').remove();
                        $.each(data, function(index, data){
                        	//alert($('#'+data.año+'').length);
                        	if ($('#'+data.año+'').length == 0) {
                        		tabla.append('<tbody id="'+data.año+'"><tr class="info" style="font-weight: normal; font-size:80%;"><th><strong>'+data.año+'</strong></th></tr><tr style="font-weight: normal; font-size:80%;"><th>'+data.Nombre_cientifico+'</th><th>'+data.Nombre_comun+'</th><th>'+data.procedencia+'</th><th>'+data.destino+'</th><th>'+data.fecha_alta+'</th><th>'+data.lote_semilla+'</th><th>'+data.viabilidad+'</th><th>'+numeral(data.cantidad).format('(0,0.00)')+'</th><th>'+numeral(data.costo).format('(0,0.00)')+'</th></tr></tbody>');
                        	}else{
                        		var tbody = $('#'+data.año+'');
           						tbody.append('<tr style="font-weight: normal; font-size:80%;"><th>'+data.Nombre_cientifico+'</th><th>'+data.Nombre_comun+'</th><th>'+data.procedencia+'</th><th>'+data.destino+'</th><th>'+data.fecha_alta+'</th><th>'+data.lote_semilla+'</th><th>'+data.viabilidad+'</th><th>'+numeral(data.cantidad).format('(0,0.00)')+'</th><th>'+numeral(data.costo).format('(0,0.00)')+'</th></tr>');
                        	}
                            //alert($('#'+data.año+'').length);
                        });
                        TotalDestinoGermoPlasma("TotalDGP", like, anio);
                    }
                }
            });

        },
        error: function (requeset, status, error) {
            alert("Servicio no disponible intente más tarde");
        }
    });
}

function TotalDestinoGermoPlasma(action, like, anio){
    var dataf = 'action=' + action + '&like=' + like + '&anio=' + anio;
    $.ajax({
        url: url+"/ServiceBosque/ProduccionSemilla",
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
                        $.each(data, function(index, data){
                        	var tbody = $('#'+data.año+'');
                            tbody.append('<tr class="warning" style="font-weight: normal; font-size:80%;"><th colspan="5"></th><th>Total</th><th>'+numeral(data.cantidad).format('(0,0.00)')+'</th><th>'+numeral(data.costo).format('(0,0.00)')+'</th></tr>');
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
    if ((typeof data != "undefined")&&(data!=null)&&(data.program == 9)&&(data.activity == 1)) {
        startLoggin=true;
    }
    return startLoggin;
}