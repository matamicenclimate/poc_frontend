import algosdk from 'algosdk';

let client: null | algosdk.Algodv2 = null;

export function getClient() {
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
