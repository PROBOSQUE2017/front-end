define(["Openlayers","connections","validator","mappingConfig","webmapservices"], function(Openlayers,connections,validator,mappingConfig,webmapservices){
    
    var Map=null;
    var mapEvents = null;
    var dataTheme={};
    var activeUser =null;
    var strategy;
    var mapProjection = 'EPSG:900913';
    var ThemeLayer=null;
    var Themes=null;
    var FeatureLayers = {};
    var dataFeatureLayers={};
    var red = "#C23B22";
    var yellow = "#FFB347";
    var green = "#03C03C";
    var hex = '0123456789ABCDEF';
    var limits = {initial:0,middle:0,last:0};
    var actualActive=[];
    var colorReferece=[];
    var colorFeature= webmapservices.colorOverlays; 
    var getnewFeature = function(info,position){
	 var style = new OpenLayers.Style({
                    pointRadius: 6,
                    fillColor: "${color}",
                    fillOpacity:"${opacity}",
                    strokeColor: "${line}",
                    strokeWidth: 2,
                    strokeOpacity: 0.8,
		    //label : "${name}",
		    fontColor:"#fff"
                }, {
                    context: {
			color:function(feature){
			    //var color=colorFeature[position];
			    var color = colorReferece[position];
                return color;
			},
			line:function(feature){
			    var color = "#fff";
			    if (feature.info.type=='line') {
				//color=colorFeature[position];
                color = colorReferece[position];
			    }
			    return color;
			},
			
			opacity:function(feature){
			    var opacity=0.8;
			    if (feature.info.type=='polygon') {
				opacity=0.5;
			    }
			    
			    return opacity;
			}
                    }
        });
        
        var Feature = new OpenLayers.Layer.Vector(info.label, {
			styleMap: new OpenLayers.StyleMap({
			    "default": style,
			    "select": {
				fillColor: "#8aeeef",
				strokeColor: "#32a8a9"
			    }
			})
        });
	return Feature;
    }
    var clearDBFeatures=function(){
	var list = [];
	actualActive=null;
	actualActive=[];
	for(var x in FeatureLayers){
	    list.push(x);
	}
	for(var x in  FeatureLayers){
	    var i = FeatureLayers[x];
	    if (i.active) {
		actualActive.push(i.id);
		clearLayer(i.id);
	    }
	}
	for(var x in list){
	    Map.removeLayer(FeatureLayers[list[x]]);
	}
	FeatureLayers = null;
	FeatureLayers={};
	dataFeatureLayers=null;
	dataFeatureLayers = {};
    }
    var addDBFeatures = function(data){
	var Features = [];
	for(var x in data){
	    var i = data[x];
        if (!colorReferece[x]) {
            var newColor = colorFeature[x]+'';
            colorReferece.push(newColor);
        }
	    var newFeature = getnewFeature(i,x);
	    newFeature.id=i.id;
	    newFeature.color=colorReferece[x];
        newFeature.posColor=x;
	    newFeature.active=false;
	    newFeature.label=i.label;
	    newFeature.loaded=false;
	    newFeature.wkt = i.wkt;
	    FeatureLayers['F'+i.id]=newFeature;
	    Features.push(newFeature);
	}
	Map.addLayers(Features);
	var select = new OpenLayers.Control.SelectFeature(
                            Features,
                            {
                                clickout: true,
                                toggle: false,
                                multiple: false,
                                hover: false,
                                box: false
                            }
        );   
        Map.addControl(select);
	select.activate();
	for(var x in Features){
	    Features[x].events.on({
		    "featureselected": function(e) {
			showInfoFeature(e.feature);
		    }
	    });
	}	
	    	
    }
    
    var addThemeLayer = function(){
	
	var style = new OpenLayers.Style({
                    pointRadius: 4,
                    fillColor: "${color}",
                    fillOpacity:"${opacity}",
                    strokeColor: "#fff",
                    strokeWidth: 2,
                    strokeOpacity: 0.8,
		    //label : "${name}",
		    fontColor:"#fff"
                }, {
                    context: {
			color:function(feature){
			    return feature.info.color;
			},
			opacity:function(feature){
			    var opacity=0.5;
			    return opacity;
			}
                    }
        });
        
        ThemeLayer = new OpenLayers.Layer.Vector("Theme", {
                    styleMap: new OpenLayers.StyleMap({
                        "default": style,
                        "select": {
                            fillColor: "#8aeeef",
                            strokeColor: "#32a8a9"
                        }
                    })
        });
        Map.addLayers([ThemeLayer]);
    };
   
     var clearLayer=function(id){
	FeatureLayers['F'+id].removeFeatures(FeatureLayers['F'+id].features);
    };
    var addFeturesLayer = function(data,id){
	var features = [];
	clearLayer(id);
	dataFeatureLayers['F'+id]={};
	for(var x in data){
		var i = data[x];
		var f = new OpenLayers.Format.WKT('EPSG:4326').read(i.wkt);
		f.geometry = f.geometry.transform('EPSG:4326','EPSG:900913');
		tipo = 'point';
		if(i.wkt.indexOf('POLYGON')!=-1){
		    tipo='polygon';
		}
		if(i.wkt.indexOf('LINE')!=-1){
		    tipo='line';
		}
		f['info']=i;
		f['info'].idLayer=id;
		f['info'].type=tipo;
		dataFeatureLayers['F'+id]['F'+i.id+'i']=f;
		features.push(f);
	}
	FeatureLayers['F'+id].addFeatures(features);
	if (FeatureLayers['F'+id].active) {
	    setVisibilityFeatureLayer(id,true);
	}
    }
    var addFeturesToTheme = function(data){
	var features = [];
	for(var x in data){
		var i = data[x];
		var f = new OpenLayers.Format.WKT('EPSG:4326').read(i.wkt);
		f.geometry = f.geometry.transform('EPSG:4326','EPSG:900913');
		f['info']=i;
		dataTheme['z'+i.id+'i']=f;
		features.push(f);
	    
	}
	ThemeLayer.setVisibility(false);
	ThemeLayer.addFeatures(features);
	
    }
    function getColor(val) {
	var color = '';
	if(val == limits.initial) {
	    color = green;       
	} else if(val == limits.middle) {
	    color = yellow;  
	    $('#color').css('background', yellow);
	} else if(val == limits.last) {
	    color = red;
	} else {
	    if(val < limits.middle) {
		// val < 50 is between green and yellow
		var perc = val/limits.middle;
		var hexVal = hex[Math.round(16*perc)];
		color ="#"+hexVal+hexVal+"C03C";
	    } else if(val > limits.middle) {
		// val > 50 is between red and green
		var perc = val/limits.last/0.5-1;
		var hexVal = hex[hex.length - Math.round(16*perc)];
		color="#C2"+hexVal+hexVal+"22";
	    }
	}
	return color;
    }
    var defineLimits = function(values){
	var total = 0;
	var a=[];
	var min=0;
	var max=0;
	for(var x in values){
	    total+=values[x];
	    if (values[x]<min) {
		min=values[x];
	    }
	    if (values[x]>max) {
		max=values[x];
	    }
	    a.push(values[x]);
	}
	limits.initial = min;
	limits.last = max;
	limits.middle = (total/(a.length-1));
    }
    var drawTheme = function(data){
	defineLimits(data);
	for(var x in data){
	    var i = data[x];
	    dataTheme[x+'i'].info.color = getColor(i);
	    dataTheme[x+'i'].info.total = i;
	}
	ThemeLayer.redraw();
	ThemeLayer.setVisibility(true);
	$(".overlays_data").overlays('showGraph');
    }
    var hideTheme = function(){
	ThemeLayer.setVisibility(false);
    }
    var updatePredios = function(data){
	for(var x in data){
		var i = data[x];
		dataPredios['P'+i.id+'i'].info.status = i.status;
	}
	Predios.redraw();
    }
    var showInfoFeature = function(feature){
	var field='folio';
	var params={
		    userActive:activeUser,
		    data:{
			    type:'identify',
                            title:'Informaci&oacute;n detallada',
                            showPrev:false,
                            ids:null,
			    idLayer:null,
			    
		    }
	    };
	params.data.ids = feature.info[field];
	params.data.idLayer = feature.info.idLayer;
	$('.app_left_section_information').information(params);
    }
    var showInfoFeatureOriginal = function(feature){
	var field='id';
	var params={
		    data:{
			    type:'identify',
                            title:'Informaci&oacute;n detallada',
                            showPrev:false,
                            ids:null
		    }
	    };
	if (feature.cluster.length>1) {
	    field='folio';
	    params={
		    userActive:activeUser,
		    data:{
			    type:'search',
                            title:'Busqueda',
                            showPrev:false,
                            ids:null
		    }
	    };
	}
	var array = [];
	for(var x in feature.cluster){
	    array.push(feature.cluster[x].info[field]);
	}
	
	var ids = array.join(',');
	params.data.ids = ids;
	
	$('.app_left_section_information').information(params);
    }
    var showMessage = function(msg){
	
    }
    
    var loadFeatures = function(){
	
	var config = mappingConfig;
        var e= Map.getExtent();
	var punto = new OpenLayers.LonLat(e.left,e.bottom).transform(mapProjection,config.displayProjection);
	var punto2 = new OpenLayers.LonLat(e.right,e.top).transform(mapProjection,config.displayProjection);
	for(var x in FeatureLayers){
	    var i = FeatureLayers[x];
	    if (i.active) {
		     request({action:'get',layer:i.id,user:activeUser.id,xmin:punto.lon, xmax:punto2.lon, ymin:punto.lat, ymax:punto2.lat},'loadLayer',i.id);
	    }
	   
	}
	
	
    }
    var loadLayer = function(id){
	
	var config = mappingConfig;
        var e= Map.getExtent();
	var punto = new OpenLayers.LonLat(e.left,e.bottom).transform(mapProjection,config.displayProjection);
	var punto2 = new OpenLayers.LonLat(e.right,e.top).transform(mapProjection,config.displayProjection);
	request({action:'get',layer:id,user:activeUser.id,xmin:punto.lon, xmax:punto2.lon, ymin:punto.lat, ymax:punto2.lat},'loadLayer',id);
	
    }
    var loadFeat
    var clock = null;
    
    var defineClock = function(user){
	if (user) {
	    activeUser = user;
	}
	clearClock();
	clock = setTimeout(function(){
	    loadFeatures();
	    },1000);
    }
    var clearClock=function(){
	if (clock) {
	    clearTimeout(clock);
	}
    }
    var hideLayerFeatures = function(){
	for(var x in FeatureLayers){
	    var i = FeatureLayers[x];
	    FeatureLayers['F'+i.id].setVisibility(false);
	}
    }
    var setVisibilityFeatureLayer= function(id,status){
	if (FeatureLayers['F'+id]) {
	    FeatureLayers['F'+id].setVisibility(status);
	}
    }
    
    var request = function(params,action,id){
            var clase='hidden';
	    var msg = 'Servicio no disponible intente m&aacute;s tarde';
	    var r= {
		    success:function(json,estatus){
			var valid=false;
			
			if (json){
			    if (json.response.sucessfull){
				valid=true;
				switch (action) {
				    case 'getLayers':
					    Themes = json.data.themes;
					    addDBFeatures(json.data.layers);
					    $('.app_left_section_layers').layers();
					break;
				    case 'updateLayers':
					    clearDBFeatures();
					    Themes = json.data.themes;
					    addDBFeatures(json.data.layers);
					    $(".overlays_data").overlays('updateLayers',actualActive);
					    
					break;
				    case 'loadLayer':
					    addFeturesLayer(json.data.features,id);
					break;
				    case 'getRegions':
					    addFeturesToTheme(json.data.features);
					break;
				     case 'loadTheme':
					    drawTheme(json.data.totals);
					break;
				    case 'deleteLayer':
					break;
				}
				
			    }else{
				msg=json.response.message;
			    }
			}
			if (!valid) {
			    showMessage(msg);
			}
		    },
		    beforeSend: function(solicitudAJAX) {
			
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
			showMessage(msg);
		    },
		    complete: function(solicitudAJAX,estatus) {
			
		    }
		    };
	    switch (action) {
		case 'getLayers':
		    r = $.extend(r, connections.features.getLayers);
		    r.data = params;
		break;
		case 'updateLayers':
		    r = $.extend(r, connections.features.getLayers);
		    r.data = params;
		break;
		case 'loadLayer':
		    r = $.extend(r, connections.features.getLayer);
		    r.data = params;
		    break;
		case 'getRegions':
		    r = $.extend(r, connections.features.getRegions);
		    r.data = params;
		    break;
		case 'loadTheme':
		    r = $.extend(r, connections.features.getInfoTheme);
		    r.data = params;
		    break;
		case 'deleteLayer':
		    r = $.extend(r, connections.features.deleteLayer);
		    r.data = params;
		    break;
	    }
	   
	    $.ajax(r);
    }
    var loadTheme=function(id){
	//var ref = parseInt(id);
	if (id!='-1') {
	    request({action:'get',layer:id,user:activeUser.id},'loadTheme');
	}else{
	    hideTheme();
	}
	
    }
    var loadRegionsForTheme=function(){
	request({action:'get',user:activeUser.id},'getRegions');
    }
    var addFeatureLayers=function(){
	request({action:'get',user:activeUser.id},'getLayers');
    }
    var updateLayers=function(){
	request({action:'get',user:activeUser.id},'updateLayers');
    }
    var removeFeatureLayer=function(id){
	clearLayer(id);
	Map.removeLayer(FeatureLayers['F'+id]);
	dataFeatureLayers['F'+id]={};
	delete dataFeatureLayers['F'+id];
	request({action:'delete',user:activeUser.id,layername:id},'deleteLayer');
    }
    return {
	    init:function(map,user,events){
		Map=map;
		mapEvents=events;
		activeUser=user;
		addThemeLayer();
		addFeatureLayers();
		loadRegionsForTheme();
	    },
	    getFeatureLayers:function(){
		return FeatureLayers;
	    },
	    getThemes:function(){
		return Themes;
	    },
	    getInfoThemes:function(){
		return dataTheme;
	    },
	    /*load:loadPredios,*/
	    loadTheme:loadTheme,
	    loadLayers:function(){
		defineClock();
	    },
	    loadLayer:function(id,status){
            if (FeatureLayers['F'+id]) {
                var Layer = FeatureLayers['F'+id];
                Layer.active = status;
                if (!Layer.loaded) {
                    Layer.loaded=true;
                    loadLayer(id);
                }else{
                    if (status) {
                        Layer.setVisibility(true);
                    }else{
                        Layer.setVisibility(false);
                    }
                }
            }
	    },
        updateColor:function(id,color){
            if (FeatureLayers['F'+id]) {
                var Layer = FeatureLayers['F'+id];
                var position = Layer.posColor;
                colorReferece[position]=color;
                Layer.color = color;
                Layer.redraw();
            }
        },
	    hideLayers:function(){
		hideLayerFeatures();
	    },
	    updateLayers:updateLayers,
	    removeFeatureLayer:removeFeatureLayer/*,
	    clearPolygons:clearPolygons,
	    selectPolygon:selectPolygon,
	    unselectPolygon:unselectPolygon*/
    }
    
});