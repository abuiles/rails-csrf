var dist = require('broccoli-dist-es6-module');

module.exports = dist('lib', {
  main: 'main',
  global: 'rails.csrf',
  packageName: 'rails-csrf',
  shim: {
    'ember': 'Ember',
    'ic-ajax': 'ic.ajax'
  }
});
