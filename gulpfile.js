var gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
 
gulp.task('styles', function() {
  return gulp.src('./hell/assets/*.css')
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./hell/assets/min'));
});

gulp.task('scripts', function () {
  return pipeline(
    gulp.src('./hell/assets/*.js'),
    uglify(),
    rename('script.min.js'),
    gulp.dest('./hell/assets/min')
  );
});

gulp.task('build', gulp.series('scripts', 'styles'))
