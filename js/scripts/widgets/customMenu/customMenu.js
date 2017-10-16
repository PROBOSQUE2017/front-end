define([], function(){
$.widget( "custom.customMenu", {
	  options:{
                    root:'body',
                    data:{
                              title:'',
                              buttons:[],
                              firstActive:false,
                              showbuttons:true,
                              rebuild:false
                    },
                    buttons:{}
                    
          },
	 
          
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getButtons:function(o){
                    
                    var obj=this;
                    var chain='';
                    if (o.showbuttons) {
                              for(var x in o.buttons){
                                        var i = o.buttons[x];
                                        var id = obj.id+'btn'+x;
                                        obj.options.buttons[id]={event:o.buttons[x].event}
                                        chain+='<div id="'+id+'" class="option_item">'+i.label+'</div>';
                              }
                    }
                    return chain;
          },
          getBar:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain='<div class="option_item_back"><div class="icon"><div class="custom_menu_back"></div></div></div>'+
                              '<div class="option_item_title">'+o.title+'</div>'+
                              obj.getButtons(o);
                    return chain;
                    
          },
	  buildStructure:function(){
                    var obj=this;
                    var id = this.element.attr('id');
                    var o = obj.options.data;
                    obj.id="custom_menu_"+id;
                    var chain='<div class="custom_menu" id="'+obj.id+'">'+
                                                  '<div class="cs_header">'+
                                                            '<div class="custom_header_image"></div>'+
                                                  '</div>'+
                                                  '<div class="cs_section">'+
                                                     obj.getBar()+
                                                  '</div>'+
                                                  '<div id="'+obj.id+'_container" class="container"></div>'+
                              '</div>';
                    $(".background_form").remove();
                    $("#"+obj.id).remove();
                    $(obj.options.root).append(chain);
	  },
          
          show:function(){
                 $("#"+this.id).show();   
          },
          
          hide:function(){
                 $("#"+this.id).hide();   
          },
          activeMainButton:function(id){
                    var obj=this;
                    var clase = 'option_item_selected';
                    $("#"+obj.id + ' .'+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
          },
          events:function(){
                    var obj=this;
                    var idContainer= obj.id+'_container';
                    $("#"+obj.id +' .option_item').each(function(){
                              
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        obj.activeMainButton(id);
                                        obj.options.buttons[id].event(idContainer);
                              });
                              
                    });
                    $("#"+obj.id +' .option_item_back').click(function(){
                              obj.hide();
                    });
                    if (obj.options.data.firstActive) {
                              obj.options.data.buttons[0].event(idContainer);
                              obj.activeMainButton(obj.id+'btn0');
                    }
          },

           _init:function(){
                   this.show();
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
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  if (this.options.data.rebuild) {
                                                            this.options.data=value;
                                                            this.update();
                                                  }
                                        break;
                                                          
                              }
		    }
	  }
);
});