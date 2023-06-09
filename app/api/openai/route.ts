import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, CreateChatCompletionResponse } from "openai";
import {AxiosResponse} from "axios"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request, res: any) {
    try {
        const { title, role } = await req.json();

        const aiResponse: AxiosResponse<CreateChatCompletionResponse, any> = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
                role: "user",
                content: `Create 5 line blog post with html tags based on this title: ${title}`
            },
            {
                role: "system",
                content: `${role || "I am a halpful assistant"}. Write with html tags`
            }
          ]
        });
        // res.revalidate("/api/posts")
        return NextResponse.json({
            content: aiResponse.data.choices[0].message?.content
        }, { status: 200 })
    } catch (err) {
        console.log("request error")
        NextResponse.json({ error: "error updating post" }, { status: 500 })
    }
}

