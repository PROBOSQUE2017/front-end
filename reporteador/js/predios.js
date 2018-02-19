/**
 * @fileoverview predios.js  Este archivo contiene las funciones correspondientes al modulo de predios 
 * @author Ivan Tadeo Huerta <ivantec5sem@gmail.com>
 * @version 1.2.0
 *
 */

 /**
  * @constant
  * @type {string} url
  * @default
  */

  const url= 'http://localhost:8080/' ;
  /**
  * @constant
  * @type {string} urlConexionCatalogos 
  * @default
  */
  const urlConexionCatalogos =  url+'Probosque/CargaInicial';
  const urlConexionPredios =   url+'Probosque/Predios';
  const urlConexionMultiRegistro =   url+'Probosque/MultiRegistro';
  const urlconexionArchivo =  url+'Probosque/Archivo';
  const urlConexionService =  url+'ServiceBosque/AuditoriasPreventivas';
  const urlConexionServiceUpload =  url+'ServiceBosque/UploadShape';
  const urlConexionHistorialAuditoria =  url+'ServiceBosque/AuditoriasPreventivas';




 /**
  * @constant
  * @type {object jquery} modal 
  * @default
  */

  const modal =  $('#modalFichaDetalle');

   /**
  * @constant
  * @type {object jquery} modal 
  * @default
  */

  const modalObsDesc =  $('#modalObservacionesDesc');


   /**
  * @constant
  * @type {object jquery} divContenidoCatalogos 
  * @default
  */

  const divContenidoCatalogos =  $('#divContenidoCatalogos');


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
  * @type {object jquery} textoTmp 
  * @default
  */
   const textoTmp = modalObsDesc.find('#texto');


/**
  * @constant
  * @type {object jquery} cerrarDescObs 
  * @default
  */
   const cerrarDescObs = modalObsDesc.find('#cerrarDescObs');

   

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
  * @type {object jquery} modalHistorial
  * @default
  */
  let modalHistorial = $('#historial');  


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
  * @type {Array.<MultiRegistroImagenesDTO>} arregloDeImagenes 
  */
  let arregloDeImagenes; 


/**
  * @constant
  * @type {object jquery} panelFicha 
  * @default
  */
  let panelFicha =  $('#panelFicha');

/**
  * @constant
  * @type {object jquery} tituloAccion 
  * @default
  */
  let tituloAccion =  panelFicha.find('#tituloAccion');

/**
  * @constant
  * @type {object jquery} bodyPanelFicha 
  * @default
  */
  let bodyPanelFicha =  panelFicha.find('#bodyPanelFicha'); 


/**
  * @constant
  * @type {object jquery} btnAccion 
  * @default
  */
  let btnAccion =  $('#btnAccion'); 

  /**
  * @constant
  * @type {object jquery} rowFind 
  * @default
  */
  let rowFind =  $('#rowFind'); 

 
/**
  * @constant
  * @type {object jquery} btnSearch 
  * @default
  */
  let btnSearch =  $('#btn-search'); 



  /**
  * @constant
  * @type {object jquery} addOptionMultiRegistro 
  * @default
  */
  let addOptionMultiRegistro = $('#addOptionMultiRegistro');
  /**
  * @type {boolean} multiregistroBandera 
  * @default
  */
  var multiregistroBandera =  false;

  /**
  * @type {array} catalogosRegiones
  */
  var catalogosRegiones;

  /**
  * @type {array} catalogosMunicipio 
  */
  var catalogosMunicipio; 

  /**
  * @type {array} catalogosTipoTenencia 
  */
  var catalogosTipoTenencia;

  /**
  * @type {array} catalogosCuenca 
  */
  var catalogosCuenca;

  /**
  * @type {array} catalogosApn 
  */
  var catalogosApn;

  /**
  * @type {array} catalogosAceptableAaprovechamiento 
  */
  var catalogosAceptableAaprovechamiento;

  /**
  * @type {array} catalogosEstatus 
  */
  var catalogosEstatus;

  /**
  * @type {array} catalogosLocalidades 
  */
  var catalogosLocalidades;
  
  /**
  * @type {array} catalogosClima 
  */
  var catalogosClima

  /**
  * @type {array} catalogosEspecies 
  */
  var catalogosEspecies

  /**
  * @type {array} catalogosCampos 
  */
  var catalogosCampos

  /**
  * @type {array} catalogosVegetacion 
  */
  var catalogosVegetacion

   /**
   * Propiedades que tendra la ventana Popup.
   * @const {string} caracteristicas
   */
   const caracteristicas = "height="+(parseInt(screen.height)-100)+",width="+(parseInt(screen.width)-100)+",scrollTo,resizable=0,scrollbars=1,location=0";                              
   
   /**
   * Construye y abre  una ventana 
   * @returns {object}
   */                              
   const  openWindows = ()=> window.open('http://localhost:800/SIFEM/toolMaps/poligonos.html', 'Popup', caracteristicas);


/**
 * @function abrirFicha
 * @param  {JSON} data - JSON con los datos del predio
 * @return  {object}
 */
var abrirFicha = function (data) {
    
    let region = JSON.parse(JSON.stringify(catalogosRegiones));
    let municipios = JSON.parse(JSON.stringify(catalogosMunicipio));
    let tenencia =  JSON.parse(JSON.stringify(catalogosTipoTenencia));
    let estado =  JSON.parse(JSON.stringify(catalogosEstatus));
    let ap =  JSON.parse(JSON.stringify(catalogosAceptableAaprovechamiento));
    let localidades =  JSON.parse(JSON.stringify(catalogosLocalidades));
    multiregistroBandera = true;

    tituloAccion.html('Datos del predio');

    let ficha = htmlFicha(data,'find',region,municipios,localidades,tenencia,estado,ap);
    bodyPanelFicha.html(ficha);

    panelFicha.show();
    validaFormulario('#formularioPredios');
}



/**
 * @function htmlFicha
 * @param  {JSON} data - JSON con los datos del predio
 * @param {Stirng} action - Accion que podra hacer el usuario 
 * @return  {string}
 */
var htmlFicha = (data, action,cRegiones,cMunicipio,cLocalidades,cTipoTenencia,cEstatus,csAceptableAaprovechamiento) =>{
    
    let botones='';
    let disabled='';
    let opcionEjecutar='';
    let camposDeAuditoria='';

    switch(action){
        case 'add':
            camposDeAuditoria=''
            opcionEjecutar = 'add';
            botones = `<button type="submit" class="btn btn-success btn-aceptar">Agregar predio</button>
                   <button type="button" class="btn btn-default btn-reset">Limpiar formulario</button>`;
          break;
        case 'find':
            opcionEjecutar = 'update';
            disabled = 'disabled';

            camposDeAuditoria=`<div class="row">
                                    <br>
                                    <div class="col-md-3 col-sm-12 col-xs-12" style="margin-top: 25px;">
                                        <button type="button" data-info="${getTexto(data.folio)}" onclick="verHistoriaAuditoria(this)" class="btn btn-success btn-block" data-info="" style="font: icon;">
                                           Ver historial de auditorias
                                        </button>
                                    </div>
                                   
                                    <div class="col-md-3 col-sm-12 col-xs-12" style="margin-top: 25px;">
                                        <button type="button" data-folio="${getTexto(data.folio)}" onclick="importar(this)" class="btn btn-success btn-block" data-info="" style="font: icon;">
                                            Importar shape
                                        </button>
                                    </div>
                                </div>`;

            botones = `<button type="button" class="btn btn-default btn-delete">Eliminar</button>
                      <button type="submit"  class="btn btn-success btn-update">Actualizar</button>`;
          break;
    }
   
    return `<form id="formularioPredios" autocomplete="off" onsubmit="return false;" data-action="${opcionEjecutar}">
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Estado</label>
                        <input type="text" class="form-control" value="México" readonly>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Región</label>
                        <select name="region" class="form-control comboRegiones" ${disabled}>
                            ${contruirComboSimple(cRegiones, data.id_region)}
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Municipio</label>
                        <select name="municipio" class="form-control comboMunicipio" ${disabled}>
                             ${contruirComboSimple(MunicipiosPorRegion(cMunicipio,data.id_region),data.id_municipio)}
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Localidad</label>
                        <select name="localidad" class="form-control comboLocalidad" ${disabled}>
                           ${contruirComboSimple(LocalidadPorMunicipio(cLocalidades,data.id_municipio),data.id_localidad)}
                        </select>
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Clave Única de Predio</label>
                        <input type="text" id="InputclaveUnicaIdentificacion" name="claveUnicaIdentificacion" class="form-control" value="${getTexto(data.folio)}" readonly>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>SEDEMEX</label>
                        <input type="text" name="sedemex" value="${getTexto(data.cve_sedemex)}" class="form-control">
                        
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Nombre del Predio</label>
                        <input type="text" name="nombrePredio" value="${getTexto(data.predio)}" class="form-control">
                        
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Tipo de tenencia de la tierra</label>
                        <select name="tipoTenenciaTierra" class="form-control">
                            ${contruirComboSimple(cTipoTenencia,data.id_tenencia)}
                        </select>
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Descripción de cómo llegar al predio</label>
                        <input type="text" id="desc" name="descripcionComoLlegarPredio" value="${getTexto(data.llegada_predio)}" class="form-control" onclick="openModalObsDes(this,'Descripción de cómo llegar al predio')">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Latitud(UTM)</label>
                        <input type="text" name="latitud" value="${getTexto(data.latitud)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Longitud(UTM)</label>
                        <input type="text" name="longitud" value="${getTexto(data.longitud)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie total (has)</label>
                        <input type="text" name="superficieTotal" value="${getTexto(data.superficie_total)}" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie cartográfica (has)</label>
                        <input type="text" name="superficieCartografica"  value="${getTexto(data.superficie_cartografica)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie arbolada (has)</label>
                        <input type="text" name="superficieArbolada" value="${getTexto(data.superficie_arbolada)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie otros usos (has)</label>
                        <input type="text" name="superficieOtrosUsos" value="${getTexto(data.superficie_otros)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Cuenca especifica</label>
                         <div class="input-group">
                            <input type="hidden" name="cuencaEspecifica" id="idDeCuencasHidden" value="${getTexto(data.cuenca)}">
                            <input type="text"  name="cuencaEspecificaDescriptivo" value="${getTexto(data.cuenca_descripcion,true)}" class="form-control cuencaEspecifica" readonly>
                              <span class="input-group-btn">
                                    <button type="button" data-catalogo="cuenca" data-select="${getTexto(data.cuenca)}" id="btnCuencaClic" class="btn btn-success ctgo">clic</button>
                              </span>                  
                         </div>
                        
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Área natural protegida</label>
                        <div class="input-group">
                            <input type="hidden" name="areaNaturalProtegida" id="idAreaNaturalProtegidaHidden"  value="${getTexto(data.anp)}">
                            <input type="text" name="areaNaturalProtegidaDescriptivo" value="${getTexto(data.anp_descripcion,true)}" class="form-control areaNaturalProtegida" readonly>
                             <span class="input-group-btn">
                                    <button type="button" data-catalogo="anp" data-select="${getTexto(data.anp)}" id="btnApnClic" class="btn btn-success ctgo">clic</button>
                             </span>  
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Estatus del predio</label>
                        <select name="estatusPredio" class="form-control">
                            ${contruirComboSimple(cEstatus,data.id_estatus)}
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Observaciones del predio</label>
                        <input type="text" name="observacionesPredio" id="obs" value="${getTexto(data.observaciones)}" class="form-control" onclick="openModalObsDes(this,'Observaciones')">                        
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Propietario o representante</label>
                        <div class="input-group">
                            <input type="text" name="propietarioRepresentante" class="form-control" readonly>
                            <span class="input-group-btn">
                                    <button type="button" data-info="${getTexto(data.folio)}" class="btn btn-success multiregistro" data-multi="propietario">Registros</button>
                                </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Polígonos del predio</label>
                        <div class="input-group">
                            <input type="text" name="poligonosPredio" class="form-control" readonly>
                            <span class="input-group-btn">
                                    <button type="button" class="btn btn-success multiregistro" data-info="${getTexto(data.folio)}" data-multi="poligono" >Registros</button>
                                </span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Imagenes</label>
                        <div class="input-group">
                            <input type="text" name="imagenes" class="form-control" readonly>
                            <span class="input-group-btn">
                                    <button type="button" class="btn btn-success multiregistro" data-info="${getTexto(data.folio)}" data-multi="imagen">Registros</button>
                                </span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Registro Forestal Nacional</label>
                        <input type="text" name="registroForestalNacional" value="${getTexto(data.registroforestal_nacional)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Permiso Aprovechamiento Forestal</label>
                        <select name="permisoAprovechamientoForestal" class="form-control">
                            ${contruirComboSimple(csAceptableAaprovechamiento,data.id_aprovechamiento)}
                        </select>
                    </div>
                </div>
                ${camposDeAuditoria}
                <div class="row">
                    <br><br>
                    <div class="col-md-offset-5 col-sm-offset-5">
                        ${botones}
                    </div>
                </div>
            </form>
    `;
}

