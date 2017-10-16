/**
 * @fileoverview auditoria.js  Este archivo contiene las funciones correspondientes a las auditorias
 * @author Ivan Tadeo Huerta <ivantec5sem@gmail.com>
 *
 */

 /**
  * @constant
  * @type {string} urlConexion 
  * @default
  */

  const urlConexion = 'http://localhost:8080/ServiceBosque/AuditoriasPreventivas';


 /**
  * @constant
  * @type {object jquery} modal 
  * @default
  */

  const modal =  $('#modalFichaDetalle');


/**
  * @constant
  * @type {object jquery} tituloModal 
  * @default
  */

  const tituloModal =   modal.find('#tituloModal');


/**
  * @constant
  * @type {object jquery} detalleMultiRegistro 
  * @default
  */

  const detalleMultiRegistro =   modal.find('#detalleMultiRegistro');


/**
  * @constant
  * @type {object jquery} fichaPrincipal 
  * @default
  */

  const fichaPrincipal =   modal.find('#fichaPrincipal');

/**
  * @constant
  * @type {object jquery} flechaRegreso 
  * @default
  */

  const flechaRegreso =   modal.find('#flechaRegreso');


/**
  * @constant
  * @type {object jquery} multiRegistros 
  * @default
  */

  const multiRegistros =   modal.find('#multiRegistros');

 /**
  * @constant
  * @type {object jquery} cajaDetexto 
  * @default
  */
  const cajaDetexto =  $('#buscar');

/**
  * @constant
  * @type {object jquery} combo 
  * @default
  */
  const combo =  $('#opcionBusqueda'); 


/**
  * @constant
  * @type {object jquery} mensajeError 
  * @default
  */
  const mensajeError =  $('#errormsgBusqueda');

/**
  * @constant
  * @type {Array.<PredioRepresentanteDTO>} arregloDeRepresentantes 
  */
  let arregloDeRepresentantes;  

/**
  * @constant
  * @type {Array.<PredioPoligonosDTO>} arregloDePoligonos 
  */
  let arregloDePoligonos; 

/**
  * @constant
  * @type {object jquery} bodyModalHistorial
  * @default
  */
  let bodyModalHistorial = $('#historial').find('.modal-body'); 

  /**
  * @constant
  * @type {object jquery} etiquetaFolio
  * @default
  */
  let etiquetaFolio = $('#historial').find('#etiquetaFolio');

/**
  * @constant
  * @type {object jquery} btnHistorial
  * @default
  */
  let btnHistorial = $('#btn-Historial');  

/**
  * @constant
  * @type {object jquery} modalHistorial
  * @default
  */
  let modalHistorial = $('#historial');  

  /**
  * @constant
  * @type {object jquery} comboAuditoria
  * @default
  */
  let comboAuditoria = $('#solicitudAuditoria');  

  /**
  * @constant
  * @type {object jquery} fechaAuditoria
  * @default
  */
  let fechaAuditoria = $('#fechaAuditoria'); 
  
  /**
  * @constant
  * @type {object jquery} agregaAuditoria
  * @default
  */
  let agregaAuditoria = $('#agregaAuditoria');  
  
  /**
  * @constant
  * @type {} EventosHistorial
  * @default
  */
 const EventosHistorial = {

     loadCalendario: function(calendario,clase) {
        let idCalendario =  clase + ($(calendario).attr('data-info'));
        agregaCalendario(calendario,'down');
     },
     eventoCombo: function(combo,calendario) {
       
        
         $(combo).change(function() {
            let id =  $(this).attr('data-info');
            $(calendario+id).val('');

            if($(this).val()=='true'){

                $(calendario+id).prop('disabled',false);

            }else if($(this).val()=='false'){

                $(calendario+id).prop('disabled',true);
            }
         
         });
     },
     init: function() {
         this.loadCalendario('.calendario','.conText');
         this.eventoCombo('.comboHistorial','.conText');
     }
 };


/**
 * @function abrirFicha
 * @param  {JSON} data - JSON con los datos del predio
 * @return  {object}
 */
var abrirFicha = function (data) {

    tituloModal.html('Detalle');
    flechaRegreso.hide();
    multiRegistros.hide();
    detalleMultiRegistro.hide();
    fichaPrincipal.show();


    let ficha = htmlFicha(data);
    fichaPrincipal.html(ficha);
    modal.modal('show');
}

/**
 * @function htmlFicha
 * @param  {JSON} data - JSON con los datos del predio
 * @return  {string}
 */
