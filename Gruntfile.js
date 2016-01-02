module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bump: {
            options: {
                push: false,
                pushTo: "origin",
                files: [
                    "package.json"
                ]
            }
        },
        jshint: {
            files: {
                src: [ "./generators/**/*.js" ]
            },
            options: {
                globals: {
                    require: true,
                    node: true,
                    console: true,
                    module: true,
                    alert: true,
                    document: true,
                    window: true
                }
            }
        },
        jsbeautifier : {
            src: [ "./generators/templates/**/*.js" ]
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    grunt.registerTask("deploy", ["jshint", "bump", "jsbeautifier"]);

};
