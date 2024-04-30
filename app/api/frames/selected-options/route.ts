import {
    FrameRequest,
    getFrameHtmlResponse,
    getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body);

    if (!isValid) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    if (!message) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    let choice: any = message?.raw?.action?.input?.text || '0';
    choice = parseInt(choice)
    switch (choice) {
        case 1:
            return new NextResponse(
                getFrameHtmlResponse({
                    input: {
                        text: 'input eg: token_name, symbol',
                    },
                    buttons: [
                        {
                            label: 'Click to Proceed',
                        },
                    ],
                    image: `https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
                    post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/token-creation`,
                })
            );
            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        default:
            return new NextResponse(
                getFrameHtmlResponse({
                    buttons: [
                        {
                            label: `Invalid Input, Try Again!`,
                        },
                    ],
                    image: `https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
                    post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
                })
            )
    }
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

}

export const dynamic = "force-dynamic";