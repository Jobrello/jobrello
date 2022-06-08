import { rest } from 'msw'

export let uploadedForm: any

export const handlers = [
  rest.get('http://localhost:5000/api/test', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({message: 'Hello World'}))
  }),
  rest.post('/placeOrder', async (req, res, ctx) => {
    const body = req.body as FormData
    const entries = [...body.entries()]
    const file = body.get('jobOffer') as File
    console.log(file?.name)
    console.log((file?.text()))
    console.log(entries)
    return res(ctx.status(200), ctx.json({message: 'Ok'}))
  }),
]