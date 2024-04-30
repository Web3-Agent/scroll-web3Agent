import { NextResponse } from 'next/server';
import { configs } from "@/configs";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const txn_hash = url.searchParams.get('txn_hash');
        const chain_name = url.searchParams.get('chain_name');
        if (!txn_hash || !chain_name) {
            return NextResponse.json({ message: 'Txn hash & Chain name is required!', data: { txn_hash, chain_name } }, { status: 400 });
        }
        const response = await fetch(
            `https://datalayer.decommas.net/datalayer/api/v1/transaction/${chain_name}/${txn_hash}?api-key=${configs.DCOMMA_API_KEY}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const { result } = await response.json() as any
        return NextResponse.json({ message: 'Here are details of transaction!', data: result }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 