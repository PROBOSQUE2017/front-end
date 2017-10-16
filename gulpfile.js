/*
 * Dependencias
 *
 */
var gulp = require('gulp');
var replace = require('gulp-replace');
var  debug = require('gulp-debug');
var merge = require('merge-stream');

gulp.task('test', function() {
    var carpetaJSConfig =  gulp.src(['./js/config/*.js'])
                    	.pipe(debug({ verbose: true }))
                    		.pipe(replace('187.188.96.133:8080', '187.188.96.133:8082'))
                    			.pipe(gulp.dest('./js/config/'));

    var carpetaScriptsFiles =  gulp.src(['./js/scripts/files/*.js'])
                    	.pipe(debug({ verbose: true }))
                    		.pipe(replace('187.188.96.133:8080', '187.188.96.133:8082'))
                    			.pipe(gulp.dest('./js/scripts/files/'));

    var carpetaJS =  gulp.src(['./js/*.js'])
                    	.pipe(debug({ verbose: true }))
                    		.pipe(replace('187.188.96.133:8080', '187.188.96.133:8082'))
                    			.pipe(gulp.dest('./js/'));

    return merge(carpetaJSConfig, carpetaScriptsFiles, carpetaJS);
   

    });