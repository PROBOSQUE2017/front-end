define(["validator", "connections", "restrictions", "structure", "Alert", "dataSelect"], function(validator, connections, restrictions, structure, Alert, dataSelect) {
    $.widget("custom.customTabular", {
        options: {
            data: [],
            addExecutive: false,
            action: '',
            fields: {},
            operations: [],
            request: [],
            buttonSection: true,
            activity: null

        },
        FieldsCalculated: {},
        Folio: '',
        multiselect: {},
        clockFolio: null,
        clockRequest: null,
        forms: {},
        dialog: null,
        attachment: {},
        _init: function() {

        },
        getTitle: function(opc) {
            var title = '';
            switch (opc) {
                case 'new':
                    title = 'Nuevo usuario';
                    break;
                case 'delete':
                    title = 'Eliminar usuario';
                    break;
                case 'edit':
                    title = 'Editar usuario';
                    break;
                case 'consult':
                    title = 'Consulta de usuario';
                    break;

            }
            return title;
        },
        clearClockFolio: function() {
            var obj = this;
            if (obj.clockFolio) {
                clearTimeout(obj.clockFolio);
            }
        },
        getFolio: function() {
            var obj = this;
            obj.clearClockFolio();
            var folio = $("#tb_add_folio").val() + '';
            if (folio.length > 0) {
                var paramsRemove = { action: 'deleteTemporal', user: obj.options.userActive.id, folio: folio };
                obj.request(paramsRemove);
            }
            obj.clockFolio = setTimeout(function() {
                var anio = $(obj.mainClass + " #tb_add_anio option:selected").val();
                var region = $(obj.mainClass + " #tb_add_region option:selected").val();
                if ((anio !== '-1') && (region != -1)) {
                    var params = { anio: anio, region: region };
                    obj.requestFolio(params);
                    // Se lanza una peticion AJAX para traer el numero de incendio , funciona para el programa de incendios 
                    //Mike Martínez 16/06/2016
                    //Solo ejecutar para el programa de incendios
                    if(obj.options.userActive.program == 7){
                      obj.requestNumIncendio(params);
                    }
                    //fin codigo Mike 
                }else if(anio == '-1' || region == -1){
                    $("#tb_add_folio").val('');
                }

                /*
                 * @Description
                 * Issue para filtrar municipios en base a la region
                 */
                 if( region != -1 ){
                    let json = { region : region};
                    obj.requestLugares($('#tb_add_modulopredio_municipio'),json,connections.tabular.getMunicipios);
                 }else {
                    let option = '<option value="-1" selected="selected">Seleccione una opción</option>';
                    $('#tb_add_modulopredio_municipio').html(option);
                 }
                 /*
                  * Fin issue
                  */

            }, 100);
        },
        update: function(data) {
            this.buildStructure();
            this.events();
        },
        getSelect: function(i) {
            
            var user = this.options.userActive;
            var chain = '<select class="selectInput" id="' + i.id + '" datatype="' + i.datatype + '" field="' + i.field + '" >';
            var selected = '';
            let b = false;
             /**
              * Seleccionado en el combo
              * @const {string} valor
              * Recupera el valor seleccionado en el combo
              */
              const  valor  = i.value
            /*
             * Fin issue
             */

             if(valor == -1 || valor == null || typeof valor === "undefined" || valor == '' ){
                selected = 'selected="selected"';
                b = false;
             }else {
                selected = '';
                b = true;
             }

            

            chain += '<option value="-1" '+selected+' >Seleccione una opci&oacute;n</option>';
            selected = '';
            for (var x in i.list.list) {
                var e = i.list.list[x];

                if(b){
                    selected = (e.value == valor)? 'selected="selected"' : '';
                }

                chain += '<option value="' + e.value + '" ' + selected +' >' + e.label + '</option>';
            }
            chain += '</select>';
            return chain;
        },
        getValueSelect: function(list, value) {
            var response = '';
            for (var x in list) {
                if (list[x].value == value) {
                    response = list[x].label;
                    break;
                }
            }

            return response;
        },
        getValueFromField: function(id) {
            var obj = this;
            var data = obj.multiselect[id];
            var valores = [];
            for (var x in data.list.list) {
                var i = data.list.list[x];
                if (i.selected) {
                    valores.push(i.value);
                }
            }
            return valores.join(',');
        },
        getInput: function(i) {
            var obj = this;
            obj.options.fields[i.field] = i;
            var r = restrictions.roles;
            var action = this.options.action;
            i.id = 'tb_add_' + i.field;
            var readOnly = '';
            /*
             * @Description
             * Issue para mostrar las superficies con 3 decimales en la ficha Principal 
             * del programa 1
             *
             */


            if (obj.options.userActive.program == 1 && (action == 'consult' || action == 'edit')) {
                switch (i.field) {
                    case 'superficie_total':
                    case 'superficie_anp_federal':
                    case 'superficie_anp_federal':
                    case 'superficie_conservacion':
                    case 'franja_protectora':
                    case 'superficie_pendientes':
                    case 'superficie_msnm':
                    case 'superficie_bosque_mesofilo':
                    case 'superficie_produccion':
                    case 'superficie_restauracion':
                    case 'superficie_otros_usos':
                    case 'superficie_arbolada':

                        let valor = i.value;

                        if (valor != '' && !isNaN(valor)) {
                            i.value = valor.toFixed(3);
                        }

                        break;
                }
            }

            /* 
             * Fin issue
             */

            switch (action) {
                case 'consult':
                case 'delete':
                    readOnly = ' readonly ';
                    break;
            }
            if (!i.editable) {
                readOnly = ' readonly ';

            }
            var id = ' id="' + i.id + '"';

            var type = ' type="' + i.type + '"';

            var datatype = ' datatype="' + i.datatype + '"';
            var field = ' field="' + i.field + '"';
            switch (i.type) {
                case 'multiselect':
                    var clase = ' class="multiselect truncate"';
                    break;
                case 'form':
                    var clase = ' class="formInput"';
                    break;
                case 'edit':
                    var clase = ' class="textInput"';
                    break;
                case 'attach':
                    var clase = ' class="textInput attach"';
                    break;
                case 'comment':
                    var clase = ' class="textInput comment truncate"';
                    break;
            }
            if ((i.type == 'select') && (i.list.list.length == 0) && (!i.onlyselect)) {
                clase = ' class="textInput"';
            }
            if ((i.type == 'select') && (readOnly != '')) {
                clase = ' class="textInput"';
                i.value = ((i.list.list.length == 0) && (!i.onlyselect)) ? i.value : obj.getValueSelect(i.list.list, i.value);
            }
            var visible = '';
            if (i.id == 'tb_add_ultimafecha' || i.id == 'tb_add_diasinternos' || i.id == 'tb_add_numvuelta') {
                visible = ' style="display:none;"';
            }



            var value = ' value="' + ((typeof i.value === "undefined") ? '' : i.value) + '"';
            var maxLength = (i.maxLength) ? ' maxlength="' + i.maxLength + '"' : '';
            var minLength = (i.minLength) ? ' minlength="' + i.minLength + '"' : '';
            var data = id + field + type + datatype + value + maxLength + minLength + clase + readOnly + visible;

            var input = '';
            if ((i.type == 'select') && (readOnly == '')) {
                if ((i.list.list.length > 0) || (i.onlyselect)) {
                    input = this.getSelect(i);
                } else {
                    input = '<input ' + data + ' />';
                }

            } else {
                switch (i.type) {
                    case 'multiselect':
                        //E.Zamora 07/06/12
                        if ((i.value != "undefined") || (i.value != "")) {
                            var valor = i.value.split(",");
                            var cont = 0;
                            var pusher = [];

                            for (var x in i.list.list) {
                                while (i.list.list[x].value == valor[cont]) {
                                    respon = i.list.list[x].label;
                                    pusher.push(respon);
                                    cont++
                                }
                            }

                        }
                        if (pusher.length <= 0) {
                            pusher = "De clic para seleccionar";
                        }
                        input = '<div ' + data + '>' + pusher + '</div>';
                        obj.multiselect[i.field] = i;
                        //E.Zamora 07/06/12
                        break;
                    case 'form':
                        input = '<div ' + data + '>De clic para agregar' +
                            '<div id="' + i.id + '_records" class="records">' + i.records + ' Registros</div>' +
                            '</div>';

                        obj.forms[i.field] = i;
                        break;
                    case 'select':
                    case 'edit':
                        input = '<input ' + data + ' />';
                        break;
                    case 'attach':
                        input = '<input ' + data + ' />';
                        switch (obj.options.action) {
                            case 'new':
                            case 'edit':
                                var estilo = (i.value == '') ? ' style="display:none" ' : '';
                                input += '<div ' + estilo + '  class="image_delete"><div class="template_custom_tabular_image tcti_close"></div></div>';
                                break;
                            case 'delete':
                            case 'consult':
                                var estilo = (i.value == '') ? ' style="display:none" ' : '';
                                input += '<div ' + estilo + ' class="image_icon"><div class="template_custom_tabular_image tcti_image"></div></div>';
                                break;
                        }
                        break;
                    case 'comment':
                        input = '<input ' + data + ' />';
                        break;
                }
            }
            var chain = '<div class="Field" id="field_' + i.id + '"' + visible + '><div class="label">' + i.label + '</div>' + input + '</div>';
            return chain;
        },
        getButton: function(action) {
            var buttons = [];
            switch (action) {
                case 'new':
                    buttons = [
                        { label: 'Aceptar', action: action },
                        { label: 'Cancelar', action: 'cancel' }
                    ];
                    break;
                case 'delete':
                    buttons = [
                        { label: 'Eliminar', action: action },
                        { label: 'Finalizar', action: 'cancel' }
                    ];
                    break;
                case 'edit':
                    buttons = [
                        { label: 'Aceptar', action: action },
                        { label: 'Cancelar', action: 'cancel' }
                    ];
                    break;
                case 'consult':
                    buttons = [
                        { label: 'Aceptar', action: 'cancel' }
                    ];
                    break;

            }
            var chain = '';
            for (var x in buttons) {
                var b = buttons[x];
                chain += '<button class="textButton" id="' + b.action + '_tabular">' + b.label + '</button>';
            }

            return chain;
        },
        buildStructure: function() {
            var obj = this;
            var o = obj.options;
            obj.multiselect = null;
            obj.multiselect = {};
            obj.forms = null;
            obj.forms = {};
            var mainClass = "background_tabular";
            obj.mainClass = "." + mainClass + obj.options.module;
            /*
                    25/07/2017
                         Ramiro Luna Aragon, Erick Daniel Gonzalez 

                         Objetivo: Ocultar el multiregistro de auditorias Tecnicas preventvas 
                         para el modulo de administracion de predios, en las opciones de Edicion y 
                         alta de registros  
                    */
            if (o.action == 'new' || o.action == 'edit') {
                if (o.data[o.data.length - 1].field == 'formularios.auditoria') {
                    o.data.pop();
                }
            }


            //Fin codigo Ramiro Luna Erick Daniel GOnzalez/

            // Se reemplaza la linea de arriba por esta para el modulo de ventanilla Autor Victor Porcayo 
            var chain = '<div id="principal" class="' + mainClass + ' ' + mainClass + obj.options.module + '">';
            obj.options.fields = null;
            obj.options.fields = {};
            var contador = 0;
            var fila = 1; //Variable para mapear las columnas Victor Porcayo 
            for (var x in o.data) {

                if (contador == 4) {
                    contador = 0;
                    fila++;
                }

                if (contador == 0) { chain += '<div class="row" id="row' + fila + '">'; }


                chain += '<div class="col s12 m6 l3" id="row' + fila + contador + '">' + obj.getInput(o.data[x]) + '</div>'; //Se agrega la fila y contador para identificar los elementos del DOM
                if (o.data[x].field == 'folio') {
                    obj.Folio = o.data[x].value;
                }
                if (obj.options.userActive.program == 8 && o.data[x].field == 'modulopredio_cup') {

                    contador += 1;
                    chain += '<div class="col s12 m6 l3" id="row' + fila + contador + '">';
                    chain += '<div class="Field" id="Field_clave_unica">' +
                        '<div class="label">Clave única de identificación</div>' +
                        '<input id="clave_unica" field="clave_unica" type="edit" datatype="string" value="" class="textInput" readonly="" disabled>' +
                        '</div>' +
                        '</div>';
                }
                /*Codigo de Boton para la Importación de Shapes del programa de madera legal*/
                if ((contador == 3) || ((o.data.length - 1) == x)) {
                    if ((obj.options.userActive.program == 0) && (o.data.length - 1) == x) {
                        chain += '</div>';
                        chain += '<div class="ButtonSection" align="center" >';
                        chain += '<button class="textButton" id="importShape" >Importar Shape</button>' +
                            '</div>';

                    } else
                    if (contador == 3) {
                        chain += '</div>';
                    } else
                    if ((o.data.length - 1) == x) {
                        chain += '</div>';
                    }
                }

                contador += 1;

                //fin codigo madera legal

            }
            if (obj.options.buttonSection) {
                chain += '<div class="ButtonSection" align="center">';
                chain += obj.getButton(o.action);
                chain += '</div>';
            }
            chain += '</div>';

            $(obj.mainClass).remove();

            this.element.append(chain);




            obj.addDialog();
        },
        addDialog: function() {
            var chain = '<div id="dialog-image" title="Create new user">' +
                '<p class="validateTips">All form fields are required.</p>' +
                '<div>informacion</div>' +
                '</div>';
            this.element.append(chain);
        },
        eventScrolling: function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 0) {
                    // apply effects and animations
                }
            });
        },
        remove: function() {
            $(".app_selected").html('');
        },
        showMessage: function(msg, type, event) {
            var obj = this;
            var typeMessage = 'type_' + type;

            var messages = '';
            for (var x in msg) {
                messages += '<div class="item_error">' + msg[x] + '</div>';
            }
            var chain = '<div class="form_message_veil"></div>' +
                '<div class="form_message">' +
                '<div class="header ' + typeMessage + '">' +
                '<div class="close"><div class="template_custom_tabular_close" type="' + type + '"></div></div>' +
                '<div class="label">Mensaje</div>' +
                '</div>' +
                '<div class="container">' +
                messages +
                '</div>' +

                '</div>';
            $(".form_message").remove();
            $("body").append(chain);
            $(".form_message .close").click(function() {
                if (type == "info") {
                    $(".icon_search").click();
                    obj.hide();
                }
                $(".form_message,.form_message_veil").remove();
            })
        },
        fillRequestField: function(data, options) {
            var field = $(obj.mainClass + " #tb_add_" + options.destiny);
            if (options.typeDestiny == 'edit') {
                field.val(data);

            } else {
                field.html('');
                var chain = '';
                chain += '<option value="-1">Seleccione una opci&oacute;n</option>';
                for (var x in data.list) {
                    var i = data.list[x];
                    chain += '<option value="' + i.value + '">' + i.label + '</option>';
                }
                field.append(chain);
            }
        },

        requestTipoInspeccion: function(tipoInspeccion) {
            obj = this;
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                    var valid = false;

                    if ((json) && (json.response)) {

                        if (json.response.sucessfull) {
                            valid = true;
                            var field = $("#tb_add_modulopredio_cup");
                            field.html('');
                            var chain = '';
                            chain += '<option value="-1">Seleccione una opci&oacute;n</option>';
                            for (var x in json.data) {
                                var i = json.data[x];
                                chain += '<option value="' + i.value + '">' + i.label + '</option>';
                            }
                            field.append(chain);




                        } else {
                            msg = json.response.message;
                        }
                    }
                    if (!valid) {

                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [msg],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {

                }
            };
            r = $.extend(r, connections.tabular.get);
            r.data = { action: 'getTipoInspeccion', user: obj.options.userActive.id, tipoInspeccion: tipoInspeccion, region: $("#tb_add_region").val(), municipio: $("#tb_add_modulopredio_municipio").val(), localidad: $("#tb_add_modulopredio_localidad").val() };
            $.ajax(r);
        },
        ListaIndustrias: function(lista) {
            return lista;
        },

        requestTipoInspeccion2: function(tipoInspeccion, region, municipio, localidad, folio, action) {
            obj = this;
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                    var valid = false;

                    if ((json) && (json.response)) {

                        if (json.response.sucessfull) {
                            valid = true;
                            if (action == 'edit') {
                                var field = $("#tb_add_modulopredio_cup");
                                field.html('');
                                var chain = '';
                                chain += '<option value="-1">Seleccione una opci&oacute;n</option>';
                                for (var x in json.data) {
                                    var i = json.data[x];
                                    chain += '<option value="' + i.value.trim() + '">' + i.label + '</option>';
                                }
                                field.append(chain);

                                $("select#tb_add_modulopredio_cup").val(json.cadena.trim()).attr("selected", "selected");
                                $("#clave_unica").val(json.cadena);
                            }
                            if (action == 'consult') {
                                var field = $("#tb_add_modulopredio_cup");
                                field.html('');
                                var chain = '';
                                for (var x in json.data) {
                                    var i = json.data[x];
                                    if (i.value.trim() == json.cadena.trim()) {
                                        $("#tb_add_modulopredio_cup").val(i.label);
                                    }
                                }



                                $("#clave_unica").val(json.cadena);
                            }



                        } else {
                            msg = json.response.message;
                        }
                    }
                    if (!valid) {

                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [msg],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {

                }
            };
            r = $.extend(r, connections.tabular.get);
            r.data = { action: 'getListaIValor', user: obj.options.userActive.id, tipoInspeccion: 'getIndustrias', region: region, municipio: municipio, localidad: localidad, folio: folio };
            $.ajax(r);
        },



        requestField: function(params, options) {
            obj = this;
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                    var valid = false;

                    if ((json) && (json.response)) {

                        if (json.response.sucessfull) {
                            valid = true;
                            obj.fillRequestField(json.data, options);
                        } else {
                            msg = json.response.message;
                        }
                    }
                    if (!valid) {

                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [msg],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {

                }
            };
            r = $.extend(r, connections.requestField.data);
            r.url += options.service + '?';
            r.data = params;
            $.ajax(r);
        },
        requestFolio: function(params) {
            obj = this;
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                    var valid = false;

                    if ((json) && (json.response)) {

                        if (json.response.sucessfull) {
                            valid = true;
                            $(obj.mainClass + " #tb_add_folio").val(json.data);
                            obj.Folio = json.data;

                        } else {
                            msg = json.response.message;
                        }
                    }
                    if (!valid) {

                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [msg],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {

                }
            };
            r = $.extend(r, connections.tabular.getFolio);
            r.data = { action: 'get', user: obj.options.userActive.id, anio: params.anio, id_region: params.region };
            $.ajax(r);
        },

        /*
        * Peticion http para consultar
        * @function requestMunicipio
        * @param { Object DOM } combo - Combo que será llenado con la respuesta del servidor 
        * @param { JSON } data - JSON que será enviado
        * @param { String } url - Direccion del service 
        */
        requestLugares: function( combo , data , url){
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                    var valid = false;

                    if ((json) && (json.response)) {

                        if (json.response.sucessfull) {
                            valid = true;
                            let options = '<option value="-1" selected="selected">Seleccione una opción</option>';
                            json.data.list.map(function(element){
                                options += '<option value=":value:">:descriptivo:</option>'
                                                .replace(':value:', element.value)
                                                .replace(':descriptivo:', element.label);
                            });
                            
                            combo.html(options);

                        } else {
                            msg = json.response.message;
                        }
                    }
                    if (!valid) {

                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [msg],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {

                }
            };
            r = $.extend(r, url);
            r.data = data;
            $.ajax(r);
        },

        /*
         * Fin issue 
         */

        /*
          Objeto que lanza una peticion ajax para la construccion del numero consecutivo de incendio 
          funciona para el programa de incendios, validado, no causa conficlto con ninguno de los otros 
          programas 
          Mike MArtinez 
          16/06/2016        
        */
        requestNumIncendio: function(params) {
            obj = this;
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                    var valid = false;

                    if ((json) && (json.response)) {

                        if (json.response.sucessfull) {
                            valid = true;
                            $(obj.mainClass + " #tb_add_numIncendio").val(json.data);


                        } else {
                            msg = json.response.message;
                        }
                    }
                    if (!valid) {

                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [msg],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {

                }
            };
            r = $.extend(r, connections.tabular.getNumIncendio);
            r.data = { action: 'get', user: obj.options.userActive.id, anio: params.anio, id_region: params.region };
            $.ajax(r);
        },
        //fin codigo Mike 16/06/2016

        /*
         * @Description
         * Peticion http para actualizar el numero de conglomerado en los multi regitros
         */
         requestUpdateConglomerado: function(params) {
            obj = this;
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                      console.log(json)
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {

                }
            };
            r = $.extend(r, connections.multirecords.updateConglomerado);
            r.data = params;
            $.ajax(r);
        },
        /*
         * Fin
         */
        request: function(params) {

            obj = this;
            var action = (params.action == 'deleteTemporal') ? params.action : obj.options.action;
            var idDiv = obj.element.attr('id');
            params = (params) ? params : {};
            var clase = 'hidden';
            var msg = 'Servicio no disponible intente m&aacute;s tarde';
            var r = {
                success: function(json, estatus) {
                    var valid = false;

                    if ((json) && (json.response)) {

                        if (json.response.sucessfull) {
                            valid = true;
                            switch (obj.options.action) {
                                case 'delete':


                                    Alert.show({
                                        title: 'Notificaci&oacute;n',
                                        type: 'notification',
                                        messages: ['Registro eliminado satisfactoriamente'],
                                        buttons: [{ label: 'Cerrar', event: function() { $(".custom_menu").hide();
                                                $(".app_" + obj.options.module).search('reset');
                                                obj.hide(); } }]
                                    });

                                    //mostrar ventana y cerrar formulario

                                    break;
                                case 'new':

                                    if (params.action != 'deleteTemporal') {
                                        Alert.show({
                                            title: 'Notificaci&oacute;n',
                                            type: 'notification',
                                            messages: ['El registro se ha agregado satisfactoriamente'],
                                            buttons: [{
                                                label: 'Cerrar',
                                                event: function() {
                                                    $(".custom_menu").hide();
                                                    try {
                                                        $(".app_" + obj.options.module).search('reset');
                                                    } catch (e) {}
                                                    obj.hide();
                                                    $('.sectionItem_selected').removeClass('sectionItem_selected')
                                                }
                                            }]
                                        });
                                    }
                                    //mostrar ventana y cerrar formulario

                                    break;

                                case 'edit':

                                    Alert.show({
                                        title: 'Notificaci&oacute;n',
                                        type: 'notification',
                                        messages: ['El registro ha sido editado satisfactoriamente'],
                                        buttons: [{ label: 'Cerrar', event: function() { $(".custom_menu").hide();
                                                $(".app_" + obj.options.module).search('reset');
                                                obj.hide(); } }]
                                    });

                                    //mostrar ventana y cerrar formulario
                                    break;

                            }
                        } else {
                            msg = json.response.message;
                        }
                    }
                    if (!valid) {

                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [msg],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                },
                beforeSend: function(xhr) {

                },
                error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {

                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: [msg],
                        buttons: [{ label: 'Cerrar' }]
                    });
                },
                complete: function(solicitudAJAX, estatus) {



                }
            };
            var source = '';
            if (obj.options.activity != null) {
                params['activity'] = obj.options.activity;
            }
            var activity = (obj.options.activity != null) ? '&activity=' + obj.options.activity : '';
            switch (action) {

                case 'new':
                    source = connections.tabular.add;
                    r = $.extend(r, source);
                    r.data = { action: 'add', user: obj.options.userActive.id, json: JSON.stringify(params) };

                    break;
                case 'edit':
                    source = connections.tabular.edit;
                    r = $.extend(r, source);
                    r.data = { action: 'set', user: obj.options.userActive.id, json: JSON.stringify(params) };

                    break;
                case 'delete':
                    source = connections.tabular.del;
                    r = $.extend(r, source);

                    r.url = r.url + '&user=' + obj.options.userActive.id + '&folio=' + params.folio + activity;
                    break;
                case 'deleteTemporal':
                    source = connections.multirecords.deleteTemporal;
                    r = $.extend(r, source);

                    r.url = r.url + '&action=delete&user=' + params.user + '&folio=' + params.folio + activity;
                    break;
            }


            $.ajax(r);
        },


        updateMultiSelect: function(id, data) {
            var obj = this;
            obj.multiselect[id] = data;
            var valores = [];
            var labels = [];
            for (var x in data.list.list) {
                var i = data.list.list[x];
                if (i.selected) {
                    valores.push(i.value);
                    labels.push(i.label);
                }
            }
            var value = (labels.length == 0) ? 'De clic para seleccionar' : labels.join(', ');
            $("#tb_add_" + id).html(value);
            $("#tb_add_" + id).attr('value', valores.join(','));
        },

        events: function() {
            var obj = this;
            var o = this.options.data;
            for (var x in o.buttons) {
                var event = null;
                if (x == 'cancel') {
                    event = obj.hide;

                } else {
                    event = o.buttons[x].event;
                }
                $("#" + x + "_tabular").click(function() {
                    event();
                });
            }


            obj.eventScrolling();
            $(".back_users").click(function() {
                $(obj.mainClass).remove();
            });
            $(obj.mainClass + " .Field .textInput").each(function() {
                $(this).focus(function() {
                    $(this).removeClass('badInput');
                });
            });
            $(obj.mainClass + " .Field .selectInput").each(function() {
                $(this).change(function() {
                    $(this).removeClass('badInput');
                });
            });
            $(obj.mainClass + " .Field .formInput").each(function() {
                $(this).click(function() {
                    if (($("#tb_add_anio option:selected").val() != '-1') || ($("#tb_add_anio option:selected").val() != '-1')) {
                        $(this).removeClass('badInput');
                        var folio = $("#tb_add_folio").val();
                        var field = $(this).attr('field');
                        var label = $(this).prev().html();
                        var idInput = $(this).attr('id');
                        $('body').multirecords({ data: { label: label, mode: obj.options.action, field: field, userActive: obj.options.userActive, folio: folio, idInput: idInput, parent: obj.element } });
                    } else {
                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: ['Debe seleccionar el a&ntilde;o y la regi&oacute;n para generar un Folio'],
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }
                });
            });
            //Victor Porcayo Altamirano
            if (obj.options.userActive.program == '13') {
                //document.getElementById('row53').style.display = 'none';
                document.getElementById('row60').style.display = 'block';
            }
            //Victor Porcayo Altamirano




            if (obj.options.action == 'new') {
                $(obj.mainClass + " .Field .multiselect").each(function() {
                    $(this).click(function() {
                        $(this).removeClass('badInput');
                        var id = $(this).attr('id').replace('tb_add_', '');
                        var parent = obj.options.source;
                        $(this).multiselect({ data: { id: id, info: obj.multiselect[id], item: this.element, parent: parent, section: 'tabular' } });
                    });
                });
            }
            if (obj.options.action == 'edit') {
                $(obj.mainClass + " .Field .multiselect").each(function() {
                    $(this).click(function() {
                        $(this).removeClass('badInput');
                        var val = $(this).val;
                        var id = $(this).attr('id').replace('tb_add_', '');
                        var parent = obj.options.source;
                        $(this).multiselect({ data: { id: id, info: obj.multiselect[id], item: this.element, parent: parent, section: 'tabular' } });


                        var valor = $("#tb_add_" + id).attr("value");
                        if (valor != "") {
                            if (valor.indexOf(",") != -1) {
                                arr = valor.split(",");

                                for (var x in arr) {
                                    var i = arr[x];
                                    var s = $('input[value="' + i + '"]').attr("value");
                                    var f = $('input[value="' + i + '"]').attr("id");
                                    if (s == i) {
                                        $('input[value="' + i + '"]').attr("checked", "checked");
                                    }
                                }

                            }

                        }
                    });
                });

            }
            //E. Zamora el troll



            $("#cancel_tabular").click(function() {
                var folio = $("#tb_add_folio").val();
                obj.hide();
                if (obj.options.action == 'new') {
                    $(".sectionItem_selected").removeClass('sectionItem_selected');

                    var params = { action: 'deleteTemporal', user: obj.options.userActive.id, folio: folio };
                    obj.request(params);
                } else {
                    $(".app_" + obj.options.module).search('reset');
                }
            });
            $("#new_tabular,#edit_tabular").click(function() {
                var a = obj.validateAddUser();
                if (a.messages.length == 0) {
                    if (obj.options.action == 'edit') {
                        a.params['id'] = obj.options.data.id;
                    }
                    obj.request(a.params);
                    for (var x in obj.attachment) {
                        var i = obj.attachment[x];
                        i.formData = { action: 'set', user: obj.options.userActive.id, folio: obj.Folio };
                        i.submit();
                    }
                } else {

                    //obj.showMessage(a.messages,'error');
                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: a.messages,
                        buttons: [{ label: 'Cerrar' }]
                    });
                }
            });
            $("#delete_tabular").click(function() {
                Alert.show({
                    title: 'Notificaci&oacute;n',
                    type: 'notification',
                    messages: ['&iquest;Realmente desea eliminar este registro?'],
                    buttons: [

                        {
                            label: 'Si',
                            event: function() {
                                obj.request({ action: "delete", folio: obj.Folio, user: obj.options.userActive.id });
                            }
                        },
                        { label: 'No' },
                    ]
                });

            });
            //$("#fm_add_rol").selectmenu();
            $(obj.mainClass + " .selectInput").each(function() {
                var field = $(this).attr('field');

                if ((typeof(obj.options.fields[field]) != 'undefined') && (obj.options.action != 'new')) {
                    var valor = parseInt(obj.options.fields[field].value);
                    if (valor > 0) {
                        $(this).val(obj.options.fields[field].value);
                    }

                }

            });
            if (obj.options.action == 'new') {
                $("#fm_add_rol").change(function() {
                    var value = $("#fm_add_rol option:selected").val();
                    if (value == '2') {
                        $("#field_fm_add_privacy").hide();
                    } else {
                        $("#field_fm_add_privacy").show();
                    }
                });
            }

            $(".background_tabular input[datatype='numeric']").keydown(function(evt) {
                if ($.inArray(evt.keyCode, [46, 8, 9, 27, 13]) !== -1 || (evt.keyCode >= 35 && evt.keyCode <= 40)) {
                    return;
                }
                if ((evt.shiftKey || (evt.keyCode < 48 || evt.keyCode > 57)) && (evt.keyCode < 96 || evt.keyCode > 105)) {
                    evt.preventDefault();
                    var otherresult = 12;
                    if (window.event != undefined) {
                        otherresult = window.event.keyCode;
                    }
                    var charCode = (evt.which) ? evt.which : otherresult;
                    var keyChar = String.fromCharCode(charCode);
                    var keyChar2 = keyChar.toLowerCase();
                    var re = /^(-)?(\d*)$/
                    var result = re.test(keyChar2);
                    return result;
                }
            }).bind("paste", function(event) {
                var item = $(this);
                setTimeout(function() {
                    var value = item.val();
                    var re = /^(-)?(\d*)$/
                    var result = re.test(value);
                    if (!result) {
                        item.val('');
                    }
                }, 100);

            });








            if ((obj.options.action == 'new') || (obj.options.action == 'edit')) {
                $(obj.mainClass + " input[datatype='datetime']").bind("keypress", function(evt) {
                    return false;
                }).bind("paste", function(event) {
                    return false;
                }).appendDtpicker({
                    "autodateOnStart": false,
                    "locale": "es",
                    "dateformat": "DD/MM/YYYY hh:mm"
                });
            }
            //VPA
            if ((obj.options.action == 'new') || (obj.options.action == 'edit')) {
                $('#date').datepicker().datepicker('setDate', 'today');
                $(obj.mainClass + " input[datatype='date']").bind("keypress", function(evt) {
                    return false;
                }).bind("paste", function(event) {
                    return false;
                }).datepicker({
                    yearRange: "-120:+120",
                    changeMonth: true,
                    changeYear: true
                });
            }
            //VPA



            //Agregar el modulo ventanilla para obtener folio Victor Porcayo Altamirano
            if (obj.options.module == 'tabular' || obj.options.module == 'ventanilla') {
                $('#tb_add_anio,#tb_add_region').change(function() {
                    obj.getFolio();
                });
            }
            $(obj.mainClass + " .Field .comment").each(function() {



                $(this).click(function() {
                    $(this).removeClass('badInput');
                    var field = $(this).attr('field');
                    var id = $(this).attr('id');
                    var value = $(this).val();
                    var label = obj.options.fields[field].label;
                    var maxLength = $(this).attr('maxlength');
                    var dataType = $(this).attr('datatype');
                    var params = {
                        field: field,
                        idInput: id,
                        label: label,
                        text: value,
                        mode: obj.options.action,
                        maxlength: maxLength,
                        dataType: dataType
                    }
                    $(this).textArea({ data: params });
                });

            });
            $(obj.mainClass + " input[datatype='alphanumeric']").bind("keypress", function(evt) {
                var otherresult = 12;
                if (window.event != undefined) {
                    otherresult = window.event.keyCode;
                }
                var charCode = (evt.which) ? evt.which : otherresult;
                var keyChar = String.fromCharCode(charCode);
                var keyChar2 = keyChar.toLowerCase();
                var re = /^[a-z0-9 ]+$/i
                var result = re.test(keyChar2);
                return result;
            }).bind("paste", function(event) {
                return false;

            });

            /* get folio*/
            $("#tb_add_anio, #tb_add_region, #tb_add_id_tipo_reforestacion").change(function() {
                if (obj.options.userActive.id == '13') {
                    setTimeout(function() {
                        var folio = $("#tb_add_folio").val();
                        var actual = $("#tb_add_id_tipo_reforestacion option:selected").val();
                        switch (actual) {
                            case '4':
                                actual = "CR";
                            case '3':
                                actual = "RC";
                                break;
                            case '2':
                                actual = "RR";
                                break;
                            case '1':
                                actual = "RS";
                                break;
                            case '-1':
                                actual = "PR";
                                break;
                        }
                        if (folio != '') {
                            var porcion = folio.substring(2);
                            var cambio = document.getElementById('tb_add_folio');
                            cambio.value = actual + porcion;
                        }
                    }, 300);
                }
            });

            //Victor Porcayo Altamirano
            $("#tb_add_proceso").change(function() {
                if (($("#tb_add_anio option:selected").val() != '-1') || ($("#tb_add_anio option:selected").val() != '-1')) {
                    $(this).removeClass('badInput');
                    var folio = $("#tb_add_folio").val();
                    var field = "formularios.proceso";
                    var label = "Observaciones";
                    var idInput = "tb_add_formularios.proceso";
                    $('body').multirecords({
                        data: {
                            label: label,
                            mode: obj.options.action,
                            field: field,
                            userActive: obj.options.userActive,
                            folio: folio,
                            idInput: idInput,
                            parent: obj.element
                        }
                    });
                } else {
                    $("#tb_add_proceso").val('-1');
                    Alert.show({
                        title: 'Notificaci&oacute;n',
                        type: 'error',
                        messages: ['Debe seleccionar el a&ntilde;o y la regi&oacute;n para generar un Folio'],
                        buttons: [{
                            label: 'Cerrar'
                        }]
                    });
                }
            });

            $("#tb_add_responsable_tecnico_ejecucion_vigente").change(function() {
                var myselect = document.getElementById("tb_add_responsable_tecnico_ejecucion_vigente");
                if (myselect.options[myselect.selectedIndex].value == 56) {
                    document.getElementById("tb_add_nombre_responsable_tecnico_ejecucion_vigente").readOnly = false;
                    tb_add_nombre_responsable_tecnico_ejecucion_vigente.style.backgroundColor = "white";
                } else {
                    document.getElementById("tb_add_nombre_responsable_tecnico_ejecucion_vigente").value = "";
                    tb_add_nombre_responsable_tecnico_ejecucion_vigente.style.backgroundColor = "#eff0f1";
                    document.getElementById("tb_add_nombre_responsable_tecnico_ejecucion_vigente").readOnly = true;
                }
            })
            $("#tb_add_responsable_tecnico_ejecucion_original").change(function() {
                var myselect2 = document.getElementById("tb_add_responsable_tecnico_ejecucion_original");
                if (myselect2.options[myselect2.selectedIndex].value == 56) {
                    document.getElementById("tb_add_nombre_responsable_tecnico_ejecucion_original").readOnly = false;
                    tb_add_nombre_responsable_tecnico_ejecucion_original.style.backgroundColor = "white";
                } else {
                    document.getElementById("tb_add_nombre_responsable_tecnico_ejecucion_original").value = "";
                    tb_add_nombre_responsable_tecnico_ejecucion_original.style.backgroundColor = "#eff0f1";
                    document.getElementById("tb_add_nombre_responsable_tecnico_ejecucion_original").readOnly = true;
                }
            })
            /*
            Esta funcion realiza la tarea insertar texto seleccionado apartir de una lista(select) a un campo de texto abierto(input) [Programa8]
            */
            /* E. Zamora El troll */
            $("#tb_add_modulopredio_cup").change(function() {
                var cambio = $("#tb_add_modulopredio_cup option:selected").text();
                $("#tb_add_predio").val(cambio);
                $("#tb_add_nombre_predio").val(cambio);

                if (obj.options.userActive.program == 8 && ($("#tb_add_tipo_accion option:selected").val() == 3 || $("#tb_add_tipo_accion option:selected").val() == 4 || $("#tb_add_tipo_accion option:selected").val() == 7 || $("#tb_add_tipo_accion option:selected").val() == 6 || $("#tb_add_tipo_accion option:selected").val() == 8)) {

                    $("#clave_unica").val($("#tb_add_modulopredio_cup option:selected").val());

                } else {
                    $("#clave_unica").val(" ");
                }


            });
            /* E. Zamora El troll */
            //
            /*evento nuevo Edgar R. Zamora */
            /* get selct */
            /*$('#tb_add_region').change(function() {
                let option = '<option value="-1">Seleccione una opción</option>';
                //Limpia los cambos
                $('#tb_add_modulopredio_municipio,#tb_add_modulopredio_localidad,#tb_add_localidad,#tb_add_modulopredio_cup').html(option);
                
            });*/

            $("#tb_add_modulopredio_municipio").change(function() {
                let valorSelected  = $(this).val().trim();

                if(valorSelected == -1){
                    let option = '<option value="-1">Seleccione una opción</option>';
                    $('#tb_add_modulopredio_localidad').html(option);
                    $('#tb_add_modulopredio_cup').html(option);
                }
                /*$("#tb_add_modulopredio_municipio option:selected").each(function() {
                    $('#tb_add_municipio').val($(this).val());
                    $('#tb_add_id_municipio').val($(this).val());
                });*/
            });

            $("#tb_add_modulopredio_localidad").change(function() {
                $("#tb_add_modulopredio_localidad option:selected").each(function() {
                    var $options = $("#tb_add_modulopredio_localidad > option").clone();
                    $('#tb_add_localidad').empty();
                    $('#tb_add_localidad').append($options);
                    $('#tb_add_localidad').val($(this).val());
                });

                //Procedimeinto para obtener  tipo inspeccion 

                if ((obj.options.userActive.program == "8")) {
                    var idTipo = $("#tb_add_tipo_accion").val();
                    if (idTipo == 3 || idTipo == 7 || idTipo == 6 || idTipo == 8) {
                        $("#field_tb_add_modulopredio_cup").find('.label').html("Razón Social o Nombre  ");
                        obj.requestTipoInspeccion('getIndustrias');

                    } else {
                        $("#field_tb_add_modulopredio_cup").find('.label').html("Predio");
                        obj.requestTipoInspeccion('getPredios');
                    }



                }






            });

            if ((obj.options.userActive.program == 8)) {

                $("#tb_add_tipo_accion").change(
                    function() {
                        var idTipo = $("#tb_add_tipo_accion").val();
                        var region = $("#tb_add_region").val();
                        var municipio = $("#tb_add_modulopredio_municipio").val();
                        var localidad = $("#tb_add_modulopredio_localidad").val();

                        if (region != '-1' && region != 'undefined' && municipio != '-1' && municipio != 'undefined' && localidad != '-1' && localidad != 'undefined') {
                            if (idTipo == 3 || idTipo == 7 || idTipo == 6 || idTipo == 8) {
                                var tipoIndustria;
                                if (idTipo == 7) {
                                    tipoIndustria = "ASERRADERO";
                                }

                                if (idTipo == 6) {
                                    tipoIndustria = "MADERERIA";
                                }

                                if (idTipo == 8) {
                                    tipoIndustria = "TARIMERA";
                                }
                                if (idTipo == 3) {
                                    tipoIndustria = "ALL";
                                }

                                obj.requestTipoInspeccion(tipoIndustria);
                                $("#field_tb_add_modulopredio_cup").find('.label').html("Razón Social o Nombre ");

                            } else {

                                obj.requestTipoInspeccion('getPredios');
                                $("#field_tb_add_modulopredio_cup").find('.label').html("Predio");
                                $("#clave_unica").val(" ");
                            }
                        }

                    });


            }

            if ((obj.options.userActive.program != "1") && (obj.options.userActive.program != "3") && (obj.options.userActive.program != "0")) {
                $("#tb_add_modulopredio_localidad").change(function() {
                    $("#tb_add_modulopredio_localidad option:selected").each(function() {
                        elegido = $(this).val();
                        var elemnt = document.getElementById('tb_add_modulopredio_localidad');
                        elemnt.value = elegido;
                    });
                });
            }
            /* get selct */

            //E. Zamora 
            if (obj.options.action == 'edit') {
                $(document).ready(function() {
                    $("#tb_add_region").attr("disabled", true);
                    $("#tb_add_anio").attr("disabled", true);
                });
            }
            /*evento nuevo Edgar R. Zamora */
            //JAC
            $("#tb_add_fecha_termino").change(function() {
                if (document.getElementById("tb_add_fecha_inicio") && obj.options.userActive.program == 8) {
                    var fechaInicio = document.getElementById("tb_add_fecha_inicio").value;
                    var fechaFin = document.getElementById("tb_add_fecha_termino").value;
                    var valorInicio = fechaInicio.split("/");
                    var valorFin = fechaFin.split("/");
                    var finicio = new Date(valorInicio[2], (valorInicio[1] - 1), valorInicio[0]);
                    var ffin = new Date(valorFin[2], (valorFin[1] - 1), valorFin[0]);
                    if (fechaInicio == "") {
                        alert("Atención: \n\n Necesita seleccionar una fecha de inicio");
                        document.getElementById("tb_add_fecha_termino").value = "";
                    }
                    if (ffin < finicio) {
                        alert("Atención: \n\n La fecha de término debe ser mayor o igual a la fecha de inicio");
                        document.getElementById("tb_add_fecha_termino").value = "";
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });
            $("#tb_add_valor_comercial").keyup(function() {
                var comercial = document.getElementById("tb_add_valor_comercial").value;
                var ambiental = document.getElementById("tb_add_impacto_ambiental").value;
                var daño = document.getElementById("tb_add_reparacion_danio").value;
                if (ambiental == "") {
                    ambiental = 0;
                }
                if (daño == "") {
                    daño = 0;
                }
                if (comercial == "") {
                    comercial = 0;
                }
                var total = parseFloat(comercial) + parseFloat(ambiental) + parseFloat(daño);
                //alert(total);
                document.getElementById("tb_add_total_dictamen").value = total;
            });
            $("#tb_add_impacto_ambiental").keyup(function() {
                var comercial = document.getElementById("tb_add_valor_comercial").value;
                var ambiental = document.getElementById("tb_add_impacto_ambiental").value;
                var daño = document.getElementById("tb_add_reparacion_danio").value;
                if (daño == "") {
                    daño = 0;
                }
                if (comercial == "") {
                    comercial = 0;
                }
                if (ambiental == "") {
                    ambiental = 0;
                }
                var total = parseFloat(comercial) + parseFloat(ambiental) + parseFloat(daño);
                //alert(total);
                document.getElementById("tb_add_total_dictamen").value = total;
            });
            $("#tb_add_reparacion_danio").keyup(function() {
                var comercial = document.getElementById("tb_add_valor_comercial").value;
                var ambiental = document.getElementById("tb_add_impacto_ambiental").value;
                var daño = document.getElementById("tb_add_reparacion_danio").value;
                if (ambiental == "") {
                    ambiental = 0;
                }
                if (comercial == "") {
                    comercial = 0;
                }
                if (daño == "") {
                    daño = 0;
                }
                var total = parseFloat(comercial) + parseFloat(ambiental) + parseFloat(daño);
                //alert(total);
                document.getElementById("tb_add_total_dictamen").value = total;
            });
            //JAC
            /* E. Zamora El troll */
            $("#tb_add_anio").change(function() {
                var cambio = $("#tb_add_anio option:selected").val();
                $("#tb_add_anio_ejercicio").val(cambio);
            })
            /* E. Zamora El troll */
            /* E. Zamora El troll 08/06/16*/
            $("#tb_add_region_hidrologica").change(function() {
                var valor = $("#tb_add_region_hidrologica option:selected").val();
                var cuenca = $("#tb_add_cuenca");
                var subcuenca = $("#tb_add_subcuenca");
                if (valor != "-1") {
                    switch (valor) {
                        case "12":
                            cuenca.find("option[value^='18']").hide();
                            cuenca.find("option[value^='26']").hide();
                            cuenca.find("option[value^=' ']").hide();
                            cuenca.find("option[value^=12]").show();
                            /*cuenca.find("option[value='18F     ']").hide();*/
                            break;
                        case "18":
                            cuenca.find("option[value^='18']").show();
                            cuenca.find("option[value^='26']").hide();
                            cuenca.find("option[value^=' ']").hide();
                            cuenca.find("option[value^=12]").hide();
                            break;
                        case "26":
                            cuenca.find("option[value^='18']").hide();
                            cuenca.find("option[value^='26']").show();
                            cuenca.find("option[value^=' ']").hide();
                            cuenca.find("option[value^=12]").hide();
                            break;
                    }
                } else {
                    cuenca.val("-1");
                    cuenca.find("option[value^='18']").hide();
                    cuenca.find("option[value^='26']").hide();
                    cuenca.find("option[value^=' ']").hide();
                    cuenca.find("option[value^=12]").hide();

                    subcuenca.val("-1");
                    subcuenca.find("option[value^='18']").hide();
                    subcuenca.find("option[value^='26']").hide();
                    subcuenca.find("option[value^=' ']").hide();
                    subcuenca.find("option[value^=12]").hide();
                }
            });
            $("#tb_add_cuenca").change(function() {
                var valor = $("#tb_add_cuenca option:selected").val();
                var subcuenca = $("#tb_add_subcuenca");
                if (valor != "-1") {
                    switch (valor) {
                        case "12A     ":
                            subcuenca.find("option[value^='18']").hide();
                            subcuenca.find("option[value^='26']").hide();
                            subcuenca.find("option[value^=' ']").hide();
                            subcuenca.find("option[value^=12]").show();
                            break;
                        case "18A     ":
                            subcuenca.find("option[value^='18A']").show();
                            subcuenca.find("option[value^='26']").hide();
                            subcuenca.find("option[value^=' ']").hide();
                            subcuenca.find("option[value^=12]").hide();
                            break;
                        case "18C     ":
                            subcuenca.find("option[value^='18C']").show();
                            subcuenca.find("option[value^='26']").hide();
                            subcuenca.find("option[value^=' ']").hide();
                            subcuenca.find("option[value^=12]").hide();
                            break;
                        case "18F     ":
                            subcuenca.find("option[value^='18F']").show();
                            subcuenca.find("option[value^='26']").hide();
                            subcuenca.find("option[value^=' ']").hide();
                            subcuenca.find("option[value^=12]").hide();
                            break;
                        case "18G     ":
                            subcuenca.find("option[value^='18G']").show();
                            subcuenca.find("option[value^='26']").hide();
                            subcuenca.find("option[value^=' ']").hide();
                            subcuenca.find("option[value^=12]").hide();
                            break;
                        case "26D     ":
                            subcuenca.find("option[value^='18']").hide();
                            subcuenca.find("option[value^='26D']").show();
                            subcuenca.find("option[value^=' ']").hide();
                            subcuenca.find("option[value^=12]").hide();
                            break;
                    }
                } else {

                    subcuenca.val("-1");
                    subcuenca.find("option[value^='18']").hide();
                    subcuenca.find("option[value^='26']").hide();
                    subcuenca.find("option[value^=' ']").hide();
                    subcuenca.find("option[value^=12]").hide();

                }
            });
            /* E. Zamora El troll 08/06/16*/


            //( implementacion 21/06/2016)Codigo Agustin Juarez Para el calculo del traslado, exlusivo para el programa de incendios 
            $("#tb_add_llegada").keyup(function() {
                start_actual_time = new Date($("#tb_add_salida").val());
                end_actual_time = new Date($("#tb_add_llegada").val());
                var diff = end_actual_time - start_actual_time;
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
                //alert(formatted);
                $("#tb_add_traslado").val("");
                $("#tb_add_traslado").val(formatted + " hrs.");
            });

            $("#tb_add_salida").keyup(function() {
                start_actual_time = new Date($("#tb_add_salida").val());
                end_actual_time = new Date($("#tb_add_llegada").val());
                var diff = end_actual_time - start_actual_time;
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
                //alert(formatted);
                $("#tb_add_traslado").val("");
                $("#tb_add_traslado").val(formatted + " hrs.");

            });


            // Fin ( implementacion 21/06/2016) Codigo Agustin Juarez Para el calculo del traslado, exlusivo para el programa de incendios 


            //( implementacion 21/06/2016)Codigo Agustin Juarez Para el calculo de Deteccion, exlusivo para el programa de incendios 

            $("#tb_add_deteccion").keyup(function() {
                start_actual_time = new Date($("#tb_add_inicio").val());
                end_actual_time = new Date($("#tb_add_deteccion").val());
                var diff = end_actual_time - start_actual_time;
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);

                $("#tb_add_atencion").val("");
                $("#tb_add_atencion").val(formatted + " hrs.");

            });

            $("#tb_add_inicio").keyup(function() {
                start_actual_time = new Date($("#tb_add_inicio").val());
                end_actual_time = new Date($("#tb_add_deteccion").val());
                var diff = end_actual_time - start_actual_time;
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);

                $("#tb_add_atencion").val("");
                $("#tb_add_atencion").val(formatted + " hrs.");

            });



            $("#tb_add_combate").keyup(function() {
                start_actual_time = new Date($("#tb_add_inicio").val());
                end_actual_time = new Date($("#tb_add_combate").val());
                var diff = end_actual_time - start_actual_time;
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
                //alert(formatted);
                $("#tb_add_combate2").val("");
                $("#tb_add_combate2").val(formatted + " hrs.");

            });

            $("#tb_add_inicio").keyup(function() {
                start_actual_time = new Date($("#tb_add_inicio").val());
                end_actual_time = new Date($("#tb_add_combate").val());
                var diff = end_actual_time - start_actual_time;
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
                //alert(formatted);
                $("#tb_add_combate2").val("");
                $("#tb_add_combate2").val(formatted + " hrs.");

            });


            //Fin ( implementacion 21/06/2016)Codigo Agustin Juarez Para el calculo de Duracion, exlusivo para el programa de incendios 




            //Codigo Mike programa 72 filtara de acuerdo a al actividad realizada 
            $("#tb_add_actividad_realizada").change(
                function() {
                    var valor = $("#tb_add_actividad_realizada option:selected").val();
                    var trabajo = $("#tb_add_trabajo");
                    if (valor != "-1") {
                        switch (valor) {
                            case "1":
                                trabajo.find("option[value^='2']").hide();
                                trabajo.find("option[value^='1']").show();
                                trabajo.find("option[value^='4']").show();
                                trabajo.find("option[value^='3']").hide();
                                trabajo.find("option[value^='5']").show();

                                break;
                            case "2":
                                trabajo.find("option[value^='1']").hide();
                                trabajo.find("option[value^='4']").hide();
                                trabajo.find("option[value^='2']").show();
                                trabajo.find("option[value^='3']").show();
                                trabajo.find("option[value^='5']").show();
                                break;
                            case "3":
                                trabajo.find("option[value^='1']").show();
                                trabajo.find("option[value^='2']").show();
                                trabajo.find("option[value^='3']").show();
                                trabajo.find("option[value^='4']").show();
                                trabajo.find("option[value^='5']").show();
                                break;
                            default:

                        }

                    }

                }
            );



            $("#tb_add_renuevo").keyup(function() {


                var renuevo = $("#tb_add_renuevo").val();
                var arboladoAdulto = $("#tb_add_arbolado_adulto").val();
                var arbusto = $("#tb_add_arbusto").val();
                var pasto = $("#tb_add_pasto").val();
                if (renuevo != '' && arboladoAdulto != '' && arbusto != '' && pasto != '') {
                    var total = parseFloat(renuevo) + parseFloat(arboladoAdulto) + parseFloat(arbusto) + parseFloat(pasto);
                    document.getElementById("tb_add_total").value = total.toFixed(2);
                }

            });

            $("#tb_add_arbolado_adulto").keyup(function() {
                var renuevo = $("#tb_add_renuevo").val();
                var arboladoAdulto = validator.getFormatNumber($("#tb_add_arbolado_adulto").val());
                var arbusto = $("#tb_add_arbusto").val();
                var pasto = $("#tb_add_pasto").val();
                if (renuevo != '' && arboladoAdulto != '' && arbusto != '' && pasto != '') {
                    var total = parseFloat(renuevo) + parseFloat(arboladoAdulto) + parseFloat(arbusto) + parseFloat(pasto);
                    document.getElementById("tb_add_total").value = total.toFixed(2);
                }
            });
            $("#tb_add_arbusto").keyup(function() {

                var renuevo = $("#tb_add_renuevo").val();
                var arboladoAdulto = $("#tb_add_arbolado_adulto").val();
                var arbusto = $("#tb_add_arbusto").val();
                var pasto = $("#tb_add_pasto").val();
                if (renuevo != '' && arboladoAdulto != '' && arbusto != '' && pasto != '') {
                    var total = parseFloat(renuevo) + parseFloat(arboladoAdulto) + parseFloat(arbusto) + parseFloat(pasto);
                    document.getElementById("tb_add_total").value = total.toFixed(2);
                }

            });
            $("#tb_add_pasto").keyup(function() {

                var renuevo = $("#tb_add_renuevo").val();
                var arboladoAdulto = $("#tb_add_arbolado_adulto").val();
                var arbusto = $("#tb_add_arbusto").val();
                var pasto = $("#tb_add_pasto").val();
                if (renuevo != '' && arboladoAdulto != '' && arbusto != '' && pasto != ' ') {
                    var total = parseFloat(renuevo) + parseFloat(arboladoAdulto) + parseFloat(arbusto) + parseFloat(pasto);
                    document.getElementById("tb_add_total").value = total.toFixed(2);
                }

            });


            //fin codigo programa 72 

            if (obj.options.userActive.program == '1') {


                $("#tb_add_superficie_total,#tb_add_superficie_otros_usos").keyup(function() {
                    let superficieTotal = $("#tb_add_superficie_total").val().trim();
                    let otros_usos = $("#tb_add_superficie_otros_usos").val().trim();

                    if (superficieTotal != '') {
                        if (!isNaN(superficieTotal)) {
                            if (otros_usos != '') {
                                if (!isNaN(otros_usos)) {
                                    let supTotal = parseFloat(superficieTotal) - parseFloat(otros_usos);
                                    $("#tb_add_superficie_arbolada").val(supTotal.toFixed(3));
                                } else {
                                    $("#tb_add_superficie_arbolada").val('');
                                }
                            } else if (otros_usos == '') {
                                $("#tb_add_superficie_arbolada").val(superficieTotal);
                            }
                        } else {
                            $("#tb_add_superficie_arbolada").val('');
                        }
                    } else if (superficieTotal == '') {
                        $("#tb_add_superficie_arbolada").val('');
                    }

                });
            }
            if (obj.options.userActive.program == '7') {
                $("#tb_add_renuevo").number(true, 2);
                $("#tb_add_arbolado_adulto").number(true, 2);
                $("#tb_add_arbusto").number(true, 2);
                $("#tb_add_pasto").number(true, 2);
                $("#tb_add_cantidad").number(true, 2);
            }
            if (obj.options.userActive.program == '6') {
                $("#tb_add_superficie_total_boscosa").number(true, 2);
                $("#tb_add_hectareas_saneadas").number(true, 2);
                $("#tb_add_asistencia_tecnica_ha").number(true, 2);
                $("#tb_add_volumen_saneado").number(true, 2);
            }
            if (obj.options.userActive.program == '12') {
                let conglomeradoGlobal = null

                 /*
                 * @Description
                 * Evento para obtener el valor del conglomenrado antes de que sea modificado
                 */
                 $('#tb_add_num_conglomerado').focus(function(){
                    conglomeradoGlobal = $(this).val().trim()
                 });

                /*
                 * @Description
                 * Evento para actualizar el numero de conglomerado en los multi registros
                 * Envia la peticion si existe folio en caso contrario notifica al usuario
                 * que tiene que generar el folio
                 */

                $('#tb_add_num_conglomerado').on('change', function() {
                   let folio = $('#tb_add_folio').val().trim();
                   let numero_conglomerado = $(this).val().trim();
                    if(!validator.isEmpty(folio)){

                         Alert.show({
                              title: 'Notificaci&oacute;n',
                              type: 'error',
                              messages: ['<b>¿Está seguro de usar '+ numero_conglomerado +' como número de conglomerado?.</b><br>El número de conglomerado se actualizará en los multiregistros'],
                              buttons: [{label:'No', event: function(){
                                               $('#tb_add_num_conglomerado').val(conglomeradoGlobal)
                                            }},
                                        { label: 'Si', event: function() {
                                                var params = { action: 'editNoConglomerado', user: obj.options.userActive.id, folio: folio, numeroConglomerado: numero_conglomerado };
                                                      obj.requestUpdateConglomerado(params);
                                              } 
                                        }]
                         });
                    }else{
                      $(this).val('') 
                      Alert.error({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: ['Para agregar/actualizar el número de conglomerado correctamente genere el folio'],
                            content: '',
                            buttons: [{ label: 'Aceptar' }]
                      })
                    } 
                 
                });
            }
            if (obj.options.userActive.program == '13') {
                $("#tb_add_superficie").number(true, 2);
                $("#tb_add_monto_pago").number(true, 2);
            }

            /*Boton para subir shape de madera legal */
            if (obj.options.userActive.program == 0) {
                $("#importShape").click(function() {
                    if ($("#tb_add_folio").val() != '') {
                        $('body').upload({ data: { user: obj.options.userActive.id, nameShape: $("#tb_add_folio").val(), capa: 'LIMITES', nombre_predio: $("#tb_add_predio").val(), width: 300, height: 260 } });
                    } else {
                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: ['Error no existe CUP '],
                            content: '',
                            buttons: [{ label: 'Cerrar' }]
                        });


                    }
                });
            }
            //fin madera legal
            obj.FieldsCalculated = null;
            obj.FieldsCalculated = {};
            obj.FieldsRequest = [];
            obj.FieldsRequest = {};
            obj.FieldsSummary = [];
            obj.FieldsSummary = {};
            //obj.options.operations.push({datatype:'records',destiny:'num_intervenciones',operation:'formularios.areascorta'});
            obj.createCalculatedFields(obj.options.operations);
            obj.attachEvents();
            obj.createRequestEventsFields(obj.options.request);
            obj.buildStructureSummary(obj.options.summarys);
            if (((this.options.action) == 'consult' || (this.options.action) == 'edit') && obj.options.userActive.program == '8') {
                //idTipo ==3 || idTipo ==7 || idTipo ==6 || idTipo ==8 
                var idTipo = '';
                var region = '';
                var municipio = '';
                var localidad = '';

                function getValorList(Lista, descriptivo) {
                    var id = '';
                    for (var x = 0; x < Lista.length; x++) {

                        if (Lista[x].label == descriptivo) {

                            id = Lista[x].value;
                        }
                    }
                    return id;
                }
                if ((this.options.action) == 'consult') {
                    var listaAccion = obj.options.data[1].list.list;
                    var descriptivoAccion = $("#tb_add_tipo_accion").val();
                    idTipo = getValorList(listaAccion, descriptivoAccion);
                    var listaRegion = obj.options.data[2].list.list;
                    var descriptivoRegion = obj.options.data[2].value;
                    region = getValorList(listaRegion, descriptivoRegion);
                    var listaMunicipio = obj.options.data[3].list.list;
                    var descriptivoMunicipio = obj.options.data[3].value;
                    municipio = getValorList(listaMunicipio, descriptivoMunicipio);
                    var listaLocalidad = obj.options.data[4].list.list;
                    var descriptivoLocalidad = obj.options.data[4].value;
                    localidad = getValorList(listaLocalidad, descriptivoLocalidad);
                }
                if ((this.options.action) == 'edit') {
                    idTipo = obj.options.data[1].value;
                    region = obj.options.data[2].value;
                    municipio = obj.options.data[3].value;
                    localidad = obj.options.data[4].value;
                }

                // var idTipo=$("#tb_add_tipo_accion").val();
                if (idTipo == 3 || idTipo == 7 || idTipo == 6 || idTipo == 8) {
                    $("#field_tb_add_modulopredio_cup").find('.label').html("Razón Social o Nombre  ");
                    obj.requestTipoInspeccion2('getIndustrias', region, municipio, localidad, $("#tb_add_folio").val(), this.options.action);
                    // alert(obj.options.data[6].value);
                    /*
                    quiero que el combo de modulo predio cup o predio 
                    se le asigne el valor que tengo en el alter pero no queda 
                    si es asi? prueba con esto
                    */
                    // $("select#ejeY").val("-1ab2") haber prueba asi ya goey se me olvido el ####
                    //si no queda asi preuba esto
                    //$("select#tb_add_modulopredio_cup").val(obj.options.data[6].value)
                    $("#tb_add_modulopredio_cup option[value='" + obj.options.data[6].value + "']").val();

                }



            }


        },

        buildStructureSummary: function(data) {
            var obj = this;
            for (var x in data) {
                var i = data[x];
                i['user'] = obj.options.userActive.id;
                var subtable = i.subtable.replace('.', '');
                if (!obj.FieldsSummary[subtable]) {
                    obj.FieldsSummary[subtable] = {};
                }
                obj.FieldsSummary[subtable] = i;
            }
        },
        makeRequestSummary: function(id) {
            var obj = this;
            var subtable = id.replace('tb_add_', '')
            subtable = subtable.replace('.', '');
            if (obj.FieldsSummary[subtable]) {
                var data = obj.FieldsSummary[subtable];
                if (data.clock) {
                    clearTimeout(data.clock);
                    data.clock = null;
                }

                data.clock = setTimeout(function() {
                    var params = data;
                    params['folio'] = obj.Folio;
                    obj.requestField(params, data);
                }, 100);
            }
        },

        createRequestEventsFields: function(data) {
            var obj = this;
            for (var x in data) {
                var i = data[x];
                var fields = obj.getFieldsToCalculate(i.operation);
                for (var y in fields) {
                    var f = fields[y];
                    if (!obj.FieldsRequest[f]) {
                        obj.FieldsRequest[f] = [];
                    }
                    obj.FieldsRequest[f].push({ fields: fields, destiny: i.destiny, typeDestiny: i.datatype, service: i.service, clean: i.clean });
                    $("#tb_add_" + f).change(function() {
                        var field = $(this).attr('field');
                        var value = $("#tb_add_" + field + " option:selected").val();
                        if (value != '-1') {
                            for (var a in obj.FieldsRequest[field]) {
                                var e = obj.FieldsRequest[field][a];
                                obj.makeRequest(e);
                            }
                        }
                    });
                }
            }
        },
        makeRequest: function(data) {
            var obj = this;
            if (data.clock) {
                clearTimeout(data.clock);
                data.clock = null;
            }
            data.clock = setTimeout(function() {
                var params = {};
                var makeRequest = true;
                for (var x in data.fields) {
                    var f = data.fields[x];
                    var type = obj.options.fields[f].type;
                    value = (type == 'edit') ? $("#tb_add_" + f).val() : $("#tb_add_" + f + " option:selected").val();
                    if ((value == '-1') || (value == '')) {
                        makeRequest = false;
                        break;
                    } else {
                        if (!params[f]) {
                            params[f];
                        }
                        params[f] = value;
                    }
                }
                if (data.clean) {
                    var fieldsToClean = data.clean.split(',');
                    for (var y in fieldsToClean) {

                        var typeToClear = obj.options.fields[fieldsToClean[y]].type;
                        if (typeToClear != 'edit') {
                            $("#tb_add_" + fieldsToClean[y]).html('<option value="-1" selected="selected" >Seleccione una opci&oacute;n</option>');
                        } else {
                            $("#tb_add_" + fieldsToClean[y]).val('')
                        }
                    }

                }
                if (makeRequest) {

                    obj.requestField(params, data);
                }
            }, 100);
        },
        isImage: function(name) {
            var valid = false;
            name = name.toLowerCase();
            var typeValid = ['png', 'gif', 'jpeg', 'jpg'];
            for (var x in typeValid) {
                var i = typeValid[x];
                if (name.indexOf('.' + i) != -1) {
                    valid = true;
                    break;
                }
            }
            return valid;
        },
        attachEvents: function() {
            var obj = this;
            obj.attachment = null;
            obj.attachment = {};
            var serviceUpload = connections.image.upload.url;
            $(obj.mainClass + " .attach").each(function() {
                var id = $(this).attr('id');
                $(this).attr('placeholder', 'De clic para seleccionar');
                ////////////////////////
                var idForm = id + '_file';
                var chain = '<input type="file" name="' + idForm + '" id="' + idForm + '" data-url="" style="display:none"/>';
                $(obj.mainClass).append(chain);
                $('#' + idForm).fileupload({
                    formData: {
                        user: '',
                        folio: ''
                    },
                    dataType: connections.charge.upload.dataType,
                    //contentType: "application/json; charset=utf-8",
                    add: function(e, data) {

                        var d = data.files[0];
                        $("#field_" + id + " .image_icon").attr("source", "local").show();
                        $("#field_" + id + " .image_delete").show();

                        var nameFile = (typeof(d.name) != "undefined") ? d.name : d.fileName;
                        var valid = obj.isImage(nameFile);
                        if (valid) {
                            data.url = serviceUpload;
                            obj.attachment[idForm] = data;
                            $("#" + id).val(nameFile);
                        } else {
                            obj.attachment[idForm] = null;
                            Alert.show({
                                title: 'Notificaci&oacute;n',
                                type: 'error',
                                messages: ['Archivo no valido'],
                                content: '',
                                buttons: [{ label: 'Cerrar' }]
                            });
                        }
                    }
                });

                $('#' + idForm).bind('fileuploadsend', function(e, data) {
                    //obj.showSpinner();
                });
                $('#' + idForm).bind('fileuploaddone', function(e, data) {
                    //obj.hideSpinner();      
                    var r = data.result;
                    if (r.response.sucessfull) {

                    } else {
                        Alert.show({
                            title: 'Notificaci&oacute;n',
                            type: 'error',
                            messages: [r.response.message],
                            content: '',
                            buttons: [{ label: 'Cerrar' }]
                        });
                    }

                });

                $('#field_' + id + " .image_delete").click(function(event) {
                    $("#" + id).val('');
                    $("#field_" + id + " .image_icon").hide();
                    $("#field_" + id + " .image_delete").hide();
                    delete obj.attachment[idForm];
                    event.stopPropagation();
                });
                $("#field_" + id).click(function() {
                    $("#" + idForm).click();
                });
                $('#field_' + id + " .image_icon").click(function(event) {
                    var source = $(this).attr('path');
                    var url = connections.image.get.url + 'user=' + obj.options.userActive.id + '&folio=' + obj.Folio;
                    obj.dialog.dialog("open");
                    event.stopPropagation();
                });

                ////////////////////////////////////
            });
            obj.dialog = $("#dialog-image").dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Cerrar": function() {
                        obj.dialog.dialog("close");
                    }
                },
                close: function() {}
            });
        },
        createCalculatedFields: function(data) {
            var obj = this;

            for (var x in data) {
                var i = data[x];
                var fields = obj.getFieldsToCalculate(i.operation);
                for (var y in fields) {
                    var f = fields[y];
                    if (!obj.FieldsCalculated[f]) {
                        obj.FieldsCalculated[f] = [];
                    }
                    obj.FieldsCalculated[f].push({ operation: i.operation, destiny: i.destiny, typeOperation: i.datatype });
                    if (i.datatype != 'records') {
                        $("#tb_add_" + f).keyup(function() {
                            var field = $(this).attr('field');
                            for (var n in obj.FieldsCalculated[field]) {
                                var e = obj.FieldsCalculated[field][n];
                                var result = obj.getCalculate(e.operation, e.typeOperation);
                                $("#tb_add_" + e.destiny).val(result);

                                /*
                                 * @ Description 
                                 *  El input monto_aprobado toma el valor base del input monto_por_ha
                                 */
                                if (field == 'monto_por_ha') {
                                    let sa2 = $('#tb_add_superficie_aprobada_2').val().trim();
                                    if (isNaN(sa2) || sa2.length == 0) {
                                        $('#tb_add_monto_aprobado').val(0);
                                    } else {
                                        let producto = $(this).val() * sa2;
                                        $('#tb_add_monto_aprobado').val(producto.toFixed(2));
                                    }
                                }

                                /*
                                 * Fin de bloque
                                 */

                                $("#tb_add_" + e.destiny).keyup();
                            }

                        });
                    } else {
                        $("div[id='tb_add_" + i.operation + "']").attr('destiny', i.destiny);
                        var total = '';
                        for (var x in obj.forms) {
                            if (i.operation == obj.forms[x].field) {
                                total = obj.forms[x].records;
                                break;
                            }
                        }
                        $("#tb_add_" + i.destiny).val(total);


                    }
                }
            }
        },
        getCalculate: function(operation, type) {
            /*
             * @ Description. 
             * Correccion de bug para calcular primer ministracion y segunda ministracion 
             * en programa 10
             */
            var chain = '';
            var data = operation.split(' ');

            for (var x in data) {
                var i = data[x];
                if (i.length > 1) {

                    if (isNaN(i)) {
                        var valor = validator.removeSpaces($("#tb_add_" + i).val());
                    } else {
                        var valor = i.trim();
                    }

                    if (type != 'string') {
                        valor = (valor.length > 0) ? valor : '0';
                    }
                    if (type == 'string') {
                        valor = (chain == '') ? valor : ' ' + valor;
                    }
                    chain += valor;
                } else {
                    if (type != 'string') {
                        chain += i;
                    }

                }
            }

            /*
             * Fin del codigo de bug
             */

            //correccion Edgar R.
            var response = (type == 'string') ? chain : eval(chain);
            if (response % 1 == 0) {
                return response;
            } else {
                var response = (type == 'string') ? chain : eval(chain).toFixed(2);
                return response;
            } //correccion Edgar R.                   
        },
        getFieldsToCalculate: function(operation) {
            var fields = [];
            var data = operation.split(' ');
            for (var x in data) {
                var i = data[x];
                if (i.length > 1) {
                    fields.push(i);
                }
            }
            return fields;
        },
        validateAddUser: function() {
            var obj = this;
            var params = [];
            var valid = true;
            var msg = [];
            let numero_programa = obj.options.userActive.program;
            /*
             * @type{boolean} control - Controla el mensaje de las superficies para que lo 
             * @default 
             * muestre una sola vez 
             */
            let control = false;

            $(obj.mainClass + " .textInput").each(function() {
                var item = $(this);
                var id = item.attr('id');
                if (id != 'clave_unica') {
                    var field = item.attr('field');
                    var datatype = item.attr('datatype');
                    var value = item.val();
                    value = validator.replaceTags(value);
                    var label = item.prev().html();
                    var value2 = 'x';
                    if (validator.isEmpty(value2)) {
                        valid = false;
                        item.addClass('badInput');
                    } else {
                        switch (field) {
                            case 'phone':
                                if (!validator.isPhone(value)) {
                                    msg.push('Telefono no valido');
                                    item.addClass('badInput');

                                }
                                break;
                            case 'email':
                                if (!validator.isEmail(value)) {
                                    msg.push('Email no valido');
                                    item.addClass('badInput');
                                }
                                break;

                        }
                         /*
                          * @Description
                          * issue validacion para el formulario principal del programa1
                          * superficies con decimales 
                          * ITH 
                          */
                         if (numero_programa == 1) {
                             if (datatype == 'real' && !validator.isEmpty(value) && value!='0') {

                                 switch (field) {
                                     case 'superficie_total':
                                     case 'superficie_anp_federal':
                                     case 'superficie_anp_federal':
                                     case 'superficie_conservacion':
                                     case 'franja_protectora':
                                     case 'superficie_pendientes':
                                     case 'superficie_msnm':
                                     case 'superficie_bosque_mesofilo':
                                     case 'superficie_produccion':
                                     case 'superficie_restauracion':
                                     case 'superficie_otros_usos':

                                         if (!validator.isNumNoDec(value.trim())) {
                                             item.addClass('badInput');
                                             control=true;
                                         }
                                         break;
                                 }
                             }
                         }
                         /*
                          * Fin bloque issue
                          */

                         /*
                          * @Description
                          * issue validacion para el formulario principal del programa10
                          * superficies con decimales 
                          * ITH 
                          */
                         if (numero_programa == 10) {
                             if (datatype == 'real' && !validator.isEmpty(value) && value!='0') {

                                 switch (field) {
                                     case 'superficie_total':
                                     case 'superficie_arbolada':
                                     case 'superficie_aprobada_anio_anterior':
                                     case 'superficie_solicitada':
                                     case 'plantacion_navidad_superficie':
                                     case 'plantacion_maderable_superficie':
                                     case 'superficie_total_plantaciones':
                                     case 'sup_intervenir_aprov_maderable':
                                     case 'superficie_apoyada':
                                     case 'superficie_conafor_fondo_concurrente':
                                     case 'superficie_conafor':
                                     case 'superficie_aprobada':
                                     case 'superficie_documentacion':
                                     case 'superficie_factible_validada':
                                     case 'suerficie_preaprobacion':
                                     case 'superficie_aprobada_2':
                                     case 'superficie_aprobada_fc_ha':
                                     case 'prorrim':
                                     case 'plantacion_restauracion':
                                     case 'fondos_concurrentes_conafor':

                                         if (!validator.isNumNoDec(value.trim())) {
                                             item.addClass('badInput');
                                             control=true;
                                         }
                                         break;
                                 }
                             }
                         }
                         /*
                          * Fin bloque issue
                          */

                            params.push({field:field,value:value,datatype:datatype,label:label});
                          
                    }
                }
            });
            $(obj.mainClass + " .multiselect").each(function() {
                var item = $(this);
                var id = item.attr('id');
                var field = item.attr('field');
                var datatype = item.attr('datatype');
                var value = item.attr('value');
                var label = item.prev().html();
                item.removeClass('badInput');
                var value2 = 'x';
                if (validator.isEmpty(value2)) {
                    valid = false;
                    item.addClass('badInput');
                } else {
                    params.push({ field: field, value: value, datatype: datatype, label: label });
                }
            });

            if (obj.options.action == 'new') {
                var roleSelected = (obj.options.addExecutive) ? 6 : obj.options.userActive.roleId + 1;
            } else {
                var roleSelected = obj.options.data.roleId;
            }

            $(obj.mainClass + " .selectInput").each(function() {
                var item = $(this);
                var id = item.attr('id');
                var field = item.attr('field');
                var display = item.attr('display');
                var datatype = item.attr('datatype');
                var label = item.prev().html();
                var value = $("#" + id + " option:selected").val();

                params.push({ field: field, value: value, datatype: datatype, label: label });



            });

            if (control && numero_programa == '1') {
                msg.push("<b>Las superficies deben contener max 5 enteros y max 3 decimales</b>");
            } else if (control && numero_programa == '10') {
                msg.push("<b>Verifique las superficies marcadas en rojo deben contener max 5 enteros y max 3 decimales</b>");
            }

            if ($("#fm_add_rol option:selected").val() == '2') {
                params['privacy'] = "0";
            }
            if (!valid) {
                msg.push("Llene los campos faltantes");
            }
            if ($("#fm_add_password").val() != $("#fm_add_c_password").val()) {
                $("#fm_add_password,#fm_add_c_password").addClass('badInput');
                msg.push('La contrase&ntilde;a no corresponde a la confirmaci&oacute;n');
            }
            if (($("#tb_add_anio option:selected").val() == '-1') || ($("#tb_add_anio option:selected").val() == '-1')) {
                msg.push('Debe seleccionar el a&ntilde;o y la regi&oacute;n para generar un Folio');
            }
            params.enabled = true;
            return { params: params, messages: msg };
        },
        new_user: function() {

        },
        delete_user: function() {

        },
        edit_user: function() {

        },
        hide: function() {
            var obj = this;
            $(obj.mainClass).remove();
            $('.option_item_back').click();
        },
        _create: function() {
            this.buildStructure();
            this.events();
            
        },

        _refresh: function() {
            
            this._trigger("change");
        },

        _destroy: function() {
            this.element.remove();
        },


        _setOption: function(key, value) {
            this.options[key] = value;
            this.options.addExecutive = false;
            switch (key) {
                case "addExecutive":
                    this.options.addExecutive = value;
                    break;
                case "action":
                    this.options.action = value;
                    break;
                case "data":
                    this.options.data = value;
                    this.update();
                    break;

            }
        }
    });
});