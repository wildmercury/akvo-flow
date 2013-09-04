// Models
var attr = DS.attr,
    Base;

Base = FLOW.BaseModel = DS.Model.extend({
    createdDateTime: attr('date'),
    lastUpdateDateTime: attr('date')
});

FLOW.SurveyGroup = Base.extend({
    description: attr('string', {
        defaultValue: ''
    }),
    name: attr('string', {
        defaultValue: ''
    }),
    // the code field is used as name
    code: attr('string', {
        defaultValue: ''
    }),
    surveyCount: attr('number', {
        deaultValue: 0
    })
});


FLOW.PlacemarkDetail = Base.extend({
    placemarkId: attr('number'),
    collectionDate: attr('number'),
    questionText: attr('string'),
    metricName: attr('string'),
    stringValue: attr('string'),
    questionType: attr('string')
});

FLOW.Placemark = Base.extend({
    latitude: attr('number'),
    longitude: attr('number'),
    collectionDate: attr('number'),
    markType: attr('string', {
        defaultValue: 'WATER_POINT'
    })
});
