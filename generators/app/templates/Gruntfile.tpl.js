var webpackModule = require("webpack");

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        /**
        Build tasks
          -  Compile SCSS w/ node-sass
          -  Copy static files like images and fonts
        */
        sass: {
            options: {
                includePaths: [
                    '<%%= pkg.paths.bower %>bourbon/app/assets/stylesheets/',
                    '<%%= pkg.paths.bower %>reset-scss/',
                    '<%%= pkg.paths.bower %>scut/dist/',
                ]
            },
            dist: {
                files: {
                    '<%%= pkg.build.css %>app.css': '<%%= pkg.src.scss %>app.scss',
                    '<%%= pkg.build.css %>fonts.css': '<%%= pkg.src.scss %>fonts.scss',
                }
            }
        },
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
                tasks: ["jshint", "webpack:dev"]
            },
            scss: {
                files: ["<%%= pkg.src.scss %>**/**/*.scss"],
                tasks: ["sass", "cmq"]
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
            templates: {
                files: [
                    "<%%= pkg.paths.templates %>**/*.swig",
                    "<%%= pkg.templates.data %>**/*.{json,yml}"
                ],
                tasks: ["swig"]
            }
        },
        /**
        General
          -  Clean build folder
          -  Javascript documentation
          -  Run local server
        */
        bump: {
            options: {
                push: true,
                pushTo: "origin",
                files: [
                    "package.json",
                    "bower.json"
                ],
                commitFiles: [
                    "package.json",
                    "bower.json"
                ]
            }
        },
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
                    base: "<%%= pkg.paths.build %>"
                }
            }
        },
        /**
        Templating
        */
        swig: {
            options: {
                templatePath: "<%%= pkg.paths.templates %>"
            },
            files: {
                expand: true,
                cwd: "<%%= pkg.templates.pages %>",
                ext: ".html",
                src: ["**/*.swig"],
                dest: "<%%= pkg.paths.build %>"
            },
        },
        // assemble : {
        //     options: {
        //         engine: "swig",
        //         data: ["<%%= pkg.templates.data %>*.{json,yml}"],
        //         assets: "<%%= pkg.paths.build %>",
        //         partials: "<%%= pkg.templates.partials %>*.swig",
        //         layoutdir: "<%%= pkg.templates.layouts %>",
        //         layoutext: ".swig",
        //         layout: "base",
        //         flatten: true
        //     },
        //     pages: {
        //         src: ["<%%= pkg.templates.pages %>*.swig"],
        //         dest: "<%%= pkg.paths.build %>"
        //     }
        // },
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
        webpack: {
            options: {
                entry: {
                    app: "<%%= pkg.src.js %>app.js",
                    // Each additional bundle you require (e.g. index page js, or contact page js)
                    // should be added here and referenced as a script tag in the corresponding template
                    // index: "<%%= pkg.src.js %>index.js",
                },
                output: {
                    path: "<%%= pkg.build.js %>",
                    filename: "[name].js"
                },
                plugins: []
            },
            prod: {
                plugins: [
                    new webpackModule.optimize.DedupePlugin(),
                    new webpackModule.optimize.UglifyJsPlugin()
                ]
            },
            dev: {
                debug: true
            }
        },
        postcss: {
            options: {
                processors: [
                    require("pixrem")(), // add fallbacks for rem units
                    require("autoprefixer")({browsers: "last 2 versions"}), // add vendor prefixes
                    require("cssnano")() // minify the result
                ]
            },
            dist: {
                src: "<%%= pkg.build.css %>**/*.css"
            }
        },
        cmq: {
            dist: {
                files: {
                    "<%%= pkg.build.css %>": ["<%%= pkg.build.css %>**/*.css"]
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
                cwd: "<%%= pkg.build.images %>",
                src: "**/*.png",
                dest: "<%%= pkg.build.images %>"
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
        prettify: {
            files: {
                expand: true,
                cwd: "<%%= pkg.paths.build %>",
                ext: ".html",
                src: ["*.html"],
                dest: "<%%= pkg.paths.build %>"
            }
        },
    });


    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*"]});

    grunt.registerTask("base", ["swig", "jshint", "sass"])
    grunt.registerTask("build", ["base", "webpack:dev", "copy"]);
    grunt.registerTask("dist", ["clean", "base", "webpack:prod", "prettify", "cmq", "postcss", "copy:fonts", "imagemin", "webp"]);
    grunt.registerTask("run", "connect");

};
