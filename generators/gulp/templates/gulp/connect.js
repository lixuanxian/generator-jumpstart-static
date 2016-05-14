// Load general packages
var gulp = require('gulp'),
    pkg = require('../package.json'),
    path = require('path');

// Connect plugins
var connect = require('gulp-connect');

// Copy font files to dest directory
gulp.task('serve', function() {
    connect.server({
        root: pkg.paths.build,
    });
});

// Aliases
gulp.task('connect', gulp.parallel(['serve']));
gulp.task('run', gulp.parallel(['serve']));
