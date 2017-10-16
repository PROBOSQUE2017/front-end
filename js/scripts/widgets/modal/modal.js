define(["connections","Alert"], function(connections,Alert){
$.widget( "custom.modal", {
	  id:'custom_modal',
          root:'body',
          options:{
                 data:{
                    folio:'',
                    user:'',
                    action:'',
                    path:'',
                    consecutivo:'',
                    field:''
                 }
          },
	  _init:function(){
                    
	  },
          
          update:function(){
                   this.buildStructure();
                   this.events();
          },
          getHeader : function(){
                    var obj = this;
                    var chain='<div class="Header">'+
                                        '<div class="label">'+obj.options.data.folio+'</div>'+
                                        '<div class="icon"><div class="template_modal tmm_back"></div></div>'+
                              '</div>';
                    return chain;
          },
          getData : function(){
                    var obj = this;
                    var o = obj.options.data;
                    var path=o.path+'action='+o.action+'&user='+o.user+'&folio='+o.folio+'&consecutivo='+o.consecutivo+'&field='+o.field; path=o.path+'action='+o.action+'&user='+o.user+'&folio='+o.folio+'&consecutivo='+o.consecutivo+'&field='+o.field;
                    var archivo = o.field.substring(0,3);
                    if (archivo == 'pdf') {
                      path=o.path+'action='+o.action+'&user='+o.user+'&folio='+o.folio+'&consecutivo='+o.consecutivo+'&field=url';                      
                      var chain = '<div id="portapdf"> <object data="'+path+'" type="application/pdf" width="100%" height="500"></object> </div>'; 
                    }else{
                      var chain='<div class="dataRecords" align="center">'+
                                        '<img id="file_loaded" style="height:95%; width:95%" src="'+path+'">'+
                              '</div>';
                    }
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
                                                             obj.getData()+
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
                    $("."+obj.id+" .tmm_back").click(function(){
                             $("."+obj.id).hide();
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
                                                  this.counter=0;
                                                  this.options.data = value;
                                                  this.update(value);
                                        break;
                                                          
                              }
		    }
	  }
);
});