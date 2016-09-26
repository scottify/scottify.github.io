// Paths

var csspath = './assets/stylesheets';
var jspath = './assets/javascripts';
var imgpath = './assets/images';

// Gulp dependencies

var browserSync = require('browser-sync').create();

var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    imagemin = require('gulp-imagemin');

// Browsersync

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "scottify.loc"
    })
})

// Compress less
 
gulp.task('less', function () {
    gulp.src(csspath + '/global.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'base', 'modules', 'partials') ]
    }))
    .pipe( uglifycss( {"maxLineLen": 640} ) )
    .pipe(gulp.dest(csspath + '/min/', {overwrite: true} ))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Compress js

gulp.task('js', function () {
    gulp.src(jspath + '/global.js')
    .pipe( uglify())
    .pipe(gulp.dest(jspath + '/min/', {overwrite: true} ))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Compress images

gulp.task('images', function() {
    gulp.src(imgpath + '/*')
    .pipe(imagemin())
    .pipe(gulp.dest(imgpath + '/'));
});

// Watch for changes

gulp.task('watch', ['browserSync', 'less', 'js'], function (){
    gulp.watch(csspath + '/**/*.less', ['less']);
    gulp.watch(jspath + '/global.js', ['js']);
});