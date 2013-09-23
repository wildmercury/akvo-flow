require('akvo-flow/core');

var Route = Ember.Route;

FLOW.Router.map(function () {

    this.resource('survey_groups', {
        path: '/'
    }, function () {
        this.resource('survey_group', {
            path: '/survey_group/:id'
        }, function () {});
    });

    this.resource('surveys', function () {
        this.route('new', {
            path: '/:survey_group_id/new'
        });
    });

    this.resource('survey', {
        path: '/survey/:id'
    }, function () {});

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

FLOW.LoadingRoute = Route.extend({});

FLOW.SurveyGroupsRoute = Route.extend({
    model: function () {
        return this.store.find('survey_group');
    }
});

FLOW.SurveyGroupRoute = Route.extend({
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

        controller.set('model', model);
        controller.set('surveys', surveys);
    },
    model: function (params) {
        return this.store.find('survey_group', params.id);
    }
});

FLOW.SurveysNewRoute = Route.extend({
    getSurveyGroupId: function () {
        return parseInt(this.get('router').location.get('location').hash
            .split('/')[2], 10);
    },
    setupController: function (controller, model) {

        model.set('surveyGroupId', this.getSurveyGroupId());
        model.set('defaultLanguageCode', 'en');

        controller.set('model', model);
        controller.set('languages', FLOW.LanguagesController.create());
        controller.set('pointTypes', FLOW.SurveyPointTypeController
            .create());
    },
    model: function () {
        return this.store.createRecord('survey');
    }
});

FLOW.SurveyRoute = Route.extend({
    setupController: function (controller, model) {
        controller.set('model', model);
        controller.set('languages', FLOW.LanguagesController.create());
        controller.set('pointTypes', FLOW.SurveyPointTypeController.create());
        controller.set('questionGroups', FLOW.QuestionGroupsController.create());

        this.store.find('survey_group', model.get('surveyGroupId')).then(function (data) {
            controller.set('surveyGroup', data);
        });

        this.store.findQuery('question_group', {
            surveyId: model.get('id')
        }).then(function (data) {
            controller.get('questionGroups').set('content', data);
        });
    },
    model: function (params) {
        return this.store.find('survey', params.id);
    }
});

FLOW.DevicesRoute = Route.extend({
    model: function () {
        return this.store.find('device');
    }
});

FLOW.MessagesRoute = Route.extend({
    model: function () {
        return this.store.find('message');
    }
});
