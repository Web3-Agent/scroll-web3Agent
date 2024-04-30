// import { auth } from '@/auth'
import deployContract from '@/app/lib/functions/deploy-contract';
// import { options } from "@/app/api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// const runtime = 'edge'

export async function POST(req: Request) {
    const json = await req.json()
    const { chainName, contractName, sourceCode, constructorArgs } = json;
    // const { user }: any = { user: {} }//await getServerSession(options) as any

    // if (!user || !user?.email) {
    //     return new Response('Unauthorized', { status: 401 })
    // }
    try {
        const deployResult = await deployContract({
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