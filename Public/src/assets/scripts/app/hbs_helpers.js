/*jshint strict:true, browser:true, jquery:true, unused:false */
/*global Ember, define */

(function() {
  'use strict';

  define('app/hbs_helpers', [
    'ember',
    'handlebars',
    'jquery'
    ],
    function() {
      Ember.Handlebars.registerHelper('t', function(i18nKey, options) {
        var i18nValue;
        try {
          i18nValue = Ember.String.loc(i18nKey);
        }
        catch (err) {
          return i18nKey;
        }
        return i18nValue;
      });
    }
  );
})();