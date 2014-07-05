var irc = require('irc')
  , jsonfile = require('jsonfile')
  , deferred = require('deferred')
  , cp = require('child_process')

  , npmls = function () {
      var d = deferred();

      cp.exec('npm ls --json', function(err, stdout, stderr) {
        d.resolve(JSON.parse(stdout));
      });

      return d.promise;
    }

  , dbot = {
      config: jsonfile.readFileSync('./config.json'),
      client: null,
      plugins: [],

      plug: function (plugin) {
        var p;

        try {
          p = require('dbot-' + plugin);
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

        npmls().then(function (packages) {
          for (pkg in packages.dependencies) {
            if (pkg.match(/dbot-(.+)/)) {
              require(pkg);
            }
          }
        });

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
                bot.client.say(result);
              });
            }
          });
        });
      }
    };

dbot.init();