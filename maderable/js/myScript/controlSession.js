  $(document).ready(function() {
      $(".option_logout").click(function() {
          amplify.store.logout('dataLoggingProbosque');
          window.location.assign("/SIFEM/index.html");
      });
  });

  amplify.store.logout = function(key) {
      var value = amplify.store(key);
      amplify.store(key, null);
      return value;
  }

  amplify.store.controlPages = function(key) {
      var value = amplify.store(key);
      if (value == null) {
          window.location.assign('/SIFEM/');
      } else {

          if (value.program == 15) {
              if(value.activity == 0){
                 window.location.assign('../maderable/tabla1.html');
              }else if (value.activity == 1) {
                  window.location.assign('../maderable/oficialCalificador.html');
              } else if (value.activity == 2) {
                  window.location.assign('../maderable/moduloAbogado.html');
              } else if (value.activity == 3) {
                  window.location.assign('../maderable/Bandeja.html');
              }else{
                window.location.assign('../maderable/accesoDenegado.html');
              }
          } else if (value.program == 8) {
               window.location.assign('../maderable/padron/');
          } else {
              window.location.assign('/SIFEM/');
          }
      }
  }



  amplify.store.controlPagesOnlyOficial = function(key) {
      var value = amplify.store(key);
      if (value == null) {
          window.location.assign('/SIFEM/');
      } else {

          if (value.program == 15) {
              if(value.activity == 0){
                 window.location.assign('../maderable/tabla1.html');
              }else if (value.activity == 1) {
                  //window.location.assign('../maderable/oficialCalificador.html');
              } else if (value.activity == 2) {
                  window.location.assign('../maderable/moduloAbogado.html');
              } else if (value.activity == 3) {
                  window.location.assign('../maderable/Bandeja.html');
              }else{
                   window.location.assign('../maderable/accesoDenegado.html');
              }
          } else {
              window.location.assign('/SIFEM/');
          }
      }
  }

  amplify.store.controlPagesOnlyAbog = function(key) {
      var value = amplify.store(key);
      if (value == null) {
          window.location.assign('/SIFEM/');
      } else {

          if (value.program == 15) {
              if(value.activity == 0){
                 window.location.assign('../maderable/tabla1.html');
              }else if (value.activity == 1) {
                  window.location.assign('../maderable/oficialCalificador.html');
              } else if (value.activity == 2) {
                  //window.location.assign('../maderable/moduloAbogado.html');
              } else if (value.activity == 3) {
                  window.location.assign('../maderable/Bandeja.html');
              }else{
                   window.location.assign('../maderable/accesoDenegado.html');
              }
          } else {
              window.location.assign('/SIFEM/');
          }
      }
  }

  amplify.store.controlPagesOnlyCoordinador = function(key) {
      var value = amplify.store(key);
      if (value == null) {
          window.location.assign('/SIFEM/');
      } else {

          if (value.program == 15) {
              if(value.activity == 0){
                 window.location.assign('../maderable/tabla1.html');
              }else if (value.activity == 1) {
                  window.location.assign('../maderable/oficialCalificador.html');
              } else if (value.activity == 2) {
                  window.location.assign('../maderable/moduloAbogado.html');
              } else if (value.activity == 3) {
                  //window.location.assign('../maderable/Bandeja.html');
              }else{
                  window.location.assign('../maderable/accesoDenegado.html');
              }
          } else {
              window.location.assign('/SIFEM/');
          }
      }
  }


  amplify.store.controlPagesOnlyPrograma8 = function(key) {
      var value = amplify.store(key);
      if (value == null) {
          window.location.assign('/SIFEM/');
      } else {

          if (value.program == 15) {
              if(value.activity == 0){
                 window.location.assign('/SIFEM/maderable/tabla1.html');
              }else if (value.activity == 1) {
                  window.location.assign('/SIFEM/maderable/oficialCalificador.html');
              } else if (value.activity == 2) {
                  window.location.assign('/SIFEM/maderable/moduloAbogado.html');
              } else if (value.activity == 3) {
                  window.location.assign('/SIFEM/maderable/Bandeja.html');
              }else{
                   window.location.assign('/SIFEM/maderable/accesoDenegado.html');
              }
          }else  if (value.program == 8) {
                 
          }else {
              window.location.assign('/SIFEM/');
          }
      }
  }

    amplify.store.controlPages8 = function(key) {
      var value = amplify.store(key);
      if (value == null) {
          window.location.assign('/SIFEM/');
      } else {

          if (value.program == 15) {
              if(value.activity == 0){
                 window.location.assign('/SIFEM/maderable/tabla1.html');
              }else if (value.activity == 1) {
                  window.location.assign('/SIFEM/maderable/oficialCalificador.html');
              } else if (value.activity == 2) {
                  window.location.assign('/SIFEM/maderable/moduloAbogado.html');
              } else if (value.activity == 3) {
                  window.location.assign('/SIFEM/maderable/Bandeja.html');
              }else{
                  window.location.assign('/SIFEM/maderable/accesoDenegado.html');
              }
          }else  if (value.program == 8) {
                  window.location.href = "/SIFEM/maderable/padron/altas.html";
          }else {
              window.location.assign('/SIFEM/');
          }
      }
  }

  



  amplify.store.controlPagesOnlyReforestamos = function(key) {
      var value = amplify.store(key);
      if (value == null) {
          window.location.assign('/SIFEM/');
      } else {

          if (value.program == 15) {
              if(value.activity == 0){
                 //window.location.assign('../maderable/tabla1.html');
              }else if (value.activity == 1) {
                  window.location.assign('../maderable/oficialCalificador.html');
              } else if (value.activity == 2) {
                  window.location.assign('../maderable/moduloAbogado.html');
              } else if (value.activity == 3) {
                  window.location.assign('../maderable/Bandeja.html');
              }else{
                 window.location.assign('../maderable/accesoDenegado.html');
              }
          } else {
              window.location.assign('/SIFEM/');
          }
      }
  }