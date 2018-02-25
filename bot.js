const env = require('node-env-file')
const Botkit = require('botkit')
const debug = require('debug')('botkit:main')

env(__dirname + '/.env')

if (!process.env.clientId || !process.env.clientSecret) {
  console.log('~~~~~~~~~~')
  console.log('missing clientId or clientSecret')
  console.log('~~~~~~~~~~')
  process.exit(1)
}

// Create the Botkit controller, which controls all instances of the bot.
const controller = Botkit.slackbot({
  json_file_store: __dirname + '/.data/db/',
  debug: true,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  scopes: ['bot']
})

controller.setupWebserver(port, (err, webserver) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  controller.createWebhookEndpoints(webserver)
})

controller.on('slash_command', (bot, message) => {
  switch (message.command) {
    case '/balamuch':
      bot.replyPrivate(message, `private message from balalunch`)
      break
    default:
      bot.replyPrivate(message, `Sorry, I don't know this command`)
  }
})
