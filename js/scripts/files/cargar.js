function mostrar(folio,user,observacio,respuesta, tipo, vuelta, fenj, frej, fent, fret, fena, frea, consecutivo){
  if (tipo == 2 || tipo == 5 || tipo == 6) {
    var m_uno = (respuesta == -1) ? "selected='selected'" : "";
    var uno = (respuesta == 1) ? "selected='selected'" : "";
    var dos = (respuesta == 2) ? "selected='selected'" : "";
    var tres = (respuesta == 3) ? "selected='selected'" : "";
  }
  var observacion = (observacio == 'undefined') ? "" : observacio;

  var fej = (fenj == 'undefined') ? "" : fenj; 
  var frj = (frej == 'undefined') ? "" : frej;
  var fet = (fent == 'undefined') ? "" : fent;
  var frt = (fret == 'undefined') ? "" : fret;
  var fea = (fena == 'undefined') ? "" : fena;
  var fra = (frea == 'undefined') ? "" : frea;

  $(".app_ventanilla").hide();
  var body = document.getElementsByTagName("body").item(0);
  var midiv = document.createElement("div");
  midiv.setAttribute("id","custom_multirecords");
  midiv.setAttribute("class","custom_multirecords");
  midiv.innerHTML ='';
            
  switch(tipo) {
  case 1:
      midiv.innerHTML = "<div class='veil'></div>"+
        "<div class='mainContainer'>"+
          "<div class='column w100' style='height:100%;'>"+
            "<div class='container'>"+
              "<div class='data'>"+
                "<div class='formRecords' style='display: block;'>"+
                  "<div class='Header'>"+
                    "<div class='label'>INICIO PROCESO</div>"+
                  "</div>"+
                  "<div  onclick='quitar()' class='iconClose'>"+
                    "<div class='template_multirecords tmr_close'></div>"+
                  "</div>"+
                  "<div class='fields'>"+
                    "<div class='background_subtable'>"+
                      "<div class='row'>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_sub_add_folio'>"+
                            "<div class='label'>Folio</div>"+
                            "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                          "</div>"+
                        "</div>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_sub_add_fecha'>"+
                            "<div class='label'>Fecha de Cambio de Estatus</div>"+
                            "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                          "</div>"+

                        "</div>"+
                      "</div>"+
                      "<div class='row'>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_tb_add_estatus'>"+
                            "<div class='label'>Estatus</div>"+
                            "<select class='selectInput' onchange='Change()' id='tb_add_estatus' datatype='list' field='estatus'>"+
                              "<option value='-1' selected='selected'>Seleccione una opción</option>"+
                              "<option value='6'>Autorización</option>"+
                              "<option value='5'>Código De Identificación</option>"+
                              "<option value='4'>Comité De Fomento</option>"+
                              "<option value='1'>Dictaminación</option>"+
                              "<option value='3'>Información Adicional</option>"+
                              "<option value='7'>Negación</option>"+
                              "<option value='2'>Rechazo</option>"+
                              "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                              "<option value='8'>Vencidas</option>"+
                            "</select>"+
                          "</div>"+
                        "</div>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_sub_add_observacion'>"+
                            "<div class='label'>Observaciones</div>"+
                            "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                      "<div class='row dictamen' style='display: none;'>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_juridico_envio'>"+
                            "<div class='label'>Dictamen Jurídico <small> (Fecha de envio)</small></div>"+
                            "<input id='dateJuridicoEnvio' field='dictamenJuridicoEnvio' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                          "</div>"+
                        "</div>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_tecnico_envio'>"+
                            "<div class='label'>Dictamen Técnico <small> (Fecha de envio)</small></div>"+
                            "<input id='dateTecnicoEnvio' field='dictamenTecnicoEnvio' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                      "<div class='row dictamen' style='display: none;'>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_ambiental_envio'>"+
                            "<div class='label'>Dictamen Ambiental <small> (Fecha de envio)</small></div>"+
                            "<input id='dateAmbientalEnvio' field='dictamenAmbientalEnvio' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                      "<div class='ButtonSection' align='center'>"+
                        "<button class='textButton' onclick='Aceptar(-1,"+user+", 0, 0)' id='new_subtable'>Aceptar</button>"+
                        "<button onclick='quitar()' class='textButton' id='cancel_subtable'>Cancelar</button>"+
                      "</div>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>";
  break;
  
  case 2:
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>DICTAMINACIÓN</div>"+
                "</div>"+
                "<div onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+ 
                            "<option value='6'>Autorización</option>"+
                            "<option value='5'>Código De Identificación</option>"+
                            "<option value='4'>Comité De Fomento</option>"+
                            "<option value='1' selected='selected'>Dictaminación</option>"+
                            "<option value='3'>Información Adicional</option>"+
                            "<option value='7'>Negación</option>"+
                            "<option value='2'>Rechazo</option>"+
                            "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Respuesta</div>"+
                          "<select class='selectInput' id='tb_add_respuesta' datatype='list' field='respuesta'>"+
                            "<option value='-1' "+m_uno+">Seleccione una opción</option>"+
                            "<option value='1' "+uno+">Procedente</option>"+
                            "<option value='2' "+dos+">No Procedente</option>"+
                            "<option value='3' "+tres+">En Espera de Respuesta</option>"+                        
                          "</select>"+
                       "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_vuelta'>"+
                          "<div class='label'>Vuelta</div>"+
                          "<input id='field_sub_add_vuelta' field='vuelta' type='edit' datatype='string' value='"+vuelta+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_dictamen_juridico_envio'>"+
                            "<div class='label'>Dictamen Jurídico <small> (Fecha de envio)</small></div>"+
                            "<input id='dateJuridicoEnvio' field='dictamenJuridicoEnvio' type='edit' datatype='date' value='"+fej+"' maxlength='20' minlength='10' class='textInput date2'>"+
                          "</div>"+
                        "</div>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_juridico_recibido'>"+
                            "<div class='label'>Dictamen Jurídico <small> (Fecha de recibido)</small></div>"+
                            "<input id='dateJuridicoRecibido' field='dictamenJuridicoRecibido' type='edit' datatype='date' value='"+frj+"' maxlength='20' minlength='10' class='textInput date2'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_dictamen_tecnico_envio'>"+
                            "<div class='label'>Dictamen Técnico <small> (Fecha de envio)</small></div>"+
                            "<input id='dateTecnicoEnvio' field='dictamenTecnicoEnvio' type='edit' datatype='date' value='"+fet+"' maxlength='20' minlength='10' class='textInput date2'>"+
                          "</div>"+
                        "</div>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_tecnico_recibido'>"+
                            "<div class='label'>Dictamen Técnico <small> (Fecha de recibido)</small></div>"+
                            "<input id='dateTecnicoRecibido' field='dictamenTecnicoRecibido' type='edit' datatype='date' value='"+frt+"' maxlength='20' minlength='10' class='textInput date2'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_dictamen_ambiental_envio'>"+
                          "<div class='label'>Dictamen Ambiental <small> (Fecha de envio)</small></div>"+
                          "<input id='dateAmbientalEnvio' field='dictamenAmbientalEnvio' type='edit' datatype='date' value='"+fea+"' maxlength='20' minlength='10' class='textInput date2'>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_dictamen_ambiental_recibido'>"+
                          "<div class='label'>Dictamen Ambiental <small> (Fecha de recibido)</small></div>"+
                          "<input id='dateAmbientalRecibido' field='dictamenAmbientalRecibido' type='edit' datatype='date' value='"+fra+"' maxlength='20' minlength='10' class='textInput date2'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m12 l12'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(1,"+user+", "+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button class='textButton' onclick='quitar()' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;
  
  case 3:
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>RECHAZO</div>"+
                "</div>"+
                "<div  onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_vuelta'>"+
                          "<div class='label'>Vuelta</div>"+
                          "<input id='field_sub_add_vuelta' field='vuelta' type='edit' datatype='string' value='"+vuelta+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+
                            "<option value='6'>Autorización</option>"+
                            "<option value='5'>Código De Identificación</option>"+
                            "<option value='4'>Comité De Fomento</option>"+
                            "<option value='1'>Dictaminación</option>"+
                            "<option value='3'>Información Adicional</option>"+
                            "<option value='7'>Negación</option>"+
                            "<option value='2' selected='selected'>Rechazo</option>"+
                            "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(2,"+user+","+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button onclick='quitar()' class='textButton' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;

  case 4:
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>INFORMACIÓN ADICIONAL</div>"+
                "</div>"+
                "<div  onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+
                            "<option value='6'>Autorización</option>"+
                            "<option value='5'>Código De Identificación</option>"+
                            "<option value='4'>Comité De Fomento</option>"+
                            "<option value='1'>Dictaminación</option>"+
                            "<option value='3' selected='selected'>Información Adicional</option>"+
                            "<option value='7'>Negación</option>"+
                            "<option value='2'>Rechazo</option>"+
                            "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(3,"+user+","+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button onclick='quitar()' class='textButton' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;
  
  case 5:
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>COMITÉ DE FOMENTO</div>"+
                "</div>"+
                "<div onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+
                            "<option value='6'>Autorización</option>"+
                            "<option value='5'>Código De Identificación</option>"+
                            "<option value='4' selected='selected'>Comité De Fomento</option>"+
                            "<option value='1'>Dictaminación</option>"+
                            "<option value='3'>Información Adicional</option>"+
                            "<option value='7'>Negación</option>"+
                            "<option value='2'>Rechazo</option>"+
                            "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Respuesta</div>"+
                          "<select class='selectInput' id='tb_add_respuesta' datatype='list' field='respuesta'>"+
                            "<option value='-1' "+m_uno+">Seleccione una opción</option>"+
                            "<option value='1' "+uno+">Procedente</option>"+
                            "<option value='2' "+dos+">No Procedente</option>"+
                            "<option value='3' "+tres+">En Espera de Respuesta</option>"+                        
                          "</select>"+
                       "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m12 l12'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(4,"+user+","+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button class='textButton' onclick='quitar()' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;
  
  case 6:
  var codigo = (fej == 'undefined') ? "" : fej;
  var oficio = (frj == 'undefined') ? "" : frj;
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>CODIGO DE IDENTIFICACIÓN</div>"+
                "</div>"+
                "<div onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+
                            "<option value='6'>Autorización</option>"+
                            "<option value='5' selected='selected'>Código De Identificación</option>"+
                            "<option value='4'>Comité De Fomento</option>"+
                            "<option value='1'>Dictaminación</option>"+
                            "<option value='3'>Información Adicional</option>"+
                            "<option value='7'>Negación</option>"+
                            "<option value='2'>Rechazo</option>"+
                            "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Respuesta</div>"+
                          "<select class='selectInput' id='tb_add_respuesta' datatype='list' field='respuesta'>"+
                            "<option value='-1' "+m_uno+">Seleccione una opción</option>"+
                            "<option value='1' "+uno+">Formulación de solicitud de código</option>"+
                            "<option value='2' "+dos+">Recepción de código</option>"+
                            "<option value='3' "+tres+">Espera de código</option>"+                        
                          "</select>"+
                       "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_fecha_recepcion_oficio'>"+
                            "<div class='label'>Fecha de Recepción de Oficio</small></div>"+
                            "<input id='date_fecha_recepcion_oficio' field='FechaRecepcionOficio' type='edit' datatype='date' value='"+oficio+"' maxlength='20' minlength='10' class='textInput date2'>"+
                        "</div>"+
                      "</div>"+
                        "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_fecha_recepcion_codigo'>"+
                            "<div class='label'>Fecha de Recepción de Codigo</small></div>"+
                            "<input id='date_fecha_recepcion_codigo' field='FechaRecepcionCodigo' type='edit' datatype='date' value='"+codigo+"' maxlength='20' minlength='10' class='textInput date2'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m12 l12'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(5,"+user+","+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button class='textButton' onclick='quitar()' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;
  
  case 7:
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>NEGACIÓN</div>"+
                "</div>"+
                "<div  onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+
                            "<option value='6'>Autorización</option>"+
                            "<option value='5'>Código De Identificación</option>"+
                            "<option value='4'>Comité De Fomento</option>"+
                            "<option value='1'>Dictaminación</option>"+
                            "<option value='3'>Información Adicional</option>"+
                            "<option value='7' selected='selected'>Negación</option>"+
                            "<option value='2'>Rechazo</option>"+
                            "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(7,"+user+","+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button onclick='quitar()' class='textButton' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;
  
  case 8:
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>VENCIDAS</div>"+
                "</div>"+
                "<div  onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+
                            "<option value='6'>Autorización</option>"+
                            "<option value='5'>Código De Identificación</option>"+
                            "<option value='4'>Comité De Fomento</option>"+
                            "<option value='1'>Dictaminación</option>"+
                            "<option value='3'>Información Adicional</option>"+
                            "<option value='7'>Negación</option>"+
                            "<option value='2'>Rechazo</option>"+
                            "<option value='9'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8' selected='selected'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(8,"+user+","+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button onclick='quitar()' class='textButton' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;

  case 9:
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>SOLICITUD AUTORIZADA</div>"+
                "</div>"+
                "<div  onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' style='background-color: #EBEBE4;' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Autorización</div>"+
                          "<input id='fechaAutorizacion' field='fechaAutorizacion' type='edit' datatype='date' value='"+observacion+"' maxlength='20' minlength='10' class='textInput' style='background-color: #EBEBE4;' readonly>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                     "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_region'>"+
                          "<div class='label'>Region</div>"+
                            "<input id='sub_add_region' field='region' type='comment' datatype='string' value='"+respuesta+"' maxlength='500' minlength='2' class='textInput comment truncate' style='background-color: #EBEBE4;' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_municipio'>"+
                          "<div class='label'>Municipio</div>"+
                          "<input id='sub_add_municipio' field='municipio' type='comment' datatype='string' value='"+fej+"' maxlength='500' minlength='2' class='textInput comment truncate' style='background-color: #EBEBE4;' readonly>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Superficie</div>"+
                            "<input id='sub_add_superficie' field='superficie' type='comment' datatype='string' value='"+frj+"' maxlength='500' minlength='2' class='textInput comment truncate' style='background-color: #EBEBE4;' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_volumen'>"+
                          "<div class='label'>Volumen</div>"+
                          "<input id='sub_add_volumen' field='volumen' type='comment' datatype='string' value='"+fet+"' maxlength='500' minlength='2' class='textInput comment truncate' style='background-color: #EBEBE4;' readonly>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_propietario'>"+
                          "<div class='label'>Propietario</div>"+
                            "<input id='sub_add_propietario' field='propietario' type='comment' datatype='string' value='"+frt+"' maxlength='500' minlength='2' class='textInput comment truncate' style='background-color: #EBEBE4;' readonly>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+                  
                    "<div class='ButtonSection' align='center'>"+
                      "<button onclick='quitar()' class='textButton' id='cancel_subtable'>Aceptar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;
  
  case 11:
  var codigo = (fej == 'undefined') ? "" : fej;
    midiv.innerHTML = "<div class='veil'></div>"+
      "<div class='mainContainer'>"+
        "<div class='column w100' style='height:100%;'>"+
          "<div class='container'>"+
            "<div class='data'>"+
              "<div class='formRecords' style='display: block;'>"+
                "<div class='Header'>"+
                  "<div class='label'>ESTATUS DE MIA(Espera resolutivo de MIA)</div>"+
                "</div>"+
                "<div  onclick='quitar()' class='iconClose'>"+
                  "<div class='template_multirecords tmr_close'></div>"+
                "</div>"+
                "<div class='fields'>"+
                  "<div class='background_subtable'>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_folio'>"+
                          "<div class='label'>Folio</div>"+
                          "<input id='sub_add_folio' field='folio' type='edit' datatype='string' value='"+folio+"' class='textInput' readonly>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_fecha'>"+
                          "<div class='label'>Fecha de Cambio de Estatus</div>"+
                          "<input id='datepicker' field='fecha' type='edit' datatype='date' value='' maxlength='20' minlength='10' class='textInput date'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_tb_add_estatus'>"+
                          "<div class='label'>Estatus</div>"+
                          "<select class='selectInput' id='tb_add_estatus' datatype='list' field='estatus'>"+
                            "<option value='-1'>Seleccione una opción</option>"+
                            "<option value='6'>Autorización</option>"+
                            "<option value='5'>Código De Identificación</option>"+
                            "<option value='4'>Comité De Fomento</option>"+
                            "<option value='1'>Dictaminación</option>"+
                            "<option value='3'>Información Adicional</option>"+
                            "<option value='7'>Negación</option>"+
                            "<option value='2'>Rechazo</option>"+
                            "<option value='9' selected='selected'>Mia(Espera resolutivo de MIA)</option>"+
                            "<option value='8'>Vencidas</option>"+
                          "</select>"+
                        "</div>"+
                      "</div>"+
                      "<div class='col s12 m6 l6'>"+
                          "<div class='Field' id='field_dictamen_fecha_recepcion_codigo'>"+
                            "<div class='label'>Fecha de Recepción de Codigo</small></div>"+
                            "<input id='date_fecha_recepcion_codigo' field='FechaRecepcionCodigo' type='edit' datatype='date' value='"+codigo+"' maxlength='20' minlength='10' class='textInput date2'>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                      "<div class='col s12 m6 l6'>"+
                        "<div class='Field' id='field_sub_add_observacion'>"+
                          "<div class='label'>Observaciones</div>"+
                          "<input id='sub_add_observacion' field='observacion' type='comment' datatype='string' value='"+observacion+"' maxlength='500' minlength='2' class='textInput comment truncate'>"+
                        "</div>"+
                      "</div>"+
                    "<div class='ButtonSection' align='center'>"+
                      "<button class='textButton' onclick='Aceptar(9,"+user+","+vuelta+", "+consecutivo+")' id='new_subtable'>Aceptar</button>"+
                      "<button onclick='quitar()' class='textButton' id='cancel_subtable'>Cancelar</button>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
  break;  
}
    body.appendChild(midiv);
    $('.date').datepicker({beforeShowDay: $.datepicker.noWeekends}).datepicker('setDate', 'today');
    $('.date2').datepicker({beforeShowDay: $.datepicker.noWeekends}).datepicker();    
    
};

