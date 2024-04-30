import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    try {
        const config = {
            headers: {
            },
            params: {}
        };
        const { data } = await axios.get(`https://phoenix.lightlink.io/api/v2/stats/`, config);
        if (!data) {
            return NextResponse.json({ message: 'No Stats Found!', data }, { status: 204 });
        }
        return NextResponse.json({ message: 'Here is details of stats!', data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 