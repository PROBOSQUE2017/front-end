/**********************************************************************************
               Despues de cargar todo el documento               
***********************************************************************************/

$(document).ready(function() {
    loadNumeroDoucuments('getPanel', amplify.store('dataLoggingProbosque').id);
});
/**********************************************************************************
                             variables del programa             
***********************************************************************************/


/**********************************************************************************
                             f(x) del programa             
***********************************************************************************/
/*var modalError = function(mensaje,btnText) {
    var modal =
        '<div class="modal fade" id="myModalRespError" role="dialog" data-backdrop="static" data-keyboard="false">' +
        '<div class="modal-dialog modal-sm">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<center>' +
        '<h4 style="color: red"><b>' + mensaje + '</b></h4>' +
        '<br>' +
        '<button type="button" class="btn btn-danger" data-dismiss="modal" hidden>'+btnText+'</button>' +
        '</center>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modal;
}*/

var modalSucessCal = function(mensaje,btnText) {
    var modal =
        '<div class="modal fade" id="myModalRespError" role="dialog" data-backdrop="static" data-keyboard="false">' +
        '<div class="modal-dialog modal-sm">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<center>' +
        '<h4 style="color: green"><b>' + mensaje + '</b></h4>' +
        '<br>' +
        '<button type="button" class="btn btn-success" data-dismiss="modal" id="btn-addOk" >'+btnText+'</button>' +
        '</center>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modal;
}

var showSucessCalif = function(msj,texto) {
    $('#divmodalerror').html('');
    $('#divmodalerror').html(modalSucessCal(msj,texto));
    $('#myModalRespError').modal('show');
}


var showErrorCalif = function(msj,texto) {
    $('#divmodalerror').html('');
    $('#divmodalerror').html(modalError(msj,texto));
    $('#myModalRespError').modal('show');
}

function sendAsignar(e) {
    $("#formAsigExpediente").submit();
}

function sendAsignarAbogado() {
    $("#formAsigAbogado").submit();
}

function Modalcorfirmacion(params, varAux, descripcionConfirmcion, back) {
    
    var option='';
    var option2='';
    var mensajeWarning='';
    if (back == 'expediente') {
        option = '<button type="button" class="btn btn-danger" fol="'+params.attr('fol')+'" valSect="'+varAux+'" name="'+params.attr('name')+'" onclick="asigNumExp(this)">Regresar</button>';
        option2 = '<div class="col-md-4 col-sm-12 col-xs-12">' +
        '<button type="button" class="btn btn-default" fol="'+params.attr('fol')+'" aux="'+varAux+'" action="'+back+'" name="'+params.attr('name')+'" onclick="sendAjax(this)">Confirmar</button>';
    } else if (back == 'abogado') {
        option = '<button type="button" class="btn btn-danger" nombre="'+params.attr('nombre')+'" valSect="'+varAux+'" name="'+params.attr('name')+'" onclick="asigAbogado(this)">Regresar</button>';
        option2 = '<div class="col-md-4 col-sm-12 col-xs-12">' +
        '<button type="button" class="btn btn-default" nombre="'+params.attr('nombre')+'" aux="'+varAux+'" action="'+back+'" name="'+params.attr('name')+'" onclick="sendAjax(this)">Confirmar</button>';
    } else if (back == 'estatus') {
        option = '<button type="button" class="btn btn-danger"  valSect="'+varAux+'" name="'+params.attr('name')+'" onclick="asigEstatus(this)">Regresar</button>';
        option2 = '<div class="col-md-4 col-sm-12 col-xs-12">' +
        '<button type="button" class="btn btn-default"  aux="'+varAux+'" action="'+back+'" name="'+params.attr('name')+'"  onclick="sendAjax(this)">Confirmar</button>';
    }

    $('#headerOption').html('');
    $('#bodyOption').html('');
    $('#footerOption').html('');

    $('#headerOption').html('<b>Confirmación</b>');
    if(varAux != '1' &&  back == 'estatus'){
        mensajeWarning=' <label style="color:#FE9A2E">AL ACEPTAR SE HARÁ PÚBLICO EL ESTATUS EN EL PROGRAMA DE MADERA LEGAL </label>';
    }
    $('#bodyOption').html('<center><b>' + descripcionConfirmcion + '<br><br>'+mensajeWarning+'</b></center>');


    $('#footerOption').html(
        '<div class="row">' +
        '<div class="col-md-4 col-md-offset-3 col-sm-12 col-xs-12">' +
         option +
        '</div>' +
        option2 +
        '</div>' +
        '</div>'
    );
}

