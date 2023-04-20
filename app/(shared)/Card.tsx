import { type Post } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface CardProps {
    className?: string
    imageHeight: string
    isSmallCard?: boolean
    isLongForm?: boolean
    post: Post
}

const Card: FC<CardProps> = ({ imageHeight, isSmallCard, className, isLongForm, post }) => {
    const date = new Date(post?.createdAt)

    const options = { year: "numeric", month: "long", day: "numeric" } as any;
    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
        <div className={className}>
            <Link className='basis-full hover:opacity-70 transition duration-200'
                href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
            >
                <div className={`relative w-auto mb-3 ${imageHeight}`}>
                    <Image
                        fill
                        style={{ objectFit: "cover" }}
                        alt='tech'
                        src={post?.image}
                        placeholder='blur'
                    />
                </div>
            </Link>
            <div className='basis-full'>
                <Link
                    href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
                >
                    <h4 className={`font-bold hover:text-accent-green transition duration-200
                    ${isSmallCard ? "text-base" : "text-lg"}
                    ${isSmallCard ? "line-clamp-2" : ""}
                    `}
                    >
                        {post?.title}
                    </h4>
                </Link>
                <div className={`${isSmallCard ? "my-2" : "flex my-3"} gap-3`}>
                    <h5 className='font-semibold text-xs'>
                        {post?.author}
                    </h5>
                    <h6 className='text-wh-300 text-xs'>
                        {formattedDate}
                    </h6>
                </div>
                <p className={`text-wh-500 ${isLongForm ? "line-clamp-5" : "line-clamp-3"}`}>
                    {post?.snippet}
                </p>
            </div>
        </div>
    )
}

export default Card
