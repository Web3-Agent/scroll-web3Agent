import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    try {
        const config = {
            headers: {
            },
            params: {}
        };
        const { data } = await axios.get(`https://phoenix.lightlink.io/api/v2/stats/charts/transactions`, config);

        if (!data) {
            return NextResponse.json({ message: 'No Transaction Found for Chart!', data }, { status: 204 });
        }
        return NextResponse.json({ message: 'Here is details of transaction!', data: data.chart_data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 