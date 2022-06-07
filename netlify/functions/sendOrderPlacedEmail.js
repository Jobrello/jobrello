const multipart = require('parse-multipart-data');

function parseMultipartForm(headers, body) {
    const boundary = headers['content-type'].replace('multipart/form-data; boundary=', '');
    const bodyAsBuffer = Buffer.from(body, 'base64')
    const parts = multipart.parse(bodyAsBuffer, boundary);
    let parsedData = {
        fields: {},
        attachments: []
    }
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].filename) {
            parsedData.attachments.push(
                {
                    filename: parts[i].filename,
                    type: parts[i].type,
                    content: parts[i].data
                }
            )
        }
        else {
            parsedData.fields[parts[i].name] = Buffer.from(parts[i].data, 'base64').toString()
        }
    }
    return parsedData
}

function mapAttachmentsToSendGridType(attachments) {
    return attachments.map(attachment =>
    ({
        content: attachment.content.toString('base64'),
        filename: attachment.filename,
        type: attachment.type,
        disposition: "attachment"
    })
    )
}

function buildHtmlContent(fields) {
    return `<h1>New order</h1>
      <div>Contact email: ${fields['sender']}</div>
      <div>Tier: ${fields['tier']}</div>`
}

function buildEmailSubject(fields) {
    return `New order from ${fields['sender']}`
}

function mapPartsToSendGridEmailType(toEmail, fromEmail, parts) {
    return {
        to: toEmail,
        from: fromEmail,
        subject: buildEmailSubject(parts.fields),
        html: buildHtmlContent(parts.fields),
        attachments: mapAttachmentsToSendGridType(parts.attachments)
    };
}

async function sendOrderPlacedEmail(sendFunc ,headers, body, to, from){
    const parts = parseMultipartForm(headers, body)
    const data = mapPartsToSendGridEmailType(to, from, parts)
    await sendFunc(data);
}

module.exports = {
    sendOrderPlacedEmail: sendOrderPlacedEmail,
    parseMultipartForm: parseMultipartForm
 }