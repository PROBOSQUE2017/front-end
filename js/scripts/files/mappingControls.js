define(["Openlayers"], function(Openlayers){
    var customControls=null;
    var mapEvents=null;
    var getRender = function(){
        var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
        renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
        return renderer;
    };
    
    var getVectorial = function(){
        return getStyleByFormat(getFormatVector());
    };
    var getStyleByFormat = function(format){
        var style = new OpenLayers.Style();
        style.addRules([new OpenLayers.Rule({symbolizer: format})]);
        return getStyleMap({"default": style});
    };
     var getStyleMap = function(p){
        return new OpenLayers.StyleMap(p);
    };
    
    var getFormatVector = function(){
        var format = {
                "Point": {
                    pointRadius: 4,
                    graphicName: "square",
                    fillColor: "white",
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeOpacity: 1,
                    strokeColor: "#59590E"
                },
                "Line": {
                    strokeWidth: 3,
                    strokeOpacity: 1,
                    strokeColor: "#59590E",
                    strokeDashstyle: "dash"
                },
                "Polygon": {
                    strokeWidth: 2,
                    strokeOpacity: 1,
                    strokeColor: "#D7D7D7",
                    fillColor: "#EEEEEE",
                    fillOpacity: 0.3
                }
        };
        return format;
    };
    var getClickEvent = function(Event){
        return new  OpenLayers.Class(OpenLayers.Control, {                
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': true,
                    'stopDouble': false
                },
                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                },
                trigger: function(e) {
                    Event(e);
		}
        });
    };
    var getMeasure = function(event){
        var geometry = event.geometry;
	var m =(customControls.measureArea.active)?geometry.getArea():geometry.getLength();
	
	var units = event.units;
        var order = event.order;
        var measure = event.measure;
        //var m = measure;
	
	var m = "";
	//m += measure.toFixed(3) + " " + units;
	if(order!=1){
	    //units = 'ca';
	    //if (measure>10000) {
		measure=measure/10000;
		units='Ha';
	    //}
	    m += measure.toFixed(3) + " " + units;
	    m='&Aacute;rea :'+m;
	}else{
	    m += measure.toFixed(3) + " " + units;
	    m='Distancia :'+m;
	}

	
	$(".measure_tool").html(m);
    };
    var setControls = function(ctls){
	customControls = ctls;
    }
    var getCustomControls = function(map,eventos){
	mapEvents = eventos;
        var style = getVectorial();
        var c = OpenLayers.Control;
        var h = OpenLayers.Handler;
        var r = getRender();
        //var p = layers.Poligonos;
        var controls = {
                zoomOut: new c.ZoomBox({
                  out: true
                  }
                ),
                zoomIn: new c.ZoomBox({
                  out: false
                  }
                ),
		identify: new (getClickEvent(function(e){
		    
			var lonlat = map.getLonLatFromViewPortPx(e.xy);
			//console.log(lonlat);
	
		    }
		)),
		
		measureDistance: new c.Measure(
                    h.Path, {
                        persist: true,
			immediate:true,
                        handlerOptions: {
                            layerOptions: {renderers: r, styleMap: style}
                        }
                    }
                ),
                measureArea: new c.Measure(
                    h.Polygon, {
                        persist: true,
			immediate:true,
                        handlerOptions: {
                            layerOptions: {renderers: r,styleMap: style}
                        }
                        
                    }
                ),
                
		pointSelector: new (getClickEvent(function(e){
		   
			var lonlat = map.getLonLatFromViewPortPx(e.xy);
			var wkt = 'POINT'+'('+lonlat.lon + ' '+lonlat.lat+')';
			console.log(wkt);
			
		    })
		),
		polygonSelector: new c.Measure(
                    h.Polygon, {
                        persist: false,
			immediate:true,
                        handlerOptions: {
                            layerOptions: {renderers: r,styleMap: style}
                        }
                        
                    }
                ),
		squareSelector: new c.ZoomBox({
		    zoomBox:function(bounds){
			
			var displayBlocker = $('.custom_assignCharge .blocker').css('display');
			if((typeof bounds.left !== "undefined")&&(displayBlocker=='none')){
			   
				var coord1 = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom)); 
				var coord2 = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));
				bounds.left = coord1.lon;
				bounds.bottom = coord1.lat;
				bounds.right = coord2.lon;
				bounds.top = coord2.lat;
				var wkt = bounds.toGeometry()+'';
				var wkt = mapEvents.wktToMercator(wkt);
				$('.app_left_section').assignCharge('showSelected',wkt);
			    
			    
			}
		    }
		}
                )
		
        }
        for(x in controls) {
                var ctl = controls[x];
                ctl.events.on({
                    "measure": getMeasure,
                    "measurepartial": getMeasure
                });
        }
        return controls;
    };
    
    return {
	    getCustomControls:getCustomControls,
	    setControls:setControls
    }
    
});