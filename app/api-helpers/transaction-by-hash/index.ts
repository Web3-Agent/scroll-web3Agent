import { getChainData, payloadId } from '@/app/api-helpers/chain';
import axios from 'axios';

export const rpcGetTransactionByHash = async (txnHash: string, chainId: number) => {
    const rpcUrl = getChainData(chainId).rpc_url;

    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }

    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method: "eth_getTransactionByHash",
        params: [txnHash],
    });
    return response;
};

export const rpcGetTransactionByHashV2 = async (rpcUrl: string, method: string = 'eth_getTransactionByHash', hash: string) => {
    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }
    console.log("LINE-- ", method, hash)
    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method,
        params: [hash],
    });
    return response;
};

export default { rpcGetTransactionByHashV2, rpcGetTransactionByHash }
