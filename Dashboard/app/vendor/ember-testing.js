(function() {
var slice = [].slice,
    helpers = {},
    originalMethods = {},
    injectHelpersCallbacks = [];

/**
  @class Test
  @namespace Ember
*/
Ember.Test = {

  /**
    @public

    `registerHelper` is used to register a
    test helper that will be injected when
    `App.injectTestHelpers` is called.

    The helper method will always be called
    with the current Application as the first
    parameter.

    For example:
    ```javascript
    Ember.Test.registerHelper('boot', function(app) {
      Ember.run(app, app.deferReadiness);
    });
    ```

    This helper can later be called without arguments
    because it will be called with `app` as the
    first parameter.

    ```javascript
      App = Ember.Application.create();
      App.injectTestHelpers();
      boot();
    ```

    Whenever you register a helper that
    performs async operations,
    make sure you `return wait();` at the
    end of the helper.

    If an async helper also needs to return a value,
    pass it to the `wait` helper as a first argument:
    `return wait(val);`

    @method registerHelper
    @param name {String}
    @param helperMethod {Function}
  */
  registerHelper: function(name, helperMethod) {
    helpers[name] = helperMethod;
  },
  /**
    @public
    @method unregisterHelper
    @param name {String}
  */
  unregisterHelper: function(name) {
    delete helpers[name];
    if (originalMethods[name]) {
      window[name] = originalMethods[name];
    }
    delete originalMethods[name];
  },

  /**
    @public

    Used to register callbacks to be fired
    whenever `App.injectTestHelpers` is called

    The callback will receive the current application
    as an argument.

    @method unregisterHelper
    @param name {String}
  */
  onInjectHelpers: function(callback) {
    injectHelpersCallbacks.push(callback);
  },

  /**
    @public

    This returns a thenable tailored
    for testing.  It catches failed
    `onSuccess` callbacks and invokes
    the `Ember.Test.adapter.exception`
    callback in the last chained then.

    This method should be returned
    by async helpers such as `wait`.

    @method promise
    @param resolver {Function}
  */
  promise: function(resolver) {
    var promise = new Ember.RSVP.Promise(resolver);
    var thenable = {
      chained: false
    };
    thenable.then = function(onSuccess, onFailure) {
      var thenPromise, nextPromise;
      thenable.chained = true;
      thenPromise = promise.then(onSuccess, onFailure);
      // this is to ensure all downstream fulfillment
      // handlers are wrapped in the error handling
      nextPromise = Ember.Test.promise(function(resolve) {
        resolve(thenPromise);
      });
      thenPromise.then(null, function(reason) {
        // ensure this is the last promise in the chain
        // if not, ignore and the exception will propagate
        // this prevents the same error from being fired multiple times
        if (!nextPromise.chained) {
          Ember.Test.adapter.exception(reason);
        }
      });
      return nextPromise;
    };
    return thenable;
  },

  /**
   @public

   Used to allow ember-testing
   to communicate with a specific
   testing framework.

   You can manually set it before calling
   `App.setupForTesting()`.

   Example:
   'Ember.Test.adapter = MyCustomAdapter.create()'

   If you do not set it, ember-testing
   will default to `Ember.Test.QUnitAdapter`.
  */
  adapter: null
};

function curry(app, fn) {
  return function() {
    var args = slice.call(arguments);
    args.unshift(app);
    return fn.apply(app, args);
  };
}

Ember.Application.reopen({
  testHelpers: {},

  setupForTesting: function() {
    Ember.testing = true;

    this.deferReadiness();

    this.Router.reopen({
      location: 'none'
    });

   // if adapter is not manually set
    // default to QUnit
    if (!Ember.Test.adapter) {
       Ember.Test.adapter = Ember.Test.QUnitAdapter.create();
    }
  },

  injectTestHelpers: function() {
    this.testHelpers = {};
    for (var name in helpers) {
      originalMethods[name] = window[name];
      this.testHelpers[name] = window[name] = curry(this, helpers[name]);
    }

    for(var i = 0, l = injectHelpersCallbacks.length; i < l; i++) {
      injectHelpersCallbacks[i](this);
    }
  },

  removeTestHelpers: function() {
    for (var name in helpers) {
      window[name] = originalMethods[name];
      delete this.testHelpers[name];
      delete originalMethods[name];
    }
  }
});

})();



