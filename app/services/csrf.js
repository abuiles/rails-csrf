import Ember from 'ember';

export default Ember.Object.extend({
  onAjaxComplete: function() {
    var _this = this;
    this.fetchToken();

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
    var _this = this;
    var token = Ember.$('meta[name="csrf-token"]').attr('content') || '';

    return Ember.RSVP.resolve().then(function() {
      return _this.setData({'authenticity_token': token });
    });
  }
});
