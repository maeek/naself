import { HttpResponse, RequestHandler, http } from 'msw';

export const handlers: RequestHandler[] = [
  http.get('/api/system/status', () => {
    return HttpResponse.json({ status: 'ok' }, { status: 200 });
  })
];
