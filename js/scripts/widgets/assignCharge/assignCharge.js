define(["validator","connections","structure","map","features","Alert"], function(validator,connections,structure,map,features,Alert){
$.widget( "custom.assignCharge", {
          id:'custom_assignCharge',
          clockTool:null,
          dataSelected:null,
          countSpinner:0,
	  options:{
                 userActive:null,   
                 process:'assign',
                 data:{
                    active:null
                 },
                 action:'add'
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
                              chain+='<div class="item_user">'+
                                        
                                        '<div class="user_alias">'+nom+'</div>'+
                                        '<div class="user_role">('+role+')</div>'+

                                        //'<div class="user_charge">'+charge+'</div>'+
                                       
                                        //'<div class="user_progress" style="background:'+user.color+';"></div>'+
                                        //((user.id!=userActive.id)?
                                         ((true)?
                                                  '<div class="user_back" id="back_assignCharge"><img src="img/back.png"></div>'
                                         :''
                                         )+
                                        
                                     '</div>';
                                     
                    
                    return chain;
          },

          
          getDataBlocks:function(){
                    var chain='<div class="data_blocks">'+
                                        '<div class="options">'+
                                                 '<div id="dataAssigned" class="option_data" type="1">'+
                                                            '<div class="label">Asignados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                                 '<div id="dataSelected" class="option_data" type="2">'+
                                                            '<div class="label">Seleccionados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                                 '<div id="dataNotAssigned" class="option_data" type="3">'+
                                                            '<div class="label">No Asignados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                        '</div>'+
                                        '<div class="list_data">'+
                                                  '<div class="rows dataAssigned_data"></div>'+
                                                  '<div class="rows dataSelected_data"></div>'+
                                                  '<div class="rows dataNotAssigned_data"></div>'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          
          getTools:function(){
                    var chain='<div class="section_tools">'+
                                        '<div class="assignTools">'+
                                                  '<div class="selector">'+
                                                            '<div style="padding-top: 14px;margin-left:3px">'+
                                                                      '<div class="template_assignCharge ArrowDownTool"></div>'+
                                                            '</div>'+
                                                            
                                                  '</div>'+
                                                  '<div id="tool_selected" class="tool_selected" active="false" action="add">'+
                                                            '<div style="padding:2px;">'+
                                                                      '<div class="template_assignCharge addTool"></div>'+
                                                            '</div>'+
                                                            
                                                
                                                  '</div>'+
                                                  '<div class="otherOptions">'+
                                                            '<div class="itemTool" action="add">'+
                                                                      '<div class="template_assignCharge addTool"></div>'+
                                                            '</div>'+
                                                            '<div class="itemTool" action="delete">'+
                                                                      '<div class="template_assignCharge deleteTool"></div>'+
                                                            '</div>'+
                                                            
                                                            
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="cancelButton"><button class="button">Cancelar</button></div>'+
                                        '<div class="assingButton"><button class="button">Aplicar</button></div>'+
                              '</div>';
                    return chain;
          },
          update:function(){
                   this.buildStructure();
                   this.events();
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
	  buildStructure:function(){
                    var chain = '<div id="'+this.id+'" class="'+this.id+'">'+
                                        this.getTitle()+
                                        this.getDataBlocks()+
                                        this.getTools()+
                                        this.getBlocker()+
                               '<div>';
                    $('.'+this.id).remove();
                    this.element.html(chain);
	  },
          selectOption:function(id){
                    var clase = 'option_selected_assign';
                    var idSelected = $("."+clase).attr('id');
                    $("."+idSelected+'_data').hide();
                    $("."+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
                    $("."+id+'_data').show();
                    
          },
          clearClockItemTools:function(){
                  if(this.clockTool){
                              clearTimeout(this.clockTool);
                  }        
          },
         executeClockItemTools:function(){
                 this.clearClockItemTools();
                 this.clockTool = setTimeout(function(){
                              $('.otherOptions').hide();
                    },2000);
                  
          },
          getToolActive:function(){
                 var action = $("#tool_selected").attr('action');
                 return action;
          },
          events:function(){
                    var obj=this;
                    
                   $("#"+obj.id+" .rows").each(function(){
                              $(this).hide();
                    });
                   $('.otherOptions').hide(); 
                  $("#"+obj.id+" .option_data").each(function(){
                    
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                  obj.selectOption('dataSelected');
                  
                  $(".selector").click(function(){
                              obj.clearClockItemTools();
                             $('.otherOptions').show(); 
                    });
                  $("#tool_selected").click(function(){
                              var clase ='tool_selected_active';
                              var classToadd='';
                              var action = $(this).attr('action');
                              var status=$(this).attr('active');
                              $(".tool_selected .template_assignCharge").removeClass('deleteTool_active').removeClass('addTool_active');
                              $(".tool_selected .template_assignCharge").removeClass('deleteTool').removeClass('addTool');
                              if (status=='true') {
                                        $(this).removeClass(clase);
                                        map.activeControl({control:'pan',active:true});
                                        status='false';
                                        classToadd = (action=='delete')?'deleteTool':'addTool';
                                        
                              }else{
                                        $(this).addClass(clase);
                                        map.activeControl({control:'squareSelector',active:true});
                                        status='true';
                                        classToadd = (action=='delete')?'deleteTool_active':'addTool_active';
                              }
                              $(".tool_selected .template_assignCharge").addClass(classToadd);
                              $(this).attr('active',status);
                    });
                  $(".otherOptions,.tool_selected,.selector").mouseleave(function(){
                              obj.executeClockItemTools();
                    });
                  $(".itemTool").each(function(){
                              $(this).click(function(){
                                        var action = $(this).attr('action');
                                        obj.options.action=action;
                                        $(".tool_selected").attr('action',action);
                                        $(".tool_selected .template_assignCharge").removeClass('deleteTool').removeClass('addTool');
                                        $(".tool_selected .template_assignCharge").removeClass('deleteTool_active').removeClass('addTool_active');
                                        var active = $(".tool_selected").attr('active');
                                        var classToSend = (active=='true')?action+'Tool_active':action+'Tool';
                                        $(".tool_selected .template_assignCharge").addClass(classToSend);
                                        $(".otherOptions").hide();
                              });
                    });
                  $(".otherOptions").mouseenter(function(){
                              obj.clearClockItemTools();
                    });
                  obj.updateMainList();
                  
                  $('.assingButton').click(function(){
                              var action = obj.getToolActive();
                               obj.sendSelected(action);
                    });
                  $('.cancelButton').click(function(){
                              
                              obj.clearSelected();
                    });
                    $("#back_assignCharge").click(function(){
                              $('.app_left_section').userbranch({reload:true});
                              var active = $(".tool_selected").attr('active');
                              if (active=='true') {
                                        map.activeControl({control:'pan',active:true});
                              }
                    });
                    
                    $("."+obj.id +" .blocker").hide();
          },
          updateMainList:function(){
                    var obj=this;
                    obj.requestList({action:'get',type:'assigned',user:obj.options.data.active.id},'dataAssigned');
                    obj.requestList({action:'get',type:'notassigned',user:obj.options.data.active.id},'dataNotAssigned');
                   
          },
          addRow:function(row,container){
                    var obj=this;
                    var i = row;
                    var exitTable = false;
                    var total = obj.getTotalSelected();
                    var chain='';
                    var idItem = obj.id+'Row'+i.id;
                    var clase ='';
                    if ($('.'+container+'_data .assign_table_results').attr('class')) {
                              exitTable=true;
                    }
                    var root = (!exitTable)?'.'+container+'_data':'.'+container+'_data .assign_table_results';
                    chain+=(!exitTable)?'<div class="assign_table_results">':'';
                    
                    
                    $("#"+container +' .total').html('('+total+')');
                    var deleteOption =  '<div id="'+idItem+'_delete" item="'+i.id+'" class="optionDelete">'+                            
                                                                      '<div class="template_assignCharge delTool"></div>'+
                                        '</div>';
                    chain+=   '<div id="'+idItem+'" class="Row '+clase+'" wkt="'+i.point+'">'+
                                        '<div class="Cell text_center">'+
                                            i.id+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            i.predio+
                                            deleteOption+
                                        '</div>'+
                              '</div>';
                    chain+=(!exitTable)?'</div>':'';
                    $(root).append(chain);
                    $('.'+container+'_data .assign_table_results .Row:last').click(function(){
                              var wkt=$(this).attr('wkt');
                              map.goPoint(wkt);
                    });
                   
                    $('.'+container+'_data .assign_table_results .optionDelete:last').click(function(){
                              var item = $(this).attr('item');
                              obj.deleteItemSelected(item);
                              $(this).parent().parent().remove();
                              event.stopPropagation();
                    });
                    
          },
          fillTable:function(data,container){
                    var obj=this;
                    var chain='';
                    
                    chain+='<div class="assign_table_results">';
                    /*
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading">'+
                                  '<p>Clave</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow">'+
                                  '<p>Predio</p>'+
                              '</div>'+
                          '</div>';
                          */
                    var clase = 'rowFilled';
                    $("#"+container +' .total').html('('+data.length+')');
                    if (container=='dataSelected') {
                              obj.dataSelected==null;
                              obj.dataSelected={};
                    }
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              var idItem = obj.id+'Row'+i.id;
                              var deleteOption ='';
                              var addOption='';
                              if (container=='dataSelected') {
                                        var deleteOption ='<div id="'+idItem+'_delete" item="'+i.id+'" class="optionDelete">'+                            
                                                                      '<div class="template_assignCharge delTool"></div>'+
                                                            '</div>';
                                        obj.dataSelected['item'+i.id]=i;
                              }
                              
                              if (container=='dataNotAssigned') {
                                        addOption = '<div class="addOption" item="'+i.id+'" predio="'+i.predio+'"><div class="template_assignCharge leftRow"></div></div>';
                              }
                              
                              chain+='<div id="'+idItem+'" class="Row '+clase+'" wkt="'+i.point+'">'+
                                        '<div class="Cell text_center">'+
                                            addOption+
                                            i.id+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            i.predio+
                                            deleteOption+
                                        '</div>'+
                                    '</div>';
                              
                    }
                    chain+='</div>';
                    $('.'+container+'_data').html(chain);
                    $('.'+container+'_data .assign_table_results .Row').each(function(){
                              $(this).click(function(){
                                        var wkt=$(this).attr('wkt');
                                        map.goPoint(wkt);
                              });
                              
                    });
                    $('.'+container+'_data .assign_table_results .optionDelete').each(function(){
                              $(this).click(function(event){
                                        
                                        
                                        var item = $(this).attr('item');
                                        obj.deleteItemSelected(item);
                                        $(this).parent().parent().remove();
                                        
                                        event.stopPropagation();
                              });
                              
                    });
                    $('.'+container+'_data .addOption').each(function(){
                              $(this).click(function(event){
                                        
                                        if (obj.dataSelected==null) {
                                                  obj.dataSelected={};
                                        }
                                        var a = $(this);
                                        var id = a.attr('item');
                                        if (!obj.dataSelected['item'+id]) {
                                                  var predio = a.attr('predio');
                                                  var wkt = $("#custom_assignChargeRow"+id).attr('wkt');
                                                  var data ={id: id, predio: predio, point: wkt};
                                                  obj.dataSelected['item'+id]=data;
                                                  obj.addRow(data,'dataSelected');
                                        }
                                        
                                        event.stopPropagation();
                              });
                    });
                    
          },
          deleteItemSelected:function(id){
                    delete this.dataSelected['item'+id];
                    var counter=0;
                    for(var x in this.dataSelected){
                              counter+=1;
                    }
                    $("#dataSelected .total").html('('+counter+')');
                   
          },
          showSelected:function(wkt){
                    var obj=this;
                    obj.selectOption('dataSelected');
                    var mode = obj.getToolActive();
                    obj.requestList({action:'get',type:'selected',mode:mode,wkt:wkt,user:obj.options.data.active.id},'dataSelected');
          },
          getTotalSelected:function(){
                    var obj=this;
                    var s = obj.dataSelected;
                    var count=0;
                    for(var x in s){
                              count+=1;
                    }
                    return count;
          },
          getSelected:function(){
                    var obj=this;
                    var s = obj.dataSelected;
                    var array=[];
                    for(var x in s){
                              array.push(s[x].id);
                    }
                    return array.join(',');
          },
          sendSelected:function(action){
                    var obj=this;
                    if (this.dataSelected!=null) {
                               var ids=this.getSelected();
                               var event = (action=='delete')?'delete':'assigned';
                              obj.requestList({action:'set',type:event,ids:ids,user:obj.options.data.active.id},'all');
                              
                    }
                    
          },
          clearSelected:function(){
                    $(".dataSelected_data").html('');
                    $("#dataSelected .total").html('(0)');
                    this.dataSelected=null;
          },
          showError:function(list){
                    var customStyle=(list.length>5)?'height:100px;overflow:auto;':'';
                    var chain = '<div style="width:100%;font-size:110%;'+customStyle+'" align="center">';
                    var clase = '';
                    for(var x in list){
                              clase = (clase=='')?'rowFilledError':'';
                              chain+='<div class="rowError '+clase+'">'+list[x].fol_predio+'</div>';
                    }
                    chain+='</div>';
                    Alert.show({
                              title:'Notificaci&oacute;n',
                              type:'error',
                              messages:['Los siguientes predios ya han sido asignados por otro usuario'],
                              content:chain,
                              buttons:[{label:'Cerrar'}]
                    });
          },
          showMessage:function(){
                    
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
                                                  //$(".user_charge").html(json.data.charge);
                                                  if (json.data) {
                                                            if (json.data.list) {
                                                                      obj.showError(json.data.list);
                                                            }
                                                  }
                                                  
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
                                if (params.action=='set') {
                                        obj.updateMainList();
                                        obj.clearSelected();
                                        features.updatePredios();
                                }
                                obj.hideSpinner();
                            }
                    };
                    var source =null;
                    switch (params.action){
                              case 'get':
                                        source = connections.assignCharge.getList;
                                        break;
                              case 'set':
                                        source = connections.assignCharge.setList;
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
                                        case "data":
                                                  this.options.data=value;
                                                  this.update();
                                                  structure.clearClockUserRequest();
                                        break;
                                        case "process":
                                                  this.options.process=value;
                                                  this.update();
                                        break;
                                        case "reload":
                                                  //structure.getUsersRequest(obj.options.userActive);
                                                  structure.getUsersRequest({action:'getnodes',id:this.options.userActive.id});
                                                  
                                        break; 
                              }
                              this.countSpinner=0;
		    }
	  }
);
});