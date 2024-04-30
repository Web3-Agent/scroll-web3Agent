import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const hash = url.searchParams.get('hash');
        // const network: any = url.searchParams.get('network');
        if (!hash) {
            return NextResponse.json({ message: 'Hash is required!', data: { hash } }, { status: 400 });
        }
        const config = {
            headers: {
                // "Authorization": `Bearer ${configs.INCH_API_KEY}`
            },
            params: {}
        };
        const { data } = await axios.get(`https://phoenix.lightlink.io/api/v2/transactions/${hash}`, config);

        if (!data) {
            return NextResponse.json({ message: 'No Transaction Found!', data }, { status: 204 });
        }
        const response = {
            from: data?.from?.hash || '',
            to: data?.to?.hash || '',
            block: data?.block,
            status: data?.status || '',
            timestamp: data?.timestamp,
            result: data?.result,
            hash: data?.hash,
            gas_limit: data?.gas_limit,
            gas_used: data?.gas_used,

        }
        return NextResponse.json({ message: 'Here is details of transaction!', data: response }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 