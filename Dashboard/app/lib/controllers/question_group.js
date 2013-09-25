FLOW.OrderedArrayController = Ember.ArrayController.extend({
    sortProperties: ['order'],
    sortAscending: true
});

FLOW.QuestionsController = FLOW.OrderedArrayController.extend({});
FLOW.QuestionController = Ember.ObjectController.extend({});

FLOW.QuestionGroupsController = FLOW.OrderedArrayController.extend({});

FLOW.QuestionGroupController = Ember.ObjectController.extend({
    needs: 'survey',
    survey: Ember.computed.alias('controllers.survey'),

    isEditing: false,

    questions: FLOW.QuestionsController.create(),

    uName: function () {
        return this.get('name').toUpperCase();
    }.property('name'),

    actions: {
        show: function () {
            var controller = this;

            if (this.get('isEditing')) {
                this.send('collapse');
                return;
            }

            this.get('survey').send('collapseGroups');

            this.store.findQuery('question', {
                questionGroupId: this.get('id')
            }).then(function (data) {
                controller.get('survey').set('editingGroup', controller);
                controller.set('isEditing', true);
                controller.get('questions').set('content', data);
            });

        },

        collapse: function () {
            this.set('isEditing', false);
            this.get('questions').set('content', []);
        }
    }
});
