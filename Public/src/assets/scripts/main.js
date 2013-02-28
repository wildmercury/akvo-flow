/*jshint browser:true, jquery:true */
/*global require console */

(function() {
  'use strict';

  require.config({
    paths: {
      // Use CDN libs
      // 'ember': '//cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.0-rc.1/ember.min',
      // 'handlebars': '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.min',
      // 'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min'

      // Use local libs
      'ember': 'libs/ember-1.0.0-rc.1',
      'handlebars': 'libs/handlebars-1.0.0-rc.3',
      'jquery': 'libs/jquery-1.8.2.min'
    }
  });
  require([
    'jquery',
    'handlebars',
    'ember',
    'app',
    'app/router',
    'app/templates'
    ], function() {
      console.log('Get in the FLOW...');
    }
  );
})();