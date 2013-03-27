
define('app', [
], function () {
  var App = Ember.Application.create({
    LOG_TRANSITIONS: true
  });
  window.FLOW = App;
  
  App.ready = function() {
    var i, len, permissionsList, loc;
    
    // UI strings
    loc = localStorage.getItem('locale');
    Ember.STRINGS = FLOW_STRINGS['STRINGS_' + (loc ? loc : 'en').toUpperCase()];

    // Environment vars
    FLOW.Env = Ember.Object.create({
      photo_url_root: FLOW_ENV.photo_url_root,
      countries: FLOW_ENV.countries
    });

    // Setup permissionLevels
    permissionsList = [];
    for (i = 0, len = FLOW_ENV.permissions.length; i < len; i++) {
      var label, tuple, value;

      tuple = {};
      label = FLOW.locale(FLOW_ENV.permissions[i].label);
      value = FLOW_ENV.permissions[i].value;

      tuple[label] = value;
      permissionsList.push(tuple);
    }
    FLOW.permissionLevelControl = Ember.ArrayController.create({content: Ember.A(permissionsList)});
    
    // FLOW.questionTypeControl.setupContent();
  };

  return App;
});
define('router/router', [
  'app'
], function(FLOW) {
  // ***********************************************//
  //                 Router
  // ***********************************************//


  FLOW.Router = Ember.Router.extend({
    enableLogging: true,
    loggedIn: false,
    location: 'none',
    //'hash'or 'none' for URLs
    root: Ember.Route.extend({
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

});
define('models/store_def', [
  'app',
  'emberData'
], function(FLOW, DS) {
  var host = "http://" + window.location.host;
  FLOW.store = DS.Store.create({
    revision: 10,
    adapter:DS.FLOWRESTAdapter.create({bulkCommit:false, namespace:"rest", url:host})
  });

  DS.JSONTransforms.array = {
    deserialize: function(serialized) {
      return Ember.none(serialized) ? null : serialized;
    },

    serialize: function(deserialized) {
      return Ember.none(deserialized) ? null : deserialized;
    }
  };

});
define("models/store_def-common", function(){});

define('models/models', [
  'app',
  // 'emberData',
  'models/store_def-common'
], function(FLOW) {
  // ***********************************************//
  //                 models and stores
  // ***********************************************//

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
    order: DS.attr('number'),
    description: DS.attr('string'),
    name: DS.attr('string'),
    path: DS.attr('string'),
    code: DS.attr('string'),
    surveyId: DS.attr('number')
  });


  FLOW.Question = FLOW.BaseModel.extend({
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
    didLoad: function(){
      var combinedName;
        if(Ember.empty(this.get('deviceIdentifier'))) {
            combinedName = "no identifer";
          } else {
            combinedName = this.get('deviceIdentifier');
          }
          this.set('combinedName', combinedName + " " + this.get('phoneNumber'));
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
    deviceGroupName: DS.attr('string',{
      defaultValue:''
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
    permissionList: DS.attr('string')
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


  FLOW.NotificationSubscription = FLOW.BaseModel.extend({
    notificationDestination: DS.attr('string'),
    notificationOption: DS.attr('string'),
    notificationMethod: DS.attr('string'),
    notificationType: DS.attr('string'),
    expiryDate: DS.attr('number'),
    entityId: DS.attr('number')
  });
  
});
define('models/FLOWrest-adapter-v2-common', [
  'app',
  // 'emberData',
  'models/models'
], function(FLOW) {
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
        return  url + '?country=' + FLOW.countryController.get('countryCode');
      }
      return url;
    },

    sideload: function (store, type, json, root) {
      var msg,status;
      this._super(store, type, json, root);
      // only change metaControl info if there is actual meta info in the server response
      if (Object.keys(this.extractMeta(json)).length !== 0) {
        FLOW.metaControl.set('since', this.extractMeta(json).since);
        FLOW.metaControl.set('num', this.extractMeta(json).num);
        if (type == 'FLOW.SurveyInstance') {
          FLOW.metaControl.set('numSILoaded', this.extractMeta(json).num);
        }
        msg = this.extractMeta(json).message;
        status = this.extractMeta(json).status;
        keyId = this.extractMeta(json).keyId;

        if (msg.indexOf('_') === 0) { // Response is a translatable message
          msg = Ember.String.loc(msg);
        }
        FLOW.metaControl.set('message', msg);
        FLOW.metaControl.set('status', status);
        FLOW.metaControl.set('keyId', keyId);
        FLOW.savingMessageControl.set('areLoadingBool', false);
        FLOW.savingMessageControl.set('areSavingBool', false);

        if (status === 'preflight-delete-question'){
          if (msg === 'can_delete'){
            // do deletion
            FLOW.questionControl.deleteQuestion(keyId);
          } else {
            FLOW.dialogControl.set('activeAction', 'ignore');
            FLOW.dialogControl.set('header', Ember.String.loc('_cannot_delete_question'));
            FLOW.dialogControl.set('message', Ember.String.loc('_cannot_delete_question_text'));
            FLOW.dialogControl.set('showCANCEL', false);
            FLOW.dialogControl.set('showDialog', true);
          }
          return;
        }

        if (status === 'preflight-delete-survey'){
          if (msg === 'can_delete'){
            // do deletion
            FLOW.surveyControl.deleteSurvey(keyId);
          } else {
            FLOW.dialogControl.set('activeAction', 'ignore');
            FLOW.dialogControl.set('header', Ember.String.loc('_cannot_delete_survey'));
            FLOW.dialogControl.set('message', Ember.String.loc('_cannot_delete_survey_text'));
            FLOW.dialogControl.set('showCANCEL', false);
            FLOW.dialogControl.set('showDialog', true);
          }
          return;
        }

        if (status === 'preflight-delete-surveygroup'){
          if (msg === 'can_delete'){
            // do deletion
            FLOW.surveyGroupControl.deleteSurveyGroup(keyId);
          } else {
            FLOW.dialogControl.set('activeAction', 'ignore');
            FLOW.dialogControl.set('header', Ember.String.loc('_cannot_delete_surveygroup'));
            FLOW.dialogControl.set('message', Ember.String.loc('_cannot_delete_surveygroup_text'));
            FLOW.dialogControl.set('showCANCEL', false);
            FLOW.dialogControl.set('showDialog', true);
          }
          return;
        }

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

});
define('core-common', [
  'app'
], function(FLOW) {
  FLOW.View = Ember.View.extend({
    onLanguageChange: function() {
      this.rerender();
    }.observes('FLOW.dashboardLanguageControl.dashboardLanguage')
  });
});


// // require('akvo-flow/templ-common');
// // Ember.LOG_BINDINGS = true;
// // Create the application
// window.FLOW = Ember.Application.create({
//   VERSION: '0.0.1'
// });

//  Generic FLOW view that also handles lanague rerenders
// FLOW.View = Ember.View.extend({
//   onLanguageChange: function() {
//     this.rerender();
//   }.observes('FLOW.dashboardLanguageControl.dashboardLanguage')
// });

define('controllers/permissions', [
  'app'
], function(FLOW) {
  FLOW.permControl = Ember.Controller.create({
    perms: [],

    init: function() {
      this._super();
      this.initPermissions();
      this.setUserPermissions();
      this.setCurrentPermissions();
    },

    initPermissions: function() {
      this.perms.push(Ember.Object.create({
        perm: 'createSurvey',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'editSurvey',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'uploadSurveyZipData',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'importDataReport',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'viewMessages',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'publishSurvey',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'mapData',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'setDataPrivacy',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'editRawData',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'deleteRawData',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'runReport',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'deleteSurvey',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'deleteSurveyGroup',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'addUser',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'editUser',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'deleteUser',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'approveSurvey',
        value: false
      }));
      this.perms.push(Ember.Object.create({
        perm: 'editEditorialContent',
        value: false
      }));
    },

    setUserPermissions: function() {
      var user = true;
      if(user === true) {
        this.perms.findProperty('perm', 'createSurvey').value = true;
        this.perms.findProperty('perm', 'editSurvey').value = true;
        this.perms.findProperty('perm', 'uploadSurveyZipData').value = true;
        this.perms.findProperty('perm', 'viewMessages').value = true;
        this.perms.findProperty('perm', 'publishSurvey').value = true;
        this.perms.findProperty('perm', 'mapData').value = true;
        this.perms.findProperty('perm', 'setDataPrivacy').value = true;
        this.perms.findProperty('perm', 'runReport').value = true;
      }

      if(user === true) {
        this.perms.findProperty('perm', 'createSurvey').value = true;
        this.perms.findProperty('perm', 'editSurvey').value = true;
        this.perms.findProperty('perm', 'uploadSurveyZipData').value = true;
        this.perms.findProperty('perm', 'importDataReport').value = true;
        this.perms.findProperty('perm', 'viewMessages').value = true;
        this.perms.findProperty('perm', 'publishSurvey').value = true;
        this.perms.findProperty('perm', 'mapData').value = true;
        this.perms.findProperty('perm', 'setDataPrivacy').value = true;
        this.perms.findProperty('perm', 'runReport').value = true;
        this.perms.findProperty('perm', 'editRawData').value = true;
        this.perms.findProperty('perm', 'deleteRawData').value = true;
        this.perms.findProperty('perm', 'approveSurvey').value = true;
      }

      if(user === true) {
        this.perms.findProperty('perm', 'createSurvey').value = true;
        this.perms.findProperty('perm', 'editSurvey').value = true;
        this.perms.findProperty('perm', 'uploadSurveyZipData').value = true;
        this.perms.findProperty('perm', 'importDataReport').value = true;
        this.perms.findProperty('perm', 'viewMessages').value = true;
        this.perms.findProperty('perm', 'publishSurvey').value = true;
        this.perms.findProperty('perm', 'mapData').value = true;
        this.perms.findProperty('perm', 'setDataPrivacy').value = true;
        this.perms.findProperty('perm', 'runReport').value = true;
        this.perms.findProperty('perm', 'editRawData').value = true;
        this.perms.findProperty('perm', 'deleteRawData').value = true;
        this.perms.findProperty('perm', 'approveSurvey').value = true;
        this.perms.findProperty('perm', 'deleteSurvey').value = true;
        this.perms.findProperty('perm', 'deleteSurveyGroup').value = true;
        this.perms.findProperty('perm', 'addUser').value = true;
        this.perms.findProperty('perm', 'editUser').value = true;
        this.perms.findProperty('perm', 'deleteUser').value = true;
      }

    },

    setCurrentPermissions: function() {
      this.perms.forEach(function(item) {
        //this.set(item.perm,item.value);
      });
    }
  });


  FLOW.dialogControl = Ember.Object.create({
    delSG: "delSG",
    delS: "delS",
    delQG: "delQG",
    delQ: "delQ",
    delUser: "delUser",
    delAttr: "delAttr",
    delAssignment: "delAssignment",
    delDeviceGroup: "delDeviceGroup",
    delSI: "delSI",
    delSI2: "delSI2",
    showDialog: false,
    message: null,
    header: null,
    activeView: null,
    activeAction: null,
    showOK: true,
    showCANCEL: true,

    confirm: function(event) {
      this.set('activeView', event.view);
      this.set('activeAction', event.context);
      this.set('showOK', true);
      this.set('showCANCEL', true);

      switch(this.get('activeAction')) {
      case "delSG":
          this.set('header', Ember.String.loc('_sg_delete_header'));
          this.set('message', Ember.String.loc('_this_cant_be_undo'));
          this.set('showDialog', true);
        break;

      case "delS":
        this.set('header', Ember.String.loc('_s_delete_header'));
        this.set('message', Ember.String.loc('_this_cant_be_undo'));
        this.set('showDialog', true);
        break;

      case "delQG":
        this.set('header', Ember.String.loc('_qg_delete_header'));
        this.set('message', Ember.String.loc('_this_cant_be_undo'));
        this.set('showDialog', true);
        break;

      case "delQ":
        this.set('header', Ember.String.loc('_q_delete_header'));
        this.set('message', Ember.String.loc('_this_cant_be_undo'));
        this.set('showDialog', true);
        break;

      case "delUser":
        this.set('header', Ember.String.loc('_are_you_sure_you_want_to_delete_this_user'));
        this.set('message', Ember.String.loc('_this_cant_be_undo'));
        this.set('showDialog', true);
        break;

      case "delAttr":
        this.set('header', Ember.String.loc('_attr_delete_header'));
        this.set('message', Ember.String.loc('_this_cant_be_undo'));
        this.set('showDialog', true);
        break;

      case "delAssignment":
        this.set('header', Ember.String.loc('_assignment_delete_header'));
        this.set('message', Ember.String.loc('_this_cant_be_undo'));
        this.set('showDialog', true);
        break;

      case "delDeviceGroup":
        this.set('header', Ember.String.loc('_device_group_delete_header'));
        this.set('message', Ember.String.loc('_this_cant_be_undo'));
        this.set('showDialog', true);
        break;

      case "delSI":
        this.set('header', Ember.String.loc('_delete_record_header'));
        this.set('message', Ember.String.loc('_are_you_sure_delete_this_data_record'));
        this.set('showDialog', true);
        break;

      case "delSI2":
        this.set('header', Ember.String.loc('_delete_record_header'));
        this.set('message', Ember.String.loc('_are_you_sure_delete_this_data_record'));
        this.set('showDialog', true);
        break;

      default:
      }
    },

    doOK: function(event) {
      this.set('header', null);
      this.set('message', null);
      this.set('showCANCEL', true);
      this.set('showDialog', false);
      var view = this.get('activeView');
      switch(this.get('activeAction')) {
      case "delSG":
        view.deleteSurveyGroup.apply(view, arguments);
        break;

      case "delS":
        view.deleteSurvey.apply(view, arguments);
        break;

      case "delQG":
        view.deleteQuestionGroup.apply(view, arguments);
        break;

      case "delQ":
        this.set('showDialog', false);
        view.deleteQuestion.apply(view, arguments);
        break;

      case "delUser":
        this.set('showDialog', false);
        view.deleteUser.apply(view, arguments);
        break;

      case "delAttr":
        this.set('showDialog', false);
        view.deleteAttribute.apply(view, arguments);
        break;

      case "delAssignment":
        this.set('showDialog', false);
        view.deleteSurveyAssignment.apply(view, arguments);
        break;

      case "delDeviceGroup":
        this.set('showDialog', false);
        view.deleteDeviceGroup.apply(view, arguments);
        break;

      case "delSI":
        this.set('showDialog', false);
        view.deleteSI.apply(view, arguments);
        break;

      case "delSI2":
        this.set('showDialog', false);
        view.deleteSI.apply(view, arguments);
        break;

      default:
      }
    },

    doCANCEL: function(event) {
      this.set('showDialog', false);
    }
  });

});
define('controllers/general-controllers-common', [
  'app'
], function(FLOW) {
  FLOW.dashboardLanguageControl = Ember.Object.create({
    dashboardLanguage: null,

    init: function() {
      var locale;

      this._super();
      locale = localStorage.locale;
      if(typeof locale === 'undefined') {
        this.set('dashboardLanguage', this.content.findProperty('value', 'en'));
      } else {
        this.set('dashboardLanguage', this.content.findProperty('value', locale));
      }
    },

    content: [
      Ember.Object.create({
        label: "English (Default)",
        value: "en"
      }), Ember.Object.create({
        label: "Español",
        value: "es"
      }), Ember.Object.create({
        label: "Français",
        value: "fr"
      })
    ],

    changeLanguage: function() {
      var locale;
      locale = this.dashboardLanguage.get("value");
      localStorage.locale = this.get('dashboardLanguage.value');

      if (locale === 'fr') {
        Ember.set('Ember.STRINGS', FLOW_STRINGS.STRINGS_FR);
      } else if (locale === 'es') {
        Ember.set('Ember.STRINGS', FLOW_STRINGS.STRINGS_ES);
      } else {
        Ember.set('Ember.STRINGS', FLOW_STRINGS.STRINGS_EN);
      }

      // if(locale === "fr") {
      //   Ember.STRINGS = Ember.STRINGS_FR;
      // } else if(locale === "es") {
      //   Ember.STRINGS = Ember.STRINGS_ES;
      // } else {
      //   Ember.STRINGS = Ember.STRINGS_EN;
      // }
    }.observes('this.dashboardLanguage')
  });


  FLOW.selectedControl = Ember.Controller.create({
    selectedSurveyGroup: null,
    selectedSurvey: null,
    selectedSurveys:[],
    selectedSurveyAllQuestions: null,
    selectedSurveyAssignment: null,
    dependentQuestion: null,
    selectedQuestionGroup: null,
    selectedQuestion: null,
    selectedOption: null,
    selectedDevice:null,
    selectedDevices:[],
    selectedDevicesPreview: [],
    selectedSurveysPreview: [],
    selectedForMoveQuestionGroup: null,
    selectedForCopyQuestionGroup: null,
    selectedForMoveQuestion: null,
    selectedForCopyQuestion: null,
    selectedCreateNewGroup: false,
    selectedSurveyOPTIONQuestions: null,
    radioOptions: "",

    // OptionQuestions:function (){
    //   console.log('optionquestions 1');
    // }.observes('this.selectedSurveyOPTIONQuestions'),

    // when selected survey changes, deselect selected surveys and question groups
    deselectSurveyGroupChildren: function() {
      FLOW.selectedControl.set('selectedSurvey', null);
      FLOW.selectedControl.set('selectedSurveyAllQuestions', null);
      FLOW.selectedControl.set('selectedQuestionGroup', null);
      FLOW.selectedControl.set('selectedQuestion', null);
    }.observes('this.selectedSurveyGroup'),

    deselectSurveyChildren: function() {
      FLOW.selectedControl.set('selectedQuestionGroup', null);
      FLOW.selectedControl.set('selectedQuestion', null);
    }.observes('this.selectedSurvey')
  });


  // used in user tab
  FLOW.editControl = Ember.Controller.create({
    newPermissionLevel: null,
    newUserName: null,
    newEmailAddress: null,
    editPermissionLevel: null,
    editUserName: null,
    editEmailAddress: null,
    editUserId: null,
    editAttributeName: null,
    editAttributeGroup: null,
    editAttributeType: null,
    editAttributeId: null
  });


  FLOW.tableColumnControl = Ember.Object.create({
    sortProperties: null,
    sortAscending: true,
    selected: null,
    content: null
  });


  // set by restadapter sideLoad meta
  FLOW.metaControl = Ember.Object.create({
    numSILoaded:null, // used by data tab nextPage method
    since: null,
    num: null,
    message: null,
    status: null
  }),


  // set by javacript datepickers in views.js
  FLOW.dateControl = Ember.Object.create({
    // filled by javacript datepicker defined in views.js and by inspect-data.handlebars
    // binding. This makes sure we can both pick a date with the datepicker, and enter
    // a date manually
    fromDate: null,
    toDate: null
  });


  FLOW.savingMessageControl = Ember.Object.create({
    areSavingBool: false,
    areLoadingBool: false,

    checkSaving: function() {
      if(FLOW.store.defaultTransaction.buckets.inflight.list.get('length') > 0) {
        this.set('areSavingBool', true);
      } else {
        this.set('areSavingBool', false);
      }
    }
  });

});
define('controllers/survey-controllers', [
  'app'
], function(FLOW) {
  FLOW.questionTypeControl = Ember.Object.create({
    content: [],

    setupContent: function () {
      this.set('content', [
        Ember.Object.create({
          label: Ember.String.loc('_free_text'),
          value: 'FREE_TEXT'
        }),
        Ember.Object.create({
          label: Ember.String.loc('_option'),
          value: 'OPTION'
        }),
        Ember.Object.create({
          label: Ember.String.loc('_number'),
          value: 'NUMBER'
        }),
        Ember.Object.create({
          label: Ember.String.loc('_gelocation'),
          value: 'GEO'
        }),
        Ember.Object.create({
          label: Ember.String.loc('_photo'),
          value: 'PHOTO'
        }),
        Ember.Object.create({
          label: Ember.String.loc('_video'),
          value: 'VIDEO'
        }),
        Ember.Object.create({
          label: Ember.String.loc('_date'),
          value: 'DATE'
        }),
        Ember.Object.create({
          label: Ember.String.loc('_barcode'),
          value: 'SCAN'
        })
      ]);
    }
  });

  //   content: [
  //     Ember.Object.create({
  //       label: Ember.String.loc('_free_text'),
  //       value: 'FREE_TEXT'
  //     }), Ember.Object.create({
  //       label: Ember.String.loc('_option'),
  //       value: 'OPTION'
  //     }), Ember.Object.create({
  //       label: Ember.String.loc('_number'),
  //       value: 'NUMBER'
  //     }), Ember.Object.create({
  //       label: Ember.String.loc('_gelocation'),
  //       value: 'GEO'
  //     }), Ember.Object.create({
  //       label: Ember.String.loc('_photo'),
  //       value: 'PHOTO'
  //     }), Ember.Object.create({
  //       label: Ember.String.loc('_video'),
  //       value: 'VIDEO'
  //     }), Ember.Object.create({
  //       label: Ember.String.loc('_date'),
  //       value: 'DATE'
  //     }), Ember.Object.create({
  //       label: Ember.String.loc('_barcode'),
  //       value: 'SCAN'
  //     })
  //   ]
  // });

  FLOW.notificationOptionControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "link",
        value: "LINK"
      }), Ember.Object.create({
        label: "attachment",
        value: "ATTACHMENT"
      })
    ]
  });

  FLOW.notificationTypeControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "email",
        value: "EMAIL"
      })
    ]
  });

  FLOW.notificationEventControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "Raw data reports (nightly)",
        value: "rawDataReport"
      }), Ember.Object.create({
        label: "Survey submission",
        value: "surveySubmission"
      }), Ember.Object.create({
        label: "Survey approval",
        value: "surveyApproval"
      })
    ]
  });

  FLOW.languageControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "English",
        value: "en"
      }), Ember.Object.create({
        label: "Español",
        value: "es"
      }), Ember.Object.create({
        label: "Français",
        value: "fr"
      })
    ]
  });

  FLOW.surveyPointTypeControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "Point",
        value: "Point"
      }), Ember.Object.create({
        label: "Household",
        value: "Household"
      }), Ember.Object.create({
        label: "Public institution",
        value: "PublicInstitution"
      })
    ]
  });

  FLOW.surveySectorTypeControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "Water and Sanitation",
        value: "WASH"
      }), Ember.Object.create({
        label: "Education",
        value: "EDUC"
      }), Ember.Object.create({
        label: "Economic development",
        value: "ECONDEV"
      }), Ember.Object.create({
        label: "Health care",
        value: "HEALTH"
      }), Ember.Object.create({
        label: "IT and Communication",
        value: "ICT"
      }), Ember.Object.create({
        label: "Food security",
        value: "FOODSEC"
      }), Ember.Object.create({
        label: "Other",
        value: "OTHER"
      })
    ]
  });


  FLOW.surveyGroupControl = Ember.ArrayController.create({
    sortProperties: ['code'],
    sortAscending: true,
    content: null,

    setFilteredContent: function() {
      this.set('content', FLOW.store.filter(FLOW.SurveyGroup, function(item) {
        return true;
      }));
    },

    // load all Survey Groups
    populate: function() {
      FLOW.store.find(FLOW.SurveyGroup);
      this.setFilteredContent();
    },

    // checks if data store contains surveys within this survey group.
    // this is also checked server side.
    containsSurveys: function() {
      var surveys, sgId;
      surveys = FLOW.store.filter(FLOW.Survey, function(data) {
        sgId = FLOW.selectedControl.selectedSurveyGroup.get('id');
        if(data.get('surveyGroupId') == sgId) {
          return true;
        }
      });
      return(surveys.get('content').length > 0);
    },

    deleteSurveyGroup: function(keyId){
      var surveyGroup;
      surveyGroup = FLOW.store.find(FLOW.SurveyGroup, keyId);
      surveyGroup.deleteRecord();
      FLOW.store.commit();
      FLOW.selectedControl.set('selectedSurveyGroup', null);
    }
  });


  FLOW.surveyControl = Ember.ArrayController.create({
    content: null,
    publishedContent: null,
    sortProperties: ['name'],
    sortAscending: true,

    setFilteredContent: function() {
      var sgId;
      if(FLOW.selectedControl.get('selectedSurveyGroup') && FLOW.selectedControl.selectedSurveyGroup.get('keyId') > 0) {
        sgId = FLOW.selectedControl.selectedSurveyGroup.get('keyId');
        this.set('content', FLOW.store.filter(FLOW.Survey, function(item) {
          return(item.get('surveyGroupId') == sgId);
        }));
      } else {
        this.set('content', null);
      }
    }.observes('FLOW.selectedControl.selectedSurveyGroup'),

    setPublishedContent: function() {
      var sgId;
      if(FLOW.selectedControl.get('selectedSurveyGroup') && FLOW.selectedControl.selectedSurveyGroup.get('keyId') > 0) {
        sgId = FLOW.selectedControl.selectedSurveyGroup.get('keyId');
        this.set('publishedContent', FLOW.store.filter(FLOW.Survey, function(item) {
          return (item.get('surveyGroupId') == sgId && item.get('status') == 'PUBLISHED');
        }));
      } else {
        this.set('publishedContent', null);
      }
    }.observes('FLOW.selectedControl.selectedSurveyGroup'),

    populate: function() {
      var id;
      if(FLOW.selectedControl.get('selectedSurveyGroup')) {
        id = FLOW.selectedControl.selectedSurveyGroup.get('keyId');
        // this content is actualy not used, the data ends up in the store
        // and is accessed through the filtered content above
        FLOW.store.findQuery(FLOW.Survey, {
          surveyGroupId: id
        });
      }
    }.observes('FLOW.selectedControl.selectedSurveyGroup'),

    publishSurvey: function() {
      var surveyId;
      surveyId = FLOW.selectedControl.selectedSurvey.get('keyId');
      FLOW.store.findQuery(FLOW.Action, {
        action: 'publishSurvey',
        surveyId: surveyId
      });
    },

    deleteSurvey: function(keyId){
      var survey;
      survey = FLOW.store.find(FLOW.Survey, keyId);
      survey.deleteRecord();
      FLOW.store.commit();
    }
  });


  FLOW.questionGroupControl = Ember.ArrayController.create({
    sortProperties: ['order'],
    sortAscending: true,
    content: null,

    setFilteredContent: function() {
      var sId;
      if(FLOW.selectedControl.get('selectedSurvey')) {
        if(!Ember.empty(FLOW.selectedControl.selectedSurvey.get('keyId'))) {
          sId = FLOW.selectedControl.selectedSurvey.get('keyId');
          this.set('content', FLOW.store.filter(FLOW.QuestionGroup, function(item) {
            return(item.get('surveyId') == sId);
          }));
        } else {
          // this happens when we have created a new survey, which has no id yet
          this.set('content', null);
        }
      }
    },

    populate: function() {
  	if(FLOW.selectedControl.get('selectedSurvey') && FLOW.selectedControl.selectedSurvey.get('keyId') > 0) {
        var id = FLOW.selectedControl.selectedSurvey.get('keyId');
        FLOW.store.findQuery(FLOW.QuestionGroup, {
          surveyId: id
        });
      }
      this.setFilteredContent();
    }.observes('FLOW.selectedControl.selectedSurvey'),

    // true if all items have been saved
    // used in models.js
    allRecordsSaved: function() {
      var allSaved = true;
      if(Ember.none(this.get('content'))) {
        return true;
      } else {
        this.get('content').forEach(function(item) {
          if(item.get('isSaving')) {
            allSaved = false;
          }
        });
        return allSaved;
      }
    }.property('content.@each.isSaving')
  });


  FLOW.questionControl = Ember.ArrayController.create({
    content: null,
    OPTIONcontent: null,
    earlierOptionQuestions: null,
    QGcontent: null,
    filterContent: null,
    sortProperties: ['order'],
    sortAscending: true,
    preflightQId:null,

    populateAllQuestions: function() {
      var sId;
      if(FLOW.selectedControl.get('selectedSurvey') && FLOW.selectedControl.selectedSurvey.get('keyId') > 0) {
        sId = FLOW.selectedControl.selectedSurvey.get('keyId');
        this.set('content', FLOW.store.findQuery(FLOW.Question, {
          surveyId: sId
        }));
      }
    }.observes('FLOW.selectedControl.selectedSurvey'),

    // used for surveyInstances in data edit popup
    doSurveyIdQuery: function(surveyId) {
      this.set('content', FLOW.store.findQuery(FLOW.Question, {
        surveyId: surveyId
      }));
    },

    deleteQuestion: function(questionId){
      qgId = this.content.get('questionGroupId');
      question = FLOW.store.find(FLOW.Question, questionId);
      qgId = question.get('questionGroupId');
      qOrder = question.get('order');
      question.deleteRecord();

      // restore order
      questionsInGroup = FLOW.store.filter(FLOW.Question, function(item) {
            return(item.get('questionGroupId') == qgId);
          });

      questionsInGroup.forEach(function(item) {
       if (item.get('order') > qOrder) {
         item.set('order',item.get('order') - 1);
       }
      });
      FLOW.store.commit();
    },

    allQuestionsFilter: function() {
      var sId;
      if(FLOW.selectedControl.get('selectedSurvey') && FLOW.selectedControl.selectedSurvey.get('keyId') > 0) {
        sId = FLOW.selectedControl.selectedSurvey.get('keyId');
        this.set('filterContent', FLOW.store.filter(FLOW.Question, function(item) {
          return(item.get('surveyId') == sId);
        }));
      } else {
        this.set('filterContent',null);
      }
    }.observes('FLOW.selectedControl.selectedSurvey'),

    setQGcontent: function() {
  	  var qId
      if(FLOW.selectedControl.get('selectedQuestionGroup') && FLOW.selectedControl.selectedSurvey.get('keyId') > 0) {
        var qId = FLOW.selectedControl.selectedQuestionGroup.get('keyId');
        this.set('content', FLOW.store.filter(FLOW.Question, function(item) {
      	  return(item.get('questionGroupId') == qId);
        }));
      }
    }.observes('FLOW.selectedControl.selectedQuestionGroup'),
     
    setOPTIONcontent: function() {
      var sId;
      if(FLOW.selectedControl.get('selectedSurvey')) {
        sId = FLOW.selectedControl.selectedSurvey.get('keyId');
        this.set('OPTIONcontent', FLOW.store.filter(FLOW.Question, function(item) {
          return(item.get('type') == 'OPTION' && item.get('surveyId') == sId);
        }));
      } else {
        this.set('OPTIONcontent', null);
      }
    }.observes('FLOW.selectedControl.selectedSurvey'),

    // used for display of dependencies: a question can only be dependent on earlier questions
    setEarlierOptionQuestions: function() {

      if(!Ember.none(FLOW.selectedControl.get('selectedQuestion')) && !Ember.none(FLOW.selectedControl.get('selectedQuestionGroup'))) {
        var optionQuestionList, sId, questionGroupOrder, qgOrder, qg, questionOrder;
        sId = FLOW.selectedControl.selectedSurvey.get('keyId');
        questionGroupOrder = FLOW.selectedControl.selectedQuestionGroup.get('order');
        questionOrder = FLOW.selectedControl.selectedQuestion.get('order');
        optionQuestionList = FLOW.store.filter(FLOW.Question, function(item) {
          qg = FLOW.store.find(FLOW.QuestionGroup, item.get('questionGroupId'));
          qgOrder = qg.get('order');
          if(!(item.get('type') == 'OPTION' && item.get('surveyId') == sId)) return false;
          if(qgOrder > questionGroupOrder) {return false;}
          if(qgOrder < questionGroupOrder) {return true;}
          // when we arrive there qgOrder = questionGroupOrder, so we have to check question order
          return (item.get('order') < questionOrder);
        });

        this.set('earlierOptionQuestions', optionQuestionList);
      }
    }.observes('FLOW.selectedControl.selectedQuestion'),



    // true if all items have been saved
    // used in models.js
    allRecordsSaved: function() {
      var allSaved = true;
      FLOW.questionControl.get('content').forEach(function(item) {
        if(item.get('isSaving')) {
          allSaved = false;
        }
      });
      return allSaved;
    }.property('content.@each.isSaving')
  });

  // TODO turn this into radio buttons
  FLOW.optionListControl = Ember.ArrayController.create({
    content: []
  });

  FLOW.previewControl = Ember.ArrayController.create({
    changed: false,
    showPreviewPopup: false,
    // associative array for answers in the preview
    answers: {}
  });


  FLOW.notificationControl = Ember.ArrayController.create({
    content: null,
    filterContent: null,
    sortProperties: ['notificationDestination'],
    sortAscending: true,

    populate: function() {
      console.log('populate');
      var id;
      if(FLOW.selectedControl.get('selectedSurvey')) {
        id = FLOW.selectedControl.selectedSurvey.get('keyId');
        FLOW.store.findQuery(FLOW.NotificationSubscription, {
          surveyId: id
        });
      }
    },

    doFilterContent: function() {
      var sId;
      if(FLOW.selectedControl.get('selectedSurvey') && FLOW.selectedControl.selectedSurvey.get('keyId') > 0) {
        sId = FLOW.selectedControl.selectedSurvey.get('keyId');
        this.set('content', FLOW.store.filter(FLOW.NotificationSubscription, function(item) {
          return(item.get('entityId') == sId);
        }));
      }
    }.observes('FLOW.selectedControl.selectedSurvey')

  });

});
define('controllers/device-controllers', [
  'app'
], function(FLOW) {

  FLOW.deviceGroupControl = Ember.ArrayController.create({
    content: null,
    contentNoUnassigned:null,

    filterDevices: function (){
      this.set('contentNoUnassigned',FLOW.store.filter(FLOW.DeviceGroup, function(item) {
            return (item.get('keyId') == 1) ? false : true;
          }));
    },

    populate: function() {
      var unassigned;

      // create a special record, which will to be saved to the datastore
      // to represent all devices unassigned to a device group.
      unassigned = FLOW.store.filter(FLOW.DeviceGroup, function(item) {
        return item.get('keyId') == 1;
      });
      if(unassigned.toArray().length === 0) {
        unassigned = FLOW.store.createRecord(FLOW.DeviceGroup, {
          code: 'all unassigned devices',
          keyId: 1
        });
        // prevent saving of this item to the backend
        unassigned.get('stateManager').send('becameClean');
      }
      this.set('content', FLOW.store.find(FLOW.DeviceGroup));
      this.filterDevices();
    }
  });

  FLOW.deviceControl = Ember.ArrayController.create({
    sortProperties: null,
    sortAscending: true,
    selected: null,
    content: null,

    populate: function() {
      this.set('content', FLOW.store.findQuery(FLOW.Device, {}));
      this.set('sortProperties', ['lastPositionDate']);
      this.set('sortAscending', false);
    },

    allAreSelected: function(key, value) {
      if(arguments.length === 2) {
        this.setEach('isSelected', value);
        return value;
      } else {
        return !this.get('isEmpty') && this.everyProperty('isSelected', true);
      }
    }.property('@each.isSelected'),

    atLeastOneSelected: function() {
      return this.filterProperty('isSelected', true).get('length');
    }.property('@each.isSelected'),

    // fired from tableColumnView.sort
    getSortInfo: function() {
      this.set('sortProperties', FLOW.tableColumnControl.get('sortProperties'));
      this.set('sortAscending', FLOW.tableColumnControl.get('sortAscending'));
    }
  });


  FLOW.devicesInGroupControl = Ember.ArrayController.create({
    content: null,
    sortProperties: ['phoneNumber'],
    sortAscending: true,
    setDevicesInGroup: function() {
      var deviceGroupId;
      if(FLOW.selectedControl.get('selectedDeviceGroup') && FLOW.selectedControl.selectedDeviceGroup.get('keyId') !== null) {
        deviceGroupId = FLOW.selectedControl.selectedDeviceGroup.get('keyId');

        // 1 means all unassigned devices
        if(deviceGroupId == 1) {
          this.set('content', FLOW.store.filter(FLOW.Device, function(item) {
            return(Ember.empty(item.get('deviceGroup')));
          }));
        } else {
          this.set('content', FLOW.store.filter(FLOW.Device, function(item) {
            return(parseInt(item.get('deviceGroup'), 10) == deviceGroupId);
          }));
        }
      }
    }.observes('FLOW.selectedControl.selectedDeviceGroup')
  });


  FLOW.surveyAssignmentControl = Ember.ArrayController.create({
    sortProperties: null,
    sortAscending: true,
    content: null,

    populate: function() {
      this.set('content', FLOW.store.find(FLOW.SurveyAssignment));
      this.set('sortProperties', ['name']);
      this.set('sortAscending', true);
    },

    getSortInfo: function() {
      this.set('sortProperties', FLOW.tableColumnControl.get('sortProperties'));
      this.set('sortAscending', FLOW.tableColumnControl.get('sortAscending'));
      this.set('selected', FLOW.tableColumnControl.get('selected'));
    }
  });
});
define('controllers/data-controllers', [
  'app'
], function(FLOW) {

  FLOW.attributeTypeControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "text",
        value: "String"
      }), Ember.Object.create({
        label: "number",
        value: "Double"
      })
    ]
  });

  FLOW.attributeControl = Ember.ArrayController.create({
    sortProperties: null,
    sortAscending: true,
    content: null,

    setFilteredContent: function() {
      this.set('content', FLOW.store.filter(FLOW.Metric, function(item) {
        return true;
      }));
    },

    // load all Survey Groups
    populate: function() {
      FLOW.store.find(FLOW.Metric);
      this.setFilteredContent();
      this.set('sortProperties', ['name']);
      this.set('sortAscending', true);
    },

    getSortInfo: function() {
      this.set('sortProperties', FLOW.tableColumnControl.get('sortProperties'));
      this.set('sortAscending', FLOW.tableColumnControl.get('sortAscending'));
    }
  });

  FLOW.surveyInstanceControl = Ember.ArrayController.create({
    sortProperties: ['collectionDate'],
    sortAscending: false,
    selectedSurvey: null,
    content: null,
    sinceArray: [],

    populate: function() {
      this.get('sinceArray').pushObject(FLOW.metaControl.get('since'));
      this.set('content', FLOW.store.findQuery(FLOW.SurveyInstance, {}));
    },

    doInstanceQuery: function(surveyId, deviceId, since, beginDate, endDate) {
      this.set('content', FLOW.store.findQuery(FLOW.SurveyInstance, {
        'surveyId': surveyId,
        'deviceId': deviceId,
        'since': since,
        'beginDate': beginDate,
        'endDate': endDate
      }));
    },

    allAreSelected: function(key, value) {
      if(arguments.length === 2) {
        this.setEach('isSelected', value);
        return value;
      } else {
        return !this.get('isEmpty') && this.everyProperty('isSelected', true);
      }
    }.property('@each.isSelected'),

    atLeastOneSelected: function() {
      return this.filterProperty('isSelected', true).get('length');
    }.property('@each.isSelected'),

    // fired from tableColumnView.sort
    getSortInfo: function() {
      this.set('sortProperties', FLOW.tableColumnControl.get('sortProperties'));
      this.set('sortAscending', FLOW.tableColumnControl.get('sortAscending'));
    }
  });


  FLOW.questionAnswerControl = Ember.ArrayController.create({
    content: null,

    doQuestionAnswerQuery: function(surveyInstanceId) {
      this.set('content', FLOW.store.findQuery(FLOW.QuestionAnswer, {
        'surveyInstanceId': surveyInstanceId
      }));
    }
  });

});
define('controllers/reports-controllers', [
  'app'
], function(FLOW) {
  FLOW.surveyQuestionSummaryControl = Ember.ArrayController.create({
    content: null,

    doSurveyQuestionSummaryQuery: function(questionId) {
      this.set('content', FLOW.store.find(FLOW.SurveyQuestionSummary, {
        'questionId': questionId
      }));
    }
  });

  FLOW.chartDataControl = Ember.Object.create({
    questionText: "",
    maxPer:null,
    chartData: [],
    smallerItems:[],
    total: null
  });

  FLOW.chartTypeControl = Ember.Object.create({
    content: [
      Ember.Object.create({
        label: "Doughnut chart",
        value: "doughnut"
      }), Ember.Object.create({
        label: "Vertical bar chart",
        value: "vbar"
      }),
      Ember.Object.create({
        label: "Horizontal bar chart",
        value: "hbar"
      })
    ]
  });

});
define('controllers/maps-controllers-common', [
  'app'
], function(FLOW) {

  FLOW.placemarkController = Ember.ArrayController.create({
    content: null,

    // We might be able to remove the buildURL in the REST adapter
    // and use this populate().
    // populate: function (country) {
    //   this.set('content', FLOW.store.findQuery(FLOW.Placemark,
    //     {country: country.get('iso')}));
    // }

    populate: function (country) {
      FLOW.countryController.set('countryCode', country.get('iso'));
      this.set('content', FLOW.store.findAll(FLOW.Placemark));
    }
  });


  FLOW.placemarkDetailController = Ember.ArrayController.create({
    content: Ember.A(),
    selectedPointCode: null,

    populate: function (placemark) {
      if (placemark && placemark.id) {
        this.set('content', FLOW.store.find(FLOW.PlacemarkDetail, {
          placemarkId: placemark.id
        }));
      } else {
        this.set('content', Ember.A());
      }
    },

    handlePlacemarkSelection: function() {
      var selected = FLOW.placemarkController.get('selected');

      this.populate(selected);
    }.observes('FLOW.placemarkController.selected'),

    photoUrl: function() {
      var photoDetails, photoUrl, rawPhotoUrl;


      if(!this.get('content').get('isLoaded')) {
        return null;
      }

      // filter out details with images
      photoDetails = this.get('content').filter(function (detail) {
        return detail.get('questionType') === 'PHOTO';
      });

      if(Ember.empty(photoDetails)) {
        return null;
      }

      // We only care for the first image
      rawPhotoUrl = photoDetails[0].get('stringValue');
      // Since photos have a leading path from devices that we need to trim
      photoUrl = FLOW.Env.photo_url_root + rawPhotoUrl.split('/').pop();

      return photoUrl;
    }.property('content.isLoaded')

  });

  FLOW.placemarkDetailPhotoController = Ember.ObjectController.create({
    photo: null
  });


  FLOW.countryController = Ember.ArrayController.create({
    content: [],
    country: null,
    countryCode: null,

    init: function() {
      this._super();
      if ( !Ember.none(FLOW.Env) && !Ember.none(FLOW.Env.countries) ) {
        this.set('content', this.getContent(FLOW.Env.countries));
      }
    },


    /**

    */
    handleCountrySelection: function () {
      FLOW.placemarkController.populate(this.country);
    }.observes('this.country'),


    getContent: function (countries) {
      var countryList = [];

      countries.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      for (var i = 0; i < countries.length; i++) {
        if ( !Ember.none(countries[i].centroidLat) && !Ember.none(countries[i].centroidLon) ) {
          var zoom = 7; // default zoom level
          if (!Ember.none(countries[i].zoomLevel)) {
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

});
define('controllers/messages-controllers', [
  'app'
], function(FLOW) {
  FLOW.messageControl = Ember.ArrayController.create({
    sortProperties: null,
    sortAscending: true,
    content: null,
    sinceArray: [],

    populate: function() {
      this.get('sinceArray').clear();
      FLOW.metaControl.set('since', null);
      // put null in as the first item
      this.get('sinceArray').pushObject(FLOW.metaControl.get('since'));
      this.set('content', FLOW.store.findQuery(FLOW.Message,{
        'since':null
      }));
      this.set('sortProperties', ['lastUpdateDateTime']);
      this.set('sortAscending', false);
    },

    doInstanceQuery: function(since) {
      this.set('content', FLOW.store.findQuery(FLOW.Message, {
        'since': since
      }));
    },

    getSortInfo: function() {
      this.set('sortProperties', FLOW.tableColumnControl.get('sortProperties'));
      this.set('sortAscending', FLOW.tableColumnControl.get('sortAscending'));
      this.set('selected', FLOW.tableColumnControl.get('selected'));
    }
  });

});
define('controllers/user-controllers', [
  'app'
], function(FLOW) {
  FLOW.userControl = Ember.ArrayController.create({
    sortProperties: null,
    sortAscending: true,
    content: null,

    setFilteredContent: function() {
      this.set('content', FLOW.store.filter(FLOW.User, function(item) {
        return true;
      }));
    },

    // load all Survey Groups
    populate: function() {
      FLOW.store.find(FLOW.User);
      this.setFilteredContent();
      this.set('sortProperties', ['userName']);
      this.set('sortAscending', true);
    },

    getSortInfo: function() {
      this.set('sortProperties', FLOW.tableColumnControl.get('sortProperties'));
      this.set('sortAscending', FLOW.tableColumnControl.get('sortAscending'));
      this.set('selected', FLOW.tableColumnControl.get('selected'));
    }
  });

});
define('controllers/controllers', [
  'app',
  'core-common',
  // 'flowenv',
  'controllers/permissions',
  'controllers/general-controllers-common',
  'controllers/survey-controllers',
  'controllers/device-controllers',
  'controllers/data-controllers',
  'controllers/reports-controllers',
  'controllers/maps-controllers-common',
  'controllers/messages-controllers',
  'controllers/user-controllers'
], function(FLOW) { 


  // ***********************************************//
  //                 controllers
  // ***********************************************//
  // Define the main application controller. This is automatically picked up by
  // the application and initialized.
  
  FLOW.ApplicationController = Ember.Controller.extend({
    init: function() {
      this._super();
      // Ember.STRINGS = Ember.STRINGS_EN;
      // Ember.STRINGS = FLOW_STRINGS.STRINGS_EN;
    }
  });

  //require('akvo-flow/currentuser');

  // Navigation controllers
  FLOW.NavigationController = Ember.Controller.extend({
    selected: null
  });
  FLOW.NavHomeController = Ember.Controller.extend();
  FLOW.NavSurveysController = Ember.Controller.extend();
  FLOW.NavSurveysEditController = Ember.Controller.extend();
  FLOW.NavDevicesController = Ember.Controller.extend();
  FLOW.DevicesSubnavController = Ember.Controller.extend();
  FLOW.DevicesTableHeaderController = Ember.Controller.extend({
    selected: null
  });

  FLOW.NavDataController = Ember.Controller.extend();
  FLOW.DatasubnavController = Ember.Controller.extend();
  FLOW.InspectDataController = Ember.ArrayController.extend();
  FLOW.BulkUploadController = Ember.Controller.extend();
  FLOW.DataCleaningController = Ember.Controller.extend();

  FLOW.NavReportsController = Ember.Controller.extend();
  FLOW.ReportsSubnavController = Ember.Controller.extend();
  FLOW.ExportReportsController = Ember.ArrayController.extend();
  FLOW.ChartReportsController = Ember.Controller.extend();

  FLOW.NavMapsController = Ember.Controller.extend();
  FLOW.NavUsersController = Ember.Controller.extend();
  FLOW.NavMessagesController = Ember.Controller.extend();
  FLOW.NavAdminController = Ember.Controller.extend();

});

define('templates', ['app'], function() {
Ember.TEMPLATES["application/application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<div class=\"isSaving\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_saving", options) : helperMissing.call(depth0, "t", "_saving", options))));
  data.buffer.push("</div>\n			");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n			  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.savingMessageControl.areLoadingBool", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<div class=\"isLoading\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_loading", options) : helperMissing.call(depth0, "t", "_loading", options))));
  data.buffer.push("</div>\n			  ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doOK", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCANCEL", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>");
  return buffer;
  }

  data.buffer.push("  <header class=\"floats-in top\" id=\"header\" role=\"banner\">\n        <div>\n            <hgroup>\n                <h1>Akvo\n                    <abbr title=\"field level operations watch\">Flow</abbr></h1>\n            </hgroup>\n            <nav id=\"topnav\" role=\"navigation\">\n                ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.NavigationView", {hash:{
    'controllerBinding': ("controller.controllers.navigationController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </nav>\n    		<div class=\"loadSave\">\n					");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.savingMessageControl.areSavingBool", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n            ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.HeaderView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            \n        </div>\n    </header>\n    <div id=\"pageWrap\">\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  \n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("FLOW.dialogControl.showDialog:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.dialogControl.header", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.dialogControl.message", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n          <br/><br/>\n          <div class=\"buttons menuCentre\"> \n            <ul>  \n              ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.dialogControl.showOK", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n               ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.dialogControl.showCANCEL", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n   ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.FooterView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES["application/footer"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(" <footer class=\"floats-in bottomPage\" role=\"contentinfo\">\n    <div>\n	  <nav id=\"footerNav\" class=\"floats-in\">\n		<ul>\n			<li><a href=\"http://www.akvo.org/blog/?cat=30\" title=\"Go to News and Software Updates\" target=\"_blank\" > ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_news_and_software_updates", options) : helperMissing.call(depth0, "t", "_news_and_software_updates", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://flowhelp.akvo.org\" title=\"Support\" target=\"_blank\" > ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_support", options) : helperMissing.call(depth0, "t", "_support", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://flow.readthedocs.org/en/latest/index.html\" title=\"Documentation and User Guides\" target=\"_blank\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_documentation_and_user_guides", options) : helperMissing.call(depth0, "t", "_documentation_and_user_guides", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://www.akvo.org/web/terms_of_use \" title=\"Terms of Service\" target=\"_blank\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_terms_of_service", options) : helperMissing.call(depth0, "t", "_terms_of_service", options))));
  data.buffer.push("</a></li>\n			<li><a href=\"http://www.akvo.org\" title=\"akvo.org\" target=\"_blank\" class=\"akvoDotOrg\">akvo.org</a></li>\n      <li><a href=\"/admin/logout.html\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_log_out", options) : helperMissing.call(depth0, "t", "_log_out", options))));
  data.buffer.push("</a></li>\n		</ul>\n	</nav>  \n  </div>\n  <div><small>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copyright", options) : helperMissing.call(depth0, "t", "_copyright", options))));
  data.buffer.push(" &copy; 2013 akvo.org</small></div>\n  <p id=\"back-top\"> <a href=\"#header\"><span></span>Back to Top</a> </p>\n</footer>\n");
  return buffer;
  
});

