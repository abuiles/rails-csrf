import Ember from 'ember';

export default Ember.Service.extend({

  onAjaxComplete: Ember.on('init', function() {
    this.fetchToken();

    Ember.$(document).on('ajaxComplete', (event, xhr) => {
      const csrf_param = xhr.getResponseHeader('X-CSRF-Param');
      const csrf_token = xhr.getResponseHeader('X-CSRF-Token');

      if (csrf_param && csrf_token) {
        this.setData({csrf_param: csrf_token});
      }
    });
  }),

  setPrefilter() {
    const token     = this.get('data.token');
    const prefilter = (options, originalOptions, jqXHR) => {
      return jqXHR.setRequestHeader('X-CSRF-Token', token);
    };

    $.ajaxPrefilter(prefilter);
  },

  setData(data) {
    const param = Object.keys(data)[0];

    this.set('data', { param: param, token: data[param] });
    this.setPrefilter();

    return this.get('data');
  },

  fetchToken() {
    const token = Ember.$('meta[name="csrf-token"]').attr('content') || '';

    return Ember.RSVP.resolve().then(() => {
      return this.setData({'authenticity_token': token });
    });
  }
});
