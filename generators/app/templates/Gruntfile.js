"use strict";

module.exports = function(grunt) {

    require("time-grunt")(grunt);
    require('load-grunt-config')(grunt);

    grunt.registerTask("base", ["swig", "jshint", "sass", "webpack",]);
    grunt.registerTask("build", ["base", "copy"]);
    grunt.registerTask("dist", ["clean", "base", "prettify", "cmq", "postcss", "copy:fonts", "imagemin", "webp"]);
    grunt.registerTask("run", "connect");
    grunt.registerTask("deploy", ["dist", "surge"]);

};