btnAccion.on('click', function(){
     let action = $(this).attr('data-info');
      arregloDeRepresentantes = [];
      arregloDePoligonos = [];
      arregloDeImagenes = [];

     (action == 'addPredio')? agregarPredio('Consultar un predio','findPredio'): buscarPredio('Agregar predio','addPredio');
});






panelFicha.on('click', '.btn-reset', function(){

    multiregistroBandera = false;
    $('.btn-aceptar').show();
    $(this).html('Limpiar formulario');
    $('.ctgo').removeClass('bloqueado');
    $('#btnCuencaClic,#btnApnClic').attr({'data-select':''});
    $('#formularioPredios').validate().resetForm();
    $("input[type=hidden]").val('');

    $('.multiregistro').attr('data-info','');
    document.getElementById('formularioPredios').reset();
    cleanCombo('.comboMunicipio , .comboLocalidad');

    $('#formularioPredios').find(':input').each(function() {
         $(this).prop('disabled', false);
    });
});

panelFicha.on('click', '.multiregistro', function() {

    let opcion = $(this).attr('data-multi');
    let btnAgregar = $('#addOptionMultiRegistro');
    btnAgregar.attr('data-option', '');
    $('#observacionesText').hide();

    if (multiregistroBandera) {

        let clavePredio = $(this).attr('data-info');
        btnAgregar.attr('data-option', opcion);
        opcion == 'propietario' ? getPredioRepresentantes(urlConexionMultiRegistro, clavePredio) : (opcion == 'poligono') ? getPredioPoligonos(urlConexionMultiRegistro, clavePredio) : getPredioImagen(urlConexionMultiRegistro, clavePredio);
    
    } else {

        alertaInfo('', '<p>Para agregar multiregistros de ' + opcion + ' guarde primero la ficha de predio. Haciendo <b>clic</b> en el boton <b>Agregar predio</b></p>', 'Información')
    
    }
});

panelFicha.on('click','.btn-delete',function(){
    let clave = $('#formularioPredios').find('#InputclaveUnicaIdentificacion').val();
    
      swal({
        title: '¿ Esta seguro de eliminar el predio '+clave+' ?' ,
        type: 'question',
        html: '<p>Toda la Información relacionada al predio será eliminada</p>',
        showCancelButton: true,
        confirmButtonColor: '#808B96',
        cancelButtonColor: '#BDBDBD',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si!',
        allowOutsideClick: false,
        allowEnterKey: false
    }).then(function() {
        deletePredio(urlConexionPredios,clave);
    })
});

panelFicha.on('change','.comboRegiones', function(){
      let idRegion = parseInt($(this).val());
      let municipios = JSON.parse(JSON.stringify(catalogosMunicipio));

      $('.comboMunicipio').empty();
      let el = contruirComboSimple(MunicipiosPorRegion(municipios,idRegion));
      $('.comboMunicipio').append(el);
      
      cleanCombo('.comboLocalidad');      

});


panelFicha.on('change','.comboMunicipio', function(){
      let idMunicipio = parseInt($(this).val());
      let localidades = JSON.parse(JSON.stringify(catalogosLocalidades));
      
      $('.comboLocalidad').empty();
      let el = contruirComboSimple(LocalidadPorMunicipio(localidades,idMunicipio));
      $('.comboLocalidad').append(el);
});


cerrarDescObs.on('click',function(e){

    if($(this).attr('data-info') == 'observaciones'){
      $('#obs').val(textoTmp.val());
      $('#obs').attr('disabled',false);
    }else if( $(this).attr('data-info') == 'descripcion'){
      $('#desc').val(textoTmp.val());
      $('#desc').attr('disabled',false);
    }


});



/*
* @function openModalObsDes
* @param {Object DOM} el - elemento del DOM
* @Description Abre modal con el texto contenido en el input
*/
function openModalObsDes(el, titulo){
    textoTmp.val($(el).val());

    $(el).attr('disabled',true);

    if(titulo == 'Observaciones'){
      cerrarDescObs.attr('data-info','observaciones');
    }else{
      cerrarDescObs.attr('data-info','descripcion');
    }
    
    modalObsDesc.find('#titulo').html(titulo);
    modalObsDesc.modal('show');
}

/*
* @function ocultarModal
* @param {Object DOM} el - elemento del DOM
* @param {Object DOM} option - opcion de multiregistro
* @Description Oculta formulario y muestra text area
*/
function ocultarModal(el, option){
    let texto =  $(el).val();
    let divDetalle = $('#detalleObservaciones');
    let html = `<div id="observacionesText">
                    <b>:titulo:</b>  
                    <textarea id="textAreaDetalle" name="textarea" rows="10" cols="120">${ texto }</textarea>
                </div>`;

    switch(option){
        case 'poligono':
            flechaRegreso.attr({'data-option':'observacionesTextArea' });
            $('#formularioPoligono').hide();
            divDetalle.html( html.replace(':titulo:', 'Observaciones del polígono') );
            divDetalle.show();
        break;
        case 'propietario':
            flechaRegreso.attr({'data-option':'observacionesTextArea' });
            $('#formularioRepresentante').hide();
            divDetalle.html( html.replace(':titulo:', 'Observaciones de la administración') );
            divDetalle.show();
        break;
        case 'imagen':
            flechaRegreso.attr({'data-option':'observacionesTextArea' });
            $('#formularioImagen').hide();
            divDetalle.html( html.replace(':titulo:', 'Descripción') );
            divDetalle.show();
        break;
    }

}

/*
* @param {array} arg - Catalogo completo de municipios
* @param {String} idRegion - lo que se busca en el arreglo
* @return {array} - Regresa un arreglo filtrado
*/
function MunicipiosPorRegion(arg , idRegion){
    return  arg.filter((datos, index) => datos.region_municipio == idRegion);
}

/*
* @param {array} arg - Catalogo completo localidad
* @param {String} idMunicipio - lo que se busca en el arreglo
* @return {array} - Regresa un arreglo filtrado
*/
function LocalidadPorMunicipio(arg , idMunicipio){
    return  arg.filter((datos, index) => datos.id_municipio == idMunicipio);
}

  
cajaDetexto.keypress(function(e){
    if(e.which == 13) {
       buscaPredio();
    }           
}); 


btnSearch.on('click', function(){
  buscaPredio();
});



combo.change(function() {
    resetFormulario();
    mensajeError.html('');
    $('#bodyAllPredios').html('');
});


addOptionMultiRegistro.on('click', function() {
    let opcion = $(this).attr('data-option');
    if (opcion == 'propietario') {
        mostrarDetallePropietario(this);
    }else if(opcion == 'poligono'){
       mostrarDetallePoligono(this);
    }else if(opcion == 'imagen'){
        mostrarDetalleImagen(this);
    }
});

/**
 * @function getTexto
 * @param {String} dato - Campo de la cadena JSON 
 * @param {boolean} bandera - si es el descriptivo de los catalogos separado por comas
 * @return {String}
 */
function getTexto(dato, bandera=false){
  if(bandera){
    return (typeof dato == undefined || dato == null)? '' : dato.replace(/,/g,' ');
  }else{
    return (typeof dato == undefined || dato == null)? '' : dato ;
  }
}




Date.prototype.getMonthFormatted = function() {
  let month = this.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month;
}

Date.prototype.getDiaFormatted = function() {
  let dia = this.getDate();
  return dia < 10 ? '0' + dia : '' + dia;
}


$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};


/**
 * @function eliminaElementoSeleccionado
 * @param {array} arr - Array de elementos seleccionados
 * @param {int} item -  opcion a eliminar
 * @return {array} Retorna arreglo con dato eliminado
 */
function eliminaElementoSeleccionado( arr, item ){
    let i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );

    return arr;
};


/**
 * @function buscaPredio
 */
function buscaPredio(){
    let texto = cajaDetexto.val().trim()
    let opcionCombo = combo.val()
    
    resetFormulario();

    if(texto.length == 0){
        mensajeError.html('')
    }else if(texto.length > 0 && opcionCombo == '-2ws'){
        mensajeError.html('Seleccione una opción')
    }else if(texto.length > 0){
        mensajeError.html('')
        getPredios(texto,opcionCombo,urlConexionService)
    }
}


/*
 * @function importar
 * @param {Object jquery} el 
 */
function importar( el ){
      let folio = $(el).attr('data-folio') || '';

      const modal =  `<div class="modal fade" id="modalUpload" role="dialog" data-backdrop="static" data-keyboard="false">
                        <div class="modal-dialog modal-sm">
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                              <h4 class="modal-title text-center">Seleccione el archivo a importar para el predio ${folio}</h4>
                            </div>
                            <div class="modal-body">
                                <form id="formularioShape" onsubmit="return false" enctype="multipart/form-data">
                                      <div class="form-group">
                                        <input type="hidden" name="user" value="1">
                                        <input type="hidden" name="layername" value="${folio}">
                                        <input type="hidden" name="capa" value="LIMITES">
                                        <input name="file" class="form-control" id="archivoShapeSelected" type="file" accept=".zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed">
                                        <label style="color:red" id="mensajeError"></label>
                                        <br>
                                        <input type="button" class="btn btn-success btn-block" onclick="UploadShapeValida()" value="Cargar">
                                      </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                            </div>
                          </div>
                        </div>
                      </div>`;

    $('#uploadShapeDiv').html(modal);
    $('#modalUpload').modal('show')    
};


