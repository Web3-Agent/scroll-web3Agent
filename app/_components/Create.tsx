"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { createToken } from "../../helpers";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Create() {
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner]: any = useState();
    const searchParams = useSearchParams();
    const destChain = searchParams.get("destChain");
    const sourceChain: any = searchParams.get("sourceChain");
    const name: any = searchParams.get("name");
    const symbol: any = searchParams.get("symbol");
    const amount: any = searchParams.get("amount");

    const connectWalletHandler = async () => {
        //@ts-ignore
        let provider = new ethers.providers.Web3Provider(window.ethereum);//new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        setSigner(signer);

        setIsConnected(true);
    };

    const mintTokensHandler = async () => {
        console.log("HI-----", signer)
        const account = await signer.getAddress();
        const destinationChain: any = destChain?.split(",").map(item => item?.trim());
        console.log({
            destinationChain,
            account,
            sourceChain,
            name,
            symbol,
            amount,
            signer
        })
        // @ts-ignore
        await createToken(
            destinationChain,
            account,
            sourceChain,
            name,
            symbol,
            18,
            amount,
            signer
        );
    };

    return (
        <div className="flex justify-center flex-col mt-20">
            <button
                onClick={connectWalletHandler}
                className="w-48 rounded-lg h-10 m-auto bg-blue-500 text-xl"
            >
                {isConnected ? "Wallet connected" : "Connect Wallet"}
            </button>
            <button
                className="bg-green-400 w-48 h-10 m-auto rounded-lg mt-4"
                onClick={() => mintTokensHandler()}
            >
                Mint tokens
            </button>
        </div>
    );
}