var formPrincipalProgram8 = function(folio){
  var formPrincipalProgram8='';
      formPrincipalProgram8 = 
      '<div id="modalDetalle" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">'+
        '<div class="modal-dialog modal-lg">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>'+
                    '<h3 id="headerIdDiv">Información detallada</h3>'+
                '</div>'+
                '<div class="modal-body" style="clear:both;overflow-x:auto; max-height: 450px; overflow-y:auto;">'+
                    '<div id="formularioPrincipal">'+
                      '<div class="row">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Estado</label>'+
                                    '<select class="form-control" readonly><option>ESTADO DE MEXICO</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Región</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.region)+'</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Municipio</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.modulopredio_municipio)+'</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Localidad</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.modulopredio_localidad)+'</option></select>'+
                              '</div>'+
                      '</div>'+

                      '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Año</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.anio)+'</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Clave única de identificación</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.modulopredio_cup)+'</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Folio</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.folio+'" onclick="showValue(this)" value="'+folio.folio+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Tipo Acción</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.tipo_accion)+'</option></select>'+
                              '</div>'+
                      '</div>'+

                      '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Municipio</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.municipio)+'</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Nombre del predio </label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.nombre_predio+'" onclick="showValue(this)" value="'+folio.nombre_predio+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Razón social</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.razon_social+'" onclick="showValue(this)" value="'+folio.razon_social+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Localidad</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.localidad+'" onclick="showValue(this)" value="'+folio.localidad+'" readonly>'+
                              '</div>'+
                      '</div>'+

                       '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Paraje </label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.paraje+'" onclick="showValue(this)" value="'+folio.paraje+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Coordenadas UTM_X </label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.coordenadas_utm_x+'" onclick="showValue(this)" value="'+folio.coordenadas_utm_x+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Coordenadas UTM_Y</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.coordenadas_utm_y+'" onclick="showValue(this)" value="'+folio.coordenadas_utm_y+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label style="font-size: 12px;">Metros Sobre el Nivel del Mar</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.metros_sobre_nivel_mar+'" onclick="showValue(this)" value="'+folio.metros_sobre_nivel_mar+'" readonly>'+
                              '</div>'+
                      '</div>'+

                      '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Fecha inicio </label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.fecha_inicio+'" onclick="showValue(this)" value="'+folio.fecha_inicio+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Fecha de término</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.fecha_termino+'" onclick="showValue(this)" value="'+folio.fecha_termino+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Zona Crítica</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.zona_critica)+'</option></select>'+
                              '</div>'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                   '<label>Dependencias participantes</label>'+
                                  '<div class="input-group">'+
                                        '<input type="text" class="form-control"  placeholder="Haga clic para" readonly>'+
                                        '<div onclick="verDependencias(this)" fol="'+folio.folio+'" class="input-group-addon btn-success">'+
                                          'ver'+
                                        '</div>'+
                                  '</div>'+
                              '</div>'+
                      '</div>'+

                       '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                    '<label>Total de participantes </label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.total_participantes+'" onclick="showValue(this)" value="'+folio.total_participantes+'" readonly>'+
                              '</div>'+
                              '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                  '<label>Vehículos Asegurados</label>'+
                                  '<div class="input-group">'+
                                        '<input type="text" class="form-control"  placeholder="Haga clic para" readonly disabled>'+
                                        '<div onclick="verVehiculosAseg(this)" fol="'+folio.folio+'" class="input-group-addon btn-success">'+
                                          'ver'+
                                        '</div>'+
                                  '</div>'+
                              '</div>'+     
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Vehículos sin Irregularidades</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.vehiculos_sin_irregularidades+'" onclick="showValue(this)" value="'+folio.vehiculos_sin_irregularidades+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                    '<label>Vehículos Revisados</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.vehiculos_revisados+'" onclick="showValue(this)" value="'+folio.vehiculos_revisados+'" readonly>'+
                              '</div>'+
                      '</div>'+


                      '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                  '<label>Personas aseguradas o infraccionadas</label>'+
                                  '<div class="input-group">'+
                                        '<input type="text" class="form-control"  placeholder="Haga clic para" readonly disabled>'+
                                        '<div onclick="verPersonasAseg(this)" fol="'+folio.folio+'" class="input-group-addon btn-success">'+
                                          'ver'+
                                        '</div>'+
                              '</div>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                    '<label>Total de Personas<br></label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.total_personas+'" onclick="showValue(this)" value="'+folio.total_personas+'" readonly>'+
                              '</div>'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                   '<label>Bienes y Productos Asegurados</label>'+
                                  '<div class="input-group">'+
                                        '<input type="text" class="form-control"  placeholder="Haga clic para" readonly disabled>'+
                                        '<div onclick="verBienesAseg(this)" fol="'+folio.folio+'" class="input-group-addon btn-success">'+
                                          'ver'+
                                        '</div>'+
                                  '</div>'+
                              '</div>'+
                              '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                   '<label>Predios</label>'+
                                  '<div class="input-group">'+
                                        '<input type="text" class="form-control"  placeholder="Haga clic para" readonly disabled>'+
                                        '<div onclick="verPredios(this)" fol="'+folio.folio+'" class="input-group-addon btn-success">'+
                                          'ver'+
                                        '</div>'+
                                  '</div>'+
                              '</div>'+
                      '</div>'+

                      '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                    '<label>No de Órden </label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.num_orden+'" onclick="showValue(this)" value="'+folio.num_orden+'" readonly>'+
                              '</div>'+
                              '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                    '<label>Tipo de documento</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.tipo_documento)+'</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12"><br>'+
                                    '<label>Número de documento</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.num_documento+'" onclick="showValue(this)" value="'+folio.num_documento+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Dependencia que expide el documento</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.dependencia_expide_documento)+'</option></select>'+
                              '</div>'+
                      '</div>'+

                       '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Agencia del ministerio publico que solicita el dictamen</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.agencia_ministerio_solicita_dictamen)+'</option></select>'+
                              '</div>'+
                              '<div class="col-md-3 col-sm-12 col-xs-12"><br><br>'+
                                    '<label>Medidas de seguridad</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.medidas_seguridad)+'</option></select>'+
                              '</div>'+
                              '<div class="col-md-3 col-sm-12 col-xs-12"><br><br>'+
                                    '<label>Inspector Forestal</label>'+
                                    '<select class="form-control" readonly><option>'+isEmpty(folio.inspector_forestal)+'</option></select>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12"><br><br>'+
                                    '<label>Valor comercial $</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.valor_comercial+'" onclick="showValue(this)" value="'+folio.valor_comercial+'" readonly>'+
                              '</div>'+
                      '</div>'+

                      '<div class="row" style="margin-top: 10px;">'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Impacto Ambiental $</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.impacto_ambiental+'" onclick="showValue(this)" value="'+folio.impacto_ambiental+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Reparación del Daño $</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.reparacion_danio+'" onclick="showValue(this)" value="'+folio.reparacion_danio+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Total del dictamen</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.total_dictamen+'" onclick="showValue(this)" value="'+folio.total_dictamen+'" readonly>'+
                              '</div>'+
                               '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                    '<label>Observaciones</label>'+
                                    '<input type="text" class="form-control" data-toggle="tooltip" title="'+folio.observaciones+'" onclick="showValue(this)" value="'+folio.observaciones+'" readonly>'+
                              '</div>'+
                      '</div>'+

                      '<div class="row" style="margin-top: 10px;">'+
                             '<div class="col-md-3 col-sm-12 col-xs-12">'+
                                  '<label>Archivos</label>'+
                                  '<div class="input-group">'+
                                        '<input type="text" class="form-control"  placeholder="Haga clic para" readonly disabled>'+
                                        '<div onclick="verFiles(this)" fol="'+folio.folio+'" class="input-group-addon btn-success">'+
                                          'ver'+
                                        '</div>'+
                                  '</div>'+
                              '</div>'+     
                      '</div>'+
                    '</div>'+ // Fin modal del formulario principal
                    '<div id="divDependencias" style="display: none">'+
                           '<table class="table table-bordered table-striped">'+
                              '<thead>'+
                                '<tr>'+
                                  '<th width="10%">Consecutivo</th>'+
                                  '<th>Folio</th>'+
                                  '<th>Dependencia</th>'+
                                  '<th>Cantidad</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody id="tablaBodyDepencias">'+
                              '</tbody>'+
                            '</table>'+
                     '</div>'+ //Fin modal lista de dependencias
                      '<div id="divPersonasAseguradas" style="display: none">'+
                           '<table class="table table-bordered table-striped">'+
                              '<thead>'+
                                '<tr>'+
                                  '<th width="10%">Consecutivo</th>'+
                                  '<th>Folio</th>'+
                                  '<th>Nombre del infractor</th>'+
                                  '<th>Sexo</th>'+
                                  '<th>Edad</th>'+
                                  '<th>Domicilio</th>'+
                                  '<th>Estatus</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody id="tablaBodyPersonas">'+
                              '</tbody>'+
                            '</table>'+
                     '</div>'+ //Fin modal personas aseguradas
                     '<div id="divvehiculosAsegurados" style="display: none">'+
                           '<table class="table table-bordered table-striped">'+
                              '<thead>'+
                                '<tr>'+
                                  '<th width="10%">Consecutivo</th>'+
                                  '<th>Folio</th>'+
                                  '<th>Dependencia</th>'+
                                  '<th>Cantidad</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody id="tablaBodyVehiculos">'+
                              '</tbody>'+
                            '</table>'+
                     '</div>'+ //Fin modal personas aseguradas
                      '<div id="divBienessAsegurados" style="display: none">'+
                           '<table class="table table-bordered table-striped">'+
                              '<thead>'+
                                '<tr>'+
                                  '<th width="10%">Consecutivo</th>'+
                                  '<th>Folio</th>'+
                                  '<th>Tipo del Bien y Producto</th>'+
                                  '<th>Detalles</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody id="tablaBodyBienes">'+
                              '</tbody>'+
                            '</table>'+
                     '</div>'+ //Fin modal bienes aseguradas
                      '<div id="divDetailsBien" style="display: none">'+
                           '<form id="detallesBienesFormulario">'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Consecutivo</label>'+
                                    '<input id="inputTextConsecutivo" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Folio</label>'+
                                    '<input id="inputTextFolio" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" readonly>'+
                              '</div>'+
                          '</div>'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Tipo del Bien y Producto</label>'+
                                    '<input id="inputTextTipoBien" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Tipo de Ilícito</label>'+
                                    '<input id="inputTextIlicito" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Género del producto</label>'+
                                    '<input id="inputTextGenero" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Unidad de medida</label>'+
                                    '<input id="inputTextUnidad" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Lugar de depósito</label>'+
                                    '<input id="inputTextLugar" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Cantidad Asegurada</label>'+
                                    '<input id="inputTextCantidad" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Descripción del Bien y Producto Asegurado</label>'+
                                    '<input id="inputTextDescripcion" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Identificador del Bien</label>'+
                                    '<input id="inputIdentificador" type="text" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '</form>'+
                          '</div>'+
                     '</div>'+ //Fin modal detalles bienes aseguradas
                      '<div id="divPredios" style="display: none">'+
                           '<table class="table table-bordered table-striped">'+
                              '<thead>'+
                                '<tr>'+
                                  '<th width="10%">Consecutivo</th>'+
                                  '<th>Folio</th>'+
                                  '<th>Clave única de predio</th>'+
                                  '<th>Detalles</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody id="tablaBodyPredios">'+
                              '</tbody>'+
                            '</table>'+
                     '</div>'+ //Fin modal predios
                     '<div id="divDetailsPredio" style="display: none">'+
                        '<form id="formularioDetallePredio">'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Consecutivo</label>'+
                                    '<input type="text" id="inputTextConsePredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Folio</label>'+
                                    '<input type="text" id="inputTextFolioPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Clave única de predio</label>'+
                                    '<input type="text" id="inputTextClavePredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Cve_sedemex</label>'+
                                    '<input type="text" id="inputTextCvePredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>campo trabajo</label>'+
                                    '<input type="text" id="inputTextCampoT" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Nombre del predio</label>'+
                                    '<input type="text" id="inputTextNombrePredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Cve_tenencia</label>'+
                                    '<input type="text" id="inputTextTenenciaPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Descripción de como llegar al predio</label>'+
                                    '<input type="text" id="inputTextDescPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Latitud (UTM)</label>'+
                                    '<input type="text" id="inputTextLatitudPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Longitud (UTM)</label>'+
                                    '<input type="text" id="inputTextLongPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Superficie total (Ha)</label>'+
                                    '<input type="text" id="inputTextSupPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Superficie cartográfica (Ha)</label>'+
                                    '<input type="text" id="inputTextSuperCartoPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Superficie arbolada (Ha)</label>'+
                                    '<input type="text" id="inputTextArbPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Superficie otros usos (Ha)</label>'+
                                    '<input type="text" id="inputTextOtrosPredios" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Microcuenca (subcuenca especifica)</label>'+
                                    '<input type="text" id="inputTextCuencaPredios" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Área natural protegida</label>'+
                                    '<input type="text" id="inputTextNatProtePredios" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Status del predio</label>'+
                                    '<input type="text" id="inputTextStatusPredios" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Observaciones del predio</label>'+
                                    '<input type="text" id="inputTextObsPredios" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Propietario o Representante legal</label>'+
                                    '<input type="text" id="inputTextPropietaPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>Polígonos del predio</label>'+
                                    '<input type="text" id="inputTextPolPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                          '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>CLAVE ESTATAL</label>'+
                                    '<input type="text" id="inputTextCveEstatal" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>CVE_REGFTAL</label>'+
                                    '<input type="text" id="inputTextRegftalPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                           '<div class="row" style="margin-top: 10px;">'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>CVE_MUN</label>'+
                                    '<input type="text" id="inputTextCveNumPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                              '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                    '<label>CVE_LOC</label>'+
                                    '<input type="text" id="inputTextCveLocPredio" class="form-control" data-toggle="tooltip" title="" onclick="showValue(this)" value="" readonly>'+
                              '</div>'+
                          '</div>'+
                        '</form>'+
                     '</div>'+ //Fin modal detalles predios
                      '<div id="divFiles" style="display: none">'+
                           '<table class="table table-bordered table-striped">'+
                              '<thead>'+
                                '<tr>'+
                                  '<th width="10%">Consecutivo</th>'+
                                  '<th>Folio</th>'+
                                  '<th>Archivo</th>'+
                                  '<th>Fecha</th>'+
                                  '<th>Descripción</th>'+
                                  '<th>Campo Asociado</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody id="tablaBodyFiles">'+
                              '</tbody>'+
                            '</table>'+
                     '</div>'+ //Fin modal lista de dependencias
                    '</div>'+ // Fin  cuerpo de modal
                '<div class="modal-footer">'+
                '<div class="text-center">'+
                      '<button type="button" class="btn btn-default" data-dismiss="modal">CERRAR</button>'+
                '</div>'+ //Fin footer modal
           '</div>'+ //Fin contenido de modal
        '</div>'+ //Fin tipo modal
      '</div>'; //Fin modal

      return formPrincipalProgram8;
}


