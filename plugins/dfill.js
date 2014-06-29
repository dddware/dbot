var deferred = require('deferred')
  , http = require('follow-redirects').http;

module.exports = {
  description: 'Generates placeholder text as n lines of song lyrics',
  regex: /^dfill ([1-9][0-9]*)$/,

  callback: function(matches) {
    var d = deferred()

      , params = {
          host: 'dfill.cc',
          port: 80,
          method: 'GET',
          path: '/api/' + matches[1]
        }

      , req = http.request(params, function (res) {
          res.setEncoding('utf8');
          var buffer = '';

          res.on('data', function (chunk) {
            buffer += chunk;
          });

          res.on('end', function () {
            d.resolve(JSON.parse(buffer).join(' '));
          });
        });

    req.end();
    return d.promise;
  }
};
