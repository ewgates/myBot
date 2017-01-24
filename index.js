const Slapp = require('slapp')
const BeepBoopContext = require('slapp-context-beepboop')
if (!process.env.PORT) throw Error('PORT missing but required')

Console.log("Initializing Slapp")

var slapp = Slapp({ context: BeepBoopContext() })

slapp.message('^(hi|hello|hey).*', ['direct_mention', 'direct_message'], (msg, text, greeting) => {
  msg
    .say(`${greeting}, how are you?`)
    .route('handleHowAreYou')  // where to route the next msg in the conversation
})

// register a route handler
slapp.route('handleHowAreYou', (msg) => {
  // respond with a random entry from array
  msg.say(['Me too', 'Noted', 'That is interesting'])
})

Console.log("Attaching to express")

// attach handlers to an Express app
slapp.attachToExpress(require('express')()).listen(process.env.PORT)