function drawDependenciaTable(json) {
    $("#tablaBodyDepencias").empty();
    var cuerpoTabla = document.getElementById("tablaBodyDepencias");
    if (json.data.length > 0) {
        for (var aux in json.data) {
            var fila = cuerpoTabla.insertRow();
            for (var tmp in json.data[aux]) {
                if (tmp == "dependencia") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "folio") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "consecutivo") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "cantidad") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                }
            }


        }
    } else {
        var fila = cuerpoTabla.insertRow();
        var columna = fila.insertCell(-1);
        columna.setAttribute("colspan", "4");
        columna.setAttribute("align", "center");
        columna.innerHTML = 'No se encontraron dependencias registradas';
    }
}
 
function drawPersonasTable(json) {
    $("#tablaBodyPersonas").empty();
    var cuerpoTabla = document.getElementById("tablaBodyPersonas");
    if (json.data.length > 0) {
        for (var aux in json.data) {
            var fila = cuerpoTabla.insertRow();
            for (var tmp in json.data[aux]) {
                if (tmp == "consecutivo") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "domicilio") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "edad") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "estatus") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "folio") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "nombre") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                }else if (tmp == "sexo") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                }
            }

        }
    } else {
        var fila = cuerpoTabla.insertRow();
        var columna = fila.insertCell(-1);
        columna.setAttribute("colspan", "7");
        columna.setAttribute("align", "center");
        columna.innerHTML = 'No se encontraron personas registradas';
    }

}


