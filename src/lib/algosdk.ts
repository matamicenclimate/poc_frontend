import { magiclink } from '@/lib/magiclink';
import algosdk from 'algosdk';

let client: null | algosdk.Algodv2 = null;

export function setupClient() {
  if (client == null) {
    const token = {
      'x-api-key': '10f233c1b6dec945648e2ac830913549349a1742c865b940bd1fdf2fc6b98b60',
    };
    const server =
      'https://hk.bsngate.com/api/1859c58d7f216e31dfb9b8ce95ca51f9e7672b1c0e11b2d76647b1b7d019292e/Algorand-Testnet/algodrest';
    const port = '';
    const algodClient = new algosdk.Algodv2(token, server, port);
    client = algodClient;
  } else {
    return client;
  }
  return client;
}

// https://codesandbox.io/s/github/MagicLabs/example-algorand?file=/src/App.js

const handleSignGroupTransaction = async (publicAddress: string) => {
  const algodClient = await setupClient();

  const params = await algodClient.getTransactionParams().do();

  const txns = [
    {
      from: publicAddress,
      to: 'OFHW3Z3T2RML7J2S6KYGHPAMO6IQH76PE2HSCAIN5U5NBGXAIPBOY7DCHI',
      amount: 1000000,
      closeRemainderTo: undefined,
      note: undefined,
      suggestedParams: params,
    },
    {
      from: publicAddress,
      to: 'XRKQBEV7FINQ66SYAFY33UYHOC4GRAICWI3V6V2TXLCQMPJBGGRHLG2E74',
      amount: 1000000,
      closeRemainderTo: undefined,
      note: undefined,
      suggestedParams: params,
    },
  ];

  const signedTX = await magiclink.algorand.signGroupTransaction(txns);

  console.log('signedTX', signedTX);
};

const handleSignGroupTransactionV2 = async (publicAddress: string) => {
  const algodClient = await setupClient();

  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: publicAddress,
    to: 'OFHW3Z3T2RML7J2S6KYGHPAMO6IQH76PE2HSCAIN5U5NBGXAIPBOY7DCHI',
    amount: 1000,
    suggestedParams,
  });

  const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: publicAddress,
    to: 'XRKQBEV7FINQ66SYAFY33UYHOC4GRAICWI3V6V2TXLCQMPJBGGRHLG2E74',
    amount: 2000,
    suggestedParams,
  });

  const txs = [txn1, txn2];
  algosdk.assignGroupID(txs);

  const txn1B64 = Buffer.from(txn1.toByte()).toString('base64');
  const txn2B64 = Buffer.from(txn2.toByte()).toString('base64');

  const txn = [{ txn: txn1B64 }, { txn: txn2B64 }];

  //   const signedTX = await magiclink.algorand.signGroupTransactionV2(txn);

  //   console.log('sign group transaction v2', signedTX);
};
