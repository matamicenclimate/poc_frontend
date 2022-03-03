export const documentKeys = {
  all: ['document'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  detail: (id: string) => [...documentKeys.all, 'detail', id] as const,
  form: () => [...documentKeys.all, 'form'] as const,
};

export interface CarbonDocument {
  minted_group_id?: string;
  minted_climate_asa_id: any;
  minted_climate_asa_txn_id?: string;
  minted_supplier_asa_id?: number;
  minted_supplier_asa_txn_id?: string;
  status?: string;
  project_types?: any[];
  _id?: string;
  title?: string;
  credits?: string;
  serial_number?: string;
  created_by_user?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  document?: Document;
  id?: string;
}

interface Document {
  _id?: string;
  name?: string;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  provider?: string;
  width?: null;
  height?: null;
  related?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  id?: string;
}
