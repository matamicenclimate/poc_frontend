import { AlgorandExtension } from '@magic-ext/algorand';
import { Magic } from 'magic-sdk';

export const magiclink = new Magic(process.env.REACT_APP_MAGICLINK_PUBLIC as string, {
  extensions: {
    algorand: new AlgorandExtension({
      rpcUrl: process.env.REACT_APP_ALGORAND_RPC_URL as string,
    }),
  },
});
// ✨
