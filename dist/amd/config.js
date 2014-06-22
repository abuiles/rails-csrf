define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var __config__ = {
      url: 'api/csrf'
    };

    function set(key, value) {
      __config__[key] = value;
    };
    __exports__.set = set;
    function get(key) {
      return __config__[key];
    };
    __exports__.get = get;
  });