var deferred = require('deferred');

module.exports = {
  description: 'Lists available plugins',
  regex: /^list$/,

  callback: function() {
    var d = deferred()
      , bot = this
      , list = [];

    bot.plugins.forEach(function (plugin) {
      list.push(plugin.regex + ' ' + plugin.description)
    });

    d.resolve(list.join("\n"));
    return d.promise;
  }
};
 
