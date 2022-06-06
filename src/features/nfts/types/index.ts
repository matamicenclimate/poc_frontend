export interface Nft {
  consolidation_certificate_ipfs_cid?: string;
  supply: string;
  txn_type: string;
  is_holded: boolean;
  _id: string;
  published_at: Date;
  owner_address: string;
  asa_id: string;
  last_config_txn: null;
  metadata: Metadata;
  asa_txn_id: string;
  group_id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Metadata {
  standard: string;
  description: string;
  external_url: string;
  mime_type: string;
  properties: Properties;
}

export interface Properties {
  Serial_Number: string;
  Provider: string;
  Credits: number;
}
