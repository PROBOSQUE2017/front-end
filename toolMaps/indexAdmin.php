<!DOCTYPE html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <title>Sistema de Información Forestal del Estado de México</title>
    <!--<link rel="stylesheet" type="text/css" href="css/print.css">-->

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
   

    <!--<script type="text/javascript" src="js/libs/OpenLayers-2.13.1/OpenLayers.js"></script>-->
    <script type="text/javascript" src="PrintMapa/lib/OpenLayers.js"></script>
    <script id="toolbarJS" type="text/javascript" src="assets/js/jquery.toolbar.js"></script>
    <script id="mandar" src="js/mandarAdmin.js"></script>
    <script src="js/selectorBasesAdmin.js"></script>

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
  <!--
  <div id="head" class="pageHeader" align="center">
    <img width="750" height="80" src="img/probosque.png" alt="logo">
  </div>
  <div id="bg">
    <img src="img/IMAGEN.png" alt="">
  </div>
  <div id="wind" class="pageWind" align="center">
    <img width="100" height="169" src="img/wind.png" alt="logo">
  </div>
  <div id="region" class="pageRegion" align="center">
    <img width="200" height="200" src="img/mini1.png" alt="logo">
  </div>
  <div id="contorno" class="pageContorno" align="center">
    <p><strong>UBICACIÓN</strong></p>
  </div>
  <div id="contorno2" class="pageContorno2" align="center">
    <p>Para el Estado de México, preservar el entorno ecológico es una prioridad, de ahí la voluntad de fortalecer la participación social en la tarea de conservar y desarrollar los recursos forestales, motivo que representa el actuar de PROBOSQUE, que mediante sus áreas operativas finca su razón en un sólo objetivo: lograr el desarrollo forestal sustentable de la Entidad.
    La Protectora de Bosques del Estado de México (PROBOSQUE), es un Organismo Público descentralizado, con personalidad jurídica y patrimonio propio, creado en 1990 y sectorizado a la Secretaría del Medio Ambiente a partir de noviembre 15 de 2011.</p>
  </div>
  <div id="contorno3" class="pageContorno3" align="center">
    <p><small id="tiempo"></small></p>
  </div>
  <div id="contorno4" class="pageContorno4" align="center">
    <p><strong>SIMBOLOGIA</strong></p>
    <div id="cube1" class="cube1" style="background-color: rgb(255, 0, 0);"><p>ABC00106</p></div>
    <div id="cube2" class="cube2" style="background: #FF0000;"><p>DEF00205</p></div>
    <div id="cube3" class="cube3" style="background: #0000FF;"><p>GHI00404</p></div>
    <div id="cube4" class="cube4" style="background: #848484;"><p>JKL00503</p></div>
    <div id="cube5" class="cube5" style="background: #F7FE2E;"><p>MNO00602</p></div>
    <div id="cube6" class="cube6" style="background: #FF00FF;"><p>PQR00701</p></div>
  </div>
  <div id="foot" class="pageFoot" align="center">
    <img width="740" height="80" src="img/foot.png" alt="logo">
  </div>-->
   <div id="cabecera" class="container">
      <nav class="navbar navbar-fixed-top navbar-default" role="navigation">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <div style="display:block;background-image:url(../img/logo.png);overflow:hidden;width: 270px;height: 52px;">
            </div>
            
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              
              <li><div>Sistema de Informaci&oacute;n Forestal</div><div>del Estado de M&eacute;xico v.0.1</div></li>
            </ul>
            
            <ul class="nav navbar-nav navbar-right">
              <div style="display:block;background-image:url(../img/probosque.png);overflow:hidden;width: 148px;height: 41px;">
            </div>
            </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
         </nav>
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
            <div class="panel panel-default hidden">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#">
                    <i class="fa fa-bar-chart"></i>
                    Gr&aacute;fica
                  </a>
                  <span class="pull-right slide-submenu">
                    <i class="fa fa-chevron-left"></i>
                  </span>
                </h4>
              </div>
              <div id="" class="collapse">
                <div class="panel-body">
                  <div id="flot-placeholder" style="width:300px;height:150px;"></div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#properties">
                    <i class="fa fa-bar-chart"></i>
                    Información detallada
                  </a>
                  <span class="pull-right slide-submenu">
                    <i class="fa fa-chevron-left"></i>
                  </span>
                </h4>
              </div>
              <div id="properties" class="collapse">
                <div class="panel-body" style="max-height: 500px; overflow-y:scroll;">
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
            <!--INICIO DEL PANEL DE TEMAS-->
            <div class="panel panel-info">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#funciones">
                    <i class="fa fa-map-signs"></i>
                    1.0 Temas
                  </a>
                  <span class="pull-right slide-submenu">
                    <i class="fa fa-chevron-right"></i>
                  </span>
                </h4>
              </div>
              <div id="funciones" class="collapse">
                <div class="panel-body">
                  <div class="form-group">
                    <label>Elige el programa</label>
                    <select class="form-control" id="eleccionBase">
                      <option value="" disabled selected style="display:none;"></option>
                      <option value="1">Programa 1</option>
                      <option value="2">Programa 2</option>
                      <option value="3">Programa 3</option>
                      <option value="4">Programa 4</option>
                      <option value="5">Programa 5</option>
                      <option value="6">Programa 6</option>
                      <option value="71">Programa 7.1</option>
                      <option value="72">Programa 7.2</option>
                      <option value="8">Programa 8</option>
                      <option value="9">Programa 9</option>
                      <option value="10">Programa 10</option>
                      <option value="11">Programa 11</option>
                      <option value="12">Programa 12</option>
                      <option value="13">Programa 13</option>
                      <option value="0">Programa Admin</option>
                    </select>
                  </div>
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
                  <button type="button" class="btn btn-danger" id="btnEliminarTema">Limpiar Lienzo</button>
                </div>
              </div>
            </div>
            <!--FIN DEL PANEL DE TEMAS--> 
            <!-- AQUI EMPIEZA LA ZONA DE LOS INDICADORES-->
            <div class="panel panel-success">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#indicadores">
                    <i class="fa fa-map-pin"></i>
                    2.0 Indicadores
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
                  <button type="button" id="btnGuardarIndicadores" class="btn btn-success">Guardar indicador</button>
                </div>
              </div>
            </div> 
            <!--  AQUI TERMINA LA ZONA DE INDICADORES-->
            <!-- AQUI EMPIEZA LA ZONA DE LOS TEMAS E INDICADORES ELEGIDOS-->
            <div class="panel panel-danger">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#temIndicEleg">
                    <i class="fa fa-th-list"></i>
                      3.0 Temas e indicadores elegidos
                  </a>
                </h4>
              </div>
              <div id="temIndicEleg" class="collapse">
                <div class="panel-body" style="max-height: 300px; overflow-y:scroll;">
                  <div class="form-group">
                    <label>Listado de temas por mapa</label>
                    <select class="form-control" id="listaTemaXMapa">
                      <option value="" disabled selected style="display:none;"></option>
                    </select>
                  </div>
                  <table id="tablaTemas" class="table table-striped">
                    <thead><tr><th>Tema</th><th>Programa</th><th>Color</th><th>Quitar</th></tr></thead>
                    <tbody>
                      
                    </tbody>
                  </table>
                  <br>
                  <table id="tablaIndicadores" class="table table-striped">
                    <thead><tr><th>Indicador</th><th>X</th><th>y</th><th>Quitar</th></tr></thead>
                  </table>
                  <button type="button" data-toggle="modal" data-target="#modalMapa" class="btn btn-success">Guardar Configuracion</button>
                </div>
              </div>
            </div> 
            <!--  AQUI TERMINA LA ZONA DE TEMAS E INDICADORES ELEGIDOS-->
            <!--  INICIO DEL PANEL DE MAPAS CREADOS-->
            <div class="panel panel-warning">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#temas">
                    <i class="fa fa-map-o"></i>
                    4.0 Mapas creados
                  </a>
                </h4>
              </div>
              <div id="temas" class="collapse">
                <div class="panel-body" style="max-height: 300px; overflow-y:scroll;">
                  <table id="tablaMapas" class="table">
                    <thead><tr><th>Mapa elegido</th><th>Quitar</th></tr></thead>
                    <tbody id="tbodyMapa">
                    </tbody>
                  </table>
                  <button type="button" id="btnMostrarMapa" class="btn btn-success">Mostrar mapa</button>
                </div><!-- Fin del panel body-->
              </div>
            </div>
            <!-- FIN DEL PANEL DE MAPAS CREADOS-->
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
               <a id=""><i class="fa fa-arrows-h"></i></a>
               <!--<a class="print" id="" class="print"><i class="fa fa-print"></i></a>-->
            </div>
            <div class="btn-toolbar btn-toolbar-light" id="user-toolbar" style=""><i class="fa fa-gear"></i></div>
          </div>
          </div>
        </div>
      </div>

 

      <!--Modal de GUARDAR MAPA -->
      <div id="modalMapa" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="gridModalLabel">Guardar Mapa</h4>
            </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Elige el nombre del mapa</label>
                  <input id="nombreMapa" class="form-control" placeholder="Nombre del mapa">
                </div>
              </div><!--Final Modal Body -->
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btnGuardarMapa" data-dismiss="modal">Guardar Mapa</button>
              </div>
          </div>
        </div>
      </div><!-- Final del modal de GUARDAR MAPA -->

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

  </body>
  <script id="template" type="text/javascript" src="assets/js/template.js"></script>  

 <!--<script type="text/javascript" src="js/validacion.js"></script>-->
 <script id="amplify" type="text/javascript" src="../js/libs/amplify/amplify.js"></script>
 <script id="CartoJS" type="text/javascript" src="../js/JSCartograficoAdmin.js"></script>
 <script id="colors" type="text/javascript" src="js/colors.js"></script>
 <script id="herramientas" type="text/javascript" src="js/herramientas.js"></script>

</html>