import { NextResponse } from 'next/server';
import { CovalentClient } from "@covalenthq/client-sdk";
import { configs } from '@/configs'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const hash = url.searchParams.get('hash');
        const network: any = url.searchParams.get('network');

        if (!hash || !network) {
            return NextResponse.json({ message: 'Hash & Network is required!', data: { network, hash } }, { status: 400 });
        }

        const client = new CovalentClient(configs.COVALENT_API_KEY);

        let { data } = await client.TransactionService.getTransaction(network, hash);
        // let { data } = await client.TransactionService.getTransaction("avalanche-testnet", "0xb71c19c58b7bf5824b43c5ce0d44007d2534b21f3ba5d62589b3eff96749fcb9");

        if (!data) {
            return NextResponse.json({ message: 'No Data Found!', data }, { status: 204 });
        }


        return NextResponse.json({ message: 'Here is details of account balance!', data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 