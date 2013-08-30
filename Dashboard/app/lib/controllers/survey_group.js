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
            this.set('isEditing', true);
        },

        cancelEdit: function () {
            if (this.get('model').get('isDirty')) {
                this.get('model').rollback();
            }
            this.set('isEditing', false);
        },

        saveEdit: function () {
            var code = this.get('code') && this.get('code').capitalize();

            if (!code) {
                return;
            }

            this.set('name', code);
            this.set('code', code);

            this.get('model').one('didCommit', this, 'afterSave');
            this.get('store').commit();

        },

        deleteSurveyGroup: function () {
            var sg = this.get('model');

            sg.deleteRecord();

            this.get('store').commit();

            this.transitionToRoute('survey_groups');
        }
    },

    afterSave: function () {
        this.set('isEditing', false);
    }
});
