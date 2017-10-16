define(["validator","connections","structure","features","graph"], function(validator,connections,structure,features,graph){
$.widget( "custom.userbranch", {
          clock:null,
	  options:{
                 source:{},
                 process:'consult',
                 data:{
                    /*
                        active:{
                              id:22,
                              alias:'Coordinador de gabineta SIAP',
                              charge:45,
                              total:100
                        },
                        total:{
                                    charge:500
                        },
                        users:[
                                    {id:1,alias:'Coordinador 1',color:'#B39EB5',charge:45,total:100},
                                    {id:2,alias:'Coordinador 2',color:'#03C03C',charge:45,total:100},
                                    {id:3,alias:'Coordinador 3',color:'#759CC9',charge:45,total:100},
                                    {id:4,alias:'Coordinador 4',color:'#FEB146',charge:45,total:100},
                                    {id:5,alias:'Coordinador 5',color:'#946ED4',charge:45,total:100},
                                    {id:6,alias:'Coordinador 6',color:'#816850',charge:45,total:100},
                                    {id:7,alias:'Coordinador 7',color:'#FBFB95',charge:45,total:100}
                        ]
                        */
                    }
          },
	  _init:function(){
                    
	  },

          
          getUsers:function(){
                    var chain='';
                    var users = this.options.data.users;
                    var userActive = this.options.data.active;
                    var process = this.options.process;
                    var buttonAdd='';
                    var buttonAddExecutive='';
                    if (process=='administration') {
                            buttonAdd ='<div class="button_add_user">'+
                                                            '<div class="label">Nuevo '+validator.getRol(userActive.roleId+1)+'</div>'+
                                                            '<div class="icon">'+
                                                                      '<div class="template_userbranch tub_plus"></div>'+
                                                            '</div>'+
                                        '</div>';
                              if (this.options.userActive.roleId==1) {
                                        buttonAddExecutive ='<div class="button_add_user_executive">'+
                                                                                '<div class="label">Nuevo '+validator.getRol(6)+'</div>'+
                                                                                '<div class="icon">'+
                                                                                          '<div class="template_userbranch tub_plus"></div>'+
                                                                                '</div>'+
                                                            '</div>';
                              }
                    }
                    chain+=buttonAdd;
                    var roleType='';
                    var existExecutive=false;
                    this.totalUsers=null;
                    this.totalUsers={};
                    for(var x in users){
                              var i = users[x];
                              this.totalUsers['u'+i.id]=i;
                              var nom = i.username;
                              var role = validator.getRol(i.roleId);
                              var showNode=true;
                              if ((this.options.userActive.roleId==6)&&(i.roleId==6)) {
                                        showNode=false;
                              }
                              var color = (i.hasNodes)?'#006BA7':'#8E9091';
                              var id = i.id;
                              var controls = '';
                              var buttonAdd='';
                              if (roleType=='') {
                                        roleType=role;
                              }
                              if (roleType!=role) {
                                        roleType=role;
                                        if (process=='administration') {
                                                  existExecutive=true;
                                                  chain+=buttonAddExecutive;
                                        }
                              }
                              if (process=='consult') {
                                        //i.phases.btnassignCharge=true;
                                       controls = '<div class="user_tools">'+
                                       
                                                            ((i.phases.btnDelivered)? '<div class="user_action user_finished" _title="Actividad concluida" user="u'+i.id+'" action="finish"><div class="template_userbranch tub_finished"></div></div>':'')+
                                                            ((i.phases.btnUpload)?'<div class="user_action user_upload" _title="Subir predios" user="u'+i.id+'" action="upload"><div class="template_userbranch tub_upload"></div></div>':'')+
                                                            ((i.phases.btnDownload)?'<div class="user_action user_download" _title="Descargar predios" user="u'+i.id+'"  action="download"><div class="template_userbranch tub_download"></div></div>':'')+
                                                            ((i.phases.btnassignCharge)?'<div class="user_action user_charge_icon" _title="Asignar carga" user="u'+i.id+'" action="charge"><div class="template_userbranch '+((i.hasCharge)?'tub_charge_active':'tub_charge')+'"></div></div>':'')+
                                                            
                                                            
                                                           
                                                  '</div>';
                                        
                              }
                              
                             
          
                              if (process =='administration') {
                                        
                                       controls = '<div class="user_tools">'+
                                                            
                                                            '<div class="user_action user_delete" _title="Eliminar" user="u'+i.id+'" action="delete"><div class="template_userbranch tub_delete"></div></div>'+
                                                            '<div class="user_action user_edit" _title="Editar" user="u'+i.id+'"  action="edit"><div class="template_userbranch tub_edit"></div></div>'+
                                                            '<div class="user_action user_info" _title="Consultar" user="u'+i.id+'" action="consult"><div class="template_userbranch tub_info"></div></div>'+
                                                  '</div>';
                              }
                              if (showNode) {
                                        //code
                              
                                        chain+='<div id="itemu'+x+'" class="item_user">'+
                                                  '<div class="user_color" style="background:'+color+';"></div>'+
                                                  '<div class="user_alias">'+nom+'</div>'+
                                                  '<div class="user_role">('+role+')</div>'+
                                                  ((i.charge)?
                                                  '<div class="user_charge">'+i.charge+'/'+i.total+'</div>'
                                                  :'')+
                                                  '<div class="user_progress" style="background:'+color+';"></div>'+
                                                  controls+
                                               '</div>';
                                        }
                              
                    }
                    if ((!existExecutive)&&(this.options.data.active.roleId==1)) {
                              chain+=buttonAddExecutive;
                    }
                    return chain;
          },
          getTitle:function(){
                    var chain='';
                              var i = this.options.data.active;
                              var nom = i.username;
                              var role = validator.getRol(i.roleId);
                              var id = "user_"+i.id+"i";
                              chain+='<div id="'+id+'" class="item_user_selected">'+
                                        '<div class="user_color" style="background:'+i.color+';"></div>'+
                                        '<div class="user_alias">'+nom+'</div>'+
                                        '<div class="user_role">('+role+')</div>'+
                                        ((i.charge)?
                                        '<div class="user_charge">'+i.charge+'/'+i.total+'</div>'
                                        :'')+
                                        '<div class="user_progress" style="background:'+i.color+';"></div>'+
                                        ((i.parent!=null)?
                                                  '<div class="user_back" id="back'+i.parent+'" style="position:absolute;left:2px;top:10px;"><img src="img/back.png"></div>'
                                         :''
                                         )+
                                        
                                     '</div>';
                    
                    return chain;
          },
          update:function(){
                   this.buildStructure();
                   this.events();
          },
	  buildStructure:function(){
                    var chain = '<div id="custom_branch_users" class="custom_branch_users">'+
                                        this.getTitle()+
                                        this.getUsers()+
                               '<div>';
                    this.element.html(chain);
	  },
          
          events:function(){
                    var obj = this;
                    var process = obj.options.process;
                    $(".custom_branch_users .item_user").each(function(){
                              
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        pos=parseInt(id.replace('itemu',''));
                                        var user = obj.options.data.users[pos];
                                        var valid = false;
                                        if (process=="consult") {
                                                  if ((user.hasNodes)&&(user.roleId<5)) {
                                                            valid=true;
                                                  }
                                        }
                                        if (process=='administration') {
                                                  if (user.roleId<5) {
                                                            valid=true;
                                                  }
                                        }
                                        
                                        if (valid) {
                                                  //code
                                                  user.parent = obj.options.data.active.id
                                                  structure.getUsersRequest({action:'getnodes',id:user.id});
                                                  //structure.getUsersRequest(user);
                                        }
                                        
                              });
                    });
                    
                    $(".custom_branch_users .user_back").click(function(){
                                        var id = $(this).attr('id');
                                        id = id.replace('back','');
                                        structure.getUsersRequest({action:'getnodes',id:id});
                                        //structure.getUsersRequest({id:id});
                    });
                    
                    if(process=='administration'){
                              
                              $('.custom_branch_users .user_action').each(function(){
                                        $(this).click(function(event){
                                                  var action = $(this).attr('action');
                                                  var id = $(this).attr('user');
                                                  id = id.replace('u','');
                                                  var title = $(this).attr('_title');
                                                  var params={
                                                            data:{
                                                                title:title,
                                                                buttons:[
                                                                    {label:'',event:function(div){
                                                                        obj.searchRequest({id:id},action,div);
                                                                    }}
                                                                ],
                                                                firstActive:true,
                                                                showbuttons:false,
                                                                rebuild:true
                                                            }
                                                        };
                                                  $("#custom_branch_users").customMenu(params);
                                                  event.stopPropagation();
                                        });
                              });
                              $(".button_add_user").click(function(){
                                        
                                                  var params={
                                                            data:{
                                                                title:'Nuevo '+ validator.getRol(obj.options.data.active.roleId+1),
                                                                buttons:[
                                                                    {label:'',event:function(div){
                                                                        var params={action:'new',data:{},userActive:obj.options.data.active};
                                                                        $("#"+div).customForm(params);
                                                                    }}
                                                                ],
                                                                firstActive:true,
                                                                showbuttons:false,
                                                                rebuild:true
                                                            }
                                                        };
                                                   $("#custom_branch_users").customMenu(params);
                                        
                              });
                              
                              $(".button_add_user_executive").click(function(){
                                        
                                                  var params={
                                                            data:{
                                                                title:'Nuevo '+ validator.getRol(6),
                                                                buttons:[
                                                                    {label:'',event:function(div){
                                                                        var params={action:'new',data:{},userActive:obj.options.data.active,addExecutive:true};
                                                                        $("#"+div).customForm(params);
                                                                    }}
                                                                ],
                                                                firstActive:true,
                                                                showbuttons:false,
                                                                rebuild:true
                                                            }
                                                        };
                                                   $("#custom_branch_users").customMenu(params);
                                        
                              });
                    }else{
                              $('.custom_branch_users .user_action').each(function(){
                                        $(this).click(function(event){
                                                  var action = $(this).attr('action');
                                                  var id = $(this).attr('user');
                                                  var active = obj.totalUsers[id];
                                                  switch (action) {
                                                            case 'finish':
                                                                      $(".app_left_section").deliveredCharge({userActive:obj.options.data.active,data:{active:active}});
                                                                      break;
                                                            case 'upload':
                                                                      $('body').upload({data:{user:active,width:300,height:180}});
                                                                      break;
                                                            case 'charge':
                                                                      $('.app_left_section').assignCharge({userActive:obj.options.data.active,data:{active:active}});
                                                                      break;
                                                            case 'download':
                                                                      window.open(connections.charge.download.url+'user='+active.id);
                                                                      break;
                                                  }
                                                  event.stopPropagation();
                                        });
                              });
                    }
                    graph.show(obj.options.data.active);
                    
          },
          defineClock:function(){
                    structure.defineClockUserRequest({action:'getnodes',id:this.options.data.active.id});
          },
          searchNodes : function(params,action,idDiv){
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.success){
                                        valid=true;
                                        obj.createForm(json.data.user,action,idDiv);
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                              
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                    };
                    r = $.extend(r, connections.users.search);
                    
                    r.data=JSON.stringify(params);
                    r.url=r.url+'/id/'+params.id;
                    r.type='GET';
                    
                    $.ajax(r);
          },
          searchRequest : function(params,action,idDiv){
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.success){
                                        valid=true;
                                        obj.createForm(json.data.user,action,idDiv);
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                              
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                    };
                    r = $.extend(r, connections.users.search);
                    
                    r.data=JSON.stringify(params);
                    r.url=r.url+'/id/'+params.id;
                    r.type='GET';
                    
                    $.ajax(r);
          },
          createForm:function(data,action,id){
                    var obj=this;
                    var o = obj.options;
                    var params={action:action,data:data,userActive:o.userActive};
                    $("#"+id).customForm(params);
          },
          
          _create: function() {
		this.buildStructure();
                this.events();
                this.defineClock();
                //this.eventsToItems();
          },
      
          _refresh: function(){
            // trigger a callback/event
            this._trigger( "change" );
          },
         
          _destroy: function() {
              this.element.remove();
          },
    
          _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
          },
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  this.options.data=value;
                                                  this.update();
                                                  this.defineClock();
                                                  features.loadPredios(this.options.data.active);
                                        break;
                                        case "process":
                                                  this.options.process=value;
                                                  this.update();
                                                  this.defineClock();
                                        break;
                                        case "reload":
                                                  //structure.getUsersRequest(obj.options.userActive);
                                                  structure.getUsersRequest({action:'getnodes',id:this.options.data.active.id});
                                                  
                                                  
                                        break;
                                        
                                        
                                                  
                                                          
                              }
		    }
	  }
);
});