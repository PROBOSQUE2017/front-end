var fecha;
$(document).ready(function() {
    loadCalendario();
});

/************************************************************************
 ************ Carga de f(x) requeridas por la aplicación *****************
 *************************************************************************/

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

function loadLocalidades() {
    if ($('#Smuni').val() != -1) {
        emptyCombo("#Sloc");
        getCatalog($("select#Smuni").val(), "getLocalidad", "#Sloc", amplify.store('dataLoggingProbosque').id);
    }
}

function emptyCombo($idCombo) {
    $($idCombo).empty();
    $($idCombo).append("<option value='-1'>SELECCIONE</option>");
}

function fullCombo($idCombo, datos, $opcion) {
    for (var item in datos) {
        if ($opcion == "getMunicipio") {
            $($idCombo).append("<option value=" + datos[item].value + ">" + datos[item].label.toUpperCase() + "</option>");
        } else if ($opcion == "getLocalidad") {
            $($idCombo).append("<option value=" + datos[item].value + ">" + datos[item].label.toUpperCase() + "</option>");
        }
    }
}

$('#solicitudAuditoria').change(function() {
    if ($(this).val() == "false") {
        $("#fechaAuditoria").val("");
        $("#fechaAuditoria").prop("disabled", true);
    } else {
        $("#fechaAuditoria").val(fecha_hoy());
        $("#fechaAuditoria").prop("disabled", false);
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


$('#selectOptionFind').change(function() {
    if ($(this).val() == 'FECHA DE ALTA' || $(this).val() == 'FECHA DE AUDITORIA') {
        $('#inputTextFindTxt').show();
        $('#selectATP').hide();
        $('#inputTextFindTxt').val('');
        $('#inputTextFindTxt').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            drops: 'down',
            locale: format_es

        }, function(label, start) {});
    } else if ($(this).val() == 'ATP') {
        $('#inputTextFindTxt').hide();
        $('#inputTextFindTxt').val('');
        $('#selectATP').show();
        $("#inputTextFindTxt-error").parent().hide();
        $("#inputTextFindTxt-error").html('');
    } else {
        $('#inputTextFindTxt').show();
        $('#selectATP').hide();
        if (typeof $('#inputTextFindTxt').data('daterangepicker') == 'object') {
            $('#inputTextFindTxt').data('daterangepicker').remove();
        }
    }
});



function showDetailsModal(parametro) {
    $("#dataFormUpdate").validate().resetForm();
    getDetailsPadron('getRegistro', $(parametro).attr('idpa').trim(), amplify.store('dataLoggingProbosque').id, $(parametro).attr('num_renglon'));
    loadLocalidades();
}


/************************************************************************
 *************** Inicio Eventos de botones en la aplicación  *************
 *************************************************************************/
$('#btnOk').on('click', function() {
    $('#modalUpdateData').modal('hide');
    $('#myModalRespCalif').modal('hide');
});

/************************************************************************
 ******************* Inicio de peticiones Ajax ***************************
 *************************************************************************/


function findRows(actionParams, optionFind, textInput, usr) {
    var r = {
        success: function(json, estatus) {
            console.log(json);
            var b = false;
            for (var x in json.response) {
                if (x == "sucessfull") {
                    b = json.response[x];
                }
            }

            if (b) {
                $("#tablaDatosBusqueda").empty();
                var cuerpoTabla = document.getElementById("tablaDatosBusqueda");
                if (json.data.length > 0) {
                    var renglon = 0;
                    for (var tmp in json.data) {
                        renglon++;
                        var fila = cuerpoTabla.insertRow();
                        var idPadron;
                        for (var aux in json.data[tmp]) {
                            if (aux == "fecha_alta") {
                                var celda = fila.insertCell(-1);
                                celda.setAttribute('id', 'reng' + renglon + '7');
                                celda.innerHTML = json.data[tmp][aux];
                            } else if (aux == "id_padron_industria") {
                                idPadron = json.data[tmp][aux];
                                var celda = fila.insertCell(-1);
                                celda.setAttribute('id', 'reng' + renglon + '1');
                                celda.innerHTML = json.data[tmp][aux];
                            } else if (aux == "nombre") {
                                var celda = fila.insertCell(-1);
                                celda.setAttribute('id', 'reng' + renglon + '2');
                                celda.innerHTML = json.data[tmp][aux];
                            } else if (aux == "razon_social") {
                                var celda = fila.insertCell(-1);
                                celda.setAttribute('id', 'reng' + renglon + '3');
                                celda.innerHTML = json.data[tmp][aux];
                            } else if (aux == "rfc") {
                                var celda = fila.insertCell(-1);
                                celda.setAttribute('id', 'reng' + renglon + '4');
                                celda.innerHTML = json.data[tmp][aux];
                            } else if (aux == "rnf") {
                                var celda = fila.insertCell(-1);
                                celda.setAttribute('id', 'reng' + renglon + '5');
                                celda.innerHTML = json.data[tmp][aux];
                            } else if (aux == "tipo") {
                                var celda = fila.insertCell(-1);
                                celda.setAttribute('id', 'reng' + renglon + '6');
                                celda.innerHTML = json.data[tmp][aux];
                            }

                        }
                        fila.insertCell(-1).innerHTML = '<td><button num_renglon="' + renglon + '" class="btn btn-default" idPa="' + idPadron + '" onclick="showDetailsModal(this)">ACTUALIZAR</button></td>';

                    }
                } else {
                    var fila = cuerpoTabla.insertRow();
                    fila.innerHTML = '<td colspan="8" align="center">No se encontrarón registros</td>';
                }

            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlService);
    r.data = {
        action: actionParams,
        columna: optionFind,
        criterio: textInput,
        user: usr
    };
    $.ajax(r);
}


function getDetailsPadron(actionParams, idPa, usr, numeroRenglon) {
    var r = {
        success: function(json, estatus) {
            console.log(json);
            var b = false;
            $('#btnOk').hide();
            $('#btnInt').hide();
            $('#btnActivar').hide();
            $('#btn1Cancelar').hide();
            $('#msjResponseCalif').html('');
            for (var x in json.response) {
                if (x == "sucessfull") {
                    b = json.response[x];
                }
            }

            if (b) {
                var textoMuni = 'SELECCIONE';
                var textoLoc = 'SELECCIONE';
                for (var x in json.data) {
                    if (x == 'actividad') {
                        $('#actividad').val(json.data[x].trim());
                    } else if (x == 'calle') {
                        $('#calle').val(json.data[x].trim());
                    } else if (x == 'colonia') {
                        $('#colonia').val(json.data[x].trim());
                    } else if (x == 'correo') {
                        $('#correo').val(json.data[x].trim());
                    } else if (x == 'lat') {
                        $('#latitud').val(json.data[x].trim());
                    } else if (x == 'lon') {
                        $('#longitud').val(json.data[x].trim());
                    } else if (x == 'nombre') {
                        $('#nombre').val(json.data[x].trim());
                    } else if (x == 'num_ext') {
                        $('#noExterior').val(json.data[x].trim());
                    } else if (x == 'num_int') {
                        $('#noInterior').val(json.data[x].trim());
                    } else if (x == 'razon_social') {
                        $('#razonSocial').val(json.data[x].trim());
                    } else if (x == 'rnf') {
                        $('#rnf').val(json.data[x].trim());
                    } else if (x == 'telefonos') {
                        $('#telefono').val(json.data[x].trim());
                    } else if (x == 'tipo') {
                        $('#tipo').val(json.data[x].trim());
                    } else if (x == 'obs') {
                        $('#observaciones').val(json.data[x].trim());
                    } else if (x == 'rfc') {
                        $('#rfc').val(json.data[x].trim());
                    } else if (x == 'fecha_alta') {
                        if (typeof $('#fechaAlta').data('daterangepicker') == 'object') {
                            $('#fechaAlta').data('daterangepicker').remove();
                        }

                        if (json.data[x] != ' ') {
                            $('#fechaAlta').daterangepicker({
                                singleDatePicker: true,
                                showDropdowns: true,
                                drops: 'up',
                                startDate: json.data[x],
                                locale: format_es

                            });
                        } else {
                            $('#fechaAlta').daterangepicker({
                                autoUpdateInput: true,
                                singleDatePicker: true,
                                showDropdowns: true,
                                drops: 'up',
                                locale: format_es
                            });
                            $('#fechaAlta').val('');
                        }
                    } else if (x == 'cve_reg') {
                        $('#Sregion').val(json.data[x]);
                    } else if (x == 'municipio') {
                        textoMuni = json.data[x].trim();
                    } else if (x == 'cve_mpio') {
                        $('#Smuni').empty();
                        $('#Smuni').append('<option value="' + json.data[x].trim() + '" selected>' + textoMuni + '</option>');
                    } else if (x == 'cve_localidad') {
                        $('#Sloc').empty();
                        $('#Sloc').append('<option value="' + json.data[x].trim() + '" selected>' + textoLoc + '</option>');
                    } else if (x == 'localidad') {
                        textoLoc = json.data[x].trim();
                    } else if (x == 'id_padron_industria') {
                        $('#padron').val(json.data[x].trim());
                    } else if (x == 'atp') {
                        if (json.data[x].trim() == 'f') {
                            $('#solicitudAuditoria').val('false');
                            $('#fechaAuditoria').prop('disabled', true);
                            if (typeof $('#inputTextFindTxt').data('daterangepicker') == 'object') $('#inputTextFindTxt').data('daterangepicker').remove();
                        } else if (json.data[x].trim() == 't') {
                            $('#solicitudAuditoria').val('true');
                            $('#fechaAuditoria').prop('disabled', false);
                        }

                    } else if (x == 'fecha_atp') {
                        $('#fechaAuditoria').val(json.data[x].trim());
                    }
                }
                $('#btnUpdateData').attr('crlupdate', numeroRenglon);
                $('#modalUpdateData').modal('show');
            } else {

                $('#btnOk').hide();
                $('#btnInt').show();
                $('#msjResponseCalif').css('color', 'red');
                $('#msjResponseCalif').html('Fallo al consultar detalles');
                $('#myModalRespCalif').modal('show');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlService);
    r.data = {
        action: actionParams,
        idPadron: idPa,
        user: usr
    };
    $.ajax(r);
}


function updateRows(actionParams, datosp, usr, no_renglon) {
    var r = {
        success: function(json, estatus) {
            console.log(json);
            var b = false;
            for (var x in json.response) {
                if (x == "sucessfull") {
                    b = json.response[x];
                }
            }

            if (b) {
                var types = JSON.parse(datosp);
                for (var reg in types) {
                    for (var col in types[reg]) {
                        for (var aux in types[reg][col]) {
                            if (aux == 'nombre') {
                                var celda = document.getElementById('reng' + no_renglon + '2');
                                celda.innerHTML = types[reg][col][aux].toUpperCase();
                            } else if (aux == 'razonSocial') {
                                var celda = document.getElementById('reng' + no_renglon + '3');
                                celda.innerHTML = types[reg][col][aux].toUpperCase();
                            } else if (aux == 'rfc') {
                                var celda = document.getElementById('reng' + no_renglon + '4');
                                celda.innerHTML = types[reg][col][aux].toUpperCase();
                            } else if (aux == 'rnf') {
                                var celda = document.getElementById('reng' + no_renglon + '5');
                                celda.innerHTML = types[reg][col][aux].toUpperCase();
                            } else if (aux == 'tipo') {
                                var celda = document.getElementById('reng' + no_renglon + '6');
                                celda.innerHTML = types[reg][col][aux].toUpperCase();
                            } else if (aux == 'fechaAlta') {
                                var celda = document.getElementById('reng' + no_renglon + '7');
                                celda.innerHTML = types[reg][col][aux].toUpperCase();
                            }
                        }

                    }
                }
                $('#btnOk').show();
                $('#btnInt').hide();
                $('#msjResponseCalif').css('color', 'green');
                $('#msjResponseCalif').html('Registro actualizado');
                $('#myModalRespCalif').modal('show');
            } else {
                $('#btnOk').hide();
                $('#btnInt').show();
                $('#msjResponseCalif').css('color', 'red');
                $('#msjResponseCalif').html('No se actualizo registro');
                $('#myModalRespCalif').modal('show');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlService);
    r.data = {
        action: actionParams,
        datos: datosp,
        user: usr
    };
    $.ajax(r);
}

function getCatalog(idC, opcion, idCombo, usuario) {

    var r = {
        success: function(json, estatus) {
            console.log(json);
            $('#btnOk').hide();
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

/************************************************************************
 ******************* Inicio codigo de validaciones ***********************
 *************************************************************************/

//Validacion de formulario de actualizacion

$('#dataFormUpdate').validate({
    errorElement: 'span',
    wrapper: 'label',
    rules: {
        padron: {
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
        fechaAuditoriaName: {
            required: {
                depends: function(el) {
                    if ($("#solicitudAuditoria").val() == "true") {
                        return true
                    } else {
                        return false
                    }
                }
            },
            fecha: {
                depends: function(el) {
                    if ($("#solicitudAuditoria").val() == "true") {
                        return true
                    } else {
                        return false
                    }
                }
            }

        }

    },
    messages: {
        padron: {
            required: "Campo obligario",
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
        fechaAuditoriaName: {
            //empty: "Campo obligario. Ingrese fecha",
            required: "Campo obligario. Ingrese fecha ",
            fecha: "Fecha no valida. Formato DD/MM/AAAA"
        }
    },

    submitHandler: function(form) {
        var objJsonDatos = {
            'datos': []
        };

        objJsonDatos.datos.push({
            idPadron: $('#padron').val().trim().toUpperCase(),
            nombre: $('#nombre').val().trim().toUpperCase(),
            razonSocial: $('#razonSocial').val().trim().toUpperCase(),
            rfc: $('#rfc').val().trim().toUpperCase(),
            rnf: $('#rnf').val().trim().toUpperCase(),
            calle: $('#calle').val().trim().toUpperCase(),
            noExterior: $('#noExterior').val().trim().toUpperCase(),
            noInterior: $('#noInterior').val().trim().toUpperCase(),
            colonia: $('#colonia').val().trim().toUpperCase(),
            localidad: $('#Sloc option:selected').text().trim().toUpperCase(),
            municipio: $('#Smuni option:selected').text().trim().toUpperCase(),
            telefono: $('#telefono').val().trim().toUpperCase(),
            correo: $('#correo').val().trim().toUpperCase(),
            latitud: $('#latitud').val().trim().toUpperCase(),
            longitud: $('#longitud').val().trim().toUpperCase(),
            tipo: $('#tipo').val().trim().toUpperCase(),
            actividad: $('#actividad').val().trim().toUpperCase(),
            fechaAlta: $('#fechaAlta').val().toUpperCase(),
            observaciones: $('#observaciones').val().trim().toUpperCase(),
            cve_localidad: $('#Sloc').val().trim().toUpperCase(),
            cve_reg: $('#Sregion').val().trim().toUpperCase(),
            cve_mpio: $('#Smuni').val().trim().toUpperCase(),
            atp: $('#solicitudAuditoria').val().trim().toUpperCase(),
            fecha_atp: $('#fechaAuditoria').val().trim().toUpperCase()

        });

        updateRows('updateRegistro',
            JSON.stringify(objJsonDatos),
            amplify.store('dataLoggingProbosque').id,
            $('#btnUpdateData').attr('crlupdate')
        );
        return false;
    }
});

// Fin de validacion formulario de actualización.
// Inicia validacion formulario
$("#formFindRegistro").validate({
    errorElement: 'span',
    wrapper: 'label',
    rules: {
        inputTextFind: {
            required: {
                depends: function(el) {
                    if ($("#selectOptionFind").val() == "ATP") {
                        return false
                    } else {
                        return true
                    }
                }
            },
            empty: true,
            caracterEspecial: true

        },
        opcionFindSelect: {
            valueNotEquals: "-1"

        }

    },
    messages: {
        inputTextFind: {
            required: "Ingrese texto de busqueda"
        },
        opcionFindSelect: {
            valueNotEquals: "Elija una opción"
        }
    },

    submitHandler: function(form) {
        let textoBusqueda;
         if ($("#selectOptionFind").val() == "ATP") {
            textoBusqueda =  $("#selectATP").val();
         }else{
            textoBusqueda =  $('#inputTextFindTxt').val().trim();
         } 
        findRows('getBusqueda', $('#selectOptionFind').val(),textoBusqueda , amplify.store('dataLoggingProbosque').id);
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

//Fin validaciones de formulario de busqueda
