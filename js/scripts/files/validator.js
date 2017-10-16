define([], function(){
    var removeEmptySpaces=function(a){
	return a.replace(/\s+/, "");
    }
    var isEmpty=function(a){
	var response = true;
	var text = removeEmptySpaces(a);
	if (text.length>0) {
	    response = false;
	}
	return response;
    }

    var isPhone=function(p){
	var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
	return re.test(p);
    }
    var isEmail = function(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
    }
    var getRol=function(a){
	var rol='';
	switch (parseInt(a)) {
	    case 1: rol="Administrador";
		break;
	    case 2: rol="Coordinador de Gabinete SIAP";
		break;
	    case 3: rol="Coordinador Estatal";
		break;
	    case 4: rol="Supervisor";
		break;
	    case 5: rol="Brigadista";
		break;
	    case 6: rol="Ejecutivo";
		break;

	}
	return rol;
    };
    var replaceTags=function(text){
	var response = '';
	var rex = /(<([^>]+)>)/ig;
	response = text.replace(rex , "");
	return response.replace(/["']/g, "");
    };
    var getColorStatus = function(status){
	var color ='';
	switch (status) {
	    case 1:
		color="#007836";
		break;
	    case 2:
		color="#C5002E";
		break;
	    case 3:
		color="#FFB620";
		break;
	    case 4:
		color="#C5002E";
		break;
	    case 5:
		color="#C5002E";
		break;
	}
	return color;
    }
    function getRoman (num) {
	if (!+num)
		return false;
	var	digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
		       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
		       "","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "",
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
    }
    var getFormatNumber = function(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		//alert('antes');
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
    var convertToHtml = function(texto){
		
		var ta=document.createElement("textarea");
		ta.innerHTML=texto.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		return ta.value;
    }
    var getFormatHtml = function(chain){
		
		chain = chain.replace(/[\u00E1]/gi,'a');
		chain = chain.replace(/[\u00E9]/gi,'e');
		chain = chain.replace(/[\u00ED]/gi,'i');
		chain = chain.replace(/[\u00F3]/gi,'o');
		chain = chain.replace(/[\u00FA]/gi,'u');
		chain = chain.replace(/[\u00F1]/gi,'n');
		
		chain = chain.replace(/[\u00C1]/gi,'A');
		chain = chain.replace(/[\u00C9]/gi,'E');
		chain = chain.replace(/[\u00CD]/gi,'I');
		chain = chain.replace(/[\u00D3]/gi,'O');
		chain = chain.replace(/[\u00DA]/gi,'U');
		chain = chain.replace(/[\u00D1]/gi,'N');
		
		return chain;
    }
    var removeAcent = function(chain){
		
		chain = chain.replace(/[\u00E1]/gi,'a');
		chain = chain.replace(/[\u00E9]/gi,'e');
		chain = chain.replace(/[\u00ED]/gi,'i');
		chain = chain.replace(/[\u00F3]/gi,'o');
		chain = chain.replace(/[\u00FA]/gi,'u');
		
		chain = chain.replace(/[\u00C1]/gi,'A');
		chain = chain.replace(/[\u00C9]/gi,'E');
		chain = chain.replace(/[\u00CD]/gi,'I');
		chain = chain.replace(/[\u00D3]/gi,'O');
		chain = chain.replace(/[\u00DA]/gi,'U');
		
		
		return chain;
    }
    //Edgar R. Zamora
    var escapeHtml=function(text) {
  var map = {
    'á': '&aacute;',
    'é': '&eacute;',
    'í': '&iacute;',
    'ó': '&oacute;',
    "ú": '&uacute;',
    'Á': '&aacute;',
    'É': '&aacute;',
    'Í': '&aacute;',
    'Ó': '&aacute;',
    'Ú': '&aacute;'
  };
 //Edgar R. Zamora
  return text.replace(/[áéíóúÁÉÍÓÚ]/g, function(m) { return map[m]; });
}
    var getNotificacionLogin=function(role,phase){
	var msg='';
	if (phase==0) {
	    switch (role) {
		case 2:
		    msg='Solicite a su administrador que finalize la creaci&oacute;n de usuarios principales';
		    break;
		case 3:
		    msg="Solicite a su Cordinador SIAP que finalize sus tareas pendientes"
		    break;
		case 4:
		    msg="Solicite a su Cordinador Estatal que finalize sus tareas pendientes"
		    break;
	    }
	}
	return msg;
    }
    
   /**
	 * @function isNumberSuperficie
	 * @param  {int} numero - Numero ingresado
	 * @return  boolean
	 */
    let isNumberSuperficie = (numero) =>  /^[0-9]{0,5}(\.[0-9]{1,3})*$/.test(numero);


   /**
	 * @function numberVolumenPrograma1
	 * @param  {int} numero - Numero ingresado en volumenes
	 * @return  boolean
	 */
    let numberVolumenPrograma1 = (numero) =>  /^[0-9]{0,7}(\.[0-9]{1,3})*$/.test(numero);


    /**
	 * @function isNumNoICPropuestaPrograma1
	 * @param  {int} numero - Numero ingresado en el campo IC propuesta
	 * @return  boolean
	 */
    let isNumNoICPropuestaPrograma1 = (numero) =>  /^[0-9]{0,3}(\.[0-9]{1,2})*$/.test(numero);


    /**
	 * @function isNumICAPrograma1
	 * @param  {int} numero - Numero ingresado en el campo ICA
	 * @return  boolean
	 */
    let isNumICAPrograma1 = (numero) =>  /^[0-9]{0,3}(\.[0-9]{1,3})*$/.test(numero);

    return {
    	 //Edgar R. Zamora
    	escapeHtml:escapeHtml,
    	 //Edgar R. Zamora
	    removeSpaces:removeEmptySpaces,
	    isEmpty:isEmpty,
	    isPhone:isPhone,
	    isEmail:isEmail,
	    getRol:getRol,
	    getColorStatus:getColorStatus,
	    getFormatHtml:getFormatHtml,
	    removeAcent:removeAcent,
	    getNotificacionLogin:getNotificacionLogin,
	    getRoman:getRoman,
	    getFormatNumber:getFormatNumber,
	    convertToHtml:convertToHtml,
	    replaceTags:replaceTags,
	    isNumNoDec: isNumberSuperficie,
	    isNumNoVolumen: numberVolumenPrograma1,
	    isNumNoIC: isNumNoICPropuestaPrograma1,
	    isNumICA: isNumICAPrograma1
    }
    
});