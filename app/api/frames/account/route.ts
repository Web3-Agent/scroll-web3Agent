import {
    FrameRequest,
    getFrameHtmlResponse,
    getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body);

    console.log("message: ", message);

    if (!isValid) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }
    console.log('👉🏻 Line 34 : ', isValid);

    if (!message) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }
    console.log('👉🏻 Line 38 : ', message);
    console.log('👉🏻 Line 40 : ', process.env.NEXT_PUBLIC_BASE_URL);

    // if (!message.recasted) {
    //     return new NextResponse(
    //         getFrameHtmlResponse({
    //             buttons: [
    //                 {
    //                     label: `Recast & Try Again`,
    //                 },
    //             ],
    //             image: `https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
    //             post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
    //         })
    //     );
    // }
    console.log('👉🏻 Line 38 : ', `${process.env.NEXT_PUBLIC_PINATA_KEY}/ipfs/QmVrVf3TaC7aMx6xEg6urWDJ97d8V5nR2RDVUggJ8vzJdL`);

    return new NextResponse(
        getFrameHtmlResponse({
            input: {
                text: 'Choose anyone option from above',
            },
            buttons: [
                {
                    label: 'Click to Proceed',
                },
            ],
            image: `https://i.imgur.com/whKwtBW.png?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
            post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/selected-options`,
        })
    );
    // return new NextResponse(
    //     getFrameHtmlResponse({
    //         buttons: [
    //             {
    //                 label: `Manage Smart Account`,
    //                 action: "link",
    //                 target: `https://safe.epochprotocol.xyz/home?safe=matic:${'userSCWallet'}`,
    //             },
    //             {
    //                 label: `View on Etherscan`,
    //                 action: "link",
    //                 target: `https://polygonscan.com/address/${'userSCWallet'}`,
    //             },
    //         ],
    //         image: `https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
    //     })
    // );
}

export const dynamic = "force-dynamic";