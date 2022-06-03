import { rest } from 'msw';

export default [
  // Provide request handlers
  rest.get('/user/me', (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: 'John',
        lastName: 'Maverick',
      })
    );
  }),
];
