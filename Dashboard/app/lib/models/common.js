var get = Em.get,
    set = Em.set,
    Evented = Em.Evented,
    RESTAdapter = DS.RESTAdapter;


// `FLOW.RESTAdapter` extends the default `DS.RESTAdapter` but also
// includes the Evented mixin to be able to trigger events
// The UI subscribes to this events (e.g. show/hide loading message)
// instead of manually coupling the data layer with the UI

FLOW.RESTAdapter = RESTAdapter.extend(Evented, {
    serializer: DS.RESTSerializer.extend({
        primaryKey: function (type) {
            return 'keyId';
        },
        keyForAttributeName: function (type, name) {
            return name;
        }
    }),

    // Triggering events on certain adapter actions

    ajax: function (url, type, hash) {
        this.trigger('ajax', type);
        return this._super(url, type, hash);
    },

    didCreateRecord: function (store, type, record, payload) {
        this._super.apply(this, arguments);
        this.trigger('didCreateRecord');
    },

    didCreateRecords: function (store, type, records, payload) {
        this._super.apply(this, arguments);
        this.trigger('didCreateRecords');
    },

    didSaveRecord: function (store, type, record, payload) {
        this._super.apply(this, arguments);
        this.trigger('didSaveRecord');
    },

    didUpdateRecord: function () {
        this._super.apply(this, arguments);
        this.trigger('didUpdateRecord');
    },

    didDeleteRecord: function () {
        this._super.apply(this, arguments);
        this.trigger('didDeleteRecord');
    },

    didSaveRecords: function (store, type, records, payload) {
        this._super(store, type, records, payload);
        this.trigger('didSaveRecords');
    },

    didUpdateRecords: function () {
        this._super.apply(this, arguments);
        this.trigger('didUpdateRecords');
    },

    didDeleteRecords: function () {
        this._super.apply(this, arguments);
        this.trigger('didDeleteRecords');
    },

    didFindRecord: function (store, type, payload, id) {
        this._super.apply(this, arguments);
        this.trigger('didFindRecord');
    },

    didFindAll: function (store, type, payload) {
        this._super.apply(this, arguments);
        this.trigger('didFindAll');
    },

    didFindQuery: function (store, type, payload, recordArray) {
        this._super.apply(this, arguments);
        this.trigger('didFindQuery');
    },

    didFindMany: function (store, type, payload) {
        this._super.apply(this, arguments);
        this.trigger('didFindMany');
    },

    didError: function (store, type, record) {
        this._super.apply(this, arguments);
        this.trigger('didError');
    }

});


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
