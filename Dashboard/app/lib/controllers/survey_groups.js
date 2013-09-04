FLOW.SurveyGroupsController = Ember.ArrayController.extend({
    sortAscending: true,
    sortProperties: ['code'],

    creatingNew: false,

    actions: {
        addNewGroup: function () {
            this.set('creatingNew', true);
        },

        cancelNewGroup: function () {
            this.set('newSurveyGroup', '');
            this.set('creatingNew', false);
        },

        createSurveyGroup: function () {
            var controller = this,
                groupName = this.get('newSurveyGroup') && this.get('newSurveyGroup').capitalize();

            if (!groupName) {
                return;
            }

            this.store.createRecord('survey_group', {
                code: groupName,
                name: groupName
            }).save().then(function () {
                controller.send('cancelNewGroup');
            });
        }
    }
});