function drawVehiculosTable(parametro) {
    $("#tablaBodyVehiculos").empty();
    var cuerpoTabla = document.getElementById("tablaBodyVehiculos");
    var fila = cuerpoTabla.insertRow();
    var columna = fila.insertCell(-1);
    columna.setAttribute("colspan", "4");
    columna.setAttribute("align", "center");
    columna.innerHTML = 'No hay Vehículos registrados'; 
}
 
    
function drawBienesTable(json) {
    $("#tablaBodyBienes").empty();
    var cuerpoTabla = document.getElementById("tablaBodyBienes");
    if (json.data.length > 0) {
        for (var aux in json.data) {
            var fila = cuerpoTabla.insertRow();
            var consecutivo=null;
            var folio = null;
            for (var tmp in json.data[aux]) {
                if (tmp == "consecutivo") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                    consecutivo = json.data[aux][tmp];
                } else if (tmp == "folio") {
                    folio = json.data[aux][tmp];
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "tipo_producto") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                }
            }
            fila.insertCell(-1).innerHTML='<button onclick="verDetalleBienes(this)" fol="'+folio+'" conse="'+consecutivo+'" class="btn btn-default">VER</button>';

        }
    } else {
        var fila = cuerpoTabla.insertRow();
        var columna = fila.insertCell(-1);
        columna.setAttribute("colspan", "4");
        columna.setAttribute("align", "center");
        columna.innerHTML = 'No se encontraron bienes y productos asegurados';
    }
}