Ember.TEMPLATES["application/header-common"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<form>\n   <label class=\"languageSelector\"><span class=\"labelText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_dashboard_language", options) : helperMissing.call(depth0, "t", "_dashboard_language", options))));
  data.buffer.push(":</span> ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.dashboardLanguageControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("FLOW.dashboardLanguageControl.dashboardLanguage")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n   </label>\n</form>\n<section id=\"userLog\">\n  <ul>\n    <li class=\"userLogin\"><a href=\"#\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_login", options) : helperMissing.call(depth0, "t", "_login", options))));
  data.buffer.push("</a></li>\n    <li class=\"userRegister\"><a href=\"#\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_register", options) : helperMissing.call(depth0, "t", "_register", options))));
  data.buffer.push("</a></li>\n  </ul>\n  <ul>\n    <li></li>\n    <li></li>\n  </ul>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["application/navigation"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavSurveys", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_surveys", options) : helperMissing.call(depth0, "t", "_surveys", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavDevices", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_devices", options) : helperMissing.call(depth0, "t", "_devices", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavData", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_data", options) : helperMissing.call(depth0, "t", "_data", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavReports", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_reports", options) : helperMissing.call(depth0, "t", "_reports", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavMaps", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_maps", options) : helperMissing.call(depth0, "t", "_maps", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavUsers", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_users", options) : helperMissing.call(depth0, "t", "_users", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNavMessages", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_messages", options) : helperMissing.call(depth0, "t", "_messages", options))));
  data.buffer.push("</a>\n  ");
  return buffer;
  }

  data.buffer.push("<ul class=\"floats-in\">\n 	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navSurveys")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navDevices")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navData")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navReports")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n 	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navMaps")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n	");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navUsers")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n  ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("navMessages")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["navAdmin/nav-admin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["navData/applets/bulk-import-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataImportAppletImpl\"\n	archive=\"../exporterapplet.jar,../gdata-core-1.0.jar\">\n	<param name=\"importType\" value=\"BULK_SURVEY\">\n	<param name=\"selectionMode\" value=\"dir\">\n	<param name=\"java_arguments\" value=\"-Xmx1024m\">\n	<param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navData/applets/raw-data-import-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataImportAppletImpl\"\n	archive=\"../exporterapplet.jar,../json.jar,../jcommon-1.0.16.jar,../jfreechart-1.0.13.jar,../poi-3.8-20120326.jar,../poi-ooxml-3.8-20120326.jar,../poi-ooxml-schemas-3.8-20120326.jar,../xbean.jar,../dom4j-1.6.1.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\"\n		value=\"exporterapplet.jar,json.jar,poi-3.5-signed.jar\">\n	<param name=\"cache-version\" value=\"1.3,1.0,3.5\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n	<param name=\"java_arguments\" value=\"-Xmx512m\">\n	<param name=\"importType\" value=\"RAW_DATA\">\n	<param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n	<param name=\"criteria\" value=\"k:=test;surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navData/bulk-upload"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n       \n <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push("</h1>\n\n  <div class=\"bulkUpload block\">    \n    <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push("</h3>\n    <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_upload_applet_text_", options) : helperMissing.call(depth0, "t", "_upload_applet_text_", options))));
  data.buffer.push("</p>\n    <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showBulkUploadApplet", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push(" </a>\n  </div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showBulkUploadAppletBool", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.bulkImportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth\" id=\"reportBlocks\">\n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.BulkUploadAppletView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navData/data-cleaning"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n    <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_data_cleaning", options) : helperMissing.call(depth0, "t", "_data_cleaning", options))));
  data.buffer.push("</h1>\n\n    ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n    ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n    <div class=\"rawDataReport block\">\n      <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_raw_data_report", options) : helperMissing.call(depth0, "t", "_export_raw_data_report", options))));
  data.buffer.push("</h3>\n      <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report_applet_text_", options) : helperMissing.call(depth0, "t", "_raw_data_report_applet_text_", options))));
  data.buffer.push("</p>\n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRawDataReport", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report", options) : helperMissing.call(depth0, "t", "_raw_data_report", options))));
  data.buffer.push(" </a>\n    </div>\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showRawDataReportApplet", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n\n    <div class=\"rawDataReport block\">\n      <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_import_cleaned_survey_data", options) : helperMissing.call(depth0, "t", "_import_cleaned_survey_data", options))));
  data.buffer.push("</h3>\n      <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_import_raw_data_applet_text_", options) : helperMissing.call(depth0, "t", "_import_raw_data_applet_text_", options))));
  data.buffer.push("</p>\n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showImportApplet", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_import_clean_data", options) : helperMissing.call(depth0, "t", "_import_clean_data", options))));
  data.buffer.push(" </a>\n    </div>\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showRawDataImportApplet", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n      ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.rawDataReportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n       ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.rawDataImportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth\" id=\"reportBlocks\">\n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.ExportReportsAppletView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["navData/data-subnav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInspectData", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_inspect_data", options) : helperMissing.call(depth0, "t", "_inspect_data", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doManageAttributes", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_attributes", options) : helperMissing.call(depth0, "t", "_manage_attributes", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doBulkUpload", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_bulk_upload_data", options) : helperMissing.call(depth0, "t", "_bulk_upload_data", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doDataCleaning", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_data_cleaning", options) : helperMissing.call(depth0, "t", "_data_cleaning", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

  data.buffer.push("<ul>\n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("inspectData")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("manageAttributes")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("bulkUpload")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("dataCleaning")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["navData/inspect-data"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <section class=\"fullWidth\" id=\"inspectData\">\n    <div class=\"floats-in\" id=\"dataFilter\">\n      <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_choose_survey_data_to_display", options) : helperMissing.call(depth0, "t", "_choose_survey_data_to_display", options))));
  data.buffer.push(":</h1>\n      <div class=\"chooseSurveyData\">\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n			<div class=\"dataCollectedDate\">\n        <label class=\"collectedFrom\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_collected_from", options) : helperMissing.call(depth0, "t", "_collected_from", options))));
  data.buffer.push(":\n          ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.fromDate"),
    'elementId': ("from_date"),
    'placeholder': ("Collected from"),
    'placeholderBinding': ("Ember.STRINGS._collected_from"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </label>\n\n        <label class=\"collectedTo\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to", options) : helperMissing.call(depth0, "t", "_to", options))));
  data.buffer.push(":\n          ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.toDate"),
    'elementId': ("to_date"),
    'placeholder': ("To"),
    'placeholderBinding': ("Ember.STRINGS._to"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </label>\n			</div>\n			<div class=\"dataDeviceId\">\n        <label  class=\"devideId\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_id", options) : helperMissing.call(depth0, "t", "_device_id", options))));
  data.buffer.push(":</label> \n        ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.deviceId"),
    'placeholder': (""),
    'placeholderBinding': ("Ember.STRINGS._device_id"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n        <label class=\"submitterName\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_submitter_name", options) : helperMissing.call(depth0, "t", "_submitter_name", options))));
  data.buffer.push(":</label> \n        ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.submitterName"),
    'placeholder': (""),
    'placeholderBinding': ("Ember.STRINGS._submitter_name"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doFindSurveyInstances", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"findData\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_find", options) : helperMissing.call(depth0, "t", "_find", options))));
  data.buffer.push("</a>\n    </div>\n    <section class=\"fullWidth \" id=\"devicesList\">\n      <table class=\"dataTable\" id=\"surveyDataTable\">\n        <thead>\n          <tr>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id", options) : helperMissing.call(depth0, "t", "_id", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_submitter", options) : helperMissing.call(depth0, "t", "_submitter", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device", options) : helperMissing.call(depth0, "t", "_device", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_collected", options) : helperMissing.call(depth0, "t", "_collected", options))));
  data.buffer.push("</th>\n              <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_action", options) : helperMissing.call(depth0, "t", "_action", options))));
  data.buffer.push("</th>\n          </tr>\n        </thead>\n        <tbody>\n          ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "SI", "in", "FLOW.surveyInstanceControl", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </tbody>\n        <tfoot>\n          <tr>\n            <td colspan=\"7\"><small>This is the footer.</small></td>\n          </tr>\n        </tfoot>\n      </table>\n      <ul class=\"prevNext\">\n        <li class=\"prevBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasPrevPage", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </li>\n        <li class=\"nextBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasNextPage", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </li>\n      </ul>\n    </section>\n\n    <!-- edit surveyInstance popup-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showEditSurveyInstanceWindowBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanketWide\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialogWide\">\n		     <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCloseEditSIWindow", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok clodeDialog\">close window</a>\n\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_answers", options) : helperMissing.call(depth0, "t", "_edit_answers", options))));
  data.buffer.push("</h2>\n            <nav class=\"editAnswerMenu\"> \n            <ul>  \n              <li class=\"prevBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPreviousSI", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">&lsaquo; ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_previous_record", options) : helperMissing.call(depth0, "t", "_previous_record", options))));
  data.buffer.push("</a></li>\n              <li class=\"deleteBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delSI", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a></li>\n             <!--  <li class=\"saveBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSaveSI", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li> -->\n              <li class=\"nextBtn\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNextSI", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_next_record", options) : helperMissing.call(depth0, "t", "_next_record", options))));
  data.buffer.push(" &rsaquo;</a></li>\n            </ul>\n          </nav>\n        <p>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.siString", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n\n <table class=\"dataTable\" id=\"surveyDataTable\">\n            <!-- TABLE HEADER-->\n            <thead>\n                <tr>\n                    <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id", options) : helperMissing.call(depth0, "t", "_id", options))));
  data.buffer.push("</th>\n                    <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question", options) : helperMissing.call(depth0, "t", "_question", options))));
  data.buffer.push("</th>\n                    <th class=\"noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_answer", options) : helperMissing.call(depth0, "t", "_answer", options))));
  data.buffer.push("</th>                \n                </tr>\n            </thead>\n            <!-- TABLE BODY: MAIN CONTENT-->\n            <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "QA", "in", "FLOW.questionAnswerControl", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </tbody>\n            <!-- TABLE FOOTER-->\n            <tfoot>\n                <tr>\n                    <td colspan=\"7\"><small>This is the footer.</small></td>\n                </tr>\n            </tfoot>\n        </table>\n\n        </div>\n      </div>\n    </div>\n\n</section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n            ");
  hashTypes = {};
  stack1 = helpers.unless.call(depth0, "SI.isDeleted", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n            <tr>\n              <td class=\"device\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"survey\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.surveyCode", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"submitter\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.submitterName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"device\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "SI.deviceIdentifier", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"collected\">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "SI", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n              <td class=\"action\">\n                <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showEditSurveyInstanceWindow", "SI", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("\n                </a>\n                ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.DataItemView", {hash:{
    'contentBinding': ("SI")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </td>\n            </tr>\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date1),stack1 ? stack1.call(depth0, "collectionDate", options) : helperMissing.call(depth0, "date1", "collectionDate", options))));
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delSI2", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" >\n                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("\n                </a>");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPrevPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> &lsaquo; ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_previous", options) : helperMissing.call(depth0, "t", "_previous", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNextPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_next", options) : helperMissing.call(depth0, "t", "_next", options))));
  data.buffer.push(" &rsaquo;</a>");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                  ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.QuestionAnswerView", {hash:{
    'contentBinding': ("QA")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                    <tr>\n                      <td class=\"device\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                      <td class=\"survey\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.questionText", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    \n                    <td class=\"submitter\" style=\"text-align:left;\">\n                    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.inEditMode", {hash:{},inverse:self.program(29, program29, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </td>\n                    </tr>\n                    ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isOptionType", {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSave", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a> <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a>\n                    ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("view.optionsList"),
    'optionLabelPath': ("content.value"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.optionChoice")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isNumberType", {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                            ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.numberValue"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                          ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                            ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isTextType", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                          ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                              ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.value"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                              ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isDateType", {hash:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                                ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField2", {hash:{
    'valueBinding': ("view.date"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              ");
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                                ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isBarcodeType", {hash:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                              ");
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_barcode_app_on_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_barcode_app_on_the_device_is_used_here", options))));
  data.buffer.push("\n                                  ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.value"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isNotEditable", {hash:{},inverse:self.program(35, program35, data),fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isPhotoType", {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      ");
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  <a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.photoUrl")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" target=\"_blank\">Open photo</a> \n                        ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isDateType", {hash:{},inverse:self.program(39, program39, data),fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      ");
  return buffer;
  }
function program36(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "QA", {hash:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n                        ");
  return buffer;
  }
function program37(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "value", options) : helperMissing.call(depth0, "date3", "value", options))));
  }

function program39(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QA.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                        ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.inspectDataTableView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navData/manage-attributes"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddAttributeDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn btnAboveTable\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_attribute", options) : helperMissing.call(depth0, "t", "_add_new_attribute", options))));
  data.buffer.push("</a>\n        <table class=\"dataTable\" id=\"attributeDataTable\">\n            <!-- TABLE HEADER-->\n            <thead>\n                <tr>\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("keyId"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("name"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("group"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("valueType"),
    'type': ("attribute")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                 <th class=\"action noArrows\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_action", options) : helperMissing.call(depth0, "t", "_action", options))));
  data.buffer.push("</th>\n                </tr>\n            </thead>\n            <!-- TABLE BODY: MAIN CONTENT-->\n            <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "attribute", "in", "FLOW.attributeControl", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </tbody>\n            <!-- TABLE FOOTER-->\n            <tfoot>\n                <tr>\n                    <td colspan=\"7\"><small>This is the footer.</small></td>\n                </tr>\n            </tfoot>\n        </table>\n\n <!-- add attribute dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddAttributeDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_attribute", options) : helperMissing.call(depth0, "t", "_add_new_attribute", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_provide_a_name_", options) : helperMissing.call(depth0, "t", "_please_provide_a_name_", options))));
  data.buffer.push("</p>\n          <br/>\n         <label for=\"newAttributeName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_attribute_name", options) : helperMissing.call(depth0, "t", "_attribute_name", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeName"),
    'id': ("newAttributeName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         <label for=\"newAttributeGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_tag", options) : helperMissing.call(depth0, "t", "_tag", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeGroup"),
    'id': ("newAttributeGroup"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_value_type", options) : helperMissing.call(depth0, "t", "_value_type", options))));
  data.buffer.push(":</label>\n             ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeTypeControl.content"),
    'selectionBinding': ("view.newAttributeType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_value_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  <!-- edit existing attribute dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showEditAttributeDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_attribute", options) : helperMissing.call(depth0, "t", "_edit_attribute", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_edit_the_attribute_name_", options) : helperMissing.call(depth0, "t", "_please_edit_the_attribute_name_", options))));
  data.buffer.push(".</p>\n          <label for=\"editAttributeName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_attribute_name", options) : helperMissing.call(depth0, "t", "_attribute_name", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editAttributeName"),
    'id': ("editUserName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"editAttributeGroup\">Tag:</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editAttributeGroup"),
    'id': ("editEmail"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_value_type", options) : helperMissing.call(depth0, "t", "_value_type", options))));
  data.buffer.push(":</label>\n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeTypeControl.content"),
    'selectionBinding': ("FLOW.editControl.editAttributeType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_attribute_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEditAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id", options) : helperMissing.call(depth0, "t", "_id", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_attribute_name", options) : helperMissing.call(depth0, "t", "_attribute_name", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_tag", options) : helperMissing.call(depth0, "t", "_tag", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_value_type", options) : helperMissing.call(depth0, "t", "_value_type", options))));
  data.buffer.push("</a>\n                ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                   <tr>\n                    <td class=\"name\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "attribute.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    <td class=\"name\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "attribute.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    <td class=\"group\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "attribute.group", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                    <td class=\"valueType\" >");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "attribute", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n\n                    <td class=\"action\">\n                      ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.AttributeView", {hash:{
    'contentBinding': ("attribute")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showEditAttributeDialog", "attribute", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"edit\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a> </td>\n                  </tr>\n                ");
  return buffer;
  }
function program11(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.toAttributeType),stack1 ? stack1.call(depth0, "valueType", options) : helperMissing.call(depth0, "toAttributeType", "valueType", options))));
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delAttr", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth\" id=\"manageAttributes\">\n");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.ManageAttributesTableView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </section>");
  return buffer;
  
});

Ember.TEMPLATES["navData/nav-data"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"dataSection floats-in\" id=\"main\" role=\"main\">\n  <div id=\"tabs\">\n    <nav class=\"tabNav floats-in\">\n      ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DatasubnavView", {hash:{
    'controllerBinding': ("controller.controllers.datasubnavController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </nav>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/assignment-edit-tab/assignment-edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<section class=\"fullWidth\" id=\"assignSurveys\">\n  <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_assignment", options) : helperMissing.call(depth0, "t", "_edit_assignment", options))));
  data.buffer.push("</h1>\n     <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditSurveyAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"stepBack\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_go_back_to_assignment_list", options) : helperMissing.call(depth0, "t", "_go_back_to_assignment_list", options))));
  data.buffer.push("</a>\n    <form>\n      <fieldset id=\"assignmentDetails\">\n        <h2>01. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_assignment_details", options) : helperMissing.call(depth0, "t", "_assignment_details", options))));
  data.buffer.push("</h2>\n        <label for=\"assignmentName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_assignment_name", options) : helperMissing.call(depth0, "t", "_assignment_name", options))));
  data.buffer.push(":</label>\n          ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'placeholder': "STRING",'placeholderBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.assignmentName"),
    'id': ("assignmentName"),
    'placeholder': (""),
    'placeholderBinding': ("Ember.STRINGS._enter_a_name_for_this_assignment"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n        <div class=\"dateRange\">\n          <div class=\"activeDate\">\n            <label for=\"startDate\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_start_date", options) : helperMissing.call(depth0, "t", "_start_date", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'size': "INTEGER",'class': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.fromDate"),
    'elementId': ("from_date"),
    'size': (30),
    'class': ("datePicker")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n          </div>\n          <div class=\"expireDate\">\n            <label for=\"expireDate\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_expiration_date", options) : helperMissing.call(depth0, "t", "_expiration_date", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'valueBinding': "STRING",'elementId': "STRING",'size': "INTEGER",'class': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField", {hash:{
    'valueBinding': ("FLOW.dateControl.toDate"),
    'elementId': ("to_date"),
    'size': (30),
    'class': ("datePicker")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n          </div>\n        </div>\n      </fieldset>\n      <div class=\"fieldSetWrap\">\n        <fieldset id=\"surveySelect\" class=\"formLeftPanel\">\n          <h2>02. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey", options) : helperMissing.call(depth0, "t", "_select_survey", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <label for=\"surveyGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey_group", options) : helperMissing.call(depth0, "t", "_select_survey_group", options))));
  data.buffer.push(":</label>\n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'id': ("surveyGroup"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			<span class=\"infoText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cant_find_your_survey_", options) : helperMissing.call(depth0, "t", "_cant_find_your_survey_", options))));
  data.buffer.push("</span>\n			</div>\n          <div class=\"\">\n            <nav>\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_all", options) : helperMissing.call(depth0, "t", "_select_all", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deselectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_deselect_all", options) : helperMissing.call(depth0, "t", "_deselect_all", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n            <label for=\"surveys\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_surveys", options) : helperMissing.call(depth0, "t", "_select_surveys", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'multiple': "BOOLEAN",'size': "INTEGER",'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'id': "STRING",'optionValuePath': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'multiple': (true),
    'size': (10),
    'contentBinding': ("FLOW.surveyControl.publishedContent"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveys"),
    'optionLabelPath': ("content.name"),
    'id': ("surveys"),
    'optionValuePath': ("content.keyId")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSelectedSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  class=\"AddBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_selected_surveys", options) : helperMissing.call(depth0, "t", "_add_selected_surveys", options))));
  data.buffer.push("</a>\n          </div>\n        </fieldset>\n        <fieldset id=\"surveyPreview\" class=\"formRightPanel\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview_survey_selection", options) : helperMissing.call(depth0, "t", "_preview_survey_selection", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <!-- DEVICES TABLE-->\n            <table id=\"surveyPreviewList\" class=\"previewList\" >\n              <!-- TABLE HEADER-->\n              <thead>\n                <tr>\n                  <th class=\"groupPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_group", options) : helperMissing.call(depth0, "t", "_survey_group", options))));
  data.buffer.push("</th>\n                  <th class=\"surveyPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</th>\n                  <th class=\"action\"></th>\n                </tr>\n              </thead>\n              <!-- TABLE BODY: MAIN CONTENT-->\n              <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "survey", "in", "view.surveysPreview", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </tbody>\n              <!-- TABLE FOOTER-->\n              <tfoot>\n                <tr>\n                  <td colspan=\"7\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_clear_all", options) : helperMissing.call(depth0, "t", "_clear_all", options))));
  data.buffer.push("</a></td>\n                </tr>\n              </tfoot>\n            </table>\n          </div>\n        </fieldset>\n      </div>\n    \n    <div class=\"fieldSetWrap makeWhite\">\n        <fieldset id=\"devicesSelect\" class=\"formLeftPanel\">\n          <h2>03. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_devices", options) : helperMissing.call(depth0, "t", "_select_devices", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n          <label for=\"deviceGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_device_group", options) : helperMissing.call(depth0, "t", "_select_device_group", options))));
  data.buffer.push(":</label>\n          ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedDeviceGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'id': ("deviceGroup"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          </div>\n          <div class=\"\">\n            <nav>\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectAllDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_all", options) : helperMissing.call(depth0, "t", "_select_all", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deselectAllDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_deselect_all", options) : helperMissing.call(depth0, "t", "_deselect_all", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n          <label for=\"devices\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_devices", options) : helperMissing.call(depth0, "t", "_select_devices", options))));
  data.buffer.push(":</label>\n          ");
  hashTypes = {'multiple': "BOOLEAN",'size': "INTEGER",'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'multiple': (true),
    'size': (10),
    'contentBinding': ("FLOW.devicesInGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedDevices"),
    'optionLabelPath': ("content.combinedName"),
    'optionValuePath': ("content.keyId"),
    'id': ("devices")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSelectedDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"AddBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_selected_devices", options) : helperMissing.call(depth0, "t", "_add_selected_devices", options))));
  data.buffer.push("</a>\n          </div>\n        </fieldset>\n        <fieldset id=\"devicesPreview\" class=\"formRightPanel\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview_device_selection", options) : helperMissing.call(depth0, "t", "_preview_device_selection", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <!-- DEVICES TABLE-->\n            <table id=\"devicePreviewList\" class=\"previewList\" >\n              <!-- TABLE HEADER-->\n              <thead>\n                <tr>\n                  <th class=\"groupPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_group", options) : helperMissing.call(depth0, "t", "_device_group", options))));
  data.buffer.push("</th>\n                  <th class=\"surveyPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device", options) : helperMissing.call(depth0, "t", "_device", options))));
  data.buffer.push("</th>\n                  <th class=\"action\"></th>\n                </tr>\n              </thead>\n              <!-- TABLE BODY: MAIN CONTENT-->\n              <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "device", "in", "view.devicesPreview", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </tbody>\n              <!-- TABLE FOOTER-->\n              <tfoot>\n                <tr>\n                  <td colspan=\"7\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeAllDevices", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_clear_all", options) : helperMissing.call(depth0, "t", "_clear_all", options))));
  data.buffer.push("</a></td>\n                </tr>\n              </tfoot>\n            </table>\n          </div>\n        </fieldset>\n      </div>\n      <div class=\"menuConfirm\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveSurveyAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save_assignment", options) : helperMissing.call(depth0, "t", "_save_assignment", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditSurveyAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </div>\n    </form>\n  </div>\n</section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                <tr>\n                  <td class=\"groupPreview\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.surveyGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"surveyPreview\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSingleSurvey", "survey", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a></td>\n                </tr>\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                <tr>\n                  <td class=\"deviceGroup\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "device.deviceGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"deviceId\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "device.combinedName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSingleDevice", "device", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a></td>\n                </tr>\n                ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.AssignmentEditView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navDevices/assignment-list-tab/assignment-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createNewAssignment", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn btnAboveTable\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_create_new_assignment", options) : helperMissing.call(depth0, "t", "_create_new_assignment", options))));
  data.buffer.push("</a>\n  <div id=\"devicesListTable_length\" class=\"dataTables_length\"> </div>\n  <table class=\"dataTable\" id=\"deviceDataTable\">\n    <!-- TABLE HEADER-->\n    <thead>\n      <tr> ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("name"),
    'type': ("assignment")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("startDate"),
    'type': ("assignment")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("endDate"),
    'type': ("assignment")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        <th class=\"action noArrows\"> <a>Action</a></th>\n      </tr>\n    </thead>\n    <!-- TABLE BODY: MAIN CONTENT-->\n    <tbody>\n    \n    ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "assignment", "in", "FLOW.surveyAssignmentControl", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n    \n    <!-- TABLE FOOTER-->\n    <tfoot>\n      <tr>\n        <td colspan=\"7\"><small>This is the footer.</small></td>\n      </tr>\n    </tfoot>\n  </table>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_name", options) : helperMissing.call(depth0, "t", "_name", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_start_date", options) : helperMissing.call(depth0, "t", "_start_date", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_end_date", options) : helperMissing.call(depth0, "t", "_end_date", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n    <tr>\n      <td class=\"name\" style=\"text-align:left; padding:0 0 0 5px;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "assignment.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"startDate\" >");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "assignment", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n      <td class=\"endDate\" >");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "assignment", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n      <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editSurveyAssignment", "assignment", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"edit\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a> ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.AssignmentView", {hash:{
    'contentBinding': ("assignment")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n    </tr>\n    ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "startDate", options) : helperMissing.call(depth0, "date3", "startDate", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "endDate", options) : helperMissing.call(depth0, "date3", "endDate", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delAssignment", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth \" id=\"assignmentsList\"> \n  <!-- assignments TABLE--> \n  \n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.AssignmentsListTabView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/bootstrap-tab/survey-bootstrap"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<section class=\"fullWidth manualTransfer\" id=\"assignSurveys\">\n  <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manual_survey_transfer", options) : helperMissing.call(depth0, "t", "_manual_survey_transfer", options))));
  data.buffer.push("</h1>\n    <form>\n      <div class=\"fieldSetWrap\">\n        <fieldset id=\"surveySelect\" class=\"formLeftPanel\">\n          <h2>01. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey", options) : helperMissing.call(depth0, "t", "_select_survey", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <label for=\"surveyGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_survey_group", options) : helperMissing.call(depth0, "t", "_select_survey_group", options))));
  data.buffer.push(":</label>\n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'id': "STRING",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'id': ("surveyGroup"),
    'prompt': ("Select survey group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			<span class=\"infoText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cant_find_your_survey_", options) : helperMissing.call(depth0, "t", "_cant_find_your_survey_", options))));
  data.buffer.push("</span>\n			</div>\n          <div class=\"\">\n            <nav>\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_all", options) : helperMissing.call(depth0, "t", "_select_all", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deselectAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_deselect_all", options) : helperMissing.call(depth0, "t", "_deselect_all", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n            <label for=\"surveys\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_select_surveys", options) : helperMissing.call(depth0, "t", "_select_surveys", options))));
  data.buffer.push(":</label>\n           ");
  hashTypes = {'multiple': "BOOLEAN",'size': "INTEGER",'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'id': "STRING",'optionValuePath': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'multiple': (true),
    'size': (10),
    'contentBinding': ("FLOW.surveyControl.publishedContent"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveys"),
    'optionLabelPath': ("content.name"),
    'id': ("surveys"),
    'optionValuePath': ("content.keyId")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSelectedSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  class=\"AddBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_selected_surveys", options) : helperMissing.call(depth0, "t", "_add_selected_surveys", options))));
  data.buffer.push("</a>\n          </div>\n        </fieldset>\n        <fieldset id=\"surveyPreview\" class=\"formRightPanel\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview_survey_selection", options) : helperMissing.call(depth0, "t", "_preview_survey_selection", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n            <!-- DEVICES TABLE-->\n            <table id=\"surveyPreviewList\" class=\"previewList\" >\n              <!-- TABLE HEADER-->\n              <thead>\n                <tr>\n                  <th class=\"groupPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_group", options) : helperMissing.call(depth0, "t", "_survey_group", options))));
  data.buffer.push("</th>\n                  <th class=\"surveyPreview\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</th>\n                  <th class=\"action\"></th>\n                </tr>\n              </thead>\n              <!-- TABLE BODY: MAIN CONTENT-->\n              <tbody>\n                ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "survey", "in", "view.surveysPreview", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </tbody>\n              <!-- TABLE FOOTER-->\n              <tfoot>\n                <tr>\n                  <td colspan=\"7\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeAllSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_clear_all", options) : helperMissing.call(depth0, "t", "_clear_all", options))));
  data.buffer.push("</a></td>\n                </tr>\n              </tfoot>\n            </table>\n          </div>\n        </fieldset>\n      </div>\n    \n    <div class=\"fieldSetWrap makeWhite noBG\">\n        <fieldset id=\"devicesSelect\" class=\"fullWidth\">\n          <h2>02. ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_notification_details", options) : helperMissing.call(depth0, "t", "_notification_details", options))));
  data.buffer.push(":</h2>\n          <div class=\"\">\n          <label for=\"notificationEmail\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_notification_email", options) : helperMissing.call(depth0, "t", "_notification_email", options))));
  data.buffer.push(":</label>\n         ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'placeholder': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.notificationEmail"),
    'id': ("notificationEmail"),
    'placeholder': ("Enter the notification email"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         <label for=\"includeDBInstructions\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_include_db_instructions", options) : helperMissing.call(depth0, "t", "_include_db_instructions", options))));
  data.buffer.push(":</label>\n         ");
  hashTypes = {'checkedBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.includeDBInstructions"),
    'id': ("includeDBInstructions")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.includeDBInstructions", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </fieldset>\n      </div>\n      <div class=\"menuConfirm\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendSurveys", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_send_file", options) : helperMissing.call(depth0, "t", "_send_file", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </div>\n    </form>\n</section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                <tr>\n                  <td class=\"groupPreview\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.surveyGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"surveyPreview\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                  <td class=\"action\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSingleSurvey", "survey", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a></td>\n                </tr>\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n           ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("view.dbInstructions"),
    'id': ("dbInstructions")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyBootstrap", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navDevices/devices-list-tab/devices-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showManageDeviceGroupsDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn btnAboveTable\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_device_groups", options) : helperMissing.call(depth0, "t", "_manage_device_groups", options))));
  data.buffer.push("</a> \n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "FLOW.deviceControl.atLeastOneSelected", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  <table class=\"dataTable\" id=\"surveyDataTable\">\n    <!-- TABLE HEADER-->\n    <thead>\n      <tr> ");
  hashTypes = {'item': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("select")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("IMEI"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("phoneNumber"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("deviceIdentifier"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("deviceGroup"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("lastPositionDate"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("lastPositionDate"),
    'type': ("device")
  },inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" </tr>\n    </thead>\n    <!-- TABLE BODY: MAIN CONTENT-->\n    <tbody>\n    \n    ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "FLOW.deviceControl", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n    \n    <!-- TABLE FOOTER-->\n    <tfoot>\n      <tr>\n        <td colspan=\"7\"><small>This is the footer.</small></td>\n      </tr>\n    </tfoot>\n  </table>\n  <!--     ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showConfirmDeletedialog", {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("     --> \n  \n  <!-- add to group dialog-->\n  <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddToGroupDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <div class=\"blanket\"></div>\n    <div class=\"dialogWrap\"> \n      <!-- the dialog contents -->\n      <div class=\"confirmDialog dialog\">\n        <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_devices_to_device_group", options) : helperMissing.call(depth0, "t", "_add_devices_to_device_group", options))));
  data.buffer.push("</h2>\n        <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_choose_an_existing_device_group_from_the_list", options) : helperMissing.call(depth0, "t", "_choose_an_existing_device_group_from_the_list", options))));
  data.buffer.push("</p>\n        <br/>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.contentNoUnassigned"),
    'selectionBinding': ("view.selectedDeviceGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_existing_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <div class=\"buttons menuCentre\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddToGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddToGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <!-- Remove from group dialog-->\n  <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showRemoveFromGroupDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <div class=\"blanket\"></div>\n    <div class=\"dialogWrap\"> \n      <!-- the dialog contents -->\n      <div class=\"confirmDialog dialog\">\n        <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove_devices_from_device_group", options) : helperMissing.call(depth0, "t", "_remove_devices_from_device_group", options))));
  data.buffer.push("?</h2>\n        <div class=\"buttons menuCentre\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doRemoveFromGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelRemoveFromGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <!-- manage device groups dialog-->\n  <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showManageDeviceGroupsDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <div class=\"blanket\"></div>\n    <div class=\"dialogWrap\"> \n      <!-- the dialog contents -->\n      <div class=\"confirmDialog dialog\">\n        <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_device_groups", options) : helperMissing.call(depth0, "t", "_manage_device_groups", options))));
  data.buffer.push("</h2>\n        <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to_change_the_name_of_an_existing_group_", options) : helperMissing.call(depth0, "t", "_to_change_the_name_of_an_existing_group_", options))));
  data.buffer.push("</p>\n        <br/>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.contentNoUnassigned"),
    'selectionBinding': ("view.selectedDeviceGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n        ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.changedDeviceGroupName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to_create_a_new_device_group_", options) : helperMissing.call(depth0, "t", "_to_create_a_new_device_group_", options))));
  data.buffer.push("</p>\n        <label for=\"newDeviceGroupName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_new_group", options) : helperMissing.call(depth0, "t", "_new_group", options))));
  data.buffer.push(":</label>\n        ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newDeviceGroupName"),
    'id': ("newDeviceGroupName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n         <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_to_delete_an_existing_group_", options) : helperMissing.call(depth0, "t", "_to_delete_an_existing_group_", options))));
  data.buffer.push("</p>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.deviceGroupControl.contentNoUnassigned"),
    'selectionBinding': ("view.selectedDeviceGroupForDelete"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_device_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delDeviceGroup", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>\n\n        <div class=\"buttons menuCentre\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doManageDeviceGroups", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelManageDeviceGroups", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n  <nav class=\"dataTabMenu\">\n    <ul>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddToGroupDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_to_device_group", options) : helperMissing.call(depth0, "t", "_add_to_device_group", options))));
  data.buffer.push("</a></li>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRemoveFromGroupDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove_from_device_group", options) : helperMissing.call(depth0, "t", "_remove_from_device_group", options))));
  data.buffer.push("</a></li>\n    </ul>\n  </nav>\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n  <nav class=\"dataTabMenu\">\n    <ul>\n      <li><a href=\"#\" class=\"disabled\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_disable_devices", options) : helperMissing.call(depth0, "t", "_disable_devices", options))));
  data.buffer.push("</a></li>\n      <li><a href=\"#\" class=\"disabled\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_to_device_group", options) : helperMissing.call(depth0, "t", "_add_to_device_group", options))));
  data.buffer.push("</a></li>\n      <li><a href=\"#\" class=\"disabled\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove_from_device_group", options) : helperMissing.call(depth0, "t", "_remove_from_device_group", options))));
  data.buffer.push("</a></li>\n    </ul>\n  </nav>\n  ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("FLOW.deviceControl.allAreSelected")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_imei", options) : helperMissing.call(depth0, "t", "_imei", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_phone_number", options) : helperMissing.call(depth0, "t", "_phone_number", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_id", options) : helperMissing.call(depth0, "t", "_device_id", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_device_group", options) : helperMissing.call(depth0, "t", "_device_group", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_last_contact", options) : helperMissing.call(depth0, "t", "_last_contact", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_version", options) : helperMissing.call(depth0, "t", "_version", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <tr>\n      <td class=\"selection\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("isSelected")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"EMEI\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "esn", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"phoneNumber\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "phoneNumber", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"deviceId\" >");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "deviceIdentifier", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"deviceGroup\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "deviceGroupName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n      <td class=\"lastBeacon\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date1),stack1 ? stack1.call(depth0, "lastPositionDate", options) : helperMissing.call(depth0, "date1", "lastPositionDate", options))));
  data.buffer.push("</td>\n      <td class=\"version\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gallatinSoftwareManifest", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    </tr>\n    ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n            <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doDelete", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Ok</a>\n            <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelDelete", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</a>\n        ");
  return buffer;
  }

  data.buffer.push("<section class=\"fullWidth \" id=\"devicesList\"> \n  <!-- DEVICES TABLE--> \n  \n  ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.CurrentDevicesTabView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n </section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/devices-subnav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    	<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCurrentDevices", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_devices_list", options) : helperMissing.call(depth0, "t", "_devices_list", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    	<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAssignSurveysOverview", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_assignments_list", options) : helperMissing.call(depth0, "t", "_assignments_list", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSurveyBootstrap", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manual_survey_transfer", options) : helperMissing.call(depth0, "t", "_manual_survey_transfer", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

  data.buffer.push("<ul>\n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("currentDevices")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("assignSurveys")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("surveyBootstrap")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["navDevices/nav-devices"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"devicesSection floats-in\" id=\"main\" role=\"main\">\n    <div id=\"tabs\">\n        <nav class=\"tabNav floats-in\">\n            ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DevicesSubnavView", {hash:{
    'controllerBinding': ("controller.controllers.devicesSubnavController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </nav>\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["navMaps/nav-maps-common"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.countryController.content", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <label for=\"country\"><span class=\"inlined\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_country", options) : helperMissing.call(depth0, "t", "_country", options))));
  data.buffer.push(":</span>\n          ");
  hashTypes = {'contentBinding': "STRING",'valueBinding': "STRING",'optionLabelPath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.countryController.content"),
    'valueBinding': ("FLOW.countryController.selected"),
    'optionLabelPath': ("content.label"),
    'selectionBinding': ("FLOW.countryController.country")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </label>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n    <div id=\"pointDetails\">\n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "content", {hash:{},inverse:self.program(10, program10, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      \n    </div>\n  ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n        <ul class=\"placeMarkBasicInfo floats-in\">\n          <li>\n            <span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_collected_on", options) : helperMissing.call(depth0, "t", "_collected_on", options))));
  data.buffer.push(":</span>\n            <div class=\"placeMarkCollectionDate\">\n              ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date2),stack1 ? stack1.call(depth0, "FLOW.placemarkController.selected.collectionDate", options) : helperMissing.call(depth0, "date2", "FLOW.placemarkController.selected.collectionDate", options))));
  data.buffer.push("\n            </div>\n          </li>\n          <li>\n            <div class=\"placeMarkPointCode\"> \n              ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.placemarkDetailController.selectedPointCode", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n          </li>\n        </ul>\n        <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': (":imgContainer photoUrl:shown:hidden")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          <a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("photoUrl")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" target=\"_blank\">\n            <img ");
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("photoUrl")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" alt=\"\">\n          </a>\n        </div>\n        <dl class=\"floats-in\">\n          ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "content", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </dl>\n      ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n            ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "placemarkDetail", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n            <p class=\"noDetails\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_details", options) : helperMissing.call(depth0, "t", "_no_details", options))));
  data.buffer.push("</p>\n          ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <p class=\"noDetails\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_details", options) : helperMissing.call(depth0, "t", "_no_details", options))));
  data.buffer.push("</p>\n      ");
  return buffer;
  }

  data.buffer.push("<section id=\"main\" class=\"mapFlow floats-in\" role=\"main\">\n  ");
  data.buffer.push("\n  <div id=\"dropdown-holder\">\n    ");
  hashTypes = {'controllerBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.countryView", {hash:{
    'controllerBinding': ("FLOW.countryController")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <div id=\"mapDetailsHideShow\" class=\"drawHandle hideMapD\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_hide", options) : helperMissing.call(depth0, "t", "_hide", options))));
  data.buffer.push(" &rsaquo;</div>\n  </div>\n\n  <div id=\"flowMap\"></div>\n  ");
  hashTypes = {'controllerBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.PlacemarkDetailView", {hash:{
    'controllerBinding': ("FLOW.placemarkDetailController")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  <div id=\"flowMapLegend\">\n    <h1>LEGEND</h1>\n  </div>\n</section>\n\n<style>\n  #pointDetails > dl > div.defListWrap:nth-child(odd) {\n    background-color: rgb(204,214,214);\n  }\n</style>");
  return buffer;
  
});

