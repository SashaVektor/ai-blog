import React, { FC } from 'react'
import Card from './Card'
import { type Post } from '@prisma/client'

interface OtherProps {
    otherPosts: Post[]
}

const Other:FC<OtherProps> = ({otherPosts}) => {
    return (
        <section className='pt-4 mb-16'>
            <hr className='border-1' />
            <p className='font-bold text-2xl my-8'>
                Other Trending Posts
            </p>
            <div className='sm:grid grid-cols-2 gap-16'>
                <Card
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                    post={otherPosts[0]}
                />
                <Card
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                    post={otherPosts[1]}
                />
                <Card
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                    post={otherPosts[2]}
                />
                <Card
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                    post={otherPosts[3]}
                />
            </div>
        </section>
    )
}

export default Other
