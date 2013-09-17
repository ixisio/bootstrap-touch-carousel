/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              '* <%= pkg.name %> v<%= pkg.version %>\n' +
              '* (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              '* Licensed under <%= pkg.licenses.type %>\n' +
              '*/\n',

    jshint: {
      options: {
        jshintrc: 'src/js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/js/*.js']
      },
      test: {
        src: ['src/js/tests/unit/*.js']
      }
    },

    concat: {
      js: {
        src: [
          'src/js/transition.js',
          'src/js/carousel.js',
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js: {
        src: ['<%= concat.js.dest %>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    less: {
      dev: {
        options: {
          compile: true,
          dumpLineNumbers: 'comments'
        },
        src: ['src/less/*.less'],
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      prod: {
        options: {
          compile: true,
          banner: '<%= banner %>',
          compress: true
        },
        src: ['src/less/*.less'],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    qunit: {
      options: {
        inject: 'scr/js/tests/unit/phantom.js'
      },
      files: ['src/js/tests/*.html']
    },

    watch: {
      less: {
        files: 'src/less/*.less',
        tasks: ['less:dev']
      },
      js: {
        files: 'src/js/*.js',
        tasks: ['jshint', 'concat']
      }
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');


  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['jshint', 'less:prod', 'concat', 'uglify']);
};
