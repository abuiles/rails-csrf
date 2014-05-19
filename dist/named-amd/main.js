define("rails-csrf/initializers/csrf",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = {
      name: 'csrf',
      initialize: function(container, app) {
        app.inject('route', 'csrf', 'rails-csrf:service');
        app.inject('controller', 'csrf', 'rails-csrf:service');
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
  ["ember","ic-ajax","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__.Ember;
    var request = __dependency2__.request;

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
      },
      fetchToken: function() {
        var setToken = this.setData.bind(this);
        if (!this.get('data')) {
          return request('api/v1/csrf').then(setToken);
        }
      }
    });
  });