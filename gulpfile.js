/*
 * Dependencias
 *
 */
var gulp = require('gulp');
var replace = require('gulp-replace');
var  debug = require('gulp-debug');

gulp.task('test', function() {
            console.log('estamos transformando')
            return gulp.src(['./*.js'])
                .pipe(debug({ verbose: true }))
                    .pipe(replace('187.188.96.133:8080', '187.188.96.133:8082'))
                    .pipe(gulp.dest('./'));

                });