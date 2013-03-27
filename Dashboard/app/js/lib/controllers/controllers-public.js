define('controllers/controllers', [
  'app',
  'core-common',
  'flowenv',
  'controllers/general-controllers-common',
  'controllers/maps-controllers-common'
], function(FLOW) { 

  // ***********************************************//
  //                 controllers
  // ***********************************************//
  // Define the main application controller. This is automatically picked up by
  // the application and initialized.
  
  FLOW.ApplicationController = Ember.Controller.extend({
    init: function() {
      this._super();
      Ember.STRINGS = Ember.STRINGS_EN;
    }
  });

  FLOW.NavMapsController = Ember.Controller.extend();
});