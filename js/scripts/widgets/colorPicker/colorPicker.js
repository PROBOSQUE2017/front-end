define(["connections","Alert","webmapservices"], function(connections,Alert,webmapservices){
$.widget( "custom.colorPicker", {
	  id:'custom_colorPicker',
          root:'body',
          options:{
                 data:{
                        color:'',
                        layer:'',
                        id:'',
                        event:$.noop()
                 }
                 
          },
	  _init:function(){
            var obj=this;
            $("."+obj.id).show(); 
	  },
          
      update:function(){
            var obj = this;
            var clase = 'itemColorSelected';
            var color = obj.options.data.color.replace("#",'');                 
            $("."+clase).removeClass(clase);
            $('div [ref='+color+']').addClass(clase);      
      },
      getHeader : function(){
                    var obj = this;
                    var chain='<div class="Header">'+
                                        '<div class="label">Seleccione el color para la capa '+obj.options.data.layer+'</div>'+
                                        '<div class="icon"><div class="template_colorPicker tmr_back"></div></div>'+
                              '</div>';
                    return chain;
      },
      getSectionColors:function(){
            var obj = this;
            var chain = '<div class="dataColors">'+
                              '<div style="position:absolute;top:10px;bottom:10px;left:15px;right:15px">'+
                              obj.getPallete()+
                              '</div>'+
                        '</div>';
            return chain;
      },
      getPallete:function(){
            var pallete = webmapservices.colorOverlays;
            var chain='';
            chain+='<div class="row">';
            for(var x in pallete){
                  var color = pallete[x];
                  var ref=color.replace('#','');
                  chain+='<div class="col s12 m4 l3 itemColor" ref="'+ref+'">'+
                              '<p style="height:50px;background:'+color+'">'+
                                    '<div class="border"></div>'+
                              '</p>'+
                          '</div>';
            }
            chain+='</div>';
            return chain;
      },
	  buildStructure:function(){
                    var obj = this;
                    var o = obj.options.data;
                    var chain=''+
                    '<div id="'+obj.id+'" class="'+obj.id+'">'+
                             '<div class="veil"></div>'+
                             '<div class="mainContainer">'+
                                        '<div class="column w100" style="height:100%;">'+
                                         '<div class="container">'+
                                                   '<div class="data">'+ 
                                                             obj.getHeader()+
                                                             obj.getSectionColors()+
                                                   '</div>'+
                                         '</div>'+
                                        '</div>'+
                              '</div>'+
                    '</div>';
                    $("."+obj.id).remove();
                    $(obj.root).append(chain);
	  },
          
          events:function(){
                  var obj = this;
                  $("."+obj.id + " .itemColor").each(function(){
                        var clase = 'itemColorSelected';
                        $(this).click(function(){
                             var color = $(this).attr('ref');
                             $("."+clase).removeClass(clase);
                             $(this).addClass(clase);
                             obj.options.data.color = "#"+color;
                        });      
                  });
                  
                  $("."+obj.id +" .icon").click(function(){
                        var id = obj.options.data.id;
                        var color = obj.options.data.color;
                        $("."+obj.id).hide();
                        obj.options.data.event(color,id);
                        
                  });
          },
          closeWindow:function(){
                    var obj =this;
                    $("."+obj.id+" .iconClose").click();
          },
          _create: function() {
                   this.buildStructure();
                   this.events();
                   this.update();
          },
      
          _refresh: function(){
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
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});