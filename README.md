rails-csrf
==========
Ember-add-on to keep track of your Rails CSRF-token.

Usage
-----
* Add `"rails-csrf": "abuiles/rails-csrf"` to your bower.json
* Import the library in your Brocfile

```js
app.import('vendor/rails-csrf/dist/named-amd/main.js', {
  'rails-csrf': [
    'service'
  ]
});
```
* In `app.js` load initializers
```js
loadInitializers(App, 'rails-csrf');
```

* Add a before model to your application route so your token is
  fetched automatically.

```js
  export default Ember.Route.extend({
    beforeModel: function() {
      return this.csrf.fetchToken();
    }
  });
```
