define(["validator","connections","restrictions","structure","Alert","dataSelect"], function(validator,connections,restrictions,structure,Alert,dataSelect){
$.widget( "custom.customSubtable", {
	  options:{
                    data:[],
                    addExecutive:false,
                    action:'',
                    fields:{},
                    operations:[]
                    
          },
          FieldsCalculated:{},
          Folio:'',
          Consecutivo:'',
          multiselect:{},
          forms:{},
          dialog:null,
          attachment:{},
	  _init:function(){
                    
	  },
          getTitle:function(opc){
                    var title = '';
                    switch (opc) {
                              case 'new':title='Nuevo usuario';
                                        break;
                              case 'delete':title='Eliminar usuario';
                                        break;
                              case 'edit':title='Editar usuario';
                                        break;
                              case 'consult':title='Consulta de usuario';
                                        break;
                    }
                    return title;
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getSelect:function(i){
                    //id,idSelected,field
                    /*let soloLectura='';
                    if(i.editable && (i.field == 's400_numero_sitio' || i.field == 'numero_arbol')){
                          soloLectura = 'disabled';
                    }*/
                    var user = this.options.userActive;
                    var chain='<select class="selectInput" id="'+i.id+'" datatype="'+i.datatype+'" field="'+i.field+'">';
                    var selected = ' selected="selected" ';
          
                    chain+='<option value="-1" selected="selected">Seleccione una opci&oacute;n</option>';
                    for(var x in i.list.list){
                              var e = i.list.list[x];
                              chain+='<option value="'+e.value+'" '+'>'+e.label+'</option>';
                    }
                    chain+='</select>';
                    return chain;
          },
          getValueSelect:function(list,value){
                    var response='';
                    for(var x in list){
                          if(list[x].value==value){
                              response = list[x].label;
                              break;
                         }   
                    }
                    return response;
          },
          getInput:function(i){
                    if(this.options.action!='consult' && this.options.action!='delete' ){
                          if (i.type=='select' && i.field=='numero_arbol' ) {

                                 amplify.store('dataLista', i.list.list);
                             }
                         }
                    var obj = this;
                    obj.options.fields[i.field]=i;
                    var r = restrictions.roles;
                    var action = this.options.action;
                    i.id = 'sub_add_'+i.field;
                    var readOnly='';
                    if (i.field=='consecutivo') {
                              obj.consecutive = i.value;
                    }

                    let identificarPrograma = this.options.userActive.program;
                    /*
                     * @Description 
                     * Parche que recupera la logitud de 6 en el campo IMA m3 VTA
                     * multiregistro Submuestra 400m2 del programa12               
                     */
                         if(i.field == 'ima' && identificarPrograma == 12){
                                        let numero = i.value;
                                        if(!isNaN(numero) && numero != ''){
                                             i.value = numero.toFixed(6)
                                       }
                         }
                     /*
                      * fin de parche
                      */

                    /*
                     * @Description 
                     * Parche que recupera la logitud de 6 en el campo Volumen (m3 vta.)
                     * multiregistro sitios del programa12               
                     */
                         if(i.field == 'volumen'  && identificarPrograma == 12){
                                        let numero = i.value;
                                        if(!isNaN(numero) && numero != ''){
                                             i.value = numero.toFixed(6)
                                       }
                         }
                     /*
                      * fin de parche
                      */

                      /*
                       * @Description
                       * Issue que recupera el numero de conglomerado en el multiregistro
                       * de s400 al momento de agregar 
                       */
                       if(identificarPrograma == 12 && action=='new' && (i.field == 'num_conglomerado' || i.field=='conglomerado')){
                          i.value = $('#tb_add_num_conglomerado').val().trim()
                       }





                    switch (action) {
                              case 'consult':
                              case 'delete':
                                        readOnly=' readonly ';
                                        break;
                    }
                    if (!i.editable) {
                              readOnly=' readonly ';
                    }
                    var id = ' id="'+i.id+'"';
                    var type = ' type="'+i.type+'"';
                    var datatype = ' datatype="'+i.datatype+'"';
                    var field = ' field="'+i.field+'"';
                    switch (i.type) {
                              case 'multiselect':
                                         var clase =' class="multiselect truncate"';
                              break;
                              case 'form':
                                        var clase =' class="formInput"';
                              break;
                              case 'edit':
                                        var clase =' class="textInput"';
                              break;
                              case 'attach':
                                        var clase =' class="textInput attach"';
                              break;
                              case 'comment':
                                        var clase =' class="textInput comment truncate"';
                              break;
                    }
                    if ((i.type=='select')&&(i.list.list.length==0)) {
                             clase =' class="textInput"';
                    }
                    if ((i.type=='select')&&(readOnly!='')) {
                              clase =' class="textInput"';
                              i.value = (i.list.list.length==0)?i.value:obj.getValueSelect(i.list.list,i.value);
                    }
                    var value = ' value="'+((typeof i.value === "undefined")?'':i.value)+'"'; 
                    var maxLength = (i.maxLength)?' maxlength="'+i.maxLength+'"':'';
                    var minLength = (i.minLength)?' minlength="'+i.minLength+'"':'';
                    var data = id+field+type+datatype+value+maxLength+minLength+clase+readOnly;
                    
                    var input = '';
                    if ((i.type=='select')&&(readOnly=='')) {
                              if (i.list.list.length>0) {
                                        input = this.getSelect(i);
                              }else{
                                        input = '<input '+data+' />';
                              }
                    }else{
                              switch (i.type) {
                                        case 'multiselect':
                                                  //E.Zamora 07/06/12
                                                   if((i.value !="undefined") || (i.value !="")){
                                                  var valor=i.value.split(",");
                                                  var cont=0;
                                                  var pusher=[];

                                                                for(var x in i.list.list){
                                                                while(i.list.list[x].value==valor[cont]){
                                                                 respon=i.list.list[x].label;
                                                                 pusher.push(respon);
                                                                 cont++
                                                                }
                                                                      }

                                                  }
                                                  if (pusher.length <=0) {
                                                       pusher="De clic para seleccionar";
                                                  }
                                                  input = '<div '+data+'>'+pusher+'</div>';
                                                  obj.multiselect[i.field]=i;
                                        //E.Zamora 07/06/12
                                        break;
                                        case 'form':
                                                  input =   '<div '+data+'>De clic para agregar'+
                                                                      '<div class="records">4 Registros</div>'+
                                                            '</div>';
                                                  
                                                  obj.forms[i.field]=i;
                                        break;
                                        case 'select':
                                        case 'edit':
                                                  input = '<input '+data+' />';
                                        break;
                                        case 'attach':
                                                  input = '<input '+data+' />';
                                                  switch (obj.options.action) {
                                                            case 'new':
                                                            case 'edit':
                                                                      var estilo = (i.value=='')?' style="display:none" ':'';
                                                                      input+='<div '+estilo+'  class="image_delete"><div class="template_custom_subtable_image scti_close"></div></div>';
                                                            break;
                                                            case 'delete':
                                                            case 'consult':
                                                                      var estilo = (i.value=='')?' style="display:none" ':'';
                                                                        if (i.datatype == "pdf") {
                                                                           input+='<div '+estilo+' class="image_icon" field="'+i.field+'"><div class="range-logo"><a href="#"></a></div></div>';
                                                                      }else{ 
                                                                       input+='<div '+estilo+' class="image_icon" title="De clic para ver la imagen" field="'+i.field+'"><div class="template_custom_subtable_image scti_image"></div></div>';
                                                                      }

                                                            break;
                                                  }                  
                                        break;
                                        case 'comment':
                                                  input = '<input '+data+' />';
                                        break;
                              }
                    }
                    var chain = '<div class="Field" id="field_'+i.id+'"><div class="label">'+i.label+'</div>'+input+'</div>';
                    return chain;
          },
          getButton:function(action){
                    var buttons=[];
                    switch (action) {
                              case 'new':
                                        buttons=[
                                                 {label:'Aceptar',action:action},
                                                 {label:'Cancelar',action:'cancel'}
                                        ];
                                        break;
                              case 'delete':
                                        buttons=[
                                                 {label:'Aceptar',action:action},
                                                 {label:'Cancelar',action:'cancel'}
                                        ];
                                        break;
                              case 'edit':
                                        buttons=[
                                                 {label:'Aceptar',action:action},
                                                 {label:'Cancelar',action:'cancel'}
                                        ];
                                        break;
                              case 'consult':
                                        buttons=[
                                                 {label:'Aceptar',action:'cancel'}
                                        ];
                                        break;
                              
                    }
                    var chain='';
                    for(var x in buttons){
                              var b = buttons[x];
                              chain+= '<button class="textButton" id="'+b.action+'_subtable">'+b.label+'</button>';
                    }
                    
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options;
                    obj.multiselect=null;
                    obj.multiselect={};
                    obj.forms=null;
                    obj.forms={};
                    var chain='<div class="background_subtable">';
                    obj.options.fields=null;
                    obj.options.fields={};
                    //chain +='<div class="row">';
                    var contador=0;
                    for(var x in o.data){
                              //chain+=obj.getInput(o.data[x]) ;
                              if (contador==2) {
                                    contador=0;
                              }
                              if(contador==0){chain +='<div class="row">';}
                              chain+='<div class="col s12 m6 l6">'+obj.getInput(o.data[x])+'</div>';
                              if (o.data[x].field=='folio') {
                                        obj.Folio=o.data[x].value;
                              }
                              if (o.data[x].field=='consecutivo') {
                                        obj.Consecutivo=o.data[x].value;
                              }
                              if((contador==1)||((o.data.length-1)==x)){chain+='</div>';}
                              contador+=1;
                    }

                    chain+='<div class="ButtonSection" align="center">';
                    chain+=obj.getButton(o.action);
                    chain+='</div>';
                    chain+='</div>';
                    
                    $(".background_subtable").remove();
                    
                    this.element.append(chain);
                    obj.addDialog();
	  },
          addDialog:function() {
                    var chain = '<div id="dialog-image-multi" title="Create new user">'+
                              '<p class="validateTips">All form fields are required.</p>'+
                             '<div>informacion</div>'+
                    '</div>';
                    this.element.append(chain);
          },
          eventScrolling:function(){
                    $(window).scroll(function() {
                              if ($(this).scrollTop() > 0) {
                                  // apply effects and animations
                              }
                    });    
          },
          remove:function(){
                    //$(".form_message").remove();
                    $(".app_selected").html('');
          },
          showMessage:function(msg,type,event){
                    var obj=this;
                    var typeMessage='type_'+type;
                    
                    var messages='';
                    for(var x in msg){
                              messages+='<div class="item_error">'+msg[x]+'</div>';
                    }
                    var chain = '<div class="form_message_veil"></div>'+
                                '<div class="form_message">'+
                                        '<div class="header '+typeMessage+'">'+
                                                  '<div class="close"><div class="template_custom_subtable_close" type="'+type+'"></div></div>'+
                                                  '<div class="label">Mensaje</div>'+
                                        '</div>'+
                                        '<div class="container">'+
                                                  messages+
                                        '</div>'+
                                        
                              '</div>';
                    $(".form_message").remove();
                    $("body").append(chain);
                    $(".form_message .close").click(function(){
                              if (type=="info") {
                                        $(".icon_search").click();
                                        obj.hide();
                              }
                              $(".form_message,.form_message_veil").remove();
                    })
          },
          
          request : function(params){
                    
                    obj=this;
                    var action = obj.options.action;
                    var idDiv  = obj.element.attr('id'); 
                    params = (params)?params:{};
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        switch (obj.options.action) {
                                                  case 'delete':
                                                            //obj.showMessage(['Usuario eliminado satisfactoriamente'],'info');
                                                            
                                                            $('body').multirecords('closeWindow');
                                                            $('body').multirecords('updateRecordList');
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['Registro eliminado satisfactoriamente'],
                                                                      buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide();$(".app_"+obj.options.module).search('reset');}}]
                                                            });
                                                            //mostrar ventana y cerrar formulario
                                                            
                                                            break;
                                                  case 'new':
                                                            //Victor Porcayo Altamirano
                                                          
                                                            msg=json.response.message;
                                                            if(msg=='Datos guardados correctamente'){
                                                                Alert.show({
                                                                    title:'Notificaci&oacute;n',
                                                                    type:'notification',
                                                                    messages:['El registro se ha agregado satisfactoriamente'],
                                                                    buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide();$(".app_"+obj.options.module).search('reset');}}]
                                                                }); 

                                                                 $('body').multirecords('closeWindow');
                                                                 $('body').multirecords('updateRecordList');
                                                            }else{
                                                                 Alert.error({
                                                                           title:'Notificaci&oacute;n',
                                                                           type:'error',
                                                                           messages:[msg],
                                                                           buttons:[{label:'Cerrar'}]
                                                                 });
                                                            };
                                                            //Victor Porcayo Altamirano
                                                            break;
                                                            
                                                  case 'edit':
                                                            //obj.showMessage(['El usuario ha sido editado satisfactoriamente'],'info');
                                                            $('body').multirecords('closeWindow');
                                                            $('body').multirecords('updateRecordList');
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El registro ha sido editado satisfactoriamente'],
                                                                      buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide();$(".app_"+obj.options.module).search('reset');}}]
                                                            });
                                                           
                                                            //mostrar ventana y cerrar formulario
                                                            break;
                                                  
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                        
                                        Alert.error({
                                             title:'Notificaci&oacute;n',
                                             type:'error',
                                             messages:[msg],
                                             buttons:[{label:'Cerrar'}]
                                        });
                              }
                                
                            },
                            beforeSend: function(xhr) {
                                //xhr.withCredentials = true;
                                //$(aditional.btn).addClass(clase);
                                //$(aditional.spinner).removeClass(clase);
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        Alert.error({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                //$(aditional.btn).removeClass(clase);
                                //$(aditional.spinner).addClass(clase)
                                
                                
                            }
                            };
                    var source='';
                    var folio = obj.options.folio;
                    var name = obj.options.subtable;
                    var consecutivo = obj.consecutive;
                    switch (action) {
                              case 'new':source = connections.multirecords.add;
                                        //Victor Porcayo Altamirano
                            if(document.getElementById( "sub_add_cantidad") && (obj.options.userActive.program== '8')) {
                                var campoCantidad = document.getElementById("sub_add_cantidad").value;
                                var campoDependencia = document.getElementById("sub_add_dependencia").value;
                                if ((campoCantidad.length == 0) || (campoDependencia == -1)) {
                                    Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:'error',
                                        messages:['Llena todos los campos'],
                                        buttons:[{label:'Cerrar'}]
                                    });
                                }else{
                                    r = $.extend(r, source);
                                    r.data ={action:'add',name:name,folio:folio,user:obj.options.userActive.id,json:JSON.stringify(params)};
                                }
                            }else{
                                r = $.extend(r, source);
                                r.data = {action:'add',name:name,folio:folio,user:obj.options.userActive.id,json:JSON.stringify(params)};
                            }
                            break;
                            //Victor Porcayo Altamirano 
                              case 'edit':source=connections.multirecords.edit;
                                        r = $.extend(r, source);
                                        r.data = {action:'set',user:obj.options.userActive.id,name:name,folio:folio,consecutivo:consecutivo,json:JSON.stringify(params)};
                                        //r.url=r.url+'&name='+name+'&folio='+folio+'&consecutivo='+consecutivo+'&json='+JSON.stringify(params);
                                        break;
                              case 'delete':
                                        source=connections.multirecords.del;
                                        r = $.extend(r, source);
                                        //r.data = params;
                                        r.url=r.url+'&name='+name+'&folio='+folio+'&consecutivo='+consecutivo+'&user='+obj.options.userActive.id;
                                        //r.url=r.url+'&folio='+params.folio;
                                        break;
                    }
                    /*
                    r.xhrFields= {withCredentials: true};	    
                    r.crossDomain= true;
                    r.username=dataUsers.username;
                    r.password=dataUsers.password;
                    */
                    //if ((action!='delete')&&(action!='edit')) {
                    //          r.data=JSON.stringify(params);
                    //}
                   
                    $.ajax(r);
            },
          updateMultiSelect:function(id,data){
                    var obj = this;
                    obj.multiselect[id] = data;
                    var valores = [];
                    var labels = [];
                    for(var x in data.list.list){
                              var i = data.list.list[x];
                              if (i.selected) {
                                       valores.push(i.value);
                                       labels.push(i.label);
                              }
                    }
                    var value = (labels.length==0)?'De clic para seleccionar':labels.join(', ');
                    $("#sub_add_"+id).html(value);
                    $("#sub_add_"+id).attr('value',valores.join(','));
          },
          events:function(){
                    var obj = this;
                    var o = this.options.data;
                    for(var x in o.buttons){
                              var event = null;
                              if (x=='cancel') {
                                    event = obj.hide;
                                    
                              }else{
                                    event = o.buttons[x].event;   
                              }
                              $("#"+x+"_subtable").click(function(){
                                        event();
                              });    
                    }
                    obj.eventScrolling();
                    $(".back_users").click(function(){
                              $(".background_subtable").remove();
                    });
                    $(".background_subtable .Field .textInput").each(function(){
                              $(this).focus(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    $(".background_subtable .Field .selectInput").each(function(){
                              $(this).change(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    $(".background_subtable .Field .formInput").each(function(){
                              $(this).click(function(){
                                        $(this).removeClass('badInput');
                                        var field = $(this).attr('field');
                                        var label = $(this).prev().html();
                              });
                    });
                    
                    $(".background_subtable .Field .multiselect").each(function(){
                              $(this).click(function(){
                                        $(this).removeClass('badInput');
                                        var id = $(this).attr('id').replace('sub_add_','');
                                        var parent = obj.options.source;
                                        $(this).multiselect({data:{id:id,info:obj.multiselect[id],item:this.element,parent:parent,section:'subtable'}});
//E.Zamora
                    if ((obj.options.action=='edit')||(obj.options.action=='consult')) {
                
                         var valor =$("#sub_add_"+id).attr("value");
                             if (valor !="") {
                                  if (valor.indexOf(",")!= -1) {
                                   arr= valor.split(",");

                                        for(var x in arr){
                                         var i = arr[x];
                                         var s=$('input[value="'+i+'"]').attr("value");
                                         var f=$('input[value="'+i+'"]').attr("id");
                                        if (s==i) {
                                        $('input[value="'+i+'"]').attr("checked","checked");
                                         }  
                                     }

                                  }
                                   
                               }

                    }
   //E. Zamora el troll 
                                        
                              });
                    });
                    //Victor Porcayo Altamirano                    
                    $(document).ready(function () {
                        var selectToSort = jQuery('#sub_add_genero_producto');
                        var optionActual = selectToSort.val();
                        selectToSort.html(selectToSort.children('option').sort(function (a, b) {
                            return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
                        })).val(optionActual);
                    });
                    //Victor Porcayo Altamirano
                    $( "#sub_add_s400_numero_sitio" ).change(function() {
                          if(this.options.action!='consult' && this.options.action!='delete' ){
                         var data = amplify.store('dataLista');
                         //alert(JSON.stringify(data));
                         var sitio = $("#sub_add_s400_numero_sitio");
                         var arbol = $("#sub_add_numero_arbol");
                         arbol.find("option").remove();
                         arbol.append("<option value='-1' selected='selected'>Seleccione una opción</option>");
                         $.each(data, function(index,data) {
                              var value = (data.value).split('-');
                              if (sitio.val() == value[0]) {
                                   arbol.append("<option value="+data.value+">"+data.label+"</option>");
                              }                               
                         });
                      }
                    });

                    $("#sub_add_s400_edad").keyup(function(){
                         if(obj.options.action!='consult' && obj.options.action!='delete' ){ 
                              var params={folio: $("#sub_add_folio").val(), sitio: $("#sub_add_s400_numero_sitio option:selected").text(), arbol:$("#sub_add_numero_arbol option:selected").text()};
                              obj.getVolumenArbol(params);      
                        }
                        //alert(JSON.stringify(params));
                    });
                    $("#sub_add_area_corta").change(function(){
                         //alert("area de corta");
                         var params={folio: $("#sub_add_folio").val(), areaCorta: $("#sub_add_area_corta").val()};
                         //alert(JSON.stringify(params));
                         obj.getAnioAreaCorta(params);
                    });

                    $("#sub_add_entidad_federativa").change(function(){
                         //alert("estado");
                         var params={id_estado: $("#sub_add_entidad_federativa").val()};
                         obj.getListMunicipios(params);
                    });
                                         
                    $("#cancel_subtable").click(function(){
                              obj.hide();
                              if (obj.options.action=='new') {
                                        $(".sectionItem_selected").removeClass('sectionItem_selected');
                              }else{
                                        $(".app_"+obj.options.module).search('reset');
                              }
                              $('body').multirecords('closeWindow');
                    });
                    $("#new_subtable,#edit_subtable").click(function(){
                              var a = obj.validateAddUser();
			      if (a.messages.length==0) {
                                        if (obj.options.action=='edit') {
                                                  a.params['id']=obj.options.data.id;
                                        }
					obj.request(a.params);
                                        for(var x in obj.attachment){
                                                  var i = obj.attachment[x];
                                                  var field = x+'';
                                                  field = field.replace('sub_add_','');
                                                  field=field.replace('_file','');
                                                  i.formData = { action:'set',user: obj.options.userActive.id,folio: obj.Folio,consecutivo:obj.Consecutivo,field:field};
                                                  i.submit();
                                        }
                                       
                                        



                                         if(obj.options.userActive.program==7 && $("#sub_add_num_combatientes").length>0 )
                                        {                    
                                        //codigo Mike Martínez Obtiene el numero total de combatientes para el programa de incendios
                                        //17/06/2016
                                         var params= {anio:'combatientes',region:obj.Folio};                 
                                         setTimeout(function(){obj.requestNumCombatientes(params)},3000);
                                        //Fin codigo Mike 
                                         }
                                       /*ini rubi*/           
                       if(obj.options.userActive.program==2)
                       {                    
                            
                            setTimeout(function(){var params= {anio:'totalmujeres',region:obj.Folio};                 
                                                  obj.requestNumMujeres(params)},2000);
                                           
                          var params= {anio:'totalhombres',region:obj.Folio};                 
                         setTimeout(function(){obj.requestNumHombres(params)},1000);
                          }

                               if(obj.options.userActive.program==8 )
                                        {                    
                                        //codigo Mike Martínez Obtiene el numero total de combatientes para el programa de incendios
                                        //17/06/2016
                                         var params= {folio:obj.Folio};                 
                                         obj.totalVehiculosRevisados(params);
                                        //Fin codigo Mike 
                                         }

                       /* fin rubi */      

			      }else{
					
                                        
                                         Alert.error({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:a.messages,
                                                  buttons:[{label:'Cerrar'}]
                                        });
			      }

                     
                    });
                    $("#delete_subtable").click(function(){
                               Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:'notification',
                                        messages:['&iquest;Realmente desea eliminar este registro?'],
                                        buttons:[
                                                  
                                                  {label:'Si',event:function(){
                                                            obj.request({action:"delete",folio:obj.options.data[0].value});
                                                  }},
                                                  {label:'No'},
                                                  ]
                              });
                              
                    });
                    //$("#fm_add_rol").selectmenu();
                    $(".background_subtable .selectInput").each(function(){
                              var field = $(this).attr('field');
                              if ((typeof(obj.options.fields[field])!='undefined')&&(obj.options.action!='new')) {
                                        //$(this).val(obj.options.fields[value].value);
                                        var valor = parseInt(obj.options.fields[field].value);
                                        if (valor>0) {
                                                  $(this).val(obj.options.fields[field].value);
                                        }
                              }
                              
                             
                    });
                    if (obj.options.action=='new') {
                              $("#fm_add_rol").change(function(){
                                        var value = $("#fm_add_rol option:selected").val();
                                        if (value=='2'){
                                                  $("#field_fm_add_privacy").hide();
                                        }else{
                                                  $("#field_fm_add_privacy").show();
                                        }
                              });
                    }
                    
                      $(".background_subtable input[datatype='numeric']").keydown(function(evt) {
                                   if ($.inArray(evt.keyCode, [46, 8, 9, 27, 13]) !== -1 || (evt.keyCode >= 35 && evt.keyCode <= 40)) {
                                        return;
                                   }
                           
                                   if ((evt.shiftKey || (evt.keyCode < 48 || evt.keyCode > 57)) && (evt.keyCode < 96 || evt.keyCode > 105)) {
                                   evt.preventDefault();
                                      var otherresult = 12;
                                        if(window.event != undefined){
                                              otherresult = window.event.keyCode;
                                        }
                                        var charCode = (evt.which) ? evt.which : otherresult;  
                                        var keyChar = String.fromCharCode(charCode);
                                        var keyChar2 = keyChar.toLowerCase();
                                        var re =   /^(-)?(\d*)$/
                                        var result = re.test(keyChar2);
                                        return result;                               
                                     }   
                    }).bind("paste",function(event){
                              var item = $(this);
                              setTimeout(function(){
                                        var value = item.val();
                                        var re =   /^(-)?(\d*)$/
                                        var result = re.test(value);
                                        if (!result) {
                                              item.val('');
                                        }
                              },100);
                              
                    });
                    /* $(".background_subtable input[datatype='real']").keydown( function(evt) {
                         if ($.inArray(evt.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 || (evt.keyCode >= 35 && evt.keyCode <= 40)) {
                                        return;
                                   }
                                      var otherresult = 12;
                                        if(window.event != undefined){
                                              otherresult = window.event.keyCode;
                                        }
                                        var charCode = (evt.which) ? evt.which : otherresult;  
                                        var keyChar = String.fromCharCode(charCode);
                                        var keyChar2 = keyChar.toLowerCase();
                                        var re =   /^(-)?(\d*)(\.?)(\d*)$/
                                        var result = re.test(keyChar2);
                                        var item = $(this);
                                        var maxDecimals = parseInt(item.attr('minlength'));
                                        setTimeout(function(){
                                                  var value = item.val();
                                                  var result = re.test(value);
                                                  if (maxDecimals) {
                                                            var cadena = value+'';
                                                            cadena = cadena.split('.');
                                                            if (cadena[1]) {
                                                                     if (cadena[1].length>maxDecimals) {
                                                                                result=false;
                                                                      } 
                                                            }
                                                  }
                                                  if (!result) {
                                                            value = value.substring(0,value.length-1);
                                                            item.val(value);
                                                  }
                                                  
                                        },100);
                                        return result;                               
                    }).bind("paste",function(event){
                              var item = $(this);
                              var maxDecimals = parseInt(item.attr('minlength'));
                              setTimeout(function(){
                                        var value = item.val();
                                        var re =   /^(-)?(\d*)(\.?)(\d*)$/
                                        var result = re.test(value);
                                        if (maxDecimals) {
                                                            var cadena = value+'';
                                                            cadena = cadena.split('.');
                                                            if (cadena[1]) {
                                                                     if (cadena[1].length>maxDecimals) {
                                                                                result=false;
                                                                      } 
                                                            }
                                        }
                                        if (!result) {
                                              item.val('');
                                        }
                              },100);
                              
                    });*/
                    if ((obj.options.action=='new')||(obj.options.action=='edit')) {
                              $( ".background_subtable input[datatype='date']").bind("keypress", function(evt) {
                                        return false;
                              }).bind("paste",function(event){
                                        return false;
                              }).datepicker({
                                  yearRange: "-120:+120",
                                  changeMonth: true,
                                  changeYear: true
                              });
                    }
                    $(".background_subtable .Field .comment").each(function(){
                              
                              $(this).click(function(){
                                        $(this).removeClass('badInput');
                                        var field = $(this).attr('field');
                                        var id = $(this).attr('id');
                                        var value = $(this).val();
                                        var label = obj.options.fields[field].label;
                                        var maxLength = $(this).attr('maxlength');
                                        var dataType = $(this).attr('datatype');
                                        var params = {
                                                  field:field,
                                                  idInput:id,
                                                  label:label,
                                                  text:value,
                                                  mode:obj.options.action,
                                                  maxlength:maxLength,
                                                  dataType:dataType
                                        }
                                        $(this).textArea({data:params});
                              });
                             
                    });
                    $(".background_subtable input[datatype='alphanumeric']").bind("keypress", function(evt) {
                                      var otherresult = 12;
                                        if(window.event != undefined){
                                              otherresult = window.event.keyCode;
                                        }
                                        var charCode = (evt.which) ? evt.which : otherresult;  
                                        var keyChar = String.fromCharCode(charCode);
                                        var keyChar2 = keyChar.toLowerCase();
                                        var re =   /^[a-z0-9 ]+$/i
                                        var result = re.test(keyChar2);
                                        return result;                               
                    }).bind("paste",function(event){
                              return false;
                              
                    });
                     /* E. Zamora El troll */
                    $("#sub_add_nombre_cientifico").change(function(){
                         var cambio = $("#sub_add_nombre_cientifico option:selected").val();
                        $("#sub_add_nombre_comun").val(cambio);
                    });
                   if(obj.options.userActive.program==12)
                     {
                         $("#sub_add_especie").change(function(){
                              var cambio = $("#sub_add_especie option:selected").val();
                             $("#sub_add_nombre_comun").val(cambio);
                         });
                    }
                    $("#sub_add_region").change(function(){
                         var value=$("#sub_add_region option:selected").val();
                         if(value!=-1){
                             obj.recuperar_municipio(value,obj.options.data);
                         }
                    });
/* E. Zamora El troll */
/* E. Zamora El troll 08/06/16*/
$("#sub_add_nacionalidad").change(function(){
     var value= $("#sub_add_nacionalidad option:selected").val();
     if (value != "127") {
          $("#sub_add_entidad_federativa_nacimiento").find("option[value!='-1']").hide();
     }else{
          $("#sub_add_entidad_federativa_nacimiento").find("option").show(); 
     }
});
/* E. Zamora El troll  08/06/16*/
/*E. Zamora El troll */
 function get_result(grupo,diametro,altura){
          var dm=parseFloat(diametro);
          var alt=parseFloat(altura);
          var result=0;
          switch(grupo){

               case "1":
               var A1=-9.7753;
               var A2=2.04668;
               var A3=0.81083;
               op=Math.exp(A1+A2*Math.log(dm)+A3*Math.log(alt));
               if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }
          
               break;
               case "2":
               var A1=-10.024;
               var A2=2.06319;
               var A3=0.86404;
          op=Math.exp(A1+A2*Math.log(dm)+A3*Math.log(alt));
           if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }
               break;
               case "3":
               var A1=-9.718;
               var A2=1.78606;
               var A3=1.08051;
          op=Math.exp(A1+A2*Math.log(dm)+A3*Math.log(alt));
           if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }           
               break;
               //Grupo Cedro 7
               case "7":
               var A1=-9.5382;
               var A2=1.74008;
               var A3=1.04811;
          op=Math.exp(A1+A2*Math.log(dm)+A3*Math.log(alt));
           if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }             
               break;
               //Grupo Encino 4 
               case "4":
               var A1=-9.3433;
               var A2=2.49335;
               var A3=0.15563;
          op=Math.exp(A1+A2*Math.log(dm)+A3*Math.log(alt));
           if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }             
               break;
               //Grupo Encino 5
               case "5":
               var A1=-9.7852;
               var A2=2.19788;
               var A3=0.63077;
          op=Math.exp(A1+A2*Math.log(dm)+A3*Math.log(alt));
           if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }               
               break;
               //Grupo Hojosas
               case "6":
               var A1=-9.3156;
               var A2=2.38434;
               var A3=0.16699;
          op=Math.exp(A1+A2*Math.log(dm)+A3*Math.log(alt));
          if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }          
               break;
               //OP 2
               case "8":
               var A1=0.0499209196;
               var A2=0.0075142954;
               var A3=0.0007790664;
          op=A1-(A2*dm)+(A3*(dm*dm));
           if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }              
               break;                                                                           
               case "9":
               var A1=0.0182174950;
               var A2=0.0005511975;
               var A3=0.0044994699;
              op=A1+(A2*(dm*dm))+(A3*alt);
              if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }               
               break;
               case "10":
               var A1=0.1197576146;
               var A2=0.0154234440;
               var A3=0.0009424744;
          op=A1-(A2*dm)+(A3*(dm*dm));
          if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }                  
               break;
               case "11":
               var A1=-0.0059160;
               var A2=0.0006014;
               var A3=0.0046020;
          op=A1+(A2*(dm*dm)+A3*(alt));
          if(!isNaN(op) && op != ''){
                    result=op.toFixed(6);
               }else{
                    result = 0
               }  
               break;
          }
          return result;
     }
