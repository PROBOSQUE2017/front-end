 function Create2DArray(ArrayPrincipal, columns,rows) {
      ArrayPrincipal[columns] = new Array();
       for (var i = 0; i < rows.length; i++) {           
         ArrayPrincipal[columns][i] =  rows[i];       
       }      
       return ArrayPrincipal;
    }

    function Create2DArrayHeader(array,columna,NombreColumna,typoColumna,agrupado){
      array[columna] = new Array();
   
      array[columna][0]= NombreColumna;
      array[columna][1]= typoColumna;
      array[columna][2]= agrupado;

      return array;
      
    }

    function builderTable(arrayData,arrayHeader,parametro)
    {

      if(arrayData.length > 0 && arrayData[0].length)
      {
          controlRegistros = true;
          $("#spaceTable").empty();
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var cabecera = newTable.createTHead();
          var rowtitle = cabecera.insertRow(0); 
          var cuerpoTabla = newTable.createTBody();
          newTable.setAttribute("id","tableData");
          newTable.setAttribute("class","display");
          newTable.setAttribute("cellspacing",0);
          newTable.setAttribute("width","100%");


          var widthColumn = 100/(arrayData.length + 1);
          var totalObjetos = arrayData.length;
          var tamañoSubarreglo = arrayData[0].length;
          var contadorSub = 0;
          var i=0;
          var contadorRows = 1;
          var PosicionActual = 1;
          var PosicionColumnAgrupada=-2;
       
         for (var k = 0; k < arrayHeader.length; k++) 
         {
            if(k == 0){
                 var celltitle = rowtitle.insertCell(-1);
                 celltitle.innerHTML = "No";   
            }
               
            var celltitle = rowtitle.insertCell(-1);
            celltitle.innerHTML = arrayHeader[k][0];
            celltitle.setAttribute("datatype",arrayHeader[k][1]);
            celltitle.setAttribute("width",widthColumn+"%");
            llenaCombo(arrayHeader[k][1],k+1,arrayHeader[k][0]);
                  
            if(arrayHeader[k][2]=="g"){
                PosicionColumnAgrupada = k;
                //console.log("Asignando columna "+PosicionColumnAgrupada);
            }     
         }
          
          while(i<totalObjetos){
          if(i==0){         
            var fila = cuerpoTabla.insertRow();
            fila.setAttribute("id","r"+contadorSub);
            var columna = fila.insertCell(-1);
            fila.setAttribute("onclick","selectTableRow(this)");
           
               columna.innerHTML = contadorSub+1;
          }

          var Col = fila.insertCell(-1);

          var tipoColumn= arrayHeader[i][1];
          //console.log(tipoColumn);
          switch (tipoColumn){
              case "integer":
              case "decimal":
              case "numeric":
              case "real":
                Col.innerHTML= formatNumber.new(isEmpty(arrayData[i][contadorSub]));
              break;

              default:
                Col.innerHTML= isEmpty(arrayData[i][contadorSub]);
          }
       

          i++;
        
          if(i==totalObjetos){
                i = 0;
                contadorSub+=1;
          }

          if(contadorSub == tamañoSubarreglo ){
              break;
          }
        } 
          contenedor.appendChild(newTable);
          drawTablaData(parametro);
          document.getElementById("btnGraficaOk").disabled=false;
          document.getElementById("btnGraficaDe").disabled=false;
          document.getElementById("btnexppdf").disabled=false;
          document.getElementById("btnexpexcel").disabled=false;
          document.getElementById("saveReport").disabled=false;
          document.getElementById("saveCuadr").disabled=false;
      }else{
          controlRegistros= false;
          $("#spaceTable").empty();      
          var contenedor = document.getElementById("spaceTable");
          var newTable = document.createElement("table");
          var rowtitle = newTable.insertRow(0);
          var celltitle = rowtitle.insertCell(-1);
          newTable.setAttribute("id","tableData");
          celltitle.innerHTML = "No se encontraron registros";
          contenedor.appendChild(newTable);
          document.getElementById("btnGraficaOk").disabled=true;
          document.getElementById("btnGraficaDe").disabled=true;
          document.getElementById("btnexppdf").disabled=true;
          document.getElementById("btnexpexcel").disabled=true;
          document.getElementById("saveReport").disabled=true;
          document.getElementById("saveCuadr").disabled=true;
          $("#graficas").hide();
          $("#btnGraficaDe").hide();
          $("#btnGraficaOk").show();

      } 
    
  }

  function removeItemsCombo(){
  var opcion = document.createElement("option");
  var opcion2 = document.createElement("option");
  opcion.innerHTML="Seleccione";
  opcion2.innerHTML="Seleccione";
  $("#ejeX").empty();
  $("#ejeY").empty();
  opcion.setAttribute("value","-1ab2");
  opcion2.setAttribute("value","-1ab2");
  comboy.appendChild(opcion);
  combox.appendChild(opcion2);

  $("select#ejeX").val("-1ab2");
  $("select#ejeY").val("-1ab2");

}

