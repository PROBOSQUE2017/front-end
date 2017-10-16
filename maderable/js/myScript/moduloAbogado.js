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
        $('#anadirFecha').html(f.getDate() + "/" + mesok[f.getMonth()] + "/" + f.getFullYear());

        getPanel("getPanel", amplify.store('dataLoggingProbosque').id);

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
                if (esVacio($(event.target).val().trim())) {
                    if($('#acuDecomiso').is(':checked')){
                        $('#errorValidacion').html('Seleccionó Acuerdo de archivo y decomiso. <b>Agregue los detalles en el cuadro de texto</b>');
                    }else{
                        $('#errorValidacion').html('Seleccionó decomiso. <b>Agregue los detalles en el cuadro de texto</b>');
                    }
                  
                } else {
                    $('#errorValidacion').html('');
                }

            }
        });




    });




    /***************************************INICIO EVENTOS DE ABOGADO***********************************/

    function esVacio(text) {
        if (/^\s*$/.test(text.trim())) {
            return true;
        } else {
            return false;
        }
    }

    function IsDate(D) {
        if (!/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(D)) {
            return false;
        } else {
            return true;
        }
    }


    function observaciones(e) {
        getObservaciones("getObservaciones", amplify.store('dataLoggingProbosque').id, $(e).attr('no_exp').trim());
    }

    function detalleObser(e) {
        $('#modalDetalleObservacion').modal('show');
        $('#detalleFecha').val($(e).attr('fecha').trim());
        $('#detalleAbogado').val($(e).attr('abogado').trim());
        $('#detalleDetalle').val($(e).attr('detalle').trim());
    }

    function modalDatos(paramAbogado, paramNumeroExpediente, paramEstatus,claseBoton,tabla,fila,fechaConclusion,decomiso,multa,opcion) {
        $('#msjErrorObservacion').html('');
        $('#textoConfirmacionLabel').html('<b> ¿Está seguro de cambiar el estatus para el expediente '+paramNumeroExpediente+' ?</b> <br>Si esta seguro agregue una observación');
        $('#anadirObservacion').val('');
        $('#btnAddObservacion').attr({'no_expe':'','estatus':'','class':'','tabla':'','fila':'','fecha_conclusion':'','decomiso':'','multa':'','opcion':''});
        $('#btnAddObservacion').attr({'no_expe':paramNumeroExpediente,'estatus':paramEstatus,
                                    'class':'btn '+claseBoton,'tabla':tabla,
                                    'fila':fila,'fecha_conclusion':fechaConclusion,
                                    'decomiso':decomiso,'multa':multa,'opcion':opcion
                                });
        $('#anadirAbogado').val(paramAbogado);
        $('#modalAsignarEstatus').fadeOut( 500, "swing");
        $('#modalAnadirObservacion').modal('show');
    }

    $('#btnModalShowPrincipal,#iconCloseModal').on('click', function(){
         $('#modalAnadirObservacion').modal('hide');
         $('#modalAsignarEstatus').fadeIn();

    });

    $('#resolucionAdministrativa').on('click', function(){
        if(!$(this).is(':checked')){
            $('.levelTwo').prop("checked", false);
            $('#inputCantidad').hide();
            $('#textAreaDecomiso').hide();
        }
    });

   $('#btnAddObservacion').on('click', function() {
        if(!esVacio($('#anadirObservacion').val().trim())){
            changeEstatus("changeEstatus",
                $('#anadirFecha').html(),
                $('#anadirObservacion').val(),
                $(this).attr('no_expe'),
                $(this).attr('estatus'),
                amplify.store('dataLoggingProbosque').id,
                $('#fechaConclusion').val().trim(),
                $('#cantidadInputData').val().trim(),
                $('#textAreaDecomiso').val().trim(),
                $(this).attr('opcion'),
                $(this).attr('tabla'), 
                $(this).attr('fila'));
             
        }else{
            $('#msjErrorObservacion').html('Ingrese una observación');
        }
    });

    $('#enProceso').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            $('#concluido').prop("checked", false);
            $('#resolucionAdministrativa').prop("checked", false);
            $('#amonestacion').prop("checked", false);
            $('#multa').prop("checked", false);
            $('#decomiso').prop("checked", false);
            $('#renovacion').prop("checked", false);
            $('#clausura').prop("checked", false);
            $('#sinSancion').prop("checked", false);
            $('#acuArchivo').prop("checked", false);
            $('#acuCierre').prop("checked", false);
            $('#acuDecomiso').prop("checked", false);
            $('#inputCantidad').hide();
            $('#textAreaDecomiso').hide();
            $('#calenadrio').show();
        }
    });

    $('#concluido').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            $('#enProceso').prop("checked", false);
            $('#terminoDias').prop("checked", false);
            $('#primerDic').prop("checked", false);
            $('#paraEmp').prop("checked", false);
            $('#emplazadoDias').prop("checked", false);
            $('#segundoDic').prop("checked", false);
            $('#alegatos').prop("checked", false);
            $('#emitirResolucion').prop("checked", false);
            $('#resAdmin').prop("checked", false);
            $('#paraNotificar').prop("checked", false);
            $('#resNotificada').prop("checked", false);
            
        }
        if($('#fechaConclusion').val().length>0){
            $('#calenadrio').show();
        }
    });

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
            
        }
        if($('#fechaConclusion').val().length>0){
             $('#calenadrio').show();
          
        }

    });

    $('.levelOne').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            $('.levelOne, .levelTwo').prop("checked", false);
            $(this).prop("checked", true);
            $('#inputCantidad').hide();
            $('#textAreaDecomiso').hide();
        }
        if($('#acuDecomiso').is(':checked')){
              $('#textAreaDecomiso').val('');
              $('#textAreaDecomiso').show();
        }else{
            $('#textAreaDecomiso').val('');
            $('#textAreaDecomiso').hide();
        }

        if($('#fechaConclusion').val().length>0){
             $('#calenadrio').show();
          
        }
    });

    $('.levelTwo').on('click', function() {
        if ($(this).is(':checked')) {
            $('#errorValidacion').html('');
            //$('.levelOne').prop("checked", false);
            $('#resolucionAdministrativa').prop('checked', true);
            $('#acuArchivo,#acuDecomiso,#acuCierre').prop('checked', false);
           
        }

        if(!$('.decomiso').is(':checked')){
             $('#textAreaDecomiso').hide();
        }

        if($('#fechaConclusion').val().length>0){
             $('#calenadrio').show();
          
        }


    });

    $('#resolucionAdministrativa').on('click', function(){
        if(!$(this).is(':checked')){
            $('.levelTwo').prop("checked", false);
            $('#inputCantidad').hide();
            $('#textAreaDecomiso').hide();
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

    //Fin codigo
    $('#btnAsignarEstatus').on('click', function(e) {
        var contador = 0;
        $('#errorValidacion').html('');
        if ($('#enProceso').is(':checked')) {
            $("#listProcessOption input").each(function() {
                if ($(this).attr('type') == 'checkbox') {
                    if ($(this).is(':checked')) {
                        contador = 1;
                        return false;
                    }
                }
            });

            if (contador == 1) {
                if (!esVacio($('#fechaConclusion').val())) {
                    if (IsDate($('#fechaConclusion').val())) {
                        confirmar($(this).attr('no_exp'),$(this).attr('tipo'),$(this).attr('tabla'),$(this).attr('fila'),$(this).attr('fecha_conclusion'),$(this).attr('decomiso'),$(this).attr('multa'),'Proceso');
                    } else {
                        $('#errorValidacion').html('Fecha invalida. Formato: <b>DD-MM-AAAA</b>');
                    }
                } else {
                    $('#errorValidacion').html('Ingrese fecha de  conclusion');
                }
            } else {
                $('#errorValidacion').html('Seleccione una opción de <b>En proceso</b>');
            }

        } else if ($('#concluido').is(':checked')) {
            $("#listConcluido input").each(function() {
                if ($(this).attr('type') == 'checkbox') {
                    if ($(this).is(':checked')) {
                        contador = 1;
                        return false;
                    }
                }
            });

            if (contador == 1) {
                if ($('#resolucionAdministrativa').is(':checked')) {
                    $("#listSegundoNivel input").each(function() {
                        if ($(this).attr('type') == 'checkbox') {
                            if ($(this).is(':checked')) {
                                contador = 2;
                                return false;
                            }
                        }
                    });

                    if (contador == 2) {
                        var bandera = false;
                        if ($('#multa').is(':checked')) {
                            if ($('#cantidadInputData').val().length > 0) {

                                if ($('#decomiso').is(':checked')) {
                                    if (!esVacio($('#textAreaDecomiso').val())) {
                                        bandera = true;
                                    } else {
                                        bandera = false;
                                        $('#errorValidacion').html('Seleccionó decomiso. <b>Agregue los detalles en el cuadro de texto</b>');
                                    }
                                } else {
                                    bandera = true;
                                }

                            } else {
                                bandera = false;
                                $('#errorValidacion').html('Seleccionó multa. <b>Ingrese la cantidad</b>');
                            }
                        } else if ($('#decomiso').is(':checked')) {
                            if (!esVacio($('#textAreaDecomiso').val())) {
                                bandera = true;
                            } else {
                                bandera = false;
                                $('#errorValidacion').html('Seleccionó decomiso. <b>Agregue los detalles en el cuadro de texto</b>');
                            }
                        } else {
                            bandera = true;
                        }


                        if (bandera) {
                            confirmar($(this).attr('no_exp'),$(this).attr('tipo'),$(this).attr('tabla'),$(this).attr('fila'),$(this).attr('fecha_conclusion'),$(this).attr('decomiso'),$(this).attr('multa'),'Concluido');
                        }

                    } else {
                        $('#errorValidacion').html('Seleccione al menos una opción de <b>Resolución administrativa</b>');
                    }

                } else if($('#acuDecomiso').is(':checked')){
                        if (!esVacio($('#textAreaDecomiso').val())) {
                                confirmar($(this).attr('no_exp'),$(this).attr('tipo'),$(this).attr('tabla'),$(this).attr('fila'),$(this).attr('fecha_conclusion'),$(this).attr('decomiso'),$(this).attr('multa'),'Concluido');
                            } else {
                                $('#errorValidacion').html('Seleccionó Acuerdo de archivo y decomiso. <b>Agregue los detalles en el cuadro de texto</b>');
                        }
                }else{
                    confirmar($(this).attr('no_exp'),$(this).attr('tipo'),$(this).attr('tabla'),$(this).attr('fila'),$(this).attr('fecha_conclusion'),$(this).attr('decomiso'),$(this).attr('multa'),'Concluido');
                }
            } else {
                $('#errorValidacion').html('Seleccione una opción de <b> Concluido</b>');
            }

        } else {
            $('#errorValidacion').html('Seleccione una opción');
        }

    });

    $('#iconBtnCloseDetails, #btncloseDetalle').on('click', function(){

    });

    function asignarEstatus(e) {
        $('#btnExitModalEstatus').html('Cancelar');
        $('#inputCantidad').hide();
        $('#cantidadInputData').val('');

        $('#textAreaDecomiso').hide();
        $('#textAreaDecomiso').val('');
        $('#formEstatus input').each(function() {
            if ($(this).attr('type') == 'checkbox') {
                $(this).prop('checked', false);
            }
            $('#fechaConclusion').prop('disabled', false);
            $('#fechaConclusion').val('');
        });

        if (!esVacio($(e).attr('fecha_conclusion'))) {
            $('#fechaConclusion').val($(e).attr('fecha_conclusion').trim());
            $('#fechaConclusion').prop('disabled', true);
        }

        for (var i = 0; i < $(e).attr('estatus').split(',').length; i++) {

            switch ($(e).attr('estatus').split(',')[i]) {
                case '10':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#terminoDias').trigger('click');
                    break;
                case '11':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#primerDic').attr('checked', true).trigger('click');
                    break;
                case '12':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#paraEmp').attr('checked', true).trigger('click');
                    break;
                case '13':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#emplazadoDias').attr('checked', true).trigger('click');
                    break;
                case '14':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#segundoDic').attr('checked', true).trigger('click');
                    break;
                case '15':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#alegatos').attr('checked', true).trigger('click');
                    break;
                case '16':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#emitirResolucion').attr('checked', true).trigger('click');
                    break;
                case '17':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#resAdmin').attr('checked', true).trigger('click');
                    break;
                case '18':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#paraNotificar').attr('checked', true).trigger('click');
                    break;
                case '19':
                    $("#enProceso").attr('checked', true).trigger('click');
                    $('#resNotificada').attr('checked', true).trigger('click');
                    break;
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
        $('#btnAsignarEstatus').attr({'no_exp':'','class':'','tipo':'','tabla':'','fila':'','decomiso':'','fecha_conclusion':'','multa':''});
        $('#noExpedienteLabel').html('');
        $('#noExpedienteLabel').html('No. de Expediente: ' + $(e).attr('no_exp'));
        $('#btnAsignarEstatus').attr({'no_exp':$(e).attr('no_exp'),'class':'btn '+$(e).attr('tipo'),'tipo':$(e).attr('tipo'),
                                      'tabla':$(e).attr('tabla'),'fila':$(e).attr('fila'),'decomiso':$(e).attr('decomiso'),
                                      'fecha_conclusion':$(e).attr('fecha_conclusion'),'multa':$(e).attr('multa')
                                  });
        $('#errorValidacion').html('');
        $('#modalAsignarEstatus').modal('show');
    }


    function confirmar(noExepdiente,claseBoton,tabla,fila,fechaConclusion, decomiso, multa, opcion) {
        var checkEstatus = $('input[name=estatus]:checked').val();
        var checkedValue = null;
        var arregloCheck = new Array();
        var arreglEstatus = "";
        var k=0;
        console.log(checkEstatus);
        if(checkEstatus == 0){
            var inputElements = document.getElementsByName('procesoCheck');
            for(var i=0; i<inputElements.length; i++){
                if(inputElements[i].checked){
                    checkedValue = inputElements[i].value;
                    arregloCheck[k]= checkedValue;
                   k++;
                }
            }

             // var a =arregloCheck.split(",");
            // a[a.length-1]=" ";
            // arregloEstatus=a;
            var b='';
            for(var y=0; y<=arregloCheck.length; y++){
                if(arregloCheck[y] !="" && arregloCheck[y]!= null && arregloCheck[y] != "undefined" &&  arregloCheck[y]!=" ")
                   {
                    b+=arregloCheck[y];
                   }
                if(y<arregloCheck.length-1){
                    b+=",";
                }
            }
        }else{
            var inputElements1 = document.getElementsByName('concluidoCheck');
            for(var i=0; i<inputElements1.length; i++){
                if(inputElements1[i].checked){
                    checkedValue = inputElements1[i].value;
                    arregloCheck[k]= checkedValue;
                   k++;
                }
            }

           // var a =arregloCheck.split(",");
          //  a[a.length-1]=" ";
         //  arregloEstatus=a;
           var b='';
            for(var y=0; y<=arregloCheck.length; y++){
                if(arregloCheck[y] !="" && arregloCheck[y]!= null && arregloCheck[y] != "undefined" &&  arregloCheck[y]!=" ")
                   {
                    b+=arregloCheck[y];
                   }
                if(y<arregloCheck.length-1){
                    b+=",";
                }
            }
        }
        

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        if(noExepdiente == undefined){
           noExepdiente = '';
        }

       modalDatos("Lic. "+ amplify.store('dataLoggingProbosque').firstname + " " + amplify.store('dataLoggingProbosque').lastname, noExepdiente.trim(),b,claseBoton,tabla,fila,fechaConclusion,decomiso,multa,opcion);

       //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }


    /***************************************FIN EVENTOS DE ABOGADO**************************************/

    /***************************************INICIO PETICIONES AJAX**************************************/
    function getPanel(action, user) {
        var r = {
            success: function(json, estatus) {
                var contenedorProceso = json.data.contenedorEnProceso;
                var contenedorSeguridad = json.data.contenedorMedidaSeguridad;
                console.log(json);

                var b = false;
                for (var x in json.response) {
                    if (x == "sucessfull") {
                        b = json.response[x];
                    }
                }

                if (b) {
                    $("#tablaBodyProceso").empty();
                    $("#tablaBodySeguridad").empty();
                    var cuerpoTablaProceso = document.getElementById("tablaBodyProceso");
                    var cuerpoTablaSeguridad = document.getElementById("tablaBodySeguridad");
                    if (contenedorProceso.length > 0) {
                        var numeroFila=0;
                        for (var tmp in contenedorProceso) {
                            var folio = "";
                            var noExpediente = "";
                            var estatus = "";
                            var fecha = "";
                            var deco = "";
                            var mult="";
                            numeroFila++;
                            var filaProceso = cuerpoTablaProceso.insertRow();
                            for (var aux in contenedorProceso[tmp]) {
                                if (aux == "No_expediente") {
                                    noExpediente = contenedorProceso[tmp][aux];
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = '<a href="#" fol="' + folio + '" onclick="showPrograma8(this)">' + contenedorProceso[tmp][aux] + '</a>';
                                } else if (aux == "Fecha_recepcion_abogado") {
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = contenedorProceso[tmp][aux];
                                } else if (aux == "Folio") {
                                    folio = contenedorProceso[tmp][aux];
                                } else if (aux == "Estatus") {
                                    estatus = contenedorProceso[tmp][aux];
                                } else if( aux == "fecha_conclusion"){
                                    fecha = contenedorProceso[tmp][aux];
                                }else if( aux == "decomiso"){
                                    deco = contenedorProceso[tmp][aux];
                                }else if( aux == "multa"){
                                    mult = contenedorProceso[tmp][aux];
                                }
                            }
                            filaProceso.setAttribute('id','renglonProceso'+numeroFila);
                            filaProceso.insertCell(-1).innerHTML = '<td><button class="btn btn-default btn-block" no_exp="' + noExpediente + '" onclick="observaciones(this)">Ver</button></td>';
                            filaProceso.insertCell(-1).innerHTML = '<td><button id="btnRenProceso'+numeroFila+'" tabla="Proceso" fila="'+numeroFila+'" tipo="btn-custom" class="btn btn-custom btn-block" decomiso="'+deco+'" multa="'+mult+'" fecha_conclusion="'+fecha+'" no_exp="' + noExpediente + '" estatus="' + estatus + '" onclick="asignarEstatus(this)">Asignar</button></td>';
                        }
                    } else {
                        var fila = cuerpoTablaProceso.insertRow();
                        fila.innerHTML = '<td colspan="4" align="center">No se encontraron registros</td>';
                    }


                    if (contenedorSeguridad.length > 0) {
                         var numeroFila=0;
                        for (var tmp in contenedorSeguridad) {
                            var folio = "";
                            var noExpediente = "";
                            var estatus = "";
                            var fecha = "";
                            var deco = "";
                            var mult="";
                            numeroFila++;
                            var filaProceso = cuerpoTablaSeguridad.insertRow();
                            for (var aux in contenedorSeguridad[tmp]) {
                                if (aux == "No_expediente") {
                                    noExpediente = contenedorSeguridad[tmp][aux];
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = '<a href="#" fol="' + folio + '" onclick="showPrograma8(this)">' + contenedorSeguridad[tmp][aux]; + '</a>';
                                } else if (aux == "Fecha_recepcion_abogado") {
                                    var celdaProceso = filaProceso.insertCell(-1);
                                    celdaProceso.innerHTML = contenedorSeguridad[tmp][aux];
                                } else if (aux == "Folio") {
                                    folio = contenedorSeguridad[tmp][aux];
                                } else if (aux == "Estatus") {
                                    estatus = contenedorSeguridad[tmp][aux];
                                }else if( aux == "fecha_conclusion"){
                                    fecha = contenedorSeguridad[tmp][aux];
                                }else if( aux == "decomiso"){
                                    deco = contenedorSeguridad[tmp][aux];
                                }else if( aux == "multa"){
                                    mult = contenedorSeguridad[tmp][aux];
                                }
                            }
                            filaProceso.setAttribute('id','renglonMedida'+numeroFila);
                            filaProceso.insertCell(-1).innerHTML = '<td><button class="btn btn-default btn-block" no_exp="' + noExpediente + '" onclick="observaciones(this)">Ver</button></td>';
                            filaProceso.insertCell(-1).innerHTML = '<td><button id="btnRenMedida'+numeroFila+'" tabla="Medida" fila="'+numeroFila+'" tipo="btn-custom-medida" class="btn btn-custom-medida btn-block" decomiso="'+deco+'" multa="'+mult+'" fecha_conclusion="'+fecha+'" no_exp="' + noExpediente + '" estatus="' + estatus + '" onclick="asignarEstatus(this)">Asignar</button></td>';
                        }
                    } else {
                        var fila = cuerpoTablaSeguridad.insertRow();
                        fila.innerHTML = '<td colspan="4" align="center">No se encontraron registros</td>';
                    }
                } else {
                   showError('Error al cargar datos','Aceptar');
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
                    $('#idNumeroExpedienteHistorial').html('Numero expediente: '+expediente);
                    $('#modalHistorialObservaciones').modal('show');
                } else {
                    showError('No se actualizo. Intente nuevamente','Aceptar');
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeEstatus(action, fecha, observacion, expediente, estatus, user , fechaConclusion, multa, deco,opcion,tabla,fila) {
        var r = {
            success: function(json) {
                

                var b = false;
                for (var x in json.response) {
                    if (x == "sucessfull") {
                        b = json.response[x];
                    } else if (x == 'message') {
                        mensaje = json.response[x];
                    }
                }

                if (b) {
                    if(opcion == 'Concluido'){
                        $('#renglon'+tabla+fila).remove();
                        if(tabla == 'Proceso'){
                                if ($('#tablaBodyProceso > tr').length == 0) {
                                        $('#tablaBodyProceso').append('<tr><td colspan="4" align="center">No hay registros</td></tr>');
                                }
                        }else if(tabla == 'Medida'){
                            if ($('#tablaBodySeguridad > tr').length == 0) {
                                    $('#tablaBodySeguridad').append('<tr><td colspan="4" align="center">No hay registros</td></tr>');
                                }
                        }
                        showSucessEstatus('El numero de expediente '+expediente+' cambio de estatus', 'Aceptar',0);
                    }else if(opcion == 'Proceso'){
                        $('#btnRen'+tabla+fila).attr({'estatus':estatus,'decomiso':deco,'multa':multa,'fecha_conclusion':fechaConclusion});
                        showSucessEstatus('El numero de expediente '+expediente+' cambio de estatus', 'Aceptar',1);
                    }

                   
                } else {
                    showError('No se actualizo. Intente nuevamente','Aceptar');
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
            no_expediente: expediente,
            fecha: fecha,
            observaciones: observacion,
            estatus: estatus,
            fecha_conclusion: fechaConclusion,
            multa: multa,
            decomiso: deco
        };
        $.ajax(r);
    }
    /***************************************FIN PETICIONES AJAX*****************************************/
    var modalSucessCal = function(mensaje, btnText, opcion) {
        var modal =
            '<div class="modal fade" id="modalSuccessAbogado" role="dialog" data-backdrop="static" data-keyboard="false">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-body">' +
            '<center>' +
            '<h4 style="color: green"><b>' + mensaje + '</b></h4>' +
            '<br>' +
            '<button type="button" class="btn btn-success" data-dismiss="modal" id="btn-addOk" opcion="'+opcion+'" onclick="cerrarModal(this)">' + btnText + '</button>' +
            '</center>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return modal;
    }

    var showSucessEstatus = function(msj, texto, opcion) {
        $('#divmodalerror').html('');
        $('#divmodalerror').html(modalSucessCal(msj,texto,opcion));
        $('#modalSuccessAbogado').modal('show');
    }

    function cerrarModal(e) {

        if ($(e).attr('opcion') == 0 ) {
            $('#modalAsignarEstatus').modal('hide');
            $('#modalAnadirObservacion').modal('hide');
        } else if ($(e).attr('opcion') ==  1 ) {
            $('#btnExitModalEstatus').html('Cerrar');
            if (!esVacio($('#fechaConclusion').val())) {
                $('#fechaConclusion').prop('disabled', true);
            }
            $('#modalAnadirObservacion').modal('hide');
            $('#modalAsignarEstatus').fadeIn();
            $('#anadirObservacion').val('');
            $('#btnModalShowPrincipal').trigger('click');
        }

    }

