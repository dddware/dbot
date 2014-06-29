var list = require('../plugins/list.js');

// Mock bot plugin list
list.plugins = [];
list.plugins.push(list);

describe('list', function () {
  it('should retrieve plugin list', function () {
    list.callback().then(function (result) {
      expect(result).toEqual(list.regex + ' ' + list.description);
    });
  });
});