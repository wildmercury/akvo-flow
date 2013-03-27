define('templates', ['app'], function() {
Ember.TEMPLATES["application/application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<div class=\"isSaving\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_saving", options) : helperMissing.call(depth0, "t", "_saving", options))));
  data.buffer.push("</div>\n			");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n			  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.savingMessageControl.areLoadingBool", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<div class=\"isLoading\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_loading", options) : helperMissing.call(depth0, "t", "_loading", options))));
  data.buffer.push("</div>\n			  ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doOK", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCANCEL", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>");
  return buffer;
  }

  data.buffer.push("  <header class=\"floats-in top\" id=\"header\" role=\"banner\">\n        <div>\n            <hgroup>\n                <h1>Akvo\n                    <abbr title=\"field level operations watch\">Flow</abbr></h1>\n            </hgroup>\n            <nav id=\"topnav\" role=\"navigation\">\n                ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.NavigationView", {hash:{
    'controllerBinding': ("controller.controllers.navigationController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </nav>\n    		<div class=\"loadSave\">\n					");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.savingMessageControl.areSavingBool", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n            ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.HeaderView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            \n        </div>\n    </header>\n    <div id=\"pageWrap\">\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  \n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("FLOW.dialogControl.showDialog:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.dialogControl.header", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.dialogControl.message", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n          <br/><br/>\n          <div class=\"buttons menuCentre\"> \n            <ul>  \n              ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.dialogControl.showOK", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n               ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.dialogControl.showCANCEL", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n   ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.FooterView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES["application/footer"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(" <footer class=\"floats-in bottomPage\" role=\"contentinfo\">\n    <div>\n	  <nav id=\"footerNav\" class=\"floats-in\">\n		<ul>\n			<li><a href=\"http://www.akvo.org/blog/?cat=30\" title=\"Go to News and Software Updates\" target=\"_blank\" > ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_news_and_software_updates", options) : helperMissing.call(depth0, "t", "_news_and_software_updates", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://flowhelp.akvo.org\" title=\"Support\" target=\"_blank\" > ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_support", options) : helperMissing.call(depth0, "t", "_support", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://flow.readthedocs.org/en/latest/index.html\" title=\"Documentation and User Guides\" target=\"_blank\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_documentation_and_user_guides", options) : helperMissing.call(depth0, "t", "_documentation_and_user_guides", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://www.akvo.org/web/terms_of_use \" title=\"Terms of Service\" target=\"_blank\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_terms_of_service", options) : helperMissing.call(depth0, "t", "_terms_of_service", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://www.akvo.org\" title=\"akvo.org\" target=\"_blank\" class=\"akvoDotOrg\">akvo.org</a></li>\n      <li><a href=\"/admin/logout.html\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_log_out", options) : helperMissing.call(depth0, "t", "_log_out", options))));
  data.buffer.push("</a></li>\n		</ul>\n	</nav>  \n  </div>\n  <div><small>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copyright", options) : helperMissing.call(depth0, "t", "_copyright", options))));
  data.buffer.push(" &copy; 2013 akvo.org</small></div>\n  <p id=\"back-top\"> <a href=\"#header\"><span></span>Back to Top</a> </p>\n</footer>\n");
  return buffer;
  
});

