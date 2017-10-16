var datos={};
define(["structure","connections","validator"], function(structure,connections,validator){
    var title = 'Sistema Inform&aacute;tico para la Actualizaci&oacute;n del Padr&oacute;n Cafetalero';
    var buildStructure = function(){
	var chain='<div class="Loging">'+
		    '<div class="Header"></div>'+
		    '<div class="Section">'+
			'<div class="Nav"><div class="Bg"></div><h1 class="Title">'+title+'</h1></div>'+
			'<div class="Foot" align="center">'+
			    '<input id="user" class="textInput" type="text" value="" placeholder="Usuario"/>'+
			    '<input id="pass" class="textInput" type="password" value="" placeholder="Contrase&ntilde;a"/>'+
			    '<div align="center">'+
				'<div class="spinner hidden"></div>'+
				'<button id="btnLoging" class="textButton">Aceptar</button>'+
			    '</div>'+
			    '<div class="msgError">'+
				'<label></label>'+
			    '</div>'+
			'</div>'+
		    '</div>'+
		'</div>';
	$("body").html(chain);
	$(".msgError").hide();
	
	$('body').append('<div style="position:aboslute;top:200px;left:200px;z-index:3000"><div class="PopupElement top">informacion</div></div>');
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
			    if (json.response.success){
				valid=true;
				/*
				$.ajaxSetup({
				    xhrFields: {
					withCredentials: true
				    },
				    crossDomain: true,
				    username:params.username,
				    password:params.password
				});
				*/
				structure.init(json.data.userInfo);
				
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
	    r.data=JSON.stringify(params);
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
	    var params = {username:user,password:pass};
	    loginRequest(params,{btn:'#btnLoging',spinner:'.spinner'});
	    var item = $(".Foot .msgError").hide();
	    
	});
	
	
    };
    var init = function(){
	$( document ).ready(function() {
	    buildStructure();
	    events();
	});
	
    }
    return {
	    init:init
    }
    
});