var htmlFicha = (data) =>{
    return `<div class="row">
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Estado</label>
                    <input type="text" class="form-control" value="México" readonly>
                </div> 

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Región</label>
                    <input type="text" class="form-control" value="${data.region}" readonly>
                </div>  

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Municipio</label>
                    <input type="text" class="form-control" value="${data.modulopredio_municipio}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Localidad</label>
                    <input type="text" class="form-control" value="${data.modulopredio_localidad}" readonly>
                </div>         
            </div>

            <div class="row">
                <br>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Clave única de identificación</label>
                    <input type="text" class="form-control" value="${data.folio}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                <br>
                    <label>SEDEMEX</label>
                    <input type="text" class="form-control" value="${data.cve_sedemex}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                <br>
                    <label>Nombre del Predio</label>
                    <input type="text" class="form-control" value="${data.predio}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                <br>
                    <label>Tipo de tenencia de la tierra</label>
                    <input type="text" class="form-control" value="${data.cve_tenencia}" readonly>
                </div>    
            </div>

            

            <div class="row">
                <br>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Descripción de cómo llegar al predio</label>
                    <input type="text" class="form-control" value="${data.descripcion_llegada_predio}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Latitud(UTM)</label>
                    <input type="text" class="form-control" value="${data.latitud}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Longitud(UTM)</label>
                    <input type="text" class="form-control" value="${data.longitud}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Superficie total (has)</label>
                    <input type="text" class="form-control" value="${data.superficie_total}" readonly>
                </div>
            </div>

            <div class="row">
                <br>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Superficie cartográfica (has)</label>
                    <input type="text" class="form-control" value="${data.superficie_cartografica}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Superficie arbolada (has)</label>
                    <input type="text" class="form-control" value="${data.superficie_arbolada}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Superficie otros usos (has)</label>
                    <input type="text" class="form-control" value="${data.superficie_otros}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Cuenca especifica</label>
                    <input type="text" class="form-control" value="${data.cuenca}" readonly>
                </div>
            </div>

            <div class="row">
                <br>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Área natural protegida</label>
                    <input type="text" class="form-control" value="${data.anp}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Estatus del predio</label>
                    <input type="text" class="form-control" value="${data.estatus}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Observaciones del predio</label>
                    <input type="text" class="form-control" value="${data.observaciones}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Propietario o representante</label>
                    <div class="input-group">
                        <input type="text" class="form-control" readonly>
                        <span class="input-group-btn">
                            <button type="submit" data-info="${data.folio}" class="btn btn-success" onclick="consultaPropietarios(this)">Registros</button>
                        </span>
                    </div>          
                </div>
            </div>

            <div class="row">
                <br>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Polígonos del predio</label>
                    <div class="input-group">
                        <input type="text" class="form-control" readonly>
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-success" data-info="${data.folio}" onclick="consultaPoligonos(this)">Registros</button>
                        </span>
                    </div>   
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Imagenes</label>
                    <div class="input-group">
                        <input type="text" class="form-control" readonly>
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-success" data-info="${data.folio}" onclick="consultaImagenes(this)">Registros</button>
                        </span>
                    </div>   
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Registro Forestal Nacional</label>
                    <input type="text" class="form-control" value="${data.registroforestal_nacional}" readonly>
                </div>

                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Permiso Aprovechamiento Forestal</label>
                    <input type="text" class="form-control" value="${data.permiso_aprovechamiento}" readonly>
                </div>
            </div>
 
    `;
}


cajaDetexto.keyup(function(){

    let texto = $(this).val().trim()
    let opcionCombo = combo.val()
    limpiaDatosFicha();
    resetFormulario();

    if(texto.length == 0){
        mensajeError.html('')
    }else if(texto.length > 0 && opcionCombo == '-2ws'){
        mensajeError.html('Seleccione una opción')
    }else{
        mensajeError.html('')
        getPredios(texto,opcionCombo,urlConexion)
    }
          
});


combo.change(function() {

    let opcion = $(this).val()
    let texto = cajaDetexto.val().trim()
    let enlace = $('#showPredio')

    limpiaDatosFicha()
    resetFormulario();
    if (opcion != '-2ws' && texto.length > 0) {
        mensajeError.html('')
        getPredios(texto, opcion, urlConexion)
    } else if (opcion == '-2ws') {
        $('#bodyAllPredios').empty();
    }

});

comboAuditoria.change(function(){

    let opcion = $(this).val();
    
    if(opcion == 'true'){
        fechaAuditoria.prop('disabled',false);
        agregaAuditoria.prop('disabled',false);
        fechaAuditoria.val(fecha_hoy());
    }else if(opcion == 'false'){
       fechaAuditoria.val('');
       fechaAuditoria.prop('disabled',true);
       agregaAuditoria.prop('disabled',true);
    }

});

