(function() {




})();

(function() {

/*global DS*/

DS.FLOWRESTAdapter = DS.RESTAdapter.extend({
  serializer: DS.RESTSerializer.extend({
    primaryKey: function (type) {
      return "keyId";
    },
    keyForAttributeName: function (type, name) {
      return name;
    }
  }),

  buildURL: function (record, suffix) {
    var url;

    url = this._super(record, suffix);
    if (record === 'placemark') {
      return  url + '?country=' + FLOW.countryControl.get('countryCode');
    }
    return url;
  },

  sideload: function (store, type, json, root) {
    var msg;
    this._super(store, type, json, root);
    // only change metaControl info if there is actual meta info in the server response
    if (Object.keys(this.extractMeta(json)).length !== 0) {
      FLOW.metaControl.set('since', this.extractMeta(json).since);
      FLOW.metaControl.set('num', this.extractMeta(json).num);

      msg = this.extractMeta(json).message;
      if (msg.indexOf('_') === 0) { // Response is a translatable message
        msg = Ember.String.loc(msg);
      }
      FLOW.metaControl.set('message', msg);

      FLOW.metaControl.set('status', this.extractMeta(json).status);
      FLOW.savingMessageControl.set('areLoadingBool', false);
      FLOW.savingMessageControl.set('areSavingBool', false);

      if (this.extractMeta(json).status === 'failed' || FLOW.metaControl.get('message') !== ''){
        FLOW.dialogControl.set('activeAction', 'ignore');
        FLOW.dialogControl.set('header', '' /*Ember.String.loc('_action_failed')*/); //FIXME
        FLOW.dialogControl.set('message', FLOW.metaControl.get('message'));
        FLOW.dialogControl.set('showCANCEL', false);
        FLOW.dialogControl.set('showDialog', true);
      }
    }
  },

 ajax: function(url, type, hash) {
   this._super(url, type, hash);
   if (type == "GET"){
     FLOW.savingMessageControl.set('areLoadingBool',true);
   }
 },

didFindRecord: function(store, type, json, id) {
  this._super(store, type, json, id);
  FLOW.savingMessageControl.set('areLoadingBool',false);
},

didFindAll: function(store, type, json) {
  this._super(store, type, json);
  FLOW.savingMessageControl.set('areLoadingBool',false);
},

didFindQuery: function(store, type, json, recordArray) {
  this._super(store, type, json, recordArray);
  FLOW.savingMessageControl.set('areLoadingBool',false);
}


});

})();

(function() {

// ***********************************************//
//                 models and stores
// ***********************************************//


})();

