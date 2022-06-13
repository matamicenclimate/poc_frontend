import { QueryClient, setLogger } from 'react-query';

export const queryClient = new QueryClient();

// https://react-query.tanstack.com/guides/testing#_top
export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

if (process.env.NODE_ENV === 'test') {
  setLogger({
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console
    error: () => null,
  });
}
