import { Button } from '@/componentes/Elements/Button/Button';
import { setupClient } from '@/lib/algosdk';
import algosdk, { OnApplicationComplete, waitForConfirmation } from 'algosdk';
import { magiclink } from '@/lib/magiclink';
import { Buffer } from 'buffer/';
import { useWalletContext } from '@/providers/Wallet.context';
import { getMethodByName, vaultContract } from '@/contracts/vault';
import { httpClient } from '@/lib/httpClient';
import { useParams } from 'react-router-dom';

export function SwapNft({ nftAsaId }: { nftAsaId?: number }) {
  const { account } = useWalletContext();
  const { documentId } = useParams();

  async function handleSwap() {
    console.log('swapping...');

    if (!account) return;
    if (!nftAsaId) return;
    console.log('opting in...');
    const suggestedParams = await setupClient().getTransactionParams().do();

    console.log({
      address: account.address,
      nftAsaId,
      selector: getMethodByName('swap_nft_to_fungible').getSignature(),
    });

    const txn = algosdk.makeApplicationCallTxnFromObject({
      from: account.address,
      appIndex: vaultContract.networks['testnet'].appID,
      // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
      appArgs: [getMethodByName('swap_nft_to_fungible').getSelector(), algosdk.encodeUint64(1)],
      foreignAssets: [Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID), nftAsaId],
      onComplete: OnApplicationComplete.NoOpOC,
      suggestedParams,
    });
    console.log({ txn });

    const signedTxn = await magiclink.algorand.signGroupTransactionV2([
      { txn: Buffer.from(txn.toByte()).toString('base64') },
    ]);

    const blob = signedTxn.map((txn: string) => new Uint8Array(Buffer.from(txn, 'base64')));
    console.log(blob);
    const { txId } = await setupClient().sendRawTransaction(blob).do();
    const result = await waitForConfirmation(setupClient(), txId, 3);

    console.log({ result });

    const res = await httpClient.post(`/carbon-documents/${documentId}/swap`);
    console.log(res);
  }
  return (
    <div>
      asset id: {nftAsaId}
      <Button onClick={handleSwap}>Swap</Button>
    </div>
  );
}
