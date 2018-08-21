var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');
var minifyHtml = require("gulp-minify-html");
var ngHtml2Js = require("gulp-ng-html2js");
var uglify = require('gulp-uglify');



var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('dev', ['allJs', 'allCss', 'allHtml']);

gulp.task('allJs', function (done) {
  gulp.src(['./www/js/**/*.js','./www/directives/**/*.js','./www/src/*/**/*.js', './www/config.js'])
    .pipe(ngAnnotate({ add: true }))
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./www/dist/'))
    .on('end', done);
});

gulp.task('allCss', function (done) {
  gulp.src([ './www/css/**/*.css', './www/directives/**/*.css','./www/src/**/*.css'])
    .pipe(concat('all.css'))
    .pipe(rename({suffix: '.min'}))   //rename压缩后的文件
    .pipe(autoprefixer({
      browsers: ['IOS >= 8', 'Android >= 4.2'],
      cascade: true,
      remove: true
    }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./www/dist/'))
    .on('end', done);
});

gulp.task('allHtml', function (done) {
  gulp.src(['./www/templates/**/*.html', './www/directives/**/*.html',"./www/src/**/*.html"])
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: "templates",
      prefix: "src/"
    }))
    .pipe(concat("templates.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./www/dist/"))
    .on('end', done);
});


gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
