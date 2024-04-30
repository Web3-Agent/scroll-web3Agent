import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const block_input = url.searchParams.get('block_input');
        // const network: any = url.searchParams.get('network');
        if (!block_input) {
            return NextResponse.json({ message: 'Network & Hash is required!', data: { hash } }, { status: 400 });
        }
        const config = {
            headers: {
                // "Authorization": `Bearer ${configs.INCH_API_KEY}`
            },
            params: {}
        };
        const { data } = await axios.get(`https://phoenix.lightlink.io/api/v2/blocks/${block_input}`, config);

        if (!data) {
            return NextResponse.json({ message: 'No Transaction Found!', data }, { status: 204 });
        }
        const response = {
            difficulty: data?.difficulty || '',
            total_difficulty: data?.total_difficulty || '',

            gas_limit: data?.gas_limit || '',
            hash: data?.hash || '',
            height: data?.height || '',
            parent_hash: data?.parent_hash || '',
            timestamp: data?.timestamp || '',
            withdrawals_count: data?.withdrawals_count || '',
            size: data?.size || '',
        }
        return NextResponse.json({ message: 'Here is details of block!', data: response }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 