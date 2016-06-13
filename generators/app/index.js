var generators = require("yeoman-generator"),
    common = require("../common.js");

/**
Main setup function
*/
module.exports = generators.Base.extend({
    scaffoldFolders: function() {

        // Make the required directories
        this.log("Creating required directories...");
        var to_make = [
            "src/js",
            "src/scss",
            "src/img",
            "src/fonts",
            "src/templates/data",
            "src/templates/includes",
            "src/templates/layouts",
            "src/templates/pages",
        ];

        common.directoryStuff(to_make);

    },
    writing: function() {
        var _this = this;

        // Glob and then copy all matching files
        var to_glob = [
            // Find root level files
            ".bowerrc",
            // Find all scss files
            "./src/scss/**/*.scss",
            // Find all js files
            "./src/js/**/*.js",
            // Copy in all the html and data files
            // EXCEPT base.html and meta.json, which require templating
            "./src/templates/**/!(meta|base).{html,json}"
        ];

        common.copyStuff(_this, to_glob);

        // Copy gitignore separately
        _this.copy(_this.templatePath('.tpl.gitignore'), _this.destinationPath('.gitignore'))

        var to_template = [
            "./bower.json",
            "./src/templates/data/meta.json",
            "./src/templates/layouts/base.html"
        ];

        // Some files require templating
        common.templateStuff(_this, to_template);

        // Build the Gruntfile which sits as a subgenerator
        this.log("Building the Gulpfile");
        var opts = !!_this.options.exclude ? { options: { exclude: _this.options.exclude } }: {};
        this.composeWith("jumpstart-static:gulp", opts);

    },
    install: function() {
        this.log("Installing dependencies");

        // Install Node packages
        this.npmInstall();

        // Install Bower packages
        this.bowerInstall([
            "bourbon#^4.0.1",
            "scut#^1.2.1",
            "family.scss#^1.0.6",
            "reset-scss"
        ], { "save": true });

    },
    end: function() {}
});
