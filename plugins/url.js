var deferred = require('deferred')
  , https = require('https');

module.exports = {
  description: 'Lists available plugins',
  regex: /^url (.+)$/,

  callback: function(from, matches) {
    var d = deferred()
      , accessToken = "31d060a5ac7acc79e636d6fa2691b6355620407d"

      , params = {
          host: 'api-ssl.bitly.com',
          port: 443,
          method: 'GET',
          path: 
            '/v3/shorten?'
            + 'access_token=' + accessToken 
            + '&longUrl=' + encodeURIComponent(matches[1])
        }

      , req = https.request(params, function (res) {
          res.setEncoding('utf8');
          var buffer = '';

          res.on('data', function (chunk) {
            buffer += chunk;
          });

          res.on('end', function () {
            d.resolve(JSON.parse(buffer).data.url);
          });
        });

    req.end();
    return d.promise;
  }
};