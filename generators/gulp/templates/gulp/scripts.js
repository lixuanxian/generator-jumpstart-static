// Common imports
var gulp = require('gulp'),
    pkg = require('../package.json'),
    environments = require('gulp-environments'),
    path = require('path'),
    gutil = require("gulp-util");

// Scripts specific packages
var modernizr = require('gulp-modernizr'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

// Scripts variables
var src = path.join(pkg.src.js, '**/*.{js,jsx}'),
    srcPath = path.join(process.cwd(), pkg.src.js),
    dest = path.join(process.cwd(), pkg.build.js);

// Webpack configuration
var webpackSettings = {
    debug: environments.development(),
    entry: {
        app: path.join(srcPath, 'app.js'),
        // Each additional bundle you require (e.g. index page js, or contact page js)
        // should be added here and referenced as a script tag in the corresponding template
        // index: path.join(srcPath, 'index.js'),
    },
    output: {
        path: dest,
        publicPath: '/js/',
        filename: '[name].js'
    },
    plugins: environments.production() ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', ]
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'jshint',
            exclude: /node_modules/
        }],
        loaders: [],
    },
    jshint: {}
};

if (environments.development()) {
    webpackSettings.devtool = "eval";
};

gulp.task('scripts', function(done) {
    return gulp.src(src)
        .pipe(webpackStream(webpackSettings, webpack))
        .on('error', function(error) {
            gutil.log(error.message);
            this.emit('end');
        })
        .pipe(gulp.dest(dest));
});

gulp.task('modernizr', function() {
    return gulp.src(src)
        .pipe(modernizr())
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});
