const multipart = require('parse-multipart-data');
const sendGridClient = require('@sendgrid/mail');
const {
  SENDGRID_API_KEY,
  SENDGRID_TO_EMAIL,
  SENDGRID_FROM_EMAIL,
} = process.env;

exports.handler = async function (event) {
    const boundary = event.headers['content-type'].replace('multipart/form-data; boundary=', '');
    const body = Buffer.from(event.body, 'base64')
    const parts = multipart.parse(body,boundary);
    let data2 = []
    for(let i=0; i<parts.length; i++){
        if(parts[i].filename){
            data2['jobOffer']={
                filename: parts[i].filename,
                type: parts[i].type,
                content: parts[i].data
            }
        }
        else{
            data2[parts[i].name] = Buffer.from(parts[i].data, 'base64').toString()
        }
    }

    sendGridClient.setApiKey(SENDGRID_API_KEY);

    const data = {
        to: SENDGRID_TO_EMAIL,
        from: SENDGRID_FROM_EMAIL,
        subject: `New order from ${data2['sender']}`,
        html: `<h1>New order</h1>
      <div>Contact email: ${data2['sender']}</div>
      <div>Tier: ${data2['tier']}</div>`,
        attachments: [
            {
                content: data2['jobOffer'].content.toString('base64'),
                filename: data2['jobOffer'].filename,
                type: data2['jobOffer'].type,
                disposition: "attachment"
            }
        ]
    };

    try {
        await sendGridClient.send(data);
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