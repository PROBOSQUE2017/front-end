define([], function(){
    return {
	modules:{
	    users:{
		label:'Administrar usuarios',
		sections:{
		    'new':'Agregar',
		    'consult':'Consultar',
		    'delete':'Eliminar',
		    'edit':'Editar',
		    //Ezamora 14/06/16
		    'registro':'Log del Sistema'
		    //Ezamora 14/06/16

		}
	    },
	    padron:{
	  	   label:'Padrón de Industria'
       	    },
	    meta:{
			label:'Meta Anual'
			},
	    tabular:{
		label:'M&oacute;dulo Tabular',
		sections:{
		    'new':'Agregar registro',
		    'consult':'Consultar registro',
		    'delete':'Eliminar registro',
		    'edit':'Editar registro'
		    //'report':'Reportes'
		    //'list':'Lista de Registros'
		}
	    },
	    		//Se agrega el modulo ventanilla Victor Porcayo Altamirano
			ventanilla:{
				label:'M&oacute;dulo Ventanilla',
				sections:{
					'status':'Seguimiento solicitudes',
		    		'new':'Agregar registro',
		    		'delete':'Eliminar registro',
		    		'edit':'Editar registro',
		    		'excludedDates':'Exclusión de Fechas',
		    		'resumen': 'Listado de Solicitudes'
				}
	    	},
	
	    predios:{
		label:'M&oacute;dulo de Predios',
		sections:{
		    'new':'Agregar registro',
		    'consult':'Consultar registro',
		    'delete':'Eliminar registro',
		    'edit':'Editar registro'
		    //'report':'Reportes'//,
		    //'list':'Lista de Predios'
		}
	    },
	    semilla:{
		label:'Registro de baja de semilla',
		sections:{
		    'new':'Agregar registro',
		    'consult':'Consultar registro',
		    'delete':'Eliminar registro',
		    'edit':'Editar registro'
		    //'report':'Reportes'//,
		    //'list':'Lista de Predios'
		}
	    },
	    planta:{
		label:'Registro de baja de planta',
		sections:{
		    'new':'Agregar registro',
		    'consult':'Consultar registro',
		    'delete':'Eliminar registro',
		    'edit':'Editar registro'
		    //'report':'Reportes'//,
		    //'list':'Lista de Predios'
		}
	    },
	    mapping:{
		label:'M&oacute;dulo Geogr&aacute;fico',
		sections:{
		    /*layers:'Capas',*/
		    upload:'Importar',
		    tabulate:'Lista de registros'
		}
	    },
	    executive:{
		label:'Presupuesto por Predio',
		sections:{
		    
		}
	    },
        inform:{
		label:'Informe Predial',
		sections:{
		    
		}
	    },
	    produccion:{
		label:'Produccion de Planta',
	    },
	    produccionSemilla:{
		label:'Produccion de Semilla',
	    },
	    reporteador: {
			label: 'reporteador',
			sections:{}
		},
		herramientaMapas: {
			label: 'Herramienta Cartográfica',
			sections:{}
		},
	    seccionWeb: {
			label: 'Sección Web',
			sections:{}
		},
		auditoria:{
			label: 'Auditoría',
			sections:{}
		},
	adminPredio:{
			label: 'Administrador de Predios',
			sections:{}
		}

	}, 
	roles:{
	    r1:['users','predios','herramientaMapas'],
	    r2:['tabular','meta','reporteador','herramientaMapas','seccionWeb'],
	    r3:['tabular','reporteador','herramientaMapas','seccionWeb'],
	    r4:[/*'executive',*/'inform'],
	    r8:['tabular','reporteador','herramientaMapas','seccionWeb','padron'],
	    //Se agrega el rol 7 correspondiente a ventanilla Victor Porcayo altamirano
		r5:['ventanilla','reporteador','seccionWeb'],
	    r2p91:[/*'tabular','semilla','mapping',*/ 'produccionSemilla'],
	    r2p92:[/*'tabular','planta','mapping'*/, 'produccion'],
	    r5p1:['tabular','meta','reporteador','herramientaMapas','seccionWeb','auditoria','adminPredio'],
	}
    }
    
});