/*jshint browser:true, jquery:true */
/*global Ember, define */

(function() {
  'use strict';

  define('app/router', [
    'app',
    'app/hbs_helpers',
    'app/controllers/controllers',
    'app/views/views'
    ],
    function(FLOW) {
      FLOW.Router.map(function() {
        this.route('index', {path: '/'});
      });

      FLOW.IndexRoute = Ember.Route.extend({
        setupController: function (controller) {
          controller.set('variable', 'index template');
        },

        renderTemplate: function(controller, model) {
          this.render('language', {outlet: 'language'});
          this.render('index', {outlet: 'main'});
        }
      });
    }
  );
})();