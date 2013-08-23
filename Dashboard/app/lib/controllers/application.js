require('akvo-flow/core');

FLOW.ApplicationController = Ember.Controller.extend({
    _ldng: false,
    init: function () {
        this._super.apply(this, arguments);
        this.get('store').get('adapter').on('ajax', this, 'status');
        this.get('store').get('adapter').on('didFindAll', this, 'status');
        this.get('store').get('adapter').on('didFindQuery', this, 'status');
    },
    status: function (type) {}
});


FLOW.SurveyGroupsController = Ember.ArrayController.extend({
    sortAscending: true,
    sortProperties: ['code']
});
