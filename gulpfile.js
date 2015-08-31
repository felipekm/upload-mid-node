/*global require, console*/

(function () {
    "use strict";

    var SRC_CODE    = [ './lib/*.js' ],
        gulp        = require('gulp'),
        del         = require('del'),
        jshint      = require('gulp-jshint'),
        jslint      = require('gulp-jslint'),
        concat      = require('gulp-concat'),
        uglify      = require('gulp-uglify'),
        uglify_conf = require('./uglify.conf.js'),
        path        = require('path');

    // task chain definidtions
    gulp.task('all', [ 'clean', 'test', 'build' ]);
    gulp.task('build', [ 'build:bundle', 'build:min' ]);
    gulp.task('default', [ 'all' ]);

    // CLEANING UP OLD FILES
    gulp.task('clean', function (cb) {
        del([ 'dist' ], cb);
    });

    // RUNNING AUTOMATED TESTS AND CHECKS
    gulp.task('test', [ 'hint', 'lint' ]);

    gulp.task('hint', function () {
        return gulp.src(SRC_CODE)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('lint', function () {
        return gulp.src(SRC_CODE)
            .on('error', function (error) {
                console.error(String(error));
            });
    });

    // Bundling Angular App
    gulp.task('build:bundle',  function () {
        return gulp.src(SRC_CODE)
            .pipe(concat('uploadmidnode.js'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('build:min', function () {
        return gulp.src(SRC_CODE)
            .pipe(concat('uploadmidnode.min.js'))
            .pipe(uglify(uglify_conf))
            .pipe(gulp.dest('./dist/'));
    });

}());
