require.config({
  paths: {
    'flowenv': '/flowenv'
    // 'ui-strings': '/ui-strings'
  },
  shim:{
    'flowenv': {
      exports: 'flowenv'
    }
    // 'ui-strings': {
    //   exports: 'ui-strings'
    // }
  }
});

require([
  'app',
  'router/router',
  'models/FLOWrest-adapter-v2-common',
  'controllers/controllers',
  'templates',
  'views/views'
  // 'flowenv'
  // 'ui-strings'
], function () {
  console.log('Get in the FLOW...');
});


// ---------------------------------------------------------------------------
// require('akvo-flow/all_locales');
// require('akvo-flow/models/FLOWrest-adapter-v2-common');
// require('akvo-flow/models/models');
// require('akvo-flow/flowenv');
// require('akvo-flow/controllers/controllers');
// require('akvo-flow/views/views');
// require('akvo-flow/router/router');
// FLOW.initialize();