Ember.TEMPLATES["navMessages/nav-messages"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<div class=\"greyBg\">\n  <section id=\"\" class=\"fullWidth messagesList\"> \n<h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_messages", options) : helperMissing.call(depth0, "t", "_messages", options))));
  data.buffer.push("</h1>\n    <!-- Messages TABLE-->\n    <table id=\"messageListTable\" class=\"dataTable\" >\n      <!-- TABLE HEADER-->\n      <thead>\n        <tr>\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("lastUpdateDateTime"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("objectId"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("objectTitle"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("actionAbout"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("shortMessage"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("userName"),
    'type': ("message")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </tr>\n      </thead>\n      <!-- TABLE BODY: MAIN CONTENT-->\n      <tbody>\n        ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "mess", "in", "FLOW.messageControl", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n      \n      <!-- TABLE FOOTER-->\n      <tfoot>\n        <tr>\n          <td colspan=\"7\"><small>This is the footer.</small></td>\n        </tr>\n      </tfoot>\n    </table>\n     <ul class=\"prevNext\">\n            <li class=\"prevBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasPrevPage", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n        <li class=\"nextBtn\">");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.hasNextPage", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n        </ul>\n  </section>\n</div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"date\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_date", options) : helperMissing.call(depth0, "t", "_date", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"objectId\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_id", options) : helperMissing.call(depth0, "t", "_survey_id", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"survey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey", options) : helperMissing.call(depth0, "t", "_survey", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"type\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"message\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_message", options) : helperMissing.call(depth0, "t", "_message", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"user\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_user", options) : helperMissing.call(depth0, "t", "_user", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n          <tr>\n            <td class=\"date\" style=\"text-align:left; padding:0 0 0 20px;\">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "mess", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n             <td class=\"actionAbout\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.objectId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"objectTitle\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.objectTitle", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"actionAbout\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.actionAbout", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"message\" style=\"text-align:left; padding:0 0 0 20px;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.shortMessage", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"userName\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "mess.userName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          </tr>\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date1),stack1 ? stack1.call(depth0, "lastUpdateDateTime", options) : helperMissing.call(depth0, "date1", "lastUpdateDateTime", options))));
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPrevPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> &lsaquo; ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_previous", options) : helperMissing.call(depth0, "t", "_previous", options))));
  data.buffer.push("</a> ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNextPage", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_next", options) : helperMissing.call(depth0, "t", "_next", options))));
  data.buffer.push(" &rsaquo;</a>");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.MessagesListView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navReports/applets/comprehensive-report-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataExportAppletImpl\"\n	archive=\"../exporterapplet.jar,../json.jar,../jcommon-1.0.16.jar,../jfreechart-1.0.13.jar,../poi-3.8-20120326.jar,../poi-ooxml-3.8-20120326.jar,../poi-ooxml-schemas-3.8-20120326.jar,../xbean.jar,../dom4j-1.6.1.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\" value=\"exporterapplet.jar,json.jar\">\n    <param name=\"cache-version\" value=\"1.3,1.0\">\n	<param name=\"exportType\" value=\"GRAPHICAL_SURVEY_SUMMARY\">\n	<param name=\"java_arguments\" value=\"-Xmx1024m\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n	<param name=\"criteria\" value=\"surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n    <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n	<!-- FIXME locale must be configurable -->\n	<param name=\"options\"\n		value=\"locale:=en;performRollup:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.editControl.summaryPerGeoArea", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(";nocharts:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.editControl.summaryPerGeoArea", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(";imgPrefix:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.Env.photo_url_root", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("/\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/applets/google-earth-file-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"org.waterforpeople.mapping.dataexport.KMLApplet\"\n	archive=\"../exporterapplet.jar,../json.jar,../poi-3.5-signed.jar,../velocity-1.6.2-dep.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\"\n		value=\"exporterapplet.jar,json.jar,poi-3.5-signed.jar,velocity-1.6.2-dep.jar\">\n	<param name=\"cache-version\" value=\"1.3,1.0,3.5\">\n    <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/applets/raw-data-report-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet width=\"100\" height=\"30\"\n  code=\"com.gallatinsystems.framework.dataexport.applet.DataExportAppletImpl\"\n  archive=\"../exporterapplet.jar,../json.jar,../jcommon-1.0.16.jar,../jfreechart-1.0.13.jar,../poi-3.8-20120326.jar,../poi-ooxml-3.8-20120326.jar,../poi-ooxml-schemas-3.8-20120326.jar,../xbean.jar,../dom4j-1.6.1.jar,../gdata-core-1.0.jar\">\n  <param name=\"cache-archive\" value=\"exporterapplet.jar,json.jar\">\n  <param name=\"cache-version\" value=\"1.3,1.0\">\n  <param name=\"exportType\" value=\"RAW_DATA\">\n  <param name=\"java_arguments\" value=\"-Xmx1024m\">\n  <param name=\"factoryClass\"\n    value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n  <param name=\"criteria\" value=\"surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n  <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n  <!-- FIXME locale must be configurable -->\n  <param name=\"options\"\n    value=\"exportMode:=RAW_DATA;locale:=en;imgPrefix:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.Env.photo_url_root", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(";generateTabFormat=false\"/>\n</applet>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["navReports/applets/survey-form-applet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"block\">\n<applet height=\"30\" width=\"100\"\n	code=\"com.gallatinsystems.framework.dataexport.applet.DataExportAppletImpl\"\n	archive=\"../exporterapplet.jar,../json.jar,../poi-3.5-signed.jar,../gdata-core-1.0.jar\">\n	<param name=\"cache-archive\"\n		value=\"exporterapplet.jar,json.jar,poi-3.5-signed.jar\">\n	<param name=\"cache-version\" value=\"1.3,1.0,3.5\">\n	<param name=\"exportType\" value=\"SURVEY_FORM\">\n	<param name=\"factoryClass\"\n		value=\"org.waterforpeople.mapping.dataexport.SurveyDataImportExportFactory\">\n	<param name=\"criteria\" value=\"surveyId:=");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n    <param name=\"serverOverride\" value=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "getServer", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n</applet>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/chart-reports"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n        <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_chart_builder", options) : helperMissing.call(depth0, "t", "_chart_builder", options))));
  data.buffer.push("</h1>\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		<span class=\"\"></span>\n      ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.name"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.questionControl.OPTIONcontent"),
    'selectionBinding': ("FLOW.selectedControl.selectedQuestion"),
    'optionLabelPath': ("content.text"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_question")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n<div class=\"chartSetting\">       \n<h4>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_chart_type", options) : helperMissing.call(depth0, "t", "_chart_type", options))));
  data.buffer.push(":</h4>\n      ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.chartTypeControl.content"),
    'selectionBinding': ("view.chartType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_chart_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.isDoughnut", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getChartData", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_build_chart", options) : helperMissing.call(depth0, "t", "_build_chart", options))));
  data.buffer.push(" </a>\n</div>		\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.noChoiceBool", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n     	<h3 class=\"chartTitle\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedQuestion.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n        <div id=\"piechart\">\n			<p>Choose a Question from above selectors.</p> 	\n		</div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" \n  <label class=\"groupChartSelect\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_put_smaller_items_together", options) : helperMissing.call(depth0, "t", "_put_smaller_items_together", options))));
  data.buffer.push(" ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.compactSmaller")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n      <p class=\"errorMsg\">Please choose a survey group, survey and question using the selectors above.</p>\n    ");
  }

  data.buffer.push(" <section class=\"fullWidth\" id=\"reportBlocks\">\n    ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.chartView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n <script type=\"text/javascript\">\n\nfunction deleteChart(){\n  $('#piechart').empty();\n}\n\nfunction createDoughnutChart(){\n    var canvasWidth = 1000, //width\n      canvasHeight = 400,   //height\n      outerRadius = 100,   //radius\n      labelRadius = 120,   //radius\n      color = d3.scale.category20(); //builtin range of colors\n\n    var dataSet = FLOW.chartDataControl.get('chartData');\n    var smallerItems = FLOW.chartDataControl.get('smallerItems');\n    var total = FLOW.chartDataControl.get('total');\n\n    var vis = d3.select(\"#piechart\")\n      .append(\"svg:svg\") //create the SVG element inside the <body>\n        .data([dataSet]) //associate our data with the document\n        .attr(\"width\", canvasWidth) //set the width of the canvas\n        .attr(\"height\", canvasHeight) //set the height of the canvas\n        .append(\"svg:g\") //make a group to hold our pie chart\n        .attr(\"transform\", \"translate(\" + 0.3*canvasWidth + \",\" + 0.4*canvasHeight + \")\") // relocate center of pie\n\n    // This will create <path> elements for us using arc data...\n    var arc = d3.svg.arc()\n      .outerRadius(outerRadius)\n      .innerRadius(outerRadius-50);\n\n    var pie = d3.layout.pie() //this will create arc data for us given a list of values\n      .value(function(d) { return d.percentage; }) // Binding each value to the pie\n      .sort( function(d) { return null; } );\n\n      vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(246, 160, 26)\")\n      .style(\"font\", \"bold 1.5em helvetica\")\n      .text(\"Smallest items:\") \n      .attr(\"transform\",\"translate(320,-120)\");\n\n\n      vis.selectAll(\"p\")\n      .data(smallerItems)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d){\n        return d.legendLabel;\n      }) \n      .attr(\"transform\",function(d,i){\n        return \"translate(325,\" + (-100+i*20) + \")\";\n      })\n\n    // Select all <g> elements with class slice (there aren't any yet)\n    var arcs = vis.selectAll(\"g.slice\")\n      // Associate the generated pie data (an array of arcs, each having startAngle,\n      // endAngle and value properties) \n      .data(pie)\n      // This will create <g> elements for every \"extra\" data element that should be associated\n      // with a selection. The result is creating a <g> for every object in the data array\n      .enter()\n      // Create a group to hold each slice (we will have a <path> and a <text>\n      // element associated with each slice)\n      .append(\"svg:g\")\n      .attr(\"class\", \"slice\");    //allow us to style things in the slices (like text)\n\n    arcs.append(\"svg:path\")\n      //set the color for each slice to be chosen from the color function defined above\n      .attr(\"fill\", function(d, i) { return color(i); } )\n      //this creates the actual SVG path using the associated data (pie) with the arc drawing function\n      .attr(\"d\", arc);\n\n    // Add a legendLabel to each arc slice...\n    arcs.append(\"svg:text\")\n      .attr(\"transform\", function(d) {\n        var c = arc.centroid(d),\n          x = c[0],\n          y = c[1],\n          // pythagorean theorem for hypotenuse\n          h = Math.sqrt(x*x + y*y);\n          return \"translate(\" + (x/h * labelRadius) +  ',' + (y/h * labelRadius) +  \")\"; \n        })\n      .attr(\"text-anchor\", function(d) {\n        // are we past the center?\n        return (d.endAngle + d.startAngle)/2 > Math.PI ? \"end\" : \"start\";\n      })\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d, i) { return dataSet[i].legendLabel; }); //get the label from our original data array\n\n       // Add a legendLabel to each arc slice...\n    vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"middle\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.2em helvetica\")\n      .text(\"Total:\") //get the label from our original data array\n      .attr(\"transform\",\"translate(0,-15)\");\n\n    vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"middle\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(\"answers\") //get the label from our original data array\n      .attr(\"transform\",\"translate(0,15)\");\n\n    vis.append(\"svg:text\")\n      .attr(\"text-anchor\", \"middle\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(total.toString()) \n      .attr(\"transform\",\"translate(0,0)\");\n\n    // Computes the angle of an arc, converting from radians to degrees.\n    function angle(d) {\n      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;\n      return a > 90 ? a - 180 : a;\n    }\n}\n\nfunction createVBarChart(){\n// as in http://bl.ocks.org/3885304\nvar margin = {top: 20, right: 20, bottom: 30, left: 40},\n    width = 700 - margin.left - margin.right,\n    height = 500 - margin.top - margin.bottom;\n\n var dataSet = FLOW.chartDataControl.get('chartData');\n var maxPer = FLOW.chartDataControl.get('maxPer');\n\nvar formatPercent = d3.format(\".0%\");\n\n// create linear scale for y axis\nvar yScaleMax = maxPer/100 + 0.1;\nif (yScaleMax > 1) yScaleMax = 1;\nvar y = d3.scale.linear()\n    .domain([0,yScaleMax])\n    .range([height*0.6,0]);\n\n// y axis\nvar yAxis = d3.svg.axis()\n    .scale(y)\n    .orient(\"left\")\n    .tickFormat(formatPercent);\n\n// add svg canvas to DOM\nvar svg = d3.select(\"#piechart\")\n    .append(\"svg\")\n    .attr(\"width\", width + margin.left + margin.right)\n    .attr(\"height\", height + margin.top + margin.bottom)\n    .append(\"g\")\n    .attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\");\n\n\n  // y axis\n  svg.append(\"g\")\n      .attr(\"class\", \"y axis\")\n      .call(yAxis)\n      .append(\"text\")\n      .attr(\"transform\", \"rotate(-90)\")\n      .attr(\"y\", 6)\n      .attr(\"dy\", \".71.1em\")\n      .style(\"text-anchor\", \"end\")\n      .text(\"Percentage\");\n\n  // add bars\n  svg.selectAll(\".bar\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:rect\")\n      .attr(\"class\", \"bar\")\n      .attr(\"x\", function(d,i){return 20+i*40;})\n      .attr(\"width\", 20)\n      .attr(\"y\",function(d){return y(d.percentage/100);})\n      .attr(\"height\",function(d){return height*0.6-y(d.percentage/100);})\n      \n  // add labels\n  svg.selectAll(\"p\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d){\n        return d.legendLabel;\n      }) \n    .attr(\"transform\",function(d,i){\n         return \"translate(\" + (25+i*40) + \",\" + (0.6*height + 10) +\") rotate(45) \";\n       })\n\n    // add numbers on top of bars\n    svg.selectAll(\"num\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(0,0,0)\")\n      .style(\"font\", \"normal 1em helvetica\")\n      .text(function(d){\n        var num = d.percentage;\n        return num.toFixed(1).toString() + \"%\";\n      }) \n      .attr(\"transform\",function(d,i){\n        return \"translate(\" + (20+i*40) + \",\" + (y(d.percentage/100)-5) + \")\";\n      })\n  }\n\n\n  function createHBarChart(){\n// as in http://bl.ocks.org/3885304\nvar margin = {top: 20, right: 20, bottom: 30, left: 40},\n    width = 700 - margin.left - margin.right,\n    height = 500 - margin.top - margin.bottom;\n\n var dataSet = FLOW.chartDataControl.get('chartData');\n var maxPer = FLOW.chartDataControl.get('maxPer');\n\nvar formatPercent = d3.format(\".0%\");\n\n// create linear scale for y axis\nvar yScaleMax = maxPer/100 + 0.1;\nif (yScaleMax > 1) yScaleMax = 1;\nvar y = d3.scale.linear()\n    .domain([0,yScaleMax])\n    .range([0,width*0.6]);\n\n// add svg canvas to DOM\nvar svg = d3.select(\"#piechart\")\n    .append(\"svg\")\n    .attr(\"width\", width + margin.left + margin.right)\n    .attr(\"height\", height + margin.top + margin.bottom)\n    .append(\"g\")\n    .attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\");\n\n svg.append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(246, 160, 26)\")\n      .style(\"font\", \"bold 2em helvetica\")\n      .text(\"Percentage\") \n      .attr(\"transform\",\"translate(300,0)\");\n\n  // add bars\n  svg.selectAll(\".bar\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:rect\")\n      .attr(\"class\", \"bar\")\n      .attr(\"y\", function(d,i){return 20+i*40;})\n      .attr(\"height\", 20)\n      .attr(\"x\",function(d){return 300;})\n      .attr(\"width\",function(d){return y(d.percentage/100);})\n      \n  // add labels\n  svg.selectAll(\"p\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"end\")\n      .style(\"fill\", \"rgb(58,58,58)\")\n      .style(\"font\", \"bold 1.1em helvetica\")\n      .text(function(d){\n        return d.legendLabel;\n      }) \n    .attr(\"transform\",function(d,i){\n         return \"translate(280,\" + (35+i*40) +\")\";\n       })\n\n    // add numbers on top of bars\n    svg.selectAll(\"num\")\n      .data(dataSet)\n      .enter()\n      .append(\"svg:text\")\n      .attr(\"text-anchor\", \"left\")\n      .style(\"fill\", \"rgb(0,0,0)\")\n      .style(\"font\", \"normal 1.1em helvetica\")\n      .text(function(d){\n        var num = d.percentage;\n        return num.toFixed(1).toString();\n      }) \n      .attr(\"transform\",function(d,i){\n        return \"translate(\" + (305+y(d.percentage/100)) + \",\" + (35+i*40) + \")\";\n      })\n  }\n        \n    </script>\n    </section>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/export-reports"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_data", options) : helperMissing.call(depth0, "t", "_export_data", options))));
  data.buffer.push("</h1>\n ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyGroupControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurveyGroup"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_group")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n      ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyControl.content"),
    'selectionBinding': ("FLOW.selectedControl.selectedSurvey"),
    'optionLabelPath': ("content.code"),
    'optionValuePath': ("content.keyId"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n<div class=\"rawDataReport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_raw_data_report", options) : helperMissing.call(depth0, "t", "_export_raw_data_report", options))));
  data.buffer.push("</h3>\n    <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report_applet_text_", options) : helperMissing.call(depth0, "t", "_raw_data_report_applet_text_", options))));
  data.buffer.push("</p>\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRawDataReport", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_raw_data_report", options) : helperMissing.call(depth0, "t", "_raw_data_report", options))));
  data.buffer.push(" </a>\n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showRawDataReportApplet", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n<div class=\"comprehensiveReport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_comprehensive_report", options) : helperMissing.call(depth0, "t", "_export_comprehensive_report", options))));
  data.buffer.push("</h3>\n   <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_comprehensive_report_applet_text", options) : helperMissing.call(depth0, "t", "_comprehensive_report_applet_text", options))));
  data.buffer.push(".</p>\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showComprehensiveOptions", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_comprehensive_report", options) : helperMissing.call(depth0, "t", "_comprehensive_report", options))));
  data.buffer.push(" </a>\n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showComprehensiveReportApplet", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showGoogleEarthButton", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n<div class=\"surveyFormExport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_survey_form", options) : helperMissing.call(depth0, "t", "_export_survey_form", options))));
  data.buffer.push("</h3>\n  <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_form_applet_text_", options) : helperMissing.call(depth0, "t", "_survey_form_applet_text_", options))));
  data.buffer.push("</p>\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showSurveyForm", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_form", options) : helperMissing.call(depth0, "t", "_survey_form", options))));
  data.buffer.push(" </a>\n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showSurveyFormApplet", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n  <!-- Comprehensive report options -->\n<div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showComprehensiveDialog:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_options", options) : helperMissing.call(depth0, "t", "_options", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\"></p>\n\n           <label for=\"summaryPerGeoArea\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_generate_summary_per_geo_area", options) : helperMissing.call(depth0, "t", "_generate_summary_per_geo_area", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'checkedBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("FLOW.editControl.summaryPerGeoArea"),
    'id': ("summaryPerGeoArea")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"omitCharts\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_omit_charts", options) : helperMissing.call(depth0, "t", "_omit_charts", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'checkedBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("FLOW.editControl.omitCharts"),
    'id': ("omitCharts")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n\n          <div class=\"buttons menuCentre\">\n            <ul>\n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showComprehensiveReport", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ok", options) : helperMissing.call(depth0, "t", "_ok", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.rawDataReportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.comprehensiveReportApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<div class=\"googleEarthExport block\">\n  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_google_earth_file", options) : helperMissing.call(depth0, "t", "_export_google_earth_file", options))));
  data.buffer.push("</h3>\n <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_google_earth_applet_text_", options) : helperMissing.call(depth0, "t", "_google_earth_applet_text_", options))));
  data.buffer.push("</p>\n\n\n  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showGoogleEarthFile", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"standardBtn\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_google_earth_file", options) : helperMissing.call(depth0, "t", "_google_earth_file", options))));
  data.buffer.push(" </a>  \n</div>\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showGoogleEarthFileApplet", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.googleEarthFileApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.surveyFormApplet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<div class=\"greyBg\">\n<section class=\"fullWidth\" id=\"reportBlocks\">\n");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.ExportReportsAppletView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/nav-reports"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"reportsSection floats-in\" id=\"main\" role=\"main\">\n    <div id=\"tabs\">\n        <nav class=\"tabNav floats-in\">\n            ");
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.ReportsSubnavView", {hash:{
    'controllerBinding': ("controller.controllers.reportsSubnavController")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </nav>\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["navReports/reports-subnav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doChartReports", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_charts", options) : helperMissing.call(depth0, "t", "_charts", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    	<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doExportReports", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_export_reports", options) : helperMissing.call(depth0, "t", "_export_reports", options))));
  data.buffer.push("</a>\n    ");
  return buffer;
  }

  data.buffer.push("<ul>\n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("chartReports")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    ");
  hashTypes = {'item': "STRING"};
  stack1 = helpers.view.call(depth0, "view.NavItemView", {hash:{
    'item': ("exportReports")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/edit-questions"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n       <!-- insert, move and copy buttons --> \n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForMove", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n      <!-- end insert, move and copy buttons for zero item--> \n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"moveMenu groupActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move_group_here", options) : helperMissing.call(depth0, "t", "_move_group_here", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("   \n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForCopy", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n      ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"copyMenu groupActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_paste_group_here", options) : helperMissing.call(depth0, "t", "_paste_group_here", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n      ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"insertMenu groupActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInsertQuestionGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_insert_group_here", options) : helperMissing.call(depth0, "t", "_insert_group_here", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n      ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("       \n        ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.QuestionGroupItemView", {hash:{
    'contentBinding': ("questionGroup")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n          <div class=\"questionGroupBlock\">\n            <header> <span class=\"qtnGroupHead\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_group", options) : helperMissing.call(depth0, "t", "_group", options))));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> \n              ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showQGroupNameEditField", {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              <nav class=\"qtnGroupMenu\">\n                <ul>\n                  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amVisible", {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"editQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_group_name", options) : helperMissing.call(depth0, "t", "_edit_group_name", options))));
  data.buffer.push("</a></li>\n                  <li> <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delQG", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"deleteQuestionGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a> </li>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopy", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"copyQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copy", options) : helperMissing.call(depth0, "t", "_copy", options))));
  data.buffer.push("</a></li>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMove", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"moveQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move", options) : helperMissing.call(depth0, "t", "_move", options))));
  data.buffer.push("</a> </li>\n                </ul>\n              </nav>\n            </header>\n            \n            <!-- if the question group is open, show all questions -->\n            ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amVisible", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n        \n          <!-- end question group block --> \n          </div>\n          \n          <!-- insert, move and copy buttons --> \n          ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.oneSelectedForMove", {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n      <!-- end move and copy buttons --> \n\n\n        ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.questionGroupName"),
    'size': (45)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveQuestionGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a>\n                <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelQuestionGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a> \n              ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                <h1 class=\"qtnGroupTitle\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVisibility", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h1>\n              ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVisibility", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"showQuestionGroup shown\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_hide_questions", options) : helperMissing.call(depth0, "t", "_hide_questions", options))));
  data.buffer.push(" </a></li>\n                  ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVisibility", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"showQuestionGroup\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_show_questions", options) : helperMissing.call(depth0, "t", "_show_questions", options))));
  data.buffer.push(" </a></li>\n                  ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n              <div class=\"questionSetContent\"> \n                ");
  hashTypes = {'zeroItemQuestion': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.QuestionView", {hash:{
    'zeroItemQuestion': (true)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "question", "in", "FLOW.questionControl", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n              </div>\n            ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push(" \n                  ");
  hashTypes = {'contentBinding': "STRING",'zeroItemQuestion': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.QuestionView", {hash:{
    'contentBinding': ("question"),
    'zeroItemQuestion': (false)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n            <nav class=\"moveMenu groupActionMenu\">\n              <ul>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move_group_here", options) : helperMissing.call(depth0, "t", "_move_group_here", options))));
  data.buffer.push("</a></li>\n                <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupMoveCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n          ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("   \n            ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForCopy", {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n          ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n              <nav class=\"copyMenu groupActionMenu\">\n                <ul>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_paste_group_here", options) : helperMissing.call(depth0, "t", "_paste_group_here", options))));
  data.buffer.push("</a></li>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQGroupCopyCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n                </ul>\n              </nav>\n            ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n              <nav class=\"insertMenu groupActionMenu\">\n                <ul>\n                  <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInsertQuestionGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_insert_group_here", options) : helperMissing.call(depth0, "t", "_insert_group_here", options))));
  data.buffer.push("</a></li>\n                </ul>\n              </nav>\n            ");
  return buffer;
  }

  data.buffer.push("<!-- Beginning Question group set  -->\n  <section id=\"questionSet\">\n    <section class=\"aQuestionSet mainContent\" id=\"setIndex-01\"> \n    <!-- zeroItem indicates that this is the item before the first question group -->\n    ");
  hashTypes = {'zeroItem': "BOOLEAN"};
  stack1 = helpers.view.call(depth0, "FLOW.QuestionGroupItemView", {hash:{
    'zeroItem': (true)
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n      \n      <!-- start list of question groups --> \n      ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "questionGroup", "in", "FLOW.questionGroupControl", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n    </section>\n  </section>\n  <!-- End Question group Set  --> ");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/manage-notifications"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<div class=\"manageNotificationsBlock\">\n    <section id=\"manageNotifications\" class=\"mainContent mainRight\">\n        <div class=\"innerContent\">\n            <div id=\"notifications\">\n                <h1>\n                    ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_notifications", options) : helperMissing.call(depth0, "t", "_notifications", options))));
  data.buffer.push("\n                </h1>\n                <div class=\"whiteBgSeparator\">\n                   \n                    <form class=\"notificationAdd\">\n                        <fieldset>\n                            <label for=\"emailNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email", options) : helperMissing.call(depth0, "t", "_email", options))));
  data.buffer.push("  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.destinationEmpty", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> \n                            ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.notificationDestination"),
    'id': ("emailNotification"),
    'size': (150)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset>\n                            <label for=\"eventNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_event", options) : helperMissing.call(depth0, "t", "_event", options))));
  data.buffer.push("  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.typeEmpty", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> \n                            ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.notificationEventControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.notificationType"),
    'id': ("eventNotification"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_event")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset>\n                            <label for=\"typeNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_option", options) : helperMissing.call(depth0, "t", "_option", options))));
  data.buffer.push("  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.optionEmpty", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> \n                            ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'id': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.notificationOptionControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.notificationOption"),
    'id': ("typeNotification"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_option")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset>\n                            <label for=\"dateNotification\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_expires", options) : helperMissing.call(depth0, "t", "_expires", options))));
  data.buffer.push(" ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.dateEmpty", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField2", {hash:{
    'valueBinding': ("view.expiryDate"),
    'id': ("dateNotification"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </fieldset>\n                        <fieldset class=\"addNotifiBtn\">\n                            <nav>\n                                <ul>\n                                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addNotification", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add", options) : helperMissing.call(depth0, "t", "_add", options))));
  data.buffer.push("</a></li>\n                                    <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelNotification", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n                                </ul>\n                            </nav>\n                        </fieldset>\n                    </form>\n                    <table class=\"notificationTable dataTable\">\n                        <!-- DEVICES TABLE--><!-- TABLE HEADER-->\n                        <thead>\n                            <tr>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email", options) : helperMissing.call(depth0, "t", "_email", options))));
  data.buffer.push("</th>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("</th>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_option", options) : helperMissing.call(depth0, "t", "_option", options))));
  data.buffer.push("</th>\n                                <th>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_expires", options) : helperMissing.call(depth0, "t", "_expires", options))));
  data.buffer.push("</th>\n                                <th></th>\n                            </tr>\n                        </thead><!-- TABLE BODY: MAIN CONTENT-->\n                        <tbody>\n                          ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "notification", "in", "FLOW.notificationControl", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </tbody><!-- TABLE FOOTER-->\n                        <tfoot>\n                            <tr>\n                                <td colspan=\"7\">\n                                    <small>This is the footer.</small>\n                                </td>\n                            </tr>\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n            <nav class>\n                <ul>\n                    <li>\n                        <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "closeNotifications", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_close_notifications", options) : helperMissing.call(depth0, "t", "_close_notifications", options))));
  data.buffer.push("</a>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n    </section>\n</div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_provide_an_email_address", options) : helperMissing.call(depth0, "t", "_please_provide_an_email_address", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_make_a_choice", options) : helperMissing.call(depth0, "t", "_please_make_a_choice", options))));
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_make_a_choice", options) : helperMissing.call(depth0, "t", "_please_make_a_choice", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" - ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_select_a_date", options) : helperMissing.call(depth0, "t", "_please_select_a_date", options))));
  data.buffer.push(" ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                            <tr>\n                                <td class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "notification.notificationDestination", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                <td class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "notification.notificationType", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                <td class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "notification.notificationOption", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                <td class=\"\">");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "notification", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n                                <td class=\"action\">\n                                    <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeNotification", "notification", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>\n                                </td>\n                            </tr>\n                            ");
  return buffer;
  }
