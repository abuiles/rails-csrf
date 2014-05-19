import Ember from 'ember';
import { request } from 'ic-ajax';
import config from './config';

export default Ember.Object.extend({
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
