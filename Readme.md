# Jumpstart ~ Static
A [**Yeoman**](http://yeoman.io/) generator for scaffolding new static sites.

## Requirements
 - [Yo](http://yeoman.io/learning/)
 - [Grunt-CLI](https://github.com/gruntjs/grunt-cli)
 - [Bower](http://bower.io/)
 - [Node & npm](http://nodejs.org/)

## Changelog

### v2.0.0
**Removed** client side prompts. I've decided to make the generator much more opinionated. There are no longer prompts for javascript and SCSS packages. Instead this application ships with Bourbon, Scut, and Eric Meyer's CSS reset (in SCSS form).

**Added** Webpack for js file concatenation and bundling. It is much more sophisticated than grunt-contrib-concat. The Grunt Webpack package is used to control settings. Include vendor javascript files you need using the following process:

  1. `npm install <package you require>`
  2. (in any of your javascript files) `require ('<package>')`

`app.js` is included in the base HTML layout by default. Use this for javascript common across all pages on your site (e.g. code in the header or footer of your site)

Create different javascript files for different pages, and then include them in a script tag using `{% block extrajs %}` in templates which extend the default `layout.swig`.

To include vendor scripts (e.g. jQuery or Lodash) use `require(<package>)` either within `app.js` or your page specific javascript files. The latter will reduce overall page weight, by ensuring that you only include 3rd party libraries on the pages that need them.

### v1.2.0
**Removed** Ruby dependency. Libsass / node-sass now compiles SCSS, removing the need to have Ruby installed

**Deprecated** Ember.js aspect of Wizard. [ember-cli](http://ember-cli.com/) does a much better job than I could do. I suggest using that. 

## Getting started
1. Install `npm install generator-jumpstart-static`
2. Run `yo generator-jumpstart-static`
3. Follow the build wizard

## Permutations
This generator is designed to scaffold static websites using the [**Swig**](http://paularmstrong.github.io/swig/docs/) templating engine, and a Grunt task to compile.

It also includes the following SCSS packages, all of which resolve to 0 bytes of CSS unless they are called.

 - [**Bourbon**](http://bourbon.io/) ~ SCSS utilities
 - [**Scut**](http://davidtheclark.github.io/scut/) ~ More useful SCSS shortcuts
 - [**Meyer Reset**](http://meyerweb.com/eric/tools/css/reset/) ~ An SCSS version of Eric Meyer's reset CSS.

## What you get

### Gruntfile.js
A pre-fabbed Grunfile with everything you need to build the project, set a watch on it, and run the project on localhost port 8000.

##### Available commands:
`grunt build` ~ Build the templates, SCSS, javascript, fonts, and images, within the project.

`grunt dist` ~ As above but for a production environment (e.g. minifies .js and .css files, etc.)

`grunt watch` ~ Watches for changes in any file that would require a re-build.

`grunt run` ~ Runs the project on a local server (port 8000).

`grunt docco` ~ Creates documentation for your javascript files.

### package.json
All the packages required to run the above Gruntfile setup

### src folder
Contains "the files you edit". SCSS and javascript files to get you going.

##### Templates
Contains the HTML template files. Best bet is to read the [Swig documentation](http://assemble.io/docs/), and start with `index.swig` inside the `pages` directory.

Inside of the `layouts` directory you will find `base.swig`. This file contains a standard HTML5 document wrapper and includes the built out statics (`app.js`, `app.scss`, etc.)

Swig uses the same syntax that Django developers will be familiar with.

### Build
Contains "the files you don't edit". Target directory of all Grunt tasks responsible for building out the project (see the section on the Gruntfile.js, above). All the files inside of the `build` directory are on the *.gitignore* and are ephemeral. If they were deleted tomorrow and it causes you tears, you're probably doing it wrong.

### Other stuff!