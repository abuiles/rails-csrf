"use strict";
var Ember = require("ember")["default"] || require("ember");
var request = require("ic-ajax").request;

exports["default"] = Ember.Object.extend({
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