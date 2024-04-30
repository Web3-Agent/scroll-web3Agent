import { NextResponse } from 'next/server';
import { configs } from "@/configs";
async function httpCall(chainId: string, src: string, dst: string, amount: string, from: string, slippage: string) {

    let query = `src=${src}&dst=${dst}&amount=${amount}&from=${from}&slippage=${slippage}`
    const url = `https://api.1inch.dev/swap/v5.2/${chainId}/swap` + "?" + query;
    try {
        let response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${configs.INCH_API_KEY}`
                },
            }
        )

        if (response.ok) {
            response = await response.json() as any
            return response;
        } else {
            response = await response.json() as any
            throw new Error(response?.description)
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const src = url.searchParams.get('src');
        const dst = url.searchParams.get('dst');
        const amount = url.searchParams.get('amount');
        const from = url.searchParams.get('from');
        // const receiver = url.searchParams.get('receiver');
        const slippage = url.searchParams.get('slippage');
        const chainId = url.searchParams.get('chainId')!;
        if (!src || !dst || !amount || !from || !slippage) {
            return NextResponse.json({ message: 'Please send all the mandtory fields,i.e. src, dst, amount, from, slippage!', data: { src, dst, amount, from, slippage, chainId } }, { status: 400 });
        }
        const response = await httpCall(chainId, src, dst, amount, from, slippage)
        return NextResponse.json({ message: 'Here is swap token response!', response }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 