import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export const GPT_ROUTE = "/api/gpt";

export async function POST(request: Request) {
    const { prompt } = await request.json();

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const OpenAI = new OpenAIApi(configuration);

    const response = await OpenAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: prompt,
            },
        ],
    });

    /*
        TypeScript Warning: Although Response.json() is valid, native TypeScript types
        currently shows an error, you can use NextResponse.json() for typed responses instead.
        Source: https://beta.nextjs.org/docs/routing/route-handlers
    */

    return NextResponse.json(response.data);
}
