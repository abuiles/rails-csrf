import Service from '../service';

export default {
  name: 'csrf',
  initialize: function(container, app) {
    app.register('service:rails-csrf', Service);
    app.inject('route', 'csrf', 'service:rails-csrf');
    app.inject('controller', 'csrf', 'service:rails-csrf');
  }
};
