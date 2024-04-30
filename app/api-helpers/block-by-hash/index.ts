import { payloadId } from '@/app/api-helpers/chain';
import axios from 'axios';

export const rpcGetBlockByHashV2 = async (rpcUrl: string, method: string = 'eth_getBlockByHash', hash: string) => {
    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }
    console.log("LINE 10: eth_getBlockByHash => ", { method, hash })
    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method,
        params: [hash, true],
    });
    return response;
};

export default { rpcGetBlockByHashV2 }
