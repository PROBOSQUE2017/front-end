var ul_agrupado = document.getElementById("agrupado");
var ul_seleccionados = document.getElementById("select");
var ul_filtrado = document.getElementById("filtrado");
var ul_ordenado = document.getElementById("ordenado");
var ul_disponibles = document.getElementById("list");
var tabla = document.getElementById("tableData");
var tablaFiltros = document.getElementById("tablaFiltros");
var tablaAgrupador = document.getElementById("tablaAgrupador");
var tablaOrden = document.getElementById("tablaOrden");
var combox = document.getElementById("ejeX");
var comboy = document.getElementById("ejeY");
var typeGraphics = "";
var reporteIsSave = false;
var reportCuadroisSave = false;
var controlRegistros = true;
var idReporte = 0;
var isSelect = false;
var deleteFilter = false;
var deleteOrden = false;
var deleteAgrup = false;
var controlSendJSON = false;
var controlposicionEnLista;
var objetoJSONEhere = {
                  'condiciones': [],
};
var objetoJSONSort = {
                  'arr_ordenamiento': [],
};
var objetoJSONAgrupador = {
                  'agrupador': [],
};


$(document).ready(function () {

	         /*
           * Eventos de los elementos arrastrables de las listas
           */
            $( "#list,#select" ).sortable({
               	cursor: 'move',
                connectWith: ".fuente",
                scroll:  false,
            	  stop: function(event, ui){
                  var ha_Elementi = $( "#select" ).sortable( "toArray");
                  if(isSelect){
                   
              	  	if(event.target.id=="list")
              	  	{
              	  	
                      if(ha_Elementi.length>0){
                        $('#exeReport').attr("disabled", false);
                      }else{
                        $('#exeReport').attr("disabled", true);
                      }
              	  		//sendStringJSON();
                      $("#graficas").hide();
                      $("#btnGraficaDe").hide();
                      $("#btnGraficaOk").show();
                      $('#container').empty();
                      $("#configuracion").hide();
                      $("#div_ejes").hide();
                      $("#div_lineal_op").hide();
                          typeGraphics = "";
              	  		
              	  	}
                    isSelect = false;
                  }  	
            	  },
                receive: function(event,ui){
                    popArray(objetoJSONEhere.condiciones,ui.item.attr('id')); //aqui elimina Filtro
                    popArray(objetoJSONSort.arr_ordenamiento,ui.item.attr('id')); //aqui elimina Ordenamiento
                    popArray(objetoJSONAgrupador.agrupador,ui.item.attr('id')); // aqui elimina Agrupador
                    controlGroup(ui.item.attr('id'));

                    deleteFieldViewConfigReport("rengFil"+ui.item.attr('id')); // aqui elimina renglon de tabla de config. filtro
                    deleteFieldViewConfigReport("rengAgr"+ui.item.attr('id')); // aqui elimina rebglo de tabla de config agrupador
                    deleteFieldViewConfigReport("rengOrd"+ui.item.attr('id')); // aqui elimina rebglo de tabla de config agrupador


                    $("#list").css("background-color","white");
                    var li = document.createElement("li");
                    li.setAttribute("id",ui.item.attr('id'));
                    li.setAttribute("datatype",ui.item.attr('datatype'));
                    li.setAttribute("type",ui.item.attr('type')); 
                    li.setAttribute("name",ui.item.attr('name')); 
                    li.setAttribute("list",ui.item.attr('list'));                                         
                    li.appendChild(document.createTextNode(ui.item.text()));
                    ul_disponibles.appendChild(li);
                  

                     var eliminar = $("#filtrado #"+ui.item.attr('id')).index();
                     $("#list li").eq(eliminar).remove();

                    $("#agrupado").find("#"+ui.item.attr('id')).remove();
                    $("#filtrado").find("#"+ui.item.attr('id')).remove(); 
                    $("#ordenado").find("#"+ui.item.attr('id')).remove();
                   

                     var sizeColumn = $("#select li").size();
                     if(sizeColumn == 1)
                     {                  
                     
                      $("#btnGraficaDe").hide();
                      $("#btnGraficaOk").show();
                     }
                   
                      //asigna valor por defecto a los combos para las graficas X Y
                      $("select#ejeY").val("-1ab2");
                      $("select#ejeX").val("-1ab2");  
                
                }
            });
           
            $("#filtrado").sortable({
              cursor: 'move', 
              connectWith : '#select',
              activate: function(event,ui){
                controlposicionEnLista = ui.helper.index();
              },
              start: function(event,ui){
                deleteFilter = true;
              },
              stop: function(event, ui) {
                if(isSelect){
                    isSelect = false;
                }
                if(deleteFilter){
                  deleteFilter = false;
                }  
                
              },
              receive: function(event,ui){
                  controlSendJSON =false;

                  var sizeSelect = $( "#select" ).sortable( "toArray");
                  var posicion = controlposicionEnLista;
             
                                 
                  $("#filtrado").css("background-color","white");
                  $("#filtrado").css("opacity", 1);
                
                  var valor = $("#filtrado #"+ui.item.attr('id')).length;
                
                   var li = document.createElement("li");
                   li.setAttribute("id",ui.item.attr('id'));
                   li.setAttribute("datatype",ui.item.attr('datatype'));
                   li.setAttribute("type",ui.item.attr('type'));
                   li.setAttribute("name",ui.item.attr('name'));
                   li.setAttribute("list",ui.item.attr('list'));                                                   
                   li.appendChild(document.createTextNode(ui.item.text()));
                   
                  if(valor > 1)
                  {
                    
                     var eliminar = $("#filtrado #"+ui.item.attr('id')).index();
                     $("#filtrado li").eq(eliminar).remove();

                     if(sizeSelect == 0){
                      ul_seleccionados.appendChild(li);                     
                    }else{
                      if(posicion == 0){
                         $(li).insertBefore('#select :nth-child('+(posicion+1)+')');     
                       }else{
                         $(li).insertAfter('#select :nth-child('+(posicion)+')');
                       }
                    }
                                    
                  }else{
                    if(sizeSelect == 0){
                      ul_seleccionados.appendChild(li);                     
                    }else{
                      if(posicion == 0){
                         $(li).insertBefore('#select :nth-child('+(posicion+1)+')');     
                       }else{
                         $(li).insertAfter('#select :nth-child('+(posicion)+')');
                       }
                    }
                    insertFieldViewConfigReport(tablaFiltros,ui.item.text(),"rengFil"+ui.item.attr('id'),"- - -","celFil"+ui.item.attr('id'));
                  }
                controlposicionEnLista="";
              }
            });

            $("#ordenado").sortable({
              cursor: 'move', 
              connectWith : '#select',
              activate: function(event,ui){
                controlposicionEnLista = ui.helper.index();
              },
              start: function(event,ui){
                deleteOrden = true;
              },
              stop: function(event, ui){
                if(isSelect){
                    isSelect = false;
                }
                if(deleteOrden){
                  deleteOrden = false;
                } 

              },
              receive: function(evento,ui){
                 controlSendJSON =false;
                 
                 var sizeSelect = $( "#select" ).sortable( "toArray");

                 var posicion = controlposicionEnLista;
                 $("#ordenado").css("background-color","white");
                 $("#ordenado").css("opacity", 1);
                 var valor = $("#ordenado #"+ui.item.attr('id')).length;

                 var li = document.createElement("li");
                 li.setAttribute("id",ui.item.attr('id'));
                 li.setAttribute("datatype",ui.item.attr('datatype'));
                 li.setAttribute("type",ui.item.attr('type'));
                 li.setAttribute("name",ui.item.attr('name'));
                 li.setAttribute("list",ui.item.attr('list'));                                                   
                 li.appendChild(document.createTextNode(ui.item.text()));
                

                  if(valor > 1)
                  {
                    console.log("entra por que ya existe");
                     var eliminar = $("#ordenado #"+ui.item.attr('id')).index();
                     $("#ordenado li").eq(eliminar).remove();

                     if(sizeSelect == 0){
                      ul_seleccionados.appendChild(li);                     
                    }else{
                      if(posicion == 0){
                         $(li).insertBefore('#select :nth-child('+(posicion+1)+')');     
                       }else{
                         $(li).insertAfter('#select :nth-child('+(posicion)+')');
                       }
                    }
                                    
                  }else{
                    if(sizeSelect == 0){
                      ul_seleccionados.appendChild(li);                     
                    }else{
                      if(posicion == 0){
                         $(li).insertBefore('#select :nth-child('+(posicion+1)+')');     
                       }else{
                         $(li).insertAfter('#select :nth-child('+(posicion)+')');
                       }
                    }
                     insertFieldViewConfigReport(tablaOrden,ui.item.text(),"rengOrd"+ui.item.attr('id'),"- - -","celOrd"+ui.item.attr('id'));
                  }
                controlposicionEnLista="";

                
              }

            });

            $("#agrupado").sortable({
            	cursor: 'move', 
            	connectWith : '#select',
              activate: function(event,ui){
                controlposicionEnLista = ui.helper.index();
              },
            	start: function(event,ui){
                deleteAgrup = true;
               },
              stop: function(event, ui){

                if(isSelect){
                    isSelect = false;
                }
                if(deleteAgrup){
                  deleteAgrup = false;
                } 

              },
              receive: function(evento,ui){
                 controlSendJSON =false;
                 
                  var sizeSelect = $( "#select" ).sortable( "toArray");
                  var posicion = controlposicionEnLista;
                  $("#agrupado").css("background-color","white");
                  $("#agrupado").css("opacity", 1);
                  var valor = $("#agrupado #"+ui.item.attr('id')).length;

                 var li = document.createElement("li");  
                 li.setAttribute("id",ui.item.attr('id'));
                 li.setAttribute("datatype",ui.item.attr('datatype'));
                 li.setAttribute("type",ui.item.attr('type'));
                 li.setAttribute("name",ui.item.attr('name')); 
                 li.setAttribute("list",ui.item.attr('list'));                                 
                 li.appendChild(document.createTextNode(ui.item.text()));


                  if(valor > 1)
                  {
                    
                     var eliminar = $("#agrupado #"+ui.item.attr('id')).index();
                     $("#agrupado li").eq(eliminar).remove();

                     if(sizeSelect == 0){
                      ul_seleccionados.appendChild(li);                     
                    }else{
                      if(posicion == 0){
                         $(li).insertBefore('#select :nth-child('+(posicion+1)+')');     
                       }else{
                         $(li).insertAfter('#select :nth-child('+(posicion)+')');
                       }
                    }
                                    
                  }else{
                    if(sizeSelect == 0){
                      ul_seleccionados.appendChild(li);                     
                    }else{
                      if(posicion == 0){
                         $(li).insertBefore('#select :nth-child('+(posicion+1)+')');     
                       }else{
                         $(li).insertAfter('#select :nth-child('+(posicion)+')');
                       }
                    }
                      insertFieldViewConfigReport(tablaAgrupador,ui.item.text(),"rengAgr"+ui.item.attr('id'),"- - -","celAgr"+ui.item.attr('id'));
                  }
                controlposicionEnLista="";
                
              }


            });
           
            
            $("#select").sortable({
              connectWith : ['#filtrado','#agrupado','#ordenado','#list'],
              start: function(evento,ui){
                controlSendJSON = true;
              },
              stop: function(evento,ui){

                var ha_Elementi = $( "#select" ).sortable( "toArray");
                if(controlSendJSON){
                 
                  if(ha_Elementi<=0){
                    $('#exeReport').attr('disabled',true);
                  }else{
                    $('#exeReport').attr('disabled',false);
                  }
                 
                 controlSendJSON = false;
                }
                
                
              },
              receive: function(evento,ui){
                 isSelect = true;
                 
                  if(deleteFilter){ //aqui elimina Filtro
                    if(popArray(objetoJSONEhere.condiciones,ui.item.attr('id'))){
                                            
                    }
                    deleteFieldViewConfigReport("rengFil"+ui.item.attr('id'));
                    deleteFilter=false;
                  }else if(deleteOrden){
                    
                    if(popArray(objetoJSONSort.arr_ordenamiento,ui.item.attr('id'))){
                        
                        //---------------------------------
                        controlGroup(ui.item.attr('id'));
                        //---------------------------------
                        //sendSortJson();
                    }
                    deleteFieldViewConfigReport("rengOrd"+ui.item.attr('id'));
                    deleteOrden=false;
                  }else if(deleteAgrup){
                    if(popArray(objetoJSONAgrupador.agrupador,ui.item.attr('id'))){
                       //sendStringJSONGroup();
                    }
                    deleteFieldViewConfigReport("rengAgr"+ui.item.attr('id'));
                    deleteAgrup=false;
                  }
                  $("#select").css("background-color","white");
                  $("#select").css("opacity", 1);
                  
                  var valor = $("#select #"+ui.item.attr('id')).length;
                  if(valor > 1)
                  {
                     var eliminar = $("#select #"+ui.item.attr('id')).index();
                     $("#select li").eq(eliminar).remove();
                  }

                  $("select#ejeX").val("-1ab2");
                  $("select#ejeY").val("-1ab2"); 
                 
              }
            });


           $("#agrupado").droppable({
              accept: "#select li",
              over: function(evento,ui){
                $("#agrupado").css("background-color","#F3DDE0");
                $("#agrupado").css("opacity", 0.9);
              },
              out: function(evento,ui){
                $("#agrupado").css("background-color","white");
                $("#agrupado").css("opacity", 1);
              },
              drop: function (event,ui){},
           });
            
           
            
            $("#filtrado").droppable({
              accept: "#select li",
              over: function(evento,ui){
                $("#filtrado").css("background-color","#F3DDE0");
                $("#filtrado").css("opacity", 0.9);
                ctrlFilter = true;
              },
              out: function(event,ui){
              
                $("#filtrado").css("background-color","white");
                $("#filtrado").css("opacity", 1);


              },
              drop: function (event,ui){}
            });

            $("#ordenado").droppable({
              accept: "#select li",
              over: function(evento,ui){
                $("#ordenado").css("background-color","#F3DDE0");
                $("#ordenado").css("opacity", 0.9);
              },
              out: function(evento,ui){
                  $("#ordenado").css("background-color","white");
                  $("#ordenado").css("opacity", 1);
              },
              drop: function (event,ui){}
            });

           
            $("#select").droppable({
              accept: "#filtrado li,#ordenado li,#agrupado li,#list li",
              over: function(evento, ui){
                $("#select").css("background-color","#E1F1D6");
              }, 
              out: function(evento, ui){
                $("#select").css("background-color","white");
                $("#select").css("opacity", 1);
              },      
              drop: function (event,ui){}
            });
      
            $("#list").droppable({
              accept: "#select li",
              over: function(evento, ui){
                $("#list").css("background-color","#E1F1D6");
              },
              out: function(evento){
                $("#list").css("background-color","white");
              },
              drop: function (event,ui){}
            });

          /*
           * Fin Eventos de los elementos arrastrables de las listas
           */

            /**************************************************
            *********** codigo de listas de la grafica ********
            ***************************************************/

            $("#graficas").hide();
            $("#btnGraficaDe").hide();

            $("#pastel").on("click",function(evento){
              // reset to graphics
              $('#container').empty();
              $("select#ejeY").val("-1ab2");
              $("select#ejeX").val("-1ab2");
              $("#configuracion").hide();
              // end reset to graphics
	        		document.getElementById("ejeX").disabled=false;
	        		document.getElementById("ejeY").disabled=false;
	        		$("#div_campos").hide();
	        		$("#div_campos_selec").hide();
	        		$("#div_ejes").show();
              $("#div_lineal_op").hide();
                typeGraphics =  "pie";
            

        	});
        	$("#lineal").on("click",function(evento){
                            
              
              var limpia = document.getElementById("errorRegisNon");
              limpia.innerHTML='';
              llenaComboLineas();

              // reset to graphics
              $('#container').empty();
              $("select#ejeY").val("-1ab2");
              $("select#ejeX").val("-1ab2");
              $("#configuracion").hide();
              $("#div_ejes").hide();
              $("#div_lineal_op").show();
              // end reset to graphics
              
              var sizeSelect = t.rows('.selected').count();

              if(sizeSelect>0){
                document.getElementById("comboSelectCampoLineas").disabled=false;
              }else{
                document.getElementById("comboSelectCampoLineas").disabled=true;
              }
              
              document.getElementById("lineasRowsSelect").disabled=true;
	        		document.getElementById("ejeX").disabled=false;
	        		document.getElementById("ejeY").disabled=false;
              typeGraphics = "line";
              // drawGraphicsLine(1,2);
            
        	});
        	$("#barras").on("click",function(evento){
              // reset to graphics
              $('#container').empty();
              $("select#ejeY").val("-1ab2");
              $("select#ejeX").val("-1ab2");
              $("#configuracion").hide();
              // end reset to graphics
	        		document.getElementById("ejeX").disabled=false;
	        		document.getElementById("ejeY").disabled=false;
              $("#div_campos").hide();
              $("#div_campos_selec").hide();
              $("#div_ejes").show();
              $("#div_lineal_op").hide();
              typeGraphics = "bars";
             
        	});

        	$("#btnGraficaOk").on("click",function(evento){

              $('#container').empty();
	        		$("#graficas").show();
	        		$("#btnGraficaDe").show();
	        		$("#btnGraficaOk").hide();
	        		$("#div_campos").hide();
	        		$("#div_campos_selec").hide();
	        		$("#div_ejes").hide();
		          $("#configuracion").hide();
              $("#div_lineal_op").hide();
              

		            typeGraphics="";
        	});

        	$("#btnGraficaDe").on("click",function(evento){
	        		$("#graficas").hide();
	        		$("#btnGraficaDe").hide();
	        		$("#btnGraficaOk").show();
              $('#container').empty();
              $("#configuracion").hide();
              $("#div_ejes").hide();
              $("#div_lineal_op").hide();
	        	  typeGraphics = "";

        	});

          $("#saveReport").on("click",function(evento){
            //$('#guardarReporte').find("#nameSaveReport").val("");
            var status_erroe = document.getElementById("errort");
            var status_ok = document.getElementById("success");
            var status_war = document.getElementById("Save_warnning");
            status_war.innerHTML='';
            if(reporteIsSave){
              status_war.innerHTML='El reporte ya fue guardado anteriormente. Haga click en Aceptar para guardar los cambios hechos';
            }else{
              if(reportCuadroisSave){
                status_war.innerHTML='El reporte ya fue guardado como cuadro estadistico. ¿Desea guardarlo como reporte general?';
                reportCuadroisSave=false;
              }
            }
             status_erroe.innerHTML = '';
             status_ok.innerHTML = '';
             $("#nameSaveReport").show();
             var divBotones = document.getElementById("guadarReport");
             divBotones.innerHTML ='';  
             divBotones.innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
            '<button id="btnSaveReporte" type="submit" class="btn btn-success" style="color: white;">Aceptar</button>'; 
             $('#guardarReporte').modal().find(".modal-title").text("Guardar como reporte"); 
             $('#guardarReporte').modal('show'); 

             $("#btnSaveReporte").on("click",function(){
                var nombreReporte =  $('#guardarReporte').find("#nameSaveReport").val();
                if(isEmpty(nombreReporte)){
                  status_erroe.innerHTML = 'Asigne un nombre';
                  status_ok.innerHTML = '';
                }else{
                  $("#nameSaveReport").hide();
                  sendJsonSaveReport("ReporteGeneral",nombreReporte);
                  status_war.innerHTML='';
                  status_erroe.innerHTML = '';
                  status_ok.innerHTML =  '<center><img src="libs/jquery/images/ok-icon.png">&nbsp;&nbsp;Se guardo correctamente con el nombre: <b>'+nombreReporte+'</b></center>';
                  divBotones.innerHTML = '<button id="btnSaveReporteOk" type="submit" class="btn btn-success" style="color: white;">Ok</button>';

                  $("#btnSaveReporteOk").on("click",function(){
                    $('#guardarReporte').modal('hide');
                    //$('#guardarReporte').find("#nameSaveReport").val("");
                    reporteIsSave = true; 
                  }); 
                }
               
             });

          });

        $("#saveCuadr").on("click",function(evento){
            var status_erroe = document.getElementById("errort");
            var status_ok = document.getElementById("success");
            var status_war = document.getElementById("Save_warnning");
            status_war.innerHTML = '';
            if(reportCuadroisSave){
              status_war.innerHTML='El reporte ya fue guardado como cuadro estadistico. Haga click en Aceptar para crear uno nuevo con los cambios hechos.';
            }else{
              if(reporteIsSave){
                status_war.innerHTML='El reporte ya fue guardado. ¿Desea guardarlo como cuadro estadistico?';
                reporteIsSave=false;
              }
            }
             status_erroe.innerHTML = '';
             status_ok.innerHTML = '';
             $("#nameSaveReport").show();
             var divBotones = document.getElementById("guadarReport");
             divBotones.innerHTML ='';  
             divBotones.innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
            '<button id="btnSaveReporteCuadro" type="submit" class="btn btn-success" style="color: white;">Aceptar</button>'; 
             $('#guardarReporte').modal().find(".modal-title").text("Guardar como cuadro estadistico"); 
             $('#guardarReporte').modal('show'); 

             $("#btnSaveReporteCuadro").on("click",function(){
                var nombreReporte =  $('#guardarReporte').find("#nameSaveReport").val();
                if(isEmpty(nombreReporte)){
                  status_erroe.innerHTML = 'Asigne un nombre';
                  status_ok.innerHTML = '';
                }else{
                  $("#nameSaveReport").hide();
                  sendJsonSaveReport("ReporteEstadistico",nombreReporte);
                  status_erroe.innerHTML = '';
                   status_war.innerHTML='';
                  status_ok.innerHTML =  '<center><img src="libs/jquery/images/ok-icon.png">&nbsp;&nbsp;Se guardo correctamente con el nombre: <b>'+nombreReporte+'</b></center>';
                  divBotones.innerHTML = '<button id="btnSaveReporteOk" type="submit" class="btn btn-success" style="color: white;">Ok</button>';

                  $("#btnSaveReporteOk").on("click",function(){
                    $('#guardarReporte').modal('hide'); 
                   // $('#guardarReporte').find("#nameSaveReport").val("");
                    reportCuadroisSave = true;
                  }); 
                }
               
             });


            
          });

          $("#viewReport").on("click",function(evento){
            $("#listaReportes").empty();
            $("#spaceTable2").empty();
            usuarioId=getUsryProgram('UR')/5;
            actividadId = getUsryProgram('UPR');
            sendJSONQueryReport();
            document.getElementById("btnGraficaOk").disabled=true;
            document.getElementById("btnGraficaDe").disabled=true;
            document.getElementById("btnexppdf").disabled=true;
            document.getElementById("btnexpexcel").disabled=true;
            document.getElementById("saveReport").disabled=true;
            document.getElementById("saveCuadr").disabled=true;
            document.getElementById("exeReport").disabled=true;
            $("#viewReport").hide();
            $("#createReport").show();
            $("#div_reporteador").hide();
            $("#reportesGuardados").show();
                   
          });

           $("#createReport").on("click",function(evento){

               var rowsTable = $("#tableData tr").length;
               $("#createReport").hide();
               $("#viewReport").show();
               $("#div_reporteador").show();
               $("#reportesGuardados").hide();
             
               var sizeSelect = $( "#select" ).sortable( "toArray");
               document.getElementById("btnexppdf").disabled=true;
               if(sizeSelect.length>0){
                  document.getElementById("exeReport").disabled=false;
               }
              
               if(rowsTable > 0){
                  if(controlRegistros){
                    document.getElementById("btnGraficaOk").disabled=false;
                    document.getElementById("btnGraficaDe").disabled=false;
                    document.getElementById("btnexppdf").disabled=false;
                    document.getElementById("btnexpexcel").disabled=false;
                    document.getElementById("saveReport").disabled=false;
                    document.getElementById("saveCuadr").disabled=false;
                  }
               }



           });


            /**************************************************
            ******** fin codigo de listas de la grafica *******
            ***************************************************/



	        /* 
    			****************************************************************************
    			****************************************************************************
    			********************** Codigo de la ventana modal **************************
    			****************************************************************************
    			****************************************************************************
        	*/
        	
      		$( "#filtrado" ).on("click","li",function(evento){
      			identificadorCampo = evento.target.id;      			
      			nameField= document.getElementById(evento.target.id).innerHTML;
      			typeData = document.getElementById(evento.target.id).getAttribute('datatype');
            ColumnName = document.getElementById(evento.target.id).getAttribute('name');
      		

      			error.innerHTML ="";     			
      			tipoDato = $(this).attr("datatype");
            //++++++++++++++++++++++++++++++++++++++++++++++
            //Envia datos insertar en el array de filtrado
            var atrcampo = $(this).attr("name");
            var atrtype =  $(this).attr("type");
            var atrdata = $(this).attr("datatype");
            var atrlista = $(this).attr("list");
            var atrId = $(this).attr("id");

            //alert("Mostrando atributos: " + atrcampo +" "+atrtype+" "+atrdata+" "+atrlista);

            //++++++++++++++++++++++++++++++++++++++++++++++
      			
      			$("#myModal").find( "#parametro" ).val("");
      			$("#myModal").find( "#Startdate" ).val("");
      			$("#myModal").find( "#Enddate" ).val("");
      			$("#myModal").find( "#date" ).val("");
            $('#myModal').modal().find(".modal-title").text("Asigne un valor para "+nameField); 
            	
            	switch(tipoDato){

            		case "date":
            				$("#validaNumeros").hide();
            				$("#div_agrupador").hide();
            				$("#introNum").hide();
            				$("#ValidaTexto").hide();
            				$("#validaDate").show();
            				$("#selecDate").show();
            				$("#nameFilePdf").hide();
            				$("#nameFile").hide();
                    $("#div_item_order").hide();
                  drawTermsDate(atrId,atrcampo,atrtype,atrdata,atrlista,nameField);
            			break;
                  case "integer":
                  case "decimal":
                  case "numeric":
                  case "real":
            				$("#validaNumeros").show();
            				$("#introNum").show();
            				$("#div_agrupador").hide();
            				$("#ValidaTexto").hide();
            				$("#validaDate").hide();
            				$("#selecDate").hide();
            				$("#nameFilePdf").hide();
            				$("#nameFile").hide();
                            $("#div_item_order").hide();
					        drawTermsNumeros(atrId,atrcampo,atrtype,atrdata,atrlista,nameField);


            			 break;

            		default:
            				$("#validaNumeros").hide();
            				$("#introNum").hide();
            				$("#div_agrupador").hide();
            				$("#ValidaTexto").show();
            				$("#validaDate").hide();
            				$("#selecDate").hide();
            				$("#nameFilePdf").hide();
            				$("#nameFile").hide();
                            $("#div_item_order").hide();
					        drawTermsString(atrId,atrcampo,atrtype,atrdata,atrlista,nameField);
							


            	}       	
        	});

        	$( "#ordenado" ).on("click","li",function(evento){
                    var idItem = evento.target.id;
                    var ColumnName = document.getElementById(evento.target.id).getAttribute('name');
                    var tipoDato = document.getElementById(evento.target.id).getAttribute('datatype');
                    var listaNombre = document.getElementById(evento.target.id).getAttribute('list');
                    var tipoDatoCol = document.getElementById(evento.target.id).getAttribute('type');
                    var divBotones = document.getElementById("accions");
                    var nameField= document.getElementById(idItem).innerHTML;
                    $("select#select_orden").val("-234a");
                    error.innerHTML = "";
                    divBotones.innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
                    '<button id="btnOrdenar" type="submit" class="btn btn-success" style="color: white;">Aceptar</button>';
                  
                    $("#validaNumeros").hide();
                    $("#div_agrupador").hide();
                    $("#introNum").hide();
                    $("#ValidaTexto").hide();
                    $("#validaDate").hide();
                    $("#selecDate").hide();
                    $("#nameFilePdf").hide();
                    $("#nameFile").hide();
                    $("#div_item_order").show();
                    $('#myModal').modal().find(".modal-title").text("Ordenar "+nameField); 
                    
            	      $("#btnOrdenar").on("click",function(evento){
                      var ordeno = $("#myModal").find( "#select_orden" ).val();
                      if(validarOrdenamiento(ordeno)){

                        pushSort(objetoJSONSort.arr_ordenamiento,idItem,ColumnName,ordeno,nameField,tipoDato,listaNombre,tipoDatoCol);
                        error.innerHTML = "";
                        insertValueFields("celOrd"+idItem,"ordenar "+ordeno);
                        //sendSortJson();
                       $('#myModal').modal('hide');
                      }else{
                        error.innerHTML = "Seleccione una forma de ordenar.";
                      }
                     
                    });
            	
            	
        	});

          $( "#agrupado" ).on("click","li",function(evento){
                    var bandera=false;
                    var idItem = evento.target.id;
                    var div = document.getElementById("div_agrupador");
                    var chain='';
                    var referencia='';
                    var ColumnName = document.getElementById(evento.target.id).getAttribute('name');
                    var type = document.getElementById(evento.target.id).getAttribute('type');
                    var datatype = document.getElementById(evento.target.id).getAttribute('datatype');
                    var lista = document.getElementById(evento.target.id).getAttribute('list');
                    var divBotones = document.getElementById("accions");
                    nameField= document.getElementById(evento.target.id).innerHTML;
                    error.innerHTML ="";
                    var arr_referencias= objetoJSONSort;
                    var objetoTotales = {    
                      'cadena':[],
                    };
                    
                    referencia+='Mostrar total:<input type="checkbox" id="totalRdio" name="rdioTotalOk" value="pronto">&nbsp;&nbsp;&nbsp;&nbsp;';
                    referencia+='Mostrar sub total:<input type="checkbox" id="subtotalRdio" name="srdioTotalOk" value="pronto">';
                    referencia+='<select id="columnaReferencia" multiple="multiple" disabled="disabled">';
                    //referencia+='<option value="-2ws">Por:</option>';
                    for(var aux in arr_referencias){
                    
                          for(var tmp in arr_referencias[aux]){
                           
                             switch(arr_referencias[aux][tmp].datatype){
                                  case "integer":
                                  case "decimal":
                                  case "numeric":
                                  case "real":
                                    break;
                                  
                                  default:
                                    if(evento.target.id != arr_referencias[aux][tmp].id)
                                    {
                                        referencia+='<option id="cb'+arr_referencias[aux][tmp].id+'"';
                                        referencia+= 'name="'+arr_referencias[aux][tmp].name+'"';
                                        referencia+= 'datatype="'+arr_referencias[aux][tmp].datatype+'"';
                                        referencia+= 'list="'+arr_referencias[aux][tmp].list+'"';
                                        referencia+= 'type="'+arr_referencias[aux][tmp].type+'"';
                                        referencia+= 'label="'+arr_referencias[aux][tmp].label+'"';
                                        referencia+= ">";
                                        referencia+= arr_referencias[aux][tmp].label+'</option>';
                                    }
                             }
                            
                          }
                    }
                   
                    referencia+='</select>';  

                    divBotones.innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
                    '<button id="btnAgrupar" type="submit" class="btn btn-success" style="color: white;">Calcular</button>';
                    switch(datatype){
                      	case "string":
                          chain+='<select id="select_group">';
          								chain+='<option value="-234a">Elige una operación</option>';
          								chain+='<option value="count">Contar</option>';	
          								chain+='</select>';
          								div.innerHTML= chain+referencia;
                      		break;
                      	default:
                          div.innerHTML='';
                          chain+='<select id="select_group">';
          								chain+='<option value="-234a">Elige una operación</option>';
          								chain+='<option value="sum">Sumar</option>';
          								chain+='<option value="count">Contar</option>';	
          								chain+='<option value="avg">Promediar</option>';	
          								chain+='<option value="max">Obtener maximo</option>';
          								chain+='<option value="min">Obetner minimo</option>';
          								chain+='</select>';
          								div.innerHTML= chain+referencia;
                    }

                    $("#columnaReferencia").multipleSelect({
					    placeholder: "SubTotal(es) por:",
					    selectAll: false,
						filter: true,
						maxHeight:110,
						width: '100%'
					});



                    $("#validaNumeros").hide();
                    $("#introNum").hide();
                    $("#ValidaTexto").hide();
                    $("#validaDate").hide();
                    $("#selecDate").hide();
                    $("#nameFilePdf").hide();
                    $("#nameFile").hide();
                    $("#div_item_order").hide();
                    $("#div_agrupador").show();
                    $('#myModal').modal().find(".modal-title").text("Operación sobre "+nameField); 
                    $('#myModal').modal('show');

                    $("#btnAgrupar").on("click",function(evento){

                    	var opcionAgrupado = $("select#select_group").val();
                    	if(opcionAgrupado == "-234a"){
                    		error.innerHTML="Seleccione una operacion.";
                    	}else{
                            if(bandera){
                                if(validatorComboMultiSelect("columnaReferencia")){
                                  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                  // Se obtienen valores para la tabla de referencia.
                                  var subtotalRef = "No";
                                  var totalRef = "Si";
                                  if($("input[name='srdioTotalOk']:checked").val()=="pronto"){
                                    subtotalRef="Si";
                                  }else{
                                    subtotalRef="No";
                                  }

                                  if($("input[name='rdioTotalOk']:checked").val()=="pronto"){
                                    totalRef="Si";
                                  }else{
                                    totalRef="No";
                                  }

                                  var columns = pushSubTotalRef("columnaReferencia");
                                  objetoTotales.cadena.push({total:totalRef,subtotal:subtotalRef,columnasRef:columns});

                                  var valor = $("#select_group option:selected").html();
                                  error.innerHTML="";
                                  pushAgrupador(objetoJSONAgrupador.agrupador,idItem,nameField,ColumnName,opcionAgrupado,type,lista,objetoTotales.cadena);
                                  reemplazaReferencia(objetoTotales.cadena);
                                  $('#myModal').modal('hide');
                                  insertValueFields("celAgr"+idItem,valor);
                                    //sendStringJSONGroup();
                                }else{
                                  error.innerHTML="<h6>Seleccione una columna de referencia para generar los calculos.<br>Para agregar columnas de referencia tiene que ordenar el reporte con columnas descriptivas (No columnas con datos numericos).</h6>";
                                } 
                          }else{
                          		  if($("input[name='rdioTotalOk']:checked").val()=="pronto"){
                                    objetoTotales.cadena.push({total:"Si",subtotal:"No"});
                                  }else{
                                    objetoTotales.cadena.push({total:"No",subtotal:"No"});
                                  }
                                 
                                  var valor = $("#select_group option:selected").html();
                                  error.innerHTML="";
                                  pushAgrupador(objetoJSONAgrupador.agrupador,idItem,nameField,ColumnName,opcionAgrupado,type,lista,objetoTotales.cadena);
                                  $('#myModal').modal('hide');
                                  insertValueFields("celAgr"+idItem,valor);
                          }                   
                    	
                    	}
                    	//alert(JSON.stringify(objetoJSONAgrupador.agrupador));
                    });

                    $("#totalRdio").on("click",function(){
                        if($("input[name='srdioTotalOk']:checked").val() == "pronto"){
                            $("#columnaReferencia").multipleSelect("enable");
                            error.innerHTML='';
                            bandera = true;
                        }else{
                            error.innerHTML='';
                            bandera = false;
                            $("#columnaReferencia").multipleSelect("disable");
                        }
                    });

                    $("#subtotalRdio").on("click",function(){
                        if($("input[name='srdioTotalOk']:checked").val() == "pronto"){
                            $("#columnaReferencia").multipleSelect("enable");
                            error.innerHTML='';
                            bandera = true;
                        }else{
                            error.innerHTML='';
                            bandera = false;
                            $("#columnaReferencia").multipleSelect("disable");
                        }
                    });



          });



          function validarOrdenamiento(StringSelect){
             if(StringSelect != "-234a"){
                return true;
             }else{
              return false;
             }
          }

        	function validarString(){
    				var val_introducido = $("#myModal").find( "#parametro" ).val();	
    				if (/^\s*$/.test(val_introducido.trim())) {
		                error.innerHTML = "El campo no puede estar vacio. ";
		                return false;
    				}else{
    					error.innerHTML = "";
    					return true;
    				}
        	}

          function isEmpty(text){
            if(/^\s*$/.test(text.trim())){
              return true;
            }else{
              return false;
            }
          }

        	function validarNumero(inputField){
        		var val_introducido = $("#myModal").find( inputField ).val();	
    				if (/^\s*$/.test(val_introducido.trim())) {
		                error.innerHTML = "El campo no puede estar vacio. ";
    				}else{
    					error.innerHTML = "";
					     if (/^([0-9])*([.][0-9]+)?$/.test(val_introducido.trim())){
					     	error.innerHTML = "";
					        return true;
					     }else{
					     	error.innerHTML = "Numero no valido";
					     	return false;
					     }
    					
    				}

        	}


        	function expRegularDate(fecha){
            //alert("validando fechas........: "+fecha);
	        		if(!/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/.test(fecha)) {
	        			error.innerHTML = "Introduzca una fecha valida. Formato dd-mm-yyyy";       			
	        			return false;
	        		}else{
	        			error.innerHTML = " ";
	        			return true;
	        		}
        	}

        	function expRegularDate2(fechaInicio,fechafin){
	        		if(!/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/.test(fechaInicio)) {
	        			error.innerHTML = "Fecha inicial invalida. Formato dd-mm-yyyy";       			
	        			return false;
	        		}else{
	        			if(!/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/.test(fechafin)) {
	        				error.innerHTML = "Fecha final invalida. Formato dd-mm-yyyy";
	        				return false;
	        			}else{
	        				error.innerHTML = " ";
	        				return true;
	        			}
	        			
	        		}
        	}

        	$("#parametro").keypress(function(e){
        			if (e.which == 13) 
        			{
            			return false;
        			}
        	});

        	function arrayObjectIndexOf(myArray, searchTerm, property) 
        	{
    						for(var i = 0, len = myArray.length; i < len; i++) 
    						{
        						if (myArray[i][property] === searchTerm){       							
        							return i;
        						} 
    						}
    				       return -1;
			    }

          function validatorCombo(ComboBox){
            if ($("select#"+ComboBox).val() == "-2ws"){
                return false;
            }else{
              return true;
            }

         }

         function validatorComboMultiSelect(combo){
         	var seleccion =  $("#"+combo).multipleSelect("getSelects");
         	
         	if(seleccion.length == 0){
         		return false;
         	}else{
         		return true;
         	}
         }



			function builderStringFilter(myArray, searchTerm, property,parametroColumna,parametroValue){
				var positionFind = arrayObjectIndexOf (myArray, searchTerm , property ) ;
    			if(positionFind == -1){
    				//alert("No lo encontro");
    				myArray.push({idField:searchTerm,nameColumn:parametroColumna,value:parametroValue.trim()});
    			}else{
    				
    				//alert("Se encontro elemento");
    				myArray.splice(positionFind,1);
    				myArray.push({idField:searchTerm,nameColumn:parametroColumna,value:parametroValue.trim()});
    			}

    			console.log(myArray);

			}

      /* 
			****************************************************************************
			****************************************************************************
			*********************** Codigo de los calendarios **************************
			****************************************************************************
			****************************************************************************
      */

        	$( "#Startdate" ).datepicker();

        	$( "#Enddate" ).datepicker();

        	$( "#date" ).datepicker();   

          $( "#fechaReporte" ).datepicker();

      /* 
			****************************************************************************
			****************************************************************************
			*********************** Construccion de la cadena **************************
			****************************************************************************
			****************************************************************************
      */

      function fullArrayCamposSeleccionados(){
           arr = $( "#select" ).sortable( "toArray");
           var i, n;

           var objetoJSON = {
              'campos': [],
            };

            for (i = 0, n = arr.length; i < n; i++) 
            {              
              s_datatype = $("#"+arr[i]).attr('datatype');
              s_type = $("#"+arr[i]).attr('type');
              s_contenido= document.getElementById($("#"+arr[i]).attr('id')).innerHTML;
              s_name = $("#"+arr[i]).attr('name'); 
              s_list = $("#"+arr[i]).attr('list');         
              objetoJSON.campos.push({datatype:s_datatype,type:s_type,label:s_contenido, name:s_name,list:s_list});
            }
            
            return objetoJSON;
      }


      function sendStringJSON(ArregloCamposSeleccionados, ArregloFiltros, ArregloOrdenCampos,ArregloAgrupador){
        filtros = JSON.stringify(ArregloFiltros);
        orden = JSON.stringify(ArregloOrdenCampos);
        agrupador = JSON.stringify(ArregloAgrupador);
        parametros = JSON.stringify(ArregloCamposSeleccionados);
        

        if(ArregloCamposSeleccionados.campos.length > 0 )
        {
     
          $.ajax({
              type: 'POST',
              url: 'http://187.188.96.133:8080/ServiceBosque/Reporteador',
              //url: 'http://localhost:8084/ServiceBosque/Reporteador',
              data: {action:'getReporte',noReporte:idReporte,user:getUsryProgram('UR')/5,activity: getUsryProgram('UPR'),params:parametros,paramsFil:filtros,paramsSort:orden,paramsGro:agrupador},
              dataType: 'json',
              beforeSend: function (data) {
                  var contenedor = document.getElementById("spaceTable");
                  contenedor.innerHTML='';
                  //contenedor.innerHTML='<center><img src="libs/jquery/images/wait.gif"><center>';
              },
              success: function(resp){
                var datosTablaReport = new Array();
                var datosTablaReportHeader = new Array();
                removeItemsCombo();
                $("#tableData").remove();
             
                for(var x in resp.data) {
                   //console.log(resp.data);
                   idReporte =resp.cadena;    
                   for(var y in resp.data[x]){                                 
                          if(y === "Info")
                          {
                              var  clone = resp.data[x][y].slice(0); 

                          }else if(y === "datatype"){
                               var typoColumna = resp.data[x][y];
                          }else if(y === "label"){
                                 var NameColumna = resp.data[x][y];
                          }else if (y == "name") {
                              if (resp.data[x][y] == 'anio_ejercicio') {
                                  resp.data[x].datatype = 'string';
                              }
                          }
                          var agrup="d";
                     
                   }

                   Create2DArray(datosTablaReport, x,clone);
                   Create2DArrayHeader(datosTablaReportHeader,x,NameColumna,typoColumna,agrup);
                }
              
                // construye la tabla
                arregloDatos= datosTablaReport;
                arregloCabecera= datosTablaReportHeader;
                builderTable(datosTablaReport,datosTablaReportHeader,1);
               
              },
              error: function(errMsg) {
              }

            });
        }else{
          removeItemsCombo();
          $("#spaceTable").empty();
          $("#tableData").remove();
          document.getElementById("btnGraficaOk").disabled=true;
	        document.getElementById("btnGraficaDe").disabled=true;
	        document.getElementById("btnexppdf").disabled=true;
	        document.getElementById("btnexpexcel").disabled=true;
          document.getElementById("saveReport").disabled=true;
          document.getElementById("saveCuadr").disabled=true;
          
	        $("#graficas").hide();

        }
    }

   

    /************************************************************
    **************** Exportar tabla a Excel *********************
    *************************************************************/
    function saveEXcel(){
        var nameFiletmp= $("#myModal").find( "#writeNameFile" ).val();

        if(validarNameFile(nameFiletmp)==true){
           exportarExcel(nameFiletmp.trim());      
        }

    }

    function exportarExcel(nameFile){

        $("#tableData").table2excel({
            name: "Excel Document Name",
            filename: nameFile,
            fileext: ".xls"
        });

    }

    function validarNameFile(nameFile){
        if (/^\s*$/.test(nameFile.trim())) {
              error.innerHTML = "El campo no puede estar vacio. ";
        }else
        {           
            if (!/[áãàáäâªèéëêìíïïòóöôùúüûñç¨º~#@!%&¡¿}¨´><`;,:()\|\·\$\^\[\]\?\+\\]+/gi.test(nameFile.trim())) {
                  error.innerHTML ="";
                  $('#myModal').modal('hide'); 
                  return  true;
              }
              else {
                   error.innerHTML ="Nombre no valido.<br>Comprube que el nombre nombre no tenga caracteres especiales.";
                   return false;
              }
        }
    }
    

    $( "#btnexpexcel" ).click(function() {
            
            /*$("#myModal").find( "#writeNameFile" ).val("");
            $('#myModal').modal().find(".modal-title").text("Nombre del archivo");

            $("#validaNumeros").hide();
            $("#introNum").hide();
            $("#ValidaTexto").hide();
            $("#validaDate").hide();
            $("#selecDate").hide();
            $("#nameFile").show();
            $("#nameFilePdf").hide();
            $("#div_item_order").hide();
       

            var divBotones = document.getElementById("accions");
            var chain =' ';
			divBotones.innerHTML =' ';
			chain+='<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
			'<button id="expexcel" type="submit" class="btn btn-success" style="color: white; background-color: #3579B3;">Descargar</button>';
			divBotones.innerHTML=chain;

			 $("#expexcel").click(function(){
			 	saveEXcel();
			 });*/	 

    });

     /************************************************************
    **************** Exportar tabla a pdf *********************
    *************************************************************/

    function tableToJson(table) 
    {
          var data = [];
          var headers = [];
          for (var i=0; i<table.rows[0].cells.length; i++) {
              headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
              
          }
   
          for (var i=1; i<table.rows.length; i++) {

              var tableRow = table.rows[i];
              var rowData = {};

              for (var j=0; j<tableRow.cells.length; j++) {

                  rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

                  if(/^\s*$/.test(rowData[ headers[j] ])){
                  	  rowData[ headers[j] ] = 'Sin dato';
                  }
                
              }
        
              data.push(rowData);
           }       

          return data;
    }

    /***************************************************************
	********************* pinta selecciones ************************
	***************************************************************/
	function drawTermsNumeros(idNo,name,type,datatype,lista,labelx){
		var div = document.getElementById("validaNumeros");
		var divtext = document.getElementById("introNum");
		var divBotones = document.getElementById("accions");
		var chain='';
		var acciones='';
		divtext.innerHTML='';
		divBotones.innerHTML='';
		chain+='<select id="operadorSelectNum">';
		chain+='<option value="s">Elige una opcion</option>';
		chain+='<option value="igual">Igual a:</option>';
		chain+='<option value="mayor">Mayor a:</option>';	
		chain+='<option value="menor">Menor a:</option>';	
		chain+='<option value="rango">Rango</option>';
		chain+='</select>';
		div.innerHTML= chain;
		divBotones.innerHTML += '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
		$( "#operadorSelectNum" ).change(function() {
    var valueCombo= $(this).val();
		var opcion='';
		error.innerHTML = "";
		acciones= '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
		  	if($(this).val() == "rango"){		  		
		  		opcion+='<input type="text" name="writeNumber" id="writeNumber" placeholder="De" value=""/>';
		        opcion+= '<input type="text" name="writeNumber2" id="writeNumber2" placeholder="Hasta" value="" />';
		        acciones+='<button id="filtraNumeroR" type="submit" class="btn btn-success" style="color: white;">Filtrar</button>';		        
		        divtext.innerHTML= opcion;
		        divBotones.innerHTML = acciones;
		        $("#filtraNumeroR").on("click",function(eventp){
					if(validarNumero("#writeNumber")){
						    if(validarNumero("#writeNumber2")){
                    $('#myModal').modal('hide'); 
                    var numero = $("#myModal").find( "#writeNumber" ).val();
                    var numero2 = $("#myModal").find( "#writeNumber2" ).val();
                    var condicion = numero+','+numero2;
                    pushFilter(objetoJSONEhere.condiciones,idNo,name,valueCombo,condicion,type,datatype,lista,labelx);
                    insertValueFields("celFil"+idNo,valueCombo+' de '+numero+ ' hasta '+numero2);
                    //sendStringJSONWhere();
                    
                }
                
					}
				});
		  	}else if($(this).val() == "s")
		  	{
			  	var opcion='';
				divtext.innerHTML='';
				divBotones.innerHTML = acciones;
		  	}else{
		  		opcion+='<input type="text" name="writeNumber" id="writeNumber" placeholder="Escribe" value=""/>';
		  		acciones+='<button id="filtraNumeroU" type="submit" class="btn btn-success" style="color: white;">Filtrar</button>';
		  		divtext.innerHTML= opcion;
		  		divBotones.innerHTML = acciones;
		  		$("#filtraNumeroU").on("click",function(eventp){
					 if(validarNumero("#writeNumber")){
                        $('#myModal').modal('hide'); 
                        var condicion = $("#myModal").find( "#writeNumber" ).val();
                        pushFilter(objetoJSONEhere.condiciones,idNo,name,valueCombo,condicion,type,datatype,lista,labelx);
                        insertValueFields("celFil"+idNo,valueCombo+' a '+condicion);
                        //sendStringJSONWhere();
           }
				});
		  	}
		});

		
	}

	function drawTermsString(idNo,name,type,datatype,lista,labelx){
    //alert("Mostrando atributos desde draw: " + name +" "+type+" "+datatype+" "+lista);
    	error.innerHTML = "";
		var divBotones = document.getElementById("accions");
		var div = document.getElementById("ValidaTexto");
		divBotones.innerHTML =' ';
		var char = '';
		var op = '';
		char+='<select id="comboTextoCondicion">';
		char+='<option value="qq">Elige una opcion</option>';
		char+='<option value="igual">Igual a:</option>';
		char+='<option value="diferente">Diferente a:</option>';
		char+='</select>';
		char+=' <input type="text" name="parametro" id="parametro" placeholder="Escribe" value=""/>';
		div.innerHTML = char;
		op+='<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
		op+='<button id="filtraDato" type="submit" class="btn btn-success" style="color: white;">Filtrar</button>';
		divBotones.innerHTML=op;
		$("#filtraDato").on("click",function(eventp){
			var comboCon = $("select#comboTextoCondicion").val();
			if(comboCon == "qq"){
				error.innerHTML = "Elige una opocion de comparación.";
			}else{
				error.innerHTML = "";
				if(validarString()){			
	    			$('#myModal').modal('hide'); 
			          var condicion = $("#myModal").find( "#parametro" ).val();
			          pushFilter(objetoJSONEhere.condiciones,idNo,name,comboCon,condicion,type,datatype,lista,labelx);
                insertValueFields("celFil"+idNo,comboCon+' a '+condicion);
			          //sendStringJSONWhere();
				}
			}
		});
	}

function drawTermsDate(idNo,name,type,datatype,lista,labelx){

		var div = document.getElementById("validaDate");
		var divBotones = document.getElementById("accions");
		var chain='';
		var acciones='';

		divBotones.innerHTML='';
		chain+='<select id="operadorSelect">';
		chain+='<option value="s">Elige una opcion</option>';
		chain+='<option value="igual">Igual a:</option>';
		chain+='<option value="mayor">Mayor a:</option>';	
		chain+='<option value="menor">Menor a:</option>';	
		chain+='<option value="rango">Rango</option>';
		chain+='</select>';
		div.innerHTML= chain;
		divBotones.innerHTML += '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
		$("#selecDate").hide();	

		$( "#operadorSelect" ).change(function() {
        var valueCombo= $(this).val();
		var opcion='';
		error.innerHTML = '';
		$("#myModal").find( "#Startdate" ).val("");
		$("#myModal").find( "#Enddate" ).val("");
		$("#myModal").find( "#date" ).val("");
		acciones= '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
		  	if($(this).val() == "rango"){
		  		$("#selecDate").show();	
		  		$("#entre").show();
		  		$("#uno").hide();			  				  		
		        acciones+='<button id="filtraDate2" type="submit" class="btn btn-success" style="color: white;">Filtrar</button>';		        
		        divBotones.innerHTML = acciones;
		        $("#filtraDate2").on("click",function(eventp){
					var fecha = $("#myModal").find("#Startdate").val();
					var fechaf = $("#myModal").find("#Enddate").val();
					if(expRegularDate2(fecha,fechaf)){
						$('#myModal').modal('hide');
                var date1 = $("#myModal").find( "#Startdate" ).val();
                var date2 = $("#myModal").find( "#Enddate" ).val();
                var condicion = date1 +','+date2;
                pushFilter(objetoJSONEhere.condiciones,idNo,name,valueCombo,condicion,type,datatype,lista,labelx);
                insertValueFields("celFil"+idNo,valueCombo+' a '+condicion);
                //sendStringJSONWhere();
					}
					
				});

		  	}else if($(this).val() == "s")
		  	{
		  		$("#selecDate").hide();	
			  	var opcion='';
				divtext.innerHTML='';
				divBotones.innerHTML = acciones;
		  	}else{
		  		$("#selecDate").show();	
		  		$("#uno").show();
		  		$("#entre").hide();		  		
		  		acciones+='<button id="filtraDate1" type="submit" class="btn btn-success" style="color: white;">Filtrar</button>';
		  		divBotones.innerHTML = acciones;

		  		$("#filtraDate1").on("click",function(eventp){
					var fecha = $("#myModal").find("#date").val();
					if(expRegularDate(fecha)){
						$('#myModal').modal('hide');
                var condicion = $("#myModal").find( "#date" ).val();
                pushFilter(objetoJSONEhere.condiciones,idNo,name,valueCombo,condicion,type,datatype,lista,labelx);
                insertValueFields("celFil"+idNo,valueCombo+' a '+condicion);
                //sendStringJSONWhere();
					}
				});
		  	}
		});
	
}

$("#viewFilterFields").on("click", function(e){
   $("#viewFilterModal").modal("show");
});

function insertFieldViewConfigReport(tableName,nombreCampo,idRenglon,valor,idColumna){
      var row = tableName.insertRow(0);
    
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      row.setAttribute("id",idRenglon);
      cell2.setAttribute("id",idColumna);

      cell1.setAttribute("width","50%");
      cell2.setAttribute("width","50%");

      cell1.innerHTML = ""+nombreCampo;
      cell2.innerHTML = ""+valor;
}

function insertValueFields(idColumn,text){
   var columna = document.getElementById(idColumn);
   columna.innerHTML=text;
}

function deleteFieldViewConfigReport(idRenglon){
  $("#"+idRenglon).remove();
}

function pushFilter(array,idCampo,campor,typeFilter,condicionr,typer,datatyper,lista,labelparams){
  var exist = arrayObjectIndexOf (array, idCampo , 'id' );
  if(exist == -1){
    array.push({id:idCampo,campo:campor,tipoFiltro:typeFilter,condicion:condicionr,type:typer,datatype:datatyper,list:lista,label:labelparams});
  }else{
      array.splice(exist,1);
      array.push({id:idCampo,campo:campor,tipoFiltro:typeFilter,condicion:condicionr,type:typer,datatype:datatyper,list:lista,label:labelparams});
  }
	
}

function pushSort(array,idCampo,nameCampo,typeOrder,labels,tipoDato,listname,TypeData){
  var exist = arrayObjectIndexOf (array, idCampo , 'id' );
  if(exist == -1){
    array.push({id:idCampo,name:nameCampo,ordenamiento:typeOrder,label:labels,datatype:tipoDato,list:listname,type:TypeData});
  }else{
      array.splice(exist,1);
      array.push({id:idCampo,name:nameCampo,ordenamiento:typeOrder,label:labels,datatype:tipoDato,list:listname,type:TypeData});
  }
  
}

function pushAgrupador(array,idCampo,labelparams,nameparams,operadorparams,typeparams,lista,parametrosSubtotales){
  
  var exist = arrayObjectIndexOf (array, idCampo , 'id' );
  if(exist == -1){
    array.push({id:idCampo,label:labelparams,name:nameparams,operador:operadorparams,tipo:typeparams,list:lista,paramsTotal:parametrosSubtotales});
  }else{
      array.splice(exist,1);
      array.push({id:idCampo,label:labelparams,name:nameparams,operador:operadorparams,tipo:typeparams,list:lista,paramsTotal:parametrosSubtotales});
  }
}

function pushSubTotalRef(SelectCombo){

	var objetoJSONSubtotal = [];

	$("#"+SelectCombo+" option:selected").each(function(){
		var idCampoReferencia = $(this).attr('id');
        var nameReferencia = $(this).attr('name');
        var datatypeReferencia = $(this).attr('datatype');
        var listaReferencia = $(this).attr('list');
        var labelReferencia = $(this).attr('label');
        var typeReferencia = $(this).attr('type'); 
          
        objetoJSONSubtotal.push({columnaReferencia:labelReferencia,nameRef:nameReferencia,datatypeRef:datatypeReferencia,listRef:listaReferencia,type:typeReferencia,idRef:idCampoReferencia});

    })

    return objetoJSONSubtotal;
}


function popArray(array,id){
  var find=false;
  if(array.length > 0)
  {
    var exist = arrayObjectIndexOf (array, id , 'id' );
    if(exist != -1){
      array.splice(exist,1);
      find = true;
    }

  }
  return find;
}

function popArrayReference(array,id){
  var find=false;
  if(array.length > 0)
  {
    var exist = arrayObjectIndexOf (array, id , 'idRef' );
    if(exist != -1){
      array.splice(exist,1);
      find = true;
    }

  }
  return find;
}


function llenaComboLineas(){
  var combo =  document.getElementById("comboSelectCampoLineas");
  var chain='<option value="-1ab2" selected>seleccione etiqueta</option>';
  combo.innerHTML = '';
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
                       
                    break;

                    default:
                    if(index2 > 0)
                    {
                    chain+='<option value="'+index2+'">'+texto+'</option>';                     
                    }
                  }
                  
                })
        })
       combo.innerHTML = chain;

}

