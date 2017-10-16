define(["validator","connections","structure","map","features"], function(validator,connections,structure,map,features){
$.widget( "custom.deliveredCharge", {
          id:'custom_deliveredCharge',
          dataDelivered:null,
          countSpinner:0,
          invalid:{},
	  options:{
                 userActive:null,   
                 data:{
                    active:null
                 }
          },
	  _init:function(){
                    
	  },

          getTitle:function(){
                    var chain='';
                              var obj=this;
                              var userActive = obj.options.userActive;
                              var user = this.options.data.active;
                              var charge = (user.charge)?user.charge:0;
                              var nom = user.username;
                              var role = validator.getRol(user.roleId);
                              var validation = (obj.options.data.active.phases.btnValidateCharge)?true:false;
                              
                              chain+='<div class="item_user">'+
                                        
                                        '<div class="user_alias">'+nom+'</div>'+
                                        '<div class="user_role">('+role+')</div>'+

                                         ((obj.options.userActive)?
                                                  '<div class="user_back" id="back_deliveredCharge"><img src="img/back.png"></div>'
                                         :''
                                         )+
                                         '<div class="userTools">'+
                                                  (
                                                  (!validation)?
                                                            '<div class="icon_upload">'+
                                                                      '<div class="template_deliveredCharge tdc_upload"></div>'+
                                                            '</div>'+
                                                            
                                                            '<div class="icon_download">'+
                                                                      '<div class="template_deliveredCharge tdc_download"></div>'+
                                                            '</div>'
                                                            :''
                                                  )+
                                         '</div>'+
                                         
                                     '</div>';
                                     
                    
                    return chain;
          },

          
          getDataBlocks:function(){
                    var obj=this;
                    var validation = obj.options.data.active.phases.btnValidateCharge;
                    var classValidation = (validation)?'rowsValidation':'';
                    var chain='<div class="data_blocks">'+
                                        '<div class="options">'+
                                                 '<div id="dataDelivered" class="option_data" type="1">'+
                                                            '<div class="label">Entregados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                                 '<div id="dataByDelivering" class="option_data" type="2">'+
                                                            '<div class="label">Por entregar</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                        '</div>'+
                                        '<div class="list_data">'+
                                                  '<div class="rows dataDelivered_data '+classValidation+'"></div>'+
                                                  '<div class="rows dataByDelivering_data"></div>'+
                                                  (
                                                            (validation)?
                                                            '<div class="dataDelivered_data_validation" align="center">'+
                                                                      '<button class="textButton" id="storeValidation">Guardar validaci&oacute;n</button>'+
                                                            '</div>'
                                                            : ''
                                                   )+
                                                  
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          
          
          update:function(){
                   this.buildStructure();
                   this.events();
          },
	  buildStructure:function(){
                    var chain = '<div id="'+this.id+'" class="'+this.id+'">'+
                                        this.getTitle()+
                                        this.getDataBlocks()+
                                        this.getBlocker()+
                               '<div>';
                    $('.'+this.id).remove();
                    this.element.html(chain);
	  },
          selectOption:function(id){
                    var clase = 'option_selected_delivered';
                    var idSelected = $("."+clase).attr('id');
                    $("."+idSelected+'_data').hide();
                    $("."+idSelected+'_data_validation').hide();
                    $("."+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
                    $("."+id+'_data').show();
                    $("."+id+'_data_validation').show();
                    
          },
         
          events:function(){
                    var obj=this;
                    $(".dataDelivered_data_validation").hide();
                    $("#"+obj.id+" .rows").each(function(){
                              $(this).hide();
                    });
                  $("#"+obj.id+" .option_data").each(function(){
                    
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                  var btnToActive = 'dataByDelivering';
                  if (obj.options.data.active.phases.btnValidateCharge) {
                              btnToActive='dataDelivered';
                  }
                  obj.selectOption(btnToActive);
                  obj.valid=null;
                  obj.valid={};
                  obj.updateMainList();
                  
                    $("#back_deliveredCharge").click(function(){
                              features.clearPolygons();
                              $('.app_left_section').userbranch({reload:true});
                    });
                    
                    $("."+obj.id+' .icon_upload').click(function(){
                              $('body').upload({data:{user:obj.options.data.active,width:300,height:180}});
                    });
                    $("."+obj.id+' .icon_download').click(function(){
                              window.open(connections.charge.download.url+'user='+obj.options.data.active.id);
                    });
                    $("#storeValidation").click(function(){
                              var ids = obj.getInvalids();
                              obj.requestList({action:'set',user:obj.options.data.active.id,ids:ids});
                    });

          },
          updateMainList:function(){
                    var obj=this;
                    if (obj.options.data.active.phases.btnValidateCharge) {
                    
                              obj.requestList({action:'get',type:'validated',user:obj.options.data.active.id},'dataDelivered');
                    }else{
                              obj.requestList({action:'get',type:'delivered',user:obj.options.data.active.id},'dataDelivered');
                    }
                    obj.requestList({action:'get',type:'notuploaded',user:obj.options.data.active.id},'dataByDelivering');
                   
          },
          fillTable:function(data,container){
                    var obj=this;
                    var chain='';
                    obj.dataDelivered=null;
                    obj.dataDelivered={};
                    chain+='<div class="delivered_table_results">';
                    
                    var clase = 'rowFilled';
                    $("#"+container +' .total').html('('+data.length+')');
                    
                    var btnValidateCharge = (this.options.data.active.phases.btnValidateCharge)?true:false;
                    
                    for(var x in data){
                              var i = data[x];
                              var aditionalClase='';
                              var validateCharge ='';
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled ';
                              }
                              var idItem = obj.id+'Row'+i.id;
                              
                              var deleteOption ='';
                              var optionButtons='';
                              if (container=='dataDelivered') {
                                        
                                        optionButtons ='<div id="'+idItem+'_tracklog" item="'+i.id+'" class="optionTracklog">'+                            
                                                                      '<div class="template_deliveredCharge tdc_tracklog"></div>'+
                                                       '</div>';
                                        var wkt = i.wkt;
                                        aditionalClase=' polygon';
                                        validateCharge = (btnValidateCharge)?'<div active="true" item="'+i.id+'" class="icon_input template_deliveredCharge tdc_check"></div>':'';
                                        if (!i.valid) {
                                                  obj.valid['item'+i.id]=i.id;
                                        }
                              }else{
                                        optionButtons ='<div id="'+idItem+'_RowSel" item="'+i.id+'" class="optionRow">'+                            
                                                                      '<div class="template_deliveredCharge tdc_row"></div>'+
                                                       '</div>';
                                        var wkt=i.point;
                              }
                              
                              obj.dataDelivered['item'+i.id]=i;
                              
                              chain+='<div id="'+idItem+'" class="Row '+clase+aditionalClase+'" wkt="'+wkt+'">'+
                                        '<div class="Cell text_center">'+
                                            (
                                             (validateCharge!='')?validateCharge:i.id
                                             )+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            i.predio+
                                            optionButtons+
                                        '</div>'+
                                    '</div>';
                              
                    }
                    chain+='</div>';
                    
                    $('.'+container+'_data').html(chain);
                    $('.'+container+'_data .delivered_table_results .Row').each(function(){
                              $(this).click(function(){
                                        var wkt=$(this).attr('wkt');
                                        if (wkt.indexOf('POINT')!=-1) {
                                                  map.goPoint(wkt);
                                        }else{
                                                  map.goPolygon(wkt);
                                        }
                              });
                              
                    });
                    
                    $('.'+container+'_data .delivered_table_results .polygon').each(function(){
                              
                              $(this).mouseover(function(){
                                        var id = $(this).attr('id');
                                        var wkt=$(this).attr('wkt');
                                        if (wkt.indexOf('POLYGON')!=-1) {
                                                  id = id.replace(obj.id+'Row','');
                                                 features.selectPolygon(id);
                                        }
                              });
                              
                    });
                    
                    $('.'+container+'_data .delivered_table_results .optionTracklog').each(function(){
                              $(this).click(function(event){
                                        
                                        var item = $(this).attr('item');
                                        obj.drawTracklog(item);
                                        
                                        event.stopPropagation();
                              });
                              
                    });
                    if (container=='dataDelivered') {
                              //features.loadPolygons(data);
                              $('.'+container+'_data').mouseleave(function(){
                                        features.unselectPolygon();
                              });
                              $('.'+container+'_data .delivered_table_results .icon_input').each(function(){
                                        $(this).click(function(event){
                                                  var status = $(this).attr('active');
                                                  var clase='';
                                                  $(this).removeClass('tdc_notcheck');
                                                  $(this).removeClass('tdc_check');
                                                  var id =$(this).attr('item');
                                                  if (status=='true') {
                                                            status = 'false';
                                                            clase='tdc_notcheck';
                                                            obj.addInvalid(id);
                                                  }else{
                                                            status = 'true';
                                                            clase='tdc_check';
                                                            obj.removeInvalid(id);
                                                  }
                                                  $(this).addClass(clase).attr('active',status);
                                                  event.stopPropagation();
                                        });
                              });
                    }

          },
          addInvalid:function(id){
                    
                    this.valid['item'+id]=id;
          },
          removeInvalid:function(id){
                    delete this.valid['item'+id];
          },
          getInvalids:function(){
                    var obj = this;
                    var response=[];
                    for(var x in obj.valid){
                              response.push(obj.valid[x]);
                    }
                    return response.join(',');
          },
          drawTracklog:function(id){
                    var predio = this.dataDelivered['item'+id].id;
                    console.log('generando ruta para predio '+predio);
                    
                   
          },
          
          getBlocker :function(){
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.gif">'+
                                                  '<div class="label">Procesando</div>'+
                                        '</div>'+
                                '</div>';
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
          showError:function(list){
                    
          },
          showMessage:function(){
                    
          },
          requestList : function(params,container){
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        if (params.action=='get') {
                                                  obj.fillTable(json.data.list,container);
                                        }else{
                                                  $('body').notification({data:['Se ha guardado con &eacute;xito la validaci&oacute;n de predios']});
                                        }
                                         
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                        obj.showSpinner();
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                                obj.hideSpinner();
                            }
                    };
                    var source =null;
                    switch (params.action){
                              case 'get':
                                        source = connections.deliveredCharge.getDelivered;
                                        if (params.type=='notuploaded') {
                                                  source = connections.deliveredCharge.getByDelivering;
                                        }
                                        if (params.type=='validated') {
                                                  source = connections.validateCharge.get;
                                        }
                                        
                                        break;
                              case 'set':
                                        source = connections.validateCharge.set;
                                        break;
                    }
                    r = $.extend(r, source);
                    
                    if (params.action=='get') {
                              r.data = params;
                    }else{
                              for(var x in params){
                                        r.url+='&'+x+'='+params[x];
                              }
                    }
                    
                    $.ajax(r);
          },
          
          _create: function() {
		this.buildStructure();
                this.events();
                structure.clearClockUserRequest();
                //this.eventsToItems();
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
                                        case "userActive":
                                                  this.options.userActive=value;
                                                  this.countSpinner=0;
                                        break;
                                        case "data":
                                                  this.options.data=value;
                                                  this.update();
                                                  structure.clearClockUserRequest();
                                                  
                                        break;
                                        
                                        case "reload":
                                                  //structure.getUsersRequest(obj.options.userActive);
                                                  structure.getUsersRequest({action:'getnodes',id:this.options.userActive.id});
                                                  
                                        break; 
                              }
                              
		    }
	  }
);
});