function drawDetallesBienes(json) {
    //Limpia input contenido
    $('#detallesBienesFormulario input').each(function(){
        if($(this).attr('type') == 'text'){
             $(this).attr({value:'', title:''});
             $(this).tooltip('destroy');
        }
    });

    //Carga los datos en el input 
    $('#inputTextConsecutivo').attr({value:json.consecutivo, title:json.consecutivo});
    $('#inputTextFolio').attr({value:json.folio, title:json.folio});
    $('#inputTextTipoBien').attr({value:json.tipo_producto, title:json.tipo_producto});
    $('#inputTextIlicito').attr({value:json.ilicito_producto, title:json.ilicito_producto});
    $('#inputTextGenero').attr({value:json.genero_producto, title:json.genero_producto});
    $('#inputTextUnidad').attr({value:json.unidad_medida, title:json.unidad_medida});
    $('#inputTextLugar').attr({value:json.lugar_deposito, title:json.lugar_deposito});
    $('#inputTextCantidad').attr({value:json.total_productos_asegurados, title:json.total_productos_asegurados});
    $('#inputTextDescripcion').attr({value:json.total_herramientas_menores, title:json.total_herramientas_menores});
    $('#inputIdentificador').attr({value:json.identificador_bien, title:json.identificador_bien});
}

