    $(document).on('ready', function() {
        loadTableSeguimiento('getSeguimiento', amplify.store('dataLoggingProbosque').id);



    });

/***************************************************************************
                            eventos del programa
***************************************************************************/
  $('#btnImpugancionAcept').on('click', function() {
      var contador = 0;
      var estatus='';
      $('#btnImpugancionAcept').attr('estatus','');
      $("#listOptionImpug input").each(function() {
          if ($(this).attr('type') == 'checkbox') {
              if ($(this).is(':checked')) {
                  if(contador > 0){
                    estatus+=',';
                  }
                  estatus+=$(this).attr('name');
                  contador++;
                  
              }
          }
      });
      
      if (contador > 0){
        $('#btnImpugancionAcept').attr('estatus',estatus);
        sendImpugancion('impugnar', amplify.store('dataLoggingProbosque').id,$(this).attr('no_exp'), $(this).attr('estatus'), $(this).attr('fila'));

      }else{
        $('#errorImpugancion').html('Elija una opción');
      }

  });

  $('.checkListImpuga').on('click', function(){
    $('#errorImpugancion').html('');
  });

//NEW CODE


    function finishProceso(e){
      $('#btn-confirmacion-Ok').attr('fila',$(e).attr('fila').trim());
      $('#btn-confirmacion-Ok').attr('expediente',$(e).attr('expediente'));
      modalConfirmacion('¿Está seguro de terminar el proceso del expediente: '+$(e).attr('expediente')+'?'+
                        '<br>AL ACEPTAR SE HARÁ PÚBLICO EL ESTATUS EN EL PROGRAMA DE MADERA LEGAL', '', 4);
    }

    function modalConfirmacion(mensajeConfirmacion, valores, option){
        $('#msjConfirmacion').html('');
        $('#errorAgregaObs').html('');
        $('#msjConfirmacion').html(mensajeConfirmacion);
        $('#btn-confirmacion-Ok').attr({'estatus':''+valores+'','option':option});
        $('#confirmacion').modal('show');
    }


    function sendStatus(e){
        switch($(e).attr('option')){
            case '4':
                sendFinishprocess('terminarProceso',$(e).attr('expediente'),amplify.store('dataLoggingProbosque').id,$(e).attr('fila'));
            break;
            default:
        }
    }

    var showErrorCalif = function(msj, texto) {
        $('#divmodalerror').html('');
        $('#divmodalerror').html(modalError(msj, texto));
        $('#myModalRespError').modal('show');
    }

//FIN NEW CODE

