module.exports.templateStuff = function(context, files, params) {
    context.log("Templating files...");

    var slug = require("slug");
    var slugName = slug(context.appname);

    files.forEach(function(targ){
        context.fs.copyTpl(
            context.templatePath(targ),
            context.destinationPath(targ),
            {
                name: context.appname,
                slugName: slugName,
                build_location: "./build/",
                src_location: "./src/"
            }
        );
    });

};

module.exports.copyStuff = function(context, files) {
    context.log("Copying files...");

    var _ = require("lodash"),
        glob = require("glob-all");

    var to_copy = _.flatten(files.map(
        function(el){ return glob.sync( context.templatePath(el) ); }
    ));

    /**
    The globbing returns absolute paths to the source (generator template) files.
    You need to effectively subtract this root source folder (sourceRoot),
    from the last bit of the filepath (d:/.../generator/templates/<file>.<ext> -> <file>.<ext>).
    That is then resolved against detinationPath to get the absolute target destination.
    */
    var sourceRoot = context.sourceRoot().replace(/\\/g,'/').replace(/\/?$/, '/');

    to_copy.forEach(function(t){
        var d = context.destinationPath(t.replace(sourceRoot, ""));
        context.fs.copy(t, d);
    });
};

module.exports.directoryStuff = function(directories) {
    var mkdirp = require("mkdirp");

    for (var i = 0; i < directories.length; i++) {
        mkdirp(directories[i]);
    }
};

// module.exports.promptStuff = function(context, callback) {

//     var prompts = [{
//         type: "input",
//         name: "name",
//         message: "What is the name of your project?",
//         default: context.appname
//     }];

//     this.prompt(
//         prompts,
//         function(answers) {
//             // Basic app settings
//             this.appName = answers.name;
//             this.slugName = slug(this.appName);

//             // Define contextual variables for the whole build script.
//             this.ctxVars = {
//                 name: this.appName,
//                 slugName: this.slugName,
//                 build_location: "./build/",
//                 src_location: "./src/"
//             };

//             // Resolve async
//             done();
//         }.bind(this)
//     );

// }