import { AxiosRequestConfig } from 'axios';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { httpClient } from '@/lib/httpClient';
import { toFormData } from '@/utils/toFormData';

import { CarbonDocument, documentKeys } from '../types';

export type CarbonDocumentDTO = Record<string, any>;

function createCarbonDocument(formData: FormData): Promise<CarbonDocument> {
  const config: AxiosRequestConfig<FormData> = {
    headers: {
      'content-type': 'application/form-data',
    },
  };
  return httpClient.post(`/carbon-documents`, formData, config);
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  return useMutation(
    (carbonDocument: CarbonDocumentDTO) => {
      // TODO: this should be handled in the BE
      // make sure we create it in the pending state
      carbonDocument.status = 'pending';
      const formData = toFormData(carbonDocument);
      return createCarbonDocument(formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(documentKeys.lists());
      },
      onError: () => {
        alert.error('Error uploading document');
      },
    }
  );
}
