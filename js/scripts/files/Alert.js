define(["connections","validator"], function(connections,validator){
    var data = amplify.store('dataLoggingProbosque');
        /*
    * @function errorMultiRegistro
    * @param {String} mensaje. Mensaje que se mostrará al usuario
    * @param {String }textobtn. Texto del boton
    */

    var errorMultiRegistro=function(params){
    	let content = params.messages;
    	let buttons = params.buttons;

    	if($(".custom_alert").length>0)$(".custom_alert").remove();
		let templateString = '<div class="custom_alert '+((params.clase)?params.clase:'')+'">'+
			'<div class="custom_alert_veil"></div>'+
			'<div class="message">'+
				'<div class="header '+params.type+'"><div class="label">'+params.title+'</div></div>'+
				'<div class="content" align="center">'+
				    '<b>'+content+'</b>'+
				    '<div class="buttons" align="center">'+
						  getButtonsSubtable(params)
				    '</div>'+
				'</div>'+
			'</div>'+
		    '</div>';

		   $('body').append(templateString);

    };

    /*
     * Fin function errorMultiRegistro
     */

   /*
    * @Description
    * Evento para cerrar la notificacion de error en
    *  multiRegistros
    */

    $('body').on('click','.custom_alert .errorMultiregistro', function(){
    	$('.custom_alert').remove()
    });

    /*
     * Fin event
     */

   /*
    * @function eliminarMultiregistro
    * @param {String} mensaje. Mensaje que se mostrará al usuario
    * @param {String }textobtn. Texto del boton
    */

    var eliminarMultiregistro=function(params){
    	let content = params.messages;
    	let buttons = params.buttons;
    	
    	if($(".custom_alert").length>0)$(".custom_alert").remove();
		let templateString = '<div class="custom_alert '+((params.clase)?params.clase:'')+'">'+
			'<div class="custom_alert_veil"></div>'+
			'<div class="message">'+
				'<div class="header '+params.type+'"><div class="label">'+params.title+'</div></div>'+
				'<div class="content" align="center">'+
				    '<b>'+content+'</b>'+
				    '<div class="buttons" align="center">'+
						  getButtonsSubtableEliminar(params)
				    '</div>'+
				'</div>'+
			'</div>'+
		    '</div>';

		   $('body').append(templateString);

		   eventEliminar(params);

    };

    /*
     * Fin function errorMultiRegistro
     */

   /*
    * @function advertenciaFolio
    * @param {String} mensaje. Mensaje que se mostrará al usuario
    * @param {String }textobtn. Texto del boton
    */

    var advertenciaFolio=function(params){
		let content = params.messages;
		let info = params.info;
		let info2 = params.info2;
    	let buttons = params.buttons;
    	
    	if($(".custom_alert").length>0)$(".custom_alert").remove();
		let templateString = '<div class="custom_alert bg-warning text-white'+((params.clase)?params.clase:'')+'">'+
			'<div class="custom_alert_veil"></div>'+
			'<div class="message">'+
				'<div class="header '+params.type+'" style="background-color:#D68910"><div class="label">'+params.title+'</div></div>'+
				'<div class="content" align="center">'+
					'<h6><b>'+content+'</b></h6>'+
					'<p>'+info+'</p>'+
					'<br><p>'+info2+'</p>'+
				    '<div class="buttons" align="center">'+
						getButtonsTableFolio(params)
				    '</div>'+
				'</div>'+
			'</div>'+
		    '</div>';

		   $('body').append(templateString);

		   eventEliminar(params);

    };

    /*
     * Fin function errorMultiRegistro
     */

	/*
	 * @function eventEliminar
	 * @param {Object} params. Boton con el evento para eliminar
	 */
	var eventEliminar = function(params) {
	    
	    if (params.buttons[0]) {
	        $(".custom_alert button:first").click(function() {
	            if (params.buttons[0].event) {
	                params.buttons[0].event();
	            }
	        });
	    }

	}
	/*
	 * Fin 
	 */

    /*
     * @function getButtonsSubtableEliminar
     * @param {Object} params. Botones que serán mostrados
     *
     */
    var getButtonsSubtableEliminar = function(params) {
        var buttons = params.buttons;
        var chain = '';
        if (buttons[0]) {
            chain +=  '<button class="textButton textButton_error eliminarOk">'+buttons[0].label+'</button>';

        }
        if (buttons[1]) {
           chain +=  '<button class="textButton errorMultiregistro" style="background-color:white; color:black">'+buttons[1].label+'</button>';
        }
        return chain;
    };
    /*
     * Fin seccion 
     */

    /*
     * @function getButtonsTableFolio
     * @param {Object} params. Botones que serán mostrados
     *
     */
    var getButtonsTableFolio = function(params) {
        var buttons = params.buttons;
        var chain = '';
        if (buttons[0]) {
            chain +=  '<button class="textButton eliminarOk" style="background-color:#D68910">'+buttons[0].label+'</button>';

        }
        if (buttons[1]) {
           chain +=  '<button class="textButton errorMultiregistro" style="background-color:white; color:black">'+buttons[1].label+'</button>';
        }
        return chain;
    };
    /*
     * Fin seccion 
     */

    /*
     * @function getButtonsSubtable
     * @param {Object} params. Botones que serán mostrados
     *
     */
    var getButtonsSubtable = function(params) {
        var buttons = params.buttons;
        var chain = '';
        if (buttons[0]) {
            chain +=  '<button class="textButton textButton_error errorMultiregistro">'+buttons[0].label+'</button>';

        }
        if (buttons[1]) {
           chain +=  '<button class="textButton errorMultiregistro" style="background-color:white; color:black">'+buttons[1].label+'</button>';
        }
        return chain;
    };
    /*
     * Fin seccion 
     */

    var show=function(params){
	buildAlert(params);
	event(params);
    };
    var getButtons =function(params){
	var buttons = params.buttons;
	var chain='';
	    if (buttons[0]) {
		chain+='<button class="textButton textButton_'+params.type+'">'+buttons[0].label+'</button>';
					
	    }
	    if (buttons[1]) {
		chain+='<button class="textButton textButton_'+params.type+'">'+buttons[1].label+'</button>';
	    }
	return chain;
    };
    var buildAlert=function(params){
	var a = '';
	var msgs = params.messages;
	for(var x in msgs){
	    var i = msgs[x];
	    a+='<p>'+i+'</p>';
	}
	var content = (params.content)?params.content:'';
	
    var chain = '<div class="custom_alert '+((params.clase)?params.clase:'')+'">'+
			'<div class="custom_alert_veil"></div>'+
			'<div class="message">'+
				'<div class="header '+params.type+'"><div class="label">'+params.title+'</div></div>'+
				'<div class="content">'+
				    a+
				    content+
				    '<div class="buttons" align="center">'+
					getButtons(params)+
				    '</div>'+
				'</div>'+
			'</div>'+
		    '</div>';
	hide();
	$('body').append(chain);
    };
    var hide = function(clase){
	if (clase) {
	    $("."+clase).remove();
	}else{
	    $(".custom_alert").remove();
	    $("#custom_multirecords").remove();
	}
    }
    var event = function(params){
        var data = amplify.store('dataLoggingProbosque');
	if (params.buttons[0]) {
	    $( ".custom_alert button:first" ).click(function(){
		
		    if (params.buttons[0].event) {
			params.buttons[0].event();
		    }
		    hide();
		    //alert(JSON.stringify(data));
		    if (data.program == 13) {
		    	$("#custom_multirecords").remove();
			}

	    });
	}
	if (params.buttons[1]) {
	    $( ".custom_alert button:last" ).click(function(){
		
		    if (params.buttons[1].event) {
			params.buttons[1].event();
		    }
		    hide();
	    });
	}
    };
    return {
	    show:show,
	    error: errorMultiRegistro,
		eliminarMulti : eliminarMultiregistro,
		warningFolio: advertenciaFolio,
	    hide:hide
    }
    
});