FLOW.OrderedArrayController = Ember.ArrayController.extend({
    sortProperties: ['order'],
    sortAscending: true
});

FLOW.QuestionsController = FLOW.OrderedArrayController.extend({});
FLOW.QuestionController = Ember.ObjectController.extend({});

FLOW.QuestionGroupsController = FLOW.OrderedArrayController.extend({});
FLOW.QuestionGroupController = Ember.ObjectController.extend({
    isShowing: false,

    questions: FLOW.QuestionsController.create(),

    uName: function () {
        return this.get('name').toUpperCase();
    }.property('name'),

    actions: {
        show: function () {
            var self = this;
            this.set('isShowing', !this.get('isShowing'));
            if (this.get('isShowing')) {
                this.store.findQuery('question', {
                    questionGroupId: this.get('id')
                }).then(function (data) {
                    self.get('questions').set('content', data);
                });
            } else {
                this.get('questions').set('content', []);
            }
        }
    }
});
