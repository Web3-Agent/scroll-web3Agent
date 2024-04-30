import { getChainData, payloadId } from '@/app/api-helpers/chain';
import axios from 'axios';

export const rpcGetBlockDetailsByNumber = async (chainId: number) => {
    const rpcUrl = getChainData(chainId).rpc_url;

    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }

    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method: "eth_getBlockByNumber",
        params: [],
    });
    return response;

};

export const rpcGetBlockDetailsByNumberV2 = async (rpcUrl: string, method: string = 'eth_getBlockByNumber', blockNumber: any = 'latest') => {
    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }
    try {
        const response = await axios.post(rpcUrl, {
            jsonrpc: "2.0",
            id: payloadId(),
            method,
            params: [blockNumber, true],
        });
        return response;
    } catch (error) {
        return error;
    }
};

export default { rpcGetBlockDetailsByNumber, rpcGetBlockDetailsByNumberV2 }