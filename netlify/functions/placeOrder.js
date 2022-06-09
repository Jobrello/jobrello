const sendGridClient = require('@sendgrid/mail');
const sendOrderPlacedEmail = require('./sendOrderPlacedEmail')
const {
    SENDGRID_API_KEY,
    SENDGRID_TO_EMAIL,
    SENDGRID_FROM_EMAIL,
} = process.env;

exports.handler = async function (event) {
    sendGridClient.setApiKey(SENDGRID_API_KEY);
    let sendFunc = (data) => sendGridClient.send(data)
    try {
        await sendOrderPlacedEmail.sendOrderPlacedEmail(sendFunc, event.headers, event.body, SENDGRID_TO_EMAIL, SENDGRID_FROM_EMAIL)
        return {
            statusCode: 200,
            body: 'Message sent',
        };
    } catch (err) {
        return {
            statusCode: err.code,
            body: JSON.stringify({ msg: err.message }),
        };
    }
};

