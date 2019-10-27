var gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var concat = require('gulp-concat');

gulp.task('styles', function() {
  return pipeline(
    gulp.src('./hell/assets/*.css'),
    cleanCSS(),
    concat('style.min.css'),
    gulp.dest('./hell/assets/min')
  );
});

gulp.task('scripts', function () {
  return pipeline(
    gulp.src('./hell/assets/*.js'),
    uglify(),
    concat('script.min.js'),
    gulp.dest('./hell/assets/min')
  );
});

gulp.task('build', gulp.series('scripts', 'styles'))
