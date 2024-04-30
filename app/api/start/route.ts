import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
    return new NextResponse(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Send or create Token</title>
                <meta property="fc:frame" content="vNext"/>
                <meta property="fc:frame:image" content="https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75" />
                <meta />
                <meta property="fc:frame:button:1" content="Get Started!!!" />
                <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/options"/>
            </head>
            </html>
        `);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    return getResponse(req);
}

export const dynamic = "force-dynamic";
