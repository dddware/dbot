var irc = require('irc'),
    http = require('follow-redirects').http,
    qs = require('qs'),

    dbot = {
      client: null,

      // Bot config
      // TODO: read this from a config file on init
      config: {
        server: 'irc.freenode.net',
        channels: ['#ddd'],
        nick: 'dbot'
      },

      // HTTP request parameters factories
      http: {
        dfill: function (amount) {
          return {
            host: 'www.dfill.cc',
            port: 80,
            method: 'GET',
            path: '/api/' + amount
          }
        },

        dpaste: function (length) {
          return {
            host: 'www.dpaste.cc',
            port: 80,
            method: 'POST',
            path: '/paste/new',
            headers: {
              'User-Agent': 'curl',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': length
            }
          }
        }    
      },

      // Message matching handler
      match: function (message, regex, callback) {
        var matches = message.match(regex);

        if (matches) {
          callback(matches);
        }
      },

      // Main method
      init: function () {
        var bot = this;

        bot.client = new irc.Client(
          bot.config.server,
          bot.config.nick,
          {
            channels: bot.config.channels
          }
        );

        bot.client.addListener('error', function (message) {
            console.log('error: ', message);
        });

        // Listen to channel messages
        bot.client.addListener('message', function (from, to, message) {
          if (to.indexOf('#') === 0) {

            // dfill
            bot.match(message, /!dfill ([1-9][0-9]*)/, function (matches) {
              http.request(bot.http.dfill(matches[1]), function (res) {
                res.setEncoding('utf8');
                var buffer = '';

                res.on('data', function (chunk) {
                  buffer += chunk;
                });

                res.on('end', function () {
                  bot.client.say(from, JSON.parse(buffer).join(' '));
                });
              }).end();
            });

            // dpaste
            bot.match(message, /!dpaste (.+)/, function (matches) {
              var data = qs.stringify({
                    paste: matches[1]
                  }),

                  req = http.request(bot.http.dpaste(data.length), function (res) {
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
            });

          }
        });
      }
    };

dbot.init();