$("#sub_add_grupo_especies").change(function(){
     var valor= $("#sub_add_grupo_especies option:selected").val();
   
                                   
     var alt=$("#sub_add_altura_promedio").val();
     var dm=$("#sub_add_diametro_promedio").val();
     var result=0;
     if(alt=="undefined" || alt==null || alt==" " || alt=="" ){
               alt=0;
          }

     if(valor!="undefined"){
          if(dm==""){
               dm=0;
          }
          if(alt==""){
               alt=0;
          }

          result= get_result(valor,dm,alt);

      $("#sub_add_volumen").val(result) ;   
     }      
});
$("#sub_add_diametro_promedio").keyup(function(){
     
 var valor= $("#sub_add_grupo_especies option:selected").val();
   
     var alt=$("#sub_add_altura_promedio").val();
     var dm=$("#sub_add_diametro_promedio").val();
     var result=0;
     if(alt=="undefined"){
               alt=0;
          }

     if(valor!="undefined"){
          if(dm==""){
               dm=0;
          }
          if(alt==""){
               alt=0;
          }
          result= get_result(valor,dm,alt);

      $("#sub_add_volumen").val(result) ;   
     }      
});


$("#sub_add_altura_promedio").keyup(function(){
    
     var valor= $("#sub_add_grupo_especies option:selected").val();
   
     var alt=$("#sub_add_altura_promedio").val();
     var dm=$("#sub_add_diametro_promedio").val();
     var result=0;
     if(alt=="undefined"){
               alt=0;
          }

     if(valor!="undefined"){
          if(dm==""){
               dm=0;
          }
          if(alt==""){
               alt=0;
          }
          result= get_result(valor,dm,alt);
          
      $("#sub_add_volumen").val(result);   
     }      
});
/*E. Zamora */
                    obj.FieldsCalculated=null;
                    obj.FieldsCalculated={};
                    obj.FieldsRequest=[];
                    obj.FieldsRequest={};
		    obj.createCalculatedFields(obj.options.operations);
                    obj.createCalculatedFields(obj.options.operations);
                    obj.attachEvents();


