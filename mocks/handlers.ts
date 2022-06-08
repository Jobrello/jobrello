import { rest } from 'msw'
import { inquiry } from './data'

export let uploadedForm: any

export const handlers = [
  rest.get('http://localhost:5000/api/test', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({message: 'Hello World'}))
  }),
  rest.post('/placeOrder', async (req, res, ctx) => {
    const body = req.body as FormData
    const entries = [...body.entries()]
    inquiry.data = entries.map(entry => [entry[0], entry[1].toString()])
    return res(ctx.status(200), ctx.json({message: 'Ok'}))
  })
]