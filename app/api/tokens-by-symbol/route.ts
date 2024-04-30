import { NextResponse } from 'next/server';
import { configs } from "@/configs";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const token_symbol = url.searchParams.get('token_symbol');
        if (!token_symbol) {
            return NextResponse.json({ message: 'Txn hash & Chain name is required!', data: { token_symbol } }, { status: 400 });
        }
        const response = await fetch(
            `https://datalayer.decommas.net/datalayer/api/v1/tokens_by_symbol/${token_symbol}?api-key=${configs.DCOMMA_API_KEY}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let { result } = await response.json() as any
        result = result.map((item: any) => {
            return {
                actual_price: item?.actual_price || 'NA',
                chain_name: item?.chain_name || 'NA',
                name: item?.name || 'NA',
                symbol: item?.symbol || 'NA',
                address: item?.address || 'NA',
            }
        })
        return NextResponse.json({ message: 'Here are details of tokens!', data: result }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 