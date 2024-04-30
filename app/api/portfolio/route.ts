import { NextResponse } from 'next/server';
import { configs } from "@/configs";
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { convertAmountFromRawNumber, divide, multiply, add, formatFixedDecimals } from '../../api-helpers/formatters';
const getTokensDetails = async (address) => {
    try {
        const response = await fetch(
            `https://datalayer.decommas.net/datalayer/api/v1/tokens/${address}?api-key=${configs.DCOMMA_API_KEY}&limit=20`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let { result } = await response.json() as any
        if (!result || !result?.length) {
            return { total: 0, data: [] }
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
        return { total, result }
    } catch (error) {
        console.log("Error while fetching coin details", error)
        return { total: 0, data: [] }
    }
}

const getCoinsDetails = async (address) => {
    try {
        const coinsResponse = await fetch(
            `https://datalayer.decommas.net/datalayer/api/v1/coins/${address}?api-key=${configs.DCOMMA_API_KEY}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let { result } = await coinsResponse.json() as any
        if (!result || !result?.length) {
            return { total: 0, data: [] }
        }
        let total: any = 0;
        result = result.map((coin: any) => {
            const obj = {
                chain_name: coin?.chain_name || 'NA',
                name: coin?.name || 'NA',
                actual_price: coin?.actual_price || 'NA',
                amount: coin?.amount || 'NA',
                value: coin?.actual_price ? formatFixedDecimals(multiply(convertAmountFromRawNumber(coin.amount, coin.decimals), coin.actual_price), 2) : '0'
            }
            total = add(total, obj.value);
            return obj
        })
        total = formatFixedDecimals(total, 2)
        return { total, result }
    } catch (error) {
        console.log("Error while fetching coin details", error)
        return { total: 0, data: [] }
    }
}
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const address = url.searchParams.get('address');
        if (!address) {
            return NextResponse.json({ message: 'Address is required!', data: { address } }, { status: 400 });
        }
        const [coin, token] = await Promise.all([
            getCoinsDetails(address),
            getTokensDetails(address)
        ]);
        const result = [...coin.result, ...token.result];
        const total = add(coin.total, token.total);
        return NextResponse.json({ message: 'Here is your Portfolio details!', total, data: result }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
}

