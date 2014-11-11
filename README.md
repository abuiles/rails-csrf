# rails-csrf

ember-cli addon to keep track of your Rails CSRF-token.

## Usage

* `npm install rails-csrf --save`
* In `app.js` add load initializers

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
By default `rails-csrf` does a get request to `/api/csrf`, if you
want to customize the end-point use `setCsrfUrl` on app.js

```js
import { setCsrfUrl } from 'rails-csrf/config';

setCsrfUrl('/api/your/own/endpoint');
...
loadInitializers(App, 'rails-csrf');
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
