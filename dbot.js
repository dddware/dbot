var irc = require('irc')

  , dbot = {
      client: null,
      plugins: [],

      // Bot config
      // TODO: read this from a config file on init
      config: {
        server: 'irc.freenode.net',
        channels: ['#ddd'],
        nick: 'fdkgnrthrth'
      },

      plug: function (plugin) {
        this.plugins.push(plugin);
      },

      match: function (from, to, message, regex, callback) {
        var matches = message.match(regex);

        if (matches) {
          callback.call(this, from, to, matches);
        }
      },

      init: function () {
        var bot = this;

        // TODO: put this in config as well (will need to set plugins aside as separate repos)
        // TODO: try ^ at the start of regexes
        bot.plug(require('./plugins/dpaste'));
        bot.plug(require('./plugins/dfill'));

        bot.client = new irc.Client(
          bot.config.server,
          bot.config.nick,
          {
            channels: bot.config.channels/*,
            debug: true*/
          }
        );

        bot.client.addListener('error', function (message) {
            console.log('error: ', message);
        });

        // Listen to channel messages
        bot.client.addListener('message', function (from, to, message) {
          if (to.indexOf('#') === 0) {
            bot.plugins.forEach(function (plugin) {
              bot.match(from, to, message, plugin.regex, plugin.callback);
            });
          }
        });
      }
    };

dbot.init();