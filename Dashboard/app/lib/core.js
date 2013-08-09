require('jquery');
require('bootstrap');
require('handlebars');
require('ember');
require('ember-data');
require('akvo-flow/ext');
require('akvo-flow/env');

FLOW = Ember.Application.create({
    VERSION: '{{VERSION}}'
});