agregaAuditoria.on('click', function(e){
    let fecha = fechaAuditoria.val().trim();
    let idPredio = $(this).attr('data-info');
    let auditoria = comboAuditoria.val();
    $('#errorFecha').html('');
      if(fecha_valida(fecha)){

        switch(comparaFecha(fecha)){
            case 'menor':
                alertaAgregar("De clic en Aceptar para confirmar", "warning", "#F7BE81", "La fecha ya pasó. ¿Esta seguro de agregar auditoría?",idPredio,fecha,auditoria);
            break;
            case 'mayor':
                alertaAgregar("De clic en Aceptar para confirmar", "question", "#808B96", "¿Esta seguro de agregar auditoría?",idPredio,fecha,auditoria);
            break;
            case 'igual':
                alertaAgregar("De clic en Aceptar para confirmar", "warning", "#F7BE81", "La fecha es igual a hoy. ¿Esta seguro de agregar auditoría?",idPredio,fecha,auditoria);
            break;

            default:
                alertaError('Intenta nuevamente');

        }
      }else{
        $('#errorFecha').html('Fecha no valida. Formato dd/mm/yyyy');
      }

});

Date.prototype.getMonthFormatted = function() {
  let month = this.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month;
}

Date.prototype.getDiaFormatted = function() {
  let dia = this.getDate();
  return dia < 10 ? '0' + dia : '' + dia;
}


/**
 * @function fecha_hoy
 * @return {Date} Regresa la fecha en formato dd/mm/YYYY
 */
function fecha_hoy(){
    let fecha = new Date();
    return `${fecha.getDiaFormatted()}/${fecha.getMonthFormatted()}/${fecha.getFullYear()}`;
}

/**
 * @function fecha_valida
 * @param {Date} f - Fecha 
 * @return {boolean} Si el formato de fecha es correcto regresa true
 */
let fecha_valida = (f) => /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(f);

/**
 * @function comparaFecha
 * @param  {String} f - Es la fecha de auditoria
 * @return {String} Comparacion respecto a la fecha actual
 */
var comparaFecha =(f) =>{
    let fecha = new Date();
    let t = `${fecha.getDiaFormatted()}/${fecha.getMonthFormatted()}/${fecha.getFullYear()}`;
    let d = new Date(t.split("/")[2], (t.split("/")[1] - 1),t.split("/")[0]);

    let fa = new Date(f.split("/")[2], (f.split("/")[1] - 1),f.split("/")[0]);

    let tipo = (fa.getTime() == d.getTime())? 'igual': ( (fa.getTime() < d.getTime())? 'menor' : 'mayor');

    return tipo;
}


flechaRegreso.on('click', function(e){

      if($(this).attr('data-option') == 'multiRegistros'){

            tituloModal.html('Detalle');
            flechaRegreso.attr({'data-seccion':'principal','data-option':'principal'});
            detalleMultiRegistro.hide();
            fichaPrincipal.show();
            flechaRegreso.hide();
            multiRegistros.hide();

      }else if($(this).attr('data-option') == 'detalleMultiRegistro'){
            
            if ($(this).attr('data-seccion')=='Propietario'){
                tituloModal.html('Propietarios o Representantes');
            }else if($(this).attr('data-seccion') == 'Poligonos'){
                tituloModal.html('Poligonos');
            }
            flechaRegreso.attr({'data-option':'multiRegistros'});
            fichaPrincipal.hide();
            flechaRegreso.show();
            multiRegistros.show();
            detalleMultiRegistro.hide();

      }
});


btnHistorial.on('click', function(e){
    

    let folio = ($(this).attr('data-info')!='')? mostrarHistorial($(this).attr('data-info')) : alertaInfo('Seleccione predio');



});

/**
 * @function resetFormulario
 */
function resetFormulario() {
    let enlace = $('#showPredio');
    $('#errorFecha').html('');
    enlace.attr('data', '');
    btnHistorial.attr('data-info', '');
    agregaAuditoria.attr('data-info', '');
    btnHistorial.prop('disabled', true);
    fechaAuditoria.prop('disabled', true);
    agregaAuditoria.prop('disabled', true);
    comboAuditoria.val('false');
    comboAuditoria.prop('disabled', true);
    fechaAuditoria.val('');
}

/**
 * @function mostrarHistorial
 * @param  {String} folio - folio del predio a consultar
 */
function mostrarHistorial(folio){
 
   historialAuditoriaTecnica(urlConexion, folio);
}



/**
 * @function consultaPoligonos
 * @param  {object jquery} element - Objecto DOM 
 */
function consultaPoligonos(element){
    let clavePredio = $(element).attr('data-info');
    getPredioPoligonos(urlConexion, clavePredio);
}



/**
 * @function consultaImagenes
 * @param  {object jquery} element - Objecto DOM 
 */
