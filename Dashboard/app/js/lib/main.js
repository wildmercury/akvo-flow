require.config({
  // paths: {
  //   // Use CDN libs
  //   'handlebars': '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.min',
  //   'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
  //   'ember': '//cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.0-rc.1/ember.min',
  //   // 'emberData': '/assets/js/vendor/ember-data-rev11'
  //   'emberData': '//cdnjs.cloudflare.com/ajax/libs/ember-data.js/0.8.0-latest20121123/ember-data-latest'
  // }
  paths: {
    'flowenv': '/flowenv',
    'ui-strings': '/ui-strings'
  },
  shim:{
    'flowenv': {
      exports: 'flowenv'
    },
    'ui-strings': {
      exports: 'ui-strings'
    }
  }
});

require([
  'app',
  'router/router',
  'models/FLOWrest-adapter-v2',
  'controllers/controllers',
  'templates',
  'views/views',
  'flowenv',
  'ui-strings'
], function () {
  console.log('Get in the FLOW...');
});
