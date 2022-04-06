import { Button } from '@/componentes/Elements/Button/Button';
import { useWalletContext } from '@/providers/Wallet.context';
import { useParams } from 'react-router-dom';
import { swapNftForClimatecoins } from '@/features/documents/api/swapNftForClimatecoins';

export function SwapNft({ nftAsaId, nftSupply }: { nftAsaId?: number; nftSupply?: number }) {
  const { account } = useWalletContext();
  const { documentId } = useParams();

  const swapNft = swapNftForClimatecoins();
  return (
    <div>
      asset id: {nftAsaId}
      <Button
        onClick={() =>
          swapNft.mutateAsync({
            address: account?.address as string,
            nftSupply: nftSupply as number,
            nftAsaId: nftAsaId as number,
            documentId: documentId as string,
          })
        }
      >
        Swap
      </Button>
    </div>
  );
}