function consultaImagenes(element){
    let clavePredio = $(element).attr('data-info');
    getPredioImagen(urlConexion, clavePredio);
}



/**
 * @function consultaPropietarios
 * @param  {object jquery} element - Objecto DOM 
 */
function consultaPropietarios(element){
    let clavePredio = $(element).attr('data-info');
    getPredioRepresentantes(urlConexion, clavePredio);
}


/**
 * @function selectIdPredio
 * @param  {object jquery} element - Objecto DOM 
 */
function selectIdPredio(element) {
    let clave = $(element).attr('id');
    let tiene = $("#" + clave).hasClass('seleccion');    
     let enlace = $('#showPredio');
    $("#tabla tr").removeClass('seleccion');
    limpiaDatosFicha();

    if (tiene) {
        $("#" + clave).removeClass('seleccion');
        resetFormulario();
    } else {
        $("#" + clave).addClass('seleccion');
        getDetallePredio(urlConexion, clave);
        enlace.val(clave);
        enlace.attr('data', clave);
        agregaAuditoria.attr('data-info',clave);
        btnHistorial.attr('data-info',clave);
        comboAuditoria.prop('disabled',false);
        btnHistorial.prop('disabled',false);
    }
}


/**
 * @function pintaDatosEnFicha
 * @param  {JSON} datos - Contiene los datos de ubicacion del predio
 */
function pintaDatosEnFicha(datos){

    $("#textoMunicipio").html(datos.municipio)
    $("#textoRegion").html(datos.region)
    $("#textoLocalidad").html(datos.localidad)

}

/**
 * @function limpiaDatosFicha
 */
function limpiaDatosFicha(){

    $("#textoMunicipio").html('')
    $("#textoRegion").html('')
    $("#textoLocalidad").html('')
    $('#showPredio').attr('data','')
}

/**
 * @function agregaCalendario
 * @param  {object jquery} element - Objecto DOM 
 * @param  {String} drops - como se mostrara el calendario
 * @param  {String} idElement - identificador de la caja de texto
 */
function agregaCalendario(element, drops='up') {
    $(element).daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        showDropdowns: true,
        drops: drops,
        locale: {
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

        }

    }, function(chosen_date) {
        let selectorId= this.element.context.id;
        $('#'+selectorId).val(chosen_date.format('DD/MM/YYYY'));
    });
}

/**
 * @function updateConsecutivo
 * @param  {object jquery} element - Objecto DOM 
 */
function updateConsecutivo(element){
    let consecutivo = $(element).attr('data-consecutivo');
    let opcionCombo = $('.conCombo'+consecutivo).val().trim();
    let titulo = (opcionCombo == 'true')? '¿Esta seguro de actualizar la fecha?' : '¿Esta seguro de eliminar la fecha de auditoria?';
    let fecha = $('.conText'+consecutivo).val().trim();
    let predio = $(element).attr('data-folio');

    swal({
        title: titulo,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#808B96',
        cancelButtonColor: '#BDBDBD',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si!',
        allowOutsideClick:false,
        allowEnterKey:false
    }).then(function() {
        updateAuditoriaTecnica(urlConexion,consecutivo,predio,opcionCombo,fecha);
    })
}

/**
 * @function eliminaConsecutivo
 * @param  {object jquery} element - Contiene objecto del DOM
 */
function eliminaConsecutivo(element) {
    swal({
        title: '¿Esta seguro de eliminar?',
        text: "",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#808B96',
        cancelButtonColor: '#BDBDBD',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar',
        allowOutsideClick:false,
        allowEnterKey:false
    }).then(function() {
        deleteAuditoriaTecnica(urlConexion, $(element).attr('data-folio'), $(element).attr('data-consecutivo'));
    })
}

/**
 * @function pintaDatosEnFicha
 * @param  {object jquery} element - Contiene objecto del DOM
 */
function showPredio(element){
    let clavePredio = ($(element).attr('data') == '' || $(element).attr('data') == undefined) ? null : $(element).attr('data');

    (clavePredio == null)? alertaInfo('Busque y seleccione un predio'): getTodosDetallesPredio(urlConexion,clavePredio);
    
}

/**
 * @function plantillaHistorial
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla de historial con codigo html
 */
