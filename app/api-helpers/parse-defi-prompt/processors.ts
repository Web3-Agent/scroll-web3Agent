import { generateJSONFromPrompt } from "./ai";

export const preprocessJSON = async (prompt: any) => {
    const systemPrompt = `Parse the command into a JSON array where each element has exactly 2 fields: 'action' and 'details'. Action must be one of: 'CreatePortfolio', 'SwapTokens', 'SendToken', 'LidoDeposit', 'WrapEth', 'AaveDeposit', 'AaveBorrow', 'AaveRepay', 'AaveWithdraw', 'Undefined'. For 'details', extract the full corresponding sentence of command related to the action.`;

    return generateJSONFromPrompt(systemPrompt, prompt);
};

const actionPrompts = {
    CreatePortfolio: `Translate into a JSON object with 'action', 'assets', 'stopLoss', and 'takeProfit'. 'assets' is an array of objects, with each object containing 'token' and 'amount'. 'stopLoss' and 'takeProfit' are percentages for portfolio management.`,
    SwapTokens: `Translate into a JSON object with 'action', 'tokenFrom', 'tokenTo', 'amountIn' and 'amountOut'. 'tokenFrom' and 'tokenTo' are token symbols; 'amountIn' and 'amountOut' is the amount of 'tokenFrom' and 'tokenTo' tokens respectfully.`,
    SendToken: `Translate into a JSON object with 'action', 'token', 'to', and 'amount'. 'token' is the symbol of the token to send, 'to' is the receiver's address and 'amount' is the amount of 'token' to send.`,
    LidoDeposit: `Translate into a JSON object with 'action' and 'amount'. 'amount' is the amount of ETH to deposit.`,
    WrapEth: `Translate into a JSON object with 'action' and 'amount'. 'amount' is the amount of ETH to wrap.`,
    AaveDeposit: `Translate into a JSON object with 'action', 'token', and 'amount'. 'token' is the symbol of the token to deposit and 'amount' is the amount of 'token' to deposit.`,
    AaveBorrow: `Translate into a JSON object with 'action', 'token', and 'amount'. 'token' is the symbol of the token to borrow and 'amount' is the amount of 'token' to borrow.`,
    AaveRepay: `Translate into a JSON object with 'action', 'token', and 'amount'. 'token' is the symbol of the token to repay and 'amount' is the amount of 'token' to repay.`,
    AaveWithdraw: `Translate into a JSON object with 'action', 'token', and 'amount'. 'token' is the symbol of the token to withdraw and 'amount' is the amount of 'token' to withdraw.`,
    Undefined: `Translate into a JSON object with 'action' and 'details'. 'details' should contain the unprocessed part of the command related to this action.`,
};
;
export const translatePromptToJSON = async (preprocessedActions: any) => {
    const translatedActions: any = [];

    for (let action of preprocessedActions) {
        const systemPrompt = actionPrompts[action.action];
        const translatedAction = await generateJSONFromPrompt(
            systemPrompt,
            JSON.stringify(action)
        );
        translatedActions.push(translatedAction);
    }

    return translatedActions;
};

export default { preprocessJSON, translatePromptToJSON };
