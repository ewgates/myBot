const Slapp = require('slapp')
const BeepBoopContext = require('slapp-context-beepboop')
const ConvoStore = require('slapp-convo-beepboop') 
const app = require('express')
var PORT = process.env.PORT

if (!PORT) {
    console.log('PORT not found, defaulting to 80.')
    PORT = 80
}

var slapp = Slapp({
    verify_token: process.env.SLACK_VERIFY_TOKEN,
    convo_store: ConvoStore,
    context: BeepBoopContext,
    log: true,
    colors: true
})

slapp.message('hi', ['direct_mention', 'direct_message'], (msg, text, greeting) => {
  msg
    .say(`${greeting}, how are you?`)
    .route('handleHowAreYou')  // where to route the next msg in the conversation
})

// register a route handler
slapp.route('handleHowAreYou', (msg) => {
  // respond with a random entry from array
  msg.say(['Me too', 'Noted', 'That is interesting'])
})

// attach handlers to an Express app
slapp.attachToExpress(app()).listen(PORT)