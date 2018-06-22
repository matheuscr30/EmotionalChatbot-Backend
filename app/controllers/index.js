const projectId = 'small-talk-f5499';
const sessionId = 'backend-key';
const languageCode = 'pt-BR';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Use JSON_Proto
const structjson = require('./../models/jsonToProto');

module.exports.conversation = function (application, req, res) {
    let body = req.body;
    let message = body['message'];
    let personality = body['personality'];
    let emotion = body['emotion'];

    console.log(message);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
        queryParams: {
            "payload": structjson.jsonToStructProto({'personality': personality, "emotion" : emotion})
        }
    };

    // Send request and log result
    sessionClient
        .detectIntent(request)
        .then(responses => {
            //console.log(responses);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

    res.status(200).json({"response" : "ok"});
};