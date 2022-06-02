import { Nft } from '@/features/nfts';

export const compensationKeys = {
  all: ['compensations'] as const,
  lists: () => [...compensationKeys.all, 'list'] as const,
  me: () => [...compensationKeys.all, 'list', 'me'] as const,
  detail: (id: string) => [...compensationKeys.all, 'detail', id] as const,
};

export interface CompensationCalculation {
  address: string;
  amount: number;
  assets: number[]; // blockchain asa ids
  nftIds: string[]; // db ids
  txn: { [key: string]: number };
  encodedTransferTxn: { [key: string]: number };
  encodedBurnTxn: { [key: string]: number };
}

export interface Compensation {
  state: string;
  nfts: Nft[];
  _id: string;
  txn_id: string;
  amount: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}
