module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // Compass to handle CSS compilation and concatanation
        compass: {
            dist: {
                options: {
                    config: "config.rb"
                }
            }
        },
        // Copy fonts and images to build output directory
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "<%%= pkg.src.images %>",
                        src: "**/*",
                        dest: "<%%= pkg.build.images %>"
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: "<%%= pkg.src.fonts %>",
                        src: ["**/*", "!**/*.json"],
                        dest: "<%%= pkg.build.fonts %>"
                    }
                ]
            }
        },
        /**
        Watch tasks
          -  .js files
          -  .scss files
          -  All images in the image src directory
          -  All font files in the font src directory
          -  Template files
        */
        watch: {
            js: {
                files: ["<%%= jshint.files %>"],
                tasks: ["jshint", "concat"]
            },
            scss: {
                files: ["<%%= pkg.src.scss %>**/**/*.scss"],
                tasks: ["compass", "cmq"]
            },
            images: {
                files: [
                    "<%%= pkg.src.images %>**/*.{jpeg,jpg,gif,png,svg}"
                ],
                tasks: ["copy:images"]
            },
            fonts: {
                files: [
                    "<%%= pkg.src.fonts %>**/*.{eot,woff,svg,ttf}"
                ],
                tasks: ["copy:fonts"]
            },
            <% if (ember) { %>
            templates: {
                files: [
                    "<%%= pkg.paths.templates %>**/*.hbs",
                    "index.html",
                ],
                tasks: ["emberTemplates", "concat"]
            }
            <% } else { %>
            templates: {
                files: [
                    "<%%= pkg.paths.templates %>**/*.swig",
                    "<%%= pkg.templates.data %>**/*.{json,yml}"
                ],
                tasks: ["assemble"]
            }
            <% } %>
        },
        /**
        General
          -  Clean build folder
          -  Javascript documentation
          -  Run local server
        */
        clean: [
            "<%%= pkg.paths.build %>",
        ],
        docco: {
            debug: {
                src: ["<%%= pkg.src.js %>**/*.js"],
                options: {
                    output: "docs/js/"
                }
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    <% if (!ember) { %>base: "<%%= pkg.paths.build %>"<% } %>
                }
            }
        },
        /**
        Templating
        */
        <% if (ember) { %>
        emberTemplates: {
            compile: {
                options: {
                    templateBasePath: "<%%= pkg.paths.templates %>"
                },
                files: {
                    "<%%= pkg.paths.tmp %>template.js": ["<%%= pkg.paths.templates %>**/*.hbs",] 
                }
            }
        },
        <% } else { %>
        assemble : {
            options: {
                engine: "swig",
                data: ["<%%= pkg.templates.data %>*.{json,yml}"],
                assets: "<%%= pkg.paths.build %>",
                partials: "<%%= pkg.templates.partials %>*.swig",
                layoutdir: "<%%= pkg.templates.layouts %>",
                layoutext: ".swig",
                layout: "base",
                flatten: true
            },
            pages: {
                src: ["<%%= pkg.templates.pages %>*.swig"],
                dest: "<%%= pkg.paths.build %>"
            }
        },
        <% } %>
        /*
        Performance tasks
          -  Javascript linting
          -  Javascript concatenation
          -  Javascript uglification and minimisation
          -  CSS Minification
          -  Combine media queries in css
          -  Image optimisation
          -  Create WebP format images
          -  HTML prettify (if an Assemble project)
        */
        jshint: {
            files: [
                "<%%= pkg.src.js %>**/*.js"
            ],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    alert: true,
                    document: true,
                    window: true
                }
            }
        },
        concat: {
            options: {
                separator: ";\n"
            },
            dist: {
                src: [
                    <% if (jquery || foundation) { %>"<%%= pkg.paths.bower %>jquery/dist/jquery.min.js",<% } %>
                    <% if (lodash) { %>"<%%= pkg.paths.bower %>lodash/dist/lodash.min.js",<% } %>
                    <% if (moment) { %>"<%%= pkg.paths.bower %>moment/min/moment.min.js",<% } %>
                    <% if (ember) { %>"<%%= pkg.paths.bower %>handlebars/handlebars.js",<% } %>
                    <% if (ember) { %>"<%%= pkg.paths.bower %>ember/ember.js",<% } %>
                    <% if (ember) { %>"<%%= pkg.paths.tmp %>template.js",<% } %>
                    "<%%= pkg.src.js %>**/*.js"
                ],
                dest: "<%%= pkg.build.js %>app.js"
            }
        },
        uglify: {
            options: {
                banner: "/*! <%%= pkg.name %> <%%= grunt.template.today('dd-mm-yyyy') %> */\n"
            },
            dist: {
                files: {
                    "<%%= pkg.build.js %>app.js": ["<%%= concat.dist.dest %>"],
                }
            },
            dev: {
                files: {
                    <% if (modernizr || foundation) { %>"<%%= pkg.build.js %>modernizr.min.js": ["<%%= pkg.paths.bower %>modernizr/modernizr.js"]<% } %>
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: "<%%= pkg.build.css %>",
                src: ["*.css", ],
                dest: "<%%= pkg.build.css %>",
                ext: ".css"
            }
        },
        cmq: {
            dist: {
                files: {
                    "<%%= pkg.dest.css %>": ["<%%= pkg.dest.css %>**/*.css"]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "<%%= pkg.src.images %>",
                    src: ["**/*.{png,jpg,gif,svg}"],
                    dest: "<%%= pkg.build.images %>"
                }]
            }
        },
        webp: {
            files: {
                expand: true,
                cwd: "<%%= pkg.dest.images %>",
                src: "**/*.png",
                dest: "<%%= pkg.dest.images %>"
            },
            options: {
                binpath: require("webp-bin").path,
                preset: "default",
                verbose: true,
                quality: 80,
                alphaQuality: 80,
                compressionMethod: 6,
                segments: 4,
                psnr: 42,
                sns: 50,
                filterStrength: 40,
                filterSharpness: 3,
                simpleFilter: true,
                partitionLimit: 50,
                analysisPass: 6,
                multiThreading: true,
                lowMemory: false,
                alphaMethod: 0,
                alphaFilter: "best",
                alphaCleanup: true,
                noAlpha: false,
                lossless: false
            }
        },
        <% if (!ember) { %>
        prettify: {
            files: {
                expand: true,
                cwd: "<%%= pkg.paths.build %>",
                ext: ".html",
                src: ["*.html"],
                dest: "<%%= pkg.paths.build %>"
            }
        },
        <% } %>
    });


    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*", "assemble"]});

    grunt.registerTask("build", [<% if (ember) { %>"emberTemplates"<% } else { %>"assemble"<% } %>, "jshint", "concat", "uglify:dev", "compass", "copy"]);
    grunt.registerTask("dist", ["clean", <% if (ember) { %>"emberTemplates"<% } else { %>"assemble", "prettify"<% } %>, "jshint", "concat", "uglify", "compass", "cmq", "cssmin", "copy:fonts", "imagemin", "webp"]);
    grunt.registerTask("run", "connect");

};
