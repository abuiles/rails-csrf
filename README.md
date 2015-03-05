# rails-csrf

ember-cli addon to keep track of your Rails CSRF-token.

## Usage

* `npm install rails-csrf --save`

Add a meta tag like the following to your app body and the addon will
do the rest:

```
<meta content="adfadfadsfi34/sdfadfadf=" name="csrf-token">
```

## Working With Integration Tests
Be sure to mock out the call to the csrf server endpoint. Otherwise your tests
will fail with 
```
"error while processing route: [route]"
```
messages in the browser console. For example:

```
server = new Pretender(function() {
this.get('/csrf', function(request) {
  return [200, {"Content-Type": "application/json"},
    JSON.stringify({
      "authenticity_token": "token"
    })
  ];
});
```

## License
rails-csrf is [MIT Licensed](https://github.com/abuiles/rails-csrf/blob/master/LICENSE).
