define(["connections"], function(connections){
$.widget( "custom.workTeams", {
	  id:'custom_assignUsers',   
          options:{
                    data:{
                              user:null
                    }
          },
	  _init:function(){
                    
	  },
          
          request : function(params){
                    var obj=this;
                    var user = obj.options.data.user;
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde'
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        var chain = obj.getStructureAssign(json.data);
                                        obj.buildStructure(chain);
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    showMessage(msg);
                                }
                                
                            },
                            beforeSend: function(solicitudAJAX) {
                                //$(aditional.spinner).removeClass(clase);
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                //$(aditional.btn).removeClass(clase);
                                //$(aditional.spinner).addClass(clase)
                            }
                            };
                    r = $.extend(r, connections.workTeams);
                    //r.data=JSON.stringify(params);
                    r.data=params;
                    $.ajax(r);
          },         
          getUsers:function(data){
                    var obj = this;
                    var chain='';
                    var u = data.users;
                    for(var x in u){
                              var i = u[x];
                              chain+=   '<div class="item_user" user="'+i.id+'">'+
                              
                                                  '<div class="information" align="center">'+
                                                            '<div class="container_users">'+
                                                                      '<div class="icon">'+
                                                                                '<div class="template_assignUsers tas_user_big"></div>'+
                                                                      '</div>'+
                                                                      '<div class="foot">'+
                                                                                '<div class="label">'+i.alias+'</div>'+
                                                                      '</div>'+
                                                            '</div>'+
                                                            
                                                  '</div>'+
                                                  '<div class="filled"></div>'+
                                        '</div>';
                    }
                    return chain;
          },
          
          update:function(){
                   var obj=this;
                   var user = obj.options.data.user;
                   var params = {action:'getnodes',id:user.id};
                   this.request(params);
                   
                   /*
                   this.buildStructure();
                   this.events();
                   */
          },
          getListUsers:function(data){
                    var obj=this;
                    var u = data.users;
                    var chain='<div class="list_table">';
                    for(var x in u){
                              i = u[x];
                              chain+='<div class="list_row">'+
                                        '<div class="list_cell">'+
                                            'icono'+
                                        '</div>'+
                                        '<div class="list_cell">'+
                                            i.alias+
                                        '</div>'+
                                    '</div>';
                    }
                    chain+='</div>';
                    return chain;
          },
          getStructure:function(data){
                    var obj = this;
                    var chain='<div class="drag_section">'+
                                        
                              '</div>'+
                              '<div class="info_users">'+
                                        '<div class="title"></div>'+
                                        '<div class="list_users">'+
                                                  obj.getListUsers(data)+
                                        '</div>'+
                                        
                              '</div>';
                  
                    return chain;     
          },
          getStructureAssign:function(data){
                    var obj = this;
                    return  obj.getUsers(data);             
          },
	  buildStructure:function(content){
                    var obj = this;
                    
                    var chain='<div class="'+obj.id+'">'+
                                        content+
                              '</div>';
                    this.element.html('');
                    this.element.append(chain);
	  },
          print:function(){
                            
          },
          
          events:function(divName){
                    $(".item_user").click(function(){
                              var params={
                                        data:{
                                            title:'Grupos de trabajo',
                                            buttons:[
                                                {label:'Base',event:function(id){
                                                    $("#"+id).workTeams({data:{user:user}});
                                                }}
                                            ],
                                            firstActive:true,
                                            showbuttons:false
                                        }
                                    };
                              $(this).customMenu(params);
                    });
                    
          },
      
          _create: function() {
		this.update();
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
                                                  this.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});