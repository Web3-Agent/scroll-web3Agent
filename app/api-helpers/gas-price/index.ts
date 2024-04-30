import { getChainData, payloadId } from '@/app/api-helpers/chain';
import axios from 'axios';
import { convertHexToString, convertStringToNumber } from '../formatters';

export const rpcGetGasFee = async (chainId: number) => {
    const rpcUrl = getChainData(chainId).rpc_url;

    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }

    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method: "eth_gasPrice",
        params: [],
    });
    return response;

};

export const rpcGetGasFeeV2 = async (rpcUrl: string, method: string = 'eth_gasPrice') => {
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

export default { rpcGetGasFee, rpcGetGasFeeV2 }