function controlGroup(id){
    for(var auxObjeto in objetoJSONAgrupador){
           for(var ObjetoRef in objetoJSONAgrupador[auxObjeto]){
                 for(var x in objetoJSONAgrupador[auxObjeto][ObjetoRef] ){
                  var axutmpSub=false;
                   if(x == "paramsTotal"){
                         for(var y in objetoJSONAgrupador[auxObjeto][ObjetoRef][x]){
                             for(var z in objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y]){
                                 if(z == "columnasRef"){
                                 	for(var xyz in objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y][z]){
                                 		var bandera=false;
                                 		for(var auxtmp in objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y][z][xyz]){
                                 			if(objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y][z][xyz][auxtmp] == "cb"+id){
                                           var tmpId="cb"+id;
	                                         bandera = true;
	                                       }
                                 		}
                                 		if(bandera){  
                                 	      popArrayReference(objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y][z],tmpId);
                                        if(objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y][z].length == 0){
                                          axutmpSub=true;
                                        }
				                            }
                                   }
                                 }

                             }

                         }
                   }

                  if(axutmpSub){
                    var totaltmp;
                    for(var camb in objetoJSONAgrupador[auxObjeto][ObjetoRef][x]){
                      totaltmp = objetoJSONAgrupador[auxObjeto][ObjetoRef][x][camb].total;
                    }
                    objetoJSONAgrupador[auxObjeto][ObjetoRef][x]=[{total:totaltmp,subtotal:"No"}];
                   }

                }
                 
           }
    }
}


