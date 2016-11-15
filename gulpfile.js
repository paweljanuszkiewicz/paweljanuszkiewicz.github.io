var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

function errorLog (error) {
  console.error.bind(error);
  this.emit('end');
}
gulp.task('sass', function () {
  return sass('sass/*.sass')
    .on('error', errorLog)
    .pipe(prefix('last 4 versions'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function () {
  return gulp.src('*.pug')
    .pipe(pug())
    .on('error', errorLog)
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(browserSync.stream());
});

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: ".",
        open: false
    });
});

gulp.task('watch', function () {
  gulp.watch('sass/*.sass', ['sass']);
  gulp.watch('*.pug', ['pug']);
  gulp.watch('en/*.pug', ['pug']);
  gulp.watch('js/*.js', ['js']);
});

gulp.task('default', ['sass', 'pug', 'js', 'serve', 'watch']);