(function() {

FLOW.BaseModel = DS.Model.extend({
  keyId: DS.attr('number'),
  savingStatus: null,

  // this method calls the checkSaving method on the savingMessageControl, which
  // checks if there are any records inflight. If yes, it sets a boolean,
  // so a saving message can be displayed. savingStatus is used to capture the
  // moment that nothing is being saved anymore, but in the previous event it was
  // so we can turn off the saving message.
  anySaving: function() {
    if(this.get('isSaving') || this.get('isDirty') || this.get('savingStatus')) {
      FLOW.savingMessageControl.checkSaving();
    }
    this.set('savingStatus', (this.get('isSaving') || this.get('isDirty')));
  }.observes('isSaving', 'isDirty')

});

FLOW.SurveyGroup = FLOW.BaseModel.extend({
  didDelete: function() {
    FLOW.surveyGroupControl.populate();
  },
  didUpdate: function() {
    FLOW.surveyGroupControl.populate();
  },
  didCreate: function() {
    FLOW.surveyGroupControl.populate();
  },

  description: DS.attr('string', {
    defaultValue: ''
  }),
  name: DS.attr('string', {
    defaultValue: ''
  }),
  createdDateTime: DS.attr('string', {
    defaultValue: ''
  }),
  lastUpdateDateTime: DS.attr('string', {
    defaultValue: ''
  }),
  // the code field is used as name
  code: DS.attr('string', {
    defaultValue: ''
  })
});


FLOW.Survey = FLOW.BaseModel.extend({
  //didDelete: function() {
  //  FLOW.surveyControl.populate();
  //},
  // didUpdate: function() {
  //   FLOW.surveyControl.populate();
  // },
  // didCreate: function() {
  //   FLOW.surveyControl.populate();
  // },
  didLoad: function() {
    // set the survey group name
    var sg = FLOW.store.find(FLOW.SurveyGroup, this.get('surveyGroupId'));
    if(!Ember.empty(sg)) {
      this.set('surveyGroupName', sg.get('code'));
    }
  },

  defaultLanguageCode: DS.attr('string'),
  status: DS.attr('string'),
  sector: DS.attr('string'),
  code: DS.attr('string'),
  requireApproval: DS.attr('string'),
  version: DS.attr('string'),
  description: DS.attr('string'),
  name: DS.attr('string'),
  path: DS.attr('string'),
  pointType: DS.attr('string'),
  surveyGroupId: DS.attr('number'),
  createdDateTime: DS.attr('number'),
  lastUpdateDateTime: DS.attr('number'),
  instanceCount: DS.attr('number'),

  // This attribute is used for the 'Copy Survey' functionality
  // Most of the times is `null`
  sourceId: DS.attr('number', {
    defaultValue: null
  }),
  // used in the assignment edit page, not saved to backend
  surveyGroupName: null
});


FLOW.QuestionGroup = FLOW.BaseModel.extend({
  didDelete: function() {
    if(FLOW.questionGroupControl.get('allRecordsSaved')) FLOW.questionGroupControl.populate();
  },
  didUpdate: function() {
    if(FLOW.questionGroupControl.get('allRecordsSaved')) FLOW.questionGroupControl.populate();
  },
  didCreate: function() {
    if(FLOW.questionGroupControl.get('allRecordsSaved')) FLOW.questionGroupControl.populate();
  },

  order: DS.attr('number'),
  description: DS.attr('string'),
  name: DS.attr('string'),
  path: DS.attr('string'),
  code: DS.attr('string'),
  surveyId: DS.attr('number')
});


FLOW.Question = FLOW.BaseModel.extend({
  didDelete: function() {
    if(FLOW.questionControl.get('allRecordsSaved')) FLOW.questionControl.setQGcontent();
  },
  didUpdate: function() {
    if(FLOW.questionControl.get('allRecordsSaved')) FLOW.questionControl.setQGcontent();
  },
  didCreate: function() {
    if(FLOW.questionControl.get('allRecordsSaved')) FLOW.questionControl.setQGcontent();
  },

  allowDecimal: DS.attr('boolean', {
    defaultValue: false
  }),
  allowMultipleFlag: DS.attr('boolean', {
    defaultValue: false
  }),
  allowOtherFlag: DS.attr('boolean', {
    defaultValue: false
  }),
  allowSign: DS.attr('boolean', {
    defaultValue: false
  }),
  collapseable: DS.attr('boolean', {
    defaultValue: false
  }),
  immutable: DS.attr('boolean', {
    defaultValue: false
  }),
  isName: DS.attr('boolean', {
    defaultValue: false
  }),
  mandatoryFlag: DS.attr('boolean', {
    defaultValue: false
  }),
  dependentFlag: DS.attr('boolean', {
    defaultValue: false
  }),
  dependentQuestionAnswer: DS.attr('string'),
  dependentQuestionId: DS.attr('number'),
  maxVal: DS.attr('number',{
    defaultValue: null
  }),
  minVal: DS.attr('number',{
    defaultValue: null
  }),
  optionList: DS.attr('string'),
  order: DS.attr('number'),
  path: DS.attr('string'),
  questionGroupId: DS.attr('number'),
  surveyId: DS.attr('number'),
  metricId: DS.attr('number'),
  text: DS.attr('string'),
  tip: DS.attr('string'),
  type: DS.attr('string', {
    defaultValue: "FREE_TEXT"
  })
});


FLOW.QuestionOption = FLOW.BaseModel.extend({
  questionId: DS.attr('number'),
  text: DS.attr('string')
});


FLOW.DeviceGroup = FLOW.BaseModel.extend({
  code: DS.attr('string', {
    defaultValue: ''
  })
});

FLOW.Device = FLOW.BaseModel.extend({
  esn: DS.attr('string', {
    defaultValue: ''
  }),
  phoneNumber: DS.attr('string', {
    defaultValue: ''
  }),
  deviceIdentifier: DS.attr('string', {
    defaultValue: ''
  }),
  gallatinSoftwareManifest: DS.attr('string'),
  lastKnownLat: DS.attr('number', {
    defaultValue: 0
  }),
  lastKnownLon: DS.attr('number', {
    defaultValue: 0
  }),
  lastKnownAccuracy: DS.attr('number', {
    defaultValue: 0
  }),
  lastPositionDate: DS.attr('number', {
    defaultValue: ''
  }),
  deviceGroup: DS.attr('string', {
    defaultValue: ''
  }),
  isSelected: false,
  deviceGroupName: null,
  combinedName: null
});

FLOW.SurveyAssignment = FLOW.BaseModel.extend({
  name: DS.attr('string'),
  startDate: DS.attr('number'),
  endDate: DS.attr('number'),
  devices: DS.attr('array'),
  surveys: DS.attr('array'),
  language: DS.attr('string')
});

FLOW.SurveyedLocale = DS.Model.extend({
  description: DS.attr('string', {
    defaultValue: ''
  }),
  keyId: DS.attr('number'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  primaryKey: 'keyId',
  typeMark: DS.attr('string', {
    defaultValue: 'WATER_POINT'
  })
});

// Explicitly avoid to use belongTo and hasMany as
// Ember-Data lacks of partial loading
// https://github.com/emberjs/data/issues/51
FLOW.PlacemarkDetail = FLOW.BaseModel.extend({
  placemarkId: DS.attr('number'),
  collectionDate: DS.attr('number'),
  questionText: DS.attr('string'),
  metricName: DS.attr('string'),
  stringValue: DS.attr('string')
});

FLOW.Placemark = FLOW.BaseModel.extend({
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  collectionDate: DS.attr('number'),
  markType: DS.attr('string', {
    defaultValue: 'WATER_POINT'
  })
});

FLOW.SurveyInstance = FLOW.BaseModel.extend({
  approvedFlag: DS.attr('string'),
  approximateLocationFlag: DS.attr('string'),
  surveyId: DS.attr('number'),
  collectionDate: DS.attr('number'),
  surveyCode: DS.attr('string'),
  submitterName: DS.attr('string'),
  deviceIdentifier: DS.attr('string')
});

FLOW.QuestionAnswer = FLOW.BaseModel.extend({
  value: DS.attr('string'),
  type: DS.attr('string'),
  oldValue: DS.attr('string'),
  surveyId: DS.attr('number'),
  collectionDate: DS.attr('number'),
  surveyInstanceId: DS.attr('number'),
  questionID: DS.attr('string'),
  questionText: DS.attr('string')
});

FLOW.SurveyQuestionSummary = FLOW.BaseModel.extend({
  response: DS.attr('string'),
  count: DS.attr('number'),
  questionId: DS.attr('string')
});

FLOW.User = FLOW.BaseModel.extend({
  didDelete: function() {
    FLOW.userControl.populate();
  },
  didUpdate: function() {
    FLOW.userControl.populate();
  },
  didCreate: function() {
    FLOW.userControl.populate();
  },

  userName: DS.attr('string'),
  emailAddress: DS.attr('string'),
  admin: DS.attr('boolean', {
    defaultValue: 0
  }),
  superAdmin: DS.attr('boolean', {
    defaultValue: 0
  }),
  permissionList: DS.attr('string', {defaultValue: null})
});

FLOW.UserConfig = FLOW.BaseModel.extend({
  group: DS.attr('string'),
  name: DS.attr('string'),
  value: DS.attr('string'),
  userId: DS.attr('number')
});

// this is called attribute in the dashboard, but metric in the backend, for historic reasons.
FLOW.Metric = FLOW.BaseModel.extend({
  didDelete: function() {
    FLOW.attributeControl.populate();
  },
  didUpdate: function() {
    FLOW.attributeControl.populate();
  },
  didCreate: function() {
    FLOW.attributeControl.populate();
  },
  organization: DS.attr('string'),
  name: DS.attr('string'),
  group: DS.attr('string'),
  valueType: DS.attr('string')
});

FLOW.Message = FLOW.BaseModel.extend({
  objectId: DS.attr('number'),
  lastUpdateDateTime: DS.attr('number'),
  userName: DS.attr('string'),
  objectTitle: DS.attr('string'),
  actionAbout: DS.attr('string'),
  shortMessage: DS.attr('string')
});

FLOW.Action = FLOW.BaseModel.extend({});


FLOW.NotificationSubscription = FLOW.BaseModel.extend({
  notificationDestination: DS.attr('string'),
  notificationOption: DS.attr('string'),
  notificationMethod: DS.attr('string'),
  notificationType: DS.attr('string'),
  expiryDate: DS.attr('number'),
  entityId: DS.attr('number')
});

})();

(function() {

FLOW.SurveyGroup.FIXTURES = [{
    id: 1,
    keyId: 1,
    code: 'Urban sanitation surveys'
}, {
    id: 2,
    keyId: 2,
    code: 'Elise Surveys'
}, {
    id: 3,
    keyId: 3,
    code: 'Test Survey group'
}, {
    id: 4,
    keyId: 4,
    code: 'Upande - SNVVERMIS'
}, {
    id: 5,
    keyId: 5,
    code: 'Akvo test surveys'
}];


FLOW.Survey.FIXTURES = [{
    id: 1,
    keyId: 1,
    code: 'Water point survey',
    name: 'Water point survey',
    surveyGroupId: 1,
    instanceCount:62
}, {
    id: 2,
    keyId: 2,
    code: 'Sanitation survey',
    name: 'Sanitation survey',
    surveyGroupId: 1,
    instanceCount:1400
}, {
    id: 3,
    keyId: 3,
    code: 'Baseline WASH',
    name: 'Baseline WASH',
    surveyGroupId: 1,
    instanceCount:7
}, {
    id: 4,
    keyId: 4,
    code: 'Akvo RSR update',
    name: 'Akvo RSR update',
    surveyGroupId: 1,
    instanceCount:787
}, {
    id: 5,
    keyId: 5,
    code: 'Akvo update',
    name: 'Akvo update',
    surveyGroupId: 1,
    instanceCount:77
}, {
    id: 6,
    keyId: 6,
    code: 'Loics survey',
    name: 'Loics survey',
    surveyGroupId: 1,
    instanceCount:7
}, {
    id: 7,
    keyId: 7,
    code: 'Farmer survey',
    name: 'Farmer survey',
    surveyGroupId: 1,
    instanceCount:723
}, {
    id: 8,
    keyId: 8,
    code: 'Rabbit',
    name: 'Rabbit',
    surveyGroupId: 1,
    instanceCount:3
}, {
    id: 9,
    keyId: 9,
    code: 'Rabbit II',
    name: 'Rabbit II',
    surveyGroupId: 1,
    instanceCount:20000
}];


FLOW.QuestionGroup.FIXTURES = [{
    id: 1,
    keyId: 1,
    surveyId: 1,
    order: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in ligula et ipsum feugiat egestas ac vel arcu. ",
    code: 'Location',
    displayName: 'Location'

}, {
    id: 2,
    keyId: 2,
    surveyId: 1,
    order: 2,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in ligula et ipsum feugiat egestas ac vel arcu.",
    code: 'Occupation',
    displayName: 'Occupation'

}, {
    id: 3,
    keyId: 3,
    surveyId: 1,
    order: 3,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in ligula et ipsum feugiat egestas ac vel arcu.",
    code: 'Water system',
    displayName: 'Water system'

}, {
    id: 4,
    keyId: 4,
    surveyId: 1,
    order: 4,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in ligula et ipsum feugiat egestas ac vel arcu.",
    code: 'Sanitation system',
    displayName: 'Sanitation system'

}, {
    id: 5,
    keyId: 5,
    surveyId: 2,
    order: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in ligula et ipsum feugiat egestas ac vel arcu.",
    code: 'Something else',
    displayName: 'Something else'

}

];

FLOW.Question.FIXTURES = [{
    id: 1,
    keyId: 1,
    text: 'What is the name of the community?',
    displayName: 'What is the name of the community?',
    mandatory: false,
    order: 1,
    questionTypeString: 'freeText',
    questionSetId: 1
}, {
    id: 2,
    keyId: 2,
    text: 'What is your occupation?',
    displayName: 'What is your occupation?',
    mandatory: false,
    order: 2,
    questionTypeString: 'option',
    questionSetId: 1
}, {
    id: 3,
    keyId: 3,
    text: 'How much children do you have?',
    displayName: 'How much children do you have?',
    mandatory: false,
    order: 3,
    questionTypeString: 'number',
    questionSetId: 1
}, {
    id: 4,
    keyId: 4,
    text: 'Please take a geolocation',
    displayName: 'Please take a geolocation',
    mandatory: false,
    order: 4,
    questionTypeString: 'geoLoc',
    questionSetId: 1
}, {
    id: 5,
    keyId: 5,
    text: 'Please take a picture',
    displayName: 'Please take a picture',
    mandatory: false,
    order: 5,
    questionTypeString: 'photo',
    questionSetId: 1
}, {
    id: 6,
    keyId: 6,
    text: 'Please make a video',
    displayName: 'Please make a video',
    questionTypeString: 'video',
    order: 6,
    mandatory: false,
    questionSetId: 1
}, {
    id: 7,
    keyId: 7,
    text: 'What is the date today?',
    displayName: 'What is the date today?',
    questionTypeString: 'date',
    order: 7,
    mandatory: false,
    questionSetId: 1
}];

FLOW.QuestionOption.FIXTURES = [{
    id: 1,
    keyId: 1,
    text: 'teacher',
    questionId: 1
}, {
    id: 2,
    keyId: 2,
    text: 'cook',
    questionId: 1
}, {
    id: 3,
    keyId: 3,
    text: 'minister',
    questionId: 1
}, {
    id: 4,
    keyId: 4,
    text: 'programmer',
    questionId: 1
}];


FLOW.DeviceGroup.FIXTURES = [{
    id: 1,
    displayName: 'Malawi',
    code: 'malawi'
}, {
    id: 2,
    displayName: 'Bolivia',
    code: 'bolivia'
}];

FLOW.Device.FIXTURES = [{
    id: 1,
    keyId: 1,
    phoneNumber: "3f:d4:8f:2a:8c:9f",
    deviceIdentifier: "Keri phone 1",
    deviceGroup: "WFP general",
    lastUpdate: "21 May 2012 20:30:00",
    lastLocationBeaconTime: "22 May 2012 20:30:00",
    lastKnownLat: 23.132132321,
    lastKnownLong: 12.23232332
}, {
    id: 2,
    keyId: 2,
    phoneNumber: "2a:8c:9f:3f:d4:8f",
    deviceIdentifier: " Keri phone 2",
    deviceGroup: "WFP general",
    lastUpdate: "21 Apr 2012 20:30:00",
    lastLocationBeaconTime: "27 Feb 2012 20:30:00",
    lastKnownLat: 43.33434343,
    lastKnownLong: -5.32332343
}, {
    id: 3,
    keyId: 3,
    phoneNumber: "31648492710",
    deviceIdentifier: "Marks phone",
    deviceGroup: "WFP general",
    lastUpdate: "01 Sep 2012 20:30:00",
    lastLocationBeaconTime: "12 Aug 2012 20:30:00",
    lastKnownLat: 34.222334234,
    lastKnownLong: -7.44343434
}, {
    id: 4,
    keyId: 4,
    phoneNumber: "34029392833",
    deviceIdentifier: "WFP colombia-1",
    deviceGroup: "Colombia",
    lastUpdate: "21 Aug 2012 20:30:00",
    lastLocationBeaconTime: "04 Jan 2012 20:30:00",
    lastKnownLat: 2.334343434,
    lastKnownLong: -23.33433432
}, {
    id: 5,
    keyId: 5,
    phoneNumber: "3f:d4:8f:8b:8c:3e",
    deviceIdentifier: "WFP colombia 2",
    deviceGroup: "Colombia",
    lastUpdate: "12 Apr 2012 20:30:00",
    lastLocationBeaconTime: "31 Oct 2012 20:30:00",
    lastKnownLat: 8.55454435,
    lastKnownLong: 54.88399473
}, {
    id: 6,
    keyId: 6,
    phoneNumber: "2a:8c:9f:3f:d4:8f",
    deviceIdentifier: "WFP phone 3",
    deviceGroup: "Malawi",
    lastUpdate: "17 Jul 2012 20:30:00",
    lastLocationBeaconTime: "16 Jun 2012 20:30:00",
    lastKnownLat: 23.988332,
    lastKnownLong: -64.88399483
}, {
    id: 7,
    keyId: 7,
    phoneNumber: "3403928293",
    deviceIdentifier: "WFP phone 4",
    deviceGroup: "Malawi",
    lastUpdate: "11 Dec 2012 20:30:00",
    lastLocationBeaconTime: "14 Nov 2012 20:30:00",
    lastKnownLat: 23.3323432,
    lastKnownLong: 9.88873633
}];

FLOW.SurveyedLocale.FIXTURES = [{
    description: "Welkom in Amsterdam!",
    keyId: 1,
    latitude: 52.370216,
    longitude: 4.895168,
    typeMark: "WATER_POINT"
}, {
    description: "Welcome to London!",
    keyId: 2,
    latitude: 51.507335,
    longitude: -0.127683,
    typeMark: "WATER_POINT"
}, {
    description: "Välkommen till Stockholm!",
    keyId: 3,
    latitude: 59.32893,
    longitude: 18.06491,
    typeMark: "WATER_POINT"
}];

FLOW.Placemark.FIXTURES = [{
    longitude: 36.76034601,
    latitude: -1.29624521,
    collectionDate: 1328620272000,
    markType: "WATER_POINT",
    id: 530003
}, {
    longitude: 36.76052649,
    latitude: -1.29624207,
    collectionDate: 1331040590000,
    markType: "WATERPOINT",
    id: 545030
}, {
    longitude: 36.7545783327,
    latitude: -1.35175386504,
    collectionDate: 1331005669000,
    markType: "WATER_POINT",
    id: 549003
}, {
    longitude: 36.74724467,
    latitude: -1.26103461,
    collectionDate: 1333221136000,
    markType: "WATERPOINT",
    id: 606070
}, {
    longitude: 36.69691894,
    latitude: -1.25285542,
    collectionDate: 1333221922000,
    markType: "WATERPOINT",
    id: 609077
}, {
    longitude: 35.07498217,
    latitude: -0.15946829,
    collectionDate: 1334905070000,
    markType: "WATERPOINT",
    id: 732033
}, {
    longitude: 36.76023113,
    latitude: -1.29614013,
    collectionDate: 1335258461000,
    markType: "WATER_POINT",
    id: 761148
}, {
    longitude: 36.7905733168,
    latitude: -1.85040885561,
    collectionDate: 1339065449000,
    markType: "WATER_POINT",
    id: 950969
}, {
    longitude: 35.19765058,
    latitude: -0.15885514,
    collectionDate: 1339660634000,
    markType: "WATER_POINT",
    id: 990840
}, {
    longitude: 35.23715568,
    latitude: -0.16715051,
    collectionDate: 1340173295000,
    markType: "WATERPOINT",
    id: 1029003
}];

FLOW.PlacemarkDetail.FIXTURES = [{
    stringValue: "Community (CBO)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "1. WP Ownership",
    placemarkId: 732033,
    id: 734238
}, {
    stringValue: "Functional ( in use)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "1.Functional status",
    placemarkId: 732033,
    id: 734234
}, {
    stringValue: "Unsafe",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "2a. Quantitative in-field assessment",
    placemarkId: 732033,
    id: 735246
}, {
    stringValue: "Coloured (whitish- brownish)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "2b.Qualitative in-field assessment",
    placemarkId: 732033,
    id: 735245
}, {
    stringValue: "Good- practically always",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "3. Reliability",
    placemarkId: 732033,
    id: 734235
}, {
    stringValue: "Yes",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "B.Sufficient for HHs",
    placemarkId: 732033,
    id: 732228
}, {
    stringValue: "Yes",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "C. Sufficient for livestock",
    placemarkId: 732033,
    id: 735242
}, {
    stringValue: "ahero youth",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "CBO, specify",
    placemarkId: 732033,
    id: 732222
}, {
    stringValue: "Unknown",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Committee in place:",
    placemarkId: 732033,
    id: 735249
}, {
    stringValue: "all",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Community, specify",
    placemarkId: 732033,
    id: 732224
}, {
    stringValue: "Name one",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Contact one",
    placemarkId: 732033,
    id: 735244
}, {
    stringValue: "40",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "D. HHs # served/day",
    placemarkId: 732033,
    id: 735241
}, {
    stringValue: "20/04/12",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Date Record",
    placemarkId: 732033,
    id: 728181
}, {
    stringValue: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Do you have an SPA?",
    placemarkId: 732033,
    id: 734236
}, {
    stringValue: "community",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Funded by",
    placemarkId: 732033,
    id: 728179
}, {
    stringValue: "-0.16252854|35.07743752|1136.800048828125|7gs8a46",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "GPS reading",
    placemarkId: 732033,
    id: 732229
}, {
    stringValue: "alex",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Interviewee",
    placemarkId: 732033,
    id: 728178
}, {
    stringValue: "amara",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Interviewer",
    placemarkId: 732033,
    id: 728180
}, {
    stringValue: "ahero pan",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Name of source/water point",
    placemarkId: 732033,
    id: 728182
}, {
    stringValue: "onuonga",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Names one,specify",
    placemarkId: 732033,
    id: 735247
}, {
    stringValue: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "O&M cost recovery",
    placemarkId: 732033,
    id: 732225
}, {
    stringValue: "LVNWSB",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Organisation",
    placemarkId: 732033,
    id: 728183
}, {
    stringValue: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Part of the piped scheme",
    placemarkId: 732033,
    id: 734229
}, {
    stringValue: "/mnt/sdcard/fieldsurvey/surveyal/8/7/9/8/5/wfpPhoto18652367987985.jpg",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Photo",
    placemarkId: 732033,
    id: 732230
}, {
    stringValue: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Specify none",
    placemarkId: 732033,
    id: 732223
}, {
    stringValue: "tura",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Sub-location",
    placemarkId: 732033,
    id: 734231
}, {
    stringValue: "< 1 hour",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Time",
    placemarkId: 732033,
    id: 732227
}, {
    stringValue: "Dam/Pan(runoff harvesting)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Unimproved",
    placemarkId: 732033,
    id: 734233
}, {
    stringValue: "ksm/040",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "WP ID",
    placemarkId: 732033,
    id: 728177
}, {
    stringValue: "Community (technician) Name/NO",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "WP Maintenance",
    placemarkId: 732033,
    id: 735248
}, {
    stringValue: "Directly managed by the CBO",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "WP Management",
    placemarkId: 732033,
    id: 734237
}, {
    stringValue: "Year round",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water Availability",
    placemarkId: 732033,
    id: 732226
}, {
    stringValue: "None",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water Payment",
    placemarkId: 732033,
    id: 735250
}, {
    stringValue: "30",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water consumption per ( in dry season)",
    placemarkId: 732033,
    id: 735243
}, {
    stringValue: "Unimproved",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water source type",
    placemarkId: 732033,
    id: 734232
}, {
    stringValue: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Within WSP",
    placemarkId: 732033,
    id: 734230
}, {
    stringValue: "2004",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Year Constructed",
    placemarkId: 732033,
    id: 732231
}];


FLOW.QuestionAnswer.FIXTURES = [{
    value: "Community (CBO)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "1. WP Ownership",
    placemarkId: 732033,
    id: 734238
}, {
    value: "Functional ( in use)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "1.Functional status",
    placemarkId: 732033,
    id: 734234
}, {
    value: "Unsafe",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "2a. Quantitative in-field assessment",
    placemarkId: 732033,
    id: 735246
}, {
    value: "Coloured (whitish- brownish)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "2b.Qualitative in-field assessment",
    placemarkId: 732033,
    id: 735245
}, {
    value: "Good- practically always",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "3. Reliability",
    placemarkId: 732033,
    id: 734235
}, {
    value: "Yes",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "B.Sufficient for HHs",
    placemarkId: 732033,
    id: 732228
}, {
    value: "Yes",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "C. Sufficient for livestock",
    placemarkId: 732033,
    id: 735242
}, {
    value: "ahero youth",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "CBO, specify",
    placemarkId: 732033,
    id: 732222
}, {
    value: "Unknown",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Committee in place:",
    placemarkId: 732033,
    id: 735249
}, {
    value: "all",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Community, specify",
    placemarkId: 732033,
    id: 732224
}, {
    value: "Name one",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Contact one",
    placemarkId: 732033,
    id: 735244
}, {
    value: "40",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "D. HHs # served/day",
    placemarkId: 732033,
    id: 735241
}, {
    value: "20/04/12",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Date Record",
    placemarkId: 732033,
    id: 728181
}, {
    value: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Do you have an SPA?",
    placemarkId: 732033,
    id: 734236
}, {
    value: "community",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Funded by",
    placemarkId: 732033,
    id: 728179
}, {
    value: "-0.16252854|35.07743752|1136.800048828125|7gs8a46",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "GPS reading",
    placemarkId: 732033,
    id: 732229
}, {
    value: "alex",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Interviewee",
    placemarkId: 732033,
    id: 728178
}, {
    value: "amara",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Interviewer",
    placemarkId: 732033,
    id: 728180
}, {
    value: "ahero pan",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Name of source/water point",
    placemarkId: 732033,
    id: 728182
}, {
    value: "onuonga",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Names one,specify",
    placemarkId: 732033,
    id: 735247
}, {
    value: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "O&M cost recovery",
    placemarkId: 732033,
    id: 732225
}, {
    value: "LVNWSB",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Organisation",
    placemarkId: 732033,
    id: 728183
}, {
    value: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Part of the piped scheme",
    placemarkId: 732033,
    id: 734229
}, {
    value: "/mnt/sdcard/fieldsurvey/surveyal/8/7/9/8/5/wfpPhoto18652367987985.jpg",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Photo",
    placemarkId: 732033,
    id: 732230
}, {
    value: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Specify none",
    placemarkId: 732033,
    id: 732223
}, {
    value: "tura",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Sub-location",
    placemarkId: 732033,
    id: 734231
}, {
    value: "< 1 hour",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Time",
    placemarkId: 732033,
    id: 732227
}, {
    value: "Dam/Pan(runoff harvesting)",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Unimproved",
    placemarkId: 732033,
    id: 734233
}, {
    value: "ksm/040",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "WP ID",
    placemarkId: 732033,
    id: 728177
}, {
    value: "Community (technician) Name/NO",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "WP Maintenance",
    placemarkId: 732033,
    id: 735248
}, {
    value: "Directly managed by the CBO",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "WP Management",
    placemarkId: 732033,
    id: 734237
}, {
    value: "Year round",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water Availability",
    placemarkId: 732033,
    id: 732226
}, {
    value: "None",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water Payment",
    placemarkId: 732033,
    id: 735250
}, {
    value: "30",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water consumption per ( in dry season)",
    placemarkId: 732033,
    id: 735243
}, {
    value: "Unimproved",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Water source type",
    placemarkId: 732033,
    id: 734232
}, {
    value: "No",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Within WSP",
    placemarkId: 732033,
    id: 734230
}, {
    value: "2004",
    collectionDate: 1334938302000,
    metricName: "Mars / Initial question du planteur",
    questionText: "Year Constructed",
    placemarkId: 732033,
    id: 732231
}];

FLOW.SurveyInstance.FIXTURES = [{
    submitterName: "Community (CBO)",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "1. WP Ownership",
    placemarkId: 732033,
    id: 734238
}, {
    submitterName: "Functional ( in use)",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "1.Functional status",
    placemarkId: 732033,
    id: 734234
}, {
    submitterName: "Unsafe",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "2a. Quantitative in-field assessment",
    placemarkId: 732033,
    id: 735246
}, {
    submitterName: "Coloured (whitish- brownish)",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "2b.Qualitative in-field assessment",
    placemarkId: 732033,
    id: 735245
}, {
    submitterName: "Good- practically always",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "3. Reliability",
    placemarkId: 732033,
    id: 734235
}, {
    submitterName: "Yes",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "B.Sufficient for HHs",
    placemarkId: 732033,
    id: 732228
}, {
    submitterName: "Yes",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "C. Sufficient for livestock",
    placemarkId: 732033,
    id: 735242
}, {
    submitterName: "ahero youth",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "CBO, specify",
    placemarkId: 732033,
    id: 732222
}, {
    submitterName: "Unknown",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Committee in place:",
    placemarkId: 732033,
    id: 735249
}, {
    submitterName: "all",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Community, specify",
    placemarkId: 732033,
    id: 732224
}, {
    submitterName: "Name one",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Contact one",
    placemarkId: 732033,
    id: 735244
}, {
    submitterName: "40",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "D. HHs # served/day",
    placemarkId: 732033,
    id: 735241
}, {
    submitterName: "20/04/12",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Date Record",
    placemarkId: 732033,
    id: 728181
}, {
    submitterName: "No",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Do you have an SPA?",
    placemarkId: 732033,
    id: 734236
}, {
    submitterName: "community",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Funded by",
    placemarkId: 732033,
    id: 728179
}, {
    submitterName: "-0.16252854|35.07743752|1136.800048828125|7gs8a46",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "GPS reading",
    placemarkId: 732033,
    id: 732229
}, {
    submitterName: "alex",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Interviewee",
    placemarkId: 732033,
    id: 728178
}, {
    submitterName: "amara",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Interviewer",
    placemarkId: 732033,
    id: 728180
}, {
    submitterName: "ahero pan",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Name of source/water point",
    placemarkId: 732033,
    id: 728182
}, {
    submitterName: "onuonga",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Names one,specify",
    placemarkId: 732033,
    id: 735247
}, {
    submitterName: "No",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "O&M cost recovery",
    placemarkId: 732033,
    id: 732225
}, {
    submitterName: "LVNWSB",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Organisation",
    placemarkId: 732033,
    id: 728183
}, {
    submitterName: "No",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Part of the piped scheme",
    placemarkId: 732033,
    id: 734229
}, {
    submitterName: "/mnt/sdcard/fieldsurvey/surveyal/8/7/9/8/5/wfpPhoto18652367987985.jpg",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Photo",
    placemarkId: 732033,
    id: 732230
}, {
    submitterName: "No",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Specify none",
    placemarkId: 732033,
    id: 732223
}, {
    submitterName: "tura",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Sub-location",
    placemarkId: 732033,
    id: 734231
}, {
    submitterName: "< 1 hour",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Time",
    placemarkId: 732033,
    id: 732227
}, {
    submitterName: "Dam/Pan(runoff harvesting)",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Unimproved",
    placemarkId: 732033,
    id: 734233
}, {
    submitterName: "ksm/040",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "WP ID",
    placemarkId: 732033,
    id: 728177
}, {
    submitterName: "Community (technician) Name/NO",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "WP Maintenance",
    placemarkId: 732033,
    id: 735248
}, {
    submitterName: "Directly managed by the CBO",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "WP Management",
    placemarkId: 732033,
    id: 734237
}, {
    submitterName: "Year round",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Water Availability",
    placemarkId: 732033,
    id: 732226
}, {
    submitterName: "None",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Water Payment",
    placemarkId: 732033,
    id: 735250
}, {
    submitterName: "30",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Water consumption per ( in dry season)",
    placemarkId: 732033,
    id: 735243
}, {
    submitterName: "Unimproved",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Water source type",
    placemarkId: 732033,
    id: 734232
}, {
    submitterName: "No",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Within WSP",
    placemarkId: 732033,
    id: 734230
}, {
    submitterName: "2004",
    collectionDate: 1334938302000,
    surveyCode: "Mars / Initial question du planteur",
    deviceIdentifier: "Year Constructed",
    placemarkId: 732033,
    id: 732231
}];

FLOW.SurveyQuestionSummary.FIXTURES = [{
    id: 1,
    keyId: 1,
    response:'Apples',
    count:20
}, {
    id: 2,
    keyId: 2,
    response:'Pears',
    count:30
}, {
    id: 3,
    keyId: 3,
    response:'Oranges',
    count:'15'
}, {
    id: 4,
    keyId: 4,
    response:'Mangos',
    count:'45'
}, {
    id: 5,
    keyId: 5,
    response:'Mandarins',
    count:'80'
},{
    id: 5,
    keyId: 5,
    response:'Grapes',
    count:'100'
}];

FLOW.Message.FIXTURES = [{
    id: 1,
    keyId: 1,
    lastUpdateDateTime:1352149195000,
    userName:"m.t.westra@akvo.org",
    shortMessage:"Published. Please check: http://flowdemo.s3.amazonaws.com/surveys/1417001.xml",
    objectTitle:"Mars surveys/Philly Demo",
    actionAbout:"surveyChangeComplete"
}, {
    id: 2,
    keyId: 2,
    lastUpdateDateTime:1352149195000,
    userName:"m.t.westra@akvo.org",
    shortMessage:"Published. Please check: http://flowdemo.s3.amazonaws.com/surveys/1417001.xml",
    objectTitle:"Mars surveys/Philly Demo",
     actionAbout:"surveyChangeComplete"
}, {
    id: 3,
    keyId: 3,
    lastUpdateDateTime:1352149195000,
    userName:"m.t.westra@akvo.org",
    shortMessage:"Published. Please check: http://flowdemo.s3.amazonaws.com/surveys/1417001.xml",
    objectTitle:"Mars surveys/Philly Demo",
     actionAbout:"surveyChangeComplete"
}, {
    id: 4,
    keyId: 4,
    lastUpdateDateTime:1352149195000,
    userName:"m.t.westra@akvo.org",
    shortMessage:"Published. Please check: http://flowdemo.s3.amazonaws.com/surveys/1417001.xml",
    objectTitle:"Mars surveys/Philly Demo",
     actionAbout:"surveyChangeComplete"
}, {
    id: 5,
    keyId: 5,
    lastUpdateDateTime:1352149195000,
    userName:"m.t.westra@akvo.org",
    shortMessage:"Published. Please check: http://flowdemo.s3.amazonaws.com/surveys/1417001.xml",
    objectTitle:"Mars surveys/Philly Demo",
     actionAbout:"surveyChangeComplete"
},{
    id: 5,
    keyId: 5,
    lastUpdateDateTime:1352149195000,
    userName:"m.t.westra@akvo.org",
    shortMessage:"Published. Please check: http://flowdemo.s3.amazonaws.com/surveys/1417001.xml",
    objectTitle:"Mars surveys/Philly Demo",
     actionAbout:"surveyChangeComplete"
}];

})();

(function() {

// ***********************************************//
//                 controllers
// ***********************************************//
// Define the main application controller. This is automatically picked up by
// the application and initialized.


})();

(function() {

FLOW.ApplicationController = Ember.Controller.extend({
  init: function() {
    this._super();
    Ember.STRINGS = Ember.STRINGS_EN;
  }
});

//

})();

(function() {

// Navigation controllers
FLOW.NavigationController = Em.Controller.extend({
  selected: null
});
FLOW.NavHomeController = Ember.Controller.extend();
FLOW.NavSurveysController = Ember.Controller.extend();
FLOW.NavSurveysEditController = Ember.Controller.extend();
FLOW.NavDevicesController = Ember.Controller.extend();
FLOW.DevicesSubnavController = Em.Controller.extend();
FLOW.DevicesTableHeaderController = Em.Controller.extend({
  selected: null
});

FLOW.NavDataController = Ember.Controller.extend();
FLOW.DatasubnavController = Em.Controller.extend();
FLOW.InspectDataController = Ember.ArrayController.extend();
FLOW.BulkUploadController = Ember.Controller.extend();
FLOW.DataCleaningController = Ember.Controller.extend();

FLOW.NavReportsController = Ember.Controller.extend();
FLOW.ReportsSubnavController = Em.Controller.extend();
FLOW.ExportReportsController = Ember.ArrayController.extend();
FLOW.ChartReportsController = Ember.Controller.extend();

FLOW.NavMapsController = Ember.Controller.extend();
FLOW.NavUsersController = Ember.Controller.extend();
FLOW.NavMessagesController = Ember.Controller.extend();
FLOW.NavAdminController = Ember.Controller.extend();


})();

(function() {

// ***********************************************//
//                      Navigation views
// ***********************************************//
/*global tooltip, makePlaceholders */




})();

(function() {

FLOW.ApplicationView = Ember.View.extend({
  templateName: 'application/application',

  init: function() {
    var locale;

    this._super();

    // If available set language from local storage
    locale = localStorage.locale;
    if(typeof locale === 'undefined') {
      locale = 'en';
    }
    switch(locale) {
    case 'fr':
      Ember.STRINGS = Ember.STRINGS_FR;
      break;
    case 'es':
      Ember.STRINGS = Ember.STRINGS_ES;
      break;
    default:
      Ember.STRINGS = Ember.STRINGS_EN;
      break;
    }
  }
});

// ***********************************************//
//                      Handlebar helpers
// ***********************************************//
// localisation helper
Ember.Handlebars.registerHelper('t', function(i18nKey, options) {
  var i18nValue;
  try {
    i18nValue = Ember.String.loc(i18nKey);
  }
  catch (err) {
    return i18nKey;
  }
  return i18nValue;
});

Ember.Handlebars.registerHelper('tooltip', function(i18nKey) {
  var tooltip;
  try {
    tooltip = Ember.String.loc(i18nKey);
  }
  catch (err) {
    tooltip = i18nKey;
  }
  return new Handlebars.SafeString(
    '<a href="#" class="helpIcon tooltip" title="' + tooltip + '">?</a>'
  );
});

// translates values to labels for languages
Ember.Handlebars.registerHelper('toLanguage', function(value) {
  var label, valueLoc;
  label = "";
  valueLoc = Ember.get(this,value);

  FLOW.languageControl.get('content').forEach(function(item){
    if (item.get('value') == valueLoc) {
      label = item.get('label');
    }
  });
  return label;
});

// translates values to labels for surveyPointTypes
Ember.Handlebars.registerHelper('toPointType', function(value) {
  var label, valueLoc;
  label = "";
  valueLoc = Ember.get(this,value);

  FLOW.surveyPointTypeControl.get('content').forEach(function(item){
    if (item.get('value') == valueLoc) {
      label = item.get('label');
    }
  });
  return label;
});

// translates values to labels for attributeTypes
Ember.Handlebars.registerHelper('toAttributeType', function(value) {
  var label, valueLoc;
  label = "";
  valueLoc = Ember.get(this,value);

  FLOW.attributeTypeControl.get('content').forEach(function(item){
    if (item.get('value') == valueLoc) {
      label = item.get('label');
    }
  });
  return label;
});


// add space to vertical bar helper
Ember.Handlebars.registerHelper('addSpace', function(property) {
  return Ember.get(this, property).replace(/\|/g, ' | ');
});

// date format helper
Ember.Handlebars.registerHelper("date", function(property) {
  var d = new Date(parseInt(Ember.get(this, property), 10));
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  return(curr_date + " " + m_names[curr_month] + " " + curr_year);
});

// format used in devices table
Ember.Handlebars.registerHelper("date1", function(property) {
  var d, curr_date, curr_month, curr_year, curr_hour, curr_min, monthString, dateString, hourString, minString;
  if(Ember.get(this, property) !== null) {
    d = new Date(parseInt(Ember.get(this, property), 10));
    curr_date = d.getDate();
    curr_month = d.getMonth() + 1;
    curr_year = d.getFullYear();
    curr_hour = d.getHours();
    curr_min = d.getMinutes();

    if(curr_month < 10) {
      monthString = "0" + curr_month.toString();
    } else {
      monthString = curr_month.toString();
    }

    if(curr_date < 10) {
      dateString = "0" + curr_date.toString();
    } else {
      dateString = curr_date.toString();
    }

    if(curr_hour < 10) {
      hourString = "0" + curr_hour.toString();
    } else {
      hourString = curr_hour.toString();
    }

    if(curr_min < 10) {
      minString = "0" + curr_min.toString();
    } else {
      minString = curr_min.toString();
    }

    return(curr_year + "-" + monthString + "-" + dateString + "  " + hourString + ":" + minString);
  } else {
    return "";
  }
});

// format used in devices table
Ember.Handlebars.registerHelper("date3", function(property) {
  var d, curr_date, curr_month, curr_year, monthString, dateString;
  if(Ember.get(this, property) !== null) {
    d = new Date(parseInt(Ember.get(this, property), 10));
    curr_date = d.getDate();
    curr_month = d.getMonth() + 1;
    curr_year = d.getFullYear();

    if(curr_month < 10) {
      monthString = "0" + curr_month.toString();
    } else {
      monthString = curr_month.toString();
    }

    if(curr_date < 10) {
      dateString = "0" + curr_date.toString();
    } else {
      dateString = curr_date.toString();
    }

    return(curr_year + "-" + monthString + "-" + dateString);
  } else {
    return "";
  }
});

Ember.Handlebars.registerHelper("getServer", function () {
  var loc = window.location.href,
      pos = loc.indexOf("/admin");
  return loc.substring(0, pos);
});

// Register a Handlebars helper that instantiates `view`.
// The view will have its `content` property bound to the
// helper argument.
FLOW.registerViewHelper = function(name, view) {
  Ember.Handlebars.registerHelper(name, function(property, options) {
    options.hash.contentBinding = property;
    return Ember.Handlebars.helpers.view.call(this, view, options);
  });
};


FLOW.registerViewHelper('date2', Ember.View.extend({
  tagName: 'span',

  template: Ember.Handlebars.compile('{{view.formattedContent}}'),

  formattedContent: (function() {
    var content, d, curr_date, curr_month, curr_year, curr_hour, curr_min, monthString, dateString, hourString, minString;
    content = this.get('content');

    if(content === null) {
      return "";
    }

    d = new Date(parseInt(content, 10));
    curr_date = d.getDate();
    curr_month = d.getMonth() + 1;
    curr_year = d.getFullYear();
    curr_hour = d.getHours();
    curr_min = d.getMinutes();

    if(curr_month < 10) {
      monthString = "0" + curr_month.toString();
    } else {
      monthString = curr_month.toString();
    }

    if(curr_date < 10) {
      dateString = "0" + curr_date.toString();
    } else {
      dateString = curr_date.toString();
    }

    if(curr_hour < 10) {
      hourString = "0" + curr_hour.toString();
    } else {
      hourString = curr_hour.toString();
    }

    if(curr_min < 10) {
      minString = "0" + curr_min.toString();
    } else {
      minString = curr_min.toString();
    }

    return(curr_year + "-" + monthString + "-" + dateString + "  " + hourString + ":" + minString);
  }).property('content')
}));

// ********************************************************//
//                      standard views
// ********************************************************//
// TODO check if doing this in View is not impacting performance,
// as some pages have a lot of views (all navigation elements, for example)
// one way could be use an extended copy of view, with the didInsertElement,
// for some of the elements, and not for others.
Ember.View.reopen({
  didInsertElement: function() {
    this._super();
    tooltip();
  }
});

Ember.Select.reopen({
  attributeBindings: ['size']
});


FLOW.DateField = Ember.TextField.extend({
 didInsertElement: function() {
    this._super();

    // datepickers
    $("#from_date").datepicker({
      dateFormat: 'yy/mm/dd',
      defaultDate: new Date(),
      numberOfMonths: 1,
      minDate: new Date(),
      onSelect: function(selectedDate) {
        $("#to_date").datepicker("option", "minDate", selectedDate);
        FLOW.dateControl.set('fromDate', selectedDate);
      }
    });

    $("#to_date").datepicker({
      dateFormat: 'yy/mm/dd',
      defaultDate: new Date(),
      numberOfMonths: 1,
      minDate: new Date(),
      onSelect: function(selectedDate) {
        $("#from_date").datepicker("option", "maxDate", selectedDate);
        FLOW.dateControl.set('toDate', selectedDate);
      }
    });
  }
});

FLOW.DateField2 = Ember.TextField.extend({
 didInsertElement: function() {
    this._super();

    this.$().datepicker({
      dateFormat: 'yy/mm/dd',
      defaultDate: new Date(),
      numberOfMonths: 1
    });
    this.$().datepicker("option", "minDate", new Date());
  }
});


// FLOW.NavSurveysMainView = Ember.View.extend({
//   templateName: 'navSurveys/nav-surveys-main'
// });

// FLOW.NavSurveysEditView = Ember.View.extend({
//   templateName: 'navSurveys/nav-surveys-edit'
// });

// FLOW.ManageNotificationsView = Ember.View.extend({
//   templateName: 'navSurveys/manage-notifications'
// });

// FLOW.EditQuestionsView = Ember.View.extend({
//   templateName: 'navSurveys/edit-questions'
// });



// FLOW.CurrentDevicesView = FLOW.View.extend({
//   templateName: 'navDevices/devices-list-tab/devices-list'
// });

// FLOW.AssignSurveysOverviewView = FLOW.View.extend({
//   templateName: 'navDevices/assignment-list-tab/assignment-list'
// });

// FLOW.EditSurveyAssignmentView = Ember.View.extend({
//   templateName: 'navDevices/assignment-edit-tab/assignment-edit'
// });

// FLOW.SurveyBootstrapView = FLOW.View.extend({
//   templateName: 'navDevices/bootstrap-tab/survey-bootstrap'
// });


// FLOW.InspectDataView = Ember.View.extend({
//   templateName: 'navData/inspect-data'
// });

// FLOW.ManageAttributesView = Ember.View.extend({
//   templateName: 'navData/manage-attributes'
// });

// FLOW.BulkUploadView = Ember.View.extend({
//   templateName: 'navData/bulk-upload'
// });
// FLOW.DataCleaningView = Ember.View.extend({
//   templateName: 'navData/data-cleaning'
// });

// // reports views

// FLOW.ExportReportsView = Ember.View.extend({
//   templateName: 'navReports/export-reports'
// });

// FLOW.ChartReportsView = Ember.View.extend({
//   templateName: 'navReports/chart-reports'
// });


// applets
FLOW.BootstrapApplet = Ember.View.extend({
  templateName: 'navDevices/bootstrap-tab/applets/bootstrap-applet'
});

FLOW.rawDataReportApplet = Ember.View.extend({
  templateName: 'navReports/applets/raw-data-report-applet'
});

FLOW.comprehensiveReportApplet = Ember.View.extend({
  templateName: 'navReports/applets/comprehensive-report-applet'
});

FLOW.googleEarthFileApplet = Ember.View.extend({
  templateName: 'navReports/applets/google-earth-file-applet'
});

FLOW.surveyFormApplet = Ember.View.extend({
  templateName: 'navReports/applets/survey-form-applet'
});

FLOW.bulkImportApplet = Ember.View.extend({
  templateName: 'navData/applets/bulk-import-applet'
});

FLOW.rawDataImportApplet = Ember.View.extend({
  templateName: 'navData/applets/raw-data-import-applet'
});



// admin views

FLOW.HeaderView = FLOW.View.extend({
  templateName: 'application/header'
});

FLOW.FooterView = FLOW.View.extend({
  templateName: 'application/footer'
});

// ********************************************************//
//             Subnavigation for the Data tabs
// ********************************************************//
FLOW.DatasubnavView = FLOW.View.extend({
  templateName: 'navData/data-subnav',
  selectedBinding: 'controller.selected',
  NavItemView: Ember.View.extend({
    tagName: 'li',
    classNameBindings: 'isActive:active'.w(),

    isActive: function() {
      return this.get('item') === this.get('parentView.selected');
    }.property('item', 'parentView.selected').cacheable()
  })
});

// ********************************************************//
//             Subnavigation for the Device tabs
// ********************************************************//
FLOW.DevicesSubnavView = FLOW.View.extend({
  templateName: 'navDevices/devices-subnav',
  selectedBinding: 'controller.selected',
  NavItemView: Ember.View.extend({
    tagName: 'li',
    classNameBindings: 'isActive:active'.w(),

    isActive: function() {
      return this.get('item') === this.get('parentView.selected');
    }.property('item', 'parentView.selected').cacheable()
  })
});

// ********************************************************//
//             Subnavigation for the Reports tabs
// ********************************************************//
FLOW.ReportsSubnavView = Em.View.extend({
  templateName: 'navReports/reports-subnav',
  selectedBinding: 'controller.selected',
  NavItemView: Ember.View.extend({
    tagName: 'li',
    classNameBindings: 'isActive:active'.w(),

    isActive: function() {
      return this.get('item') === this.get('parentView.selected');
    }.property('item', 'parentView.selected').cacheable()
  })
});


// *************************************************************//
//             Generic table column view which supports sorting
// *************************************************************//
FLOW.ColumnView = Ember.View.extend({
  tagName: 'th',
  item: null,
  type: null,

  classNameBindings: ['isActiveAsc:sorting_asc', 'isActiveDesc:sorting_desc'],

  isActiveAsc: function() {
    return(this.get('item') === FLOW.tableColumnControl.get('selected')) && (FLOW.tableColumnControl.get('sortAscending') === true);
  }.property('item', 'FLOW.tableColumnControl.selected', 'FLOW.tableColumnControl.sortAscending').cacheable(),

  isActiveDesc: function() {
    return(this.get('item') === FLOW.tableColumnControl.get('selected')) && (FLOW.tableColumnControl.get('sortAscending') === false);
  }.property('item', 'FLOW.tableColumnControl.selected', 'FLOW.tableColumnControl.sortAscending').cacheable(),

  sort: function() {
    if((this.get('isActiveAsc')) || (this.get('isActiveDesc'))) {
      FLOW.tableColumnControl.toggleProperty('sortAscending');
    } else {
      FLOW.tableColumnControl.set('sortProperties', [this.get('item')]);
      FLOW.tableColumnControl.set('selected', this.get('item'));
    }

    if(this.get('type') === 'device') {
      FLOW.deviceControl.getSortInfo();
    } else if(this.get('type') === 'assignment') {
      FLOW.surveyAssignmentControl.getSortInfo();
    } else if(this.get('type') === 'attribute'){
      FLOW.attributeControl.getSortInfo();
    } else if(this.get('type') === 'message'){
      FLOW.messageControl.getSortInfo();
    }
  }
});

var set = Ember.set, get = Ember.get;
Ember.RadioButton = Ember.View.extend({
  title: null,
  checked: false,
  group: "radio_button",
  disabled: false,

  classNames: ['ember-radio-button'],

  defaultTemplate: Ember.Handlebars.compile('<label><input type="radio" {{ bindAttr disabled="view.disabled" name="view.group" value="view.option" checked="view.checked"}} />{{view.title}}</label>'),

  bindingChanged: function(){
   if(this.get("option") == get(this, 'value')){
       this.set("checked", true);
    }
  }.observes("value"),

  change: function() {
    Ember.run.once(this, this._updateElementValue);
  },

  _updateElementValue: function() {
    var input = this.$('input:radio');
    set(this, 'value', input.attr('value'));
  }
});

})();

(function() {

// ***********************************************//
//                 Router
// ***********************************************//


})();

(function() {

FLOW.Router.map(function () {
  this.route('surveys');
  this.route('devices');
  this.route('data');
  this.route('reports');
  this.route('maps');
  this.route('users');
  this.route('messages');
});

FLOW.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('users');
  }
});

