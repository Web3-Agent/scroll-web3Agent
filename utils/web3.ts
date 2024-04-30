import Web3 from 'web3';
// import { rpcEndpoint } from 'settings/config';

/**
 * Export of web3 object with provider set up
 */
// const RPC_ENDPOINT = 'https://rpc.testnet.lukso.network'
const RPC_ENDPOINT = 'https://public-en-baobab.klaytn.net'
export const web3Provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const web3 = new Web3(web3Provider);

export default web3;