function quitar(){
    $( ".custom_multirecords" ).remove();
    $(".app_ventanilla").show();
}

function Change() {
  //alert("exitosa");
  if ($("#tb_add_estatus").val() == 1) {
    $(".dictamen").show("slow");
  }else{
    $(".dictamen").hide("slow");
  }
}



function ActualizacionExitosa(){
  $( ".custom_multirecords" ).remove();
  var body = document.getElementsByTagName("body").item(0);
  var midiv = document.createElement("div");
  midiv.setAttribute("id","custom_multirecords");
  midiv.setAttribute("class","custom_multirecords");
  midiv.innerHTML ="<div class='custom_alert '>"+
    "<div class='custom_alert_veil'></div>"+
    "<div class='message'>"+
      "<div class='header notification'>"+
        "<div class='label'>Notificación</div>"+
      "</div>"+
      "<div class='content'>"+
        "<p>El registro ha sido editado satisfactoriamente</p>"+
        "<div class='buttons' align='center'>"+
          "<button onclick='quitar()' class='textButton textButton_notification'>Cerrar</button>"
        "</div>"+
      "</div>"+
    "</div>"+
  "</div>";
  body.appendChild(midiv);
}

function Error(){
  $( ".custom_multirecords" ).remove();
    var body = document.getElementsByTagName("body").item(0);
    var midiv = document.createElement("div");
    midiv.setAttribute("id","custom_multirecords");
    midiv.setAttribute("class","custom_multirecords");
    midiv.innerHTML ="<div class='custom_alert '>"+
      "<div class='custom_alert_veil'></div>"+
        "<div class='message'>"+
          "<div class='header error'>"+
            "<div class='label'>Notificación</div>"+
          "</div>"+
          "<div class='content'>"+
            "<p>Ocurrió un error, inténtelo mas tarde.</p>"+
            "<div class='buttons' align='center'>"+
              "<button onclick='quitar()' class='textButton textButton_error'>Cerrar</button>"
            "</div>"+
          "</div>"+
        "</div>"+
    "</div>";
    body.appendChild(midiv);
}

