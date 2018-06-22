module.exports = function (application) {
    application.post('/api/conversation', function (req, res) {
        application.controllers.index.conversation(application, req, res);
    });

    application.get('/what', function (req, res) {
        const projectId = 'skynet-202411';
        const sessionId = 'backend-key';
        const languageCode = 'pt-BR';

// Instantiate a DialogFlow client.
        const dialogflow = require('dialogflow');
        const sessionClient = new dialogflow.SessionsClient();

// Define session path
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        const structjson = require('./../models/jsonToProto');

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: "what what",
                    languageCode: languageCode,
                }
            },
            queryParams: {
                "payload": structjson.jsonToStructProto({'personality': 'afetivo', "emotion" : "positive"})
            }
        };


        sessionClient
            .detectIntent(request)
            .then(responses => {
                console.log('Detected intent');
                console.log(responses[0].queryResult);
                console.log(responses[0].queryResult.parameters);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });
};
