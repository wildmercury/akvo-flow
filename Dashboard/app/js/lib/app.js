define('app', [
], function () {
  var App = Ember.Application.create({
    LOG_TRANSITIONS: true
  });
  window.FLOW = App;
  
  App.ready = function() {
    var i, len, permissionsList, loc;
    
    // UI strings
    loc = localStorage.getItem('locale');
    Ember.STRINGS = FLOW_STRINGS['STRINGS_' + (loc ? loc : 'en').toUpperCase()];

    // Environment vars
    FLOW.Env = Ember.Object.create({
      photo_url_root: FLOW_ENV.photo_url_root,
      countries: FLOW_ENV.countries
    });

    // Setup permissionLevels
    permissionsList = [];
    for (i = 0, len = FLOW_ENV.permissions.length; i < len; i++) {
      var label, tuple, value;

      tuple = {};
      label = FLOW.locale(FLOW_ENV.permissions[i].label);
      value = FLOW_ENV.permissions[i].value;

      tuple[label] = value;
      permissionsList.push(tuple);
    }
    FLOW.permissionLevelControl = Ember.ArrayController.create({content: Ember.A(permissionsList)});
    
    // FLOW.questionTypeControl.setupContent();
  };

  return App;
});