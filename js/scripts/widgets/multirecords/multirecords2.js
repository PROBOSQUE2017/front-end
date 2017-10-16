define(["connections","Alert"], function(connections,Alert){
$.widget( "custom.multirecords", {
	  id:'custom_multirecords',
          root:'body',
          counter:0,
          fields:{},
          totalFields:0,
          operations:[],
          options:{
                 data:{
                    field:null,
                    label:'',
                    mode:'',//delete,edit,new,consult,
                    folio:'',
                    parent:null
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
                                        '<div class="icon"><div class="template_multirecords tmr_back"></div></div>'+
                              '</div>'+
                              (((obj.options.data.mode=='new')||(obj.options.data.mode=='edit'))?'<div class="iconAdd"><div class="template_multirecords tmr_add"></div></div>':'')+
                              //'<div class="titles"></div>'+
                              '';
                              //'<div class="titles"><div class="label">Nuevo registro</div></div>';
                    return chain;
          },
          getData : function(){
                    var obj = this;
                    var chain='<div class="dataRecords">'+
                                        
                              '</div>';
                    return chain;
          },
          addDivRecord:function(id,data){
                    $("."+obj.id+" .dataRecords").append(chain);
          },
          storeRecord:function(data){
                    var obj = this;
                    obj.counter+=1;
                    var idRecord = 'R'+obj.counter;
                    fields[idRecord]=data;
                    obj.addDivRecord(idRecord,data);
          },
          getForm : function(){
                    var obj = this;
                    var chain='<div class="formRecords">'+
                                        '<div class="Header">'+
                                                  '<div class="label">'+obj.options.data.label+'</div>'+
                                        '</div>'+
                                        '<div class="iconClose"><div class="template_multirecords tmr_close"></div></div>'+
                                        '<div class="fields">'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          getValueFromList:function(list,selected){
                    var value = '';
                    for (var x in list) {
                            if (list[x].value==selected) {
                              value = list[x].label;
                              break;
                            }
                    }
                    return value;
                    
          },
          getValue:function(data){
                    var value = '';
                    value = (data.datatype=='list')?obj.getValueFromList(data.list.list,data.value):data.value;
                    value = (value)?value:'';
                    return value;
          },
          showListRecords:function(data){
                    var obj=this;
                    var chain='';
                    var source = [];
                    obj.listRecords=null;
                    obj.listRecords={};
                    var contador = 0;
                    obj.totalFields = 0;
                    for(var x  in obj.fields){
                              source.push(obj.fields[x]);
                              contador+=1;
                              if (contador==3) {
                                        break;
                              }
                    }
                    chain+='<div class="multirecords_table_rows">'+
                              '<div class="Heading">';
                                        var clase = 'borderRow';
                                        for(var x in source){
                                                 var clase = (x==0)?'':'borderRow';
                                                 chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            source[x].label+
                                                        '</div>';
                                        }
                    chain+=   '</div>';
                    
                    var clase = '';
                    for(var x in data){
                              obj.totalFields+=1;
                              var i = data[x].columns;
                              var idRecord = 'R'+i[0].field+x;
                              obj.listRecords[idRecord] = i; 
                             
                              chain+='<div class="Row itemRecord" ref="'+idRecord+'">';
                                        for(var y=0;y<source.length;y++){
                                               chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            obj.getValue(i[y])+
                                                            
                                                      '</div>';  
                                        }
                              chain+='</div>';
                                  
                    }
                    chain+='</div>';
                    $("."+obj.id+" .dataRecords").html(chain);
                    $("."+obj.id+" .dataRecords .itemRecord").each(function(){
                              $(this).click(function(){
                                        $("."+obj.id+" .formRecords").show();
                                        var ref = $(this).attr('ref');
                                        var mode = (obj.options.data.mode=='new')?'consult':obj.options.data.mode;
                                        var params={action:mode,data:obj.listRecords[ref],operations:obj.operations,userActive:obj.options.data.userActive,folio:obj.options.data.folio,subtable:obj.options.data.field,source:"."+obj.id+" .formRecords .fields",section:'subtable'};
                                        $("."+obj.id+" .formRecords .fields").customSubtable(params);
                              });
                    });
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
                                                             obj.getForm()+
                                                   '</div>'+
                                         '</div>'+
                                        '</div>'+
                              '</div>'+
                    '</div>';
                    $("."+obj.id).remove();
                    $(obj.root).append(chain);
	  },
          updateRecordList:function(){
                    var obj=this;
                    obj.request({action:'getall',name:obj.options.data.field,folio:obj.options.data.folio,user:obj.options.data.userActive.id},'getListRecords');        
          },
          events:function(){
                    var obj = this;
                    $("."+obj.id+" .formRecords").hide();
                    obj.fields=null;
                    obj.fields={};
                    obj.request({action:'get',name:obj.options.data.field,folio:obj.options.data.folio,user:obj.options.data.userActive.id},'getInputs');
                    //obj.updateRecordList();
                    if (obj.options.data.mode!='new') {
                              //code
                    }
                    $("."+obj.id+" .tmr_back").click(function(){
                              $("div[id='"+obj.options.data.idInput+"_records']").html(obj.totalFields+" Registros");
                              $("div[id='"+obj.options.data.idInput+"']").attr('value',obj.totalFields);
                              var destiny = $("div[id='"+obj.options.data.idInput+"']").attr('destiny');
                              if (destiny) {
                                      $("#tb_add_"+destiny).val(obj.totalFields);
                                      $("#tb_add_"+destiny).keyup();
                              }
                              obj.options.data.parent.customTabular('makeRequestSummary',obj.options.data.idInput);
                             $('.background_subtable').html('');
                             $("."+obj.id).hide();
                              $('.background_subtable').remove('');
                    });
                    $("."+obj.id+" .iconAdd").click(function(){
                              
                              $("."+obj.id+" .formRecords").show();
                              obj.request({action:'get',name:obj.options.data.field,folio:obj.options.data.folio,user:obj.options.data.userActive.id},'newRecord');
                    });
                    $("."+obj.id+" .iconClose").click(function(){
                              $("."+obj.id+" .formRecords").hide();
                    });
          },
          closeWindow:function(){
                    var obj =this;
                    $("."+obj.id+" .iconClose").click();
          },
          request : function(params,action){
                    obj=this;
                    params = (params)?params:{};
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        switch (action) {
                                                  case 'getInputs':
                                                            obj.fields = json.data;
                                                            obj.operations = null;
                                                            obj.operations=[];
                                                            obj.operations = json.operations;
                                                            
                                                  break;
                                                  case 'getListRecords':
                                                            obj.showListRecords(json.data);
                                                            
                                                  break;
                                                  case 'newRecord':
                              
                                                            var params={action:'new',data:json.data,operations:json.operations,userActive:obj.options.data.userActive,folio:obj.options.data.folio,subtable:obj.options.data.field,source:"."+obj.id+" .formRecords .fields",section:'subtable'};
                                                            //var params={action:obj.options.data.mode,data:json.data,operations:json.operations,userActive:obj.options.data.userActive,folio:obj.options.data.folio,subtable:obj.options.data.field};
                                                            $("."+obj.id+" .formRecords .fields").customSubtable(params);
                                                            
                                                  break;
                                                  
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage([msg],'error');
                                    
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                        
                                }
                                
                            },
                            beforeSend: function(xhr) {
                                //xhr.withCredentials = true;
                                //$(aditional.btn).addClass(clase);
                                //$(aditional.spinner).removeClass(clase);
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                        
                            },
                            complete: function(solicitudAJAX,estatus) {
                                //$(aditional.btn).removeClass(clase);
                                //$(aditional.spinner).addClass(clase)
                                if (action=='getInputs') {
                                        obj.updateRecordList();
                                }
                                
                            }
                    };
                    switch (action) {
                              case 'getInputs':
                                        r = $.extend(r, connections.multirecords.getInputs);
                                        r.data = params;
                                        break;
                              case 'getListRecords':
                                        r = $.extend(r, connections.multirecords.getList);
                                        r.data = params;
                                        break;
                              case 'newRecord':
                                        r = $.extend(r, connections.multirecords.getInputs);
                                        r.data = params;
                              break;
                    }
                    $.ajax(r);
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