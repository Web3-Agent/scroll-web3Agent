import { NextResponse } from 'next/server';
import { getChainData } from '@/app/api-helpers/chain';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetTransactionByHashV2 } from '@/app/api-helpers/transaction-by-hash';
import { getNetworkConfig } from '@/constants/blockpiRPCMapping';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const hash = url.searchParams.get('hash');
        const network: any = url.searchParams.get('network');
        if (!network || !hash) {
            return NextResponse.json({ message: 'Network & Hash is required!', data: { network, hash } }, { status: 400 });
        }
        const networkConfig = getNetworkConfig(network)
        console.log("2->", { networkConfig, network, hash, METHOD: networkConfig.TRANSACTION_DETAILS_BY_HASH_METHOD })
        let response = await rpcGetTransactionByHashV2(networkConfig.RPC_URL, networkConfig.TRANSACTION_DETAILS_BY_HASH_METHOD, hash);
        console.log({ response: response?.data?.result })
        response = response?.data?.result || null
        if (!response) {
            return NextResponse.json({ message: 'No Block Number Found!', data: response }, { status: 204 });
        }
        const responsePayload = {
            network,
            ...response,
            txnValueInWei: convertStringToNumber(convertHexToString(response?.value)),
            txnValueInGwei: Math.ceil(convertStringToNumber(convertHexToString(response?.value)) / 1000000000),
            txnValueInEther: convertStringToNumber(convertHexToString(response?.value)) / 1_000_000_000_000_000_000
        }
        delete responsePayload?.accessList;
        delete responsePayload?.input;
        delete responsePayload?.signatures
        delete responsePayload?.feePayerSignatures
        return NextResponse.json({ message: 'Here is details of transcation!', data: responsePayload }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 