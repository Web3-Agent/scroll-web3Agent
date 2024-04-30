import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetBlockDetailsByNumberV2 } from '@/app/api-helpers/block-details-by-number';
import { getNetworkConfig } from '@/constants/blockpiRPCMapping';

export async function GET(request: Request) {
    try {
        console.log({ ui: "0-00" })
        const url = new URL(request.url);
        let network: any = url.searchParams.get('network');
        let blockNumber: any = url.searchParams.get('blockNumber') || 'latest';
        if (!network || !blockNumber) {
            return NextResponse.json({ message: 'Network & Block Number is required!', data: { network, blockNumber } }, { status: 400 });
        }
        blockNumber = isNaN(blockNumber) ? 'latest' : convertStringToNumber(blockNumber)
        const networkConfig = getNetworkConfig(network)
        console.log("2->", { networkConfig, blockNumber })
        let response = await rpcGetBlockDetailsByNumberV2(networkConfig.RPC_URL, networkConfig.BLOCK_DETAILS_BY_NUMBER_METHOD, blockNumber);
        console.log({ response: response?.data?.result })
        response = response?.data?.result || null
        if (!response) {
            return NextResponse.json({ message: 'No block details Found by number!', data: response }, { status: 204 });
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
        return NextResponse.json({ message: 'Here is block details by number!', data: responsePayload }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 