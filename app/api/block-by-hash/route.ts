import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetBlockByHashV2 } from '@/app/api-helpers/block-by-hash';
import { getNetworkConfig } from '@/constants/blockpiRPCMapping';

export async function GET(request: Request) {
    try {
        console.log({ ui: "0-00" })
        const url = new URL(request.url);
        let network: any = url.searchParams.get('network');
        let blockHash: any = url.searchParams.get('hash');
        if (!network || !blockHash) {
            return NextResponse.json({ message: 'Network & Block Hash is required!', data: { network, blockHash } }, { status: 400 });
        }

        const networkConfig = getNetworkConfig(network)
        console.log("2->", { networkConfig, blockHash })
        let response = await rpcGetBlockByHashV2(networkConfig.RPC_URL, networkConfig.BLOCK_DETAILS_BY_HASH_METHOD, blockHash);
        console.log({ response: response?.data?.result })
        response = response?.data?.result || null
        if (!response) {
            return NextResponse.json({ message: 'No block details Found by hash!', data: response }, { status: 204 });
        }

        const responsePayload = {
            network,
            // hexadecimal: response,
            blockNumberInteger: convertStringToNumber(convertHexToString(response?.number)),
            ...response,
        };
        delete responsePayload?.transactionsRoot;
        delete responsePayload?.transactions;
        delete responsePayload?.uncles;
        delete responsePayload?.extraData;
        delete responsePayload?.logsBloom;
        return NextResponse.json({ message: 'Here is block details by hash!', data: responsePayload }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 