function ErrorServidor(){
  $( ".custom_multirecords" ).remove();
    var body = document.getElementsByTagName("body").item(0);
    var midiv = document.createElement("div");
    midiv.setAttribute("id","custom_multirecords");
    midiv.setAttribute("class","custom_multirecords");
    midiv.innerHTML ="<div class='custom_alert '>"+
      "<div class='custom_alert_veil'></div>"+
        "<div class='message'>"+
          "<div class='header error'>"+
            "<div class='label'>Notificación</div>"+
          "</div>"+
          "<div class='content'>"+
            "<p>Servicio no disponible intente más tarde</p>"+
            "<div class='buttons' align='center'>"+
              "<button onclick='quitar()' class='textButton textButton_error'>Cerrar</button>"
            "</div>"+
          "</div>"+
        "</div>"+
    "</div>";
    body.appendChild(midiv);
}

function DaysBetweenDates(startDate, endDate, user) {
  //variable Temporal de Fechas
  //Este sera una funcion que se conectara a la base de datos y devolvera un array con fechas
  var fechasExclude = getFechaExluida2('getFechas', user);
  //var fechasExclude = ["03/08/2016", "10/08/2016", "17/08/2016", "24/08/2016", "31/08/2016"];
  
  // Validando Fechas
  if (endDate < startDate){
    return 0;
  }  
  
  //Calcula los dias entre las fechas
  var millisecondsPerDay = 86400 * 1000; // Dia en Milisegundos
  startDate.setHours(0,0,0,1);  // Comenzar justo después de la medianoche.
  endDate.setHours(23,59,59,999);  //  Terminar justo antes de medianoche.
  var diff = endDate - startDate;  // Milisegundos entre los objetos de fecha y hora.
    
  //Excluir numero de dias no laborables.
  var dateFrom = startDate;
  var dateTo = endDate;

  var count = 0;
  var i;
  for (i = 0; i < fechasExclude.length; i++) {
    var dateCheck = fechasExclude[i];
    var c = dateCheck.split("/");
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);
    if(check > dateFrom && check < endDate){
      count++;
    }
  }
  //alert("Conteo final " + i);
  //alert("Conteo final " + count);
  
  var days = Math.ceil(diff / millisecondsPerDay);  

  //Restar dos días de fin de semana por cada semana
  var weeks = Math.floor(days / 7);
  days = days - (weeks * 2);
  //Manejar casos especiales
  var startDay = startDate.getDay();
  var endDay = endDate.getDay();
    
  //Remover fin de semana no eliminados previamente.   
  if (startDay - endDay > 1){         
    days = days - 2;
  }
  
  //Remover dia de inicio si comineza en domingo, pero termina antes del sábado.
  if (startDay == 0 && endDay != 6) {
    days = days - 1;  
  }
            
  // Remover el ultimo dia si termina el sábado, pero inicia después del domingo
  if (endDay == 6 && startDay != 0) {
    days = days - 1;
  }
  
  //Remover los dias no lavorables de tener
  days = days - count;
    
  return days;
}

