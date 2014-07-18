"use strict";
var Ember = require("ember")["default"] || require("ember");
var request = require("ic-ajax").request;
var Config = require("./config")["default"] || require("./config");

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