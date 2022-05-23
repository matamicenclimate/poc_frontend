import { vaultContract } from '@/contracts/vault';

/**
 * BLOCKCHAIN
 * */
export const NETWORKNAME: 'testnet' | 'mainnet' = 'testnet';
export const VAULT_CONTRACT_ID = vaultContract.networks[NETWORKNAME].appID;
export const CLIMATECOIN_ASA_ID = Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID);

export const EXPLORER_URL = process.env.REACT_APP_ALGORAND_EXPLORER_URL;
/**
 * API
 * */
export const API_URL = 'http://localhost:1337' ?? process.env.REACT_APP_API_URL;