function plantillaHistorial(arr){
    
    let renglones = '';
    let renglon = `<tr id="renTanbla:consecutivo:">
                     <td>:fecha:</td>
                     <td>:auditoriaTecnica:</td>
                     <td><center><button type="submit" data-consecutivo=":consecutivo:" data-folio=":folio:" onclick="eliminaConsecutivo(this)" class="btn btn-success">Eliminar</button></center></td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).
                            replace(/:folio:/g,value.idPredio).
                            replace(':fecha:',stringCalendarioInput(value.fechaATP.trim().replace('00:00:00',''),value.auditoriaTecnica,value.consecutivo)).
                            replace(':auditoriaTecnica:',stringCombo(value.auditoriaTecnica,value.consecutivo));
    });

    renglones= (renglones == '')? `<tr><td colspan="4"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Auditoría técnica</th>
                            <th><center>Eliminar</center></th>
                          </tr>
                        </thead>
                        <tbody>
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
    return html;
}

/**
 * @function stringCombo
 * @param  {boolean} param - si es auditoria
 * @param  {number} consecutivo
 * @return  {String} retorna un combo
 */
let stringCombo = (param, consecutivo) =>{
    let option= (param == true)? `<option value="true" selected>SI</option><option value="false">NO</option>`:
                                    `<option value="true">SI</option><option value="false" selected>NO</option>`;

    let comboHtml = `<select class="form-control comboHistorial conCombo${consecutivo}" data-info="${consecutivo}" disabled>
                        ${option}
                    </select>`;
    return comboHtml;
}

/**
 * @function stringCalendarioInput
 * @param  {Date} fecha - fecha en que se necesita auditorias
 * @param  {boolean} b - si necesita auditoria
 * @param  {boolean} consecutivo 
 * @return  {String} retorna un combo
 */
let stringCalendarioInput = (fecha = '', b = false, consecutivo ) =>{
    //let disabled = (!b)? 'disabled': '';
    let disabled = 'disabled';
    let comboHtml = `<input type="text" class="form-control calendario conText${consecutivo}" id="calendario${consecutivo}" value="${fecha}" ${disabled}>`;
    return comboHtml;
}




/**
 * @function plantillaRepresentates
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla con codigo html
 */
function plantillaRepresentates(arr){

    arregloDeRepresentantes = arr.slice();
    
    let renglones = '';
    let renglon = `<tr data-consecutivo=":consecutivo:" onmouseover="this.style.cursor='pointer'" onclick="mostrarDetallePropietario(this)">
                     <td>:consecutivo:</td>
                     <td>:folio:</td>
                     <td>:nombre:</td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(':folio:',value.folio).replace(':nombre:',value.nombre_propietario_representante);
    });

    renglones= (renglones == '')? `<tr><td colspan="3"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Folio</th>
                            <th>Nombre del Propietario</th>
                          </tr>
                        </thead>
                        <tbody>
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
    return html;
}



/**
 * @function plantillaPoligonos
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla con codigo html
 */
function plantillaPoligonos(arr){

    arregloDePoligonos = arr.slice();
    
    let renglones = '';
    let renglon = `<tr data-consecutivo=":consecutivo:" onmouseover="this.style.cursor='pointer'" onclick="mostrarDetallePoligono(this)">
                     <td>:consecutivo:</td>
                     <td>:folio:</td>
                     <td>:accion_agraria:</td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(':folio:',value.folio).replace(':accion_agraria:',value.accion_agraria);
    });

    renglones= (renglones == '')? `<tr><td colspan="3"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Folio</th>
                            <th>Acción agraría</th>
                          </tr>
                        </thead>
                        <tbody>
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
  
    return html;
    
}


/**
 * @function mostrarDetallePoligono
 * @param  {object} element - objecto  DOM
 */
function mostrarDetallePoligono(element){
    detalleMultiRegistro.html(plantillaDetallePoligono.call(arregloDePoligonos, element));
    tituloModal.html('Poligonos');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    fichaPrincipal.hide();
    flechaRegreso.show();
    multiRegistros.hide();
    detalleMultiRegistro.show();
}