function reemplazaReferencia(arreglo){

    for(var auxObjeto in objetoJSONAgrupador){
           for(var ObjetoRef in objetoJSONAgrupador[auxObjeto]){
                 for(var x in objetoJSONAgrupador[auxObjeto][ObjetoRef] ){

                   if(x == "paramsTotal"){
                        var bandera=false;
                        for(var y in objetoJSONAgrupador[auxObjeto][ObjetoRef][x]){
                             for(var z in objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y]){
                                 if(z == "idRef"){
                                    bandera = true;
                                 }
                             }
                         }
                         if(bandera){
                            objetoJSONAgrupador[auxObjeto][ObjetoRef][x] = arreglo;
                         }
                   }

                 }
               
           }

    }
}

function emptyReferencia(){
    for(var auxObjeto in objetoJSONAgrupador){
           for(var ObjetoRef in objetoJSONAgrupador[auxObjeto]){
                 for(var x in objetoJSONAgrupador[auxObjeto][ObjetoRef] ){

                   if(x == "paramsTotal"){
                        var bandera=false;
                        for(var y in objetoJSONAgrupador[auxObjeto][ObjetoRef][x]){
                             for(var z in objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y]){
                                 if(z == "columnasRef"){
                                    bandera = true;
                                 }
                             }
                         }
                         if(bandera){
                            objetoJSONAgrupador[auxObjeto][ObjetoRef][x][y] = [{total:"No",subtotal:"No"}];
                         }
                   }

                 }
               
           }
    }
}

