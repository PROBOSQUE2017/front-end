define([], function(){
$.widget( "custom.notification", {
          id:'custom_notification',
          counter:0,
	  options:{
                 data:{}
          },
	  _init:function(){
                    
	  },
          showMessage:function(m){
                    var obj=this;
                    obj.counter+=1;
                    var id = obj.id+obj.counter;
                    var chain='<div id="'+id+'" class="item_notification">'+
                                        '<div parent="'+id+'" id="'+id+'_close" class="icon">'+
                                                  '<div class="template_notifications tn_close"></div>'+
                                        '</div>'+
                                        '<div class="label">'+m+'</div>'+
                              '</div>';
                    $("."+obj.id).append(chain);
                    $("#"+id).hide();
                    $("#"+id).show( 'slide', {direction:"up"}, 500 );
                    obj.event(id+'_close');
          },
          buildMesages:function(){
                    var obj = this;
                    var m = obj.options.data;
                    for(var x in m){
                              obj.showMessage(m[x]);
                    }
          },
          event:function(id){
                    $("#"+id).click(function(){
                              var id = $(this).attr('parent');
                              $("#"+id).hide( 'slide', {direction:"up"}, 500,function(){
                                        $("#"+id).remove();
                              });
                              
                    });        
          },
          buildStructure:function(){
                    var obj = this;
                    var chain='<div class="'+obj.id+'"></div>';
                    $(".app_right_section").append(chain);
          },
          update:function(){
                   this.buildMesages();
          },
          
          _create: function() {
		this.buildStructure();
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
                                                  this.options.data=value;
                                                  this.update();
                                        break;
                              }
		    }
	  }
);
});