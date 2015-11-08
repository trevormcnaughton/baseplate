var gulp = require('gulp');
var bourbon = require('node-bourbon');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var config = {
  src: {
    dist: './app/public_dist',
    css: {
      main: './app/public/css/main.scss',
      all: './app/public/css/**/*'
    },
    html: {
      main: './app/public/html/index.html',
      all: './app/public/html/**/*.html'
    },
    js: {
      main: './app/public/js/main.js',
      all: './app/public/js/**/*.js'
    }
  }
}

function errorAlert(error){
	notify.onError({title: "SCSS Error", message: "Check your terminal", sound: "Sosumi"})(error); //Error Notification
	console.log(error.toString());//Prints Error to Console
	this.emit("end"); //End function
};

gulp.task('css', function () {
  gulp.src(config.src.css.all)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sass({
      includePaths: bourbon.includePaths
    }))
    .pipe(gulp.dest(config.src.dist + '/css'));
});

gulp.task('html', function () {
  gulp.src(config.src.html.all)
    .pipe(gulp.dest(config.src.dist))
});

gulp.task('js', function () {
  return gulp.src(config.src.js.all)
    .pipe(gulp.dest(config.src.dist + '/js'))
});

gulp.task('connect', function() {
  connect.server({
    root: config.src.dist,
    port: 3099,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(config.src.css.all, ['css']);
  gulp.watch(config.src.html.all, ['html']);
  gulp.watch(config.src.js.all, ['js']);
})

gulp.task('build', ['css', 'html', 'js']);
gulp.task('default', ['build','connect','watch']);
