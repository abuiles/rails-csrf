"use strict";
var __config__ = {
  url: 'api/csrf'
};

function set(key, value) {
  __config__[key] = value;
};
exports.set = set;
function get(key) {
  return __config__[key];
};
exports.get = get;