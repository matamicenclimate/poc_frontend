import { documentKeys } from './index';
import { useQuery } from 'react-query';
import { httpClient } from '@/lib/httpClient';

export interface FormInfo {
  ['project-types']: FormOption[];
  sdgs: FormOption[];
  types: FormOption[];
  ['sub-types']: FormOption[];
  methodologies: FormOption[];
  validator: FormOption[];
  ['first-verifiers']: FormOption[];
  standards: FormOption[];
  registries: FormOption[];
  countries: FormOption[];
}

export interface FormOption {
  name: string;
  id: string;
  description?: string;
  instructions?: string;
}

function fetchFormOptions(): Promise<FormInfo> {
  return httpClient.get(`/info`);
}
export function getFormOptions() {
  return useQuery(documentKeys.form(), fetchFormOptions, {
    staleTime: 60 * 60,
    refetchOnWindowFocus: false,
  });
}
