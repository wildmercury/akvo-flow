FLOW.SurveyGroupController = Ember.ObjectController.extend({
    isEditing: false,

    edit: function () {
        this.set('isEditing', true);
    },

    cancelEdit: function () {
        this.set('isEditing', false);
    },

    saveEdit: function () {
        var code = this.get('code') && this.get('code').capitalize();

        if (!code) {
            return;
        }

        this.set('name', code);
        this.set('code', code);

        this.get('store').commit();

        this.cancelEdit();
    },

    disableDelete: function () {
        return this.get('surveyCount') !== 0;
    }.property('surveyCount'),

    deleteSurveyGroup: function () {
        var sg = this.get('model');

        sg.deleteRecord();

        this.get('store').commit();

        this.transitionToRoute('survey_groups');
    }
});
