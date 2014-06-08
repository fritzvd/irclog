'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    mochaTest: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: ['server/tests/**/*.js']
      },
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('server', ['mochaTest']);
  
	grunt.registerTask('test', [ 'server']);

};