define(["validator","connections","structure","Alert","features"], function(validator,connections,structure,Alert,features){
$.widget( "custom.upload", {
	  id:'custom_upload',
          countSpinner:0,
          options:{
                 dataFile:null,
                 data:{
                              user:null,
                              nameShape:null,
                              capa:null,
                              nombre_predio:null,
                              width:300,
                              height:180
                    }
          },
	  _init:function(){
                    
	  },
          getBlocker :function(){
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.GIF">'+
                                                  '<div class="label">Enviando informaci&oacute;n</div>'+
                                        '</div>'+
                                '</div>';
                    return chain;
          },
          getButtons:function(){
                    var obj = this;
                    var chain='';
                    var b = obj.options.data.buttons;
                    for(var x in b){
                              chain+=   '<div class="item_tool" align="center">'+
                                                  '<div class="icon">'+
                                                            '<div style="height:20px;width:20px;background:gray;"></div>'+
                                                  '</div>'+
                                                  '<div class="border"></div>'+
                                        '</div>';
                    }
                    return chain;
          },
          showSpinner:function(){
                    var obj=this;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").show();
                    }
                    obj.countSpinner+=1;
                   
          },
          hideSpinner:function(){
                    var obj=this;
                    obj.countSpinner-=1;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").hide();
                    }
          },
          getTitle:function(){
                    var chain='';
                    var o = this.options.data;
                    var title = 'Importar capa de informaci&oacute;n';
                    chain+=   '<div class="header_upload" style="width:'+o.width+'px">'+
                                        '<p class="label">'+title+'</p>'+
                                        
                              '</div>';
                    
                    return chain;
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getContentModal:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain='';
                    chain+=   obj.getTitle()+
                              '<div class="container_update" style="width:'+o.width+'px;height:'+o.height+'px;">'+
                                        '<div class="data_container">'+
                                                  '<div class="col s12 m12">'+
                                                            '<div class="Field">'+
                                                                      '<div class="label">Nombre de la capa</div>'+
                                                                      '<input class="textInput" id="name_layer" value="'+o.nameShape+'" disabled/>'+
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="addFileContainer">'+
                                                            '<div class="icon"><div class="template_upload tu_plus"></div></div>'+
                                                            '<div class="label">De clic para seleccionar el archivo</div>'+
                                                  '</div>'+
                                                  '<div class="fileSelected">'+
                                                            '<div class="icon"><div class="template_upload tu_zip"></div></div>'+
                                                            '<div class="label"></div>'+
                                                            '<div class="close"><div class="template_upload tu_close"></div></div>'+
                                                  '</div>'+
                                                  '<div class="buttons_section" align="center">'+
                                                            '<button id="btnLogingSend" class="textButton">Enviar</button>'+
                                                            '<button id="btnUploadCancel" class="textButton">Cancelar</button>'+
                                                            
                                                  '</div>'+
                                                  '<div class="msgErrorUpload">'+
                                                            '<label></label>'+
                                                  '</div>'+
                                                  obj.getBlocker()+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj = this;
                    var chain='<div class="'+obj.id+'">'+
                                        '<center>'+
                                        '<div class="veil_upload"></div>'+
                                        '<div class="modal_upload">'+
                                                  obj.getContentModal()+
                                        '</div>'+
                                        '</center>'+
                                       
                              '</div>';
                    $("."+this.id).remove();
                    this.element.append(chain);
	  },
          showFileSelected:function(name){
                    var total = 16;
                    var nameToShow = (name.length>total)? name.substring(0,total)+'...':name;
                    if (name.length>total) {
                              $(".fileSelected .label").attr('title',name);
                    }
                    $(".addFileContainer").hide();
                    $(".fileSelected").show();
                    $(".fileSelected .label").html(nameToShow);
                    $("#btnLogingSend").show();
          },
          showAddFile:function(){
                    $(".addFileContainer").show();
                    $(".fileSelected").hide();
                    $(".fileSelected .label").html('');
                    $("#btnLogingSend").hide();
          },
          showError:function(text){
                    var item = $(".msgErrorUpload");
                    item.children().html(text);
                    var evento = function(){
                              setTimeout(function(){
                                        item.hide();
                              },4000);
                    }
                    item.show( 'shake', {}, 500, evento );
                    
          },
          hide:function(){
                    $("."+this.id).remove();        
          },
          events:function(){
                    var obj=this;
                    var o = obj.options;
                    $("."+obj.id+' .blocker').hide();
                    $(".fileSelected,.msgErrorUpload").hide();
                    $("#btnLogingSend").hide();
                    var serviceUpload = connections.charge.upload.url;
                    var idForm = 'file';
                    $("#"+idForm).remove();
                    var chain = '<input type="file" name="'+idForm+'" id="'+idForm+'" data-url="" style="display:none"/>';
                    this.element.append(chain);
                    $('#'+idForm).fileupload({
                        formData: {
                              user: o.data.user,
                              layername:'',
                              capa:''
                        },      
                        dataType: connections.charge.upload.dataType,
                        //contentType: "application/json; charset=utf-8",
                        add: function (e, data) {
                            
                            var d = data.files[0];
                            var nameFile = (typeof(d.name)!="undefined")?d.name:d.fileName;
                            var valid = (nameFile.indexOf('.zip')!=-1)?true:false;
                            if(valid){
                                data.url=serviceUpload;
                                o.dataFile = data;
                                obj.showFileSelected(nameFile);
                            }else{
                                o.dataFile = null;
                                obj.showError('Archivo no valido');
                            }
                        }
                    });
                     
                    $('#'+idForm).bind('fileuploadsend', function (e, data) {
                       obj.showSpinner();
                    });
                    $('#'+idForm).bind('fileuploaddone', function (e, data) {
                        obj.hideSpinner();      
                        var r = data.result;
                        if(r.response.sucessfull){
                              obj.hide();
                                if(r.data.successfull)
                              {
                                    amplify.store('poligonosTmp', {data: r.data, nombrePredio:o.data.nombre_predio} );
                              //features.updateLayers();
                              Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:'notification',
                                        messages:['Archivo importado correctamente'],
                                        content:chain,
                                        buttons:[{label:'Cerrar'}]
                              });
                                /**
                              * Propiedades que tendra la ventana Popup.
                              * @const {string} caracteristicas
                              */
                              
                              const caracteristicas = "height="+(parseInt(screen.height)-100)+",width="+(parseInt(screen.width)-100)+",scrollTo,resizable=0,scrollbars=1,location=0";
                              
                              /**
                              * Construye y abre  una ventana 
                              * @returns {object}
                              */
                              
                              const  openWindows = ()=> window.open(connections.charge.predio.url, 'Popup', caracteristicas);
                              // Abre Popup
                              openWindows();
                            }
                            else{
                                 Alert.show({
                                        title:'Error',
                                        type:'error',
                                        messages:[r.data.mensaje],
                                        content:chain,
                                        buttons:[{label:'Cerrar'}]
                              });
                            }
                            
                        }else{
                            obj.showError(r.response.message);
                        }
                        
                    });
                    
                    $(".fileSelected .close").click(function(){
                              obj.showAddFile();
                    });
                    $(".addFileContainer").click(function(){
                              $("#"+idForm).click();
                    });
                    $("#btnLogingSend").click(function(){
                              var valor = $("#name_layer").val();
                              if (validator.isEmpty(valor)) {
                                        obj.showError('Introduzca un titulo');
                              }else{
                                        
                                        valor = validator.getFormatHtml(valor);
                                        valor = validator.replaceTags(valor);
                                        if (valor!='') {
                                                  o.dataFile.formData = { user: o.data.user,layername: valor,capa:o.data.capa };
                                                  o.dataFile.submit();
                                        }else{
                                                obj.showError('Introduzca un titulo valido'); 
                                        }
                                       
                              }
                    });
                    $("#btnUploadCancel").click(function(){
                              obj.hide();
                    });
                   /****************/
                   $("#name_layer").bind("keypress", function(evt) {
				var otherresult = 12;
				if(window.event != undefined){
				    otherresult = window.event.keyCode;
				}
				 var charCode = (evt.which) ? evt.which : otherresult;//window.event.keyCode;  
				 
				 if (charCode <= 12) {
					return true;
				 } 
				 else {
					
						var keyChar = String.fromCharCode(charCode);
						var keyChar2 = keyChar.toLowerCase();
						var re =   /[\u00E0-\u00E6\u00E8-\u00EB\u00EC-\u00EF\u00F2-\u00F6\u00F9-\u00FC\u0061-\u007a\u00f10-9 \-\,\.]/
						var result = re.test(keyChar2);
						return result; 
				 } 
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
                                                  this.options.data = value;
                                                  this.update();
                                                  this.countSpinner=0;
                                        break;
                                                          
                              }
		    }
	  }
);
});