/**
 * @function UploadShapeValida
 * @description Valida y envia datos para subir en el shape
 */
function UploadShapeValida() {
    if ($('#archivoShapeSelected').val()) {
        $('#mensajeError').html('');
        let  formData = new FormData($('#formularioShape')[0]);
        UploadShape(urlConexionServiceUpload,formData);
    } else {
        $('#mensajeError').html('Seleccione el archivo');
    }
}



/*
* @function verHistoriaAuditoria
* @param {object} el - elemento del DOM
* @description esta funcion determina que accion ejecutar
*/
function verHistoriaAuditoria(el) {

   let folio = ($(el).attr('data-info')!='')? historialAuditoriaTecnica(urlConexionHistorialAuditoria,$(el).attr('data-info')) : alertaInfo('Seleccione predio');
}  
   


/**
 * @function agregarPredio
 * @param {String} text - Texto del boton
 * @param {String} clase - class del boton
 * @description Prepara la vista para agregar un nuevo predio.
 */
function agregarPredio(text, clase){

    let region = JSON.parse(JSON.stringify(catalogosRegiones));
    let municipios = JSON.parse(JSON.stringify(catalogosMunicipio));
    let tenencia =  JSON.parse(JSON.stringify(catalogosTipoTenencia));
    let estado =  JSON.parse(JSON.stringify(catalogosEstatus));
    let ap =  JSON.parse(JSON.stringify(catalogosAceptableAaprovechamiento));
    let localidades =  JSON.parse(JSON.stringify(catalogosLocalidades));

    let ficha = htmlFicha({},'add',region,municipios,localidades,tenencia,estado,ap);
    
    multiregistroBandera = false;
    bodyPanelFicha.html(ficha);  

    validaFormulario('#formularioPredios');

    rowFind.hide();
    btnAccion.html(text);
    btnAccion.attr({'data-info':clase});
    tituloAccion.html('Agregar Predio');
    panelFicha.show();

    combo.val('-2ws');
    cajaDetexto.val('');
    mensajeError.html('');
    $('#bodyAllPredios').empty();
}

/**
 * @function buscarPredio
 * @param {String} text -Texto del boton
 * @param {String} clase - class del boton
 * @description Prepara la vista para consultar informacion de un predio.
 */
function buscarPredio(text, clase){
   btnAccion.html(text);
   btnAccion.attr({'data-info':clase});
   panelFicha.hide();
   rowFind.show();
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


flechaRegreso.on('click', function(e){
      e.preventDefault();
      if($(this).attr('data-option') == 'multiRegistros'){

            tituloModal.html('Detalle');
            flechaRegreso.attr({'data-seccion':'principal','data-option':'principal'});
            detalleMultiRegistro.hide();
            flechaRegreso.hide();
            multiRegistros.hide();
            addOptionMultiRegistro.hide();
            


      }else if($(this).attr('data-option') == 'detalleMultiRegistro'){
            
            if ($(this).attr('data-seccion')=='Propietario'){
                tituloModal.html('Propietarios o Representantes');
            }else if($(this).attr('data-seccion') == 'Poligonos'){
                tituloModal.html('Poligonos');
            }
            flechaRegreso.attr({'data-option':'multiRegistros'});
            flechaRegreso.hide();
            multiRegistros.show();
            detalleMultiRegistro.hide();
            addOptionMultiRegistro.show();

      }else if($(this).attr('data-option') == 'observacionesTextArea'){

           flechaRegreso.attr({'data-option':'detalleMultiRegistro'});
           
           if ($(this).attr('data-seccion')=='Propietario'){
            
                let texto = $('#textAreaDetalle').val();
                $('#inputObservacionesPropietario').val( texto );
                $('#detalleObservaciones').hide();
                $('#formularioRepresentante').show();
            
            }else if($(this).attr('data-seccion') == 'Poligonos'){
                let texto = $('#textAreaDetalle').val();
                $('#inputObservacionesPoligono').val( texto );
                $('#detalleObservaciones').hide();
                $('#formularioPoligono').show();
                
            }else if(($(this).attr('data-seccion') == 'imagenes')){
                let texto = $('#textAreaDetalle').val();
                $('#descripcionImagen').val(texto);
                $('#detalleObservaciones').hide();
                $('#formularioImagen').show();


            }

      }
});


/**
 * @function resetFormulario
 */
function resetFormulario() {
    panelFicha.hide();
    tituloAccion.html('');
}

/**
 * @function agregaInputFile
 */
function agregaInputFile(el){
   
    let opcion = $(el).attr('data-info');

    if(opcion == 'no'){

          let input = `<label>&nbsp;&nbsp;</label> 
                 <input type="file" name="file" accept="application/pdf, image/*" class="form-control">`;
         $(el).attr('data-info','si');
         $('#espacioInput').html(input);
         $(el).val('No remplazar');

    }else if(opcion == 'si'){

          $(el).attr('data-info','no');
         $('#espacioInput').html('');
         $(el).val('Remplazar')
      
    }
    
   
}

/**
 * @function selectIdPredio
 * @param  {object jquery} element - Objecto DOM 
 */
function selectIdPredio(element) {
    let clave = $(element).attr('id');
    let tiene = $("#" + clave).hasClass('seleccion');    
    
    $("#tabla tr").removeClass('seleccion');
    
    arregloDeRepresentantes = [];
    arregloDePoligonos = [];
    arregloDeImagenes = [];

    if (tiene) {
        $("#" + clave).removeClass('seleccion');
        multiregistroBandera = false;

        resetFormulario();
    } else {
        
        $("#" + clave).addClass('seleccion');
        getTodosDetallesPredio(urlConexionPredios, clave);
    }
}






/**
 * @function agregaCalendario
 * @param  {object jquery} element - Objecto DOM 
 * @param  {String} drops - como se mostrara el calendario
 * @param  {String} idElement - identificador de la caja de texto
 */
function agregaCalendario(element, drops='up') {
	let fecha = new Date();
    if($(element).length > 0 && typeof($(element).data('daterangepicker')) == 'object') $(element).data('daterangepicker').remove();
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

        },
        startDate: '01te-01-'+fecha.getFullYear()

    }, function(chosen_date) {
        let selectorId= this.element.context.id;
        $(element).val(chosen_date.format('DD-MM-YYYY'));
    });
}


/**
 * @function plantillaRepresentantes
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla con codigo html
 */
function plantillaRepresentantes(arr){

    arregloDeRepresentantes = arr.slice();
    
    let renglones = '';
    let renglon = `<tr class="renglon:consecutivo:">
                     <td>:consecutivo:</td>
                     <td>:folio:</td>
                     <td>:nombre:</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo=":consecutivo:" onclick="mostrarDetallePropietario(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo=":consecutivo:" data-folio=":folio:" data-info="Propietario" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(/:folio:/g,value.folio).replace(':nombre:',value.nombre_propietario_representante);
    });

    renglones= (renglones == '')? `<tr class="sinRegistros"><td colspan="5"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Folio</th>
                            <th>Nombre del Propietario</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyTablaPropietario">
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
    let renglon = `<tr class="renglon:consecutivo:">
                     <td>:consecutivo:</td>
                     <td>:folio:</td>
                     <td>:accion_agraria:</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo=":consecutivo:" onclick="mostrarDetallePoligono(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo=":consecutivo:" data-folio=":folio:" data-info="Poligono" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(/:folio:/g,value.folio).replace(':accion_agraria:',value.accion_agraria);
    });

    renglones= (renglones == '')? `<tr class="sinRegistros"><td colspan="5"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Folio</th>
                            <th>Acción agraría</th>
                            <th>Actualizar</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyTablaPoligono">
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

    let catalogVegetacion = JSON.parse(JSON.stringify(catalogosVegetacion));
    let catalogClima = JSON.parse(JSON.stringify(catalogosClima));
    let catalogEspecies = JSON.parse(JSON.stringify(catalogosEspecies));
    detalleMultiRegistro.html(plantillaDetallePoligono.call(arregloDePoligonos, element,catalogVegetacion,catalogEspecies,catalogClima));
    tituloModal.html('Poligonos');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    flechaRegreso.show();
    addOptionMultiRegistro.hide();    
    multiRegistros.hide();
    detalleMultiRegistro.show();
    agregaCalendario('.fechaPublicacionDof','down');
    agregaCalendario('.fechaResolucionPresidencial','down');
    agregaCalendario('.fechaAsambleaProcede','down');
    validaFormularioPoligono('#formularioPoligono');
}

