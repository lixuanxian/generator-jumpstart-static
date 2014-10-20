module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copyto: {
            release: {
                files: [
                    {
                        cwd: "",
                        src: ["**/*"],
                        dest: "<%= pkg.paths.release %>",
                        expand: true,
                        dot: true
                    }
                ],
                options: {
                    ignore: [
                        "node_modules/**/*",
                        "Gruntfile.js",
                        "*.sublime-project",
                        "*.sublime-workspace"
                    ]
                }
            }
        },
        bump: {
            options: {
                push: false,
                commit: false,
                createTag: false,
                files: [
                    "package.json"
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('patch', ['bump:patch', 'copyto:release',]);
    grunt.registerTask('minor', ['bump:minor', 'copyto:release',]);
    grunt.registerTask('major', ['bump:major', 'copyto:release',]);

};