$( "#sub_add_tipo_producto" ).change(function() {
                                      var idCategoria=$("#sub_add_tipo_producto").val();
                                                  obj.requestSubcategoria(idCategoria);

                                           });
                      

if (obj.options.userActive.program == '1')
    {
    
$("#tb_add_volumen_posibilidad").number(true, 3);
//$("#sub_add_volumen_existencias_reales").number(true, 3);
$("#sub_add_volumen_residual").number(true, 3);
$("#sub_add_volumen_1residual_rodal").number(true, 3);
$("#sub_add_volumen_2posibilidad_rodal").number(true, 3);
//$("#sub_add_superficie_rodal_hectareas").number(true, 3);
//$("#sub_add_volumen_infraestructura").number(true, 3);
//$("#sub_add_ic_propuesta").number(true, 2);
//$("#sub_add_ica").number(true, 3);

     
$("#sub_add_volumen_existencias_reales").keyup(function(){
                                        var volExistenciaReales=$("#sub_add_volumen_existencias_reales").val(); 
                                        var icPropuesta=$("#sub_add_ic_propuesta").val();   

                                        if(volExistenciaReales!=''&& icPropuesta!='')
                                         {
                                         var total=parseFloat(volExistenciaReales)*(parseFloat(icPropuesta)/100);
                                         document.getElementById("sub_add_volumen_posibilidad").value = total.toFixed(3); 
                                         var residual=parseFloat(volExistenciaReales)-parseFloat(total);
                                         document.getElementById("sub_add_volumen_residual").value = residual.toFixed(3); 
                                       
                                       var volPosibilidad=$("#sub_add_volumen_posibilidad").val(); 
                                        var hectareas=$("#sub_add_superficie_rodal_hectareas").val();   

                                        if(volPosibilidad!=''&& hectareas!='')
                                         {
                                         var total2=parseFloat(volPosibilidad)*parseFloat(hectareas);
                                         document.getElementById("sub_add_volumen_2posibilidad_rodal").value = total2.toFixed(3); 

                                         var volPosibilidad=$("#sub_add_volumen_2posibilidad_rodal").val(); 
                                        var infraestructura=$("#sub_add_volumen_infraestructura").val();   

                                        if(volPosibilidad!=''&& hectareas!='')
                                         {
                                         var total3=parseFloat(volPosibilidad)+parseFloat(infraestructura);
                                         document.getElementById("sub_add_volumen_1posibilidad_total").value = total3.toFixed(3); 
                                        }
                                        }

                                       


                                        }


                                        var hect=$("#sub_add_superficie_rodal_hectareas").val();    
 
                                              if(hect!='')
                                            {
                                             var total4=parseFloat($("#sub_add_volumen_residual").val())*parseFloat(hect);
                                             document.getElementById("sub_add_volumen_1residual_rodal").value = total4.toFixed(3); 

                                            }




                                         var hect=$("#sub_add_superficie_rodal_hectareas").val();    
 
                                              if(hect!='')
                                            {
                                             var total4=parseFloat($("#sub_add_volumen_existencias_reales").val())*parseFloat(hect);
                                             document.getElementById("sub_add_volumen_1existencias_reales_rodal").value = total4.toFixed(3); 

                                            }
                                       });


$("#sub_add_ic_propuesta").keyup(function(){
                                        var volExistenciaReales=$("#sub_add_volumen_existencias_reales").val(); 
                                        var icPropuesta=$("#sub_add_ic_propuesta").val();   
                                        if(volExistenciaReales!=''&& icPropuesta!='')
                                         {
                                         var total=parseFloat(volExistenciaReales)*(parseFloat(icPropuesta)/100);
                                         document.getElementById("sub_add_volumen_posibilidad").value = total.toFixed(3); 
                                         var residual=parseFloat(volExistenciaReales)-parseFloat(total);
                                         document.getElementById("sub_add_volumen_residual").value = residual.toFixed(3); 
                                       
                                        var volPosibilidad=$("#sub_add_volumen_posibilidad").val(); 
                                        var hectareas=$("#sub_add_superficie_rodal_hectareas").val();   

                                        if(volPosibilidad!=''&& hectareas!='')
                                         {
                                         var total2=parseFloat(volPosibilidad)*parseFloat(hectareas);
                                         document.getElementById("sub_add_volumen_2posibilidad_rodal").value = total2.toFixed(3); 

                                        var volPosibilidad=$("#sub_add_volumen_2posibilidad_rodal").val(); 
                                        var infraestructura=$("#sub_add_volumen_infraestructura").val();   

                                        if(volPosibilidad!=''&& infraestructura!='')
                                         {
                                         var total3=(parseFloat(volPosibilidad))+(parseFloat(infraestructura));
                                         document.getElementById("sub_add_volumen_1posibilidad_total").value = total3.toFixed(3); 
                                        }
                                        }


                                        }

                                         var hect=$("#sub_add_superficie_rodal_hectareas").val();    
 
                                              if(hect!='')
                                            {
                                             var total4=parseFloat($("#sub_add_volumen_residual").val())*parseFloat(hect);
                                             document.getElementById("sub_add_volumen_1residual_rodal").value = total4.toFixed(3); 

                                            }

                                       });

$("#sub_add_superficie_rodal_hectareas").keyup(function(){
                                        var volPosibilidad=$("#sub_add_volumen_posibilidad").val(); 
                                        var hectareas=$("#sub_add_superficie_rodal_hectareas").val();   

                                        if(volPosibilidad!=''&& hectareas!='')
                                         {
                                         var total=parseFloat(volPosibilidad)*parseFloat(hectareas);
                                         document.getElementById("sub_add_volumen_2posibilidad_rodal").value = total.toFixed(3); 

                                         var volPosibilidad=$("#sub_add_volumen_2posibilidad_rodal").val(); 
                                        var infraestructura=$("#sub_add_volumen_infraestructura").val();   

                                        if(volPosibilidad!=''&& infraestructura!='')
                                         {
                                         var total2=parseFloat(volPosibilidad)+parseFloat(infraestructura);
                                         document.getElementById("sub_add_volumen_1posibilidad_total").value = total2.toFixed(3); 

                                        }

                                        }
                                        var volExistenciaReales=$("#sub_add_volumen_existencias_reales").val();    
 
                                              if(volExistenciaReales!='')
                                            {
                                             var total3=parseFloat(volExistenciaReales)*parseFloat(hectareas);
                                             
                                             document.getElementById("sub_add_volumen_1existencias_reales_rodal").value = total3.toFixed(3); 

                                            }

                                            var volResidual=$("#sub_add_volumen_residual").val();    
                                               if(volResidual!='')
                                            { 
                                             var total4=parseFloat(volResidual)*parseFloat(hectareas);
                                             document.getElementById("sub_add_volumen_1residual_rodal").value=total4.toFixed(3);

                                            }
                                       });

$("#sub_add_volumen_infraestructura").keyup(function(){
                                        var volPosibilidad=$("#sub_add_volumen_2posibilidad_rodal").val(); 
                                        var infraestructura=$("#sub_add_volumen_infraestructura").val();   

                                        if(volPosibilidad!=''&& infraestructura!='')
                                         {
                                         var total=parseFloat(volPosibilidad)+parseFloat(infraestructura);

                                         document.getElementById("sub_add_volumen_1posibilidad_total").value = total.toFixed(3); 
                                        }
                                       });







    }


                                       

},
          createRequestEventsFields:function(data){
                    var obj=this;
                    for(var x in data){
                              var i = data[x];
                              var fields = obj.getFieldsToCalculate(i.operation);
                              for(var y in fields){
                                        var f = fields[y];
                                        if (!obj.FieldsRequest[f]) {
                                                  obj.FieldsRequest[f]=[];
                                        }
                                        obj.FieldsRequest[f].push({fields:fields,destiny:i.destiny,typeDestiny:i.datatype,service:i.service,clean:i.clean});
                                        $("#sub_add_"+f).change(function(){
                                                  var field = $(this).attr('field');
                                                  var value =$("#sub_add_"+field+" option:selected").val();
                                                  if (value!='-1') {
                                                            for(var a in obj.FieldsRequest[field]){
                                                                      var e = obj.FieldsRequest[field][a];
                                                                      obj.makeRequest(e);  
                                                            }
                                                          
                                                  }
                                        });
                              }
                    }
          },
