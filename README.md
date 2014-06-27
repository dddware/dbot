dbot
====

**dbot** is a node.js-powered IRC bot designed to provide command-line utilities available by shouting exclamation-point-prefixed orders at it.

## Setup

```shell
npm install # install dependencies
npm start # run bot
```

## Configuration

dbot relies heavily on the [irc](https://www.npmjs.org/package/irc) node.js library, and as such pretty much all of its configuration goes straight to it, with the exception of the `plugins` array (read on to learn more about these).

See the `config.json` file to start tweaking the bot to suit your needs and fulfill your desires.

## Plugins

A plugin corresponds to a functionality the bot offers : it comprises a description, a regex representing the command to watch for and a callback to execute then.

As for now, plugins are single-file modules living the `plugins/` directory. Support for `npm`-installed plugins (with autoloading via a name prefix) is on the way.

A couple of plugins are included by default, check them out to roll out your own. These include the `list` plugin : just say `!list` to see everything else.

## Usage

You are very welcome to help me enhance the bot further or write new plugins - I may add some of them to the default ones, but please not these will disappear once everything is tested with Jasmine and dispatched on npm.