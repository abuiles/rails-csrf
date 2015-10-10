import { moduleFor, test } from 'ember-qunit';
import Pretender from 'pretender';
import Ember from 'ember';

moduleFor('service:csrf', 'unit:service:csrf#data');

test('starts out as an empty object', function(assert) {
  assert.expect(1);

  assert.deepEqual(this.subject().get('data'), {});
});

moduleFor('service:csrf', 'unit:service:csrf#setData', {
  setup() {
    this.csrf = this.subject();
    this.csrf.setData('ma-bob');
  },

  teardown() {
    if (this.server) {
      this.server.shutdown();
    }
  }
});

test('updates the data hash', function(assert) {
  assert.expect(1);
  assert.equal(this.csrf.get('data.authenticity_token'), 'ma-bob');
});

test('sets up the ajax pre-filter with new values', function(assert) {
  assert.expect(1);
  const done = assert.async();

  this.server = new Pretender(function() {
    this.post('/api/songs/99', function(fakeRequest) {
      assert.equal(fakeRequest.requestHeaders["X-CSRF-Token"], 'ma-bob');
      done();
    });
  });

  $.post('/api/songs/99');
});

moduleFor('service:csrf', 'unit:service:csrf#onAjaxComplete', {
  teardown() {
    if (this.server) {
      this.server.shutdown();
    }
  }
});

test('fetches the next authenticity token', function(assert) {
  assert.expect(1);
  const csrf = this.subject();
  const done = assert.async();

  this.server = new Pretender(function() {
    this.post('/api/songs/99/problems', function() {
      return [200, {  }, '{}'];
    });
  });

  this.server.prepareHeaders = function(headers) {
    headers['X-CSRF-Token'] = 'cat and the hat';
    return headers;
  };

  $.post('/api/songs/99/problems');

  Ember.run.later(function() {
    assert.equal(csrf.get('data.authenticity_token'), 'cat and the hat');
    done();
  });
});

test('sets the token key if another one is provided', function(assert) {
  assert.expect(1);
  const csrf = this.subject();
  const done = assert.async();

  this.server = new Pretender(function() {
    this.post('/api/books', function() {
      return [200, {  }, '{}'];
    });
  });

  this.server.prepareHeaders = function(headers) {
    headers['X-CSRF-Token'] = 'cat and the hat';
    headers['X-CSRF-Param'] = 'book';
    return headers;
  };

  $.post('/api/books');

  Ember.run.later(function() {
    assert.equal(csrf.get('data.book'), 'cat and the hat');
    done();
  });
});
