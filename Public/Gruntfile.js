module.exports = function( grunt ) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true
      },
      build: [
        '../GAE/war/index.html',
        '../GAE/war/assets',
        'src/assets/scripts/app/templates_raw.js',
        'src/assets/scripts/app/templates.js'
      ]
    },

    concat: {
      options: {
        stripBanners: true,
        banner: "define('app/templates', ['jquery', 'handlebars', 'ember'], function() {\n",
        footer: '});'
      },
      dist: {
        src: ['src/assets/scripts/app/templates_raw.js'],
        dest: 'src/assets/scripts/app/templates.js'
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['index.html'], dest: '../GAE/war'},
          {expand: true, cwd: 'src/assets/scripts', src: ['require.js', 'loader.js'], dest: '../GAE/war/assets/scripts'},
          {expand: true, cwd: '../Dashboard/app/static/', src: ['**'], dest: '../GAE/war/assets'},
          {expand: true, cwd: 'src/assets/scripts/libs', src: ['**'], dest: '../GAE/war/assets/scripts/libs'}
        ]
      }
    },

    cssmin: {
      compress: {
        files: {
          '../GAE/war/assets/styles/akvo-flow.css': [
            '../Dashboard/app/css/reset.css',
            '../Dashboard/app/css/main.css',
            '../Dashboard/app/css/form.css',
            '../Dashboard/app/css/css3-support.css',
            '../Dashboard/app/css/ie.css',
            '../Dashboard/app/css/custom-theme/jquery-ui-1.8.21.custom.css'
          ]
        }
      }
    },

    ember_templates: {
      compile:{
        options: {
          templateName: function(sourceFile){
            return sourceFile.replace(/src\/assets\/scripts\/app\/templates\//, '');
          }
        },
        files: {
          'src/assets/scripts/app/templates_raw.js' : [
            'src/assets/scripts/app/templates/**/*.handlebars'
          ]
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'src/assets/scripts/**/*.js',
        '!src/assets/scripts/app/templates_raw.js.',
        '!src/assets/scripts/app/templates.js.',
        '!src/assets/scripts/libs/*.js',
        '!src/assets/scripts/require.js'
      ],
      options: {
        strict: true,
        browser: true,
        jquery: true,
        globals: {
          Ember: true,
          Em: true
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/assets/scripts',
          name: "main",
          mainConfigFile: 'src/assets/scripts/main.js',
          optimize: 'none', // Only for dev
          out: '../GAE/war/assets/scripts/main.js',
          paths: {
            // When Useing CDN libs
            // jquery: 'empty:',
            // handlebars: 'empty:',
            // ember: 'empty:'
          }
        }
      }
    },

    watch: {
      files: [
        'src/assets/**/*.js',
        'src/assets/**/*.handlebars',
        '!src/assets/scripts/app/templates.js',
        '!src/assets/scripts/app/templates_raw.js'
      ],
      tasks: ['livereload']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('handlebars', ['ember_templates']);

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('buildjs', ['handlebars', 'concat', 'requirejs']);
  grunt.registerTask('livereload', ['buildjs']);
  grunt.registerTask('default', ['clean', 'test', 'copy', 'buildjs', 'cssmin']);

};