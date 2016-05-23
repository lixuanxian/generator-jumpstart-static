// Load general packages
var gulp = require('gulp'),
    pkg = require('../package.json'),
    path = require('path');

// Browser-Sync plugins
var browserSync = require('browser-sync');

gulp.task('serve', function() {
    browserSync({
        server: {
          baseDir: [ pkg.paths.build ],
          middleware: []
        },

        files: [pkg.build.css + '**/*.css', pkg.build.js + '**/*.js', pkg.paths.build + '**/*.html']
    });
});

// Aliases
gulp.task('connect', gulp.parallel(['serve']));
gulp.task('run', gulp.parallel(['serve']));
