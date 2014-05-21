"use strict";
var Config = ENV.railsCsrf || {};

exports["default"] = {
  csrfURL: Config.csrfURL || 'api/csrf'
};