(function() {
/**
 * @module ember
 * @sub-module ember-testing
 */

var $ = Ember.$;

function testCheckboxClick(handler) {
  $('<input type="checkbox">')
    .css({ position: 'absolute', left: '-1000px', top: '-1000px' })
    .appendTo('body')
    .on('click', handler)
    .click()
    .remove();
}

$(function() {
  /**
   * Determine whether a checkbox checked using jQuery's "click" method will have
   * the correct value for its checked property. In some old versions of jQuery
   * (e.g. 1.8.3) this does not behave correctly.
   *
   * If we determine that the current jQuery version exhibits this behavior,
   * patch it to work correctly as in the commit for the actual fix:
   * https://github.com/jquery/jquery/commit/1fb2f92.
   */
  testCheckboxClick(function() {
    if (!this.checked && !$.event.special.click) {
      $.event.special.click = {
        // For checkbox, fire native event so checked state will be right
        trigger: function() {
          if ($.nodeName( this, "input" ) && this.type === "checkbox" && this.click) {
            this.click();
            return false;
          }
        }
      };
    }
  });

  /**
   * Try again to verify that the patch took effect or blow up.
   */
  testCheckboxClick(function() {
    Ember.warn("clicked checkboxes should be checked! the jQuery patch didn't work", this.checked);
  });
});

})();



(function() {
var Test = Ember.Test;

/**
  @class Adapter
  @namespace Ember.Test
*/
Test.Adapter = Ember.Object.extend({
  /**
    @public

    This callback will be called
    whenever an async operation
    is about to start.

    Override this to call your
    framework's methods
    that handle async operations

    @method asyncStart
  */
  asyncStart: Ember.K,

  /**
    @public

    This callback will be called
    whenever an async operation
    has completed.

    @method asyncEnd
  */
  asyncEnd: Ember.K,

  /**
   @public

    Override this method with your
    testing framework's false assertion
    This function is called whenever
    an exception occurs causing the testing
    promise to fail.

    QUnit example:

    ```javascript
    exception: function(error) {
      ok(false, error);
    }
    ```

    @method exception
    @param reason {String}
  */
  exception: function(error) {
    setTimeout(function() {
      throw error;
    });
  }
});

/**
  @class QUnitAdapter
  @namespace Ember.Test
*/
Test.QUnitAdapter = Test.Adapter.extend({
  asyncStart: function() {
    stop();
  },
  asyncEnd: function() {
    start();
  },
  exception: function(error) {
    ok(false, Ember.inspect(error));
  }
});

})();



