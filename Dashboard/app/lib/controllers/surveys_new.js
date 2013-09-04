FLOW.SurveysNewController = Ember.ObjectController.extend({
    disableSave: function () {
        return !this.get('code') || this.get('code').trim() === '' || this.get('isSaving');
    }.property('code', 'isSaving'),

    actions: {
        save: function () {
            var survey = this.get('model'),
                controller = this;

            this.set('name', this.get('code'));

            survey.save().then(function () {
                controller.transitionToRoute('survey', survey);
            });
        }
    }
});
