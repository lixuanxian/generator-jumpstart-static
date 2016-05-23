var generators = require("yeoman-generator"),
	common = require("../common.js");

module.exports = generators.Base.extend({

	scaffoldFolders: function() {
		var mkdirp = require('mkdirp');
		mkdirp("grunt/");
	},

	writing: function() {

		var _this = this;

		var to_glob = [
            // Find root level files
            "./Gruntfile.js",
            // Find all grunt tasks
            "./grunt/**/*.{js,yml}",
        ];
        common.copyStuff(_this, to_glob);

        var to_template = [
            "./package.json",
        ];
        common.templateStuff(_this, to_template);

	},

	install: function() {
		this.npmInstall();
	}
});
