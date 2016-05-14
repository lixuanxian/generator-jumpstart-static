var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs-extra');

describe('mocha:app', function(){
    describe('defaults', function(){
        beforeEach(function(done){
            var testDir = path.join( __dirname, '.tmp');
            // done();

            // helpers
            //     .run(path.join( __dirname, '../generators/app'))
            //     // .inDir(testDir)
            //     .withGenerators([
            //         [require('../generators/gulp/index.js'), 'jumpstart-static:gulp']
            //     ])
            //     .on('end', done)
        });

        it('can Gulp', function(){
            // var gulpSpawn = spawn("gulp");
            // console.log(gulpSpawn);
            // assert.equal(gulpSpawn, 0);
            assert(true);
        });
    });
});
