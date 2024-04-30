import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { getChainData } from '@/app/api-helpers/chain';
import { rpcGetAccountBalance } from '@/app/api-helpers/account-balance';
import { CovalentClient } from "@covalenthq/client-sdk";
import { configs } from '@/configs'
import { convertAmountFromRawNumber } from '@/app/api-helpers/formatters';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const address = url.searchParams.get('address');
        const network: any = url.searchParams.get('network');

        if (!address || !network) {
            return NextResponse.json({ message: 'Address & Network is required!', data: { network, address } }, { status: 400 });
        }

        const client = new CovalentClient(configs.COVALENT_API_KEY);
        let { data } = await client.NftService.getNftsForAddress(network, address, { "withUncached": true, "noNftAssetMetadata": true, "noSpam": true });
        // console.log("DATA ", data)
        if (!data) {
            return NextResponse.json({ message: 'No Data Found!', data }, { status: 204 });
        }
        data = data?.items?.map((item: any) => {
            const { contract_address, pretty_floor_price_quote, balance } = item;
            return {
                contract_address,
                // balance: convertAmountFromRawNumber(balance),
                balance_usd: pretty_floor_price_quote ?? 'NA'

            }
        })
        return NextResponse.json({ message: 'Here is details of account NFT balance!', data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });
    }
}