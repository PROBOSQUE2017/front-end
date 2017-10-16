//////////////////////////INICIO CARGA DOM/////////////////////////////////
$(document).on('ready', function() {
    loadCalendario();
});
//////////////////////////FIN CARGA DOM////////////////////////////////////

//////////////////////////INICIO EVENTOS//////////////////////////////////
$('#btnClean').on('click', function(){
    emptyCombo("#Smuni");
    emptyCombo("#Sloc");
    $("#addForm").validate().resetForm();
});

$('#btnOkAdd').on('click', function(){
    var f = new Date();
    $("#btnClean").trigger('click');
    $('#fechaAlta').val(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    $("#myModalRespCalif").modal('hide');
});

$('#btnActivar').on('click', function(){
    activaPadron('updateStatus', $(this).attr('usu'), $(this).attr('fol'));
});

$('#actividad').change(function(){

    if($(this).val() != -1){
        if($('#Sregion').val() != -1 && $('#Smuni').val() != -1){
            getIdPadron('getFolio', $(this).val(), $('#Sregion').val(), $('#Smuni').val());
        }else{
          $('#padron').val('');  
        }

    }else{
        $('#padron').val('');
    }

});

$('#solicitudAuditoria').change(function(){
    if($(this).val() == "false"){
        $("#fechaAuditoria").val("");
        $( "#fechaAuditoria" ).prop( "disabled", true );
    }else{
        $('#fechaAuditoria').val(fecha_hoy());
        $( "#fechaAuditoria" ).prop( "disabled", false );
    }
});

/**
 * @function fecha_hoy
 * @return {Date} Regresa la fecha en formato dd/mm/YYYY
 */
function fecha_hoy(){
    let fecha = new Date();
    return `${fecha.getDiaFormatted()}/${fecha.getMonthFormatted()}/${fecha.getFullYear()}`;
}

Date.prototype.getMonthFormatted = function() {
  let month = this.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month;
}

Date.prototype.getDiaFormatted = function() {
  let dia = this.getDate();
  return dia < 10 ? '0' + dia : '' + dia;
}


function loadCalendario() {
    format_es = {
        format: "DD/MM/YYYY",

        daysOfWeek: [
            "D",
            "L",
            "M",
            "Mi",
            "J",
            "V",
            "S"
        ],
        monthNames: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ]

    };



    $('#fechaAlta').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        drops: 'up',
        locale: format_es

    });


    $('#fechaAuditoria').daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        showDropdowns: true,
        drops: 'up',
        locale: format_es

    }, function(chosen_date) {
        $('#fechaAuditoria').val(chosen_date.format('DD/MM/YYYY'));
    });




}

$("#Sregion").change(function(){
    emptyCombo("#Smuni");
    emptyCombo("#Sloc");
    getCatalog($("select#Sregion").val(),"getMunicipio","#Smuni",amplify.store('dataLoggingProbosque').id);

    if($(this).val() != -1){
        if($('#actividad').val() != -1 && $('#Smuni').val() != -1){
             getIdPadron('getFolio', $(this).val(), $('#Sregion').val(), $('#Smuni').val());
        }else{
          $('#padron').val('');  
        }

    }else{
        $('#padron').val('');
    }
});

$("#Smuni").change(function(){
   emptyCombo("#Sloc");
   getCatalog($("select#Smuni").val(),"getLocalidad","#Sloc",amplify.store('dataLoggingProbosque').id);

    if($(this).val() != -1){
        if($('#actividad').val() != -1 && $('#Sregion').val() != -1){
             getIdPadron('getFolio', $(this).val(), $('#Sregion').val(), $('#Smuni').val());
        }else{
          $('#padron').val('');  
        }

    }else{
        $('#padron').val('');
    }
});

function fullCombo($idCombo,datos,$opcion){
        for(var item in datos){
            if($opcion == "getMunicipio" ){
               $($idCombo).append("<option value="+datos[item].value+">"+datos[item].label.toUpperCase()+"</option>");
                }else if($opcion == "getLocalidad"){
                $($idCombo).append("<option value="+datos[item].value+">"+datos[item].label.toUpperCase()+"</option>");
            }
        }
}



function emptyCombo($idCombo){
    $($idCombo).empty();
    $($idCombo).append("<option value='-1'>SELECCIONE</option>");
}

