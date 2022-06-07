import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import { CarbonDocument, documentKeys } from '../types';

export type CarbonDocumentDTO = Record<string, any>;

function mintNft(documentId: string): Promise<CarbonDocument> {
  return httpClient.post(`/carbon-documents/${documentId}/mint`);
}

export function useMintNftDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return useMutation((documentId: string) => mintNft(documentId), {
    onSuccess: (data: CarbonDocument) => {
      queryClient.invalidateQueries(documentKeys.detail(data._id as string));
    },
    onError: () => {
      alert.error('Error uploading document');
    },
  });
}