/**
 * @function plantillaDetallePoligono
 * @param  {object} element - objecto  DOM
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetallePoligono(element, cVegetacion, cEspecies, cClima){
    let option = $(element).attr('data-action');
    let valueFolio =  ''; 
    let botones = '';
    let display = '';
    let opcionEjecutar = '';
    
    self = '';
    
    if(option == 'agregar'){

        opcionEjecutar= 'add';
        botones = '<button type="submit" id="agregarMultiPoligono" class="btn btn-success">Agregar multiregistro</button>';
        display= 'style="display:none"';
        valueFolio = $(element).attr('data-info');

    }else if(option == 'update'){

        opcionEjecutar= 'update';

        botones = '<button type="submit" id="actualizarMultiPoligono" class="btn btn-success">Actualizar</button>';

        let consecutivo = parseInt($(element).attr('data-consecutivo'));
    
        let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');

        (posicion > -1)? self = this[posicion] : '';
        (posicion > -1)? valueFolio =  self.folio : valueFolio='';
    }

    
    
    let formulario =`<form id="formularioPoligono" onsubmit="return false" autocomplete="off" data-action="${opcionEjecutar}">
                        <div class="form-group" ${display}>
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Consecutivo</label>
                                    <input type="text" class="form-control" name="consecutivo" value="${getTexto(self.consecutivo)}" readonly>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Folio</label>
                                    <input type="text" class="form-control" name="folio" value="${getTexto(valueFolio)}" readonly>
                                </div>
                            </div>
                        </div> 

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Acción agraria</label>
                                    <input type="text" class="form-control" name="accion_agraria" value="${getTexto(self.accion_agraria)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fecha de publicación en el DOF</label>
                                    <input type="text" class="form-control fechaPublicacionDof" name="fecha_publicacion_dof" value="${getTexto(self.fecha_publicacion_dof)}">
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fecha de resolución presidencial</label>
                                    <input type="text" class="form-control fechaResolucionPresidencial" name="fecha_resolucion_presidencial" value="${getTexto(self.fecha_resolucion_presidencial)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fecha de asamblea de procede</label>
                                    <input type="text" class="form-control fechaAsambleaProcede" name="fecha_asamblea_procede" value="${getTexto(self.fecha_asamblea_procede)}">
                                </div>
                            </div>
                        </div> 

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Documento que ampara la propiedad</label>
                                    <input type="text" class="form-control" name="documento_ampara_propiedad" value="${getTexto(self.documento_ampara_propiedad)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Número del documento que ampara la propiedad</label>
                                    <input type="text" class="form-control" name="numero_documento_ampara_propiedad" value="${getTexto(self.numero_documento_ampara_propiedad)}" >
                                </div>
                            </div>
                        </div>   

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Latitud (UTM)</label>
                                    <input type="text" class="form-control" name="latitud" value="${getTexto(self.latitud)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Longitud (UTM)</label>
                                    <input type="text" class="form-control" name="longitud" value="${getTexto(self.longitud)}">
                                </div>
                            </div>
                        </div>   

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie del polígono (Ha)</label>
                                    <input type="text" class="form-control" name="superficie_poligono" value="${getTexto(self.superficie_poligono)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie cartográfica (Ha)</label>
                                    <input type="text" class="form-control" name="superficie_cartografica" value="${getTexto(self.superficie_cartografica)}">
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie arbolada (Ha)</label>
                                    <input type="text" class="form-control" name="superficie_arbolada" value="${getTexto(self.superficie_arbolada)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie otros usos (Ha)</label>
                                    <input type="text" class="form-control" name="superficie_otros_usos" value="${getTexto(self.superficie_otros_usos)}">
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Tipo de clima</label>
                                    <select name="tipo_clima" class="form-control">
                                          ${contruirComboSimple(cClima, self.id_tipo_clima)}
                                    </select>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Tipo de vegetación</label>
                                     <select name="tipo_vegetacion" class="form-control">
                                           ${contruirComboSimple(cVegetacion, self.id_tipo_vegetacion)}
                                     </select> 
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Tipo de fisiografía</label>
                                    <input type="text" class="form-control" name="tipo_fisiografia" value="${getTexto(self.tipo_fisiografia)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Corrientes intermitentes</label>
                                    <input type="text" class="form-control" name="corrientes_intermitentes" value="${getTexto(self.corrientes_intermitentes)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Corrientes permanentes</label>
                                    <input type="text" class="form-control" name="corrientes_permanentes" value="${getTexto(self.corrientes_permanentes)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Manantiales y/u ojos de agua</label>
                                    <input type="text" class="form-control" name="manantiales_ojos_agua" value="${getTexto(self.manantiales_ojos_agua)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Manantiales y/u ojos de agua que abastecen</label>
                                    <input type="text" class="form-control" name="manantiales_ojos_agua_abastecen" value="${getTexto(self.manantiales_ojos_agua_abastecen)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Erosión</label>
                                    <input type="text" class="form-control" name="erosion" value="${getTexto(self.erosion)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Especies arbóreas</label>
                                    <select name="especies_arboreas" class="form-control">
                                           ${contruirComboSimple(cEspecies, self.id_especies_arboreas)}
                                     </select> 
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Distribución del estrato arbustivo</label>
                                    <input type="text" name="distribucion_estrato_arbustivo" class="form-control" value="${getTexto(self.distribucion_estrato_arbustivo)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Distribución de renuevo</label>
                                    <input type="text" class="form-control" name="distribucion_renuevo" value="${getTexto(self.distribucion_renuevo)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Cobertura promedio del arbolado</label>
                                    <input type="text" class="form-control" name="cobertura_promedio_arbolado" value="${getTexto(self.cobertura_promedio_arbolado)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fauna</label>
                                    <input type="text" class="form-control" name="fauna" value="${getTexto(self.fauna)}">
                                </div>

                                <div class="col-md-6 col-sm-6">
                                    <label>Observaciones del polígono</label>
                                    <input id="inputObservacionesPoligono" type="text" class="form-control" name="observaciones_poligono" value="${getTexto(self.observaciones_poligono)}" onclick="ocultarModal(this,'poligono')">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                        <div class="row">
                              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                  ${botones}
                              </div>                            
                        </div>
                    </div>
                    </form>`;
    

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
    let renglon = `<tr class="renglon:consecutivo:">
                     <td>:consecutivo:</td>
                     <td>:descripcion:</td>
                     <td>:fecha:</td>
                     <td><a href="#" nombrearchivo=":nombreArchivo:" onclick="getImagen(event,this)">Ver Imagen</a></td>
                     <td>:campoAsociado:</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo=":consecutivo:" onclick="mostrarDetalleImagen(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo=":consecutivo:" data-folio=":folio:" data-info="Imagen" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(':descripcion:',value.descripcion).replace(':fecha:',value.fecha)
                    .replace(/:url:/,value.url).replace(':campoAsociado:',value.descripcion_campo).replace(/:folio:/g,value.folio).replace(/:nombreArchivo:/g,value.nombre_archivo);
    });

    renglones= (renglones == '')? `<tr class="sinRegistros"><td colspan="6"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Imagen</th>
                            <th>Campo Asociado</th>
                            <th>Actualizar</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyTablaImagen">
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
  
    return html;
    
}

/**
 * @function mostrarDetalleImagen
 * @param  {object} element - objecto  DOM
 */

function mostrarDetalleImagen(element) {
    let argCampos =  JSON.parse(JSON.stringify(catalogosCampos));
    detalleMultiRegistro.html(plantillaDetalleImagen.call(arregloDeImagenes, element, argCampos));
    addOptionMultiRegistro.hide();
    tituloModal.html('Imagenes');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    flechaRegreso.show();
    multiRegistros.hide();
    detalleMultiRegistro.show();

    agregaCalendario('.fechaImagen','down');
    validarFormularioImagen('#formularioImagen');
}

/**
 * @function mostrarDetallePropietario
 * @param  {object} element - objecto  DOM
 */

function mostrarDetallePropietario(element) {
    
    detalleMultiRegistro.html(plantillaDetalleRepresentante.call(arregloDeRepresentantes, element));
    addOptionMultiRegistro.hide();    
    tituloModal.html('Propietarios o Representantes');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    flechaRegreso.show();
    multiRegistros.hide();
    detalleMultiRegistro.show();
    agregaCalendario('.fechaInicioPeriodo');
    agregaCalendario('.fechaFinPeriodo');
    validaFormularioRepresentante('#formularioRepresentante');

}

/**
 * @function plantillaDetalleRepresentante
 * @param  {object} element - objecto  DOM
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetalleRepresentante(element){
    let option = $(element).attr('data-action');
    let valueFolio =  ''; 
    let botones = '';
    let display = '';
    let accion = '';
    
    self = '';
    
    if(option == 'agregar'){
        accion = 'add';
        botones = '<button type="submit" id="agregarMultiPersona" class="btn btn-success">Agregar multiregistro</button>';
        display= 'style="display:none"';
        valueFolio = $(element).attr('data-info');

    }else if(option == 'update'){
        accion = 'update';

        botones = '<button type="submit" id="actualizarMultiPersona" class="btn btn-success">Actualizar</button>';

        let consecutivo = parseInt($(element).attr('data-consecutivo'));
    
        let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');

        (posicion > -1)? self = this[posicion] : '';
        (posicion > -1)? valueFolio =  self.folio : valueFolio='';
    }


    let formulario =`<form id="formularioRepresentante" onsubmit="return false" data-action="${accion}" autocomplete="off">
                        <div class="form-group" ${display}>
                          <div class="row">
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <label>Consecutivo</label>
                                  <input type="text" class="form-control" name="consecutivo" value="${getTexto(self.consecutivo)}"  readonly>
                              </div>

                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <label>Folio</label>
                                  <input type="text" class="form-control" name="folio" value="${getTexto(valueFolio)}" readonly>
                              </div>
                          </div> 
                      </div>
                    
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del propietario o representante</label>
                                <input type="text" class="form-control" name="nombre_propietario_representante" value="${getTexto(self.nombre_propietario_representante)}">
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del secretario o representante Legal</label>
                                <input type="text" class="form-control" name="nombre_secretario_representante_legal"  value="${getTexto(self.nombre_secretario_representante_legal)}">
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del tesorero</label>
                                <input type="text" class="form-control" name="nombre_tesorero" value="${getTexto(self.nombre_tesorero)}">
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Curp del propietario o representante</label>
                                <input type="text" class="form-control" name="curp_propietario_o_representante" value="${getTexto(self.curp_propietario_o_representante)}">
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Inicio del periodo</label>
                                <input type="text"  class="form-control fechaInicioPeriodo" name="inicio_periodo" value="${getTexto(self.inicio_periodo)}">
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Fin del periodo</label>
                                <input type="text" class="form-control fechaFinPeriodo" name="fin_periodo" value="${getTexto(self.fin_periodo)}">
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Observaciones de la administración</label>
                                <input type="text" id="inputObservacionesPropietario" class="form-control" name="observaciones_administracion" value="${getTexto(self.observaciones_administracion)}" onclick="ocultarModal(this,'propietario')">
                            </div>                            
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                ${botones}
                            </div>                            
                        </div>
                    </div>
                  </form>
                  `;
    

    return formulario;
}


/**
 * @function plantillaDetalleImagen
 * @param  {object} element - objecto  DOM
 * @param {Array} arregloCampos - catalogos de campos
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetalleImagen(element , arregloCampos){
    let option = $(element).attr('data-action');
    let btnFile = '';
    let valueFolio =  ''; 
    let botones = '';
    let display = '';
    let operacion = '';
    
    self = '';
    
    if(option == 'agregar'){

        botones = '<button type="submit" id="agregarMultiImagen" class="btn btn-success">Agregar multiregistro</button>';
        display= 'style="display:none"';
        operacion = 'add';

        btnFile = `<div class="col-md-6 col-sm-6 col-xs-12"> 
                      <label>Archivo</label>
                      <input type="file" name="file" accept="application/pdf, image/*" class="form-control">
                      <input type="hidden" value="insertMultiregistroImagen" name="action"> 
                   </div>`;

        valueFolio = $(element).attr('data-info');


    }else if(option == 'update'){

        let consecutivo = parseInt($(element).attr('data-consecutivo'));
    
        let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');

        (posicion > -1)? self = this[posicion] : '';
        (posicion > -1)? valueFolio =  self.folio : valueFolio='';

        botones = '<button type="submit" id="actualizarMultiImagen" class="btn btn-success">Actualizar</button>';
        operacion = 'update';

        btnFile = `<div class="col-md-2 col-sm-2 col-xs-12"> 
                    <label>Archivo</label>
                    <input type="button" value="Remplazar" data-info="no" class="form-control" onclick="agregaInputFile(this)">
                    <input type="hidden" value="updateMultiregistroImagen" name="action">
                    <input type="hidden" value="${self.nombre_archivo}" name="nombre_archivo">
                    <input type="hidden" value="${self.url}" name="url">
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12">
                     <div id="espacioInput"></div>
                  </div>`;
    }


    let formulario =`<form id="formularioImagen" onsubmit="return false" autocomplete="off" data-action="${operacion}" enctype="multipart/form-data">
                        <div class="form-group" ${display}>
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Consecutivo</label>
                                    <input type="text" class="form-control" name="consecutivo" value="${getTexto(self.consecutivo)}" readonly>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Folio</label>
                                    <input type="text" class="form-control" name="folio" value="${getTexto(valueFolio)}" readonly>
                                </div>
                            </div>
                        </div> 

                            <div class="form-group">
                                <div class="row">
                                     <div class="col-md-6 col-sm-6 col-xs-12">
                                        <label>Descripción</label>
                                        <input id="descripcionImagen" type="text" name="descripcion" value="${getTexto(self.descripcion)}" class="form-control" onclick="ocultarModal(this,'imagen')">
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <label>Fecha</label>
                                        <input type="text" name="fecha" value="${getTexto(self.fecha)}" class="form-control fechaImagen">
                                    </div>
                                </div>
                            </div>
                    
                            <div class="from-group">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <label>Campo Asociado</label>
                                        <select name="campoAsociado" class="form-control">
                                              ${contruirComboSimple(arregloCampos, self.id_campoasociado)}
                                        </select>
                                    </div>

                                     
                                        ${ btnFile }
                                    
                                </div>
                            </div>
                    
                            <div class="form-group">
                                <div class="row">
                                      <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                      <br>
                                          ${botones}
                                      </div>
                                </div>
                            </div>
                     </form>`;
    

    return formulario;
}


/**
 * @function contruirComboSimple
 * @param {array} arg - Opciones del catalogo
 * @param {optionSelected} - Si trae un valor seleccionado
 * @return regresa String de html con options del combo
 */
