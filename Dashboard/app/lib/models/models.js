require('akvo-flow/models/common');

var attr = DS.attr,
    hasMany = DS.hasMany,
    Base = FLOW.BaseModel;

FLOW.Survey = Base.extend({
    defaultLanguageCode: attr('string'),
    status: attr('string'),
    sector: attr('string'),
    code: attr('string'),
    requireApproval: attr('string'),
    version: attr('string'),
    description: attr('string'),
    name: attr('string'),
    path: attr('string'),
    pointType: attr('string'),
    surveyGroupId: attr('number'),
    instanceCount: attr('number'),

    // This attribute is used for the 'Copy Survey' functionality
    // Most of the times is `null`
    sourceId: attr('number', {
        defaultValue: null
    }),
    // used in the assignment edit page, not saved to backend
    surveyGroupName: null
});


FLOW.QuestionGroup = Base.extend({
    order: attr('number'),
    description: attr('string'),
    name: attr('string'),
    path: attr('string'),
    code: attr('string'),
    surveyId: attr('number')
});


FLOW.Question = Base.extend({
    questionOptions: hasMany('question_option'),
    questionOptionList: null,
    allowDecimal: attr('boolean', {
        defaultValue: false
    }),
    allowMultipleFlag: attr('boolean', {
        defaultValue: false
    }),
    allowOtherFlag: attr('boolean', {
        defaultValue: false
    }),
    allowSign: attr('boolean', {
        defaultValue: false
    }),
    collapseable: attr('boolean', {
        defaultValue: false
    }),
    immutable: attr('boolean', {
        defaultValue: false
    }),
    isName: attr('boolean', {
        defaultValue: false
    }),
    mandatoryFlag: attr('boolean', {
        defaultValue: false
    }),
    dependentFlag: attr('boolean', {
        defaultValue: false
    }),
    dependentQuestionAnswer: attr('string'),
    dependentQuestionId: attr('number'),
    maxVal: attr('number', {
        defaultValue: null
    }),
    minVal: attr('number', {
        defaultValue: null
    }),
    order: attr('number'),
    path: attr('string'),
    questionGroupId: attr('number'),
    surveyId: attr('number'),
    metricId: attr('number'),
    text: attr('string'),
    tip: attr('string'),
    type: attr('string', {
        defaultValue: 'FREE_TEXT'
    })
});


FLOW.QuestionOption = Base.extend({
    question: DS.belongsTo('question'),
    order: attr('number'),
    questionId: attr('number'),
    text: attr('string')
});


FLOW.DeviceGroup = Base.extend({
    code: attr('string', {
        defaultValue: ''
    })
});

FLOW.Device = Base.extend({
    esn: attr('string', {
        defaultValue: ''
    }),
    phoneNumber: attr('string', {
        defaultValue: ''
    }),
    deviceIdentifier: attr('string', {
        defaultValue: ''
    }),
    gallatinSoftwareManifest: attr('string'),
    lastKnownLat: attr('number', {
        defaultValue: 0
    }),
    lastKnownLon: attr('number', {
        defaultValue: 0
    }),
    lastKnownAccuracy: attr('number', {
        defaultValue: 0
    }),
    lastPositionDate: attr('number', {
        defaultValue: ''
    }),
    deviceGroup: attr('string', {
        defaultValue: ''
    }),
    deviceGroupName: attr('string', {
        defaultValue: ''
    }),
    isSelected: false,
    combinedName: null
});

FLOW.SurveyAssignment = Base.extend({
    name: attr('string'),
    startDate: attr('number'),
    endDate: attr('number'),
    devices: attr('array'),
    surveys: attr('array'),
    language: attr('string')
});

FLOW.SurveyedLocale = Base.extend({
    description: attr('string', {
        defaultValue: ''
    }),
    latitude: attr('number'),
    longitude: attr('number'),
    typeMark: attr('string', {
        defaultValue: 'WATER_POINT'
    })
});

FLOW.SurveyInstance = Base.extend({
    approvedFlag: attr('string'),
    approximateLocationFlag: attr('string'),
    surveyId: attr('number'),
    collectionDate: attr('number'),
    surveyCode: attr('string'),
    submitterName: attr('string'),
    deviceIdentifier: attr('string')
});

FLOW.QuestionAnswer = Base.extend({
    value: attr('string'),
    type: attr('string'),
    oldValue: attr('string'),
    surveyId: attr('number'),
    collectionDate: attr('number'),
    surveyInstanceId: attr('number'),
    questionID: attr('string'),
    questionText: attr('string')
});

FLOW.SurveyQuestionSummary = Base.extend({
    response: attr('string'),
    count: attr('number'),
    questionId: attr('string')
});

FLOW.User = Base.extend({
    userName: attr('string'),
    emailAddress: attr('string'),
    admin: attr('boolean', {
        defaultValue: 0
    }),
    superAdmin: attr('boolean', {
        defaultValue: 0
    }),
    permissionList: attr('string', {
        defaultValue: null
    })
});

FLOW.UserConfig = Base.extend({
    group: attr('string'),
    name: attr('string'),
    value: attr('string'),
    userId: attr('number')
});

// this is called attribute in the dashboard, but metric in the backend, for historic reasons.
FLOW.Metric = Base.extend({
    organization: attr('string'),
    name: attr('string'),
    group: attr('string'),
    valueType: attr('string')
});

FLOW.Message = Base.extend({
    objectId: attr('number'),
    userName: attr('string'),
    objectTitle: attr('string'),
    actionAbout: attr('string'),
    shortMessage: attr('string')
});

FLOW.Action = Base.extend({});

FLOW.Translation = Base.extend({
    parentType: attr('string'),
    parentId: attr('string'),
    surveyId: attr('string'),
    text: attr('string'),
    langCode: attr('string')
});


FLOW.NotificationSubscription = Base.extend({
    notificationDestination: attr('string'),
    notificationOption: attr('string'),
    notificationMethod: attr('string'),
    notificationType: attr('string'),
    expiryDate: attr('number'),
    entityId: attr('number')
});
