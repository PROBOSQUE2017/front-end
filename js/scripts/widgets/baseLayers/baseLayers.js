define(["webmapservices","map"], function(webmapservices,map){
$.widget( "custom.baseLayers", {
          id:'custom_baseLayer',
	  options:{
                    controller:null
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getItemsLayer : function(){
                    var b = webmapservices.bases;
                    var chain='';
                    for(var x in b){
                              var i = b[x];
                              var path = 'img/bases/'+i.img;
                               chain += '<div  id="'+this.id+'_'+x+'" class="item_layer" base="'+x+'">'+
                                                  '<div class="image"><img src="'+path+'"></div>'+
                                                  '<div class="label">'+i.label+'</div>'+
                                        '</div>';   
                    }
                    
                    return chain;
          },
          activeActualBase:function(){
                    var layer = map.getActiveBaseLayer();
                    var id = this.id+'_'+layer.name;
                    this.selectItem(id);
          },
          selectItem:function(id){
                    var clase = 'item_layer_selected';
                    var obj=this;
                    var idParent = this.element.attr('id');
                    $("#"+idParent+" ."+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
          },
	  buildStructure:function(){
                    var obj=this;
                    var chain='<div class="'+obj.id+'">'+
                                                 obj.getItemsLayer()+
                              '</div>';
                    $(obj.element).append(chain);
	  },
          
          show:function(){
                 $("."+this.id).show();   
          },
          
          hide:function(){
                 $("."+this.id).hide();   
          },
          
          events:function(){
                    var clase = 'item_layer_selected';
                    var obj=this;
                    var id = this.element.attr('id');
                    $("#"+id +' .item_layer').each(function(){
                              $(this).click(function(){
                                        var iditem = $(this).attr('id');
                                        obj.selectItem(iditem);
                                        var base = $(this).attr('base');
                                        map.setBaseLayer(base);
                              });
                    });
                    obj.activeActualBase();
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
                                                  //this.options.data = value;
                                                  //this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});