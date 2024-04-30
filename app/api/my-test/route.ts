import { NextResponse } from 'next/server';
import { configs } from "@/configs";
// 'use client'
// import React, { useEffect } from 'react'
import Web3 from "web3";
import fetch from "node-fetch";
import yesno from "yesno";
import axios from "axios";
import { async } from 'rxjs';

const chainId = 56; // Chain ID for Binance Smart Chain (BSC)
const web3RpcUrl = "https://bsc-dataseed.binance.org"; // URL for BSC node
const walletAddress = "0x32617e28b106471c61a46Af34F8bA09D0F73b70f"; // Your wallet address
const privateKey = ""; // Your wallet's private key. NEVER SHARE THIS WITH ANYONE!
const swapParams = {
    src: "0x111111111117dc0aa78b770fa6a738034120c302", // Token address of 1INCH
    dst: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3", // Token address of DAI
    amount: "100000000000000000", // Amount of 1INCH to swap (in wei)
    from: walletAddress,
    slippage: 1, // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
    disableEstimate: false, // Set to true to disable estimation of swap details
    allowPartialFill: false, // Set to true to allow partial filling of the swap order
};

const broadcastApiUrl = "https://api.1inch.dev/tx-gateway/v1.1/" + chainId + "/broadcast";
const apiBaseUrl = "https://api.1inch.dev/swap/v5.2/" + chainId;
const web3 = new Web3(web3RpcUrl);
const headers = { headers: { Authorization: "Bearer YOUR_API_KEY", accept: "application/json" } };
// useEffect(() => {
//     // const allowance = await checkAllowance(swapParams.src, walletAddress);
//     // console.log("Allowance: ", allowance);
// }, []);
// Construct full API request URL
function apiRequestUrl(methodName, queryParams) {
    return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}

// Post raw transaction to the API and return transaction hash
async function broadCastRawTransaction(rawTransaction) {
    return fetch(broadcastApiUrl, {
        method: "post",
        body: JSON.stringify({ rawTransaction }),
        headers: { "Content-Type": "application/json", Authorization: "Bearer YOUR-API-KEY" },
    })
        .then((res) => res.json())
        .then((res: any) => {
            return res.transactionHash;
        });
}

// Sign and post a transaction, return its hash
async function signAndSendTransaction(transaction) {
    const { rawTransaction } = await web3.eth.accounts.signTransaction(transaction, privateKey);

    return await broadCastRawTransaction(rawTransaction);
}
async function checkAllow() {
    // const allowance = await checkAllowance(swapParams.src, walletAddress);
    const allowance = await apiRequestUrl("/approve/allowance", { "tokenAddress": swapParams.src, "walletAddress": walletAddress })
    console.log("Allowance: ", allowance);
}
async function getToken() {
    const url = `https://api.1inch.dev/swap/v5.2/1/tokens`;
    console.log({ url })
    const config = {
        headers: {
            "Authorization": "Bearer "
        },
        params: {}
    };


    try {
        const response = await axios.get(url, config);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
        return error
    }
}
async function httpCall() {
    const chainId = 1
    let query = 'src=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&dst=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&amount=10000000000000000&from=0x32617e28b106471c61a46Af34F8bA09D0F73b70f&slippage=1'
    const url = `https://api.1inch.dev/swap/v5.2/${chainId}/swap` + "?" + query;
    console.log({ url })
    const config = {
        headers: {
            "Authorization": "Bearer l6yl2R8PLQB9hAAtHBLHhlkSsVkYDVmo"
        },
        params: {}
    };


    try {
        const response = await axios.get(url, config);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
        return error
    }
}
export async function GET(request: Request) {
    try {
        // const url = new URL(request.url);
        // const address = url.searchParams.get('address');
        // if (!address) {
        //     return NextResponse.json({ message: 'Address is required!', data: { address } }, { status: 400 });
        // }
        // const response = await fetch(
        //     `https://datalayer.decommas.net/datalayer/api/v1/nfts/${address}?api-key=${configs.DCOMMA_API_KEY}&limit=100`,
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     }
        // )
        // const { result, count } = await response.json() as any
        // const token = await getToken();
        const response = await httpCall()
        return NextResponse.json({ message: 'Here are details of your nft balance!', response }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 