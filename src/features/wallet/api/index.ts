export const accountKeys = {
  all: ['account'] as const,
  detail: (id: string) => [...accountKeys.all, 'detail', id] as const,
  form: () => [...accountKeys.all, 'form'] as const,
  assets: (limit: number) => [...accountKeys.all, 'assets', JSON.stringify(limit)] as const,
};
