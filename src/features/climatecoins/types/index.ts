export interface CompensationCalculation {
  address: string;
  amount: number;
  assets: number[]; // blockchain asa ids
  nftIds: string[]; // db ids
  txn: { [key: string]: number };
  encodedTransferTxn: { [key: string]: number };
  encodedBurnTxn: { [key: string]: number };
}
