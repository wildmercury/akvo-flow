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
            var groupName = this.get('newSurveyGroup') && this.get('newSurveyGroup').capitalize();

            if (!groupName) {
                return;
            }

            FLOW.SurveyGroup.createRecord({
                code: groupName,
                name: groupName
            });

            this.get('store').commit();
            this.send('cancelNewGroup');
        }
    }
});
