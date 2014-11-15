var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var path = ['start.frag','./jquery.numberMask.js','end.frag'];
var dest = './dist/';

var karma = require("karma").server;
var karmaConfig = require.resolve("./conf/karma.conf");

var testFiles = [
    'client/todo.js',
    'client/todo.util.js',
    'client/todo.App.js',
    'test/client/*.js'
];

gulp.task('test', function(done) {
    var config = {};
    config = {
        reporters: ["coverage", "dots"/*, "coveralls"*/]/*,
        coverageReporter: {
            type: "lcovonly",
            dir: "coverage/"
        }*/
    };

    config.configFile = karmaConfig;
    karma.start(config, done);
});


gulp.task('compress', function () {
    return gulp.src(path)
        .pipe(concat('jquery.numberMask.js'))
        .pipe(gulp.dest(dest))
        .pipe(sourcemaps.init())
        .pipe(concat('jquery.numberMask.min.js'))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest))
});

gulp.task('scripts', ['compress'], function () {
    gulp.src(['./lib/jquery/dist/jquery.min.js', './dist/jquery.numberMask.min.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['compress', 'scripts']);