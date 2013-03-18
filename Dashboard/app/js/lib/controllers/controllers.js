define('controllers/controllers', [
  'app',
  'core',
  'controllers/permissions',
  'controllers/general-controllers',
  'controllers/survey-controllers',
  'controllers/device-controllers',
  'controllers/data-controllers',
  'controllers/reports-controllers',
  'controllers/maps-controllers',
  'controllers/messages-controllers',
  'controllers/user-controllers'
], function(FLOW) {

  FLOW.ApplicationController = Ember.Controller.extend({
    init: function() {
      this._super();
      Ember.STRINGS = Ember.STRINGS_EN;
    }
  });

  FLOW.NavigationController = Ember.Controller.extend({
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
