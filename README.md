dbot
====

**dbot** is a node.js-powered IRC bot designed to provide command-line utilities available by PMing it.

## Setup

```shell
npm install # install dependencies
npm start # run bot
```

## Configuration

dbot relies heavily on the [irc](https://www.npmjs.org/package/irc) node.js library, and hence uses its configuration structure.
Create a `config.json` file at the application root as such :

```javascript
{
  // Basically any irc option
  "debug": true
  "server": "irc.freenode.net",
  "channels": ["#ddd"],
  "nick": "dbot",

  "plugins": [] // Read on
}
```

## Plugins

A plugin corresponds to a functionality the bot offers : it comprises a description, a regex representing the command to watch for and a callback to execute then.

As for now, plugins are single-modules living the `plugins/` directory. Support for `npm`-installed (with autoloading via a name prefix) is on the way.

A couple of plugins are included by default, check them out to roll out your own. These include the `list` plugin : PM that to the bot to see everything else.

## Usage

You are very welcome to help me enhance the bot further or write new plugins - I may add some of them to the default ones, but please not these will disappear once everything is dispatched on npm.