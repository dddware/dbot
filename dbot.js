var irc = require('irc'),
    http = require('follow-redirects').http;



var dbot = {
  client: null,

  config: {
    server: 'irc.freenode.net',
    channels: ['#ddd'],
    nick: 'dbot',

    dfill: function (amount) {
      return {
        host: 'dfill.cc',
        port: 80,
        method: 'GET',
        path: '/api/' + amount
      }
    }
  },

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

    bot.client.addListener('message', function (from, to, text, message) {
      // That's a channel message, right ?
      if (to.indexOf('#') === 0) {
        // dfill

        var dfill_matches = text.match(/!dfill ([1-9][0-9]*)/);

        if (dfill_matches) {
          http.request(bot.config.dfill(dfill_matches[1]), function (res) {
            res.setEncoding('utf8');
            var buffer = '';

            res.on('data', function (chunk) {
              buffer += chunk;
            });

            res.on('end', function () {
              bot.client.say(to, JSON.parse(buffer).join(' '));
            });
          }).end();
        }



        // More to come !
      }
    });
  }
};



dbot.init();