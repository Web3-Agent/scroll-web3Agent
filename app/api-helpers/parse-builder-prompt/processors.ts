import { generateJSONFromPrompt } from "./ai";
// { "approach_heading": "Decentralized Voting System", "approach_content": "", "user_approach": "", "is_test": true }
export const preprocessRequest = async (prompt: any) => {
    // const systemPrompt = `Parse the command into a JSON array where each element has exactly 2 fields: 'action' and 'details'. Action must be one of: 'CreatePortfolio', 'SwapTokens', 'SendToken', 'LidoDeposit', 'WrapEth', 'AaveDeposit', 'AaveBorrow', 'AaveRepay', 'AaveWithdraw', 'Undefined'. For 'details', extract the full corresponding sentence of command related to the action.`;
    const systemPrompt = 'Generate Token code from given details from user.'
    // const prompts = 'Develop a Solidity smart contract to implement the following approach for the web application:Approach Heading: Decentralized Voting System Approach Content: Smart contracts can make Reddit\'s upvoting and downvoting system more transparent and tamper-proof. Users can vote on posts and comments, and these votes can be recorded on the blockchain. This ensures that the voting process is clear, transparent, and cannot be tampered with. Manipulated votes are a concern that can be tackled using smart contracts. Your task is to provide the Solidity code for the smart contract that will effectively integrate this approach into the web application. Include relevant functions, variables, and any necessary logic to ensure the successful implementation of the specified feature.Ensure that the generated Solidity code: 1. Compiles without errors. 2. Is complete and ready for deployment. 3. The version of Solidity used is "0.8.0" and SPDX - License - Identifier should be "MIT". 4. Create a "transferTo" function in a smart contract that allows the owner to transfer ownership to a specified address.Only the current owner should have the privilege to invoke this function. Note: Consider best practices and security considerations for smart contracts during the development.'

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

export default { preprocessRequest, translatePromptToJSON };
