define('app/templates', ['jquery', 'handlebars', 'ember'], function() {
Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<header class=\"floats-in top\" id=\"header\" role=\"banner\">\n  <div>\n    <hgroup>\n      <h1>Akvo <abbr title=\"field level operations watch\">Flow</abbr></h1>\n    </hgroup>\n    <nav id=\"topnav\" role=\"navigation\">\n      ");
  data.buffer.push("\n    </nav>\n    ");
  data.buffer.push("\n    ");
  data.buffer.push("\n  </div>\n</header>\n\n<div id=\"pageWrap\">\n  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n\n<footer class=\"floats-in bottomPage\" role=\"contentinfo\">\n  <div>\n    <nav id=\"footerNav\" class=\"floats-in\">\n      <ul>\n        <li>\n          <a href=\"http://www.akvo.org/blog/?cat=30\" title=\"Go to News and Software Updates\" \n            target=\"_blank\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_news_and_software_updates", options) : helperMissing.call(depth0, "t", "_news_and_software_updates", options))));
  data.buffer.push("</a>\n        </li>\n        <li>\n          <a href=\"http://flowhelp.akvo.org\" title=\"Support\"\n            target=\"_blank\" > ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_support", options) : helperMissing.call(depth0, "t", "_support", options))));
  data.buffer.push("</a>\n        </li>\n        <li>\n          <a href=\"http://flow.readthedocs.org/en/latest/index.html\" title=\"Documentation and User Guides\"\n            target=\"_blank\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_documentation_and_user_guides", options) : helperMissing.call(depth0, "t", "_documentation_and_user_guides", options))));
  data.buffer.push("</a>\n        </li>\n        <li>\n          <a href=\"http://www.akvo.org/web/terms_of_use \" title=\"Terms of Service\" \n            target=\"_blank\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_terms_of_service", options) : helperMissing.call(depth0, "t", "_terms_of_service", options))));
  data.buffer.push("</a>\n        </li>\n        <li>\n          <a href=\"http://www.akvo.org\" title=\"akvo.org\" target=\"_blank\" \n            class=\"akvoDotOrg\">akvo.org</a>\n          </li>\n        </ul>\n      </nav>  \n    </div>\n  <div>\n    <small>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copyright", options) : helperMissing.call(depth0, "t", "_copyright", options))));
  data.buffer.push(" &copy; 2013 akvo.org</small>\n  </div>\n</footer>");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<p>\n  In ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variable", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(".<br>\n</p>");
  return buffer;
  
});

Ember.TEMPLATES["language"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<form>\n  <label class=\"languageSelector\">\n    <span class=\"labelText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_dashboard_language", options) : helperMissing.call(depth0, "t", "_dashboard_language", options))));
  data.buffer.push(":</span>\n    ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("controller.content"),
    'optionLabelPath': ("controller.content.label"),
    'optionValuePath': ("controller.content.value"),
    'selectionBinding': ("controller.language")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  data.buffer.push("\n   </label>\n</form>");
  return buffer;
  
});});