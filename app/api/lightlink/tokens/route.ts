import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const address = url.searchParams.get('address');
        // const network: any = url.searchParams.get('network');
        if (!address) {
            return NextResponse.json({ message: 'address is required!', data: { address } }, { status: 400 });
        }
        const config = {
            headers: {
            },
            params: {}
        };
        const { data } = await axios.get(`https://phoenix.lightlink.io/api/v2/tokens/${address}`, config);
        if (!data) {
            return NextResponse.json({ message: 'No Token Found!', data }, { status: 204 });
        }
        return NextResponse.json({ message: 'Here is details of token!', data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 