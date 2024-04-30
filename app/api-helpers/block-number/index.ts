import { getChainData, payloadId } from '@/app/api-helpers/chain';
import axios from 'axios';

export const rpcGetBlockNumber = async (chainId: number) => {
    const rpcUrl = getChainData(chainId).rpc_url;

    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }

    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method: "eth_blockNumber",
        params: [],
    });
    return response;

};

export const rpcGetBlockNumberV2 = async (rpcUrl: string, method: string = 'eth_blockNumber') => {
    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }

    try {
        const response = await axios.post(rpcUrl, {
            jsonrpc: "2.0",
            id: payloadId(),
            method,
            params: [],
        });
        return response;
    } catch (error) {
        return error;
    }
};

export default { rpcGetBlockNumber, rpcGetBlockNumberV2 }