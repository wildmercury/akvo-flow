FLOW.SurveyGroupController = Ember.ObjectController.extend({
    isEditing: false,

    edit: function () {
        this.set('isEditing', true);
    },

    cancelEdit: function () {
        this.set('isEditing', false);
    },

    saveEdit: function () {
        var name = this.get('name') && this.get('name').capitalize();

        if (!name) {
            return;
        }

        this.set('name', name);
        this.set('code', name);

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
