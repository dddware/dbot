module.exports = {
  description: 'Lists available plugins',
  regex: /^list$/,

  callback: function(from, matches) {
    var bot = this
      , list = [];

    bot.plugins.forEach(function (plugin) {
      list.push(plugin.regex + ' ' + plugin.description)
    });

    bot.client.say(from, list.join("\n"));
  }
};
 
