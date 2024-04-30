'use client'
import Web3 from 'web3';

import { ChatRequest, FunctionCallHandler } from "ai";
import { useChat, type Message } from "ai/react";
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useAccount, useNetwork } from 'wagmi';
import { cn } from '@/app/lib/utils'
import { ChatList } from '@/app/_components/chat-list'
import { ChatPanel } from '@/app/_components/chat-panel'
import { EmptyScreen } from '@/app/_components/empty-screen'
import { ChatScrollAnchor } from '@/app/_components/chat-scroll-anchor'
import { nanoid } from '@/app/lib/utils'
import { functionSchemas } from "@/app/lib/functions/schemas";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { VerifyContractParams } from "@/app/lib/functions/types";
import LoginErrorMsg from "./LoginErrorMsg";
import React from "react";
import WebAuth from "./WebAuth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Pleaseconnect from "./pleaseconnect";
import { useTableland } from "@/context/TablelandProvider";
import { storeJSON } from "@/utils/saveHistory";
import Loader from '@/components/Loader'
import { deployContractCompile } from '../lib/functions/deploy-contract';
import { useGetTxReceipt } from '../../data/tx/getTxReceipt';
import { useSendTransaction, } from "wagmi";
import { CHAIN_ID_TO_NETWORK_MAPPING } from '../../constants/ChainIdToNetworkMapping';

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
}

const VALID_CHAIN_NAME = ['mainnet', 'optimism', 'arbitrum']


