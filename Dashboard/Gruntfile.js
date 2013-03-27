module.exports = function(grunt) {

  grunt.registerTask('default', [
    // 'ember_templates:admin',
    // 'concat',
    // 'requirejs',
    // 'copy:requirejs',
    // 'copy:static',
    // 'copy:vendor',
    'htmlmin:dev',
    'cssmin'
  ]);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true // Since build dir is in "../GAE"
      },
      build: [
        '../GAE/war/admin',
        '../GAE/war/assets',
        'app/js/lib/templates.js'
      ]
    },

    concat: {
      options: {
        stripBanners: true,
        banner: "define('templates', ['app'], function() {\n",
        footer: '});'
      },
      dist: {
        src: ['app/js/lib/templates_raw.js'],
        dest: 'app/js/lib/templates.js'
      }
    },

    copy: {
      static: {
        files: [{
          expand: true,
          cwd: 'app/static',
          src: ['**'],
          dest: '../GAE/war/assets'
        }]
      },
      vendor: {
        files: [{
          expand: true,
          cwd: 'app/js/vendor',
          src: '**',
          dest: '../GAE/war/assets/js/vendor'
        }]
      },
      plugins: {
        files: [{
          expand: true,
          cwd: 'app/js/plugins',
          src: '**',
          dest: '../GAE/war/assets/js/plugins'
        }]
      },
      require: {
        files: [{
          src: 'app/js/lib/require.js',
          dest: '../GAE/war/assets/js/require.js'
        }]
      }
    },

    // Minify CSS
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

    ember_templates: {
      admin: {
        options: {
          templateName: function (sourceFile) {
            return sourceFile.replace(/app\/js\/templates\//, '');
          }
        },
        files: {
          'app/js/lib/templates_raw.js': [
            'app/js/templates/**/*.handlebars',
            '!app/js/templates/**/*public.handlebars'
          ]
        }
      }
    },

    // Minify HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '../GAE/war/admin/index.html': 'app/dashboard.html'
          // '../GAE/war/index.html': 'app/public.html'
        }
      },
      dev: {
        files: {
          '../GAE/war/admin/index.html': 'app/dashboard.html'
          // '../GAE/war/index.html': 'app/public.html'
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js'
        // Too many errors so ignoring our code :-(
        // 'Gruntfile.js',
        // 'app/js/lib/**/*.js',
        // '!app/js/lib/vendor/**/*.*'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Build JS file
    requirejs: {
      compile: {
        options: {
          optimize: 'none', // Only for dev
          name: 'main',
          baseUrl: 'app/js/lib',
          mainConfigFile: 'app/js/lib/main.js',
          out: '../GAE/war/assets/js/main.js',
          paths: {
            'flowenv': 'empty:',
            'ui-strings': 'empty:'
          }
        }
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ember-templates');
  
};