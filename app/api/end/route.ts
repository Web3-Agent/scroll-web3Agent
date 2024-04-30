import { client } from "../../lib/redis/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const data = await req.json();
    const inputText: string = data.untrustedData.inputText;

    const sourceChain = inputText.split(",")[0];
    let destinationChain = inputText.split(",");

    //@ts-ignore
    destinationChain = destinationChain.slice(1);

    const name = await client.get("name");
    const symbol = await client.get("symbol");
    const amount = await client.get("amount");

    return new NextResponse(`   
  <!DOCTYPE html>
      <html>
        <head>
        <title>Congratulations</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://i.imgur.com/nVp1s9o.png"/>
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/home"/>
          <meta property="fc:frame:button:1" content="Mint tokens" />
          <meta property="fc:frame:button:1:action" content="link"/>
          <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_BASE_URL}/create?name=${name}&symbol=${symbol}&amount=${amount}&sourceChain=${sourceChain}&destChain=${destinationChain}"/>
          </head>
      </html>
  `);
}