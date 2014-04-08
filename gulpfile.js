var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


var path = './jquery.numberMask.js';
var dest = './dist/';


gulp.task('compress', function() {
    gulp.src(path)
        .pipe(uglify({outSourceMap: true,preserveComments:'some'}))
        .pipe(gulp.dest(dest))
});

gulp.task('scripts', function() {
    gulp.src(['./lib/jquery/dist/jquery.min.js', './dist/jquery.numberMask.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['compress','scripts']);