//////////////////////////FIN EVENTOS/////////////////////////////////////

//////////////////////////INICIO PETICIONES AJAX//////////////////////////
function insertPadron(action,usuario,idPadronIndustrial,nombre, razonSocial,
                        rfc,rnf,calle,noExterior,noInterior,colonia,localidad,municipio,telefono,correo,
                        latitud,longitud,tipo,actividad,fechaAlta,observaciones,estatus,claveReg,claveMun, claveLoc) {
    var r = {
        success: function(json) {
            console.log(json);
            alert("Se agrego ok");
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            alert("Fallo al agregar");
        },
        complete: function(solicitudAJAX, estatus) {}
    };

    r = $.extend(r, urlServiceReforestacion);
    r.data = {
        action: action,
        usuario: usuario,
        idPadronIndustrial: idPadronIndustrial,
        nombre: nombre,
        razonSocial: razonSocial,
        rfc: rfc,
        rnf: rnf,
        calle: calle,
        noExterior: noExterior,
        noInterior: noInterior,
        colonia: colonia,
        localidad: localidad,
        municipio: municipio,
        telefono: telefono,
        correo: correo,
        latitud: latitud,
        longitud: longitud,
        tipo: tipo,
        actividad: actividad,
        fechaAlta: fechaAlta,
        observaciones: observaciones,
        estatus: estatus,
        claveReg: claveReg,
        claveMun: claveMun,
        claveLoc: claveLoc
    };

    $.ajax(r);    
}
//////////////////////////FIN PETICIONES AJAX/////////////////////////////

