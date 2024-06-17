const twilio = require('twilio');

exports.handler = function(context, event, callback) {
    const response = new twilio.twiml.VoiceResponse();

    const gather = response.gather({
        input: 'speech',
        action: '/chat'
    });
    gather.say('Hello, I am your personal assistant. How can I help you today?');

    callback(null, response);
};
