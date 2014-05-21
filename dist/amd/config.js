define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var Config = ENV.railsCsrf || {};

    __exports__["default"] = {
      csrfURL: Config.csrfURL || 'api/csrf'
    };
  });