    $(document).on('ready', function() {

        var f = new Date();
        var m2 = f.getMonth() + 1;
        var mesok = (m2 < 10) ? '0' + m2 : m2;
        var mesok = new Array(12);
        mesok[0] = "01";
        mesok[1] = "02";
        mesok[2] = "03";
        mesok[3] = "04";
        mesok[4] = "05";
        mesok[5] = "06";
        mesok[6] = "07";
        mesok[7] = "08";
        mesok[8] = "09";
        mesok[9] = "10";
        mesok[10] = "11";
        mesok[11] = "12";
        var fecha = f.getDate() + "/" + mesok[f.getMonth()] + "/" + f.getFullYear();
        $('#anadirFecha').html(fecha);

        getConcluidas("getConcluidas", amplify.store('dataLoggingProbosque').id);

    });

    function drawTablePlugin(tabla) {
        $("#" + tabla).DataTable({
            scrollX: true,
            scrollY: '50vh',
            scrollCollapse: true,
            aLengthMenu: [
                [10, 25, 50, 75, -1],
                [10, 25, 50, 75, "Todos"]
            ],
            iDisplayLength: -1,
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se encontraron coincidencias",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No hay registros disponibles",
                "infoFiltered": "(filtrado de _MAX_ registros totales)",
                "sSearch": "Buscar: ",
                "paginate": {
                    "first": "Primera",
                    "last": "Ultima",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }

        });
    }




    /***************************************INICIO EVENTOS DE ABOGADO***********************************/
    //Codigo Ivan
    $('.chkProcess').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            $('#textAreaDecomiso').hide();
            $('#inputCantidad').hide();
            $("#enProceso").attr('checked', true).trigger('click');
            $('.chkProcess').prop("checked", false);
            $('.chkConcluido').prop('checked', false);
            $(this).prop("checked", true);
            $('#calenadrio').show();
        }
    });

    $('#enProceso').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            $('#concluido').prop('checked', false);
            $('.chkConcluido').prop('checked', false);
            $('#calenadrio').show();
        }
    });

    $('.chkConcluido').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');

            $('#concluido').prop('checked', true);
            $("#enProceso").attr('checked', false)
            $('.chkProcess').prop("checked", false);
            $('#calenadrio').hide();
        }
    });

    $('.levelOne').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            $('.levelOne, .levelTwo').prop("checked", false);
            $(this).prop("checked", true);
            $('#inputCantidad').hide();
            $('#textAreaDecomiso').hide();
            $('#calenadrio').hide();
            $('#fechaConclusion').val('');
        }
    });

    $('.levelTwo').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            //$('.levelOne').prop("checked", false);
            $('#resolucionAdministrativa').prop('checked', true);
            $('#acuArchivo,#acuDecomiso,#acuCierre').prop('checked', false);
            $('#calenadrio').hide();
            $('#fechaConclusion').val('');
        }
    });


    $('#resolucionAdministrativa').on('click', function(){
        if(!$(this).is(':checked')){
            $('.levelTwo').prop("checked", false);
            $('#inputCantidad').hide();
            $('#textAreaDecomiso').hide();
        }
    });

    $('#btnModalShowPrincipal,#iconCloseModal').on('click', function(){
         $('#modalAsignarEstatus').fadeIn();
         $('#modalAnadirObservacion').modal('hide');

    });

    $('#btnAddObservacion').on('click', function() {
        if(!isEmptyText($('#anadirObservacion').val().trim())){
            changeEstatus("changeEstatus",
                $('#anadirFecha').html(),
                $('#anadirObservacion').val(),
                $(this).attr('no_expe'),
                $(this).attr('estatus'),
                amplify.store('dataLoggingProbosque').id,
                '',
                $('#cantidadInputData').val().trim(),
                $('#textAreaDecomiso').val().trim());
             
        }else{
            $('#msjErrorObservacion').html('Ingrese una observación');
        }
    });

    $('.cantidad').on('click', function() {
        $('#cantidadInputData').val('');
        if ($(this).is(':checked')) {
            $('#inputCantidad').show();
        } else {
            $('#errorValidacion').html('');
            $('#inputCantidad').hide();
        }
    });

    $('.decomiso').on('click', function() {
        $('#textAreaDecomiso').val('');
        if ($(this).is(':checked')) {
            $('#textAreaDecomiso').show();
        } else {
            $('#errorValidacion').html('');
            $('#textAreaDecomiso').hide();
        }
    });

    function isEmptyText(text) {
        if (/^\s*$/.test(text.trim())) {
            return true;
        } else {
            return false;
        }
    }

    //Fin codigo

    function observaciones(e) {
        getObservaciones("getObservaciones", amplify.store('dataLoggingProbosque').id, $(e).attr('no_exp').trim());
    }

    function detalleObser(e) {
        $('#modalDetalleObservacion').modal('show');
        $('#detalleFecha').val($(e).attr('fecha').trim());
        $('#detalleAbogado').val($(e).attr('abogado').trim());
        $('#detalleDetalle').val($(e).attr('detalle').trim());
    }

    function asignarEstatus(e) {
        $('#formEstatus input').each(function() {
            if ($(this).attr('type') == 'checkbox') {
                $(this).prop('disabled', false);
                $(this).prop('checked', false);

            }
        });

        for (var i = 0; i < $(e).attr('estatus').split(',').length; i++) {

            switch ($(e).attr('estatus').split(',')[i]) {

                case '20':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#resolucionAdministrativa').trigger('click');
                    break;
                case '21':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#amonestacion').attr('checked', true).trigger('click');
                    break;
                case '22':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#multa').attr('checked', true).trigger('click');
                    $('#cantidadInputData').val($(e).attr('multa'));
                    break;
                case '23':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#decomiso').attr('checked', true).trigger('click');
                    $('#textAreaDecomiso').val($(e).attr('decomiso'));
                    break;
                case '24':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#renovacion').attr('checked', true).trigger('click');
                    break;
                case '25':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#clausura').attr('checked', true).trigger('click');
                    break;
                case '26':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#sinSancion').attr('checked', true).trigger('click');
                    break;
                case '27':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#acuArchivo').attr('checked', true).trigger('click');
                    break;
                case '28':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#acuCierre').attr('checked', true).trigger('click');
                    break;
                case '29':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#acuDecomiso').attr('checked', true).trigger('click');
                    $('#textAreaDecomiso').val($(e).attr('decomiso'));
                    $('#textAreaDecomiso').show();
                    break;
                case '36':
                    $("#concluido").attr('checked', true).trigger('click');
                    $('#acuReincidente').attr('checked', true).trigger('click');
                    break;

            }
        }

        $('#formEstatus input').each(function() {
            if ($(this).attr('type') == 'checkbox') {
                $(this).prop('disabled', true);
            }
        });

        $('#btnAsignarEstatus').attr('no_exp', '');
        $('#noExpedienteLabel').html('');
        $('#noExpedienteLabel').html('No. de Expediente: ' + $(e).attr('no_exp'));
        $('#btnAsignarEstatus').attr('no_exp', $(e).attr('no_exp'));
        $('#errorValidacion').html('');
        $('#modalAsignarEstatus').modal('show');
    }


   

    function modalDatos(paramAbogado, paramNumeroExpediente, paramEstatus) {
        $('#msjErrorObservacion').html('');
        $('#textoConfirmacionLabel').html('<b> ¿Está seguro de cambiar el estatus para el expediente ' + paramNumeroExpediente + ' ?</b> <br>Si esta seguro agregue una observación');
        $('#anadirObservacion').val('');
        $('#btnAddObservacion').attr({ 'no_expe': '', 'estatus': '' });
        $('#btnAddObservacion').attr({ 'no_expe': paramNumeroExpediente, 'estatus': paramEstatus });
        $('#anadirAbogado').val(paramAbogado);
        $('#modalAsignarEstatus').fadeOut(500, "swing");
        $('#modalAnadirObservacion').modal('show');
    }


    /***************************************FIN EVENTOS DE ABOGADO**************************************/

    /***************************************INICIO PETICIONES AJAX**************************************/
    function getConcluidas(action, user) {
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
                    $("#tablaBodyObservaciones").empty();
                    var cuerpoTabla = document.getElementById("tablaBodyConcluidas");
                    if (json.data.length > 0) {
                        for (var tmp in json.data) {
                            var folio = "";
                            var noExpediente = "";
                            var estatus = "";
                            var deco = "";
                            var mul = "";
                            var filaProceso = cuerpoTabla.insertRow();
                            for (var aux in json.data[tmp]) {
                                if (aux == "No_expediente") {
                                    noExpediente = json.data[tmp][aux];
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = '<a href="#" fol="' + folio + '" onclick="showPrograma8(this)">' + json.data[tmp][aux] + '</a>';
                                } else if (aux == "Fecha_recepcion_abogado") {
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = json.data[tmp][aux];
                                } else if (aux == "Folio") {
                                    folio = json.data[tmp][aux];
                                } else if (aux == "Estatus") {
                                    estatus = json.data[tmp][aux];
                                } else if (aux == "decomiso") {
                                    deco = json.data[tmp][aux];
                                } else if (aux == "multa") {
                                    mul = json.data[tmp][aux];
                                }
                            }
                            filaProceso.insertCell(-1).innerHTML = '<button class="btn btn-default btn-block" no_exp="' + noExpediente + '" onclick="observaciones(this)">Ver</button>';
                            filaProceso.insertCell(-1).innerHTML = '<button class="btn btn-default btn-block" multa="' + mul + '" decomiso="' + deco + '" no_exp="' + noExpediente + '" estatus="' + estatus + '" onclick="asignarEstatus(this)">Ver</button>';
                        }
                    } else {
                        var fila = cuerpoTabla.insertRow();
                        fila.insertCell();
                        fila.insertCell().innerHTML='<center>No se encontraron registros</center>';
                        fila.insertCell();
                        fila.insertCell();
                    }
                    drawTablePlugin('tablaListaControl');
                } else {
                    showError('Servicio no disponible. Intente nuevamente', 'Aceptar');
                }
            },
            beforeSend: function(xhr) {},
            error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
            complete: function(solicitudAJAX, estatus) {}
        };
        r = $.extend(r, urlServiceAbogado);
        r.data = {
            action: action,
            user: user
        };
        $.ajax(r);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    function getObservaciones(action, user, expediente) {
        var r = {
            success: function(json, estatus) {
                var b = false;
                for (var x in json.response) {
                    if (x == "sucessfull") {
                        b = json.response[x];
                    }
                }
                $('#idNumeroExpedienteHistorial').html('');

                if (b) {
                    $("#tablaBodyObservaciones").empty();
                    var cuerpoTablaObservaciones = document.getElementById("tablaBodyObservaciones");
                    if (json.data.length > 0) {
                        for (var tmp in json.data) {
                            var fecha = "";
                            var abogado = "";
                            var detalle = "";
                            var filaProceso = cuerpoTablaObservaciones.insertRow();
                            for (var aux in json.data[tmp]) {
                                if (aux == "fecha") {
                                    fecha = json.data[tmp][aux];
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = json.data[tmp][aux];
                                } else if (aux == "user") {
                                    abogado = json.data[tmp][aux];
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = json.data[tmp][aux];
                                } else if (aux == "observacion") {
                                    detalle = json.data[tmp][aux];
                                }
                            }
                            filaProceso.insertCell(-1).innerHTML = '<td><button class="btn btn-default btn-block" fecha="' + fecha + '" abogado="' + abogado + '" detalle="' + detalle + '"onclick="detalleObser(this)">Ver</button></td>';
                        }
                    } else {
                        var fila = cuerpoTablaObservaciones.insertRow();
                        fila.innerHTML = '<td colspan="8" align="center">No se encontraron registros</td>';
                    }
                    $('#idNumeroExpedienteHistorial').html('Numero expediente: ' + expediente);
                    $('#modalHistorialObservaciones').modal('show');
                } else {
                    showError('No se actualizo. Intente nuevamente', 'Aceptar');
                }
            },
            beforeSend: function(xhr) {},
            error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {},
            complete: function(solicitudAJAX, estatus) {}
        };
        r = $.extend(r, urlServiceAbogado);
        r.data = {
            action: action,
            user: user,
            no_expediente: expediente
        };
        $.ajax(r);
    }

    /***************************************FIN PETICIONES AJAX*****************************************/
    var modalSucessCal = function(mensaje, btnText) {
        var modal =
            '<div class="modal fade" id="modalSuccessAbogado" role="dialog" data-backdrop="static" data-keyboard="false">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-body">' +
            '<center>' +
            '<h4 style="color: green"><b>' + mensaje + '</b></h4>' +
            '<br>' +
            '<button type="button" class="btn btn-success" data-dismiss="modal" id="btn-addOk" onclick="reloadPageUpdate()">' + btnText + '</button>' +
            '</center>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return modal;
    }

    var showSucessEstatus = function(msj, texto) {
        $('#divmodalerror').html('');
        $('#divmodalerror').html(modalSucessCal(msj, texto));
        $('#modalSuccessAbogado').modal('show');
    }

    function reloadPageUpdate() {
        window.location.assign('/SIFEM/maderable/moduloAbogadoConcluidas.html');
    }