Ember.TEMPLATES["application/header-common"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<form>\n   <label class=\"languageSelector\"><span class=\"labelText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_dashboard_language", options) : helperMissing.call(depth0, "t", "_dashboard_language", options))));
  data.buffer.push(":</span> ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.dashboardLanguageControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("FLOW.dashboardLanguageControl.dashboardLanguage")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n   </label>\n</form>\n<section id=\"userLog\">\n  <ul>\n    <li class=\"userLogin\"><a href=\"#\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_login", options) : helperMissing.call(depth0, "t", "_login", options))));
  data.buffer.push("</a></li>\n    <li class=\"userRegister\"><a href=\"#\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_register", options) : helperMissing.call(depth0, "t", "_register", options))));
  data.buffer.push("</a></li>\n  </ul>\n  <ul>\n    <li></li>\n    <li></li>\n  </ul>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["application/navigation"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavSurveys", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_surveys", options) : helperMissing.call(depth0, "t", "_surveys", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavDevices", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_devices", options) : helperMissing.call(depth0, "t", "_devices", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavData", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_data", options) : helperMissing.call(depth0, "t", "_data", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavReports", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_reports", options) : helperMissing.call(depth0, "t", "_reports", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavMaps", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_maps", options) : helperMissing.call(depth0, "t", "_maps", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavUsers", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_users", options) : helperMissing.call(depth0, "t", "_users", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavMessages", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_messages", options) : helperMissing.call(depth0, "t", "_messages", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

  data.buffer.push("<ul class=\"floats-in\">\n 	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navSurveys")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navDevices")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navData")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navReports")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n 	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navMaps")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navUsers")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n  ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navMessages")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["navAdmin/nav-admin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["navData/applets/bulk-import-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataImportAppletImpl\"\n	archive=\"../exporterapplet.jar,../gdata-core-1.0.jar\">\n	<param name=\"importType\" value=\"BULK_SURVEY\">\n	<param name=\"selectionMode\" value=\"dir\">\n	<param name=\"java_arguments\" value=\"-Xmx1024m\">\n	<param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navData/applets/raw-data-import-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataImportAppletImpl\"\n	archive=\"../exporterapplet.jar,../json.jar,../jcommon-1.0.16.jar,../jfreechart-1.0.13.jar,../poi-3.8-20120326.jar,../poi-ooxml-3.8-20120326.jar,../poi-ooxml-schemas-3.8-20120326.jar,../xbean.jar,../dom4j-1.6.1.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\"\n		value=\"exporterapplet.jar,json.jar,poi-3.5-signed.jar\">\n	<param name=\"cache-version\" value=\"1.3,1.0,3.5\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n	<param name=\"java_arguments\" value=\"-Xmx512m\">\n	<param name=\"importType\" value=\"RAW_DATA\">\n	<param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n	<param name=\"criteria\" value=\"k:=test;surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navData/bulk-upload"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n       \n <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push("</h1>\n\n  <div class=\"bulkUpload block\">    \n    <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push("</h3>\n    <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_upload_applet_text_", options) : helperMissing.call(depth0, "t", "_upload_applet_text_", options))));
  data.buffer.push("</p>\n    <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showBulkUploadApplet", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push(" </a>\n  </div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showBulkUploadAppletBool", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.bulkImportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth\" id=\"reportBlocks\">\n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.BulkUploadAppletView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navData/data-cleaning"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n    <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_data_cleaning", options) : helperMissing.call(depth0, "t", "_data_cleaning", options))));
  data.buffer.push("</h1>\n\n    ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n    ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n    <div class=\"rawDataReport block\">\n      <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_raw_data_report", options) : helperMissing.call(depth0, "t", "_export_raw_data_report", options))));
  data.buffer.push("</h3>\n      <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report_applet_text_", options) : helperMissing.call(depth0, "t", "_raw_data_report_applet_text_", options))));
  data.buffer.push("</p>\n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRawDataReport", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report", options) : helperMissing.call(depth0, "t", "_raw_data_report", options))));
  data.buffer.push(" </a>\n    </div>\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showRawDataReportApplet", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n\n    <div class=\"rawDataReport block\">\n      <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_import_cleaned_survey_data", options) : helperMissing.call(depth0, "t", "_import_cleaned_survey_data", options))));
  data.buffer.push("</h3>\n      <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_import_raw_data_applet_text_", options) : helperMissing.call(depth0, "t", "_import_raw_data_applet_text_", options))));
  data.buffer.push("</p>\n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showImportApplet", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_import_clean_data", options) : helperMissing.call(depth0, "t", "_import_clean_data", options))));
  data.buffer.push(" </a>\n    </div>\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showRawDataImportApplet", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n      ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.rawDataReportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n       ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.rawDataImportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth\" id=\"reportBlocks\">\n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.ExportReportsAppletView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["navData/data-subnav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInspectData", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_inspect_data", options) : helperMissing.call(depth0, "t", "_inspect_data", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doManageAttributes", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_attributes", options) : helperMissing.call(depth0, "t", "_manage_attributes", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doBulkUpload", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doDataCleaning", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_data_cleaning", options) : helperMissing.call(depth0, "t", "_data_cleaning", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

  data.buffer.push("<ul>\n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("inspectData")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("manageAttributes")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("bulkUpload")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("dataCleaning")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["navData/inspect-data"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <section class=\"fullWidth\" id=\"inspectData\">\n    <div class=\"floats-in\" id=\"dataFilter\">\n      <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_choose_survey_data_to_display", options) : helperMissing.call(depth0, "t", "_choose_survey_data_to_display", options))));
  data.buffer.push(":</h1>\n      <div class=\"chooseSurveyData\">\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n			<div class=\"dataCollectedDate\">\n        <label class=\"collectedFrom\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_collected_from", options) : helperMissing.call(depth0, "t", "_collected_from", options))));
  data.buffer.push(":\n          ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.fromDate"),
    'elementId': ("from_date"),
    'placeholder': ("Collected from"),
    'placeholderBinding': ("Ember.STRINGS._collected_from"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </label>\n\n        <label class=\"collectedTo\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to", options) : helperMissing.call(depth0, "t", "_to", options))));
  data.buffer.push(":\n          ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.toDate"),
    'elementId': ("to_date"),
    'placeholder': ("To"),
    'placeholderBinding': ("Ember.STRINGS._to"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </label>\n			</div>\n			<div class=\"dataDeviceId\">\n        <label  class=\"devideId\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_id", options) : helperMissing.call(depth0, "t", "_device_id", options))));
  data.buffer.push(":</label> \n        ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.deviceId"),
    'placeholder': (""),
    'placeholderBinding': ("Ember.STRINGS._device_id"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n        <label class=\"submitterName\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_submitter_name", options) : helperMissing.call(depth0, "t", "_submitter_name", options))));
  data.buffer.push(":</label> \n        ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.submitterName"),
    'placeholder': (""),
    'placeholderBinding': ("Ember.STRINGS._submitter_name"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doFindSurveyInstances", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"findData\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_find", options) : helperMissing.call(depth0, "t", "_find", options))));
  data.buffer.push("</a>\n    </div>\n    <section class=\"fullWidth \" id=\"devicesList\">\n      <table class=\"dataTable\" id=\"surveyDataTable\">\n        <thead>\n          <tr>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id", options) : helperMissing.call(depth0, "t", "_id", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_submitter", options) : helperMissing.call(depth0, "t", "_submitter", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device", options) : helperMissing.call(depth0, "t", "_device", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_collected", options) : helperMissing.call(depth0, "t", "_collected", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_action", options) : helperMissing.call(depth0, "t", "_action", options))));
  data.buffer.push("</th>\n          </tr>\n        </thead>\n        <tbody>\n          ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "SI", "in", "FLOW.surveyInstanceControl", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </tbody>\n        <tfoot>\n          <tr>\n            <td colspan=\"7\"><small>This is the footer.</small></td>\n          </tr>\n        </tfoot>\n      </table>\n      <ul class=\"prevNext\">\n        <li class=\"prevBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasPrevPage", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </li>\n        <li class=\"nextBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasNextPage", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </li>\n      </ul>\n    </section>\n\n    <!-- edit surveyInstance popup-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showEditSurveyInstanceWindowBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanketWide\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialogWide\">\n		     <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCloseEditSIWindow", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok clodeDialog\">close window</a>\n\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_answers", options) : helperMissing.call(depth0, "t", "_edit_answers", options))));
  data.buffer.push("</h2>\n            <nav class=\"editAnswerMenu\"> \n            <ul>  \n              <li class=\"prevBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPreviousSI", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">&lsaquo; ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_previous_record", options) : helperMissing.call(depth0, "t", "_previous_record", options))));
  data.buffer.push("</a></li>\n              <li class=\"deleteBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delSI", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a></li>\n             <!--  <li class=\"saveBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSaveSI", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li> -->\n              <li class=\"nextBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNextSI", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_next_record", options) : helperMissing.call(depth0, "t", "_next_record", options))));
  data.buffer.push(" &rsaquo;</a></li>\n            </ul>\n          </nav>\n        <p>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.siString", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n\n <table class=\"dataTable\" id=\"surveyDataTable\">\n            <!-- TABLE HEADER-->\n            <thead>\n                <tr>\n                    <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id", options) : helperMissing.call(depth0, "t", "_id", options))));
  data.buffer.push("</th>\n                    <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question", options) : helperMissing.call(depth0, "t", "_question", options))));
  data.buffer.push("</th>\n                    <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_answer", options) : helperMissing.call(depth0, "t", "_answer", options))));
  data.buffer.push("</th>                \n                </tr>\n            </thead>\n            <!-- TABLE BODY: MAIN CONTENT-->\n            <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "QA", "in", "FLOW.questionAnswerControl", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </tbody>\n            <!-- TABLE FOOTER-->\n            <tfoot>\n                <tr>\n                    <td colspan=\"7\"><small>This is the footer.</small></td>\n                </tr>\n            </tfoot>\n        </table>\n\n        </div>\n      </div>\n    </div>\n\n</section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n            ");
  hashTypes = {};
  stack1 = helpers.unless.call(depth0, "SI.isDeleted", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n            <tr>\n              <td class=\"device\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"survey\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.surveyCode", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"submitter\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.submitterName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"device\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.deviceIdentifier", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"collected\">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "SI", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n              <td class=\"action\">\n                <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showEditSurveyInstanceWindow", "SI", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("\n                </a>\n                ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.DataItemView", {hash:{
    'contentBinding': ("SI")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </td>\n            </tr>\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date1),stack1 ? stack1.call(depth0, "collectionDate", options) : helperMissing.call(depth0, "date1", "collectionDate", options))));
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delSI2", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" >\n                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("\n                </a>");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPrevPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> &lsaquo; ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_previous", options) : helperMissing.call(depth0, "t", "_previous", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNextPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_next", options) : helperMissing.call(depth0, "t", "_next", options))));
  data.buffer.push(" &rsaquo;</a>");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                  ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.QuestionAnswerView", {hash:{
    'contentBinding': ("QA")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                    <tr>\n                      <td class=\"device\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                      <td class=\"survey\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.questionText", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    \n                    <td class=\"submitter\" style=\"text-align:left;\">\n                    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.inEditMode", {hash:{},inverse:self.program(29, program29, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </td>\n                    </tr>\n                    ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isOptionType", {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSave", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a> <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a>\n                    ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("view.optionsList"),
    'optionLabelPath': ("content.value"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.optionChoice")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isNumberType", {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                            ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.numberValue"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                          ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                            ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isTextType", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                          ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                              ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.value"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                              ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isDateType", {hash:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                                ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField2", {hash:{
    'valueBinding': ("view.date"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              ");
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                                ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isBarcodeType", {hash:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                              ");
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_barcode_app_on_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_barcode_app_on_the_device_is_used_here", options))));
  data.buffer.push("\n                                  ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.value"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isNotEditable", {hash:{},inverse:self.program(35, program35, data),fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isPhotoType", {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      ");
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  <a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.photoUrl")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" target=\"_blank\">Open photo</a> \n                        ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isDateType", {hash:{},inverse:self.program(39, program39, data),fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      ");
  return buffer;
  }
function program36(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "QA", {hash:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n                        ");
  return buffer;
  }
function program37(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "value", options) : helperMissing.call(depth0, "date3", "value", options))));
  }

function program39(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                        ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.inspectDataTableView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navData/manage-attributes"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddAttributeDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn btnAboveTable\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_attribute", options) : helperMissing.call(depth0, "t", "_add_new_attribute", options))));
  data.buffer.push("</a>\n        <table class=\"dataTable\" id=\"attributeDataTable\">\n            <!-- TABLE HEADER-->\n            <thead>\n                <tr>\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("keyId"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("name"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("group"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("valueType"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                 <th class=\"action noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_action", options) : helperMissing.call(depth0, "t", "_action", options))));
  data.buffer.push("</th>\n                </tr>\n            </thead>\n            <!-- TABLE BODY: MAIN CONTENT-->\n            <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "attribute", "in", "FLOW.attributeControl", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </tbody>\n            <!-- TABLE FOOTER-->\n            <tfoot>\n                <tr>\n                    <td colspan=\"7\"><small>This is the footer.</small></td>\n                </tr>\n            </tfoot>\n        </table>\n\n <!-- add attribute dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddAttributeDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_attribute", options) : helperMissing.call(depth0, "t", "_add_new_attribute", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_provide_a_name_", options) : helperMissing.call(depth0, "t", "_please_provide_a_name_", options))));
  data.buffer.push("</p>\n          <br/>\n         <label for=\"newAttributeName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_attribute_name", options) : helperMissing.call(depth0, "t", "_attribute_name", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeName"),
    'id': ("newAttributeName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         <label for=\"newAttributeGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_tag", options) : helperMissing.call(depth0, "t", "_tag", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeGroup"),
    'id': ("newAttributeGroup"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_value_type", options) : helperMissing.call(depth0, "t", "_value_type", options))));
  data.buffer.push(":</label>\n             ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeTypeControl.content"),
    'selectionBinding': ("view.newAttributeType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_value_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  <!-- edit existing attribute dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showEditAttributeDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_attribute", options) : helperMissing.call(depth0, "t", "_edit_attribute", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_edit_the_attribute_name_", options) : helperMissing.call(depth0, "t", "_please_edit_the_attribute_name_", options))));
  data.buffer.push(".</p>\n          <label for=\"editAttributeName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_attribute_name", options) : helperMissing.call(depth0, "t", "_attribute_name", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editAttributeName"),
    'id': ("editUserName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"editAttributeGroup\">Tag:</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editAttributeGroup"),
    'id': ("editEmail"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_value_type", options) : helperMissing.call(depth0, "t", "_value_type", options))));
  data.buffer.push(":</label>\n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeTypeControl.content"),
    'selectionBinding': ("FLOW.editControl.editAttributeType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_attribute_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEditAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id", options) : helperMissing.call(depth0, "t", "_id", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_attribute_name", options) : helperMissing.call(depth0, "t", "_attribute_name", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_tag", options) : helperMissing.call(depth0, "t", "_tag", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_value_type", options) : helperMissing.call(depth0, "t", "_value_type", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <tr>\n                    <td class=\"name\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "attribute.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    <td class=\"name\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "attribute.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    <td class=\"group\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "attribute.group", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    <td class=\"valueType\" >");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "attribute", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n\n                    <td class=\"action\">\n                      ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.AttributeView", {hash:{
    'contentBinding': ("attribute")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showEditAttributeDialog", "attribute", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"edit\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a> </td>\n                  </tr>\n                ");
  return buffer;
  }
function program11(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.toAttributeType),stack1 ? stack1.call(depth0, "valueType", options) : helperMissing.call(depth0, "toAttributeType", "valueType", options))));
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delAttr", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth\" id=\"manageAttributes\">\n");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.ManageAttributesTableView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </section>");
  return buffer;
  
});

Ember.TEMPLATES["navData/nav-data"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"dataSection floats-in\" id=\"main\" role=\"main\">\n  <div id=\"tabs\">\n    <nav class=\"tabNav floats-in\">\n      ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DatasubnavView", {hash:{
    'controllerBinding': ("controller.controllers.datasubnavController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </nav>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/assignment-edit-tab/assignment-edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<section class=\"fullWidth\" id=\"assignSurveys\">\n  <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_assignment", options) : helperMissing.call(depth0, "t", "_edit_assignment", options))));
  data.buffer.push("</h1>\n     <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditSurveyAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"stepBack\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_go_back_to_assignment_list", options) : helperMissing.call(depth0, "t", "_go_back_to_assignment_list", options))));
  data.buffer.push("</a>\n    <form>\n      <fieldset id=\"assignmentDetails\">\n        <h2>01. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_assignment_details", options) : helperMissing.call(depth0, "t", "_assignment_details", options))));
  data.buffer.push("</h2>\n        <label for=\"assignmentName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_assignment_name", options) : helperMissing.call(depth0, "t", "_assignment_name", options))));
  data.buffer.push(":</label>\n          ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.assignmentName"),
    'id': ("assignmentName"),
    'placeholder': (""),
    'placeholderBinding': ("Ember.STRINGS._enter_a_name_for_this_assignment"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n        <div class=\"dateRange\">\n          <div class=\"activeDate\">\n            <label for=\"startDate\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_start_date", options) : helperMissing.call(depth0, "t", "_start_date", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'size': "INTEGER",'class': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.fromDate"),
    'elementId': ("from_date"),
    'size': (30),
    'class': ("datePicker")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n          </div>\n          <div class=\"expireDate\">\n            <label for=\"expireDate\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_expiration_date", options) : helperMissing.call(depth0, "t", "_expiration_date", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'size': "INTEGER",'class': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.toDate"),
    'elementId': ("to_date"),
    'size': (30),
    'class': ("datePicker")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n          </div>\n        </div>\n      </fieldset>\n      <div class=\"fieldSetWrap\">\n        <fieldset id=\"surveySelect\" class=\"formLeftPanel\">\n          <h2>02. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey", options) : helperMissing.call(depth0, "t", "_select_survey", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <label for=\"surveyGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey_group", options) : helperMissing.call(depth0, "t", "_select_survey_group", options))));
  data.buffer.push(":</label>\n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'id': ("surveyGroup"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			<span class=\"infoText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cant_find_your_survey_", options) : helperMissing.call(depth0, "t", "_cant_find_your_survey_", options))));
  data.buffer.push("</span>\n			</div>\n          <div class=\"\">\n            <nav>\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_all", options) : helperMissing.call(depth0, "t", "_select_all", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deselectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_deselect_all", options) : helperMissing.call(depth0, "t", "_deselect_all", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n            <label for=\"surveys\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_surveys", options) : helperMissing.call(depth0, "t", "_select_surveys", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'multiple': "BOOLEAN",'size': "INTEGER",'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'id': "STRING",'optionValuePath': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'multiple': (true),
    'size': (10),
    'contentBinding': ("FLOW.surveyControl.publishedContent"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveys"),
    'optionLabelPath': ("content.name"),
    'id': ("surveys"),
    'optionValuePath': ("content.keyId")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSelectedSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  class=\"AddBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_selected_surveys", options) : helperMissing.call(depth0, "t", "_add_selected_surveys", options))));
  data.buffer.push("</a>\n          </div>\n        </fieldset>\n        <fieldset id=\"surveyPreview\" class=\"formRightPanel\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview_survey_selection", options) : helperMissing.call(depth0, "t", "_preview_survey_selection", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <!-- DEVICES TABLE-->\n            <table id=\"surveyPreviewList\" class=\"previewList\" >\n              <!-- TABLE HEADER-->\n              <thead>\n                <tr>\n                  <th class=\"groupPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_group", options) : helperMissing.call(depth0, "t", "_survey_group", options))));
  data.buffer.push("</th>\n                  <th class=\"surveyPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</th>\n                  <th class=\"action\"></th>\n                </tr>\n              </thead>\n              <!-- TABLE BODY: MAIN CONTENT-->\n              <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "survey", "in", "view.surveysPreview", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </tbody>\n              <!-- TABLE FOOTER-->\n              <tfoot>\n                <tr>\n                  <td colspan=\"7\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_clear_all", options) : helperMissing.call(depth0, "t", "_clear_all", options))));
  data.buffer.push("</a></td>\n                </tr>\n              </tfoot>\n            </table>\n          </div>\n        </fieldset>\n      </div>\n    \n    <div class=\"fieldSetWrap makeWhite\">\n        <fieldset id=\"devicesSelect\" class=\"formLeftPanel\">\n          <h2>03. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_devices", options) : helperMissing.call(depth0, "t", "_select_devices", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n          <label for=\"deviceGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_device_group", options) : helperMissing.call(depth0, "t", "_select_device_group", options))));
  data.buffer.push(":</label>\n          ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedDeviceGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'id': ("deviceGroup"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          </div>\n          <div class=\"\">\n            <nav>\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectAllDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_all", options) : helperMissing.call(depth0, "t", "_select_all", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deselectAllDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_deselect_all", options) : helperMissing.call(depth0, "t", "_deselect_all", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n          <label for=\"devices\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_devices", options) : helperMissing.call(depth0, "t", "_select_devices", options))));
  data.buffer.push(":</label>\n          ");
  hashTypes = {'multiple': "BOOLEAN",'size': "INTEGER",'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'multiple': (true),
    'size': (10),
    'contentBinding': ("FLOW.devicesInGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedDevices"),
    'optionLabelPath': ("content.combinedName"),
    'optionValuePath': ("content.keyId"),
    'id': ("devices")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSelectedDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"AddBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_selected_devices", options) : helperMissing.call(depth0, "t", "_add_selected_devices", options))));
  data.buffer.push("</a>\n          </div>\n        </fieldset>\n        <fieldset id=\"devicesPreview\" class=\"formRightPanel\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview_device_selection", options) : helperMissing.call(depth0, "t", "_preview_device_selection", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <!-- DEVICES TABLE-->\n            <table id=\"devicePreviewList\" class=\"previewList\" >\n              <!-- TABLE HEADER-->\n              <thead>\n                <tr>\n                  <th class=\"groupPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_group", options) : helperMissing.call(depth0, "t", "_device_group", options))));
  data.buffer.push("</th>\n                  <th class=\"surveyPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device", options) : helperMissing.call(depth0, "t", "_device", options))));
  data.buffer.push("</th>\n                  <th class=\"action\"></th>\n                </tr>\n              </thead>\n              <!-- TABLE BODY: MAIN CONTENT-->\n              <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "device", "in", "view.devicesPreview", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </tbody>\n              <!-- TABLE FOOTER-->\n              <tfoot>\n                <tr>\n                  <td colspan=\"7\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeAllDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_clear_all", options) : helperMissing.call(depth0, "t", "_clear_all", options))));
  data.buffer.push("</a></td>\n                </tr>\n              </tfoot>\n            </table>\n          </div>\n        </fieldset>\n      </div>\n      <div class=\"menuConfirm\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveSurveyAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save_assignment", options) : helperMissing.call(depth0, "t", "_save_assignment", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditSurveyAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </div>\n    </form>\n  </div>\n</section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                <tr>\n                  <td class=\"groupPreview\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.surveyGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"surveyPreview\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSingleSurvey", "survey", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a></td>\n                </tr>\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                <tr>\n                  <td class=\"deviceGroup\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "device.deviceGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"deviceId\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "device.combinedName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSingleDevice", "device", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a></td>\n                </tr>\n                ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.AssignmentEditView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navDevices/assignment-list-tab/assignment-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createNewAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn btnAboveTable\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_create_new_assignment", options) : helperMissing.call(depth0, "t", "_create_new_assignment", options))));
  data.buffer.push("</a>\n  <div id=\"devicesListTable_length\" class=\"dataTables_length\"> </div>\n  <table class=\"dataTable\" id=\"deviceDataTable\">\n    <!-- TABLE HEADER-->\n    <thead>\n      <tr> ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("name"),
    'type': ("assignment")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("startDate"),
    'type': ("assignment")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("endDate"),
    'type': ("assignment")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        <th class=\"action noArrows\"> <a>Action</a></th>\n      </tr>\n    </thead>\n    <!-- TABLE BODY: MAIN CONTENT-->\n    <tbody>\n    \n    ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "assignment", "in", "FLOW.surveyAssignmentControl", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n    \n    <!-- TABLE FOOTER-->\n    <tfoot>\n      <tr>\n        <td colspan=\"7\"><small>This is the footer.</small></td>\n      </tr>\n    </tfoot>\n  </table>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_name", options) : helperMissing.call(depth0, "t", "_name", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_start_date", options) : helperMissing.call(depth0, "t", "_start_date", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_end_date", options) : helperMissing.call(depth0, "t", "_end_date", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n    <tr>\n      <td class=\"name\" style=\"text-align:left; padding:0 0 0 5px;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "assignment.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"startDate\" >");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "assignment", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n      <td class=\"endDate\" >");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "assignment", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n      <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editSurveyAssignment", "assignment", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"edit\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a> ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.AssignmentView", {hash:{
    'contentBinding': ("assignment")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n    </tr>\n    ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "startDate", options) : helperMissing.call(depth0, "date3", "startDate", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "endDate", options) : helperMissing.call(depth0, "date3", "endDate", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delAssignment", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth \" id=\"assignmentsList\"> \n  <!-- assignments TABLE--> \n  \n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.AssignmentsListTabView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/bootstrap-tab/survey-bootstrap"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<section class=\"fullWidth manualTransfer\" id=\"assignSurveys\">\n  <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manual_survey_transfer", options) : helperMissing.call(depth0, "t", "_manual_survey_transfer", options))));
  data.buffer.push("</h1>\n    <form>\n      <div class=\"fieldSetWrap\">\n        <fieldset id=\"surveySelect\" class=\"formLeftPanel\">\n          <h2>01. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey", options) : helperMissing.call(depth0, "t", "_select_survey", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <label for=\"surveyGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey_group", options) : helperMissing.call(depth0, "t", "_select_survey_group", options))));
  data.buffer.push(":</label>\n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'id': ("surveyGroup"),
    'prompt': ("Select survey group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			<span class=\"infoText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cant_find_your_survey_", options) : helperMissing.call(depth0, "t", "_cant_find_your_survey_", options))));
  data.buffer.push("</span>\n			</div>\n          <div class=\"\">\n            <nav>\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_all", options) : helperMissing.call(depth0, "t", "_select_all", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deselectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_deselect_all", options) : helperMissing.call(depth0, "t", "_deselect_all", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n            <label for=\"surveys\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_surveys", options) : helperMissing.call(depth0, "t", "_select_surveys", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'multiple': "BOOLEAN",'size': "INTEGER",'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'id': "STRING",'optionValuePath': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'multiple': (true),
    'size': (10),
    'contentBinding': ("FLOW.surveyControl.publishedContent"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveys"),
    'optionLabelPath': ("content.name"),
    'id': ("surveys"),
    'optionValuePath': ("content.keyId")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSelectedSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  class=\"AddBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_selected_surveys", options) : helperMissing.call(depth0, "t", "_add_selected_surveys", options))));
  data.buffer.push("</a>\n          </div>\n        </fieldset>\n        <fieldset id=\"surveyPreview\" class=\"formRightPanel\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview_survey_selection", options) : helperMissing.call(depth0, "t", "_preview_survey_selection", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <!-- DEVICES TABLE-->\n            <table id=\"surveyPreviewList\" class=\"previewList\" >\n              <!-- TABLE HEADER-->\n              <thead>\n                <tr>\n                  <th class=\"groupPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_group", options) : helperMissing.call(depth0, "t", "_survey_group", options))));
  data.buffer.push("</th>\n                  <th class=\"surveyPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</th>\n                  <th class=\"action\"></th>\n                </tr>\n              </thead>\n              <!-- TABLE BODY: MAIN CONTENT-->\n              <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "survey", "in", "view.surveysPreview", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </tbody>\n              <!-- TABLE FOOTER-->\n              <tfoot>\n                <tr>\n                  <td colspan=\"7\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_clear_all", options) : helperMissing.call(depth0, "t", "_clear_all", options))));
  data.buffer.push("</a></td>\n                </tr>\n              </tfoot>\n            </table>\n          </div>\n        </fieldset>\n      </div>\n    \n    <div class=\"fieldSetWrap makeWhite noBG\">\n        <fieldset id=\"devicesSelect\" class=\"fullWidth\">\n          <h2>02. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_notification_details", options) : helperMissing.call(depth0, "t", "_notification_details", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n          <label for=\"notificationEmail\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_notification_email", options) : helperMissing.call(depth0, "t", "_notification_email", options))));
  data.buffer.push(":</label>\n         ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'placeholder': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.notificationEmail"),
    'id': ("notificationEmail"),
    'placeholder': ("Enter the notification email"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         <label for=\"includeDBInstructions\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_include_db_instructions", options) : helperMissing.call(depth0, "t", "_include_db_instructions", options))));
  data.buffer.push(":</label>\n         ");
  hashTypes = {'checkedBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.includeDBInstructions"),
    'id': ("includeDBInstructions")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.includeDBInstructions", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </fieldset>\n      </div>\n      <div class=\"menuConfirm\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_send_file", options) : helperMissing.call(depth0, "t", "_send_file", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </div>\n    </form>\n</section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                <tr>\n                  <td class=\"groupPreview\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.surveyGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"surveyPreview\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSingleSurvey", "survey", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a></td>\n                </tr>\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n           ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("view.dbInstructions"),
    'id': ("dbInstructions")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyBootstrap", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navDevices/devices-list-tab/devices-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showManageDeviceGroupsDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn btnAboveTable\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_device_groups", options) : helperMissing.call(depth0, "t", "_manage_device_groups", options))));
  data.buffer.push("</a> \n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "FLOW.deviceControl.atLeastOneSelected", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  <table class=\"dataTable\" id=\"surveyDataTable\">\n    <!-- TABLE HEADER-->\n    <thead>\n      <tr> ");
  hashTypes = {'item': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("select")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("IMEI"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("phoneNumber"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("deviceIdentifier"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("deviceGroup"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("lastPositionDate"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("lastPositionDate"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" </tr>\n    </thead>\n    <!-- TABLE BODY: MAIN CONTENT-->\n    <tbody>\n    \n    ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "FLOW.deviceControl", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n    \n    <!-- TABLE FOOTER-->\n    <tfoot>\n      <tr>\n        <td colspan=\"7\"><small>This is the footer.</small></td>\n      </tr>\n    </tfoot>\n  </table>\n  <!--     ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showConfirmDeletedialog", {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("     --> \n  \n  <!-- add to group dialog-->\n  <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddToGroupDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <div class=\"blanket\"></div>\n    <div class=\"dialogWrap\"> \n      <!-- the dialog contents -->\n      <div class=\"confirmDialog dialog\">\n        <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_devices_to_device_group", options) : helperMissing.call(depth0, "t", "_add_devices_to_device_group", options))));
  data.buffer.push("</h2>\n        <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_choose_an_existing_device_group_from_the_list", options) : helperMissing.call(depth0, "t", "_choose_an_existing_device_group_from_the_list", options))));
  data.buffer.push("</p>\n        <br/>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.contentNoUnassigned"),
    'selectionBinding': ("view.selectedDeviceGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_existing_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <div class=\"buttons menuCentre\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddToGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddToGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <!-- Remove from group dialog-->\n  <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showRemoveFromGroupDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <div class=\"blanket\"></div>\n    <div class=\"dialogWrap\"> \n      <!-- the dialog contents -->\n      <div class=\"confirmDialog dialog\">\n        <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove_devices_from_device_group", options) : helperMissing.call(depth0, "t", "_remove_devices_from_device_group", options))));
  data.buffer.push("?</h2>\n        <div class=\"buttons menuCentre\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doRemoveFromGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelRemoveFromGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <!-- manage device groups dialog-->\n  <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showManageDeviceGroupsDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <div class=\"blanket\"></div>\n    <div class=\"dialogWrap\"> \n      <!-- the dialog contents -->\n      <div class=\"confirmDialog dialog\">\n        <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_device_groups", options) : helperMissing.call(depth0, "t", "_manage_device_groups", options))));
  data.buffer.push("</h2>\n        <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to_change_the_name_of_an_existing_group_", options) : helperMissing.call(depth0, "t", "_to_change_the_name_of_an_existing_group_", options))));
  data.buffer.push("</p>\n        <br/>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.contentNoUnassigned"),
    'selectionBinding': ("view.selectedDeviceGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n        ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.changedDeviceGroupName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to_create_a_new_device_group_", options) : helperMissing.call(depth0, "t", "_to_create_a_new_device_group_", options))));
  data.buffer.push("</p>\n        <label for=\"newDeviceGroupName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_new_group", options) : helperMissing.call(depth0, "t", "_new_group", options))));
  data.buffer.push(":</label>\n        ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newDeviceGroupName"),
    'id': ("newDeviceGroupName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n         <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to_delete_an_existing_group_", options) : helperMissing.call(depth0, "t", "_to_delete_an_existing_group_", options))));
  data.buffer.push("</p>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.contentNoUnassigned"),
    'selectionBinding': ("view.selectedDeviceGroupForDelete"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delDeviceGroup", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>\n\n        <div class=\"buttons menuCentre\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doManageDeviceGroups", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelManageDeviceGroups", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n  <nav class=\"dataTabMenu\">\n    <ul>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddToGroupDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_to_device_group", options) : helperMissing.call(depth0, "t", "_add_to_device_group", options))));
  data.buffer.push("</a></li>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRemoveFromGroupDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove_from_device_group", options) : helperMissing.call(depth0, "t", "_remove_from_device_group", options))));
  data.buffer.push("</a></li>\n    </ul>\n  </nav>\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n  <nav class=\"dataTabMenu\">\n    <ul>\n      <li><a href=\"#\" class=\"disabled\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_disable_devices", options) : helperMissing.call(depth0, "t", "_disable_devices", options))));
  data.buffer.push("</a></li>\n      <li><a href=\"#\" class=\"disabled\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_to_device_group", options) : helperMissing.call(depth0, "t", "_add_to_device_group", options))));
  data.buffer.push("</a></li>\n      <li><a href=\"#\" class=\"disabled\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove_from_device_group", options) : helperMissing.call(depth0, "t", "_remove_from_device_group", options))));
  data.buffer.push("</a></li>\n    </ul>\n  </nav>\n  ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("FLOW.deviceControl.allAreSelected")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_imei", options) : helperMissing.call(depth0, "t", "_imei", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_phone_number", options) : helperMissing.call(depth0, "t", "_phone_number", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_id", options) : helperMissing.call(depth0, "t", "_device_id", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_group", options) : helperMissing.call(depth0, "t", "_device_group", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_last_contact", options) : helperMissing.call(depth0, "t", "_last_contact", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_version", options) : helperMissing.call(depth0, "t", "_version", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <tr>\n      <td class=\"selection\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("isSelected")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"EMEI\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "esn", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"phoneNumber\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "phoneNumber", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"deviceId\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "deviceIdentifier", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"deviceGroup\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "deviceGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"lastBeacon\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date1),stack1 ? stack1.call(depth0, "lastPositionDate", options) : helperMissing.call(depth0, "date1", "lastPositionDate", options))));
  data.buffer.push("</td>\n      <td class=\"version\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gallatinSoftwareManifest", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    </tr>\n    ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n            <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doDelete", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Ok</a>\n            <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelDelete", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</a>\n        ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth \" id=\"devicesList\"> \n  <!-- DEVICES TABLE--> \n  \n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.CurrentDevicesTabView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n </section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/devices-subnav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    	<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCurrentDevices", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_devices_list", options) : helperMissing.call(depth0, "t", "_devices_list", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    	<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAssignSurveysOverview", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_assignments_list", options) : helperMissing.call(depth0, "t", "_assignments_list", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSurveyBootstrap", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manual_survey_transfer", options) : helperMissing.call(depth0, "t", "_manual_survey_transfer", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

  data.buffer.push("<ul>\n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("currentDevices")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("assignSurveys")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("surveyBootstrap")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/nav-devices"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"devicesSection floats-in\" id=\"main\" role=\"main\">\n    <div id=\"tabs\">\n        <nav class=\"tabNav floats-in\">\n            ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DevicesSubnavView", {hash:{
    'controllerBinding': ("controller.controllers.devicesSubnavController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </nav>\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navMaps/nav-maps-common"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.countryController.content", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <label for=\"country\"><span class=\"inlined\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_country", options) : helperMissing.call(depth0, "t", "_country", options))));
  data.buffer.push(":</span>\n          ");
  hashTypes = {'contentBinding': "STRING",'valueBinding': "STRING",'optionLabelPath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.countryController.content"),
    'valueBinding': ("FLOW.countryController.selected"),
    'optionLabelPath': ("content.label"),
    'selectionBinding': ("FLOW.countryController.country")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </label>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n    <div id=\"pointDetails\">\n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "content", {hash:{},inverse:self.program(10, program10, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      \n    </div>\n  ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n        <ul class=\"placeMarkBasicInfo floats-in\">\n          <li>\n            <span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_collected_on", options) : helperMissing.call(depth0, "t", "_collected_on", options))));
  data.buffer.push(":</span>\n            <div class=\"placeMarkCollectionDate\">\n              ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date2),stack1 ? stack1.call(depth0, "FLOW.placemarkController.selected.collectionDate", options) : helperMissing.call(depth0, "date2", "FLOW.placemarkController.selected.collectionDate", options))));
  data.buffer.push("\n            </div>\n          </li>\n          <li>\n            <div class=\"placeMarkPointCode\"> \n              ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.placemarkDetailController.selectedPointCode", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n          </li>\n        </ul>\n        <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': (":imgContainer photoUrl:shown:hidden")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          <a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("photoUrl")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" target=\"_blank\">\n            <img ");
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("photoUrl")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" alt=\"\">\n          </a>\n        </div>\n        <dl class=\"floats-in\">\n          ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "content", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </dl>\n      ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n            ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "placemarkDetail", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n            <p class=\"noDetails\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_details", options) : helperMissing.call(depth0, "t", "_no_details", options))));
  data.buffer.push("</p>\n          ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <p class=\"noDetails\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_details", options) : helperMissing.call(depth0, "t", "_no_details", options))));
  data.buffer.push("</p>\n      ");
  return buffer;
  }

  data.buffer.push("<section id=\"main\" class=\"mapFlow floats-in\" role=\"main\">\n  ");
  data.buffer.push("\n  <div id=\"dropdown-holder\">\n    ");
  hashTypes = {'controllerBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.countryView", {hash:{
    'controllerBinding': ("FLOW.countryController")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <div id=\"mapDetailsHideShow\" class=\"drawHandle hideMapD\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_hide", options) : helperMissing.call(depth0, "t", "_hide", options))));
  data.buffer.push(" &rsaquo;</div>\n  </div>\n\n  <div id=\"flowMap\"></div>\n  ");
  hashTypes = {'controllerBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.PlacemarkDetailView", {hash:{
    'controllerBinding': ("FLOW.placemarkDetailController")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  <div id=\"flowMapLegend\">\n    <h1>LEGEND</h1>\n  </div>\n</section>\n\n<style>\n  #pointDetails > dl > div.defListWrap:nth-child(odd) {\n    background-color: rgb(204,214,214);\n  }\n</style>");
  return buffer;
  
});