isImage:function(name){
                    var valid = false;
                    name=name.toLowerCase();
                    var typeValid = ['png','gif','jpeg','jpg','pdf'];
                    for(var x in typeValid){
                              var i = typeValid[x];
                              if (name.indexOf('.'+i)!=-1) {
                                        valid = true;
                                        break;
                              }
                    }
                    return valid; 
          },
          attachEvents:function(){
                    var obj=this;
                    obj.attachment=null;
                    obj.attachment={};
                    var serviceUpload = connections.image.upload.url;
                    $(".background_subtable .attach").each(function(){
                              var id = $(this).attr('id');
                              $(this).attr('placeholder','De clic para seleccionar');
                              ////////////////////////
                              if ((obj.options.action!='consult')&&(obj.options.action!='delete')) {
                                        //code
                              
                                        var idForm = id+'_file';
                                        var chain = '<input type="file" name="file" id="'+idForm+'" data-url="" style="display:none"/>';
                                        $(".background_subtable").append(chain);
                                        $('#'+idForm).fileupload({
                                            formData: {
                                                  user:'',
                                                  folio:''
                                            },      
                                            dataType: connections.charge.upload.dataType,
                                            //contentType: "application/json; charset=utf-8",
                                            add: function (e, data) {
                                                
                                                var d = data.files[0];
                                                $("#field_"+id +" .image_icon").attr("source","local").show();
                                                $("#field_"+id +" .image_delete").show();
                                                
                                                var nameFile = (typeof(d.name)!="undefined")?d.name:d.fileName;
                                                var valid = obj.isImage(nameFile);
                                                if(valid){
                                                    data.url=serviceUpload;
                                                    obj.attachment[idForm] = data;
                                                    $("#"+id).val(nameFile);
                                                }else{
                                                    obj.attachment[idForm] = null;
                                                    Alert.show({
                                                            title:'Notificaci&oacute;n',
                                                            type:'error',
                                                            messages:['Archivo no valido'],
                                                            content:'',
                                                            buttons:[{label:'Cerrar'}]
                                                  });
                                                }
                                            }
                                        });
                                         
                                        $('#'+idForm).bind('fileuploadsend', function (e, data) {
                                           //obj.showSpinner();
                                        });
                                        $('#'+idForm).bind('fileuploaddone', function (e, data) {
                                            //obj.hideSpinner();      
                                            var r = data.result;
                                            /*
                                            if(r.response.sucessfull){
                                                  
                                            }else{
                                                  Alert.show({
                                                            title:'Notificaci&oacute;n',
                                                            type:'error',
                                                            messages:[r.response.message],
                                                            content:'',
                                                            buttons:[{label:'Cerrar'}]
                                                  });
                                            }
                                            */
                                            
                                        });
                                        $("#field_"+id).click(function(){
                                                  $("#"+idForm).click();
                                        });
                              }
                              
                              $('#field_'+id +" .image_delete").click(function(event){
                                        $("#"+id).val('');
                                        $("#field_"+id +" .image_icon").hide();
                                        $("#field_"+id +" .image_delete").hide();
                                        delete obj.attachment[idForm];
                                        event.stopPropagation();
                              });
                              
                              $('#field_'+id +" .image_icon").click(function(event){
                                        var source = $(this).attr('path');
                                        var field = $(this).attr('field');
                                             //Codigo Para PDF e imagen Mike Martinez; Jonathan ALdama
                                        var archivo=$("#sub_add_url").val() || $(this).val().trim();
                                        var typeValid = ['pdf'];
                                        var bandera=0;
                                        for(var x in typeValid){
                                                  var i = typeValid[x];
                                                       if (archivo.indexOf('.'+i)!=-1) {
                                                              $('body').modal({data:{user:obj.options.userActive.id,folio:obj.Folio,path:connections.image.get.url,action:'get',consecutivo:obj.Consecutivo,field:'pdf'}});
                                                             bandera=1;
                                                            break;
                                                                           }
                                                            } 
                                         if(bandera==0){
                                                        $('body').modal({data:{user:obj.options.userActive.id,folio:obj.Folio,path:connections.image.get.url,action:'get',consecutivo:obj.Consecutivo,field:field}});
                                           }
                                        
                                             //Fin codigo PDF e imagenes


                                        event.stopPropagation();
                              });
                              
                              ////////////////////////////////////
                    });
          },
          createCalculatedFields:function(data){
                    var obj=this;
                    /*
                    data = [
                              {operation:'superficie_inscrita + cantidad_planta_nuevas_ref + cantidad_planta_mtto', destiny:'densidad_plantacion',datatype:'real'}
                    ];
                    */
                    for(var x in data){
                              var i = data[x];
                              var fields = obj.getFieldsToCalculate(i.operation);
                              for(var y in fields){
                                        var f = fields[y];
                                        if (!obj.FieldsCalculated[f]) {
                                                  obj.FieldsCalculated[f]=[];
                                        }
                                        obj.FieldsCalculated[f].push({operation:i.operation,destiny:i.destiny,typeOperation:i.datatype});
                                        $("#sub_add_"+f).keyup(function(){
                                                  var field = $(this).attr('field');
                                                  for(var n in obj.FieldsCalculated[field]){
                                                            var e = obj.FieldsCalculated[field][n];
                                                            var result = obj.getCalculate(e.operation,e.typeOperation);
                                                            $("#sub_add_"+e.destiny).val(result);
                                                            $("#sub_add_"+e.destiny).keyup();
                                                  }
                                                  
                                        });
                              }
                    }
          },
          makeRequest:function(data){
                    var obj=this;
                    if (data.clock) {
                              clearTimeout(data.clock);
                              data.clock=null;
                    }
                    data.clock=setTimeout(function(){
                              var params = {};
                              var makeRequest = true;
                              for (var x in data.fields) {
                                        var f = data.fields[x];
                                        var type = obj.options.fields[f].type;
                                        value = (type=='edit')?$("#sub_add_"+f).val():$("#sub_add_"+f+" option:selected").val();
                                        if ((value=='-1')||(value=='')) {
                                                  makeRequest=false;
                                                  break;
                                        }else{
                                                  if (!params[f]) {
                                                            params[f];
                                                  }
                                                  params[f]=value;
                                        }
                              }
                              if (data.clean) {
                                                  var fieldsToClean = data.clean.split(',');
                                                  for(var y in fieldsToClean){
                                                            
                                                            var typeToClear = obj.options.fields[fieldsToClean[y]].type;
                                                            if (typeToClear!='edit') {
                                                                      $("#sub_add_"+fieldsToClean[y]).html('<option value="-1" selected="selected" >Seleccione una opci&oacute;n</option>');
                                                            }else{
                                                                      $("#sub_add_"+fieldsToClean[y]).val('')
                                                            }
                                                  }
                                       
                              }
                              if (makeRequest) {
                                        
                                        obj.requestField(params,data);
                              }
                    },100);
          },
          getCalculate:function(operation,type){
                    var chain='';
                    var data = operation.split(' ');
                    for(var x in data){
                              var i = data[x];
                              if (i.length>1) {
                                        //var valor = validator.removeSpaces($("#sub_add_"+i).val());
                                        var valor = $("#sub_add_"+i).val();
                                        if (type!='string') {
                                                  valor = (valor.length>0)?valor:'0';
                                        }
                                        if (type=='string') {
                                                  valor = (chain=='')?valor:' '+valor;
                                        }
                                        chain+=valor;
                              }else{
                                        if (type!='string') {
                                                  chain+=i;
                                        }
                                        
                              }
                    }
                    var response = (type=='string')?chain:eval(chain);
                    return response;
          },
          getFieldsToCalculate:function(operation){
                    var fields =[];
                    var data = operation.split(' ');
                    for(var x in data){
                              var i = data[x];
                              if (i.length>1) {
                                        fields.push(i);
                              }
                    }
                    return fields;
          }, /* 
           ---------------------------------E.Zamora------------------------------
           
           */
     getListMunicipios : function(params){
     obj=this;
     var msg = 'Servicio no disponible intente m&aacute;s tarde';
     var r= {
          success:function(json,estatus){
               var valid=false;
               if ((json)&&(json.response)){
                    if (json.response.sucessfull){
                         valid=true;
                         if (json.data.length > 0) {
                              var municipios = $("#sub_add_municipio");
                              municipios.find('option').remove();
                              municipios.append('<option value="-1" selected="selected">Seleccione una opci&oacute;n</option>');
                              $.each(json.data, function(index,data){
                                   municipios.append('<option value="'+data.value+'">'+data.label+'</option>');
                              }); 
                         }else{
                              var municipios = $("#sub_add_municipio");
                              municipios.find('option').remove();
                              municipios.append('<option value="-1" selected="selected">Seleccione una opci&oacute;n</option>');
                              $("#sub_add_municipio").prop('disabled', 'disabled');
                         }
                         
                    }else{
                         msg=json.response.message;
                    }
               }
               if (!valid) {
                    Alert.show({
                         title:'Notificaci&oacute;n',
                         type:'error',
                         messages:[msg],
                         buttons:[{label:'Cerrar'}]
                    });
               }
          },
          beforeSend: function(xhr) {
                               
          },
          error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
               Alert.error({
                    title:'Notificaci&oacute;n',
                    type:'error',
                    messages:[msg],
                    buttons:[{label:'Cerrar'}]
               });
          },
          complete: function(solicitudAJAX,estatus) {
                                
          }
     };
     r = $.extend(r, connections.multirecords.getList);
                    r.data = {action:'getMunicipios',user:obj.options.userActive.id,id_estado: params.id_estado};
                    $.ajax(r);
          },

     getAnioAreaCorta : function(params){
     obj=this;
     var msg = 'Servicio no disponible intente m&aacute;s tarde';
     var r= {
          success:function(json,estatus){
               var valid=false;
               if ((json)&&(json.response)){
                    if (json.response.sucessfull){
                         valid=true;
                         //alert(json.data);
                         $("#sub_add_anio").val(json.data)
                    }else{
                         msg=json.response.message;
                    }
               }
               if (!valid) {
                    Alert.show({
                         title:'Notificaci&oacute;n',
                         type:'error',
                         messages:[msg],
                         buttons:[{label:'Cerrar'}]
                    });
               }
          },
          beforeSend: function(xhr) {
                               
          },
          error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
               Alert.error({
                    title:'Notificaci&oacute;n',
                    type:'error',
                    messages:[msg],
                    buttons:[{label:'Cerrar'}]
               });
          },
          complete: function(solicitudAJAX,estatus) {
                                
          }
     };
     r = $.extend(r, connections.multirecords.getAnioAreaCorta);
                    r.data = {action:'getAnioAreaCorta',user:obj.options.userActive.id,folio: params.folio, areaCorta: params.areaCorta};
                    $.ajax(r);
          },

           getVolumenArbol : function(params){
     obj=this;
     var msg = 'Servicio no disponible intente m&aacute;s tarde';
     var r= {
          success:function(json,estatus){
               var valid=false;
               if ((json)&&(json.response)){
                    if (json.response.sucessfull){
                         valid=true;
                         var a = json.data;
                         var b = $("#sub_add_s400_edad").val();
                         if (b == 0 || b == "") {
                              $("#sub_add_ima").val("");
                              $("#sub_add_ima").val(a);
                         }else{
                              var result = a / b ;
                              $("#sub_add_ima").val("");
                              $("#sub_add_ima").val(result.toFixed(6));
                         }
                         //$("#tb_add_combatientes").val(json.data);
                    }else{
                         msg=json.response.message;
                    }
               }
               if (!valid) {
                    Alert.show({
                         title:'Notificaci&oacute;n',
                         type:'error',
                         messages:[msg],
                         buttons:[{label:'Cerrar'}]
                    });
               }
          },
          beforeSend: function(xhr) {
                               
          },
          error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
               Alert.error({
                    title:'Notificaci&oacute;n',
                    type:'error',
                    messages:[msg],
                    buttons:[{label:'Cerrar'}]
               });
          },
          complete: function(solicitudAJAX,estatus) {
                                
          }
     };
     r = $.extend(r, connections.multirecords.getVolumen);
                    r.data = {action:'volumenArbol',user:obj.options.userActive.id,folio: params.folio, sitio: params.sitio, arbol: params.arbol};
                    $.ajax(r);
          },

