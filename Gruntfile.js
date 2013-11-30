/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! \n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * <%= pkg.repository.url %> \n' +
            ' * \n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.licenses[0].type %> license\n' +
            ' * \n' +
            ' * \n' +
            ' * Including Hammer.js@1.0.6dev, http://eightmedia.github.com/hammer.js \n' +
            ' */ \n',

    functionalScope: {
      header: '+function ($) {\n' +
              '  "use strict";\n' +
              '\n' +
              '  if (!("ontouchstart" in window || navigator.msMaxTouchPoints)) return false \n\n',
      footer: '}(window.jQuery);'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
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
      options: {
        banner: '<%= functionalScope.header %>',
        footer: '<%= functionalScope.footer %>',
        stripBanners: false
      },
      js: {
        src: [
          'src/js/transition.js',
          'src/js/touch-carousel.js',
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      js: {
        src: ['<%= concat.js.dest %>', 'vendor/hammerjs/dist/jquery.hammer.js',],
        dest: 'dist/js/<%= pkg.name %>.js'
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
          compress: false
        },
        src: ['src/less/*.less'],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    cssmin: {
      prod: {
        options: {
          banner: '/* <%= pkg.name %> v<%= pkg.version %>, (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */',
          report: 'min'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': '<%= less.prod.dest %>'
        }
      }
    },

    qunit: {
      options: {
        inject: 'src/js/tests/unit/phantom.js'
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
        tasks: ['jshint', 'concat', 'uglify']
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'less:prod', 'cssmin']);
};