Ember.TEMPLATES["navMessages/nav-messages"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<div class=\"greyBg\">\n  <section id=\"\" class=\"fullWidth messagesList\"> \n<h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_messages", options) : helperMissing.call(depth0, "t", "_messages", options))));
  data.buffer.push("</h1>\n    <!-- Messages TABLE-->\n    <table id=\"messageListTable\" class=\"dataTable\" >\n      <!-- TABLE HEADER-->\n      <thead>\n        <tr>\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("lastUpdateDateTime"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("objectId"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("objectTitle"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("actionAbout"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("shortMessage"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("userName"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </tr>\n      </thead>\n      <!-- TABLE BODY: MAIN CONTENT-->\n      <tbody>\n        ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "mess", "in", "FLOW.messageControl", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n      \n      <!-- TABLE FOOTER-->\n      <tfoot>\n        <tr>\n          <td colspan=\"7\"><small>This is the footer.</small></td>\n        </tr>\n      </tfoot>\n    </table>\n     <ul class=\"prevNext\">\n            <li class=\"prevBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasPrevPage", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n        <li class=\"nextBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasNextPage", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n        </ul>\n  </section>\n</div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"date\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_date", options) : helperMissing.call(depth0, "t", "_date", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"objectId\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_id", options) : helperMissing.call(depth0, "t", "_survey_id", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"survey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"type\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"message\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_message", options) : helperMissing.call(depth0, "t", "_message", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"user\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_user", options) : helperMissing.call(depth0, "t", "_user", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n          <tr>\n            <td class=\"date\" style=\"text-align:left; padding:0 0 0 20px;\">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "mess", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n             <td class=\"actionAbout\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.objectId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"objectTitle\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.objectTitle", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"actionAbout\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.actionAbout", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"message\" style=\"text-align:left; padding:0 0 0 20px;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.shortMessage", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"userName\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.userName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          </tr>\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date1),stack1 ? stack1.call(depth0, "lastUpdateDateTime", options) : helperMissing.call(depth0, "date1", "lastUpdateDateTime", options))));
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPrevPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> &lsaquo; ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_previous", options) : helperMissing.call(depth0, "t", "_previous", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNextPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_next", options) : helperMissing.call(depth0, "t", "_next", options))));
  data.buffer.push(" &rsaquo;</a>");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.MessagesListView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navReports/applets/comprehensive-report-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataExportAppletImpl\"\n	archive=\"../exporterapplet.jar,../json.jar,../jcommon-1.0.16.jar,../jfreechart-1.0.13.jar,../poi-3.8-20120326.jar,../poi-ooxml-3.8-20120326.jar,../poi-ooxml-schemas-3.8-20120326.jar,../xbean.jar,../dom4j-1.6.1.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\" value=\"exporterapplet.jar,json.jar\">\n    <param name=\"cache-version\" value=\"1.3,1.0\">\n	<param name=\"exportType\" value=\"GRAPHICAL_SURVEY_SUMMARY\">\n	<param name=\"java_arguments\" value=\"-Xmx1024m\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n	<param name=\"criteria\" value=\"surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n    <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n	<!-- FIXME locale must be configurable -->\n	<param name=\"options\"\n		value=\"locale:=en;performRollup:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.editControl.summaryPerGeoArea", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(";nocharts:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.editControl.summaryPerGeoArea", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(";imgPrefix:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.Env.photo_url_root", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("/\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/applets/google-earth-file-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"org.waterforpeople.mapping.dataexport.KMLApplet\"\n	archive=\"../exporterapplet.jar,../json.jar,../poi-3.5-signed.jar,../velocity-1.6.2-dep.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\"\n		value=\"exporterapplet.jar,json.jar,poi-3.5-signed.jar,velocity-1.6.2-dep.jar\">\n	<param name=\"cache-version\" value=\"1.3,1.0,3.5\">\n    <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/applets/raw-data-report-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet width=\"100\" height=\"30\"\n  code=\"com.gallatinsystems.framework.dataexport.applet.DataExportAppletImpl\"\n  archive=\"../exporterapplet.jar,../json.jar,../jcommon-1.0.16.jar,../jfreechart-1.0.13.jar,../poi-3.8-20120326.jar,../poi-ooxml-3.8-20120326.jar,../poi-ooxml-schemas-3.8-20120326.jar,../xbean.jar,../dom4j-1.6.1.jar,../gdata-core-1.0.jar\">\n  <param name=\"cache-archive\" value=\"exporterapplet.jar,json.jar\">\n  <param name=\"cache-version\" value=\"1.3,1.0\">\n  <param name=\"exportType\" value=\"RAW_DATA\">\n  <param name=\"java_arguments\" value=\"-Xmx1024m\">\n  <param name=\"factoryClass\"\n    value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n  <param name=\"criteria\" value=\"surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n  <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n  <!-- FIXME locale must be configurable -->\n  <param name=\"options\"\n    value=\"exportMode:=RAW_DATA;locale:=en;imgPrefix:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.Env.photo_url_root", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(";generateTabFormat=false\"/>\n</applet>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["navReports/applets/survey-form-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataExportAppletImpl\"\n	archive=\"../exporterapplet.jar,../json.jar,../poi-3.5-signed.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\"\n		value=\"exporterapplet.jar,json.jar,poi-3.5-signed.jar\">\n	<param name=\"cache-version\" value=\"1.3,1.0,3.5\">\n	<param name=\"exportType\" value=\"SURVEY_FORM\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n	<param name=\"criteria\" value=\"surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n    <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/chart-reports"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n        <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_chart_builder", options) : helperMissing.call(depth0, "t", "_chart_builder", options))));
  data.buffer.push("</h1>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		<span class=\"\"></span>\n      ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.name"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.questionControl.OPTIONcontent"),
    'selectionBinding': ("FLOW.selectedControl.selectedQuestion"),
    'optionLabelPath': ("content.text"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_question")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n<div class=\"chartSetting\">       \n<h4>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_chart_type", options) : helperMissing.call(depth0, "t", "_chart_type", options))));
  data.buffer.push(":</h4>\n      ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.chartTypeControl.content"),
    'selectionBinding': ("view.chartType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_chart_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.isDoughnut", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getChartData", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_build_chart", options) : helperMissing.call(depth0, "t", "_build_chart", options))));
  data.buffer.push(" </a>\n</div>		\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.noChoiceBool", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n     	<h3 class=\"chartTitle\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedQuestion.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n        <div id=\"piechart\">\n			<p>Choose a Question from above selectors.</p> 	\n		</div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" \n  <label class=\"groupChartSelect\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_put_smaller_items_together", options) : helperMissing.call(depth0, "t", "_put_smaller_items_together", options))));
  data.buffer.push(" ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.compactSmaller")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n      <p class=\"errorMsg\">Please choose a survey group, survey and question using the selectors above.</p>\n    ");
  }

  data.buffer.push(" <section class=\"fullWidth\" id=\"reportBlocks\">\n    ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.chartView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n <script type=\"text/javascript\">\n\nfunction deleteChart(){\n  $('#piechart').empty();\n}\n\nfunction createDoughnutChart(){\n    var canvasWidth = 1000, //width\n      canvasHeight = 400,   //height\n      outerRadius = 100,   //radius\n      labelRadius = 120,   //radius\n      color = d3.scale.category20(); //builtin range of colors\n\n    var dataSet = FLOW.chartDataControl.get('chartData');\n    var smallerItems = FLOW.chartDataControl.get('smallerItems');\n    var total = FLOW.chartDataControl.get('total');\n\n    var vis = d3.select(\"#piechart\")\n      .append(\"svg:svg\") //create the SVG element inside the <body>\n        .data([dataSet]) //associate our data with the document\n        .attr(\"width\", canvasWidth) //set the width of the canvas\n        .attr(\"height\", canvasHeight) //set the height of the canvas\n        .append(\"svg:g\") //make a group to hold our pie chart\n        .attr(\"transform\", \"translate(\" + 0.3*canvasWidth + \",\" + 0.4*canvasHeight + \")\") // relocate center of pie\n\n    // This will create <path> elements for us using arc data...\n    var arc = d3.svg.arc()\n      .outerRadius(outerRadius)\n      .innerRadius(outerRadius-50);\n\n    var pie = d3.layout.pie() //this will create arc data for us given a list of values\n      .value(function(d) { return d.percentage; }) // Binding each value to the pie\n      .sort( function(d) { return null; } );\n\n      vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(246, 160, 26)\")\n      .style(\"font\", \"bold 1.5em helvetica\")\n      .text(\"Smallest items:\") \n      .attr(\"transform\",\"translate(320,-120)\");\n\n\n      vis.selectAll(\"p\")\n      .data(smallerItems)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d){\n        return d.legendLabel;\n      }) \n      .attr(\"transform\",function(d,i){\n        return \"translate(325,\" + (-100+i*20) + \")\";\n      })\n\n    // Select all <g> elements with class slice (there aren't any yet)\n    var arcs = vis.selectAll(\"g.slice\")\n      // Associate the generated pie data (an array of arcs, each having startAngle,\n      // endAngle and value properties) \n      .data(pie)\n      // This will create <g> elements for every \"extra\" data element that should be associated\n      // with a selection. The result is creating a <g> for every object in the data array\n      .enter()\n      // Create a group to hold each slice (we will have a <path> and a <text>\n      // element associated with each slice)\n      .append(\"svg:g\")\n      .attr(\"class\", \"slice\");    //allow us to style things in the slices (like text)\n\n    arcs.append(\"svg:path\")\n      //set the color for each slice to be chosen from the color function defined above\n      .attr(\"fill\", function(d, i) { return color(i); } )\n      //this creates the actual SVG path using the associated data (pie) with the arc drawing function\n      .attr(\"d\", arc);\n\n    // Add a legendLabel to each arc slice...\n    arcs.append(\"svg:text\")\n      .attr(\"transform\", function(d) {\n        var c = arc.centroid(d),\n          x = c[0],\n          y = c[1],\n          // pythagorean theorem for hypotenuse\n          h = Math.sqrt(x*x + y*y);\n          return \"translate(\" + (x/h * labelRadius) +  ',' + (y/h * labelRadius) +  \")\"; \n        })\n      .attr(\"text-anchor\", function(d) {\n        // are we past the center?\n        return (d.endAngle + d.startAngle)/2 > Math.PI ? \"end\" : \"start\";\n      })\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d, i) { return dataSet[i].legendLabel; }); //get the label from our original data array\n\n       // Add a legendLabel to each arc slice...\n    vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"middle\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.2em helvetica\")\n      .text(\"Total:\") //get the label from our original data array\n      .attr(\"transform\",\"translate(0,-15)\");\n\n    vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"middle\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(\"answers\") //get the label from our original data array\n      .attr(\"transform\",\"translate(0,15)\");\n\n    vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"middle\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(total.toString()) \n      .attr(\"transform\",\"translate(0,0)\");\n\n    // Computes the angle of an arc, converting from radians to degrees.\n    function angle(d) {\n      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;\n      return a > 90 ? a - 180 : a;\n    }\n}\n\nfunction createVBarChart(){\n// as in http://bl.ocks.org/3885304\nvar margin = {top: 20, right: 20, bottom: 30, left: 40},\n    width = 700 - margin.left - margin.right,\n    height = 500 - margin.top - margin.bottom;\n\n var dataSet = FLOW.chartDataControl.get('chartData');\n var maxPer = FLOW.chartDataControl.get('maxPer');\n\nvar formatPercent = d3.format(\".0%\");\n\n// create linear scale for y axis\nvar yScaleMax = maxPer/100 + 0.1;\nif (yScaleMax > 1) yScaleMax = 1;\nvar y = d3.scale.linear()\n    .domain([0,yScaleMax])\n    .range([height*0.6,0]);\n\n// y axis\nvar yAxis = d3.svg.axis()\n    .scale(y)\n    .orient(\"left\")\n    .tickFormat(formatPercent);\n\n// add svg canvas to DOM\nvar svg = d3.select(\"#piechart\")\n    .append(\"svg\")\n    .attr(\"width\", width + margin.left + margin.right)\n    .attr(\"height\", height + margin.top + margin.bottom)\n    .append(\"g\")\n    .attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\");\n\n\n  // y axis\n  svg.append(\"g\")\n      .attr(\"class\", \"y axis\")\n      .call(yAxis)\n      .append(\"text\")\n      .attr(\"transform\", \"rotate(-90)\")\n      .attr(\"y\", 6)\n      .attr(\"dy\", \".71.1em\")\n      .style(\"text-anchor\", \"end\")\n      .text(\"Percentage\");\n\n  // add bars\n  svg.selectAll(\".bar\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:rect\")\n      .attr(\"class\", \"bar\")\n      .attr(\"x\", function(d,i){return 20+i*40;})\n      .attr(\"width\", 20)\n      .attr(\"y\",function(d){return y(d.percentage/100);})\n      .attr(\"height\",function(d){return height*0.6-y(d.percentage/100);})\n      \n  // add labels\n  svg.selectAll(\"p\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d){\n        return d.legendLabel;\n      }) \n    .attr(\"transform\",function(d,i){\n         return \"translate(\" + (25+i*40) + \",\" + (0.6*height + 10) +\") rotate(45) \";\n       })\n\n    // add numbers on top of bars\n    svg.selectAll(\"num\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(0,0,0)\")\n      .style(\"font\", \"normal 1em helvetica\")\n      .text(function(d){\n        var num = d.percentage;\n        return num.toFixed(1).toString() + \"%\";\n      }) \n      .attr(\"transform\",function(d,i){\n        return \"translate(\" + (20+i*40) + \",\" + (y(d.percentage/100)-5) + \")\";\n      })\n  }\n\n\n  function createHBarChart(){\n// as in http://bl.ocks.org/3885304\nvar margin = {top: 20, right: 20, bottom: 30, left: 40},\n    width = 700 - margin.left - margin.right,\n    height = 500 - margin.top - margin.bottom;\n\n var dataSet = FLOW.chartDataControl.get('chartData');\n var maxPer = FLOW.chartDataControl.get('maxPer');\n\nvar formatPercent = d3.format(\".0%\");\n\n// create linear scale for y axis\nvar yScaleMax = maxPer/100 + 0.1;\nif (yScaleMax > 1) yScaleMax = 1;\nvar y = d3.scale.linear()\n    .domain([0,yScaleMax])\n    .range([0,width*0.6]);\n\n// add svg canvas to DOM\nvar svg = d3.select(\"#piechart\")\n    .append(\"svg\")\n    .attr(\"width\", width + margin.left + margin.right)\n    .attr(\"height\", height + margin.top + margin.bottom)\n    .append(\"g\")\n    .attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\");\n\n svg.append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(246, 160, 26)\")\n      .style(\"font\", \"bold 2em helvetica\")\n      .text(\"Percentage\") \n      .attr(\"transform\",\"translate(300,0)\");\n\n  // add bars\n  svg.selectAll(\".bar\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:rect\")\n      .attr(\"class\", \"bar\")\n      .attr(\"y\", function(d,i){return 20+i*40;})\n      .attr(\"height\", 20)\n      .attr(\"x\",function(d){return 300;})\n      .attr(\"width\",function(d){return y(d.percentage/100);})\n      \n  // add labels\n  svg.selectAll(\"p\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"end\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d){\n        return d.legendLabel;\n      }) \n    .attr(\"transform\",function(d,i){\n         return \"translate(280,\" + (35+i*40) +\")\";\n       })\n\n    // add numbers on top of bars\n    svg.selectAll(\"num\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(0,0,0)\")\n      .style(\"font\", \"normal 1.1em helvetica\")\n      .text(function(d){\n        var num = d.percentage;\n        return num.toFixed(1).toString();\n      }) \n      .attr(\"transform\",function(d,i){\n        return \"translate(\" + (305+y(d.percentage/100)) + \",\" + (35+i*40) + \")\";\n      })\n  }\n        \n    </script>\n    </section>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/export-reports"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_data", options) : helperMissing.call(depth0, "t", "_export_data", options))));
  data.buffer.push("</h1>\n ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n      ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n<div class=\"rawDataReport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_raw_data_report", options) : helperMissing.call(depth0, "t", "_export_raw_data_report", options))));
  data.buffer.push("</h3>\n    <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report_applet_text_", options) : helperMissing.call(depth0, "t", "_raw_data_report_applet_text_", options))));
  data.buffer.push("</p>\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRawDataReport", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report", options) : helperMissing.call(depth0, "t", "_raw_data_report", options))));
  data.buffer.push(" </a>\n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showRawDataReportApplet", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n<div class=\"comprehensiveReport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_comprehensive_report", options) : helperMissing.call(depth0, "t", "_export_comprehensive_report", options))));
  data.buffer.push("</h3>\n   <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_comprehensive_report_applet_text", options) : helperMissing.call(depth0, "t", "_comprehensive_report_applet_text", options))));
  data.buffer.push(".</p>\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showComprehensiveOptions", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_comprehensive_report", options) : helperMissing.call(depth0, "t", "_comprehensive_report", options))));
  data.buffer.push(" </a>\n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showComprehensiveReportApplet", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showGoogleEarthButton", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n<div class=\"surveyFormExport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_survey_form", options) : helperMissing.call(depth0, "t", "_export_survey_form", options))));
  data.buffer.push("</h3>\n  <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_form_applet_text_", options) : helperMissing.call(depth0, "t", "_survey_form_applet_text_", options))));
  data.buffer.push("</p>\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showSurveyForm", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_form", options) : helperMissing.call(depth0, "t", "_survey_form", options))));
  data.buffer.push(" </a>\n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showSurveyFormApplet", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n  <!-- Comprehensive report options -->\n<div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showComprehensiveDialog:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_options", options) : helperMissing.call(depth0, "t", "_options", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\"></p>\n\n           <label for=\"summaryPerGeoArea\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_generate_summary_per_geo_area", options) : helperMissing.call(depth0, "t", "_generate_summary_per_geo_area", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'checkedBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("FLOW.editControl.summaryPerGeoArea"),
    'id': ("summaryPerGeoArea")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"omitCharts\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_omit_charts", options) : helperMissing.call(depth0, "t", "_omit_charts", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'checkedBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("FLOW.editControl.omitCharts"),
    'id': ("omitCharts")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n\n          <div class=\"buttons menuCentre\">\n            <ul>\n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showComprehensiveReport", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.rawDataReportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.comprehensiveReportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<div class=\"googleEarthExport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_google_earth_file", options) : helperMissing.call(depth0, "t", "_export_google_earth_file", options))));
  data.buffer.push("</h3>\n <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_google_earth_applet_text_", options) : helperMissing.call(depth0, "t", "_google_earth_applet_text_", options))));
  data.buffer.push("</p>\n\n\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showGoogleEarthFile", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_google_earth_file", options) : helperMissing.call(depth0, "t", "_google_earth_file", options))));
  data.buffer.push(" </a>  \n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showGoogleEarthFileApplet", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.googleEarthFileApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.surveyFormApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<div class=\"greyBg\">\n<section class=\"fullWidth\" id=\"reportBlocks\">\n");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.ExportReportsAppletView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/nav-reports"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"reportsSection floats-in\" id=\"main\" role=\"main\">\n    <div id=\"tabs\">\n        <nav class=\"tabNav floats-in\">\n            ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.ReportsSubnavView", {hash:{
    'controllerBinding': ("controller.controllers.reportsSubnavController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </nav>\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/reports-subnav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doChartReports", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_charts", options) : helperMissing.call(depth0, "t", "_charts", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    	<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doExportReports", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_reports", options) : helperMissing.call(depth0, "t", "_export_reports", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

  data.buffer.push("<ul>\n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("chartReports")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("exportReports")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/edit-questions"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n       <!-- insert, move and copy buttons --> \n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForMove", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n      <!-- end insert, move and copy buttons for zero item--> \n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"moveMenu groupActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move_group_here", options) : helperMissing.call(depth0, "t", "_move_group_here", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("   \n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForCopy", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n      ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"copyMenu groupActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_paste_group_here", options) : helperMissing.call(depth0, "t", "_paste_group_here", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n      ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"insertMenu groupActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInsertQuestionGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_insert_group_here", options) : helperMissing.call(depth0, "t", "_insert_group_here", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n      ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("       \n        ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.QuestionGroupItemView", {hash:{
    'contentBinding': ("questionGroup")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n          <div class=\"questionGroupBlock\">\n            <header> <span class=\"qtnGroupHead\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_group", options) : helperMissing.call(depth0, "t", "_group", options))));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> \n              ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showQGroupNameEditField", {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              <nav class=\"qtnGroupMenu\">\n                <ul>\n                  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amVisible", {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"editQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_group_name", options) : helperMissing.call(depth0, "t", "_edit_group_name", options))));
  data.buffer.push("</a></li>\n                  <li> <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delQG", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"deleteQuestionGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a> </li>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopy", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"copyQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copy", options) : helperMissing.call(depth0, "t", "_copy", options))));
  data.buffer.push("</a></li>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMove", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"moveQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move", options) : helperMissing.call(depth0, "t", "_move", options))));
  data.buffer.push("</a> </li>\n                </ul>\n              </nav>\n            </header>\n            \n            <!-- if the question group is open, show all questions -->\n            ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amVisible", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n        \n          <!-- end question group block --> \n          </div>\n          \n          <!-- insert, move and copy buttons --> \n          ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.oneSelectedForMove", {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n      <!-- end move and copy buttons --> \n\n\n        ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.questionGroupName"),
    'size': (45)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveQuestionGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a>\n                <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelQuestionGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a> \n              ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                <h1 class=\"qtnGroupTitle\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVisibility", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h1>\n              ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVisibility", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"showQuestionGroup shown\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_hide_questions", options) : helperMissing.call(depth0, "t", "_hide_questions", options))));
  data.buffer.push(" </a></li>\n                  ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVisibility", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"showQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_show_questions", options) : helperMissing.call(depth0, "t", "_show_questions", options))));
  data.buffer.push(" </a></li>\n                  ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n              <div class=\"questionSetContent\"> \n                ");
  hashTypes = {'zeroItemQuestion': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.QuestionView", {hash:{
    'zeroItemQuestion': (true)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "question", "in", "FLOW.questionControl", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n              </div>\n            ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push(" \n                  ");
  hashTypes = {'contentBinding': "STRING",'zeroItemQuestion': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.QuestionView", {hash:{
    'contentBinding': ("question"),
    'zeroItemQuestion': (false)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n            <nav class=\"moveMenu groupActionMenu\">\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move_group_here", options) : helperMissing.call(depth0, "t", "_move_group_here", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n          ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("   \n            ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForCopy", {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n          ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n              <nav class=\"copyMenu groupActionMenu\">\n                <ul>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_paste_group_here", options) : helperMissing.call(depth0, "t", "_paste_group_here", options))));
  data.buffer.push("</a></li>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n                </ul>\n              </nav>\n            ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n              <nav class=\"insertMenu groupActionMenu\">\n                <ul>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInsertQuestionGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_insert_group_here", options) : helperMissing.call(depth0, "t", "_insert_group_here", options))));
  data.buffer.push("</a></li>\n                </ul>\n              </nav>\n            ");
  return buffer;
  }

  data.buffer.push("<!-- Beginning Question group set  -->\n  <section id=\"questionSet\">\n    <section class=\"aQuestionSet mainContent\" id=\"setIndex-01\"> \n    <!-- zeroItem indicates that this is the item before the first question group -->\n    ");
  hashTypes = {'zeroItem': "BOOLEAN"};
  stack1 = helpers.view.call(depth0, "FLOW.QuestionGroupItemView", {hash:{
    'zeroItem': (true)
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n      \n      <!-- start list of question groups --> \n      ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "questionGroup", "in", "FLOW.questionGroupControl", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    </section>\n  </section>\n  <!-- End Question group Set  --> ");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/manage-notifications"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<div class=\"manageNotificationsBlock\">\n    <section id=\"manageNotifications\" class=\"mainContent mainRight\">\n        <div class=\"innerContent\">\n            <div id=\"notifications\">\n                <h1>\n                    ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_notifications", options) : helperMissing.call(depth0, "t", "_notifications", options))));
  data.buffer.push("\n                </h1>\n                <div class=\"whiteBgSeparator\">\n                   \n                    <form class=\"notificationAdd\">\n                        <fieldset>\n                            <label for=\"emailNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email", options) : helperMissing.call(depth0, "t", "_email", options))));
  data.buffer.push("  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.destinationEmpty", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> \n                            ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.notificationDestination"),
    'id': ("emailNotification"),
    'size': (150)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset>\n                            <label for=\"eventNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_event", options) : helperMissing.call(depth0, "t", "_event", options))));
  data.buffer.push("  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.typeEmpty", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> \n                            ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.notificationEventControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.notificationType"),
    'id': ("eventNotification"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_event")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset>\n                            <label for=\"typeNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_option", options) : helperMissing.call(depth0, "t", "_option", options))));
  data.buffer.push("  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.optionEmpty", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> \n                            ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.notificationOptionControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.notificationOption"),
    'id': ("typeNotification"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_option")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset>\n                            <label for=\"dateNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_expires", options) : helperMissing.call(depth0, "t", "_expires", options))));
  data.buffer.push(" ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.dateEmpty", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField2", {hash:{
    'valueBinding': ("view.expiryDate"),
    'id': ("dateNotification"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset class=\"addNotifiBtn\">\n                            <nav>\n                                <ul>\n                                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addNotification", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add", options) : helperMissing.call(depth0, "t", "_add", options))));
  data.buffer.push("</a></li>\n                                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelNotification", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n                                </ul>\n                            </nav>\n                        </fieldset>\n                    </form>\n                    <table class=\"notificationTable dataTable\">\n                        <!-- DEVICES TABLE--><!-- TABLE HEADER-->\n                        <thead>\n                            <tr>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email", options) : helperMissing.call(depth0, "t", "_email", options))));
  data.buffer.push("</th>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("</th>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_option", options) : helperMissing.call(depth0, "t", "_option", options))));
  data.buffer.push("</th>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_expires", options) : helperMissing.call(depth0, "t", "_expires", options))));
  data.buffer.push("</th>\n                                <th></th>\n                            </tr>\n                        </thead><!-- TABLE BODY: MAIN CONTENT-->\n                        <tbody>\n                          ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "notification", "in", "FLOW.notificationControl", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </tbody><!-- TABLE FOOTER-->\n                        <tfoot>\n                            <tr>\n                                <td colspan=\"7\">\n                                    <small>This is the footer.</small>\n                                </td>\n                            </tr>\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n            <nav class>\n                <ul>\n                    <li>\n                        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "closeNotifications", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_close_notifications", options) : helperMissing.call(depth0, "t", "_close_notifications", options))));
  data.buffer.push("</a>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n    </section>\n</div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_provide_an_email_address", options) : helperMissing.call(depth0, "t", "_please_provide_an_email_address", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_make_a_choice", options) : helperMissing.call(depth0, "t", "_please_make_a_choice", options))));
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_make_a_choice", options) : helperMissing.call(depth0, "t", "_please_make_a_choice", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_select_a_date", options) : helperMissing.call(depth0, "t", "_please_select_a_date", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                            <tr>\n                                <td class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "notification.notificationDestination", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                <td class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "notification.notificationType", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                <td class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "notification.notificationOption", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                <td class=\"\">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "notification", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n                                <td class=\"action\">\n                                    <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeNotification", "notification", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>\n                                </td>\n                            </tr>\n                            ");
  return buffer;
  }
