/**
 * @file gulpfile.js Contiene las taras para automatizar los procesos del proyecto
 * @Ivan Tadeo Huerta 
 */

var gulp = require('gulp');
var replace = require('gulp-replace');
var  debug = require('gulp-debug');
var merge = require('merge-stream');


var origen = '187.188.96.133';
var destino = 'localhost';



gulp.task('redireccion', function() {
    console.log('Cambiando direcciones');
    var carpetaJSConfig =  gulp.src(['./js/config/*.js'])
                    	.pipe(debug({ verbose: true }))
                    		.pipe(replace(origen, destino))
                    			.pipe(gulp.dest('./js/config/'));

    var carpetaScriptsFiles =  gulp.src(['./js/scripts/files/*.js'])
                    	.pipe(debug({ verbose: true }))
                    		.pipe(replace(origen, destino))
                    			.pipe(gulp.dest('./js/scripts/files/'));

    var carpetaJS =  gulp.src(['./js/*.js'])
                    	.pipe(debug({ verbose: true }))
                    		.pipe(replace(origen, destino))
                    			.pipe(gulp.dest('./js/'));
    

    var carpetaMaderable =  gulp.src(['./maderable/js/myScript/*.js'])
                        .pipe(debug({ verbose: true }))
                            .pipe(replace(origen, destino))
                                .pipe(gulp.dest('./maderable/js/myScript/'));

    var carpetaReporteador =  gulp.src(['./reporteador/js/*.js'])
                        .pipe(debug({ verbose: true }))
                            .pipe(replace(origen, destino))
                                .pipe(gulp.dest('./reporteador/js/'));
    

    var carpetaToolMpas =  gulp.src(['./toolMaps/*.*'])
                        .pipe(debug({ verbose: true }))
                            .pipe(replace(origen, destino))
                                .pipe(gulp.dest('./toolMaps/'));
    
    var carpetaToolMpasJs =  gulp.src(['./toolMaps/js/*.js'])
                        .pipe(debug({ verbose: true }))
                            .pipe(replace(origen, destino))
                                .pipe(gulp.dest('./toolMaps/js/'));

    var carpetaModules =  gulp.src(['./js/scripts/widgets/modules/*.js'])
                        .pipe(debug({ verbose: true }))
                            .pipe(replace(origen, destino))
                                .pipe(gulp.dest('./js/scripts/widgets/modules/'));



    //return merge(carpetaJSConfig, carpetaScriptsFiles, carpetaJS, carpetaMaderable, carpetaReporteador,carpetaToolMpas, carpetaToolMpasJs);
   

    });