function contruirComboSimple(arg, optionSelected){
    optionSelected = String(optionSelected);
    let posicion = arrayObjectIndexOf(arg, optionSelected, 'value');
    if(posicion != -1) arg[posicion].selected = 'selected';

    let options = '<option value="-1">Seleccione una opción...</option>';
    
    let option = '<option value=":value:" :selected: >:text:</option>';

    $.each(arg, function( index, data ) {
       options+=option.replace(':value:',data.value).replace(':text:',data.text).replace(':selected:',data.selected);
     });
    

    return options;
}


/**
 * @function cleanCombo
 * @param  {String} idCombo - id del combo que se limpiara
 */
function cleanCombo(idCombo){
    $(idCombo).empty();
    let options = '<option value="-1">Seleccione una opción...</option>';
    $(idCombo).append(options);
}




/**
 * @function contruirComboCatalogo
 * @param  {String} idCatalogo - id del combo
 * @param  {array} arg - array con las opciones del catalogo
 * @param  {String}  seleccionados - String de elementos seleccionados
 * @param  {String}  bloqueado - Si el select esta bloqueado o habilitado
 * @return  {String} Retorno el el combo con el catalogo
 */
function contruirComboCatalogo(idCatalogo, arg , seleccionados, bloqueado){
    
    if(seleccionados.startsWith(',')) seleccionados = seleccionados.substr(1);
    
    
    $.each(seleccionados.split(','), function(index, valor){
          let posicion = arrayObjectIndexOf(arg, valor, 'value');
          
          if(posicion >= 0 )arg[posicion].selected='selected';

    });
    
    let options = '';
    let option = '<option value=":value:" :selected: >:text:</option>';

    $.each(arg, function( index, data ) {
       options+=option.replace(':value:',data.value).replace(':text:',data.text).replace(':selected:',data.selected);
     });
    
    let html = `<select multiple="multiple"  class="comboCatalogo" id="${idCatalogo}" ${bloqueado} style="width:100%">
                  ${options}
                </select>`
    return html;
}

/**
 * @function modalCatalogos
 * @param  {String} tituloModal - titulo del modal 
 * @param  {String} idCombo -  id del combo del catalogo que será cargado
 * @param  {array} arg - array con las opciones del catalogo
 * @param  {String} seleccionados - elementos que han sido seleccionados
 * @param  {String} bloqueado - Como aparece el elememto habilitado o  bloqueado
 * @return  {String} Retorna modal con el select de los catalogos
 */
function modalCatalogos(tituloModal, idCombo , arg , seleccionados, bloqueado){

   
   let clone = JSON.parse(JSON.stringify(arg));

   let modal = `
        <!-- Modal -->
        <div id="modalCatalogoCuenca" data-backdrop="static" data-keyboard="false" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">${tituloModal}</h4>
              </div>
              <div class="modal-body" id="ContenidoCatalogos">
                 ${contruirComboCatalogo(idCombo,clone, seleccionados,bloqueado)}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              </div>
            </div>

          </div>
        </div>`;
    return modal;
}

  /**
  * Carga modal con el archivo
  * @param {String} nombreFile
  * @param {String} contenedor
  * @param {String} url 
  * @description nombre del archivo que se encuentra en el servidor 
  */

  const cargaModalEnDOM = (nombreFile, contenedor, url) =>{
    /**
    * codigo html modal.
    * @const {string}
    */
    const modal =  `<div class="modal fade" id="multiRegistroImagenesArchivo" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Vista previa del archivo</h4>
                    </div>
                    <div class="modal-body">
                        <iframe src="${url}?action=get&nombre_archivo=${nombreFile}#zoom=100" width="100%" height="400px">
                      Este navegador no soporta iframe
                  </iframe>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>`;

    $(contenedor).html(modal);
    $('#multiRegistroImagenesArchivo').modal('show')      
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
 * @function plantillaHistorial
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla de historial con codigo html
 */
function plantillaHistorial(arr){
    
    let renglones = '';
    let renglon = `<tr>
                     <td>:consecutivo:</td>
                     <td>:fecha:</td>
                     <td>:auditoriaTecnica:</td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).
                            replace(/:folio:/g,value.idPredio).
                            replace(':fecha:',stringCalendarioInput(value.fechaATP.trim().replace('00:00:00',''),value.auditoriaTecnica,value.consecutivo)).
                            replace(':auditoriaTecnica:',stringCombo(value.auditoriaTecnica,value.consecutivo));
    });

    renglones= (renglones == '')? `<tr><td colspan="3"><center>No hay auditorias registradas</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Fecha</th>
                            <th>Auditoría técnica</th>
                          </tr>
                        </thead>
                        <tbody>
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
    return html;
}




panelFicha.on('click','.ctgo', function(){
    let tipoCatalogo= $(this).attr('data-catalogo');
    let disabled =    ($(this).hasClass('bloqueado')) ? 'disabled' : '';

    let elementosSeleccionados = $(this).attr('data-select') || '';

    if(tipoCatalogo == 'anp'){

        divContenidoCatalogos.html(modalCatalogos('Area natural protegida','comboCatalogosApn',catalogosApn,elementosSeleccionados,disabled));

    }else if (tipoCatalogo == 'cuenca'){

        divContenidoCatalogos.html(modalCatalogos('Cuenca','comboCatalogosCuenca',catalogosCuenca,elementosSeleccionados,disabled));
    }

    addMultiSelect('.comboCatalogo');

   
    $('#modalCatalogoCuenca').modal('show');
});


$('#btnRegresar').on('click',function(){
   window.location.assign("/SIFEM/index.html");
});


$('#btnhelpme').on('click',function(){
    let el = $('#btnAccion');

    let section = el.attr('data-info')|| '';


    let helpMeAdd = `1.- Llene los campos del formulario. Los campos requeridos son:
                          región, municipio, <br>localidad y permiso aprovechamiento forestal<br><br>
                          
                      2.- Haga clic en el boton <b>Agregar Predio</b><br><br>
                        
                       <b> Para agregar un multiregistro al predio debe primero guardar la Información del formulario principal</b><br>
                       `;

    let helpMeUpdate = `<b>1.- Busque un predio en el panel de consulta</b><br>
                          1.1- Seleccione el tipo de filtro "Predio" o "Representante"<br>
                          1.2- Escriba el texto a buscar en la caja<br>
                          1.3- Seleccione haciendo clic sobre el predio<br><br>
                        <b>2.- Edite la información en el formulario principal</b><br>
                          2.1- Haga clic en el boton actualizar<br>`;

    let help = (section == 'addPredio')?  helpMeUpdate : helpMeAdd;
    let title = (section == 'addPredio')? '¿Como actualizar predio?' :  '¿Como agregar predio?';

    alertaInfo('',help, title);
});

/**
 * @function arrayObjectIndexOf
 * @param  {Array.<T>} arr - Arreglo de objectos
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
 * @function popArray
 * @param  {Array.<T>} arr - Arreglo de objectos
 * @param  {number} id - Consecutivo a eliminar
 * @param  {String} property - Propiedad que se utilizara para buscar el valor
 * @description Esta funcion elimina un elemento del arreglo de multiregistros
 */
function popArray(array,id, property){
  if(array.length > 0)
  {
    let exist = arrayObjectIndexOf (array, id , property );
    if(exist != -1){
      array.splice(exist,1);
      find = true;
    }

  }
}


/**  
 * @function eliminaMultiRegistro
 * @param  {object jquery} el - Boton al que se dio clic
 */
function eliminaMultiRegistro(el){
    let consecutivo = $(el).attr('data-consecutivo');
    let folio = $(el).attr('data-folio');
    let tipoMultiRegistro = $(el).attr('data-info');
    let tableBody = $('#tbodyTabla'+tipoMultiRegistro);
    let tableName = '';
    let arregloEliminar;

    if(tipoMultiRegistro == 'Propietario'){
        tableName = 'formularios.representante';
        arregloEliminar = arregloDeRepresentantes;

    }else if(tipoMultiRegistro == 'Poligono'){
         tableName = 'formularios.poligonos';
         arregloEliminar =  arregloDePoligonos;

    }else if(tipoMultiRegistro == 'Imagen'){
       tableName = 'formularios.imagen';
       arregloEliminar = arregloDeImagenes;
    }

    swal({
        title: '¿ Esta seguro de eliminar el multiregistro '+consecutivo+' ?' ,
        type: 'question',
        html: '<p>Toda la Información relacionada al multiregistro será eliminada</p>',
        showCancelButton: true,
        confirmButtonColor: '#808B96',
        cancelButtonColor: '#BDBDBD',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si!',
        allowOutsideClick: false,
        allowEnterKey: false
    }).then(function() {
        eliminaMultiRegistroAJAX(urlConexionMultiRegistro, 'deleteMultiregistro', tableName, folio , consecutivo, tableBody , arregloEliminar);
        
    })
}

/*****************************************************************************************************
******************************************************************************************************
******************************************************************************************************
******************************************************************************************************
                                BLOQUE DE PETICIONES AJAX
******************************************************************************************************
******************************************************************************************************
*****************************************************************************************************/

/**
 * @function getPredios
 * @param  {string} texto - Cadena que va a buscar
 * @param  {string} accion - Contiene getPredio, getRepresentante, getClave o getMunicipio
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

function textoCombo(arg = [], id){
      let obj = arg.filter((element)=> element.value == id)[0]
      return obj.text;
}

function getImagen(event, el){
    event.preventDefault();
    let nombre= $(el).attr('nombrearchivo') || '';

    (nombre != '')? cargaModalEnDOM(nombre, '#multiRegistroDeImagenesDiv', urlconexionArchivo)  :  alertaError('Error al consultar imagen');
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
 * @function getTodosDetallesPredio
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getTodosDetallesPredio(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getPredio',clavePredio:clave},
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
        data: {action:'getRepresentantes',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){

            if(data.response.sucessfull){
                tituloModal.html('Propietarios o Representantes');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'Propietario'});
                addOptionMultiRegistro.attr({'data-info': clave});
                detalleMultiRegistro.hide();
                multiRegistros.show();
                addOptionMultiRegistro.show();
                multiRegistros.html(plantillaRepresentantes(data.data));
                modal.modal('show');
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
        data: {action:'getImagenes',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            if(data.response.sucessfull){
                tituloModal.html('Imagenes');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'imagenes'});
                addOptionMultiRegistro.attr({'data-info': clave});
                detalleMultiRegistro.hide();
                flechaRegreso.hide();
                multiRegistros.show();
                addOptionMultiRegistro.show();
                multiRegistros.html(plantillaImagenes(data.data));
                modal.modal('show');
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
        data: {action:'getPoligonos',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
             
            if(data.response.sucessfull){
                tituloModal.html('Poligonos');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'Poligonos'});
                addOptionMultiRegistro.attr({'data-info': clave});
                detalleMultiRegistro.hide();
                flechaRegreso.hide();
                multiRegistros.show();
                addOptionMultiRegistro.show();
                multiRegistros.html(plantillaPoligonos(data.data));
                modal.modal('show');
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
 * @function insertPredio
 * @param  {object JSON} datosPredios - Datos del formulario de predio
 * @param  {string} url - url del service 
 * @param {String} btn - selector del boton al que se hace clic para mostrar el modal
 * @param {String} btnReset - selector del boton reset
 * @param {String} btnAgregar - selector del boton para agregar predio
 * @param {String} botonesMultiRegistros - Selectores de botones multiregistros
 * @param {String} formulario - selector del formulario
 */
function insertPredio(url,datosPredios, btn, formulario, btnReset, btnAgregar, botonesMultiRegistros) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'insertPredio', formularioPrincipal: datosPredios},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            
            if(data.response.sucessfull){
                $('#InputclaveUnicaIdentificacion').val(data.data);

                $(formulario).find(':input').each(function() {
                    
                    if($(this).attr('type') != 'button' && $(this).attr('type') != 'submit') $(this).prop('disabled', true);
                });

                multiregistroBandera = true;
                $(btnAgregar).hide();
                $(btnReset).html('Agregar otro predio');
                $(btn).addClass('bloqueado');
                $(botonesMultiRegistros).attr('data-info',data.data);
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
 * @function updatePredio
 * @param  {object JSON} datosPredios - Datos del formulario de predio
 * @param {String} formulario - selector del formulario
 */
function updatePredio(url,datosPredios) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'updatePredio', formularioPrincipal: datosPredios},
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
 * @function deletePredio
 * @param  {object JSON} url - direccion del servicio
 */
