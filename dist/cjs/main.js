"use strict";
var Service = require("./service")["default"] || require("./service");
var Config = require("./config")["default"] || require("./config");

function setCsrfUrl(csrfURL) {
  Config.set('url', csrfURL);
}
exports.Service = Service;
exports.setCsrfUrl = setCsrfUrl;