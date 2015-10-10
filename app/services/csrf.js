import Ember from 'ember';

const { isPresent, RSVP } = Ember;

export default Ember.Service.extend({

  data: Ember.computed(function() {
    return {};
  }),

  param: 'authenticity_token',

  onAjaxComplete: Ember.on('init', function() {
    this.fetchToken();

    Ember.$(document).on('ajaxComplete', (event, xhr) => {
      const param = xhr.getResponseHeader('X-CSRF-Token');
      if (isPresent(param)) {
        this.set('param', param);
      }

      this.setData(xhr.getResponseHeader('X-CSRF-Token'));
    });
  }),

  setPrefilter() {
    $.ajaxPrefilter((options, originalOptions, jqXHR) => {
      jqXHR.setRequestHeader('X-CSRF-Token', this.get(`data.${this.get('param')}`));
    });
  },

  fetchToken() {
    const token = Ember.$('meta[name="csrf-token"]').attr('content') || '';

    return RSVP.resolve().then(() => {
      return this.setData(token);
    });
  },

  setData(value) {
    if (isPresent(value)) {
      this.set(`data.${this.get('param')}`, value);
      this.setPrefilter();
    }

    return this.get('data');
  },
});
