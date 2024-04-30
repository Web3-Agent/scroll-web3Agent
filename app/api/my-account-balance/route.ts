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
            `https://datalayer.decommas.net/datalayer/api/v1/coins/${address}?api-key=${configs.DCOMMA_API_KEY}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let { result } = await response.json() as any
        if (!result || !result?.length) {
            return NextResponse.json({ message: 'No Portfolio!', data: result }, { status: 200 });
        }
        let total: any = 0;
        result = result.map((coin: any) => {
            const obj = {
                ...coin,
                value: formatFixedDecimals(multiply(convertAmountFromRawNumber(coin.amount, coin.decimals), coin.actual_price), 2)
            }
            total = add(total, obj.value);
            return obj
        })
        total = formatFixedDecimals(total, 2)
        return NextResponse.json({ message: 'Here is your Portfolio details!', total, data: result }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
}

