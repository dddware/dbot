var irc = require('irc')
  , jsonfile = require('jsonfile')
  , deferred = require('deferred')

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

      match: function (message, regex, callback) {
        var matches = message.match(regex);

        if (matches) {
          return callback.call(this, matches);
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
            var response = bot.match(message, plugin.regex, plugin.callback);

            if (deferred.isPromise(response)) {
              response.then(function (result) {
                console.log(result);
                bot.client.say(result);
              });
            }
          });
        });
      }
    };

dbot.init();