/**
 * @function plantillaDetallePoligono
 * @param  {object} element - objecto  DOM
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetallePoligono(element){

    let consecutivo = $(element).attr('data-consecutivo');
    
    let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');
    
    
    let formulario =`<div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Consecutivo</label>
                                <input type="text" class="form-control" value="${this[posicion].consecutivo}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Folio</label>
                                <input type="text" class="form-control" value="${this[posicion].folio}" readonly>
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Acción agraria</label>
                                <input type="text" class="form-control" value="${this[posicion].accion_agraria}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Fecha de publicación en el DOF</label>
                                <input type="text" class="form-control" value="${this[posicion].fecha_publicacion_dof}" readonly>
                            </div>
                        </div>
                    </div>  

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Fecha de resolución presidencial</label>
                                <input type="text" class="form-control" value="${this[posicion].fecha_resolucion_presidencial}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Fecha de asamblea de procede</label>
                                <input type="text" class="form-control" value="${this[posicion].fecha_asamblea_procede}" readonly>
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Documento que ampara la propiedad</label>
                                <input type="text" class="form-control" value="${this[posicion].documento_ampara_propiedad}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Número del documento que ampara la propiedad</label>
                                <input type="text" class="form-control" value="${this[posicion].numero_documento_ampara_propiedad}"  readonly>
                            </div>
                        </div>
                    </div>   

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Latitud (UTM)</label>
                                <input type="text" class="form-control" value="${this[posicion].latitud}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Longitud (UTM)</label>
                                <input type="text" class="form-control" value="${this[posicion].longitud}" readonly>
                            </div>
                        </div>
                    </div>   

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Superficie del polígono (Ha)</label>
                                <input type="text" class="form-control" value="${this[posicion].superficie_poligono}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Superficie cartográfica (Ha)</label>
                                <input type="text" class="form-control" value="${this[posicion].superficie_cartografica}" readonly>
                            </div>
                        </div>
                    </div>  

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Superficie arbolada (Ha)</label>
                                <input type="text" class="form-control" value="${this[posicion].superficie_arbolada}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Superficie otros usos (Ha)</label>
                                <input type="text" class="form-control" value="${this[posicion].superficie_otros_usos}" readonly>
                            </div>
                        </div>
                    </div>  

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Tipo de clima</label>
                                <input type="text" class="form-control" value="${this[posicion].tipo_clima}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Tipo de vegetación</label>
                                <input type="text" class="form-control" value="${this[posicion].tipo_vegetacion}" readonly>
                            </div>
                        </div>
                    </div>  

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Tipo de fisiografía</label>
                                <input type="text" class="form-control" value="${this[posicion].tipo_fisiografia}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Corrientes intermitentes</label>
                                <input type="text" class="form-control" value="${this[posicion].corrientes_intermitentes}" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Corrientes permanentes</label>
                                <input type="text" class="form-control" value="${this[posicion].corrientes_permanentes}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Manantiales y/u ojos de agua</label>
                                <input type="text" class="form-control" value="${this[posicion].manantiales_ojos_agua}" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Manantiales y/u ojos de agua que abastecen</label>
                                <input type="text" class="form-control" value="${this[posicion].manantiales_ojos_agua_abastecen}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Erosión</label>
                                <input type="text" class="form-control" value="${this[posicion].erosion}" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Especies arbóreas</label>
                                <input type="text" class="form-control" value="${this[posicion].especies_arboreas}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Distribución del estrato arbustivo</label>
                                <input type="text" class="form-control" value="${this[posicion].distribucion_estrato_arbustivo}" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Distribución de renuevo</label>
                                <input type="text" class="form-control" value="${this[posicion].distribucion_renuevo}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Cobertura promedio del arbolado</label>
                                <input type="text" class="form-control" value="${this[posicion].cobertura_promedio_arbolado}" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Fauna</label>
                                <input type="text" class="form-control" value="${this[posicion].fauna}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6">
                                <label>Observaciones del polígono</label>
                                <input type="text" class="form-control" value="${this[posicion].observaciones_poligono}" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <label>Figura</label>
                                <input type="text" class="form-control" value="${this[posicion].figura_polygono}" readonly>
                            </div>
                        </div>
                    </div>`;
    

    return formulario;
}


/**
 * @function plantillaImagenes
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla con codigo html
 */
function plantillaImagenes(arr){

    arregloDeImagenes = arr.slice();
    
    let renglones = '';
    let renglon = `<tr>
                     <td>:consecutivo:</td>
                     <td>:descripcion:</td>
                     <td>:fecha:</td>
                     <td><a href="#" download="/:url:/">Ver Imagen</a></td>
                    <td>:campoAsociado:</td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(':descripcion:',value.descripcion).replace(':fecha:',value.fecha)
                    .replace(/:url:/,value.url).replace(':campoAsociado:',value.campoasociado);
    });

    renglones= (renglones == '')? `<tr><td colspan="5"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Imagen</th>
                            <th>Campo Asociado</th>
                          </tr>
                        </thead>
                        <tbody>
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
  
    return html;
    
}



/**
 * @function mostrarDetallePropietario
 * @param  {object} element - objecto  DOM
 */

function mostrarDetallePropietario(element) {
    detalleMultiRegistro.html(plantillaDetalleRepresentante.call(arregloDeRepresentantes, element));
    tituloModal.html('Propietarios o Representantes');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    fichaPrincipal.hide();
    flechaRegreso.show();
    multiRegistros.hide();
    detalleMultiRegistro.show();

}

