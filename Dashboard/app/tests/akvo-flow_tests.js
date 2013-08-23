FLOW.rootElement = '#ember-testing';
FLOW.setupForTesting();
FLOW.injectTestHelpers();

module('Integration tests', {
    setup: function () {
        Ember.run(FLOW, FLOW.advanceReadiness);
    },
    teardown: function () {
        //FLOW.reset();
    }
});

test('/', function () {
    visit('/')
        .then(function () {
            equal(find('h2').text(), 'Survey Groups', 'Application header is rendered');
            ok(find('ul[data-flow-id="survey_groups"]'), 'Survey Group List is present');
        })
        .click('ul[data-flow-id="survey_groups"] > li > a:first')
        .then(function () {
            var title = $('ul[data-flow-id="survey_groups"] > li:first').text();
            equal(find('h3').text(), title, 'Survey Group title is present');
        });
});
