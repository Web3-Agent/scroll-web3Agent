import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const data: any = await req.json();
    console.log("data is", data);
    const buttonId = data.untrustedData.buttonIndex;

    if (buttonId === 1) {
        return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Create new token</title>
          <meta property="fc:frame" content="vNext"/>
          <meta property="fc:frame:image" content="https://i.imgur.com/S36XjoZ.png" />
          <meta property="fc:frame:input:text" content="Token name"/>
          <meta property="fc:frame:button:1" content="Next" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/token-symbol"/>
      </head>
      </html>
    `);
    } else {
        return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Send existing token</title>
          <meta property="fc:frame" content="vNext"/>
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmebVmA21DFZA4w7ASbAFvqeWNHLqJtE29BrATzDEUqaT4" />
          <meta property="fc:frame:input:text" content="Token address"/>
          <meta property="fc:frame:button:1" content="Next" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/existing-token-amount"/>
      </head>
      </html>
    `);
    }
}

export const dynamic = "force-dynamic";