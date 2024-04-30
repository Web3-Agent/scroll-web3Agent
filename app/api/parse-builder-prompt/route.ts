import { NextResponse } from 'next/server';
//   Mayur Token with symbol name MYS and supply 300000
import { preprocessRequest, translatePromptToJSON } from '../../api-helpers/parse-builder-prompt/processors';
import { getNFTPrompt, getStakingPrompt, getTokenPrompt, getFarmPrompt } from './get-prompts';


export const TEMPLATE_MAPPING = {
    TOKEN: 'Token',
    NFT: 'NFT',
    STAKING: 'Staking',
    FARM : 'Farm'
}
export async function POST(request: Request) {
    try {
        const _request = await request.json();
        let prompt = ''
        if (_request.template === TEMPLATE_MAPPING.TOKEN) {
            prompt = getTokenPrompt(_request)
        }
        if (_request.template === TEMPLATE_MAPPING.NFT) {
            prompt = getNFTPrompt(_request)
        }
        if (_request.template === TEMPLATE_MAPPING.STAKING) {
            prompt = getStakingPrompt(_request)
        }
        if (_request.template === TEMPLATE_MAPPING.FARM) {
            prompt = getFarmPrompt(_request)
        }
        if (!prompt) {
            return NextResponse.json({ message: 'Unsppoorted actions', data: _request }, { status: 400 });
        }
        const preprocessedJSON = await preprocessRequest(prompt);
        return NextResponse.json({ message: 'Here parse version!', data: preprocessedJSON, _request }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 