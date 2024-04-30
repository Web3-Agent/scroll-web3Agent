import { NextResponse } from 'next/server';
import clientPromise from '../../api-helpers/db/mongodb';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const address = url.searchParams.get('address');
        const chain: any = url.searchParams.get('chain');
        const client = await clientPromise;
        const db = client.db("my-test-app");

        if (!address || !chain) {
            return NextResponse.json({ message: 'Address & Chain is required', data: {} }, { status: 400 });
        }

        let data = await db.collection("address-chain-mappings").findOne({ address, chain: parseInt(chain, 10) });
        return NextResponse.json({ message: 'Here is block number for Ethereum!', data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
}

export async function POST(request: Request) {
    try {
        console.log(request)
        const { address, chain, table } = await request?.json();
        console.log({ address, chain, table })
        if (!address || !chain || !table) {
            return NextResponse.json({ message: 'Address, Chain & Table is required', data: {} }, { status: 400 });
        }
        const client = await clientPromise;
        const db = client.db("my-test-app");

        const query = { address, chain };
        const payload = { ...query, table }
        console.log(query, payload)
        let data = await db.collection("address-chain-mappings").findOne(query);
        console.log({ data })
        if (data) {
            return NextResponse.json({ message: 'Table Details Saved!', data }, { status: 200 });
        }

        data = await db.collection("address-chain-mappings").insertOne(payload, { new: true });
        console.log({ data })
        return NextResponse.json({ message: 'Table Details Saved!!', data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 