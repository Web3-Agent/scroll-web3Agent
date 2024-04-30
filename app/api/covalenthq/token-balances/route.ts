import { NextResponse } from 'next/server';
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

        // let { data } = await client.BalanceService.getTokenBalancesForWalletAddress("eth-mainnet", "0xeb2eb5c68156250c368914761bb8f1208d56acd0", { "noNftAssetMetadata": false, "noSpam": true, "noNftFetch": true, "nft": false, "quoteCurrency": "USD" });
        let { data } = await client.BalanceService.getTokenBalancesForWalletAddress(network, address, { "noNftAssetMetadata": false, "noSpam": true, "noNftFetch": true, "nft": false, "quoteCurrency": "USD" });

        if (!data) {
            return NextResponse.json({ message: 'No Data Found!', data }, { status: 204 });
        }
        let { items } = data;
        items = items?.filter(item => item?.quote).map(item => {
            const { pretty_quote, contract_name, contract_ticker_symbol, balance, contract_decimals } = item;
            return {
                balance: convertAmountFromRawNumber(balance, contract_decimals),
                token: contract_name,
                symbol: contract_ticker_symbol
            }
        })

        return NextResponse.json({ message: 'Here is details of account balance!', data: items }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 