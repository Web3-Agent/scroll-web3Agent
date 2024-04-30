import { client } from "../../lib/redis/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const data = await req.json();
    const inputText = data.untrustedData.inputText;

    const output = await client.set("symbol", inputText);

    const dd = await client.get("symbol");
    console.log("symbol", output, dd);

    return new NextResponse(`   
  <!DOCTYPE html>
      <html>
        <head>
        <title>Amount</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://i.imgur.com/TkgMA3p.png"/>
          <meta property="fc:frame:input:text" content="Token amount"/>
          <meta property="fc:frame:button:1" content="Next" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/token-network"/>
          </head>
      </html>
  `);
}