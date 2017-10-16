define(["webmapservices","map"], function(webmapservices,map){
$.widget( "custom.tools", {
	  id:'custom_tools',
          buttons:{},
          selected:'',
          options:{
                 userActive:null,   
                 data:{
                              buttons:[
                                        {label:'Ver mapa completo',ctl:'extent',keepPressed:false,active:false},
                                        {label:'Acercar',ctl:'zoomIn',keepPressed:true,active:false},
                                        {label:'Alejar',ctl:'zoomOut',keepPressed:true,active:false},
                                        {label:'Desplazar',ctl:'pan',keepPressed:false,active:false},
                                        {label:'Buscar',ctl:'search',keepPressed:false,active:false},
                                        {label:'Medir distancia',ctl:'measureDistance',keepPressed:true,active:false},
                                        {label:'Medir area',ctl:'measureArea',keepPressed:true,active:false},
                                        {label:'Imprimir',ctl:'print',keepPressed:false,active:false}
                                        
                                        //{label:'Identificar',ctl:'identify',keepPressed:true,active:false},
                                        
                              ]
                    }
          },
	  _init:function(){
                    
	  },
          getButtons:function(){
                    var obj = this;
                    var chain='';
                    var b = obj.options.data.buttons;
                    for(var x in b){
                              obj.buttons[b[x].ctl]=b[x];
                              chain+=   '<div class="item_tool" align="center" title="'+b[x].label+'">'+
                                                  '<div class="icon" id="'+obj.id+'_'+b[x].ctl+'">'+
                                                            '<div class="template_tools tt_'+b[x].ctl+'"></div>'+
                                                  '</div>'+
                                                  '<div class="border"></div>'+
                                        '</div>';
                    }
                    return chain;
          },
          
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
	  buildStructure:function(){
                    var obj = this;
                    
                    var chain='<div class="'+obj.id+'">'+
                                        obj.getButtons()+
                              '</div>';
                  
                    this.element.append(chain);
	  },
          getCtl:function(id){
                    var obj=this;
                    var ctl = id.split(obj.id+'_');
                    ctl = ctl[1];
                    return ctl;
          },
          changeStatus:function(id){
                    var obj = this;
                    var ctl = obj.getCtl(id);
                    var item =  $("#"+id);
                    if (obj.buttons[ctl].keepPressed) {
                                                  if (!obj.buttons[ctl].active) {
                                                            item.children().removeClass('tt_'+ctl);
                                                            item.children().addClass('tt_'+ctl+'_selected');
                                                            obj.selected=id;
                                                            obj.buttons[ctl].active=true;
                                                  }else{
                                                            obj.buttons[ctl].active=false;
                                                            item.children().removeClass('tt_'+ctl+'_selected');
                                                            item.children().addClass('tt_'+ctl);
                                                            obj.selected='';
                                                  }
                    }
          },
          events:function(){
                    var obj=this;
                    $(".custom_tools .icon").each(function(){
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        if ((id!=obj.selected)&&(obj.selected!='')) {
                                                  obj.changeStatus(obj.selected);
                                        }
                                        obj.changeStatus(id);
                                        var ctl = obj.getCtl(id);
                                        map.activeControl({control:ctl,active:obj.buttons[ctl].active});
                              });
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
    
          _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
          },
 
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  //this.update(value);
                                        break;
                                                          
                              }
		    }
	  }
);
});