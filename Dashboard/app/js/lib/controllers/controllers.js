define('controllers/controllers', [
  'app',
  'core-common',
  // 'flowenv',
  'controllers/permissions',
  'controllers/general-controllers-common',
  'controllers/survey-controllers',
  'controllers/device-controllers',
  'controllers/data-controllers',
  'controllers/reports-controllers',
  'controllers/maps-controllers-common',
  'controllers/messages-controllers',
  'controllers/user-controllers'
], function(FLOW) { 


  // ***********************************************//
  //                 controllers
  // ***********************************************//
  // Define the main application controller. This is automatically picked up by
  // the application and initialized.
  
  FLOW.ApplicationController = Ember.Controller.extend({
    init: function() {
      this._super();
      // Ember.STRINGS = Ember.STRINGS_EN;
      // Ember.STRINGS = FLOW_STRINGS.STRINGS_EN;
    }
  });

  //require('akvo-flow/currentuser');

  // Navigation controllers
  FLOW.NavigationController = Ember.Controller.extend({
    selected: null
  });
  FLOW.NavHomeController = Ember.Controller.extend();
  FLOW.NavSurveysController = Ember.Controller.extend();
  FLOW.NavSurveysEditController = Ember.Controller.extend();
  FLOW.NavDevicesController = Ember.Controller.extend();
  FLOW.DevicesSubnavController = Ember.Controller.extend();
  FLOW.DevicesTableHeaderController = Ember.Controller.extend({
    selected: null
  });

  FLOW.NavDataController = Ember.Controller.extend();
  FLOW.DatasubnavController = Ember.Controller.extend();
  FLOW.InspectDataController = Ember.ArrayController.extend();
  FLOW.BulkUploadController = Ember.Controller.extend();
  FLOW.DataCleaningController = Ember.Controller.extend();

  FLOW.NavReportsController = Ember.Controller.extend();
  FLOW.ReportsSubnavController = Ember.Controller.extend();
  FLOW.ExportReportsController = Ember.ArrayController.extend();
  FLOW.ChartReportsController = Ember.Controller.extend();

  FLOW.NavMapsController = Ember.Controller.extend();
  FLOW.NavUsersController = Ember.Controller.extend();
  FLOW.NavMessagesController = Ember.Controller.extend();
  FLOW.NavAdminController = Ember.Controller.extend();

});
