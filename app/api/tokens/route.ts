import { NextResponse } from 'next/server';
import { configs } from "@/configs";
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { convertAmountFromRawNumber, divide, multiply, add, formatFixedDecimals } from '../../api-helpers/formatters';
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const address = url.searchParams.get('address');
        if (!address) {
            return NextResponse.json({ message: 'Address is required!', data: { address } }, { status: 400 });
        }
        const response = await fetch(
            `https://datalayer.decommas.net/datalayer/api/v1/tokens/${address}?api-key=${configs.DCOMMA_API_KEY}&limit=20`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let { result, count } = await response.json() as any
        if (!result || !result?.length) {
            return NextResponse.json({ message: 'No Tokens!', data: result }, { status: 200 });
        }
        let total: any = 0;
        result = result.map((coin: any) => {
            if (coin?.actual_price) {
                const obj = {
                    chain_name: coin?.chain_name || 'NA',
                    name: coin?.name || 'NA',
                    actual_price: coin?.actual_price || 'NA',
                    amount: coin?.amount || 'NA',
                    value: coin?.actual_price ? formatFixedDecimals(multiply(convertAmountFromRawNumber(coin.amount, coin.decimals), coin.actual_price), 2) : '0'
                }
                total = add(total, obj.value);
                return obj
            }
        }).filter((item: any) => item);
        total = formatFixedDecimals(total, 2)
        return NextResponse.json({ message: 'Here is your Tokens details!', total, count, data: result }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
}