function program11(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date3),stack1 ? stack1.call(depth0, "expiryDate", options) : helperMissing.call(depth0, "date3", "expiryDate", options))));
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.NotificationsView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navSurveys/nav-surveys-edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<section class=\"leftSidebar\" id=\"newSurveyInfo\">\n  <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_survey", options) : helperMissing.call(depth0, "t", "_edit_survey", options))));
  data.buffer.push("</h2>\n\n  <form>\n    <label for=\"newSurveyName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_title", options) : helperMissing.call(depth0, "t", "_title", options))));
  data.buffer.push("<span class=\"isRequired\">(");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_required", options) : helperMissing.call(depth0, "t", "_required", options))));
  data.buffer.push(")</span>:\n      ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.surveyTitle"),
    'placeholder': ("Type in the name of your survey"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n    <label for=\"newSurveyDesc\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_description", options) : helperMissing.call(depth0, "t", "_description", options))));
  data.buffer.push(":\n      ");
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'size': "INTEGER",'rows': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("view.surveyDescription"),
    'placeholder': ("Type in a description of your survey"),
    'size': (30),
    'rows': ("3")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n   <!--  <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.requireApproval")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_require_approval", options) : helperMissing.call(depth0, "t", "_require_approval", options))));
  data.buffer.push(" </label> -->\n	  <dl class=\"floats-in\">\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_version_number", options) : helperMissing.call(depth0, "t", "_version_number", options))));
  data.buffer.push(":</dt>\n              <dd><span id=\"versionNbr\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedSurvey.version", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.tooltip),stack1 ? stack1.call(depth0, "_version_numbers_helps", options) : helperMissing.call(depth0, "tooltip", "_version_numbers_helps", options))));
  data.buffer.push("</dd>\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_id_number", options) : helperMissing.call(depth0, "t", "_id_number", options))));
  data.buffer.push(":</dt>\n              <dd><span id=\"surveyIdNbr\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedSurvey.keyId", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></dd>\n            </dl>   \n    <label for=\"surveyType\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("<span class=\"isRequired\">(");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_required", options) : helperMissing.call(depth0, "t", "_required", options))));
  data.buffer.push(")</span>:\n      ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.surveyPointTypeControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.surveyPointType"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_survey_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </label>\n    \n    <label for=\"surveyLanguage\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_language", options) : helperMissing.call(depth0, "t", "_language", options))));
  data.buffer.push(":\n      ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.languageControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.language"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_language")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </label>\n  </form>\n  <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doManageNotifications", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"manageNotifications\"><span>+</span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_notifications", options) : helperMissing.call(depth0, "t", "_manage_notifications", options))));
  data.buffer.push("</a>\n  <ul class=\"newSurveyInfoUl\" id=\"\">\n    <li>\n      <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_summary", options) : helperMissing.call(depth0, "t", "_survey_summary", options))));
  data.buffer.push("</h3>\n    </li>\n    <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_number_of_question_groups", options) : helperMissing.call(depth0, "t", "_number_of_question_groups", options))));
  data.buffer.push(": <span id=\"numberQuestionSet\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.numberQuestionGroups", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> </li>\n    <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_number_of_questions", options) : helperMissing.call(depth0, "t", "_number_of_questions", options))));
  data.buffer.push(": <span id=\"numberQuestion\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.numberQuestions", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> </li>\n    <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_status", options) : helperMissing.call(depth0, "t", "_status", options))));
  data.buffer.push(": ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.isPublished", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </li>\n  </ul>\n  <nav class=\"newSurveyNav\">\n    <ul>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSaveSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"saveNewSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPreviewSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"previewNewSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview", options) : helperMissing.call(depth0, "t", "_preview", options))));
  data.buffer.push("</a></li>\n      <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doPublishSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"publishNewSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_publish", options) : helperMissing.call(depth0, "t", "_publish", options))));
  data.buffer.push("</a></li>\n    </ul>\n  </nav>\n \n</section>\n<section class=\"mainRight\" id=\"surveyCreator\">\n  <section class=\"topBar\">\n    <nav class=\"menuTopbar\">\n      <ul class=\"\">\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSurveysMain", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"stepBack\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_go_back_to_survey_overview", options) : helperMissing.call(depth0, "t", "_go_back_to_survey_overview", options))));
  data.buffer.push("</a></li>\n      </ul>\n    </nav>\n  </section>\n  \n");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</section>\n ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <span class=\"surveyPublished\">\n      ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_published", options) : helperMissing.call(depth0, "t", "_published", options))));
  data.buffer.push("</span> ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" <span class=\"surveyNotPublished\">\n      ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_not_published", options) : helperMissing.call(depth0, "t", "_not_published", options))));
  data.buffer.push("</span> ");
  return buffer;
  }

  data.buffer.push("<!-- we are within navSurveysEditView -->\n ");
  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.SurveySidebarView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <!-- end of FLOW.SurveySideBarView --> \n");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/nav-surveys-main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <section id=\"groupBar\" class=\"leftSidebar\">\n   <!--\n    <form action=\"\" method=\"post\">\n      <input type=\"search\" placeholder=\"Filter surveys\"  name=\"surveySearch\" />\n    </form> -->\n    <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_groups", options) : helperMissing.call(depth0, "t", "_survey_groups", options))));
  data.buffer.push("</h2>\n	<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addGroup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_group", options) : helperMissing.call(depth0, "t", "_add_new_group", options))));
  data.buffer.push("</a>\n    <nav>\n      <!-- show new group field, show when 'add a group' is selected -->\n      ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.showNewGroupField", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("   	 \n<div class=\"scrollWrap\"><a href=\"#scrollUpId\" class=\"scrollUp\" id=\"scrollUpId\">up</a></div>\n \n<nav class=\"menuGroupWrap\">\n      <!-- show all survey groups --> \n	 <ul class=\"menuGroup\">\n        ");
  hashTypes = {};
  stack2 = helpers.view.call(depth0, "FLOW.JavascriptSurveyGroupListView", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </ul>\n</nav>\n<div class=\"scrollWrap\"><a href=\"#scrollDownId\" class=\"scrollDown\" id=\"scrollDownId\">down</a></div>\n  </section>\n\n  <section id=\"allSurvey\" class=\"mainRight surveysList\">\n    <section class=\"topBar\">\n      ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.oneSelected", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      \n      <!-- show delete group, add new group, and create new survey buttons--> \n      <nav class=\"menuTopbar\">\n        <ul class=\"\">\n          ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.oneSelected", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </ul>\n      </nav>    \n    </section>\n\n    ");
  hashTypes = {};
  stack2 = helpers.unless.call(depth0, "view.oneSelected", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    <!-- show all surveys of the currently selected survey group-->\n    <ul class=\"surveyBatch\">\n      ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "survey", "in", "FLOW.surveyControl.arrangedContent", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </ul>    \n  </section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.surveyGroupName"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <nav class=\"menuCentre\">\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveNewSurveyGroupName", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a>\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelNewSurveyGroupName", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a>\n        </nav>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n          ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "sg", "in", "FLOW.surveyGroupControl.arrangedContent", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n            ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyGroupMenuItemView", {hash:{
    'contentBinding': ("sg")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n              <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "makeSelected", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sg.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.showEditField", {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.surveyGroupName"),
    'size': (45)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    \n      <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveSurveyGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n       <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelSurveyGroupNameEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a>\n        ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n          <!-- show selected survey group and edit name button --> \n          <h2>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "FLOW.selectedControl.selectedSurveyGroup.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2> \n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editSurveyGroupName", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"editGroupName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_name", options) : helperMissing.call(depth0, "t", "_edit_name", options))));
  data.buffer.push("</a>\n          <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delSG", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"deleteGroup\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete_this_group", options) : helperMissing.call(depth0, "t", "_delete_this_group", options))));
  data.buffer.push("</a> \n        ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n            <li><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doNewSurvey", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addSurvey\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_create_a_new_survey", options) : helperMissing.call(depth0, "t", "_create_a_new_survey", options))));
  data.buffer.push("</a></li>\n          ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <p class=\"surveyLandingText\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_intro_text", options) : helperMissing.call(depth0, "t", "_survey_intro_text", options))));
  data.buffer.push("</p>\n    ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push(" \n        ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyGroupSurveyView", {hash:{
    'contentBinding': ("survey")
  },inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n          <li class=\"aSurvey waterPoint\">\n            <h2 class=\"\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\n            <ul class=\"surveyInfo floats-in\">\n              <li class=\"dateCreated\"> <span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_created", options) : helperMissing.call(depth0, "t", "_created", options))));
  data.buffer.push("</span>\n                <time>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("<time>\n              </li>\n              <li class=\"responseNumber\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "survey.instanceCount", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                <p>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_responses", options) : helperMissing.call(depth0, "t", "_responses", options))));
  data.buffer.push("</p>\n              </li>\n            </ul>\n            <dl class=\"floats-in\">\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_modified", options) : helperMissing.call(depth0, "t", "_modified", options))));
  data.buffer.push("</dt>\n              <dd>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</dd>\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_type", options) : helperMissing.call(depth0, "t", "_type", options))));
  data.buffer.push("</dt>\n              <dd>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</dd>\n              <dt>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_language", options) : helperMissing.call(depth0, "t", "_language", options))));
  data.buffer.push("</dt>\n              <dd>");
  hashTypes = {};
  stack2 = helpers['with'].call(depth0, "survey", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</dd>\n            </dl>\n            <nav>\n              <ul>              \n                <li class=\"editSurvey\"><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEditSurvey", "survey", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a></li> <!-- this hands control over to the router -->\n                <li class=\"previewSurvey\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "previewSurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_preview", options) : helperMissing.call(depth0, "t", "_preview", options))));
  data.buffer.push("</a></li>\n                <li class=\"deleteSurvey\"> <a  ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delS", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a> </li>\n                <li class=\"copySurvey\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "copySurvey", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copy", options) : helperMissing.call(depth0, "t", "_copy", options))));
  data.buffer.push("</a></li>\n              </ul>\n            </nav>\n          </li>\n        ");
  return buffer;
  }
