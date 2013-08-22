var get = Ember.get,
    fmt = Ember.String.fmt;

//`array` is used when dealing with surveyIds and deviceIds

DS.JSONTransforms.array = {
    deserialize: function (serialized) {
        return Ember.none(serialized) ? null : serialized;
    },

    serialize: function (deserialized) {
        return Ember.none(deserialized) ? null : deserialized;
    }
};
