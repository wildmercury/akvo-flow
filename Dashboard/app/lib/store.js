require('akvo-flow/core');
require('akvo-flow/models/common');
require('akvo-flow/models/models');

DS.RESTAdapter.reopen({
    namespace: 'rest'
});

DS.RESTSerializer.reopen({
    primaryKey: 'keyId'
});
