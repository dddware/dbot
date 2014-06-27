var http = require('follow-redirects').http;

module.exports = {
  description: 'Generates placeholder text as n lines of song lyrics',
  regex: /^dfill ([1-9][0-9]*)$/,

  callback: function(from, matches) {
    var bot = this

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
            bot.client.say(from, JSON.parse(buffer).join(' '));
          });
        });

    req.end();
  }
};
