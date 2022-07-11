import '@testing-library/jest-dom'
// @ts-ignore
import { parseMultipartForm, sendOrderPlacedEmail } from '../netlify/functions/sendOrderPlacedEmail'
import '@testing-library/jest-dom'

describe('Place Order', () => {
    const headers = { 'content-type': 'multipart/form-data; boundary=--------------------------621143551718523205566411' }
    const body = "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTYyMTE0MzU1MTcxODUyMzIwNTU2NjQxMQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJzZW5kZXIiDQoNClRFU1RAU0VOREVSLkNPTQ0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTYyMTE0MzU1MTcxODUyMzIwNTU2NjQxMQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJqb2JPZmZlciI7IGZpbGVuYW1lPSJqb2JyZWxsYS10ZXN0Lm1kIg0KQ29udGVudC1UeXBlOiB0ZXh0L21hcmtkb3duDQoNClgNCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS02MjExNDM1NTE3MTg1MjMyMDU1NjY0MTENCkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0iaW5xdWlyeSINCg0KY3VzdG9tOiBmYWxzZTsgc3RlcDogMDsgYm9hcmRzOiBOb25lOyBidW1wczogMSBidW1wOyBzb2NpYWxzOiBOb25lOyBoZWFkSHVudGVyOiBmYWxzZTsgcHJpY2U6IDE1MCDigqwNCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS02MjExNDM1NTE3MTg1MjMyMDU1NjY0MTEtLQ0K"
     it('Parses multipart/form to fields and attachments', async () => {
        let parsedData = parseMultipartForm(headers, body)
        expect(parsedData.fields['sender']).toBe("TEST@SENDER.COM")
        expect(parsedData.fields['inquiry']).toBe("custom: false; step: 0; boards: None; bumps: 1 bump; socials: None; headHunter: false; price: 150 €")
        expect(parsedData.attachments[0].filename).toBe("jobrella-test.md")
        expect(parsedData.attachments[0].type).toBe("text/markdown")
    })

    it('Sends expected model through client', async () => {
        let toEmail = 'to@email.com'
        let fromEmail = 'from@email.com'
        let expectedSubject = 'New order from TEST@SENDER.COM'
        let expectedHtmlLine1 = `<h1>New order</h1>`
        let expectedHtmlLine2 = `<div>Contact email: TEST@SENDER.COM</div>`
        let expectedHtmlLine3 = `<div>Inquiry: custom: false; step: 0; boards: None; bumps: 1 bump; socials: None; headHunter: false; price: 150 €</div>`

        let expectedBase64Content = 'WA=='
        let parts = {
            attachments: [{
                content: Buffer.from('UVdFUlRZ', 'base64'),
                filename: 'jobrella-test.md',
                type: 'text/markdown'
            }],
            fields: {
                inquiry: "custom: false; step: 0; boards: None; bumps: 1 bump; socials: None; headHunter: false; price: 150 €",
                sender: 'TEST@SENDER.COM'
            }
        }
        let result: any 

        let sendFunc = (data: any) => result = data

        await sendOrderPlacedEmail(sendFunc, headers, body, toEmail, fromEmail )
        expect(result.to).toBe(toEmail)
        expect(result.from).toBe(fromEmail)
        expect(result.subject).toBe(expectedSubject)
        expect(result.html).toContain(expectedHtmlLine1)
        expect(result.html).toContain(expectedHtmlLine2)
        expect(result.html).toContain(expectedHtmlLine3)
        expect(result.attachments[0].content).toBe(expectedBase64Content)
        expect(result.attachments[0].filename).toBe(parts.attachments[0].filename)
        expect(result.attachments[0].type).toBe(parts.attachments[0].type)
        expect(result.attachments[0].disposition).toBe("attachment")
    })
})