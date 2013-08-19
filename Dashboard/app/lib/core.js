require('akvo-flow/ext');
require('akvo-flow/env');

FLOW = Ember.Application.create({
    VERSION: '{{VERSION}}',
    LOG_TRANSITIONS: true,
    LOG_ACTIVE_GENERATION: true,
    LOG_TRANSITIONS_INTERNAL: true
});
