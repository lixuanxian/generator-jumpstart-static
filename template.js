'use strict';

// Basic template description.
exports.description = 'Scaffolds a new project with GruntJS, SASS, Swig and Bourbon/Neat';

// Template-specific notes to be displayed after question prompts.
// exports.after = ''

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({}, [
        // Prompt for these values.
        // init.prompt('name'),
    ], function(err, props) {
        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // Empty folders won't be copied over so make them here
        grunt.file.mkdir('src/images');
        grunt.file.mkdir('src/fonts');
        grunt.file.mkdir('build');

        done();
    });
};
