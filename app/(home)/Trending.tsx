import { Post } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface TrendingCardProps {
    className?: string
    post: Post
}

const TrendingCard: FC<TrendingCardProps> = ({ className, post }) => {
    return (
        <Link
            className={`${className} sm:mt-0 mt-7 block w-full h-96 sm:h-auto relative hover:opacity-70 transition-all duration-300`}
            href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
        >
            <div className='z-0 relative w-full h-full'>
                <Image
                    fill
                    style={{objectFit: "cover"}}
                    alt='tech'
                    src={post?.image}
                    placeholder='blur'
                />
            </div>
            <div className='absolute z-1 top-0 left-0 w-full h-full bg-gradient-gradual' />
            <div className='absolute z-2 bottom-0 left-0 p-3'>
                <h4 className='inline-block px-5 py-1 font-semibold bg-accent-orange text-wh-900'>
                    {post?.category}
                </h4>
                <div className='text-wh-100 mt-2'>{post?.title}</div>
            </div>
        </Link>
    )
}

interface TrendingProps {
    trendingPosts: Post[]
}

const Trending: FC<TrendingProps> = ({ trendingPosts }) => {
    return (
        <section className='pt-3 pb-10'>
            <div className='flex items-center gap-3'>
                <div className='uppercase bg-wh-900 py-2 px-8 text-wh-10 font-bold'>
                    trending
                </div>
                <p className='text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia placeat nam quos laudantium aut quaerat eveniet, voluptatem pariatur non ipsa?
                </p>
            </div>

            <div className='sm:grid gap-5 grid-cols-4 grid-rows-2 sm:h-[600px] my-3'>
                <TrendingCard className='col-span-2 row-span-2 bg-wh-500' post={trendingPosts[0]} />
                <TrendingCard className='col-span-2 row-span-1 bg-wh-500' post={trendingPosts[1]} />
                <TrendingCard className='col-span-1 row-span-1 bg-wh-500' post={trendingPosts[2]} />
                <TrendingCard className='col-span-1 row-span-1 bg-wh-500' post={trendingPosts[3]} />
            </div>
            <p className='text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vitae
                eos facilis voluptates deleniti aperiam earum cum debitis mollitia quae numquam
                repellat repudiandae fugit molestias, fugiat sed asperiores vero modi,
                accusamus laboriosam corporis? Ea accusantium aut debitis magni harum exercitationem.
            </p>
        </section>
    )
}

export default Trending
