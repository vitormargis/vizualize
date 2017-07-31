var env = require('dotenv')
var gulp = require('gulp')
var concat = require('gulp-concat')
var replace = require('gulp-string-replace');
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

var appPath = './app'
var scriptsPath = [
  './vendors/lodash/lodash.min.js',
  './vendors/angular/angular.js',
  './vendors/angular-ui-router/release/angular-ui-router.min.js',
  appPath + '/*.js',
  appPath + '/**/*.js'
]

var stylesPath = [
  appPath + '/styles/*.css',
  appPath + '/styles/**/*.css'
]

var indexPath = [
  appPath + '/*.html'
]

var templatesPath = [
  appPath + '/templates/*.html'
]

var imagesPath = [
  appPath + '/images/*.png',
  appPath + '/images/*.jpg',
]

gulp.task('start', ['config', 'styles', 'index', 'templates', 'images'], function() {
  browserSync.init({
    server: './dist'
  })

  gulp.watch(scriptsPath, ['scripts'])
  gulp.watch(stylesPath, ['styles'])
  gulp.watch(indexPath, ['index'])
  gulp.watch(templatesPath, ['templates'])
  gulp.watch(imagesPath, ['images'])
})

gulp.task('deploy', ['config', 'styles', 'index', 'templates', 'images'])

gulp.task('default', ['start']);

gulp.task('scripts', function() {
  return gulp.src(scriptsPath)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({ stream: true }))
});

gulp.task('config', ['scripts'], function() {
  return gulp.src('./config_example.js')
    .pipe(concat('config.js'))
    .pipe(replace(/yourAccessToken/g, '321654987'))
    .pipe(gulp.dest('./app/'))
    .pipe(reload({ stream: true }))
});

gulp.task('styles', function() {
  return gulp.src(stylesPath)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(reload({ stream: true }))
});

gulp.task('index', function() {
  return gulp.src(indexPath)
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({ stream: true }))
});

gulp.task('templates', function() {
  return gulp.src(templatesPath)
    .pipe(gulp.dest('./dist/templates'))
    .pipe(reload({ stream: true }))
});

gulp.task('images', function() {
  return gulp.src(imagesPath)
    .pipe(gulp.dest('./dist/images'))
    .pipe(reload({ stream: true }))
});
