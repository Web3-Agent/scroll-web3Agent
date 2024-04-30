'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from '@/app/_components/UserCard'
// import web3 from '../../utils/web3';
import { useEffect } from 'react';
import ethers from 'ethers'
import Web3 from 'web3';
import React from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi'
export default function ClientPage() {
    const session: any = {}
    const { chain } = useNetwork()
    const sendEth = async () => {
        try {
            // Connect to the user's MetaMask (or other injected Web3 provider)
            if (window.ethereum) {
                await window.ethereum.enable();
            }
            const web3 = new Web3(window.ethereum);
            // const networkId = await window.ethereum.request({ method: 'net_version' });
            // console.log({ networkId, chain, chains })
            // const chainId = 1001; //

            // await web3?.currentProvider?.request({
            //     method: 'wallet_switchEthereumChain',
            //     params: [{ chainId: Web3.utils.toHex(chainId) }],
            // });
            // Get the user's accounts
            const accounts = await web3.eth.getAccounts();
            console.log({ accounts })
            let amount = 0.5, recipientAddress = '0x3EBCB8f4d6EA1FCc7D2352B68bDdE3364F1d20F1'
            // Convert amount to Wei
            const amountInWei = web3.utils.toWei(amount, 'ether');
            // Send transaction
            const transaction = await web3.eth.sendTransaction({
                from: accounts[0],
                to: recipientAddress,
                value: amountInWei,
                // chainId: chainId
            });

            // setTransactionHash(transaction.transactionHash);
        } catch (error) {
            console.error('Error sending ETH:', error.message);
        }
    };
    const getBalance = async (address = "0x32617e28b106471c61a46Af34F8bA09D0F73b70f") => {
        const wei = await web3.eth.getBalance(address);
        const lyx = parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(2);
        console.log({ wei, lyx })
        const accounts = await web3.eth.getAccounts();
        console.log({ accounts })
        const data = await web3.eth.sendTransaction({
            from: '0x32617e28b106471c61a46Af34F8bA09D0F73b70f',// accounts[0],                      // The Universal Profile address
            to: '0x3EBCB8f4d6EA1FCc7D2352B68bDdE3364F1d20F1',                            // receiving address, can be a UP or EOA
            value: web3.utils.toWei('0.5', 'ether') // 0.5 amount in ETH, in wei unit
        });
        console.log({ data })
    }
    //useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         redirect('/api/auth/signin?callbackUrl=/client')
    //     }
    // })

    return (
        <section className="flex flex-col gap-6" >
            {/* <UserCard user={session?.user} pagetype={"Client"} />
            <button className='bg-pink-400 text-white p-2' onClick={() => sendEth()}>CLICK HERE</button> */}
        </section >
    )
}