$("#esci").on("click",function(){
location.href = 'http://187.188.96.133:800/SIFEM/';
});


$("#btnexpexcel").hide();
$("#comboSelectCampoLineas").disabled=true;
$("#reportesGuardados").hide();
$("#createReport").hide();

           

$("#exeReport").on("click", function(e){
    var seleccionados = fullArrayCamposSeleccionados();
    sendStringJSON(seleccionados,objetoJSONEhere,objetoJSONSort,objetoJSONAgrupador);

});

$("#passCampos").on("click", function(e){
        var listadestino = document.getElementById("select");
        var nodos = document.getElementById("list");
        var listaCampos = $( "#list" ).sortable( "toArray");
        var lis = nodos.getElementsByTagName("li");
        var controlTmp = 0;
        var sizeSeleccion = $( "#select" ).sortable( "toArray");

        for (var i = 0; i<listaCampos.length ; i++) {
            //  var tipo =lis[controlTmp].getAttribute("datatype");

              /*if(tipo == "records")
              {
                controlTmp++;
              }else{
                  listadestino.appendChild(lis[controlTmp]);  
              }*/

             listadestino.appendChild(lis[controlTmp]);  
          
        }

        if(sizeSeleccion.length>=0){
           $('#exeReport').attr("disabled", false);
        }else{
          $('#exeReport').attr("disabled", true);
        }


});

