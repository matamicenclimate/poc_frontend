import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { accountKeys, useOptinToAsset } from '@/features/wallet';
import { httpClient } from '@/lib/httpClient';

import { CarbonDocument, documentKeys } from '../types';

async function claimFromDocument(documentId: string, email: string): Promise<CarbonDocument> {
  return httpClient.post(`/carbon-documents/${documentId}/claim`, { email });
}

export function useClaimNftFromDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const optinToAsset = useOptinToAsset();

  return useMutation(
    ({ email, documentId, assetId }: { documentId: string; email: string; assetId: number }) =>
      optinToAsset.mutateAsync(assetId).then(() => claimFromDocument(documentId, email)),
    {
      onSuccess: (data: CarbonDocument) => {
        queryClient.invalidateQueries(documentKeys.detail(data._id as string));
        queryClient.invalidateQueries(accountKeys.all);
        alert.success('Asset claimed succesfully');
      },
      onError: () => {
        alert.error('Error claiming nft');
      },
    }
  );
}