function asigNumExp(exp) {

    $('#headerOption').html('');
    $('#bodyOption').html('');
    $('#footerOption').html('');
    var valor='';
    var folio='';
    var name='';
    if(typeof $(exp).attr('valSect') == 'undefined'){
        valor='';
    }else{
        valor=$(exp).attr('valSect');
    }

    if(typeof $(exp).attr('fol') == 'undefined'){
        folio='';
    }else{
        folio=$(exp).attr('fol');
    }

    if(typeof $(exp).attr('name') == 'undefined'){
        name='';
    }else{
        name=$(exp).attr('name');
    }

    $('#headerOption').html('<b>Asignar número de expediente</b>');

    $('#bodyOption').html(
        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<form id="formAsigExpediente">' +
        '<div class="row">' +
        '<label>No. de expediente</label>' +
        '<input type="text" class="form-control" name="textNumExpediente" id="textNumExpediente" value="'+valor+'">' +
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
        '<button type="button" id="btnFolio" class="btn btn-default" fol="'+folio+'" name="'+name+'" onclick="sendAsignar(this)">Asignar</button>' +
        '</div>' +
        '</div>'
    );
    eval(loadValidate());
    $('#modalOption').modal('show');

}


$('#btn-addOk').on('click', function(){
    $('#myModalRespError').modal('hide');
});

