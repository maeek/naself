import { RestHandler, rest } from 'msw';

export const handlers: RestHandler[] = [
  rest.get('/api/system/status', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }));
  })
];