$("#backFields").on("click", function(e){
        var listadestino = document.getElementById("list");
        var nodos = document.getElementById("select");
        var listaCampos = $( "#select" ).sortable( "toArray");
        var lis = nodos.getElementsByTagName("li");
    

        for (var i = 0; i<listaCampos.length ; i++) {   
              listadestino.appendChild(lis[0]);  
        }

        var sizeSeleccion = $( "#select" ).sortable( "toArray");
         if(sizeSeleccion.length==0){
           
           $('#exeReport').attr("disabled", true);
           $('#filtrado').empty();
           $('#ordenado').empty();
           $('#agrupado').empty();

           $('#tablaFiltros').empty();
           $('#tablaOrden').empty();
           $("#tablaAgrupador").empty();

           objetoJSONEhere.condiciones=[];
           objetoJSONSort.arr_ordenamiento=[];
           objetoJSONAgrupador.agrupador=[];
        }

});

$("#deletefilters").on("click", function(e){
   $('#filtrado').empty();
   $('#tablaFiltros').empty();
   objetoJSONEhere.condiciones=[];
});

$("#deleteOrden").on("click", function(e){
    $('#ordenado').empty();
    $('#tablaOrden').empty();
    objetoJSONSort.arr_ordenamiento=[];
    emptyReferencia();
});

$("#deleteOperaciones").on("click", function(e){
   $('#agrupado').empty();
   $("#tablaAgrupador").empty();
   objetoJSONAgrupador.agrupador=[];
});



$( document ).ajaxStart(function() {
       $.blockUI({ 
        message: '<h4>Por favor espere...</h4>',
        css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff' 
        } }); 
 
});



$( document ).ajaxStop(function() {
    $.unblockUI();
});


$(".option_logout").click(function(){
        CerrarSession();
});

function CerrarSession(){
    amplify.store('dataLoggingProbosque',null);
    window.location.assign("/SIFEM/index.html");
}


});