function program11(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "expiryDate", options) : helperMissing.call(depth0, "date3", "expiryDate", options))));
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.NotificationsView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navSurveys/nav-surveys-edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<section class=\"leftSidebar\" id=\"newSurveyInfo\">\n  <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_survey", options) : helperMissing.call(depth0, "t", "_edit_survey", options))));
  data.buffer.push("</h2>\n\n  <form>\n    <label for=\"newSurveyName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_title", options) : helperMissing.call(depth0, "t", "_title", options))));
  data.buffer.push("<span class=\"isRequired\">(");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_required", options) : helperMissing.call(depth0, "t", "_required", options))));
  data.buffer.push(")</span>:\n      ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.surveyTitle"),
    'placeholder': ("Type in the name of your survey"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n    <label for=\"newSurveyDesc\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_description", options) : helperMissing.call(depth0, "t", "_description", options))));
  data.buffer.push(":\n      ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'size': "INTEGER",'rows': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("view.surveyDescription"),
    'placeholder': ("Type in a description of your survey"),
    'size': (30),
    'rows': ("3")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n   <!--  <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.requireApproval")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_require_approval", options) : helperMissing.call(depth0, "t", "_require_approval", options))));
  data.buffer.push(" </label> -->\n	  <dl class=\"floats-in\">\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_version_number", options) : helperMissing.call(depth0, "t", "_version_number", options))));
  data.buffer.push(":</dt>\n              <dd><span id=\"versionNbr\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedSurvey.version", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.tooltip),stack1 ? stack1.call(depth0, "_version_numbers_helps", options) : helperMissing.call(depth0, "tooltip", "_version_numbers_helps", options))));
  data.buffer.push("</dd>\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id_number", options) : helperMissing.call(depth0, "t", "_id_number", options))));
  data.buffer.push(":</dt>\n              <dd><span id=\"surveyIdNbr\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></dd>\n            </dl>   \n    <label for=\"surveyType\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("<span class=\"isRequired\">(");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_required", options) : helperMissing.call(depth0, "t", "_required", options))));
  data.buffer.push(")</span>:\n      ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyPointTypeControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.surveyPointType"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </label>\n    \n    <label for=\"surveyLanguage\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_language", options) : helperMissing.call(depth0, "t", "_language", options))));
  data.buffer.push(":\n      ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.languageControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.language"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_language")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </label>\n  </form>\n  <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doManageNotifications", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"manageNotifications\"><span>+</span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_notifications", options) : helperMissing.call(depth0, "t", "_manage_notifications", options))));
  data.buffer.push("</a>\n  <ul class=\"newSurveyInfoUl\" id=\"\">\n    <li>\n      <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_summary", options) : helperMissing.call(depth0, "t", "_survey_summary", options))));
  data.buffer.push("</h3>\n    </li>\n    <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_number_of_question_groups", options) : helperMissing.call(depth0, "t", "_number_of_question_groups", options))));
  data.buffer.push(": <span id=\"numberQuestionSet\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.numberQuestionGroups", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> </li>\n    <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_number_of_questions", options) : helperMissing.call(depth0, "t", "_number_of_questions", options))));
  data.buffer.push(": <span id=\"numberQuestion\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.numberQuestions", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> </li>\n    <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_status", options) : helperMissing.call(depth0, "t", "_status", options))));
  data.buffer.push(": ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.isPublished", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </li>\n  </ul>\n  <nav class=\"newSurveyNav\">\n    <ul>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSaveSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"saveNewSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPreviewSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"previewNewSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview", options) : helperMissing.call(depth0, "t", "_preview", options))));
  data.buffer.push("</a></li>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPublishSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"publishNewSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_publish", options) : helperMissing.call(depth0, "t", "_publish", options))));
  data.buffer.push("</a></li>\n    </ul>\n  </nav>\n \n</section>\n<section class=\"mainRight\" id=\"surveyCreator\">\n  <section class=\"topBar\">\n    <nav class=\"menuTopbar\">\n      <ul class=\"\">\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSurveysMain", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"stepBack\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_go_back_to_survey_overview", options) : helperMissing.call(depth0, "t", "_go_back_to_survey_overview", options))));
  data.buffer.push("</a></li>\n      </ul>\n    </nav>\n  </section>\n  \n");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</section>\n ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <span class=\"surveyPublished\">\n      ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_published", options) : helperMissing.call(depth0, "t", "_published", options))));
  data.buffer.push("</span> ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <span class=\"surveyNotPublished\">\n      ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_not_published", options) : helperMissing.call(depth0, "t", "_not_published", options))));
  data.buffer.push("</span> ");
  return buffer;
  }

  data.buffer.push("<!-- we are within navSurveysEditView -->\n ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.SurveySidebarView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <!-- end of FLOW.SurveySideBarView --> \n");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/nav-surveys-main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <section id=\"groupBar\" class=\"leftSidebar\">\n   <!--\n    <form action=\"\" method=\"post\">\n      <input type=\"search\" placeholder=\"Filter surveys\"  name=\"surveySearch\" />\n    </form> -->\n    <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_groups", options) : helperMissing.call(depth0, "t", "_survey_groups", options))));
  data.buffer.push("</h2>\n	<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_group", options) : helperMissing.call(depth0, "t", "_add_new_group", options))));
  data.buffer.push("</a>\n    <nav>\n      <!-- show new group field, show when 'add a group' is selected -->\n      ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showNewGroupField", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("   	 \n<div class=\"scrollWrap\"><a href=\"#scrollUpId\" class=\"scrollUp\" id=\"scrollUpId\">up</a></div>\n \n<nav class=\"menuGroupWrap\">\n      <!-- show all survey groups --> \n	 <ul class=\"menuGroup\">\n        ");
  hashTypes = {};
  stack2 = helpers.view.call(depth0, "FLOW.JavascriptSurveyGroupListView", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </ul>\n</nav>\n<div class=\"scrollWrap\"><a href=\"#scrollDownId\" class=\"scrollDown\" id=\"scrollDownId\">down</a></div>\n  </section>\n\n  <section id=\"allSurvey\" class=\"mainRight surveysList\">\n    <section class=\"topBar\">\n      ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.oneSelected", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      \n      <!-- show delete group, add new group, and create new survey buttons--> \n      <nav class=\"menuTopbar\">\n        <ul class=\"\">\n          ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.oneSelected", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </ul>\n      </nav>    \n    </section>\n\n    ");
  hashTypes = {};
  stack2 = helpers.unless.call(depth0, "view.oneSelected", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    <!-- show all surveys of the currently selected survey group-->\n    <ul class=\"surveyBatch\">\n      ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "survey", "in", "FLOW.surveyControl.arrangedContent", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </ul>    \n  </section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.surveyGroupName"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <nav class=\"menuCentre\">\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveNewSurveyGroupName", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a>\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelNewSurveyGroupName", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a>\n        </nav>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n          ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "sg", "in", "FLOW.surveyGroupControl.arrangedContent", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n            ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyGroupMenuItemView", {hash:{
    'contentBinding': ("sg")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n              <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "makeSelected", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sg.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.showEditField", {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.surveyGroupName"),
    'size': (45)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveSurveyGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n       <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelSurveyGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a>\n        ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          <!-- show selected survey group and edit name button --> \n          <h2>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedSurveyGroup.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2> \n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editSurveyGroupName", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"editGroupName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_name", options) : helperMissing.call(depth0, "t", "_edit_name", options))));
  data.buffer.push("</a>\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delSG", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"deleteGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete_this_group", options) : helperMissing.call(depth0, "t", "_delete_this_group", options))));
  data.buffer.push("</a> \n        ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n            <li><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNewSurvey", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_create_a_new_survey", options) : helperMissing.call(depth0, "t", "_create_a_new_survey", options))));
  data.buffer.push("</a></li>\n          ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <p class=\"surveyLandingText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_intro_text", options) : helperMissing.call(depth0, "t", "_survey_intro_text", options))));
  data.buffer.push("</p>\n    ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push(" \n        ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyGroupSurveyView", {hash:{
    'contentBinding': ("survey")
  },inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n          <li class=\"aSurvey waterPoint\">\n            <h2 class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\n            <ul class=\"surveyInfo floats-in\">\n              <li class=\"dateCreated\"> <span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_created", options) : helperMissing.call(depth0, "t", "_created", options))));
  data.buffer.push("</span>\n                <time>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("<time>\n              </li>\n              <li class=\"responseNumber\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.instanceCount", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_responses", options) : helperMissing.call(depth0, "t", "_responses", options))));
  data.buffer.push("</p>\n              </li>\n            </ul>\n            <dl class=\"floats-in\">\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_modified", options) : helperMissing.call(depth0, "t", "_modified", options))));
  data.buffer.push("</dt>\n              <dd>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</dd>\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("</dt>\n              <dd>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</dd>\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_language", options) : helperMissing.call(depth0, "t", "_language", options))));
  data.buffer.push("</dt>\n              <dd>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</dd>\n            </dl>\n            <nav>\n              <ul>              \n                <li class=\"editSurvey\"><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEditSurvey", "survey", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a></li> <!-- this hands control over to the router -->\n                <li class=\"previewSurvey\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "previewSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview", options) : helperMissing.call(depth0, "t", "_preview", options))));
  data.buffer.push("</a></li>\n                <li class=\"deleteSurvey\"> <a  ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delS", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a> </li>\n                <li class=\"copySurvey\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "copySurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copy", options) : helperMissing.call(depth0, "t", "_copy", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n          </li>\n        ");
  return buffer;
  }
function program19(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date),stack1 ? stack1.call(depth0, "createdDateTime", options) : helperMissing.call(depth0, "date", "createdDateTime", options))));
  }

