/*jshint browser:true, jquery:true */
/*global Ember, define */

(function() {
  'use strict';

  define('app/views/language', [
    'app',
    'ember',
    'app/hbs_helpers'
    ],
    function(FLOW) {
      FLOW.LanguageView = Ember.View.extend({
        templateName: 'language',

        init: function () {
          this._super();
          console.log('Loading LanguageView');
        },

        onLanguageChange: function() {
          console.log('Time to rerender');
          // this.rerender();
        }.observes('FLOW.LanguageController.language')
      });
    }
  );
})();