FLOW.SurveysRoute = Ember.Route.extend({
  setupController: function (controller) {
   // controller.set('content', FLOW.User.find());
  }
});

FLOW.SurveysView = Ember.View.extend({
  templateName: 'navSurveys/nav-surveys'
});


FLOW.DevicesRoute = Ember.Route.extend({
  setupController: function (controller) {
   // controller.set('content', FLOW.User.find());
  }
});

FLOW.DevicesView = Ember.View.extend({
  templateName: 'navDevices/nav-devices'
});

FLOW.DataRoute = Ember.Route.extend({
  setupController: function (controller) {
   // controller.set('content', FLOW.User.find());
  }
});

FLOW.DataView = Ember.View.extend({
  templateName: 'navData/nav-data'
});

FLOW.ReportsRoute = Ember.Route.extend({
  setupController: function (controller) {
   // controller.set('content', FLOW.User.find());
  }
});

FLOW.ReportsView = Ember.View.extend({
  templateName: 'navReports/nav-reports'
});

FLOW.MapsRoute = Ember.Route.extend({
  setupController: function (controller) {
   // controller.set('content', FLOW.User.find());
  }
});

FLOW.MessagesRoute = Ember.Route.extend({
  setupController: function () {
  //  FLOW.messageControl.populate();
  //  FLOW.selectedControl.set('selectedSurveyGroup', null);
  //  FLOW.selectedControl.set('selectedSurvey', null);
  }
});