function deletePredio(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'deletePredio', claveUnicaIdentificacion: clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            
            if(data.response.sucessfull){
                arregloDeRepresentantes = [];
                arregloDePoligonos = [];
                arregloDeImagenes = [];

                $('#panelFicha').hide();
                $('#bodyPanelFicha').empty();
                $('#bodyAllPredios').find('#'+clave).remove();
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
 * @function cargaCatalogos
 * @param  {string} url - url del service 
 * @param  {string} action - accion
 * @param {String} tableName - nombre de la tabla
 */

function cargaCatalogos(url, action, tableName) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, tableName: tableName },
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {

            if (data.response.sucessfull) {
                sessionStorage['catalogos'] = JSON.stringify(data.data);


                let objecto = JSON.parse(JSON.stringify(data.data));

                $.each(objecto, function(index, value) {
                    if (value.name_catalog == 'catalogos.tipotenenciatierra') {
                        catalogosTipoTenencia = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.municipio') {
                        catalogosMunicipio = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.cuenca') {
                        catalogosCuenca = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.anp') {
                        catalogosApn = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.aceptable_aprovechamiento') {
                        catalogosAceptableAaprovechamiento = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.estatus') {
                        catalogosEstatus = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.localidad') {
                        catalogosLocalidades = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.region') {
                        catalogosRegiones = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.clima') {
                        catalogosClima = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.especie') {
                        catalogosEspecies = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.campos') {
                        catalogosCampos = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.vegetacionpredominante') {
                        catalogosVegetacion = objecto[index].catalogo;
                    }


                });

            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}


/**
 * @function eliminaMultiRegistroAJAX
 * @param  {string} url - url del service 
 * @param  {string} action - accion a realizar 
 * @param {String} tableName - nombre de la tabla de multiRegistro
 * @param {String} consecutivo - id del multiRegistro que se quiere eliminar
 * @param {Array} Arreglo - array de datos del que se eliminara el elemento
 * @param {String} tableBodyMultiRegistro - id del de la tabla del multiRegistro
 */

function eliminaMultiRegistroAJAX(url, action, tableName, folio , consecutivo, tableBodyMultiRegistro, Arreglo) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, table_name: tableName , folio:folio, consecutivo : consecutivo},
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
            if (data.response.sucessfull) {
               popArray(Arreglo,parseInt(consecutivo), 'consecutivo');
               tableBodyMultiRegistro.find('.renglon'+consecutivo).remove();
               alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}

/**
 * @function insertMultiRegistroRepresentante
 * @param  {string} url - url del service 
 * @param  {string} action - accion a realizar
 * @param  {JSON} representante - datos del formulario 
 * @param  {string} tbody - selector de la tabla multiregistro
 * @param  {string} flechaRegreso - selector de la flecha
 * @param {JSON} representante - datos del multiResgitro
 */
function insertMultiRegistroRepresentante(url, action, representante, tbody, flechaRegreso) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, representante: representante },
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
           
            let datos = JSON.parse(representante).representante[0];

            if (data.response.sucessfull) {

                arregloDeRepresentantes.push({
                    consecutivo: data.data,
                    curp_propietario_o_representante: datos.curp_propietario_o_representante,
                    fin_periodo:  datos.fin_periodo,
                    folio: datos.folio,
                    inicio_periodo:   datos.inicio_periodo,
                    nombre_propietario_representante: datos.nombre_propietario_representante,
                    nombre_secretario_representante_legal: datos.nombre_secretario_representante_legal,
                    nombre_tesorero: datos.nombre_tesorero,
                    observaciones_administracion: datos.observaciones_administracion

                });

                let renglon = `<tr class="renglon${data.data}">
                     <td>${data.data}</td>
                     <td>${datos.folio}</td>
                     <td>${datos.nombre_propietario_representante}</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo="${data.data}" onclick="mostrarDetallePropietario(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo="${data.data}" data-folio="${datos.folio}" data-info="Propietario" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;


                if($(tbody).find('.sinRegistros').length > 0){
                    $(tbody).find('.sinRegistros').remove();
                }
                
                $(tbody).append(renglon);
                $(flechaRegreso).trigger('click');
                alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}


/**
 * @function UploadShape
 * @param  {string} url - url del service 
 * @param  {object DOM} formulario - formulario
 *
 */
function UploadShape(url, formulario) {
    $.ajax({
        type: 'POST',
        url: url,
        data: formulario,
        enctype: 'multipart/form-data',
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
            console.log('respuesta al cargar shape', data)
            if (data.response.sucessfull) {
                amplify.store('poligonosTmp', data.data);
                openWindows();
                alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}


/**
 * @function insertMultiRegistroImagen
 * @param  {string} url - url del service 
 * @param  {string} action - accion a realizar
 * @param  {JSON} representante - datos del formulario 
 * @param  {string} tbody - selector de la tabla multiregistro
 * @param  {string} flechaRegreso - selector de la flecha
 * @param {JSON} representante - datos del multiResgitro
 */
function insertMultiRegistroImagen(url, action, imagenes, tbody, flechaRegreso) {
    $.ajax({
        type: 'POST',
        url: url,
        data: imagenes,
        enctype: 'multipart/form-data',
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {

            if (data.response.sucessfull) {
                let datos = data.data;
                arregloDeImagenes.push({
                    consecutivo: parseInt(datos.consecutivo),
                    descripcion: datos.descripcion,
                    descripcion_campo: datos.descripcion_campo,
                    fecha: datos.fecha,
                    folio: datos.folio,
                    id_campoasociado:  datos.id_campoasociado,
                    nombre_archivo: datos.nombre_archivo,
                    url: datos.url

                });

                let renglon = `<tr class="renglon${datos.consecutivo}">
                     <td>${datos.consecutivo}</td>
                     <td>${datos.descripcion}</td>
                     <td>${datos.fecha}</td>
                     <td><a href="#" nombrearchivo="${datos.nombre_archivo}" onclick="getImagen(event,this)">Ver Imagen</a></td>
                     <td>${datos.descripcion_campo}</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo="${datos.consecutivo}" onclick="mostrarDetalleImagen(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo="${datos.consecutivo}" data-folio="${datos.folio}" data-info="Imagen" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                </tr>`;


                if($(tbody).find('.sinRegistros').length > 0){
                    $(tbody).find('.sinRegistros').remove();
                }
                
                $(tbody).append(renglon);
                $(flechaRegreso).trigger('click');
                alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}

/**
 * @function insertMultiRegistroPoligonos
 * @param  {string} url - url del service 
 * @param  {string} action - accion a realizar 
 * @param  {JSON} poligono - datos del formulario
 * @param  {string} tbody - selector de la tabla multiregistro
 * @param  {string} flechaRegreso - selector de la flecha
 * @param {JSON} representante - datos del multiResgitro
 */