/**
 * @function plantillaDetalleRepresentante
 * @param  {object} element - objecto  DOM
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetalleRepresentante(element){

    let consecutivo = $(element).attr('data-consecutivo');
    
    let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');
    
    
    let formulario =`<div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Consecutivo</label>
                                <input type="text" class="form-control" value="${this[posicion].consecutivo}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Folio</label>
                                <input type="text" class="form-control" value="${this[posicion].folio}" readonly>
                            </div>
                        </div> 
                    </div>
                    
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del propietario o representante</label>
                                <input type="text" class="form-control" value="${this[posicion].nombre_propietario_representante}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del secretario o representante Legal</label>
                                <input type="text" class="form-control" value="${this[posicion].nombre_secretario_representante_legal}" readonly>
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del tesorero</label>
                                <input type="text" class="form-control" value="${this[posicion].nombre_tesorero}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Curp del propietario o representante</label>
                                <input type="text" class="form-control" value="${this[posicion].curp_propietario_o_representante}" readonly>
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Inicio del periodo</label>
                                <input type="text" class="form-control" value="${this[posicion].inicio_periodo}" readonly>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Fin del periodo</label>
                                <input type="text" class="form-control" value="${this[posicion].fin_periodo}" readonly>
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Observaciones de la administración</label>
                                <input type="text" class="form-control" value="${this[posicion].observaciones_administracion}" readonly>
                            </div>                            
                        </div>
                    </div>`;
    

    return formulario;
}

/**
 * @function arrayObjectIndexOf
 * @param  {Array.<PredioRepresentanteDTO>} arr - Arreglo de objectos
 * @param  {string} searchTerm - Valor de a buscar en el areglo
 * @param  {string} property -  Propiedad en la cual se buscará searchTerm
 * @return {number}  indica la posicion del valor buscado
 */
function arrayObjectIndexOf(arr, searchTerm, property) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i][property] === searchTerm) {
            return i;
        }
    }
    return -1;
}


/**
 * @function getPredios
 * @param  {string} texto - Cadena que va a buscar
 * @param  {string} accion - Contiene getPredio o getRepresentante
 * @param  {string} url - url del service 
 * @return  {object}
 */

function getPredios(texto,accion,url) {
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:accion,text:texto, clave:''},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){

            if(resp.response.sucessfull){
               
            

                let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
                let cabecera = document.getElementById("headInfo");
                cabecera.innerHTML= 'Descripción';
                table.innerHTML='';

                if(resp.data.length > 0)
                {
                   var i=0;
                   for( var x in resp.data){
                        i+=1;
                        var row = table.insertRow(-1);
                        row.setAttribute("width","100%");
                        row.setAttribute("id",resp.data[x].value);
                        row.setAttribute("onclick","selectIdPredio(this)");
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
          
                        cell1.setAttribute("width","16%")
                        cell2.setAttribute("width","72%");
                        cell3.setAttribute("width","1%");
                        cell4.setAttribute("width","1%");
                        cell5.setAttribute("width","1%");


                        cell1.innerHTML=resp.data[x].value;
                        cell2.innerHTML=resp.data[x].label;
                    }
                }else{
                        let row = table.insertRow(-1);
                        let cell1= row.insertCell(-1);
                        row.insertCell(-1);
                        row.insertCell(-1);
                        row.insertCell(-1);
                        row.insertCell(-1);
                        cell1.setAttribute("width","100%");
                    
                        cell1.innerHTML='<center>No se encontraron predios</center>';
                }
            }else{
                alertaError(resp.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
              
        }

    }); 
   
}

/**
 * @function getDetallePredio
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getDetallePredio(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getDetallePredio',clave:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            if(data.response.sucessfull){
                pintaDatosEnFicha(data.data);
            }else{
                alertaError(data.response.message);
            }
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
                 
        }

    }); 
}

/**
 * @function getTodosDetallesPredio
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getTodosDetallesPredio(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getAllPredio',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            if(data.response.sucessfull){
                abrirFicha(data.data[0]);
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
              alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');      
        }

    }); 
}

/**
 * @function getPredioRepresentantes
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getPredioRepresentantes(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getPredioRepresentantes',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            
            if(data.response.sucessfull){
                tituloModal.html('Propietarios o Representantes');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'Propietario'});
                detalleMultiRegistro.hide();
                fichaPrincipal.hide();
                flechaRegreso.show();
                multiRegistros.show();
                multiRegistros.html(plantillaRepresentates(data.data));
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');           
        }

    }); 
}


/**
 * @function getPredioImagen
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getPredioImagen(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getPredioImagen',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            
            if(data.response.sucessfull){
                tituloModal.html('Imagenes');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'imagenes'});
                detalleMultiRegistro.hide();
                fichaPrincipal.hide();
                flechaRegreso.show();
                multiRegistros.show();
                multiRegistros.html(plantillaImagenes(data.data));
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');           
        }

    }); 
}


/**
 * @function getPredioPoligonos
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getPredioPoligonos(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getPredioPoligonos',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            
            if(data.response.sucessfull){
                tituloModal.html('Poligonos');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'Poligonos'});
                detalleMultiRegistro.hide();
                fichaPrincipal.hide();
                flechaRegreso.show();
                multiRegistros.show();
                multiRegistros.html(plantillaPoligonos(data.data));
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}

/**
 * @function historialAuditoriaTecnica
 * @param  {string} folio - folio del predio
 * @param  {string} url - url del service 
 */
