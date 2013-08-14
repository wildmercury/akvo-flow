require('akvo-flow/core');
require('akvo-flow/models/common');

FLOW.store = DS.Store.create({
    adapter: FLOW.RESTAdapter.create({
        bulkCommit: false,
        namespace: 'rest',
        url: location.protocol + '//' + location.host
    })
});
