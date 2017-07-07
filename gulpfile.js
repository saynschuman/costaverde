var gulp = require("gulp"),
  sass = require("gulp-sass"),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  include = require("gulp-include"),
  imagemin = require("gulp-imagemin"),
  rimraf = require("rimraf"),
  prefixer = require("gulp-autoprefixer"),
  watch = require("gulp-watch");

var path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/',
        libs: 'dist/libs/'
    },
    src: {
        html: 'src/html/*.html',
        js: 'src/js/main.js',
        scss: 'src/scss/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    watch: {
        html: 'src/html/**/*.html',
        js: 'src/js/**/*.js',
        scss: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    clean: './dist'
};

gulp.task('connect', function() {
  connect.server({
    root: 'dist/',
    port: 8080,
    livereload: true
  });
});

gulp.task( "html:build", function() {
    return gulp.src( path.src.html )
        .pipe(include())
        .pipe( gulp.dest( path.dist.html ) )
        .pipe(connect.reload());
});

gulp.task( "css:build", function() {
  return gulp.src( path.src.scss )
    .pipe( sass().on("error", sass.logError ) )
    .pipe( prefixer('last 14 version', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4') )
    .pipe( gulp.dest( path.dist.css ) )
    .pipe(connect.reload());
});

gulp.task("js:build", function() {
  return gulp.src( path.src.js )
    .pipe( gulp.dest( path.dist.js ) )
    .pipe(connect.reload());
});

gulp.task("img:build", function() {
  return gulp.src( path.src.img )
    // .pipe( imagemin() )    // not use when develop
    .pipe( gulp.dest( path.dist.img ) )
    .pipe(connect.reload());
});

gulp.task( "fonts:build", function() {
  return gulp.src( path.src.fonts )
    .pipe( gulp.dest( path.dist.fonts ) )
    .pipe(connect.reload());
});

gulp.task( "libs:build", function() {
  return gulp.src( path.src.libs )
    .pipe( gulp.dest( path.dist.libs ) )
});

gulp.task( "clean", function( cb ) {
  rimraf(path.clean, cb );
});

gulp.task("build",
  [ "libs:build",
    "html:build",
    "css:build",
    "js:build",
    "fonts:build",
    "img:build" ]);

gulp.task("watch", function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.scss], function(event, cb) {
    gulp.start('css:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('img:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task("default", [ "build", "connect", "watch" ]);
