var AsyncSpec = require('jasmine-async')(jasmine)
  , dfill = require('../plugins/dfill.js');

// Mock regex matches
var nb = 10
  , matches = ['', nb];

describe('dfill', function () {
  var async = new AsyncSpec(this)
    , asyncResult;

  async.it('should retrieve some content', function (done) {
    dfill.callback(matches).then(function (result) {
      expect(typeof result).toEqual('string');
      expect(result.length).toBeGreaterThan(nb);

      done();
    });
  });
});