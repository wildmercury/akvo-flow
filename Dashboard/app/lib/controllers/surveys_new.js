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

FLOW.SurveysNewController = Ember.ObjectController.extend({
    disableSave: function () {
        return !this.get('code') || this.get('code').trim() === '' || this.get('isSaving');
    }.property('code', 'isSaving'),

    save: function () {
        this.set('name', this.get('code'));
        this.get('model').one('didCommit', this, 'afterSave');
        this.get('store').commit();
    },

    afterSave: function () {
        this.transitionToRoute('survey.edit', this.get('model'));
    }
});
