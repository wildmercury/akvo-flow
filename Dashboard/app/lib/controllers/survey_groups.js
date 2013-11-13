FLOW.SurveyGroupsController = Ember.ArrayController.extend({
    isShown: true,
    sortAscending: true,
    sortProperties: ['code'],

    creatingNew: false,

    actions: {
        addNewGroup: function () {
            this.toggleProperty('creatingNew');
        },

        cancelNewGroup: function () {
            this.set('newSurveyGroup', '');
            this.toggleProperty('creatingNew');
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
