/*jshint browser:true, jquery:true */
/*global Ember, define */

(function() {
  'use strict';

  define('app/controllers/index', [
    'app'
    ],
    function(FLOW) {
      FLOW.IndexController = Ember.ObjectController.extend({
        variable: 'index.handlebars' // Just as a proof
      });
    }
  );
})();