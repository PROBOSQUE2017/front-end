define(["validator","connections","map","Alert","structure"], function(validator,connections,map,Alert,structure){
$.widget( "custom.Actions", {
	  id:'custom_actions',
          countSpinner:0,
          clock:null,
          info:null,
          options:{ 
                    data:{},
                    source:null
          },
	  _init:function(){
                    
	  },
          
          update:function(){
                    
                    this.request({action:'get',user:this.options.data.userActive.id});
          },
          
          showMessage:function(msg){
                     $('body').notification({data:[msg]});
          },
          showSpinner:function(){
                    var obj=this;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").show();
                    }
                    obj.countSpinner+=1;
                   
          },
          hideSpinner:function(){
                    var obj=this;
                    obj.countSpinner-=1;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").hide();
                    }
          },
          buildNotifications:function(data){
                    var obj=this;
                    var chain='';
                    obj.options.source = null;
                    obj.options.source = {};
                    var messages=[];
                    for(var x in data){
                              
                              var buttons ='<div class="action_tools">';
                              var i = data[x];
                              if (i.btnType==1) {
                                        buttons +=
                                                  '<div class="action_option action_finish" action="a'+x+'" event="finish"><div class="template_actions ta_acept"></div></div>';
                                                  
                              }else{
                                        buttons +=
                                                  '<div class="action_option action_refuse" action="a'+x+'" event="refuse"><div class="template_actions ta_cancel"></div></div>'+
                                                  '<div class="action_option action_acept"  action="a'+x+'" event="acept"><div class="template_actions ta_acept"></div></div>';
                                                  
                              }
                              buttons +='</div>';
                              var color ='gray';
                              chain+='<div id="a'+x+'" class="item_action">'+
                                        '<div class="action_description">'+i.description+'</div>'+
                                        buttons+
                                     '</div>';
                                     
                              obj.options.source['a'+x]=i;
                              messages.push(i.notification);
                    }
                    $('body').notification({data:messages});
                    chain = (data.length>0)?chain:'<div class="emty">Por el momento no hay acciones pendientes</div>';
                    var bell = $('.bell');
                    var claseBell = 'tst_alert';
                    bell.removeClass('tst_alert_active').removeClass('tst_alert');
                    if (data.length>0) {
                              claseBell+='_active';         
                    }
                    bell.addClass(claseBell);
                    $('.actions_data').html(chain);
                    $(".action_option").each(function(){
                              $(this).click(function(){
                                        var source = $(this).attr('action');
                                        var event = $(this).attr('event');
                                        var data = obj.options.source[source];
                                        var params={
                                                  action:'set',
                                                  useractive:data.useractive,
                                                  user:data.user,
                                                  phase:data.phase,
                                                  status:1
                                        }
                                        if (event=='refuse') {
                                                  params.status=2;
                                        }
                                        obj.request(params,source);
                                        $("#"+source).addClass('hidden');
                                        obj.defineClock();
                              });
                    });
                    
          },
          isChanged :function(data){
                    var obj=this;
                    var change=false;
                    if (obj.info==null) {
                              obj.info=data;
                              change=true;
                    }else{
                              var a = data.actions;
                              if (obj.info.actions.length!=data.actions.length) {
                                        change=true;
                              }else{
                                        for(var x in obj.info.actions){
                                                  var i = obj.info.actions[x];
                                                  
                                                  if ((i.description !=a[x].description)||(i.notification!=a[x].notification)||(i.phase!=a[x].phase)||(i.status!=a[x].status)||(i.user!=a[x].user)||(i.useractive!=a[x].useractive)||(i.btnType!=a[x].btnType)) {
                                                            change=true;
                                                            break;
                                                  }
                                        }
                              }
                              if (change) {
                                        obj.info=data;
                              }
                    }
                    return change;
          },
          request : function(params,idItem){
                   
                    var obj=this;
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        if (params.action=='get') {
                                                  
                                                  if (json.data.phase==0) {
                                                            var msg = validator.getNotificacionLogin(obj.options.data.userActive.roleId,json.data.phase)
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:[msg],
                                                                      clase:'blockAlert',
                                                                      buttons:[{label:'Salir',event:function(){structure.reloadPage()}}]
                                                            });
                                                  }else{
                                                            Alert.hide('blockAlert');
                                                            
                                                            if (obj.isChanged(json.data)) {
                                                                     obj.buildNotifications(json.data.actions);
                                                            }       
                                                  }
                                        }else{
                                                  setTimeout(function(){
                                                                      obj.update();
                                                  },0);
                                        }
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                        $("#"+idItem).removeClass('hidden');
                                        obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                        obj.showSpinner();
                                        $(".search_msgError").hide();
                               
                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                obj.hideSpinner();
                            }
                    };
                    
                    r = $.extend(r, connections.actions[params.action]);
                    r.data=params;
                    $.ajax(r);
          },
          getBlocker :function(){
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.gif">'+
                                                  '<div class="label">Procesando</div>'+
                                        '</div>'+
                                '</div>';
                    return chain;
          },
          getHeader : function(){
                    var o = this.options.data;
                    var chain='';
                              chain+='<div class="header_actions">'+
                                        '<div class="label">Notificaciones</div>'+
                                        '<div class="back_actions"><img src="img/back.png"></div>'+
                                     '</div>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain = ''+
                              '<div class="'+obj.id+'">'+
                                        obj.getHeader()+
                                        '<div class="actions_data"></div>'+
                                        obj.getBlocker()+
                              '</div>';
                    this.element.append(chain);
	  },
          show:function(){
                 this.element.show();
                 $(".app_left_section_information,.app_left_section_layers").hide();
          },
          hide:function(){
                 this.element.hide();
          },
          
          defineClock:function(){
                    var obj = this;
                    this.clearClock();
                    this.clock = setInterval(function(){
                              obj.update();
                    },120000);//120000
          },
          clearClock:function(){
                    if (this.clock) {
                             clearInterval(this.clock);
                    }
                    
          },
          events:function(){
                    var obj=this;
                    $('.back_actions').click(function(){
                              obj.hide();
                    });
                    obj.defineClock();
                    $("."+obj.id +" .blocker").hide();
          },
          
          _create: function() {
                    this.buildStructure();
                    this.events();
                    this.update();
                    this.hide();
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
                              switch(key){
                                        case "data":
                                                  this.countSpinner=0;
                                                  this.options.data = value;
                                                  this.update();
                                                  
                                        break;
                                                          
                              }
		    }
	  }
);
});