FLOW.MessagesView = Ember.View.extend({
  templateName: 'navMessages/nav-messages'
});

FLOW.UsersRoute = Ember.Route.extend({
  setupController: function (controller) {
  //  controller.set('content', FLOW.User.find());
  }

  // renderTemplate: function() {
  //   this.render('akvo-flow/templates/navUsers/nav-users');
  // }
});

FLOW.UsersView = Ember.View.extend({
   templateName: 'navUsers/nav-users'
});











//TODO: Move this controller to the proper file
FLOW.NavUsersController = Ember.ArrayController.extend({
  sortProperties: ['userName'],
  sortAscending: true,

  showAddUserBool: false,
  showEditUserBool: false,
  showDeleteUserBool: false,

  currentUser: null,
  currentTransaction: null,


  sort: function (column) {
    if (this.get('sortProperties')[0] === column) {
      this.set('sortAscending', !this.get('sortAscending'));
    } else {
      this.set('sortAscending', true);
      this.set('sortProperties', [column]);
    }
  },

  showAddUserDialog: function () {
    this.newUser();
    this.set('showAddUserBool', true);
  },

  doAddUser: function () {
    this.commitUser();
    this.set('showAddUserBool', false);
  },

  cancelAddUser: function () {
    this.rollbackUser();
    this.set('showAddUserBool', false);
  },

  newUser: function () {
    var tr = FLOW.store.transaction(),
        usr = tr.createRecord(FLOW.User, {});

    this.set('currentTransaction', tr);
    this.set('currentUser', usr);
  },

  rollbackUser: function () {
    this.get('currentTransaction').rollback();
    this.set('currentTransaction', null);
    this.set('currentUser', null);
  },

  commitUser: function () {
    this.get('currentTransaction').commit();
    this.set('currentTransaction', null);
    this.set('currentUser', null);
  },

  showEditUserDialog: function (user) {
    this.set('currentUser', user);
    this.set('showEditUserBool', true);
  },

  doEditUser: function () {
    FLOW.store.commit();
    this.set('currentUser', null);
    this.set('showEditUserBool', false);
  },

  cancelEditUser: function () {
    this.set('currentUser', null);
    this.set('showEditUserBool', false);
  },

  confirmDeleteUser: function (user) {
    this.set('currentUser', user);
    this.set('showDeleteUserBool', true);
  },

  doDeleteUser: function () {
    this.get('currentUser').deleteRecord();
    FLOW.store.commit();
    this.set('currentUser', null);
    this.set('showDeleteUserBool', false);
  }
});


