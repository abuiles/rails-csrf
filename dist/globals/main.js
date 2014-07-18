!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.rails||(f.rails={})).csrf=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var __config__ = {
  url: 'api/csrf'
};

function set(key, value) {
  __config__[key] = value;
};
exports.set = set;
function get(key) {
  return __config__[key];
};
exports.get = get;
},{}],2:[function(_dereq_,module,exports){
"use strict";
var Service = _dereq_("./service")["default"] || _dereq_("./service");
var Config = _dereq_("./config")["default"] || _dereq_("./config");

function setCsrfUrl(csrfURL) {
  Config.set('url', csrfURL);
}
exports.Service = Service;
exports.setCsrfUrl = setCsrfUrl;
},{"./config":1,"./service":3}],3:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var request = window.ic.ajax.request;
var Config = _dereq_("./config")["default"] || _dereq_("./config");

exports["default"] = Ember.Object.extend({
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
},{"./config":1}]},{},[2])
(2)
});