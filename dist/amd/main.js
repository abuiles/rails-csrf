define(
  ["./service","./config","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Service = __dependency1__["default"] || __dependency1__;
    var Config = __dependency2__["default"] || __dependency2__;

    function setCsrfUrl(csrfURL) {
      Config.set('url', csrfURL);
    }
    __exports__.Service = Service;
    __exports__.setCsrfUrl = setCsrfUrl;
  });