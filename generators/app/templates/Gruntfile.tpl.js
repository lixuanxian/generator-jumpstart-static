module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Concatanation of JS
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: [
                    <% if (jquery || foundation) { %>'<%%= pkg.paths.bower %>jquery/dist/jquery.min.js',<% } %>
                    <% if (lodash) { %>'<%%= pkg.paths.bower %>lodash/dist/lodash.min.js',<% } %>
                    <% if (moment) { %>'<%%= pkg.paths.bower %>moment/min/moment.min.js',<% } %>
                    <% if (ember) { %>'<%%= pkg.paths.bower %>handlebars/handlebars.js',<% } %>
                    <% if (ember) { %>'<%%= pkg.paths.bower %>ember/ember.js',<% } %>
                    <% if (ember) { %>'<%%= pkg.paths.tmp %>template.js',<% } %>
                    '<%%= pkg.src.js %>**/*.js'
                ],
                dest: '<%%= pkg.build.js %>app.js'
            }
        },
        // Minification of JS
        uglify: {
            options: {
                banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%%= pkg.build.js %>app.js': ['<%%= concat.dist.dest %>'],
                }
            },
            dev: {
                files: {
                    <% if (modernizr || foundation) { %>'<%%= pkg.build.js %>modernizr.min.js': ['<%%= pkg.paths.bower %>modernizr/modernizr.js']<% } %>
                }
            }
        },
        // CSSmin to minify CSS on production
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%%= pkg.build.css %>',
                src: ['*.css', ],
                dest: '<%%= pkg.build.css %>',
                ext: '.css'
            }
        },
        // JSHint to review JS code before build
        jshint: {
            files: [
                '<%%= pkg.src.js %>**/*.js'
            ],
            options: {
                // options here to override JSHint defaults
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
            dist: {
                files: [
                    // Fonts
                    {
                        expand: true,
                        cwd: '<%%= pkg.src.fonts %>',
                        src: ['**/*', '!**/*.json'],
                        dest: '<%%= pkg.build.fonts %>'
                    },
                    // Images
                    {
                        expand: true,
                        cwd: '<%%= pkg.src.images %>',
                        src: '**/*',
                        dest: '<%%= pkg.build.images %>'
                    }
                ]
            }
        },
        // Watch task to compile files live
        watch: {
            js: {
                files: ['<%%= jshint.files %>'],
                tasks: ['jshint', 'concat']
            },
            scss: {
                files: ['<%%= pkg.src.scss %>**/**/*.scss'],
                tasks: ['compass']
            },
            images: {
                files: [
                    '<%%= pkg.src.images %>**/*.{jpeg,jpg,gif,png,svg}'
                ],
                tasks: ['copy']
            },
            fonts: {
                files: [
                    '<%%= pkg.src.fonts %>**/*.{eot,woff,svg,ttf}'
                ],
                tasks: ['copy']
            },
            <% if (ember) { %>
            templates: {
                files: [
                    '<%%= pkg.paths.templates %>**/*.hbs',
                    'index.html',
                ],
                tasks: ['emberTemplates', 'concat']
            }
            <% } else { %>
            templates: {
                files: [
                    '<%%= pkg.paths.templates %>**/*.swig',
                    '<%%= pkg.templates.data %>**/*.{json,yml}'
                ],
                tasks: ['assemble']
            }
            <% } %>
        },
        // Run local server
        connect: {
            server: {
                options: {
                    keepalive: true,
                    <% if (!ember) { %>base: '<%%= pkg.paths.build %>'<% } %>
                }
            }
        },
        // Generate Javascript documentation
        docco: {
            debug: {
                src: ['<%%= pkg.src.js %>**/*.js'],
                options: {
                    output: 'docs/js/'
                }
            }
        },
        // Clean delivery folder on distribution build
        clean: ["<%%= pkg.paths.build %>",],
        <% if (ember) { %>
        // Compile Handlebar templates
        emberTemplates: {
            compile: {
                options: {
                    templateBasePath: '<%%= pkg.paths.templates %>'
                },
                files: {
                    '<%%= pkg.paths.tmp %>template.js': ['<%%= pkg.paths.templates %>**/*.hbs',] 
                }
            }
        },
        <% } else { %>
        // Assemble Swig templates
        assemble : {
            options: {
                engine: 'swig',
                data: ['<%%= pkg.templates.data %>*.{json,yml}'],
                assets: '<%%= pkg.paths.build %>',
                partials: '<%%= pkg.templates.partials %>*.swig',
                layoutdir: '<%%= pkg.templates.layouts %>',
                layoutext: '.swig',
                layout: 'base',
                flatten: true
            },
            pages: {
                src: ['<%%= pkg.templates.pages %>*.swig'],
                dest: '<%%= pkg.paths.build %>'
            }
        },
        // HTML Prettify after distribution build
        prettify: {
            files: {
                expand: true,
                cwd: '<%%= pkg.paths.build %>',
                ext: '.html',
                src: ['*.html'],
                dest: '<%%= pkg.paths.build %>'
            }
        },
        <% } %>
    });

    // grunt.loadNpmTasks('assemble');
    // grunt.loadNpmTasks('grunt-prettify');
    // grunt.loadNpmTasks('grunt-contrib-clean');

    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // grunt.loadNpmTasks('grunt-contrib-compass');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    // grunt.loadNpmTasks('grunt-contrib-watch');
    
    // grunt.loadNpmTasks('grunt-contrib-copy');
    
    // grunt.loadNpmTasks('grunt-docco');
    // grunt.loadNpmTasks('grunt-contrib-connect');

    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*", "assemble"]});

    grunt.registerTask('build', [<% if (ember) { %>'emberTemplates'<% } else { %>'assemble'<% } %>, 'jshint', 'concat', 'uglify:dev', 'compass', 'copy']);
    grunt.registerTask('dist', ['clean', 'assemble', 'prettify', 'jshint', 'concat', 'uglify', 'compass', 'cssmin', 'copy']);
    grunt.registerTask('run', 'connect');

};
