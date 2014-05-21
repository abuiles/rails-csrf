define("rails-csrf/config",
  ["exports"],
  function(__exports__) {
    "use strict";
    var Config = ENV.railsCsrf || {};

    __exports__["default"] = {
      csrfURL: Config.csrfURL || 'api/csrf'
    };
  });
define("rails-csrf/initializers/csrf",
  ["../service","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Service = __dependency1__["default"] || __dependency1__;

    __exports__["default"] = {
      name: 'csrf',
      initialize: function(container, app) {
        app.register('service:rails-csrf', Service);
        app.inject('route', 'csrf', 'service:rails-csrf');
        app.inject('controller', 'csrf', 'service:rails-csrf');
      }
    };
  });
define("rails-csrf",
  ["./service","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Service = __dependency1__["default"] || __dependency1__;__exports__.Service = Service;
  });
define("rails-csrf/service",
  ["ember","ic-ajax","./config","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var request = __dependency2__.request;
    var config = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = Ember.Object.extend({
      setPrefilter: function() {
        var token = this.get('data').token;
        var preFilter = function(options, originalOptions, jqXHR) {
          return jqXHR.setRequestHeader('X-CSRF-Token', token );
        };
        $.ajaxPrefilter(preFilter);
      },
      setData: function(data) {
        var param = Object.keys(data)[0];
        this.set('data', { param: param, token: data[param] });
        this.setPrefilter();

        return this.get('data');
      },
      fetchToken: function() {
        var promise;
        var setData = this.setData.bind(this);

        if (this.get('data')) {
          promise = Ember.RSVP.resolve(this.get('data'));
        } else {
          var token = Ember.$('meta[name="csrf-token"]').attr('content');

          if (!Ember.isEmpty(token)) {
            promise = Ember.RSVP.resolve({'authenticity_token': token });
          } else {
            promise = request(config.csrfURL);
          }

          promise = promise.then(setData);
        }

        return promise;
      }
    });
  });