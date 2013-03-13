Ember.TEMPLATES["navMaps/nav-maps-public"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n      <label for=\"country\"><span class=\"inlined\">Country:</span>\n        ");
  hashTypes = {'contentBinding': "STRING",'valueBinding': "STRING",'optionLabelPath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.countryControl.content"),
    'valueBinding': ("FLOW.countryControl.selected"),
    'optionLabelPath': ("content.label"),
    'selectionBinding': ("view.country")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </label>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n      <ul class=\"placeMarkBasicInfo floats-in\">\n        <li><span>Collected on:</span>\n          ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.placemarkControl.selected", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </li>\n        <li>\n          ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.placemarkDetailControl.selectedPointCode", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </li>\n      </ul>\n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.detailsImage", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      <dl class=\"floats-in\">\n        ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "item", "in", "FLOW.placemarkDetailControl", {hash:{},inverse:self.program(13, program13, data),fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </dl>\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n            <div class=\"placeMarkCollectionDate\"> \n              ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date2),stack1 ? stack1.call(depth0, "FLOW.placemarkControl.selected.collectionDate", options) : helperMissing.call(depth0, "date2", "FLOW.placemarkControl.selected.collectionDate", options))));
  data.buffer.push("</div>\n          ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n            <div class=\"placeMarkPointCode\"> \n              ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.placemarkDetailControl.selectedPointCode", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n          ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        <div class=\"imgContainer\">\n          <a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.detailsImage")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" target=\"_blank\">\n            <img ");
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("view.detailsImage")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" alt=\"\" />\n          </a>\n        </div>\n      ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n          <div class=\"defListWrap\">\n            <dt>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.questionText", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(":</dt> \n            <dd>");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "item", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dd>\n          </div>\n        ");
  return buffer;
  }
function program11(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.addSpace),stack1 ? stack1.call(depth0, "stringValue", options) : helperMissing.call(depth0, "addSpace", "stringValue", options))));
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          <p class=\"noDetails\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_details", options) : helperMissing.call(depth0, "t", "_no_details", options))));
  data.buffer.push("</p>    \n        ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <p class=\"noDetails\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_details", options) : helperMissing.call(depth0, "t", "_no_details", options))));
  data.buffer.push("</p>\n    ");
  return buffer;
  }

  data.buffer.push("<section id=\"main\" class=\"mapFlow floats-in\" role=\"main\">\n  ");
  data.buffer.push("\n  <div id=\"dropdown-holder\">\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.countryControl.content", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <div id=\"mapDetailsHideShow\" class=\"drawHandle hideMapD\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_hide", options) : helperMissing.call(depth0, "t", "_hide", options))));
  data.buffer.push(" &rsaquo;</div>\n  </div>\n\n  <div id=\"flowMap\"></div>\n  <div id=\"pointDetails\">\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "FLOW.placemarkDetailControl.content", {hash:{},inverse:self.program(15, program15, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n\n  <div id=\"flowMapLegend\">\n    <h1>LEGEND</h1>\n  </div>\n</section>\n\n<style>\n  #pointDetails > dl > div.defListWrap:nth-child(odd) {\n    background-color: rgb(204,214,214);\n  }\n</style>");
  return buffer;
  
});