import { magiclink } from '@/lib/magiclink';
import algosdk from 'algosdk';

let client: null | algosdk.Algodv2 = null;

export function setupClient() {
  if (client == null) {
    const token = process.env.REACT_APP_ALGORAND_RPC_TOKEN as string;
    const server = process.env.REACT_APP_ALGORAND_RPC_URL;
    const port = process.env.REACT_APP_ALGORAND_RPC_PORT;
    console.log({ token, server, port });

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
