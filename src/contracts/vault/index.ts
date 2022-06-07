// Parse the json file into an object, pass it to create an ABIContract object
import algosdk from 'algosdk';

import contractJson from './contract.json';

const contract = new algosdk.ABIContract(contractJson);

// Utility function to return an ABIMethod by its name
export function getMethodByName(name: string): algosdk.ABIMethod {
  const m = contract.methods.find((mt: algosdk.ABIMethod) => {
    return mt.name == name;
  });
  if (m === undefined) throw Error('Method undefined: ' + name);
  return m;
}

export function getSelector(name: string): Uint8Array {
  return getMethodByName(name).getSelector();
}

export const vaultContract = contract;