function insertMultiRegistroPoligonos(url, action, poligono, tbody, flechaRegreso) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, poligono: poligono },
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
            let datos = JSON.parse(poligono).poligono[0];

            if (data.response.sucessfull) {

               arregloDePoligonos.push({
                            consecutivo: parseInt(data.data),
                            folio: datos.folio,
                            accion_agraria: datos.accion_agraria,
                            fecha_publicacion_dof: datos.fecha_publicacion_dof,
                            fecha_resolucion_presidencial: datos.fecha_resolucion_presidencial,
                            fecha_asamblea_procede: datos.fecha_asamblea_procede,
                            documento_ampara_propiedad: datos.documento_ampara_propiedad,
                            numero_documento_ampara_propiedad: datos.numero_documento_ampara_propiedad,
                            latitud: datos.latitud,
                            longitud: datos.longitud,
                            superficie_poligono: datos.superficie_poligono,
                            superficie_cartografica: datos.superficie_cartografica,
                            superficie_arbolada: datos.superficie_arbolada,
                            superficie_otros_usos: datos.superficie_otros_usos,
                            id_tipo_clima: datos.tipo_clima,
                            id_tipo_vegetacion: datos.tipo_vegetacion,
                            tipo_fisiografia: datos.tipo_fisiografia,
                            corrientes_intermitentes: datos.corrientes_intermitentes,
                            corrientes_permanentes: datos.corrientes_permanentes,
                            manantiales_ojos_agua: datos.manantiales_ojos_agua,
                            manantiales_ojos_agua_abastecen: datos.manantiales_ojos_agua_abastecen,
                            erosion: datos.erosion,
                            id_especies_arboreas: datos.especies_arboreas,
                            distribucion_estrato_arbustivo: datos.distribucion_estrato_arbustivo,
                            distribucion_renuevo: datos.distribucion_renuevo,
                            cobertura_promedio_arbolado: datos.cobertura_promedio_arbolado,
                            fauna: datos.fauna,
                            observaciones_poligono: datos.observaciones_poligono
                });


                let renglon = `<tr class="renglon${data.data}">
                     <td>${data.data}</td>
                     <td>${datos.folio}</td>
                     <td>${datos.accion_agraria}</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo="${data.data}" onclick="mostrarDetallePoligono(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo="${data.data}" data-folio="${datos.folio}" data-info="Poligono" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;

                if($(tbody).find('.sinRegistros').length > 0){
                    $(tbody).find('.sinRegistros').remove();
                }
                
                $(tbody).append(renglon);
                $(flechaRegreso).trigger('click');
                alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            } 

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}


/**
 * @function updateMultiRegistroRepresentante
 * @param  {string} url - url del service 
 * @param  {string} action - accion a realizar 
 * @param  {JSON} representante - datos del formulario 
 * @param  {string} tbody - selector de la tabla multiregistro
 * @param  {string} flechaRegreso - selector de la flecha
 * @param {JSON} representante - datos del multiResgitro
 */
function updateMultiRegistroRepresentante(url, action, representante, tbody, flechaRegreso) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, representante: representante },
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
           
            let datos = JSON.parse(representante).representante[0];
            
            if (data.response.sucessfull) {
               let renglon = $(tbody).find('.renglon'+datos.consecutivo);
               renglon.children('td')[2].innerHTML =  datos.nombre_propietario_representante;

               popArray(arregloDeRepresentantes,parseInt(datos.consecutivo), 'consecutivo');

                arregloDeRepresentantes.push({
                    consecutivo: parseInt(datos.consecutivo),
                    curp_propietario_o_representante: datos.curp_propietario_o_representante,
                    fin_periodo:  datos.fin_periodo.trim(),
                    folio: datos.folio,
                    inicio_periodo:   datos.inicio_periodo.trim(),
                    nombre_propietario_representante: datos.nombre_propietario_representante,
                    nombre_secretario_representante_legal: datos.nombre_secretario_representante_legal,
                    nombre_tesorero: datos.nombre_tesorero,
                    observaciones_administracion: datos.observaciones_administracion

                });

                
                $(flechaRegreso).trigger('click');
                alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}



/**
 * @function updateMultiregistroPoligono
 * @param  {string} url - url del service 
 * @param  {string} action - accion a realizar 
 * @param  {JSON} representante - datos del formulario 
 * @param  {string} tbody - selector de la tabla multiregistro
 * @param  {string} flechaRegreso - selector de la flecha
 * @param {JSON} representante - datos del multiResgitro
 */
function updateMultiregistroPoligono(url, action, poligono, tbody, flechaRegreso) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, poligono: poligono },
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
         
            let datos = JSON.parse(poligono).poligono[0];
            
            if (data.response.sucessfull) {
               let renglon = $(tbody).find('.renglon'+datos.consecutivo);
               renglon.children('td')[2].innerHTML =  datos.accion_agraria;

               popArray(arregloDePoligonos,parseInt(datos.consecutivo), 'consecutivo');

                arregloDePoligonos.push({
                    consecutivo: parseInt(datos.consecutivo),
                    folio: datos.folio,
                    accion_agraria: datos.accion_agraria,
                    fecha_publicacion_dof: datos.fecha_publicacion_dof.trim(),
                    fecha_resolucion_presidencial: datos.fecha_resolucion_presidencial.trim(),
                    fecha_asamblea_procede: datos.fecha_asamblea_procede.trim(),
                    documento_ampara_propiedad: datos.documento_ampara_propiedad,
                    numero_documento_ampara_propiedad: datos.numero_documento_ampara_propiedad,
                    latitud: datos.latitud,
                    longitud: datos.longitud,
                    superficie_poligono: datos.superficie_poligono,
                    superficie_cartografica: datos.superficie_cartografica,
                    superficie_arbolada: datos.superficie_arbolada,
                    superficie_otros_usos: datos.superficie_otros_usos,
                    id_tipo_clima: datos.tipo_clima,
                    id_tipo_vegetacion: datos.tipo_vegetacion,
                    tipo_fisiografia: datos.tipo_fisiografia,
                    corrientes_intermitentes: datos.corrientes_intermitentes,
                    corrientes_permanentes: datos.corrientes_permanentes,
                    manantiales_ojos_agua: datos.manantiales_ojos_agua,
                    manantiales_ojos_agua_abastecen: datos.manantiales_ojos_agua_abastecen,
                    erosion: datos.erosion,
                    id_especies_arboreas: datos.especies_arboreas,
                    distribucion_estrato_arbustivo: datos.distribucion_estrato_arbustivo,
                    distribucion_renuevo: datos.distribucion_renuevo,
                    cobertura_promedio_arbolado: datos.cobertura_promedio_arbolado,
                    fauna: datos.fauna,
                    observaciones_poligono: datos.observaciones_poligono

                });

                
                $(flechaRegreso).trigger('click');
                alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}



/**
 * @function updateMultiregistroImagen
 */
function updateMultiregistroImagen(url, action, imagenes, tbody, flechaRegreso) {
    $.ajax({
        type: 'POST',
        url: url,
        data: imagenes,
        enctype: 'multipart/form-data',
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
             
            let datos = data.data;


            
            if (data.response.sucessfull) {
               let renglon = $(tbody).find('.renglon'+datos.consecutivo);
               renglon.children('td')[1].innerHTML =  datos.descripcion; 
               renglon.children('td')[2].innerHTML =  datos.fecha;
               renglon.children('td')[3].innerHTML =  '<a href="#" nombrearchivo="'+ datos.nombre_archivo +'" onclick="getImagen(event,this)">Ver Imagen</a>';
               renglon.children('td')[4].innerHTML =  textoCombo(catalogosCampos,datos.id_campoasociado);
               popArray(arregloDeImagenes,parseInt(datos.consecutivo), 'consecutivo');

                arregloDeImagenes.push({
                    consecutivo: parseInt(datos.consecutivo),
                    descripcion: datos.descripcion,
                    descripcion_campo: datos.descripcion_campo,
                    fecha: datos.fecha,
                    folio: datos.folio,
                    id_campoasociado:  datos.id_campoasociado,
                    nombre_archivo: datos.nombre_archivo,
                    url: datos.url

                });

                
                $(flechaRegreso).trigger('click');
                alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}

/*****************************************************************************************************
******************************************************************************************************
******************************************************************************************************
******************************************************************************************************
                                BLOQUE DE MENSAJES DE ALERTAS
******************************************************************************************************
******************************************************************************************************
*****************************************************************************************************/


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





/*****************************************************************************************************
******************************************************************************************************
******************************************************************************************************
******************************************************************************************************
             BLOQUE DE VALIDACIONES FORMULARIO Y CARGA DE PLUGIN AL ELEMENTOS DEL DOM
******************************************************************************************************
******************************************************************************************************
*****************************************************************************************************/


/*
 * @function validarFormularioImagen
 * @param {Object jquery} element - Es el id del formulario de imagenes
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */
function validarFormularioImagen(element) {
    if ($(element).length > 0) $(element).validate().destroy();

    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            file: {
                required: true
            },
            fecha: {
                required: true,
                empty: true,
                maxlength: 15
            },

            descripcion: {
                required: true,
                empty: true,
                maxlength: 255
            },

            campoAsociado: {
                valueNotEquals: '-1'
            }
        },

        messages: {
            file:{
               required: 'Campo requerido'
            },
            fecha: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 15 caracteres'
            },

            descripcion: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            campoAsociado: {
                valueNotEquals: 'Seleccione una opción'
            }
        },

        submitHandler: function(form) {

            let operacion = $(form).attr('data-action') || '';
           

            if( operacion == 'add'){
               let  formData = new FormData($(form)[0]);
               insertMultiRegistroImagen(urlConexionMultiRegistro,'insertMultiregistroImagen',formData,'#tbodyTablaImagen','#flechaRegreso');
            }else if(operacion == 'update'){
               let  formData = new FormData($(form)[0]);
               updateMultiregistroImagen(urlConexionMultiRegistro,'updateMultiregistroImagen',formData,'#tbodyTablaImagen','#flechaRegreso');
            }else{
              alert('Acción no disponible');
            }


            return false;
        }
    });
}

/*
 * @function validaFormularioPoligono
 * @param {Object jquery} element - Es el id del formulario de poligono
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */
function validaFormularioPoligono(element) {
    if ($(element).length > 0) $(element).validate().destroy();

    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            accion_agraria: {
                maxlength: 255
            },

            fecha_publicacion_dof: {
            },

            fecha_resolucion_presidencial: {
            },

            fecha_asamblea_procede: {                
            },

            documento_ampara_propiedad: {
                required: true,
                empty: true,
                maxlength: 255
            },

            numero_documento_ampara_propiedad: {
                maxlength: 255
            },

            latitud: {
                maxlength: 7
            },

            longitud: {
                maxlength: 6
            },

            superficie_poligono: {
                decimales: true
            },

            superficie_cartografica: {
                decimales: true
            },

            superficie_arbolada: {
                decimales: true
            },

            superficie_otros_usos: {
                decimales: true
            },

            tipo_fisiografia: {
                maxlength: 255
            },

            corrientes_intermitentes: {
                maxlength: 255
            },

            corrientes_permanentes: {
                maxlength: 255
            },

            manantiales_ojos_agua: {
                maxlength: 255
            },

            manantiales_ojos_agua_abastecen: {
                maxlength: 255
            },

            erosion: {
                maxlength: 255
            },


            distribucion_estrato_arbustivo: {
                maxlength: 255
            },

            distribucion_renuevo: {
                maxlength: 255
            },

            cobertura_promedio_arbolado: {
                maxlength: 255
            },

            fauna: {
                maxlength: 255
            },

            observaciones_poligono: {
                maxlength: 255
            }
        },

        messages: {
            accion_agraria: {
                maxlength: 'Maximo 255 caracteres'
            },

            fecha_publicacion_dof: {
            },

            fecha_resolucion_presidencial: {
            },

            fecha_asamblea_procede: {
            },

            documento_ampara_propiedad: {
                required: 'Campo requerido',
                empty: 'No deje espacios',
                maxlength: 'Maximo 255 caracteres'
            },

            numero_documento_ampara_propiedad: {
                maxlength: 'Maximo 255 caracteres'
            },

            latitud: {
                maxlength: 'Maximo 7 caracteres'
            },

            longitud: {
                maxlength: 'Maximo 6 caracteres'
            },

            superficie_poligono: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            superficie_cartografica: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            superficie_arbolada: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            superficie_otros_usos: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            tipo_fisiografia: {
                maxlength: 'Maximo 255 caracteres'
            },

            corrientes_intermitentes: {
                maxlength: 'Maximo 255 caracteres'
            },

            corrientes_permanentes: {
                maxlength: 'Maximo 255 caracteres'
            },

            manantiales_ojos_agua: {
                maxlength: 'Maximo 255 caracteres'
            },

            manantiales_ojos_agua_abastecen: {
                maxlength: 'Maximo 255 caracteres'
            },

            erosion: {
                maxlength: 'Maximo 255 caracteres'
            },


            distribucion_estrato_arbustivo: {
                maxlength: 'Maximo 255 caracteres'
            },

            distribucion_renuevo: {
                maxlength: 'Maximo 255 caracteres'
            },

            cobertura_promedio_arbolado: {
                maxlength: 'Maximo 255 caracteres'
            },

            fauna: {
                maxlength: 'Maximo 255 caracteres'
            },

            observaciones_poligono: {
                maxlength: 'Maximo 255 caracteres'
            }
        },

        submitHandler: function(form) {
                        
            let datos = { 'poligono' : []};
            let operacion = $(form).attr('data-action') || '';
            datos.poligono.push($(form).serializeObject());

            if( operacion == 'add'){
               insertMultiRegistroPoligonos(urlConexionMultiRegistro,'insertMultiregistroPoligono',JSON.stringify(datos),'#tbodyTablaPoligono','#flechaRegreso');
            }else if(operacion == 'update'){
              updateMultiregistroPoligono(urlConexionMultiRegistro,'updateMultiregistroPoligono',JSON.stringify(datos),'#tbodyTablaPoligono','#flechaRegreso');
            }else{
              alert('Acción no disponible');
            }

            return false;
        }
    });

}


/*
 * @function validaFormularioRepresentante
 * @param {Object jquery} element - Es el id del formulario de representante
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */

function validaFormularioRepresentante(element) {
    if($(element).length > 0) $(element).validate().destroy();

    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            nombre_propietario_representante: {
                required: true,
                empty: true,
                maxlength: 255
            },

            nombre_secretario_representante_legal: {
                maxlength: 255
            },

            nombre_tesorero: {
                maxlength: 255
            },

            curp_propietario_o_representante: {
                maxlength: 255
            },

            inicio_periodo: {
                maxlength: 255
            },

            fin_periodo: {
                maxlength: 255
            },

            observaciones_administracion: {
                maxlength: 255
            }
        },

        messages: {
            nombre_propietario_representante: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            nombre_secretario_representante_legal: {
                maxlength: 'Maximo 255 caracteres'
            },

            nombre_tesorero: {
                maxlength: 'Maximo 255 caracteres'
            },

            curp_propietario_o_representante: {
                maxlength: 'Maximo 255 caracteres'
            },

            inicio_periodo: {
                maxlength: 'Maximo 255 caracteres'
            },

            fin_periodo: {
                maxlength: 'Maximo 255 caracteres'
            },

            observaciones_administracion: {
                maxlength: 'Maximo 255 caracteres'
            }
        },

        submitHandler: function(form) {
            
            let datos = { 'representante' : []};
            let operacion = $(form).attr('data-action') || '';
            datos.representante.push($(form).serializeObject());

            if( operacion == 'add'){
              insertMultiRegistroRepresentante(urlConexionMultiRegistro,'insertMultiregistroRepresentante',JSON.stringify(datos),'#tbodyTablaPropietario','#flechaRegreso');
               
            }else if(operacion == 'update'){
               updateMultiRegistroRepresentante(urlConexionMultiRegistro,'updateMultiregistroRepresentante',JSON.stringify(datos),'#tbodyTablaPropietario','#flechaRegreso');
            }else{
              alert('Acción no disponible');
            }


            return false;
        }
    });
}

/*
 * @function validaFormulario
 * @param {Object jquery} element - Es el id del formulario de predios
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */
function validaFormulario(element) {
    if($(element).length > 0) $(element).validate().destroy();
    
    
    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            region: {
                valueNotEquals: '-1'
            },

            municipio: {
                valueNotEquals: '-1'
            },

            localidad: {
                valueNotEquals: '-1'
            },

            sedemex: {
                numeros: true,
                maxlength: 8
            },

            nombrePredio: {
                required: true,
                empty: true,
                maxlength: 200
            },

            latitud: {
                numeros: true,
                maxlength: 7
            },

            longitud: {
                numeros: true,
                maxlength: 6
            },

            superficieTotal: {
                decimales: true
            },

            superficieCartografica: {
                decimales: true
            },

            superficieArbolada: {
                decimales: true
            },

            superficieOtrosUsos: {
                decimales: true
            },


            registroForestalNacional: {
                maxlength: 30
            },

            permisoAprovechamientoForestal: {
                valueNotEquals: '-1'
            }
        },
        messages: {
            region: {
                valueNotEquals: 'Seleccione una opción'
            },

            municipio: {
                valueNotEquals: 'Seleccione una opción'
            },

            localidad: {
                valueNotEquals: 'Seleccione una opción'
            },

            sedemex: {
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 8 caracteres'
            },

            nombrePredio: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 200 caracteres'
            },

            latitud: {
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 7 caracteres'
            },

            longitud: {
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 6 caracteres'
            },

            superficieTotal: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            superficieCartografica: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            superficieArbolada: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            superficieOtrosUsos: {
                decimales: 'Max. 5 enteros con 3 decimales'
            },

            estatusPredio: {
                valueNotEquals: 'Seleccione una opción'
            },

            registroForestalNacional: {
                maxlength: 'Maximo 30 caracteres'
            },

            permisoAprovechamientoForestal: {
                valueNotEquals: 'Seleccione una opción'
            }
        },

        submitHandler: function(form) {
           
            let idCuencas = $('#btnCuencaClic').attr('data-select').trim() || '';
            let idApn = $('#btnApnClic').attr('data-select').trim() || '';
            let operacion = $(form).attr('data-action') || '';

            if(idCuencas.startsWith(','))idCuencas = idCuencas.substr(1);
            if(idApn.startsWith(','))idApn = idApn.substr(1);
            
            $('#idDeCuencasHidden').val(idCuencas);
            $('#idAreaNaturalProtegidaHidden').val(idApn);
            let datos = { 'formulario' : []};
            datos.formulario.push($(form).serializeObject());

            if( operacion == 'add'){
               insertPredio(urlConexionPredios,JSON.stringify(datos),'.ctgo','#formularioPredios','.btn-reset','.btn-aceptar','.multiregistro');
            }else if(operacion == 'update'){
               updatePredio(urlConexionPredios,JSON.stringify(datos));
            }else{
              alert('Acción no disponible');
            }
            

            return false;
        }
    });

}

function addMultiSelect(el) {
   if($(el).hasClass('select2-hidden-accessible')) $(el).select2('destroy'); 

   let tipoCatalogo =  $(el).attr('id'); 
   

   $(el).select2({
     placeholder: 'Haga clic aquí '
   }).on('select2:select', function (evt) {
        let valor = String(evt.params.data.id);
      

       if(tipoCatalogo == 'comboCatalogosCuenca'){
          let cajaDeTexto =  $('.cuencaEspecifica');
          let btn = $('#btnCuencaClic');
          let valores = btn.attr('data-select') || '';

          cajaDeTexto.val(cajaDeTexto.val()+' '+evt.params.data.text.trim());

          btn.attr('data-select',valores+','+valor);

       }else if(tipoCatalogo == 'comboCatalogosApn'){

          let cajaDeTexto =  $('.areaNaturalProtegida');
          cajaDeTexto.val(cajaDeTexto.val()+' '+evt.params.data.text.trim());
         
          let btn = $('#btnApnClic');
          let valores = btn.attr('data-select') || '';

          btn.attr('data-select',valores+','+valor);
       }
       
   }).on('select2:unselect', function (evt) {
        let valor = String(evt.params.data.id);

        if(tipoCatalogo == 'comboCatalogosCuenca'){

          let cajaDeTexto =  $('.cuencaEspecifica');
          let btn = $('#btnCuencaClic');
          let valoresSeleccionados = btn.attr('data-select') || '';

          if(valoresSeleccionados.startsWith(',')) valoresSeleccionados = valoresSeleccionados.substr(1);

          let res = eliminaElementoSeleccionado(valoresSeleccionados.split(','),valor).join();

          btn.attr('data-select',res);
          

          cajaDeTexto.val(cajaDeTexto.val().replace(evt.params.data.text,'').trim());

      

       }else if(tipoCatalogo == 'comboCatalogosApn'){

          let cajaDeTexto =  $('.areaNaturalProtegida');
          let btn = $('#btnApnClic');
          let valoresSeleccionados = btn.attr('data-select') || '';

          if(valoresSeleccionados.startsWith(',')) valoresSeleccionados = valoresSeleccionados.substr(1);

          let res = eliminaElementoSeleccionado(valoresSeleccionados.split(','),valor).join();

          btn.attr('data-select',res);

          cajaDeTexto.val(cajaDeTexto.val().replace(evt.params.data.text,'').trim());
          
       }
   });

}

jQuery.validator.addMethod("valueNotEquals",
    function(value, element, arg) {
        return arg != value;
    }
);

jQuery.validator.addMethod("numeros",
    function(value, element) {
        return this.optional(element) || /^[0-9]+$/.test(value.trim());
    });

jQuery.validator.addMethod("empty",
    function(value, element) {
        return !/^\s*$/.test(value);
    }
);

jQuery.validator.addMethod("empty",
    function(value, element) {
        return !/^\s*$/.test(value);
    }
);

jQuery.validator.addMethod("decimales",
    function(value, element) {
        return this.optional(element) || /^[0-9]{0,5}(\.[0-9]{1,3})*$/.test(value.trim());
    }
);

function catalogos() {


    if (typeof(sessionStorage) == undefined || sessionStorage.length==0 || sessionStorage['catalogos'] == null) {
        cargaCatalogos(urlConexionCatalogos, 'getCatalogos', 'formularios.principal_info');
    }

    let comprueba = sessionStorage['catalogos'] || undefined;

    if(comprueba !=undefined && sessionStorage.length>0)
    {
        let objecto = JSON.parse(sessionStorage['catalogos']);

        $.each(objecto, function(index, value) {
            if (value.name_catalog == 'catalogos.tipotenenciatierra') {
                catalogosTipoTenencia = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.municipio') {
                catalogosMunicipio = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.cuenca') {
                catalogosCuenca = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.anp') {
                catalogosApn = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.aceptable_aprovechamiento') {
                catalogosAceptableAaprovechamiento = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.estatus') {
                catalogosEstatus = objecto[index].catalogo;
            } else if(value.name_catalog == 'catalogos.localidad'){
               catalogosLocalidades = objecto[index].catalogo;
            }else if(value.name_catalog == 'catalogos.region'){
               catalogosRegiones = objecto[index].catalogo;
            }else if(value.name_catalog == 'catalogos.clima'){
                catalogosClima =  objecto[index].catalogo;
            }else if(value.name_catalog == 'catalogos.especie'){
                 catalogosEspecies =  objecto[index].catalogo;
            }else if(value.name_catalog == 'catalogos.campos'){
                catalogosCampos =  objecto[index].catalogo;
            }else if(value.name_catalog == 'catalogos.vegetacionpredominante'){
                catalogosVegetacion =  objecto[index].catalogo;
            }

        });

    }

}

$( document ).ajaxStart(function() {
       $.blockUI({ 
        message: '<h4>Por favor espere...</h4>',
        css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5,
            color: '#fff' 
        },
         baseZ: 4000
        }); 
 
});



$( document ).ajaxStop(function() {
    $.unblockUI();
});

catalogos();











