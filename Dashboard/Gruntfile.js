module.exports = function(grunt) {

  // A good place to start to understand the Grunt commans are
  // at the bottom of this file, where all commands are registred

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Copy static items(fonts & images) and 
    // JS libs
    copy: {
      admin: {
        files: [{
          src: 'app/dashboard.html',
          dest: '../GAE/war/admin/index.html'
        }]
      },
      public: {
        files: [{
          src: 'app/public.html',
          dest: '../GAE/war/index.html'
        }]
      },
      static: {
        files: [{
          expand: true,
          cwd: 'app/static',
          src: ['**'],
          dest: '../GAE/war/assets/static'
        }]
      },
      vendor: {
        files: [{
          expand: true,
          cwd: 'app/js/vendor',
          src: '**',
          dest: '../GAE/war/assets/js/vendor'
        }]
      }
    },

    // Concatenate & compress css
    cssmin: {
      compress: {
        files: {
          '../GAE/war/assets/styles/akvo-flow.css': [
            'app/css/reset.css',
            'app/css/main.css',
            'app/css/form.css',
            'app/css/css3-support.css',
            'app/css/ie.css',
            'app/css/custom-theme/jquery-ui-1.8.21.custom.css'
          ]
        }
      }
    },

    // Verify our code quality
    // .jshintrc file needs to be configured to our needs
    jshint: {
      all: [
        'Gruntfile.js',
        'app/js/lib/**/*.js',
        '!app/js/lib/vendor/**/*.*'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Compile handlebars templates
    ember_templates: {
      admin: {
        options: {
          templateName: function (sourceFile) {
            return sourceFile.replace(/app\/js\/templates\//, '');
          }
        },
        files: {
          'app/js/lib/templates.js': [
            'app/js/templates/**/*.handlebars',
            '!app/js/templates/**/*public.handlebars'
          ]
        }
      },
      public: {
        options: {
          templateName: function (sourceFile) {
            return sourceFile.replace(/app\/js\/templates\//, '');
          }
        },
        files: {
          'app/js/lib/templates.js': [
            'app/js/templates/**/*common.handlebars',
            'app/js/templates/**/*public.handlebars'
          ]
        }
      }
    }

    // neuter: {
    //   options: {
    //     // filepathTransform: function (filepath) {
    //     //   return 'app/js/lib/' + filepath;
    //     // },
    //     includeSourceURL: false
    //   },
    //   '../GAE/war/assets/js/akvo-flow.js': 'app/js/lib/main.js'
    // }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-neuter');

  // Register tasks
  grunt.registerTask('assets', ['copy:static', 'copy:vendor']);
  grunt.registerTask('admin', ['ember_templates:admin', 'copy:admin']);
  grunt.registerTask('public', ['ember_templates:public', 'copy:admin']);

  grunt.registerTask('default', ['jshint', 'admin', 'public', 'cssmin', 'assets']);
};