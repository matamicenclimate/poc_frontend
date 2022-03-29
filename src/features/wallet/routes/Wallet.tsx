import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { setupClient } from '@/lib/algosdk';
import { magiclink } from '@/lib/magiclink';
import algosdk, { waitForConfirmation } from 'algosdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBalance } from '../api/getBalance';

/* eslint-disable @typescript-eslint/no-var-requires */
import { Buffer } from 'buffer/';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs'; // note: the trailing slash is important!

export const Wallet = () => {
  const { t } = useTranslation();

  const [address, setAdress] = useState<string | null>(null);

  useEffect(() => {
    const onMount = async () => {
      // Get user's Algorand public address
      const publicAddress = await magiclink.algorand.getWallet();

      setAdress(publicAddress);
    };
    onMount();
  }, []);

  const account = getBalance(address);

  const optinToAsset = (asaId: number) => async () => {
    // create the asset accept transaction
    console.log('opting in...');

    if (!address) return;
    console.log('opting in...');
    const suggestedParams = await setupClient().getTransactionParams().do();

    const transactionOptions = {
      from: address,
      to: address,
      assetIndex: asaId,
      amount: 0, // this is an optinTxn so amount has to be 0
      suggestedParams,
    };

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(transactionOptions);
    console.log({ txn });

    const signedTxn = await magiclink.algorand.signGroupTransactionV2([
      { txn: Buffer.from(txn.toByte()).toString('base64') },
    ]);

    const blob = signedTxn.map((txn: string) => new Uint8Array(Buffer.from(txn, 'base64')));
    const { txId } = await setupClient().sendRawTransaction(blob).do();
    const result = await waitForConfirmation(setupClient(), txId, 3);

    console.log({ result });
  };

  const handleSubmit = async (data: any) => {
    console.log(data);
    await optinToAsset(Number(data.asaId))();
    account.refetch();
  };

  return (
    <MainLayout title={t('head.Wallet.title')}>
      <Breadcrumb links={[{ to: '/wallet', label: t('head.Wallet.title') }]} />

      <h1>{t('wallet.Wallet.title')}</h1>
      <Button onClick={optinToAsset(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string))}>
        opt in to climatecoin
      </Button>
      <Button onClick={optinToAsset(Number(process.env.REACT_APP_USDC_ASA_ID as string))}>
        opt in to usdc
      </Button>
      <Form onSubmit={handleSubmit}>
        <Input name="asaId" type="text" label="asset id" />
        <Button type="submit">Optin</Button>
      </Form>
      <br />
      {address}
      <br />
      {JSON.stringify(account.data, null, 2)}
      <br />
      {process.env.NODE_ENV === 'development' ? (
        <>
          <Link href="https://bank.testnet.algorand.network/">get algo faucet </Link>
          <br />
          <Link href="https://dispenser.testnet.aws.algodev.network/">get usdc faucet </Link>
        </>
      ) : null}
    </MainLayout>
  );
};
