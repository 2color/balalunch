var env = require('node-env-file')
env(__dirname + '/.env')

if (!process.env.clientId || !process.env.clientSecret) {
  console.log('~~~~~~~~~~')
  console.log('missing clientId or clientSecret')
  console.log('~~~~~~~~~~')
  process.exit(1)
}

var Botkit = require('botkit')
var debug = require('debug')('botkit:main')

// Create the Botkit controller, which controls all instances of the bot.
const controller = Botkit.slackbot({
  json_file_store: __dirname + '/.data/db/',
  debug: true,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  scopes: ['bot']
})

controller.setupWebserver(port, (err, expressWebserver) => {
  controller.createWebhookEndpoints(expressWebserver)
})


controller.on('slash_command', (bot, message) => {
  bot.replyPrivate(message, 'private message from balalunch')
})
