// jitGrunt assumes that task names correspond to modules
// as <task> => grunt-<task>. This isn't always true, so mappings are required
var jitGruntMappings = {
    swig: "grunt-swig-templates",
    cmq: "grunt-combine-media-queries"
};

module.exports = function(grunt) {
    "use strict";

    require("time-grunt")(grunt);
    require('load-grunt-config')(grunt, {
        jitGrunt: {
            staticMappings: jitGruntMappings
        }
    });

    grunt.registerTask("base", ["swig", "jshint", "sass", "webpack", ]);
    grunt.registerTask("build", ["base", "copy"]);
    grunt.registerTask("dist", ["clean", "base", "prettify", "cmq", "postcss", "copy:fonts", "imagemin", "webp"]);
    grunt.registerTask("run", "connect");
    grunt.registerTask("deploy", ["dist", "surge"]);

};
