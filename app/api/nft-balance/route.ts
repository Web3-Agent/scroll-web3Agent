import { NextResponse } from 'next/server';
import { configs } from "@/configs";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const address = url.searchParams.get('address');
        if (!address) {
            return NextResponse.json({ message: 'Address is required!', data: { address } }, { status: 400 });
        }
        const response = await fetch(
            `https://datalayer.decommas.net/datalayer/api/v1/nfts/${address}?api-key=${configs.DCOMMA_API_KEY}&limit=100`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const { result, count } = await response.json() as any
        return NextResponse.json({ message: 'Here are details of your nft balance!', data: result, count }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 