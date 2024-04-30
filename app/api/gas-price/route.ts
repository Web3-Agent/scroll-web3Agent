import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetGasFeeV2 } from '@/app/api-helpers/gas-price';
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
        let response = await rpcGetGasFeeV2(networkConfig.RPC_URL, networkConfig.GAS_PRICE_METHOD);
        console.log({ response })
        response = response?.data?.result || null
        if (!response) {
            return NextResponse.json({ message: 'No Gas Found!', data: response }, { status: 204 });
        }
        const responsePayload = {
            network,
            wei: convertStringToNumber(convertHexToString(response)),
            gwei: Math.ceil(convertStringToNumber(convertHexToString(response)) / 1000000000)
        }
        return NextResponse.json({ message: `Here is gas fee for ${network}!`, data: responsePayload, }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 