/***************************************************************************
                            f(x) del programa
***************************************************************************/
    function drawTablePlugin(tabla) {
    $("#" + tabla).DataTable({
        scrollX: true,
        scrollY: '50vh',
        sort: false,
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


function showObservacionesHistorial(obs){
    getObservaciones('getObservaciones', amplify.store('dataLoggingProbosque').id, $(obs).attr('no_exp'));
}

function showModalImpugancion(impugnar){
    $('.checkListImpuga').prop('checked',false);
    $('#btnImpugancionAcept').attr('fila','');
    $('#btnImpugancionAcept').attr('no_exp','');
    $('#msjConfirmarImpugnaciones').html('');
    $('#btnImpugancionAcept').attr('no_exp',$(impugnar).attr('no_exp').trim());
    $('#btnImpugancionAcept').attr('fila',$(impugnar).attr('fila').trim());
    $('#msjConfirmarImpugnaciones').html('¿Esta seguro de impugnar el expediente: '+ $(impugnar).attr('no_exp') +' ?');
    $('#modalImpugnaciones').modal('show');
}

function printTableObservaciones(json, id) {
        $('#' + id).empty();
        var cuerpoTabla = document.getElementById(id);
        if (json.data.length > 0) {
           
            for (var aux in json.data) {
                var fila = cuerpoTabla.insertRow();
                var abogado='';
                var fecha = '';
                var obse = '';
                for (var tmp in json.data[aux]) {
                    if (tmp == "fecha") {
                      fecha =  json.data[aux][tmp];
                      fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                    } else if (tmp == "observacion") {
                        obse = json.data[aux][tmp];
                    } else if (tmp == "user") {
                        abogado = json.data[aux][tmp];
                        fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                    }

                }

                fila.insertCell(-1).innerHTML = '<button fecha="'+fecha+'" abo="'+abogado+'" obs="'+obse+'" class="btn btn-default" onclick="showModalDetalleObs(this)">Ver detalles</button>';
                    
               

            }
        } else {
            var fila = cuerpoTabla.insertRow();
            var columna = fila.insertCell(-1);
            columna.setAttribute("colspan", "4");
            columna.setAttribute("align", "center");
            columna.innerHTML = 'No hay observaciones registradas';
        }
    }

    function showModalDetalleObs(e) {
        $('#inputTextFecha').val('');
        $('#inputTextAbogado').val('');
        $('#inputTextArea').val('');

        $('#inputTextFecha').val($(e).attr('fecha'));
        $('#inputTextAbogado').val($(e).attr('abo'));
        $('#inputTextArea').val($(e).attr('obs'));

        $('#modalDetalleObservacion').modal('show');
    }

    var modalSucessModalSeguimiento = function(mensaje, btnText) {
        var modal =
            '<div class="modal fade" id="myModalRespError" role="dialog" data-backdrop="static" data-keyboard="false">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-body">' +
            '<center>' +
            '<h4 style="color: green"><b>' + mensaje + '</b></h4>' +
            '<br>' +
            '<button type="button" class="btn btn-success"  data-dismiss="modal" id="btn-addOk">' + btnText + '</button>' +
            '</center>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return modal;
    }

    var showSucessSeguimiento = function(msj, texto) {
        $('#divmodalerror').html('');
        $('#divmodalerror').html(modalSucessModalSeguimiento(msj, texto));
        $('#myModalRespError').modal('show');
    }




    /******************************************************************
                            Peticiones
    ******************************************************************/
    function loadTableSeguimiento (action , user){
        var r = {
        success: function(json) {
            console.log(json);
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                if (json.data.length > 0) {
                  $("#tablaBodySeguimiento").empty();
                  var cuerpoTabla = document.getElementById("tablaBodySeguimiento");
                  var numeroFila=0;
                      for(var aux in json.data){
                        var expedienteTmp='';
                        var banderaTerminar=false;
                        var color='';
                        var fila = cuerpoTabla.insertRow();
                        var terminado = '';
                        numeroFila++;
                        fila.setAttribute('id','renglonTablaImpugna'+numeroFila);
                        for (var x in json.data[aux]){
                            if(x == 'abogado'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x];   
                            }else if(x == 'cantidad'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x];
                            }else if(x == 'fecha_conclusion'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x];
                            }else if(x == 'inspeccionado'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x];
                            }else if(x == 'no_expediente'){
                                expedienteTmp =  json.data[aux][x];
                                fila.insertCell(-1).innerHTML = json.data[aux][x];
                            }else if(x == 'resolucion_admin'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x];
                            }else if(x == 'sancion'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x];
                                if(json.data[aux][x] == 'ROJO'){
                                    banderaTerminar = true;
                                    color='red';
                                }else if( json.data[aux][x] == 'VERDE'){
                                     banderaTerminar = true;
                                     color='green';
                                }else{
                                      color='black';
                                     banderaTerminar = false;
                                }
                            }else if(x == 'acta_inspeccion'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x];
                            }else if(x == 'tipo'){
                                fila.insertCell(-1).innerHTML = json.data[aux][x]; 
                            }else if(x == 'orden_inspeccion'){terminado
                                fila.insertCell(-1).innerHTML = json.data[aux][x]; 
                            }else if(x == 'terminado'){
                                 terminado = json.data[aux][x]; 
                            }


                        }
                        fila.insertCell(-1).innerHTML = '<center><button no_exp="'+expedienteTmp+'" class="btn btn-default" onclick="showObservacionesHistorial(this)">Ver</button><center>';

                        if(banderaTerminar){
                            fila.insertCell(-1).innerHTML = '<center><button no_exp="'+expedienteTmp+'" fila="'+numeroFila+'" class="btn btn-danger" onclick="showModalImpugancion(this)">Impugnar</button><center>';                 
                        }else{
                            fila.insertCell(-1).innerHTML = '';
                        }

                        if(terminado == 'TERMINADO-PUBLICADO'){
                            fila.insertCell(-1).innerHTML = 'PUBLICADO';                  
                        }else if(terminado == 'NO TERMINADO' && (color == 'red' || color == 'green')){
                            fila.insertCell(-1).innerHTML = '<center><button expediente="'+expedienteTmp+'" fila="'+numeroFila+'" type="button" class="btn btn-danger" id="btnTerminarSemaforo" onclick="finishProceso(this)">Terminar</button><center>'; 
                        }else{
                            fila.insertCell(-1).innerHTML = ''; 
                        }

                         
                         fila.setAttribute('style','color:'+color);
                      }
                      drawTablePlugin("tablaSeguimiento");
                } else {
                    $("#tablaBodySeguimiento").empty();
                    var cuerpoTabla = document.getElementById("tablaBodySeguimiento");
                    var fila = cuerpoTabla.insertRow();
                    for (var i = 0; i < 11; i++) {
                        if (i == 6) {
                            fila.insertCell(-1).innerHTML = '<center> No hay registros para mostrar</center>';
                        } else {
                            fila.insertCell(-1);
                        }
                    }

                    drawTablePlugin("tablaNoDocumentos");
                }
                
                 if(typeof json.data == 'undefined'){
                      $('#pendientesOficialiaTexto').html('Pendientes oficialia: '+ 0);
                    }else{
                      $('#pendientesOficialiaTexto').html('Pendientes oficialia: '+json.cadena);
                    }
            } else {
                showError("Error al cargar registros", "Intentar");
            }
        },
        beforeSend: function(xhr) {},
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            showError("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceCoordinador);
    r.data = { action: action, user: user };
    $.ajax(r);
    }


    function getObservaciones(action, user, expediente) {
        var r = {
            success: function(json) {
                $('#labelExpediente').html('');
                var b = false;
                for (var tmp in json.response) {
                    if (tmp == 'sucessfull') {
                        b = json.response[tmp];
                    }
                }

                if (b) {
                     $('#labelExpediente').html('Expediente: '+expediente);
                    printTableObservaciones(json, 'tbodyObservaciones');
                    $('#modalHistorialObservaciones').modal('show');

                } else {
                    showErrorCalif("No se cargo historial de observaciones", "Intentar");
                }
            },
            beforeSend: function(xhr) {},
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                showErrorCalif("Servicio no disponible", "Aceptar");
            },
            complete: function(solicitudAJAX, estatus) {}
        };
        r = $.extend(r, urlServiceCoordinador);
        r.data = { action: action, user: user, no_expediente: expediente };
        $.ajax(r);
    }



    function sendImpugancion(action, user, expediente, estatus, fila) {
        var r = {
            success: function(json) {
                console.log(json);
                
                var b = false;
                for (var tmp in json.response) {
                    if (tmp == 'sucessfull') {
                        b = json.response[tmp];
                    }
                }

                if (b) {
                    $('#tablaSeguimiento').DataTable().row('#renglonTablaImpugna'+fila).remove().draw( false );
                    if ($('#tablaBodySeguimiento > tr').length == 0) {
                            $('#tablaBodySeguimiento').append('<tr class="">'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td class="text-center">No hay registros</td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                         '</tr>');
                    }

                    $('#modalImpugnaciones').modal('hide');
                    showSucessSeguimiento('Se impugno el expediente: '+expediente, 'Aceptar');
                } else {
                    showErrorCalif("No se logro impugnar", "Intentar");
                }
            },
            beforeSend: function(xhr) {},
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                showErrorCalif("Servicio no disponible", "Aceptar");
            },
            complete: function(solicitudAJAX, estatus) {}
        };
        r = $.extend(r, urlServiceCoordinador);
        r.data = { action: action, user: user, noExpediente: expediente , estatus: estatus  };
        $.ajax(r);
    }

    function sendFinishprocess(action, expediente, user, fila) {
    var r = {
        success: function(json) {
          console.log(json);
            var b = false;
            var mensaje = '';
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                } else if (tmp == 'message') {
                    mensaje = json.response[tmp];
                }
            }

            if (b) {
                $('#tablaSeguimiento').DataTable().row('#renglonTablaImpugna'+fila).remove().draw( false );
                if ($('#tablaBodySeguimiento > tr').length == 0) {
                            $('#tablaBodySeguimiento').append('<tr class="">'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td class="text-center">No hay registros</td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                         '</tr>');
                }
                
                $('#confirmacion').modal('hide');
                showSucessSeguimiento('Termino el proceso del expediente ' +expediente, 'Aceptar');
            } else {
                showErrorCalif(mensaje, 'Aceptar');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showErrorCalif("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX) {}
    };
    r = $.extend(r, urlServiceCoordinador);
    r.data = { action: action, user: user, noExpediente: expediente};
    $.ajax(r);
}




