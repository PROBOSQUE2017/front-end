<!DOCTYPE html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <title>Sistema de Información Forestal del Estado de México</title>
    <link id="print" rel="stylesheet" type="text/css">
    <link id="print2" rel="stylesheet" type="text/css">

    <link id="fonts" type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"/>
    <link id="fontAwesome" rel="stylesheet" type="text/css" href="assets/font-awesome/css/font-awesome.min.css"/>
    <link id="bootstrapCSS" href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link id="template" rel="stylesheet" href="assets/css/template.css" />
    <link id="chartsCSS" rel="stylesheet" type="text/css" href="assets/css/charts.css">
    <link id="toolbarCSS" rel="stylesheet" href="assets/css/jquery.toolbar.css"/>
    <link id="miniColorsCSS" rel="stylesheet" href="assets/css/jquery.minicolors.css">
    <script id="jQuery211" type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
    <script id="jQueryMin" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script id="excanvas" language="javascript" type="text/javascript" src="assets/js/excanvas.js"></script>
    <script id="jQuery" type="text/javascript" src="assets/js/jquery.js"></script>
    <script id="flot" type="text/javascript" src="assets/js/jquery.flot.js"></script>
    <script id="axislabels" type="text/javascript" src="assets/js/jquery.flot.axislabels.js"></script>
    <script id="tooltip" type="text/javascript" src="assets/js/jquery.flot.tooltip.js"></script>
    <script id="categories" type="text/javascript" src="assets/js/jquery.flot.categories.js"></script>
    <script id="chartsJS" type="text/javascript" src="assets/js/charts.js"></script>
    <script id="miniColorsJS" src="assets/js/jquery.minicolors.js"></script>
   

    <link rel="stylesheet" type="text/css" href="/SIFEM/css/structure.css">

    <!--<script type="text/javascript" src="js/libs/OpenLayers-2.13.1/OpenLayers.js"></script>-->
    <script type="text/javascript" src="PrintMapa/lib/OpenLayers.js"></script>
    <script id="toolbarJS" type="text/javascript" src="assets/js/jquery.toolbar.js"></script>
    <script id="mandar" src="js/mandar.js"></script>
    <script src="js/selectorBases.js"></script>
    <!--<script src="https://maps.googleapis.com/maps/api/js?v=3.12&amp;key=AIzaSyDLSfypF5ragJoM1-NR7tBest1CRyqWz38&amp;sensor=false"></script>
    <script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/23/10/intl/es_ALL/common.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/23/10/intl/es_ALL/map.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/23/10/intl/es_ALL/util.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/23/10/intl/es_ALL/onion.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/23/10/intl/es_ALL/controls.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/23/10/intl/es_ALL/stats.js"></script>-->

     <script >
       $( document ).ready(function() {
        init();
        });
     </script>
  <style type="text/css">
      #map{
        position: absolute; top: 50px; bottom: 0px; left: 0px; right: 0px;
        z-index: 35;
      }
    </style>
        <style type="text/css">
    @media print {
      @page { 
        size: auto;   /* auto is the initial value */ 
        /* this affects the margin in the printer settings */ 
        /*arriba, derecha, abajo, izquierda*/
        margin: 5mm 7mm 5mm 7mm; 
      }
  }
  </style>
  </head>
  <body id="body">
  <div id="head" class="pageHeader" align="center" style="display: none;">
    <img src="img/probosque.png" alt="logo">
  </div>
  <div id="bg" style="display: none;">
    <img src="img/IMAGEN.png" alt="">
  </div>
  <div id="wind" class="pageWind" align="center" style="display: none;">
    <img src="img/wind.png" alt="logo">
  </div>
  <div id="region" class="pageRegion" align="center" style="display: none;">
    <img src="img/mini1.png" alt="logo">
  </div>
  <div id="contorno" class="pageContorno" align="center" style="display: none;">
    <p><strong>UBICACIÓN</strong></p>
  </div>
  <div id="contorno2" class="pageContorno2" align="center" style="display: none;">
    <p id="texto-imprimir"></p>
  </div>
  <div id="contorno3" class="pageContorno3" align="center" style="display: none;">
    <p><small id="tiempo"></small></p>
  </div>
  <div id="contorno4" class="pageContorno4" align="center" style="display: none;">
    <p><strong>SIMBOLOGIA</strong></p>

    <div id="s1" class="cubeImg1" style="display: none;">
      <img id="img0" src="" alt="logo">
      <p id="txti0"></p>
    </div>

    <div id="cube1" class="cube1" style="display: none;">
      <p id="txtc0"></p>
    </div>

     <div id="s2" class="cubeImg2" style="display: none;">
      <img id="img1" src="" alt="logo">
      <p id="txti1"></p>
    </div>

    <div id="cube2" class="cube2" style="display: none;">
      <p id="txtc1"></p>
    </div>

    <div id="s3" class="cubeImg3" style="display: none;">
      <img id="img2" src="" alt="logo">
      <p id="txti2"></p>
    </div>

    <div id="cube3" class="cube3" style="display: none;">
      <p id="txtc2"></p>
    </div>

    <div id="s4" class="cubeImg4" style="display: none;">
      <img id="img3" src="" alt="logo">
      <p id="txti3"></p>
    </div>

    <div id="cube4" class="cube4" style="display: none;">
      <p id="txtc3"></p>
    </div>

    <div id="s5" class="cubeImg5" style="display: none;">
      <img id="img4" src="" alt="logo">
      <p id="txti4"></p>
    </div>

    <div id="cube5" class="cube5" style="display: none;">
      <p id="txtc4"></p>
    </div>

    <div id="s6" class="cubeImg6" style="display: none;">
      <img id="img5" src="" alt="logo">
      <p id="txti5"></p>
    </div>

    <div id="cube6" class="cube6" style="display: none;">
      <p id="txtc5"></p>
    </div>
  </div>
  <!--<div id="foot" class="pageFoot" align="center">
    <img src="img/foot.png" alt="logo">
  </div>-->
   <div id="cabecera" class="container">
      <div class="app_header">
         <div class="section_header">
            <div class="section_logo">
               <div class="template_logo"></div>
            </div>
            <div class="section_logo_probosque">
               <div class="template_logo_probosque"></div>
            </div>
            <div class="section_title_system">Sistema de Información Forestal del Estado de México</div>
            <div class="section_info_user">
               <div class="option_logout" style="font-size: 96%;">Cerrar sesión</div>
               <div class="divisor"></div>
               <div class="user_connected" style="font-size: 96%;"></div>
            </div>
         </div>
      </div>   
    </div>


  <div class="navbar-offset"></div>
    <div id="map"></div>
    <div>
    <!--<p id="txt">Exported map:</p>-->
      <canvas id="exportedImage" class=""></canvas> <br />
      <!--<a id="downloadLink" href="" target="_blank">Download Image</a>-->
    </div>
    <textarea id="text" style="display: none;"></textarea>
      <div id="panelH" class="row main-row">
        <!-- INICIO DE PANEL IZQUIERDO -->
        <div class="col-sm-4 col-md-3 sidebar sidebar-left pull-left">
          <div class="panel-group sidebar-body" id="accordion-left">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#properties">
                    <i class="fa fa-bar-chart"></i>
                    Gr&aacute;fica
                  </a>
                  <span class="pull-right slide-submenu">
                    <i class="fa fa-chevron-left"></i>
                  </span>
                </h4>
              </div>
              <div id="properties" class="collapse">
                <div class="panel-body">
                  <div id="flot-placeholder" style="width:300px;height:150px;"></div>
                  <!--rubi-->
                    <!--<div id="btn_graph">
                      <a href="#" class="button medium radius">
                        <span class="icon-code"></span> Graficar
                     </a> 
                    </div>-->
                </div>
              </div>
            </div>
            <!--AQUÍ EMPIEZA PANEL DE KMLS, RASTERS-->
            <div class="panel panel-warning">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#servicios">
                    <i class="fa fa-file"></i>
                    KML, Raster y Servicios
                  </a>
                </h4>
              </div>
              <div id="servicios" class="collapse">
                <div class="panel-body" style="max-height: 400px; overflow-y:scroll;">
                  <label>Elige el Kml a visualizar</label>
                  <?php
                    $ruta = 'D:\ms4w\Apache\htdocs\SIFEM\toolMaps\kml';
                    obtener_estructura_directorios($ruta);
                    function obtener_estructura_directorios($ruta){
        
                    // Se comprueba que realmente sea la ruta de un directorio
                    if (is_dir($ruta)){
                      // Abre un gestor de directorios para la ruta indicada
                      $gestor = opendir($ruta);
                      echo '<select class="form-control" id="carpetaKml">';
                 
                      // Recorre todos los elementos del directorio
                      while (($archivo = readdir($gestor)) !== false)  {
                        
                        $ruta_completa = $ruta . "/" . $archivo;
                 
                        // Se muestran todos los archivos y carpetas excepto "." y ".."
                        if ($archivo != "." && $archivo != "..") {
                          // Si es un directorio se recorre recursivamente
                          if (is_dir($ruta_completa)) {
                            echo '<option value="'.$archivo.'">' . $archivo . '</option>';
                            obtener_estructura_directorios($ruta_completa);
                          } else {
                            echo '<option value="'.$archivo.'">' . $archivo . '</option>';
                          }
                        }
                      }
                      // Cierra el gestor de directorios
                      closedir($gestor);
                      echo '</select>';
                    } else {
                      echo "No es una ruta de directorio valida<br/>";
                    }
                    
                  }?>
                  <br>
                  <button type="button" class="btn btn-primary" id="btnVerKML">Ver KML</button>
                  <br>
                  <br>
                  <label>Elige el raster a visualizar</label>
                  <?php
                    $rutaRaster = 'D:\ms4w\Apache\htdocs\SIFEM\toolMaps\raster';
                    obtener_directorioRaster($rutaRaster);
                    function obtener_directorioRaster($rutaRaster){
        
                    // Se comprueba que realmente sea la ruta de un directorio
                    if (is_dir($rutaRaster)){
                      // Abre un gestor de directorios para la ruta indicada
                      $gestorRaster = opendir($rutaRaster);
                      echo '<select class="form-control" id="carpetaRaster">';
                 
                      // Recorre todos los elementos del directorio
                      while (($archivoRaster = readdir($gestorRaster)) !== false)  {
                        
                        $ruta_completaRaster = $rutaRaster . "/" . $archivoRaster;
                 
                        // Se muestran todos los archivos y carpetas excepto "." y ".."
                        if ($archivoRaster != "." && $archivoRaster != "..") {
                          // Si es un directorio se recorre recursivamente
                          if (is_dir($ruta_completaRaster)) {
                            echo '<option value="'.$archivoRaster.'">' . $archivoRaster . '</option>';
                            obtener_directorioRaster($ruta_completaRaster);
                          } else {
                            echo '<option value="'.$archivoRaster.'">' . $archivoRaster . '</option>';
                          }
                        }
                      }
                      // Cierra el gestor de directorios
                      closedir($gestorRaster);
                      echo '</select>';
                    } else {
                      echo "No es una ruta de directorio valida<br/>";
                    }
                    
                  }?>
                  <br>
                  <button type="button" class="btn btn-primary" id="btnVerRaster">Ver Raster</button>
                  <br>
                  <br>
                  <label>Elige el servicio</label>
                  <select class="form-control" id="selectServicio">
                    
                  </select>
                  <br>
                  <button type="button" class="btn btn-primary" id="btnMostrarServicio">Ver Servicio</button>
                </div>
              </div>
            </div>
            <!--AQUÍ TERMINA PANEL DE KMLS, RASTERS-->
            <div class="panel panel-info">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#layers">
                    <i class="fa fa-list-alt"></i>
                    Información detallada
                  </a>
                </h4>
              </div>
              <div id="layers" class="collapse">
                <div class="panel-body" style="max-height: 400px; overflow-y:scroll;">
                  
                  <table id="tblCarto" class="table table-striped">
                    <thead><tr><th>Campo</th><th>Valores</th></tr></thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4 col-md-6 mid"></div>
        <div class="col-sm-4 col-md-3 sidebar sidebar-right pull-right">
          <div class="panel-group sidebar-body " id="accordion-right">
            <div class="panel panel-info">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#funciones">
                    <i class="fa fa-map-signs"></i>
                    1.0 Funciones
                  </a>
                  <span class="pull-right slide-submenu">
                    <i class="fa fa-chevron-right"></i>
                  </span>
                </h4>
              </div>
              <div id="funciones" class="collapse">
                <div class="panel-body">
                  <div class="btn-group btn-group-justified" role="group">
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg btn-block" data-toggle="modal" data-target="#modalPoligono" src="img/img2.png">
                      &nbsp;&nbsp;&nbsp;&nbsp;Figura
                    </div>
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg" type="image" data-toggle="modal" data-target="#modalServicios" src="img/img1.png" >
                      &nbsp;&nbsp;Servicios
                    </div>
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg" data-toggle="modal" data-target="#modalRaster" src="img/img3.png" >
                      &nbsp;&nbsp;&nbsp;&nbsp;Raster
                    </div>
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg" data-toggle="modal" data-target="#modalTema" src="img/img3.png" >
                      &nbsp;&nbsp;&nbsp;&nbsp;Tema
                    </div>
                  </div>
                  <div class="btn-group btn-group-justified" role="group">
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg btn-block" data-toggle="modal" data-target="#modalFiguraManual" src="img/img2.png">
                      F. Manual
                    </div>
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg" data-toggle="modal" data-target="#modalKML" src="img/img2.png">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KML
                    </div>
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg" data-toggle="modal" data-target="#modalShape" src="img/img2.png" >
                      &nbsp;&nbsp;&nbsp;&nbsp;Shape
                    </div>
                    <div class="btn-group" role="group">
                      <img class="btn btn-default btn-lg" data-toggle="modal" data-target="#modalEliminarTema" src="img/img3.png" >
                      &nbsp;&nbsp;&nbsp;Eliminar
                    </div>
                  </div>
                </div><!--FIN BODY-->
              </div>
            </div>
            <div class="panel panel-warning">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#temas">
                    <i class="fa fa-map-o"></i>
                    2.0 Temas <label id = "contadorTema"> 0</label>
                  </a>
                </h4>
              </div>
              <div id="temas" class="collapse">
                <div class="panel-body">
                    <div class="form-group">
                      <label>Elige un tema</label>
                      <select multiple="multiple" class="form-control" id="selectTemasPoligonos">
                        
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="letter-case">Elige el color del tema</label>
                      <input type="text" id="fillColor" class="form-control demo" data-format="rgb" data-opacity="1" data-position="bottom" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="#000">
                    </div>
                    <button type="button" class="btn btn-primary" id="btnVerTema">Ver Tema</button>
                    <button type="button" class="btn btn-danger" id="btnEliminarTema">Eliminar Tema</button>
                </div><!-- Fin del panel body-->
              </div>
            </div>
            <!-- AQUI EMPIEZA LA ZONA DE LOS INDICADORES-->
            <div class="panel panel-success">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#indicadores">
                   <i class="fa fa-map-pin"></i>
                     3.0 Indicadores
                 </a>
               </h4>
             </div>
              <div id="indicadores" class="collapse">
                <div class="panel-body">
                  <div class="form-group">
                    <label for="nombreIndicador">Elige la imagen</label>
                    <select class="form-control" id="imagenIndicador">
                      <option value="arbol.png">Árbol</option>
                      <option value="aserradero.png">Aserradero</option>
                      <option value="brigada.png">Brigada</option>
                      <option value="construccion.png">Contrucción</option>
                      <option value="dictamen.png">Dictamen</option>
                      <option value="filtro.png">Filtro</option>
                      <option value="fuego.png">Incendio</option>
                      <option value="e_aereo.png">Helicóptero</option>
                      <option value="madereria.png">Maderería</option>
                      <option value="persona.png">Persona</option>
                      <option value="predio.png">Predio</option>
                      <option value="torre_observacion.png">Torre</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Coordenada x</label>
                      <input id="coordenadaPx" class="form-control" placeholder="-99.69453">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Coordenada y</label>
                      <input id="coordenadaPy" class="form-control" placeholder="19.29156">
                    </div>
                  </div>
                  <button type="button" id="btnIndicadores" class="btn btn-success">Aceptar</button>
                </div>
              </div>
            </div>
            <!--  AQUI INICIA LA ZONA DE MAPAS-->
            <div class="panel panel-danger">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#mapas">
                    <i class="fa fa-map-o"></i>
                    4.0 Mapas
                  </a>
                </h4>
            </div>
            <div id="mapas" class="collapse">
              <div class="panel-body" style="max-height: 300px; overflow-y:scroll;">
                <label>Ponle un nombre al mapa</label>
                <input id="nombreMapa" class="form-control" placeholder="">
                <br>
                <button type="button" class="btn btn-success" id="btnGuardarMapa">Guardar Mapa actual</button>
                <table id="tablaMapas" class="table">
                  <thead><tr><th>Mapa elegido</th><th>Quitar</th></tr></thead>
                    <tbody id="tbodyMapa">
                    </tbody>
                </table>
                <button type="button" id="btnMostrarMapa" class="btn btn-primary">Mostrar mapa</button>
                <!--<button type="button" class="btn btn-danger" id="btnEliminarMapa">Limpiar Mapa</button>-->
              </div><!--FINAL DEL PANEL BODY-->
            </div>
          </div>
          <!--  AQUI TERMINA LA ZONA DE MAPAS-->
        </div>
      </div>

      <div class="mini-submenu mini-submenu-left pull-left">
        <i class="fa fa-file-text-o"></i>
      </div>
      <div class="mini-submenu mini-submenu-right pull-right">
        <i class="fa fa-wrench"></i>
      </div>

      <div class="navbar-fixed-bottom">
        <div class="container-fluid">       
          <div class="col-md-6 col-md-offset-6">
            <div id="user-toolbar-options" class="hidden">
               <!--<a id=""><i class="fa fa-globe"></i></a>
               <a id=""><i class="fa fa-search-plus"></i></a>
               <a id=""><i class="fa fa-search-minus"></i></a>
               <a id=""><i class="fa fa-hand-stop-o"></i></a>
               <a id=""><i class="fa fa-binoculars"></i></a>
               <a id=""><i class="fa fa-object-ungroup"></i></a>--><!--fa-pin   fa-compass-->
               <!--<a id=""><i class="fa fa-arrows-h"></i></a>-->
               <a class="print" id="" data-toggle="modal" href="#myModal"><i class="fa fa-print"></i></a>
               <a id="" class="print2" data-toggle="modal" href="#myModal"><i class="fa fa-bars"></i></a>
            </div>
            <div class="btn-toolbar btn-toolbar-light" id="user-toolbar" style=""><i class="fa fa-gear"></i></div>
          </div>
          </div>
        </div>
      </div>

      <!--Modal Configuracion de Polígonos -->
      <div id="modalPoligono" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Configuración de Polígono</h4>
            </div>
            <div class="modal-body">
              <div class="container-fluid bd-example-row">
                  <div class="form-group">
                    <label for="folioPoligono">Folio</label>
                    <input type="text" class="form-control" id="folioPlyn" placeholder="">
                  </div>
                  <!--<div class="row">-->
                  <!--<div class="col-md-6">
                    <div class="form-group">
                      <label>Elecciòn de tema</label>
                      <div class="radio">
                        <label>
                          <input type="radio" name="temaPoligono" id="temaPoligonoNuevo" value="1" checked>
                          Nuevo
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="temaPoligono" id="temaPoligonoNuevo" value="2">
                          Existente
                        </label>
                      </div>
                    </div>
                  </div>-->
                  <!--<div class="col-md-6">
                    <div class="form-group" id="temaNuevo">
                      <label for="temaPoligono">Escribe el nombre del tema</label>
                      <input type="text" class="form-control" id="temaPlyn" placeholder="">
                      <br>
                    </div>-->
                    <div class="form-group"> <!--id="temaExistente" -->
                      <label for="temaPoligono">Elige un tema</label>
                      <select class="form-control" id="temaPlynExistentes"> <!--name="SelectTemaPlyn" -->
                        
                      </select>
                    </div>
                  <!--</div>-->
                  <!--</div>-->
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="letter-case">Color del relleno</label>
                      <input type="text" id="fillColor" class="form-control demo" data-format="rgb" data-opacity="1" data-position="bottom" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="#000">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="letter-case">Color del contorno</label>
                      <input type="text" id="strokeColor" class="form-control demo" data-format="rgb" data-opacity="1" data-position="bottom right" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="#000">
                    </div>
                  </div>
                  <div class="form-group">
                      <label for="temas">Descripción</label>
                      <textarea class="form-control" rows="3" id="descripcionPlyn"></textarea>
                  </div>
              </div>
            </div><!--Final Modal Body -->
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnGuadarConfigPlyn">Guardar configuración</button>
            </div>
          </div>
        </div>
      </div><!-- Final del Modal de Poligono -->


      <!--Modal Importación de KML -->
      <div id="modalKML" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Importación de archivo KML</h4>
            </div>
            <div class="modal-body">
              <div class="container-fluid bd-example-row">
                 <form action="subirKML.php" method="post" enctype="multipart/form-data">
                  <input type="file" name="archivo" id="archivo" />
                  <br>
                  <input type="submit" class="btn btn-primary" value="Subir archivo">
                </form>
              </div>
            </div><!--Final Modal Body -->
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              <!--<button type="button" class="btn btn-primary" data-dismiss="modal" id="btnSubirKml">Subir KML</button>-->
            </div>
          </div>
        </div>
      </div><!-- Final del modal de KML -->


       <!--Modal Importación de SHAPE -->
      <div id="modalShape" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Importación de archivo Shape</h4>
            </div>
           <!-- <form method="POST" action="" enctype="multipart/form-data">-->
              <div class="modal-body">
                <div class="container-fluid bd-example-row">
                    <div class="form-group">
                     <form id="data" method="post" enctype="multipart/form-data">
                          <input type="text" id="idUserCaja" name="user" hidden="true" />
                          <input type="text" id="NameLayerText" name="layername" class="form-control" placeholder="Nombre" />
                          <input id="fileZip" name="file" type="file"/>
                          <br>
                          <div id="errorImport" style="color:red"></div>
                    </div>
                </div>
              </div>
              <!--Final Modal Body -->
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary" name="boton">Subir Shape</button>
              </div>
              </form>
           <!--</form>-->
            </div>
          </div>
        </div>
      </div><!-- Final del modal de SHAPE -->


      <!--Modal Importación de RASTER -->
      <div id="modalRaster" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Figura Raster</h4>
            </div>
              <div class="modal-body">
                <div class="container-fluid bd-example-row">
                    <div class="form-group">
                      <label for="nombreRaster">Nombre de la figura Raster</label>
                      <input type="text" class="form-control" id="nombreRaster" placeholder="">
                    </div>
                    <br>
                    <label for="esquinasRaster">Cuadratura que delimitan la figura</label>
                    <div class="form-group">
                      <div class="col-md-6">
                      <input type="text" class="form-control" id="coordenadaSI" placeholder="Esquina superior izquierda">
                      <input type="text" class="form-control" id="coordenadaII" placeholder="Esquina inferior izquierda">
                      </div>
                      <div class="col-md-6">
                      <input type="text" class="form-control" id="coordenadaSD" placeholder="Esquina superior derecha">
                      <input type="text" class="form-control" id="coordenadaID" placeholder="Esquina inferior derecha">
                      </div>
                      <br>
                      <br>
                    </div>
                    <p><br>
                    <br></p>
                    <label for="tamañoRaster">Tamaño de la figura</label>
                    <div class="form-group">
                      <div class="col-md-6">
                      <input type="text" class="form-control" id="rasterWidth" placeholder="Ancho">
                      </div>
                      <div class="col-md-6">
                      <input type="text" class="form-control" id="rasterHeight" placeholder="Alto">
                      </div>
                    </div>
                    <br><br>
                    <button type="button" class="btn btn-primary" id="btnSubirRaster" name="btnSubirRaster" data-dismiss="modal">Guardar configuración</button>
                    <br>
                    <br>
                    <form action="subirRaster.php" method="post" enctype="multipart/form-data">
                      <input type="file" name="archivoRaster" id="archivoRaster" />
                      <br>
                      <input type="submit" class="btn btn-primary" value="Subir archivo">
                    </form>
                </div>
              </div><!--Final Modal Body -->
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              </div>
          </div>
        </div>
      </div><!-- Final del modal de RASTER -->

      <!--MODAL DE SUBIR SERVICIO -->
      <div id="modalServicios" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Servicios</h4>
            </div>
            <div class="modal-body">
              <div class="container-fluid bd-example-row">
                <div class="form-group">
                  <label>Nombre del servicio</label>
                  <input type="text" class="form-control" id="nombreServicio" placeholder="">
                </div>
                <div class="form-group">
                  <label>URL del servicio</label>
                  <input type="text" class="form-control" id="urlServicio" placeholder="">
                </div>
                <div class="form-group">
                  <label>Token</label>
                  <input type="text" class="form-control" id="tokenServicio" placeholder="">
                </div>
              </div>
            </div><!--Final Modal Body -->
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnSubirServicio">Subir Servicio</button>
            </div>
          </div>
        </div>
      </div><!-- FINAL DEL MODAL SERVICIO -->

      <!-- MODAL DE SUBI FIGURA MANUAL -->
      <div id="modalFiguraManual" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Configuración de Polígono</h4>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y:scroll;">
              <div class="container-fluid bd-example-row">
                  <div class="form-group">
                    <label for="folioPoligono">Folio</label>
                    <input type="text" class="form-control" id="folioPlynManual" placeholder="">
                  </div>
                    <div class="form-group"> <!--id="temaExistente" -->
                      <label for="temaPoligono">Elige un tema</label>
                      <select class="form-control" id="temaFigManual"> <!--name="SelectTemaPlyn" -->
                        
                      </select>
                    </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="letter-case">Color del relleno</label>
                      <input type="text" id="fillColorManual" class="form-control demo" data-format="rgb" data-opacity="1" data-position="bottom" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="#000">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="letter-case">Color del contorno</label>
                      <input type="text" id="strokeColorManual" class="form-control demo" data-format="rgb" data-opacity="1" data-position="bottom right" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="#000">
                    </div>
                  </div>
                  <div class="form-group">
                      <label for="temas">Descripción</label>
                      <textarea class="form-control" rows="3" id="descripcionPlynManual"></textarea>
                  </div>
                  <label>Configuración de coordenadas</label>
                  <div class="form-group">
                  <label class="radio-inline"><input type="radio" name="optradio">Geográficas</label>
                  <label class="radio-inline"><input type="radio" name="optradio">UTM</label>
                  </div>
                  <div class="form-group">
                    <label for="figuraManual">Ingresa tus figuras</label>
                    <textarea class="form-control" rows="3" id="figuraManual" placeholder="ej. POINT(123.123,123.123), POLYGON((123.123 123.123, 567.567 567.567, 123.123 123.123))"></textarea>
                  </div>
              </div>
            </div><!--Final Modal Body -->
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnSubirFigManual">Subir figura</button>
            </div>
          </div>
        </div>
      </div><!-- Final del Modal de Subir figura manual -->

      <!--Modal de CREACIÓN DE TEMA -->
      <div id="modalTema" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Creación de tema</h4>
            </div>
            <div class="modal-body">
              <div class="container-fluid bd-example-row">
                <div class="form-group">
                  <label for="nombreTemaNuevo">Nombre del tema</label>
                  <input type="text" class="form-control" id="nombreTemaNuevo" placeholder="">
                </div>
              </div>
            </div><!--Final Modal Body -->
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnCrearTema">Crear</button>
            </div>
          </div>
        </div>
      </div><!-- Final del modal de CREACIÓN DE TEMA -->

      <!--MODAL DE SUBIR ELIMINACIÓN DE TEMA -->
      <div id="modalEliminarTema" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Eliminar Temas</h4>
            </div>
            <div class="modal-body">
              <div class="container-fluid bd-example-row">
                <div class="form-group">
                  <label>Elige un tema a eliminar</label>
                  <select multiple="multiple" class="form-control" id="selectEliminarTema">      
                  </select>
                </div>
              </div>
            </div><!--Final Modal Body -->
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" id="btnEliminarTema">Eliminar tema</button>
            </div>
          </div>
        </div>
      </div><!-- FINAL DEL MODAL ELIMINACIÓN DE TEMA -->

      <!--Modal de DETALLE -->
      <div id="modalDetalle" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button id="cerrar_modal" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel"></h4>

            </div>
            <div id="m_body" class="modal-body" style="overflow-y: scroll; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
                   <!-- <h4 class="modal-title" id="gridModalLabel">hola</h4>-->
              <div id="mod_body" class="container-fluid bd-example-row">
                    
              </div> 
              <div id="detallesRegistro"></div>
            </div><!--Final Modal Body -->


            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div><!-- Final del modal de DETALLE -->

      <!--INICIO DE MODAL DE IMPRESIÓN-->
      <div id="myModal" role="dialog" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
              <h4 class="modal-title">Texto para impresion</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="message-text" class="control-label">Ingrese el Texto:</label>
                <textarea class="form-control" id="message-text" maxlength="443" rows="6"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="Cancelar" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" id="Imprimir" data-dismiss="modal">Imprimir</button>
            </div>
          </div>
        </div>
      </div>
      <!--FIN DE MODAL DE IMPRESIÓN-->
  </body>
  <script id="template" type="text/javascript" src="assets/js/template.js"></script>  

  <!--<script type="text/javascript" src="js/validacion.js"></script>-->
  <script id="amplify" type="text/javascript" src="../js/libs/amplify/amplify.js"></script>
  <script id="CartoJS" type="text/javascript" src="../js/JSCartografico.js"></script>
  <script id="colors" type="text/javascript" src="js/colors.js"></script>
  <script id="herramientas" type="text/javascript" src="js/herramientas.js"></script>

  <script type="text/javascript">

  $("form#data").submit(function(){

    if(!isEmpty($("#NameLayerText").val())){  //Valida que exista un nombre valido 
            $("#errorImport").text("");
            if( document.getElementById("fileZip").files.length > 0 ){  // Valida si hay un archivo seleccionado
                  $("#idUserCaja").val(usuario);
                  var formData = new FormData($(this)[0]);
                  $("#errorImport").text("");
                   $.ajax({
                          url: "http://187.188.96.133:8080/ServiceBosque/UploadShape",
                          type: 'POST',
                          data: formData,
                          async: false,
                          success: function (data) {
                            var Text="";
                             for (var mensaje in data.response){
                                  if(mensaje == "message"){
                                      Text = data.response[mensaje];
                                  }else if(mensaje == "sucessfull"){
                                    console.log(data.response[mensaje]);
                                     if(data.response[mensaje] == false){
                                       $("#errorImport").css("color","red");
                                     }else{
                                       $("#errorImport").css("color","green");
                                     }              
                                  }
                             }
                             $("#errorImport").text(Text);
                          },
                          cache: false,
                          contentType: false,
                          processData: false,
                    });
                  return false;
            }else{
                $("#errorImport").text("Seleccione un archivo");
                return false;
            }
    }else{
       $("#errorImport").text("Requiere un nombre");
       return false;
    }
    });



function isEmpty(text){
  if(/^\s*$/.test(text.trim())){
    return true;
  }else{
    return false;
  }
}

$("#fileZip").on("click", function(event){
  $("#errorImport").text("");
});


</script> 

</html>