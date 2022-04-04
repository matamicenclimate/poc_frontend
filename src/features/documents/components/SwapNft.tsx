import { Button } from '@/componentes/Elements/Button/Button';
import { setupClient } from '@/lib/algosdk';
import algosdk, { OnApplicationComplete, waitForConfirmation } from 'algosdk';
import { magiclink } from '@/lib/magiclink';
import { Buffer } from 'buffer/';
import { useWalletContext } from '@/providers/Wallet.context';
import { getMethodByName, vaultContract } from '@/contracts/vault';
import { httpClient } from '@/lib/httpClient';
import { useParams } from 'react-router-dom';

export function SwapNft({ nftAsaId, nftSupply }: { nftAsaId?: number; nftSupply?: number }) {
  const { account } = useWalletContext();
  const { documentId } = useParams();

  async function handleSwap() {
    console.log('swapping...');

    if (!account) return;
    if (!nftAsaId) return;
    if (!nftSupply) return;

    console.log('opting in...');
    const suggestedParams = await setupClient().getTransactionParams().do();

    suggestedParams.fee = suggestedParams.fee * 2;

    const unfreezeTxn = algosdk.makeApplicationCallTxnFromObject({
      from: account.address,
      appIndex: vaultContract.networks['testnet'].appID,
      // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
      appArgs: [getMethodByName('unfreeze_nft').getSelector(), algosdk.encodeUint64(0)],
      foreignAssets: [nftAsaId],
      onComplete: OnApplicationComplete.NoOpOC,
      suggestedParams,
    });

    const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: account.address,
      // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
      assetIndex: nftAsaId,
      to: algosdk.getApplicationAddress(vaultContract.networks['testnet'].appID),
      amount: nftSupply,
      suggestedParams,
    });

    const swapTxn = algosdk.makeApplicationCallTxnFromObject({
      from: account.address,
      appIndex: vaultContract.networks['testnet'].appID,
      // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
      appArgs: [getMethodByName('swap_nft_to_fungible').getSelector(), algosdk.encodeUint64(1)],
      foreignAssets: [Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID), nftAsaId],
      onComplete: OnApplicationComplete.NoOpOC,
      suggestedParams,
    });
    console.log({ txn: swapTxn });
    algosdk.assignGroupID([unfreezeTxn, transferTxn, swapTxn]);

    const signedTxn = await magiclink.algorand.signGroupTransactionV2([
      { txn: Buffer.from(unfreezeTxn.toByte()).toString('base64') },
      { txn: Buffer.from(transferTxn.toByte()).toString('base64') },
      { txn: Buffer.from(swapTxn.toByte()).toString('base64') },
    ]);

    const blob = signedTxn.map((txn: string) => new Uint8Array(Buffer.from(txn, 'base64')));
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
