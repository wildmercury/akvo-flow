/*jshint browser:true, jquery:true */
/*global define, Em */

(function() {
  'use strict';

  define('app', [
    'jquery',
    'handlebars',
    'ember'
    ],
    function() {
      var App = Ember.Application.create({
        LOG_TRANSITIONS: true
      });
      window.FLOW = App;
      return App;
    }
  );
})();