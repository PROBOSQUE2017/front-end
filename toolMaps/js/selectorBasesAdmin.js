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
        layers: 'basic'
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


    var pointLayer = new OpenLayers.Layer.Vector("Indicadores", {
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
          fillOpacity: 0.7,
          externalGraphic: 'img/icons/'+icons
          });

      pointFeatures.push(pointFeature);
           
      // Add features to the layer
      pointLayer.addFeatures(pointFeatures); 

}
    


          var vectorLayer = new OpenLayers.Layer.Vector("Figuras");
            vectorLayer.events.register('beforefeatureadded', vectorLayer, setFeatureStyle);
            map.addLayer(vectorLayer);

          var vectorFiguraMapa = new OpenLayers.Layer.Vector("Mapa");
            vectorFiguraMapa.events.register('beforefeatureadded', vectorLayer, setColorFIgurasMapa);
            map.addLayer(vectorFiguraMapa);
    
          var editingControl = new OpenLayers.Control.EditingToolbar(vectorLayer,{'tools':['Point','Polygon']});
          var navegacion =  new OpenLayers.Control.Navigation(vectorLayer);
          map.addControl(editingControl);


          function setColorFIgurasMapa(event){
            var fillColor = $('#fillColor').val();
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
        

    // Event handler for feature selected
    vectorLayer.events.register("featureselected", null, function(event){
        var tema = configuracionFigura.tema;
        var a = amplify.store('arreglo', arregloTemas);
        var z;
        var figura = "";
        var ft;
        //arregloTemas.[0];
        var i = 0;
        var temaEncontrado = false;
        var areaFig = event.feature.geometry.getArea()*100000;
        var recPopUp;
        for(b=0; b<a.length;b++){
        //while  (i < a[0].length && temaEncontrado==false){
        if (temaEncontrado==false) {
          var tema2=a[0];
          //console.log(tema2);
          //alert("while " + tema2)
          
          ft = event.feature.geometry.getVertices();
          for(z=0; z<ft.length; z++){
            figura += ft[z].x + " " + ft[z].y;
            if(z<ft.length-1){
              figura += ",";
            }
          }

          recPopUp = recuperacionPopUp("recuperacionPopUp", usuario, figura);
          console.log(recPopUp);
         
          if(recPopUp.folio != undefined){
              temaEncontrado = true;
          }
          i++;
        }
      }
        
        //var desc=loadDescripciones("mostrarDescripciones", usuario, tema, figura);
        //var folioRE = loadFolioFig("conseguirFolio", usuario, tema, figura);
        var layer = event.feature.layer;
        TblCartoDetalleAdmin("obtenAdmin", usuario, recPopUp.folio, recPopUp.programa);

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
                            
                    //var content = "<div style=\"max-height: 150px; overflow-y:scroll;\"><strong>Folio:</strong> <br/>" + recPopUp.folio + "<br/><strong>Área:</strong> <br/>" + areaFig.toFixed(4) + " ha<br/><strong>Descripción:</strong> <br/>" + recPopUp.descripcion + "</div>"; //event.feature.geometry.getArea()

                    var content = "<div style=\"max-height: 150px; overflow-y:scroll;\"><strong>Folio:</strong> <br/>" + recPopUp.folio + "<br/><strong>Área:</strong> <br/>" +  areaFig.toFixed(4) + " ha<br/>"
                    +"<strong>Descripción:</strong><br/>" ;//event.feature.geometry.getArea()
                        if (recPopUp.descripcion !== undefined){  
                          for (var i = 0; i < recPopUp.descripcion.length; i++) {
                            //console.log(desc[i]);
                            if(recPopUp.descripcion[i] === ',')
                                {
                                content+='<br/>';
                                }
                            content+=recPopUp.descripcion[i];
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


            var confAdmin = new Object();
              confAdmin.usuarioBase="";
              confAdmin.programa="";

          
          var wktRurales = new OpenLayers.Layer.Vector("L. Urbanas");
          wktRurales.setVisibility(false);

          function pintarRural(coorRural){
                var text = coorRural;
                var features = wktLol.read(text);
                wktRurales.addFeatures(features);
                map.addLayer(wktRurales);
              } 


          var wktLol = new OpenLayers.Format.WKT();
          var wktLocalidades = new OpenLayers.Layer.Vector("Localidades");
          wktLocalidades.setVisibility(false);
          
          function pintarLocalidades(coorLoca){
                var text = coorLoca;
                var features = wktLol.read(text);
                wktLocalidades.addFeatures(features);
                map.addLayer(wktLocalidades);
              }


          var wkt = new OpenLayers.Format.WKT();
          var wktLayer = new OpenLayers.Layer.Vector("Regiones");

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

              var borrarTema =  function(){
                vectorLayer.destroyFeatures();
                pointLayer.destroyFeatures();
              }

              var borrarMapa = function(){
                vectorFiguraMapa.destroyFeatures();
                pointLayer.destroyFeatures();
              }

          function showTemasDeMapa(figurasMapa){
            var text = figurasMapa;
            $.each(text.data, function(index, data){
              var features = wkt.read(data);
              vectorFiguraMapa.addFeatures(features);
            });
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


              var vKML = new OpenLayers.Layer.Vector("Prueba KML", {
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
              map.addLayer(vKML);


      var loadData = function(action,usr,tema){
        var params={ "action":action, "usuario":usr, "tema":JSON.stringify(tema)};
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/ConectMapa',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          var element = document.getElementById('text');
          element.value = data.data;
          for(var x in data.data){
            //var coordenada = data.data[x].the_geom;
            var coordenada = data.data[x]
            var text = coordenada;
            var features = wkt.read(text);
            vectorLayer.addFeatures(features);
             
          }
          deserialize();
            map.addControl(selectControl);
            selectControl.activate();
        });
      }

      var loadRegiones = function(action, usr){
            var params={ "action":action, "usuario":usr};
            $.ajax({
              url: 'http://localhost:8080/ServiceBosque/ConectMapa',
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
              url: 'http://localhost:8080/ServiceBosque/ConectMapa',
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
            url: 'http://localhost:8080/ServiceBosque/ConectMapa',
            type: 'POST',
            datatype: 'json',
            data:params
          }).done(function(data){
            var coorRural = data.data;
            pintarRural(coorRural);
          });
      }

      var recuperacionPopUp = function(action, usr, fig){
        var recPopUp;
        var params = {"action":action,"usuario":usr,"figura":fig}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data:params,
          async:false
        }).done(function(data){
          recPopUp = data.data[0];
        });
        return recPopUp;
      }

      var areaFigura = function(action, usr, tema, fig, typeFigura){
        var area_Figura;
        var params = {"action":action,"usuario":usr,"tema":JSON.stringify(tema),"figura":fig, "typeFigura":typeFigura}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/ConectMapa',
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
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
            
        });
      }

      var insertTema = function(action, usr, tema){
        var params = {"action":action,"usuario":usr,"tema":tema}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/ConectMapa',
          type: 'POST',
          datatype: 'json',
          data:params,
        }).done(function(data){
            alert(data.data);
        });
      }

      var insertTemaAdmin = function(action, usr, programa, tema, figuraType, colorTema){
        var params = {"action":action,"usuario":usr,"programa":programa,"tema":JSON.stringify(tema),"figuraType":figuraType,"colorTema":colorTema}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
            console.log(data.data);
        });
      }

      var insertIndicadores = function(action, usr, nombreImagen, Px, Py){
        var params={ "action":action, "usuario":usr, "nombreImagen":nombreImagen, "px":Px, "py":Py};
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){});
      }

      var getFiguraType = function(action, usr, programa, tema){
        var tipo_Figura;
        var params = {"action":action,"usuario":usr,"programa":programa,"tema":JSON.stringify(tema)}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params,
          async: false
        }).done(function(data){
          tipo_Figura = data.data;
        });
        return tipo_Figura;
      }

      var getListTemas = function(action, usr, idMapa){
        var params = {"action":action, "usuario":usr, "idMapa":idMapa}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
            $('#tablaTemas').empty();
            var tabla = $('#tablaTemas');
            tabla.append('<thead><tr><th>Tema</th><th>Programa</th><th>Color</th><th>Quitar</th></tr></thead>');
            $.each(data.data, function(index, data){
              if((document.getElementById(data.tema_descripcion.replace(/\s/g, '_'))==null)){
                tabla.append('<tr id="'+data.tema_descripcion+'"><td>'+data.tema_descripcion+'</td><td>Prog. '+data.tema_programa+'</td><td><div style="background:'+data.tema_color+'; width:20px; height:20px;"></div></td><td><button type="button" id="'+data.tema_descripcion+'" class="btn btn-danger"><i class="fa fa-trash"></i></button></td></tr>');
              }
              $('#'+data.tema_descripcion).click(function(){
                eliminarTemas("eliminarTemas", usuario, data.tema_descripcion, data.tema_programa);
              });
             
            });
        });
      }

      var getListIndicadores = function(action, usr, idMapa){
        var params = {"action":action, "usuario":usr, "idMapa":idMapa}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
          $('#tablaIndicadores').empty();
          var tabla = $('#tablaIndicadores');
          tabla.append('<thead><tr><th>Indicador</th><th>X</th><th>Y</th><th>Quitar</th></tr></thead>');
          $.each(data.data, function(index, data){
              if((document.getElementById(data.indicador_id))==null){              
                tabla.append('<tr id="'+data.indicador_id+'"><td>'+data.indicador_nombre.slice(0,-4)+'</td><td>'+data.indicador_x+'</td><td>'+data.indicador_y+'</td><td><button type="button" id="'+data.indicador_id+'" class="btn btn-danger"><i class="fa fa-trash"></i></button></td></tr>');
              }
              $('#'+data.indicador_id).click(function(){
                alert(data.indicador_id);
                eliminarIndicador("eliminarIndicador", usuario, data.indicador_id, data.mapa_id);
              });
          });
        });
      }

      var getListMapas = function(action, usr){
        var params={"action":action,"usuario":usr};
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          $.each(data.data, function(index, data){
            var selector = $('#listaTemaXMapa');
            if( (document.getElementById(data.mapa_descripcion.replace(/\s/g, '_'))==null)){
              selector.append('<option value="'+data.mapa_id+'">'+data.mapa_descripcion+'</option>');
              $('#listaTemaXMapa').change(function(){
                var mapaListaTema = selector.val();
                getListTemas("getListTemas", usuario, mapaListaTema);
                getListIndicadores("getListIndicadores", usuario, mapaListaTema);
              });
            }
          });

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


      var eliminarTemas = function(action, usr, tema, programa){
        var params = {"action":action, "usuario":usr, "tema":tema, "programa":programa}
        console.log(params);
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
          var selector = $('#listaTemaXMapa');
          var mapaListaTema = selector.val();
          $('#'+tema).remove();
          getListTemas("getListTemas", usuario, mapaListaTema);
        });
      }


      var eliminarIndicador = function(action, usr, idIndicador, idMapa){
        var params = {"action":action, "usuario":usr, "idIndicador":idIndicador, "idMapa":idMapa}
        console.log(params);
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
          $('#'+idMapa.replace(/\s/g, '_')).remove();
          
          getListIndicadores("getListIndicadores", usuario, idMapa);
        });
      }

      var eliminarMapas = function(action, usr, idMapa){
        var params = {"action":action, "usuario":usr, "idMapa":idMapa}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
            $('#'+idMapa.replace(/\s/g, '_')).remove();
          
           
        });
      }

      var guardarMapa = function(action, usr, nombreMapa){
        var params = {"action":action,"usuario":usr,"nombreMapa":nombreMapa}
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: 'POST',
          datatype: 'json',
          data: params
        }).done(function(data){
            console.log(data.data);
        });
      }

      var pintarMapaTemas = function(action,usr,idMapa){
        var params={ "action":action, "usuario":usr, "idMapa":idMapa};
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          var listaFiguras = data;
          showTemasDeMapa(listaFiguras);
        });
      }

      var pintarMapaIndicador = function(action,usr,idMapa){
        var params={ "action":action, "usuario":usr, "idMapa":idMapa};
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/CartoAdmin',
          type: "POST",
          datatype: 'json',
          data:params
        }).done(function(data){
          $.each(data.data, function(index, data){
            pintarIndicadores(data.indicador_nombre, data.indicador_x, data.indicador_y);
          });
        });
      }

      var evento= function(){

            $('#btnVerTema').click(function(){
              var tema = $('#selectTemasPoligonos').val();
              var programa = $('#eleccionBase').val();
              confAdmin.programa = programa;
              var colorTema = $('#fillColor').val();
              var figuraType;
              configuracionFigura.tema = tema;
              arregloTemas.push(configuracionFigura.tema);
              amplify.store('arreglo', arregloTemas);
              insertMapa("insertMapa", usuario);
              for (var i = tema.length - 1; i >= 0; i--) {
                figuraType = getFiguraType("getFiguraType", usuario, programa, tema[i]);
                insertTemaAdmin("insertTemaAdmin", usuario, programa, tema[i], figuraType, colorTema);
                loadData("mostrarTemasPoligonos", confAdmin.usuarioBase, tema[i]);
              }
            });

            $('#btnEliminarTema').click(function(){
              borrarTema();
            });

            $('#btnEliminarMapa').click(function(){
              borrarMapa();
            });

            $('#btnGuardarIndicadores').click(function(){
              var nombreImagen = $('#imagenIndicador').val();
              var indicadorPx = $('#coordenadaPx').val();
              var indicadorPy = $('#coordenadaPy').val();
              insertIndicadores("insertIndicadores", usuario, nombreImagen, indicadorPx, indicadorPy);
              pintarIndicadores(nombreImagen, indicadorPx, indicadorPy);
            });
               
            $('#btnGuardarMapa').click(function(){
              var nombreMapa = $('#nombreMapa').val();
              guardarMapa("guardarMapa", usuario, nombreMapa);
              getListMapas("getListMapas", usuario);
            });

            $('#btnMostrarMapa').click(function(){
              var x = document.getElementsByClassName("seleccion");
              pintarMapaTemas("pintarMapaTemas", usuario, x[0].id);
              pintarMapaIndicador("pintarMapaIndicador", usuario, x[0].id);
            });

      }


      var cambioBase = function(){


        $('#eleccionBase').change(function(){
          var base = $('#eleccionBase').val();
          console.log(base);
          if(base == 1){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 11;
          }
          if(base == 2){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 12;
          }
          if(base == 3){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 13;
          }
          if(base == 5){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 15;
          }
          if(base == 6){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 16;
          }
          if(base == 71){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 35;
          }
          if(base == 72){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 36;
          }
          if(base == 8){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 19;
          }
          if(base == 10){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 21;
          }
          if(base == 11){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 22;
          }
          if(base == 12){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 23;
          }
          if(base == 0){
            confAdmin.usuarioBase = "";
            confAdmin.usuarioBase = 1;
          }
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
        configuracionFigura.usuario=usuario;
        evento();

        loadRegiones("mostrarRegiones", usuario);
        loadLocalidades("mostrarLocalidades", usuario);
        loadRural("mostrarLocalRurales", usuario);

        cambioBase();

        getListMapas("getListMapas", usuario);

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