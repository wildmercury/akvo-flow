define('views/common/dialog', [
  'app'
], function(FLOW) {
  FLOW.Dialog = Ember.View.extend({
    templateName: 'common/dialog',

    attributeBindings: ['show', 'header', 'message', 'showOK', 'showCancel'],

    show: false,

    header: '',
    message: '',

    showOK: true,
    showCancel: true,

    doOK: null,
    doCancel: null,

    _doOK: function () {
      var action = this.get('doOK'),
          controller = this.get('controller');

      Ember.assert('You need to provide a `doOK` method in your FLOW.Dialog definition', action !== null);
      Ember.assert('The method `' + action + '` must present in the controller',  controller[action] !== undefined);

      controller[action].apply(controller, arguments);
    },

    _doCancel: function () {
      var action = this.get('doCancel'),
          controller = this.get('controller');

      if (action) {
        Ember.assert('The method `' + action + '` must present in the controller',  controller[action] !== undefined);
        controller[action].apply(controller, arguments);
        return;
      }

      // default implementation just hides the dialog
      this.set('show', false);
    }
  });
});