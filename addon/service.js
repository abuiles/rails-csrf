import Ember from 'ember';
import { request } from 'ic-ajax';
import { get as readFromConfig } from './config';

export default Ember.Object.extend({
  onAjaxComplete: function() {
    var _this = this;
    Ember.$(document).on("ajaxComplete", function(event, xhr, settings) {
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
    var param = Ember.keys(data)[0];
    this.set('data', { param: param, token: data[param] });
    this.setPrefilter();

    return this.get('data');
  },
  fetchToken: function() {
    var promise;
    var _this = this;

    if (this.get('data')) {
      promise = Ember.RSVP.resolve(this.get('data'));
    } else {
      var token = Ember.$('meta[name="csrf-token"]').attr('content');

      if (!Ember.isEmpty(token)) {
        promise = Ember.RSVP.resolve({'authenticity_token': token });
      } else {
        promise = request(readFromConfig('url'));
      }

      promise = promise.then(function(data) {
        return _this.setData(data);
      });
    }

    return promise;
  }
});
