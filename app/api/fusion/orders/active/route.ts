import { NextResponse } from 'next/server';
import { configs } from "@/configs";
import axios from "axios";
import { NETWORK_CHAINID_MAPPING } from '../../../../../constants/networkWithChainIdMapping';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const network = url.searchParams.get('network');
        if (!network) {
            return NextResponse.json({ message: 'Chain/Network is required!', data: { network } }, { status: 400 });
        }

        const chainId = NETWORK_CHAINID_MAPPING[network.toUpperCase()];
        if (!chainId) {
            return NextResponse.json({ message: 'Unsupported Chain/Network!', data: { network, chainId } }, { status: 400 });

        }
        const inchUrl = `https://api.1inch.dev/fusion/orders/v1.0/${chainId}/order/active`;

        const config = {
            headers: {
                "Authorization": `Bearer ${configs.INCH_API_KEY}`
            },
            params: {}
        };
        const response = await axios.get(inchUrl, config);
        // console.log(response.data);

        return NextResponse.json({ message: 'Here is details of total active oders!', data: { totalActiveOrder: response?.data?.meta?.totalItems } }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 