function program19(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date),stack1 ? stack1.call(depth0, "createdDateTime", options) : helperMissing.call(depth0, "date", "createdDateTime", options))));
  }

function program21(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.date),stack1 ? stack1.call(depth0, "lastUpdateDateTime", options) : helperMissing.call(depth0, "date", "lastUpdateDateTime", options))));
  }

function program23(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.toPointType),stack1 ? stack1.call(depth0, "pointType", options) : helperMissing.call(depth0, "toPointType", "pointType", options))));
  }

function program25(depth0,data) {
  
  var stack1, hashTypes, options;
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.toLanguage),stack1 ? stack1.call(depth0, "defaultLanguageCode", options) : helperMissing.call(depth0, "toLanguage", "defaultLanguageCode", options))));
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.SurveyGroupMainView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["navSurveys/nav-surveys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n      ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.PreviewView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<section id=\"main\" class=\"surveySection floats-in\" role=\"main\">\n  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</section>\n\n<div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("FLOW.previewControl.showPreviewPopup:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n  <div class=\"blanketWide\"></div>\n  <div class=\"dialogWrap\">\n     <div class=\"confirmDialog dialogWide\">\n    <!-- the dialog contents -->\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.previewControl.showPreviewPopup", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/preview-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n <div class=\"questionGroupBlock\">\n   <header> <span class=\"qtnGroupHead\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_group", options) : helperMissing.call(depth0, "t", "_group", options))));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QG.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n     <h3 class=\"qtnGroupTitle\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "QG.code", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n     <div class=\"innerContent\"> \n       ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.PreviewQuestionGroupView", {hash:{
    'contentBinding': ("QG")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n     </div>\n </div>    \n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n         ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "Q", "in", "view.QGcontent", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n       ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n           ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.PreviewQuestionView", {hash:{
    'contentBinding': ("Q")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n             ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isVisible", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n			 <div class=\"previewQuestion\"> \n                <h1 class=\"questionNbr\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Q.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Q.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n                    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isOptionType", {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("    \n                </div>\n              ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                       ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "view.optionsList", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                       <!-- FIXME this should be checkbuttons if Allow Multiple is true -->\n                          ");
  hashTypes = {'title': "ID",'option': "ID",'group': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.RadioButton", {hash:{
    'title': ("value"),
    'option': ("value"),
    'group': ("options"),
    'valueBinding': ("view.optionChoice")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                        ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isNumberType", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.answer"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                      ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                        ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isTextType", {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.answer"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                          ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isDateType", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push(" \n                             ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "FLOW.DateField2", {hash:{
    'valueBinding': ("view.answer"),
    'size': (30)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                          ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                            ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isGeoType", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                          ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n							\n                              <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_gps_of_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_gps_of_the_device_is_used_here", options))));
  data.buffer.push("</h3>\n                              <h4>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_latitude", options) : helperMissing.call(depth0, "t", "_latitude", options))));
  data.buffer.push(":</h4> ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.latitude"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              <h4>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_longitude", options) : helperMissing.call(depth0, "t", "_longitude", options))));
  data.buffer.push(":</h4> ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.longitude"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                              ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isBarcodeType", {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_barcode_app_on_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_barcode_app_on_the_device_is_used_here", options))));
  data.buffer.push("</h3>\n                                ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.answer"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                                ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isPhotoType", {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                              ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                  <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_camera_of_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_camera_of_the_device_is_used_here", options))));
  data.buffer.push("</h3>\n                                ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n                                  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.isVideoType", {hash:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                                    <h3>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_the_video_camera_of_the_device_is_used_here", options) : helperMissing.call(depth0, "t", "_the_video_camera_of_the_device_is_used_here", options))));
  data.buffer.push("</h3>   \n                                  ");
  return buffer;
  }

  data.buffer.push("<div class=\"fixedMenu\"><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "closePreviewPopup", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok clodeDialog\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_close_window", options) : helperMissing.call(depth0, "t", "_close_window", options))));
  data.buffer.push("</a>\n<h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_survey_preview", options) : helperMissing.call(depth0, "t", "_survey_preview", options))));
  data.buffer.push("</h2></div>\n<div class=\"surveyPreviewWrap\">\n");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "QG", "in", "FLOW.questionGroupControl", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["navSurveys/question-view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n\n<div class=\"innerContent\" id=\"innerContent_01\">\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.amOpenQuestion", {hash:{},inverse:self.program(17, program17, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n  </div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n    <h1 class=\"questionNbr\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n    <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question_text", options) : helperMissing.call(depth0, "t", "_question_text", options))));
  data.buffer.push(": ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.text"),
    'size': (100)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n    <label>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question_help_tooltip", options) : helperMissing.call(depth0, "t", "_question_help_tooltip", options))));
  data.buffer.push(": <span class=\"fadedText\">(");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_optional", options) : helperMissing.call(depth0, "t", "_optional", options))));
  data.buffer.push(")</span> ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.tip"),
    'size': (100)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n \n    <label class=\"labelcheckbox\">");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.mandatoryFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_mandatory", options) : helperMissing.call(depth0, "t", "_mandatory", options))));
  data.buffer.push("</label>\n    <label class=\"selectinLabel\"><span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_tag", options) : helperMissing.call(depth0, "t", "_tag", options))));
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.tooltip),stack1 ? stack1.call(depth0, "_what_is_tag", options) : helperMissing.call(depth0, "tooltip", "_what_is_tag", options))));
  data.buffer.push(":</span> ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeControl.content"),
    'optionLabelPath': ("content.name"),
    'optionValuePath': ("content.keyId"),
    'selectionBinding': ("view.attribute"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_tag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n	   <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddAttributeDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addAttribute\"><span>+</span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_tag", options) : helperMissing.call(depth0, "t", "_add_tag", options))));
  data.buffer.push(" </a> </label>\n      ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.attribute", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    <label class=\"selectinLabel\"><span>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_question_type", options) : helperMissing.call(depth0, "t", "_question_type", options))));
  data.buffer.push(":</span> ");
  hashTypes = {'contentBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'selectionBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.questionTypeControl.content"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'selectionBinding': ("view.type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </label>\n  \n    <!-- Question specific material --> \n<div class=\"questionOption floats-in\">\n\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amOptionType", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("                 \n    \n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amNumberType", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n\n    ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.amNoOptionsType", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n</div>\n<div class=\"dependencyBlock\">\n    <label class=\"labelcheckbox\">");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.dependentFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_dependent", options) : helperMissing.call(depth0, "t", "_dependent", options))));
  data.buffer.push("\n    </label>\n\n     ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.dependentFlag", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n     ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "view.dependentFlag", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</div>\n<!-- add attribute dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddAttributeDialogBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_attribute", options) : helperMissing.call(depth0, "t", "_add_attribute", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">Please provide a name, an optional group, and a value type for the attribute</p>\n          <br/>\n         <label for=\"newAttributeName\">Attribute name:</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeName"),
    'id': ("newAttributeName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         <label for=\"newAttributeGroup\">Group:</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.newAttributeGroup"),
    'id': ("newAttributeGroup"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          <label>Value type:</label>\n             ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.attributeTypeControl.content"),
    'selectionBinding': ("view.newAttributeType"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_value_type")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">SAVE</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddAttribute", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">CANCEL</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- End question specific material -->\n    <nav>\n      <ul>\n        <li><a class=\"standardBtn\" id=\"standardBtn_01\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSaveEditQuestion", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save Question</a> </li>\n        <li><a class=\"\" id=\"standardBtn_01\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doCancelEditQuestion", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</a> </li>\n      </ul>\n    </nav>\n  ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<label class=\"labelcheckbox\">");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.includeInMap")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_include_in_map", options) : helperMissing.call(depth0, "t", "_include_in_map", options))));
  data.buffer.push("</label>");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <h1 class=\"answerNbr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_option_details", options) : helperMissing.call(depth0, "t", "_option_details", options))));
  data.buffer.push(": </h1>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowMultipleFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_multiple", options) : helperMissing.call(depth0, "t", "_allow_multiple", options))));
  data.buffer.push(" </label>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowOtherFlag")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_other", options) : helperMissing.call(depth0, "t", "_allow_other", options))));
  data.buffer.push(" </label>\n      <br>\n      <p><strong>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_options", options) : helperMissing.call(depth0, "t", "_options", options))));
  data.buffer.push(":&nbsp;</strong><span class=\"fadedText\"> (");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_enter_each_choice_on_a_separate_line", options) : helperMissing.call(depth0, "t", "_enter_each_choice_on_a_separate_line", options))));
  data.buffer.push(")</span> </p>\n      ");
  hashTypes = {'valueBinding': "STRING",'size': "STRING",'rows': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("view.optionList"),
    'size': ("100"),
    'rows': ("7")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  \n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n	  <h1 class=\"answerNbr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_number_details", options) : helperMissing.call(depth0, "t", "_number_details", options))));
  data.buffer.push(": </h1>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowSign")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_sign", options) : helperMissing.call(depth0, "t", "_allow_sign", options))));
  data.buffer.push(" </label>\n      <label class=\"labelcheckbox\"> ");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("view.allowDecimal")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_allow_decimal_point", options) : helperMissing.call(depth0, "t", "_allow_decimal_point", options))));
  data.buffer.push(" </label>\n\n      <label class=\"minValNumb\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_min_val", options) : helperMissing.call(depth0, "t", "_min_val", options))));
  data.buffer.push(": ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.minVal"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n      <label class=\"maxValNumb\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_max_val", options) : helperMissing.call(depth0, "t", "_max_val", options))));
  data.buffer.push(": ");
  hashTypes = {'valueBinding': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.maxVal"),
    'size': (10)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n		<p class=\"noOptions\">\n		  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_no_options_for_this_question_type", options) : helperMissing.call(depth0, "t", "_no_options_for_this_question_type", options))));
  data.buffer.push("\n		</p>\n    ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n    <label class=\"selectinLabel dependencySelect\"> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_dependent_question", options) : helperMissing.call(depth0, "t", "_dependent_question", options))));
  data.buffer.push(":\n        ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.questionControl.earlierOptionQuestions"),
    'selectionBinding': ("FLOW.selectedControl.dependentQuestion"),
    'optionLabelPath': ("content.text"),
    'optionValuePath': ("content.keyId"),
    'prompt': ("Select question")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n    ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "FLOW.selectedControl.dependentQuestion", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n     <div class=\"qDependency\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_answer_of_dependent_question", options) : helperMissing.call(depth0, "t", "_answer_of_dependent_question", options))));
  data.buffer.push(":</div>\n      ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "item", "in", "FLOW.optionListControl.content", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        <label>");
  hashTypes = {'checkedBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Checkbox", {hash:{
    'checkedBinding': ("item.isSelected")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n      ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("   \n    <!-- nav is only displayed if question is closed -->\n    <nav class=\"smallMenu\">\n      <ul>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delQ", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"deleteQuestion\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_delete", options) : helperMissing.call(depth0, "t", "_delete", options))));
  data.buffer.push("</a> </li>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionCopy", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"copyQuestion\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_copy", options) : helperMissing.call(depth0, "t", "_copy", options))));
  data.buffer.push("</a></li>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionMove", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"moveQuestion\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move", options) : helperMissing.call(depth0, "t", "_move", options))));
  data.buffer.push("</a></li>\n        <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionEdit", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"editQuestion\" id=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a></li>\n      </ul>\n    </nav>\n    <h1 class=\"questionNbr\"><span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.order", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </span>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n\n  ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      <nav class=\"moveQMenu questionActionMenu\">\n        <ul>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionMoveHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_move_question_here", options) : helperMissing.call(depth0, "t", "_move_question_here", options))));
  data.buffer.push("</a></li>\n          <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionMoveCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n        </ul>\n      </nav>\n    ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("   \n      ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForCopy", {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n    ");
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n        <nav class=\"copyQMenu questionActionMenu\">\n          <ul>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionCopyHere", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_paste_question_here", options) : helperMissing.call(depth0, "t", "_paste_question_here", options))));
  data.buffer.push("</a></li>\n            <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doQuestionCopyCancel", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n          </ul>\n        </nav>\n       ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push(" \n         <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doInsertQuestion", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"addQuestion\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_question", options) : helperMissing.call(depth0, "t", "_add_new_question", options))));
  data.buffer.push("</a> \n      ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.unless.call(depth0, "view.zeroItemQuestion", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <div>\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.oneSelectedForMove", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n  </div>\n\n\n \n");
  return buffer;
  
});