export function Chat({ id, initialMessages, className }: ChatProps) {
    const [verificationParams, setVerificationParams] = useState<VerifyContractParams>()
    // const { address } = useAccount()
    const [polling, setPolling] = useState(false)
    const { writeTable, isLoading: tlLoading, setIsLoading } = useTableland();
    const { address, connector, isConnected } = useAccount();
    const [_web3, _setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [upAddress, setUPAddress] = useState('NO Address')
    const [txnData, setTxnData] = useState({})
    const { chain } = useNetwork()
    const PRIVATE_KEY = '0x3fff66d819f30d0b9167ea6a76279d0dd51b5aff267b7cf3c78cb4033404ce58'; // your EOA private key
    const { data, isSuccess, sendTransaction } = useSendTransaction({
        request: {
            from: String(txnData?.from),
            to: String(txnData?.to),
            data: String(txnData?.data),
            value: String(txnData?.value),
        },
    })
    // Our static variables
    //const SAMPLE_PROFILE_ADDRESS2 = '0x6979474Ecb890a8EFE37daB2b9b66b32127237f7';
    const SAMPLE_PROFILE_ADDRESS = "0x0e098b3a37bc7b958D8fF7F90C74396D4117d6C4"//"0xB031363560403179Aac100d51864e27fFF4D7807";
    const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm/'//'https://rpc.testnet.lukso.network';
    const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';
    const deployContract = async (abi: any, bytecode: string) => {
        try {
            console.log({ _web3 })
            // return
            const accounts = await _web3.eth.getAccounts();
            const networkId = await _web3.eth.net.getId();
            // const deployedNetwork = YourContract.networks[networkId];
            console.log({ accounts, networkId, contract: _web3.eth })
            const contract = new _web3.eth.Contract(
                abi,
                // deployedNetwork && deployedNetwork.address
            );
            console.log({ contract })

            // Deploy the contract
            const deployedContract = await contract.deploy({
                data: bytecode //'0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063209652551461003b5780635524107714610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea2646970667358221220b3b2069a048a1d96ad53edb78bc7a2ba0772623cf46ba9c9b64b03dfb2006e0b64736f6c63430008150033',
            }).send({
                from: accounts[0],
                gas: '3000000', // Adjust gas value according to your contract
                gasPrice: '1000000000', // Adjust gas price according to your preferences
                // gas: '3000000', // Adjust gas value according to your contract
            });
            console.log({ deployedContract })

            console.log('Contract deployed at:', deployedContract.options.address, deployedContract);
            setContract(deployedContract);
            return deployedContract.options.address
        } catch (error) {
            console.error('Error deploying contract:', error);
        }
    };
    const sendTransactions = async (recipientAddress: string, amount: number) => {
        try {
            // Connect to the user's MetaMask (or other injected Web3 provider)
            if (window.ethereum) {
                await window.ethereum.enable();
            }
            const web3 = new Web3(window.ethereum);

            const accounts = await web3.eth.getAccounts();
            console.log({ accounts })
            // Convert amount to Wei
            const amountInWei = web3.utils.toWei(amount, 'ether');
            console.log({ amountInWei })
            // Send transaction
            const transaction = await web3.eth.sendTransaction({
                from: accounts[0],
                to: recipientAddress,
                value: amountInWei,
                gas: '3000000', // Adjust gas value according to your contract
                gasPrice: '1000000000', // Adjust gas price according to your preferences
                // gas: '3000000', // Adjust gas value according to your contract
                // chainId: chainId
            });
            console.log({ transaction })
            return { blockHash: transaction?.blockHash, transactionHash: transaction?.transactionHash, gasUsed: transaction?.gasUsed?.toString(), to: transaction?.to, from: transaction?.from }
        } catch (error) {
            console.error('Error sending ETH:', error.message);
            return error
        }
    };
    useEffect(() => {
        const initializeWeb3 = async () => {
            console.log({ window })
            // Modern DApp browsers like MetaMask inject a web3 instance
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    _setWeb3(web3Instance);
                } catch (error) {
                    console.error('User denied account access');
                }
            }
            // Legacy dApp browsers
            else if (window.web3) {
                const web3Instance = new Web3(window.web3.currentProvider);
                let myWeb3 = new Web3(web3Instance);

                _setWeb3(myWeb3);
                // const oldProvider = web3.currentProvider; // keep a reference to metamask provider

            }
            // Non-dApp browsers
            else {
                console.log('No web3 instance detected');
            }
        };

        initializeWeb3();
    }, []);
    useEffect(() => {
        const verifyFunction = async (verificationParams: VerifyContractParams) => {
            if (verificationParams) {
                const publicClient = createPublicClient({
                    chain: verificationParams?.viemChain,
                    transport: http(verificationParams?.viemChain?.rpcUrls?.default?.http[0])
                })
                try {
                    console.log("waiting for 4 confirmations")
                    const transactionReceipt = await publicClient.waitForTransactionReceipt(
                        { hash: verificationParams?.deployHash, confirmations: 4 }
                    )
                    console.log("got 4 confirmations, verifying contract")
                    if (transactionReceipt) {
                        const verifyResponse = await fetch(
                            '/api/verify-contract',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(verificationParams)
                            })
                        if (verifyResponse.ok) {
                            setPolling(false)
                        }
                    }
                } catch (e) {
                    console.log('Verification failed, may need more confirmations.', e)
                }
            }
        }

        if (polling && verificationParams) {
            const interval = setInterval(() => {
                verifyFunction(verificationParams)
            }, 10000)
            return () => clearInterval(interval)
        }
    }, [polling, verificationParams])
    useEffect(() => {
        console.log("LINE: 193", txnData)
        if (txnData && Object.keys(txnData).length) {
            sendTransaction()
        }

    }, [txnData])


    const functionCallHandler: FunctionCallHandler = async (
        chatMessages,
        functionCall
    ) => {
        console.log("functionCall.name ", functionCall)
        if (functionCall.name === 'deploy_contract') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            try {

                const response = await fetch(
                    '/api/get-contract-compile',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: functionCall.arguments
                    });

                let content: string;
                let role: 'system' | 'function';

                if (response.ok) {
                    const { abi, bytecode, } = await response.json()
                    console.log({ abi, bytecode })
                    const contractAddress = await deployContract(abi, bytecode)
                    content = "\n\n" + "Your contract is deployed and see the following detais. " + JSON.stringify({ contractAddress, abi, bytecode }) + '\n\n'
                    role = 'function'

                } else {
                    content = "No ABI and Bytecode found" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }

                const functionResponse: ChatRequest = {
                    messages: [
                        ...chatMessages,
                        {
                            id: nanoid(),
                            name: 'deploy_contract',
                            role: role,
                            content: content,
                        }
                    ],
                    functions: functionSchemas as any
                }

                return functionResponse

            } catch (error) {
                console.log("error=> ", error)
            }
        }
        if (functionCall.name === 'SWAP_TOKEN') {
            try {
                // You now have access to the parsed arguments here (assuming the JSON was valid)
                // If JSON is invalid, return an appropriate message to the model so that it may retry?
                console.log({ "functionCall": functionCall })
                const args = JSON.parse(functionCall?.arguments)
                console.log({ args })
                const argList = Object.keys(args);
                let content: string;
                let role: 'system' | 'function';
                if (argList.length && ['chainId', 'src', 'dst', 'amount', 'from', 'slippage'].every((value) => argList.includes(value))) {
                    let response = await fetch(
                        `/api/swap-token?chainId=${args.chainId}&src=${args.src}&dst=${args.dst}&amount=${args.amount}&from=${args.from}&slippage=${args.slippage}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });

                    if (response.ok) {
                        response = await response.json()
                        // console.log({ abi, bytecode })
                        // const contractAddress = await deployContract(abi, bytecode)

                        setTxnData({
                            to: response?.response?.tx?.to,
                            data: response?.response?.tx?.data,
                            value: response?.response?.tx?.value,
                            from: response?.response?.tx?.from,
                        });

                        content = JSON.stringify({ response }) + '\n\n' + 'Your contract is compiled.'
                        role = 'function'

                    } else {
                        response = await response.json()
                        content = JSON.stringify(response) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                        role = 'function'
                    }
                } else {
                    content = "chainId, src, dst, amount, from, and slippage are required fields." + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
                const functionResponse: ChatRequest = {
                    messages: [
                        ...chatMessages,
                        {
                            id: nanoid(),
                            name: 'SWAP_TOKEN',
                            role: role,
                            content: content,
                        }
                    ],
                    functions: functionSchemas as any
                }

                return functionResponse

            } catch (error) {
                console.log("error => ", error)
            }
        }
        if (functionCall.name === 'GET_GASLESS_SWAP_ACTIVE_ORDERS') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { network: string, chain_name: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args })

            if (args && args?.network) {
                try {
                    let _network = args.network;

                    if (!NETWORK_CHAINID_MAPPING[_network.toUpperCase()]) {
                        content = 'Invalid network name!'
                    } else {
                        response = await fetch(
                            `/api/fusion/orders/active?network=${_network}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            }
                        )
                        const { message, data } = await response.json()
                        if (data && Object.keys(data)?.length) {
                            content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                        } else {
                            content = 'No active order details found!'
                        }
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'GET_GASLESS_SWAP_ACTIVE_ORDERS',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'TRANSACTION_DETAILS_FOR_GRAPH') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            // const args: { network: string, chain_name: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';

            try {
                response = await fetch(
                    `/api/lightlink/charts-transactions`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                )
                const { message, data } = await response.json()
                if (data && Object.keys(data)?.length) {
                    content = JSON.stringify({ message, data }) + '\n\n' + 'Here is Graph Details.'
                } else {
                    content = 'No details found!'
                }
                role = 'function'
            } catch (error) {
                content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }


            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'TRANSACTION_DETAILS_FOR_GRAPH',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'GET_STATS') {
            let response: any;
            let content: string;
            let role: 'system' | 'function';

            try {
                response = await fetch(
                    `/api/lightlink/stats-counters`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                )
                const { message, data } = await response.json()
                if (data && Object.keys(data)?.length) {
                    content = JSON.stringify({ message, data }) + '\n\n' + 'Here is stats details.'
                } else {
                    content = 'No details found!'
                }
                role = 'function'
            } catch (error) {
                content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }


            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'GET_STATS',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'GET_TOKEN_DETAILS') {
            const args: { address: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args })

            if (args && args?.address) {
                try {
                    let _address = args.address;


                    response = await fetch(
                        `/api/lightlink/tokens?address=${_address}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data } = await response.json()
                    if (data && Object.keys(data)?.length) {
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No token details found!'
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'GET_TOKEN_DETAILS',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'GET_ACTUAL_SETTLEMENT_CONTRACT_ADDRESS') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { network: string, chain_name: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args })

            if (args && args?.network) {
                try {
                    let _network = args.network;

                    if (!NETWORK_CHAINID_MAPPING[_network.toUpperCase()]) {
                        content = 'Invalid network name!'
                    } else {
                        response = await fetch(
                            `/api/fusion/orders/settlement?network=${_network}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            }
                        )
                        const { message, data } = await response.json()
                        if (data && Object.keys(data)?.length) {
                            content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                        } else {
                            content = 'No active order details found!'
                        }
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'GET_ACTUAL_SETTLEMENT_CONTRACT_ADDRESS',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'show_top_nft_holder') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { contract_address: string, chain_name: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args })

            if (args && args?.contract_address && args?.chain_name) {
                try {
                    let _address = args.contract_address;
                    let _chain_name = args.chain_name.toLowerCase();
                    if (!VALID_CHAIN_NAME.includes(_chain_name)) {
                        content = 'Invalid chain name'
                    } else {
                        response = await fetch(
                            `/api/top-nft-holders?address=${_address}&chain_name=${_chain_name}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            }
                        )
                        const { message, data } = await response.json()
                        if (data && data?.length) {
                            content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                        } else {
                            content = 'No top nft holders found!'
                        }
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'show_top_nft_holder',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'send_amount_to_address') {
            try {
                // You now have access to the parsed arguments here (assuming the JSON was valid)
                // If JSON is invalid, return an appropriate message to the model so that it may retry?
                const args: { account: string, amount: number } = JSON.parse(functionCall?.arguments)
                let response: any;
                let content: string;
                let role: 'system' | 'function';
                console.log("{ args, amount, account },", args, args?.account, args?.amount)

                if (args && args?.account && args?.amount) {
                    try {
                        let _address = args.account;
                        let _amount: number = parseFloat(args?.amount);
                        console.log({ _amount, _address })
                        if (isNaN(_amount)) {
                            content = 'Please provide correct amount!'
                        } else {
                            let data = await sendTransactions(_address, _amount)
                            // const { message, data } = await response.json()
                            console.log("LINE-369:", data)
                            console.log("LINE-370:", data && Object.keys(data)?.length)
                            console.log("LINE-371:", Object.keys(data)?.length)
                            if (data && Object.keys(data)?.length) {
                                content = JSON.stringify({ message: "You have sent amount", data }) + '\n\n' + 'Here is details.'
                                console.log({ content })
                            } else {
                                content = 'You have failed to send amount!'
                            }
                        }
                        role = 'function'
                    } catch (error) {
                        console.log("LINE:380 ", error)
                        content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                        role = 'system'
                    }
                } else {
                    content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }

                const functionResponse: ChatRequest = {
                    messages: [
                        ...chatMessages,
                        {
                            id: nanoid(),
                            name: 'send_amount_to_address',
                            role: role,
                            content: content,
                        }
                    ],
                    functions: functionSchemas as any
                }

                return functionResponse

            } catch (error) {
                console.log("send_amount_to_address-> error-> : ", error)
            }
        }
        if (functionCall.name === 'show_tokens_by_symbol') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { token_symbol: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args })

            if (args && args?.token_symbol) {
                try {
                    let _token_symbol = args.token_symbol.toLowerCase();;

                    response = await fetch(
                        `/api/tokens-by-symbol?token_symbol=${_token_symbol}&chain_name=${_token_symbol}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data } = await response.json()
                    if (data && data?.length) {
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No Tokens found!'
                    }

                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'tokens_by_symbol',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }

        if (functionCall.name === 'show_list_of_protocols_for_wallet_address') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { address: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args })

            if (args && args?.address) {
                try {
                    response = await fetch(
                        `/api/protocols?address=${args.address}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data } = await response.json()
                    if (data) {
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No Protocols Details found!'
                    }

                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'show_list_of_protocols_for_wallet_address',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'show_nft_metadata_using_contract_address_token_id_and_chain_name') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { contract_address: string, chain_name: string, token_id: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args })

            if (args && args?.token_id && args?.chain_name && args?.contract_address) {
                try {
                    let _contract_address = args.contract_address;
                    let _token_id = args.token_id;
                    let _chain_name = args.chain_name.toLowerCase();
                    if (!VALID_CHAIN_NAME.includes(_chain_name)) {
                        content = 'Invalid chain name'
                    } else {
                        response = await fetch(
                            `/api/nft-metadata?contract_address=${_contract_address}&chain_name=${_chain_name}&token_id=${_token_id}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            }
                        )
                        const { message, data } = await response.json()
                        if (data) {
                            content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                        } else {
                            content = 'No NFT Metadata Details found!'
                        }
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'show_nft_metadata_using_contract_address_token_id_and_chain_name',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }

        if (functionCall.name === 'show_coins_for_wallet_address') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { address: string, chainId: number } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ address })
            if (args && args?.address) {
                try {
                    response = await fetch(
                        `/api/my-account-balance?address=${args.address}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data, total } = await response.json()
                    if (data && data?.length) {
                        content = JSON.stringify({ message, total, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No coins found!'
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'show_coins_for_wallet_address',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'SHOW_TOKENS_FOR_WALLET_ADDRESS') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { address: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ address })
            const network = CHAIN_ID_TO_NETWORK_MAPPING[chain?.id as number] ?? '';
            if (args && args?.address && network?.length) {
                try {
                    response = await fetch(
                        `/api/covalenthq/token-balances?address=${args.address}&network=${network}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data, total } = await response.json()
                    if (data && data?.length) {
                        content = JSON.stringify({ message, total, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No tokens found!'
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'SHOW_TOKENS_FOR_WALLET_ADDRESS',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'show_portfolio_for_wallet_address') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { address: string, chainId: number } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ address })
            if (args && args?.address) {
                try {
                    response = await fetch(
                        `/api/portfolio?address=${args.address}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data, total } = await response.json()
                    if (data && data?.length) {
                        content = JSON.stringify({ message, total, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No portfolio found!'
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'show_portfolio_for_wallet_address',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'GIVE_ME_NFT_BALANCE') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { address: string, chainId: number } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ args, address })
            const network = CHAIN_ID_TO_NETWORK_MAPPING[chain?.id as number] ?? '';
            console.log("NETWORK:", network)
            if (args && args?.address && network?.length) {
                try {
                    response = await fetch(
                        `/api/covalenthq/nft-balances?address=${args.address}&network=${network}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data } = await response.json()
                    if (data && data?.length) {
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No nft balance found!'
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'GIVE_ME_NFT_BALANCE',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'show_my_detailed_account_balance') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { account: string, chainId: number } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            console.log({ address })
            if (address && address.length) {
                try {
                    response = await fetch(
                        `/api/my-account-balance?address=${address}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    const { message, data } = await response.json()
                    if (data && data?.length) {
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    } else {
                        content = 'No account balance found!'
                    }
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Something went wrong!!!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'show_my_detailed_account_balance',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }

        if (functionCall.name === 'GET_TOKEN_BALANCE') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { address: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            const network = CHAIN_ID_TO_NETWORK_MAPPING[chain?.id as number] ?? '';
            if (args && args?.address && network?.length) {
                try {
                    response = await fetch(
                        `/api/covalenthq/token-balances?address=${args.address}&network=${network}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                    const { message, data } = await response.json()
                    content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Address is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }

            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'GET_TOKEN_BALANCE',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'PROVIDE_BLOCK_DETAILS_BY_BLOCK_HASH_FOR_NETWORK') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            try {
                const args: { hash: string } = JSON.parse(functionCall?.arguments)
                let response: any;
                let content: string;
                let role: 'system' | 'function';
                const block_input = args.hash;
                if (args && block_input) {
                    try {
                        response = await fetch(
                            `/api/lightlink/block-details?block_input=${block_input}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            })
                        const { message, data } = await response.json()
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                        role = 'function'
                    } catch (error) {
                        content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                        role = 'system'
                    }
                } else {
                    content = "hash is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
                const functionResponse: ChatRequest = {
                    messages: [
                        ...chatMessages,
                        {
                            id: nanoid(),
                            name: 'PROVIDE_BLOCK_DETAILS_BY_BLOCK_HASH_FOR_NETWORK',
                            role: role,
                            content: content,
                        }
                    ],
                    functions: functionSchemas as any
                }

                return functionResponse

            } catch (error) {
                console.log("PROVIDE_BLOCK_DETAILS_BY_BLOCK_HASH_FOR_NETWORK ERROR: ", error)
            }
        }
        if (functionCall.name === 'PROVIDE_TRANSACTION_DETAILS_FOR_NETWORK_BY_HASH') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            try {
                const args: { hash: string } = JSON.parse(functionCall?.arguments)
                let response: any;
                let content: string;
                let role: 'system' | 'function';
                const network = CHAIN_ID_TO_NETWORK_MAPPING[chain?.id as number] ?? '';
                if (args && args?.hash && network?.length) {
                    try {
                        response = await fetch(
                            `/api/covalenthq/transaction-by-hash?&hash=${args.hash}&network=${network}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            })
                        const { message, data } = await response.json()
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                        role = 'function'
                    } catch (error) {
                        content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                        role = 'system'
                    }
                } else {
                    content = "Hash is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
                const functionResponse: ChatRequest = {
                    messages: [
                        ...chatMessages,
                        {
                            id: nanoid(),
                            name: 'PROVIDE_TRANSACTION_DETAILS_FOR_NETWORK_BY_HASH',
                            role: role,
                            content: content,
                        }
                    ],
                    functions: functionSchemas as any
                }

                return functionResponse

            } catch (error) {
                console.log("PROVIDE_TRANSACTION_DETAILS_FOR_NETWORK_BY_HASH ERROR: ", error)
            }
        }
        if (functionCall.name === 'get_receipt_by_hash') {
            try {
                // You now have access to the parsed arguments here (assuming the JSON was valid)
                // If JSON is invalid, return an appropriate message to the model so that it may retry?
                const args: { hash: string } = JSON.parse(functionCall?.arguments)
                let response: any;
                let content: string;
                let role: 'system' | 'function';
                if (args && args?.hash) {
                    try {
                        let data = await useGetTxReceipt(args.hash)
                        console.log({ data })
                        content = JSON.stringify({ message: "Transaction Receipt", data }) + '\n\n' + 'Here is transaction receipt details.'
                        console.log({ content })
                        role = 'function'
                    } catch (error) {
                        console.log("ERROROR ", error)
                        content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                        role = 'system'
                    }
                } else {
                    content = "Hash is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
                const functionResponse: ChatRequest = {
                    messages: [
                        ...chatMessages,
                        {
                            id: nanoid(),
                            name: 'get_receipt_by_hash',
                            role: role,
                            content: content,
                        }
                    ],
                    functions: functionSchemas as any
                }

                return functionResponse

            } catch (error) {
                console.log("get_receipt_by_hash -> error: ", error)
            }
        }

        if (functionCall.name === 'PROVIDE_GAS_PRICE_FOR_NETWORK') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { network: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            if (args && args?.network) {
                try {
                    response = await fetch(
                        `/api/gas-price?network=${args.network}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                    const { message, data } = await response.json()
                    content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Network is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }
            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'PROVIDE_GAS_PRICE_FOR_NETWORK',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }

        if (functionCall.name === 'PROVIDE_LATEST_BLOCK_NUMBER_FOR_NETWORK') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { network: string } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            if (args && args?.network) {
                try {
                    response = await fetch(
                        `/api/block-number?network=${args.network}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                    const { message, data } = await response.json()
                    content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                    role = 'function'
                } catch (error) {
                    content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
            } else {
                content = "Network is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }
            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'PROVIDE_LATEST_BLOCK_NUMBER_FOR_NETWORK',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
        if (functionCall.name === 'PROVIDE_BLOCK_DETAILS_BY_BLOCK_NUMBER_FOR_NETWORK') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            try {
                const args: { blockNumber: any } = JSON.parse(functionCall?.arguments)
                let response: any;
                let content: string;
                let role: 'system' | 'function';
                console.log({ args })
                const blockNumber = args?.blockNumber;
                console.log("CHAIN", chain)
                const network = CHAIN_ID_TO_NETWORK_MAPPING[chain?.id as number] ?? '';
                console.log("NETWORK", network)
                if (args && blockNumber && network?.length) {
                    try {
                        response = await fetch(
                            `/api/covalenthq/block-details-by-number?blockNumber=${blockNumber}&network=${network}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            })
                        const { message, data } = await response.json()
                        content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                        role = 'function'
                    } catch (error) {
                        content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                        role = 'system'
                    }
                } else {
                    content = "Block number is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
                    role = 'system'
                }
                const functionResponse: ChatRequest = {
                    messages: [
                        ...chatMessages,
                        {
                            id: nanoid(),
                            name: 'PROVIDE_BLOCK_DETAILS_BY_BLOCK_NUMBER_FOR_NETWORK',
                            role: role,
                            content: content,
                        }
                    ],
                    functions: functionSchemas as any
                }

                return functionResponse
            } catch (error) {
                console.log("PROVIDE_BLOCK_DETAILS_BY_BLOCK_NUMBER_FOR_NETWORK ERROR->", error)
            }

        }
        if (functionCall.name === 'get_coins_list') {
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            const args: { txnHash: string, chainId: number } = JSON.parse(functionCall?.arguments)
            let response: any;
            let content: string;
            let role: 'system' | 'function';
            // if (args && args?.chainId) {
            try {
                response = await fetch(
                    `/api/coins`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                const { message, data } = await response.json()
                content = JSON.stringify({ message, data }) + '\n\n' + 'Here is details.'
                role = 'function'
            } catch (error) {
                content = JSON.stringify({ error }) + '\n\n' + 'Try to fix the error and show the user the updated code.'
                role = 'system'
            }
            // } else {
            //   content = "account and chain id is required!" + '\n\n' + 'Try to fix the error and show the user the updated code.'
            //   role = 'system'
            // }
            const functionResponse: ChatRequest = {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: 'get_coins_list',
                        role: role,
                        content: content,
                    }
                ],
                functions: functionSchemas as any
            }

            return functionResponse

        }
    }

    const { messages, append, reload, stop, isLoading, input, setInput } =
        useChat({
            experimental_onFunctionCall: functionCallHandler,
            initialMessages,
            id,
            body: {
                id
            },
            onResponse(response) {
                if (response.status === 401) {
                    toast.error(response.statusText)
                }
            }
        })
    const session: any = {}//useSession()
    if (!session) {
        return <LoginErrorMsg
            classname="flex flex-col justify-center items-center h-[calc(100vh-120px)]"
            title="Login Requires!"
            titleClassName="text-2xl font-bold my-2 text-green-600"
            subTitle="Please Login to Access Propmt!"
            subTitleClassName="text-lg font-bold my-2 text-green-500"
        />
    }
    async function makeBackUpChat() {
        if (messages) {
            const cid = await storeJSON(messages)
            writeTable({ action: 'CHAT_BACKUP', object: { timestamp: Date.now(), cid } })
        }

    }
    return (
        <>
            {tlLoading && <Loader showCloseIcon onClick={setIsLoading} />}
            {isConnected ? (<>

                {/* {console.log({ messages })} */}
                <div className={cn('pb-[200px] pt-4 md:pt-10 w-full', className)}>
                    {messages.length > 1 ? (
                        <>
                            <ChatList messages={messages} />
                            <ChatScrollAnchor trackVisibility={isLoading} />
                        </>
                    ) : (
                        <EmptyScreen setInput={setInput} />
                    )}
                </div>
                <ChatPanel
                    backupChat={() => {
                        // console.log({ messages });
                        makeBackUpChat();
                    }}
                    id={id}
                    isLoading={isLoading}
                    stop={stop}
                    append={append}
                    reload={reload}
                    messages={messages}
                    input={input}
                    setInput={setInput}
                />

            </>) : (<>

                {/* <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", fontSize:"15px"}}>
            <h1 style={{ marginBottom:"15px", fontSize:"20px", fontWeight:"initial", color:"GrayText"}} >You need to connect your wallet first!</h1>
            <ConnectButton></ConnectButton>

          </div> */}
                <Pleaseconnect></Pleaseconnect>

            </>)}

        </>
    )
}