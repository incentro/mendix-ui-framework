/*
 Gulpfile.js for theming Mendix themes. Source: https://github.com/mendix/ux-theming.git, version 1.3.2
 */

/* jshint node:true */
'use strict';

// Development folders
var developmentFolder = 'src/',
    developmentJsFolder = developmentFolder + 'js/',
    developmentStylesFolder = developmentFolder + 'styles/',
    developmentSassFolder = developmentStylesFolder + 'sass/';

// Theme folders
var themeFolder = 'theme/',
    themeJsFolder = themeFolder + 'js/',
    themeStylesFolder = themeFolder + 'styles/',
    themeCssFolder = themeStylesFolder + 'css/';

// SVG folders
var svgAssets = 'src/svg/*.svg',
    svgCssFile = 'src/styles/sass/custom/svg-symbols.scss',
    svgSvgPath = 'theme/images/svg/',
    svgDest = 'theme/images/';

// Deployment folders
var deploymentFolder = 'deployment/web/',
    deploymentJsFolder = deploymentFolder + 'js/',
    deploymentStylesFolder = deploymentFolder + 'styles/css/';

// Browsersync feature, please specify the host & port of the running project (without http://)
var proxyAddress = 'localhost:8080';

/*
 *************************************************************************
 * Don't try to edit below this line, unless you know what you are doing *
 *************************************************************************/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    debug = require('gulp-debug'),
    browserSync = require('browser-sync').create(),
    svgSymbols = require('gulp-svg-symbols'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer');

gulp.task('build-sass', function () {
  return gulp.src(developmentSassFolder + '**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(themeCssFolder));
});

gulp.task('copy-css', function () {
  return gulp.src(themeStylesFolder + '**/*.css')
    .pipe(gulp.dest(deploymentStylesFolder));
});

gulp.task('watch:sass', function () {
  gulp.watch(developmentSassFolder + '**/*.scss', ['build-sass']);
});

// JS Tasks
gulp.task('build-js', function() {
  return gulp.src(developmentJsFolder + '**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(themeJsFolder))
    .pipe(gulp.dest(deploymentJsFolder))
    .pipe(browserSync.stream())
    .pipe(debug({title: '-- Build JS: '}));
});

gulp.task('watch:development-js', function () {
  gulp.watch(developmentJsFolder + '**/*.js', ['build-js']);
});

// Gulp tasks
gulp.task('default', ['watch:sass']);
gulp.task('build', ['build-sass']);

// Browsersync
gulp.task('browsersync-sass', function () {
  return gulp.src(developmentSassFolder + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(themeCssFolder))
    .pipe(gulp.dest(deploymentStylesFolder))
    .pipe(browserSync.stream());
});

gulp.task('SVGsymbols', function () {
  return gulp.src(svgAssets)
    .pipe(svgSymbols({
      title: '%f icon',
      svgClassname: 'generali-icons',
      templates: [
        'default-svg',
        'default-css',
        'default-demo'
      ]
    }))
    .pipe(gulp.dest(svgDest));
});

gulp.task('watch:browsersync-sass', function () {
  gulp.watch(developmentSassFolder + '**/*.scss', ['browsersync-sass']);
});

gulp.task('watch:SVGactivity', function () {
  gulp.watch(svgAssets, ['SVGsymbols']);
});

gulp.task('dev', ['build-js', 'browsersync-sass', 'SVGsymbols', 'watch:browsersync-sass', 'watch:development-js'], function () {
  browserSync.init({
    proxy: proxyAddress,
    online: true,
    ws: true
  });
});
