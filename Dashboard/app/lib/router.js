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

        this.route('new', {
            path: '/:survey_group_id/new'
        });
    });

    this.resource('survey', {
        path: '/survey/:survey_id'
    }, function () {
        this.resource('edit');
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

FLOW.LoadingRoute = Ember.Route.extend({});

FLOW.SurveyGroupsRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('survey_group');
    }
});

FLOW.SurveyGroupRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        var surveys = Ember.ArrayController.create({
            sortAscending: true,
            sortProperties: ['code']
        });

        this.store.findQuery('survey', {
            surveyGroupId: model.get('id')
        }).then(function (data) {
            surveys.set('content', data);
        });

        controller.set('model', model); // default action
        controller.set('surveys', surveys);
    }
});

FLOW.SurveysNewRoute = Ember.Route.extend({
    getSurveyGroupId: function () {
        return parseInt(this.get('router').location.get('location').hash.split('/')[2], 10);
    },
    setupController: function (controller, model) {

        model.set('surveyGroupId', this.getSurveyGroupId());
        model.set('defaultLanguageCode', 'en');

        controller.set('model', model);
        controller.set('languages', FLOW.LanguagesController.create());
        controller.set('pointTypes', FLOW.SurveyPointTypeController.create());
    },
    model: function () {
        return this.store.createRecord('survey');
    }
});

FLOW.DevicesRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('device');
    }
});

FLOW.MessagesRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('message');
    }
});
