define(["validator","connections","structure","map"], function(validator,connections,structure,map){
$.widget( "custom.layers", {
          id:'custom_layers_data',
          bases:null,
	  options:{
                 userActive:null,   
                 data:{
                    title:'Capas'
                 }
          },
	  _init:function(){
                  this.show();
	  },
          
          
          getTitle:function(){
                    var chain='';
                              var obj=this;
                              chain+='<div class="item_layer_head">'+
                                        '<div class="layer_alias">'+obj.options.data.title+'</div>'+
                                        //'<div class="user_back" id="back_layers_data"><img src="img/back.png"></div>'+
                                     '</div>';
                    return chain;
          },

          
          getDataBlocks:function(){
                    var chain='<div class="data_blocks">'+
                                        '<div class="options">'+
                                                 '<div id="bases" class="option_data" type="1">'+
                                                            '<div class="label">Base</div>'+
                                                           
                                                 '</div>'+
                                                 
                                                 '<div id="overlays" class="option_data" type="2">'+
                                                            '<div class="label">Vectoriales</div>'+
                                                           
                                                 '</div>'+
                                                 
                                                 '<div id="programs" class="option_data" type="3">'+
                                                            '<div class="label">Programa</div>'+
                                                           
                                                 '</div>'+
                                                 
                                        '</div>'+
                                        '<div class="list_data">'+
                                                  '<div id="bases_data"  class="rows bases_data"></div>'+
                                                  '<div id="overlays_data" class="rows overlays_data"></div>'+
                                                  '<div id="programs_data" class="rows programs_data"></div>'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          
         
	  buildStructure:function(){
                    var chain = '<div id="'+this.id+'" class="'+this.id+'">'+
                                        this.getTitle()+
                                        this.getDataBlocks()+
                               '<div>';
                    this.element.html(chain);
	  },
          selectOption:function(id){
                    var clase = 'option_selected_layers';
                    var idSelected = $("."+clase).attr('id');
                    $("."+idSelected+'_data').hide();
                    $("."+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
                    $("."+id+'_data').show();
                    
          },
         
          events:function(){
                    var obj=this;
                    $("#"+obj.id+" .rows").each(function(){
                              $(this).hide();
                    });
                    $("#"+obj.id+" .option_data").each(function(){
                    
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                    obj.selectOption('overlays');
                  
                  
                    $("#back_layers_data").click(function(){
                              obj.hide();
                    });
                    $(".bases_data").baseLayers();
                    $(".overlays_data").overlays({userActive:obj.options.userActive});
                    
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
    
          _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
          },
          show:function(){
                    this.element.show();
                    $('.app_left_section_information,.app_left_section_notification').hide();
          },
          hide:function(){
                    this.element.hide();   
          },
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "something":
                                                    
                                        break;
                              }
		    }
	  }
);
});