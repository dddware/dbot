var http = require('follow-redirects').http
  , qs = require('qs');

module.exports = {
  regex: /!dpaste (.+)/,

  callback: function(from, to, matches) {
    var bot = this

      , data = qs.stringify({
          paste: matches[1]
        })

      , params = {
          host: 'dpaste.cc',
          port: 80,
          method: 'POST',
          path: '/paste/new',
          headers: {
            'User-Agent': 'curl',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
          }
        }

      , req = http.request(params, function (res) {
          res.setEncoding('utf8');
          var buffer = '';

          res.on('data', function (chunk) {
            buffer += chunk;
          });

          res.on('end', function () {
            bot.client.say(from, buffer);
          });
        });

    req.write(data);
    req.end();
  }
};
