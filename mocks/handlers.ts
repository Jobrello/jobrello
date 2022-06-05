import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:5000/api/test', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({message: 'Hello World'}))
  })
]