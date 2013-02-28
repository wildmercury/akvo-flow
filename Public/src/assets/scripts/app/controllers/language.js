/*jshint browser:true, jquery:true */
/*global Ember, define */

(function() {
  'use strict';

  define('app/controllers/language', [
    'app'
    ],
    function(FLOW) {
      console.log('Loading LanguageController');

      FLOW.LanguageController = Ember.ObjectController.extend({
        language: null,

        init: function () {
          var locale;

          console.log('Loading LanguageController 2a');
          this._super();
          console.log('Loading LanguageController 2b');
          locale = localStorage.locale;
          if(typeof locale === 'undefined') {
            this.set('language', this.content.findProperty('value', 'en'));
          } else {
            this.set('language', this.content.findProperty('value', locale));
          }
        },

        content: [
          Ember.Object.create({
            label: "English (Default)",
            value: "en"
          }), Ember.Object.create({
            label: "Español",
            value: "es"
          }), Ember.Object.create({
            label: "Français",
            value: "fr"
          })
        ],

        changeLanguage: function() {
          var locale;
          locale = this.language.get("value");
          localStorage.locale = this.get('language.value');

          if (locale === 'fr') {
            Ember.set('Ember.STRINGS', Ember.STRINGS_FR);
          } else if (locale === 'es') {
            Ember.set('Ember.STRINGS', Ember.STRINGS_ES);
          } else {
            Ember.set('Ember.STRINGS', Ember.STRINGS_EN);
          }
        }.observes('this.language')
      });

    }
  );
})();