#dbot

**dbot** is a node.js-powered IRC bot designed to provide command-line utilities available by PMing it.

## Setup

```shell
npm install # install dependencies
npm start # run bot
```

## Configuration

dbot relies heavily on the [irc](https://www.npmjs.org/package/irc) package, and as such pretty much all of its configuration goes straight to it, with the exception of the `plugins` array (read on to learn more about these). Its only function is passing data around, hence the absence of tests for the bot itself.

See the `config.json` file to start tweaking the bot to suit your needs and fulfill your desires.

## Plugins

A plugin corresponds to a functionality the bot offers : it comprises a description, a regex representing the command to watch for and a callback function, which returns a promise (using the [deferred](https://www.npmjs.org/package/deferred) package) holding the message to send back.

Plugins are distinct packages you need to install, which are automatically required by name (`dbot-*`). Here is a list of currently available plugins :
- [dbot-dfill](https://github.com/dddware/dbot-dfill), a placeholder text generator
- [dbot-dpaste](https://github.com/dddware/dbot-dpaste), an online content paster
- [dbot-h5p](https://github.com/dddware/dbot-h5p), an html5please API client
- [dbot-list](https://github.com/dddware/dbot-list), a plugin that retrieves the list of available plugins
- [dbot-url](https://github.com/dddware/dbot-url), an URL shortener

## Collaboration

You are very welcome to help me enhance the bot further or write new plugins.