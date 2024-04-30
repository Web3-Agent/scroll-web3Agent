import { NextResponse } from 'next/server';
import { configs } from "@/configs";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const chain_name = url.searchParams.get('chain_name');
        const contract_address = url.searchParams.get('contract_address');
        const token_id = url.searchParams.get('token_id');
        if (!token_id || !chain_name || !contract_address) {
            return NextResponse.json({ message: 'Contract address, token id & chain name is required!', data: { chain_name, contract_address, token_id } }, { status: 400 });
        }
        const response = await fetch(
            `https://datalayer.decommas.net/datalayer/api/v1/nft_metadata/${chain_name}/${contract_address}/${token_id}?api-key=${configs.DCOMMA_API_KEY}&limit=100`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const { result } = await response.json() as any
        return NextResponse.json({ message: 'Here are details of NFT metadata!', data: result }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 