requirejs.config({
            urlArgs: "version=" + (new Date()).getTime(),
            baseUrl: 'js/',
            waitSeconds: 0,
            paths: {
		config:'config/init'
	    }
    });
    
require(['config'],function () {
	    var v = 'version='+projectVersion;
	    requirejs.config({
			urlArgs: v,
			paths: {
                                    libs:'libs/init',
				    scripts:'scripts/init'
			},
			shim: {
				    scripts:{
					deps:['libs']   
				    }
			}
	    });
	    require(['scripts'],function (scripts) {});
    });