function llenaCombo(datatype,id,text){
  var opcion = document.createElement("option");
  opcion.setAttribute("id",id);
  opcion.setAttribute("value",id);
  opcion.innerHTML=text;
  switch(datatype){
    case "integer":
    case "decimal":
    case "numeric":
    case "real":
      var ExistsTmp = $("#ejeY").find("#"+id).size();
          if(ExistsTmp == 0){
            comboy.appendChild(opcion);
          }
          
    break;
    default:
         var ExistsTmp = $("#ejeX").find("#"+id).size();
          if(ExistsTmp == 0){
            combox.appendChild(opcion);
          }
          
  }

}


function builderTable2(arrayData,arrayHeader,parametro)
{

      if(arrayData.length > 0  && arrayData[0].length)
      {
          $("#spaceTable2").empty();
          var contenedor = document.getElementById("spaceTable2");
          var newTable = document.createElement("table");
          var cabecera = newTable.createTHead();
          var rowtitle = cabecera.insertRow(0); 
          var cuerpoTabla = newTable.createTBody();
          newTable.setAttribute("id","tableData"+parametro);
          newTable.setAttribute("class","display");
          newTable.setAttribute("cellspacing",0);
          newTable.setAttribute("width","100%");


          var widthColumn = 100/(arrayData.length + 1);
          var totalObjetos = arrayData.length;
          var tamañoSubarreglo = arrayData[0].length;
          var contadorSub = 0;
          var i=0;
          var contadorRows = 1;
          var PosicionActual = 1;
          var PosicionColumnAgrupada=-2;
       
         for (var k = 0; k < arrayHeader.length; k++) 
         {
            if(k == 0){
                 var celltitle = rowtitle.insertCell(-1);
                 celltitle.innerHTML = "No";   
            }
               
            var celltitle = rowtitle.insertCell(-1);
            celltitle.innerHTML = arrayHeader[k][0];
            celltitle.setAttribute("width",widthColumn+"%");
          
                  
            if(arrayHeader[k][2]=="g"){
                PosicionColumnAgrupada = k;
             
            }     
         }

          while(i<totalObjetos){
          if(i==0){         
            var fila = cuerpoTabla.insertRow();
            var columna = fila.insertCell(-1);
            columna.setAttribute("name","1");
            columna.innerHTML = contadorSub+1;
          }

          var Col = fila.insertCell(-1);
          //Col.innerHTML= formatNumber.new(isEmpty(arrayData[i][contadorSub]));
          var tipoColumn= arrayHeader[i][1];
          switch (tipoColumn){
              case "integer":
              case "decimal":
              case "numeric":
              case "real":
                Col.innerHTML= formatNumber.new(isEmpty(arrayData[i][contadorSub]));
              break;

              default:
                Col.innerHTML= isEmpty(arrayData[i][contadorSub]);
          }
    
          i++;
          if(i==totalObjetos){
                i = 0;
                contadorSub+=1;
          }

          if(contadorSub == tamañoSubarreglo ){
              break;
          }
        } 
          if(parametro == 2){
             document.getElementById("btnexppdf1").disabled=false;
          }else if(parametro == 3){
             document.getElementById("btnexppdf").disabled=false;
          }
         
          contenedor.appendChild(newTable);
          drawTablaDataReporteSave(parametro);

      }else{
          if(parametro == 2){
             document.getElementById("btnexppdf1").disabled=false;
          }else if(parametro == 3){
             document.getElementById("btnexppdf").disabled=false;
          }
          $("#spaceTable2").empty();      
          var contenedor = document.getElementById("spaceTable2");
          var newTable = document.createElement("table");
          var rowtitle = newTable.insertRow(0);
          var celltitle = rowtitle.insertCell(-1);
          newTable.setAttribute("id","tableData2");
          celltitle.innerHTML = "No se encontraron registros en este reporte";
          contenedor.appendChild(newTable);
      } 
    
}