//////////////////////////INICIO VALIDACIONES ////////////////////////

    $('#addForm').validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            padron:{
                required: true,
                empty: true,
                maxlength: 20,
                caracterEspecial: true
            },
            nombreName: {
                maxlength: 200,
                //empty: true,
                caracterEspecial: true
            },
            razonSocialName: {
                maxlength: 200,
                //empty: true,
                caracterEspecial: true
            },
            rfcName: {
                maxlength: 13,
                //empty: true,
                caracterEspecial: true
            },
            rnfName: {
                maxlength: 100,
                //empty: true,
                caracterEspecial: true
            },
            calleName: {
                maxlength: 100,
                caracterEspecial: true
            },
            noExteriorName: {
                maxlength: 50,
                caracterEspecial: true
            },
            noInteriorName: {
                maxlength: 50,
                caracterEspecial: true
            },
            coloniaName: {
                maxlength: 100,
                caracterEspecial: true
            },           
            telefonoName: {
                maxlength: 100,
                caracterEspecial: true
            },
            correoName: {
                //correo: true,
                maxlength: 100
            },
            latitudName: {
                //decimal: true,
                //caracterEspecial: true
                maxlength: 30  
            },
            longitudName: {
                //decimal: true,
                //caracterEspecial: true
                maxlength: 30   
            },
            tipoName: {
                caracterEspecial: true,
                maxlength: 20
            },
            actividadName: {
                caracterEspecial: true,
                //maxlength: 200   
            },
            fechaAltaName: {
                //maxlength: 200   
            },
            observacionesName: {
                caracterEspecial: true,
                //maxlength: 200   
            },
            fechaAuditoriaName:{
                required: {
                    depends: function(el) {
                        if($("#solicitudAuditoria").val() == "true"){
                            return true
                        }else{
                            return false
                        }
                    }
                },
                fecha: {
                    depends: function(el) {
                        if($("#solicitudAuditoria").val() == "true"){
                            return true
                        }else{
                            return false
                        }
                    }
                }

            }

        },
        messages: {
            padron:{
                required: "Campo obligario. Seleccione región, Mpio. y actividad ",
                empty: "El campo esta vacio",
                maxlength: "Max. 20 caracteres"
            },
            nombreName: {
                maxlength: "Maximo 200 caracteres"
            },
            razonSocialName: {
                maxlength: "Maximo 200 caracteres"
            },
            rfcName: {
                maxlength: "Maximo 13 caracteres"
            },
            rnfName: {
                maxlength: "Maximo 100 caracteres"
            },
            calleName: {
                maxlength: "Maximo 100 caracteres"
            },
            noExteriorName: {
                maxlength: "Maximo 50 caracteres"
            },
            noInteriorName: {
                maxlength: "Maximo 50 caracteres"
            },
            coloniaName: {
                maxlength: "Maximo 100 caracteres"
            },
            telefonoName: {
                maxlength: "Maximo 100 caracteres"
            },
            correoName: {
                //correo:    "correo electronico invalido",
                maxlength: "Maximo 100 caracteres"
            },
            latitudName: {
                maxlength: "Max. 30 caracteres"   
            },
            longitudName: {
                maxlength: "Max. 30 caracteres"    
            },
            tipoName: {
                maxlength: "Maximo 20 caracteres"
            },
            actividadName: {
                //maxlength: 200   
            },
            fechaAltaName: {
                //maxlength: 200   
            },
            observacionesName: {
                //maxlength: 200   
            },
            fechaAuditoriaName:{
                //empty: "Campo obligario. Ingrese fecha",
                required: "Campo obligario. Ingrese fecha ",
                fecha: "Fecha no valida. Formato DD/MM/AAAA"
            }
        },

        submitHandler: function(form) {
            insertFuncion('insertPadron',
                        amplify.store('dataLoggingProbosque').id,
                        $('#padron').val().trim().toUpperCase(),
                        $('#nombre').val().trim().toUpperCase(), 
                        $('#razonSocial').val().trim().toUpperCase(),
                        $('#rfc').val().trim().toUpperCase(),
                        $('#rnf').val().trim().toUpperCase(),
                        $('#calle').val().trim().toUpperCase(),
                        $('#noExterior').val().trim().toUpperCase(),
                        $('#noInterior').val().trim().toUpperCase(),
                        $('#colonia').val().trim().toUpperCase(),
                        $('#Sloc option:selected').text().trim().toUpperCase(),
                        $('#Smuni option:selected').text().trim().toUpperCase(),
                        $('#telefono').val().trim().toUpperCase(),
                        $('#correo').val().trim().toUpperCase(),
                        $('#latitud').val().trim().toUpperCase(),
                        $('#longitud').val().trim().toUpperCase(),
                        $('#tipo').val().trim().toUpperCase(),
                        $('#actividad').val().trim().toUpperCase(),
                        $('#fechaAlta').val().trim().toUpperCase(),
                        $('#observaciones').val().trim().toUpperCase(),
                        true,
                        $('#Sregion').val().trim().toUpperCase(),
                        $('#Smuni').val().trim().toUpperCase(),
                        $('#Sloc').val().trim().toUpperCase(),
                        $('#solicitudAuditoria').val().trim().toUpperCase(),
                        $('#fechaAuditoria').val().trim().toUpperCase()
            ); 

            return false;
        }
    });



    jQuery.validator.addMethod("valueNotEquals", function(value, element, arg) {
        return arg != value;
    }, "Seleccione una opción");

    jQuery.validator.addMethod("caracterEspecial",
        function(value, element) {
            return /^[A-Za-z\d\s@_.,:ÑñáéíóúÁÉÍÓÚ#/-]*$/.test(value);
        },
        "Nada de caracteres especiales, por favor"
    );

    jQuery.validator.addMethod("empty",
        function(value, element) {
            return !/^\s*$/.test(value);
        },
        "Se requiere dato"
    );

    jQuery.validator.addMethod("decimal",
        function(value, element) {
            return /^(([-]{0,1})[0-9]+([.][0-9]+)?)?$/.test(value);
        },
        "Formato no valido"
    );

    jQuery.validator.addMethod("correo",
        function(value, element) {
            return /^(\s*)||([_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4}))$/.test(value);
        }
    );

    jQuery.validator.addMethod("fecha",
        function(value, element) {
            return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(value);
        }
    );

//////////////////////////FIN  VALIDACIONES //////////////////////////

