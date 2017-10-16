define(["map","validator","restrictions","connections","infomodules"], function(map,validator,restrictions,connections,infomodules){
    
    var getHeader=function(a){
	var r = restrictions.roles;
	var chain = ''+
		    '<div class="section_header">'+
	    		'<div class="section_logo"><div class="template_logo"></div></div>'+
			'<div class="section_logo_probosque"><div class="template_logo_probosque"></div></div>'+
			'<div class="section_title_system">Sistema de Informaci&oacute;n Forestal del Estado de M&eacute;xico </div>'+
			'<div class="section_info_user">'+
			    '<div class="option_logout"></div>'+
			    '<div class="divisor"></div>'+
			    '<div class="user_connected"></div>'+
			'</div>'+
		    '</div>';
	return chain;
    };
    
    var getFoot=function(){
	var chain=''+
	'<div style="position:absolute;left:0px;right:0px;top:5px;bottom:5px;border-top:3px solid #fff;border-bottom:3px solid #fff;">'+
	    '<div style="float: left;  top: 4px;  position: relative;  margin-left: 15px;  color: #fff;  font-size: 105%;">'+
		'<div>Gobierno del Estado de M&eacute;xico</div>'+
		'<div>Secretar&iacute;a del Medio Ambiente</div>'+
		'<div>Protectora de Bosques</div>'+
	    '</div>'+
	    '<div style="float: left;  top: 4px;  position: relative;  margin-left: 40px;color:#fff;font-size:105%;">'+
		'<div>Rancho Guadalupe S/N Conjunto SEDAGRO</div>'+
		'<div>Metepec, Tel&eacute;fonos: (722) 2710779 2710789</div>'+
		'<div>E-mail: probosque.apo@edomex.gob.mx</div>'+
	    '</div>'+
	'</div>';
	return chain;
	
    };
    var getIncendio = function(){
	var chain=''+
	    '<div style="position:absolute;top:20px;left:20px;">'+
		'<div class="template_incendio incendio"></div>'+
	    '</div>'+
	    '<div style="position: absolute;  top: 41px;  font-size: 140%;  left: 101px;  color: #7B7D7F;  font-weight: bold;">Incendio Forestal</div>'+
	    '<div style="position:absolute;top:70px;right:10px; color: #7B7D7F;" align="center">'+
		'<div class="template_incendio marker"></div>'+
		'<div>Ubicar</div>'+
	    '</div>'+
	    '<div style="position:absolute;top:135px;left:5px;right:5px;color:#7B7D7F;font-size:120%;">'+
		'<div style="width:100%;border-bottom:1px solid #BBBBBB;height: 20px;margin-bottom:10px">'+
		    '<div style="display:inline-block;  position: absolute;  left: 20px;font-weight:bold;">Folio</div>'+
		    '<div style="display:inline-block;  position: absolute;  left: 100px;">IF1501001</div>'+
		'</div>'+
		'<div style="width:100%;border-bottom:1px solid #BBBBBB;height: 20px;margin-bottom:10px">'+
		    '<div style="display:inline-block;  position: absolute;  left: 20px;font-weight:bold;">Fecha</div>'+
		    '<div style="display:inline-block;  position: absolute;  left: 100px;">Sabado, 01/03/2005</div>'+
		'</div>'+
		'<div style="width:100%;border-bottom:1px solid #BBBBBB;height: 20px;margin-bottom:10px">'+
		    '<div style="display:inline-block;  position: absolute;  left: 20px;font-weight:bold;">Causa</div>'+
		    '<div style="display:inline-block;  position: absolute;  left: 100px;">Actividades agropecuarias</div>'+
		'</div>'+
		'<div style="width:100%;border-bottom:1px solid #BBBBBB;height: 20px;margin-bottom:10px">'+
		    '<div style="display:inline-block;  position: absolute;  left: 20px;font-weight:bold;">Region</div>'+
		    '<div style="display:inline-block;  position: absolute;  left: 100px;">Atlacomulco</div>'+
		'</div>'+
		'<div style="width:100%;border-bottom:1px solid #BBBBBB;height: 20px;margin-bottom:10px">'+
		    '<div style="display:inline-block;  position: absolute;  left: 20px;font-weight:bold;">Municipio</div>'+
		    '<div style="display:inline-block;  position: absolute;  left: 100px;">Acambay</div>'+
		'</div>'+
		'<div style="width:100%;border-bottom:1px solid #BBBBBB;height: 20px;margin-bottom:10px">'+
		    '<div style="display:inline-block;  position: absolute;  left: 20px;font-weight:bold;">Predio</div>'+
		    '<div style="display:inline-block;  position: absolute;  left: 100px;">Santa Maria</div>'+
		'</div>'+
	    '</div>';
	    return chain;
    };
    var getMobilePanel=function(){
	var chain =''+
	'<nav class="navMobile">'+
	    '<ul class="right hide-on-med-and-down">'+
	      
	    '</ul>'+
	    '<ul id="slide-out" class="side-nav">'+
	      '<li><a href="#!">First Sidebar Link</a></li>'+
	      '<li><a href="#!">Second Sidebar Link</a></li>'+
	    '</ul>'+
	    '<a href="#!" class="brand-logo">Logo</a>'+
	    '<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>'+
	'</nav>';
	return chain;
    }
    var builStructure = function(a){
	var showProgram=false;
	var sectionProgram='';
	if (a.roleId!=1) {
	    showProgram=true;
	    sectionProgram = '<div class="app_program"><div class="label" id="Titulodeprograma">'+a.programname+'</div></div>';
	}
	var chain=  '<div class="app_header">'+getHeader(a)+'</div>'+
		    getMobilePanel()+
		    '<div class="app_faces"></div>'+
		    sectionProgram+
		    '<div class="app_content '+((showProgram)?' withProgram ':'')+'">'+
			'<div class="app_mapping">'+
			    '<div class="app_left_section">'+getIncendio()+'</div>'+
			    '<div class="app_left_section_information"></div>'+
			    '<div class="app_left_section_notification"></div>'+
			    '<div class="app_left_section_layers"></div>'+
			    '<div class="app_right_section">'+
				'<div class="app_center_section">'+
				    '<div id="map" class="app_map_section"></div>'+
				    '<div class="app_tool_section"></div>'+
				'</div>'+
				'<div id="app_bottom_section" class="app_bottom_section" >'+
				    //'<div class="barGraph"></div>'+
				    //'<div class="pieGraph"></div>'+
				'</div>'+
			    '</div>'+
			'</div>'+
			'<div class="app_users">'+
			'</div>'+
			'<div class="app_predios">'+
			'</div>'+
			'<div class="app_semilla">'+
			'</div>'+
			'<div class="app_planta">'+
			'</div>'+
			'<div class="app_ventanilla">'+
			'</div>'+
			'<div class="app_welcome">'+
			'</div>'+
			'<div class="app_tabular">'+
			'</div>'+
			'<div class="app_executive">'+
			'</div>'+
            '<div class="app_inform">'+
			'</div>'+
		    '</div>'+
		    '<div class="app_foot">'+getFoot()+'</div>';
		    
	$('body').html(chain);
	$('.app_left_section_information').hide();
	$('.app_left_section_notification').hide();
	//$('.app_left_section_layers').hide();
	$('.app_tabular,.app_users,.app_welcome,.app_mapping,.app_executive').hide();
    };
    var showUserActive=function(data){
	var chain = data.username+'<br>'+'('+validator.getRol(data.roleId)+')';
	$(".tooltip_user_active .user_label").html(chain);
    };
    var logoutRequest = function(){
	    amplify.store( 'dataLoggingProbosque',null );
	    reloadPage();
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
	    var r= {
		    success:function(json,estatus){
			var valid=false;
			if (json){
			    if (json.response.success){
				valid=true;
				amplify.store( 'dataLoggingProbosque',null );
				reloadPage();
			    }else{
				msg=json.response.message;
			    }
			}
			if (!valid) {
			    
			}
			
		    },
		    beforeSend: function(solicitudAJAX) {
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
		    },
		    complete: function(solicitudAJAX,estatus) {
		    }
	    };
	    r = $.extend(r, connections.users.logout);
	    $.ajax(r);
    };
    var clockUserRequest = null;
    defineClockUserRequest = function(params){
                    clearClockUserRequest();
                    clockUserRequest = setInterval(function(){
                              getUsersRequest(params);
                    },120000);
    };
    var clearClockUserRequest = function(){
                    if(clockUserRequest){
                              clearInterval(clockUserRequest);
                    }        
    };
    var getUsersRequest = function(p){
	    
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
	    var r= {
		    success:function(json,estatus){
			if (json){
			    if (json.response.sucessfull){
				var userActive = json.data.active;
				if (userActive.id == loggedUser.id) {
				    userActive.parent = null;
				}
				if ((userActive.roleId==1) &&(loggedUser.roleId==6)) {
				    userActive = loggedUser;
				    userActive.parent = null;
				}
				var params = {
				    data:{
					active:userActive,
					users:json.data.users
				    },
				    userActive:loggedUser
				};
			    
				$('.app_left_section').userbranch(params);
				
			    }else{
				msg=json.response.message;
			    }
			}
			
		    },
		    beforeSend: function(solicitudAJAX) {
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
		    },
		    complete: function(solicitudAJAX,estatus) {
		    }
	    };

	    r = $.extend(r, connections.workTeams.actions);
	    r.data = p;
	    $.ajax(r);
    };
    var clockToolTipUser=null;
    var clockUser=function(){
	var tooltip = $(".tooltip_user_active");
	clearClockUser();
	clockToolTipUser = setTimeout(function(){
	    tooltip.hide();
	    $("#user_active").attr('status','close');
	},3000);
    }
    var clearClockUser = function(){
	
	if (clockToolTipUser) {
	    clearTimeout(clockToolTipUser);
	}
    }
    var clockToolTipMenu =null;
    var clockMenu=function(){
	var tooltipm = $(".tooltip_menu_options");
	clearClockMenu();
	clockToolTipMenu = setTimeout(function(){
	    tooltipm.hide();
	    $(".menu_options").attr('status','close');
	
	},3000);
    }
    var clearClockMenu = function(){
	
	if (clockToolTipMenu) {
	    clearTimeout(clockToolTipMenu);
	}
    }
    var events=function(a){
	$.datepicker.regional['es'] = {
                                        closeText: 'Cerrar',
                                        prevText: '<Ant',
                                        nextText: 'Sig>',
                                        currentText: 'Hoy',
                                        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                                        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                                        dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
                                        dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
                                        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
                                        weekHeader: 'Sm',
                                        dateFormat: 'dd/mm/yy',
                                        firstDay: 1,
                                        isRTL: false,
                                        showMonthAfterYear: false,
                                        yearSuffix: ''
                              };
        $.datepicker.setDefaults($.datepicker.regional['es']);
	$(".user_connected").html(a.username);
	$(".option_logout").html('Cerrar sesi&oacute;n');
	var tooltip = $(".tooltip_user_active");
	var tooltipm = $(".tooltip_menu_options");
	tooltipm.hide();
	tooltip.hide();
	$("#user_active").click(function(){
	    clearClockMenu();
	    clearClockUser();
	    tooltipm.hide();
	    $(".menu_options").attr('status','close');
	    var status = $(this).attr('status');
	    if (status=='close') {
		tooltip.show();
		clockUser();
		status='open';
	    }else{
		tooltip.hide();
		status='close';
	    }
	    $(this).attr('status',status);
	});
	tooltip.mouseenter(function(){
	   
	   clearClockUser();
	}).mouseleave(function(){
	    clockUser();
	});
	
	$(".menu_options").click(function(){
	    clearClockMenu();
	    clearClockUser();
	    tooltip.hide();
	    $("#user_active").attr('status','close');
	    var status = $(this).attr('status');
	    if (status=='close') {
		tooltipm.show();
		status='open';
		clockMenu();
	    }else{
		tooltipm.hide();
		status='close';
	    }
	    $(this).attr('status',status);
	});
	
	tooltipm.mouseenter(function(){
	   clearClockMenu();
	}).mouseleave(function(){
	    
	    clockMenu();
	});
	
	$(".option_logout").click(function(){
	    logoutRequest();
	});
	/*
	var eventClear=function(){
	    $(".custom_baseLayer").hide();
	    $(".custom_overlays").hide();
	}
	*/
	$("#admin_layers").click(function(){
	    /*
	    var params={
		data:{
		    title:'Capas',
		    buttons:[
			{label:'Base',event:function(id){
			    eventClear();
			    $("#"+id).baseLayers();
			}},
			{label:'Vectorial',event:function(id){
			    eventClear();
			    $("#"+id).overlays();
			}}
		    ],
		    firstActive:true
		}
	    };
	    $("#admin_layers").customMenu(params);
	    */
	    $('.app_left_section_layers').layers({userActive:a});
	});
	$('#head_alets').click(function(){
	    $('.app_left_section_notification').Actions('show');
	});
	showUserActive(a);
	addEventsToAdminWorkTeams(a);
	addEventsToAdminUsers(a);
	$(".app_tool_section").tools({userActive:a});
	var userId ='';
	var userId=(loggedUser.roleId==6)?1:a.id ;
	var Modules = (a.program==9)? infomodules.roles['r'+a.roleId+'p'+a.program+a.activity]: (a.program==1 && loggedUser.roleId==5)? infomodules.roles['r'+a.roleId+'p'+a.program]:infomodules.roles['r'+a.roleId];
	$(".app_faces").modules({data:{modules:Modules,user:a,active:null}});
	createInitWelcome(a);
	//map.init(a);
	buildMeasureTool();
	
    }
    var createInitWelcome = function(user){
	var chain=  '<div class="title">Bienvenido '+user.firstname +' '+user.lastname+'</div>';
		    
	$(".app_welcome").show().addClass('app_selected');
	$(".app_welcome").html(chain);
    }
    var buildMeasureTool=function(){
	var chain='<div class="measure_tool"></div>';
	$("#map").append(chain);
	$(".measure_tool").hide();
    };
    var addEventsToAdminWorkTeams=function(user){
	
	$("#admon_teamworks").click(function(){
	   	var params={
		    data:{
			title:'Grupos de trabajo',
			buttons:[
			    {label:'Base',event:function(id){
				$("#"+id).workTeams({data:{user:user}});
			    }}
			],
			firstActive:true,
			showbuttons:false
		    }
		};
	    $(this).customMenu(params);
	});
    }
    var addEventsToAdminUsers=function(user){
	var eventClear=function(){
	    $(".background_form").css('display','none');
	    $(".custom_search").css('display','none');
	}
	$("#admon_users").click(function(){
	    var status = false;
	    var enabled = $(this).attr('enabled');
	    var process = 'administration';
	    var text = 'Finalizar administraci&oacute;n de usuarios';
	    if (enabled=="false") {
		status= true;
		process='consult';
		text = 'Administraci&oacute;n de usuarios';
	    }
	    $('#admon_users .label').html(text);
	    $('.app_left_section').userbranch({process:process});
	    $(this).attr('enabled',status);
	    
	    
	    
	});
    }
    var reloadPage=function(){
	location.reload();
    };
    var init = function(a){
	builStructure(a);
	events(a);
	
    };
    var loggedUser;
    return {
	    init:function(userActive){
		loggedUser = userActive;
		$( document ).ready(function() {
		    init(userActive);
		});
	    },
	    reloadPage:reloadPage,
	    getUsersRequest:getUsersRequest,
	    defineClockUserRequest:defineClockUserRequest,
	    clearClockUserRequest:clearClockUserRequest,
	    getFoot:getFoot
    }
    
});