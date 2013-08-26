require('akvo-flow/core');


FLOW.Router.map(function () {

    this.resource('survey_groups', {
        path: '/'
    }, function () {

        this.resource('survey_group', {
            path: '/survey_group/:survey_group_id'
        });
    });

    this.resource('surveys', function () {

        this.route('new');

        this.resource('survey', {
            path: '/survey/:survey_id'
        }, function () {

        });
    });

    this.resource('devices', {
        path: '/devices'
    }, function () {

    });

    this.resource('data', {
        path: '/data'
    }, function () {

    });

    this.resource('reports', {
        path: '/reports'
    }, function () {

    });

    this.resource('maps', {
        path: '/maps'
    }, function () {

    });

    this.resource('users', {
        path: '/users'
    }, function () {

    });

    this.resource('messages', {
        path: '/messages'
    }, function () {

    });

});

FLOW.SurveyGroupsRoute = Ember.Route.extend({
    model: function () {
        return FLOW.SurveyGroup.find();
    }
});

FLOW.SurveyGroupRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        var surveys = Ember.ArrayController.create({
            sortAscending: true,
            sortProperties: ['code']
        });

        surveys.set('content', FLOW.Survey.find({
            surveyGroupId: model.get('id')
        }));

        controller.set('model', model); // default action
        controller.set('surveys', surveys);
    }
});

FLOW.DevicesRoute = Ember.Route.extend({
    model: function () {
        return FLOW.Device.find();
    }
});

FLOW.MessagesRoute = Ember.Route.extend({
    model: function () {
        return FLOW.Message.find();
    }
});
