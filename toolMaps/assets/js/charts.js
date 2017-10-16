
$(document).ready(function () {

  function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      usuario = getParameterByName('vuhmepmhac')/5;
     
    
  $('#btnVerTema').on('click',function() { 

      var temaElegido = $('#selectTemasPoligonos').val();    
      var array_tema=temaElegido; 
      for (var i = temaElegido.length - 1; i >= 0; i--) {
          temaElegido[i]= '"'+temaElegido[i] +'"' 
      }

      temaElegido = temaElegido.toString();

      var tema = "{" + temaElegido + "}";


        var regiones = [ "I", "II", "III", "IV", "V", "VI","VII","VIII"];
        var dataset = [];
        for (var i = 0; i < array_tema.length; i++) {

          var data = loadData(usuario,tema, i+1); 
                      if (data==undefined ){
                        data = [];
                      } else{
                        data=data.substr(1, data.length-2); 
                        data =JSON.parse("[" + data + "]");
                      }

          var obj_data={ label: array_tema[i], data:data};
          dataset= dataset.concat(obj_data);

          var options = {
              series: {
                  lines: { show: true, 
                           fill: true, 
                           fillColor: { colors: [{ opacity: 0.2 }, { opacity: 0.2}] }
                         }                 
              },
              xaxis:{
               /*   axisLabel: "Regiones",
                  axisLabelUseCanvas: true,
                  axisLabelFontSizePixels: 12,*/
                  ticks: [[1, "I"], [2, "II"], [3, "III"], [4, "IV"], [5, "V"], [6, "VI"],[7,"VII"],[8,"VIII"]],
                  tickFormatter: function(val, axis) {
                  return regiones[val-1] ;
                },

              },
              yaxis: {
                  axisLabel: "No. de Incidencias",
                  axisLabelUseCanvas: true,
                  axisLabelFontSizePixels: 12
              },
              points: { 
                  show: true 
              },
              legend: {
                noColumns: 1, 
                labelBoxBorderColor: "#262626",
                position: "nw"       
              }, 
              grid: {
                hoverable: true,
                borderWidth: 3        
              },
              tooltip: {
                show: true,
                content:'%s con %y de incidencias en la Region %x',
                shifts: {
                      x: -60,
                      y: 25
                },
                defaultTheme: false
              },
              colors: [ "#7D0096" ,  "#DE000F", "#00B503",  "#ED7B00" ],
          };
        };

        $.plot($("#flot-placeholder"), dataset, options);

  });

});

loadData = function(usr,tem,inc){
    var datagraf="";
    var params={"usuario":usr, "tema":tem, "inc": inc};

   $.ajax({
          url: 'http://187.188.96.133:8082/ServiceBosque/Graficas',
          type: "POST",
          datatype: 'json',
          async: false, 
          data:params,

          success:function(data){

         datagraf = data.data;

          }
        }); 
        return datagraf; 
          
}