(function() {
/**
* @module ember
* @sub-module ember-testing
*/

var get = Ember.get,
    Test = Ember.Test,
    helper = Test.registerHelper,
    countAsync = 0;

Test.pendingAjaxRequests = 0;

Test.onInjectHelpers(function() {
  Ember.$(document).ajaxStart(function() {
    Test.pendingAjaxRequests++;
  });

  Ember.$(document).ajaxStop(function() {
    Test.pendingAjaxRequests--;
  });
});


function visit(app, url) {
  app.__container__.lookup('router:main').location.setURL(url);
  Ember.run(app, app.handleURL, url);
  return wait(app);
}

function click(app, selector, context) {
  var $el = findWithAssert(app, selector, context);
  Ember.run($el, 'mousedown');

  if ($el.is(':input')) {
    var type = $el.prop('type');
    if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
      Ember.run($el, 'focus');
    }
  }

  Ember.run($el, 'mouseup');
  Ember.run($el, 'click');

  return wait(app);
}

function keyEvent(app, selector, context, type, keyCode) {
  var $el;
  if (typeof keyCode === 'undefined') {
    keyCode = type;
    type = context;
    context = null;
  }
  $el = findWithAssert(app, selector, context);
  var event = Ember.$.Event(type, { keyCode: keyCode });
  Ember.run($el, 'trigger', event);
  return wait(app);
}

function fillIn(app, selector, context, text) {
  var $el;
  if (typeof text === 'undefined') {
    text = context;
    context = null;
  }
  $el = findWithAssert(app, selector, context);
  Ember.run(function() {
    $el.val(text).change();
  });
  return wait(app);
}

function findWithAssert(app, selector, context) {
  var $el = find(app, selector, context);
  if ($el.length === 0) {
    throw new Error("Element " + selector + " not found.");
  }
  return $el;
}

function find(app, selector, context) {
  var $el;
  context = context || get(app, 'rootElement');
  $el = app.$(selector, context);

  return $el;
}

function wait(app, value) {
  var promise;

  promise = Test.promise(function(resolve) {
    if (++countAsync === 1) {
      Test.adapter.asyncStart();
    }
    var watcher = setInterval(function() {
      var routerIsLoading = app.__container__.lookup('router:main').router.isLoading;
      if (routerIsLoading) { return; }
      if (Test.pendingAjaxRequests) { return; }
      if (Ember.run.hasScheduledTimers() || Ember.run.currentRunLoop) { return; }

      clearInterval(watcher);

      if (--countAsync === 0) {
        Test.adapter.asyncEnd();
      }

      Ember.run(null, resolve, value);
    }, 10);
  });

  return buildChainObject(app, promise);
}

/**
 Builds an object that contains
 all helper methods. This object will be
 returned by helpers and then-promises.

 This allows us to chain helpers:

 ```javascript
  visit('posts/new')
  .click('.add-btn')
  .fillIn('.title', 'Post')
  .click('.submit')
  .then(function() {
    equal('.post-title', 'Post');
  })
  .visit('comments')
  .then(function() {
    equal(find('.comments'),length, 0);
  });
 ```
*/
function buildChainObject(app, promise) {
  var helperName, obj = {};
  for(helperName in app.testHelpers) {
    obj[helperName] = chain(app, promise, app.testHelpers[helperName]);
  }
  obj.then = function(fn) {
    var thenPromise = promise.then(fn);
    return buildChainObject(app, thenPromise);
  };
  return obj;
}

function chain(app, promise, fn) {
  return function() {
    var args = arguments, chainedPromise;
    chainedPromise = promise.then(function() {
      return fn.apply(null, args);
    });
    return buildChainObject(app, chainedPromise);
  };
}

/**
* Loads a route, sets up any controllers, and renders any templates associated
* with the route as though a real user had triggered the route change while
* using your app.
*
* Example:
* 
* ```
* visit('posts/index').then(function() {
*   // assert something
* });
* ```
*
* @method visit
* @param {String} url the name of the route 
* @returns {RSVP.Promise}
*/
helper('visit', visit);

/**
* Clicks an element and triggers any actions triggered by the element's `click`
* event.
*
* Example:
*
* ```
* click('.some-jQuery-selector').then(function() {
*  // assert something
* });
* ```
*
* @method click
* @param {String} selector jQuery selector for finding element on the DOM
* @returns {RSVP.Promise}
*/
helper('click', click);

/**
* Simulates a key event, e.g. `keypress`, `keydown`, `keyup` with the desired keyCode
*
* Example:
*
* ```
* keyEvent('.some-jQuery-selector', 'keypress', 13).then(function() {
*  // assert something
* });
* ```
*
* @method keyEvent
* @param {String} selector jQuery selector for finding element on the DOM
* @param {String} the type of key event, e.g. `keypress`, `keydown`, `keyup`
* @param {Number} the keyCode of the simulated key event
* @returns {RSVP.Promise}
*/
helper('keyEvent', keyEvent);

/**
* Fills in an input element with some text.
*
* Example:
*
* ```
* fillIn('#email', 'you@example.com').then(function() {
*   // assert something
* });
* ```
*
* @method fillIn
* @param {String} selector jQuery selector finding an input element on the DOM
* to fill text with
* @param {String} text text to place inside the input element
* @returns {RSVP.Promise}
*/
helper('fillIn', fillIn);

/**
* Finds an element in the context of the app's container element. A simple alias
* for `app.$(selector)`.
*
* Example:
*
* ```
* var $el = find('.my-selector);
* ```
*
* @method find
* @param {String} selector jQuery string selector for element lookup
* @returns {Object} jQuery object representing the results of the query
*/
helper('find', find);

/**
*
* Like `find`, but throws an error if the element selector returns no results
*
* Example:
*
* ```
* var $el = findWithAssert('.doesnt-exist'); // throws error
* ```
*
* @method findWithAssert
* @param {String} selector jQuery selector string for finding an element within
* the DOM
* @return {Object} jQuery object representing the results of the query
* @throws {Error} throws error if jQuery object returned has a length of 0
*/
helper('findWithAssert', findWithAssert);
helper('wait', wait);

})();



(function() {

})();

