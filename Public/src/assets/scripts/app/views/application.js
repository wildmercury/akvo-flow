/*jshint browser:true, jquery:true */
/*global Ember, define */

(function() {
  'use strict';

  define('app/views/application', [
    'app'
    // 'ember'
    ],
    function(FLOW) {
      FLOW.ApplicationView = Ember.View.extend({

        init: function() {
          var locale;

          this._super();

          // If available set language from local storage
          locale = localStorage.locale;
          if(typeof locale === 'undefined') {
            locale = 'en';
          }
          switch(locale) {
          case 'fr':
            Ember.STRINGS = Ember.STRINGS_FR;
            break;
          case 'es':
            Ember.STRINGS = Ember.STRINGS_ES;
            break;
          default:
            Ember.STRINGS = Ember.STRINGS_EN;
            break;
          }
        }
      });
    }
  );
})();