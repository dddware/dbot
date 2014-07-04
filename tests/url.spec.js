var AsyncSpec = require('jasmine-async')(jasmine)
  , url = require('../plugins/url.js');

// Mock regex matches
var matches = ['', 'http://test.com']
  , pattern = /http:\/\/bit\.ly\/([a-zA-Z0-9]{7})/;

describe('url', function () {
  var async = new AsyncSpec(this)
    , asyncResult;

  async.it('should retrieve a valid URL', function (done) {
    url.callback(matches).then(function (result) {
      expect(result).toMatch(pattern);

      done();
    });
  });
});