function drawDetallesPredios(json) {
    //Limpia input contenido
    $('#formularioDetallePredio input').each(function() {
        if ($(this).attr('type') == 'text') {
            $(this).attr({ value: '', title: '' });
            $(this).tooltip('destroy');
        }
    });

    //Carga los datos en el input 
    $('#inputTextConsePredio').attr({ value:json.consecutivo , title:json.consecutivo });
    $('#inputTextFolioPredio').attr({ value:json.folio , title:json.folio });
    $('#inputTextClavePredio').attr({ value:json.clave_unica_de_predio , title:json.clave_unica_de_predio });
    $('#inputTextCvePredio').attr({ value:json.cve_sedemex , title:json.cve_sedemex });
    $('#inputTextCampoT').attr({ value:json.campo_trabajo , title:json.campo_trabajo });
    $('#inputTextNombrePredio').attr({ value:json.nombre_del_predio , title:json.nombre_del_predio });
    $('#inputTextTenenciaPredio').attr({ value:json.cve_tenencia , title:json.cve_tenencia });
    $('#inputTextDescPredio').attr({ value:json.descripcion_llegar_predio , title:json.descripcion_llegar_predio });
    $('#inputTextLatitudPredio').attr({ value:json.latitud_utm , title:json.latitud_utm });
    $('#inputTextLongPredio').attr({ value:json.longitud_utm , title:json.longitud_utm });
    $('#inputTextSupPredio').attr({ value:json.superficie_total_ha , title:json.superficie_total_ha });
    $('#inputTextSuperCartoPredio').attr({ value:json.superficie_cartografica_ha , title:json.superficie_cartografica_ha });
    $('#inputTextArbPredio').attr({ value:json.superficie_arbolada_ha , title:json.superficie_arbolada_ha });
    $('#inputTextOtrosPredios').attr({ value:json.superficie_otros_usos_ha , title:json.superficie_otros_usos_ha });
    $('#inputTextCuencaPredios').attr({ value:json.microcuenca_subcuenca_especifica , title:json.microcuenca_subcuenca_especifica });
    $('#inputTextNatProtePredios').attr({ value:json.area_natural_protegida , title:json.area_natural_protegida });
    $('#inputTextStatusPredios').attr({ value:json.status_predio , title:json.status_predio });
    $('#inputTextObsPredios').attr({ value:json.observaciones_predio , title:json.observaciones_predio });
    $('#inputTextPropietaPredio').attr({ value:json.propietario_o_representante_legal , title:json.propietario_o_representante_legal });
    $('#inputTextPolPredio').attr({ value:json.poligonos_del_predio , title:json.poligonos_del_predio });
    $('#inputTextCveEstatal').attr({ value:json.clave_estatal , title:json.clave_estatal });
    $('#inputTextRegftalPredio').attr({ value:json.cve_regftal , title:json.cve_regftal });
    $('#inputTextCveNumPredio').attr({ value:json.cve_num , title:json.cve_num });
    $('#inputTextCveLocPredio').attr({ value: json.cve_loctext, title: json.cve_loctext});
}