function findArray(ArrayElementos,elemento){
  var buscar = ""+elemento;
  var isFind = ArrayElementos.indexOf(buscar);

  if(isFind == -1){
    return false;
  }else{
    return true;
  }
}


function builderTableEjecutivo(arrayData,arrayHeader,parametro,content)
{

      if(arrayData.length > 0  && arrayData[0].length)
      {
          
          var contenedor = document.getElementById(content);
          var newTable = document.createElement("table");
          var cabecera = newTable.createTHead();
          var rowtitle = cabecera.insertRow(0); 
          var cuerpoTabla = newTable.createTBody();
          //newTable.setAttribute("id",parametro);
          newTable.setAttribute("class","display");
          newTable.setAttribute("cellspacing",0);
          newTable.setAttribute("width","100%");


          var widthColumn = 100/(arrayData.length + 1);
          var totalObjetos = arrayData.length;
          var tamañoSubarreglo = arrayData[0].length;
          var contadorSub = 0;
          var i=0;
          var contadorRows = 1;
          var PosicionActual = 1;
          var PosicionColumnAgrupada=-2;
       
         for (var k = 0; k < arrayHeader.length; k++) 
         {
            if(k == 0){
                 var celltitle = rowtitle.insertCell(-1);
                 celltitle.innerHTML = "No";   
            }
               
            var celltitle = rowtitle.insertCell(-1);
            celltitle.innerHTML = arrayHeader[k][0];
            celltitle.setAttribute("width",widthColumn+"%");
          
                  
            if(arrayHeader[k][2]=="g"){
                PosicionColumnAgrupada = k;
             
            }     
         }

          while(i<totalObjetos){
          if(i==0){         
            var fila = cuerpoTabla.insertRow();
            var columna = fila.insertCell(-1);
            columna.setAttribute("name","1");
            columna.innerHTML = contadorSub+1;
          }

          var Col = fila.insertCell(-1);
          //Col.innerHTML= formatNumber.new(isEmpty(arrayData[i][contadorSub]));
          var tipoColumn= arrayHeader[i][1];
          switch (tipoColumn){
              case "integer":
              case "decimal":
              case "numeric":
              case "real":
                Col.innerHTML= formatNumber.new(isEmpty(arrayData[i][contadorSub]));
              break;

              default:
                Col.innerHTML= isEmpty(arrayData[i][contadorSub]);
          }
    
          i++;
          if(i==totalObjetos){
                i = 0;
                contadorSub+=1;
          }

          if(contadorSub == tamañoSubarreglo ){
              break;
          }
        } 
         
          contenedor.appendChild(newTable);
          drawTablaDataReporteSave(parametro);

      }else{
   
          var contenedor = document.getElementById(content);
          var newTable = document.createElement("table");
          var rowtitle = newTable.insertRow(0);
          var celltitle = rowtitle.insertCell(-1);
          newTable.setAttribute("id",parametro);
          celltitle.innerHTML = "No se encontraron registros en este reporte";
          contenedor.appendChild(newTable);
      } 
    
}


var formatNumber = {
   separador: ",", // separador para los miles
   sepDecimal: '.', // separador para los decimales
   formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft  +splitRight;
   },
   new:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
   }
}


function isEmpty(text){
  if(text == null){
     return " ";
  }else{
    return text;
  }
}













