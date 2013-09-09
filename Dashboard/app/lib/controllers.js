require('akvo-flow/controllers/application');
require('akvo-flow/controllers/languages');
require('akvo-flow/controllers/survey_groups');
require('akvo-flow/controllers/survey_group');
require('akvo-flow/controllers/surveys_new');
require('akvo-flow/controllers/survey');
require('akvo-flow/controllers/question_group');

FLOW.LanguagesController = Ember.ArrayController.extend({
    init: function () {
        var tmp = [];

        Ember.keys(FLOW._isoLanguages).forEach(function (k) {
            tmp.push(Ember.Object.create({
                value: k,
                labelShort: FLOW._isoLanguages[k].name,
                labelLong: FLOW._isoLanguages[k].name + ' - ' + FLOW._isoLanguages[k].nativeName
            }));
        });

        this.set('content', tmp);
        this._super();
    }
});

FLOW.SurveyPointTypeController = Ember.ArrayController.extend({
    init: function () {
        var tmp = [];

        FLOW._surveyPointType.forEach(function (e) {
            tmp.push(Ember.Object.create(e));
        });

        this.set('content', tmp);
        this._super();
    }
});
