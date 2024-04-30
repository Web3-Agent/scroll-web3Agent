import { NextResponse } from 'next/server';
import { convertStringToNumber } from '@/app/api-helpers/formatters';

import { CovalentClient } from "@covalenthq/client-sdk";
import { configs } from '@/configs'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        let network: any = url.searchParams.get('network');
        let blockNumber: any = url.searchParams.get('blockNumber') || 'latest';
        if (!network || !blockNumber) {
            return NextResponse.json({ message: 'Network & Block Number is required!', data: { network, blockNumber } }, { status: 400 });
        }
        blockNumber = isNaN(blockNumber) ? 'latest' : convertStringToNumber(blockNumber)

        const client = new CovalentClient(configs.COVALENT_API_KEY);
        let response = await client.BaseService.getBlock(network, blockNumber);

        response = (response?.data?.items as any) || []
        if (!response.length) {
            return NextResponse.json({ message: 'No block details Found by number!', data: response }, { status: 204 });
        }

        return NextResponse.json({ message: 'Here is block details by number!', data: response[0] }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 