function ctrlCheckBox() {
    $('#check1').on('click', function() {
        if ($(this).is(':checked')) {
            if ($('#check2').is(':checked')) {
                $('#check2').prop("checked", false);
            }

            $("#formListOption input").each(function() {
                if ($(this).attr('type') == 'checkbox' && $(this).attr('id') != 'check2') {
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

            $("#formListOption input").each(function() {
                if ($(this).attr('type') == 'checkbox' && $(this).attr('id') != 'check2') {
                    $('#' + $(this).attr('id')).prop('disabled', false);
                }
            });
        } else {
            $("#formListOption input").each(function() {
                if ($(this).attr('id') != 'check2') {
                    $('#' + $(this).attr('id')).prop('disabled', true);
                    $('#' + $(this).attr('id')).prop('checked', false);
                }

            });
        }
    });

    $('#check4').on('click', function() {
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

    $('#btnAceptarStatus').on('click', function() {
        var count = 0;
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
                $('#validacionError').html('Selecciona tipo de Suspensión');
            }

        } else {
            $('#validacionError').html('Falta seleccionar estatus');
        }

        if (count == 1) {

            if($('#check1').is(':checked')){
                Modalcorfirmacion($('#btnAceptarStatus'), '1', '¿Está seguro de asignar <u>'+$('#check1').val()+'</u> como estatus ?', 'estatus');
            }else{
                Modalcorfirmacion($('#btnAceptarStatus'), arrayElementSeleted("#formListOption input"), '¿Está seguro de asignar <u>'+selectCheckTexto("#formListOption input")+'</u> como estatus ?', 'estatus');
            }
        }

    });


}


function selectCheckTexto(form) {
    var texto = '';
    var contador= 0;
    $(form).each(function() {

        if ($(this).is(':checked')) {

            if(contador == 1){
                texto += ': ';
            }else if(contador > 1){
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


function arrayElementSeleted(form) {
    var texto='';
    var contador=0;
    $(form).each(function() {
        if ($(this).is(':checked')) {
            if(contador > 0){
                texto += ',';
            }
            texto += $(this).attr('id');
        }
        contador++;   
    });

    return texto;
}


function asigAbogado(abogado) {
    
    var name='';
    var abogadoNombre='';
    var idabogado = '';

    if(typeof $(abogado).attr('name') == 'undefined'){
        name='';
    }else{
        name=$(abogado).attr('name');
    }


    if(typeof $(abogado).attr('nombre') == 'undefined'){
        abogadoNombre='';
    }else{
        abogadoNombre=$(abogado).attr('nombre');
    }
    
    if(typeof $(abogado).attr('valSect') == 'undefined'){
        idabogado='';
    }else{
        idabogado=$(abogado).attr('valSect');
    }
    $('#headerOption').html('');
    $('#bodyOption').html('');
    $('#footerOption').html('');
    $('#headerOption').html('<b>Asignar abogado</b>');

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
        '<button type="button" id="btnAsignarAbogado" idAbogado="'+idabogado+'" nombre="'+abogadoNombre+'" class="btn btn-default"  name="'+name+'" onclick="sendAsignarAbogado(this)">Asignar</button>' +
        '</div>' +
        '</div>'
    );
    getAbogados('getAbogados',amplify.store('dataLoggingProbosque').id,abogado);
    eval(loadValidateAbogado());
    $('#modalOption').modal('show');

}

function asigEstatus(estatus) {

    var name='';
    if(typeof $(estatus).attr('name') == 'undefined'){
        name='';
    }else{
        name=$(estatus).attr('name');
    }


    $('#headerOption').html('');
    $('#bodyOption').html('');
    $('#footerOption').html('');

    $('#headerOption').html('<b>ESTATUS</b>');

    $('#bodyOption').html(
        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<div class="row">' +
                '<div class="col-md-6 col-sm-12 col-xs-12">'+
                    '<div class="col-md-offset-1 col-lg-offset-5 col-sm-offset-5">'+
                    '<img src="../maderable/images/amarillo.png" class="img-circle"  width="20" height="20"> '+
                    '</div>'+
                    '<ul>'+
                        '<li>'+
                            '<div class="checkbox">'+
                            '<label><input type="checkbox" id="check1" value="Inspeccionado en proceso"><b>Inspeccionado en proceso</b></label>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'+
                '</div>'+
                 '<div class="col-md-6 col-sm-12 col-xs-12">'+
                    '<div class="col-md-offset-5 col-lg-offset-5 col-sm-offset-5">'+
                    '<img src="../maderable/images/naranja.png" class="img-circle"  width="20" height="20"> '+
                    '</div>'+
                    '<form id="formListOption">'+
                        '<ul>'+
                            '<li>'+
                                '<div class="checkbox"><label>'+
                                '<input type="checkbox" id="check2" value="Inspeccionado con medida de seguridad">'+
                                '<b>Inspeccionado con medida de seguridad</b></label>'+
                                '</div>'+
                                '<ul>'+
                                    '<li>'+
                                      '<div class="checkbox"><label>'+
                                        '<input type="checkbox" id="check3" value="Aseguramiento" disabled> Aseguramiento'+
                                           '</label></div>'+
                                    '</li>'+
                                    '<li>'+
                                      '<div class="checkbox"><label>'+
                                        '<input type="checkbox" id="check4" value="Clausura" disabled> Clausura'+
                                           '</label></div>'+
                                        '<ul>'+
                                            '<li>'+
                                              '<div class="checkbox"><label>'+
                                                '<input type="checkbox" id="check5" value="Total" disabled> Total'+
                                                   '</label></div>'+
                                            '</li>'+
                                            '<li>'+
                                              '<div class="checkbox"><label>'+
                                                '<input type="checkbox" id="check6" value="Parcial" disabled> Parcial'+
                                                   '</label></div>'+
                                            '</li>'+
                                       ' </ul>'+
                                    '</li>'+
                                    '<li>'+
                                      '<div class="checkbox"><label>'+
                                        '<input type="checkbox" id="check7" value="Suspensión" disabled> Suspensión'+
                                           '</label></div>'+
                                        '<ul>'+
                                            '<li>'+
                                              '<div class="checkbox"><label>'+
                                                '<input type="checkbox" id="check8" value="Total" disabled> Total'+
                                                   '</label></div>'+
                                            '</li>'+
                                            '<li>'+
                                              '<div class="checkbox"><label>'+
                                                '<input type="checkbox" id="check9" value="Parcial" disabled> Parcial'+
                                                   '</label></div>'+
                                            '</li>'+
                                        '</ul>'+
                                    '</li>'+
                                '</ul>'+
                            '</li>'+
                        '</ul>'+
                    '</form>'+
                '</div>'+
                '<div class="col-md-12 col-sm-12 col-xs-12 text-center">'+
                    '<h5 id="validacionError" style="color: red"></h5>'+
                '</div>'+
        '</div>'
    );

    $('#footerOption').html(
        '<div class="row">' +
        '<div class="col-md-4 col-md-offset-3 col-sm-12 col-xs-12">' +
        '<button type="button" class="btn btn-danger" data-dismiss="modal" hidden>Cancelar</button>' +
        '</div>' +
        '<div class="col-md-4 col-sm-12 col-xs-12">' +
        '<button type="button" class="btn btn-default" name="'+name+'" id="btnAceptarStatus">Aceptar</button>' +
        '</div>' +
        '</div>'
    );

    eval(checkBoxSelectedBack(estatus));
    eval(ctrlCheckBox());
    $('#modalOption').modal('show');

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


function checkBoxSelectedBack(checkSelected) {
    if (typeof $(checkSelected).attr('valSect') != 'undefined') {
        for(var tmp = 2; tmp <= 9 ; tmp ++){
            $('#check'+tmp).prop("disabled", false);
        }
        if($(checkSelected).attr('valSect') != 'check1'){
            for(var i=0; i < $(checkSelected).attr('valSect').split(',').length; i++ ){
                $('#'+$(checkSelected).attr('valSect').split(',')[i]).prop("checked", true);
            }
        }else{
            $('#check1').prop("checked", true);
        }
    }
}




function drawTablePlugin(tabla) {
    $("#" + tabla).DataTable({
        scrollX: true,
        scrollY: '55vh',
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
            "info": "Mostrando página _PAGE_ de _PAGES_.  _TOTAL_ registros",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "  de _MAX_ registros totales",
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

$('#tablaRecepcionExpediente').on( 'click', 'tr', function () {
      
       if($(this).hasClass('selected')){
         $(this).removeClass('selected');
       }else{
         $('#tablaRecepcionExpediente > tr').removeClass('selected');
         $(this).toggleClass('selected');
       }
      
} );

/**********************************************************************************
                             Validaciones              
***********************************************************************************/


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
            $('#btnAsignarAbogado').attr({'nombre':$('#selectAbogadoName option:selected').text()});
            Modalcorfirmacion( $('#btnAsignarAbogado'), $('#selectAbogadoName').val(), '¿Está seguro que desea asignar al '+$('#selectAbogadoName option:selected').text()+' como abogado?', 'abogado');
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
            Modalcorfirmacion($('#btnFolio'), $('#textNumExpediente').val() , '¿Está seguro que desea asignar '+ $('#textNumExpediente').val() +' como número de documento?', 'expediente');
            return false;
        }
    });

}


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

jQuery.validator.addMethod("valueNotEquals",
    function(value, element, arg) {
        return arg != value;
    }
);

/**********************************************************************************
                             Peticiones AJAX               
***********************************************************************************/
function loadNumeroDoucuments(actionParams, user) {
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
                    $("#tablaRecepcionExpediente").empty();
                    var cuerpoTabla = document.getElementById("tablaRecepcionExpediente");
                    var numControl = 0;
                    for (var aux in json.data) {
                        numControl++;
                        var folio = ' '
                        var abogado = ' '
                        var expediente = ' ';
                        var clave_unica = ' ';
                        var no_doc = '';
                        var disableEstatus = 'disabled';
                        var disableAbogado = 'disabled';
                        var fila = cuerpoTabla.insertRow();
                        fila.setAttribute('id', 'rengTableListRecep' + numControl);
                        fila.setAttribute('name', numControl);
                        for (var tmp in json.data[aux]) {
                            if (tmp == "abogado") {
                                abogado = json.data[aux][tmp];
                            } else if (tmp == 'expediente') {
                                expediente = json.data[aux][tmp];
                            } else if (tmp == 'folio') {
                                folio = json.data[aux][tmp];
                            } else if (tmp == 'clave_unica'){
                                clave_unica = json.data[aux][tmp];
                            } else if (tmp == 'no_documento'){
                                no_doc = json.data[aux][tmp];
                            }
                        }
                        //Agra filas y columas a la tabla
                        if (no_doc == ' ') {
                            fila.insertCell(-1).innerHTML = '<a fol="' + folio + '" onclick="showPrograma8(this)" id="c' + numControl + '1" href="#">No asignado</a>';
                        } else {
                            fila.insertCell(-1).innerHTML = '<a fol="' + folio + '" onclick="showPrograma8(this)" id="c' + numControl + '1" href="#">' + no_doc + '</a>';
                        }

                        if (clave_unica == ' ') {
                            fila.insertCell(-1).innerHTML = '';
                        } else {
                            fila.insertCell(-1).innerHTML = clave_unica;
                        }

                        if (expediente == ' ') {
                            disableAbogado = 'disabled';
                            var celda= fila.insertCell(-1);
                            celda.setAttribute('id','c' + numControl + '3');
                            celda.setAttribute('align','center');
                            celda.innerHTML = '<button class="btn btn-default" name="' + numControl + '" fol="' + folio + '" onclick="asigNumExp(this)">ASIGNAR</button>';
                        } else {
                            disableAbogado = '';
                            var celda= fila.insertCell(-1);
                            celda.setAttribute('id','c' + numControl + '3');
                            celda.setAttribute('align','center');
                            celda.innerHTML =  expediente ;
                        }

                        if (abogado == ' ') {
                            disableEstatus = 'disabled';
                            fila.insertCell(-1).innerHTML = '<center id="c' + numControl + '4"><button class="btn btn-default" name="' + numControl + '" fol="' + folio + '" onclick="asigAbogado(this)" ' + disableAbogado + '>ASIGNAR</button></center>';
                        } else {
                            disableEstatus = '';
                            fila.insertCell(-1).innerHTML = '<center id="c' + numControl + '4">' + abogado + '</center>';
                        }


                        fila.insertCell(-1).innerHTML = '<center id="c' + numControl + '5"><button name="' + numControl + '" class="btn btn-default" ' + disableEstatus + ' onclick="asigEstatus(this)" >ASIGNAR</button></center>';

                    }
                    drawTablePlugin("tablaNoDocumentos");
                } else {
                    $("#tablaRecepcionExpediente").empty();
                    var cuerpoTabla = document.getElementById("tablaRecepcionExpediente");
                    var fila = cuerpoTabla.insertRow();
                    for (var i = 0; i < 5; i++) {
                        if (i == 2) {
                            fila.insertCell(-1).innerHTML = '<center> No hay inspecciones por atender</center>';
                        } else {
                            fila.insertCell(-1);
                        }
                    }

                    drawTablePlugin("tablaNoDocumentos");
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
    r = $.extend(r, urlServiceOficial);
    r.data = { action: actionParams, idUser: user };
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

function sendAjax(params) {
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
                if ($(params).attr('action') == 'expediente') {                    
                    $('#c' + $(params).attr('name') + '3').html($(params).attr('aux'));
                    $('#c' + $(params).attr('name') + '4').find('button').removeAttr('disabled');
                    $('#tablaNoDocumentos').DataTable().cell( parseInt( $(params).attr('name'))-1, 2 ).data(String($(params).attr('aux')));
                    
                } else if ($(params).attr('action') == 'abogado') {
                    $('#c' + $(params).attr('name') + '4').html($(params).attr('nombre'));
                    $('#c' + $(params).attr('name') + '5').find('button').removeAttr('disabled');
                    $('#tablaNoDocumentos').DataTable().cell( parseInt( $(params).attr('name'))-1, 3 ).data('<center>'+$(params).attr('nombre')+'</center>');

                } else if ($(params).attr('action') == 'estatus') {
                    if ($('#tablaRecepcionExpediente > tr').length == 0) {
                        $('#tablaRecepcionExpediente').append(
                            '<tr>' +
                            '<td></td>' +
                            '<td></td>' +
                            '<td align="center">' +
                            'No hay inspecciones por atender' +
                            '</td>' +
                            '<td></td>' +
                            '<td></td>' +
                            '</tr>'

                        );
                    }
                    $('#tablaNoDocumentos').DataTable().destroy();
                    $('#rengTableListRecep' + $(params).attr('name')).remove();
                    drawTablePlugin("tablaNoDocumentos");
                    
                }


                $('#modalOption').modal('hide');
                showSucessCalif(mensaje, 'Aceptar');
            } else {

                showErrorCalif(mensaje, 'Aceptar');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showErrorCalif("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceOficial);

    if ($(params).attr('action') == 'expediente') {
        r.data = {
            action: 'setExpediente',
            expediente: $(params).attr('aux').trim(),
            folio: $(params).attr('fol'),
            idUser: amplify.store('dataLoggingProbosque').id
        };
    } else if ($(params).attr('action') == 'abogado') {
        r.data = {
            action: 'setAbogado',
            expediente: $('#tablaNoDocumentos').DataTable().cell( parseInt( $(params).attr('name'))-1, 2 ).data(),
            //expediente: $('#c' + $(params).attr('name') + '3').text().trim(),
            idAbogado: $(params).attr('aux').trim(),
            idUser: amplify.store('dataLoggingProbosque').id
        };
    } else if ($(params).attr('action') == 'estatus') {
        r.data = {
            action: 'setEstatus',
            noExpediente: $('#tablaNoDocumentos').DataTable().cell( parseInt( $(params).attr('name'))-1, 2 ).data(),
            //noExpediente: $('#c' + $(params).attr('name') + '3').text().trim(),
            estatus: getStatusSelected($(params).attr('aux').trim()),
            idUser: amplify.store('dataLoggingProbosque').id
        };
    }

    $.ajax(r);
}
