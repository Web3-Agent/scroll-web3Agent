import {
    FrameRequest,
    getFrameHtmlResponse,
    getFrameMessage,
} from "@coinbase/onchainkit";
import { toBase64 } from 'openai/core';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { message } = await getFrameMessage(body);

    if (!message) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    let input: any = message?.raw?.action?.input?.text || '0';
    input = input.split(",").map((item: string) => item.trim());

    if (input?.length < 2) {
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
    }
    const code = `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract ${input[0]}Token is ERC20 {
        constructor(uint256 initialSupply) ERC20("${input[0]}", "${input[1]}") {
            _mint(msg.sender, initialSupply);
        }
    }`
    const base = toBase64(code)
    const link = `https://remix.ethereum.org/?#code=${base}&autoCompile=true&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js`
    const downloadLink = `http://localhost:3030/api/frames/download?code=${code}`
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Start Again!',
                },
                {
                    label: 'Hardhat',
                    action: "link",
                    target: downloadLink
                },
                {
                    label: 'Remix',
                    action: 'link',
                    target: link
                },
            ],
            image: `https://cdn.pixabay.com/photo/2019/12/03/07/34/gift-4669449_1280.jpg`,
            post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/start`,
        })
    );
}


export const dynamic = "force-dynamic";