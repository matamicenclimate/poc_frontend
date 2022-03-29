export const documentKeys = {
  all: ['document'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  detail: (id: string) => [...documentKeys.all, 'detail', id] as const,
  form: () => [...documentKeys.all, 'form'] as const,
};

export interface CarbonDocument {
  status: string;
  pdd: Cover[];
  sdgs: Country[];
  _id: string;
  registry_url: string;
  serial_number: string;
  credits: string;
  credit_end: Date;
  credit_start: Date;
  project_video: string;
  project_registration: Date;
  project_longitude: string;
  project_latitude: string;
  project_url: string;
  description: string;
  title: string;
  created_by_user: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  country: Country;
  cover: Cover;
  first_verifier: Country;
  methodology: Country;
  project_type: Country;
  registry: Country;
  standard: Country;
  sub_type: Country;
  thumbnail: Cover;
  type: Country;
  validator: Country;
  verification_report: Cover;
  nfts: Nft[];
  id: string;
}

export interface Country {
  _id: string;
  code?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  description?: string;
  instructions?: string;
}

export interface Cover {
  _id: string;
  name: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number | null;
  height: number | null;
  url: string;
  formats?: Formats;
  provider: string;
  related: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Formats {
  thumbnail: Medium;
  medium: Medium;
  small: Medium;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: boolean;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export interface Nft {
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
  carbon_document: string;
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
