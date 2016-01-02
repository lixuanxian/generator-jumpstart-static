var generators = require("yeoman-generator"),
    common = require("../common");

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

        var to_glob = [
            // Find root level files
            ".gitignore",
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

        var to_template = [
            "./bower.json",
            "./src/templates/data/meta.json",
            "./src/templates/layouts/base.html"
        ];

        common.templateStuff(_this, to_template);

        // Build the Gruntfile which sits as a subgenerator
        this.log("Building the Gruntfile");
        this.composeWith("jumpstart-static:gruntfile", {});

    },
    install: function() {
        this.log("Installing dependencies");
        
        // Install Node packages
        this.npmInstall();

        // Install Bower packages
        this.bowerInstall([
            "bourbon#^4.0.1",
            "scut#^1.2.1",
            "reset-scss"
        ], { "save": true });

    },
    end: function() {
        /**
        Do an initial Grunt build
        */
        this.log("Doing an initial build");
        this.spawnCommand("grunt", ["build"]);

    }
});