function program21(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date),stack1 ? stack1.call(depth0, "lastUpdateDateTime", options) : helperMissing.call(depth0, "date", "lastUpdateDateTime", options))));
  }

function program23(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.toPointType),stack1 ? stack1.call(depth0, "pointType", options) : helperMissing.call(depth0, "toPointType", "pointType", options))));
  }

function program25(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.toLanguage),stack1 ? stack1.call(depth0, "defaultLanguageCode", options) : helperMissing.call(depth0, "toLanguage", "defaultLanguageCode", options))));
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyGroupMainView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navSurveys/nav-surveys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n      ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.PreviewView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<section id=\"main\" class=\"surveySection floats-in\" role=\"main\">\n  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</section>\n\n<div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("FLOW.previewControl.showPreviewPopup:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n  <div class=\"blanketWide\"></div>\n  <div class=\"dialogWrap\">\n     <div class=\"confirmDialog dialogWide\">\n    <!-- the dialog contents -->\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.previewControl.showPreviewPopup", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/preview-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n <div class=\"questionGroupBlock\">\n   <header> <span class=\"qtnGroupHead\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_group", options) : helperMissing.call(depth0, "t", "_group", options))));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QG.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n     <h3 class=\"qtnGroupTitle\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QG.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n     <div class=\"innerContent\"> \n       ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.PreviewQuestionGroupView", {hash:{
    'contentBinding': ("QG")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n     </div>\n </div>    \n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n         ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "Q", "in", "view.QGcontent", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n       ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n           ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.PreviewQuestionView", {hash:{
    'contentBinding': ("Q")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n             ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isVisible", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n			 <div class=\"previewQuestion\"> \n                <h1 class=\"questionNbr\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Q.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Q.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n                    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isOptionType", {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("    \n                </div>\n              ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                       ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "view.optionsList", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                       <!-- FIXME this should be checkbuttons if Allow Multiple is true -->\n                          ");
  hashTypes = {'title': "ID",'option': "ID",'group': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.RadioButton", {hash:{
    'title': ("value"),
    'option': ("value"),
    'group': ("options"),
    'valueBinding': ("view.optionChoice")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                        ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isNumberType", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.answer"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                      ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isTextType", {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.answer"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isDateType", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push(" \n                             ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField2", {hash:{
    'valueBinding': ("view.answer"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                          ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                            ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isGeoType", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                          ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n							\n                              <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_gps_of_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_gps_of_the_device_is_used_here", options))));
  data.buffer.push("</h3>\n                              <h4>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_latitude", options) : helperMissing.call(depth0, "t", "_latitude", options))));
  data.buffer.push(":</h4> ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.latitude"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              <h4>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_longitude", options) : helperMissing.call(depth0, "t", "_longitude", options))));
  data.buffer.push(":</h4> ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.longitude"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                              ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isBarcodeType", {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_barcode_app_on_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_barcode_app_on_the_device_is_used_here", options))));
  data.buffer.push("</h3>\n                                ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.answer"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                                ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isPhotoType", {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                              ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_camera_of_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_camera_of_the_device_is_used_here", options))));
  data.buffer.push("</h3>\n                                ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                                  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isVideoType", {hash:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                    <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_video_camera_of_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_video_camera_of_the_device_is_used_here", options))));
  data.buffer.push("</h3>   \n                                  ");
  return buffer;
  }

  data.buffer.push("<div class=\"fixedMenu\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "closePreviewPopup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok clodeDialog\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_close_window", options) : helperMissing.call(depth0, "t", "_close_window", options))));
  data.buffer.push("</a>\n<h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_preview", options) : helperMissing.call(depth0, "t", "_survey_preview", options))));
  data.buffer.push("</h2></div>\n<div class=\"surveyPreviewWrap\">\n");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "QG", "in", "FLOW.questionGroupControl", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/question-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n\n<div class=\"innerContent\" id=\"innerContent_01\">\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.amOpenQuestion", {hash:{},inverse:self.program(17, program17, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n  </div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n    <h1 class=\"questionNbr\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n    <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question_text", options) : helperMissing.call(depth0, "t", "_question_text", options))));
  data.buffer.push(": ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.text"),
    'size': (100)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n    <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question_help_tooltip", options) : helperMissing.call(depth0, "t", "_question_help_tooltip", options))));
  data.buffer.push(": <span class=\"fadedText\">(");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_optional", options) : helperMissing.call(depth0, "t", "_optional", options))));
  data.buffer.push(")</span> ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.tip"),
    'size': (100)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n \n    <label class=\"labelcheckbox\">");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.mandatoryFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_mandatory", options) : helperMissing.call(depth0, "t", "_mandatory", options))));
  data.buffer.push("</label>\n    <label class=\"selectinLabel\"><span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_tag", options) : helperMissing.call(depth0, "t", "_tag", options))));
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.tooltip),stack1 ? stack1.call(depth0, "_what_is_tag", options) : helperMissing.call(depth0, "tooltip", "_what_is_tag", options))));
  data.buffer.push(":</span> ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeControl.content"),
    'optionLabelPath': ("content.name"),
    'optionValuePath': ("content.keyId"),
    'selectionBinding': ("view.attribute"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_tag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n	   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddAttributeDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addAttribute\"><span>+</span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_tag", options) : helperMissing.call(depth0, "t", "_add_tag", options))));
  data.buffer.push(" </a> </label>\n      ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.attribute", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    <label class=\"selectinLabel\"><span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question_type", options) : helperMissing.call(depth0, "t", "_question_type", options))));
  data.buffer.push(":</span> ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.questionTypeControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n  \n    <!-- Question specific material --> \n<div class=\"questionOption floats-in\">\n\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amOptionType", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("                 \n    \n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amNumberType", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amNoOptionsType", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n</div>\n<div class=\"dependencyBlock\">\n    <label class=\"labelcheckbox\">");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.dependentFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_dependent", options) : helperMissing.call(depth0, "t", "_dependent", options))));
  data.buffer.push("\n    </label>\n\n     ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.dependentFlag", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n     ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.dependentFlag", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</div>\n<!-- add attribute dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddAttributeDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_attribute", options) : helperMissing.call(depth0, "t", "_add_attribute", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">Please provide a name, an optional group, and a value type for the attribute</p>\n          <br/>\n         <label for=\"newAttributeName\">Attribute name:</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeName"),
    'id': ("newAttributeName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         <label for=\"newAttributeGroup\">Group:</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeGroup"),
    'id': ("newAttributeGroup"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          <label>Value type:</label>\n             ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeTypeControl.content"),
    'selectionBinding': ("view.newAttributeType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_value_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">SAVE</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">CANCEL</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- End question specific material -->\n    <nav>\n      <ul>\n        <li><a class=\"standardBtn\" id=\"standardBtn_01\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSaveEditQuestion", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save Question</a> </li>\n        <li><a class=\"\" id=\"standardBtn_01\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCancelEditQuestion", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</a> </li>\n      </ul>\n    </nav>\n  ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<label class=\"labelcheckbox\">");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.includeInMap")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_include_in_map", options) : helperMissing.call(depth0, "t", "_include_in_map", options))));
  data.buffer.push("</label>");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <h1 class=\"answerNbr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_option_details", options) : helperMissing.call(depth0, "t", "_option_details", options))));
  data.buffer.push(": </h1>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowMultipleFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_multiple", options) : helperMissing.call(depth0, "t", "_allow_multiple", options))));
  data.buffer.push(" </label>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowOtherFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_other", options) : helperMissing.call(depth0, "t", "_allow_other", options))));
  data.buffer.push(" </label>\n      <br>\n      <p><strong>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_options", options) : helperMissing.call(depth0, "t", "_options", options))));
  data.buffer.push(":&nbsp;</strong><span class=\"fadedText\"> (");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_enter_each_choice_on_a_separate_line", options) : helperMissing.call(depth0, "t", "_enter_each_choice_on_a_separate_line", options))));
  data.buffer.push(")</span> </p>\n      ");
  hashTypes = {'valueBinding': "STRING",'size': "STRING",'rows': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("view.optionList"),
    'size': ("100"),
    'rows': ("7")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  \n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n	  <h1 class=\"answerNbr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_number_details", options) : helperMissing.call(depth0, "t", "_number_details", options))));
  data.buffer.push(": </h1>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowSign")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_sign", options) : helperMissing.call(depth0, "t", "_allow_sign", options))));
  data.buffer.push(" </label>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowDecimal")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_decimal_point", options) : helperMissing.call(depth0, "t", "_allow_decimal_point", options))));
  data.buffer.push(" </label>\n\n      <label class=\"minValNumb\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_min_val", options) : helperMissing.call(depth0, "t", "_min_val", options))));
  data.buffer.push(": ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.minVal"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n      <label class=\"maxValNumb\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_max_val", options) : helperMissing.call(depth0, "t", "_max_val", options))));
  data.buffer.push(": ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.maxVal"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n		<p class=\"noOptions\">\n		  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_options_for_this_question_type", options) : helperMissing.call(depth0, "t", "_no_options_for_this_question_type", options))));
  data.buffer.push("\n		</p>\n    ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <label class=\"selectinLabel dependencySelect\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_dependent_question", options) : helperMissing.call(depth0, "t", "_dependent_question", options))));
  data.buffer.push(":\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.questionControl.earlierOptionQuestions"),
    'selectionBinding': ("FLOW.selectedControl.dependentQuestion"),
    'optionLabelPath': ("content.text"),
    'optionValuePath': ("content.keyId"),
    'prompt': ("Select question")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n    ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.selectedControl.dependentQuestion", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n     <div class=\"qDependency\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_answer_of_dependent_question", options) : helperMissing.call(depth0, "t", "_answer_of_dependent_question", options))));
  data.buffer.push(":</div>\n      ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "item", "in", "FLOW.optionListControl.content", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        <label>");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("item.isSelected")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n      ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("   \n    <!-- nav is only displayed if question is closed -->\n    <nav class=\"smallMenu\">\n      <ul>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delQ", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"deleteQuestion\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a> </li>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionCopy", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"copyQuestion\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copy", options) : helperMissing.call(depth0, "t", "_copy", options))));
  data.buffer.push("</a></li>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionMove", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"moveQuestion\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move", options) : helperMissing.call(depth0, "t", "_move", options))));
  data.buffer.push("</a></li>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"editQuestion\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a></li>\n      </ul>\n    </nav>\n    <h1 class=\"questionNbr\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n\n  ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"moveQMenu questionActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionMoveHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move_question_here", options) : helperMissing.call(depth0, "t", "_move_question_here", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionMoveCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n    ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("   \n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForCopy", {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n    ");
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <nav class=\"copyQMenu questionActionMenu\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionCopyHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_paste_question_here", options) : helperMissing.call(depth0, "t", "_paste_question_here", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionCopyCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </nav>\n       ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" \n         <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInsertQuestion", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addQuestion\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_question", options) : helperMissing.call(depth0, "t", "_add_new_question", options))));
  data.buffer.push("</a> \n      ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.unless.call(depth0, "view.zeroItemQuestion", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <div>\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForMove", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n  </div>\n\n\n \n");
  return buffer;
  
});

