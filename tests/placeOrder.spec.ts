import '@testing-library/jest-dom'
// @ts-ignore
import { parseMultipartForm, sendOrderPlacedEmail } from '../netlify/functions/sendOrderPlacedEmail'
import '@testing-library/jest-dom'

describe('Place Order', () => {
    const headers = { 'content-type': 'multipart/form-data; boundary=---------------------------1665353621645556734984368480' }
    const body = "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0xNjY1MzUzNjIxNjQ1NTU2NzM0OTg0MzY4NDgwCkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0ic2VuZGVyIgoKVEVTVEBTRU5ERVIuQ09NCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tMTY2NTM1MzYyMTY0NTU1NjczNDk4NDM2ODQ4MApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImlucXVpcnkiCgozIGpvYiBib2FyZHMgfCAzMCB8IDEgYnVtcCB8IDE1IHwgMSBmYWNlYm9vayBncm91cCB8IDUgfCBIZWFkIGh1bnRlciB8IDkwCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tMTY2NTM1MzYyMTY0NTU1NjczNDk4NDM2ODQ4MApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImpvYk9mZmVyIjsgZmlsZW5hbWU9InJhZGFyLnR4dCIKQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluCgpUbyBjaGVjazoKaHR0cHM6Ly93d3cuY29tcG9zaXRpb25hbC1pdC5jb20vbmV3cy1ibG9nL3VzaW5nLWlzZXJ2ZXJ0aW1pbmctd2l0aC1mLwpodHRwczovL3Rhcm1pbC5mci9hcnRpY2xlLzIwMjIvNS8yNy9mc2hhcnAtZGF0YS1saXRlcmFscHJvdmlkZXJzLTEtMAoKCmh0dHBzOi8vYmFja2xpZ2h0LmRldi8KCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tMTY2NTM1MzYyMTY0NTU1NjczNDk4NDM2ODQ4MC0t=="
    it('Parses multipart/form to fields and attachments', async () => {
        let parsedData = parseMultipartForm(headers, body)
        expect(parsedData.fields['sender']).toBe("TEST@SENDER.COM")
        expect(parsedData.fields['tier']).toBe("TEST-TIER'")
        expect(parsedData.attachments[0].filename).toBe("test.png")
        expect(parsedData.attachments[0].type).toBe("image/png")
    })

    it('Sends expected model through client', async () => {
        let toEmail = 'to@email.com'
        let fromEmail = 'from@email.com'
        let expectedSubject = 'New order from TEST@SENDER.COM'
        let expectedHtmlLine1 = `<h1>New order</h1>`
        let expectedHtmlLine2 = `<div>Contact email: TEST@SENDER.COM</div>`
        let expectedHtmlLine3 = `<div>Inquiry: TEST-inquiry</div>`

        let expectedBase64Content = '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'
        let parts = {
            attachments: [{
                content: Buffer.from('UVdFUlRZ', 'base64'),
                filename: 'test.png',
                type: 'image/png'
            }],
            fields: {
                inquiry: "TEST-inquiry",
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