define('core',
  [
    'app'
    // 'templ'
  ], function (FLOW) {
    /* Generic FLOW view that also handles language rerenders*/
    FLOW.View = Ember.View.extend({
      onLanguageChange: function() {
        this.rerender();
      }.observes('FLOW.dashboardLanguageControl.dashboardLanguage')
    });
  }
);