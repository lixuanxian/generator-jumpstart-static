var gulp = require('gulp'),
    pkg = require('./package.json'),
    environments = require('gulp-environments'),
    del = require('del'),
    path = require('path'),
    requireDir = require('require-dir');

// Loading gulp tasks in to the registry
requireDir('./gulp/', { recurse: true });

// Basic task and alias
gulp.task('default', gulp.parallel('scripts', 'styles', 'fonts', 'images', 'templates'));

// Watch task
gulp.task('watch', function(){
    gulp.watch(path.join(pkg.src.js, '**/*.js'), gulp.parallel('scripts'));
    gulp.watch(path.join(pkg.src.scss, '**/*.scss'), gulp.parallel('styles'));
    gulp.watch(path.join(pkg.paths.templates, '**/*.{swig,json,html}'), gulp.parallel('templates'));
});

// Clean task
gulp.task('clean', function(done){
    return del([pkg.paths.build], done);
});

// Deploy
gulp.task('deploy', function() {
    var surge = require('gulp-surge');

    return surge({
        project: pkg.paths.build,
        domain: ''
    })
});
