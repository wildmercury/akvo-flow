require('akvo-flow/core');


FLOW.Router.map(function () {
    this.resource('survey_groups', function () {
        this.route('preview');
    });
});

FLOW.LoadingRoute = Ember.Route.extend({});
