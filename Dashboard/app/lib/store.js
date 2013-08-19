require('akvo-flow/core');
require('akvo-flow/models/common');
require('akvo-flow/models/models');

FLOW.Store = DS.Store.extend({
    adapter: FLOW.RESTAdapter.create({
        bulkCommit: false,
        namespace: 'rest',
        url: location.protocol + '//' + location.host
    })
});