function addFecha(user) {
  var date = $("#datepicker").val();
  if(date != ""){
    addFechaExluida("addFecha", user, date);
  }
}

function addFechaExluida(action, user, fecha){
    var dataf = 'action=' + action + '&user=' + user + '&fecha=' + fecha;
    $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
              if(index == "data"){
                if (data == true) {
                  getFechaExluida("getFechas", user);
                }
              }
            });
        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function getFechaExluida(action, user){
    var dataf = 'action=' + action + '&user=' + user;
    $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
              if(index == "data"){
                var divp = $('#contenedor2');
                    divp.find('div').remove();
                  $.each(data, function(index, data){
                    //alert(data.value +""+ data.label);
                    var mires=$("#contenedor2");
                    mires.append("<div><div style='float:left; width:80%; font-size:13px; font-weight:bold; color:#000; background-color:#FFFFFF'>"+data.label+"</div> <div><button class='close' onclick='deleteFecha("+user+","+data.value+");'>&times;</button></div></div>");
                  });
              }
            });
        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function deleteFecha(user, indice) {
  //alert(indice+" "+user);
  deleteFechaExluida("deleteFecha",user, indice);
}

function deleteFechaExluida(action, user, indice){
    var dataf = 'action=' + action + '&user=' + user + '&indice=' + indice;
    $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
              if(index == "data"){
                if (data == true) {
                  getFechaExluida("getFechas", user);
                }
              }
            });
        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function getFechaExluida2(action, user){
    var dataf = 'action=' + action + '&user=' + user;
    var array = [];
    $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        async: false,
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
              if(index == "data"){
                  $.each(data, function(index, data){
                    //alert(data.value +""+ data.label);
                    array.push(data.label);
                    //var mires=$("#contenedor2");
                    //mires.append("<div id='contenido'><div style='float:left; width:80%; font-size:13px; font-weight:bold; color:#000; background-color:#FFFFFF'>"+data.label+"</div> <div><button class='close' onclick='deleteFecha("+user+","+data.value+");'>&times;</button></div></div>");
                  });
              }
            });
        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
    return array;
}

