define("rails-csrf/config",
  ["exports"],
  function(__exports__) {
    "use strict";
    var __config__ = {
      url: 'api/csrf'
    };

    function set(key, value) {
      __config__[key] = value;
    };
    __exports__.set = set;
    function get(key) {
      return __config__[key];
    };
    __exports__.get = get;
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
  ["./service","./config","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Service = __dependency1__["default"] || __dependency1__;
    var Config = __dependency2__["default"] || __dependency2__;

    function setCsrfUrl(csrfURL) {
      Config.set('url', csrfURL);
    }
    __exports__.Service = Service;
    __exports__.setCsrfUrl = setCsrfUrl;
  });
define("rails-csrf/service",
  ["ember","ic-ajax","./config","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var request = __dependency2__.request;
    var Config = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = Ember.Object.extend({
      onAjaxComplete: function() {
        var _this = this;
        $(document).on("ajaxComplete", function(event, xhr, settings) {
          var csrf_param = xhr.getResponseHeader('X-CSRF-Param'),
          csrf_token = xhr.getResponseHeader('X-CSRF-Token');

          if (csrf_param && csrf_token) {
            _this.setData({csrf_param: csrf_token});
          }
        });
      }.on('init'),
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
            promise = request(Config.get('url'));
          }

          promise = promise.then(setData);
        }

        return promise;
      }
    });
  });