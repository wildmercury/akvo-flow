FLOW.SurveyQuestionGroupsController = Ember.ArrayController.extend({
    sortProperties: ['order'],
    sortAscending: true,
    isLoaded: false,
    needs: 'survey',
    survey: Ember.computed.alias('controllers.survey')
});
