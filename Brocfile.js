module.exports = function(broccoli) {
  return require('broccoli-dist-es6-module')(broccoli.makeTree('lib'), {
    global: 'rcsrf',
    packageName: 'rails-csrf',
    main: 'main'
  });
};
