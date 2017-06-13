/*jslint node: true */
"use strict";


// basic configurations
var paths = {
  rootURL: 'localhost:8080',
  sass: 'styles/**/*.scss',
  js: '../theme/js/*.js',
  JSdeployment: '../deployment/web/js',
  CSSdeployment: '../deployment/web/styles/css',
  CSStheme: '../theme/styles/css'
};

var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var cleanCSS      = require('gulp-clean-css');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {
    browserSync.init({
      //port: 21,
      proxy: paths.rootURL
    });
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
    gulp.watch("../*.html").on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())

    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'IE >= 8', 'Firefox >= 28'],
      cascade: false
    }))

    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.CSStheme))
    .pipe(gulp.dest(paths.CSSdeployment))
    .pipe(browserSync.stream());
});


// Export updated js to deployment
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.JSdeployment))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
