/*$(function(){
        $('#formShape').on("submit", function(e){
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById('formShape'));
            formData.append("dato", "valor");
            //formData.append(f.attr("name"), $(this)[0].files[0]);
            $.ajax({
                url: 'http://localhost:8080/ServiceBosque/UploadShape?',
                type: 'POST',
                dataType: 'json',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
                .done(function(data){
                    
                });
        });
    });

*/

var mandarShape = function(usr, nom){
        var params = {"usuario":usr,"nombre":nom, "archivo":arch};
        console.log(params);
        $.ajax({
          url: 'http://localhost:8080/ServiceBosque/UploadShape?',
          type: "POST",
          datatype: 'json',
          data: params
        }).done(function(data){});
      }

function getParameterByName(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        usuario = getParameterByName('vuhmepmhac')/5;
        console.log(usuario);


$('#btnSubirShape').click(function(){
    var nombreShape = $('#nombreShape').val();
    var archivo = $('#archivoShape').val();

    if( nombreShape == null || nombreShape.length == 0 || /^\s+$/.test(nombreShape) ) {
      alert("No has colocado un nombre al Shape");
    }

   extensionesPermitidas = new Array(".zip", ".kml"); 
   error = ""; 
   if (!archivo) { 
      //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario 
        error = "No has seleccionado ningún archivo"; 
   }else{ 
      //recupero la extensión de este nombre de archivo 
      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
      //alert (extension); 
      //compruebo si la extensión está entre las permitidas 
      permitida = false; 
      for (var i = 0; i < extensionesPermitidas.length; i++) { 
         if (extensionesPermitidas[i] == extension) { 
         permitida = true; 
         break; 
         } 
      } 
      if (!permitida) { 
         error = "Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: .zip"; 
        }else{ 
          //submito! 
          console.log(archivo);
         alert ("Todo correcto.");
         
         //options.submit();
         mandarShape(usuario, nombreShape, archivo); 
         //mandarShape();
          
         //formulario.submit();
         
        
        } 
   } 
   //si estoy aqui es que no se ha podido submitir 
   alert (error); 
 });

