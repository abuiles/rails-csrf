export default {
  name: 'rails-csrf',
  initialize: function(app) {
    let App = arguments[1] || app;
    App.inject('route',      'csrf', 'service:csrf');
    App.inject('controller', 'csrf', 'service:csrf');
  }
};
