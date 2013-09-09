FLOW.SurveyController = Ember.ObjectController.extend({
    disableSave: function () {
        return !this.get('code') || this.get('code').trim() === '' || !this.get('isDirty') || this.get('isSaving');
    }.property('code', 'isDirty', 'isSaving'),

    disablePublish: function () {
        return this.get('isSaving');
    }.property('isSaving'),

    disablePreview: function () {
        return this.get('isSaving');
    }.property('isSaving'),

    actions: {
        save: function () {
            var survey = this.get('model');

            this.set('name', this.get('code'));

            survey.save();
        }
    }
});
