import { NextResponse } from 'next/server';
import { preprocessJSON, translatePromptToJSON } from '../../api-helpers/parse-defi-prompt/processors';

export async function POST(request: Request) {
    try {
        const _request = await request.json()
        const preprocessedJSON = await preprocessJSON(_request);
        const actionJSON = await translatePromptToJSON(preprocessedJSON);
        if (!actionJSON) {
            return NextResponse.json({ error: "Failed to process the prompt" }, { status: 400 });
        }
        return NextResponse.json({ message: 'Here is gas fee for Ethereum!', data: JSON.stringify(request), actionJSON }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 