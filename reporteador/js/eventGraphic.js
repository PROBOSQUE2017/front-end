$(document).ready(function () {         
        var data = new Array();
        var category = new Array();
        var existGraphics = false;

          

        $( "#ejeX" ).change(function() {
          $("select#ejeY").val("-1ab2");

          if ($("select#ejeX").val() == "-1ab2"){     
              if(typeGraphics == "pie")
              {
                data = new Array();
                category = new Array();
                $("#configuracion").hide();
                $('#container').empty();
                existGraphics = false;

              }else if(typeGraphics == "bars"){
                 data = new Array();
                 category = new Array();
                 $("#configuracion").hide();
                 $('#container').empty();
                 existGraphics = false;
              }else if(typeGraphics == "line"){
                data = new Array();
                category = new Array()
                $("#configuracion").hide();
                $('#container').empty();
                existGraphics = false;

              }
             
          } 
        });

         $( "#ejeY" ).change(function() {
             var eti = $("#ejeX option:selected").val();
             var datoNumber = $("#ejeY option:selected").val();
             if(eti!="-1ab2" && datoNumber!="-1ab2"){
                if(typeGraphics == "pie")
                {
                   fullArrayPie(eti,datoNumber);
                   drawGraphicsCake(data,"Título de grafica");
                   existGraphics = true;
                   $("#configuracion").show();
                }else if(typeGraphics == "bars"){
                    fullArrayBars(eti,datoNumber);
                    drawGraphicsBars(category,data,"Título de grafica","Eje Y","Serie","","#39BA42",true);
                    $("#configuracion").show();
                    existGraphics = true;
                }
             }

         });

         $("#lineasRowsSelect").on("click",function(evento){
              fullArrayLine();
              var mensaje = document.getElementById('errorRegisNon'); 
              mensaje.innerHTML=''; 
              if(data.length == 0){
                   mensaje.innerHTML='No hay registros seleccionados'; 
                   document.getElementById("lineasRowsSelect").disabled=true;
                  $("select#comboSelectCampoLineas").val("-1ab2");
              }else{
                 mensaje.innerHTML=''; 
                 $("#configuracion").show();
                 drawGraphicsLine(category,data,"Título","subtitulo","uni","Título eje Y",true);
                 existGraphics = true;
              }        
             
         });


         function fullArrayLine(){
              category = new Array();
              data = new Array();
            $("#tableData thead tr").each(function (index) 
            {
               $(this).children("td").each(function (index2) {
               
                  var tipo = $(this).attr("datatype");
                  var texto = $(this).text();
                  switch (tipo){
                    case "integer":
                    case "decimal":
                    case "numeric":
                    case "real":
                        category.push(texto);
                    break;
                  }
                  
                })
                           
            })

            var size = t.rows('.selected').count();
            var ren = t.rows('.selected').data();
            var HeaderRow =  document.getElementById("tableData");
            var ColumnaEtiqueta = $("select#comboSelectCampoLineas").val();


            for(i=0; i<size; i ++){
                var tmp = new Array();
                var tmpEtiqueta;
                for(j=1; j<ren[i].length; j++){
                  var datatypeColumn =  HeaderRow.rows[0].cells[j].getAttribute("datatype");
                  if(j == ColumnaEtiqueta){
                    tmpEtiqueta = ren[i][j];
                  }
                   switch (datatypeColumn){
                    case "integer":
                    case "decimal":
                    case "numeric":
                    case "real":
                        tmp.push(parseFloat(converToNumber(ren[i][j])));
                    break;
                  }

                 // console.log(contenidoHeader);
                 // console.log(ren[i][j]);
                }

                data.push({name:tmpEtiqueta,data:tmp});
                
            }
           

         }


         function fullArrayPie(columna1, columna2){
            data = new Array();      
            $("#tableData tbody tr").each(function (index) 
            {
                var etiqueta, dato;
                $(this).children("td").each(function (index2) 
                {
                    if(index2==columna1){
                      etiqueta = $(this).text();
                    }else if(index2==columna2){
                      dato = $(this).text();
                      if (/^\s*$/.test(dato.trim())) {
                        dato = "0";
                      }                                         
                    }
                })                     
              data.push({name:etiqueta,y:parseFloat(converToNumber(dato))});
            })
         }

        function fullArrayBars(columna1, columna2){
            data = new Array();
            category = new Array();        
            $("#tableData tbody tr").each(function (index) 
            {
                var etiqueta, dato;
                $(this).children("td").each(function (index2) 
                {
                    if(index2==columna1){
                      etiqueta = $(this).text();
                    }else if(index2==columna2){
                      dato = $(this).text();
                      if (/^\s*$/.test(dato.trim())) {
                        dato = "0";
                      }                                         
                    }
                })                     
              category.push(etiqueta);
              data.push(parseFloat(converToNumber(dato)));
            })
         }

        function FindNameLabel(indice){
          var name ="";
          $("#tableData thead tr").each(function (index) 
          {
            $(this).children("td").each(function (index2) {

                if(indice == $(this).attr("id")){
                  name = $(this).text();
                }                                               
            })

          })
          return name;
        }

        $("#configuracion").on("click",function(eventp){
          if(existGraphics){
            var itemConfig = document.getElementById("config_graphics");
            var itemBotones = document.getElementById("div_configuration_btns");
            itemConfig.innerHTML =' ';
            itemBotones.innerHTML = ' ';
             $("#configurationModal").modal('show');
               switch(typeGraphics) {
                      case "pie":
                          itemConfig.innerHTML = '<input type="text" name="titlePie" id="titlePie" placeholder="Título de grafica" value=""/>';
                          itemBotones.innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
                          '<button id="confAcceptPie" type="submit" class="btn btn-success" style="color: white;">Aceptar</button>';
                          $("#confAcceptPie").on("click",function(eventp){
                               var nombreGrafica = $("#configurationModal").find( "#titlePie" ).val();
                               drawGraphicsCake(data,nombreGrafica);
                               $("#configurationModal").modal('hide');
                          });
                          break;
                      case "bars":
                         itemConfig.innerHTML = '<input type="text" name="titleBars" id="titleBars" placeholder="Título de grafica" value=""/>'+
                                                '<input type="text" name="titleEjeY" id="titleEjeY" placeholder="Título eje Y" value=""/>'+
                                                '<input type="text" name="UnidadesY" id="UnidadesY" placeholder="Unidades del eje Y" value=""/>'+
                                                '<input type="text" name="titleSerie" id="titleSerie" placeholder="Nombre serie" value=""/>'+
                                                'Ver etiqueta numerica:&nbsp;Si&nbsp;<input type="radio" name="etiqueta" value="1" checked="checked">&nbsp;'+
                                                'No&nbsp;<input type="radio" name="etiqueta" value="0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
                                                'Color de barras:&nbsp;&nbsp;<input type="color" name="favcolor" id="favcolor" value="#39BA42">';

                         itemBotones.innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
                         '<button id="confAcceptBars" type="submit" class="btn btn-success" style="color: white;">Aceptar</button>';
                          $("#confAcceptBars").on("click",function(eventp){
                              var nombreGrafica = $("#configurationModal").find( "#titleBars" ).val();
                              var nombreEjeY = $("#configurationModal").find( "#titleEjeY" ).val();
                              var nombreSerie = $("#configurationModal").find( "#titleSerie" ).val();
                              var unidades = $("#configurationModal").find( "#UnidadesY" ).val();
                              var color = $("#configurationModal").find( "#favcolor" ).val();
                              var etiquetas = $("input[name='etiqueta']:checked").val();
                              var bandera= true;
                              if(etiquetas == 0){
                                bandera = false;
                              }
                            
                              drawGraphicsBars(category,data,nombreGrafica,nombreEjeY,nombreSerie,unidades,color,bandera);
                              $("#configurationModal").modal('hide');

                          });

                          break;
                      case "line":
                           itemConfig.innerHTML = '<input type="text" name="tituloLine" id="tituloLine" placeholder="Título de grafica" value=""/>'+
                                                '<input type="text" name="subtituloLine" id="subtituloLine" placeholder="Subtitulo" value=""/>'+
                                                '<input type="text" name="tituloYeje" id="tituloYeje" placeholder="Titulo eje Y" value=""/>'+
                                                '<input type="text" name="UnidadesY" id="UnidadesY" placeholder="Unidades del eje Y" value=""/>'+
                                                 'Ver etiqueta numerica:&nbsp;Si&nbsp;<input type="radio" name="etiqueta" value="1" checked="checked">&nbsp;'+
                                                'No&nbsp;<input type="radio" name="etiqueta" value="0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                           itemBotones.innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
                          '<button id="confAcceptLine" type="submit" class="btn btn-success" style="color: white;">Aceptar</button>';
                          $("#confAcceptLine").on("click",function(eventp){
                              var tituloGrafica = $("#configurationModal").find( "#tituloLine" ).val();
                              var subtituloGrafica = $("#configurationModal").find( "#subtituloLine" ).val();
                              var unidades = $("#configurationModal").find( "#UnidadesY" ).val();
                              var titleY = $("#configurationModal").find( "#tituloYeje" ).val();
                               var etiquetas = $("input[name='etiqueta']:checked").val();
                              var bandera= true;
                              if(etiquetas == 0){
                                bandera = false;
                              }
                              drawGraphicsLine(category,data,tituloGrafica,subtituloGrafica,unidades,titleY,bandera);
                              $("#configurationModal").modal('hide');
                          });
                          break;
                }
          }
         
        });


      $( "#comboSelectCampoLineas" ).change(function() {
            fullArrayLine();
            var mensaje = document.getElementById('errorRegisNon'); 
            mensaje.innerHTML='';          
            if($("select#comboSelectCampoLineas").val() == "-1ab2"){
               document.getElementById("lineasRowsSelect").disabled=true;
             }else{
                  if(category.length >0){
                      mensaje.innerHTML='';    
                     document.getElementById("lineasRowsSelect").disabled=false;
                   }else{
                     mensaje.innerHTML='<h6>La tabla no contiene columnas numericas para que el registro sea graficado.</h6>'; 
                     document.getElementById("lineasRowsSelect").disabled=true;
                    $("select#comboSelectCampoLineas").val("-1ab2");
                   }          
                 
                }            

      });
        

                 
});


function converToNumber(number){
  var patron=",";
  number=number.replace(patron,'');
  return number;
}