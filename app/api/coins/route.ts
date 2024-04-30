import { getAllCoins } from '@/app/api-helpers/coins';
import { NextResponse } from 'next/server';
// import { getAllCoins } from "@/app/api-helpers/coins";
export async function GET() {
    try {
        const data = await getAllCoins()
        return NextResponse.json({ message: 'Here is list of coins!', data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'We ran into a problem Try again in a few minutes!', data: error }, { status: 500 });

    }
} 