require(
  [
    'app',
    'emberData'
  ], function (FLOW, DS) {

    var host = "http://" + window.location.host;
    FLOW.store = DS.Store.create({
      revision: 11,
      adapter: DS.FLOWRESTAdapter.create({bulkCommit:false, namespace:"rest", url:host})
    });

    DS.JSONTransforms.array = {
      deserialize: function(serialized) {
        return Ember.isNone(serialized) ? null : serialized;
      },

      serialize: function(deserialized) {
        return Ember.isNone(deserialized) ? null : deserialized;
      }
    };
  }
);