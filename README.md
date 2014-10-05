# Static Site Scaffold for not Fancy Guys
My personal project scaffold for Assemble generated static sites.

### Requirements
 - [Grunt-Init](http://gruntjs.com/project-scaffolding)
 - [Bower](http://bower.io/)
 - [Node & npm](http://nodejs.org/)
 - (optional) [Compass](http://compass-style.org/help/) or SASS compiler capable of compiling SASS >= 3.3, if frontend packages are used as provided.

### Getting started
  - Install dependencies (see requirements)
  - Clone boilerplate repository

*The following uses a hyperthetical new project called "myproject"*

1. Make a directory for myproject
2. Enter that directory
3. grunt-init /path/to/boileplate
4. npm install (installs boilerplate Node dependencies)
5. bower install (installs boilerplate Bower dependencies)
6. grunt serve

### Templates
The boilerplate uses Swig templates in conjunction with Assemble to generate static sites.

 The core terminology is as followed:

  - **Layouts**: Wrappers for pages. The base layout that ships with the boilerplate contains a standard HTML structure (Doctype declaration, head and body elements). Layouts (included the provided "base") are found in the templates/layouts directory.
  - **Pages**: Pages are the primary location for your content. They extend a layout and are found within the templates/pages directory of the project.
  - **Includes**: Swig includes that allow the inclusion of partial content. The full path to the include must be referenced. E.g. {% include "myproject/src/templates/includes/header.swig" %}.

For more information read the following:

  - [**Assemble Templates**](http://assemble.io/docs/index.html)
  - [**Swig**](http://paularmstrong.github.io/swig/docs/)
  - [**Assemble Swig**](https://github.com/assemble/assemble-swig)
  - [**Layouts**](http://assemble.io/docs/Layouts.html)
  - [**Pages**](http://assemble.io/docs/Pages.html)
  - [**Includes**](http://paularmstrong.github.io/swig/docs/tags/#include)

### Data
Templates have access to data objects. This data is ideally stored as json inside of the template/data directory.

For more information on Assemble's use of data, reference [Assemble's own documentation](http://assemble.io/docs/Context.html).

### Frontend packages
By default the boilerplate ships with the following frontend packages.

  -  [**Bourbon**](http://bourbon.io/): SCSS utilities (compiles to 0 lines of CSS if not called)
  -  [**Neat**](http://neat.bourbon.io/): Bourbon dependent grid framework (compiles to 0 lines of CSS if not called)
  -  [**Scut**](http://davidtheclark.github.io/scut/): More useful SCSS shortcuts (compiles to 0 lines of CSS if not called)

### Grunt Commands
The boilerplate ships with a variety of grunt tasks, defined in the Gruntfile.js.

#### grunt build
Builds the project, including templates and processing of SCSS and js.

Includes:

  - **Assemble**: Process templates and data
  - **grunt-contrib-jshint**: Lints javascript before concatenation. Will stop build if it finds an error.
  - **grunt-contrib-concat**: Concatanates vendor and custom javascript.
  - **grunt-contrib-compass**: Compiles SCSS to CSS
  - **grunt-contrib-copy**: Copies images and fonts to build directory

#### grunt dist
Production, or distribution, release of your project. Includes all of build, and the following:

  - **grunt-prettify:** Prettify processed HTML
  - **grunt-contrib-clean**: Cleans distribution directory before build
  - **grunt-contrib-uglify**: Minifies and comment-strips javascript 
  - **grunt-contrib-cssmin**: Minifies and comment-strips CSS 

#### grunt serve
Serve the project on localhost. Defaults to port 8000.

#### grunt watch
Watch for changes in SCSS, js, image and font directories, and any templates. On change recompiles that aspect of the project. The project does not include livereload because it sucks more than it helps.

#### grunt docco
Build HTML documentation for javascript files. See [Docco documentation](http://jashkenas.github.io/docco/) for more information.