define(["webmapservices","map","features","validator","Alert", "structure"], function(webmapservices,map,features,validator,Alert, structure){
$.widget( "custom.overlays", {
          id:'custom_overlays',
          counter:0,
          clock:null,
          temporal:null,
          overlays:null,
	  options:{
                    userActive:null,
                    controller:null
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getLayers:function(layers,group){
                    var chain = '';
                    for(var y in layers){
                              var l = layers[y];
                              chain+='<div class="item_layer">'+
                                        '<input class="inputLayer" id="'+group+'_'+y+'" type="checkbox" '+((l.active)?'checked':'')+' group="'+group+'">'+
                                        '<label for="'+group+'_'+y+'" class="label">'+l.label+'</label>'+
                                     '</div>';
                    }
                    return chain;
          },
          getGroups:function(){
                    var o = webmapservices.overlays;
                    var chain ='';
                    var obj=this;
                    for(var x in o){
                           var group = o[x];
                           chain+='<div class="item_group">'+
                                        //'<div class="title">'+group.label+'</div>'+
                                        obj.getLayers(group.layers,x)+
                                  '</div>';
								  
                    }
                    return chain;
          },
          getFeatureGroup:function(){
                    var layers = features.getFeatureLayers();
                    var chain ='';
                    var obj=this;
                    chain+='<div class="item_group">';
                    var group='feature_layer';
                    for(var y in layers){
                              obj.counter+=1;
                              var l = layers[y];
                              var label = (l.label.length>25)?l.label.substring(0,25)+'...': l.label;
                              chain+='<div class="item_layer" id="dinamicFeature'+obj.counter+'">'+
                                        '<input class="inputFeatureLayer" id="'+group+'_'+y+'" type="checkbox" '+((l.active)?'checked':'')+' group="'+group+'" ref="'+l.id+'">'+
                                        '<label for="'+group+'_'+y+'" class="label truncate" title="'+l.label+'">'+label+'</label>'+
                                        
                                        '<div class="delete_layer" parent="dinamicFeature'+obj.counter+'" ref="'+l.id+'"><div class="template_overlays tov_close"></div></div>'+
                                        '<div id="color_'+obj.counter+'" class="color" label="'+l.label+'" color="'+l.color+'" ref="'+l.id+'" style="background:'+l.color+'"></div>'+
                                        '<div class="zoom_layer" wkt="'+l.wkt+'"><div class="template_overlays tov_zoom"></div></div>'+
                                        //'<input class="color" type="text" ref="'+l.id+'" color="'+l.color+'" />'+
                                     '</div>';
                    }
                    chain+='</div>';
                    return chain;
          },
          getThemes:function(){
                    var layers = features.getThemes();
                    var chain ='';
                    var obj=this;
                    var contador=0;
                    
                    chain+='<div class="item_group">';
                    
                    var group='theme_layer';
                    chain+='<div class="title_theme">Tem&aacute;tico</div>';
                    chain+='<select class="inputThemes">'+
                              '<option value="-1">Seleccione un tema </option>';
                    for(var y in layers){
                              var l = layers[y];
                              chain+='<option value="'+l.id+'">'+l.label+'</option>';
                              contador+=1;
                    }
                    chain+='</select>';
                    chain+='<div class="graphOverlay"></div>';
                    chain+='</div>';
                    if (contador==0) {
                              chain='';
                    }
                    return chain;
          },
         
	  buildStructure:function(){
                    var obj=this;
                    obj.overlays=webmapservices.overlays;
                    var chain='<div class="'+obj.id+'">'+
                                                 obj.getGroups()+
                              '</div>';
                    $(obj.element).append(chain);
                    var chainTematic = '<div class="custom_overlays">'+
                                                  '<div class="list_dynamicLayers">'+
                                                            obj.getFeatureGroup()+
                                                  '</div>'+
                                                  '<div class="info_tematics">'+
                                                            obj.getThemes()+
                                                 '</div>'+
                                       '</div>';
                    $("#programs_data").append(chainTematic);
					
						
	  },
          updateLayers:function(actives){
                    var obj = this;
                    var actualTematic = $(".inputThemes option:selected").val();
                    
                    $("#programs_data").html('');
                    var chainTematic = '<div class="custom_overlays">'+
                                                  '<div class="list_dynamicLayers">'+
                                                            obj.getFeatureGroup()+
                                                  '</div>'+
                                                  '<div class="info_tematics">'+
                                                            obj.getThemes()+
                                                 '</div>'+
                                       '</div>';
                    $("#programs_data").append(chainTematic);
                    obj.eventsFroDynamicLayers();
					
                    if (actualTematic!='-1') {
                              if (actualTematic) {
                                        $(".inputThemes").val(actualTematic);
                                        $(".inputThemes").change();
										
								
                              }
                    }
                    for(var x in actives){
                              var i = actives[x];
                              $('input[ref="'+i+'"]').click();
							
                    }
					 
          },
          show:function(){
                 $("."+this.id).show();  
				 
          },
          
          hide:function(){
                 $("."+this.id).hide();   
          },
          clearClock:function(){
                    var obj = this;
                    if(obj.clock){
                             clearTimeout(obj.clock); 
                    }
          },
          getLayersFromGroup : function(group){
                    var obj = this;
                    var g = obj.overlays[group];
                    var layers=[];
                    for(var x in g.layers){
                              if (g.layers[x].active) {
                                       layers.push(x);
                              }
                              
                    }
                    return layers.join(',')
          },
          setGroup:function(group){
                    obj=this;
                    if (obj.temporal==null) {
                          obj.temporal={}; 
                    }
                    obj.temporal[group]=true;
                    obj.clearClock();
                    obj.clock= setTimeout(function(){
                          var array = [];
                          for(var g in obj.temporal){
                              var layers =obj.getLayersFromGroup(g);
                              array.push({layer:g,params:{layers:layers}});
                              map.activeLayers(array);
							  
							  
                          }
                          obj.temporal=null;
                    },1000);
          },
          showGraph:function(){
                    var infoThemes = features.getInfoThemes();
                     var data = [];
                     var colores = [];
                     var contador=0;
                    for(var x in infoThemes){
                              contador+=1;
                              var i = infoThemes[x];
                              var zona = contador;
                              zona = validator.getRoman(zona);
                              data.push({name:zona,y:i.info.total,color:i.info.color});
                              colores.push(i.info.color);
                    }
                    
                    
                    $('.graphOverlay').highcharts({
                              chart: {
                                  type: 'column'
                              },
                              title: {
                                  text: ''
                              },
                              colors: colores,
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  type: 'category',
                                  labels: {
                                      enabled:false
                                  }
                              },
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: ''
                                  }
                              },
                              credits:{
                                  enabled:false
                              },
                              legend: {
                                  enabled: false
                              },
                              tooltip: {
                                  pointFormat: '{point.y}'
                              },
                              series: [{
                                  name: 'Population',
                                  data: data,
                                  dataLabels: {
                                      enabled: false,
                                      
                                  }
                              }]
                    });
                    
                    $(".graphOverlay").show();
          },
          hideGraph:function(){
                    $(".graphOverlay").html('');
          },
          events:function(){
                    var obj=this;
                    
                    $(".inputLayer").each(function(){
                              
                              $(this).click(function(){
                                      var status = $(this).prop( "checked" );  
                                      var id =$(this).attr('id');
                                      var group = $(this).attr('group');
                                      var layer = id.replace(group+'_','');
                                      obj.overlays[group].layers[layer].active = status;
                                      obj.setGroup(group);
									
							  
							  
                              });
                    });
                    obj.eventsFroDynamicLayers();
                   
                    
          },
          updateColor:function(color,id){
                            $("div [id="+id+"]").attr('color',color);
                            $("div [id="+id+"]").css('background',color);
                            
                            
                            var ref = $("div [id="+id+"]").attr('ref');
                            features.updateColor(ref,color);
							
							
						
          },
          eventsFroDynamicLayers:function(){
                    var obj=this;
                    
                    $(".inputFeatureLayer").each(function(){
                              $(this).click(function(){
                                      var status = $(this).prop( "checked" );
                                      var ref = $(this).attr('ref');
                                      features.loadLayer(ref,status);
									//inicio
									 if (status == false){
										var ref2= document.getElementById("Titulodeprograma").innerHTML;
										var ref3 = ', '+ ref;
										ref2=ref2.replace(ref3,'');
										document.getElementById("Titulodeprograma").innerHTML=ref2;
									 }
									 
									 else 
									 {
										document.getElementById("Titulodeprograma").innerHTML+=', '+ref;
										 
									 }
									 //fin 
                              });
                    });
                    $("."+obj.id +" .color").each(function(){
                              $(this).click(function(){
                                        var color = $(this).attr('color');
                                        var layer = $(this).attr('label');
                                        var id = $(this).attr('id');
                                        $('body').colorPicker({data:{
                                                                      color:color,
                                                                      layer:layer,
                                                                      id:id,
                                                                      event:function(color,id){
                                                                                obj.updateColor(color,id);
                                                                                }
                                                                      }
                                                            });
                              });
                    });
                    
                    $(".inputThemes").change(function(){
                              var id = $(".inputThemes :selected").val();
                              if (id=='-1') {
                                        obj.hideGraph();
										 	
                              }
                              features.loadTheme(id);
                    });
                    $(".delete_layer").each(function(){
                              $(this).click(function(){
                                        var parent = $(this).attr('parent');
                                        var layer = $(this).attr('ref');
                                        obj.deleteDynamicLayer(layer,parent);
                                        
                              });
                    });
                    $(".zoom_layer").each(function(){
                              $(this).click(function(){
                                        var wkt = $(this).attr('wkt');
                                        if (wkt) {
                                                 map.goToWkt(wkt);
                                        }
                                        
                                        
                              });          
                    });
          },
          removeFromThemes:function(layer){
                    var obj = this;
                    var id = $(".inputThemes :selected").val();
                    if (id==layer) {
                              $(".inputThemes").val('-1');
                              $(".inputThemes").change();
                    }
                    $(".inputThemes option[value='"+layer+"']").remove();
          },
          deleteDynamicLayer:function(layer,div){
                    var obj = this;
                    Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:'notification',
                                        messages:['&iquest;Realmente desea eliminar la capa "'+layer+'"?'],
                                        buttons:[
                                                  
                                                  {label:'Si',event:function(){
                                                            $("#"+div).remove();
                                                            obj.removeFromThemes(layer);
                                                            features.removeFeatureLayer(layer);
															
                                                  }},
                                                  {label:'No'},
                                                  ]
                    });
          },
           _init:function(){
                   this.show();
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
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  //this.options.data = value;
                                                  //this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});