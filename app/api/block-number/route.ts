import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetBlockNumberV2 } from '@/app/api-helpers/block-number';
import { getNetworkConfig } from '@/constants/blockpiRPCMapping';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        let network: any = url.searchParams.get('network');
        if (!network) {
            return NextResponse.json({ message: 'Network is required!', data: { network } }, { status: 400 });
        }
        const networkConfig = getNetworkConfig(network)
        console.log("2->", { networkConfig })
        let response = await rpcGetBlockNumberV2(networkConfig.RPC_URL, networkConfig.BLOCK_NUMBER_METHOD);
        console.log({ response })
        response = response?.data?.result || null
        if (!response) {
            return NextResponse.json({ message: 'No Block Number Found!', data: response }, { status: 204 });
        }

        const responsePayload = {
            network,
            hexadecimal: response,
            integer: convertStringToNumber(convertHexToString(response)),
        };

        return NextResponse.json({ message: 'Here is block number for Ethereum!', data: responsePayload }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 