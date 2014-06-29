dbot
====

**dbot** is a node.js-powered IRC bot designed to provide command-line utilities available by PMing it.

## Setup

```shell
npm install # install dependencies
npm start # run bot
```

## Tests

```shell
npm test # run tests
```

Tests require global installation of the [jasmine-async](ttps://www.npmjs.org/package/jasmine-async) package.
This part has to move on the plugins' READMEs.

## Configuration

dbot relies heavily on the [irc](https://www.npmjs.org/package/irc) package, and as such pretty much all of its configuration goes straight to it, with the exception of the `plugins` array (read on to learn more about these). Its only function is passing data around, hence the absence of tests for the bot itself.

See the `config.json` file to start tweaking the bot to suit your needs and fulfill your desires.

## Plugins

A plugin corresponds to a functionality the bot offers : it comprises a description, a regex representing the command to watch for and a callback function, which returns a promise (using the [deferred](https://www.npmjs.org/package/deferred) package) holding the message to send back.

As for now, plugins are single-file modules living the `plugins/` directory. Support for `npm`-installed plugins (with autoloading via a name prefix) is on the way. A couple of plugins are included by default, check them out to roll out your own. These will disappear once tested with Jasmine and dispatched on NPM.

## Collaboration

You are very welcome to help me enhance the bot further or write new plugins.