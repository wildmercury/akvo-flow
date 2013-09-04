require('akvo-flow/core');
require('akvo-flow/models/common');
require('akvo-flow/models/models');

FLOW.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'rest'
});

FLOW.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: 'keyId'
});
