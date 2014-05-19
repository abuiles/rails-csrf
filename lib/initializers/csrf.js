export default {
  name: 'csrf',
  initialize: function(container, app) {
    app.inject('route', 'csrf', 'rails-csrf:service');
    app.inject('controller', 'csrf', 'rails-csrf:service');
  }
};
