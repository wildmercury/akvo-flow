require('akvo-flow/models/common');

FLOW.Survey = FLOW.BaseModel.extend({
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
    order: DS.attr('number'),
    description: DS.attr('string'),
    name: DS.attr('string'),
    path: DS.attr('string'),
    code: DS.attr('string'),
    surveyId: DS.attr('number')
});


FLOW.Question = FLOW.BaseModel.extend({
    questionOptions: DS.hasMany('FLOW.QuestionOption'),
    questionOptionList: null,
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
    maxVal: DS.attr('number', {
        defaultValue: null
    }),
    minVal: DS.attr('number', {
        defaultValue: null
    }),
    order: DS.attr('number'),
    path: DS.attr('string'),
    questionGroupId: DS.attr('number'),
    surveyId: DS.attr('number'),
    metricId: DS.attr('number'),
    text: DS.attr('string'),
    tip: DS.attr('string'),
    type: DS.attr('string', {
        defaultValue: 'FREE_TEXT'
    })
});


FLOW.QuestionOption = FLOW.BaseModel.extend({
    question: DS.belongsTo('FLOW.Question'),
    order: DS.attr('number'),
    questionId: DS.attr('number'),
    text: DS.attr('string')
});


FLOW.DeviceGroup = FLOW.BaseModel.extend({
    code: DS.attr('string', {
        defaultValue: ''
    })
});

FLOW.Device = FLOW.BaseModel.extend({
    didLoad: function () {
        var combinedName;
        if (Ember.empty(this.get('deviceIdentifier'))) {
            combinedName = 'no identifer';
        } else {
            combinedName = this.get('deviceIdentifier');
        }
        this.set('combinedName', combinedName + ' ' + this.get('phoneNumber'));
    },
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
    deviceGroupName: DS.attr('string', {
        defaultValue: ''
    }),
    isSelected: false,
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
    userName: DS.attr('string'),
    emailAddress: DS.attr('string'),
    admin: DS.attr('boolean', {
        defaultValue: 0
    }),
    superAdmin: DS.attr('boolean', {
        defaultValue: 0
    }),
    permissionList: DS.attr('string', {
        defaultValue: null
    })
});

FLOW.UserConfig = FLOW.BaseModel.extend({
    group: DS.attr('string'),
    name: DS.attr('string'),
    value: DS.attr('string'),
    userId: DS.attr('number')
});

// this is called attribute in the dashboard, but metric in the backend, for historic reasons.
FLOW.Metric = FLOW.BaseModel.extend({
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

FLOW.Translation = FLOW.BaseModel.extend({
    parentType: DS.attr('string'),
    parentId: DS.attr('string'),
    surveyId: DS.attr('string'),
    text: DS.attr('string'),
    langCode: DS.attr('string')
});


FLOW.NotificationSubscription = FLOW.BaseModel.extend({
    notificationDestination: DS.attr('string'),
    notificationOption: DS.attr('string'),
    notificationMethod: DS.attr('string'),
    notificationType: DS.attr('string'),
    expiryDate: DS.attr('number'),
    entityId: DS.attr('number')
});
