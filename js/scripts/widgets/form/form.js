define(["validator","connections","restrictions","structure","Alert","dataSelect"], function(validator,connections,restrictions,structure,Alert,dataSelect){
$.widget( "custom.customForm", {
	  options:{
                    data:{},
                    addExecutive:false,
                    action:'',
                    fields:[
						      {label:'Usuario',id:'fm_add_user',type:'edit',holder:'Alias del usuario',field:'username'},
						      {label:'Tipo de usuario',id:'fm_add_rol',type:'select',holder:'Tipo de usuario',field:'roleId'},
                                                      //{label:'Privacidad',id:'fm_add_privacy',type:'select',holder:'Privacidad',field:'privacy'},
                                                      {label:'Programa',id:'fm_add_program',type:'select',holder:'Programa',field:'program'},
                                                      {label:'Actividad',id:'fm_add_activity',type:'select',holder:'Actividad',field:'activity'},
						      {label:'Nombre',id:'fm_add_name',type:'edit',holder:'Nombre',field:'firstname'},
						      {label:'Apellidos',id:'fm_add_fname',type:'edit',holder:'Apellido paterno',field:'lastname'},
						      {label:'Direcci&oacute;n',id:'fm_add_address',type:'edit',holder:'Direcci&oacute;n',field:'address'},
						      {label:'Tel&eacute;fono',id:'fm_add_phone',type:'edit',holder:'Tel&eacute;fono',field:'phone'},
						      {label:'Correo electr&oacute;nico',id:'fm_add_mail',type:'edit',holder:'Correo electr&oacute;nico',field:'email'},
						      //{label:'Empresa',id:'fm_add_enterprice',type:'edit',holder:'Empresa',field:'company'},
						      //{label:'Cargo',id:'fm_add_charge',type:'edit',holder:'Cargo',field:'jobtitle'},
						      {label:'CURP',id:'fm_add_curp',type:'edit',holder:'CURP',field:'curp'},
						      {label:'RFC',id:'fm_add_rfc',type:'edit',holder:'RFC',field:'rfc'},
						      {label:'Contrase&ntilde;a',id:'fm_add_password',type:'password',holder:'Contrase&ntilde;a',field:'password'},
						      {label:'Confirmar contrase&ntilde;a',id:'fm_add_c_password',type:'password',holder:'Confirmar contrase&ntilde;a'}
						      
		    ],
                    
          },
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
          getSelect:function(id,idSelected,field){
                    var user = this.options.userActive;
                    var chain='<select class="selectInput" id="'+id+'" field="'+field+'" >';
                    var selected = ' selected="selected" ';
                    var r = dataSelect[field];
                    
                    chain+='<option value="-1" '+((idSelected)?'':selected)+'>Seleccione una opci&oacute;n</option>';
                    for(var x in r){
                              var i = r[x];
                              var aditional =(field=='activity')?' program="'+i.program+'" ':'';
                              chain+='<option value="'+i.value+'" '+' '+aditional+'>'+i.label+'</option>';
                              
                    }
                    chain+='</select>';
                    return chain;
          },
          getInput:function(i){
                    var obj = this;
                    var r = restrictions.roles;
                    var action = this.options.action;
                    var data = this.options.data;
                    var readOnly='';
                    switch (action) {
                              case 'consult':
                              case 'delete':
                                        readOnly=' readonly ';
                                        break;
                    }
                    if ((action=='consult')&&(i.id=='fm_add_password')) {
                             i.type='edit';
                    }
                    
                    var id = ' id="'+i.id+'"';
                    var type = ' type="'+i.type+'"';
                    var field = ' field="'+i.field+'"';
                    var clase =' class="textInput"';
                    if ((readOnly!='')&&(i.type=='select')) {
                              valueField =obj.options.data[i.field];
                          var value = ' value="'+dataSelect.data[i.field]['p'+valueField]+'"'; 
                    }else{
                          var value = ' value="'+((data[i.field])?data[i.field]:'')+'"';    
                    }
                    
                    var holder = ' placeholder="'+i.holder+'"';
                    var data = id+field+type+value+holder+clase+readOnly;
                    
                    var input = '';
                    if ((i.type=='select')&&(readOnly=='')) {
                              input = this.getSelect(i.id,data[i.field],i.field);
                    }else{
                              input = '<input '+data+' />';
                    }
                    
                    var chain = '<div class="Field" id="field_'+i.id+'"><div class="label">'+i.label+'</div>'+input+'</div>';
                    if (((action=='consult')||(action=='delete'))&&((i.id=='fm_add_c_password'))) {
                              chain='';
                    }
                    if ((action=='delete')&&(i.id=='fm_add_password')) {
                              chain='';
                    }
                    
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
                              chain+= '<button class="textButton" id="'+b.action+'_form">'+b.label+'</button>';
                    }
                    
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options;
                    var chain='<div class="background_form">';
                    //chain +='<div class="row">';
                    var contador=0;
                    for(var x in o.fields){
                              if (contador==2) {
                                    contador=0;
                              }
                              if(contador==0){chain +='<div class="row">';}
                              chain+='<div class="col s12 m6 l6">'+obj.getInput(o.fields[x])+'</div>';
                              if((contador==1)||((o.data.length-1)==x)){chain+='</div>';}
                              contador+=1;
                              //chain+= obj.getInput(o.fields[x]);
                    }
                    chain+='</div>';
                    chain+='<div class="ButtonSection" align="center">';
                    chain+=obj.getButton(o.action);
                    chain+='</div>';
                    chain+='</div>';
                    
                    $(".background_form").remove();
                    
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
                                                  '<div class="close"><div class="template_custom_form_close" type="'+type+'"></div></div>'+
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
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['Usuario eliminado satisfactoriamente'],
                                                                      buttons:[
                                                                               {
                                                                                label:'Cerrar',
                                                                                event:function(){
                                                                                          obj.hide();
                                                                                          $(".app_"+obj.options.module).search('reset');
                                                                                }
                                                                                }
                                                                      ]
                                                            });
                                                            //mostrar ventana y cerrar formulario
                                                            
                                                            break;
                                                  case 'new':
                                                            //obj.showMessage(['El usuario se ha agregado satisfactoriamente'],'info');
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El usuario se ha agregado satisfactoriamente'],
                                                                      buttons:[
                                                                               {
                                                                                label:'Cerrar',
                                                                                event:function(){
                                                                                          obj.hide();
                                                                                          $(".app_"+obj.options.module).search('reset');
                                                                                          }
                                                                                }
                                                                      ]
                                                            });
                                                            //mostrar ventana y cerrar formulario
                                                           
                                                            break;
                                                            
                                                  case 'edit':
                                                            //obj.showMessage(['El usuario ha sido editado satisfactoriamente'],'info');
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El usuario ha sido editado satisfactoriamente'],
                                                                      buttons:[
                                                                               {
                                                                                label:'Cerrar',
                                                                                event:function(){
                                                                                          obj.hide();
                                                                                          $(".app_"+obj.options.module).search('reset');
                                                                                          }
                                                                                }
                                                                      ]
                                                            });
                                                           
                                                            //mostrar ventana y cerrar formulario
                                                            break;
                                                  
                                        }
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
                                //xhr.withCredentials = true;
                                //$(aditional.btn).addClass(clase);
                                //$(aditional.spinner).removeClass(clase);
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
                                //$(aditional.btn).removeClass(clase);
                                //$(aditional.spinner).addClass(clase)
                                
                                
                            }
                            };
                    var source='';
                    switch (action) {
                              case 'new':source = connections.users.add;
                                        r = $.extend(r, source);
                                        r.url=r.url+'&json='+JSON.stringify(params);
                                        break;
                              case 'edit':source=connections.users.edit;
                                        r = $.extend(r, source);
                                        r.url=r.url+'&json='+JSON.stringify(params)+'&id='+obj.options.data.id;
                                        break;
                              case 'delete':
                                        source=connections.users.del;
                                        r = $.extend(r, source);
                                        //r.data = params;
                                        r.url=r.url+'&id='+obj.options.data.id;
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
          events:function(){
                    var obj = this;
                    
                    $(".background_form #fm_add_rol").change(function(){
                              var valor = $("#fm_add_rol option:selected").val();
                              if (valor=='4'){
                                        $("#field_fm_add_program").hide();
                              }else{
                                        $("#field_fm_add_program").show();
                              }
                    });
                    
                    $("#field_fm_add_activity").hide();
                    var o = this.options.data;
                    for(var x in o.buttons){
                              var event = null;
                              if (x=='cancel') {
                                    event = obj.hide;
                                    
                              }else{
                                    event = o.buttons[x].event;   
                              }
                              $("#"+x+"_form").click(function(){
                                        event();
                              });    
                    }
                    obj.eventScrolling();
                    $(".back_users").click(function(){
                              $(".background_form").remove();
                    });
                    $(".background_form .Field .textInput").each(function(){
                              $(this).focus(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    $(".background_form .Field .selectInput").each(function(){
                              $(this).change(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    $("#cancel_form").click(function(){
                              obj.hide();
                              if (obj.options.action=='new') {
                                        $(".sectionItem_selected").removeClass('sectionItem_selected');
                                        
                              }else{
                                        $(".app_"+obj.options.module).search('reset');
                              }
                    });
                    $("#new_form,#edit_form").click(function(){
                              var a = obj.validateAddUser();
			      if (a.messages.length==0) {
                                        if (obj.options.action=='edit') {
                                                  a.params['id']=obj.options.data.id;
                                        }
					obj.request(a.params);
			      }else{
					
                                        //obj.showMessage(a.messages,'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:a.messages,
                                                  buttons:[{label:'Cerrar'}]
                                        });
			      }
                    });
                    $("#delete_form").click(function(){
                               Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:'notification',
                                        messages:['&iquest;Realmente desea eliminar este usuario?'],
                                        buttons:[
                                                  
                                                  {label:'Si',event:function(){
                                                            obj.request({action:"delete",id:obj.options.data.id});
                                                  }},
                                                  {label:'No'}
                                                  ]
                              });
                              
                    });
                    //$("#fm_add_rol").selectmenu();
                    $(".background_form .selectInput").each(function(){
                              var value = $(this).attr('field');
                              if (typeof(obj.options.data[value])!='undefined') {
                                        $(this).val(obj.options.data[value]);
                              }
                             
                    });
                    if ((obj.options.action=='new')||(obj.options.action=='edit')){
                              $("#fm_add_program").change(function(){
                                        var value = $("#fm_add_program option:selected").val();
                                        var valueToselect = '-1';
                                        if ((value=="9")||(value=="7")|| (value=="15")) {
                                                 if (value=='7') {
                                                            $('option[program="9"]').hide();
                                                            $('option[program="15"]').hide();
                                                            $('option[program="'+value+'"]').show();
                                                  }
                                                  if (value=='9'){
                                                            $('option[program="7"]').hide();
                                                            $('option[program="15"]').hide();
                                                            $('option[program="'+value+'"]').show();
                                                  }
                                                  if (value=='15'){
                                                            $('option[program="7"]').hide();
                                                            $('option[program="9"]').hide();
                                                            $('option[program="'+value+'"]').show();
                                                  }
                                                  $("#fm_add_activity").val(valueToselect);
                                                  $('option[program="'+value+'"').show();
                                                  $("#field_fm_add_activity").show();
                                        }else{
                                                  $("#field_fm_add_activity").hide();
                                        }
                              });
                    }
                    if((obj.options.data.program==9)||(obj.options.data.program==7)||(obj.options.data.program==15)){
                                        $("#field_fm_add_activity").show();
                    }
          },
          validateAddUser : function(){
                    var obj=this;
                    var params={};
                    var valid=true;
                    var msg=[];
                    $(".background_form .textInput").each(function(){
                        var item = $(this);
                        var id=item.attr('id');
                        var field=item.attr('field');
                        var value = item.val();
                        if (validator.isEmpty(value)) {
                            valid=false;
                            item.addClass('badInput');
                        }else{
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
                            params[field]=value;
                        }
                    });
                    //var roleSelected = $("#fm_add_rol option:selected").val();
                    if (obj.options.action=='new') {
                          var roleSelected = (obj.options.addExecutive)?6:obj.options.userActive.roleId+1;
                    }else{
                          var roleSelected = obj.options.data.roleId;
                    }
                    
                    $(".background_form .selectInput").each(function(){
                              var item = $(this);
                              var id=item.attr('id');
                              var field=item.attr('field');
                              var display= item.parent().css('display');
                              var value = $("#"+id+" option:selected").val();
                              if (value!='-1') {
                                        params[field]=value;
                              }else{
                                        if (display!='none') {
                                                  item.addClass('badInput');
                                                  valid=false;
                                        }
                                        
                              }
                              
                              
                    });
                    if (($("#fm_add_program option:selected").val()!='9')&&($("#fm_add_program option:selected").val()!='7') && ($("#fm_add_program option:selected").val()!='15')) {
                              //params['privacy']="0";
                              params['activity']="0";
                    }
                    if ($("#fm_add_rol option:selected").val()=='4') {
                              params['program']="14";
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
                     $(".background_form").remove();
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