//////////////////////////// PETICIONES AJAX /////////////////////////
function getCatalog(idC, opcion, idCombo, usuario) {

    var r = {
        success: function(json, estatus) {
            $('#btnOkAdd').hide();
            $('#btnInt').hide();
            $('#btnActivar').hide();
            $('#btn1Cancelar').hide();
            $('#msjResponseCalif').html('');
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                fullCombo(idCombo, json.data, opcion);
            } else {

                $('#msjResponseCalif').html('<h4 style="color:red"><b>Fallo al consultar</b></h4>');
                $('#btnInt').show();
                $('#myModalRespCalif').modal('show');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlService);
    r.data = { action: opcion, id: idC, usuario: usuario };
    $.ajax(r);
}


function activaPadron(action, user, padron) {

    var r = {
        success: function(json, estatus) {
            console.log(json);
            $('#btnOkAdd').hide();
            $('#btnInt').hide();
            $('#btnActivar').hide();
            $('#btn1Cancelar').hide();
            $('#msjResponseCalif').html('');

            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if(b){
                $('#msjResponseCalif').html('<h4 style="color:green"><b>Se habilito clave</b></h4>');
                $('#btnOkAdd').show(); 
            }else{
                $('#msjResponseCalif').html('<h4 style="color:red"><b>No se pudo habilitar clave</b></h4>');
                $('#btnInt').show();                
            }

        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlService);
    r.data = { action: action, idPadron: padron, usuario: user };
    $.ajax(r);
}


function insertFuncion(action ,usuario,padron, nombre, razonSocial,
    rfc, rnf, calle, noExterior, noInterior, colonia, localidad, municipio,
    telefono, correo, latitud, longitud, tipo, actividad, fechaAlta, observaciones, estatus, claveReg,
    claveMun, claveLoc, auditoria , fechaAuditoria) {
    var r = {
        success: function(json, estatus) {
       
            console.log(json);
            $('#btnOkAdd').hide();
            $('#btnInt').hide();
            $('#btnActivar').hide();
            $('#btn1Cancelar').hide();
            
            $('#msjResponseCalif').html('');
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if(b){
                if(json.data == '2'){
                    $('#msjResponseCalif').html('<h4 style="color:red"><b>Esta clave ya existe. Ingresa una nueva</b></h4>');
                    $('#btnInt').show();
                    $('#myModalRespCalif').modal('show');
                }else if(json.data == '1'){
                    $('#msjResponseCalif').html('<h4 style="color:red"><b>Ya existe la clave, pero se encuentra deshabilitada ¿Deseas habilitarla?</b></h4>');
                    $('#btnActivar').attr({'fol':padron,'usu':usuario});
                    $('#btnActivar').show();
                    $('#btn1Cancelar').show();
                    $('#myModalRespCalif').modal('show');
                }else{
                    $('#msjResponseCalif').html('<h4 style="color:green"><b>Se registro correctamente</b></h4>');
                    $('#btnOkAdd').show();
                    $('#myModalRespCalif').modal('show');
                }
            }else{
                $('#msjResponseCalif').html('<h4 style="color:red"><b>No se pudo registrar la clave única</b></h4>');
                $('#btnInt').show();
                $('#myModalRespCalif').modal('show');
            }

        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlService);
    r.data = {
        action: action,
        idPadronIndustrial:padron,
        usuario: usuario,
        nombre:nombre ,
        razonSocial: razonSocial,
        rfc: rfc,
        rnf: rnf,
        calle: calle ,
        noExterior: noExterior ,
        noInterior: noInterior,
        colonia: colonia,
        localidad: localidad ,
        municipio: municipio ,
        telefono: telefono,
        correo: correo,
        latitud:latitud ,
        longitud: longitud ,
        tipo: tipo,
        actividad: actividad ,
        fechaAlta: fechaAlta ,
        observaciones: observaciones ,
        estatus: estatus,
        claveReg:claveReg,
        claveMun:claveMun,
        claveLoc: claveLoc,
        atp: auditoria, 
        fecha_atp:fechaAuditoria

    };
    $.ajax(r);
}


function getIdPadron(action, actividad, region, municipio) {

    var r = {
        success: function(json, estatus) {
            console.log(json);
            $('#btnOkAdd').hide();
            $('#btnInt').hide();
            $('#btnActivar').hide();
            $('#btn1Cancelar').hide();
            $('#msjResponseCalif').html('');
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                $('#padron').val(json.data);
                $('#padron').focus();
            } else {

                $('#msjResponseCalif').html('<h4 style="color:red"><b>Fallo al generar clave única de identificación</b></h4>');
                $('#btnInt').show();
                $('#myModalRespCalif').modal('show');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlService);
    r.data = { action: action, idMunicipio: municipio, idRegion: region , actividad: actividad};
    $.ajax(r);
}