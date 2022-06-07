import { useParams } from 'react-router-dom';

import { Button } from '@/componentes/Elements/Button/Button';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { useWalletContext } from '@/providers/Wallet.context';

import { useSwapNftForClimatecoins } from '../api/useSwapNftForClimatecoins';

export function SwapNft({ nftAsaId, nftSupply }: { nftAsaId?: number; nftSupply?: number }) {
  const { account } = useWalletContext();
  const { documentId } = useParams();

  const swapNft = useSwapNftForClimatecoins();
  return (
    <div>
      asset id: {nftAsaId}; supply: {nftSupply}; userAddress: {account?.address}
      {swapNft.isLoading && <Spinner />}
      <Button
        onClick={() =>
          swapNft.mutateAsync({
            address: account?.address as string,
            nftSupply: nftSupply as number,
            nftAsaId: nftAsaId as number,
            documentId: documentId as string,
          })
        }
        disabled={swapNft.isLoading}
      >
        Swap
      </Button>
    </div>
  );
}
