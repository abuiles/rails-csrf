export default {
  name: 'rails-csrf',
  initialize: function() {
    let app = arguments[1] || arguments[0];
    app.inject('route',      'csrf', 'service:csrf');
    app.inject('controller', 'csrf', 'service:csrf');
  }
};
