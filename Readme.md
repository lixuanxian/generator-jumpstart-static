# Jumpstart ~ Static
A [**Yeoman**](http://yeoman.io/) generator for scaffolding new static sites.

## Requirements
 - [Yo](http://yeoman.io/learning/)
 - [Grunt-CLI](https://github.com/gruntjs/grunt-cli)
 - [Bower](http://bower.io/)
 - [Node & npm](http://nodejs.org/)

## Changelog
**v.1.2.0**
 - *Removed* Ruby dependency. Libsass / node-sass now compiles SCSS, removing the need to have Ruby installed
 - *Deprecated* Ember.js aspect of Wizard. [ember-cli](http://ember-cli.com/) does a much better job than I could do. I suggest using that. 

## Getting started
1. Install `npm install generator-jumpstart-static`
2. Run `yo generator-jumpstart-static`
3. Follow the build wizard

## Permutations
This generator is designed to scaffold static websites that make use of [**Assemble.js**](http://assemble.io/) and the [**Swig**](http://paularmstrong.github.io/swig/docs/) templating engine.

It gives the user the option of including several packages I find helpful when building modern websites. These include, but are not limited to...

 - [**Bourbon**](http://bourbon.io/) ~ SCSS utilities
 - [**Neat**](http://neat.bourbon.io/) ~ Bourbon dependent grid framework
 - [**Scut**](http://davidtheclark.github.io/scut/) ~ More useful SCSS shortcuts
 - [**Foundation**](http://foundation.zurb.com/) ~ Zurb's big pants CSS framework
 - [**Lo-Dash**](https://lodash.com) ~ Lots of useful Javascript functions for MacGyvering with objects and lists
 - [**Moment**](http://momentjs.com/) ~ The best library for handling time there is

## What you get

### Gruntfile.js
A pre-fabbed Grunfile with everything you need to build the project, set a watch on it, and run the project on localhost port 8000.

##### Available commands:
`grunt build` ~ Build the templates, SCSS, Javascript, fonts, and images, within the project.

`grunt dist` ~ As above but for a production environment (e.g. minifies .js and .css files, etc.)

`grunt watch` ~ Watches for changes in any file that would require a re-build.

`grunt run` ~ Runs the project on a local server (port 8000).

`grunt docco` ~ Creates documentation for your Javascript files.

### package.json
All the packages required to run the above Gruntfile setup

### src folder
Contains "the files you edit". SCSS and Javascript files to get you going, with the packages you have opted in to integrated from the off.

##### Templates
Contains the template files. Best bet is to read the [Assemble documentation](http://assemble.io/docs/), and start with `index.swig` inside the `pages` directory.

Inside of the `layouts` directory you will find `base.swig`. This file contains a standard HTML5 document wrapper and includes the built out statics (`app.js`, `app.scss`, etc.)

### Build
Contains "the files you don't edit". Target directory of all Grunt tasks responsible for building out the project (see the section on the Gruntfile.js, above). All the files inside of the `build` directory are on the *.gitignore*; they are ephemeral. If they were deleted tomorrow and it causes you tears, you're probably doing it wrong.

### Other stuff!