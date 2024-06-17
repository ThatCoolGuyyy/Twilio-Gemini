const twilio = require('twilio');
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(context, event, callback) {
    const response = new twilio.twiml.VoiceResponse();
    const genAI = new GoogleGenerativeAI(context.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const chat = model.startChat({
            history: [
            {
                role: "user",
                parts: [{ text: "Hello, you are my personal assistant, respond intelligently to my questions." }],
            },
            {
                role: "model",
                parts: [{ text: "Okay" }],
            },
            ],
        });

        const msg = event.SpeechResult;
        const result = await chat.sendMessage(msg);
        const aiResponse = await result.response;

        response.say(aiResponse.text()); 
        response.gather({
            input: 'speech',
            action: '/chat'
        });

        callback(null, response);
    } catch (error) {
        response.say("I'm sorry, there was an error processing your request.");
        callback(error, response);
    }
};
