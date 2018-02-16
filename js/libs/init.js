requirejs.config({
    paths: {
        Openlayers:'libs/Openlayers/OpenLayers',
        jquery:'libs/jquery/jquery',
        jnumber:'libs/jquery/jquery.number',
		jqueryui:'libs/jquery/jquery-ui',
		mousewheel: 'libs/jquery/jquery-mousewheel',
        datetimepicker:'libs/jquery/jquery.datetimepicker.full',
	fileupload_transport:'libs/upload/jquery.iframe-transport',
	fileupload:'libs/upload/jquery.fileupload',
	fileupload_widget:'libs/upload/jquery.ui.widget',
	highcharts:'libs/highcharts/highcharts',
	amplify:'libs/amplify/amplify',
	materialize:'libs/materialize/js/materialize.min'
    },
    waitSeconds: 0,
    shim: {
	
	fileupload:{
	    deps:['fileupload_transport']  
	},
	fileupload_transport:{
	    deps:['fileupload_widget']  
	},
        Openlayers: {
            deps:['materialize']
        },
	materialize:{
	    deps:['jqueryui'],  
	},
        jqueryui:{
            deps:['highcharts']
        },

    datetimepicker:
        		 	{
						deps:['jquery','mousewheel'],        		 				
        			},			
    jnumber:
        		 	{
						deps:['jquery']        		 				
        			},			

	highcharts:{
            deps:['amplify']
        },
	amplify:{
            deps:['jquery']
        }
    }
});

define(["Openlayers","fileupload","datetimepicker","jnumber"], function(){
            var v = 'version='+projectVersion;
            $.when(
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/jquery/jquery-ui.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/structure.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/map.css?'+v}).appendTo('head'),
                    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/loging.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/form.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/Alert.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/menuUsers/menuUsers.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/search/search.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/customMenu/customMenu.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/baseLayers/baseLayers.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/modules/modules.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/jquery/jquery.simple-dtpicker.css?'+v}).appendTo('head'), 
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/jquery/jquery.datetimepicker.css?'+v}).appendTo('head'), 
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/overlays/overlays.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/tools/tools.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/workTeams/workTeams.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/userbranch/userbranch.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/notification/notification.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/assignCharge/assignCharge.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/information/information.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/actions/actions.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/legend/legend.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/deliveredCharge/deliveredCharge.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/layers/layers.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/upload/upload.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/tabular/tabular.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/reports/reports.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/multiselect/multiselect.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/materialize/css/materialize.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/progress/progress.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/multirecords/multirecords.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/subtable/subtable.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/tabulate/tabulate.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/colorPicker/colorPicker.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/modal/modal.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/executiveReport/executiveReport.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/textArea/textArea.css?'+v}).appendTo('head'),
		    $.Deferred(function( deferred ){
			$( deferred.resolve );
		    })
		).done(function(){
	    });
});
