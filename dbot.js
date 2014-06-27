var irc = require('irc')
  , jsonfile = require('jsonfile')

  , dbot = {
      config: jsonfile.readFileSync('./config.json'),
      client: null,
      plugins: [],

      plug: function (plugin) {
        var p;

        try {
          //p = require('dbot-' + plugin); // TODO: plugins as external npm modules
          p = require('./plugins/' + plugin);
          this.plugins.push(p);
        } catch (e) {
          console.log('** ' + plugin + ' plugin was not found! **');
        }
      },

      match: function (from, message, regex, callback) {
        var matches = message.match(regex);

        if (matches) {
          callback.call(this, from, matches);
        }
      },

      init: function () {
        var bot = this;

        for (var i in bot.config.plugins) {
          bot.plug(bot.config.plugins[i]);
        }

        bot.client = new irc.Client(
          bot.config.server,
          bot.config.nick,
          {
            channels: bot.config.channels,
            debug: bot.config.debug
          }
        );

        // Print errors to console
        bot.client.addListener('error', function (message) {
          console.log('error: ', message);
        });

        // Listen to PMs
        bot.client.addListener('pm', function (from, message) {
          bot.plugins.forEach(function (plugin) {
            bot.match(from, message, plugin.regex, plugin.callback);
          });
        });
      }
    };

dbot.init();