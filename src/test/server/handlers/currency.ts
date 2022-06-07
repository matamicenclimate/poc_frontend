import { rest } from 'msw';

import { getBaseUrl } from '@/test/server';

export default [
  // Provide request handlers
  rest.get(getBaseUrl('/currency'), (req, res, ctx) => {
    return res(
      ctx.json({
        createdAt: '2022-03-31T07:11:16.237Z',
        id: '62455414c06af3001c59c335',
        updatedAt: '2022-06-02T12:00:15.503Z',
        usd_btc: 0.000032,
        usd_climatecoin: 10,
        usd_eur: 0.933664,
        usd_gbp: 0.794798,
        usd_jpy: 129.217196,
        usd_usd: 1,
        __v: 0,
        _id: '62455414c06af3001c59c335',
      })
    );
  }),
];
