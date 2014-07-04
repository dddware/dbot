var deferred = require('deferred')
  , http = require('http');

module.exports = {
  description: 'Checks support for given HTML5 feature(s)',
  regex: /^html5 (.+)$/,

  callback: function(matches) {
    var d = deferred()

      , browsers = {
          firefox: 'Firefox',
          opera: 'Opera (desktop)',
          op_mob: 'Opera (mobile)',
          chrome: 'Chrome',
          safari: 'Safari (desktop)',
          ios_saf: 'Safari (iOS)',
          ie: 'Internet Explorer'
        }

      , params = {
          host: 'api.html5please.com',
          port: 80,
          method: 'GET',
          path: '/' + encodeURIComponent(matches[1]) + '.json?noagent'
        }

      , req = http.request(params, function (res) {
          res.setEncoding('utf8');
          var buffer = '';

          res.on('data', function (chunk) {
            buffer += chunk;
          });

          res.on('end', function () {
            var data = JSON.parse(buffer).result
              , result = '';

            for (var i in data) {
              result += i + ":\n";

              for (var j in data[i]) {
                if (browsers.hasOwnProperty(j)) {
                  result += browsers[j] + ': ' + data[i][j] + "\n";
                }
              }
            }

            d.resolve(result);
          });
        });

    req.end();
    return d.promise;
  }
};
