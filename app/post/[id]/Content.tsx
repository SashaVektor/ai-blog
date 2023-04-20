"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import SocialLinks from '@/app/(shared)/SocialLinks'
import { useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CategoryAndEdit from './CategoryAndEdit'
import Article from './Article'

interface ContentProps {
    post: FormattedPost
}

const Content = ({ post }: ContentProps) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)

    const [title, setTitle] = useState<string>(post?.title)
    const [tempTitle, setTempTitle] = useState<string>(post?.title)
    const [titleError, setTitleError] = useState<string>("")

    const [content, setContent] = useState<string>(post?.content)
    const [tempContent, setTempContent] = useState<string>(post?.content)
    const [contentError, setContentError] = useState<string>("")

    const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(title) {
            setTitleError('')
        }
        setTitle(e.target.value)
    }

    const handleIsEditable = (bool: boolean) => {
        setIsEditable(bool)
        editor?.setEditable(bool)
    }

    const handleOnChangeContent = ({editor}: any) => {
        if(!(editor as Editor).isEmpty) {
            setContentError("")
        }
        setContent((editor as Editor).getHTML())
    }

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full"
            }
        },
        onUpdate: handleOnChangeContent,
        content,
        editable: isEditable,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!title) setTitleError("This field is required!")

        if(editor?.isEmpty) setContentError("This field is required!")

        if(!title || editor?.isEmpty) return

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, content})
        })

        const data: FormattedPost = await res.json();
        handleIsEditable(false)
        setTempTitle("")
        setTempContent("")

        setTitle(data?.title)
        setContent(data?.content)
        editor?.commands.setContent(data?.content)
    }

    return (
        <div className='prose w-full max-w-full mb-10'>
            <h5 className='text-wh-300 '>
                {`Home > ${post.category} > ${post.title}`}
            </h5>
            <CategoryAndEdit 
            isEditable={isEditable}
            handleIsEditable={handleIsEditable}
            setTitle={setTitle}
            title={title}
            tempTitle={tempTitle}
            setTempTitle={setTempTitle}
            tempContent={tempContent}
            setTempContent={setTempContent}
            editor={editor}
            post={post}
            />
            <form onSubmit={handleSubmit}>
                <>
                    {isEditable ? (
                        <div>
                            <textarea
                                className='border-2 rounded-md bg-wh-50 p-3 w-full resize-none'
                                placeholder='Title'
                                onChange={handleOnChangeTitle}
                                value={title}
                            />
                            {titleError && <p className='mt-1 text-red-500 text-3xl'>{titleError}!!!</p>}
                        </div>
                    ) : (
                        <h3 className='font-bold text-3xl mt-3'>
                            {title}
                        </h3>
                    )}
                    <div className='flex gap-3'>
                        <h5 className='font-semibold text-xs'>By {post.author}</h5>
                        <h6 className='text-wh-300 text-xs'>{post.createdAt.slice(0, 10)}</h6>
                    </div>
                </>
                <div className='relative w-auto mt-2 mb-16 h-96'>
                    <Image
                        fill
                        alt={post.title}
                        src={post.image}
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <Article 
                contentError={contentError}
                editor={editor}
                isEditable={isEditable}
                setContent={setContent}
                title={title}
                />
                {isEditable && (
                    <div className='flex justify-end'>
                        <button type='submit' className='bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5 transition duration-200'>
                            SUBMIT
                        </button>
                    </div>
                )}
            </form>
            <div className='hidden md:block mt-10 w-1/3'>
                <SocialLinks isDark />
            </div>
        </div>
    )
}

export default Content
