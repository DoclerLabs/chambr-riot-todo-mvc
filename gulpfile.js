var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var riot = require('gulp-riot');

var config = {
    gui: {
        standalone: 'ChambrClient',
        entryFile: './js/gui.es6',
        outputDir: './',
        outputFile: 'gui.js'
    },
    worker: {
        standalone: 'ChambrWorker',
        entryFile: './js/worker.es6',
        outputDir: './',
        outputFile: 'worker.js'
    }
}

function bundle(c) {
    return browserify(c.entryFile, {
        debug: true,
        standalone: c.standalone,
        noparse: [
            require.resolve('Chambr/Client'),
            require.resolve('Chambr/Worker'),
            require.resolve('Chambr/Decorator')
        ],
        insertGlobalVars: {
            riot: function(file, dir) {
                return 'require("riot")';
            }
        }
    })
        .transform(babelify, {
            presets: ["es2015"],
            plugins: [
                "transform-class-properties",
                "transform-object-assign",
                "syntax-decorators",
                "transform-decorators-legacy",
                "syntax-async-functions",
                "transform-regenerator",
                "transform-function-bind"
            ]
        })
        .bundle()
        .on('error', function(err) { console.log('Error: ' + err.message); })
        .pipe(source(c.outputFile))
        .pipe(gulp.dest(c.outputDir));
}

gulp.task('build-gui', function() {
    return bundle(config.gui);
});

gulp.task('build-worker', function() {
    return bundle(config.worker);
});

gulp.task('riot', function(){
    return gulp.src('./tags/*.tag')
        .pipe(riot())
        .pipe(gulp.dest('./tags/compiled'));
});

gulp.task('build', ['build-gui', 'build-worker']);
gulp.task('build-all', ['riot', 'build']);
