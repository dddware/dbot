dbot
====

**dbot** is an IRC bot designed (yet) to provide an interface to [dpaste](http://www.paste.cc) and [dfill](http://www.dfill.cc), respectively a code paster and a filler text generator.

## Setup

```shell
npm install # install dependencies
npm start # run bot
```

As for now, the server, channel list and nickname used by the bot are hardcoded. Separate config file coming soon!

## Usage

```irc
!dpaste My content # creates a paste and sends you a PM with the URL
!dfill n # sends you a PM with 1-100 lines of dummy text
```