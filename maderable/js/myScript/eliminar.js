$(document).ready(function() {

});

/************************************************************************
 ******************* Eventos de la aplicación web  ***********************
 *************************************************************************/

$('#BtnDeletePadron').on('click', function() {
    deleteRow('deleteReg', $('#padronAuxIndustria').val().trim(), amplify.store('dataLoggingProbosque').id, $(this).attr('del'));
});

$('#btnOk').on('click', function() {
    $('#deleteRegistro').modal('hide');
    $('#myModalRespCalif').modal('hide');
});

$('#selectOptionFind').change(function() {
    if ($(this).val() == 'FECHA DE ALTA' || $(this).val() == 'FECHA DE AUDITORIA') {
        $('#inputTextFindTxt').show();
        $('#selectATP').hide();
        $('#inputTextFindTxt').val('');
        loadCalendario();
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


function deleteRegistro(parametro) {
    $('#BtnDeletePadron').attr('del', $(parametro).attr('ren'));
    $('#padronAuxIndustria').val($(parametro).attr('idPa'));
    $('#msjDelete').html('¿Esta seguro que desea eliminar el registro <b>' + $(parametro).attr('idPa') + '</b> ?');
    $('#deleteRegistro').modal('show');
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

    $('#inputTextFindTxt').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        drops: 'down',
        locale: format_es

    }, function(e) {});


}



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
                        fila.setAttribute('id', 'rengTableDelete' + renglon);
                        var idPadron;
                        for (var aux in json.data[tmp]) {
                            if (aux == "fecha_alta") {
                                fila.insertCell(-1).innerHTML = json.data[tmp][aux];
                            } else if (aux == "id_padron_industria") {
                                idPadron = json.data[tmp][aux];
                                fila.insertCell(-1).innerHTML = json.data[tmp][aux];
                            } else if (aux == "nombre") {
                                fila.insertCell(-1).innerHTML = json.data[tmp][aux];
                            } else if (aux == "razon_social") {
                                fila.insertCell(-1).innerHTML = json.data[tmp][aux];
                            } else if (aux == "rfc") {
                                fila.insertCell(-1).innerHTML = json.data[tmp][aux];
                            } else if (aux == "rnf") {
                                fila.insertCell(-1).innerHTML = json.data[tmp][aux];
                            } else if (aux == "tipo") {
                                fila.insertCell(-1).innerHTML = json.data[tmp][aux];
                            }

                        }
                        fila.insertCell(-1).innerHTML = '<button ren="' + renglon + '" class="btn btn-danger" idPa="' + idPadron + '" onclick="deleteRegistro(this)">ELIMINAR</button>';

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


function deleteRow(actionParams, idPadronParams, usr, renglon) {
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

                $('#rengTableDelete' + renglon).remove();
                if ($('#tablaDatosBusqueda > tr').length == 0) {
                    $('#tablaDatosBusqueda').append('<tr><td colspan="8" align="center">Realice una búsqueda</td></tr>');
                }
                $('#btnOk').show();
                $('#btnInt').hide();
                $('#msjResponseCalif').css('color', 'green');
                $('#msjResponseCalif').html('Registro eliminado');
                $('#myModalRespCalif').modal('show');
            } else {
                $('#btnOk').hide();
                $('#btnInt').show();
                $('#msjResponseCalif').css('color', 'red');
                $('#msjResponseCalif').html('No se elimino registro');
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
        idPadron: idPadronParams,
        user: usr
    };
    $.ajax(r);
}


/************************************************************************
 ******************* Inicio codigo de validaciones ***********************
 *************************************************************************/

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
        findRows('getBusqueda', $('#selectOptionFind').val().trim(),textoBusqueda, amplify.store('dataLoggingProbosque').id);
        return false;
    }
});


jQuery.validator.addMethod("valueNotEquals", function(value, element, arg) {
    return arg != value;
}, "Seleccione una opción");

jQuery.validator.addMethod("caracterEspecial",
    function(value, element) {
        return /^[A-Za-z\d\s@_.,:ÑñáéíóúÁÉÍÓÚ/-]*$/.test(value);
    },
    "Nada de caracteres especiales, por favor"
);


jQuery.validator.addMethod("empty",
    function(value, element) {
        return !/^\s*$/.test(value);
    },
    "Se requiere dato"
);

//Fin validaciones de formulario de busqueda