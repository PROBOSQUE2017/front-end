var arregloTemas = [];
var exportMapControl, map, formats, vectors;
function init() {

    var apikey="At-Y-dJe-yHOoSMPmSuTJD5rRE_oltqeTmSYpMrLLYv-ni4moE-Fe1y8OWiNwZVT";

    map = new OpenLayers.Map({
                                  div:"map",
                                  allOverlays:true,
                                  numZoomLevels: 24
                                });

 

     var wms = new OpenLayers.Layer.WMS("Base 1", "http://vmap0.tiles.osgeo.org/wms/vmap0",
    {
        layers: 'basic'},{
    useCanvas: OpenLayers.Layer.Grid.ONECANVASPERLAYER
  });

    map.addLayer(wms);
    vectors = new OpenLayers.Layer.Vector("Vector Layer");
   var osm= new OpenLayers.Layer.OSM("WMS");

  
    if (!map.getCenter()) map.zoomToMaxExtent();
  
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition()); 
    map.addControl(new OpenLayers.Control.ScaleLine());
    
    map.setCenter(new OpenLayers.LonLat(-99.67274, 19.35743).transform(

        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    ), 8);

    exportMapControl = new OpenLayers.Control.ExportMap();
    map.addControl(exportMapControl);

    var pointLayer = new OpenLayers.Layer.Vector("Indicadores", {
    renderers: ['Canvas', 'SVG', 'VML']}, {
        projection: "EPSG:900913"
    });
    map.addLayer(pointLayer);
    
     updateFormats();

    function pintarIndicadores(indicImagen, indicPx, indicPy){
    // Create some random features
    var icons = indicImagen;

    // Create some random feature points
    var pointFeatures = [];
                
    var px = indicPx;
    var py = indicPy;
    // Create a lonlat instance and transform it to the map projection.
    var lonlat = new OpenLayers.LonLat(px, py).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    //lonlat.transform(new OpenLayers.Projection("EPSG:4326"));//, new OpenLayers.Projection("EPSG:900913"));
                
    var pointGeometry = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
    var pointFeature = new OpenLayers.Feature.Vector(pointGeometry, null, {
          pointRadius: 16,
          fillOpacity: 1,
          externalGraphic: 'img/icons/'+icons
          });

      pointFeatures.push(pointFeature);
           
      // Add features to the layer
      pointLayer.addFeatures(pointFeatures); 

}
    


          var vectorLayer = new OpenLayers.Layer.Vector("Figuras",{
    renderers: ["Canvas", "SVG", "VML"]});
            vectorLayer.events.register('beforefeatureadded', vectorLayer, setFeatureStyle);
            map.addLayer(vectorLayer);
    
          var vectorFiguraMapa = new OpenLayers.Layer.Vector("Mapa");
            vectorFiguraMapa.events.register('beforefeatureadded', vectorLayer, setColorFIgurasMapa);
            map.addLayer(vectorFiguraMapa);

          var editingControl = new OpenLayers.Control.EditingToolbar(vectorLayer,{
    renderers: ["Canvas", "SVG", "VML"]},{'tools':['Point','Polygon']});
          var navegacion =  new OpenLayers.Control.Navigation(vectorLayer);
          map.addControl(editingControl);


          function setColorFIgurasMapa(event){
            var fillColor = configuracionFigura.colorRelleno;
            var strokeColor =$('#strokeColor').val();
            
            var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
            style.fillColor = fillColor;
            style.strokeColor = strokeColor;
            event.feature.style = style;
          }


          function setFeatureStyle(event) {
            var fillColor = $('#fillColor').val();
            var strokeColor =$('#strokeColor').val();
            
            var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
            style.fillColor = fillColor;
            style.strokeColor = strokeColor;
            event.feature.style = style;
        }

        //Función que retorna las coordenadas de los puntos, líenas y polígonos
        vectorLayer.events.register('featureadded', vectorLayer, getCoordinatesFeature);

            function getCoordinatesFeature()
            {
              var ptoPygLne = editingControl.controls;
              var nombreFigura;
              var e;
              var ft = vectorLayer.features;
                for(var i=0; i<ft.length; i++){
                     e = vectorLayer.features[i].geometry.getVertices();
                }
                var cadenaFigura;
                if(ptoPygLne[3].active==true){
                  cadenaFigura = "POLYGON((";
                  for(var z=0; z<e.length;z++ ){
                    cadenaFigura +=e[z].x+" "+e[z].y;
                  if(z<e.length-1){
                    cadenaFigura +=",";
                  }
                }
                cadenaFigura +=", "
                cadenaFigura +=e[0].x+" "+e[0].y;
                cadenaFigura +="))";
                configuracionFigura.tipoFigura = "poligono";
                nombreFigura = "Polígono agregado al tema";
                //map.addControl(navegacion);
                
                }else if(ptoPygLne[1].active==true){
                  cadenaFigura = "POINT(";
                  for(var z=0; z<e.length;z++ ){
                    cadenaFigura +=e[z].x+" "+e[z].y;
                  if(z<e.length-1){
                    cadenaFigura +=",";
                  }
                }
                cadenaFigura +=")";
                configuracionFigura.tipoFigura = "punto";
                nombreFigura = "Punto agregado al tema";
                //map.addControl(navegacion);
                
                }else if(ptoPygLne[2].active==true){
                  cadenaFigura = "LINESTRING(";
                  for(var z=0; z<e.length;z++ ){
                    cadenaFigura +=e[z].x+" "+e[z].y;
                  if(z<e.length-1){
                    cadenaFigura +=",";
                  }
                }
                cadenaFigura +=")";
                configuracionFigura.tipoFigura = "linea";
                nombreFigura = "Línea agregada al tema";
                //map.addControl(navegacion);
                }
               
                insertPolygon(cadenaFigura,"insertFigura");
            }

    // Event handler for feature selected
    vectorLayer.events.register("featureselected", null, function(event){
        var tema = configuracionFigura.tema;
        var a = amplify.store('arreglo', arregloTemas);
        var z;
        var figura = "";
        var ft;
        var typeFigura;
        var i = 0;
        var temaEncontrado = false;
        var folioRE;
        var areaFig;
        var desc;
        for(b=0; b<a.length;b++){
          if (temaEncontrado==false) {
            for(x=0; x<a[b].length;x++){
              if (temaEncontrado==false){
                var tema2=a[b][x];
                typeFigura = conseguirTipoFigura("conseguirTipoFigura", usuario, tema2);
                if(typeFigura == "POINT"){
                  figura = "POINT(";
                  ft = event.feature.geometry.getVertices();
                  for(z=0; z<ft.length; z++){
                    figura += ft[z].x + " " + ft[z].y;
                    if(z<ft.length-1){
                      figura += ",";
                    }
                  }
                  figura += ")";
                }else if(typeFigura == "MULTIPOLYGON"){
                  figura ="MULTIPOLYGON((("; 
                  ft = event.feature.geometry.getVertices();
                  for(z=0; z<ft.length;z++ ){
                    figura +=ft[z].x+" "+ft[z].y;
                    if(z<ft.length-1){
                      figura +=",";
                    }
                  }
                  figura += ", "
                  figura += ft[0].x + " " + ft[0].y;
                  figura += ")))";
                }else if(typeFigura == "LINESTRING"){
                  figura = "LINESTRING(";
                  ft = event.feature.geometry.getVertices();
                  for (z=0; z<ft.length;z++){
                    figura += ft[z].x+" "+ft[z].y;
                    if(z<ft.length-1){
                      figura +=",";
                    }
                  }
                figura += ")";
                }
                folioRE = loadFolioFig("conseguirFolio", usuario, tema2, figura, typeFigura);
                desc=loadDescripciones("mostrarDescripciones", usuario, tema2, figura, typeFigura);
          
                if(folioRE.response.sucessfull!=false)
                  if(folioRE.data.folio != undefined){
                    temaEncontrado = true;
                  }
                i++;
              }
            }
          }
        }
        
        var layer = event.feature.layer;
        TblCartoDetalle("obten", usuario, folioRE.data.folio);

        event.feature.style = {
            fillColor: '#ff9900',
            fillOpacity: 0.7,
            strokeColor: '#aaa',
            pointRadius: 12
        };
        layer.drawFeature(event.feature);

        var layer = event.feature.layer;
        var fillColor = $('#fillColor').val();
        var strokeColor =$('#strokeColor').val();
                    event.feature.style = {
                      fillColor: fillColor,
                      fillOpacity: 1.0,
                      strokeColor: strokeColor,
                      pointRadius: 12
                    };
                    layer.drawFeature(event.feature);
                            
                    var content = "<div style=\"max-height: 150px; overflow-y:scroll;\"><strong>Folio:</strong> <br/>" + folioRE.data.folio + "<br/><strong>Área:</strong> <br/>" + "areaFig" + " ha<br/>"
                    +"<strong>Descripción:</strong><br/>" ;//event.feature.geometry.getArea()
                        if (desc !== undefined){  
                          for (var i = 0; i < desc.length; i++) {
                            //console.log(desc[i]);
                            if(desc[i] === ',')
                                {
                                content+='<br/>';
                                }
                            content+=desc[i];
                          }
                          content+= '</div>';
                        }
                    var popup = new OpenLayers.Popup.FramedCloud(
                          event.feature.id+"_popup", 
                          event.feature.geometry.getBounds().getCenterLonLat(),
                          new OpenLayers.Size(150, 50),
                          content,
                          null, 
                          false, 
                          null);
                          event.feature.popup = popup;
                          map.addPopup(popup);

    });
    // Event handler for feature unselected
    vectorLayer.events.register("featureunselected", null, function(event){
        var layer = event.feature.layer;
        var fillColor = $('#fillColor').val();
        var strokeColor =$('#strokeColor').val();
        event.feature.style = {
            fillColor: fillColor,
            fillOpacity: 0.6,
            strokeColor: strokeColor,
            pointRadius: 6
        };
        event.feature.renderIntent = null;
        layer.drawFeature(event.feature);
                            
        map.removePopup(event.feature.popup);
    });

    // Add select feature control required to trigger events on the vector layer.
    var selectControl = new OpenLayers.Control.SelectFeature(vectorLayer);
    
            var configuracionFigura = new Object();
              configuracionFigura.usuario="";
              configuracionFigura.folio = "";
              configuracionFigura.tema = "";
              configuracionFigura.colorRelleno = "";
              configuracionFigura.colorContorno = "";
              configuracionFigura.descripcion = "";
              configuracionFigura.tipoFigura = "";


            var configuracionRaster = new Object();
              configuracionRaster.nombreRaster="";
              configuracionRaster.tamañoRaster="";
              configuracionRaster.coordenadasLimite="";

          
          var wktRurales = new OpenLayers.Layer.Vector("L. Urbanas",{
    renderers: ["Canvas", "SVG", "VML"]});
          wktRurales.setVisibility(false);

          function pintarRural(coorRural){
                var text = coorRural;
                var features = wktLol.read(text);
                wktRurales.addFeatures(features);
                map.addLayer(wktRurales);
              } 


          var wktLol = new OpenLayers.Format.WKT();
          var wktLocalidades = new OpenLayers.Layer.Vector("Localidades",{
    renderers: ["Canvas", "SVG", "VML"]});
          wktLocalidades.setVisibility(false);
          
          function pintarLocalidades(coorLoca){
                var text = coorLoca;
                var features = wktLol.read(text);
                wktLocalidades.addFeatures(features);
                map.addLayer(wktLocalidades);
              }


          var wkt = new OpenLayers.Format.WKT();
          var wktLayer = new OpenLayers.Layer.Vector("Regiones",{
    renderers: ["Canvas", "SVG", "VML"]});

          var wktGE = new OpenLayers.Format.WKT();
          var wktEstado = new OpenLayers.Layer.Vector("Estado",{
    renderers: ["Canvas", "SVG", "VML"]});


              function pintarEstado(coorEstado){
                var text = coorEstado;
                var features = wktGE.read(features);
                wktEstado.addFeatures(features);
                map.addLayer(wktEstado);
              }

              function pintarRegiones(coorReg){
                var text = coorReg;
                var features = wkt.read(text);
                wktLayer.addFeatures(features);
                map.addLayer(wktLayer);
              }


              function pintarPunto(coordenada){
                  var text = coordenada;
                  var features = wkt.read(text);
                  vectorLayer.addFeatures(features);
                  map.addControl(selectControl);
                  selectControl.activate();
              }


              /*function imagenRaster(imgUrl, imgExtent, imgSize){                  
                  // Add an Image layer
                  var img_url = imgUrl;
                  var img_extent = new OpenLayers.Bounds(imgExtent);
                  var img_size = new OpenLayers.Size(imgSize);

                  var image = new OpenLayers.Layer.Image("Imagen raster", img_url, img_extent, img_size, {
                      isBaseLayer: false,
                      alwaysInRange: true // Necessary to always draw the image
                  });
                  map.addLayer(image);
              }*/

               // Add an Image layer
                  var img_url = "img/nombreRegiones.png";
                  var img_extent = new OpenLayers.Bounds(-100.63954, 18.39063, -98.51918, 20.26380);
                  var img_size = new OpenLayers.Size(1479, 1212);


                  var image = new OpenLayers.Layer.Image("Nombre regiones", img_url, img_extent, img_size, {
                      isBaseLayer: false,
                      alwaysInRange: true // Necessary to always draw the image
                  });
                  image.setVisibility(true);
                  map.addLayer(image);


                  var img_url_loc = "img/nombreLocalidades.png";
                  var img_extent_loc = new OpenLayers.Bounds(-100.63954, 18.39063, -98.51918, 20.26380);
                  var img_size_loc = new OpenLayers.Size(1479, 1212);


                  var image_loc = new OpenLayers.Layer.Image("Nombres municipios", img_url_loc, img_extent_loc, img_size_loc, {
                      isBaseLayer: false,
                      alwaysInRange: true // Necessary to always draw the image
                  });
                  map.addLayer(image_loc);
                  image_loc.setVisibility(true);


                  var img_url1 = "raster/169.png";
                  var img_extent1 = new OpenLayers.Bounds(-100.63954, 18.39063, -98.51918, 20.26380);
                  var img_size1 = new OpenLayers.Size(1479, 1212);


                  var image1 = new OpenLayers.Layer.Image("Ejemplo 1", img_url1, img_extent1, img_size1, {
                      isBaseLayer: false,
                      alwaysInRange: true // Necessary to always draw the image
                  });
                  image1.setVisibility(false);
                  map.addLayer(image1);


                  var img_url2 = "raster/417.png";
                  var img_extent2 = new OpenLayers.Bounds(-100.63954, 18.39063, -98.51918, 20.26380);
                  var img_size2 = new OpenLayers.Size(1479, 1212);


                  var image2 = new OpenLayers.Layer.Image("Ejemplo 2", img_url2, img_extent2, img_size2, {
                      isBaseLayer: false,
                      alwaysInRange: true // Necessary to always draw the image
                  });
                  image2.setVisibility(false);
                  map.addLayer(image2);


                  var img_url2010 = "raster/E14A16_M.png";
                  var img_extent2010 = new OpenLayers.Bounds(-100.34840119702733, 19.733834223571, -99.9849047570176, 20.01469052834002);
                  var img_size2010 = new OpenLayers.Size(1479, 1212);


                  var image2010 = new OpenLayers.Layer.Image("E14A16_M", img_url2010, img_extent2010, img_size2010, {
                      isBaseLayer: false,
                      alwaysInRange: true // Necessary to always draw the image
                  });
                  image2010.setVisibility(false);
                  map.addLayer(image2010);




              /*var vKML = new OpenLayers.Layer.Vector("Prueba KML", {
              protocol: new OpenLayers.Protocol.HTTP({
              url: "kml/doc3.kml",
              format: new OpenLayers.Format.KML({
                extractStyles: true,
                extractAttributes: true
              })
              }),
                strategies: [new OpenLayers.Strategy.Fixed()]
              });
              vKML.setVisibility(false);
              map.addLayer(vKML);*/

              var nexrad = new OpenLayers.Layer.WMS("Nexrad", "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
              {
                  layers: "nexrad-n0r",
                  transparent: true,
                  format: 'image/png'
              },
              {
                  isBaseLayer: false
              });

              map.addLayer(nexrad);


              /*var ejemploWMS = new OpenLayers.Layer.WMS("Ejemplo WMS", "http://187.188.96.134:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities",
              {
                  layers: "ejemploWMS",
                  transparent: true,
                  format: 'image/png'
              },
              {
                  isBaseLayer: false
              });

              map.addLayer(ejemploWMS);*/



              //VISUALIZAR KML 
              function pintarKML(archivoKML){
                var vKML = new OpenLayers.Layer.Vector("KML", {
                protocol: new OpenLayers.Protocol.HTTP({
                url: "kml/"+archivoKML,
                format: new OpenLayers.Format.KML({
                  extractStyles: true,
                  extractAttributes: true
                })
                }),
                  strategies: [new OpenLayers.Strategy.Fixed()]
                });
                vKML.setVisibility(true);
                map.addLayer(vKML);
              }


              //VISUALIZAR RASTER
              function pintarRaster(nombre_raster, cuadratura_raster, tamano_raster){
                
                var img_urlRaster = "raster/"+nombre_raster;
                var img_extentRaster = new OpenLayers.Bounds(cuadratura_raster);
                var img_sizeRaster = new OpenLayers.Size(1479, 1212);


                var imageRaster = new OpenLayers.Layer.Image("Raster", img_urlRaster, img_extentRaster, img_sizeRaster, {
                    isBaseLayer: false,
                    alwaysInRange: true // Necessary to always draw the image
                });
                //imageRaster.setVisibility(true);
                map.addLayer(imageRaster);
              }


              function showTemasDeMapa(figurasMapa){
                var text = figurasMapa;
                $.each(text.data, function(index, data){
                  var features = wkt.read(data.figura);
                  vectorFiguraMapa.addFeatures(features);
                });
                map.addControl(selectControl);
                selectControl.activate();
              }


      var loadData = function(action,usr,tema){
        var params={ "action":action, "usuario":usr, "tema":JSON.stringify(tema)};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          //var coordenada = data.data;
          //pintarPunto(coordenada);
          var element = document.getElementById('text');
          element.value = data.data;
          var x=0;
          while(x<data.data.length){
           // var coordenada = data.data[x];
            //var text = coordenada;
            //var features = wkt.read(text);
            vectorLayer.addFeatures(wkt.read(data.data[x]));
            x++;
          }
          deserialize();
            map.addControl(selectControl);
            selectControl.activate();
        });
      }


      var insertPolygon = function(poli,action){
        var params = {"action":action,"usuario":configuracionFigura.usuario,"folio":configuracionFigura.folio,"tema":configuracionFigura.tema,"tipoFigura":configuracionFigura.tipoFigura,"descripcion":configuracionFigura.descripcion,"colorRelleno":configuracionFigura.colorRelleno,"colorContorno":configuracionFigura.colorContorno,"cadenaFigura":poli};
        $.ajax({
            url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
            type: "POST",
            datatype: 'json',
            data: params
        }).done(function(data){});
      }


      var insertManual = function(poli,action,folioManual,temaManual,colorRellenoManual,colorContornoManual,descripcionManual,tipoCoordenadaManual){
        var params = {"action":action,"usuario":configuracionFigura.usuario,"folio":folioManual,"tema":temaManual,"colorRelleno":colorRellenoManual,"colorContorno":colorContornoManual,"cadenaFigura":poli,"descripcion":descripcionManual,"tipoCoordenada":tipoCoordenadaManual};
        $.ajax({
            url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
            type: "POST",
            datatype: 'json',
            data: params
        }).done(function(data){alert(data.data);});
      }


      var loadDescripciones = function(action, usr, tema, fig, typeFigura){
        var descripcionPoligono;
        var params = {"action":action,"usuario":usr,"tema":JSON.stringify(tema),"figura":fig, "typeFigura":typeFigura}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data:params,
          async:false
        }).done(function(data){
          descripcionPoligono = data.data;
          configuracionFigura.descripcion = descripcionPoligono;
        });
        return configuracionFigura.descripcion;
      }


      var loadRegiones = function(action, usr){
            var params={ "action":action, "usuario":usr};
            $.ajax({
              url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
              type: "POST",
              datatype: 'json',
              data:params
            }).done(function(data){
              var coorReg = data.data;
              pintarRegiones(coorReg);
            });
      }


      var loadLocalidades = function(action, usr){
            var params={ "action":action, "usuario":usr};
            $.ajax({
              url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
              type: "POST",
              datatype: 'json',
              data:params
            }).done(function(data){
              var coorLoca = data.data;
              pintarLocalidades(coorLoca);
            });
      }


      var loadRural = function(action, usr){
          var params={"action":action, "usuario":usr};
          $.ajax({
            url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
            type: 'POST',
            datatype: 'json',
            data:params
          }).done(function(data){
            var coorRural = data.data;
            pintarRural(coorRural);
          });
      }



      var uploadRaster = function(action){
        var params = {"action":action,"usuario":usuario, "nombreRaster":configuracionRaster.nombreRaster, "coordenadasLimite": configuracionRaster.coordenadasLimite, "tamañoRaster": configuracionRaster.tamañoRaster};
        $.ajax({
            url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
            type: "POST",
            datatype: 'json',
            data: params
        }).done(function(data){
          var urlRaster = data.data;
          var extentRaster = data.data1;
          var sizeRaster = data.data2;
          imagenRaster(url)

        });
      }


      var insertTema = function(action, usr, tema){
        var params = {"action":action,"usuario":usr,"tema":tema}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data:params,
        }).done(function(data){
            alert(data.data);
            mostrarTemas(usuario, "cargarTemas");
        });
      }


      var loadFolioFig = function(action, usr, tema, fig, typeFigura){
        var folioPoligono;
        var params = {"action":action,"usuario":usr,"tema":JSON.stringify(tema),"figura":fig, "typeFigura":typeFigura}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data:params,
          async:false
        }).done(function(data){
          folioPoligono = data;
          configuracionFigura.folio = folioPoligono;
        });
        return configuracionFigura.folio;
      }


      var conseguirTipoFigura = function(action, usr, tema){
        var tipo_Figura;
        var params = {"action":action, "usuario":usr, "tema":JSON.stringify(tema)}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data:params,
          async:false
        }).done(function(data){
          tipo_Figura = data.data;
        });
        return tipo_Figura;
      }


      var areaFigura = function(action, usr, tema, fig, typeFigura){
        var area_Figura;
        var params = {"action":action,"usuario":usr,"tema":JSON.stringify(tema),"figura":fig, "typeFigura":typeFigura}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data:params,
          async:false
        }).done(function(data){
          area_Figura = data.data;
        });
        return area_Figura;
      }


      var insertMapa = function(action, usr){
        var params = {"action":action, "usuario":usr}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
            
        });
      }


      var insertTemaAdmin = function(action, usr, tema, colorTema){
        var params = {"action":action,"usuario":usr,"tema":JSON.stringify(tema),"colorTema":colorTema};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
        });
      }


      var insertIndicadores = function(action, usr, nombreImagen, Px, Py){
        var params={ "action":action, "usuario":usr, "nombreImagen":nombreImagen, "px":Px, "py":Py};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){});
      }

      var getListMapas = function(action, usr){
        var params={"action":action,"usuario":usr};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          $.each(data.data, function(index, data){
            var tabla = $('#tablaMapas');

            if( (document.getElementById(data.mapa_descripcion.replace(/\s/g, '_'))==null)){
              tabla.append('<tr id="'+data.mapa_id+'"><td>'+data.mapa_descripcion+'</td><td><button type="button" id="'+data.mapa_descripcion.replace(/\s/g, '_')+'" class="btn btn-danger"><i class="fa fa-trash"></i></button></td></tr>');
            }
            $('#'+data.mapa_id).click(function(){
              var renglon = data.mapa_id;
              var tiene = $("#"+renglon).hasClass('seleccion');
              $("#tablaMapas tr").removeClass('seleccion');
              if (tiene) {
                $("#"+renglon).removeClass('seleccion');
              }
              else {
                $("#"+renglon).addClass('seleccion');
              }
            });
            $('#'+data.mapa_descripcion.replace(/\s/g, '_')).click(function(){
              $('#'+index).remove();
              $('#listaTemaXMapa option[value="'+data.mapa_id+'"]').remove();
              eliminarMapas("eliminarMapas", usuario, data.mapa_id);
            });
          });
        });
      }


      var guardarMapa = function(action, usr, nombreMapa){
        var params = {"action":action,"usuario":usr,"nombreMapa":nombreMapa}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){

        });
      }


      var getConfRaster = function(action, usr, verNombreRaster){
        var params = {"action":action,"usuario":usr,"verNombreRaster":verNombreRaster}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
            var nombre_raster = data.data[0].nombre_raster;
            var cuadratura_raster = data.data[0].cuadratura_raster;
            var tamano_raster = data.data[0].tamano_raster;
            pintarRaster(nombre_raster, cuadratura_raster, tamano_raster);
        });
      }

      var eliminarTema = function(action, usr, tema){
        var params = {"action":action,"usuario":usr,"tema":JSON.stringify(tema)}
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){

        });
      }


      var pintarMapaTemas = function(action,usr,idMapa){
        var params={ "action":action, "usuario":usr, "idMapa":idMapa};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          $.each(data.data, function(index, data){
           configuracionFigura.colorRelleno = data.color;
          });
          var listaFiguras = data;
          showTemasDeMapa(listaFiguras);
        });
      }


      var getListSimbologia = function(action, usr){
        var simbologiaTemas;
        var params = {"action":action, "usuario":usr}
        console.log(params);
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data:params,
          async:false
        }).done(function(data){
          simbologiaTemas = data.data;
        });
        return simbologiaTemas;
      }


      var insertSimbTema = function(action, usr, nombreSimbolo, caracteristicaSimbolo){
        var params={ "action":action, "usuario":usr, "nombreSimbolo":nombreSimbolo, "caracteristicaSimbolo":caracteristicaSimbolo};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){});
      }

      var getListaServicio = function(action, usr){
        var params={"usuario":usr,"action":action};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          var listaServicios = data.data;
          var selectServicio=$('#selectServicio');
   
          for(var x=0; x< listaServicios.length;x++){
              selectServicio.append("<option value='"+listaServicios[x].serv_descripcion+"'>" +listaServicios[x].serv_descripcion+" </option>");
          }          
        });
      }

      var mostrarServicio = function(usr, action, servicio){
        var params={"action":action,"usuario":usr, "servicio":servicio};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
            var ruta = data.data[0].serv_ruta;
            var llave = data.data[0].serv_llave;
            servicios(ruta, llave);
        });
      }

      var uploadServicio = function(action, usr, nombreServicio, urlServicio, tokenServicio){
        var params={ "action":action, "usuario":usr, "nombreServicio":nombreServicio, "urlServicio":urlServicio, "tokenServicio":tokenServicio};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){});
      }


      var loadEstado = function(action, usr){
            var params={ "action":action, "usuario":usr};
            $.ajax({
              url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
              type: "POST",
              datatype: 'json',
              data:params
            }).done(function(data){
              var coorEstado = data.data;
              pintarEstado(coorEstado);
            });
      }


      var limpiarBaseSim = function(action, usr){
        var params={ "action":action, "usuario":usr};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){});
      }


      var contadorTemas = function(action, usr){
        var params={ "action":action, "usuario":usr};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          $('#contadorTema').html(data.data);
        });
      }


      var eliminarTablaTema = function(action,usr,tema){
        var params={ "action":action, "usuario":usr, "tema":JSON.stringify(tema)};
        $.ajax({
          url: 'http://187.188.96.133:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          alert("Tema eliminado");
          location.reload();
        });
      }

      var evento= function(){


            $('#btnGuadarConfigPlyn').click(function(){
              var folio = $('#folioPlyn').val();
              configuracionFigura.folio = folio;
              var tema = $('#temaPlyn').val();
              configuracionFigura.tema = tema;
              var tema = $('#temaPlynExistentes').val();
              configuracionFigura.tema = tema;
              var colorRelleno = $('#fillColor').val();
              configuracionFigura.colorRelleno = colorRelleno;
              var colorContorno = $('#strokeColor').val();
              configuracionFigura.colorContorno = colorContorno;
              var descripcion = $('#descripcionPlyn').val();
              configuracionFigura.descripcion = descripcion;
              alert("Se ha guardado su configuración correctamente");
              map.removeControl(navegacion);
              map.addControl(editingControl);
            });


            $('#btnVerTema').click(function(){
              var tema = $('#selectTemasPoligonos').val();
              var colorTema = $('#fillColor').val();
              configuracionFigura.tema = tema;
              arregloTemas.push(configuracionFigura.tema);
              amplify.store('arreglo', arregloTemas);
              insertMapa("insertMapa", usuario);        
              for (var i = tema.length - 1; i >= 0; i--) {
                loadData("mostrarTemasPoligonos", usuario, tema[i]);
                insertTemaAdmin("insertTemaAdmin", usuario, tema[i], colorTema);
                insertSimbTema("insertSimbTema", usuario, tema[i], colorTema);
              }
            });


            $('#btnEliminarTema').click(function(){
              var tema = $('#selectTemasPoligonos').val();
              configuracionFigura.tema = tema;
              arregloTemas.push(configuracionFigura.tema);
              amplify.store('arreglo', arregloTemas);
              for (var i = tema.length - 1; i >= 0; i--) {
                eliminarTablaTema("eliminarTablaTema", usuario, tema[i]);
              }
            });


            $('#btnSubirRaster').click(function(){
              var nombreRaster = $('#nombreRaster').val();
              configuracionRaster.nombreRaster = nombreRaster;
              var coordenadaSD = $('#coordenadaSD').val();
              var coordenadaSI = $('#coordenadaSI').val();
              var coordenadaID = $('#coordenadaID').val();
              var coordenadaII = $('#coordenadaII').val();
              configuracionRaster.coordenadasLimite = coordenadaSI + "," + coordenadaID + "," + coordenadaSD + "," + coordenadaSI;
              var rasterWidth = $('#rasterWidth').val();
              var rasterHeight = $('#rasterHeight').val();
              configuracionRaster.tamanoRaster = rasterWidth + ", " + rasterHeight;
              uploadRaster("uploadRaster");
            });


            $('#btnSubirFigManual').click(function(){
              var figuraManual = $('#figuraManual').val();
              var folioManual = $('#folioPlynManual').val();
              var temaManual = $('#temaFigManual').val();
              var colorRellenoManual = $('#fillColorManual').val();
              var colorContornoManual = $('#strokeColorManual').val();
              var descripcionManual = $('#descripcionPlynManual').val();
              var tipoCoordenadaManual = $('#tipoCoordenada').val();
              insertManual(figuraManual,"insertFiguraManual",folioManual,temaManual,colorRellenoManual,colorContornoManual,descripcionManual,tipoCoordenadaManual);
            });


            $('#btnCrearTema').click(function(){
              var tema = $('#nombreTemaNuevo').val();
              insertTema("insertTema",usuario,tema);
              mostrarTemas(usuario, "cargarTemas");
            });


            $('#btnSubirKml').click(function(){
              var descripcionKML = $('#nombreKML').val();
              uploadKML("uploadKML", descripcionKML);
            });

            $('#btnIndicadores').click(function(){
              var indicadorImagen = $('#imagenIndicador').val();
              var nombreIndicador = indicadorImagen.slice(0,-4);
              var indicadorPx = $('#coordenadaPx').val();
              var indicadorPy = $('#coordenadaPy').val();
              pintarIndicadores(indicadorImagen, indicadorPx, indicadorPy);
              insertSimbTema("insertSimbTema", usuario, nombreIndicador, indicadorImagen);
            });


            $('#btnSubirServicio').click(function(){
              var nombreServicio = $('#nombreServicio').val();
              var tokenServicio = $('#tokenServicio').val();
              var urlServicio = $('#urlServicio').val();
              uploadServicio("uploadServicio", usuario, nombreServicio, tokenServicio, urlServicio);
            });


            $('#btnVerKML').click(function(){
              var archivoKML = $('#carpetaKml').val();
              pintarKML(archivoKML);
            });


            $('#btnVerRaster').click(function(){
              var verNombreRaster = $('#carpetaRaster').val();
              getConfRaster("getConfRaster", usuario, verNombreRaster);
            });


            $('#btnGuardarMapa').click(function(){
              var nombreMapa = $('#nombreMapa').val();
              guardarMapa("guardarMapa", usuario, nombreMapa);
            });


            $('#btnEliminarTema').click(function(){
              var temaEliminado = $('#selectEliminarTema').val();
              eliminarTema("eliminarTema", usuario, temaEliminado);
              mostrarTemas(usuario, "cargarTemas");
            });

            $('#btnMostrarMapa').click(function(){
              var x = document.getElementsByClassName("seleccion");
              pintarMapaTemas("pintarMapaTemas", usuario, x[0].id);
              //pintarMapaIndicador("pintarMapaIndicador", usuario, x[0].id);
            });

            $('btnMostrarServicio').click(function(){
              var servicio = $('#selectServicio').val();
              mostrarServicio("mostrarServicio", usuario, servicio);
            });


            $( ".print" ).click(function() {

    var simbologiaTema = getListSimbologia("getListSimbologia", usuario);
    console.log(simbologiaTema);
    //alert(simbologiaTema.length);
    //alert(JSON.stringify(simbologiaTema));
    for (var i = 0; i < simbologiaTema.length; i++) {
      //alert(simbologiaTema[i].caracteristica_simbolo);
      var substring = "rgb";
      var substring2 = "#";
      //alert(simbologiaTema[i].caracteristica_simbolo.indexOf(substring));
      if (simbologiaTema[i].caracteristica_simbolo.indexOf(substring) == 0 || simbologiaTema[i].caracteristica_simbolo.indexOf(substring2) == 0) {
        //Color
        $("#cube"+(i+1)+"").attr("style","background: "+simbologiaTema[i].caracteristica_simbolo+"; display: block;");
        $("#txtc"+i+"").html(simbologiaTema[i].nombre_simbolo);
      }else{
        //Imagen
        $("#s"+(i+1)+"").attr("style", "display: block;");
        $("#img"+i+"").attr("src","img/icons/"+simbologiaTema[i].caracteristica_simbolo+"");
        $("#txti"+i+"").html(simbologiaTema[i].nombre_simbolo);
      }
    }

    $("#print").attr("href","css/print.css");
    setTimeout(function(){}, 300);
    var meses = new Array (
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    );
    var diasSemana = new Array(
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    );
    var f = new Date();
    document.getElementById("tiempo").innerHTML = /*"Hoy " + diasSemana[f.getDay()] + ", " +*/ f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();

    $("#fonts").removeAttr("href");
    $("#fontAwesome").removeAttr("href");
    //$("#bootstrapCSS").removeAttr("href");
    $("#template").removeAttr("href");
    $("#chartsCSS").removeAttr("href");
    $("#toolbarCSS").removeAttr("href");
    $("#miniColorsCSS").removeAttr("href");
    $("#jQuery211").removeAttr("src");
    //$("#jQueryMin").removeAttr("src");
    $("#excanvas").removeAttr("src");
    $("#jQuery").removeAttr("src");
    $("#flot").removeAttr("src");
    $("#axislabels").removeAttr("src");
    $("#axislabels").removeAttr("src");
    $("#tooltip").removeAttr("src");
    $("#categories").removeAttr("src");
    $("#chartsJS").removeAttr("src");
    $("#herramientas").removeAttr("src");
    $("#miniColorsJS").removeAttr("src");
    $("#toolbarJS").removeAttr("src");
    $("#mandar").removeAttr("src");
    $("#template").removeAttr("src");
    $("#amplify").removeAttr("src");
    $("#CartoJS").removeAttr("src");
    $("#colors").removeAttr("src");

    $("#cabecera").hide();
    $("#panelH").hide();
    $("#modalPoligono").hide();
    $("#modalKML").hide();
    $("#modalShape").hide();
    $("#modalRaster").hide();
    $("#modalIndicadores").hide();
    $("#modalFiguraManual").hide();
    $("#modalTema").hide();
    $("#modalDetalle").hide();
    $("#funciones").hide();
    $("#modalServicios").hide();

    $("#head").show(); //Encabezado Probosque
    $("#bg").show(); //Marco Escala
    $("#wind").show();//Rosa de los vientos
    $("#region").show();//region
    $("#exportedImage").show(); //Canvas

    $("#contorno").show();
    $("#contorno2").show();
    $("#contorno3").show();
    $("#contorno4").show();

    setTimeout(function() {
      $("#map").hide(); //Mapa OpenLayers
    });
    //alert();
    setTimeout(function(){}, 300);

    var canvas = OpenLayers.Util.getElement("exportedImage");
    exportMapControl.trigger(canvas);
  });

$( "#Imprimir" ).click(function() {
    var texto = "";
    document.getElementById("texto-imprimir").innerHTML = texto;
    texto = $("#message-text").val();
    document.getElementById("texto-imprimir").innerHTML = texto;

    setTimeout(function() {
      window.print(); //Ventana de Impresion
    }, 100);

    setTimeout(function() {
      $("#print").removeAttr("href");
      $("#fonts").attr("href","https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");
      $("#fontAwesome").attr("href","assets/font-awesome/css/font-awesome.min.css");
      //$("#bootstrapCSS").attr("href","assets/css/bootstrap.min.css");
      $("#template").attr("href","assets/css/template.css");
      $("#chartsCSS").attr("href","assets/css/charts.css");
      $("#toolbarCSS").attr("href","assets/css/jquery.toolbar.css");
      $("#miniColorsCSS").attr("href","assets/css/jquery.minicolors.css");
      $("#jQuery211").attr("src","//code.jquery.com/jquery-2.1.1.min.js");
      //$("#jQueryMin").attr("src","https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
      $("#excanvas").attr("src","assets/js/excanvas.js");
      $("#jQuery").attr("src","assets/js/jquery.js");
      $("#flot").attr("src","assets/js/jquery.flot.js");
      $("#axislabels").attr("src","assets/js/jquery.flot.axislabels.js");
      $("#flot").attr("src","assets/js/jquery.flot.tooltip.js");
      $("#categories").attr("src","assets/js/jquery.flot.categories.js");
      $("#chartsJS").attr("src","assets/js/charts.js");
      $("#herramientas").attr("src","js/herramientas.js");
      $("#miniColorsJS").attr("src","assets/js/jquery.minicolors.js");
      $("#toolbarJS").attr("src","assets/js/jquery.toolbar.js");
      $("#mandar").attr("src","js/mandar.js");
      $("#template").attr("src","assets/js/template.js");
      $("#amplify").attr("src","../js/libs/amplify/amplify.js");
      $("#CartoJS").attr("src","../js/JSCartografico.js");
      $("#colors").attr("src","js/colors.js");

      $("#cabecera").show();
      $("#panelH").show();
      $("#exportedImage").hide();
      $("#map").show();
      $("#bg").hide();
      $("#head").hide();
      $("#wind").hide();
      $("#region").hide();
      $("#contorno").hide();
      $("#contorno2").hide();
      $("#contorno3").hide();
      $("#contorno4").hide();
    }, 300);

     });

$( "#Cancelar" ).click(function() {
  //alert("Cancelar");
    var texto = "";
    document.getElementById("texto-imprimir").innerHTML = texto;
    setTimeout(function() {
      $("#print").removeAttr("href");
      $("#fonts").attr("href","https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");
      $("#fontAwesome").attr("href","assets/font-awesome/css/font-awesome.min.css");
      //$("#bootstrapCSS").attr("href","assets/css/bootstrap.min.css");
      $("#template").attr("href","assets/css/template.css");
      $("#chartsCSS").attr("href","assets/css/charts.css");
      $("#toolbarCSS").attr("href","assets/css/jquery.toolbar.css");
      $("#miniColorsCSS").attr("href","assets/css/jquery.minicolors.css");
      $("#jQuery211").attr("src","//code.jquery.com/jquery-2.1.1.min.js");
      //$("#jQueryMin").attr("src","https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
      $("#excanvas").attr("src","assets/js/excanvas.js");
      $("#jQuery").attr("src","assets/js/jquery.js");
      $("#flot").attr("src","assets/js/jquery.flot.js");
      $("#axislabels").attr("src","assets/js/jquery.flot.axislabels.js");
      $("#flot").attr("src","assets/js/jquery.flot.tooltip.js");
      $("#categories").attr("src","assets/js/jquery.flot.categories.js");
      $("#chartsJS").attr("src","assets/js/charts.js");
      $("#herramientas").attr("src","js/herramientas.js");
      $("#miniColorsJS").attr("src","assets/js/jquery.minicolors.js");
      $("#toolbarJS").attr("src","assets/js/jquery.toolbar.js");
      $("#mandar").attr("src","js/mandar.js");
      $("#template").attr("src","assets/js/template.js");
      $("#amplify").attr("src","../js/libs/amplify/amplify.js");
      $("#CartoJS").attr("src","../js/JSCartografico.js");
      $("#colors").attr("src","js/colors.js");

      $("#cabecera").show();
      $("#panelH").show();
      $("#exportedImage").hide();
      $("#map").show();
      $("#bg").hide();
      $("#head").hide();
      $("#wind").hide();
      $("#region").hide();
      $("#contorno").hide();
      $("#contorno2").hide();
      $("#contorno3").hide();
      $("#contorno4").hide();
    }, 300);
  });

$( ".print2" ).click(function() {
  var simbologiaTema = getListSimbologia("getListSimbologia", usuario);
    //alert(simbologiaTema.length);
    //alert(JSON.stringify(simbologiaTema));
    for (var i = 0; i < simbologiaTema.length; i++) {
      //alert(simbologiaTema[i].caracteristica_simbolo);
      var substring = "rgb";
      var substring2 = "#";
      //alert(simbologiaTema[i].caracteristica_simbolo.indexOf(substring));
      if (simbologiaTema[i].caracteristica_simbolo.indexOf(substring) == 0 || simbologiaTema[i].caracteristica_simbolo.indexOf(substring2) == 0) {
        //Color
        $("#cube"+(i+1)+"").attr("style","background: "+simbologiaTema[i].caracteristica_simbolo+"!important; display: block;");
        $("#txtc"+i+"").html(simbologiaTema[i].nombre_simbolo);
      }else{
        //Imagen
        $("#s"+(i+1)+"").attr("style", "display: block;");
        $("#img"+i+"").attr("src","img/icons/"+simbologiaTema[i].caracteristica_simbolo+"");
        $("#txti"+i+"").html(simbologiaTema[i].nombre_simbolo);
      }
    }
  $("#print2").attr("href","css/print2.css");
  setTimeout(function(){}, 300);
    var meses = new Array (
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    );
    var diasSemana = new Array(
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    );
    var f = new Date();
    document.getElementById("tiempo").innerHTML = /*"Hoy " + diasSemana[f.getDay()] + ", " +*/ f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
    $("#fonts").removeAttr("href");
    $("#fontAwesome").removeAttr("href");
    //$("#bootstrapCSS").removeAttr("href");
    $("#template").removeAttr("href");
    $("#chartsCSS").removeAttr("href");
    $("#toolbarCSS").removeAttr("href");
    $("#miniColorsCSS").removeAttr("href");
    $("#jQuery211").removeAttr("src");
    //$("#jQueryMin").removeAttr("src");
    $("#excanvas").removeAttr("src");
    $("#jQuery").removeAttr("src");
    $("#flot").removeAttr("src");
    $("#axislabels").removeAttr("src");
    $("#axislabels").removeAttr("src");
    $("#tooltip").removeAttr("src");
    $("#categories").removeAttr("src");
    $("#chartsJS").removeAttr("src");
    $("#herramientas").removeAttr("src");
    $("#miniColorsJS").removeAttr("src");
    $("#toolbarJS").removeAttr("src");
    $("#mandar").removeAttr("src");
    $("#template").removeAttr("src");
    $("#amplify").removeAttr("src");
    $("#CartoJS").removeAttr("src");
    $("#colors").removeAttr("src");

    $("#cabecera").hide();
    $("#panelH").hide();
    $("#modalPoligono").hide();
    $("#modalKML").hide();
    $("#modalShape").hide();
    $("#modalRaster").hide();
    $("#modalIndicadores").hide();
    $("#modalFiguraManual").hide();
    $("#modalTema").hide();
    $("#modalDetalle").hide();
    $("#funciones").hide();
    $("#modalServicios").hide();

    $("#head").show(); //Encabezado Probosque
    $("#bg").show(); //Marco Escala
    $("#wind").show();//Rosa de los vientos
    $("#region").show();//region
    $("#exportedImage").show(); //Canvas

    $("#contorno").show();
    $("#contorno2").show();
    $("#contorno3").show();
    $("#contorno4").show();

    setTimeout(function() {
      $("#map").hide(); //Mapa OpenLayers
    });
    //alert();
    setTimeout(function(){}, 300);

    var canvas = OpenLayers.Util.getElement("exportedImage");
    exportMapControl.trigger(canvas);
  });
      }




      $(document).on('ready',function() {

        function getParameterByName(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        usuario = getParameterByName('vuhmepmhac')/5;
        if (usuario == 0) {
          var a = amplify.store( 'dataLoggingProbosque');
          usuario = a.id;
        }
        configuracionFigura.usuario=usuario;
        evento();

        limpiarBaseSim("limpiarBaseSim", usuario);

        loadRegiones("mostrarRegiones", usuario);
        loadLocalidades("mostrarLocalidades", usuario);
        loadRural("mostrarLocalRurales", usuario);

        getListMapas("getListMapas", usuario);
        getListaServicio("getListaServicio", usuario);

        loadEstado("mostrarEstado", usuario);


        contadorTemas("contadorTemas", usuario);

      });
}

function updateFormats() {
            var in_options = {
                //'internalProjection': map.baseLayer.projection,
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            };   
            var out_options = {
                //'internalProjection': map.baseLayer.projection,
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            };
            formats = {
              'in': {
                wkt: new OpenLayers.Format.WKT(in_options)
              },
              'out': {
                wkt: new OpenLayers.Format.WKT(out_options)
              }
            };
        }

        function deserialize() {
            var element = document.getElementById('text');
            //alert(element.value);
            var encuentra = "MULTI";
            if(element.value.indexOf(encuentra) != -1){
              //alert(str2 + " found");
            var type = "wkt";
            var features = formats['in'][type].read(element.value);
            var bounds;
            if(features) {
                if(features.constructor != Array) {
                    features = [features];
                }
                for(var i=0; i<features.length; ++i) {
                    if (!bounds) {
                        bounds = features[i].geometry.getBounds();
                    } else {
                        bounds.extend(features[i].geometry.getBounds());
                    }

                }
                vectors.addFeatures(features);
                //alert(bounds);
                map.zoomToExtent(bounds);
                //var plural = (features.length > 1) ? 's' : '';
                //element.value = features.length + ' feature' + plural + ' added';
            } else {
                //element.value = 'Bad input ' + type;
            }
          }
        }