function drawPrediosTable(json) {
    $("#tablaBodyPredios").empty();
    var cuerpoTabla = document.getElementById("tablaBodyPredios");
    if (json.data.length > 0) {
        for (var aux in json.data) {
            var fila = cuerpoTabla.insertRow();
            var consecutivo = null;
            var folio = null;
            for (var tmp in json.data[aux]) {
                if (tmp == "consecutivo") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                    consecutivo = json.data[aux][tmp];
                } else if (tmp == "clave_unica_de_predio") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "folio") {
                    folio = json.data[aux][tmp];
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                }
            }
            fila.insertCell(-1).innerHTML = '<button onclick="verDetallePredio(this)" fol="'+folio+'" conse="' + consecutivo + '" class="btn btn-default">VER</button>';

        }
    } else {
        var fila = cuerpoTabla.insertRow();
        var columna = fila.insertCell(-1);
        columna.setAttribute("colspan", "4");
        columna.setAttribute("align", "center");
        columna.innerHTML = 'No se encontraron predios registrados';
    }
}

function drawFilesTable(json) {
    $("#tablaBodyFiles").empty();
    var cuerpoTabla = document.getElementById("tablaBodyFiles");
    if (json.data.length > 0) {
        for (var aux in json.data) {
            var fila = cuerpoTabla.insertRow();
            var conse=null;
            var fol= null;
            for (var tmp in json.data[aux]) {
                if (tmp == "consecutivo") {
                    conse = json.data[aux][tmp];
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "campoasociado") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "descripcion") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "fecha") {
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "folio") {
                    fol = json.data[aux][tmp];
                    fila.insertCell(-1).innerHTML = json.data[aux][tmp];
                } else if (tmp == "url") {
                    fila.insertCell(-1).innerHTML = '<a onclick=viewFile(this) fol="'+fol+'" conse="'+conse+'" url='+json.data[aux][tmp]+'>'+json.data[aux][tmp]+'</a>';
                    
                }

            }

        }
    } else {
        var fila = cuerpoTabla.insertRow();
        var columna = fila.insertCell(-1);
        columna.setAttribute("colspan", "6");
        columna.setAttribute("align", "center");
        columna.innerHTML = 'No se encontraron archivos';
    }
}




function showPrograma8(folio) {
    queryFormularioPrincipal('selectGeneral', $(folio).attr('fol'), amplify.store('dataLoggingProbosque').id);
}



function verBienesAseg(b){
   queryBienesyProductos('bienesAseguradosC',$(b).attr('fol'), amplify.store('dataLoggingProbosque').id);
}

function verPersonasAseg(p){
   queryPersonAseguradas('personasAseguradas',$(p).attr('fol'), amplify.store('dataLoggingProbosque').id);
}


function verVehiculosAseg(v){
   queryVehiculosAseg('vehiculosAsegurados',$(v).attr('fol'), amplify.store('dataLoggingProbosque').id);
}


function verDependencias(d) {
    queryDependencias('dependenciasParticipantes', $(d).attr('fol'), amplify.store('dataLoggingProbosque').id);
}


function verFiles(f){
    queryFiles('archivos', $(f).attr('fol'), amplify.store('dataLoggingProbosque').id);
}

function verPredios(pd) {
    queryPrediosDetails('prediosC', $(pd).attr('fol'), amplify.store('dataLoggingProbosque').id);
}


function verDetalleBienes(dB){
    queryBienesyProductosDetails('bienesAseguradosL',$(dB).attr('fol'), amplify.store('dataLoggingProbosque').id,$(dB).attr('conse'));  
}


function verDetallePredio(dpd) {
    queryPredioDetails('prediosL', $(dpd).attr('fol'), amplify.store('dataLoggingProbosque').id, $(dpd).attr('conse'));
}

function viewFile(aux){
     queryFilesShow('get', $(aux).attr('fol'), amplify.store('dataLoggingProbosque').id , $(aux).attr('conse'), $(aux).attr('url'));
}

function showValue(p) {
    if ($(p).val().length > 20) {
        $(p).tooltip('show');
    }
}

function backDetailsPredio(){
   verPredios(null);
}

function backDetailsBienes(){
   verBienesAseg(null);
}

function backFormularioPrincipal() {
    $('#divFiles').hide();
    $('#divPredios').hide();
    $('#divDetailsPredio').hide();
    $('#divDetailsBien').hide();
    $('#divDependencias').hide();
    $('#divvehiculosAsegurados').hide();
    $('#divPersonasAseguradas').hide();
    $('#divBienessAsegurados').hide();
    $('#headerIdDiv').html('Información detallada');
    $('#formularioPrincipal').show();
}

