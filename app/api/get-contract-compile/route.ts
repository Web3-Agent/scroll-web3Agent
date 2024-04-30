// import { auth } from '@/auth'
import { deployContractCompile } from '@/app/lib/functions/deploy-contract';
// import { options } from "@/app/api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// const runtime = 'edge'

export async function POST(req: Request) {
    const json = await req.json()
    const { chainName, contractName, sourceCode, constructorArgs } = json;

    try {
        const deployResult = await deployContractCompile({
            chainName,
            contractName,
            sourceCode,
            constructorArgs,
        });
        return new Response(JSON.stringify(deployResult));
    } catch (error) {
        const err = error as Error
        console.error(`Error in deployContract: ${err.message}`);
        return new Response(JSON.stringify({ error: `Error in deployContract: ${err.message}` }), { status: 500 });
    }
}