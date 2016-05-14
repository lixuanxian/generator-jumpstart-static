// Load general packages
var gulp = require('gulp'),
    pkg = require('../package.json'),
    environments = require('gulp-environments'),
    path = require('path'),
    gutil = require("gulp-util");

// Scripts specific packages
var jshint = require('gulp-jshint'),
    modernizr = require('gulp-modernizr'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    cache = require('gulp-cached');

// Scripts variables
var src = path.join(pkg.src.js, '**/*.js');
var dest = pkg.build.js;

// Webpack configuration
var webpackSettings = {
    entry: {
        app: path.join(process.cwd(), pkg.src.js, 'app.js'),
        // Each additional bundle you require (e.g. index page js, or contact page js)
        // should be added here and referenced as a script tag in the corresponding template
        // index: path.join(process.cwd(), pkg.src.js, 'index.js'),
    },
    output: {
        path: pkg.build.js,
        filename: '[name].js'
    },
    plugins: environments.production() ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [],
    resolve: {
        extensions: ['', '.js', '.jsx', ]
    },
    debug: environments.development()
};

if (environments.development()) {
    webpackSettings.devtool = "eval";
};

// Gulp tasks
gulp.task('scripts:lint', function(done) {
    return gulp.src(src)
        .pipe(cache('linted'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('scripts', gulp.series('scripts:lint', function(callback) {
    webpack(webpackSettings, function(err, stats) {
        if (err) throw new gutil.PluginError('scripts:webpack', err);
        gutil.log('scripts:webpack', stats.toString({
            colors: true
        }));
        callback();
    });
}));

gulp.task('modernizr', function() {
    return gulp.src(src)
        .pipe(modernizr())
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});

// // Watch js for change
// gulp.task('watch', function() {
//     gulp.watch(src, gulp.parallel('scripts'));
// });
