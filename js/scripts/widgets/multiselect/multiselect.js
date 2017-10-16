define([], function(){
$.widget( "custom.multiselect", {
	  id:'custom_multiselect',
          root:'body',
          options:{
                 data:{
                    id:null,
                    info:{},
                    item:null,
                    parent:'',
                    section:''
                 }
          },
	  _init:function(){
                    
	  },
          
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          isCheckedAll:function(data){
                    var obj = this;
                    var counter=0;
                    for(var x in data){
                              var i = data[x];
                              if (i.selected) {
                                        counter+=1;
                              }
                    }
                    return (counter==data.length)?true:false;
          },
          getList:function(data){
                    var obj = this;
		    // arreglo de ids a los que se le aplicara la letra cursiva
                    var idsCursivas = ["hospedero", "plaga_enfermedad"];
		    // si el id del multiselect se encuentra en el arreglo, le agrega el estilo, de lo contrario le agrega cadena vacia
                    var cursiva = ($.inArray(obj.options.data.id,idsCursivas) !== -1) ? "style='font-style:italic;'" : ""; 
                    var chain='<ul class="collection">';
                    var checkedAll = (obj.isCheckedAll(data))?'checked="checked" ':'';
		    chain+=   '<a href="#!" class="collection-item">'+
                                        '<input type="checkbox" '+checkedAll+' class="multipleSelectItemAll" id="multiselect_'+obj.options.data.id+'"/><label for="multiselect_'+obj.options.data.id+'">Seleccionar todo</label>'+
                              '</a>'+
                    '</ul>'+
                    '<ul class="collection" '+cursiva+'>';
                    for(var x in data){
                              var i = data[x];
                              var checked = (i.selected)?' checked="checked" ':'';
                              chain+='<a href="#!" class="collection-item">'+
                                        '<input type="checkbox" '+checked+' class="multipleSelectItem" id="multiselect_'+x+'" value="'+i.value+'" pos="'+x+'" /><label for="multiselect_'+x+'">'+i.label+'</label>'+
                                     '</a>';
                    }
                    chain+='</ul>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj = this;
                    var o = obj.options.data.info;
                    var chain=''+
                    '<div id="'+obj.id+'" class="'+obj.id+'">'+
                              '<div id="modalMultiselect" class="modal modal-fixed-footer">'+
                                        '<div class="modal-content">'+
                                          '<h4>Seleccione '+o.label+'</h4>'+
                                          obj.getList(o.list.list)+
                                        '</div>'+
                                        '<div class="modal-footer">'+
                                          '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Aceptar</a>'+
                                        '</div>'+
                              '</div>'+
                    '</div>';
                    $("."+obj.id).remove();
                    $(obj.root).append(chain);
	  },
          storeSelected:function(){
                    var obj = this;
                    var selected = [];
                    $("."+obj.id +' .multipleSelectItem').each(function(){
                              var pos = $(this).attr('pos');
                              var status = $(this).prop('checked');
                              obj.options.data.info.list.list[pos].selected=status;
                    });
                    if (obj.options.data.section=='tabular') {
                              $(obj.options.data.parent).customTabular('updateMultiSelect',obj.options.data.id,obj.options.data.info);
                    }else{
                              $(obj.options.data.parent).customSubtable('updateMultiSelect',obj.options.data.id,obj.options.data.info);
                    }
                    
                    //$(".app_tabular").customTabular('updateMultiSelect',obj.options.data.id,obj.options.data.info);
          },
          enableStatusCheckBoxAll:function(){
                    var obj = this;
                    var all = true;
                    $("."+obj.id +' .multipleSelectItem').each(function(){
                             var status = $(this).prop('checked');
                             if (!status) {
                                        all=false;
                             }
                    });
                    $("#multiselect_"+obj.options.data.id).prop('checked',all);
                    
          },
          enableAllCkeckBoxes:function(status){
                    var obj = this;
                    $('.'+obj.id +' input[class="multipleSelectItem"]').prop('checked',status);
                    
          },
          events:function(){
                    var obj=this;
                    $("#modalMultiselect").openModal({
                              ready: function() {
                              
                              }, 
                              complete: function() {
                                        obj.storeSelected();
                                        $("#"+obj.id).remove();
                              } 
                    });
                    $("#multiselect_"+obj.options.data.id).click(function(){
                              var status = $(this).prop('checked');
                              obj.enableAllCkeckBoxes(status);
                    });
                    $('.'+obj.id +' .multipleSelectItem').each(function(){
                              $(this).click(function(){
                                        obj.enableStatusCheckBoxAll();
                              });
                    });
          },
          
          
      
          _create: function() {
          		/*
          		*@Description. Dentro del if se agrega el atributo selected en caso de estar 
          		* seleccionado un solo elemento en el multiselect.
          		* Esta sentencia solo se ejecuta cuando es la primera vez que el usuario
          		* consulta el multiselect
          		*/
          		let valoresIniciales = this.options.data.info.value.trim().split(',');
          		let catalogos =  this.options.data.info.list.list;
          	   	if(valoresIniciales.length == 1 ){          	   		
          	   		for (let i = 0, len = catalogos.length; i < len; i++) {
						
                		if (catalogos[i]['value'] === valoresIniciales[0]) {
                    	 	 catalogos[i].selected=true;
                		}
            		}
                  
			   	}
			   	/*
			   	* Fin del bloque
			   	*/

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
                                                  this.options.data = value;
                                                  this.update(value);
                                        break;
                                                          
                              }
		    }
	  }
);
});