Ember.TEMPLATES["navUsers/nav-users"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<!-- Available roles: ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ADMIN", options) : helperMissing.call(depth0, "t", "_ADMIN", options))));
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_SUPER_ADMIN", options) : helperMissing.call(depth0, "t", "_SUPER_ADMIN", options))));
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_USER", options) : helperMissing.call(depth0, "t", "_USER", options))));
  data.buffer.push(" -->\n<div class=\"greyBg\">\n  <section id=\"\" class=\"fullWidth usersList\"> \n	<h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_users_and_user_rights", options) : helperMissing.call(depth0, "t", "_manage_users_and_user_rights", options))));
  data.buffer.push("</h1>\n <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddUserDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push("class=\"standardBtn btnAboveTable\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_user", options) : helperMissing.call(depth0, "t", "_add_new_user", options))));
  data.buffer.push("</a>\n    <!-- userS TABLE-->\n    <table id=\"usersListTable\" class=\"dataTable\" >\n      <!-- TABLE HEADER-->\n      <thead>\n        <tr>\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("userName"),
    'type': ("user")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("emailAddress"),
    'type': ("user")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("permissionList"),
    'type': ("user")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          <th class=\"action noArrows\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_actions", options) : helperMissing.call(depth0, "t", "_actions", options))));
  data.buffer.push("</th>\n        </tr>\n      </thead>\n      <!-- TABLE BODY: MAIN CONTENT-->\n      <tbody>\n        ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "user", "in", "FLOW.userControl", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n      \n      <!-- TABLE FOOTER-->\n      <tfoot>\n        <tr>\n          <td colspan=\"7\"><small>This is the footer.</small></td>\n        </tr>\n      </tfoot>\n    </table>\n  </section>\n</div>\n\n   <!-- new user dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddUserBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_user", options) : helperMissing.call(depth0, "t", "_add_new_user", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_provide_a_user_name_", options) : helperMissing.call(depth0, "t", "_please_provide_a_user_name_", options))));
  data.buffer.push(".</p>\n          \n          <label for=\"newUserName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_username", options) : helperMissing.call(depth0, "t", "_username", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.newUserName"),
    'id': ("newUserName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"newEmail\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email_address", options) : helperMissing.call(depth0, "t", "_email_address", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.newEmailAddress"),
    'id': ("newEmail"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n          \n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.permissionLevelControl.content"),
    'selectionBinding': ("FLOW.editControl.newPermissionLevel"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_permission_level")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n      <!-- edit existing user dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showEditUserBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_user", options) : helperMissing.call(depth0, "t", "_edit_user", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_edit_the_username_", options) : helperMissing.call(depth0, "t", "_please_edit_the_username_", options))));
  data.buffer.push(".</p>\n          <label for=\"editUserName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_username", options) : helperMissing.call(depth0, "t", "_username", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editUserName"),
    'id': ("editUserName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"editEmail\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email_address", options) : helperMissing.call(depth0, "t", "_email_address", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editEmailAddress"),
    'id': ("editEmail"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n          \n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.permissionLevelControl.content"),
    'selectionBinding': ("FLOW.editControl.editPermissionLevel"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_permission_level")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEditUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"userName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_user_name", options) : helperMissing.call(depth0, "t", "_user_name", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"emailAdr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email", options) : helperMissing.call(depth0, "t", "_email", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"emailAdr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_permission_level", options) : helperMissing.call(depth0, "t", "_permission_level", options))));
  data.buffer.push("</a>\n                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.tooltip),stack1 ? stack1.call(depth0, "_there_are_three_permission_levels", options) : helperMissing.call(depth0, "tooltip", "_there_are_three_permission_levels", options))));
  data.buffer.push("\n           ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n        \n          <tr>\n            <td class=\"userName\" style=\"text-align:left; padding:0 0 0 20px;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.userName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"emailAdr\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.emailAddress", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.SingleUserView", {hash:{
    'contentBinding': ("user")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <td class=\"action\"> <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showEditUserDialog", "user", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"edit\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a> ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.UserView", {hash:{
    'contentBinding': ("user")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        \n            </td>\n          </tr>\n         \n        ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n              <span ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.roleClass")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.roleLabel", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n             ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delUser", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.UserListView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});});