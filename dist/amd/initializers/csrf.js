define(
  ["../service","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Service = __dependency1__["default"] || __dependency1__;

    __exports__["default"] = {
      name: 'csrf',
      initialize: function(container, app) {
        app.register('service:rails-csrf', Service);
        app.inject('route', 'csrf', 'service:rails-csrf');
        app.inject('controller', 'csrf', 'service:rails-csrf');
      }
    };
  });