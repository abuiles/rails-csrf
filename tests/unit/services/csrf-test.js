import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:csrf', 'unit:service:csrf#onAjaxComplete');

test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});
