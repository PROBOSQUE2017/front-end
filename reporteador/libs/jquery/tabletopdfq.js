var titleList ="";
var fechaReporte = "";
var arreglo= [30, 90, 20,25 ];
var pagesize="letter";
var orientacion = "portrait";
var valorSelect = 1;
var img= 'data:image/png;base64,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';
var t;
var aux;
var ejecutivo;
var tableModuloWeb;
var tipoOrientacion=0;
var bandera = false;
var arregloDatos = new Array();
var arregloCabecera = new Array();
var arregloRowInsert = new Array();

function drawTablaData(parametro){
	   
	    t = $("#tableData").DataTable( {
	    	    scrollX: true,
		        bSort : false,
		        scrollY:        '50vh',
		        scrollCollapse: true,
		        autoWidth: "*",
		        aLengthMenu: [[10,25, 50, 75, -1], [10,25, 50, 75, "All"]],
		        iDisplayLength: 10,
		        dom: '<"top"Bfl>rt<"bottom"p><"clear">',
		        buttons: [
		            {
		                extend: 'excelHtml5',
		                title: 'Data export',
		                text: 'Exportar Excel'
		            },{
		                text: 'Exportar a PDF',
		                action: function ( e, dt, node, config ) {
		                	//$.blockUI('Generando PDF');
		             		/*$.blockUI({ 
							        message: '<h4>Generando PDF...</h4>',
							        css: { 
							            border: 'none', 
							            padding: '15px', 
							            backgroundColor: '#000', 
							            '-webkit-border-radius': '10px', 
							            '-moz-border-radius': '10px', 
							            opacity: .5, 
							            color: '#fff' 
							    } });    */ 
		                		
		                	builderPDF(t)
		                		//	setTimeout(function(){simularajax(t)},2000);
		                	
		                		
		                		
		   						//$.unblockUI();
		               		

		                }
		            }
		        ]
		    } ); 
	

}


function drawTablaDataReporteSave(parametro){ 

  if(parametro == 2){

   tableModuloWeb=  $("#tableData2").DataTable( {
   		  scrollX: true,
          bSort : false,
          scrollY:        '50vh',
          scrollCollapse: true,
          aLengthMenu: [[10,25, 50, 75, -1], [10,25, 50, 75, "All"]],
          iDisplayLength: 10,
          dom: '<"top"Bfl>rt<"bottom"p><"clear">',
          buttons:[{
          	    text: 'Exportar a PDF',
		        action: function ( e, dt, node, config ) {
		            builderPDF(tableModuloWeb);	
		        }

          }]
      } ); 
  }else if(parametro == 3){
  	 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  	 aux = $("#tableData3").DataTable( {
  	 			scrollX: true,
		        bSort : false,
		        scrollY:        '50vh',
		        scrollCollapse: true,
		        autoWidth: "*",
		        aLengthMenu: [[10,25, 50, 75, -1], [10,25, 50, 75, "All"]],
		        iDisplayLength: 10,
		        dom: '<"top"Bfl>rt<"bottom"p><"clear">',
		        buttons: [
		            {
		                extend: 'excelHtml5',
		                title: 'Data export',
		                text: 'Exportar Excel'
		            },{
		                text: 'Exportar a PDF',
		                action: function ( e, dt, node, config ) {
		             
		                	     // console.log(img);
		                		  builderPDF(aux);	
		   
		               		

		                }
		            }
		        ]
		    } );
  	 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  }else{
  	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  		$('table.display').DataTable();
  	 /*ejecutivo = $("#"+parametro).DataTable( {
		        bSort : true,
		        scrollY:        '50vh',
		        scrollCollapse: true,
		        autoWidth: "*",
		        aLengthMenu: [[10,25, 50, 75, -1], [10,25, 50, 75, "All"]],
		        iDisplayLength: 10,

		    } ); */

  	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  }
}



function builderPDF(parametoTable){
   
    //+++++++++++++++++++++++++++++++
    var fin=[];
    var columnas = [];
    var cabecera =[];
    parametoTable.rows().eq(0).each( function ( index ) {
            var celda=new Array();
            parametoTable.columns().eq(0).each( function ( index2 ) {
            	var column = parametoTable.column( index2 );
		        var data = column.nodes();  
                var numeroRows = parseInt(data[index].getAttribute('name'));
                if(index == 0) 
                {
                        var title = parametoTable.column( index2 ).header();
                       
                        if(index2 == 0){
                        columnas.push('auto');
                        }else{
                        columnas.push('*'); 
                        }
                        cabecera.push({text: $(title).html() , style:"header"});
                }
                	celda.push({rowSpan:numeroRows,text: data[index].innerHTML});              	               	    

            });
           if(index == 0){
           	  fin.push(cabecera);
           	  fin.push(celda);
           }else{
           	 fin.push(celda);
           }
           
    });

   	var docDefinition = {
                pageOrientation: orientacion,
                pageSize: pagesize,
                pageMargins: arreglo,
                content: [
                    {
                    margin: [ 0, -15, 0, 0 ],                     
                            table: {
                                        headerRows: 2,
                                        widths: ['*'],
                                        body: [
                                        [{ text: fechaReporte, fontSize: 10, alignment:'right' }],
                                        [{ text: titleList, fontSize: 12, bold: true, alignment:'center' }]

                                        ]

                                    },
                            layout: 'noBorders'
                    },{
                            margin: [ 0, 25, 0, 0 ],
                            fontSize: 8,
                            table: {
                                widths: columnas,
                                body: fin
                            }
                        }
                                                      
                ],
                footer: function(currentPage, pageCount) {
                    return { text: 'Pag. '+currentPage.toString()+'/'+pageCount, alignment: 'center' };
                },
                styles: {
                                header: {
                                    color: "#FFFFFF",
                                    bold: true,
                                    fillColor: '#808080'
                                }
                }       
            };
            if(valorSelect == 1 || valorSelect == 2)
            {
                if(tipoOrientacion == 0)
                {
                    docDefinition.header = { 
                    image: img,
                    height: 70,
                    width : 605,
                    };
                }else{
                    if(pagesize == 'LEGAL')
                    {
                        docDefinition.header = {
                        image: img,
                        height: 70,
                        width : 1005,
                        };

                    }else if(pagesize == 'LETTER')
                    {
                        docDefinition.header = {
                        image: img,
                        height: 70,
                        width : 805,
                        };

                    }

                }
            }
         
           /* pdfMake.createPdf(docDefinition).getDataUrl(function (encodedString) {
						    pdfMake.createPdf(docDefinition).download('SecondTest.pdf');
						     $.unblockUI();
						    //alert("obtuvo lo que queria");
			});*/
            //bandera = true;
            //pdfMake.createPdf(docDefinition).open();
             pdfMake.createPdf(docDefinition).download("exportaPDF.pdf");

        
          
 			
}


function selectTableRow(params){
    	var renglon = params.getAttribute('id');

    	var tiene = $("#"+renglon).hasClass('selected');
    	 
    	 if (tiene) {
             $("#"+renglon).removeClass('selected');
        }
        else {
            //t.$('tr.selected').removeClass('selected');
            $("#"+renglon).addClass('selected');
        }
         var sizeSelect = t.rows('.selected').count();

         if(sizeSelect>0){
         	document.getElementById("comboSelectCampoLineas").disabled=false;
    
         }else{
         	$("select#comboSelectCampoLineas").val("-1ab2");
         	
         	document.getElementById("lineasRowsSelect").disabled=true;
         	document.getElementById("comboSelectCampoLineas").disabled=true;
         }
        

}






























