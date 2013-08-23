/*jshint evil:true */

require('akvo-flow/ext');
require('akvo-flow/env');

FLOW = Ember.Application.create({
    VERSION: '{{VERSION}}',
    LOG_TRANSITIONS: true,
    LOG_ACTIVE_GENERATION: true,
    LOG_TRANSITIONS_INTERNAL: true
});


if (window.location.search.indexOf('test=true') !== -1) {
    document.write(
        '<div id="qunit"></div>' +
        '<div id="qunit-fixture"></div>' +
        '<div id="ember-testing-container">' +
        '  <div id="ember-testing"></div>' +
        '</div>' +
        '<link rel="stylesheet" href="vendor/qunit.css">' +
        '<script src="vendor/qunit.js"></script>' +
        '<script src="app-tests.js"></script>'
    );
}
