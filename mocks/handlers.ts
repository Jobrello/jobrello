import { rest } from 'msw'

export let uploadedForm: any

export const handlers = [
  rest.get('http://localhost:5000/api/test', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({message: 'Hello World'}))
  }),
  rest.post('http://localhost:5000/placeOrder', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({message: 'Ok'}))
  }),
]