/*
FLOW.Router = Ember.Router.extend({
  enableLogging: true,
  loggedIn: false,
  location: 'none',
  //'hash'or 'none' for URLs
  root: Ember.Route.extend({
    doNavHome: function(router, context) {
      router.transitionTo('navHome');
    },
    doNavSurveys: function(router, context) {
      router.transitionTo('navSurveys.index');
    },
    doNavDevices: function(router, context) {
      router.transitionTo('navDevices.index');
    },
    doNavData: function(router, context) {
      router.transitionTo('navData.index');
    },
    doNavReports: function(router, context) {
      router.transitionTo('navReports.index');
    },
    doNavMaps: function(router, context) {
      router.transitionTo('navMaps');
    },
    doNavUsers: function(router, context) {
      router.transitionTo('navUsers');
    },
    doNavMessages: function(router, context) {
      router.transitionTo('navMessages');
    },
    // not used at the moment
    doNavAdmin: function(router, context) {
      router.transitionTo('navAdmin');
    },

    // non-working code for transitioning to navHome at first entry of the app
    //    setup: function(router){
    //      router.send("goHome");
    //    },
    //    goHome:function(router){
    //      router.transitionTo('navHome');
    //    },
    index: Ember.Route.extend({
      route: '/',
      redirectsTo: 'navSurveys.index'
    }),

    // ************************** HOME ROUTER **********************************
    navHome: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router, event) {
        router.get('applicationController').connectOutlet('navHome');
        router.set('navigationController.selected', 'navHome');
      }
    }),

    // ******************* SURVEYS ROUTER ********************
    navSurveys: Ember.Route.extend({
      route: '/surveys',
      connectOutlets: function(router, event) {
        router.get('applicationController').connectOutlet('navSurveys');
        router.set('navigationController.selected', 'navSurveys');
      },

      doNewSurvey: function(router, event) {
        router.transitionTo('navSurveys.navSurveysNew');
      },

      doEditSurvey: function(router, event) {
        FLOW.selectedControl.set('selectedSurvey', event.context);
        router.transitionTo('navSurveys.navSurveysEdit.index');
      },

      doSurveysMain: function(router, event) {
        FLOW.selectedControl.set('selectedQuestion', null);
        router.transitionTo('navSurveys.navSurveysMain');
      },

      index: Ember.Route.extend({
        route: '/',
        redirectsTo: 'navSurveysMain'
      }),

      navSurveysMain: Ember.Route.extend({
        route: '/main',
        connectOutlets: function(router, event) {
          router.get('navSurveysController').connectOutlet({
            name: 'navSurveysMain'
          });
          FLOW.surveyGroupControl.populate();
        }
      }),

      navSurveysNew: Ember.Route.extend({
        route: '/new',
        connectOutlets: function(router, event) {
          var newSurvey;

          newSurvey = FLOW.store.createRecord(FLOW.Survey, {
            "name": "",
            "defaultLanguageCode": "en",
            "requireApproval": false,
            "status": "NOT_PUBLISHED",
            "surveyGroupId": FLOW.selectedControl.selectedSurveyGroup.get('keyId')
          });

          FLOW.selectedControl.set('selectedSurvey', newSurvey);
          router.transitionTo('navSurveys.navSurveysEdit.index');
        }
      }),

      navSurveysEdit: Ember.Route.extend({
        route: '/edit',
        connectOutlets: function(router, event) {
          router.get('navSurveysController').connectOutlet({
            name: 'navSurveysEdit'
          });
           // all questions should be closed when we enter
            FLOW.selectedControl.set('selectedQuestion', null);
            FLOW.attributeControl.populate();

            if(!Ember.none(FLOW.selectedControl.selectedSurvey.get('keyId'))) {
              // questionGroups are already loaded in controller automatically
              FLOW.questionControl.populateAllQuestions();
            }
        },

        doManageNotifications: function(router, event) {
          router.transitionTo('navSurveys.navSurveysEdit.manageNotifications');
        },

        doEditQuestions: function(router, event) {
          router.transitionTo('navSurveys.navSurveysEdit.editQuestions');
        },

        index: Ember.Route.extend({
          route: '/',
          redirectsTo: 'editQuestions'
        }),

        manageNotifications: Ember.Route.extend({
          route: '/notifications',
          connectOutlets: function(router, event) {
            router.get('navSurveysEditController').connectOutlet({
              name: 'manageNotifications'
            });
            FLOW.notificationControl.populate();
          }
        }),

        editQuestions: Ember.Route.extend({
          route: '/questions',
          connectOutlets: function(router, event) {
            router.get('navSurveysEditController').connectOutlet({
              name: 'editQuestions'
            });

          }
        })
      })
    }),

    //********************** DEVICES ROUTER *******************
    navDevices: Ember.Route.extend({
      route: '/devices',
      connectOutlets: function(router, event) {
        router.get('applicationController').connectOutlet('navDevices');
        router.set('navigationController.selected', 'navDevices');
      },

      doCurrentDevices: function(router, event) {
        router.transitionTo('navDevices.currentDevices');
      },

      doAssignSurveysOverview: function(router, event) {
        router.transitionTo('navDevices.assignSurveysOverview');
      },

      doEditSurveysAssignment: function(router, event) {
        router.transitionTo('navDevices.editSurveysAssignment');
      },

      doSurveyBootstrap: function(router, event) {
        router.transitionTo('navDevices.surveyBootstrap');
      },

      index: Ember.Route.extend({
        route: '/',
        redirectsTo: 'currentDevices'
      }),

      currentDevices: Ember.Route.extend({
        route: '/current-devices',
        connectOutlets: function(router, context) {
          router.get('navDevicesController').connectOutlet('currentDevices');
          FLOW.deviceGroupControl.populate();
          FLOW.deviceControl.populate();
          FLOW.surveyAssignmentControl.populate();
          router.set('devicesSubnavController.selected', 'currentDevices');
        }
      }),

      assignSurveysOverview: Ember.Route.extend({
        route: '/assign-surveys',
        connectOutlets: function(router, context) {
          router.get('navDevicesController').connectOutlet('assignSurveysOverview');
          router.set('devicesSubnavController.selected', 'assignSurveys');
        }
      }),

      editSurveysAssignment: Ember.Route.extend({
        route: '/assign-surveys',
        connectOutlets: function(router, context) {
          router.get('navDevicesController').connectOutlet('editSurveyAssignment');
          router.set('devicesSubnavController.selected', 'assignSurveys');
        }
      }),

      surveyBootstrap: Ember.Route.extend({
        route: '/manual-transfer',
        connectOutlets: function(router, context) {
          router.get('navDevicesController').connectOutlet('surveyBootstrap');
          router.set('devicesSubnavController.selected', 'surveyBootstrap');
        }
      })
    }),


    // ******************* DATA ROUTER ***********************
    navData: Ember.Route.extend({
      route: '/data',
      connectOutlets: function(router, event) {
        router.get('applicationController').connectOutlet('navData');
        router.set('navigationController.selected', 'navData');
      },

      doInspectData: function(router, event) {
        router.transitionTo('navData.inspectData');
      },
      doManageAttributes: function(router, event) {
        router.transitionTo('navData.manageAttributes');
      },
      doBulkUpload: function(router, event) {
        router.transitionTo('navData.bulkUpload');
      },
      doDataCleaning: function(router, event) {
        router.transitionTo('navData.dataCleaning');
      },

      index: Ember.Route.extend({
        route: '/',
        redirectsTo: 'inspectData'
      }),

      inspectData: Ember.Route.extend({
        route: '/inspectdata',
        connectOutlets: function(router, context) {
          router.get('navDataController').connectOutlet('inspectData');
          router.set('datasubnavController.selected', 'inspectData');
          FLOW.surveyGroupControl.populate();
          FLOW.surveyInstanceControl.populate();
        }
      }),

      manageAttributes: Ember.Route.extend({
        route: '/manageattributes',
        connectOutlets: function(router, context) {
          router.get('navDataController').connectOutlet('manageAttributes');
          router.set('datasubnavController.selected', 'manageAttributes');
          FLOW.attributeControl.populate();
        }
      }),

      bulkUpload: Ember.Route.extend({
        route: '/bulkupload',
        connectOutlets: function(router, context) {
          router.get('navDataController').connectOutlet('bulkUpload');
          router.set('datasubnavController.selected', 'bulkUpload');
        }
      }),

      dataCleaning: Ember.Route.extend({
        route: '/datacleaning',
        connectOutlets: function(router, context) {
          router.get('navDataController').connectOutlet('dataCleaning');
          router.set('datasubnavController.selected', 'dataCleaning');
        }
      })
    }),

    // ************************** REPORTS ROUTER **********************************
    navReports: Ember.Route.extend({
      route: '/reports',
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('navReports');
        FLOW.surveyGroupControl.populate();
        FLOW.selectedControl.set('selectedSurveyGroup', null);
        FLOW.selectedControl.set('selectedSurvey', null);
        FLOW.selectedControl.set('selectedQuestion', null);
        FLOW.surveyControl.set('content', null);
        FLOW.questionControl.set('OPTIONcontent', null);

        router.set('navigationController.selected', 'navReports');
      },

      doExportReports: function(router, event) {
        router.transitionTo('navReports.exportReports');
      },

      doChartReports: function(router, event) {
        router.transitionTo('navReports.chartReports');
      },

      index: Ember.Route.extend({
        route: '/',
        redirectsTo: 'chartReports'
      }),

      exportReports: Ember.Route.extend({
        route: '/exportreports',
        connectOutlets: function(router, context) {
          router.get('navReportsController').connectOutlet('exportReports');
          router.set('reportsSubnavController.selected', 'exportReports');
          FLOW.selectedControl.set('selectedSurveyGroup', null);
        }
      }),

      chartReports: Ember.Route.extend({
        route: '/chartreports',
        connectOutlets: function(router, context) {
          router.get('navReportsController').connectOutlet('chartReports');
          router.set('reportsSubnavController.selected', 'chartReports');
          FLOW.surveyGroupControl.populate();
        }
      })
    }),

    // ************************** MAPS ROUTER **********************************
    navMaps: Ember.Route.extend({
      route: '/maps',
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('navMaps');
        router.set('navigationController.selected', 'navMaps');
      }
    }),

    // ************************** USERS ROUTER **********************************
    navUsers: Ember.Route.extend({
      route: '/users',
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('navUsers');
        router.set('navigationController.selected', 'navUsers');
        FLOW.userControl.populate();
      }
    }),

    // ************************** MESSAGES ROUTER **********************************
    navMessages: Ember.Route.extend({
      route: '/users',
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('navMessages');
        router.set('navigationController.selected', 'navMessages');
        FLOW.messageControl.populate();
        FLOW.selectedControl.set('selectedSurveyGroup', null);
        FLOW.selectedControl.set('selectedSurvey', null);
      }
    }),

    // ************************** ADMIN ROUTER **********************************
    // not used at the moment
    navAdmin: Ember.Route.extend({
      route: '/admin',
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('navAdmin');
        router.set('navigationController.selected', 'navAdmin');
      }
    })
  })
});
*/

})();

(function() {

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

})();

(function() {

FLOW.initialize();

})();