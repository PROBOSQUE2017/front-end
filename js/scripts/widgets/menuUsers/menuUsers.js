$.widget( "custom.menuUsers", {
	  options:{
                    id:'menuUser_',
                    root:'body',
                    data:{
                              title:'Administracion de usuarios',
                              items:[
                                        
                              ]
                    }
                    
          },
	  _init:function(){
                    $(".background_menuUsers").show();
	  },
          
          update:function(data){
                    
          },
          getItems:function(a){
                    var obj =this;
                    var chain ='';
                    var id = obj.options.id;
                    for(var x in a){
                              var i = a[x];
                              chain+=   '<div id="'+id+i.icon+'" class="item">'+
                                                  '<div class="icon" align="center">'+
                                                    '<div class="menuUsers_template mu_'+i.icon+'"></div>'+
                                                  '</div>'+
                                                  '<div class="label">'+i.title+'</div>'+
                                        '</div>';
                    }
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain = '<div class="background_menuUsers">'+
                                        
                                        '<div class="title_section">'+
                                            '<div class="back_button">'+
                                                  '<div class="menuUsers_template_back"></div>'+
                                            '</div>'+
                                            '<div class="item">'+
                                                '<div class="icon" align="center">'+
                                                    '<div class="menuUsers_template mu_logo"></div>'+
                                                '</div>'+
                                                '<div class="label">'+o.title+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="options_section">'+
                                            obj.getItems(o.items)+
                                        '</div>'+
                              '</div>';
                    obj.hide();
                    $(obj.options.root).append(chain);
	  },
          
          hide:function(){
                 $(".background_menuUsers").hide();   
          },
          events:function(){ 
                    var obj =this;
                    var id = obj.options.id;
                    for(var x in obj.options.data.items){
                              var i = obj.options.data.items[x];
                              $("#"+id+i.icon).click(function(){
                                        var item = $(this);
                                        var id = item.attr('id').replace('menuUser_','');
                                        obj.options.data.events[id](item);
                              });
                    }
                    $(".back_button").click(function(){
                              obj.hide();
                    });
          
          },
      
          _create: function() {
		this.buildStructure();
                this.events();
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
                                                          
                              }
		    }
	  }
);