var datos={};
define(["structure","connections","validator"], function(structure,connections,validator){
    var title = 'Sistema Inform&aacute;tico para la Actualizaci&oacute;n del Padr&oacute;n Cafetalero';
    var buildStructure = function(){
	var chain='<div class="Loging">'+
		    '<div class="Header">'+
			'<div class="app_header">'+
			    '<div class="section_header">'+
				'<div class="section_logo"><div class="template_logo"></div></div>'+
				'<div class="section_logo_probosque"><div class="template_logo_probosque"></div></div>'+
				'<div class="section_title_system">Sistema de Informaci&oacute;n Forestal del Estado de M&eacute;xico</div>'+
			    '</div>'+
			'</div>'+
			'<div class="app_faces"></div>'+
		    '</div>'+
			'<div class="Bg"></div>'+
		    '<div align="center" class="info_login">'+
			//'<center>'+
			    '<div class="modalLogin">'+
			    
				'<div class="title"><div class="label">Para ingresar al sistema introduzca:</div></div>'+
				'<div class="content Foot" align="center">'+
				    '<div class="background_content"></div>'+
				    '<div class="data">'+
					'<input id="user" class="textInput" type="text" value="" placeholder="Nombre de usuario"/>'+
					'<input id="pass" class="textInput" type="password" value="" placeholder="Contrase&ntilde;a"/>'+
					
					'<div align="center">'+
					    '<div class="spinner hidden"></div>'+
					    '<button id="btnLoging" class="textButton btn waves-effect">Ingresar</button>'+
					'</div>'+
					'<div class="msgError">'+
					    '<label></label>'+
					'</div>'+
					
				    '</div>'+
				'</div>'+
				
			    '</div>'+
			//'</center>'+
		    '</div>'+
		    '<div class="app_foot">'+structure.getFoot()+'</div>'+
		'</div>';
	$("body").html(chain);
	$(".msgError").hide();

    };
    var showMessage = function(msg){
	var item = $(".Foot .msgError");
	item.children().html(msg);
	var evento=function(){
	    setTimeout(function(){
		item.hide();
	    },4000);
	}
	item.show( 'shake', {}, 500, evento );
    };
    
    var loginRequest = function(params,aditional){
	    var clase='hidden';
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
	    var r= {
		    success:function(json,estatus){
			var valid=false;
			
			if (json){
			    if (json.response.sucessfull){
				valid=true;
				//alert(JSON.stringify(json.data.userInfo));
				//alert(json.data.userInfo.program);
				if (json.data.userInfo.program == 9 && json.data.userInfo.activity == 2) {
					amplify.store( 'dataLoggingProbosque', json.data.userInfo);	
					window.location.assign("produccion_planta.html");
				}else if(json.data.userInfo.program == 15){
					amplify.store( 'dataLoggingProbosque', json.data.userInfo);	
					window.location.assign("maderable/index.html");
				}	
	            else			
     			if(json.data.userInfo.program == 9 && json.data.userInfo.activity == 1){
					amplify.store( 'dataLoggingProbosque', json.data.userInfo);	
					window.location.assign("semilla.html");
				}
				
				else{
				structure.init(json.data.userInfo);
				amplify.store( 'dataLoggingProbosque', json.data.userInfo);				
			}
			    }else{
				msg=json.response.message;
			    }
			}
			if (!valid) {
			    showMessage(msg);
			}
			
		    },
		    beforeSend: function(solicitudAJAX) {
			$(aditional.btn).addClass(clase);
			$(aditional.spinner).removeClass(clase);
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
			showMessage(msg);
		    },
		    complete: function(solicitudAJAX,estatus) {
			$(aditional.btn).removeClass(clase);
			$(aditional.spinner).addClass(clase)
		    }
		    };
	    r = $.extend(r, connections.users.login);
	    r.data=params;
	    $.ajax(r);
    };
    var isValid = function(user,pass){
	valid = false;
	if((user=='prueba')&&(pass=='prueba')){
	    valid=true;
	}
	return valid;
    }
    var events=function(){
	$("#btnLoging").click(function(){
	    var user = validator.removeSpaces($("#user").val());
	    var pass = validator.removeSpaces($("#pass").val());
	    var params = {user:user,password:pass};
	    loginRequest(params,{btn:'#btnLoging',spinner:'.spinner'});
	    var item = $(".Foot .msgError").hide();
	    
	});
	$("#pass").bind("keypress", function(evt) {
			var otherresult = 12;
			if(window.event != undefined){
				otherresult = window.event.keyCode;
			}
			
			var charCode = (evt.which) ? evt.which : otherresult;  
			if (charCode==13) {
			    $("#btnLoging").click();
			}else{
				return true;
			}
											
	});
	
    };
    var sessionActive = function(){
	var data = amplify.store( 'dataLoggingProbosque' );
	var startLoggin=false;
	if ((typeof data != "undefined")&&(data!=null)) {
	    startLoggin=true;
	    	if (data.program == 9 && data.activity == 2) {
				
					window.location.assign("produccion_planta.html");
				}else 
				 if(data.program == 15) 
  				       {
					
					window.location.assign("../SIFEM/maderable/index.html");
					
					}		
	            else			
     			if(data.program == 9 && data.activity == 1){
					
					window.location.assign("semilla.html");
				}
			else{
	    structure.init(data);
	     }   
	}
	return startLoggin;
    };
    var init = function(){

	$( document ).ready(function() {
	    if(!sessionActive()){
	    	buildStructure();
		events();
	    }
	    
	});
    }
    return {
	    init:init
    }
    
});