Ember.TEMPLATES["navUsers/nav-users"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n<!-- Available roles: ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_ADMIN", options) : helperMissing.call(depth0, "t", "_ADMIN", options))));
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_SUPER_ADMIN", options) : helperMissing.call(depth0, "t", "_SUPER_ADMIN", options))));
  data.buffer.push(" ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_USER", options) : helperMissing.call(depth0, "t", "_USER", options))));
  data.buffer.push(" -->\n<div class=\"greyBg\">\n  <section id=\"\" class=\"fullWidth usersList\"> \n	<h1>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_manage_users_and_user_rights", options) : helperMissing.call(depth0, "t", "_manage_users_and_user_rights", options))));
  data.buffer.push("</h1>\n <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showAddUserDialog", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push("class=\"standardBtn btnAboveTable\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_user", options) : helperMissing.call(depth0, "t", "_add_new_user", options))));
  data.buffer.push("</a>\n    <!-- userS TABLE-->\n    <table id=\"usersListTable\" class=\"dataTable\" >\n      <!-- TABLE HEADER-->\n      <thead>\n        <tr>\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("userName"),
    'type': ("user")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("emailAddress"),
    'type': ("user")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {'item': "STRING",'type': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.ColumnView", {hash:{
    'item': ("permissionList"),
    'type': ("user")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          <th class=\"action noArrows\" >");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_actions", options) : helperMissing.call(depth0, "t", "_actions", options))));
  data.buffer.push("</th>\n        </tr>\n      </thead>\n      <!-- TABLE BODY: MAIN CONTENT-->\n      <tbody>\n        ");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "user", "in", "FLOW.userControl", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </tbody>\n      \n      <!-- TABLE FOOTER-->\n      <tfoot>\n        <tr>\n          <td colspan=\"7\"><small>This is the footer.</small></td>\n        </tr>\n      </tfoot>\n    </table>\n  </section>\n</div>\n\n   <!-- new user dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showAddUserBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_add_new_user", options) : helperMissing.call(depth0, "t", "_add_new_user", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_provide_a_user_name_", options) : helperMissing.call(depth0, "t", "_please_provide_a_user_name_", options))));
  data.buffer.push(".</p>\n          \n          <label for=\"newUserName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_username", options) : helperMissing.call(depth0, "t", "_username", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.newUserName"),
    'id': ("newUserName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"newEmail\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email_address", options) : helperMissing.call(depth0, "t", "_email_address", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.newEmailAddress"),
    'id': ("newEmail"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n          \n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.permissionLevelControl.content"),
    'selectionBinding': ("FLOW.editControl.newPermissionLevel"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_permission_level")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doAddUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAddUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n      <!-- edit existing user dialog-->\n    <div ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.showEditUserBool:display :overlay")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      <div class=\"blanket\"></div>\n          <div class=\"dialogWrap\">\n        <!-- the dialog contents -->\n        <div class=\"confirmDialog dialog\">\n          <h2>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit_user", options) : helperMissing.call(depth0, "t", "_edit_user", options))));
  data.buffer.push("</h2>\n          <p class=\"dialogMsg\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_please_edit_the_username_", options) : helperMissing.call(depth0, "t", "_please_edit_the_username_", options))));
  data.buffer.push(".</p>\n          <label for=\"editUserName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_username", options) : helperMissing.call(depth0, "t", "_username", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editUserName"),
    'id': ("editUserName"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n           <label for=\"editEmail\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email_address", options) : helperMissing.call(depth0, "t", "_email_address", options))));
  data.buffer.push(":</label> ");
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'size': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("FLOW.editControl.editEmailAddress"),
    'id': ("editEmail"),
    'size': (40)
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br/>\n          \n            ");
  hashTypes = {'contentBinding': "STRING",'selectionBinding': "STRING",'optionLabelPath': "STRING",'optionValuePath': "STRING",'prompt': "STRING",'promptBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("FLOW.permissionLevelControl.content"),
    'selectionBinding': ("FLOW.editControl.editPermissionLevel"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'prompt': (""),
    'promptBinding': ("Ember.STRINGS._select_permission_level")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n \n          <div class=\"buttons menuCentre\"> \n            <ul>  \n               <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doEditUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"ok smallBtn\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_save", options) : helperMissing.call(depth0, "t", "_save", options))));
  data.buffer.push("</a></li>\n              <li><a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelEditUser", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"cancel\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_cancel", options) : helperMissing.call(depth0, "t", "_cancel", options))));
  data.buffer.push("</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"userName\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_user_name", options) : helperMissing.call(depth0, "t", "_user_name", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"emailAdr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_email", options) : helperMissing.call(depth0, "t", "_email", options))));
  data.buffer.push("</a>\n           ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n                  <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sort", {hash:{
    'target': ("this")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"emailAdr\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_permission_level", options) : helperMissing.call(depth0, "t", "_permission_level", options))));
  data.buffer.push("</a>\n                  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.tooltip),stack1 ? stack1.call(depth0, "_there_are_three_permission_levels", options) : helperMissing.call(depth0, "tooltip", "_there_are_three_permission_levels", options))));
  data.buffer.push("\n           ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n        \n          <tr>\n            <td class=\"userName\" style=\"text-align:left; padding:0 0 0 20px;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.userName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            <td class=\"emailAdr\" style=\"text-align:left;\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.emailAddress", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, "FLOW.SingleUserView", {hash:{
    'contentBinding': ("user")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <td class=\"action\"> <a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showEditUserDialog", "user", {hash:{
    'target': ("this")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"edit\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_edit", options) : helperMissing.call(depth0, "t", "_edit", options))));
  data.buffer.push("</a> ");
  hashTypes = {'contentBinding': "STRING"};
  stack2 = helpers.view.call(depth0, "FLOW.UserView", {hash:{
    'contentBinding': ("user")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        \n            </td>\n          </tr>\n         \n        ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n              <span ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("view.roleClass")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.roleLabel", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n             ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("<a ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", "FLOW.dialogControl.delUser", {hash:{
    'target': ("FLOW.dialogControl")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"remove\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "_remove", options) : helperMissing.call(depth0, "t", "_remove", options))));
  data.buffer.push("</a>");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers.view.call(depth0, "FLOW.UserListView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});});
define('views/maps/map-views-common', [
  'app'
], function(FLOW) {
  
  /**
    View that handles map page.
    Definition:
      "placemark" is an FLOW object that represents a single survey point.
      "marker" is a map object that is rendered as a pin. Each marker have
        a placemark counterpart.
  **/


  FLOW.NavMapsView = FLOW.View.extend({
    // templateName: 'navMaps/nav-maps',
    templateName: 'navMaps/nav-maps-common',
    showDetailsBool: false,
    detailsPaneElements: null,
    detailsPaneVisible: null,


    init: function() {
      this._super();
      this.detailsPaneElements = "#pointDetails h2" +
        ", #pointDetails dl" +
        ", #pointDetails img" +
        ", #pointDetails .imgContainer" +
        ", .placeMarkBasicInfo" +
        ", .noDetails";
      this.detailsPaneVisible = true;
    },


    /**
      Create the map once in DOM
    */
    didInsertElement: function() {
      var map = new mxn.Mapstraction('flowMap', 'google', true),
        latLon = new mxn.LatLonPoint(-0.703107, 36.765747),
        self;

      map.addControls({
        pan: true,
        zoom: 'small',
        map_type: true
      });

      map.setCenterAndZoom(latLon, 2);
      map.enableScrollWheelZoom();
      FLOW.placemarkController.set('map', map);

      self = this;
      this.$('#mapDetailsHideShow').click(function () {
        self.handleShowHideDetails();
      });
      // Slide in detailspane after 1 sec
      this.hideDetailsPane(1000);
    },


    /**

    */
    positionMap: function() {
      var country, latLon, map;

      country = FLOW.countryController.get('country');
      map = FLOW.placemarkController.get('map');
      if (!Ember.none(country)) {
        latLon = new mxn.LatLonPoint(country.get('lat'), country.get('lon'));
        map.getMap().clearOverlays();
        map.setCenterAndZoom(latLon, country.get('zoom'));
      }
    }.observes('FLOW.countryController.country'),


    /**
      Populate the map with markers
    */
    populateMap: function() {
      var map;

      if(FLOW.placemarkController.content.get('isUpdating') === false) {
        map = FLOW.placemarkController.get('map');
        FLOW.placemarkController.get('content').forEach(function(placemark) {
          map.addMarker(this.createMarker(placemark));
        }, this);
      }
    }.observes('FLOW.placemarkController.content.isUpdating'),


    /**

    */
    handleShowHideDetails: function () {
      if (this.detailsPaneVisible) {
        this.hideDetailsPane();
      } else {
        this.showDetailsPane();
      }
    },


    /**
      Handle placemark selection
    */
    handlePlacemarkDetails: function() {
      var details;

      details = FLOW.placemarkDetailController.get('content');

      if (!this.detailsPaneVisible) {
        this.showDetailsPane();
      }
      if (!Ember.empty(details) && details.get('isLoaded')) {
        this.populateDetailsPane(details);
      }
    }.observes('FLOW.placemarkDetailController.content.isLoaded'),


    /**
      Slide in the details pane
    */
    showDetailsPane: function() {
      var button;

      button = this.$('#mapDetailsHideShow');
      button.html('Hide &rsaquo;');
      this.set('detailsPaneVisible', true);

      this.$('#flowMap').animate({
        width: '75%'
      }, 200);
      this.$('#pointDetails').animate({
        width: '24.5%'
      }, 200).css({
        overflow: 'auto',
        marginLeft: '-2px'
      });
      this.$(this.detailsPaneElements, '#pointDetails').animate({
        opacity: '1'
      }, 200).css({
        display: 'inherit'
      });
    },


    /**
      Populates the details pane with data from a placemark
    */
    populateDetailsPane: function (details) {
      var rawImagePath, verticalBars;

      this.set('showDetailsBool', true);
      details.forEach(function(item) {
        rawImagePath = item.get('stringValue');
        verticalBars = rawImagePath.split('|');
        if (verticalBars.length === 4) {
          FLOW.placemarkDetailController.set('selectedPointCode', verticalBars[3]);
        }
      }, this);
    },


    /**
      Slide out details pane
    */
    hideDetailsPane: function(delay) {
      var button;

      delay = typeof delay !== 'undefined' ? delay : 0;
      button = this.$('#mapDetailsHideShow');

      this.set('detailsPaneVisible', false);
      button.html('&lsaquo; Show');

      this.$('#flowMap').delay(delay).animate({
        width: '99.25%'
      }, 200);
      this.$('#pointDetails').delay(delay).animate({
        width: '0.25%'
      }, 200).css({
        overflow: 'scroll-y',
        marginLeft: '-2px'
      });
      this.$(this.detailsPaneElements, '#pointDetails').delay(delay).animate({
        opacity: '0',
        display: 'none'
      });//.css({

      //});
    },


    /**
         Returns a marker(pin on the map) to represent the placemarker
      **/
    createMarker: function(placemark) {
      // Create a marker
      var point = new mxn.LatLonPoint(placemark.get('latitude'),
                                      placemark.get('longitude')),
        marker = new mxn.Marker(point);

      marker.setIcon('/images/maps/blueMarker.png');
      marker.placemark = placemark;

      // Add a click handler that handles what happens when marker is clicked
      placemark.addMarkerClickHandler = function(marker) {
        var clickHandler = function(event_name, event_source, event_args) {
          /*jshint unused: true*/
          event_source.placemark.handleClick(event_source.placemark.marker);
          void(event_args); // Until unused:true is honored by JSHint
        };
        marker.click.addHandler(clickHandler);
      };


      /**
          When a marker is clicked we do different thing depending on
          the state of the map. E.g. if the same marker is clicked we deselect
          that marker and no marker is selected.
        **/
      placemark.handleClick = function(marker) {
        var oldSelected;

        marker.placemark.toggleMarker(marker.placemark);

        oldSelected = FLOW.placemarkController.get('selected');
        if(Ember.none(oldSelected)) {
          FLOW.placemarkController.set('selected', placemark);
        } else {
          if(this.marker === oldSelected.marker) {
            FLOW.placemarkController.set('selected', undefined);
          } else {
            oldSelected.toggleMarker(oldSelected);
            FLOW.placemarkController.set('selected', placemark);
          }
        }
      };


      /**
          Toggle between selected and deselected marker.
          In reality there is no toggle but delete and create
        **/
      placemark.toggleMarker = function(placemark) {
        var map = FLOW.placemarkController.get('map');
        var point = new mxn.LatLonPoint(placemark.get('latitude'),
                                        placemark.get('longitude')),
          newMarker = new mxn.Marker(point);

        if(placemark.marker.iconUrl === ('/images/maps/blueMarker.png')) {
          newMarker.iconUrl = '/images/maps/redMarker.png' ;
        } else {
          newMarker.iconUrl = '/images/maps/blueMarker.png';
        }

        placemark.addMarkerClickHandler(newMarker);
        map.addMarker(newMarker);
        map.removeMarker(placemark.marker);
        newMarker.placemark = placemark;

        placemark.set('marker', newMarker);
      },

      placemark.addMarkerClickHandler(marker, placemark);
      // Attach the new marker to the placemarker object
      placemark.set('marker', marker);
      return marker;
    }

  });


  FLOW.countryView = FLOW.View.extend({});

  FLOW.PlacemarkDetailView = Ember.View.extend({});
  FLOW.PlacemarkDetailPhotoView = Ember.View.extend({});

});

define('views/surveys/preview-view', [
  'app'
], function(FLOW) {
  FLOW.PreviewView = FLOW.View.extend({
    templateName: 'navSurveys/preview-view',

    closePreviewPopup: function() {
      FLOW.previewControl.set('showPreviewPopup', false);
    }

  });

  FLOW.PreviewQuestionGroupView = FLOW.View.extend({
    QGcontent: null,

    init: function() {
      var qgId;
      this._super();
      qgId = this.content.get('keyId');
      this.set('QGcontent', FLOW.store.filter(FLOW.Question, function(item) {
        return(item.get('questionGroupId') == qgId);
      }));
    }
  });

  FLOW.PreviewQuestionView = FLOW.View.extend({
    isTextType: false,
    isOptionType: false,
    isNumberType: false,
    isPhotoType: false,
    isVideoType: false,
    isBarcodeType: false,
    isGeoType: false,
    isDateType:false,
    isVisible:true,
    optionsList:[],
    optionChoice:null,
    answer:null,
    latitude:null,
    longitude:null,

    init: function() {
      var opList, opListArray, i, sizeList;
      this._super();

      this.set('isTextType',this.content.get('type') == 'FREE_TEXT');
      this.set('isOptionType',this.content.get('type') == 'OPTION');
      this.set('isNumberType',this.content.get('type') == 'NUMBER');
      this.set('isPhotoType',this.content.get('type') == 'PHOTO');
      this.set('isVideoType',this.content.get('type') == 'VIDEO');
      this.set('isBarcodeType',this.content.get('type') == 'BARCODE');
      this.set('isGeoType',this.content.get('type') == 'GEO');
      this.set('isDateType',this.content.get('type') == 'DATE');

      // fill option list
      if(this.isOptionType && this.content.get('optionList') !== null) {
        this.set('optionsList',[]);
        opList = this.content.get('optionList');
        opListArray = opList.split('\n');
        sizeList = opListArray.length;

        for(i = 0; i < sizeList; i++) {
          this.get('optionsList').push(Ember.Object.create({
            isSelected: false,
            value: opListArray[i]
          }));
        }
      }
    },

    checkVisibility: function () {
      var dependentAnswerArray;
      if(this.content.get('dependentFlag') && this.content.get('dependentQuestionId') !== null){
        dependentAnswerArray = this.content.get('dependentQuestionAnswer').split('|');
        if(dependentAnswerArray.indexOf(FLOW.previewControl.answers[this.content.get('dependentQuestionId')]) > -1){
          this.set('isVisible',true);
        } else {
          this.set('isVisible',false);
        }
      }
    }.observes('FLOW.previewControl.changed'),

    storeOptionChoice:function () {
      var keyId;
      keyId = this.content.get('keyId');
      FLOW.previewControl.answers[keyId] = this.get('optionChoice');
      FLOW.previewControl.toggleProperty('changed');
    }.observes('this.optionChoice'),

    storeAnswer:function () {
      var keyId;
      keyId = this.content.get('keyId');
      FLOW.previewControl.answers[keyId] = this.get('answer');
    }.observes('this.answer')
  });

});
define('views/surveys/notifications-view', [
  'app'
], function(FLOW) {
  FLOW.NotificationsView = FLOW.View.extend({
    notificationOption: null,
    notificationType: null,
    expiryDate: null,
    notificationDestination: null,
    optionEmpty: false,
    typeEmpty: false,
    destinationEmpty: false,
    dateEmpty: false,

    addNotification: function() {
      var date;

      this.set('optionEmpty', Ember.none(this.get('notificationOption')));
      this.set('typeEmpty', Ember.none(this.get('notificationType')));
      this.set('destinationEmpty', Ember.none(this.get('notificationDestination')));
      this.set('dateEmpty', Ember.none(this.get('expiryDate')));

      if(Ember.none(this.get('expiryDate'))) {
        date = null;
      } else {
        date = Date.parse(this.get('expiryDate'));
      }
      if(this.get('optionEmpty') || this.get('typeEmpty') || this.get('destinationEmpty') || this.get('dateEmpty')) {
        // do nothing
      } else {
        FLOW.store.createRecord(FLOW.NotificationSubscription, {
          "notificationOption": this.notificationOption.get('value'),
          "notificationType": this.notificationType.get('value'),
          "expiryDate": date,
          "notificationDestination": this.get('notificationDestination'),
          "notificationMethod": "EMAIL",
          "entityId": FLOW.selectedControl.selectedSurvey.get('keyId')
        });
        this.set('notificationOption', null);
        this.set('notificationType', null);
        this.set('notificationDestination', null);
        this.set('expiryDate', null);
        FLOW.store.commit();
      }
    },

    cancelNotification: function() {
      this.set('notificationEvent', null);
      this.set('notificationType', null);
      this.set('notificationDestination', null);
      this.set('expiryDate', null);
    },

    closeNotifications: function(router, event) {
      FLOW.router.transitionTo('navSurveys.navSurveysEdit.editQuestions');
    },

    removeNotification: function(event) {
      var nDeleteId, notification;
      nDeleteId = event.context.get('keyId');

      notification = FLOW.store.find(FLOW.NotificationSubscription, nDeleteId);
      notification.deleteRecord();
      FLOW.store.commit();
    }
  });

});
define('views/surveys/survey-group-views', [
  'app'
], function(FLOW) {
	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// displays survey groups in left sidebar
	FLOW.SurveyGroupMenuItemView = FLOW.View.extend({
		content: null,
		tagName: 'li',
		classNameBindings: 'amSelected:current'.w(),

		// true if the survey group is selected. Used to set proper display class
		amSelected: function() {
			var selected = FLOW.selectedControl.get('selectedSurveyGroup');
			if(selected) {
				var amSelected = (this.content.get('keyId') === FLOW.selectedControl.selectedSurveyGroup.get('keyId'));
				return amSelected;
			} else {
				return null;
			}
		}.property('FLOW.selectedControl.selectedSurveyGroup', 'content').cacheable(),

		// fired when a survey group is clicked
		makeSelected: function() {
			FLOW.selectedControl.set('selectedSurveyGroup', this.content);
		}
	});

	// displays single survey in content area of survey group page
	// doEditSurvey is defined in the Router. It transfers to the nav-surveys-edit handlebar view
	FLOW.SurveyGroupSurveyView = FLOW.View.extend({
		// fired when 'preview survey' is clicked in the survey item display
		previewSurvey: function() {
			FLOW.selectedControl.set('selectedSurvey', this.content);
			FLOW.questionGroupControl.populate();
			FLOW.questionControl.populateAllQuestions();
			FLOW.previewControl.set('showPreviewPopup', true);
		},

		// fired when 'delete survey' is clicked in the survey item display
		deleteSurvey: function() {
			var sId = this.content.get('id');
			var survey = FLOW.store.find(FLOW.Survey, sId);

			// do preflight check if deleting this survey is allowed
			// if successful, the deletion action will be called from DS.FLOWrestadaptor.sideload
			FLOW.store.findQuery(FLOW.Survey, {
	      preflight: 'delete',
	      surveyId: sId
	    });
		},

		// fired when 'inspect data' is clicked in the survey item display
		inspectData: function() {
			console.log("TODO inspect Data");
		},

		copySurvey: function() {
			FLOW.store.createRecord(FLOW.Survey, {
				sourceId: this.content.get('id')
			});
			FLOW.store.commit();
		}
	});

	// handles all survey-group interaction elements on survey group page
	FLOW.SurveyGroupMainView = FLOW.View.extend({
		showEditField: false,
		showNewGroupField: false,
		surveyGroupName: null,
		showSGDeleteDialog: false,
		showSGDeleteNotPossibleDialog: false,

		// true if at least one survey group is active
		oneSelected: function() {
			var selected = FLOW.selectedControl.get('selectedSurveyGroup');
			if(selected) {
				return true;
			} else {
				return false;
			}
		}.property('FLOW.selectedControl.selectedSurveyGroup'),

		// fired when 'edit name' is clicked, shows edit field to change survey group name
		editSurveyGroupName: function() {
			this.set('surveyGroupName', FLOW.selectedControl.selectedSurveyGroup.get('code'));
			this.set('showEditField', true);
		},

		// fired when 'save' is clicked while showing edit group name field. Saves the new group name
		saveSurveyGroupNameEdit: function() {
			var sgId = FLOW.selectedControl.selectedSurveyGroup.get('id');
			var surveyGroup = FLOW.store.find(FLOW.SurveyGroup, sgId);
			surveyGroup.set('code', capitaliseFirstLetter(this.get('surveyGroupName')));
			surveyGroup.set('name', capitaliseFirstLetter(this.get('surveyGroupName')));
			FLOW.store.commit();
			FLOW.selectedControl.set('selectedSurveyGroup', FLOW.store.find(FLOW.SurveyGroup, sgId));
			this.set('showEditField', false);
		},

		// fired when 'cancel' is clicked while showing edit group name field. Cancels the edit.
		cancelSurveyGroupNameEdit: function() {
			this.set('surveyGroupName', FLOW.selectedControl.selectedSurveyGroup.get('code'));
			this.set('showEditField', false);
		},


		// fired when 'add a group' is clicked. Displays a new group text field in the left sidebar
		addGroup: function() {
			FLOW.selectedControl.set('selectedSurveyGroup', null);
			this.set('surveyGroupName', null);
			this.set('showNewGroupField', true);
		},

		deleteSurveyGroup: function() {
			var sgId = FLOW.selectedControl.selectedSurveyGroup.get('id');
			var surveyGroup = FLOW.store.find(FLOW.SurveyGroup, sgId);
			
			// do preflight check if deleting this survey is allowed
			// if successful, the deletion action will be called from DS.FLOWrestadaptor.sideload
			FLOW.store.findQuery(FLOW.SurveyGroup, {
	      preflight: 'delete',
	      surveyGroupId: sgId
	    });
		},

		// fired when 'save' is clicked while showing new group text field in left sidebar. Saves new survey group to the data store
		saveNewSurveyGroupName: function() {
			FLOW.store.createRecord(FLOW.SurveyGroup, {
				"code": capitaliseFirstLetter(this.get('surveyGroupName')),
				"name": capitaliseFirstLetter(this.get('surveyGroupName'))
			});
			FLOW.store.commit();
			this.set('showNewGroupField', false);
		},

		// fired when 'cancel' is clicked while showing new group text field in left sidebar. Cancels the new survey group creation
		cancelNewSurveyGroupName: function() {
			this.set('surveyGroupName', null);
			this.set('showNewGroupField', false);
		}
	});

	FLOW.JavascriptSurveyGroupListView = FLOW.View.extend({
		didInsertElement: function() {
			var menuHeight, scroll;
			this._super();
			$('.scrollUp').addClass("FadeIt");
			$('.scrollUp').click(function() {
				menuHeight = $('.menuGroupWrap').height();
				scroll = $('.menuGroupWrap').scrollTop();
				$('.scrollDown').removeClass("FadeIt");
				$('.menuGroupWrap').animate({
					'scrollTop': scroll - 72
				}, 155);

				//the value used for scroll is the old one
				if(scroll < 73) {
					$('.scrollUp').addClass("FadeIt");
				}
			});
			$('.scrollDown').click(function() {
				menuHeight = $('.menuGroupWrap').height();
				scroll = $('.menuGroupWrap').scrollTop();
				$('.scrollUp').removeClass("FadeIt");
				$('.menuGroupWrap').animate({
					'scrollTop': scroll + 72
				}, 155);
				if(scroll > menuHeight) {
					$('.scrollDown').addClass("FadeIt");
				}
			});
		},

		checkHeight: function() {
			var scroll;

			if(FLOW.surveyGroupControl.content.content.length < 10) {
				$('.scrollDown').addClass("FadeIt");
				$('.scrollUp').addClass("FadeIt");
			} else {
				scroll = $('.menuGroupWrap').scrollTop();
				$('.scrollDown').removeClass("FadeIt");
				if(scroll < 73) {
					$('.scrollUp').addClass("FadeIt");
				} else {
					$('.scrollUp').removeClass("FadeIt");
				}
			}
		}.observes('FLOW.surveyGroupControl.content.content.length')
	});

});
define('views/surveys/survey-details-view', [
  'app'
], function(FLOW) {
	// ************************ Surveys *************************
	// FLOW.SurveySidebarView = FLOW.View.extend({
	FLOW.SurveySidebarView = FLOW.View.extend({
		surveyTitle: null,
		surveyDescription: null,
		surveyPointType: null,
		language: null,
		isDirty: false,

		init: function() {
			var pointType = null,
				language = null;
			this._super();
			this.set('surveyTitle', FLOW.selectedControl.selectedSurvey.get('name'));
			this.set('surveyDescription', FLOW.selectedControl.selectedSurvey.get('description'));

			FLOW.surveyPointTypeControl.get('content').forEach(function(item) {
				if(item.get('value') == FLOW.selectedControl.selectedSurvey.get('pointType')) {
					pointType = item;
				}
			});
			this.set('surveyPointType', pointType);

			FLOW.languageControl.get('content').forEach(function(item) {
				if(item.get('value') == FLOW.selectedControl.selectedSurvey.get('defaultLanguageCode')) {
					language = item;
				}
			});
			this.set('language', language);
		},

		isExistingSurvey: function() {
			return !Ember.none(FLOW.selectedControl.selectedSurvey.get('keyId'));
		}.property('FLOW.selectedControl.selectedSurvey.keyId'),

		setIsDirty: function() {
			var isDirty, survey;
			survey = FLOW.selectedControl.get('selectedSurvey');
			isDirty = this.get('surveyTitle') != survey.get('name');

			if(!Ember.none(this.get('surveyDescription'))) {
				isDirty = isDirty || this.get('surveyDescription') != survey.get('description');
			} else {
				// if we don't have one now, but we had one before, it has also changed
				isDirty = isDirty || !Ember.none(survey.get('surveyDescription'));
			}

			if(!Ember.none(this.get('surveyPointType'))) {
				// if we have a surveyPointType, compare them
				isDirty = isDirty || this.surveyPointType.get('value') != survey.get('pointType');
			} else {
				isDirty = isDirty || this.get('surveyPointType') === null;
				// if we don't have one now, but we had one before, it has also changed
				// TODO - this breaks when the pointType is an old point Type
				//isDirty = isDirty || !Ember.none(survey.get('pointType'));
			}

			if(!Ember.none(this.get('language'))) {
				isDirty = isDirty || this.language.get('value') != survey.get('defaultLanguageCode');
			} else {
				isDirty = isDirty || !Ember.empty(survey.get('defaultLanguageCode'));
			}
			this.set('isDirty', isDirty);
		},

		isPublished: function() {
			return(FLOW.selectedControl.selectedSurvey.get('status') == 'PUBLISHED');
		}.property('FLOW.selectedControl.selectedSurvey.status'),

		numberQuestions: function() {
			if(Ember.none(FLOW.questionControl.get('filterContent'))) {
				return 0;
			}
			return FLOW.questionControl.filterContent.toArray().length;
		}.property('FLOW.questionControl.filterContent.@each'),

		numberQuestionGroups: function() {
			if(Ember.none(FLOW.questionGroupControl.get('content'))) {
				return 0;
			}
			return FLOW.questionGroupControl.content.toArray().length;
		}.property('FLOW.questionGroupControl.content.@each'),

		doSaveSurvey: function() {
			var survey;
			// validation
			if (this.get('surveyPointType') === null){
				FLOW.dialogControl.set('activeAction', 'ignore');
				FLOW.dialogControl.set('header', Ember.String.loc('_survey_type_not_set'));
				FLOW.dialogControl.set('message', Ember.String.loc('_survey_type_not_set_text'));
				FLOW.dialogControl.set('showCANCEL', false);
				FLOW.dialogControl.set('showDialog', true);
				return;
			}

			survey = FLOW.selectedControl.get('selectedSurvey');
			survey.set('name', this.get('surveyTitle'));
			survey.set('code', this.get('surveyTitle'));
			survey.set('status', 'NOT_PUBLISHED');
			survey.set('path', FLOW.selectedControl.selectedSurveyGroup.get('code'));
			survey.set('description', this.get('surveyDescription'));
			if(this.get('surveyPointType') !== null) {
				survey.set('pointType', this.surveyPointType.get('value'));
			} else {
				survey.set('pointType', null);
			}
			if(this.get('language') !== null) {
				survey.set('defaultLanguageCode', this.language.get('value'));
			} else {
				survey.set('defaultLanguageCode', null);
			}
			FLOW.store.commit();
		},

		doPreviewSurvey: function() {
			FLOW.previewControl.set('showPreviewPopup', true);
		},

		doPublishSurvey: function() {
			var survey;
			// validation
			if (this.get('surveyPointType') === null){
				FLOW.dialogControl.set('activeAction', 'ignore');
				FLOW.dialogControl.set('header', Ember.String.loc('_survey_type_not_set'));
				FLOW.dialogControl.set('message', Ember.String.loc('_survey_type_not_set_text'));
				FLOW.dialogControl.set('showCANCEL', false);
				FLOW.dialogControl.set('showDialog', true);
				return;
			}

			// check if survey has unsaved changes
			survey = FLOW.store.find(FLOW.Survey, FLOW.selectedControl.selectedSurvey.get('keyId'));
			this.setIsDirty();
			if(!Ember.none(survey) && this.get('isDirty')) {
				FLOW.dialogControl.set('activeAction', "ignore");
				FLOW.dialogControl.set('header', Ember.String.loc('_you_have_unsaved_changes'));
				FLOW.dialogControl.set('message', Ember.String.loc('_before_publishing_'));
				FLOW.dialogControl.set('showCANCEL', false);
				FLOW.dialogControl.set('showDialog', true);

			} else {
				FLOW.surveyControl.publishSurvey();
				FLOW.dialogControl.set('activeAction', "ignore");
				FLOW.dialogControl.set('header', Ember.String.loc('_publishing_survey'));
				FLOW.dialogControl.set('message', Ember.String.loc('_survey_published_text_'));
				FLOW.dialogControl.set('showCANCEL', false);
				FLOW.dialogControl.set('showDialog', true);
			}
		},

		doSurveysMain: function() {
			var item;
			// if the survey does not have a keyId, it has not been saved, so delete it.
			if(Ember.none(FLOW.selectedControl.selectedSurvey.get('keyId'))) {
				item = FLOW.selectedControl.get('selectedSurvey');
				item.deleteRecord();
			}
			FLOW.router.transitionTo('navSurveys.navSurveysMain');
		}
	});


	FLOW.QuestionGroupItemView = FLOW.View.extend({
		content: null,
		// question group content comes through binding in handlebars file
		zeroItem: false,
		renderView: false,
		showQGDeletedialog: false,
		showQGroupNameEditField: false,
		questionGroupName: null,

		amVisible: function() {
			var selected, isVis;
			selected = FLOW.selectedControl.get('selectedQuestionGroup');
			if(selected) {

				isVis = (this.content.get('keyId') === FLOW.selectedControl.selectedQuestionGroup.get('keyId'));
				return isVis;
			} else {
				return null;
			}
		}.property('FLOW.selectedControl.selectedQuestionGroup', 'content.keyId').cacheable(),

		toggleVisibility: function() {
			if(this.get('amVisible')) {
				FLOW.selectedControl.set('selectedQuestionGroup', null);
			} else {
				FLOW.selectedControl.set('selectedQuestionGroup', this.content);
			}
		},

		doQGroupNameEdit: function() {
			this.set('questionGroupName', this.content.get('code'));
			this.set('showQGroupNameEditField', true);
		},

		// fired when 'save' is clicked while showing edit group name field. Saves the new group name
		saveQuestionGroupNameEdit: function() {
			var path, qgId, questionGroup;
			qgId = this.content.get('id');
			questionGroup = FLOW.store.find(FLOW.QuestionGroup, qgId);
			path = FLOW.selectedControl.selectedSurveyGroup.get('code') + "/" + FLOW.selectedControl.selectedSurvey.get('name');
			questionGroup.set('code', this.get('questionGroupName'));
			questionGroup.set('name', this.get('questionGroupName'));
			questionGroup.set('path', path);

			FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
			FLOW.store.commit();
			this.set('showQGroupNameEditField', false);
		},

		// fired when 'cancel' is clicked while showing edit group name field. Cancels the edit.
		cancelQuestionGroupNameEdit: function() {
			this.set('questionGroupName', null);
			this.set('showQGroupNameEditField', false);
		},

		// true if one question group has been selected for Move
		oneSelectedForMove: function() {
			var selectedForMove = FLOW.selectedControl.get('selectedForMoveQuestionGroup');
			if(selectedForMove) {
				return true;
			} else {
				return false;
			}
		}.property('FLOW.selectedControl.selectedForMoveQuestionGroup'),

		// true if one question group has been selected for Copy
		oneSelectedForCopy: function() {
			var selectedForCopy = FLOW.selectedControl.get('selectedForCopyQuestionGroup');
			if(selectedForCopy) {
				return true;
			} else {
				return false;
			}
		}.property('FLOW.selectedControl.selectedForCopyQuestionGroup'),

		// execute group delete
		deleteQuestionGroup: function() {
			var qgDeleteId, questionGroup, questionsGroupsInSurvey, sId, qgOrder, questionsInGroup;
			qgDeleteId = this.content.get('keyId');
			sId = this.content.get('surveyId');
			questionGroup = FLOW.store.find(FLOW.QuestionGroup, qgDeleteId);
			qgOrder = questionGroup.get('order');
			questionsInGroup = FLOW.store.filter(FLOW.Question,function (item){
				return(item.get('questionGroupId') == qgDeleteId);
			});

			if (questionsInGroup.get('content').length > 0){
				FLOW.dialogControl.set('activeAction', "ignore");
				FLOW.dialogControl.set('header', Ember.String.loc('_cannot_delete_questiongroup'));
				FLOW.dialogControl.set('message', Ember.String.loc('_cannot_delete_questiongroup_text'));
				FLOW.dialogControl.set('showCANCEL', false);
				FLOW.dialogControl.set('showDialog', true);
				return;
			}

			// if we are here, we can safely delete
			questionGroup.deleteRecord();
			// restore order
			questionGroupsInSurvey = FLOW.store.filter(FLOW.QuestionGroup, function(item) {
				return(item.get('surveyId') == sId);
			});

			questionGroupsInSurvey.forEach(function(item) {
				if (item.get('order') > qgOrder) {
					item.set('order',item.get('order')-1);
				}
			});

			FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
			FLOW.store.commit();
		
		},

		// insert group
		doInsertQuestionGroup: function() {
			var insertAfterOrder, path, sId, questionGroupsInSurvey;
			path = FLOW.selectedControl.selectedSurveyGroup.get('code') + "/" + FLOW.selectedControl.selectedSurvey.get('name');
			if(FLOW.selectedControl.selectedSurvey.get('keyId')) {

				if(this.get('zeroItem')) {
					insertAfterOrder = 0;
				} else {
					insertAfterOrder = this.content.get('order');
				}
				
				// restore order
				sId = FLOW.selectedControl.selectedSurvey.get('keyId');
				questionGroupsInSurvey = FLOW.store.filter(FLOW.QuestionGroup, function(item) {
			        return(item.get('surveyId') == sId);
			      });
				
				// move items up to make space
				questionGroupsInSurvey.forEach(function(item) {
					if (item.get('order') > insertAfterOrder) {
						item.set('order',item.get('order') + 1);
					}
				});
				
				// create new QuestionGroup item in the store
				FLOW.store.createRecord(FLOW.QuestionGroup, {
					"code": "New group - please change name",
					"name": "New group - please change name",
					"order": insertAfterOrder+1,
					"path": path,
					"surveyId": FLOW.selectedControl.selectedSurvey.get('keyId')
				});
				
				FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
				FLOW.store.commit();
				FLOW.questionGroupControl.setFilteredContent();
			} else {
				FLOW.dialogControl.set('activeAction', "ignore");
				FLOW.dialogControl.set('header', Ember.String.loc('_please_save_survey'));
				FLOW.dialogControl.set('message', Ember.String.loc('_please_save_survey_text'));
				FLOW.dialogControl.set('showCANCEL', false);
				FLOW.dialogControl.set('showDialog', true);
			}
		},

		// prepare for group copy. Shows 'copy to here' buttons
		doQGroupCopy: function() {
			FLOW.selectedControl.set('selectedForCopyQuestionGroup', this.content);
			FLOW.selectedControl.set('selectedForMoveQuestionGroup', null);
		},


		// cancel group copy
		doQGroupCopyCancel: function() {
			FLOW.selectedControl.set('selectedForCopyQuestionGroup', null);
		},


		// prepare for group move. Shows 'move here' buttons
		doQGroupMove: function() {
			FLOW.selectedControl.set('selectedForMoveQuestionGroup', this.content);
			FLOW.selectedControl.set('selectedForCopyQuestionGroup', null);
		},

		// cancel group move
		doQGroupMoveCancel: function() {
			FLOW.selectedControl.set('selectedForMoveQuestionGroup', null);
		},

		// execute group move to selected location
		doQGroupMoveHere: function() {
			var selectedOrder, insertAfterOrder, selectedQG, sId, questionGroupsInSurvey, origOrder, movingUp;
			selectedOrder = FLOW.selectedControl.selectedForMoveQuestionGroup.get('order');

			if(this.get('zeroItem')) {
				insertAfterOrder = 0;
			} else {
				insertAfterOrder = this.content.get('order');
			}

			// only do something if we are not moving to the same place
			if(!((selectedOrder == insertAfterOrder) || (selectedOrder == (insertAfterOrder + 1)))) {
				selectedQG = FLOW.store.find(FLOW.QuestionGroup, FLOW.selectedControl.selectedForMoveQuestionGroup.get('keyId'));
				if(selectedQG !== null) {
					
					// selectedQG.set('order', insertAfterOrder + 1);
					// restore order
					sId = FLOW.selectedControl.selectedSurvey.get('keyId');
					questionGroupsInSurvey = FLOW.store.filter(FLOW.QuestionGroup, function(item) {
				        return(item.get('surveyId') == sId);
				      });
					
					origOrder = FLOW.selectedControl.selectedForMoveQuestionGroup.get('order');
					movingUp = origOrder < insertAfterOrder;
					
					questionGroupsInSurvey.forEach(function(item) {
						currentOrder = item.get('order');
						if (movingUp){
							if (currentOrder == origOrder){
								// move moving item to right location
								selectedQG.set('order', insertAfterOrder);
							} else if ((currentOrder > origOrder) && (currentOrder <= insertAfterOrder)){
								// move item down
								item.set('order',item.get('order') - 1);
							}
						} else {
							// Moving down
							if (currentOrder == origOrder){
								// move moving item to right location
								selectedQG.set('order', insertAfterOrder + 1);
							} else if ((currentOrder < origOrder) && (currentOrder > insertAfterOrder)) {
								// move item up
								item.set('order',item.get('order') + 1);
							}
						}	
					});
					
					FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
					FLOW.store.commit();
				}
			}

			FLOW.selectedControl.set('selectedForMoveQuestionGroup', null);
		},

		// execute group copy to selected location
		// TODO should this copy all questions in the group?
		doQGroupCopyHere: function() {
			var insertAfterOrder, path, sId, questionGroupsInSurvey;
			path = FLOW.selectedControl.selectedSurveyGroup.get('code') + "/" + FLOW.selectedControl.selectedSurvey.get('name');

			if(this.get('zeroItem')) {
				insertAfterOrder = 0;
			} else {
				insertAfterOrder = this.content.get('order');
			}

			sId = FLOW.selectedControl.selectedSurvey.get('keyId');
			questionGroupsInSurvey = FLOW.store.filter(FLOW.QuestionGroup, function(item) {
		        return(item.get('surveyId') == sId);
		      });
			
			// restore order - move items up to make space
			questionGroupsInSurvey.forEach(function(item) {
				if (item.get('order') > insertAfterOrder) {
					item.set('order',item.get('order') + 1);
				}
			});
			
			FLOW.store.createRecord(FLOW.QuestionGroup, {
				"description": FLOW.selectedControl.selectedForCopyQuestionGroup.get('description'),
				"order": insertAfterOrder + 1,
				"code": FLOW.selectedControl.selectedForCopyQuestionGroup.get('code'),
				"name": FLOW.selectedControl.selectedForCopyQuestionGroup.get('code'),
				"path": path,
				"surveyId": FLOW.selectedControl.selectedForCopyQuestionGroup.get('surveyId')
			});

			FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
			FLOW.store.commit();
			FLOW.selectedControl.set('selectedForCopyQuestionGroup', null);
		}

	});

});
define("views/surveys/survey-details-views", function(){});

define('views/data/inspect-data-table-views', [
  'app'
], function(FLOW) {
  FLOW.inspectDataTableView = FLOW.View.extend({
    selectedSurvey: null,
    surveyId: null,
    deviceId: null,
    submitterName: null,
    beginDate: null,
    endDate: null,
    since: null,
    showEditSurveyInstanceWindowBool: false,
    selectedSurveyInstanceId: null,
    selectedSurveyInstanceNum: null,
    siString: null,

    // do a new query
    doFindSurveyInstances: function() {
      FLOW.surveyInstanceControl.get('sinceArray').clear();
      FLOW.metaControl.set('since', null);
      this.doNextPage();
    },

    doInstanceQuery: function() {
      this.set('beginDate', Date.parse(FLOW.dateControl.get('fromDate')));
      this.set('endDate', Date.parse(FLOW.dateControl.get('toDate')));

      // we shouldn't be sending NaN
      if(isNaN(this.get('beginDate'))) {
        this.set('beginDate', null);
      }
      if(isNaN(this.get('endDate'))) {
        this.set('endDate', null);
      }

      if(FLOW.selectedControl.get('selectedSurvey')) {
        this.set('surveyId', FLOW.selectedControl.selectedSurvey.get('keyId'));
      }

      this.set('since', FLOW.metaControl.get('since'));
      if(FLOW.selectedControl.get('selectedSurvey')) {
        FLOW.questionControl.populateAllQuestions(FLOW.selectedControl.selectedSurvey.get('keyId'));
      }
      FLOW.surveyInstanceControl.doInstanceQuery(this.get('surveyId'), this.get('deviceId'), this.get('since'), this.get('beginDate'), this.get('endDate'));
    },

    doNextPage: function() {
      FLOW.surveyInstanceControl.get('sinceArray').pushObject(FLOW.metaControl.get('since'));
      this.doInstanceQuery();
    },

    doPrevPage: function() {
      FLOW.surveyInstanceControl.get('sinceArray').popObject();
      FLOW.metaControl.set('since', FLOW.surveyInstanceControl.get('sinceArray')[FLOW.surveyInstanceControl.get('sinceArray').length - 1]);
      this.doInstanceQuery();
    },

    // If the number of items in the previous call was 20 (a full page) we assume that there are more.
    // This is not foolproof, but will only lead to an empty next page in 1/20 of the cases
    hasNextPage: function() {
      if(FLOW.metaControl.get('numSILoaded') == 20) {
        return true;
      } else {
        return false;
      }
    }.property('FLOW.metaControl.numSILoaded'),

    // not perfect yet, sometimes previous link is shown while there are no previous pages.
    hasPrevPage: function() {
      if(FLOW.surveyInstanceControl.get('sinceArray').length === 1) {
        return false;
      } else {
        return true;
      }
    }.property('FLOW.surveyInstanceControl.sinceArray.length'),

    createSurveyInstanceString: function() {
      var si;
      si = FLOW.store.find(FLOW.SurveyInstance, this.get('selectedSurveyInstanceId'));
      this.set('siString', si.get('surveyCode') + "/" + si.get('keyId') + "/" + si.get('submitterName'));
    },

    // Survey instance edit popup window
    // TODO solve when popup is open, no new surveyIdQuery is done
    showEditSurveyInstanceWindow: function(event) {
      FLOW.questionAnswerControl.doQuestionAnswerQuery(event.context.get('keyId'));
      FLOW.questionControl.doSurveyIdQuery(event.context.get('surveyId'));
      this.set('selectedSurveyInstanceId', event.context.get('keyId'));
      this.set('selectedSurveyInstanceNum', event.context.clientId);
      this.set('showEditSurveyInstanceWindowBool', true);
      this.createSurveyInstanceString();
    },

    doCloseEditSIWindow: function(event) {
      this.set('showEditSurveyInstanceWindowBool', false);
    },

    doPreviousSI: function(event) {
      var currentSIList, SIindex, nextItem, filtered, nextSIkeyId;
      currentSIList = FLOW.surveyInstanceControl.content.get('content');
      SIindex = currentSIList.indexOf(this.get('selectedSurveyInstanceNum'));

      if(SIindex === 0) {
        // if at the end of the list, go and get more data
      } else {
        nextItem = currentSIList.objectAt(SIindex - 1);
        filtered = FLOW.store.filter(FLOW.SurveyInstance, function(item) {
          if(item.clientId == nextItem) {
            return true;
          } else {
            return false;
          }
        });
        nextSIkeyId = filtered.objectAt(0).get('keyId');
        this.set('selectedSurveyInstanceId', nextSIkeyId);
        this.set('selectedSurveyInstanceNum', nextItem);
        this.createSurveyInstanceString();
        FLOW.questionAnswerControl.doQuestionAnswerQuery(nextSIkeyId);
      }
    },

    // TODO error checking
    doNextSI: function(event) {
      var currentSIList, SIindex, nextItem, filtered, nextSIkeyId;
      currentSIList = FLOW.surveyInstanceControl.content.get('content');
      SIindex = currentSIList.indexOf(this.get('selectedSurveyInstanceNum'));

      if(SIindex == 19) {
        // TODO get more data 
        // if at the end of the list, we should first go back and get more data
      } else {
        nextItem = currentSIList.objectAt(SIindex + 1);
        filtered = FLOW.store.filter(FLOW.SurveyInstance, function(item) {
          if(item.clientId == nextItem) {
            return true;
          } else {
            return false;
          }
        });
        nextSIkeyId = filtered.objectAt(0).get('keyId');
        this.set('selectedSurveyInstanceId', nextSIkeyId);
        this.set('selectedSurveyInstanceNum', nextItem);
        this.createSurveyInstanceString();
        FLOW.questionAnswerControl.doQuestionAnswerQuery(nextSIkeyId);
      }
    },

    // doSaveSI: function(event) {
    //   this.set('showEditSurveyInstanceWindowBool', false);
    // },

    doShowDeleteSIDialog: function(event) {
      FLOW.dialogControl.set('activeAction', 'delSI');
      FLOW.dialogControl.set('showCANCEL', true);
      FLOW.dialogControl.set('showDialog', true);
    },

    deleteSI: function(event) {
      var SI,SIid;
      SIid = this.get('selectedSurveyInstanceId');
      SI = FLOW.store.find(FLOW.SurveyInstance, SIid);
      if(SI !== null) {
        // remove from displayed content
        SI.deleteRecord();
        FLOW.store.commit();
      }
      this.set('showEditSurveyInstanceWindowBool', false);
    }
  });

  FLOW.DataItemView = FLOW.View.extend({
    tagName: 'span',
    deleteSI: function() {
      var SI;
      SI = FLOW.store.find(FLOW.SurveyInstance, this.content.get('keyId'));
      if(SI !== null) {
        SI.deleteRecord();
        FLOW.store.commit();
      }
    }
  });

});
define('views/data/data-attribute-views', [
  'app'
], function(FLOW) {
  FLOW.ManageAttributesTableView = FLOW.View.extend({
    showAddAttributeDialogBool: false,
    showEditAttributeDialogBool: false,
    newAttributeName: null,
    newAttributeGroup: null,
    newAttributeType: null,

    showAddAttributeDialog: function() {
      this.set('showAddAttributeDialogBool', true);
    },

    doAddAttribute: function() {
      if(this.get('newAttributeName') !== null && this.get('newAttributeType') !== null) {
        FLOW.store.createRecord(FLOW.Metric, {
          "name": this.get('newAttributeName'),
          "group": this.get('newAttributeGroup'),
          "valueType": this.newAttributeType.get('value')
        });
        FLOW.store.commit();
      }
      this.set('showAddAttributeDialogBool', false);
    },

    cancelAddAttribute: function() {
      this.set('showAddAttributeDialogBool', false);
    },

    showEditAttributeDialog: function(event) {
      var attrType = null;

      FLOW.editControl.set('editAttributeName', event.context.get('name'));
      FLOW.editControl.set('editAttributeGroup', event.context.get('group'));
      FLOW.editControl.set('editAttributeId', event.context.get('keyId'));

      FLOW.attributeTypeControl.get('content').forEach(function(item) {
        if(item.get('value') == event.context.get('valueType')) {
          attrType = item;
        }
      });

      FLOW.editControl.set('editAttributeType', attrType);
      this.set('showEditAttributeDialogBool', true);
    },

    doEditAttribute: function() {
      var attribute;
      attribute = FLOW.store.find(FLOW.Metric, FLOW.editControl.get('editAttributeId'));
      attribute.set('name', FLOW.editControl.get('editAttributeName'));
      attribute.set('group', FLOW.editControl.get('editAttributeGroup'));

      if(FLOW.editControl.editAttributeType !== null) {
        attribute.set('valueType', FLOW.editControl.editAttributeType.get('value'));
      }

      FLOW.store.commit();
      this.set('showEditAttributeDialogBool', false);
    },

    cancelEditAttribute: function() {
      this.set('showEditAttributeDialogBool', false);
    }
  });

  FLOW.AttributeView = FLOW.View.extend({
    tagName: 'span',

    deleteAttribute: function() {
      var attrDeleteId, attribute;
      attrDeleteId = this.content.get('keyId');
      attribute = FLOW.store.find(FLOW.Metric, attrDeleteId);
      attribute.deleteRecord();
      FLOW.store.commit();
    }
  });

});
define('views/data/bulk-upload-view', [
  'app'
], function(FLOW) {
  FLOW.BulkUploadAppletView = FLOW.View.extend({
    showBulkUploadAppletBool: false,
    showBulkUploadApplet: function () {
      if(this.get('showBulkUploadAppletBool')) {
        // re-insert the applet
        this.get('childViews')[0].rerender();
      } else {
        this.set('showBulkUploadAppletBool', true);
      }
    }
  });
});
define('views/surveys/question-view', [
  'app'
], function(FLOW) {
	
	// make indexOf work for IE8 
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, fromIndex) {
			if (fromIndex == null) {
				fromIndex = 0;
			} else if (fromIndex < 0) {
				fromIndex = Math.max(0, this.length + fromIndex);
			}
			for (var i = fromIndex, j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}

	FLOW.QuestionView = FLOW.View.extend({
		templateName: 'navSurveys/question-view',
		content: null,
		text: null,
		tip: null,
		type: null,
		mandatoryFlag: null,
		minVal: null,
		maxVal: null,
		allowSign: null,
		allowDecimal: null,
		allowMultipleFlag: null,
		allowOtherFlag: null,
		dependentFlag: false,
		dependentQuestion: null,
		optionList: null,
		includeInMap: null,
		showAddAttributeDialogBool: false,
		newAttributeName: null,
		newAttributeGroup: null,
		newAttributeType: null,

		amOpenQuestion: function() {
			var selected = FLOW.selectedControl.get('selectedQuestion');
			if(selected && this.get('content')) {
				var isOpen = (this.content.get('keyId') == FLOW.selectedControl.selectedQuestion.get('keyId'));
				return isOpen;
			} else {
				return false;
			}
		}.property('FLOW.selectedControl.selectedQuestion', 'content.keyId').cacheable(),


		amOptionType: function() {
			if(this.type) {
				return(this.type.get('value') == 'OPTION');
			} else {
				return false;
			}
		}.property('this.type').cacheable(),

		amNumberType: function() {
			if(this.type) {
				return(this.type.get('value') == 'NUMBER');
			} else {
				return false;
			}
		}.property('this.type').cacheable(),

		amNoOptionsType: function() {
			var val;
			if(!Ember.none(this.type)) {
				val = this.type.get('value');
				return(val == 'GEO' || val == 'FREE_TEXT' || val == 'PHOTO' || val == 'VIDEO' || val == 'BARCODE');
			}
		}.property('this.type').cacheable(),

		// TODO dependencies
		// TODO options
		doQuestionEdit: function() {
			var questionType = null,
				attribute = null,
				dependentQuestion, dependentAnswer, dependentAnswerArray;

			FLOW.selectedControl.set('selectedQuestion', this.get('content'));
			this.set('text', FLOW.selectedControl.selectedQuestion.get('text'));
			this.set('tip', FLOW.selectedControl.selectedQuestion.get('tip'));
			this.set('mandatoryFlag', FLOW.selectedControl.selectedQuestion.get('mandatoryFlag'));
			this.set('minVal', FLOW.selectedControl.selectedQuestion.get('minVal'));
			this.set('maxVal', FLOW.selectedControl.selectedQuestion.get('maxVal'));
			this.set('allowSign', FLOW.selectedControl.selectedQuestion.get('allowSign'));
			this.set('allowDecimal', FLOW.selectedControl.selectedQuestion.get('allowDecimal'));
			this.set('allowMultipleFlag', FLOW.selectedControl.selectedQuestion.get('allowMultipleFlag'));
			this.set('allowOtherFlag', FLOW.selectedControl.selectedQuestion.get('allowOtherFlag'));
			this.set('includeInMap', FLOW.selectedControl.selectedQuestion.get('includeInMap'));
			this.set('dependentFlag', FLOW.selectedControl.selectedQuestion.get('dependentFlag'));
			this.set('optionList', FLOW.selectedControl.selectedQuestion.get('optionList'));
			FLOW.optionListControl.set('content',[]);

			// if the dependentQuestionId is not null, get the question
			if(!Ember.empty(FLOW.selectedControl.selectedQuestion.get('dependentQuestionId'))) {
				dependentQuestion = FLOW.store.find(FLOW.Question, FLOW.selectedControl.selectedQuestion.get('dependentQuestionId'));
				dependentAnswer = FLOW.selectedControl.selectedQuestion.get('dependentQuestionAnswer');

				// if we have found the question, fill the options
				if(dependentQuestion.get('id') !== "0") {
					FLOW.selectedControl.set('dependentQuestion', dependentQuestion);
					this.fillOptionList();

					dependentAnswerArray = dependentAnswer.split('|');
					// find the answer already set and set it to true in the optionlist
					FLOW.optionListControl.get('content').forEach(function(item) {
						if(dependentAnswerArray.indexOf(item.get('value')) > -1) {
							item.set('isSelected', true);
						}
					});
				}
			}

			// set the attribute to the original choice
			FLOW.attributeControl.get('content').forEach(function(item) {
				if(item.get('keyId') == FLOW.selectedControl.selectedQuestion.get('metricId')) {
					attribute = item;
				}
			});
			this.set('attribute', attribute);

			// set the type to the original choice
			FLOW.questionTypeControl.get('content').forEach(function(item) {
				if(item.get('value') == FLOW.selectedControl.selectedQuestion.get('type')) {
					questionType = item;
				}
			});
			this.set('type', questionType);
		},

		fillOptionList: function() {
			var optionList, optionListArray, i, sizeList;
			if(FLOW.selectedControl.get('dependentQuestion') !== null) {
				FLOW.optionListControl.set('content', []);
				optionList = FLOW.selectedControl.dependentQuestion.get('optionList');
				optionListArray = optionList.split('\n');
				sizeList = optionListArray.length;
				FLOW.optionListControl.set('currentActive', null);
				for(i = 0; i < sizeList; i++) {
					FLOW.optionListControl.get('content').push(Ember.Object.create({
						isSelected: false,
						value: optionListArray[i]
					}));
				}
			}
		}.observes('FLOW.selectedControl.dependentQuestion'),

		doCancelEditQuestion: function() {
			FLOW.selectedControl.set('selectedQuestion', null);
		},

		doSaveEditQuestion: function() {
			var path, anyActive, first, dependentQuestionAnswer, minVal, maxVal;

			// validation
			if (this.type.get('value') == 'NUMBER'){
				if (!Ember.empty(this.get('minVal')) && !Ember.empty(this.get('maxVal'))  ){
					if (this.get('minVal') >= this.get('maxVal')){
						FLOW.dialogControl.set('activeAction', 'ignore');
						FLOW.dialogControl.set('header', Ember.String.loc('_min_max_not_correct'));
						FLOW.dialogControl.set('message', Ember.String.loc('_min_larger_than_max_or_equal'));
						FLOW.dialogControl.set('showCANCEL', false);
						FLOW.dialogControl.set('showDialog', true);
						return;
					}
				}
			}
			if (this.type.get('value') !== 'NUMBER'){
				this.set('minVal', null);
				this.set('maxVal', null);
				this.set('allowSign',false);
				this.set('allowDecimal',false);
			}
			path = FLOW.selectedControl.selectedSurveyGroup.get('code') + "/" + FLOW.selectedControl.selectedSurvey.get('name') + "/" + FLOW.selectedControl.selectedQuestionGroup.get('code');
			FLOW.selectedControl.selectedQuestion.set('text', this.get('text'));
			FLOW.selectedControl.selectedQuestion.set('tip', this.get('tip'));
			FLOW.selectedControl.selectedQuestion.set('mandatoryFlag', this.get('mandatoryFlag'));

			minVal = (Ember.empty(this.get('minVal'))) ? null : this.get('minVal');
			maxVal = (Ember.empty(this.get('maxVal'))) ? null : this.get('maxVal');
			FLOW.selectedControl.selectedQuestion.set('minVal', minVal);
			FLOW.selectedControl.selectedQuestion.set('maxVal', maxVal);

			FLOW.selectedControl.selectedQuestion.set('path',path);
			FLOW.selectedControl.selectedQuestion.set('allowSign', this.get('allowSign'));
			FLOW.selectedControl.selectedQuestion.set('allowDecimal', this.get('allowDecimal'));
			FLOW.selectedControl.selectedQuestion.set('allowMultipleFlag', this.get('allowMultipleFlag'));
			FLOW.selectedControl.selectedQuestion.set('allowOtherFlag', this.get('allowOtherFlag'));
			FLOW.selectedControl.selectedQuestion.set('includeInMap', this.get('includeInMap'));

			dependentQuestionAnswer = "";
			first = true;

			FLOW.optionListControl.get('content').forEach(function(item){
				if (item.isSelected) {
					if (!first) {dependentQuestionAnswer += "|";}
					first = false;
					dependentQuestionAnswer += item.value;
				}
			});

			if(this.get('dependentFlag') && dependentQuestionAnswer !== "") {
				FLOW.selectedControl.selectedQuestion.set('dependentFlag', this.get('dependentFlag'));
				FLOW.selectedControl.selectedQuestion.set('dependentQuestionId', FLOW.selectedControl.dependentQuestion.get('keyId'));
				FLOW.selectedControl.selectedQuestion.set('dependentQuestionAnswer', dependentQuestionAnswer);
			} else {
				FLOW.selectedControl.selectedQuestion.set('dependentFlag', false);
				FLOW.selectedControl.selectedQuestion.set('dependentQuestionId', null);
				FLOW.selectedControl.selectedQuestion.set('dependentQuestionAnswer', null);
			}

			if(this.get('attribute')) {
				FLOW.selectedControl.selectedQuestion.set('metricId', this.attribute.get('keyId'));
			}

			if(this.get('type')) {
				FLOW.selectedControl.selectedQuestion.set('type', this.type.get('value'));
			}

			FLOW.selectedControl.selectedQuestion.set('optionList', this.get('optionList'));
			FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
			FLOW.store.commit();
			FLOW.selectedControl.set('selectedQuestion', null);
			FLOW.selectedControl.set('dependentQuestion',null);
		},

		deleteQuestion: function() {
			var qDeleteId;
			qDeleteId = this.content.get('keyId');

			//are we saving / loading anything?
			if (FLOW.savingMessageControl.get('areLoadingBool') || FLOW.savingMessageControl.get('areSavingBool')){
					FLOW.dialogControl.set('activeAction', 'ignore');
					FLOW.dialogControl.set('header', Ember.String.loc('_please_wait'));
					FLOW.dialogControl.set('message', Ember.String.loc('_please_wait_until_previous_request'));
					FLOW.dialogControl.set('showCANCEL', false);
					FLOW.dialogControl.set('showDialog', true);
				return;
			}

			// check if deleting this question is allowed
			// if successful, the deletion action will be called from DS.FLOWrestadaptor.sideload
			FLOW.store.findQuery(FLOW.Question, {
	      preflight: 'delete',
	      questionId: qDeleteId
	    });
		},

		// move question to selected location
		doQuestionMoveHere: function() {
			var selectedOrder, insertAfterOrder, selectedQ;
			selectedOrder = FLOW.selectedControl.selectedForMoveQuestion.get('order');

			if(this.get('zeroItemQuestion')) {
				insertAfterOrder = 0;
			} else {
				insertAfterOrder = this.content.get('order');
			}

			// only do something if we are not moving to the same place
			if(!((selectedOrder == insertAfterOrder) || (selectedOrder == (insertAfterOrder + 1)))) {
				selectedQ = FLOW.store.find(FLOW.Question, FLOW.selectedControl.selectedForMoveQuestion.get('keyId'));
				if(selectedQ !== null) {
					// restore order
					qgId = FLOW.selectedControl.selectedQuestionGroup.get('keyId');
					questionsInGroup = FLOW.store.filter(FLOW.Question, function(item) {
				        return(item.get('questionGroupId') == qgId);
				      });
					
					origOrder = FLOW.selectedControl.selectedForMoveQuestion.get('order');
					movingUp = origOrder < insertAfterOrder;
					
					questionsInGroup.forEach(function(item) {
						currentOrder = item.get('order');
						if (movingUp){
							if (currentOrder == origOrder){
								// move moving item to right location
								selectedQ.set('order', insertAfterOrder);
							} else if ((currentOrder > origOrder) && (currentOrder <= insertAfterOrder)){
								// move item down
								item.set('order',item.get('order') - 1);
							}
						} else {
							// Moving down
							if (currentOrder == origOrder){
								// move moving item to right location
								selectedQ.set('order', insertAfterOrder + 1);
							} else if ((currentOrder < origOrder) && (currentOrder > insertAfterOrder)) {
								// move item up
								item.set('order',item.get('order') + 1);
							}
						}	
					});
					
					FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
					FLOW.store.commit();
				}
			}

			FLOW.store.commit();
			FLOW.selectedControl.set('selectedForMoveQuestion', null);
		},

		// execute question copy to selected location
		doQuestionCopyHere: function() {
			var insertAfterOrder, path, qgId, questionsInGroup;
			path = FLOW.selectedControl.selectedSurveyGroup.get('code') + "/" + FLOW.selectedControl.selectedSurvey.get('name') + "/" + FLOW.selectedControl.selectedQuestionGroup.get('code');

			if(this.get('zeroItemQuestion')) {
				insertAfterOrder = 0;
			} else {
				insertAfterOrder = this.content.get('order');
			}

			
			// restore order
			qgId = FLOW.selectedControl.selectedQuestionGroup.get('keyId');
			questionsInGroup = FLOW.store.filter(FLOW.Question, function(item) {
		        return(item.get('questionGroupId') == qgId);
		      });
			
			// move items up to make space
			questionsInGroup.forEach(function(item) {
				if (item.get('order') > insertAfterOrder) {
					item.set('order',item.get('order') + 1);
				}
			});
			
			// create copy of Question item in the store
			FLOW.store.createRecord(FLOW.Question, {
				"tip": FLOW.selectedControl.selectedForCopyQuestion.get('tip'),
				"mandatoryFlag": FLOW.selectedControl.selectedForCopyQuestion.get('mandatoryFlag'),
				"allowSign": FLOW.selectedControl.selectedForCopyQuestion.get('allowSign'),
				"allowDecimal": FLOW.selectedControl.selectedForCopyQuestion.get('allowDecimal'),
				"allowMultipleFlag": FLOW.selectedControl.selectedForCopyQuestion.get('allowMultipleFlag'),
				"allowOtherFlag": FLOW.selectedControl.selectedForCopyQuestion.get('allowOtherFlag'),
				"dependentFlag": false,
				"path":path,
				"maxVal": FLOW.selectedControl.selectedForCopyQuestion.get('maxVal'),
				"minVal": FLOW.selectedControl.selectedForCopyQuestion.get('minVal'),
				"type": FLOW.selectedControl.selectedForCopyQuestion.get('type'),
				"order": insertAfterOrder + 1,
				"text": FLOW.selectedControl.selectedForCopyQuestion.get('text'),
				"optionList": FLOW.selectedControl.selectedForCopyQuestion.get('optionList'),
				"surveyId": FLOW.selectedControl.selectedForCopyQuestion.get('surveyId'),
				"questionGroupId": FLOW.selectedControl.selectedForCopyQuestion.get('questionGroupId')
			});

			FLOW.selectedControl.selectedSurvey.set('status', 'NOT_PUBLISHED');
			FLOW.store.commit();
			FLOW.selectedControl.set('selectedForCopyQuestion', null);
		},

		// create new question
		doInsertQuestion: function() {
			var insertAfterOrder, path, qgId, questionsInGroup;
			path = FLOW.selectedControl.selectedSurveyGroup.get('code') + "/" + FLOW.selectedControl.selectedSurvey.get('name') + "/" + FLOW.selectedControl.selectedQuestionGroup.get('code');

			if(this.get('zeroItemQuestion')) {
				insertAfterOrder = 0;
			} else {
				insertAfterOrder = this.content.get('order');
			}

			// restore order
			qgId = FLOW.selectedControl.selectedQuestionGroup.get('keyId');
			questionsInGroup = FLOW.store.filter(FLOW.Question, function(item) {
		        return(item.get('questionGroupId') == qgId);
		      });
			
			// move items up to make space
			questionsInGroup.forEach(function(item) {
				if (item.get('order') > insertAfterOrder) {
					item.set('order',item.get('order') + 1);
				}
			});
			
			// create new Question item in the store
			FLOW.store.createRecord(FLOW.Question, {
				"order": insertAfterOrder + 1,
				"type": "FREE_TEXT",
				"path": path,
				"text": "new question - please change name",
				"surveyId": FLOW.selectedControl.selectedSurvey.get('keyId'),
				"questionGroupId": FLOW.selectedControl.selectedQuestionGroup.get('keyId')
			});

			FLOW.store.commit();
		},

		// true if one question has been selected for Move
		oneSelectedForMove: function() {
			var selectedForMove = FLOW.selectedControl.get('selectedForMoveQuestion');
			if(selectedForMove) {
				return true;
			} else {
				return false;
			}
		}.property('FLOW.selectedControl.selectedForMoveQuestion'),

		// true if one question has been selected for Copy
		oneSelectedForCopy: function() {
			var selectedForCopy = FLOW.selectedControl.get('selectedForCopyQuestion');
			if(selectedForCopy) {
				return true;
			} else {
				return false;
			}
		}.property('FLOW.selectedControl.selectedForCopyQuestion'),

		// prepare for question copy. Shows 'copy to here' buttons
		doQuestionCopy: function() {
			FLOW.selectedControl.set('selectedForCopyQuestion', this.get('content'));
			FLOW.selectedControl.set('selectedForMoveQuestion', null);
		},

		// cancel question copy
		doQuestionCopyCancel: function() {
			FLOW.selectedControl.set('selectedForCopyQuestion', null);
		},


		// prepare for question move. Shows 'move here' buttons
		doQuestionMove: function() {
			FLOW.selectedControl.set('selectedForMoveQuestion', this.get('content'));
			FLOW.selectedControl.set('selectedForCopyQuestion', null);
		},

		// cancel group move
		doQuestionMoveCancel: function() {
			FLOW.selectedControl.set('selectedForMoveQuestion', null);
		},
		showAddAttributeDialog: function() {
			this.set('showAddAttributeDialogBool', true);
		},

		doAddAttribute: function() {
			if((this.get('newAttributeName') !== null) && (this.get('newAttributeType') !== null)) {
				FLOW.store.createRecord(FLOW.Metric, {
					"name": this.get('newAttributeName'),
					"group": this.get('newAttributeGroup'),
					"valueType": this.newAttributeType.get('value')
				});
				FLOW.store.commit();
			}
			this.set('showAddAttributeDialogBool', false);
		},

		cancelAddAttribute: function() {
			this.set('showAddAttributeDialogBool', false);
		}
	});

});
define('views/data/question-answer-view', [
  'app'
], function(FLOW) {
  // this function is also present in assignment-edit-views.js, we need to consolidate using moment.js
  function formatDate(value) {
    if(!Ember.none(value)) {
      return value.getFullYear() + "/" + (value.getMonth() + 1) + "/" + value.getDate();
    } else return null;
  }


  FLOW.QuestionAnswerView = Ember.View.extend({
    isTextType: false,
    isOptionType: false,
    isNumberType: false,
    isBarcodeType: false,
    isDateType: false,
    isPhotoType: false,
    optionsList: [],
    content: null,
    optionChoice: null,
    inEditMode: false,
    isNotEditable: false,
    value: null,
    numberValue:null,
    date: null,
    photoUrl:null,

    init: function() {
      this._super();
      this.doInit();
    },

    doInit: function() {
      var q, questionId, type;

      // TODO use filter instead: if the question is not yet there, don't do anything
      // it will be picked up later at isLoaded.
      questionId = this.content.get('questionID');
      q = FLOW.store.find(FLOW.Question, questionId);
      type = q.get('type');
      this.set('isTextType', type == 'FREE_TEXT');
      this.set('isOptionType', type == 'OPTION');
      this.set('isNumberType', type == 'NUMBER');
      this.set('isBarcodeType', type == 'BARCODE');
      this.set('isPhotoType', type == 'PHOTO');
      this.set('isDateType', type == 'DATE');
      this.set('isNotEditable', (type == 'GEO' || type == 'PHOTO' || type == 'VIDEO'));

      this.setInitialValue();
    }.observes('FLOW.questionControl.content.isLoaded'),


    setInitialValue: function() {
      var opList, opListArray, i, sizeList, q, questionId, qaValue, choice = null, date;

      questionId = this.content.get('questionID');
      q = FLOW.store.find(FLOW.Question, questionId);

      // set value
      this.set('value', this.content.get('value'));

      if(this.get('isNumberType')) {
        this.set('numberValue',this.content.get('value'));
      }

      if(this.get('isDateType') && !Ember.none(this.content.get('value'))) {
        date = new Date(parseInt(this.content.get('value'),10));
        this.set('date',formatDate(date));
      }
      // fill option list
      if(this.get('isOptionType') && q.get('optionList') !== null) {
        this.set('optionsList', []);
        opList = q.get('optionList');
        opListArray = opList.split('\n');
        sizeList = opListArray.length;

        for(i = 0; i < sizeList; i++) {
          this.get('optionsList').push(Ember.Object.create({
            isSelected: false,
            value: opListArray[i]
          }));
        }
        // set answer
        qaValue = this.content.get('value');
        this.get('optionsList').forEach(function(item) {
          if(item.get('value') == qaValue) {
            choice = item;
          }
        });
        this.set('optionChoice', choice);
      }
      if (this.get('isPhotoType') && !Ember.empty(this.content.get('value'))){
        // Since photos have a leading path from devices that we need to trim
        this.set('photoUrl',FLOW.Env.photo_url_root + this.content.get('value').split('/').pop());
      }
    },

    doEdit: function() {
      this.set('inEditMode', true);
    },

    doCancel: function() {
      // revert answer
      this.setInitialValue();
      this.set('inEditMode', false);
    },

    doSave: function() {
      if(this.get('isDateType')){
        this.content.set('value',Date.parse(this.get('date')));
      } else if (this.get('isOptionType')){
        this.content.set('value',this.optionChoice.get('value'));
      } else if (this.get('isNumberType')){
        this.content.set('value',this.get('numberValue'));
      } else {
        this.content.set('value',this.get('value'));
      }
      FLOW.store.commit();
      this.set('inEditMode', false);
    },

    doValidateNumber: function () {
      // TODO should check for minus sign and decimal point, depending on question setting
      this.set('numberValue',this.get('numberValue').toString().replace(/[^\d.]/g, ""));
    }.observes('this.numberValue')

  });

});
define('views/reports/report-views', [
  'app'
], function(FLOW) {
  /*global deleteChart, createDoughnutChart, createHBarChart, createVBarChart*/

  FLOW.chartView = FLOW.View.extend({
    noChoiceBool: false,
    chartType: null,
    compactSmaller: true,

    isDoughnut: function() {
      return(this.chartType.get('value') == 'doughnut');
    }.property('this.chartType'),

    init: function() {
      this._super();
      this.chartType = FLOW.chartTypeControl.content[0];
    },

    getChartData: function() {
      //   createBarChart();
      this.set('noChoiceBool', false);
      if(FLOW.selectedControl.get('selectedQuestion') !== null) {
        FLOW.surveyQuestionSummaryControl.doSurveyQuestionSummaryQuery(FLOW.selectedControl.selectedQuestion.get('keyId'));
        FLOW.chartDataControl.set('questionText', FLOW.selectedControl.selectedQuestion.get('text'));
      } else {
        this.set('noChoiceBool', true);
      }
    },

    buildChart: function() {
      var chartData = [],
        smallerItems = [],
        total = 0,
        max = 0,
        maxPer, i, tot, totPerc;

      if(FLOW.surveyQuestionSummaryControl.content.get('isLoaded') === true) {
        FLOW.chartDataControl.set('total', FLOW.surveyQuestionSummaryControl.content.get('length'));
        FLOW.surveyQuestionSummaryControl.get('content').forEach(function(item) {
          total = total + item.get('count');
          if(item.get('count') > max) max = item.get('count');
        });

        // set the maximum of the scale
        maxPer = 100.0 * max / total;

        // if type is doughnut, do doughnut things
        if(this.chartType.get('value') == 'doughnut') {
          i = -1;
          tot = 0;
          totPerc = 0;

          FLOW.surveyQuestionSummaryControl.get('content').forEach(function(item) {
            var percentage = 100.0 * item.get('count') / total,
              percString = percentage.toFixed(1);
            chartData.push({
              "legendLabel": (item.get('response') + ", " + percString + "%"),
              "percentage": 100.0 * item.get('count') / total
            });
          });

          // sort smallest first
          chartData.sort(function(a, b) {
            return(a.percentage >= b.percentage);
          });


          if(this.get('compactSmaller')) {
            chartData.forEach(function(item) {
              if((totPerc < 5 || item.percentage < 5) && (item.percentage < 7)) {
                totPerc = totPerc + item.percentage;
                i = i + 1;
              }
            });

            tot = 0;

            for(var ii = 0; ii <= i; ii++) {
              smallerItems.push(chartData[ii]);
              tot = tot + chartData[ii].percentage;
            }

            // delete smallest items from chartData
            chartData.splice(0, i + 1);

            // add new item with the size of the smallest items
            chartData.splice(0, 0, {
              "legendLabel": ("Smallest items, " + tot.toFixed(1) + "%"),
              "percentage": tot
            });
          }
          FLOW.chartDataControl.set('chartData', chartData);
          FLOW.chartDataControl.set('smallerItems', smallerItems);
          FLOW.chartDataControl.set('total', total);

          deleteChart();
          createDoughnutChart();

          // if type vbar, do vbar things
        } else if(this.chartType.get('value') == 'vbar') {

          FLOW.surveyQuestionSummaryControl.get('content').forEach(function(item) {
            chartData.push({
              "legendLabel": (item.get('response')),
              "percentage": 100.0 * item.get('count') / total
            });
          });

          // sort smallest first
          chartData.sort(function(a, b) {
            return(a.percentage <= b.percentage);
          });
          FLOW.chartDataControl.set('chartData', chartData);
          FLOW.chartDataControl.set('maxPer', maxPer);
          deleteChart();
          createVBarChart();

          // if type hbar, do hbar things
        } else if(this.chartType.get('value') == 'hbar') {

          FLOW.surveyQuestionSummaryControl.get('content').forEach(function(item) {
            chartData.push({
              "legendLabel": (item.get('response')),
              "percentage": 100.0 * item.get('count') / total
            });
          });

          // sort smallest first
          chartData.sort(function(a, b) {
            return(a.percentage <= b.percentage);
          });
          FLOW.chartDataControl.set('chartData', chartData);
          FLOW.chartDataControl.set('maxPer', maxPer);
          deleteChart();
          createHBarChart();
        }
      }
    }.observes('FLOW.surveyQuestionSummaryControl.content.isLoaded')
  });

});
define('views/reports/export-reports-views', [
  'app'
], function(FLOW) {
  FLOW.ExportReportsAppletView = FLOW.View.extend({
    showRawDataReportApplet:false,
    showComprehensiveReportApplet:false,
    showGoogleEarthFileApplet: false,
    showSurveyFormApplet: false,
    showComprehensiveDialog: false,
    showRawDataImportApplet: false,
    showGoogleEarthButton: false,

    showRawDataReport: function () {
      this.renderApplet('showRawDataReportApplet');
    },

    showComprehensiveReport: function () {
      this.set('showComprehensiveDialog', false);
      this.renderApplet('showComprehensiveReportApplet');
    },

    showGoogleEarthFile: function () {
      this.renderApplet('showGoogleEarthFileApplet', true);
    },

    showSurveyForm: function () {
      this.renderApplet('showSurveyFormApplet');
    },

    showImportApplet: function () {
      this.renderApplet('showRawDataImportApplet', true);
    },

    showComprehensiveOptions: function () {
      if(!FLOW.selectedControl.selectedSurvey) {
        this.showWarning();
        return;
      }

      FLOW.editControl.set('summaryPerGeoArea', true);
      FLOW.editControl.set('omitCharts', false);
      this.set('showComprehensiveDialog', true);
    },

    showWarning: function () {
      FLOW.dialogControl.set('activeAction', 'ignore');
      FLOW.dialogControl.set('header', Ember.String.loc('_export_data'));
      FLOW.dialogControl.set('message', Ember.String.loc('_applet_select_survey'));
      FLOW.dialogControl.set('showCANCEL', false);
      FLOW.dialogControl.set('showDialog', true);
    },

    renderApplet: function (prop, skipSurveyCheck) {
      if(!skipSurveyCheck && !FLOW.selectedControl.selectedSurvey) {
        this.showWarning();
        return;
      }
      switch (prop) {
        case 'showRawDataReportApplet':
          this.set('showRawDataReportApplet', true);
          this.set('showComprehensiveReportApplet', false);
          this.set('showGoogleEarthFileApplet', false);
          this.set('showSurveyFormApplet', false);
          this.set('showRawDataImportApplet', false);
          break;
        case 'showComprehensiveReportApplet':
          this.set('showRawDataReportApplet', false);
          this.set('showComprehensiveReportApplet', true);
          this.set('showGoogleEarthFileApplet', false);
          this.set('showSurveyFormApplet', false);
          this.set('showRawDataImportApplet', false);
          break;
        case 'showGoogleEarthFileApplet':
          this.set('showRawDataReportApplet', false);
          this.set('showComprehensiveReportApplet', false);
          this.set('showGoogleEarthFileApplet', true);
          this.set('showSurveyFormApplet', false);
          this.set('showRawDataImportApplet', false);
          break;
        case 'showSurveyFormApplet':
          this.set('showRawDataReportApplet', false);
          this.set('showComprehensiveReportApplet', false);
          this.set('showGoogleEarthFileApplet', false);
          this.set('showSurveyFormApplet', true);
          this.set('showRawDataImportApplet', false);
          break;
        case 'showRawDataImportApplet':
          this.set('showRawDataReportApplet', false);
          this.set('showComprehensiveReportApplet', false);
          this.set('showGoogleEarthFileApplet', false);
          this.set('showSurveyFormApplet', true);
          this.set('showRawDataImportApplet', true);
          break;
      }

      this.get('childViews').forEach(function(v) {
        if(v.get('childViews') && v.get('childViews').length > 0) {
          return; // skip initial select items
        }

        if(v.state === 'inDOM') {
          v.rerender();
        }
      });
    }
  });

});
define('views/messages/message-views', [
  'app'
], function(FLOW) {
  FLOW.MessagesListView = FLOW.View.extend({
    
    doInstanceQuery: function() {
      this.set('since', FLOW.metaControl.get('since'));
      FLOW.messageControl.doInstanceQuery(this.get('since'));
    },
    
    doNextPage: function() {
      FLOW.messageControl.get('sinceArray').pushObject(FLOW.metaControl.get('since'));
      this.doInstanceQuery();
    },

    doPrevPage: function() {
      FLOW.messageControl.get('sinceArray').popObject();
      FLOW.metaControl.set('since', FLOW.messageControl.get('sinceArray')[FLOW.messageControl.get('sinceArray').length - 1]);
      this.doInstanceQuery();
    },

    // If the number of items in the previous call was 20 (a full page) we assume that there are more.
    // This is not foolproof, but will only lead to an empty next page in 1/20 of the cases
    hasNextPage: function() {
      if(FLOW.metaControl.get('num') == 20) {
        return true;
      } else {
        return false;
      }
    }.property('FLOW.metaControl.num'),

    // not perfect yet, sometimes previous link is shown while there are no previous pages.
    hasPrevPage: function() {
      if(FLOW.messageControl.get('sinceArray').length === 1) {
        return false;
      } else {
        return true;
      }
    }.property('FLOW.messageControl.sinceArray.length')

  });

});
define("views/messages/message-view", function(){});

define('views/devices/devices-views', [
  'app'
], function(FLOW) {
	FLOW.CurrentDevicesTabView = Ember.View.extend({
		// FLOW.CurrentDevicesTabView = FLOW.View.extend({
		showDeleteDevicesDialogBool: false,
		showAddToGroupDialogBool: false,
		showRemoveFromGroupDialogBool: false,
		showManageDeviceGroupsDialogBool: false,
		newDeviceGroupName: null,
		// bound to devices-list.handlebars
		changedDeviceGroupName: null,
		selectedDeviceGroup: null,
		selectedDeviceGroupForDelete: null,

		// bound to devices-list.handlebars
		showAddToGroupDialog: function() {
			this.set('selectedDeviceGroup', null);
			this.set('showAddToGroupDialogBool', true);
		},

		showRemoveFromGroupDialog: function() {
			this.set('showRemoveFromGroupDialogBool', true);
		},

		cancelAddToGroup: function() {
			this.set('showAddToGroupDialogBool', false);
		},

		showManageDeviceGroupsDialog: function() {
			this.set('newDeviceGroupName', null);
			this.set('changedDeviceGroupName', null);
			this.set('selectedDeviceGroup', null);
			this.set('showManageDeviceGroupsDialogBool', true);
		},

		cancelManageDeviceGroups: function() {
			this.set('showManageDeviceGroupsDialogBool', false);
		},

		doAddToGroup: function() {
			if(this.get('selectedDeviceGroup') !== null) {
				var selectedDeviceGroupId = this.selectedDeviceGroup.get('keyId');
				var selectedDeviceGroupName = this.selectedDeviceGroup.get('code');
				var selectedDevices = FLOW.store.filter(FLOW.Device, function(data) {
					if(data.get('isSelected') === true) {
						return true;
					} else {
						return false;
					}
				});
				selectedDevices.forEach(function(item) {
					item.set('deviceGroupName', selectedDeviceGroupName);
					item.set('deviceGroup', selectedDeviceGroupId);
				});
			}
			FLOW.store.commit();
			this.set('showAddToGroupDialogBool', false);
		},

		// TODO repopulate list after update
		doRemoveFromGroup: function() {
			var selectedDevices = FLOW.store.filter(FLOW.Device, function(data) {
				if(data.get('isSelected') === true) {
					return true;
				} else {
					return false;
				}
			});
			selectedDevices.forEach(function(item) {
				item.set('deviceGroupName', null);
				item.set('deviceGroup', null);
			});

			FLOW.store.commit();
			this.set('showRemoveFromGroupDialogBool', false);
		},

		cancelRemoveFromGroup: function() {
			this.set('showRemoveFromGroupDialogBool', false);
		},

		copyDeviceGroupName: function() {
			if(this.get('selectedDeviceGroup') !== null) {
				this.set('changedDeviceGroupName', this.selectedDeviceGroup.get('code'));
			}
		}.observes('this.selectedDeviceGroup'),

		// TODO update device group name in tabel.
		doManageDeviceGroups: function() {
			var allDevices;
			if(this.get('selectedDeviceGroup') !== null) {
				var selectedDeviceGroupId = this.selectedDeviceGroup.get('keyId');

				// this could have been changed in the UI
				var originalSelectedDeviceGroup = FLOW.store.find(FLOW.DeviceGroup, selectedDeviceGroupId);

				if(originalSelectedDeviceGroup.get('code') != this.get('changedDeviceGroupName')) {
					var newName = this.get('changedDeviceGroupName');
					originalSelectedDeviceGroup.set('code', newName);

					allDevices = FLOW.store.filter(FLOW.Device, function(data) {
						return true;
					});
					allDevices.forEach(function(item) {
						if(parseInt(item.get('deviceGroup'), 10) == selectedDeviceGroupId) {
							item.set('deviceGroupName', newName);
						}
					});
				}
			} else if(this.get('newDeviceGroupName') !== null) {
				FLOW.store.createRecord(FLOW.DeviceGroup, {
					"code": this.get('newDeviceGroupName')
				});
			}

			this.set('selectedDeviceGroup', null);
			this.set('newDeviceGroupName', null);
			this.set('changedDeviceGroupName', null);

			FLOW.store.commit();
			this.set('showManageDeviceGroupsDialogBool', false);
		},

		deleteDeviceGroup: function() {
			var dgroup, devicesInGroup;
			dgroup = this.get('selectedDeviceGroupForDelete');
			if(dgroup !== null) {

				devicesInGroup = FLOW.store.filter(FLOW.Device, function(item) {
					return item.get('deviceGroup') == dgroup.get('keyId');
				});
				devicesInGroup.forEach(function(item) {
					item.set('deviceGroupName', null);
					item.set('deviceGroup', null);
				});

				FLOW.store.commit();

				dgroup.deleteRecord();
				FLOW.store.commit();
			}
			this.set('showManageDeviceGroupsDialogBool', false);
		}
	});


	// TODO not used?
	FLOW.SavingDeviceGroupView = FLOW.View.extend({
		showDGSavingDialogBool: false,

		showDGSavingDialog: function() {
			if(FLOW.DeviceGroupControl.get('allRecordsSaved')) {
				this.set('showDGSavingDialogBool', false);
			} else {
				this.set('showDGSavingDialogBool', true);
			}
		}.observes('FLOW.deviceGroupControl.allRecordsSaved')
	});

});
define('views/devices/assignments-list-tab-view', [
  'app'
], function(FLOW) {
  FLOW.AssignmentsListTabView = FLOW.View.extend({

    editSurveyAssignment: function(event) {
      FLOW.selectedControl.set('selectedSurveyAssignment', event.context);
      FLOW.router.transitionTo('navDevices.editSurveysAssignment');
    },

    createNewAssignment: function(){
      var newAssignment;
      newAssignment = FLOW.store.createRecord(FLOW.SurveyAssignment,{});
      FLOW.selectedControl.set('selectedSurveyAssignment', newAssignment);
      FLOW.router.transitionTo('navDevices.editSurveysAssignment');
    }
  });

  FLOW.AssignmentView = FLOW.View.extend({
    tagName: 'span',
    
    deleteSurveyAssignment: function() {
      var assignment;
      assignment = FLOW.store.find(FLOW.SurveyAssignment, this.content.get('keyId'));
      if(assignment !== null) {
        assignment.deleteRecord();
        FLOW.store.commit();
      }
    }
  });

});
define('views/devices/assignment-edit-views', [
  'app'
], function(FLOW) {
  // removes duplicate objects with a clientId from an Ember Array

  FLOW.ArrNoDupe = function (a) {
    var templ, i, item = null, gotIt, tempa;
    templ = {};
    tempa = Ember.A([]);
    for(i = 0; i < a.length; i++) {
      templ[a.objectAt(i).clientId] = true;
    }
    for(item in templ) {
      gotIt = false;
      for(i = 0; i < a.length; i++) {
        if(a.objectAt(i).clientId == item && !gotIt) {
          tempa.pushObject(a.objectAt(i));
          gotIt = true;
        }
      }
    }
    return tempa;
  };

  FLOW.formatDate = function (value) {
    if(!Ember.none(value)) {
      return value.getFullYear() + "/" + (value.getMonth() + 1) + "/" + value.getDate();
    } else return null;
  };

  FLOW.AssignmentEditView = FLOW.View.extend({
    devicesPreview: Ember.A([]),
    surveysPreview: Ember.A([]),
    assignmentName: null,
    language: null,

    init: function() {
      var deviceIds, previewDevices, surveyIds, previewSurveys, startDate = null,
        endDate = null;
      previewDevices = Ember.A([]);
      previewSurveys = Ember.A([]);
      this._super();
      this.set('assignmentName', FLOW.selectedControl.selectedSurveyAssignment.get('name'));
      FLOW.selectedControl.set('selectedDevices', null);
      FLOW.selectedControl.set('selectedSurveys', null);
      FLOW.selectedControl.set('selectedSurveyGroup', null);
      FLOW.selectedControl.set('selectedDeviceGroup', null);
      FLOW.surveyControl.set('content', null);
      FLOW.devicesInGroupControl.set('content', null);

      if(FLOW.selectedControl.selectedSurveyAssignment.get('startDate') > 0) {
        startDate = new Date(FLOW.selectedControl.selectedSurveyAssignment.get('startDate'));
      }
      if(FLOW.selectedControl.selectedSurveyAssignment.get('endDate') > 0) {
        endDate = new Date(FLOW.selectedControl.selectedSurveyAssignment.get('endDate'));
      }
      FLOW.dateControl.set('fromDate', FLOW.formatDate(startDate));
      FLOW.dateControl.set('toDate', FLOW.formatDate(endDate));

      this.set('language', FLOW.selectedControl.selectedSurveyAssignment.get('language'));

      deviceIds = Ember.A(FLOW.selectedControl.selectedSurveyAssignment.get('devices'));

      deviceIds.forEach(function(item) {
        previewDevices.pushObjects(FLOW.store.find(FLOW.Device, item));
      });
      this.set('devicesPreview', previewDevices);

      surveyIds = Ember.A(FLOW.selectedControl.selectedSurveyAssignment.get('surveys'));

      surveyIds.forEach(function(item) {
        if (item !== null){
          previewSurveys.pushObjects(FLOW.store.find(FLOW.Survey, item));
        }
      });
      this.set('surveysPreview', previewSurveys);
    },

    detectChangeTab: function() {
      if(Ember.none(FLOW.selectedControl.selectedSurveyAssignment.get('keyId'))) {
        FLOW.selectedControl.get('selectedSurveyAssignment').deleteRecord();
      }
      FLOW.selectedControl.set('selectedSurveyAssignment', null);
    }.observes('FLOW.router.navigationController.selected','FLOW.router.devicesSubnavController.selected'),

    saveSurveyAssignment: function() {
      var sa, endDateParse, startDateParse, devices = [],
        surveys = [];
      sa = FLOW.selectedControl.get('selectedSurveyAssignment');

      sa.set('name', this.get('assignmentName'));

      if(!Ember.none(FLOW.dateControl.get('toDate'))) {
        endDateParse = Date.parse(FLOW.dateControl.get('toDate'));
      } else {
        endDateParse = null;
      }

      if(!Ember.none(FLOW.dateControl.get('fromDate'))) {
        startDateParse = Date.parse(FLOW.dateControl.get('fromDate'));
      } else {
        startDateParse = null;
      }

      sa.set('endDate', endDateParse);
      sa.set('startDate', startDateParse);
      sa.set('language', 'en');

      this.get('devicesPreview').forEach(function(item) {
        devices.push(item.get('keyId'));
      });
      sa.set('devices', devices);

      this.get('surveysPreview').forEach(function(item) {
        surveys.push(item.get('keyId'));
      });
      sa.set('surveys', surveys);

      FLOW.store.commit();
      FLOW.router.transitionTo('navDevices.assignSurveysOverview');
    },

    cancelEditSurveyAssignment: function() {
      if(Ember.none(FLOW.selectedControl.selectedSurveyAssignment.get('keyId'))) {
        FLOW.selectedControl.get('selectedSurveyAssignment').deleteRecord();
      }
      FLOW.selectedControl.set('selectedSurveyAssignment', null);
      FLOW.router.transitionTo('navDevices.assignSurveysOverview');
    },

    addSelectedDevices: function() {
      this.devicesPreview.pushObjects(FLOW.selectedControl.get('selectedDevices'));
      // delete duplicates
      this.set('devicesPreview', FLOW.ArrNoDupe(this.get('devicesPreview')));
    },

    addSelectedSurveys: function() {
      var sgName;
      sgName = FLOW.selectedControl.selectedSurveyGroup.get('code');
      FLOW.selectedControl.get('selectedSurveys').forEach(function(item) {
        item.set('surveyGroupName', sgName);
      });
      this.surveysPreview.pushObjects(FLOW.selectedControl.get('selectedSurveys'));
      // delete duplicates
      this.set('surveysPreview', FLOW.ArrNoDupe(this.get('surveysPreview')));
    },

    selectAllDevices: function() {
      var selected = Ember.A([]);
      FLOW.devicesInGroupControl.get('content').forEach(function(item) {
        selected.pushObject(item);
      });
      FLOW.selectedControl.set('selectedDevices', selected);
    },

    deselectAllDevices: function() {
      FLOW.selectedControl.set('selectedDevices', []);
    },

    selectAllSurveys: function() {
      var selected = Ember.A([]);
      FLOW.surveyControl.get('content').forEach(function(item) {
        selected.pushObject(item);
      });
      FLOW.selectedControl.set('selectedSurveys', selected);
    },

    deselectAllSurveys: function() {
      FLOW.selectedControl.set('selectedSurveys', []);
    },

    removeSingleSurvey: function(event) {
      var id, surveysPreview, i;
      id = event.context.get('clientId');
      surveysPreview = this.get('surveysPreview');
      for(i = 0; i < surveysPreview.length; i++) {
        if(surveysPreview.objectAt(i).clientId == id) {
          surveysPreview.removeAt(i);
        }
      }
      this.set('surveysPreview', surveysPreview);
    },

    removeAllSurveys: function() {
      this.set('surveysPreview', Ember.A([]));
    },

    removeSingleDevice: function(event) {
      var id, devicesPreview, i;
      id = event.context.get('clientId');
      devicesPreview = this.get('devicesPreview');
      for(i = 0; i < devicesPreview.length; i++) {
        if(devicesPreview.objectAt(i).clientId == id) {
          devicesPreview.removeAt(i);
        }
      }
      this.set('devicesPreview', devicesPreview);
    },

    removeAllDevices: function() {
      this.set('devicesPreview', Ember.A([]));
    }
  });

});
define('views/devices/survey-bootstrap-view', [
  'app'
], function(FLOW) {
  // I18N
  // Ember.String.loc('_request_submitted_email_will_be_sent');

  FLOW.SurveyBootstrap = FLOW.View.extend({
    surveysPreview: Ember.A([]),
    includeDBInstructions: false,
    dbInstructions: '',
    notificationEmail: '',

    init: function () {
      this._super();
      FLOW.selectedControl.set('selectedSurveys', null);
    },

    selectAllSurveys: function () {
      var selected = Ember.A([]);
      FLOW.surveyControl.get('content').forEach(function(item) {
        selected.pushObject(item);
      });
      FLOW.selectedControl.set('selectedSurveys', selected);
    },

    deselectAllSurveys: function () {
      FLOW.selectedControl.set('selectedSurveys', []);
    },

    addSelectedSurveys: function() {
      var sgName = FLOW.selectedControl.selectedSurveyGroup.get('code');

      FLOW.selectedControl.get('selectedSurveys').forEach(function(item) {
        item.set('surveyGroupName', sgName);
      });

      this.surveysPreview.pushObjects(FLOW.selectedControl.get('selectedSurveys'));
      // delete duplicates
      this.set('surveysPreview', FLOW.ArrNoDupe(this.get('surveysPreview')));
    },

    removeSingleSurvey: function(event) {
      var id, surveysPreview, i;
      id = event.context.get('clientId');
      surveysPreview = this.get('surveysPreview');
      for(i = 0; i < surveysPreview.length; i++) {
        if(surveysPreview.objectAt(i).clientId == id) {
          surveysPreview.removeAt(i);
        }
      }
      this.set('surveysPreview', surveysPreview);
    },

    removeAllSurveys: function() {
      this.set('surveysPreview', Ember.A([]));
    },

    sendSurveys: function () {
      var surveyIds, payload;

      if (this.get('surveysPreview').length === 0 && !this.get('includeDBInstructions')) {
        this.showMessage(Ember.String.loc('_survey_or_db_instructions_required'));
        return;
      }

      if(this.get('includeDBInstructions') && this.get('dbInstructions') === '') {
        this.showMessage(Ember.String.loc('_missing_db_instructions'));
        return;
      }

      if(!this.get('notificationEmail')) {
        this.showMessage(Ember.String.loc('_notification_email_required'));
        return;
      }

      payload = {
        action: 'generateBootstrapFile',
        email: this.get('notificationEmail')
      };

      surveyIds = [];

      this.get('surveysPreview').forEach(function (item) {
        surveyIds.push(item.get('keyId'));
      });

      payload.surveyIds = surveyIds;

      if (this.get('includeDBInstructions')) {
        payload.dbInstructions = this.get('dbInstructions');
      }

      FLOW.store.findQuery(FLOW.Action, payload);

      this.reset();
    },

    showMessage: function (msg) {
      FLOW.dialogControl.set('activeAction', 'ignore');
      FLOW.dialogControl.set('header', Ember.String.loc('_manual_survey_transfer'));
      FLOW.dialogControl.set('message', msg);
      FLOW.dialogControl.set('showCANCEL', false);
      FLOW.dialogControl.set('showDialog', true);
    },

    reset: function () {
      this.removeAllSurveys();
      this.deselectAllSurveys();
      this.set('dbInstructions', '');
      this.set('includeDBInstructions', false);
      this.set('notificationEmail', '');
    }
  });

});
define('views/users/user-views', [
  'app'
], function(FLOW) {
  FLOW.UserListView = FLOW.View.extend({
    showAddUserBool: false,
    showEditUserBool: false,

    showAddUserDialog: function() {
      var userPerm;
      FLOW.editControl.set('newUserName', null);
      FLOW.editControl.set('newEmailAddress', null);

      userPerm = FLOW.permissionLevelControl.find(function(item) {
        return item.value == 20; // USER
      });
      FLOW.editControl.set('newPermissionLevel', userPerm);

      this.set('showAddUserBool', true);
    },

    doAddUser: function() {
      var value = null,
        superAdmin = false;
      if(FLOW.editControl.newPermissionLevel !== null) {
        value = FLOW.editControl.newPermissionLevel.value;
      } else {
        value = null;
      }

      if(value === 0) {
        value = 20; // Can't create a Super Admin from UI
        superAdmin = true;
      }

      FLOW.store.createRecord(FLOW.User, {
        "userName": FLOW.editControl.get('newUserName'),
        "emailAddress": FLOW.editControl.get('newEmailAddress'),
        "permissionList": value
      });

      FLOW.store.commit();
      this.set('showAddUserBool', false);

      if(superAdmin) {
        this.showRoleWarning();
      }

    },

    cancelAddUser: function() {
      this.set('showAddUserBool', false);
    },

    showEditUserDialog: function(event) {
      var permission = null;
      FLOW.editControl.set('editUserName', event.context.get('userName'));
      FLOW.editControl.set('editEmailAddress', event.context.get('emailAddress'));
      FLOW.editControl.set('editUserId', event.context.get('keyId'));

      permission = FLOW.permissionLevelControl.find(function(item) {
        return item.value == event.context.get('permissionList');
      });

      FLOW.editControl.set('editPermissionLevel', permission);
      this.set('showEditUserBool', true);
    },

    doEditUser: function() {
      var user, superAdmin = false;
      user = FLOW.store.find(FLOW.User, FLOW.editControl.get('editUserId'));
      user.set('userName', FLOW.editControl.get('editUserName'));
      user.set('emailAddress', FLOW.editControl.get('editEmailAddress'));

      if(FLOW.editControl.editPermissionLevel !== null) {
        if(FLOW.editControl.editPermissionLevel.value === 0) {
          superAdmin = true;
          user.set('permissionList', 20); // Can't change to Super Admin
        } else {
          user.set('permissionList', FLOW.editControl.editPermissionLevel.value);
        }
      }

      FLOW.store.commit();
      this.set('showEditUserBool', false);

      if(superAdmin) {
        this.showRoleWarning();
      }
    },

    cancelEditUser: function() {
      this.set('showEditUserBool', false);
    },

    showRoleWarning: function() {
      FLOW.dialogControl.set('activeAction', 'ignore');
      FLOW.dialogControl.set('header', Ember.String.loc('_manage_users_and_user_rights'));
      FLOW.dialogControl.set('message', Ember.String.loc('_cant_set_superadmin'));
      FLOW.dialogControl.set('showCANCEL', false);
      FLOW.dialogControl.set('showDialog', true);
    }
  });

  FLOW.UserView = FLOW.View.extend({
    tagName: 'span',
    deleteUser: function() {
      var user;
      user = FLOW.store.find(FLOW.User, this.content.get('keyId'));
      if(user !== null) {
        user.deleteRecord();
        FLOW.store.commit();
      }
    }
  });

  FLOW.SingleUserView = FLOW.View.extend({
    tagName: 'td',
    permissionLevel: null,
    roleLabel: null,

    init: function() {
      var role = null;
      this._super();

      role = FLOW.permissionLevelControl.find(function (item) {
        return item.value == this.content.get('permissionList');
      }, this);


      if(Ember.none(role)) {
        this.set('roleLabel', Ember.String.loc('_please_reset_the_role_for_this_user'));
        this.set('roleClass', 'notFound');
      } else {
        this.set('roleLabel', role.label);
        this.set('roleClass', Ember.String.camelize(role.label));
      }
    }
  });

});
define("views/users/user-view", function(){});

define('views/views', [
  'app',
  'views/maps/map-views-common',
  'views/surveys/preview-view',
  'views/surveys/notifications-view',
  'views/surveys/survey-group-views',
  'views/surveys/survey-details-views',
  'views/data/inspect-data-table-views',
  'views/data/data-attribute-views',
  'views/data/bulk-upload-view',
  'views/surveys/question-view',
  'views/data/question-answer-view',
  'views/reports/report-views',
  'views/reports/export-reports-views',
  'views/maps/map-views-common',
  'views/messages/message-view',
  'views/devices/devices-views',
  'views/devices/assignments-list-tab-view',
  'views/devices/assignment-edit-views',
  'views/devices/survey-bootstrap-view',
  'views/users/user-view'
], function(FLOW) {

  // ***********************************************//
  //                      Navigation views
  // ***********************************************//
  
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
        Ember.STRINGS = FLOW_STRINGS.STRINGS_FR;
        break;
      case 'es':
        Ember.STRINGS = FLOW_STRINGS.STRINGS_ES; 
        break;
      default:
        Ember.STRINGS = FLOW_STRINGS.STRINGS_EN;
        break;
      }
    }
  });


  FLOW.locale = function(i18nKey) {
    var i18nValue;
    try {
      i18nValue = Ember.String.loc(i18nKey);
    }
    catch (err) {
      return i18nKey;
    }
    return i18nValue;
  };

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


  Ember.Handlebars.registerHelper('placemarkDetail', function () {
    var answer, markup, question;

    question = Ember.get(this, 'questionText');
    answer = Ember.get(this, 'stringValue').replace(/\|/g, ' | ');

    markup = '<div class="defListWrap"><dt>' +
      question + ':</dt><dd>' +
      answer + '</dd></div>';

    return new Handlebars.SafeString(markup);
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
  //                      main navigation
  // ********************************************************//
  FLOW.NavigationView = Ember.View.extend({
    templateName: 'application/navigation',
    selectedBinding: 'controller.selected',

    onLanguageChange: function() {
      this.rerender();
    }.observes('FLOW.dashboardLanguageControl.dashboardLanguage'),

    NavItemView: Ember.View.extend({
      tagName: 'li',
      classNameBindings: 'isActive:current navItem'.w(),

      navItem: function() {
        return this.get('item');
      }.property('item').cacheable(),

      isActive: function() {
        return this.get('item') === this.get('parentView.selected');
      }.property('item', 'parentView.selected').cacheable()
    })
  });

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

  // home screen view
  FLOW.NavHomeView = Ember.View.extend({
    templateName: 'navHome/nav-home'
  });

  // surveys views
  FLOW.NavSurveysView = Ember.View.extend({
    templateName: 'navSurveys/nav-surveys'
  });
  FLOW.NavSurveysMainView = Ember.View.extend({
    templateName: 'navSurveys/nav-surveys-main'
  });

  FLOW.NavSurveysEditView = Ember.View.extend({
    templateName: 'navSurveys/nav-surveys-edit'
  });

  FLOW.ManageNotificationsView = Ember.View.extend({
    templateName: 'navSurveys/manage-notifications'
  });

  FLOW.EditQuestionsView = Ember.View.extend({
    templateName: 'navSurveys/edit-questions'
  });

  // devices views
  FLOW.NavDevicesView = Ember.View.extend({
    templateName: 'navDevices/nav-devices'
  });

  FLOW.CurrentDevicesView = FLOW.View.extend({
    templateName: 'navDevices/devices-list-tab/devices-list'
  });

  FLOW.AssignSurveysOverviewView = FLOW.View.extend({
    templateName: 'navDevices/assignment-list-tab/assignment-list'
  });

  FLOW.EditSurveyAssignmentView = Ember.View.extend({
    templateName: 'navDevices/assignment-edit-tab/assignment-edit'
  });

  FLOW.SurveyBootstrapView = FLOW.View.extend({
    templateName: 'navDevices/bootstrap-tab/survey-bootstrap'
  });

  // data views
  FLOW.NavDataView = Ember.View.extend({
    templateName: 'navData/nav-data'
  });

  FLOW.InspectDataView = Ember.View.extend({
    templateName: 'navData/inspect-data'
  });

  FLOW.ManageAttributesView = Ember.View.extend({
    templateName: 'navData/manage-attributes'
  });

  FLOW.BulkUploadView = Ember.View.extend({
    templateName: 'navData/bulk-upload'
  });
  FLOW.DataCleaningView = Ember.View.extend({
    templateName: 'navData/data-cleaning'
  });

  // reports views
  FLOW.NavReportsView = Ember.View.extend({
    templateName: 'navReports/nav-reports'
  });

  FLOW.ExportReportsView = Ember.View.extend({
    templateName: 'navReports/export-reports'
  });

  FLOW.ChartReportsView = Ember.View.extend({
    templateName: 'navReports/chart-reports'
  });


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

  // users views
  FLOW.NavUsersView = Ember.View.extend({
    templateName: 'navUsers/nav-users'
  });

  // Messages views
  FLOW.NavMessagesView = Ember.View.extend({
    templateName: 'navMessages/nav-messages'
  });

  // admin views
  FLOW.NavAdminView = FLOW.View.extend({
    templateName: 'navAdmin/nav-admin'
  });

  FLOW.HeaderView = FLOW.View.extend({
    templateName: 'application/header-common'
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
});
require.config({
  paths: {
    'flowenv': '/flowenv'
    // 'ui-strings': '/ui-strings'
  },
  shim:{
    'flowenv': {
      exports: 'flowenv'
    }
    // 'ui-strings': {
    //   exports: 'ui-strings'
    // }
  }
});

require([
  'app',
  'router/router',
  'models/FLOWrest-adapter-v2-common',
  'controllers/controllers',
  'templates',
  'views/views'
  // 'flowenv'
  // 'ui-strings'
], function () {
  console.log('Get in the FLOW...');
});


// ---------------------------------------------------------------------------
// require('akvo-flow/all_locales');
// require('akvo-flow/models/FLOWrest-adapter-v2-common');
// require('akvo-flow/models/models');
// require('akvo-flow/flowenv');
// require('akvo-flow/controllers/controllers');
// require('akvo-flow/views/views');
// require('akvo-flow/router/router');
// FLOW.initialize();
define("main", function(){});
