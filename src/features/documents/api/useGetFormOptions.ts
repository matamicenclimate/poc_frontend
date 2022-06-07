import { useQuery } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import { documentKeys } from '../types';

export interface FormInfo {
  ['project-types']: FormOption[];
  sdgs: FormOption[];
  types: FormOption[];
  ['sub-types']: FormOption[];
  methodologies: FormOption[];
  validators: FormOption[];
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
export function useGetFormOptions() {
  return useQuery(documentKeys.form(), fetchFormOptions, {
    staleTime: 60 * 60,
    refetchOnWindowFocus: false,
  });
}
