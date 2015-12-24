
var generators = require("yeoman-generator"),
    _ = require("lodash"),
    slug = require("slug"),
    glob = require("glob-all"),
    mkdirp = require('mkdirp');

/**
Main setup function
*/
module.exports = generators.Base.extend({
    prompting: function() {
        var done = this.async();
        var prompts = [];

        prompts.push({
            type: "input",
            name: "name",
            message: "What is the name of your project?",
            default: this.appname
        });

        this.prompt(
            prompts,
            function(answers) {
                // Basic app settings
                this.appName = answers.name;
                this.slugName = slug(this.appName);

                // Define contextual variables for the whole build script.
                this.ctxVars = {
                    name: this.appName,
                    slugName: this.slugName,
                    build_location: "./build/",
                    src_location: "./src/"
                };

                // Resolve async
                done();
            }.bind(this)
        );
    },
    scaffoldFolders: function() {
        var _this = this;

        // Make the required directories
        this.log("Creating required directories...");
        var directories_to_make = [
            "grunt",
            "src/js",
            "src/scss",
            "src/img",
            "src/fonts",
            "src/templates/data",
            "src/templates/includes",
            "src/templates/layouts",
            "src/templates/pages",
        ];

        for (var i = 0; i < directories_to_make.length; i++) {
            mkdirp(directories_to_make[i]);
        }
    },
    writing: function() {
        var _this = this;

        // Basic copy operations
        this.log("Copying files...");

        var to_copy = _.flatten([
            // Find root level files
            ".gitignore",
            ".bowerrc",
            "./Gruntfile.js",
            // Find all scss files
            "./src/scss/**/*.scss",
            // Find all js files
            "./src/js/**/*.js",
            // Find all grunt tasks
            "./grunt/**/*.{js,yml}",
            // Copy in all the html and data files
            // EXCEPT base.html and meta.json, which require templating
            "./src/templates/**/!(meta|base).{html,json}"
        ].map(function(el){ return  glob.sync(_this.templatePath(el)); }));

        /**
        The globbing returns absolute paths to the source (generator template) files.
        You need to effectively subtract this root source folder (sourceRoot),
        from the last bit of the filepath (d:/.../generator/templates/<file>.<ext> -> <file>.<ext>).
        That is then resolved against detinationPath to get the absolute target destination.
        */
        var sourceRoot = _this.sourceRoot().replace(/\\/g,'/').replace(/\/?$/, '/');

        to_copy.forEach(function(t){
            var d = _this.destinationPath(t.replace(sourceRoot, ""));
            _this.fs.copy(t, d);
        });

        // Files requiring templating
        this.log("Templating files...");
        
        var to_template = [
            "./bower.json",
            "./package.json",
            "./src/templates/data/meta.json",
            "./src/templates/layouts/base.html"
        ];

        to_template.forEach(function(targ){
            _this.fs.copyTpl(
                _this.templatePath(targ),
                _this.destinationPath(targ),
                _this.ctxVars
            );
        });

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
