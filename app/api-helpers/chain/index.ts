import SUPPORTED_CHAINS from "@/constants/chains";
import { configs } from "@/configs";

export function getChainData(chainId: number, noInfuraKeys?: string) {
    const chainData = SUPPORTED_CHAINS.filter((chain: any) => chain.chain_id === chainId)[0];

    if (!chainData) {
        throw new Error("ChainId missing or not supported");
    }

    if (!noInfuraKeys) {
        const INFURA_API_KEY = configs.INFURA_API_KEY;

        if (
            INFURA_API_KEY &&
            chainData.rpc_url.includes("infura.io") &&
            chainData.rpc_url.includes("INFURA_API_KEY")
        ) {
            chainData.rpc_url = chainData.rpc_url.replace("INFURA_API_KEY", INFURA_API_KEY);
        }
    }

    return chainData;
}

export function payloadId() {
    const datePart = new Date().getTime() * Math.pow(10, 3);
    const extraPart = Math.floor(Math.random() * Math.pow(10, 3));
    const id = datePart + extraPart;
    return id;
}
