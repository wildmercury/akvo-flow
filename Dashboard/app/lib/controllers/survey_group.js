FLOW.SurveyGroupController = Ember.ObjectController.extend({
    isEditing: false,

    disableDelete: function () {
        return this.get('surveyCount') !== 0;
    }.property('surveyCount'),

    disableSave: function () {
        return !this.get('code') || this.get('isSaving');
    }.property('code', 'isSaving'),

    disableCancel: function () {
        return this.get('isSaving');
    }.property('isSaving'),

    actions: {
        edit: function () {
            this.toggleProperty('isEditing');
        },

        cancelEdit: function () {
            if (this.get('model').get('isDirty')) {
                this.get('model').rollback();
            }
            this.toggleProperty('isEditing');
        },

        saveEdit: function () {
            var controller = this,
                code = this.get('code') && this.get('code').capitalize();

            if (!code) {
                return;
            }

            this.set('name', code);
            this.set('code', code);

            this.get('model').save().then(function () {
                controller.send('cancelEdit');
            });

        },

        deleteSurveyGroup: function () {
            this.get('model').deleteRecord();
            this.get('model').save();
            this.transitionToRoute('survey_groups');
        },

        editSurvey: function (survey) {
            this.transitionToRoute('survey', survey);
        }
    }
});
