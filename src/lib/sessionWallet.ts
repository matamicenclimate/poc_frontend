import { SessionWallet } from 'algorand-session-wallet-deka';

export let sw: null | SessionWallet;

export function setSW(newSW: SessionWallet) {
  sw = newSW;
}