/*
Codigo Mike Peticion a servlet para taer el numero total de combatienes programa 72 
17/06/2016
*/

requestNumCombatientes : function(params){
                    obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if ((json)&&(json.response)){
                                        
                                    if (json.response.sucessfull){
                                        valid=true;
                                        
                                        //document.getElementById("tb_add_combatientes").innerHTML=json.data;
                                        $("#tb_add_combatientes").val(json.data);
                                        
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                            },
                            beforeSend: function(xhr) {
                               
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        Alert.error({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                            };
                    r = $.extend(r, connections.tabular.getNumIncendio);
                    r.data = {action:'get',user:obj.options.userActive.id,anio:params.anio,id_region:params.region};
                    $.ajax(r);
          },


totalVehiculosRevisados : function(params){
                    obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if ((json)&&(json.response)){
                                        
                                    if (json.response.sucessfull){
                                        valid=true;
                                        
                                        //document.getElementById("tb_add_combatientes").innerHTML=json.data;
                                        
                                        if($("#tb_add_vehiculos_sin_irregularidades").length>0)
                                          {
                                           var x=json.data;
                                             var y=$("#tb_add_vehiculos_sin_irregularidades").val();

                                             var z = parseInt(x)+parseInt(y);
                                           $("#tb_add_vehiculos_revisados").val(z);
                                      }
                                        else
                                             $("#tb_add_vehiculos_sin_irregularidades").val(json.data);
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                            },
                            beforeSend: function(xhr) {
                               
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        Alert.error({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                            };
                    r = $.extend(r, connections.tabular.getNumIncendio);
                    r.data = {action:'getVehiculos',user:obj.options.userActive.id,folio:params.folio};
                    $.ajax(r);
          },



//Fin codigo Mike 

/*rubi ini*/


requestSubcategoria : function(idCategoria){
                    obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if ((json)&&(json.response)){
                                        
                                    if (json.response.sucessfull){
                                        valid=true;
                                        
                                    var field = $("#sub_add_subcategoria_bien_producto");
                                    field.html('');
                                    var chain='';
                                    chain+='<option value="-1">Seleccione una opci&oacute;n</option>';
                                    for(var x in json.data){
                                                 var i = json.data[x];
                                                       chain+='<option value="'+i.value+'">'+i.label+'</option>';
                                                                 }
                                        field.append(chain);

     
                                        
                                        
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                            },
                            beforeSend: function(xhr) {
                               
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                            };
                    r = $.extend(r, connections.multirecords.getList);
                    r.data = {action:'getSubcategoria',user:obj.options.userActive.id,idCategoria:idCategoria};
                    $.ajax(r);
          },



requestNumHombres : function(params){
                    obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if ((json)&&(json.response)){
                                        
                                    if (json.response.sucessfull){
                                        valid=true;
                                        
                                        //document.getElementById("tb_add_combatientes").innerHTML=json.data;
                                        $("#tb_add_total_hombres").val(json.data);
                                        
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                            },
                            beforeSend: function(xhr) {
                               
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                            };
                    r = $.extend(r, connections.tabular.getNumIncendio);
                    r.data = {action:'get',user:obj.options.userActive.id,anio:params.anio,id_region:params.region};
                    $.ajax(r);
          },


requestNumMujeres : function(params){
                    obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if ((json)&&(json.response)){
                                        
                                    if (json.response.sucessfull){
                                        valid=true;
                                        
                                        //document.getElementById("tb_add_combatientes").innerHTML=json.data;
                                        $("#tb_add_total_mujeres").val(json.data);
                                        
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                            },
                            beforeSend: function(xhr) {
                               
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                            };
                    r = $.extend(r, connections.tabular.getNumIncendio);
                    r.data = {action:'get',user:obj.options.userActive.id,anio:params.anio,id_region:params.region};
                    $.ajax(r);
          },

/*rubi fin*/



 campos_municipio :function(data,options){
 var field = $(" #sub_add_municipio");
 field.html('');
 var chain='';
          chain+='<option value="-1">Seleccione una opci&oacute;n</option>';
               for(var x in data.list){
               var i = data.list[x];
           chain+='<option value="'+i.value+'">'+i.label+'</option>';
          }
     field.append(chain);

          },
           recuperar_municipio : function(params,options){
                obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if ((json)&&(json.response)){
                                        
                                    if (json.response.sucessfull){
                                        valid=true;
                                        obj.campos_municipio(json.data,options);
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                            },
                            beforeSend: function(xhr) {
                               
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                            };
                    r = $.extend(r, connections.requestField.data);
                    r.url+='Municipio?region='+params;
                    //r.data = params;
                    $.ajax(r);
           },
          /* 
           ---------------------------------E.Zamora------------------------------

           */
          validateAddUser : function(){
                    var obj=this;
                    var params=[];
                    var valid=true;
                    var msg=[];
                    let control=false;
                    let numero_programa= obj.options.userActive.program
                    $(".background_subtable .textInput").each(function(){
                        var item = $(this);
                        var id=item.attr('id');
                        var field=item.attr('field');
                        var datatype = item.attr('datatype');
                        var value = item.val();
                        value = validator.replaceTags(value);
                        var label = item.prev().html();
                        var value2='x';
                        if (validator.isEmpty(value2)) {
                            valid=false;
                            item.addClass('badInput');
                        }else{
                            switch (datatype) {
                                case 'phone':
                                   if(!validator.isEmpty(value))
                                       {  
                                         if (!validator.isPhone(value)) {
                                             msg.push('Telefono no valido');
                                             item.addClass('badInput');
                                             
                                         }
                                        }
                                    break;
                                case 'email':
                                 if(!validator.isEmpty(value))
                                  {
                                         if (!validator.isEmail(value)) {
                                             msg.push('Email no valido');
                                             item.addClass('badInput');
                                         }
                                    }    
                                    break;
                                
                            }

                            /*
                             * @Description
                             * issue validacion para el multiregistro de sitios en el programa12 
                             * ITH 
                             */
                             if(numero_programa == 12 ){
                                   if(datatype == 'numeric' && field=='sitio'){
                                        if (validator.isEmpty(value)) {
                                             msg.push('Ingrese numero de sitio');
                                             item.addClass('badInput');
                                        }
                                   }else  if(datatype == 'numeric' && field=='num_arbol'){
                                        if (validator.isEmpty(value)) {
                                             msg.push('Ingrese numero de arbol');
                                             item.addClass('badInput');
                                        }  
                                   }     
                             }
                             /*
                              * Fin bloque issue
                              */


                         /*
                          * @Description
                          * issue validacion para el formulario de multiRegitros del programa1
                          * superficies con decimales 
                          * ITH 
                          */
                         if (numero_programa == 1) {
                             if(datatype == 'string'){
                                   switch(field){
                                        case 'rodal':
                                             if(validator.isEmpty(value)){
                                                  msg.push('Ingrese rodal <br>');
                                                  item.addClass('badInput');
                                             }
                                        break;
                                   }
                             }else if (datatype == 'real' && !validator.isEmpty(value) && value!='0') {

                                switch (field) {
                                             case 'superficie_rodal_hectareas':
                                                  if (!validator.isNumNoDec(value.trim())) {
                                                  msg.push('Verifique el campo ' + label +' require max 5 enteros y max 3 decimales <br>');
                                                  item.addClass('badInput');
                                             
                                                  }
                                             break;
                                             case 'volumen_existencias_reales':
                                             case 'volumen_infraestructura':
                                                  if (!validator.isNumNoVolumen(value.trim())) {
                                                  msg.push('Verifique el campo ' + label +' require max 7 enteros y max 3 decimales <br>');
                                                  item.addClass('badInput');
                                             
                                                  }
                                             break;
                                             case 'ic_propuesta':
                                                  if (!validator.isNumNoIC(value.trim())) {
                                                  msg.push('Verifique el campo ' + label +' require max 3 enteros y max 2 decimales <br>');
                                                  item.addClass('badInput');
                                             
                                                  }
                                             break;
                                             case 'ica':
                                                  if (!validator.isNumICA(value.trim())) {
                                                  msg.push('Verifique el campo ' + label +' require max 3 enteros y max 3 decimales <br>');
                                                  item.addClass('badInput');
                                             
                                                  }
                                             break;
                                             case 'volumen_liberado':
                                             case 'volumen_marcado':
                                             case 'produccion_escuadria':
                                             case 'celulosa':
                                             case 'lenia_combustible':
                                             case 'carbon':
                                             case 'aprovechamiento_saldos':

                                         if (!validator.isNumNoVolumen(value.trim())) {
                                             msg.push('Verifique el campo ' + label +'<br>');
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
                    });
                    $(".background_subtable .multiselect").each(function(){
                        var item = $(this);
                        var id=item.attr('id');
                        var field=item.attr('field');
                        var datatype = item.attr('datatype');
                        var value = item.attr('value');
                        var label = item.prev().html();
                        var value2='x';
                        item.removeClass('badInput');

                        if(numero_programa ==1 ){
                              switch(field){
                                   case 'especie':
                                   if (validator.isEmpty(value)) {
                                             msg.push('Seleccione especies <br>');
                                             item.addClass('badInput');
                                   }
                                   break;
                              }
                        }
                        
                        if (validator.isEmpty(value2)) {
                            valid=false;
                            item.addClass('badInput');
                        }else{
                            params.push({field:field,value:value,datatype:datatype,label:label});
                        }
                    });
                    //var roleSelected = $("#fm_add_rol option:selected").val();
                    if (obj.options.action=='new') {
                          var roleSelected = (obj.options.addExecutive)?6:obj.options.userActive.roleId+1;
                    }else{
                          var roleSelected = obj.options.data.roleId;
                    }
                    
                    $(".background_subtable .selectInput").each(function(){
                              var item = $(this);
                              var id=item.attr('id');
                              var field=item.attr('field');
                              var display= item.attr('display');
                              var datatype = item.attr('datatype');
                              var value = $("#"+id+" option:selected").val();
                              var label = item.prev().html();
                              

                              if(numero_programa== 1){
                                   switch(field){
                                        case 'area_corta':
                                        if(value == -1){
                                             msg.push('Seleccione ' + label +'<br>');
                                             item.addClass('badInput');
                                        }
                                        break;

                                   }

                              }
                              params.push({field:field,value:value,datatype:datatype,label:label});
                         
                              
                              
                    });

                    if(control && numero_programa == '1'){
                                msg.push("<b>Los campos numericos  deben contener max 5 enteros y max 3 decimales</b>");
                    }

                    if ($("#fm_add_rol option:selected").val()=='2') {
                              params['privacy']="0";
                    }
                    if (!valid) {
                        msg.push("Llene los campos faltantes");
                    }
                    if ($("#fm_add_password").val()!=$("#fm_add_c_password").val()) {
                        $("#fm_add_password,#fm_add_c_password").addClass('badInput');
                        msg.push('La contrase&ntilde;a no corresponde a la confirmaci&oacute;n');
                    }
                    params.enabled=true;
                    return {params:params,messages:msg};
          },
          new_user:function(){
                    
          },
          delete_user:function(){
                    
          },
          edit_user:function(){
                    
          },
          hide:function(){
                     $(".background_subtable").remove();
                     $('.option_item_back').click();
          },
          _create: function() {
		this.buildStructure();
                this.events();
                //this.eventsToItems();
          },
      
          _refresh: function(){
            // trigger a callback/event
            this._trigger( "change" );
          },
         
          _destroy: function() {
              this.element.remove();
          },
          
          
          _setOption: function(key, value){
                    this.options[key] = value;
                              this.options.addExecutive=false;
                              switch(key){
                                        case "addExecutive":
                                                  this.options.addExecutive=value;
                                                  break;
                                        case "action":
                                                  this.options.action=value;
                                                  break;
                                        case "data":
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});




