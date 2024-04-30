import { OpenAI } from "openai";
const apiKey = process.env.OPENAI_API_KEY;
const configuration = {
    apiKey,
};
const openai = new OpenAI(configuration);
const DEFAULT_SYSTEM_PROMPT =
    "Response must be contains code.";
export const generateJSONFromPrompt = async (systemPrompt: any, userInput: any) => {
    try {
        console.log(userInput)
        const response: any = await openai.chat.completions.create({
            model: "gpt-4",
            temperature: 0.2,
            max_tokens: 6000,
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "system",
                    content: DEFAULT_SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: JSON.stringify(userInput),
                },
            ],
            // max_tokens: 200,
        });
        console.log(JSON.stringify(response, null, 2))
        return response.choices[0].message.content;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default { generateJSONFromPrompt };
