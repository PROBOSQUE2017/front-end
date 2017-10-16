    $(document).on('ready', function() {


         loadTablaBandejaEntrada('getConcluidas', amplify.store('dataLoggingProbosque').id);


        //++++++++++++++++++ insert nuevo codigo +++++++++++++++++++++++++++++++++
       $("#fechaConclusion").datepicker({
            dateFormat: "dd-mm-yy",
            changeYear: true,
            changeMonth: true,
            showOptions: { direction: "up" },
            monthNamesShort: ["Enero", "Febrero", "Marzo",
                "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre",
                "Octubre", "Noviembre", "Diciembre"
            ]
        });


        $("#cantidadInputData").on({
            focus: function(event) {
                $(event.target).select();
            },
            keyup: function(event) {
                $(event.target).val(function(index, value) {
                    return value.replace(/\D/g, "")
                        //.replace(/([0-9])([0-9]{2})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                });
            }
        });

        $('#textAreaDecomiso').on({
            keyup: function(event) {
                if (isEmptyValidateText($(event.target).val().trim())) {
                    $('#errorValidacion').html('Seleccionó decomiso. <b>Agregue los detalles en el cuadro de texto</b>');
                } else {
                    $('#errorValidacion').html('');
                }

            }
        });

        $('#clicEditarExpediente').on('click', function(){
            asigNumExp(this);
        });
        $('#clicEditarAbogado').on('click', function(){
          asigAbogado(this);
        });
        //++++++++++++++++++ fin de nuevo codigo ++++++++++++++++++++++++++++++++++


        $('#divAbogadoTab').on('click', function() {
           $('#erorAbogado').html('');
           $('#btnAceptOficial').hide();
           $('#btnAceptSemaforo').hide();
           $('#btnAceptAbogado').show();

           $('#divOficialPartes').hide();
           $('#divSemaforoReforestemos').hide();
           $('#divObservacionesPublicas').hide();
           $('#divAmbitoAbogado').show();

           $('#divOficialiaTab').attr('class', '');
           $('#divReforestemosTab').attr('class', '');
           $(this).attr('class', 'active');
       });

       $('#divOficialiaTab').on('click', function() {
           $('#validacionError').html('');
           $('#btnAceptSemaforo').hide();
           $('#btnAceptAbogado').hide();
           $('#btnAceptOficial').show();

           
           $('#divSemaforoReforestemos').hide();
           $('#divAmbitoAbogado').hide();
           $('#divObservacionesPublicas').hide();
           $('#divOficialPartes').show();

           $('#divAbogadoTab').attr('class', '');
           $('#divReforestemosTab').attr('class', '');
           $(this).attr('class', 'active')
       });


    });

    function activarPestaniaReforestamos(){

        $('#divReforestemosTab').on('click', function() {

           $('#btnAceptOficial').hide();
           $('#btnAceptAbogado').hide();
           $('#btnAceptSemaforo').show();

           $('#divOficialPartes').hide();
           $('#divAmbitoAbogado').hide();
           $('#divSemaforoReforestemos').show();
           $('#divObservacionesPublicas').show();

           $('#divAbogadoTab').attr('class', '');
           $('#divOficialiaTab').attr('class', '');
           $(this).attr('class', 'active');
       });

    }

    /*
    function reloadPage(){
       window.location.assign('/SIFEM/maderable/Bandeja.html');
    }
    */

    function isEmptyValidateText(text) {
        if (/^\s*$/.test(text.trim())) {
            return true;
        } else {
            return false;
        }
    }

    function tieneAbogado(text) {
        if (/^\s*$/.test(text.trim())) {
            return 'Aún no se asigna abogado';
        } else {
            return text;
        }
    }

    function IsDate(D) {  
        if (!/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(D)) {
            return false;
        } else {
            return true;
        }
    }


    function ctrlCheckBoxAbogado(e){
        $('#erorAbogado').html('');

        $('#btn-confirmacion-Ok').attr('expediente',$(e).attr('expediente'));
        $('#btn-confirmacion-Ok').attr('fecha_conclusion',$('#fechaConclusion').val().trim());
        $('#btn-confirmacion-Ok').attr('decomiso',$('#textAreaDecomiso').val().trim());
        $('#btn-confirmacion-Ok').attr('multa',$('#cantidadInputData').val().trim());
        if($('#radioProceso').is(':checked')){
             var tmpcontador = 0;
            $("#divAmbitoAbogado input").each(function() {
                if ($(this).attr('type') == 'checkbox') {
                      if($(this).is(':checked')){
                        tmpcontador ++;
                        return false;
                      }
                }
            });

            if(tmpcontador > 0){
                if (!isEmptyValidateText($('#fechaConclusion').val())) {
                    if (IsDate($('#fechaConclusion').val())) {
                         //Enviar
                         $('#addObservaciones').val('');
                         $('#addObservaciones').show();
                         modalConfirmacion('¿Está seguro de asignar <u>'+selectTextoAbogado('#divProceso input','#divConcluido input')+'</u> como estatus ?', 
                          arrayElementSeletedName('#divProceso input','#divConcluido input'),2,$(e).attr('tabla'),$(e).attr('fila'));
                    } else {
                        $('#erorAbogado').html('Fecha invalida. Formato: <b>DD-MM-AAAA</b>');
                    }
                } else {
                    $('#erorAbogado').html('Ingrese fecha de  conclusion');
                }
            }else{
                $('#erorAbogado').html('Seleccione una opción <b>En proceso</b>');
            }

        }else if($('#radioConcluido').is(':checked')){
            var contador = 0;
            $("#divConcluido input").each(function() {
                if ($(this).attr('type') == 'checkbox') {
                      if($(this).is(':checked') && $(this).attr('class') == 'chk20'){
                            $("#listaResolucion input").each(function() {
                                 if ($(this).attr('type') == 'checkbox') {
                                        if($(this).is(':checked')){
                                            contador++;
                                            return false;
                                        }
                                 }
                            });
                            if(contador == 0){
                                contador = -1;
                            }
                            return false;                    
                       }else if($(this).is(':checked')){
                            switch($(this).attr('class')){
                                case 'chk27':
                                case 'chk28':
                                case 'chk29':
                                contador ++;
                                return false;
                                break;
                            }
                       }
                }
            });


            if(contador == 1){
                if($('#chkmultaId').is(':checked')){
                      if(isEmptyValidateText($('#cantidadInputData').val())){
                        contador = -3;
                      }else{
                          if($('#chkdecoId').is(':checked')){
                               if(isEmptyValidateText($('#textAreaDecomiso').val())){
                                  contador = -2;
                                }else{
                                   contador = 1; 
                                }
                          }else{
                            contador = 1; 
                          }
                      }
                }else if($('#chkdecoId').is(':checked')){
                     if(isEmptyValidateText($('#textAreaDecomiso').val())){
                        contador = -2;
                      }else{
                        contador = 1; 
                     }
                }else if($('.chk29').is(':checked')){
                    if(isEmptyValidateText($('#textAreaDecomiso').val())){
                        contador = -4;
                      }else{
                        contador = 1; 
                     }
                }
            }
            if(contador == -4){
                $('#erorAbogado').html('Ingrese <b> el detalle del Acuerdo de archivo y decomiso</b>');
            }else if(contador == -3){
                $('#erorAbogado').html('Ingrese el monto<b> de la multa</b>');
            }else if(contador == -2){
                $('#erorAbogado').html('Ingrese <b> el detalle del decomiso</b>');
            }else if(contador == -1){
                $('#erorAbogado').html('Seleccione las opciones de <b>Resolución administrativa</b>');
            }else if(contador == 0){
                 $('#erorAbogado').html('Seleccione opcion de <b>Concluido</b>');
            }else if(contador > 0){
                 $('#addObservaciones').val('');
                 $('#addObservaciones').show();
                 modalConfirmacion('¿Está seguro de asignar '+selectTextoAbogado('#divProceso input','#divConcluido input')+' como estatus ?',
                 arrayElementSeletedName('#divProceso input','#divConcluido input'),2,$(e).attr('tabla'),$(e).attr('fila'));
            }
        }else{
              $('#erorAbogado').html('Seleccione el estatus');
        }
        
    }

    function showModalStatus(e) {
        //Establece los valores por defect
        //Reseta los formularios
        $("#divReforestemosTab").off('click');
        $('#btnCancelarSalir').html('Cancelar');
        $('#textImpugnacion').html('');
        $('#haSemaforo').html('Semaforización programa madera legal');
        $('#haSemaforo').css('color','');
        $('#textoNumeroExpediente').html('Expediente: ' + $(e).attr('expediente'));
        $('#clicEditarExpediente').attr({'expediente':$(e).attr('expediente'),'fila':$(e).attr('fila'),'tabla':$(e).attr('tabla'),'folio':$(e).attr('folio')});
        $('#clicEditarAbogado').attr({'filaUpdate':$(e).attr('fila'),'tabla':$(e).attr('tabla'),'expediente':$(e).attr('expediente')});
        $('#textoAbogadoAsignado').html('Abogado: '+ tieneAbogado($(e).attr('abo')));
        $('#erorAbogado').html('');
        $('#validacionError').html('');
        $('#fechaConclusion').val('');
        $('#calenadrio').show();

        $('#cantidadInputData').val('');
        $('#cantidadInputData').hide();
        $('#inputCantidad').hide();

        $('#textAreaDecomiso').val('');
        $('#textAreaDecomiso').hide();

        $('#observacionPublica').val('');

        $('#errorSemaforo').html('');
        $('#btn-confirmacion-Ok').attr('expediente', '');
        $('#btn-confirmacion-Ok').attr('fecha_conclusion', '');
        $('#btn-confirmacion-Ok').attr('decomiso', '');
        $('#btn-confirmacion-Ok').attr('multa', '');

        $('#btnAceptOficial,#btnAceptSemaforo,#btnAceptAbogado').attr({
        	'expediente':$(e).attr('expediente'),
        	'fila':$(e).attr('fila'),
        	'tabla':$(e).attr('tabla')

    	});

        $('#formularioSemaforo').trigger('reset');
        $('#formularioAbogado').trigger('reset');
        $('#formularioOficialia').trigger('reset');

        $("#radioConcluido").attr('checked', false);
 		$("#radioConcluido").attr('checked', false);



        var ambito = '';
        var mostrarCalendario = false;
        var semaforo= false;
        var impugnar='';

        for (var i = 0; i < $(e).attr('estatus_oficialia').split(',').length; i++) {

            switch ($(e).attr('estatus_oficialia').split(',')[i]) {
                //Estatus oficialia
                case '1':
                   $('#check1').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                case '2':
                    $('#check2').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                case '3':
                    $('#check3').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                case '4':
                    $('#check4').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                case '5':
                    $('#check5').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                case '6':
                    $('#check6').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                 case '7':
                    $('#check7').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                case '8':
                    $('#check8').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                case '9':
                    $('#check9').prop('checked',true);
                    ambito = 'Oficialia';
                    break;
                }
        } 

        for (var i = 0; i < $(e).attr('estatus').split(',').length; i++) {

            switch ($(e).attr('estatus').split(',')[i]) {
                //Estatus del abogado
                case '10':
                    $("#radioProceso").prop('checked', true);
                    $('.chk10').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '11':
                    $("#radioProceso").prop('checked', true);
                    $('.chk11').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '12':
                    $("#radioProceso").prop('checked', true);
                    $('.chk12').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '13':
                    $("#radioProceso").prop('checked', true);
                    $('.chk13').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '14':
                    $("#radioProceso").prop('checked', true);
                    $('.chk14').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '15':
                    $("#radioProceso").prop('checked', true);
                    $('.chk15').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                 case '16':
                    $("#radioProceso").prop('checked', true);
                    $('.chk16').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '17':
                    $("#radioProceso").prop('checked', true);
                    $('.chk17').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '18':
                    $("#radioProceso").prop('checked', true);
                    $('.chk18').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;
                case '19':
                    $("#radioProceso").prop('checked', true);
                    $('.chk19').prop('checked',true);
                    ambito = 'abogado';
                    mostrarCalendario = true;
                    break;

                case '20':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk20').prop('checked',true);
                    ambito = 'abogado';
                    break;
                case '21':
                    $("#radioConcluido").attr('checked', true);
                    $('.chk21').prop('checked',true);
                    ambito = 'abogado';
                    break;
                case '22':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk22').prop('checked',true);
                    $('#cantidadInputData').val($(e).attr('multa'));
                    $('#cantidadInputData').show();
                    $('#inputCantidad').show();
                    ambito = 'abogado';
                    break;
                case '23':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk23').prop('checked',true);
                    $('#textAreaDecomiso').val($(e).attr('decomiso'));
                    $('#textAreaDecomiso').show();
                    ambito = 'abogado';
                    break;
                case '24':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk24').prop('checked',true);
                    ambito = 'abogado';
                    break;
                case '25':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk25').prop('checked',true);
                    ambito = 'abogado';
                    break;
                 case '26':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk26').prop('checked',true);
                    ambito = 'abogado';
                    break;
                case '27':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk27').prop('checked',true);
                    ambito = 'abogado';
                    break;
                case '28':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk28').prop('checked',true);
                    ambito = 'abogado';
                    break;
                case '29':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk29').prop('checked',true);
                    $('#textAreaDecomiso').val($(e).attr('decomiso'));
                    $('#textAreaDecomiso').show();
                    ambito = 'abogado';
                    break;
                case '36':
                    $("#radioConcluido").prop('checked', true);
                    $('.chk36').prop('checked',true);
                    ambito = 'abogado';
                    break;
                 case '37':
                     impugnar += '-Recurso de revisión ';
                    break;
                case '38':
                     impugnar += '-Juicio de nulidad ';
                    break;
                case '41':
                    impugnar += '-Conmutación ';
                    break;
                default:

            }
        }

        if(mostrarCalendario){
           $('#fechaConclusion').val($(e).attr('fecha_con'));
           $('#calenadrio').show();
        }

        if(ambito == '' || ambito == 'Oficialia'){
            $('#divOficialiaTab').trigger('click');          
        }else if(ambito == 'abogado'){
            $('#divAbogadoTab').trigger('click');
            if($("#radioConcluido").is(':checked')){
            	 activarPestaniaReforestamos();
            }
           
        }else if(ambito == 'reforestemos'){
           $('#divReforestemosTab').trigger('click');
        }


        //Si hay semaforo reforestamos
        if(!isEmptyValidateText($(e).attr('sem'))){
          
          for (var j = 0; j < $(e).attr('sem').split(',').length; j++) {
          switch ($(e).attr('sem').split(',')[j]) {
                case '30':
                    $('.chkx30').prop('checked', true);
                    semaforo= true;
                    $('#haSemaforo').css('color','red');
                    break;
                case '31':
                    $('.chkx31').prop('checked', true);
                    semaforo= true;
                    $('#haSemaforo').css('color','red');
                    break;
                case '32':
                    $('.chkx32').prop('checked', true);
                    semaforo= true;
                    $('#haSemaforo').css('color','red');
                    break;
                case '33':
                    $('.chkx33').prop('checked', true);
                    semaforo= true;
                    $('#haSemaforo').css('color','red');
                    break;
                case '34':
                    $('.chkx34').prop('checked', true);
                    semaforo= true;
                    $('#haSemaforo').css('color','red');
                    break;
                case '35':
                    $('.chkx35').prop('checked', true);
                    semaforo= true;
                    $('#haSemaforo').css('color','red');
                    break;
                case '39':
                    $('.chkx39').prop('checked', true);
                    semaforo= true;
                     $('#haSemaforo').css('color', 'green');
                    break;
                case '40':
                    $('.chkx40').prop('checked', true);
                    $('#haSemaforo').css('color','green');
                    semaforo= true;
                    break;
                default:
            }
        }
        }

        if(!isEmptyValidateText(impugnar)){
             $('#textImpugnacion').html('<b>El expediente tiene estatus impugnacion: </b>'+impugnar);
        }
       

        if(semaforo){
          $('#haSemaforo').html('* Semaforización programa madera legal');
        } 
        if(!isEmptyValidateText($(e).attr('obspublic'))){
          $('#observacionPublica').val($(e).attr('obspublic'));
        }

        if(!isEmptyValidateText($(e).attr('fecha_con'))){
          $('#fechaConclusion').val($(e).attr('fecha_con'));
        }

        
        //Muestra el modal
        $('#modalAsignarEstatus').modal('show');
    }


    function showModalObservaciones(e){

        getObservaciones('getObservaciones', amplify.store('dataLoggingProbosque').id ,  $(e).attr('expediente'));
       
    }



    function sendStatus(e){
        switch($(e).attr('option')){
            case '1':
              sendStatusAjax('setEstatus', amplify.store('dataLoggingProbosque').id , $(e).attr('expediente'), $(e).attr('estatus'),$(e).attr('tabla'),$(e).attr('fila') );
            break;
            case '2':  
               if(!isEmptyValidateText($('#addObservaciones').val())){
               		var aux='';
               		if($('#radioConcluido').is(':checked')){
               			aux = 'concluido';
               		}else if($('#radioProceso').is(':checked')){
               			aux = 'proceso'
               		}

	                 sendStatusAjaxAbogado('changeEstatus', amplify.store('dataLoggingProbosque').id, 
	                                            $(e).attr('expediente'), $(e).attr('estatus'), 
	                                            $('#addObservaciones').val().trim(), $(e).attr('fecha_conclusion'),
	                                            $(e).attr('multa'), $(e).attr('decomiso'),$(e).attr('tabla'),$(e).attr('fila'),aux);
               }else{
                  $('#errorAgregaObs').html('Añade observaciones');
               }
            break;
            case '3':
               sendStatusAjaxcoordinador('estatusReforestacion', amplify.store('dataLoggingProbosque').id, 
                                           $(e).attr('expediente'), $(e).attr('estatus'), $('#observacionPublica').val().trim(),
                                           $(e).attr('tabla'),$(e).attr('fila'));
            break;
            default:
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


    var modalSucessCal = function(mensaje, btnText) {
        var modal =
            '<div class="modal fade" id="myModalRespError" role="dialog" data-backdrop="static" data-keyboard="false">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-body">' +
            '<center>' +
            '<h4 style="color: green"><b>' + mensaje + '</b></h4>' +
            '<br>' +
            '<button type="button" class="btn btn-success" data-dismiss="modal" id="btn-addOk">' + btnText + '</button>' +
            '</center>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return modal;
    }




    var showSucessCalif = function(msj, texto) {
        $('#divmodalerror').html('');
        $('#divmodalerror').html(modalSucessCal(msj, texto));
        $('#myModalRespError').modal('show');
    }


    var showErrorCalif = function(msj, texto) {
        $('#divmodalerror').html('');
        $('#divmodalerror').html(modalError(msj, texto));
        $('#myModalRespError').modal('show');
    }


function selectCheckTexto(form) {
    var texto = '';
    var contador= 0;
    $(form).each(function() {

        if ($(this).is(':checked')) {

            if(contador == 2){
                texto += ': ';
            }else if(contador > 2){
                 switch($(this).attr('id')){
                    case 'check5':
                    case 'check6':
                    case 'check8':
                    case 'check9':
                     texto += ' ';
                    break;
                    default:
                        texto += ', ';
                 }
                
            }
            texto += $(this).val();
        }

        contador++;

    });

    return texto;
}


function selectTextoAbogado (p, c){
    var texto = '';
    if($('#radioProceso').is(':checked')){
      texto += 'En proceso: ';
        $(p).each(function() {
            if($(this).is(':checked')){
                texto += $(this).val();
            }
        });

        return texto;
    }else if($('#radioConcluido').is(':checked')){
        texto+= 'Concluido: ';
        $(c).each(function() {

              if($(this).is(':checked')){
                  switch($(this).attr('class')){
                    case 'chk27':
                    case 'chk28':
                    case 'chk29':
                         texto += $(this).val();
                    break;

                    case 'chk20':
                        texto += $(this).val() +' > ';
                        texto += arrayElementSeletedTexto('#listaResolucion input');
                    break;
                  }
              }
        });

        return texto;
    }

}


function arrayElementSeleted(form) {
    var texto='';
    var contador=0;
    $(form).each(function() {
        if ($(this).is(':checked')) {
            if(contador > 1){
                texto += ',';
            }
            texto += $(this).attr('id');
        }
        contador++;   
    });

    return texto;
}

function arrayElementSeletedName(form, form2) {
    var texto='';
    var contador=0;
    if($('#radioProceso').is(':checked')){
          $(form).each(function() {
              if ($(this).is(':checked')) {
                  texto += $(this).attr('name');
              }
              contador++;   
          });

          return texto;
    }else if($('#radioConcluido').is(':checked')){
        $(form2).each(function() {
              if ($(this).is(':checked')) {
                  if(contador > 0){
                      texto += ',';
                  }
                  texto += $(this).attr('name');
                  contador++;   
              }
             
        });

        return texto;
    }
}

function arrayElementSelectedNameSem(form) {
    var texto = '';
    var contador = 0;

    $(form).each(function() {
        if ($(this).is(':checked')) {
            if (contador > 0) {
                texto += ',';
            }
            texto += $(this).attr('name');
            contador++;
        }

    });

    return texto;
}


function arrayElementSeletedTexto(form) {
    var texto=' ';
    var contador=0;
    $(form).each(function() {
        if ($(this).is(':checked')) {
            if(contador > 0){
                texto += ', ';
            }
            texto += $(this).val();
            contador++;   
        }
       
    });

    return texto;
}

function arrayElementSeletedTextoSemaforo(form) {
    var texto=' ';
    var contador=0;
    $(form).each(function() {
        if ($(this).is(':checked')) {
            if(contador > 0){
                texto += ', ';
            }
            texto += $(this).val();
            contador++;   
        }
     
    });

    return texto;
}
    
function getStatusSelected(cadena){
    var arrTmp='';
    for(var i = 0; i < cadena.split(',').length ; i++){
            arrTmp+= cadena.split(',')[i].replace('check','');
            if(i < cadena.split(',').length-1){
                 arrTmp+= ',';
            }
    }
   return arrTmp;
}

    function modalConfirmacion(mensajeConfirmacion, valores, option,tabla,fila){
        $('#msjConfirmacion').html('');
        $('#errorAgregaObs').html('');
        $('#msjConfirmacion').html(mensajeConfirmacion);
        $('#btn-confirmacion-Ok').attr({
        	'estatus':''+valores+'',
        	'option':option,
        	'tabla':tabla,
        	'fila':fila
        });
        $('#confirmacion').modal('show');
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


     function printTable(arreglo, id) {
        $('#' + id).empty();
        var cuerpoTabla = document.getElementById(id);
        if (arreglo.length > 0) {
                var Numerofila=0;
              for (var aux in arreglo) {
                var fila = cuerpoTabla.insertRow();
                var folioTmp = '';
                var noExpediente = '';
                var estatus = '';
                var mul = '';
                var fech = '';
                var deco = '';
                var observacionesPublicas='';
                var semaforo = '';
                var abogado='';
                var estatus_oficialia='';
                Numerofila++;
                for (var tmp in arreglo[aux]) {
                    if (tmp == "Folio") {
                        folioTmp = arreglo[aux][tmp];
                    } else if (tmp == "No_expediente") {
                        noExpediente = arreglo[aux][tmp];
                        var celdaExpediente =  fila.insertCell(-1);
                        celdaExpediente.innerHTML = '<a href="#" fol="' + folioTmp + '" onclick="showPrograma8(this)">' + arreglo[aux][tmp] + '</a>';
                    } else if (tmp == "usuario") {
                        var celdaUsuario =  fila.insertCell(-1);
                        abogado = arreglo[aux][tmp];
                        celdaUsuario.innerHTML = arreglo[aux][tmp];
                    }else if(tmp == "estatus"){
                        estatus = arreglo[aux][tmp];
                    }else if(tmp == "decomiso"){
                        deco = arreglo[aux][tmp];
                    }else if(tmp == "fecha_conclusion"){
                        fech = arreglo[aux][tmp];
                    }else if(tmp == "multa"){
                        mul = arreglo[aux][tmp];
                    }else if(tmp == "observaciones_publicas"){
                      observacionesPublicas = arreglo[aux][tmp];
                    }else if(tmp == "estatus_reforestacion"){
                      semaforo  = arreglo[aux][tmp];
                    }else if(tmp == "estatus_oficialia"){
                      estatus_oficialia  = arreglo[aux][tmp];
                    }

                }

                celdaUsuario.setAttribute('id','termino'+Numerofila+'2');
                celdaExpediente.setAttribute('id','termino'+Numerofila+'1');
                fila.insertCell(-1).innerHTML = '<button expediente="'+noExpediente+'" id="btnterminoObser'+Numerofila+'" onclick="showModalObservaciones(this)" class="btn btn-default btn-block">Ver</button>';
                fila.insertCell(-1).innerHTML = '<button folio="'+folioTmp+'" estatus_oficialia="'+estatus_oficialia+'" id="btntermino'+Numerofila+'" fila="'+Numerofila+'" tabla="termino" abo="'+abogado+'" obsPublic="'+observacionesPublicas+'" sem="'+semaforo+'" multa="'+mul+'" decomiso="'+deco+'" fecha_con="'+fech+'"  expediente="'+noExpediente+'" estatus="'+estatus+'" onclick="showModalStatus(this)" class="btn btn-success btn-block">Asignar</button>';
                fila.setAttribute('id','renglon'+Numerofila);

            }
        } else {
            var fila = cuerpoTabla.insertRow();
            fila.insertCell(-1).setAttribute("width", "1%");
            var columna = fila.insertCell(-1);
            columna.setAttribute("align", "center");
            columna.setAttribute("width", "97%");
            columna.innerHTML = 'No hay datos registrados';
            fila.insertCell(-1).setAttribute("width", "1%");
            fila.insertCell(-1).setAttribute("width", "1%");
        }

        drawTablePlugin('tableBandejaEntrada');
    }

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

    /**********************************************************************************
                                 Peticiones AJAX               
    ***********************************************************************************/

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

function sendStatusAjax(action, user, expediente, estatus , tabla ,fila) {
    var r = {
        success: function(json) {
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
            	$('#btnCancelarSalir').html('Cerrar');
            	$('#btn'+tabla+fila).attr('estatus_oficialia',estatus);
            	$('#confirmacion').modal('hide');
                showSucessCalif('Cambio el estatus correctamente', 'Aceptar');               
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
    r = $.extend(r, urlServiceOficial);
    r.data = { action: action, idUser: user, noExpediente: expediente , estatus: estatus};
    $.ajax(r);
}

function sendStatusAjaxAbogado(action, user, expediente, estatus, observaciones, fecha_con , multa , decomiso,tabla, fila,auxiliar) {
    var f = new Date();
    var fecha_observacion = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    var r = {
        success: function(json) {
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
            	
            	if(auxiliar == 'proceso'){
            		/*$('#haSemaforo').css('color','');
            		$('#haSemaforo').html('Semaforización programa madera legal');
            		$('#observacionPublica').val('');
            		$('#formularioSemaforo').trigger('reset');
            		$('.chkx39 , .chkx40').prop('checked',false);
	 				$('#btn'+tabla+fila).attr({
            			'multa':multa,
            			'decomiso':decomiso,
            			'estatus':estatus,
            			'fecha_con':fecha_con,
            			'sem':'',
            			'obspublic':''
            		});
            		$("#divReforestemosTab").off('click');*/
            		
                $('#tableBandejaEntrada').DataTable().row('#renglon'+fila).remove().draw( false );
            		$('#modalAsignarEstatus').modal('hide');

            	}else if(auxiliar == 'concluido'){

            		/*$('#btn'+tabla+fila).attr({
            			'multa':multa,
            			'decomiso':decomiso,
            			'fecha_con':fecha_con,
            			'estatus':estatus
            		});

            		activarPestaniaReforestamos();*/
            		$('#tableBandejaEntrada').DataTable().row('#renglon'+fila).remove().draw( false );
            		$('#modalAsignarEstatus').modal('hide');

            	}

            	$('#confirmacion').modal('hide');
                showSucessCalif('Cambio el estatus correctamente', 'Aceptar');
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
    r = $.extend(r, urlServiceAbogado);
    r.data = { 
      action: action, 
      user: user, 
      no_expediente: expediente , 
      estatus: estatus, 
      observaciones:observaciones, 
      fecha: fecha_observacion, 
      fecha_conclusion: fecha_con,
      multa: multa ,
      decomiso: decomiso
    };
    $.ajax(r);
}

function sendStatusAjaxcoordinador(action, user, expediente, estatus, observaciones,tabla, fila) {
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
            	$('#btn'+tabla+fila).attr({
            			'sem':estatus,
            			'obspublic':observaciones
            	});
            	if(estatus == '40' || estatus == '39'){
            		$('#haSemaforo').css('color','green');
            		$('#haSemaforo').html('* Semaforización programa madera legal');
            	}else{
            		$('#haSemaforo').css('color','red');
            		$('#haSemaforo').html('* Semaforización programa madera legal');
            	}
            	$('#btnCancelarSalir').html('Cerrar');
            	$('#confirmacion').modal('hide');
                showSucessCalif('Se ha asignado estatus correctamente', 'Aceptar');
            } else {
                showErrorCalif('No se actualizo el estatus', 'Intentar');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showErrorCalif("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX) {}
    };
    r = $.extend(r, urlServiceCoordinador);
    r.data = { action: action, user: user, noExpediente: expediente , estatus: estatus , Observaciones : observaciones};
    $.ajax(r);
}

function updateAjaxAbogado(action, user, idAbogado , textoNombre,expediente , tabla, fila){
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
               $('#'+tabla+fila+'2').html(textoNombre);
               $('#btn'+tabla+fila).attr('abo',textoNombre)
               $('#textoAbogadoAsignado').html('Abogado: '+textoNombre);
               $('#tableBandejaEntrada').DataTable().cell( parseInt(fila)-1, 1 ).data(textoNombre);
               $('#modalOption').modal('hide');
            } else {
                showErrorCalif('No se cambio/asigno el abogado', 'Intentar');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showErrorCalif("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX) {}
    };
    r = $.extend(r, urlServiceOficial);
    r.data = { action: action, idUser: user, expediente: expediente , idAbogado: idAbogado};
    $.ajax(r);
}

function updateAjaxNumeroExpediente(action, user, expedienteNuevo , expedienteViejo, folio, tabla, fila){
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

               $('#'+tabla+fila+'1').html('<a href="#" fol="'+folio+'" onclick="showPrograma8(this)">'+expedienteNuevo+'</a>');
               $('#btn'+tabla+fila).attr('expediente',expedienteNuevo);
               $('#btn'+tabla+'Obser'+fila).attr('expediente',expedienteNuevo);
               $('#btnAceptAbogado,#btnAceptOficial,#btnAceptSemaforo,#clicEditarAbogado').attr('expediente',expedienteNuevo);
               $('#textoNumeroExpediente').html('Expediente: '+expedienteNuevo);
               $('#tableBandejaEntrada').DataTable().cell( parseInt(fila)-1, 1 ).data(expedienteNuevo);
               $('#modalOption').modal('hide');
            } else {
                showErrorCalif('No se cambio/asigno el número de expediente<br> Verifique que el número de expediente no este en uso ', 'Intentar');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showErrorCalif("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX) {}
    };
    r = $.extend(r, urlServiceCoordinador );
    r.data = { action: action, user: user, noExpedienteNuevo: expedienteNuevo , noExpediente: expedienteViejo};
    $.ajax(r);
}

function getAbogados(actionParams, user, isSelected) {

    var r = {
        success: function(json) {
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                var valor = '';
                var abogadoSeleccionado = '';
                if (typeof $(isSelected).attr('valSect') != 'undefined') {
                    abogadoSeleccionado = $(isSelected).attr('valSect');
                }

                document.getElementById('selectAbogadoName').innerHTML = '';
                if (json.data.length > 0) {
                    document.getElementById('selectAbogadoName').innerHTML += '<option value="-1">Selecciona opción</option>';
                    for (var aux in json.data) {
                        var nombre = '';
                        var idAbogado = '';
                        for (var tmp in json.data[aux]) {
                            if (tmp == "label") {
                                nombre = json.data[aux][tmp];
                            } else if (tmp == 'value') {
                                idAbogado = json.data[aux][tmp];
                            }
                        }
                        if (abogadoSeleccionado == idAbogado) {
                            valor = 'selected';
                        } else {
                            valor = '';
                        }
                        document.getElementById('selectAbogadoName').innerHTML += '<option  value="' + idAbogado + '" ' + valor + '>' + nombre + '</option>';

                    }
                } else {
                    document.getElementById('selectAbogadoName').innerHTML += '<option value="-1">Selecciona opción</option>';
                }

            } else {
                showErrorCalif("Fallo al cargar lista de abogados", "Intentar");
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showErrorCalif("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceOficial);
    r.data = { action: actionParams, idUser: user };
    $.ajax(r);
}

function loadTablaBandejaEntrada(action, user) {
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

                    printTable(json.data, 'tbodyBanjejaEntrada');

                    if(typeof json.data == 'undefined'){
                      $('#pendientesOficialiaTexto').html('Pendientes oficialia: '+ 0);
                    }else{
                      $('#pendientesOficialiaTexto').html('Pendientes oficialia: '+json.cadena);
                    }
                    

                } else {
                    showErrorCalif("Error al cargar registros", "Intentar");
                }
            },
            beforeSend: function(xhr) {},
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                showErrorCalif("Servicio no disponible", "Aceptar");
            },
            complete: function(solicitudAJAX, estatus) {}
        };
        r = $.extend(r, urlServiceCoordinador);
        r.data = { action: action, user: user };
        $.ajax(r);
    }



/**********************************************************************************
                                Validaciones de formularios            
***********************************************************************************/

//Oficialia

 $('#check1').on('click', function() {
        if ($(this).is(':checked')) {
            if ($('#check2').is(':checked')) {
                $('#check2').prop("checked", false);
            }

            $("#formularioOficialia input").each(function() {
                if ($(this).attr('type') == 'checkbox' && $(this).attr('id') != 'check2' && $(this).attr('id') != 'check1') {
                    $('#' + $(this).attr('id')).prop('disabled', true);
                    $('#' + $(this).attr('id')).prop("checked", false);
                }
            });
        }
    });


    $('#check2').on('click', function() {
        if ($(this).is(':checked')) {
            if ($('#check1').is(':checked')) {
                $('#check1').prop("checked", false);
            }

            $("#formularioOficialia input").each(function() {
                if ($(this).attr('type') == 'checkbox' && $(this).attr('id') != 'check2' && $(this).attr('id') != 'check1') {
                    $('#' + $(this).attr('id')).prop('disabled', false);
                }
            });
        } else {
            $("#formularioOficialia input").each(function() {
                if ($(this).attr('id') != 'check2' && $(this).attr('id') != 'check1') {
                    $('#' + $(this).attr('id')).prop('disabled', true);
                    $('#' + $(this).attr('id')).prop('checked', false);
                }

            });
        }
    });

    

    $('#check3').on('click', function() {
      if ($(this).is(':checked')) {
            $('#check2').prop("checked", true);
        }
    });

    $('#check4').on('click', function() {
      if ($(this).is(':checked')) {
            $('#check2').prop("checked", true);
        }
        $('#check5').prop("checked", false);
        $('#check6').prop("checked", false);
    });


    $('#check5').on('click', function() {
        if ($(this).is(':checked')) {
            $('#check2').prop("checked", true);
            $('#check4').prop("checked", true);
            $('#check6').prop("checked", false);
        }
    });

    $('#check6').on('click', function() {
        if ($(this).is(':checked')) {
            $('#check2').prop("checked", true);
            $('#check4').prop("checked", true);
            $('#check5').prop("checked", false);
        }
    });

    $('#check7').on('click', function() {
          if ($(this).is(':checked')) {
              $('#check2').prop("checked", true);
          }
            $('#check8').prop("checked", false);
            $('#check9').prop("checked", false);
    });


    $('#check8').on('click', function() {
        if ($(this).is(':checked')) {
            $('#check2').prop("checked", true);
            $('#check7').prop("checked", true);
            $('#check9').prop("checked", false);
        }
    });

    $('#check9').on('click', function() {
        if ($(this).is(':checked')) {
            $('#check2').prop("checked", true);
            $('#check7').prop("checked", true);
            $('#check8').prop("checked", false);

        }
    });

function ctrlCheckBox(c) {
        var count = 0;
        $('#btn-confirmacion-Ok').attr('expediente','');
        $('#btn-confirmacion-Ok').attr('estatus','');
        $('#validacionError').html('');

        if ($('#check1').is(':checked')) {
            count = 1;
        } else if ($('#check2').is(':checked')) {
            var count = 0;

            if ($('#check3').is(':checked')) {
                count = 1;
            }

            if ($('#check4').is(':checked')) {
                if ($('#check5').is(':checked') || $('#check6').is(':checked')) {
                    count = 1;
                } else {
                    count = -1;
                }
            }


            if ($('#check7').is(':checked')) {
                if (($('#check8').is(':checked') || $('#check9').is(':checked')) ) {
                    if($('#check4').is(':checked')){
                        if($('#check5').is(':checked') || $('#check6').is(':checked')){
                              count = 1;
                        }else{
                           count = -1;
                        }
                    }else{
                        count = 1;
                    }
                } else {
                    count = -2;
                }

            }

            if(count == 0){
                $('#validacionError').html('Seleccione medida de seguridad');
            }else if(count == -1){
                $('#validacionError').html('Selecciona tipo de clausura');
            }else if(count == -2){
                $('#validacionError').html('Selecciona tipo de Suspencion');
            }

        } else {
            $('#validacionError').html('Falta seleccionar estatus');
        }

        if (count == 1) {
            $('#btn-confirmacion-Ok').attr('expediente',$(c).attr('expediente'));
            $('#addObservaciones').hide();
            if($('#check1').is(':checked')){
                modalConfirmacion('¿Está seguro de asignar <u>'+$('#check1').val()+'</u> como estatus ?', 1 , 1 , $(c).attr('tabla'),$(c).attr('fila'));
            }else{
                  modalConfirmacion('¿Está seguro de asignar <u>'+selectCheckTexto("#formularioOficialia input")+'</u> como estatus ?'+
                                     '<br><br> AL ACEPTAR SE HARA PUBLICO EL ESTATUS EN EL PROGRAMA DE MADERA LEGAL',
                                       getStatusSelected(arrayElementSeleted("#formularioOficialia input")),1,$(c).attr('tabla'),$(c).attr('fila'));              
            }
        }
}

//Abogado

$('#radioProceso').on('click', function() {
   $('#erorAbogado').html('');
    if ($(this).is(':checked')) {
        $("#divConcluido input").each(function() {
            if ($(this).attr('type') == 'checkbox') {
                //$(this).prop('disabled', true);
                $(this).prop("checked", false);
            }
        });
         $("#divProceso input").each(function() {
            if ($(this).attr('type') == 'checkbox') {
                   //$(this).prop('disabled', false);                 
            }
        });
    
        $('#cantidadInputData').val('');
        $('#cantidadInputData').hide();
        $('#inputCantidad').hide();
    
        $('#textAreaDecomiso').val('');
        $('#textAreaDecomiso').hide();

        //$('#fechaConclusion').val('');
        $('#calenadrio').show();

    }
});

$('#radioConcluido').on('click', function() {
    $('#erorAbogado').html('');
    if ($(this).is(':checked')) {
        $("#divProceso input").each(function() {
            if ($(this).attr('type') == 'checkbox') {
                   //$(this).prop('disabled', true);
                   $(this).prop("checked", false);
                   //$('#fechaConclusion').val('');
                   //$('#calenadrio').hide();
            }
        });
         $("#divConcluido input").each(function() {
            if ($(this).attr('type') == 'checkbox') {
               // $(this).prop('disabled', false);
            }
        });
    }
});

$('.groupChk').on('click', function() {
    if($(this).is(':checked')){
        $('.groupChk').prop('checked', false);
        $(this).prop('checked', true); 
    }
    $("#radioProceso").attr('checked', true).trigger('click');
});

$('.chk27,.chk28,.chk29').on('click', function(){
    if($(this).is(':checked')){
          $('.chk20').prop('checked', false);
          $('.chk27').prop('checked', false);
          $('.chk28').prop('checked', false);
          $('.chk29').prop('checked', false);
          $('.grupoAdmon').prop('checked',false);
          $(this).prop('checked', true);

          //$('#fechaConclusion').val('');
          //$('#calenadrio').hide();

          $('#cantidadInputData').val('');
          $('#cantidadInputData').hide();
          $('#inputCantidad').hide();

          $('#textAreaDecomiso').val('');
          $('#textAreaDecomiso').hide();

    }

    if($('#acArchivo').is(':checked')){
          $('#textAreaDecomiso').val('');
          $('#textAreaDecomiso').show();
    }else{
      $('#textAreaDecomiso').val('');
      $('#textAreaDecomiso').hide();
    }
});

$('.grupoAdmon').on('click', function(){
     $('.chk20').prop('checked', true);
     if($('#acArchivo').is(':checked')){
          $('#textAreaDecomiso').val('');
          $('#textAreaDecomiso').hide();
     }
     $('.chk27,.chk28,.chk29').prop('checked',false);

});

$('.chk20').on('click', function(){
    $('#erorAbogado').html('');
    if($('#acArchivo').is(':checked')){
          $('#textAreaDecomiso').val('');
          $('#textAreaDecomiso').hide();
    }

    if($(this).is(':checked')){
        $('.chk27,.chk28,.chk29').prop('checked', false);
    }else{
        $('.grupoAdmon').prop('checked',false);
          //$('#fechaConclusion').val('');
          //$('#calenadrio').hide();

          $('#cantidadInputData').val('');
          $('#cantidadInputData').hide();
          $('#inputCantidad').hide();

          $('#textAreaDecomiso').val('');
          $('#textAreaDecomiso').hide();

    }
});

$('.chk27,.chk28,.chk29,.grupoAdmon').on('click', function(){
    $("#radioConcluido").attr('checked', true).trigger('click');
});

$('.chk22').on('click', function() {
    $('#erorAbogado').html('');
    if ($(this).is(':checked')) {
        
          //$('#fechaConclusion').val('');
          //$('#calenadrio').hide();

          $('#cantidadInputData').val('');
          $('#cantidadInputData').show();
          $('#inputCantidad').show();
    }else{
          $('#cantidadInputData').val('');
          $('#cantidadInputData').hide();
          $('#inputCantidad').hide();
    }

});


$('.chk23').on('click', function() {
    $('#erorAbogado').html('');
    if ($(this).is(':checked')) {
          //$('#fechaConclusion').val('');
          //$('#calenadrio').hide();

          $('#textAreaDecomiso').val('');
          $('#textAreaDecomiso').show();
    }else{
        $('#textAreaDecomiso').val('');
        $('#textAreaDecomiso').hide();
    }

});


//Semaforizacion


$('.sinSancion').on('click', function(){
    $('#errorSemaforo').html('');
    if($(this).is(':checked')){
        $('.checkListSemaf, .sinIrre').prop('checked', false);
        $(this).prop('checked', true);
    }
});

$('.sinIrre').on('click', function(){
    $('#errorSemaforo').html('');
    if($(this).is(':checked')){
        $('.checkListSemaf, .sinSancion').prop('checked', false);
        $(this).prop('checked', true);
    }
});

$('.checkListSemaf').on('click', function(){
    $('#errorSemaforo').html('');
    if($(this).is(':checked')){
        $('.sinIrre, .sinSancion').prop('checked', false);
    }
});




function ctrlSemaforo(c){
  var contador = 0;
  $('#btn-confirmacion-Ok').attr('expediente',$(c).attr('expediente'));
  $('#addObservaciones').hide();
  $('#errorSemaforo').html('');
  if($('.sinSancion').is(':checked')){
    contador = 1;
  }else if($('.sinIrre').is(':checked')){
    contador = 1;
  }else{ 
      $("#formularioSemaforo input").each(function() {
          if ($(this).attr('type') == 'checkbox') {
                if($(this).is(':checked')){
                  contador = 1;
                  return false;
                }           
          }
      });
  }

  if(contador == 1){
    modalConfirmacion('¿Está seguro de asignar '+arrayElementSeletedTextoSemaforo('#formularioSemaforo input')+' como estatus ?',
                      arrayElementSelectedNameSem('#formularioSemaforo input'),3,$(c).attr('tabla'),$(c).attr('fila'));
  }else{
    $('#errorSemaforo').html('Seleccione al menos una opción');
  }

}


function asigNumExp(exp) {

    $('#headerOption').html('');
    $('#bodyOption').html('');
    $('#footerOption').html('');
    var expediente='';
    var folio='';
    var tabla='';
    var fila='';

    if(typeof $(exp).attr('expediente') == 'undefined'){
        expediente='';
    }else{
        expediente=$(exp).attr('expediente');
    }

    if(typeof $(exp).attr('folio') == 'undefined'){
        folio='';
    }else{
        folio=$(exp).attr('folio');
    }

    if(typeof $(exp).attr('tabla') == 'undefined'){
        tabla='';
    }else{
        tabla=$(exp).attr('tabla');
    }
    if(typeof $(exp).attr('fila') == 'undefined'){
        fila='';
    }else{
        fila=$(exp).attr('fila');
    }



    $('#headerOption').html('<b>Asignar/Cambiar número de expediente</b>');

    $('#bodyOption').html(
        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<form id="formAsigExpediente">' +
        '<div class="row">' +
        '<label>No. de expediente</label>' +
        '<input type="text" class="form-control" name="textNumExpediente" id="textNumExpediente">' +
        '</div>' +
        '</form>' +
        '</div>'
    );

    $('#footerOption').html(
        '<div class="row">' +
        '<div class="col-md-4 col-md-offset-3 col-sm-12 col-xs-12">' +
        '<button type="button" class="btn btn-danger" data-dismiss="modal" hidden>Cancelar</button>' +
        '</div>' +
        '<div class="col-md-4 col-sm-12 col-xs-12">' +
        '<button type="button" id="btnFolio" class="btn btn-default" tabla="'+tabla+'" fila="'+fila+'" folio="'+folio+'" expediente="'+expediente+'" onclick="sendAsignar(this)">Asignar</button>' +
        '</div>' +
        '</div>'
    );
    eval(loadValidate());
    $('#modalOption').modal('show');

}

function asigAbogado(abogado) {
    
    var filaUpdate= '';
    var tabla='';
    var expediente='';
    
    if(typeof $(abogado).attr('filaupdate') == 'undefined'){
        filaUpdate='';
    }else{
        filaUpdate=$(abogado).attr('filaupdate');
    }

    if(typeof $(abogado).attr('tabla') == 'undefined'){
        tabla='';
    }else{
        tabla=$(abogado).attr('tabla');
    }

    if(typeof $(abogado).attr('expediente') == 'undefined'){
        expediente='';
    }else{
        expediente=$(abogado).attr('expediente');
    }


    $('#headerOption').html('');
    $('#bodyOption').html('');
    $('#footerOption').html('');
    $('#headerOption').html('<b>Cambiar/Asignar abogado</b>');

    $('#bodyOption').html(
        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<form id="formAsigAbogado">' +
        '<br>' +
        '<div class="row">' +
        '<label>Nombre del abogado</label>' +
        '<select class="form-control" name="selectAbogadoName" id="selectAbogadoName">' +
        '</select>' +
        '<br>' +
        '</div>' +
        '</form>' +
        '</div>'
    );

    $('#footerOption').html(
        '<div class="row">' +
        '<div class="col-md-4 col-md-offset-3 col-sm-12 col-xs-12">' +
        '<button type="button" class="btn btn-danger" data-dismiss="modal" hidden>Cancelar</button>' +
        '</div>' +
        '<div class="col-md-4 col-sm-12 col-xs-12">' +
        '<button type="button" id="btnAsignarAbogado" expediente="'+expediente+'" tabla="'+tabla+'" filaupdate="'+filaUpdate+'" onclick="sendAsignarAbogado(this)" class="btn btn-default">Asignar</button>' +
        '</div>' +
        '</div>'
    );
    getAbogados('getAbogados',amplify.store('dataLoggingProbosque').id,abogado);
    eval(loadValidateAbogado());
    $('#modalOption').modal('show');

}
function loadValidateAbogado() {
    $("#formAsigAbogado").validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            selectAbogadoName: {
                valueNotEquals: -1
            }
        },
        messages: {
            selectAbogadoName: {
                valueNotEquals: "Seleccione un abogado"
            }
        },

        submitHandler: function(form) {
            updateAjaxAbogado('setAbogado', amplify.store('dataLoggingProbosque').id, 
              $('#selectAbogadoName').val() , $('#selectAbogadoName option:selected').text(),
              $('#btnAsignarAbogado').attr('expediente'), $('#btnAsignarAbogado').attr('tabla'), 
              $('#btnAsignarAbogado').attr('filaupdate'));
            return false;
        }
    });

}

function loadValidate() {
    $("#formAsigExpediente").validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            textNumExpediente: {
                required: true,
                empty: true,
                caracterEspecial: true,
                maxlength: 50
            }
        },
        messages: {
            textNumExpediente: {
                required: 'Ingresa número',
                empty: 'Ingresa número',
                caracterEspecial: 'No se aceptan comillas simples y dobles',
                maxlength: 'Max. 50 caracteres'
            }
        },

        submitHandler: function(form) {
            updateAjaxNumeroExpediente('cambiaExpediente', amplify.store('dataLoggingProbosque').id, 
                                       $('#textNumExpediente').val().trim() , $('#btnFolio').attr('expediente') , $('#btnFolio').attr('folio'),
                                       $('#btnFolio').attr('tabla'), $('#btnFolio').attr('fila'));
            return false;
        }
    });

}

jQuery.validator.addMethod("valueNotEquals",
    function(value, element, arg) {
        return arg != value;
    }
);

jQuery.validator.addMethod("caracterEspecial",
    function(value, element) {
        return /^[A-Za-z\d\s!#$%&/_()=\\[\]?¡\^¿ÑñáéíóúÁÉÍÓÚ.;,:*~{}+-]*$/.test(value);
    }
);

jQuery.validator.addMethod("empty",
    function(value, element) {
        return !/^\s*$/.test(value);
    }
);

function sendAsignarAbogado(e) {
    $("#formAsigAbogado").submit();
}

function sendAsignar(e) {
    $("#formAsigExpediente").submit();
}