var showError = function(msj) {
    $('#divmodalerror').html('');
    $('#divmodalerror').html(modalError(msj,'Aceptar'));
    $('#myModalRespError').modal('show');
}

function isEmpty(texto){
  if(/^\s*$/.test(texto.trim())){
     return "Seleccione una opción";
  }else{
    return texto;
  }
}

function labelIndustria(cve){
  
  if(cve.indexOf('IA') != -1 || cve.indexOf('IT') != -1 || cve.indexOf('IT') != -1){
    return 'Industria';
  }else{
   return 'Clave única de identificación';
  }
  

}

/***********************************************************
              PETICIONES AJAX 
***********************************************************/
function queryFormularioPrincipal(action, folio, idUser) {
    var r = {
        success: function(json) {
            var b = false;
            var obj= null;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            for(var tmp in json.data){
                if (json.data.length > 0) {
                    for (var aux in json.data) {                        
                        obj = JSON.parse(JSON.stringify(json.data[aux]));
                    }
                }
            }

            if (b) {
                $('#datosPrograma8').html();
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('Información detallada');
                $('#datosPrograma8').html(formPrincipalProgram8(obj));
                $('#modalDetalle').modal('show');
            } else {
                showError('Fallo al consultar datos');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio };
    $.ajax(r);
}

function queryDependencias(action, folio, idUser) {
    var r = {
        success: function(json) {
            var b = false;

            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                drawDependenciaTable(json);
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('<label><a onclick="backFormularioPrincipal()"><span class="glyphicon glyphicon-chevron-left"></span></a></label> Dependencias participantes');
                $('#formularioPrincipal').hide();
                $('#divPersonasAseguradas').hide();
                $('#divvehiculosAsegurados').hide();
                $('#divDetailsBien').hide();
                $('#divBienessAsegurados').hide();
                $('#divPredios').hide();
                $('#divDetailsPredio').hide();
                $('#divFiles').hide();
                $('#divDependencias').show();
            } else {
                showError('Fallo al consultar dependencias');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio };
    $.ajax(r);
}

function queryVehiculosAseg(action, folio, idUser) {
    var r = {
        success: function(json) {
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                drawVehiculosTable(json);
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('<label><a onclick="backFormularioPrincipal()"><span class="glyphicon glyphicon-chevron-left"></span></a></label> Vehículos asegurados');
                $('#formularioPrincipal').hide();
                $('#divDependencias').hide();
                $('#divPersonasAseguradas').hide();
                $('#divDetailsBien').hide();
                $('#divBienessAsegurados').hide();
                $('#divPredios').hide();
                $('#divDetailsPredio').hide();
                $('#divFiles').hide();
                $('#divvehiculosAsegurados').show();
            } else {
                showError('Fallo al consultar vehículos asegurados');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio };
    $.ajax(r);
}

function queryPersonAseguradas(action, folio, idUser) {
    var r = {
        success: function(json) {
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                drawPersonasTable(json);
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('<label><a onclick="backFormularioPrincipal()"><span class="glyphicon glyphicon-chevron-left"></span></a></label> Personas aseguradas');
                $('#formularioPrincipal').hide();
                $('#divDependencias').hide();
                $('#divvehiculosAsegurados').hide();
                $('#divDetailsBien').hide();
                $('#divBienessAsegurados').hide();
                $('#divPredios').hide();
                $('#divDetailsPredio').hide();
                $('#divFiles').hide();
                $('#divPersonasAseguradas').show();
            } else {
                showError('Fallo al consultar personas aseguradas');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio };
    $.ajax(r);
}


function queryBienesyProductos(action, folio, idUser) {
    var r = {
        success: function(json) {
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                drawBienesTable(json);
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('<label><a onclick="backFormularioPrincipal()"><span class="glyphicon glyphicon-chevron-left"></span></a></label> Bienes y Productos Asegurados ');
                $('#formularioPrincipal').hide();
                $('#divDependencias').hide();
                $('#divvehiculosAsegurados').hide();
                $('#divPersonasAseguradas').hide();
                $('#divDetailsBien').hide();
                $('#divPredios').hide();
                $('#divDetailsPredio').hide();
                $('#divFiles').hide();
                $('#divBienessAsegurados').show();
            } else {
                showError('Fallo al consultar bienes y productos asegurados');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio };
    $.ajax(r);
}

function queryBienesyProductosDetails(action, folio, idUser, conse) {
    var r = {
        success: function(json) {
            var b = false;
            var obj= null;             
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            for(var tmp in json.data){
                if (json.data.length > 0) {
                    for (var aux in json.data) {                        
                        obj = JSON.parse(JSON.stringify(json.data[aux]));
                    }
                }
            }

            if (b) {
                drawDetallesBienes(obj);
                $('#divFiles').hide();
                $('#divPredios').hide();
                $('#divDetailsPredio').hide();
                $('#divDependencias').hide();
                $('#divPersonasAseguradas').hide();
                $('#divBienessAsegurados').hide();
                $('#formularioPrincipal').hide();
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('<label><a onclick="backDetailsBienes()"><span class="glyphicon glyphicon-chevron-left"></span></a></label>Detalle del Bien y Productos Asegurado');
                $('#divDetailsBien').show();
            } else {
                showError('Fallo al consultar el detalle');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio, consecutivo : conse };
    $.ajax(r);
}

function queryPrediosDetails(action, folio, idUser) {
    var r = {
        success: function(json) {
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                drawPrediosTable(json);
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('<label><a onclick="backFormularioPrincipal()"><span class="glyphicon glyphicon-chevron-left"></span></a></label>Predios');
                $('#formularioPrincipal').hide();
                $('#divPersonasAseguradas').hide();
                $('#divvehiculosAsegurados').hide();
                $('#divDetailsBien').hide();
                $('#divBienessAsegurados').hide();
                $('#divDependencias').hide();
                $('#divFiles').hide();
                $('#divDetailsPredio').hide();
                $('#divPredios').show();
            } else {
                showError('Fallo al consultar predios');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio};
    $.ajax(r);
}

function queryPredioDetails(action, folio, idUser, conse) {
    var r = {
        success: function(json) {
            var b = false;
            var obj= null; 
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            for(var tmp in json.data){
                if (json.data.length > 0) {
                    for (var aux in json.data) {                        
                        obj = JSON.parse(JSON.stringify(json.data[aux]));
                    }
                }
            }

            if (b) {
                  drawDetallesPredios(obj);
                  $('#divFiles').hide();
                  $('#divDependencias').hide();
                  $('#divPersonasAseguradas').hide();
                  $('#divBienessAsegurados').hide();
                  $('#formularioPrincipal').hide();
                  $('#divDetailsBien').hide();
                  $('#headerIdDiv').html('');
                  $('#headerIdDiv').html('<label><a onclick="backDetailsPredio()"><span class="glyphicon glyphicon-chevron-left"></span></a></label>Detalle del Predio');
                  $('#divPredios').hide();
                  $('#divDetailsPredio').show();
            } else {
                showError('Fallo al consultar el detalle');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio, consecutivo : conse };
    $.ajax(r);
}

function queryFiles(action, folio, idUser) {
    var r = {
        success: function(json) {
            var b = false;
            for (var tmp in json.response) {
                if (tmp == 'sucessfull') {
                    b = json.response[tmp];
                }
            }

            if (b) {
                drawFilesTable(json);
                $('#headerIdDiv').html('');
                $('#headerIdDiv').html('<label><a onclick="backFormularioPrincipal()"><span class="glyphicon glyphicon-chevron-left"></span></a></label> Archivos');
                $('#formularioPrincipal').hide();
                $('#divPersonasAseguradas').hide();
                $('#divvehiculosAsegurados').hide();
                $('#divDetailsBien').hide();
                $('#divBienessAsegurados').hide();
                $('#divPredios').hide();
                $('#divDetailsPredio').hide();
                $('#divDependencias').hide();
                $('#divFiles').show();
            } else {
                showError('Fallo al consultar archivos');
            }
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestemos);
    r.data = { action: action, usuario: idUser, folio: folio };
    $.ajax(r);
}

function queryFilesShow(action, folio, idUser, conse, field) {
    var r = {
        success: function(json) {
            var url = URL.createObjectURL(json);
            var $a = $('<a />', {
                'href': url,
                'download': field,
                'text': "click"
            }).hide().appendTo("body")[0].click();
            setTimeout(function() {
                URL.revokeObjectURL(url);
            }, 10000);
        },
        beforeSend: function(xhr) {},
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showError('No se pudo descargar el Archivo');
        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceQR);
    r.data = { action: action, user: idUser, folio: folio, field: 'url', consecutivo: conse };
    $.ajax(r);
}


var modalError = function(mensaje,btnText) {
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
}
