re('gulp'),
    pkg = require('../package.json'),
    environments = require('gulp-environments'),
    path = require('path'),
    gutil = require("gulp-util"); // TODO: Remove if unused

// Scripts specific packages
var jshint = require('gulp-jshint'),
    modernizr = require('gulp-modernizr'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    cache = require('gulp-cached'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    webpackStream = require('webpack-stream');
// hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

// Scripts variables
var src = path.join(pkg.src.js, '**/*.{js,jsx}');
var dest = pkg.build.js;

// Webpack configuration
// TODO: Add jslinting and es6 linting
// TODO: Choost either browsersync for everything or bs proxy + dev web
// TODO: WHERE WE WERE GOING WRONG: In the watch task, don't run tasks. The tasks watch is already being done by webpack-dev-server
var webpackSettings = {
    watch: environments.development(),
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            // 'webpack-hot-middleware/client?reload=true',
            'webpack/hot/only-dev-server',
            path.join(process.cwd(), pkg.src.js, 'app.jsx')
        ],
        // app: path.join(process.cwd(), pkg.src.js, 'app.jsx'),
        // Each additional bundle you require (e.g. index page js, or contact page js)
        // should be added here and referenced as a script tag in the corresponding template
        // index: path.join(process.cwd(), pkg.src.js, 'index.js'),
    },
    output: {
        path: path.join(process.cwd(), pkg.build.js),
        publicPath: '/js/',
        filename: '[name].js'
    },
    plugins: environments.production() ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            host: 'localhost',
            port: 3000,
            // server: {
            //     baseDir: [ pkg.paths.build ]
            // },
            proxy: 'http://localhost:8080',
            files: [pkg.build.css + '**/*.css', pkg.paths.build + '**/*.html']
                // })
        }, {
            reload: false
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', ]
    },
    debug: environments.development(),
    module: {
        loaders: [{
            test: /\.jsx?/,
            exclude: /(node_modules|bower_components)/,
            include: [path.join(process.cwd(), pkg.src.js)],
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
            // loader: 'babel',
            // query: {
            // presets: ['es2015', 'react'],
            // cacheDirectory: true
            // }
        }],
    }
};

// webpackSettings.plugins.push(require("webpack-hot-middleware")(webpack(webpackSettings), {
//     log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
//   }));

if (environments.development()) {
    webpackSettings.devtool = "eval";
};

var WebpackDevServer = require("webpack-dev-server");

// TODO: Add hmr

gulp.task('devserve', function(callback) {
    new WebpackDevServer(webpack(webpackSettings), {
        publicPath: "/js/",
        contentBase: "./build/",
        // hot: true,
        // inline: true,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
})

// Gulp tasks
gulp.task('scripts:lint', function(done) {
    return gulp.src(src)
        .pipe(cache('linted'))
        // .pipe(jshint({ esversion: 6 }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('scripts', gulp.series('scripts:lint', function(done) {

    return gulp.src(src)
        .pipe(webpackStream(webpackSettings, webpack))
        .pipe(gulp.dest(dest));

    // webpack(webpackSettings, function(err, stats) {
    //     if (err) throw new gutil.PluginError('scripts:webpack', err);
    //     gutil.log('scripts:webpack', stats.toString({
    //         colors: true
    //     }));
    //     done();
    // });
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
