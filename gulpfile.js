'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence');

gulp.task('js', function() {
    return gulp.src([
            'src/module.js',
            '.tmp/templates.js',
            'src/*.js'
        ])
        .pipe($.ngAnnotate())
        .pipe($.concat('angular-bootstrap-simple-dialog.js'))
        .pipe(gulp.dest('dist'))
        .pipe($.uglify())
        .pipe($.rename('angular-bootstrap-simple-dialog.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('template', function() {
    return gulp.src('src/*.html')
        .pipe($.angularTemplatecache('templates.js', {
            module: 'lz.simple-dialog.tpls',
            standalone: true
        }))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('build', function() {
    runSequence('template', 'js');
});
