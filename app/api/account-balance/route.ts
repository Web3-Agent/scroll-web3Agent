import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { getChainData } from '@/app/api-helpers/chain';
import { rpcGetAccountBalance } from '@/app/api-helpers/account-balance';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const account = url.searchParams.get('account');
        let chainId: any = url.searchParams.get('chainId');

        if (!account || !chainId) {
            return NextResponse.json({ message: 'Account & Chain is required!', data: { account, chainId } }, { status: 400 });
        }

        chainId = parseInt(chainId, 10);

        const chainData = getChainData(chainId);
        const nativeCurrency = chainData.native_currency;
        let response = await rpcGetAccountBalance(account, chainId);
        response = response?.data?.result || null
        if (!response) {
            return NextResponse.json({ message: 'No Content Found!', data: response }, { status: 204 });
        }
        const responsePayload = {
            account,
            chainId,
            ...nativeCurrency,
            hexadecimal: response,
            wei: convertStringToNumber(convertHexToString(response)),
            gwei: Math.ceil(convertStringToNumber(convertHexToString(response)) / 1000000000),
            ether: convertStringToNumber(convertHexToString(response)) / 1_000_000_000_000_000_000
        }

        return NextResponse.json({ message: 'Here is details of account balance!', data: responsePayload }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 