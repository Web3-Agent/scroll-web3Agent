import { OpenAI } from "openai";
const apiKey = process.env.OPENAI_API_KEY;
const configuration = {
    apiKey,
};
const openai = new OpenAI(configuration);
const DEFAULT_SYSTEM_PROMPT =
    "The response must always be JSON array or object. No comments! No extra text! Only JSON array or object on the output";
export const generateJSONFromPrompt = async (systemPrompt: any, userInput: any) => {
    try {
        const response: any = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature: 0.2,
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
            max_tokens: 200,
        });
        return JSON.parse(response.choices[0].message.content);
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default { generateJSONFromPrompt };
