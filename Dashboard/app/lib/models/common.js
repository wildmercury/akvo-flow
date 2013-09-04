// Models

FLOW.BaseModel = DS.Model.extend({
    keyId: DS.attr('number')
});

FLOW.SurveyGroup = FLOW.BaseModel.extend({
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
    }),
    surveyCount: DS.attr('number', {
        deaultValue: 0
    })
});


FLOW.PlacemarkDetail = FLOW.BaseModel.extend({
    placemarkId: DS.attr('number'),
    collectionDate: DS.attr('number'),
    questionText: DS.attr('string'),
    metricName: DS.attr('string'),
    stringValue: DS.attr('string'),
    questionType: DS.attr('string')
});

FLOW.Placemark = FLOW.BaseModel.extend({
    latitude: DS.attr('number'),
    longitude: DS.attr('number'),
    collectionDate: DS.attr('number'),
    markType: DS.attr('string', {
        defaultValue: 'WATER_POINT'
    })
});
