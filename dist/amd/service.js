define(
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
      },
      fetchToken: function() {
        var setToken = this.setData.bind(this);
        if (!this.get('data')) {
          return request(config.csrfURL).then(setToken);
        }
      }
    });
  });