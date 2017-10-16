define(["connections","Alert"], function(connections,Alert){
$.widget( "custom.textArea", {
	  id:'custom_textArea',
          root:'body',
          options:{
                 data:{
                    field:'',
                    idInput:'',
                    label:'',
                    text:'',
                    mode:'',//delete,edit,new,consult,
                    maxlength:0,
                    dataType:''
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
                                        '<div class="label">'+obj.options.data.label+'</div>'+
                                        '<div class="icon"><div class="template_textArea tta_back"></div></div>'+
                              '</div>';
                              
                    return chain;
          },
          getAttributeReadOnly : function(){
                    var obj = this;
                    var response='';
                    switch (obj.options.data.mode) {
                              case 'delete':
                              case 'consult':
                                        response=' readonly ';
                              break;
                    }
                    return response;
          },
          getData : function(){
                    var obj = this;
                    var additionalOption=obj.getAttributeReadOnly(); 
                    var chain='<div class="dataComments">'+
                              '<div class="containerTextArea">'+
                                    '<textarea id="infoTextArea" '+additionalOption+' maxlength="'+obj.options.data.maxlength+'">'+
                                          obj.options.data.text+
                                    '</textarea>'+
                              '</div>'+
                              '</div>';
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
                    $("."+obj.id+" .tta_back").click(function(){
                              var text = $(".dataComments #infoTextArea").val();
                              $("input[id='"+obj.options.data.idInput+"']").val(text);
                             $("."+obj.id).hide();
                    });
                    if (obj.options.data.dataType=='alphanumeric') {
                              $("."+obj.id+" #infoTextArea").bind("keypress", function(evt) {
                                                var otherresult = 12;
                                                  if(window.event != undefined){
                                                        otherresult = window.event.keyCode;
                                                  }
                                                  var charCode = (evt.which) ? evt.which : otherresult;  
                                                  var keyChar = String.fromCharCode(charCode);
                                                  var keyChar2 = keyChar.toLowerCase();
                                                  var re =   /^[a-z0-9 ]+$/i
                                                  var result = re.test(keyChar2);
                                                  return result;                               
                              }).bind("paste",function(event){
                                        return false;
                                        
                              });
                    }
                    
      },
      closeWindow:function(){
                    var obj =this;
                    $("."+obj.id+" .iconClose").click();
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