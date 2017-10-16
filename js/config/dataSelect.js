define([], function(){
    return {
	privileges:[
	    {label:'Agregar',value:2},
	    {label:'Consultar',value:1},
	    {label:'Eliminar',value:4},
	    {label:'Generar reportes',value:5},
	    {label:'Imprimir',value:6},
	    {label:'Modificar',value:3},
	],
	privacy:[
	    {label:'Alta',value:3},
	    {label:'Baja',value:1},
	    {label:'Media',value:2},
	    {label:'Ninguna',value:0}
	],
	activity:[
		{label:'Oficialia de Partes',value:1,program:15},
		{label:'Abogado',value:2,program:15},
		{label:'Coordinador',value:3,program:15},
		{label:'Colecta de Semilla',value:1,program:9},
		{label:'Producci&oacute;n de Planta',value:2,program:9},
		{label:'Incendios Forestales',value:3,program:7},
		{label:'Actividades Preventivas',value:4,program:7}
	],
	program:[
		{label:'Estad&iacute;stica de Predios con Autorizaciones para el Aprovechamiento de Recursos Forestales Maderables',value:1},
		{label:'Programa de Asistencia T&eacute;cnica a la Producci&oacute;n Forestal',value:2},
		{label:'Programa de Reforestaci&oacute;n y Restauraci&oacute;n Integral de Microcuencas',value:3},
		{label:'Programa de Conservaci&oacute;n y Acondicionamiento de Suelos Forestales',value:4},
		{label:'Programa de Reconversi&oacute;n Productiva (Plantaciones Forestales Comerciales)',value:5},
		{label:'Programa de Sanidad Forestal',value:6},
		{label:'Sistema de Informaci&oacute;n de Incendios Forestales',value:7},
		{label:'Programa de Inspecci&oacute;n y Vigilancia Forestal',value:8},
		{label:'Programa de Producci&oacute;n de Planta',value:9},
		{label:'Programa para el Pago por Servicios Ambientales Hidrol&oacute;gicos del Estado de M&eacute;xico',value:10},
		{label:'Proyectos Productivos en &Aacute;reas Forestales',value:11},
		{label:'Sitios de Muestreo para Monitoreo de las &Aacute;reas Forestales',value:12},
		{label:'Desarrollo de la Industria Forestal y Comercializaci&oacute;n Forestal',value:13},
		{label:'Ventanilla',value:14},
		{label:'Júridico Probosque',value:15}
	],
	
		
	roleId:[
	    {label:'Normal',value:2},
	    {label:'Restringido',value:3},
	    {label:'Ejecutivo',value:4}
	],
	data:{
	    privileges:{
		'p2':'Agregar',
		'p1':'Consultar',
		'p4':'Eliminar',
		'p5':'Generar reportes',
		'p6':'Imprimir',
		'p3':'Modificar',
	    },
	    privacy:{
		'p3':'Alta',
		'p1':'Baja',
		'p2':'Media',
		'p0':'Ninguna'
	    },
	    activity:{
		    'p1':'Colecta de Semilla',
		    'p2':'Producci&oacute;n de Planta',
		    'p3':'Incendios Forestales',
		    'p4':'Actividades Preventivas',
		    'p5':'Oficialia de Partes',
		    'p6':'Abogado',
		    'p7':'Coordinador'
		   },

program:{
		'p1': 'Estad&iacute;stica de Predios con Autorizaciones para el Aprovechamiento de Recursos Forestales Maderables',
		'p2': 'Programa de Asistencia T&eacute;cnica a la Producci&oacute;n Forestal',
		'p3': 'Programa de Reforestaci&oacute;n y Restauraci&oacute;n Integral de Microcuencas',
		'p4': 'Programa de Conservaci&oacute;n y Acondicionamiento de Suelos Forestales',
		'p5': 'Programa de Reconversi&oacute;n Productiva (Plantaciones Forestales Comerciales)',
		'p6': 'Programa de Sanidad Forestal',
		'p7': 'Sistema de Informaci&oacute;n de Incendios Forestales',
		'p8': 'Programa de Inspecci&oacute;n y Vigilancia Forestal',
		'p9': 'Programa de Producci&oacute;n de Planta',
		'p10': 'Programa para el Pago por Servicios Ambientales Hidrol&oacute;gicos del Estado de M&eacute;xico',
		'p11': 'Proyectos Productivos en &Aacute;reas Forestales',
		'p12': 'Sitios de Muestreo para Monitoreo de las &Aacute;reas Forestales',
		'p13': 'Desarrollo de la Industria Forestal y Comercializaci&oacute;n Forestal',
		'p14': 'Ventanilla',
		'p15': 'Júridico Probosque'
	    },
	   roleId:{
		'p2':'Normal',
		'p3':'Restringido',
		'p4':'Ejecutivo'
	    }
	}
    }
    
});