function historialAuditoriaTecnica(url,folio) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'historialAuditoriaTecnica',idPredio:folio},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            etiquetaFolio.html('');
            if(data.response.sucessfull){
               etiquetaFolio.html('Predio: '+folio);
               bodyModalHistorial.html(plantillaHistorial(data.data));
               EventosHistorial.init();
               modalHistorial.modal('show');
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            etiquetaFolio.html('');
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}

/**
 * @function setAuditoriaTecnica
 * @param  {string} url -  url del service
 * @param  {string} idPredio - clave del predio
 * @param  {Date} fechaAuditoria - fecha en que se solicita auditoria
 * @param  {boolean} auditoria   
 */
function setAuditoriaTecnica(url,idPredio,fechaAuditoria,auditoria) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'setAuditoriaTecnica',idPredio:idPredio,fechaAuditoria:fechaAuditoria,auditoria:auditoria},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            if(data.response.sucessfull){
               alertaExito(data.response.message);
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}


/**
 * @function deleteAuditoriaTecnica
 * @param  {string} folio - folio del predio
 * @param  {string} url - url del service 
 * @param  {string} consecutivo
 */
function deleteAuditoriaTecnica(url,folio,consecutivo) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'deleteAuditoriaTecnica',idPredio:folio,consecutivo:consecutivo},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
           
            if(data.response.sucessfull){
            //$("#mi-tabla tr").length 
               $('#renTanbla'+consecutivo).remove();
               alertaExito('Se elimino correctamente');
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}

/**
 * @function updateAuditoriaTecnica
 * @param  {string} url - url del service 
 * @param  {string} idPredio - clave del predio
 * @param  {number} consecutivo - identificador de la auditoria
 * @param  {boolean} auditoria - hay audutoria o no
 * @param  {Date} fechaAuditoria - fecha en que se solicita
 */
function updateAuditoriaTecnica(url,consecutivo,idPredio,auditoria,fechaAuditoria) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'updateAuditoriaTecnica',consecutivo:consecutivo,idPredio:idPredio,auditoria:auditoria,fechaAuditoria:fechaAuditoria},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
           
            if(data.response.sucessfull){
               alertaExito(data.response.message);
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}


var alertaError = function(mensaje) {
  swal({
        title: "Ocurrio un error",
        text: mensaje,
        type: "error",
        confirmButtonColor: "#F78181",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false,
        allowOutsideClick:false,
        allowEnterKey:false
  });
}

var alertaAgregar = function(mensaje = "", tipo = "info", color = "#5499C7", titulo = "", idPredio = '' , fecha='', b=false) {
    swal({
        title: titulo,
        text: mensaje,
        type: tipo,
        showCancelButton: true,
        confirmButtonColor: color,
        cancelButtonColor: '#BDBDBD',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEnterKey: false
    }).then(function() {
        (b)? setAuditoriaTecnica(urlConexion,idPredio,fecha,b):alertaInfo('Busque y seleccione un predio');
    })
}


var alertaInfo = function(mensaje='',html='',titulo="Información") {
    swal({
        title: titulo,
        text: mensaje,
        html: html,
        type: "info",
        confirmButtonText: "Aceptar"
    });
}

var alertaExito = function(mensaje) {
    swal({
        title: "Exito!",
        text: mensaje,
        type: "success",
        confirmButtonColor: "#04B431",
        confirmButtonText: "Aceptar"
    });
}

$('#btnRegresar').on('click',function(){
   window.location.assign("/SIFEM/index.html");
});

$('#btnhelpme').on('click',function(){
    let help = `<b>Para agregar una auditoría debe:</b><br>
                      1.- Buscar un predio por nombre o representante.<br>
                      2.- Seleccionar dando clic sobre el predio.<br>
                      3.- En el segundo panel seleccionar <b>SI</b> en la opcíon Solicito auditoría técnica preventiva<br>
                      4.- Hacer clic sobre la caja de texto Fecha de auditoría técnica y elegir fecha<br>
                      5.- Dar clic en boton <b>Agregar</b>`;
    alertaInfo('',help,'Ayuda');
});

agregaCalendario(fechaAuditoria);









