export const nftKeys = {
  all: ['nft'] as const,
  lists: () => [...nftKeys.all, 'list'] as const,
  detail: (id: string) => [...nftKeys.all, 'detail', id] as const,
};
