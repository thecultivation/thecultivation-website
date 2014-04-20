module.exports = function(grunt) {

  grunt.initConfig({

    concurrent: {

      main: ['nodemon:main', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    nodemon: {
      main: {
        script: 'dist/server/index.js',
        options: {
          watchedFolders: ['dist/server'],
          watchedExtensions: ['js'],
          delay: 1000
        }
      }
    },
    watch: {

      options: {

        interval: 1000
      },
      main: {
        files: ['tmp/index.js'],
        options: {
          livereload: true
        }
      },
      hbs: {
        files: ['views/**/*.hbs'],
        options: {
          livereload: true
        }
      },
      stylus: {
        files: ['stylus/**/*.styl'],
        tasks: 'stylus',
        /*options: {
          atBegin: true
        }*/
      },
      css: {
        files: ['public/css/**/*.css'],
        options: {
          livereload: true
        }
      },
      es6_server: {
        files: ['app/es6/server/**/*.js'],
        tasks: 'transpile:server'
      },
      es6_client: {
        files: ['app/es6/client/**/*.js'],
        tasks: 'transpile:client'
      },
      requirejs: {
        files: ['tmp/**/*.js'],
        tasks: 'requirejs'
      }
    },
    stylus: {
      compile: {
        files: {
          'public/css/main.css': ['stylus/main.styl']
        },
        options: {
          compress: true //
        }
      }
    },
    transpile: {
      server: {
        type: "cjs",
        files: [{
          expand: true,
          cwd: 'app/es6/',
          src: ['server/**/*.js'],
          dest: 'dist/',
          ext: '.js'
        }]
      },
      client: {
        type: "amd",
        files: [{
          expand: true,
          cwd: 'app/es6/client/',//IMPORTANT, make sure this ends with a slash
          src: ['**/*.js'],
          dest: 'tmp/',
          ext:'.js'
        }]
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'tmp/',
          optimize: 'uglify2', //uglify2 | none
          name: '../public/js/ext/almond/0.2.9/almond',
          include: 'index',
          out: 'public/js/index.js',
          insertRequire: ['index']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['concurrent:main']);
};