function sortFechas(a,b) {
  //ordenamiento de fechas
    return a - b;
}


/*
Codigo Mike Ventanilla
*/
var requestInfoAdicional=function (action,user,folio,fecha,observacion,consecutivo, estatus_anterior)
    {
      var msg=" ";
        var r= {
                success:function(json){
                        var valid=false;
                           if ((json)&&(json.response)){
                                 if (json.response.sucessfull){
                                        valid=true;
                                        
                                        
                                          ActualizacionExitosa();
                                          Regeneracion(user);
                                                
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                                 alert(msg);
                                                  
                                }
                            },
                            beforeSend: function(xhr) {
                                                  
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                         alert(errorDescripcion);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                     };
                    r = $.extend(r, connection);
                    r.data = {action:action, user:user, folio:folio, fecha_cambio_estatus:fecha, observaciones:observacion,consecutivo:consecutivo,status:estatus_anterior};
                    $.ajax(r);
     }


var requestInfoAdicionalDictaminacion=function (action, user,folio,fecha,observacion)
    {
      var msg=" ";
        var r= {
                success:function(json){
                        var valid=false;
                           if ((json)&&(json.response)){
                                 if (json.response.sucessfull){
                                        valid=true;
                                        
                                        
                                          ActualizacionExitosa();
                                          Regeneracion(user);
                                                
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                                 alert(msg);
                                                  
                                }
                            },
                            beforeSend: function(xhr) {
                                                  
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                         alert(errorDescripcion);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                     };
                    r = $.extend(r, connection);
                    r.data = {action:'infoAdicoinalDictaminacion',user:user, folio:folio, fecha_cambio_estatus:fecha, observaciones:observacion};
                    $.ajax(r);
     }

var requestInsert=function (action,user,folio,fecha,observacion, fecha_recepcion_oficio)
    {
      var msg=" ";
        var r= {
                success:function(json){
                        var valid=false;
                           if ((json)&&(json.response)){
                                 if (json.response.sucessfull){
                                        valid=true;
                                        
                                        
                                          ActualizacionExitosa();
                                          Regeneracion(user);
                                                
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                                 alert(msg);
                                                  
                                }
                            },
                            beforeSend: function(xhr) {
                                                  
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                         alert(errorDescripcion);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                     };
                    r = $.extend(r, connection);
                    r.data = {action:action, user:user, folio:folio, fecha_cambio_estatus:fecha, observaciones:observacion, fecha_oficio: fecha_recepcion_oficio};
                    $.ajax(r);
     }



var requestUpdate=function (action,user,folio,fecha,observacion,respuesta,fecha_recepcion_codigo,consecutivo, fecha_oficio)
    {
      var msg=" ";
        var r= {
                success:function(json){
                        var valid=false;
                           if ((json)&&(json.response)){
                                 if (json.response.sucessfull){
                                        valid=true;
                                        
                                        
                                          ActualizacionExitosa();
                                          Regeneracion(user);
                                                
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                                 alert(msg);
                                                  
                                }
                            },
                            beforeSend: function(xhr) {
                                                  
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                         alert(errorDescripcion);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                     };
                    r = $.extend(r, connection);
                    r.data = {action:action, user:user, folio:folio, fecha_cambio_estatus:fecha, observaciones:observacion,respuesta:respuesta,fecha_recepcion:fecha_recepcion_codigo,consecutivo:consecutivo, fecha_oficio: fecha_oficio};
                    $.ajax(r);
     }


/* FIN 
Codigo Mike Ventanilla
*/

function ActualizarRechazo(action, user, folio, observaciones, consecutivo, nuevoEstatus, fecha_cambio_estatus, vuelta, estatus_anterior){
  var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio+ '&observaciones=' + observaciones + '&consecutivo=' + consecutivo;
  $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            //alert(JSON.stringify(data));
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                $.each(data, function(index, data){
                  if (data == true) {
                    if (nuevoEstatus == 1) {
                      InsertaDictaminacion("insertDictaminacion", user, folio, fecha_cambio_estatus, "", "", "", observaciones, nuevoEstatus, vuelta, estatus_anterior);
                    }else{
                      ActualizacionExitosa();
                      Regeneracion(user);
                    }
                  } else {
                    Error();
                  }
                });
            });

        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function ActualizarEstatus(action, user, nuevoEstatus, folio){
  var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio+ '&estatus=' + nuevoEstatus;
  $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                $.each(data, function(index, data){
                  if (data == true) {
                      ActualizacionExitosa();
                      Regeneracion(user);
                  } else {
                    Error();
                  }
                });
            });

        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function InsertarRechazo(action, user, folio, fecha_cambio_estatus, observaciones, nuevoEstatus){
  var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio+ '&fecha_cambio_estatus=' + fecha_cambio_estatus + '&observaciones=' + observaciones;
  $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                $.each(data, function(index, data){
                  if (data == true) {
                      ActualizarEstatus("updateEstatus", user, nuevoEstatus, folio);
                  } else {
                    Error();
                  }
                });
            });

        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function ActulizarDictaminacion(action, user, folio, dictamenJuridicoEnvio, dictamenTecnicoEnvio, dictamenAmbientalEnvio, dictamenTecnicoRecibido, dictamenJuridicoRecibido, dictamenAmbientalRecibido, observaciones, consecutivo, respuesta, nuevoEstatus, fecha_cambio_estatus){
  var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio+ '&dje=' + dictamenJuridicoEnvio + '&dte=' + dictamenTecnicoEnvio + '&dae=' + dictamenAmbientalEnvio + '&djr=' + dictamenJuridicoRecibido + '&dtr=' + dictamenTecnicoRecibido + '&dar=' + dictamenAmbientalRecibido + '&observaciones=' + observaciones + '&consecutivo=' + consecutivo + '&respuesta=' + respuesta;
  $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                $.each(data, function(index, data){
                  if (data == true) {
                    if (nuevoEstatus == 2) {
                      InsertarRechazo("insertRechazo", user, folio, fecha_cambio_estatus, observaciones, nuevoEstatus);
                    }else{
                      ActualizacionExitosa();
                      Regeneracion(user);
                    }
                  } else {
                    Error();
                  }
                });
            });

        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function InsertaDictaminacion(action, user, folio, fecha_cambio_estatus, dictamenJuridicoEnvio, dictamenTecnicoEnvio, dictamenAmbientalEnvio, observaciones, nuevoEstatus, vuelta, estatus_anterior){
  var dataf = 'action=' + action + '&user=' + user + '&fecha_cambio_estatus=' + fecha_cambio_estatus + '&folio=' + folio+ '&dje=' + dictamenJuridicoEnvio + '&dte=' + dictamenTecnicoEnvio + '&dae=' + dictamenAmbientalEnvio + '&djr=' + "" + '&dtr=' + "" + '&dar=' + "" + '&observaciones=' + observaciones + '&respuesta=' + "" + '&estatus_anterior=' + estatus_anterior;
  $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                $.each(data, function(index, data){
                  if (data == true) {
                    ActulizaVuelta('updateVuelta', user, folio, nuevoEstatus, vuelta)
                  } else {
                    Error();
                  }
                });
            });

        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function ActulizaVuelta(action, user, folio, nuevoEstatus, vuelta){
  var dataf = 'action=' + action + '&user=' + user + '&estatus=' + nuevoEstatus + '&folio=' + folio+ '&vuelta=' + vuelta;
    $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
            $.each(data, function(index, data){
                //alert(JSON.stringify(data));
                $.each(data, function(index, data){
                  if (data == true) {
                    ActualizacionExitosa();
                    Regeneracion(user);
                  } else {
                    Error();
                  }
                });
            });

        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
}

function SelectVuelta(action, user, folio){
    var vuelta = 0;
    var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio;
    $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        async: false,
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
          vuelta = data.data;
        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
    return vuelta;
}

function UltimaFecha(action, user, folio){
    var ultimaFecha = '';
    var dataf = 'action=' + action + '&user=' + user + '&folio=' + folio;
    $.ajax({
        url: "http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos",
        async: false,
        type: "post",
        data: dataf,
        dataType: "JSON",
        success: function (data) {
          ultimaFecha = data.data;
        },
        error: function (requeset, status, error) {
            ErrorServidor();
        }
    });
    return ultimaFecha;
}

function Aceptar(estatus_anterior, user, vuelta, consecutivo){
  //alert(consecutivo);
  var folio = $("#sub_add_folio").val();

  //Update
  var nuevoEstatus = $("#tb_add_estatus").val();

  //Insert
  var observaciones = $("#sub_add_observacion").val();
  var fecha_cambio_estatus = $("#datepicker").val();
  var fecha_recepcion_codigo = $("#date_fecha_recepcion_codigo").val();
  var fecha_codigo_oficio = $("#date_fecha_recepcion_oficio").val();
  
  var dictamenJuridicoEnvio = "";
  var dictamenJuridicoRecibido = "";
  var dictamenTecnicoEnvio = "";
  var dictamenTecnicoRecibido = "";
  var dictamenAmbientalEnvio = "";
  var dictamenAmbientalRecibido = "";

  var respuesta = "";

  if (estatus_anterior == -1) {
    if (nuevoEstatus == 1) {
      dictamenJuridicoEnvio = $("#dateJuridicoEnvio").val();
      dictamenTecnicoEnvio = $("#dateTecnicoEnvio").val();
      dictamenAmbientalEnvio = $("#dateAmbientalEnvio").val();
    }
  }

  if (estatus_anterior == 1) {
    if (nuevoEstatus == 1 || nuevoEstatus == 2 || nuevoEstatus ==3 || nuevoEstatus == 4) {
      dictamenJuridicoEnvio = $("#dateJuridicoEnvio").val();
      dictamenJuridicoRecibido = $("#dateJuridicoRecibido").val();
      dictamenTecnicoEnvio = $("#dateTecnicoEnvio").val();
      dictamenTecnicoRecibido = $("#dateTecnicoRecibido").val();
      dictamenAmbientalEnvio = $("#dateAmbientalEnvio").val();
      dictamenAmbientalRecibido = $("#dateAmbientalRecibido").val();
    }
  }

  var respuesta = $("#tb_add_respuesta").val();

  //Inserta en Dictaminacion, Actualiza Estatus y Actualiza Vuelta
  if (estatus_anterior == -1 && nuevoEstatus == 1) {
    var vuelta = SelectVuelta("vuelta", user, folio);
    InsertaDictaminacion("insertDictaminacion", user, folio, fecha_cambio_estatus, dictamenJuridicoEnvio, dictamenTecnicoEnvio, dictamenAmbientalEnvio, observaciones, nuevoEstatus, (vuelta+1), estatus_anterior);
  }

  //Actualizar Dictaminacion
  if (estatus_anterior == 1 && nuevoEstatus == 1) {
    ActulizarDictaminacion("updateDictaminacion", user, folio, dictamenTecnicoEnvio, dictamenJuridicoEnvio, dictamenAmbientalEnvio, dictamenTecnicoRecibido, dictamenJuridicoRecibido, dictamenAmbientalRecibido, observaciones, consecutivo, respuesta, 0, fecha_cambio_estatus);
  }

  //Actualizar Dictaminacion e Insertar a Rechazo
  if (estatus_anterior == 1 && nuevoEstatus == 2) {
    if(vuelta > 2){
      if(confirm("Este registro, supero el numero de intentos, desea cambiar el estatus?")){
          ActulizarDictaminacion("updateDictaminacion", user, folio, dictamenTecnicoEnvio, dictamenJuridicoEnvio, dictamenAmbientalEnvio, dictamenTecnicoRecibido, dictamenJuridicoRecibido, dictamenAmbientalRecibido, observaciones, consecutivo, respuesta, nuevoEstatus,fecha_cambio_estatus);
        }
    }else{
        ActulizarDictaminacion("updateDictaminacion", user, folio, dictamenTecnicoEnvio, dictamenJuridicoEnvio, dictamenAmbientalEnvio, dictamenTecnicoRecibido, dictamenJuridicoRecibido, dictamenAmbientalRecibido, observaciones, consecutivo, respuesta, nuevoEstatus,fecha_cambio_estatus);
    }
  }
  
  //Actualizar Rechazo
  if (estatus_anterior == 2 && nuevoEstatus == 2) {
    ActualizarRechazo("updateRechazo", user, folio, observaciones, consecutivo,0, fecha_cambio_estatus, 0, estatus_anterior); 
  }

  //Actualiza Rechazo e Inserta en Dictaminacion
  if (estatus_anterior == 2 && nuevoEstatus == 1) {
    ActualizarRechazo("updateRechazo", user, folio, observaciones, consecutivo, nuevoEstatus, fecha_cambio_estatus, (vuelta+1), estatus_anterior);
  }

  if(estatus_anterior==1 && nuevoEstatus==3)
    {
       ActulizarDictaminacion("updateDictaminacion", user, folio, dictamenTecnicoEnvio, dictamenJuridicoEnvio, dictamenAmbientalEnvio, dictamenTecnicoRecibido, dictamenJuridicoRecibido, dictamenAmbientalRecibido, observaciones, consecutivo, respuesta, 0, fecha_cambio_estatus);  
    requestInfoAdicional('InsertInfoAdicional',user,folio,fecha_cambio_estatus,observaciones,0,estatus_anterior);
    }
 else
   if(estatus_anterior!=3 && nuevoEstatus==3)
    {
    requestInfoAdicional('InsertInfoAdicional',user,folio,fecha_cambio_estatus,observaciones,0,estatus_anterior);
    }
   else
     if(estatus_anterior==3 && nuevoEstatus==3)
        requestInfoAdicional('UpdateInfoAdicional',user,folio,fecha_cambio_estatus,observaciones,consectivo,' ');
      else
        if(estatus_anterior==3 && nuevoEstatus==1)
           {
          requestInfoAdicionalDictaminacion('infoAdicoinalDictaminacion',user,folio,fecha_cambio_estatus,observaciones);    
           }

if(estatus_anterior==1  && nuevoEstatus==4)  
    {
    ActulizarDictaminacion("updateDictaminacion", user, folio, dictamenTecnicoEnvio, dictamenJuridicoEnvio, dictamenAmbientalEnvio, dictamenTecnicoRecibido, dictamenJuridicoRecibido, dictamenAmbientalRecibido, observaciones, consecutivo, respuesta, 0, fecha_cambio_estatus);  
    requestInsert('InsertcomiteFomento',user,folio,fecha_cambio_estatus,observaciones,'');
    }
 else{
   if(estatus_anterior==4 && nuevoEstatus==4)         
      {
      requestUpdate('UpdatecomiteFomento',user,folio,fecha_cambio_estatus,observaciones,respuesta,'',consecutivo, '');   
      }
    else
    if(estatus_anterior!=4 && nuevoEstatus==4)         
      {
      requestUpdate('InsertcomiteFomento',user,folio,fecha_cambio_estatus,observaciones,respuesta,consecutivo,'');   
      }  
 }


if(estatus_anterior==4 && nuevoEstatus==5)
  {
requestUpdate('UpdatecomiteFomento',user,folio,fecha_cambio_estatus,observaciones,respuesta,'',consecutivo, '');   
   }

if(estatus_anterior!=5 && nuevoEstatus==5)  
    {
    requestInsert('InsertCodigo',user,folio,fecha_cambio_estatus,observaciones, '');
    }
 else
   if(estatus_anterior==5 && nuevoEstatus==5)         
      {
       requestUpdate('UpdateCodigo',user,folio,fecha_cambio_estatus,observaciones,respuesta,fecha_recepcion_codigo,consecutivo, fecha_codigo_oficio);   
      }




if(estatus_anterior!=6 && nuevoEstatus==6)  
    {
     requestInsert('InsertAutorizadas',user,folio,fecha_cambio_estatus,observaciones, '');
    }

if(estatus_anterior!=7 && nuevoEstatus==7)  
    {
     requestInsert('InsertNegacion',user,folio,fecha_cambio_estatus,observaciones, '');
    }
 else
   if(estatus_anterior==7 && nuevoEstatus==7)         
      {
      requestUpdate('UpdateNegacion',user,folio,fecha_cambio_estatus,observaciones,' ',' ',consecutivo, '');   
      }

if(estatus_anterior!=8 && nuevoEstatus==8)  
    {
     requestInsert('InsertVencidas',user,folio,fecha_cambio_estatus,observaciones, '');
    }
 else
   if(estatus_anterior==8 && nuevoEstatus==8)         
      {
      requestUpdate('UpdateVencidas',user,folio,fecha_cambio_estatus,observaciones,' ',' ',consecutivo, '');   
      }

if(estatus_anterior!=9 && nuevoEstatus==9)  
    {
     requestInsert('InsertMIA',user,folio,fecha_cambio_estatus,observaciones, '');
    }
 else
   if(estatus_anterior==9 && nuevoEstatus==9)         
      {
      requestUpdate('UpdateMIA',user,folio,fecha_cambio_estatus,observaciones,' ',fecha_recepcion_codigo,consecutivo, '');   
      }
}

var connection={
        //url:'http://187.188.96.133:8082/ServiceBosque/Reporteador',
        url: 'http://187.188.96.133:8082/ServiceBosque/VentanillaProcesos',
        type:'post',
        dataType:'json'
};

function Regeneracion(user){
  $(".app_ventanilla").show();
  $("#principal").remove();            
  $(".app_ventanilla").append("<div id=\"principal\" class=\"background_tabular background_tabularventanilla\"></div>");
  var midiv = document.createElement("div");
    midiv.setAttribute("id","row1");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>INICIO DE PROCESO:</div>"+
        "<div id='contenedor1' class='contenedor1'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>SOLICITUDES EN DICTAMINACIÓN:</div>"+
        "<div id='contenedor2' class='contenedor2'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>SOLICITUDES EN RECHAZO:</div>"+
        "<div id='contenedor3' class='contenedor5'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>INFORMACIÓN ADICIONAL:</div>"+
        "<div id='contenedor4' class='contenedor2'></div>"+
      "</div>";
  
  $("#principal").append(midiv);
    midiv = document.createElement("div");
    midiv.setAttribute("id","row2");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>COMITÉ DE FOMENTO:</div>"+
        "<div id='contenedor5' class='contenedor1'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>CÓDIGO DE IDENTIFICACIÓN:</div>"+
        "<div id='contenedor6' class='contenedor2'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>NEGACIÓN:</div>"+
        "<div id='contenedor7' class='contenedor3'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>ESTATUS DE MIA(Espera resolutivo de MIA)</div>"+
        "<div id='contenedor10' class='contenedor2'></div>"+
      "</div>";
  
  $("#principal").append(midiv);
    midiv = document.createElement("div");
    midiv.setAttribute("id","row2");
    midiv.setAttribute("class","row");
    midiv.innerHTML = ""+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>VENCIDAS:</div>"+
        "<div id='contenedor8' class='contenedor3'></div>"+
      "</div>"+
      "<div class='col s12 m6 l3 titulosVentanilla ButtonSection' align='center'>"+
        "<div class='label' align='center'>AUTORIZACIÓN:</div>"+
        "<div id='contenedor9' class='contenedor4'></div>"+
      "</div>";
  $("#principal").append(midiv);

  var today = new Date(); 

  //Llena el contenedor "Inicio de Proceso"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
    { action:'get', folio:0, user:user, tipo:1 },
    function(data){
      var mires1 =$('#contenedor1');
      $.each(data, function(index,data){
        var fondo="blanco";                                                                                   
        var aFecha2 = data.Fecha_Registro.split('/'); 
        var a = DaysBetweenDates(new Date(aFecha2[2],aFecha2[1]-1,aFecha2[0]),today,user);
        if(a>1){ fondo="rojo"; } 
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"','', '', 1, 0, '', '', '', '', '', '');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Dictaminacion"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
    { action:'get', folio:0, user:user, tipo:2 },
    function(data){
      //alert(JSON.stringify(data));
      var mires1 =$('#contenedor2');
      $.each(data, function(index,data){
        var fondo="blanco";                                                                                   
        var aFecha2 = data.Fecha_Registro.split('/'); 
        var a = DaysBetweenDates(new Date(aFecha2[2],aFecha2[1]-1,aFecha2[0]),today,user);
        if(a>8 && data.numvuelta == 1){ fondo="rojo"; }
        if(a>5 && data.numvuelta == 2){ fondo="rojo"; }
        if(a>1 && data.numvuelta == 3){ fondo="rojo"; } 
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"', 2, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '"+data.fecha_recibido_juridico+"', '"+data.fecha_envio_tecnico+"', '"+data.fecha_recibido_tecnico+"', '"+data.fecha_envio_ambiental+"', '"+data.fecha_recibido_ambiental+"', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Rechazo"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:user, tipo:3 },
    function(data){
      //alert(JSON.stringify(data));
      var mires1 =$('#contenedor3');
      $.each(data, function(index,data){
        var fondo="naranja";                                                                                   
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"', 3, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Informacion Adicional"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
    { action:'get', folio:0, user:user, tipo:4 },
      function(data){
        //alert(JSON.stringify(data));
        var mires1 =$('#contenedor4');
        $.each(data, function(index,data){
          var fondo="blanco";                                                                                   
          //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
          mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"', 4, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
        });
  });

  //Llena el contenedor "Comite de Fomento"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:user, tipo:5 },
    function(data){
      //alert(JSON.stringify(data));
      var mires1 =$('#contenedor5');
      $.each(data, function(index,data){
        var fondo="blanco";                                                                                   
        //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
        mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"', 5, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
      });
  });

  //Llena el contenedor "Codigo de Identificacion"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:user, tipo:6 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor6');
    $.each(data, function(index,data){
      var fondo="blanco";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"', 6, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Negacion"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:user, tipo:7 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor7');
    $.each(data, function(index,data){
      var fondo="rojo";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"', 7, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Mia"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:user, tipo:10 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor10');
    $.each(data, function(index,data){
      var fondo="blanco";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"',11, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Vencidas"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:user, tipo:8 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor8');
    $.each(data, function(index,data){
      var fondo="rojo";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.observacion+"', '"+data.respuesta+"', 8, '"+data.numvuelta+"', '', '', '', '', '', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
    });
  });

  //Llena el contenedor "Autorizadas"
  $.get("http://187.188.96.133:8082/ServiceBosque/Ventanilla", 
  { action:'get', folio:0, user:user, tipo:9 },
  function(data){
    //alert(JSON.stringify(data));
    var mires1 =$('#contenedor9');
    $.each(data, function(index,data){
      var fondo="blanco";                                                                                   
      //folio,user,observacio,respuesta, tipo, veces, fej, frj, fet, frt, fea, fra        
      mires1.append("<div onClick=\"mostrar('"+data.folio+"', '"+user+"', '"+data.Fecha_Registro+"', '"+data.observacion+"', 9, '"+data.numvuelta+"', '"+data.fecha_envio_juridico+"', '"+data.fecha_recibido_juridico+"', '"+data.fecha_envio_tecnico+"', '"+data.fecha_recibido_tecnico+"', '"+data.fecha_recibido_tecnico+"', '', '"+data.consecutivo+"');\" class='"+fondo+"'>&nbsp; "+data.folio+"&nbsp; — "+data.predio+"</div>");          
});
});
}