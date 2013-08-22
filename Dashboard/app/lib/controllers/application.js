require('akvo-flow/core');

FLOW.ApplicationController = Ember.Controller.extend({
    init: function () {
        this._super(arguments);
        this.get('store').get('adapter').on('ajax', this, 'status');
    },
    status: function (type) {
        console.log('>>> ajax', type);
    }
});
