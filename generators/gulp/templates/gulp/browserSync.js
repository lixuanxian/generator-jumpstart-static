// Load general packages
var gulp = require('gulp'),
    pkg = require('../package.json'),
    path = require('path');

// Browser-Sync plugins
var browserSync = require('browser-sync');

gulp.task('serve', gulp.parallel(function() {
    gulp.watch(path.join(pkg.src.scss, '**/*.scss'), gulp.parallel('styles'));
    gulp.watch(path.join(pkg.paths.templates, '**/*.{swig,json,html}'), gulp.parallel('templates'));
    gulp.watch(path.join(pkg.src.js, '**/*.js'), gulp.parallel('scripts'));
}, function() {
    browserSync({
        server: {
            baseDir: [pkg.paths.build],
            middleware: []
        },

        files: [pkg.build.css + '**/*.css', pkg.build.js + '**/*.js', pkg.paths.build + '**/*.html']
    });
}));

// Aliases
gulp.task('watch', gulp.parallel(['serve']));
gulp.task('connect', gulp.parallel(['serve']));
gulp.task('run', gulp.parallel(['serve']));
