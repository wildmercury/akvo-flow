require('akvo-flow/core');

var Route = Ember.Route;

FLOW.Router.map(function () {

    this.resource('survey_groups', {
        path: '/'
    }, function () {

        this.resource('survey_group', {
            path: '/survey_group/:survey_group_id'
        }, function () {});
    });

    this.resource('surveys', function () {
        this.route('new', {
            path: '/:survey_group_id/new'
        });
    });

    this.resource('survey', {
        path: '/survey/:survey_id'
    }, function () {

        this.route('question_groups', {
            path: '/question_groups'
        });

        this.resource('question_group', {
            path: '/question_group/:question_group_id'
        }, function () {
            this.route('edit');
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

FLOW.LoadingRoute = Route.extend({
    renderTemplate: function (controller, context) {

    }
});

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
    }
});

FLOW.SurveysNewRoute = Route.extend({
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

FLOW.SurveyRoute = Route.extend({
    setupController: function (controller, model) {
        controller.set('model', model);
        controller.set('languages', FLOW.LanguagesController.create());
        controller.set('pointTypes', FLOW.SurveyPointTypeController.create());

        this.store.find('survey_group', model.get('surveyGroupId')).then(function (surveyGroup) {
            controller.set('surveyGroup', surveyGroup);
        });
    }
});

FLOW.SurveyQuestionGroupsRoute = Route.extend({
    setupController: function (controller, model) {
        this.store.findQuery('question_group', {
            surveyId: controller.get('survey').get('id')
        }).then(function (data) {
            controller.set('content', data);
        });
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
