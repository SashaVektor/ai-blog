import { NextResponse } from "next/server";
import { prisma } from "../../client";

interface ParamsType {
    params: {
        id: string
    }
}

export async function PATCH(req: Request, {params}: ParamsType) {
    try {
        const {id} = params
        const {title, content} = await req.json();

        const post = await prisma.post.update({
            where: {id},
            data: {title, content}
        })

        return NextResponse.json(post, {status: 200})
    } catch (err) {
        console.log("request error")
        NextResponse.json({error: "error updating post"}, {status: 500})
    }
}