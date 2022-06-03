import { rest } from 'msw';
import { getBaseUrl } from '@/test/server';

export default [
  // Provide request handlers
  rest.get(getBaseUrl('/info'), (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];
