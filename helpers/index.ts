import { ethers, Contract } from "ethers";
import {
    TOKEN_FACTORY_ABI,
    TOKEN_FACTORY_ADDRESS,
    AXL_CHAINS,
    TOKEN_ABI,
} from "./constants";
import { AxelarQueryAPI } from "@axelar-network/axelarjs-sdk";
export const createToken = async (
    chains: string[],
    minter: string,
    fromChain: string,
    name: string,
    symbol: string,
    decimals: Number,
    initialSupply: Number,
    signer: any
) => {
    try {
        const contract = new Contract(
            TOKEN_FACTORY_ADDRESS,
            TOKEN_FACTORY_ABI,
            signer
        );
        const saltbytes = ethers.utils.hexlify(ethers.utils.randomBytes(32));
        let iface: any = new ethers.utils.Interface(TOKEN_FACTORY_ABI);
        let data: any = [];
        const sdk = new AxelarQueryAPI({
            environment: "mainnet" as any,
        });
        let gas = ethers.utils.parseEther("0");
        data.push(
            iface.encodeFunctionData("deployInterchainToken", [
                saltbytes,
                name,
                symbol,
                decimals,
                initialSupply,
                minter,
            ])
        );
        for (let i = 0; i < chains.length; i++) {
            console.log(
                AXL_CHAINS[fromChain.trim().toLowerCase()].chainId,
                AXL_CHAINS[chains[i].trim().toLowerCase()].chainId
            );
            const gasValue = await sdk.estimateGasFee(
                AXL_CHAINS[fromChain.trim().toLowerCase()].chainId,
                AXL_CHAINS[chains[i].trim().toLowerCase()].chainId,
                AXL_CHAINS[fromChain.trim().toLowerCase()].token,
                500000
            );
            data.push(
                iface.encodeFunctionData("deployRemoteInterchainToken", [
                    AXL_CHAINS[fromChain.trim().toLowerCase()].chainId,
                    saltbytes,
                    minter,
                    AXL_CHAINS[chains[i].trim().toLowerCase()].chainId,
                    gasValue,
                ])
            );
            gas += ethers.utils.parseUnits(gasValue as string, 0);
        }
        console.log(gas, data, saltbytes);
        const tx = await contract.multicall(data, { value: gas });
        await tx.wait();
    } catch (e) {
        console.log(e, "Create Token");
    }
};
export const interchainTransfer = async (
    srcChain: string,
    destinationChain: string,
    recipient: string,
    amount: string,
    token: string,
    signer: any
) => {
    try {
        const sdk = new AxelarQueryAPI({
            environment: "mainnet" as any,
        });
        const gas = await sdk.estimateGasFee(
            AXL_CHAINS[srcChain.trim().toLowerCase()].chainId,
            AXL_CHAINS[destinationChain.trim().toLowerCase()].chainId,
            AXL_CHAINS[srcChain.trim().toLowerCase()].token,
            500000
        );
        const contract = new Contract(token, TOKEN_ABI, signer);
        const tx = await contract.interchainTransfer(
            AXL_CHAINS[destinationChain.trim().toLowerCase()].chainId,
            recipient,
            ethers.utils.parseEther(amount),
            "0x",
            {
                value: gas,
            }
        );
        await tx.wait();
    } catch (e) {
        console.log(e, "Create Token");
    }
};