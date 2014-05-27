# rails-csrf

Ember-add-on to keep track of your Rails CSRF-token.

## Usage

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

## Config
Include railsCsrf in you ENV with the configuration variables.

Currently `csrfURL` is the only one accepted, by default `api/csrf` is used.



```js
module.exports = function(environment) {
  var ENV = {
    railsCsrf: {
      csrfURL: 'api/v1/csrf_token'
    }
    ...
```

## Returning CSRF-token from Rails

The following controller will return the required payload to get
everything working.

```ruby
class Api::CsrfController < ApplicationController
  def index
    render json: { request_forgery_protection_token => form_authenticity_token }.to_json
  end
end
```

Add route

```
namespace :api do
  get :csrf, to: 'csrf#index'
end
```

## License
rails-csrf is [MIT Licensed](https://github.com/abuiles/rails-csrf/blob/master/LICENSE).
