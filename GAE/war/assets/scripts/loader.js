/*jshint browser:true, jquery:true */
/*global Ember*/
// Quick hack to handle UI strings loading

(function() {
  'use strict';

  if (typeof Ember === 'undefined') {
    window.Ember = {};
  }

  var loader = {
    register: function (path, fun) {
      fun();
    }
  };
  window.loader = loader;

})();
