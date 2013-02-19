/*jshint browser:true, jquery:true */
/*global Ember, FLOW */


FLOW.placemarkControl = Ember.ArrayController.create({
  content: null,
  countryCode: null,

  populate: function (country) {
    FLOW.countryControl.set('countryCode', country.get('iso'));
    this.set('content', FLOW.store.findAll(FLOW.Placemark));
  }

});


FLOW.placemarkDetailControl = Ember.ArrayController.create({
  content: null,
  selectedDetailImage: null,
  selectedPointCode: null,

  populate: function (placemarkId) {
    if(typeof placemarkId === 'undefined') {
      this.set('content', null);
    } else {
      this.set('content', FLOW.store.find(FLOW.PlacemarkDetail, {
        "placemarkId": placemarkId
      }));
    }
  }

});


FLOW.CountryControl = Ember.Object.extend({
  content: null,
  country: null,

  init: function() {
    this._super();
    if ( !Ember.isNone(FLOW.Env) && !Ember.isNone(FLOW.Env.countries) ) {
      this.set('content', this.getContent(FLOW.Env.countries));
    }
  },

  getContent: function (countries) {
    var countryList = [];

    countries.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    for (var i = 0; i < countries.length; i++) {
      if ( !Ember.isNone(countries[i].centroidLat) && !Ember.isNone(countries[i].centroidLon) ) {
        var zoom = 7; // default zoom level
        if (!Ember.isNone(countries[i].zoomLevel)) {
          zoom = countries[i].zoomLevel;
        }

        countryList.push(
          Ember.Object.create({
            label: countries[i].name,
            iso: countries[i].isoAlpha2Code,
            lat: countries[i].centroidLat,
            lon: countries[i].centroidLon,
            zoom: zoom
          })
        );
      }
    }
    return countryList;
  }

});

FLOW.countryControl = FLOW.CountryControl.create();