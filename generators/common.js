var _ = require("lodash"),
    glob = require("glob-all");

var filterForExcluded = function(targets, context) {
    if ( !!context.options.exclude ) {
        var toExclude = _.map(context.options.exclude, function(item) { return context.templatePath(item) } );
        return _.pullAll(targets, toExclude);
    } else {
        return targets;
    }
}

module.exports.templateStuff = function(context, files, params) {
    context.log("Templating files...");

    var slug = require("slug");
    var slugName = slug(context.appname);

    // TODO : Implement filter system on templates
    // Currently the template targets are not absolute
    // files = filterForExcluded(files, context);

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

    var to_copy = _.flatten(files.map(
        function(el){ return glob.sync( context.templatePath(el) ); }
    ));

    to_copy = filterForExcluded(to_copy, context);

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
